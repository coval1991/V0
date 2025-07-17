const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())

// Stripe webhook - DEVE estar antes do middleware express.json()
app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"]
  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  console.log(`✅ Received event: ${event.type}`)

  if (event.type === "checkout.session.completed") {
    const session = event.data.object
    const { userAddress, tokenAmount } = session.metadata

    console.log(`💰 Processing payment for ${userAddress}: ${tokenAmount} CFD tokens`)

    try {
      // Create transaction record
      const transaction = new Transaction({
        userAddress,
        amount: Number.parseInt(tokenAmount),
        paymentMethod: "card",
        usdAmount: session.amount_total / 100,
        stripeSessionId: session.id,
        status: "completed",
      })
      await transaction.save()

      // Update user record
      let user = await User.findOne({ address: userAddress })
      if (!user) {
        user = new User({ address: userAddress })
      }

      user.totalPurchases += Number.parseInt(tokenAmount)
      user.lastPurchaseDate = new Date()
      user.holdingDays = 0
      user.purchases.push({
        amount: Number.parseInt(tokenAmount),
        paymentMethod: "card",
        usdAmount: session.amount_total / 100,
      })

      await user.save()

      console.log(`✅ Payment processed successfully for ${userAddress}`)

      // TODO: Here you would trigger the smart contract to send tokens
      // Example: await sendTokensToUser(userAddress, tokenAmount)
    } catch (error) {
      console.error("❌ Error processing payment:", error)
    }
  }

  res.json({ received: true })
})

app.use(express.json()) // Agora o express.json() pode ser usado para as outras rotas

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Schemas
const UserSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  joinDate: { type: Date, default: Date.now },
  totalPurchases: { type: Number, default: 0 },
  isQualified: { type: Boolean, default: false },
  holdingDays: { type: Number, default: 0 },
  lastPurchaseDate: { type: Date },
  purchases: [
    {
      amount: Number,
      paymentMethod: String,
      maticAmount: Number,
      usdAmount: Number,
      txHash: String,
      date: { type: Date, default: Date.now },
    },
  ],
})

const TransactionSchema = new mongoose.Schema({
  userAddress: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  maticAmount: Number,
  usdAmount: Number,
  txHash: String,
  stripeSessionId: String,
  status: { type: String, default: "pending" },
  date: { type: Date, default: Date.now },
})

const User = mongoose.model("User", UserSchema)
const Transaction = mongoose.model("Transaction", TransactionSchema)

// Admin authentication middleware
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "No token provided" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" })
    }
    next()
  } catch (error) {
    res.status(401).json({ error: "Invalid token" })
  }
}

// Routes

// Admin login
app.post("/api/admin/login", async (req, res) => {
  try {
    const { password } = req.body

    if (password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "24h" })
      res.json({ token })
    } else {
      res.status(401).json({ error: "Invalid password" })
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed" })
  }
})

// Verify admin token
app.get("/api/admin/verify", authenticateAdmin, (req, res) => {
  res.json({ valid: true })
})

// Get admin stats
app.get("/api/admin/stats", authenticateAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const transactions = await Transaction.find({ status: "completed" })

    const totalTokensSold = transactions.reduce((sum, tx) => sum + tx.amount, 0)
    const totalMaticReceived = transactions
      .filter((tx) => tx.paymentMethod === "matic")
      .reduce((sum, tx) => sum + (tx.maticAmount || 0), 0)
    const totalUsdReceived = transactions
      .filter((tx) => tx.paymentMethod === "card")
      .reduce((sum, tx) => sum + (tx.usdAmount || 0), 0)

    res.json({
      totalUsers,
      totalTokensSold,
      totalMaticReceived,
      totalUsdReceived,
    })
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" })
  }
})

// Get admin transactions
app.get("/api/admin/transactions", authenticateAdmin, async (req, res) => {
  try {
    const transactions = await Transaction.find({ status: "completed" }).sort({ date: -1 }).limit(50)
    res.json(transactions)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" })
  }
})

// Get admin users
app.get("/api/admin/users", authenticateAdmin, async (req, res) => {
  try {
    const users = await User.find().sort({ joinDate: -1 }).limit(50)
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" })
  }
})

// Get user data
app.get("/api/user/:address", async (req, res) => {
  try {
    const { address } = req.params
    let user = await User.findOne({ address })

    if (!user) {
      user = new User({ address })
      await user.save()
    }

    // Calculate holding days
    if (user.lastPurchaseDate) {
      const daysSinceLastPurchase = Math.floor((Date.now() - user.lastPurchaseDate.getTime()) / (1000 * 60 * 60 * 24))
      user.holdingDays = daysSinceLastPurchase
      user.isQualified = daysSinceLastPurchase >= 30 && user.totalPurchases >= 100
      await user.save()
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data" })
  }
})

// Record MATIC purchase
app.post("/api/purchases", async (req, res) => {
  try {
    const { userAddress, paymentMethod, maticAmount, txHash } = req.body

    const tokenAmount = Number.parseFloat(maticAmount) * 1000 // 1 MATIC = 1000 CFD

    // Create transaction record
    const transaction = new Transaction({
      userAddress,
      amount: tokenAmount,
      paymentMethod,
      maticAmount: Number.parseFloat(maticAmount),
      txHash,
      status: "completed",
    })
    await transaction.save()

    // Update user record
    let user = await User.findOne({ address: userAddress })
    if (!user) {
      user = new User({ address: userAddress })
    }

    user.totalPurchases += tokenAmount
    user.lastPurchaseDate = new Date()
    user.holdingDays = 0 // Reset holding period
    user.purchases.push({
      amount: tokenAmount,
      paymentMethod,
      maticAmount: Number.parseFloat(maticAmount),
      txHash,
    })

    await user.save()

    res.json({ success: true, transaction })
  } catch (error) {
    res.status(500).json({ error: "Failed to record purchase" })
  }
})

// Create Stripe checkout session
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { amount, userAddress } = req.body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "CFD Tokens",
              description: `${amount * 500} CFD tokens`,
            },
            unit_amount: amount * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/buy`,
      metadata: {
        userAddress,
        tokenAmount: (amount * 500).toString(),
      },
    })

    res.json({ sessionId: session.id })
  } catch (error) {
    res.status(500).json({ error: "Failed to create checkout session" })
  }
})

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

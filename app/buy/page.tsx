"use client"

import { useState } from "react"
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react"
import Header from "@/components/Header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Coins, ArrowRight } from "lucide-react"
import toast from "react-hot-toast"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
const CFD_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CFD_CONTRACT_ADDRESS || "0x..."
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

export default function BuyTokens() {
  const address = useAddress()
  const [maticAmount, setMaticAmount] = useState("")
  const [usdAmount, setUsdAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const { contract } = useContract(CFD_CONTRACT_ADDRESS)
  const { mutateAsync: buyWithMatic } = useContractWrite(contract, "buyTokens")

  const handleMaticPurchase = async () => {
    if (!address || !maticAmount) {
      toast.error("Please connect wallet and enter amount")
      return
    }

    setIsProcessing(true)
    try {
      const tx = await buyWithMatic({
        overrides: {
          value: maticAmount,
        },
      })

      // Register purchase in backend
      await fetch(`${BACKEND_URL}/api/purchases`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userAddress: address,
          paymentMethod: "matic",
          maticAmount: maticAmount,
          txHash: tx.receipt.transactionHash,
        }),
      })

      toast.success("Tokens purchased successfully!")
      setMaticAmount("")
    } catch (error) {
      console.error("Purchase failed:", error)
      toast.error("Purchase failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleStripePurchase = async () => {
    if (!address || !usdAmount) {
      toast.error("Please connect wallet and enter amount")
      return
    }

    setIsProcessing(true)
    try {
      const response = await fetch(`${BACKEND_URL}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number.parseFloat(usdAmount),
          userAddress: address,
        }),
      })

      const { sessionId } = await response.json()
      const stripe = await stripePromise

      if (stripe) {
        await stripe.redirectToCheckout({ sessionId })
      }
    } catch (error) {
      console.error("Stripe checkout failed:", error)
      toast.error("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (!address) {
    return (
      <div className="min-h-screen casino-pattern">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-8 gradient-text">Connect Your Wallet</h1>
          <p className="text-xl text-gray-300 mb-8">Please connect your wallet to buy CFD tokens</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen casino-pattern">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 gradient-text">Buy CFD Tokens</h1>
            <p className="text-gray-300">Purchase CFD tokens and start earning monthly USDT dividends</p>
          </div>

          <Tabs defaultValue="matic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-[var(--light-gray)]">
              <TabsTrigger value="matic" className="flex items-center">
                <Coins className="mr-2 h-4 w-4" />
                Pay with MATIC
              </TabsTrigger>
              <TabsTrigger value="card" className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                Pay with Card
              </TabsTrigger>
            </TabsList>

            <TabsContent value="matic">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Purchase with MATIC</CardTitle>
                  <CardDescription>Buy CFD tokens directly with MATIC from your wallet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="matic-amount">MATIC Amount</Label>
                    <Input
                      id="matic-amount"
                      type="number"
                      placeholder="0.0"
                      value={maticAmount}
                      onChange={(e) => setMaticAmount(e.target.value)}
                      className="bg-[var(--dark-gray)] border-[var(--primary-purple)]"
                    />
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--dark-gray)]">
                    <div className="flex justify-between text-sm">
                      <span>Exchange Rate:</span>
                      <span>1 MATIC = 1000 CFD</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span>You will receive:</span>
                      <span className="text-[var(--primary-gold)]">
                        {maticAmount ? (Number.parseFloat(maticAmount) * 1000).toFixed(0) : "0"} CFD
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleMaticPurchase}
                    disabled={isProcessing || !maticAmount}
                    className="w-full btn-primary"
                  >
                    {isProcessing ? (
                      <div className="loading-spinner mr-2"></div>
                    ) : (
                      <ArrowRight className="mr-2 h-4 w-4" />
                    )}
                    {isProcessing ? "Processing..." : "Buy with MATIC"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="card">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Purchase with Credit Card</CardTitle>
                  <CardDescription>Buy CFD tokens with your credit card via Stripe</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="usd-amount">USD Amount</Label>
                    <Input
                      id="usd-amount"
                      type="number"
                      placeholder="0.00"
                      value={usdAmount}
                      onChange={(e) => setUsdAmount(e.target.value)}
                      className="bg-[var(--dark-gray)] border-[var(--primary-purple)]"
                    />
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--dark-gray)]">
                    <div className="flex justify-between text-sm">
                      <span>Exchange Rate:</span>
                      <span>$1 = 500 CFD</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span>You will receive:</span>
                      <span className="text-[var(--primary-gold)]">
                        {usdAmount ? (Number.parseFloat(usdAmount) * 500).toFixed(0) : "0"} CFD
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleStripePurchase}
                    disabled={isProcessing || !usdAmount}
                    className="w-full btn-gold"
                  >
                    {isProcessing ? (
                      <div className="loading-spinner mr-2"></div>
                    ) : (
                      <CreditCard className="mr-2 h-4 w-4" />
                    )}
                    {isProcessing ? "Processing..." : "Pay with Card"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 p-6 rounded-lg bg-[var(--dark-gray)] border border-[var(--primary-purple)]/30">
            <h3 className="font-semibold mb-4 text-[var(--primary-gold)]">Important Information</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Minimum purchase: 100 CFD tokens</li>
              <li>• Hold tokens for 30+ days to qualify for USDT dividends</li>
              <li>• Monthly profit distribution based on casino performance</li>
              <li>• Tokens are on Polygon network (MATIC)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

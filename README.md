# CasinoFound (CFD) Token Platform

A complete Web3 platform for the CasinoFound (CFD) token on Polygon network, featuring casino profit distribution to token holders.

## Features

- **Web3 Integration**: Connect MetaMask and other Web3 wallets
- **Token Purchase**: Buy CFD tokens with MATIC or credit card
- **Dividend System**: Monthly USDT profit distribution to qualified holders
- **User Dashboard**: Track holdings, earnings, and qualification status
- **Admin Panel**: Manage users, transactions, and platform statistics
- **Responsive Design**: Modern UI with casino-themed styling

## Tech Stack

### Frontend (Next.js)
- Next.js 14 with App Router
- React 18
- Thirdweb SDK for Web3 integration
- Tailwind CSS for styling
- Stripe.js for client-side payment integration
- Recharts for data visualization

### Backend (Node.js/Express)
- Node.js with Express
- MongoDB Atlas for database
- JWT authentication
- Stripe webhooks
- Smart contract integration (via backend logic)

## Quick Start (Local Development with Docker Compose)

### Prerequisites
- Docker Desktop installed and running
- Node.js 18+ (for local contract development/deployment)
- MongoDB Atlas account
- Thirdweb account
- Stripe account
- Polygon wallet with MATIC

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd casinofound-platform
\`\`\`

2. Set up environment variables
\`\`\`bash
cp .env.example .env.local
\`\`\`
Fill in your environment variables in `.env.local` for local development.
For `NEXT_PUBLIC_BACKEND_URL`, use `http://localhost:5000`.

3. Run with Docker Compose (installs dependencies and starts both services)
\`\`\`bash
docker-compose up --build
\`\`\`
- Frontend will be available at `http://localhost:3000`
- Backend will be available at `http://localhost:5000`

## Deployment on Render

This project is structured for easy deployment on Render as two separate services: a Frontend (Next.js) and a Backend (Node.js/Express).

### General Steps:

1.  **Push to GitHub**: Ensure your entire project (including the `backend` folder) is pushed to a GitHub repository.
2.  **MongoDB Atlas Setup**: Create and configure your MongoDB Atlas database. Get the connection string.
3.  **Deploy Backend Service on Render**:
    *   Create a new "Web Service" on Render.
    *   Connect to your GitHub repository.
    *   **Root Directory**: Set to `backend`.
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
    *   **Port**: `5000`
    *   Add environment variables: `MONGODB_URI`, `JWT_SECRET`, `ADMIN_PASSWORD`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (will update later), `FRONTEND_URL` (will update later), `PORT`.
    *   Deploy and note the public URL (e.g., `https://your-backend.onrender.com`).
4.  **Configure Stripe Webhook**:
    *   Go to your Stripe Dashboard -> Webhooks.
    *   Add a new endpoint: `YOUR_BACKEND_URL/api/stripe/webhook`.
    *   Select event `checkout.session.completed`.
    *   Copy the "Signing secret" (`whsec_...`).
    *   Update the `STRIPE_WEBHOOK_SECRET` environment variable in your **Render Backend Service** and redeploy.
5.  **Deploy Frontend Service on Render**:
    *   Create another "Web Service" on Render.
    *   Connect to the same GitHub repository.
    *   **Root Directory**: Set to `.` (the root of your repository).
    *   **Build Command**: `npm install && npm run build`
    *   **Start Command**: `npm start`
    *   **Port**: `3000`
    *   Add environment variables: `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`, `NEXT_PUBLIC_CFD_CONTRACT_ADDRESS` (will update later), `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_BACKEND_URL` (use the public URL of your Render Backend Service).
    *   Deploy and note the public URL (e.g., `https://your-frontend.onrender.com`).
    *   **Important**: Go back to your **Render Backend Service** and update its `FRONTEND_URL` environment variable with the public URL of your Frontend Service.
6.  **Deploy Smart Contract**:
    *   Deploy your CFD token contract on the Polygon network using Hardhat (instructions in `contracts/` and `scripts/`).
    *   Update the `NEXT_PUBLIC_CFD_CONTRACT_ADDRESS` environment variable in your **Render Frontend Service** and redeploy.
7.  **Test Everything!**

For detailed step-by-step instructions, refer to the `/deploy-instructions` page on your deployed frontend.

## Smart Contract Integration

The platform is designed to work with ERC-20 compatible tokens on Polygon. You'll need to:

1. Deploy your CFD token contract on Polygon
2. Update the contract address in environment variables
3. Ensure the contract has proper mint/transfer functions for token distribution

## Key Features Explained

### Token Purchase
- **MATIC Payment**: Direct smart contract interaction
- **Credit Card**: Stripe integration with webhook processing
- **Automatic Token Distribution**: Tokens sent to user wallet after payment

### Dividend System
- **30-Day Holding Period**: Users must hold tokens for 30+ days
- **Minimum Holdings**: 100 CFD tokens required
- **Monthly Distribution**: 5% of casino profits in USDT
- **Proportional Sharing**: Based on token holdings percentage

### Admin Panel
- **User Management**: View all users and their holdings
- **Transaction Monitoring**: Track all purchases and payments
- **Statistics Dashboard**: Platform metrics and performance
- **Secure Access**: JWT-based authentication

## Security Features

- **Smart Contract Auditing**: Recommended before mainnet deployment
- **Secure Payment Processing**: PCI-compliant Stripe integration
- **JWT Authentication**: Secure admin access
- **Input Validation**: All user inputs validated and sanitized
- **CORS Protection**: Proper cross-origin request handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the FAQ section on the website

## Disclaimer

This platform is for educational and demonstration purposes. Always conduct proper legal and financial due diligence before launching any cryptocurrency or investment platform.

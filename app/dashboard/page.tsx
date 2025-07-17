"use client"

import { useEffect, useState } from "react"
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react"
import Header from "@/components/Header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Coins, TrendingUp, Clock, History } from "lucide-react"
import { formatEther } from "ethers/lib/utils"

const CFD_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CFD_CONTRACT_ADDRESS || "0x..."
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

export default function Dashboard() {
  const address = useAddress()
  const [userPurchases, setUserPurchases] = useState([])
  const [isQualified, setIsQualified] = useState(false)
  const [holdingDays, setHoldingDays] = useState(0)

  const { contract } = useContract(CFD_CONTRACT_ADDRESS)
  const { data: balance, isLoading: balanceLoading } = useContractRead(contract, "balanceOf", [address])

  useEffect(() => {
    if (address) {
      fetchUserData()
    }
  }, [address])

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/user/${address}`)
      if (response.ok) {
        const data = await response.json()
        setUserPurchases(data.purchases || [])
        setIsQualified(data.isQualified || false)
        setHoldingDays(data.holdingDays || 0)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const estimatedMonthlyProfit = balance ? (Number.parseFloat(formatEther(balance)) * 0.05).toFixed(2) : "0.00"

  if (!address) {
    return (
      <div className="min-h-screen casino-pattern">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-8 gradient-text">Connect Your Wallet</h1>
          <p className="text-xl text-gray-300 mb-8">Please connect your wallet to access your dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen casino-pattern">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Your CFD Dashboard</h1>
          <p className="text-gray-300">Welcome back! Here's your CFD token overview and earnings.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CFD Balance</CardTitle>
              <Coins className="h-4 w-4 text-[var(--primary-gold)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {balanceLoading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  `${balance ? Number.parseFloat(formatEther(balance)).toFixed(2) : "0.00"} CFD`
                )}
              </div>
              <p className="text-xs text-gray-400">Your current token holdings</p>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Profit Est.</CardTitle>
              <TrendingUp className="h-4 w-4 text-[var(--primary-purple)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[var(--primary-gold)]">${estimatedMonthlyProfit} USDT</div>
              <p className="text-xs text-gray-400">Based on 5% monthly distribution</p>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Holding Status</CardTitle>
              <Clock className="h-4 w-4 text-[var(--primary-purple)]" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Badge variant={isQualified ? "default" : "secondary"}>
                  {isQualified ? "Qualified" : "Not Qualified"}
                </Badge>
              </div>
              <p className="text-xs text-gray-400 mt-2">{holdingDays}/30 days minimum hold</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 bg-[var(--light-gray)]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Purchase History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Profit Distribution Info</CardTitle>
                <CardDescription>How the monthly USDT distribution works</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-[var(--dark-gray)]">
                    <h3 className="font-semibold mb-2">Requirements</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Hold CFD tokens for minimum 30 days</li>
                      <li>• Keep tokens in your wallet (no transfers)</li>
                      <li>• Minimum 100 CFD tokens required</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-[var(--dark-gray)]">
                    <h3 className="font-semibold mb-2">Distribution</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• 5% of casino profits monthly</li>
                      <li>• Paid in USDT directly to wallet</li>
                      <li>• Proportional to your CFD holdings</li>
                    </ul>
                  </div>
                </div>

                {!isQualified && (
                  <div className="p-4 rounded-lg bg-yellow-900/20 border border-yellow-600/30">
                    <p className="text-yellow-300">
                      <strong>Note:</strong> You need to hold your tokens for {30 - holdingDays} more days to qualify
                      for profit distribution.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="mr-2 h-5 w-5" />
                  Purchase History
                </CardTitle>
                <CardDescription>Your CFD token purchase transactions</CardDescription>
              </CardHeader>
              <CardContent>
                {userPurchases.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No purchases found. Start by buying some CFD tokens!</p>
                ) : (
                  <div className="space-y-4">
                    {userPurchases.map((purchase: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-4 rounded-lg bg-[var(--dark-gray)]"
                      >
                        <div>
                          <p className="font-semibold">{purchase.amount} CFD</p>
                          <p className="text-sm text-gray-400">{new Date(purchase.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[var(--primary-gold)]">
                            {purchase.paymentMethod === "matic"
                              ? `${purchase.maticAmount} MATIC`
                              : `$${purchase.usdAmount}`}
                          </p>
                          <Badge variant="outline">{purchase.paymentMethod === "matic" ? "MATIC" : "Card"}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </div>
)
}

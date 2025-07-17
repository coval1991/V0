"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign, TrendingUp, LogOut } from "lucide-react"
import toast from "react-hot-toast"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

export default function AdminPanel() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTokensSold: 0,
    totalMaticReceived: 0,
    totalUsdReceived: 0,
  })
  const [transactions, setTransactions] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem("adminToken")
    if (token) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/admin/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (response.ok) {
          setIsAuthenticated(true)
          fetchAdminData()
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      }
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        const { token } = await response.json()
        localStorage.setItem("adminToken", token)
        setIsAuthenticated(true)
        fetchAdminData()
        toast.success("Login successful")
      } else {
        toast.error("Invalid password")
      }
    } catch (error) {
      toast.error("Login failed")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    setIsAuthenticated(false)
    setPassword("")
  }

  const fetchAdminData = async () => {
    const token = localStorage.getItem("adminToken")
    try {
      const [statsRes, transactionsRes, usersRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/admin/stats`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${BACKEND_URL}/api/admin/transactions`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${BACKEND_URL}/api/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
      ])

      if (statsRes.ok) setStats(await statsRes.json())
      if (transactionsRes.ok) setTransactions(await transactionsRes.json())
      if (usersRes.ok) setUsers(await usersRes.json())
    } catch (error) {
      console.error("Failed to fetch admin data:", error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen casino-pattern">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-center gradient-text">Admin Login</CardTitle>
                <CardDescription className="text-center">Enter admin password to access the panel</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-[var(--dark-gray)] border-[var(--primary-purple)]"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full btn-primary">
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen casino-pattern">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold gradient-text">Admin Panel</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-[var(--primary-gold)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tokens Sold</CardTitle>
              <TrendingUp className="h-4 w-4 text-[var(--primary-purple)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTokensSold.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">MATIC Received</CardTitle>
              <DollarSign className="h-4 w-4 text-[var(--primary-gold)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMaticReceived.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">USD Received</CardTitle>
              <DollarSign className="h-4 w-4 text-[var(--primary-purple)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalUsdReceived.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 bg-[var(--light-gray)]">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest token purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((tx: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-4 rounded-lg bg-[var(--dark-gray)]">
                      <div>
                        <p className="font-semibold">
                          {tx.userAddress.slice(0, 6)}...{tx.userAddress.slice(-4)}
                        </p>
                        <p className="text-sm text-gray-400">{new Date(tx.date).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{tx.amount} CFD</p>
                        <Badge variant={tx.paymentMethod === "matic" ? "default" : "secondary"}>
                          {tx.paymentMethod === "matic" ? "MATIC" : "Card"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>User Overview</CardTitle>
                <CardDescription>Registered users and their holdings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-4 rounded-lg bg-[var(--dark-gray)]">
                      <div>
                        <p className="font-semibold">
                          {user.address.slice(0, 6)}...{user.address.slice(-4)}
                        </p>
                        <p className="text-sm text-gray-400">Joined: {new Date(user.joinDate).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{user.totalPurchases} CFD</p>
                        <Badge variant={user.isQualified ? "default" : "secondary"}>
                          {user.isQualified ? "Qualified" : "Not Qualified"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </div>
)
}

"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/Header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    if (sessionId) {
      toast.success("Payment successful! Tokens will be sent to your wallet shortly.")
    }
  }, [sessionId])

  return (
    <div className="min-h-screen casino-pattern">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="card-gradient">
            <CardHeader>
              <div className="mx-auto mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-3xl gradient-text">Payment Successful!</CardTitle>
              <CardDescription className="text-lg">
                Your CFD tokens are being processed and will be sent to your wallet shortly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 rounded-lg bg-[var(--dark-gray)]">
                <h3 className="font-semibold mb-4 text-[var(--primary-gold)]">What happens next?</h3>
                <ul className="text-left text-gray-300 space-y-2">
                  <li>• Your tokens will be sent to your connected wallet within 5-10 minutes</li>
                  <li>• You'll receive an email confirmation with transaction details</li>
                  <li>• Hold your tokens for 30+ days to qualify for USDT dividends</li>
                  <li>• Check your dashboard to track your holdings and earnings</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button className="btn-primary">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Go to Dashboard
                  </Button>
                </Link>
                <Link href="/buy">
                  <Button variant="outline">Buy More Tokens</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

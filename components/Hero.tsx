"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Shield, Coins } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative py-20 casino-pattern overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-purple)]/10 to-[var(--primary-gold)]/10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">CasinoFound</span>
            <br />
            <span className="text-white">The Future of</span>
            <br />
            <span className="text-[var(--primary-gold)]">Casino Finance</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join the revolution in casino financing with CFD tokens on Polygon. Earn monthly USDT dividends from casino
            profits while supporting the future of online gaming.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/buy">
              <Button size="lg" className="btn-primary text-lg px-8 py-4">
                <Coins className="mr-2 h-5 w-5" />
                Buy CFD Tokens
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-[var(--primary-gold)] text-[var(--primary-gold)] hover:bg-[var(--primary-gold)] hover:text-black bg-transparent"
              >
                Learn More
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-lg card-gradient">
              <TrendingUp className="h-12 w-12 text-[var(--primary-gold)] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Monthly Dividends</h3>
              <p className="text-gray-300">Earn 5% of casino profits distributed monthly in USDT</p>
            </div>

            <div className="text-center p-6 rounded-lg card-gradient">
              <Shield className="h-12 w-12 text-[var(--primary-purple)] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Polygon Network</h3>
              <p className="text-gray-300">Fast, secure, and low-cost transactions on Polygon</p>
            </div>

            <div className="text-center p-6 rounded-lg card-gradient">
              <Coins className="h-12 w-12 text-[var(--primary-gold)] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Purchase</h3>
              <p className="text-gray-300">Buy with MATIC or credit card through secure payment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

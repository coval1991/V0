"use client"

import { useState } from "react"
import Link from "next/link"
import { ConnectWallet, useAddress, useChain, useSwitchChain } from "@thirdweb-dev/react"
import { Polygon } from "@thirdweb-dev/chains"
import { Button } from "@/components/ui/button"
import { Menu, X, AlertTriangle } from "lucide-react"
import toast from "react-hot-toast"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const address = useAddress()
  const chain = useChain()
  const switchChain = useSwitchChain()

  const isWrongNetwork = chain && chain.chainId !== Polygon.chainId

  const handleNetworkSwitch = async () => {
    try {
      await switchChain(Polygon.chainId)
      toast.success("Switched to Polygon network")
    } catch (error) {
      toast.error("Failed to switch network")
    }
  }

  return (
    <header className="border-b border-[var(--primary-purple)]/30 bg-[var(--primary-black)]/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[var(--primary-purple)] to-[var(--primary-gold)] rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">CFD</span>
            </div>
            <span className="text-xl font-bold gradient-text">CasinoFound</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-[var(--primary-gold)] transition-colors">
              Home
            </Link>
            <Link href="/buy" className="hover:text-[var(--primary-gold)] transition-colors">
              Buy Tokens
            </Link>
            {address && (
              <Link href="/dashboard" className="hover:text-[var(--primary-gold)] transition-colors">
                Dashboard
              </Link>
            )}
            <Link href="#faq" className="hover:text-[var(--primary-gold)] transition-colors">
              FAQ
            </Link>
            <Link href="/admin" className="hover:text-[var(--primary-gold)] transition-colors">
              Admin
            </Link>
            <Link href="/deploy-instructions" className="hover:text-[var(--primary-gold)] transition-colors">
              Deploy Guide
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isWrongNetwork && (
              <Button onClick={handleNetworkSwitch} variant="destructive" size="sm" className="hidden md:flex">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Switch to Polygon
              </Button>
            )}

            <ConnectWallet
              theme="dark"
              btnTitle="Connect Wallet"
              modalTitle="Connect Your Wallet"
              switchToActiveChain={true}
              modalSize="wide"
            />

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--primary-purple)]/30">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="hover:text-[var(--primary-gold)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/buy"
                className="hover:text-[var(--primary-gold)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Buy Tokens
              </Link>
              {address && (
                <Link
                  href="/dashboard"
                  className="hover:text-[var(--primary-gold)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <Link
                href="#faq"
                className="hover:text-[var(--primary-gold)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/admin"
                className="hover:text-[var(--primary-gold)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
              <Link
                href="/deploy-instructions"
                className="hover:text-[var(--primary-gold)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Deploy Guide
              </Link>
              {isWrongNetwork && (
                <Button onClick={handleNetworkSwitch} variant="destructive" size="sm" className="w-fit">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Switch to Polygon
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

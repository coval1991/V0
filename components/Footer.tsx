import Link from "next/link"
import { Twitter, TextIcon as Telegram, DiscIcon as Discord, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[var(--primary-black)] border-t border-[var(--primary-purple)]/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-[var(--primary-purple)] to-[var(--primary-gold)] rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">CFD</span>
              </div>
              <span className="text-xl font-bold gradient-text">CasinoFound</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Revolutionizing casino financing through blockchain technology. Join the future of online gaming with CFD
              tokens on Polygon.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[var(--primary-gold)] transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[var(--primary-gold)] transition-colors">
                <Telegram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[var(--primary-gold)] transition-colors">
                <Discord className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[var(--primary-gold)] transition-colors">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--primary-gold)]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/buy" className="text-gray-300 hover:text-white transition-colors">
                  Buy Tokens
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Whitepaper
                </a>
              </li>
              <li>
                <Link href="/deploy-instructions" className="text-gray-300 hover:text-white transition-colors">
                  Deploy Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--primary-gold)]">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Risk Disclosure
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--primary-purple)]/30 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 CasinoFound. All rights reserved. CFD tokens are utility tokens on Polygon network.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This is not financial advice. Please do your own research before investing.
          </p>
        </div>
      </div>
    </footer>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThirdwebProvider } from "@thirdweb-dev/react"
import { Polygon } from "@thirdweb-dev/chains"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "@/contexts/AuthContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CasinoFound - CFD Token | Official Portal",
  description:
    "Official portal for CasinoFound (CFD) token on Polygon network. Finance the future of online casinos with profit distribution in USDT.",
  keywords: "CasinoFound, CFD, token, cryptocurrency, Polygon, MATIC, casino, blockchain",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider activeChain={Polygon} clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}>
          <AuthProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#1a1a1a",
                  color: "#fff",
                  border: "1px solid #4400FF",
                },
              }}
            />
          </AuthProvider>
        </ThirdwebProvider>
      </body>
    </html>
  )
}

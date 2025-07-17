import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Tokenomics from "@/components/Tokenomics"
import Roadmap from "@/components/Roadmap"
import FAQ from "@/components/FAQ"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Tokenomics />
      <Roadmap />
      <FAQ />
      <Footer />
    </main>
  )
}

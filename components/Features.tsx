import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, DollarSign, BarChart3, Users, Lock, Zap } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Wallet,
      title: "Web3 Integration",
      description:
        "Connect your MetaMask or any Web3 wallet to interact with CFD tokens seamlessly on Polygon network.",
    },
    {
      icon: DollarSign,
      title: "USDT Dividends",
      description:
        "Receive monthly profit distributions in USDT directly to your wallet. 5% of casino profits shared with holders.",
    },
    {
      icon: BarChart3,
      title: "Real-time Dashboard",
      description: "Track your CFD holdings, estimated earnings, and qualification status for dividends in real-time.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Join a community of investors financing the future of online casinos with transparent profit sharing.",
    },
    {
      icon: Lock,
      title: "Secure & Transparent",
      description:
        "Smart contracts on Polygon ensure secure transactions and transparent profit distribution mechanisms.",
    },
    {
      icon: Zap,
      title: "Low Fees",
      description: "Benefit from Polygon's low transaction fees for buying, selling, and receiving dividend payments.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-[var(--dark-gray)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Why Choose CFD Tokens?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of casino investment with cutting-edge blockchain technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="card-gradient hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-[var(--primary-gold)] mb-4" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

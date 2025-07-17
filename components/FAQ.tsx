"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is CasinoFound (CFD) token?",
      answer:
        "CFD is a utility token on the Polygon network that allows holders to participate in casino profit distribution. By holding CFD tokens for at least 30 days, you become eligible for monthly USDT dividends based on casino performance.",
    },
    {
      question: "How do I earn dividends?",
      answer:
        "To earn dividends, you need to: 1) Purchase CFD tokens, 2) Hold them in your wallet for at least 30 consecutive days, 3) Maintain a minimum of 100 CFD tokens. Dividends are distributed monthly as 5% of casino profits in USDT.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "You can purchase CFD tokens using MATIC (diretamente da sua carteira Web3) ou com um cartão de crédito através da nossa integração segura com Stripe. Compras com MATIC são instantâneas, enquanto compras com cartão podem levar de 5 a 10 minutos para processar.",
    },
    {
      question: "Why is the token on Polygon network?",
      answer:
        "Polygon offers fast, secure, and low-cost transactions compared to Ethereum mainnet. This ensures minimal fees when buying tokens, receiving dividends, or transferring CFD tokens.",
    },
    {
      question: "How are profits calculated and distributed?",
      answer:
        "5% of the casino's monthly net profits are distributed proportionally to qualified CFD holders. The more CFD tokens you hold, the larger your share of the distribution. Payments are made in USDT directly to your wallet.",
    },
    {
      question: "What happens if I sell my tokens before 30 days?",
      answer:
        "If you sell or transfer your CFD tokens before holding them for 30 consecutive days, you will not qualify for that month's dividend distribution. The 30-day holding period resets with each transaction.",
    },
    {
      question: "Is there a minimum purchase amount?",
      answer:
        "Yes, the minimum purchase is 100 CFD tokens. This ensures that transaction fees don't disproportionately affect smaller purchases and maintains eligibility for dividend distributions.",
    },
    {
      question: "How can I track my earnings and holdings?",
      answer:
        "Our dashboard provides real-time tracking of your CFD balance, estimated monthly earnings, holding period status, and purchase history. Simply connect your wallet to access your personalized dashboard.",
    },
    {
      question: "Is the project audited and secure?",
      answer:
        "Yes, our smart contracts are audited by reputable security firms. All transactions are transparent on the Polygon blockchain, and we follow industry best practices for security and compliance.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 casino-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about CFD tokens and dividend distribution
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="card-gradient">
              <CardHeader className="cursor-pointer" onClick={() => toggleFAQ(index)}>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-left">{faq.question}</CardTitle>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-[var(--primary-gold)]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[var(--primary-gold)]" />
                  )}
                </div>
              </CardHeader>
              {openIndex === index && (
                <CardContent>
                  <p className="text-gray-300">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

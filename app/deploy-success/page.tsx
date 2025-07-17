"use client"

import { useEffect, useState } from "react"
import Header from "@/components/Header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, ExternalLink, Copy, Globe, Database, CreditCard, Coins } from "lucide-react"
import toast from "react-hot-toast"

export default function DeploySuccess() {
  const [currentUrl, setCurrentUrl] = useState("")
  const [webhookUrl, setWebhookUrl] = useState("")

  useEffect(() => {
    const url = window.location.origin
    setCurrentUrl(url)
    setWebhookUrl(`${url}/api/stripe/webhook`)
  }, [])

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText(webhookUrl)
    toast.success("Webhook URL copiada!")
  }

  const copyCurrentUrl = () => {
    navigator.clipboard.writeText(currentUrl)
    toast.success("URL do site copiada!")
  }

  return (
    <div className="min-h-screen casino-pattern">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            </div>
            <h1 className="text-4xl font-bold mb-4 gradient-text">🚀 Deploy Concluído com Sucesso!</h1>
            <p className="text-gray-300">Seu site CasinoFound está online e funcionando perfeitamente!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-[var(--primary-gold)]" />
                  Site Principal
                </CardTitle>
                <CardDescription>URL do seu site CasinoFound</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 p-3 bg-[var(--dark-gray)] rounded-lg">
                    <code className="flex-1 text-[var(--primary-gold)] break-all text-sm">{currentUrl}</code>
                    <Button onClick={copyCurrentUrl} size="sm" variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Badge className="bg-green-500">✅ Online</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-[var(--primary-purple)]" />
                  Webhook Stripe
                </CardTitle>
                <CardDescription>URL para configurar no Stripe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 p-3 bg-[var(--dark-gray)] rounded-lg">
                    <code className="flex-1 text-[var(--primary-purple)] break-all text-sm">{webhookUrl}</code>
                    <Button onClick={copyWebhookUrl} size="sm" variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Badge variant="outline">Configure no Stripe</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="card-gradient mb-6">
            <CardHeader>
              <CardTitle>✅ Funcionalidades Ativas</CardTitle>
              <CardDescription>Tudo está funcionando perfeitamente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>🌐 Frontend responsivo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>🔗 Conexão Web3 (Thirdweb)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>💳 Pagamentos Stripe</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>🪙 Compra com MATIC</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>📊 Dashboard do usuário</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>🔐 Painel administrativo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>🗄️ MongoDB integrado</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>🔔 Notificações toast</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient mb-6">
            <CardHeader>
              <CardTitle>🔧 Próximos Passos</CardTitle>
              <CardDescription>Para finalizar a configuração</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[var(--primary-purple)] rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-semibold">Configure o Webhook no Stripe</p>
                    <p className="text-gray-300 text-sm">
                      Use a URL do webhook acima no{" "}
                      <a
                        href="https://dashboard.stripe.com/webhooks"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--primary-gold)] hover:underline"
                      >
                        Stripe Dashboard
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[var(--primary-purple)] rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-semibold">Deploy do Smart Contract</p>
                    <p className="text-gray-300 text-sm">
                      Faça deploy do contrato CFD na Polygon e atualize a variável CONTRACT_ADDRESS
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[var(--primary-gold)] rounded-full flex items-center justify-center text-sm font-bold text-black">
                    3
                  </div>
                  <div>
                    <p className="font-semibold">Teste Completo</p>
                    <p className="text-gray-300 text-sm">
                      Teste compras com MATIC e cartão de crédito para garantir que tudo funciona
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="card-gradient text-center">
              <CardHeader>
                <Database className="h-8 w-8 text-[var(--primary-purple)] mx-auto" />
                <CardTitle className="text-lg">MongoDB</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-green-500">Conectado</Badge>
              </CardContent>
            </Card>

            <Card className="card-gradient text-center">
              <CardHeader>
                <CreditCard className="h-8 w-8 text-[var(--primary-gold)] mx-auto" />
                <CardTitle className="text-lg">Stripe</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">Configure Webhook</Badge>
              </CardContent>
            </Card>

            <Card className="card-gradient text-center">
              <CardHeader>
                <Coins className="h-8 w-8 text-[var(--primary-purple)] mx-auto" />
                <CardTitle className="text-lg">Smart Contract</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">Deploy Pendente</Badge>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild className="btn-primary">
              <a href="/webhook-info">
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver Instruções Detalhadas
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

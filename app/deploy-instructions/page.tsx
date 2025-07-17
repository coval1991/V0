"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, ExternalLink, CheckCircle, Github, Server, CreditCard, Coins, Database } from "lucide-react"
import toast from "react-hot-toast"

export default function DeployInstructions() {
  const [frontendUrl, setFrontendUrl] = useState("")
  const [backendUrl, setBackendUrl] = useState("")
  const [contractAddress, setContractAddress] = useState("") // User will input this after deploy

  useEffect(() => {
    // These will be dynamic on Render after deployment
    setFrontendUrl("https://seu-frontend.onrender.com") // Placeholder
    setBackendUrl("https://seu-backend.onrender.com") // Placeholder
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copiado para clipboard!")
  }

  return (
    <div className="min-h-screen casino-pattern">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 gradient-text">🚀 Guia de Deploy Completo (Render)</h1>
            <p className="text-gray-300">
              Siga estes passos para colocar seu site CasinoFound online e totalmente funcional no Render.
            </p>
          </div>

          {/* Overview */}
          <Card className="card-gradient mb-8">
            <CardHeader>
              <CardTitle>Visão Geral do Deploy</CardTitle>
              <CardDescription>O que você vai fazer para colocar o site online</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Github className="h-6 w-6 text-[var(--primary-gold)]" />
                  <span className="font-semibold">1. GitHub</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Database className="h-6 w-6 text-[var(--primary-purple)]" />
                  <span className="font-semibold">2. MongoDB Atlas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Server className="h-6 w-6 text-[var(--primary-gold)]" />
                  <span className="font-semibold">3. Backend (Render)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-6 w-6 text-[var(--primary-purple)]" />
                  <span className="font-semibold">4. Stripe Webhook</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Server className="h-6 w-6 text-[var(--primary-gold)]" />
                  <span className="font-semibold">5. Frontend (Render)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Coins className="h-6 w-6 text-[var(--primary-purple)]" />
                  <span className="font-semibold">6. Smart Contract</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="font-semibold">7. Testar Tudo!</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 1: GitHub */}
          <Card className="card-gradient mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Github className="mr-2 h-5 w-5 text-[var(--primary-gold)]" />
                Passo 1: Enviar para o GitHub
              </CardTitle>
              <CardDescription>Crie um repositório e faça o push do código</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Certifique-se de que todo o código deste projeto (incluindo as pastas `app`, `components`, `public`,
                `contracts`, `scripts`, e os arquivos `package.json`, `next.config.js`, `.env.local`, etc.) esteja em
                um repositório no GitHub.
              </p>
              <p className="text-gray-300 mb-4">
                A pasta `backend` deve estar na raiz do seu repositório, separada do frontend.
              </p>
              <Alert>
                <AlertDescription>
                  Não inclua o arquivo `.env.local` no seu repositório público! Ele contém chaves sensíveis. O
                  `.env.example` é seguro.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Step 2: MongoDB Atlas */}
          <Card className="card-gradient mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5 text-[var(--primary-purple)]" />
                Passo 2: Configurar MongoDB Atlas
              </CardTitle>
              <CardDescription>Crie e configure seu banco de dados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                1. Acesse o{" "}
                <a
                  href="https://cloud.mongodb.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary-gold)] hover:underline"
                >
                  MongoDB Atlas
                </a>{" "}
                e crie uma conta (se ainda não tiver).
              </p>
              <p className="text-gray-300">2. Crie um novo Cluster (escolha a opção gratuita "M0 Sandbox").</p>
              <p className="text-gray-300">
                3. Configure o acesso à rede: Adicione `0.0.0.0/0` (para permitir acesso de qualquer IP, ideal para
                deploy) ou IPs específicos do Render se souber.
              </p>
              <p className="text-gray-300">
                4. Crie um novo usuário de banco de dados (anote o nome de usuário e a senha).
              </p>
              <p className="text-gray-300">
                5. Vá para "Database Access" e clique em "Connect" para o seu cluster. Escolha "Connect your
                application" e copie a "Connection String" (será algo como
                `mongodb+srv://<username>:<password>@cluster.mongodb.net/casinofound?retryWrites=true&w=majority`).
              </p>
              <Alert>
                <AlertDescription>
                  Substitua &lt;username&gt; e &lt;password&gt; na string de conexão pelos dados do usuário que você criou.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Step 3: Deploy do Backend (Render) */}
          <Card className="card-gradient mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5 text-[var(--primary-gold)]" />
                Passo 3: Deploy do Backend no Render
              </CardTitle>
              <CardDescription>Hospede sua API e lógica de base de dados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                1. Acesse o{" "}
                <a
                  href="https://dashboard.render.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary-gold)] hover:underline"
                >
                  Render Dashboard
                </a>{" "}
                e conecte seu repositório GitHub.
              </p>
              <p className="text-gray-300">2. Clique em "New" e selecione "Web Service".</p>
              <p className="text-gray-300">
                3. Escolha o repositório do seu projeto.
                <br />
                • **Root Directory**: `backend` (muito importante!)
                <br />
                • **Build Command**: `npm install`
                <br />
                • **Start Command**: `npm start`
                <br />
                • **Port**: `5000` (conforme definido no `backend/server.js`)
              </p>
              <p className="text-gray-300">
                4. **Variáveis de Ambiente**: Adicione as seguintes variáveis (em "Advanced" → "Environment Variables"):
              </p>
              <div className="bg-[var(--dark-gray)] p-4 rounded-lg space-y-2">
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• `MONGODB_URI` = `sua_connection_string_do_mongodb_atlas`</li>
                  <li>• `JWT_SECRET` = `uma_string_secreta_longa_e_aleatoria`</li>
                  <li>• `ADMIN_PASSWORD` = `sua_senha_para_o_painel_admin`</li>
                  <li>• `STRIPE_SECRET_KEY` = `sk_test_...` (do seu Stripe Dashboard)</li>
                  <li>• `STRIPE_WEBHOOK_SECRET` = `whsec_...` (será gerado no Stripe após configurar o webhook)</li>
                  <li>
                    • `FRONTEND_URL` = `https://seu-frontend.onrender.com` (será o URL do seu frontend após o deploy
                    dele no Render)
                  </li>
                  <li>• `PORT` = `5000`</li>
                </ul>
              </div>
              <p className="text-gray-300 mt-4">
                5. Clique em "Create Web Service". O Render fará o deploy do seu backend. Anote o URL público do
                backend (ex: `https://casinofound-backend.onrender.com`).
              </p>
              <Alert>
                <AlertDescription>
                  O `STRIPE_WEBHOOK_SECRET` será preenchido no próximo passo, mas já pode deixar a variável criada.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Step 4: Configurar Webhook do Stripe */}
          <Card className="card-gradient mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-[var(--primary-purple)]" />
                Passo 4: Configurar Webhook do Stripe
              </CardTitle>
              <CardDescription>Essencial para processar pagamentos com cartão</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 mb-4">
                Use o URL do seu backend Render para configurar o webhook no Stripe.
              </p>
              <div className="bg-[var(--dark-gray)] p-4 rounded-lg">
                <h3 className="font-semibold mb-2">URL do Webhook:</h3>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 text-[var(--primary-gold)] break-all">{backendUrl}/api/stripe/webhook</code>
                  <Button onClick={() => copyToClipboard(`${backendUrl}/api/stripe/webhook`)} size="sm" variant="outline">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-300 mt-4">
                1. Acesse o{" "}
                <a
                  href="https://dashboard.stripe.com/webhooks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary-gold)] hover:underline"
                >
                  Stripe Dashboard - Webhooks
                </a>
                .
              </p>
              <p className="text-gray-300">2. Clique em "Add endpoint".</p>
              <p className="text-gray-300">3. Cole a `URL do Webhook` acima no campo "Endpoint URL".</p>
              <p className="text-gray-300">4. Em "Select events", escolha `checkout.session.completed`.</p>
              <p className="text-gray-300">
                5. Após criar, o Stripe fornecerá um "Signing secret" (começa com `whsec_`). Copie-o.
              </p>
              <p className="text-gray-300">
                6. **Volte para as variáveis de ambiente do seu serviço de Backend no Render** e adicione/atualize
                `STRIPE_WEBHOOK_SECRET` com este valor. O Render fará um novo deploy automaticamente.
              </p>
            </CardContent>
          </Card>

          {/* Step 5: Deploy do Frontend (Render) */}
          <Card className="card-gradient mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5 text-[var(--primary-gold)]" />
                Passo 5: Deploy do Frontend no Render
              </CardTitle>
              <CardDescription>Hospede a interface do usuário</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                1. No Render Dashboard, clique em "New" e selecione "Web Service" novamente.
              </p>
              <p className="text-gray-300">
                2. Escolha o mesmo repositório do seu projeto.
                <br />
                • **Root Directory**: `.` (a raiz do seu repositório, onde está o `package.json` do frontend)
                <br />
                • **Build Command**: `npm install && npm run build`
                <br />
                • **Start Command**: `npm start`
                <br />
                • **Port**: `3000` (conforme definido no `Dockerfile` do frontend)
              </p>
              <p className="text-gray-300">
                3. **Variáveis de Ambiente**: Adicione as seguintes variáveis:
              </p>
              <div className="bg-[var(--dark-gray)] p-4 rounded-lg space-y-2">
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` = `seu_client_id_thirdweb`</li>
                  <li>• `NEXT_PUBLIC_CFD_CONTRACT_ADDRESS` = `0x...` (será atualizado após o deploy do contrato)</li>
                  <li>• `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_test_...` (do seu Stripe Dashboard)</li>
                  <li>
                    • `NEXT_PUBLIC_BACKEND_URL` = `https://seu-backend.onrender.com` (o URL público do seu serviço de
                    backend no Render)
                  </li>
                </ul>
              </div>
              <p className="text-gray-300 mt-4">
                4. Clique em "Create Web Service". O Render fará o deploy do seu frontend. Anote o URL público do
                frontend (ex: `https://casinofound-frontend.onrender.com`).
              </p>
              <Alert>
                <AlertDescription>
                  **Importante**: Volte ao serviço de **Backend** no Render e atualize a variável de ambiente
                  `FRONTEND_URL` com o URL público do seu frontend. Isso é crucial para o Stripe redirecionar
                  corretamente após o pagamento.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Step 6: Deploy Smart Contract */}
          <Card className="card-gradient mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Coins className="mr-2 h-5 w-5 text-[var(--primary-purple)]" />
                Passo 6: Deploy do Smart Contract CFD
              </CardTitle>
              <CardDescription>Publique o token CFD na rede Polygon</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 mb-4">
                Você precisará de uma carteira com MATIC para as taxas de gás e uma API Key do PolygonScan.
              </p>
              <div className="bg-[var(--dark-gray)] p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Instruções de Deploy do Contrato:</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>1. Navegue até a pasta `contracts` no seu projeto (localmente).</li>
                  <li>2. Instale as dependências: `npm install`</li>
                  <li>
                    3. Crie um arquivo `.env` dentro da pasta `contracts` com:
                    <br />
                    `PRIVATE_KEY=sua_private_key_da_wallet`
                    <br />
                    `POLYGONSCAN_API_KEY=sua_api_key_do_polygonscan`
                  </li>
                  <li>4. Compile o contrato: `npx hardhat compile`</li>
                  <li>5. Faça o deploy na Polygon: `npx hardhat run scripts/deploy.js --network polygon`</li>
                  <li>6. O script de deploy irá imprimir o endereço do contrato. Copie-o.</li>
                  <li>
                    7. Verifique o contrato no PolygonScan: `npx hardhat verify --network polygon
                    SEU_ENDERECO_DO_CONTRATO`
                  </li>
                </ul>
              </div>
              <p className="text-gray-300 mt-4">
                Após o deploy do contrato, **volte para as variáveis de ambiente do seu serviço de Frontend no Render**
                e atualize:
              </p>
              <Alert>
                <AlertDescription>
                  <code className="text-[var(--primary-gold)]">NEXT_PUBLIC_CFD_CONTRACT_ADDRESS</code> ={" "}
                  <Input
                    id="contract-address-input"
                    placeholder="Cole o endereço do contrato aqui"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    className="bg-[var(--dark-gray)] border-[var(--primary-purple)] mt-2"
                  />
                  <Button onClick={() => copyToClipboard(contractAddress)} size="sm" variant="outline" className="mt-2">
                    <Copy className="h-4 w-4 mr-2" /> Copiar Endereço
                  </Button>
                </AlertDescription>
              </Alert>
              <p className="text-gray-300 mt-4">
                O Render fará um novo deploy do frontend para aplicar a mudança.
              </p>
            </CardContent>
          </Card>

          {/* Step 7: Testar Tudo */}
          <Card className="card-gradient mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                Passo 7: Testar Tudo!
              </CardTitle>
              <CardDescription>Confirme que todas as funcionalidades estão operacionais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">1. Acesse seu site no Render.</p>
              <p className="text-gray-300">2. Conecte sua carteira Web3 (MetaMask, etc.).</p>
              <p className="text-gray-300">3. Tente comprar tokens com MATIC.</p>
              <p className="text-gray-300">4. Tente comprar tokens com cartão de crédito (Stripe).</p>
              <p className="text-gray-300">
                5. Verifique o dashboard do usuário para ver seus tokens e status de qualificação.
              </p>
              <p className="text-gray-300">
                6. Acesse o painel administrativo (`/admin`) e faça login para ver as estatísticas.
              </p>
              <Alert className="bg-green-900/20 border-green-600/30">
                <AlertDescription className="text-green-300">
                  🎉 Se tudo funcionar, seu site CasinoFound está 100% online e funcional!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button asChild className="btn-primary">
              <a href={frontendUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Ir para o Site (Após Deploy)
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}\

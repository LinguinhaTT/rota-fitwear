# 🔥 Rota Fitwear — E-commerce Premium de Moda Fitness

> Moda Fitness com Propósito — A loja fitness feminina mais moderna do Brasil

## ✨ Stack Tecnológico

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 15 (App Router + Turbopack) |
| UI | React 19 + TypeScript |
| Estilo | Tailwind CSS v3 + Framer Motion |
| Banco | Supabase (PostgreSQL) + Redis Cache |
| Auth | Supabase Auth (Google, Apple, Facebook) |
| Pagamentos | Stripe + Mercado Pago (PIX, Cartão, Boleto) |
| Mídia | Cloudinary |
| Email | Resend + React Email |
| IA | Claude (Anthropic) — Assistente Virtual |
| Deploy | Vercel |
| Analytics | GA4 + Meta Pixel + TikTok Pixel |
| PWA | next-pwa + Workbox |

## 📁 Estrutura do Projeto

```
rota-fitwear/
├── src/
│   ├── app/
│   │   ├── (store)/          # Loja pública
│   │   │   ├── page.tsx      # Homepage
│   │   │   ├── produtos/     # Listagem e detalhe de produtos
│   │   │   ├── categorias/   # Páginas de categorias
│   │   │   ├── carrinho/     # Carrinho de compras
│   │   │   ├── checkout/     # Finalização de compra
│   │   │   ├── conta/        # Área do cliente
│   │   │   ├── blog/         # Blog SEO
│   │   │   └── afiliados/    # Programa de afiliados
│   │   ├── (admin)/          # Painel administrativo
│   │   │   └── admin/        # Dashboard + módulos
│   │   └── api/              # API Routes
│   ├── components/
│   │   ├── layout/           # Header, Footer
│   │   ├── home/             # Seções da homepage
│   │   ├── product/          # Cards, galeria, reviews
│   │   ├── cart/             # Carrinho
│   │   ├── account/          # Área do cliente
│   │   ├── admin/            # Dashboard admin
│   │   ├── ai/               # Assistente virtual
│   │   └── ui/               # Componentes reutilizáveis
│   ├── lib/                  # Integrações (Supabase, Stripe, etc)
│   ├── store/                # Zustand (carrinho, wishlist)
│   ├── types/                # TypeScript types
│   └── styles/               # CSS global
├── supabase/
│   └── migrations/           # Schema PostgreSQL
└── public/
    ├── manifest.json         # PWA manifest
    └── icons/                # Ícones PWA
```

## 🚀 Como Iniciar

### 1. Instalar dependências

```bash
cd rota-fitwear
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.local.example .env.local
# Edite .env.local com suas credenciais
```

### 3. Configurar Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Execute o schema: `supabase/migrations/001_initial_schema.sql`
3. Copie as credenciais para `.env.local`

### 4. Iniciar desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 🔑 Variáveis de Ambiente Necessárias

```env
# Supabase (obrigatório)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Pagamentos (configurar antes de produção)
STRIPE_SECRET_KEY=
MP_ACCESS_TOKEN=

# IA (para assistente virtual)
ANTHROPIC_API_KEY=

# Email
RESEND_API_KEY=
```

## 📱 Funcionalidades

### Loja
- ✅ Homepage premium com Hero video fullscreen
- ✅ Categorias com grid animado
- ✅ Slider de lançamentos
- ✅ Seção mais vendidos com urgência
- ✅ Depoimentos e prova social
- ✅ Feed Instagram comprável
- ✅ Carrinho com frete progressivo
- ✅ Cupons de desconto
- ✅ Página de produto completa
- ✅ Galeria com zoom e troca de imagem
- ✅ Calculadora de tamanho por IA
- ✅ Avaliações e reviews

### Conversão (CRO)
- ✅ Popup exit intent com cupom
- ✅ Notificações de compra em tempo real
- ✅ Urgência inteligente (visualizadores ao vivo)
- ✅ Desconto PIX automático (10%)
- ✅ Parcelamento em destaque
- ✅ Cross-sell no carrinho
- ✅ Compra rápida sem sair da listagem
- ✅ Wishlist

### IA
- ✅ Assistente virtual Ana (Claude)
- ✅ Calculadora de tamanho inteligente
- ✅ Sugestão de look

### Cliente
- ✅ Área do cliente completa
- ✅ Histórico de pedidos
- ✅ Programa de fidelidade (Bronze→Prata→Ouro→Diamante)
- ✅ Carteira digital e cashback
- ✅ Wishlist sincronizada

### Admin
- ✅ Dashboard com métricas em tempo real
- ✅ Alertas de estoque
- ✅ Gestão de pedidos
- ✅ Ranking de produtos

### SEO
- ✅ Schema.org
- ✅ Open Graph / Twitter Cards
- ✅ Sitemap.xml automático
- ✅ Robots.txt
- ✅ Metadados dinâmicos por página
- ✅ SSR + ISR

### PWA
- ✅ Instalável como app
- ✅ Manifest.json completo
- ✅ Ícones PWA

### Analytics
- ✅ Google Analytics 4
- ✅ Meta Pixel
- ✅ TikTok Pixel

## 🎨 Identidade Visual

| Cor | Hex | Uso |
|-----|-----|-----|
| Branco | `#FFFFFF` | Background principal |
| Off White | `#F5F2EE` | Background secundário |
| Nude | `#DCC8B4` | Elementos suaves |
| Terracota | `#C97C5D` | Cor principal / CTA |
| Marrom | `#7D5A4F` | Texto e detalhes |
| Preto | `#111111` | Texto principal |
| Dourado | `#C8A96A` | Premium / Destaque |

## 📦 Deploy na Vercel

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Deploy
vercel

# Produção
vercel --prod
```

Configure as variáveis de ambiente no painel da Vercel.

---

**Rota Fitwear** — Moda Fitness com Propósito 💪✨

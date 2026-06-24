import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroBanner from '@/components/home/HeroBanner'
import Categories from '@/components/home/Categories'
import NewArrivals from '@/components/home/NewArrivals'
import BestSellers from '@/components/home/BestSellers'
import BrandStatement from '@/components/home/BrandStatement'
import SocialProof from '@/components/home/SocialProof'
import InstagramFeed from '@/components/home/InstagramFeed'
import AIAssistant from '@/components/ai/AIAssistant'
import SocialNotifications from '@/components/ui/SocialNotifications'
import ExitIntentPopup from '@/components/ui/ExitIntentPopup'

export const metadata: Metadata = {
  title: 'Rota Fitwear | Moda Fitness com Propósito',
  description: 'Conjuntos fitness premium para mulheres que buscam conforto, estilo e autoestima. Leggings, tops, shorts e muito mais. Frete grátis acima de R$299.',
  openGraph: {
    title: 'Rota Fitwear | Moda Fitness com Propósito',
    description: 'Conjuntos fitness premium para mulheres que buscam conforto, estilo e autoestima.',
  },
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <Categories />
        <NewArrivals />
        <BrandStatement />
        <BestSellers />
        <SocialProof />
        <InstagramFeed />
      </main>
      <Footer />
      <AIAssistant />
      <SocialNotifications />
      <ExitIntentPopup />
    </>
  )
}

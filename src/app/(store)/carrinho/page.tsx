import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartPage from '@/components/cart/CartPage'

export const metadata: Metadata = {
  title: 'Carrinho | Rota Fitwear',
  robots: { index: false },
}

export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-offwhite">
        <CartPage />
      </main>
      <Footer />
    </>
  )
}

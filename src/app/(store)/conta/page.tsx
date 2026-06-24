import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AccountPage from '@/components/account/AccountPage'

export const metadata: Metadata = {
  title: 'Minha Conta | Rota Fitwear',
  robots: { index: false },
}

export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-offwhite">
        <AccountPage />
      </main>
      <Footer />
    </>
  )
}

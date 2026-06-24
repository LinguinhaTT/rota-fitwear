import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductDetail from '@/components/product/ProductDetail'
import ProductReviews from '@/components/product/ProductReviews'
import RelatedProducts from '@/components/product/RelatedProducts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  // In production, fetch product from DB
  const productName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  return {
    title: `${productName} | Rota Fitwear`,
    description: `${productName} - Moda fitness premium com qualidade superior. Compre agora na Rota Fitwear.`,
    openGraph: {
      title: `${productName} | Rota Fitwear`,
      images: [{ url: `/og-product.jpg`, width: 1200, height: 630 }],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <ProductDetail slug={slug} />
        <ProductReviews />
        <RelatedProducts />
      </main>
      <Footer />
    </>
  )
}

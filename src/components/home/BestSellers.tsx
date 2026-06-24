'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Flame, TrendingUp, Star } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import type { Product } from '@/types'

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Conjunto Fitness Ultra Soft Premium',
    slug: 'conjunto-fitness-ultra-soft-premium',
    description: 'Conjunto premium de altíssima qualidade com tecido ultra soft...',
    price: 289.90,
    compare_price: 389.90,
    sku: 'CF-001',
    category_id: '1',
    category: { id: '1', name: 'Conjuntos', slug: 'conjuntos', sort_order: 1, is_active: true, created_at: '', updated_at: '' },
    images: [{ id: '1', product_id: '1', url: '/images/product-1.jpg', sort_order: 1, is_primary: true }],
    variants: [
      { id: '1', product_id: '1', sku: 'CF-001-P', size: 'P', color: 'Terracota', color_hex: '#C97C5D', stock: 12, weight: 0.3 },
      { id: '2', product_id: '1', sku: 'CF-001-M', size: 'M', color: 'Terracota', color_hex: '#C97C5D', stock: 8, weight: 0.3 },
      { id: '3', product_id: '1', sku: 'CF-001-G', size: 'G', color: 'Nude', color_hex: '#DCC8B4', stock: 5, weight: 0.3 },
    ],
    tags: ['conjunto', 'fitness', 'premium'],
    status: 'active',
    is_featured: true,
    is_new: false,
    is_best_seller: true,
    sold_count: 847,
    view_count: 3421,
    rating_avg: 4.9,
    rating_count: 312,
    pix_discount_percent: 10,
    created_at: '',
    updated_at: '',
  },
  {
    id: '2',
    name: 'Legging Sculpt Control Cintura Alta',
    slug: 'legging-sculpt-control-cintura-alta',
    description: 'Legging com tecnologia sculpt que modela e controla...',
    price: 159.90,
    compare_price: 219.90,
    sku: 'LE-001',
    category_id: '2',
    category: { id: '2', name: 'Leggings', slug: 'leggings', sort_order: 2, is_active: true, created_at: '', updated_at: '' },
    images: [{ id: '2', product_id: '2', url: '/images/product-2.jpg', sort_order: 1, is_primary: true }],
    variants: [
      { id: '4', product_id: '2', sku: 'LE-001-P', size: 'P', color: 'Preto', color_hex: '#111111', stock: 20, weight: 0.25 },
      { id: '5', product_id: '2', sku: 'LE-001-M', size: 'M', color: 'Marrom', color_hex: '#7D5A4F', stock: 15, weight: 0.25 },
    ],
    tags: ['legging', 'cintura alta', 'sculpt'],
    status: 'active',
    is_featured: true,
    is_new: true,
    is_best_seller: true,
    sold_count: 1203,
    view_count: 5678,
    rating_avg: 4.8,
    rating_count: 456,
    pix_discount_percent: 10,
    created_at: '',
    updated_at: '',
  },
  {
    id: '3',
    name: 'Top Fitness Sustentação Premium',
    slug: 'top-fitness-sustentacao-premium',
    description: 'Top com sustentação máxima para treinos de alto impacto...',
    price: 129.90,
    compare_price: 169.90,
    sku: 'TP-001',
    category_id: '3',
    category: { id: '3', name: 'Tops', slug: 'tops', sort_order: 3, is_active: true, created_at: '', updated_at: '' },
    images: [{ id: '3', product_id: '3', url: '/images/product-3.jpg', sort_order: 1, is_primary: true }],
    variants: [
      { id: '6', product_id: '3', sku: 'TP-001-P', size: 'P', color: 'Terracota', color_hex: '#C97C5D', stock: 18, weight: 0.15 },
      { id: '7', product_id: '3', sku: 'TP-001-M', size: 'M', color: 'Nude', color_hex: '#DCC8B4', stock: 22, weight: 0.15 },
    ],
    tags: ['top', 'fitness', 'sustentação'],
    status: 'active',
    is_featured: false,
    is_new: false,
    is_best_seller: true,
    sold_count: 956,
    view_count: 4123,
    rating_avg: 4.7,
    rating_count: 287,
    pix_discount_percent: 10,
    created_at: '',
    updated_at: '',
  },
  {
    id: '4',
    name: 'Short Fitness Run Performance',
    slug: 'short-fitness-run-performance',
    description: 'Short ideal para corrida e treinos funcionais...',
    price: 119.90,
    compare_price: 159.90,
    sku: 'SH-001',
    category_id: '4',
    category: { id: '4', name: 'Shorts', slug: 'shorts', sort_order: 4, is_active: true, created_at: '', updated_at: '' },
    images: [{ id: '4', product_id: '4', url: '/images/product-4.jpg', sort_order: 1, is_primary: true }],
    variants: [
      { id: '8', product_id: '4', sku: 'SH-001-P', size: 'P', color: 'Preto', color_hex: '#111111', stock: 30, weight: 0.2 },
      { id: '9', product_id: '4', sku: 'SH-001-M', size: 'M', color: 'Terracota', color_hex: '#C97C5D', stock: 25, weight: 0.2 },
    ],
    tags: ['short', 'corrida', 'performance'],
    status: 'active',
    is_featured: false,
    is_new: true,
    is_best_seller: false,
    sold_count: 423,
    view_count: 2100,
    rating_avg: 4.6,
    rating_count: 143,
    pix_discount_percent: 10,
    created_at: '',
    updated_at: '',
  },
]

export default function BestSellers() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [viewerCount, setViewerCount] = useState(37)

  // Simulate real-time viewers
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => {
        const change = Math.floor(Math.random() * 5) - 2
        return Math.max(25, Math.min(60, prev + change))
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="section" ref={ref}>
      <div className="container-brand">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-brand-terracota" />
              <span className="text-sm font-semibold text-brand-terracota uppercase tracking-wider">
                Mais Vendidos
              </span>
            </div>
            <h2 className="section-title mb-3">
              As favoritas das{' '}
              <span className="text-gradient-brand italic">nossas clientes</span>
            </h2>
            <div className="divider-brand mb-3" />
            <p className="section-subtitle">
              Peças mais amadas, avaliadas e recomendadas
            </p>
          </div>

          {/* Live Indicator */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-brand-offwhite border border-brand-nude/30">
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="absolute inset-0 bg-brand-terracota/20 rounded-full animate-ping" />
              <div className="relative w-3 h-3 bg-brand-terracota rounded-full" />
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-preto">
                🔥 {viewerCount} pessoas visualizando agora
              </p>
              <p className="text-xs text-brand-marrom/60">Atualizado em tempo real</p>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {MOCK_PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ProductCard product={product} priority={idx < 2} />
            </motion.div>
          ))}
        </div>

        {/* Urgency Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-brand-terracota to-brand-marrom text-white flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="font-display text-lg font-bold">Frete Grátis hoje!</p>
              <p className="text-white/80 text-sm">Nas compras acima de R$299 • Válido até meia-noite</p>
            </div>
          </div>
          <a href="/produtos" className="btn-gold shrink-0">
            Ver Todos os Produtos
          </a>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import ProductCard from '@/components/product/ProductCard'
import type { Product } from '@/types'

const NEW_ARRIVALS: Product[] = [
  {
    id: '5', name: 'Legging Define Tudo Marmorizada', slug: 'legging-define-tudo-marmorizada',
    description: 'Legging com estampa marmorizada exclusiva...', price: 189.90, compare_price: 249.90,
    sku: 'LE-002', category_id: '2',
    category: { id: '2', name: 'Leggings', slug: 'leggings', sort_order: 2, is_active: true, created_at: '', updated_at: '' },
    images: [{ id: '5', product_id: '5', url: '/images/product-5.jpg', sort_order: 1, is_primary: true }],
    variants: [{ id: '10', product_id: '5', sku: 'LE-002-P', size: 'P', color: 'Marrom', color_hex: '#7D5A4F', stock: 10, weight: 0.25 }],
    tags: ['legging', 'marmorizada'], status: 'active', is_featured: false, is_new: true, is_best_seller: false,
    sold_count: 89, view_count: 542, rating_avg: 4.8, rating_count: 34, pix_discount_percent: 10, created_at: '', updated_at: '',
  },
  {
    id: '6', name: 'Conjunto Veludo Luxo Premium', slug: 'conjunto-veludo-luxo-premium',
    description: 'Conjunto em veludo de altíssima qualidade...', price: 349.90, compare_price: 449.90,
    sku: 'CF-002', category_id: '1',
    category: { id: '1', name: 'Conjuntos', slug: 'conjuntos', sort_order: 1, is_active: true, created_at: '', updated_at: '' },
    images: [{ id: '6', product_id: '6', url: '/images/product-6.jpg', sort_order: 1, is_primary: true }],
    variants: [{ id: '11', product_id: '6', sku: 'CF-002-M', size: 'M', color: 'Nude', color_hex: '#DCC8B4', stock: 6, weight: 0.4 }],
    tags: ['conjunto', 'veludo', 'luxo'], status: 'active', is_featured: true, is_new: true, is_best_seller: false,
    sold_count: 45, view_count: 1203, rating_avg: 5.0, rating_count: 12, pix_discount_percent: 10, created_at: '', updated_at: '',
  },
  {
    id: '7', name: 'Macaquinho Fitness Elegance', slug: 'macaquinho-fitness-elegance',
    description: 'Macaquinho elegante para treinos e uso casual...', price: 219.90, compare_price: 289.90,
    sku: 'MA-001', category_id: '6',
    category: { id: '6', name: 'Macaquinhos', slug: 'macaquinhos', sort_order: 6, is_active: true, created_at: '', updated_at: '' },
    images: [{ id: '7', product_id: '7', url: '/images/product-7.jpg', sort_order: 1, is_primary: true }],
    variants: [{ id: '12', product_id: '7', sku: 'MA-001-G', size: 'G', color: 'Preto', color_hex: '#111111', stock: 14, weight: 0.3 }],
    tags: ['macaquinho', 'elegance'], status: 'active', is_featured: false, is_new: true, is_best_seller: false,
    sold_count: 78, view_count: 876, rating_avg: 4.9, rating_count: 28, pix_discount_percent: 10, created_at: '', updated_at: '',
  },
  {
    id: '8', name: 'Top Slim Cut Sporty', slug: 'top-slim-cut-sporty',
    description: 'Top slim com corte esportivo e design moderno...', price: 109.90, compare_price: 149.90,
    sku: 'TP-002', category_id: '3',
    category: { id: '3', name: 'Tops', slug: 'tops', sort_order: 3, is_active: true, created_at: '', updated_at: '' },
    images: [{ id: '8', product_id: '8', url: '/images/product-8.jpg', sort_order: 1, is_primary: true }],
    variants: [{ id: '13', product_id: '8', sku: 'TP-002-P', size: 'P', color: 'Terracota', color_hex: '#C97C5D', stock: 20, weight: 0.12 }],
    tags: ['top', 'slim', 'sporty'], status: 'active', is_featured: false, is_new: true, is_best_seller: false,
    sold_count: 234, view_count: 1567, rating_avg: 4.7, rating_count: 89, pix_discount_percent: 10, created_at: '', updated_at: '',
  },
  {
    id: '9', name: 'Legging Ribbed Sensation', slug: 'legging-ribbed-sensation',
    description: 'Legging texturizada com efeito canelado premium...', price: 169.90,
    sku: 'LE-003', category_id: '2',
    category: { id: '2', name: 'Leggings', slug: 'leggings', sort_order: 2, is_active: true, created_at: '', updated_at: '' },
    images: [{ id: '9', product_id: '9', url: '/images/product-9.jpg', sort_order: 1, is_primary: true }],
    variants: [{ id: '14', product_id: '9', sku: 'LE-003-M', size: 'M', color: 'Marrom', color_hex: '#7D5A4F', stock: 8, weight: 0.25 }],
    tags: ['legging', 'ribbed'], status: 'active', is_featured: false, is_new: true, is_best_seller: false,
    sold_count: 156, view_count: 987, rating_avg: 4.8, rating_count: 67, pix_discount_percent: 10, created_at: '', updated_at: '',
  },
]

export default function NewArrivals() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="section bg-brand-offwhite overflow-hidden" ref={ref}>
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
              <Sparkles className="w-5 h-5 text-brand-dourado" />
              <span className="text-sm font-semibold text-brand-dourado uppercase tracking-wider">
                Lançamentos
              </span>
            </div>
            <h2 className="section-title mb-3">
              Novidades que{' '}
              <span className="text-gradient-gold italic">você vai amar</span>
            </h2>
            <div className="divider-brand mb-3" />
            <p className="section-subtitle">
              Peças recém-chegadas, exclusivas e com edição limitada
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-11 h-11 rounded-full bg-white border border-brand-nude/30 flex items-center justify-center text-brand-preto hover:bg-brand-terracota hover:text-white hover:border-brand-terracota transition-all duration-200 shadow-card"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-11 h-11 rounded-full bg-white border border-brand-nude/30 flex items-center justify-center text-brand-preto hover:bg-brand-terracota hover:text-white hover:border-brand-terracota transition-all duration-200 shadow-card"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Swiper */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            onSwiper={(swiper) => { swiperRef.current = swiper }}
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1.2}
            spaceBetween={16}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            breakpoints={{
              480: { slidesPerView: 2.2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            className="!pb-8"
          >
            {NEW_ARRIVALS.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}

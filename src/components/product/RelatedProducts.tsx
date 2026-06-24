'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import type { Product } from '@/types'

// Mock related products
const RELATED: Product[] = [
  {
    id: '2', name: 'Legging Sculpt Control Cintura Alta', slug: 'legging-sculpt-control-cintura-alta',
    description: '', price: 159.90, compare_price: 219.90, sku: 'LE-001', category_id: '2',
    category: { id: '2', name: 'Leggings', slug: 'leggings', sort_order: 2, is_active: true, created_at: '', updated_at: '' },
    images: [{ id: '2', product_id: '2', url: '/images/product-2.jpg', sort_order: 1, is_primary: true }],
    variants: [{ id: '4', product_id: '2', sku: 'LE-001-M', size: 'M', color: 'Preto', color_hex: '#111111', stock: 20, weight: 0.25 }],
    tags: [], status: 'active', is_featured: false, is_new: true, is_best_seller: true,
    sold_count: 1203, view_count: 5678, rating_avg: 4.8, rating_count: 456, pix_discount_percent: 10, created_at: '', updated_at: '',
  },
  {
    id: '3', name: 'Top Fitness Sustentação Premium', slug: 'top-fitness-sustentacao-premium',
    description: '', price: 129.90, compare_price: 169.90, sku: 'TP-001', category_id: '3',
    category: { id: '3', name: 'Tops', slug: 'tops', sort_order: 3, is_active: true, created_at: '', updated_at: '' },
    images: [{ id: '3', product_id: '3', url: '/images/product-3.jpg', sort_order: 1, is_primary: true }],
    variants: [{ id: '6', product_id: '3', sku: 'TP-001-M', size: 'M', color: 'Terracota', color_hex: '#C97C5D', stock: 18, weight: 0.15 }],
    tags: [], status: 'active', is_featured: false, is_new: false, is_best_seller: true,
    sold_count: 956, view_count: 4123, rating_avg: 4.7, rating_count: 287, pix_discount_percent: 10, created_at: '', updated_at: '',
  },
  {
    id: '6', name: 'Conjunto Veludo Luxo Premium', slug: 'conjunto-veludo-luxo-premium',
    description: '', price: 349.90, compare_price: 449.90, sku: 'CF-002', category_id: '1',
    category: { id: '1', name: 'Conjuntos', slug: 'conjuntos', sort_order: 1, is_active: true, created_at: '', updated_at: '' },
    images: [{ id: '6', product_id: '6', url: '/images/product-6.jpg', sort_order: 1, is_primary: true }],
    variants: [{ id: '11', product_id: '6', sku: 'CF-002-M', size: 'M', color: 'Nude', color_hex: '#DCC8B4', stock: 6, weight: 0.4 }],
    tags: [], status: 'active', is_featured: true, is_new: true, is_best_seller: false,
    sold_count: 45, view_count: 1203, rating_avg: 5.0, rating_count: 12, pix_discount_percent: 10, created_at: '', updated_at: '',
  },
  {
    id: '4', name: 'Short Fitness Run Performance', slug: 'short-fitness-run-performance',
    description: '', price: 119.90, compare_price: 159.90, sku: 'SH-001', category_id: '4',
    category: { id: '4', name: 'Shorts', slug: 'shorts', sort_order: 4, is_active: true, created_at: '', updated_at: '' },
    images: [{ id: '4', product_id: '4', url: '/images/product-4.jpg', sort_order: 1, is_primary: true }],
    variants: [{ id: '8', product_id: '4', sku: 'SH-001-M', size: 'M', color: 'Preto', color_hex: '#111111', stock: 30, weight: 0.2 }],
    tags: [], status: 'active', is_featured: false, is_new: true, is_best_seller: false,
    sold_count: 423, view_count: 2100, rating_avg: 4.6, rating_count: 143, pix_discount_percent: 10, created_at: '', updated_at: '',
  },
]

export default function RelatedProducts() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="container-brand py-16 border-t border-brand-nude/20" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <h2 className="section-title mb-2">
          Complete seu{' '}
          <span className="text-gradient-brand italic">look</span>
        </h2>
        <div className="divider-brand" />
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {RELATED.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, Eye, Star, Zap, Users } from 'lucide-react'
import { toast } from 'sonner'
import type { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { formatCurrency, formatDiscount } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  priority?: boolean
  showQuickBuy?: boolean
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? 'fill-brand-dourado text-brand-dourado' : 'text-brand-nude/40'}`}
          />
        ))}
      </div>
      <span className="text-xs text-brand-marrom/60">({count})</span>
    </div>
  )
}

export default function ProductCard({ product, priority = false, showQuickBuy = true }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showColors, setShowColors] = useState(false)

  const addItem = useCartStore((s) => s.addItem)
  const toggleItem = useWishlistStore((s) => s.toggleItem)
  const hasItem = useWishlistStore((s) => s.hasItem)

  const isInWishlist = hasItem(product.id)
  const hasDiscount = product.compare_price && product.compare_price > product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.compare_price! - product.price) / product.compare_price!) * 100)
    : 0
  const pixPrice = product.price * 0.9
  const uniqueColors = [...new Set(product.variants?.map((v) => v.color) || [])]
  const primaryImage = product.images?.[0]?.url || '/images/product-placeholder.jpg'
  const secondImage = product.images?.[1]?.url || primaryImage

  const handleWishlist = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const added = toggleItem(product)
      toast[added ? 'success' : 'info'](
        added ? `${product.name} adicionado aos favoritos!` : `${product.name} removido dos favoritos`,
        { duration: 2000 }
      )
    },
    [product, toggleItem]
  )

  const handleQuickAdd = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!product.variants?.length) return

      setIsAddingToCart(true)
      await new Promise((r) => setTimeout(r, 600))
      addItem(product, product.variants[0], 1)
      setIsAddingToCart(false)
      toast.success(`${product.name} adicionado ao carrinho!`, {
        duration: 3000,
        action: { label: 'Ver Carrinho', onClick: () => (window.location.href = '/carrinho') },
      })
    },
    [product, addItem]
  )

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="product-card group"
    >
      <Link href={`/produtos/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="product-card-image">
          {/* Main Image */}
          <div
            className="absolute inset-0"
            onMouseEnter={() => setCurrentImageIndex(1)}
            onMouseLeave={() => setCurrentImageIndex(0)}
          >
            <AnimatePresence mode="crossfade">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${currentImageIndex === 0 ? primaryImage : secondImage})`,
                    backgroundColor: '#F5F2EE',
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
            {product.is_new && <span className="badge-new">Novo</span>}
            {product.is_best_seller && <span className="badge-bestseller">🔥 Hot</span>}
            {hasDiscount && <span className="badge-sale">-{discountPercent}%</span>}
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlist}
              className={`w-9 h-9 rounded-full flex items-center justify-center shadow-card transition-all duration-200 ${
                isInWishlist ? 'bg-brand-terracota text-white' : 'bg-white text-brand-preto hover:bg-brand-terracota hover:text-white'
              }`}
              aria-label={isInWishlist ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
            </motion.button>
            <Link
              href={`/produtos/${product.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="w-9 h-9 rounded-full bg-white text-brand-preto flex items-center justify-center shadow-card hover:bg-brand-terracota hover:text-white transition-all duration-200"
              aria-label="Ver produto"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Buy */}
          {showQuickBuy && (
            <div className="absolute inset-x-0 bottom-0 z-10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button
                onClick={handleQuickAdd}
                disabled={isAddingToCart}
                className="w-full py-3.5 bg-brand-preto/90 backdrop-blur-sm text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-brand-terracota transition-colors duration-200"
              >
                {isAddingToCart ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Compra Rápida
                  </>
                )}
              </button>
            </div>
          )}

          {/* Social Proof */}
          {product.view_count > 20 && (
            <div className="absolute bottom-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-medium text-brand-preto">
                <Users className="w-3 h-3 text-brand-terracota" />
                <span>{product.view_count} pessoas vendo</span>
              </div>
            </div>
          )}
        </div>

        {/* Card Info */}
        <div className="p-4">
          {/* Category */}
          {product.category && (
            <p className="text-[11px] font-medium text-brand-terracota uppercase tracking-wider mb-1">
              {product.category.name}
            </p>
          )}

          {/* Name */}
          <h3 className="font-medium text-brand-preto text-sm leading-snug mb-2 line-clamp-2 group-hover:text-brand-terracota transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating_count > 0 && (
            <div className="mb-2">
              <StarRating rating={product.rating_avg} count={product.rating_count} />
            </div>
          )}

          {/* Colors */}
          {uniqueColors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-3">
              {uniqueColors.slice(0, 5).map((color, i) => {
                const variant = product.variants?.find((v) => v.color === color)
                return (
                  <div
                    key={color}
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm ring-1 ring-brand-nude/30 hover:ring-brand-terracota cursor-pointer transition-all"
                    style={{ backgroundColor: variant?.color_hex || '#DCC8B4' }}
                    title={color}
                  />
                )
              })}
              {uniqueColors.length > 5 && (
                <span className="text-xs text-brand-marrom/60">+{uniqueColors.length - 5}</span>
              )}
            </div>
          )}

          {/* Pricing */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="price-current text-base">
                {formatCurrency(product.price)}
              </span>
              {hasDiscount && (
                <span className="price-original">
                  {formatCurrency(product.compare_price!)}
                </span>
              )}
            </div>
            <p className="price-pix text-xs">
              <Zap className="w-3 h-3 inline mr-0.5" />
              {formatCurrency(pixPrice)} no PIX (10% off)
            </p>
            <p className="text-[11px] text-brand-marrom/50">
              ou 12x de {formatCurrency(product.price / 12)} sem juros
            </p>
          </div>

          {/* Sold */}
          {product.sold_count > 10 && (
            <div className="mt-2 text-[11px] text-brand-marrom/50">
              ✓ {product.sold_count}+ vendidos
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  )
}

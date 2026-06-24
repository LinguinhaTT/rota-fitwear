'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart, ShoppingBag, Zap, Star, Truck, RotateCcw,
  Shield, Share2, ChevronLeft, ChevronRight, ZoomIn,
  Ruler, Package, Users, AlertCircle, CheckCircle
} from 'lucide-react'
import { toast } from 'sonner'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { formatCurrency } from '@/lib/utils'
import SizeCalculator from './SizeCalculator'
import type { Product, ProductVariant } from '@/types'

// Mock product data — in production, fetch from Supabase
const MOCK_PRODUCT: Product = {
  id: '1',
  name: 'Conjunto Fitness Ultra Soft Premium',
  slug: 'conjunto-fitness-ultra-soft-premium',
  description: `
    O Conjunto Fitness Ultra Soft Premium é a escolha perfeita para mulheres que buscam conforto e estilo durante os treinos.
    Confeccionado com tecido Ultra Soft de alta tecnologia, proporciona toque suave na pele e liberdade total de movimentos.

    A legging de cintura alta modela e define a silhueta, enquanto o top com sustentação média é ideal para treinos moderados e yoga.

    O tecido com proteção UV 50+ é resistente ao cloro, perfeito para natação e hidroginástica.
  `,
  short_description: 'Conjunto premium em tecido Ultra Soft com legging cintura alta e top de sustentação.',
  price: 289.90,
  compare_price: 389.90,
  sku: 'CF-001',
  category_id: '1',
  category: { id: '1', name: 'Conjuntos', slug: 'conjuntos', sort_order: 1, is_active: true, created_at: '', updated_at: '' },
  images: [
    { id: '1', product_id: '1', url: '/images/product-detail-1.jpg', alt: 'Frente', sort_order: 1, is_primary: true },
    { id: '2', product_id: '1', url: '/images/product-detail-2.jpg', alt: 'Costas', sort_order: 2, is_primary: false },
    { id: '3', product_id: '1', url: '/images/product-detail-3.jpg', alt: 'Detalhe', sort_order: 3, is_primary: false },
    { id: '4', product_id: '1', url: '/images/product-detail-4.jpg', alt: 'Look completo', sort_order: 4, is_primary: false },
  ],
  variants: [
    { id: '1', product_id: '1', sku: 'CF-001-PP-TER', size: 'PP', color: 'Terracota', color_hex: '#C97C5D', stock: 3, weight: 0.3 },
    { id: '2', product_id: '1', sku: 'CF-001-P-TER', size: 'P', color: 'Terracota', color_hex: '#C97C5D', stock: 12, weight: 0.3 },
    { id: '3', product_id: '1', sku: 'CF-001-M-TER', size: 'M', color: 'Terracota', color_hex: '#C97C5D', stock: 8, weight: 0.3 },
    { id: '4', product_id: '1', sku: 'CF-001-G-TER', size: 'G', color: 'Terracota', color_hex: '#C97C5D', stock: 5, weight: 0.3 },
    { id: '5', product_id: '1', sku: 'CF-001-PP-NUD', size: 'PP', color: 'Nude', color_hex: '#DCC8B4', stock: 0, weight: 0.3 },
    { id: '6', product_id: '1', sku: 'CF-001-P-NUD', size: 'P', color: 'Nude', color_hex: '#DCC8B4', stock: 7, weight: 0.3 },
    { id: '7', product_id: '1', sku: 'CF-001-M-NUD', size: 'M', color: 'Nude', color_hex: '#DCC8B4', stock: 10, weight: 0.3 },
    { id: '8', product_id: '1', sku: 'CF-001-G-NUD', size: 'G', color: 'Nude', color_hex: '#DCC8B4', stock: 6, weight: 0.3 },
  ],
  tags: ['conjunto', 'ultra soft', 'premium', 'cintura alta'],
  material: '82% Poliamida, 18% Elastano | Proteção UV 50+',
  care_instructions: 'Lavar à mão ou máquina em água fria. Não usar alvejante. Secar à sombra.',
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
}

const SIZES = ['PP', 'P', 'M', 'G', 'GG']

export default function ProductDetail({ slug }: { slug: string }) {
  const product = MOCK_PRODUCT // In production: fetch from API/DB
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showSizeCalc, setShowSizeCalc] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  const addItem = useCartStore((s) => s.addItem)
  const toggleItem = useWishlistStore((s) => s.toggleItem)
  const isInWishlist = useWishlistStore((s) => s.hasItem(product.id))

  const uniqueColors = [...new Set(product.variants.map((v) => v.color))]
  const availableSizes = selectedColor
    ? product.variants.filter((v) => v.color === selectedColor && v.stock > 0).map((v) => v.size)
    : product.variants.filter((v) => v.stock > 0).map((v) => v.size)

  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  )
  const isOutOfStock = selectedVariant ? selectedVariant.stock === 0 : false
  const isLowStock = selectedVariant ? selectedVariant.stock > 0 && selectedVariant.stock <= 5 : false

  const hasDiscount = product.compare_price && product.compare_price > product.price
  const discountPercent = hasDiscount ? Math.round(((product.compare_price! - product.price) / product.compare_price!) * 100) : 0
  const pixPrice = product.price * 0.9

  const handleAddToCart = useCallback(async () => {
    if (!selectedSize) {
      toast.error('Selecione um tamanho')
      return
    }
    if (!selectedColor) {
      toast.error('Selecione uma cor')
      return
    }
    if (!selectedVariant) return
    if (isOutOfStock) {
      toast.error('Produto esgotado')
      return
    }

    setIsAddingToCart(true)
    await new Promise((r) => setTimeout(r, 600))
    addItem(product, selectedVariant, quantity)
    setIsAddingToCart(false)

    toast.success(`${product.name} adicionado ao carrinho!`, {
      duration: 4000,
      action: { label: 'Ver Carrinho', onClick: () => (window.location.href = '/carrinho') },
    })
  }, [selectedSize, selectedColor, selectedVariant, isOutOfStock, product, addItem, quantity])

  const handleBuyNow = async () => {
    await handleAddToCart()
    if (selectedSize && selectedColor) {
      window.location.href = '/checkout'
    }
  }

  return (
    <div className="container-brand py-8 md:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-brand-marrom/60 mb-8">
        <Link href="/" className="hover:text-brand-terracota transition-colors">Início</Link>
        <span>/</span>
        <Link href="/produtos" className="hover:text-brand-terracota transition-colors">Produtos</Link>
        <span>/</span>
        <Link href={`/categorias/${product.category?.slug}`} className="hover:text-brand-terracota transition-colors">
          {product.category?.name}
        </Link>
        <span>/</span>
        <span className="text-brand-preto truncate">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">
        {/* Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-brand-offwhite group">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${product.images[selectedImage]?.url || '/images/product-placeholder.jpg'})`,
                backgroundColor: '#F5F2EE',
              }}
            />

            {/* Zoom button */}
            <button
              onClick={() => setIsZoomed(true)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ZoomIn className="w-4 h-4 text-brand-preto" />
            </button>

            {/* Nav arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage((i) => (i - 1 + product.images.length) % product.images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedImage((i) => (i + 1) % product.images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {hasDiscount && <span className="badge-sale">-{discountPercent}%</span>}
              {product.is_best_seller && <span className="badge-bestseller">🔥 Mais Vendido</span>}
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
              {product.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-20 h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === idx ? 'border-brand-terracota shadow-brand' : 'border-transparent hover:border-brand-nude'
                  }`}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${img.url})`, backgroundColor: '#F5F2EE' }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          {/* Category & Title */}
          <div>
            <Link href={`/categorias/${product.category?.slug}`} className="text-sm font-semibold text-brand-terracota uppercase tracking-wider hover:underline">
              {product.category?.name}
            </Link>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-preto mt-2 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-3">
              <div className="stars">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating_avg) ? 'fill-brand-dourado text-brand-dourado' : 'text-brand-nude/30'}`} />
                ))}
              </div>
              <span className="text-sm font-semibold text-brand-preto">{product.rating_avg}</span>
              <a href="#reviews" className="text-sm text-brand-marrom/60 hover:text-brand-terracota">
                ({product.rating_count} avaliações)
              </a>
              <span className="text-sm text-brand-marrom/50">• {product.sold_count}+ vendidos</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-5 rounded-2xl bg-brand-offwhite">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-display text-3xl font-bold text-brand-preto">
                {formatCurrency(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-brand-nude/70 line-through text-lg font-normal">
                  {formatCurrency(product.compare_price!)}
                </span>
              )}
              {hasDiscount && <span className="badge-sale">-{discountPercent}%</span>}
            </div>
            <div className="flex items-center gap-1.5 text-green-600 font-semibold mb-1">
              <Zap className="w-4 h-4" />
              <span>{formatCurrency(pixPrice)} no PIX (10% OFF)</span>
            </div>
            <p className="text-sm text-brand-marrom/60">
              ou 12x de {formatCurrency(product.price / 12)} sem juros no cartão
            </p>
          </div>

          {/* Color Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-brand-preto text-sm">
                Cor: <span className="font-normal text-brand-marrom/70">{selectedColor || 'Selecione'}</span>
              </span>
            </div>
            <div className="flex gap-3">
              {uniqueColors.map((color) => {
                const variant = product.variants.find((v) => v.color === color)
                const isAvailable = product.variants.some((v) => v.color === color && v.stock > 0)
                return (
                  <button
                    key={color}
                    onClick={() => { setSelectedColor(color); setSelectedSize('') }}
                    disabled={!isAvailable}
                    title={color}
                    className={`relative w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === color
                        ? 'border-brand-terracota scale-110 shadow-brand'
                        : isAvailable
                          ? 'border-white shadow-card hover:border-brand-terracota hover:scale-105'
                          : 'border-brand-nude/20 opacity-40 cursor-not-allowed'
                    }`}
                    style={{ backgroundColor: variant?.color_hex || '#DCC8B4' }}
                  >
                    {!isAvailable && (
                      <div className="absolute inset-0 rounded-full flex items-center justify-center">
                        <div className="w-full h-0.5 bg-white/60 rotate-45 rounded-full" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-brand-preto text-sm">
                Tamanho: <span className="font-normal text-brand-marrom/70">{selectedSize || 'Selecione'}</span>
              </span>
              <button
                onClick={() => setShowSizeCalc(!showSizeCalc)}
                className="flex items-center gap-1.5 text-sm text-brand-terracota font-medium hover:underline"
              >
                <Ruler className="w-4 h-4" />
                Calcular tamanho
              </button>
            </div>

            {/* Size Calculator */}
            <AnimatePresence>
              {showSizeCalc && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 overflow-hidden"
                >
                  <SizeCalculator onSizeSelected={(size) => { setSelectedSize(size); setShowSizeCalc(false) }} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => {
                const isAvailable = availableSizes.includes(size)
                const variant = product.variants.find((v) => v.size === size && (selectedColor ? v.color === selectedColor : true))
                const isLow = variant && variant.stock > 0 && variant.stock <= 3

                return (
                  <button
                    key={size}
                    onClick={() => isAvailable && setSelectedSize(size)}
                    disabled={!isAvailable}
                    className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-brand-terracota bg-brand-terracota text-white shadow-brand'
                        : isAvailable
                          ? 'border-brand-nude/40 text-brand-preto hover:border-brand-terracota hover:text-brand-terracota'
                          : 'border-brand-nude/20 text-brand-nude/40 cursor-not-allowed line-through'
                    }`}
                  >
                    {size}
                    {isLow && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white" title={`Apenas ${variant?.stock} restantes`} />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Stock Alert */}
          {selectedVariant && (
            <AnimatePresence>
              {isLowStock && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Apenas <strong>{selectedVariant.stock} unidades</strong> disponíveis!</span>
                </motion.div>
              )}
              {isOutOfStock && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Este tamanho está <strong>esgotado</strong>.</span>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Quantity + Add to Cart */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              {/* Quantity */}
              <div className="flex items-center border-2 border-brand-nude/30 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-brand-preto hover:bg-brand-offwhite transition-colors font-bold"
                >
                  −
                </button>
                <span className="px-4 py-3 font-semibold text-brand-preto min-w-[50px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="px-4 py-3 text-brand-preto hover:bg-brand-offwhite transition-colors font-bold"
                >
                  +
                </button>
              </div>

              {/* Wishlist */}
              <button
                onClick={() => {
                  const added = toggleItem(product)
                  toast[added ? 'success' : 'info'](added ? 'Adicionado aos favoritos!' : 'Removido dos favoritos')
                }}
                className={`w-13 h-13 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                  isInWishlist
                    ? 'border-brand-terracota bg-brand-terracota text-white'
                    : 'border-brand-nude/40 text-brand-preto hover:border-brand-terracota'
                } px-4 py-3`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>

              {/* Share */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  toast.success('Link copiado!')
                }}
                className="px-4 py-3 rounded-xl border-2 border-brand-nude/40 text-brand-preto hover:border-brand-terracota transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart || isOutOfStock}
              className="w-full btn-primary text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingToCart ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : isOutOfStock ? (
                'Esgotado'
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  Adicionar ao Carrinho
                </>
              )}
            </button>

            {/* Buy Now */}
            <button
              onClick={handleBuyNow}
              disabled={isAddingToCart || isOutOfStock}
              className="w-full btn-gold text-base py-4 disabled:opacity-50"
            >
              <Zap className="w-5 h-5" />
              Comprar Agora com PIX
            </button>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { icon: Truck, text: 'Frete Grátis acima de R$299' },
              { icon: RotateCcw, text: 'Troca em até 30 dias' },
              { icon: Shield, text: 'Compra 100% segura' },
              { icon: Package, text: 'Embalagem Premium' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs text-brand-marrom/70">
                <Icon className="w-4 h-4 text-brand-terracota flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Product Details */}
          <div className="border-t border-brand-nude/20 pt-5 space-y-3">
            {product.material && (
              <div className="flex gap-3 text-sm">
                <span className="font-semibold text-brand-preto w-28 flex-shrink-0">Material:</span>
                <span className="text-brand-marrom/70">{product.material}</span>
              </div>
            )}
            {product.care_instructions && (
              <div className="flex gap-3 text-sm">
                <span className="font-semibold text-brand-preto w-28 flex-shrink-0">Cuidados:</span>
                <span className="text-brand-marrom/70">{product.care_instructions}</span>
              </div>
            )}
            <div className="flex gap-3 text-sm">
              <span className="font-semibold text-brand-preto w-28 flex-shrink-0">SKU:</span>
              <span className="text-brand-marrom/70">{product.sku}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

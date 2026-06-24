'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Trash2, Plus, Minus, Tag, ArrowRight, Truck, Zap } from 'lucide-react'
import { toast } from 'sonner'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'
import ProductCard from '@/components/product/ProductCard'
import type { Product } from '@/types'

// Cross-sell products (mock)
const CROSS_SELL: Product[] = [
  {
    id: '10', name: 'Meia Fitness Compressão', slug: 'meia-fitness-compressao',
    description: '', price: 49.90, sku: 'ME-001', category_id: '7',
    images: [{ id: '10', product_id: '10', url: '/images/product-cross-1.jpg', sort_order: 1, is_primary: true }],
    variants: [{ id: '20', product_id: '10', sku: 'ME-001-U', size: 'U', color: 'Preto', color_hex: '#111111', stock: 50, weight: 0.1 }],
    tags: [], status: 'active', is_featured: false, is_new: false, is_best_seller: false,
    sold_count: 234, view_count: 1200, rating_avg: 4.7, rating_count: 89, pix_discount_percent: 10, created_at: '', updated_at: '',
  },
]

export default function CartPage() {
  const { items, subtotal, discount, shipping, total, coupon, removeItem, updateQuantity, applyCoupon, removeCoupon } = useCartStore()
  const [couponInput, setCouponInput] = useState('')
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return
    setIsApplyingCoupon(true)
    await new Promise(r => setTimeout(r, 800))

    // Mock coupon validation
    if (couponInput.toUpperCase() === 'BEMVINDA10') {
      applyCoupon({
        id: 'c1', code: 'BEMVINDA10',
        discount_type: 'percentage', discount_value: 10,
        is_active: true, used_count: 0,
      })
      toast.success('Cupom aplicado! 10% de desconto.')
    } else {
      toast.error('Cupom inválido ou expirado.')
    }
    setIsApplyingCoupon(false)
  }

  if (items.length === 0) {
    return (
      <div className="container-brand py-24 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 rounded-full bg-brand-offwhite flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-brand-nude" />
          </div>
          <h1 className="font-display text-2xl font-bold text-brand-preto mb-3">Seu carrinho está vazio</h1>
          <p className="text-brand-marrom/60 mb-8">Explore nossa coleção e encontre peças incríveis para o seu treino.</p>
          <Link href="/produtos" className="btn-primary">
            <ShoppingBag className="w-5 h-5" />
            Explorar Produtos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-brand py-12">
      <h1 className="font-display text-3xl font-bold text-brand-preto mb-8">
        Meu Carrinho <span className="text-brand-marrom/40 text-xl font-normal">({items.length} iten{items.length !== 1 ? 's' : ''})</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white rounded-2xl p-5 shadow-card flex gap-4"
              >
                <div className="w-24 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-brand-offwhite">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.product.images?.[0]?.url})`, backgroundColor: '#F5F2EE' }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <Link href={`/produtos/${item.product.slug}`} className="font-semibold text-brand-preto text-sm hover:text-brand-terracota transition-colors line-clamp-2">
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-brand-marrom/60 mt-1">
                    {item.variant.color} • Tam. {item.variant.size}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-brand-offwhite flex items-center justify-center hover:bg-brand-nude/30 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-semibold text-brand-preto w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-brand-offwhite flex items-center justify-center hover:bg-brand-nude/30 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-brand-preto">{formatCurrency(item.price * item.quantity)}</span>
                      <button
                        onClick={() => { removeItem(item.id); toast.success('Item removido do carrinho') }}
                        className="text-brand-nude hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* You may also like */}
          <div className="mt-8">
            <h3 className="font-semibold text-brand-preto mb-4 text-sm">Adicione ao seu look</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {CROSS_SELL.map((p) => (
                <ProductCard key={p.id} product={p} showQuickBuy={false} />
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          {/* Shipping Progress */}
          {subtotal < 299 && (
            <div className="bg-white rounded-2xl p-5 shadow-card">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-4 h-4 text-brand-terracota" />
                <span className="text-sm font-semibold text-brand-preto">
                  Falta {formatCurrency(299 - subtotal)} para frete grátis!
                </span>
              </div>
              <div className="w-full bg-brand-offwhite rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (subtotal / 299) * 100)}%` }}
                  className="h-full bg-brand-terracota rounded-full"
                />
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl p-6 shadow-card space-y-4 sticky top-24">
            <h3 className="font-display font-bold text-lg text-brand-preto">Resumo do Pedido</h3>

            {/* Coupon */}
            <div>
              {coupon ? (
                <div className="flex items-center gap-2 px-4 py-3 bg-green-50 rounded-xl border border-green-200">
                  <Tag className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">{coupon.code}</span>
                  <button onClick={removeCoupon} className="ml-auto text-xs text-green-600 hover:text-red-500">
                    Remover
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Código de desconto"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="input-brand flex-1 py-2.5 text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={isApplyingCoupon || !couponInput}
                    className="btn-secondary py-2.5 px-4 text-sm"
                  >
                    {isApplyingCoupon ? '...' : 'Aplicar'}
                  </button>
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-2.5 pt-2 border-t border-brand-nude/20">
              <div className="flex justify-between text-sm">
                <span className="text-brand-marrom/70">Subtotal</span>
                <span className="font-medium text-brand-preto">{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desconto</span>
                  <span>- {formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-brand-marrom/70">Frete</span>
                <span className={shipping === 0 ? 'text-green-600 font-semibold' : 'font-medium text-brand-preto'}>
                  {shipping === 0 ? 'Grátis' : formatCurrency(shipping)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-brand-nude/20 pt-3">
                <span>Total</span>
                <span className="text-brand-terracota">{formatCurrency(total)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-green-600 font-semibold text-sm">
                <Zap className="w-4 h-4" />
                <span>{formatCurrency(total * 0.9)} no PIX (10% off)</span>
              </div>
              <p className="text-xs text-brand-marrom/50">
                ou 12x de {formatCurrency(total / 12)} sem juros
              </p>
            </div>

            <Link href="/checkout" className="btn-primary w-full justify-center text-base py-4">
              Finalizar Compra
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link href="/produtos" className="block text-center text-sm text-brand-marrom/60 hover:text-brand-terracota transition-colors">
              ← Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

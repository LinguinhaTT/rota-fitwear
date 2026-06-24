import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem, Product, ProductVariant, Coupon } from '@/types'

interface CartState {
  items: CartItem[]
  coupon: Coupon | null
  totalItems: number
  subtotal: number
  discount: number
  shipping: number
  total: number

  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  applyCoupon: (coupon: Coupon) => void
  removeCoupon: () => void
  calculateShipping: (zipCode: string) => Promise<number>
}

function calculateTotals(items: CartItem[], coupon: Coupon | null) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  let discount = 0
  if (coupon) {
    if (coupon.discount_type === 'percentage') {
      discount = subtotal * (coupon.discount_value / 100)
    } else if (coupon.discount_type === 'fixed') {
      discount = Math.min(coupon.discount_value, subtotal)
    }
  }

  const shipping = subtotal >= 299 ? 0 : 19.99
  const total = subtotal - discount + shipping

  return { subtotal, totalItems, discount, shipping, total }
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      totalItems: 0,
      subtotal: 0,
      discount: 0,
      shipping: 0,
      total: 0,

      addItem: (product, variant, quantity = 1) => {
        const { items, coupon } = get()
        const existingIndex = items.findIndex(
          (i) => i.product_id === product.id && i.variant_id === variant.id
        )

        let newItems: CartItem[]
        if (existingIndex >= 0) {
          newItems = items.map((item, idx) =>
            idx === existingIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${variant.id}-${Date.now()}`,
            product_id: product.id,
            variant_id: variant.id,
            product,
            variant,
            quantity,
            price: variant.price_override ?? product.price,
          }
          newItems = [...items, newItem]
        }

        set({ items: newItems, ...calculateTotals(newItems, coupon) })
      },

      removeItem: (itemId) => {
        const { items, coupon } = get()
        const newItems = items.filter((i) => i.id !== itemId)
        set({ items: newItems, ...calculateTotals(newItems, coupon) })
      },

      updateQuantity: (itemId, quantity) => {
        const { items, coupon } = get()
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }
        const newItems = items.map((i) => (i.id === itemId ? { ...i, quantity } : i))
        set({ items: newItems, ...calculateTotals(newItems, coupon) })
      },

      clearCart: () => {
        set({ items: [], coupon: null, totalItems: 0, subtotal: 0, discount: 0, shipping: 0, total: 0 })
      },

      applyCoupon: (coupon) => {
        const { items } = get()
        set({ coupon, ...calculateTotals(items, coupon) })
      },

      removeCoupon: () => {
        const { items } = get()
        set({ coupon: null, ...calculateTotals(items, null) })
      },

      calculateShipping: async (zipCode) => {
        await new Promise((r) => setTimeout(r, 500))
        const shipping = 19.99
        set({ shipping })
        return shipping
      },
    }),
    {
      name: 'rota-fitwear-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        coupon: state.coupon,
      }),
    }
  )
)

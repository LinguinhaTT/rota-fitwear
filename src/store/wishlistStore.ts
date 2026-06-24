import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Product } from '@/types'

interface WishlistState {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  toggleItem: (product: Product) => boolean
  hasItem: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const { items } = get()
        if (!items.find((i) => i.id === product.id)) {
          set({ items: [...items, product] })
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.id !== productId) })
      },

      toggleItem: (product) => {
        const { items, addItem, removeItem } = get()
        const exists = items.find((i) => i.id === product.id)
        if (exists) {
          removeItem(product.id)
          return false
        } else {
          addItem(product)
          return true
        }
      },

      hasItem: (productId) => !!get().items.find((i) => i.id === productId),

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'rota-fitwear-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

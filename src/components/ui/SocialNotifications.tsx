'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, X } from 'lucide-react'

interface Notification {
  id: string
  name: string
  city: string
  product: string
  time: string
}

const NOTIFICATIONS: Notification[] = [
  { id: '1', name: 'Juliana M.', city: 'São Paulo, SP', product: 'Conjunto Fitness Ultra Soft Premium', time: 'agora mesmo' },
  { id: '2', name: 'Fernanda R.', city: 'Rio de Janeiro, RJ', product: 'Legging Sculpt Control', time: 'há 2 min' },
  { id: '3', name: 'Camila S.', city: 'Belo Horizonte, MG', product: 'Top Fitness Sustentação', time: 'há 5 min' },
  { id: '4', name: 'Beatriz T.', city: 'Curitiba, PR', product: 'Conjunto Veludo Luxo', time: 'há 8 min' },
  { id: '5', name: 'Ana L.', city: 'Porto Alegre, RS', product: 'Macaquinho Fitness Elegance', time: 'há 12 min' },
  { id: '6', name: 'Mariana C.', city: 'Fortaleza, CE', product: 'Short Run Performance', time: 'há 15 min' },
]

export default function SocialNotifications() {
  const [current, setCurrent] = useState<Notification | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (dismissed) return

    const showNotification = () => {
      setIsVisible(true)
      setCurrent(NOTIFICATIONS[index % NOTIFICATIONS.length])
      setIndex((i) => i + 1)

      setTimeout(() => setIsVisible(false), 4500)
    }

    const timeout = setTimeout(showNotification, 3000)
    const interval = setInterval(showNotification, 12000)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [index, dismissed])

  if (dismissed) return null

  return (
    <div className="fixed bottom-24 left-4 z-50 pointer-events-none">
      <AnimatePresence>
        {isVisible && current && (
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className="flex items-center gap-3 p-3 pr-10 bg-white rounded-2xl shadow-glass border border-brand-nude/20 pointer-events-auto max-w-[300px] relative"
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-brand-terracota/10 flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-5 h-5 text-brand-terracota" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-brand-preto truncate">{current.name}</p>
              <p className="text-[11px] text-brand-marrom/60 truncate">{current.city}</p>
              <p className="text-[11px] text-brand-marrom/80 font-medium mt-0.5 line-clamp-1">
                Comprou {current.product}
              </p>
              <p className="text-[10px] text-brand-nude/80 mt-0.5">{current.time}</p>
            </div>

            {/* Close */}
            <button
              onClick={() => { setIsVisible(false); setDismissed(true) }}
              className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand-nude/20 flex items-center justify-center hover:bg-brand-nude/40 transition-colors"
            >
              <X className="w-3 h-3 text-brand-marrom" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

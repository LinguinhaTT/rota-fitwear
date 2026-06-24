'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Gift } from 'lucide-react'

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    const shown = sessionStorage.getItem('exit-popup-shown')
    if (shown) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem('exit-popup-shown', 'true')
      }
    }

    // Mobile: show after 30s
    const mobileTimer = setTimeout(() => {
      if (!hasShown && window.innerWidth < 768) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem('exit-popup-shown', 'true')
      }
    }, 30000)

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(mobileTimer)
    }
  }, [hasShown])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    // TODO: send to email list
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 flex items-center justify-center z-[201] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl">
              {/* Close */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              {/* Header */}
              <div className="relative px-8 pt-10 pb-8 bg-gradient-to-br from-brand-terracota to-brand-marrom text-white text-center">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(/images/pattern.svg)', backgroundSize: '60px' }} />
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-medium text-white/80 uppercase tracking-wider mb-2">Espere! Temos um presente para você</p>
                  <h2 className="font-display text-3xl font-bold leading-tight mb-2">
                    10% OFF na<br />sua primeira compra
                  </h2>
                  <p className="text-white/80 text-sm">
                    Cadastre seu e-mail e receba o cupom agora mesmo
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 py-8">
                {!submitted ? (
                  <>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="email"
                          placeholder="Seu melhor e-mail"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="input-brand"
                        />
                      </div>
                      <button type="submit" className="btn-primary w-full justify-center text-base py-4">
                        <Sparkles className="w-5 h-5" />
                        Quero meu desconto de 10%!
                      </button>
                    </form>
                    <p className="text-center text-xs text-brand-marrom/50 mt-4">
                      Sem spam. Você pode cancelar a qualquer momento.
                    </p>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-brand-preto mb-2">Cupom enviado! 🎉</h3>
                    <p className="text-brand-marrom/70 text-sm mb-4">
                      Verifique seu e-mail e use o cupom <strong className="text-brand-terracota">BEMVINDA10</strong> no checkout.
                    </p>
                    <button onClick={handleClose} className="btn-primary">
                      Ir às Compras
                    </button>
                  </div>
                )}

                <button
                  onClick={handleClose}
                  className="block w-full text-center text-xs text-brand-nude hover:text-brand-marrom transition-colors mt-4"
                >
                  Não, obrigada
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

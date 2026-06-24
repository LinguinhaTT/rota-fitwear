'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import {
  Search, ShoppingBag, Heart, User, Menu, X, ChevronDown,
  Phone, Instagram, Sparkles, Sun, Moon, Globe
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'

const categories = [
  {
    name: 'Coleções',
    href: '/colecoes',
    children: [
      { name: 'Novidades', href: '/novidades', badge: 'Novo' },
      { name: 'Mais Vendidos', href: '/mais-vendidos', badge: 'Hot' },
      { name: 'Promoções', href: '/promocoes', badge: '-30%' },
      { name: 'Coleção Exclusiva', href: '/exclusiva' },
    ],
  },
  {
    name: 'Categorias',
    href: '/categorias',
    children: [
      { name: 'Conjuntos', href: '/categorias/conjuntos' },
      { name: 'Leggings', href: '/categorias/leggings' },
      { name: 'Tops', href: '/categorias/tops' },
      { name: 'Shorts', href: '/categorias/shorts' },
      { name: 'Vestidos', href: '/categorias/vestidos' },
      { name: 'Macaquinhos', href: '/categorias/macaquinhos' },
    ],
  },
  { name: 'Blog', href: '/blog' },
  { name: 'Sobre', href: '/sobre' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { theme, setTheme } = useTheme()
  const { scrollY } = useScroll()
  const searchRef = useRef<HTMLInputElement>(null)

  const cartCount = useCartStore(s => s.totalItems)
  const wishlistCount = useWishlistStore(s => s.items.length)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  useEffect(() => {
    if (isSearchOpen) searchRef.current?.focus()
  }, [isSearchOpen])

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  return (
    <>
      {/* Top Banner */}
      <div className="bg-brand-preto text-white text-xs font-medium py-2.5 text-center relative overflow-hidden">
        <div className="flex items-center justify-center gap-6 animate-marquee whitespace-nowrap">
          <span>✨ FRETE GRÁTIS acima de R$299 | PIX com 10% OFF</span>
          <span>•</span>
          <span>🔥 Nova Coleção Disponível</span>
          <span>•</span>
          <span>⭐ Parcelamos em até 12x sem juros</span>
          <span>•</span>
          <span>✨ FRETE GRÁTIS acima de R$299 | PIX com 10% OFF</span>
          <span>•</span>
          <span>🔥 Nova Coleção Disponível</span>
          <span>•</span>
          <span>⭐ Parcelamos em até 12x sem juros</span>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-glass border-b border-brand-nude/20'
            : 'bg-white border-b border-brand-nude/20'
        }`}
        initial={false}
      >
        <div className="container-brand">
          <div className="flex items-center justify-between h-[72px] gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="relative w-10 h-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-terracota to-brand-marrom flex items-center justify-center shadow-brand group-hover:shadow-brand-lg transition-shadow duration-300">
                  <span className="text-white font-display font-bold text-sm">RF</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-xl font-bold text-brand-preto block leading-none">
                  Rota Fitwear
                </span>
                <span className="text-[10px] text-brand-terracota font-medium tracking-widest uppercase">
                  Moda Fitness com Propósito
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className="relative"
                  onMouseEnter={() => cat.children && setActiveCategory(cat.name)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <Link
                    href={cat.href}
                    className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                      ${activeCategory === cat.name
                        ? 'bg-brand-offwhite text-brand-terracota'
                        : 'text-brand-preto hover:bg-brand-offwhite hover:text-brand-terracota'
                      }`}
                  >
                    {cat.name}
                    {cat.children && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeCategory === cat.name ? 'rotate-180' : ''}`} />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {cat.children && activeCategory === cat.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-glass-dark border border-brand-nude/20 p-2 z-50"
                      >
                        {cat.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm text-brand-preto hover:bg-brand-offwhite hover:text-brand-terracota transition-colors duration-150 group/item"
                          >
                            <span>{child.name}</span>
                            {child.badge && (
                              <span className="badge-new text-[10px] py-0.5 px-2">{child.badge}</span>
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="btn-icon text-brand-preto"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link href="/conta/favoritos" className="btn-icon relative text-brand-preto">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-terracota text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link href="/carrinho" className="btn-icon relative text-brand-preto">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-brand-terracota text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {cartCount > 9 ? '9+' : cartCount}
                  </motion.span>
                )}
              </Link>

              {/* Account */}
              <Link href="/conta" className="hidden sm:flex btn-icon text-brand-preto">
                <User className="w-5 h-5" />
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hidden md:flex btn-icon text-brand-preto"
                aria-label="Alternar tema"
              >
                {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden btn-icon text-brand-preto"
                aria-label="Abrir menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="border-t border-brand-nude/20 bg-white overflow-hidden"
            >
              <div className="container-brand py-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-nude" />
                  <input
                    ref={searchRef}
                    type="search"
                    placeholder="Buscar produtos, categorias..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-brand pl-12 pr-12 py-4"
                  />
                  <button
                    onClick={() => { setIsSearchOpen(false); setSearchQuery('') }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 btn-icon text-brand-nude"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {searchQuery && (
                  <div className="mt-3 text-sm text-brand-marrom/70">
                    Buscando por <strong className="text-brand-terracota">&ldquo;{searchQuery}&rdquo;</strong>...
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white z-[70] flex flex-col shadow-2xl"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-brand-nude/20">
                <span className="font-display text-lg font-bold text-brand-preto">Menu</span>
                <button onClick={() => setIsMenuOpen(false)} className="btn-icon">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex-1 overflow-y-auto p-6 space-y-1">
                {[
                  { name: 'Início', href: '/' },
                  { name: 'Novidades', href: '/novidades', badge: 'Novo' },
                  { name: 'Conjuntos', href: '/categorias/conjuntos' },
                  { name: 'Leggings', href: '/categorias/leggings' },
                  { name: 'Tops', href: '/categorias/tops' },
                  { name: 'Shorts', href: '/categorias/shorts' },
                  { name: 'Vestidos', href: '/categorias/vestidos' },
                  { name: 'Macaquinhos', href: '/categorias/macaquinhos' },
                  { name: 'Mais Vendidos', href: '/mais-vendidos' },
                  { name: 'Promoções', href: '/promocoes' },
                  { name: 'Blog', href: '/blog' },
                  { name: 'Sobre', href: '/sobre' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-brand-preto hover:bg-brand-offwhite hover:text-brand-terracota transition-colors"
                  >
                    <span>{item.name}</span>
                    {item.badge && <span className="badge-new text-[10px]">{item.badge}</span>}
                  </Link>
                ))}
              </nav>

              {/* Mobile Menu Footer */}
              <div className="p-6 border-t border-brand-nude/20 space-y-4">
                <Link href="/conta" className="btn-primary w-full justify-center" onClick={() => setIsMenuOpen(false)}>
                  <User className="w-4 h-4" />
                  Minha Conta
                </Link>
                <div className="flex items-center justify-center gap-4 text-brand-marrom/60">
                  <a href="https://instagram.com/rotafitwear" target="_blank" rel="noopener noreferrer" className="hover:text-brand-terracota transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
                    <Phone className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

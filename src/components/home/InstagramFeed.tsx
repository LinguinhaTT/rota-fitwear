'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Instagram, ShoppingBag, Heart } from 'lucide-react'
import Link from 'next/link'

const instagramPosts = [
  { id: 1, image: '/images/ig-1.jpg', likes: 1243, link: '#', productLink: '/produtos/conjunto-fitness-ultra-soft-premium' },
  { id: 2, image: '/images/ig-2.jpg', likes: 987, link: '#', productLink: '/produtos/legging-sculpt-control-cintura-alta' },
  { id: 3, image: '/images/ig-3.jpg', likes: 2341, link: '#', productLink: '/produtos/top-fitness-sustentacao-premium' },
  { id: 4, image: '/images/ig-4.jpg', likes: 1876, link: '#', productLink: '/produtos/conjunto-veludo-luxo-premium' },
  { id: 5, image: '/images/ig-5.jpg', likes: 3102, link: '#', productLink: '/produtos/legging-ribbed-sensation' },
  { id: 6, image: '/images/ig-6.jpg', likes: 1567, link: '#', productLink: '/produtos/macaquinho-fitness-elegance' },
]

export default function InstagramFeed() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="section" ref={ref}>
      <div className="container-brand">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Instagram className="w-5 h-5 text-brand-terracota" />
            <span className="text-sm font-semibold text-brand-terracota uppercase tracking-wider">@rotafitwear</span>
          </div>
          <h2 className="section-title mb-3">
            Compre o{' '}
            <span className="text-gradient-brand italic">Look</span>
          </h2>
          <div className="divider-brand mx-auto mb-3" />
          <p className="section-subtitle">
            Clique na foto e leve o look que você amou
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {instagramPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Image placeholder */}
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${post.image})`,
                  backgroundColor: ['#DCC8B4', '#C97C5D', '#7D5A4F', '#DCC8B4', '#111111', '#C97C5D'][idx],
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-1 text-white text-sm font-medium">
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{post.likes.toLocaleString('pt-BR')}</span>
                </div>
                <Link
                  href={post.productLink}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-full text-xs font-semibold text-brand-preto hover:bg-brand-terracota hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ShoppingBag className="w-3 h-3" />
                  Comprar
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8"
        >
          <a
            href="https://instagram.com/rotafitwear"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-secondary"
          >
            <Instagram className="w-5 h-5" />
            Seguir no Instagram
          </a>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'

const categories = [
  { name: 'Conjuntos', href: '/categorias/conjuntos', image: '/images/cat-conjuntos.jpg', count: '48 peças', color: 'from-brand-terracota/80' },
  { name: 'Leggings', href: '/categorias/leggings', image: '/images/cat-leggings.jpg', count: '36 peças', color: 'from-brand-marrom/80' },
  { name: 'Tops', href: '/categorias/tops', image: '/images/cat-tops.jpg', count: '42 peças', color: 'from-brand-nude/80' },
  { name: 'Shorts', href: '/categorias/shorts', image: '/images/cat-shorts.jpg', count: '24 peças', color: 'from-brand-terracota/70' },
  { name: 'Vestidos', href: '/categorias/vestidos', image: '/images/cat-vestidos.jpg', count: '18 peças', color: 'from-brand-marrom/70' },
  { name: 'Macaquinhos', href: '/categorias/macaquinhos', image: '/images/cat-macaquinhos.jpg', count: '22 peças', color: 'from-brand-preto/80' },
  { name: 'Novidades', href: '/novidades', image: '/images/cat-novidades.jpg', count: 'Lançamentos', color: 'from-brand-dourado/80', badge: 'New' },
  { name: 'Promoções', href: '/promocoes', image: '/images/cat-promocoes.jpg', count: 'Até -50%', color: 'from-red-600/70', badge: 'Sale' },
  { name: 'Mais Vendidos', href: '/mais-vendidos', image: '/images/cat-maisvendidos.jpg', count: 'Top Picks', color: 'from-brand-terracota/80', badge: '🔥' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Categories() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="section bg-brand-offwhite" ref={ref}>
      <div className="container-brand">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="badge-new mb-4">Explore</span>
          <h2 className="section-title mb-4">
            Encontre seu{' '}
            <span className="text-gradient-brand italic">estilo perfeito</span>
          </h2>
          <div className="divider-brand mx-auto mb-4" />
          <p className="section-subtitle max-w-2xl mx-auto">
            Cada peça criada com dedicação para realçar sua beleza e potencializar sua performance
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {/* Large featured card */}
          <motion.div variants={item} className="col-span-2 row-span-2">
            <Link href={categories[0].href} className="relative block h-full min-h-[360px] rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-terracota/30 to-brand-marrom/60" />
              <div className={`absolute inset-0 bg-gradient-to-t ${categories[0].color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="absolute inset-0 bg-brand-nude/20" />
              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="badge-bestseller mb-3">Destaque</span>
                  <h3 className="font-display text-3xl font-bold text-white mb-1">{categories[0].name}</h3>
                  <p className="text-white/70 text-sm mb-4">{categories[0].count}</p>
                  <span className="inline-flex items-center gap-2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Ver Coleção <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Regular cards */}
          {categories.slice(1).map((cat) => (
            <motion.div key={cat.name} variants={item}>
              <Link href={cat.href} className="relative block aspect-[3/4] rounded-2xl overflow-hidden group">
                {/* Color placeholder (replace with real images) */}
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${
                      cat.color.includes('terracota') ? '#C97C5D' :
                      cat.color.includes('marrom') ? '#7D5A4F' :
                      cat.color.includes('nude') ? '#DCC8B4' :
                      cat.color.includes('dourado') ? '#C8A96A' :
                      cat.color.includes('preto') ? '#111111' :
                      cat.color.includes('red') ? '#EF4444' : '#C97C5D'
                    } 0%, #111111 100%)`,
                  }}
                />

                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {cat.badge && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="badge-new">{cat.badge}</span>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 z-10 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-display text-base font-bold text-white leading-tight">{cat.name}</h3>
                  <p className="text-white/70 text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {cat.count}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

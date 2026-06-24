'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { Award, Heart, Leaf, Zap } from 'lucide-react'

const values = [
  { icon: Heart, title: 'Autoestima em primeiro lugar', desc: 'Cada peça é criada para fazer você se sentir poderosa e bonita.' },
  { icon: Zap, title: 'Performance sem abrir mão do estilo', desc: 'Tecnologia de ponta com design que você quer usar o dia todo.' },
  { icon: Leaf, title: 'Sustentabilidade consciente', desc: 'Produção responsável com respeito ao planeta e às pessoas.' },
  { icon: Award, title: 'Qualidade premium garantida', desc: 'Materiais selecionados para durar e manter o shape lavagem após lavagem.' },
]

export default function BrandStatement() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden bg-brand-preto text-white">
      {/* Parallax BG */}
      <motion.div style={{ y }} className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{ backgroundImage: 'url(/images/brand-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-preto via-brand-marrom/50 to-brand-preto" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-brand-terracota/10 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-brand-dourado/10 blur-3xl" />

      <div className="container-brand relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="badge-gold mb-6">Nossa Missão</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              Moda Fitness{' '}
              <span className="text-gradient-brand italic">com Propósito</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Acreditamos que cada mulher merece se sentir poderosa, bonita e confiante — dentro e fora da academia. A Rota Fitwear nasceu com a missão de elevar a autoestima através de peças que unem beleza, conforto e performance.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/sobre" className="btn-primary">Conheça nossa história</a>
              <a href="/blog" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-brand-preto">Ver Blog</a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10">
              {[
                { value: '2019', label: 'Fundada em' },
                { value: '50K+', label: 'Clientes' },
                { value: '4.9/5', label: 'Avaliação' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl font-bold text-brand-dourado">{stat.value}</p>
                  <p className="text-white/50 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Values */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {values.map(({ icon: Icon, title, desc }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-brand-terracota/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-terracota/20 flex items-center justify-center mb-4 group-hover:bg-brand-terracota transition-colors duration-300">
                  <Icon className="w-6 h-6 text-brand-terracota group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm leading-snug">{title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

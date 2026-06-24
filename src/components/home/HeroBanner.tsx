'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Play, Sparkles } from 'lucide-react'

export default function HeroBanner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const { scrollY } = useScroll()

  const y = useTransform(scrollY, [0, 600], [0, 150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 600], [1, 1.1])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section ref={containerRef} className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden bg-brand-preto">
      {/* Background Video / Image */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full"
      >
        {/* Placeholder gradient until video loads */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
          style={{
            background: 'linear-gradient(135deg, #7D5A4F 0%, #C97C5D 30%, #DCC8B4 60%, #111111 100%)',
          }}
        />

        {/* Hero Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          <source src="/videos/hero.webm" type="video/webm" />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-preto/70 via-brand-preto/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-preto/80 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-center"
      >
        <div className="container-brand w-full">
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4 text-brand-dourado" />
              <span>Nova Coleção Disponível</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
            >
              Seu corpo em{' '}
              <span className="text-gradient-brand italic">movimento.</span>
              <br />
              Sua confiança em{' '}
              <span className="text-gradient-gold italic">evidência.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-white/80 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl"
            >
              Conjuntos fitness premium criados para mulheres que buscam conforto, estilo e autoestima.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/produtos" className="btn-primary text-base px-10 py-4 shadow-brand-lg">
                Comprar Agora
              </Link>
              <Link href="/novidades" className="btn-secondary text-base px-10 py-4 border-white/60 text-white hover:bg-white hover:text-brand-preto">
                Lançamentos
              </Link>
              <Link href="/exclusiva" className="btn-gold text-base px-10 py-4">
                Coleção Exclusiva
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="flex items-center gap-8 mt-12"
            >
              {[
                { value: '50k+', label: 'Clientes Felizes' },
                { value: '4.9★', label: 'Avaliação Média' },
                { value: '200+', label: 'Produtos' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/60 font-medium">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        style={{ opacity }}
        onClick={scrollToContent}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors z-10"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Explorar</span>
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center pt-2">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.button>
    </section>
  )
}

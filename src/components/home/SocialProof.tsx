'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote, CheckCircle } from 'lucide-react'
import Image from 'next/image'

const reviews = [
  {
    id: 1, name: 'Juliana M.', city: 'São Paulo, SP', avatar: '/images/avatar-1.jpg',
    rating: 5, verified: true,
    text: 'Melhor compra que fiz! O conjunto é incrível, tecido de altíssima qualidade. Me sinto uma deusa na academia. Já indiquei para todas as minhas amigas!',
    product: 'Conjunto Fitness Ultra Soft Premium', date: 'há 2 dias',
  },
  {
    id: 2, name: 'Fernanda R.', city: 'Rio de Janeiro, RJ', avatar: '/images/avatar-2.jpg',
    rating: 5, verified: true,
    text: 'A legging tem uma modelagem perfeita! Não desce, não transparece e deixa o bumbum lindo. Entrega super rápida e embalagem premium. Amei!',
    product: 'Legging Sculpt Control Cintura Alta', date: 'há 4 dias',
  },
  {
    id: 3, name: 'Camila S.', city: 'Belo Horizonte, MG', avatar: '/images/avatar-3.jpg',
    rating: 5, verified: true,
    text: 'Recebi muitos elogios na academia! O material é diferenciado, muito suave na pele. Com certeza vou comprar mais peças. A marca é incrível!',
    product: 'Top Fitness Sustentação Premium', date: 'há 1 semana',
  },
  {
    id: 4, name: 'Beatriz T.', city: 'Curitiba, PR', avatar: '/images/avatar-4.jpg',
    rating: 5, verified: true,
    text: 'Finalmente encontrei uma marca que entende o corpo feminino! As peças modelam perfeitamente e o tamanho bate certinho com a tabela.',
    product: 'Conjunto Veludo Luxo Premium', date: 'há 1 semana',
  },
  {
    id: 5, name: 'Mariana L.', city: 'Porto Alegre, RS', avatar: '/images/avatar-5.jpg',
    rating: 5, verified: true,
    text: 'Qualidade excepcional! Lavei várias vezes e mantém a cor, a elasticidade e o formato. Vale cada centavo. Já é minha marca favorita!',
    product: 'Legging Ribbed Sensation', date: 'há 2 semanas',
  },
  {
    id: 6, name: 'Patricia N.', city: 'Recife, PE', avatar: '/images/avatar-6.jpg',
    rating: 5, verified: true,
    text: 'Atendimento excelente, entrega rápida e produto de qualidade absurda. O conjunto chegou lindo, embalagem super caprichada. Recomendo muito!',
    product: 'Macaquinho Fitness Elegance', date: 'há 3 semanas',
  },
]

export default function SocialProof() {
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
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="stars text-xl">{'★'.repeat(5)}</div>
            <span className="font-display text-2xl font-bold text-brand-preto">4.9/5</span>
          </div>
          <h2 className="section-title mb-3">
            O que nossas{' '}
            <span className="text-gradient-brand italic">clientes dizem</span>
          </h2>
          <div className="divider-brand mx-auto mb-3" />
          <p className="section-subtitle">
            Mais de 50.000 mulheres já escolheram a Rota Fitwear
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-brand-nude/30" />

              {/* Stars */}
              <div className="stars mb-3">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'fill-brand-dourado text-brand-dourado' : 'text-brand-nude/30'}`} />
                ))}
              </div>

              {/* Text */}
              <p className="text-brand-marrom/80 text-sm leading-relaxed mb-4 italic">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Product */}
              <p className="text-xs text-brand-terracota font-medium mb-4">
                ✓ Comprou: {review.product}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-brand-nude/20">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-terracota to-brand-marrom flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {review.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-sm text-brand-preto truncate">{review.name}</p>
                    {review.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-brand-marrom/50">{review.city} • {review.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-12 border-t border-brand-nude/30"
        >
          {[
            { value: '50.000+', label: 'Clientes satisfeitas' },
            { value: '4.9/5', label: 'Avaliação média' },
            { value: '99%', label: 'Recomendam a marca' },
            { value: '< 24h', label: 'Tempo de resposta' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl font-bold text-brand-terracota">{stat.value}</p>
              <p className="text-sm text-brand-marrom/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

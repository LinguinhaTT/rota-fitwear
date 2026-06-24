'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ThumbsUp, CheckCircle, Camera } from 'lucide-react'

const REVIEWS = [
  { id: 1, name: 'Juliana M.', rating: 5, date: '15/06/2026', verified: true, title: 'Melhor conjunto que já comprei!', body: 'Incrível! O tecido é muito suave e não transparece. O caimento é perfeito e a cintura alta realmente sustenta bem. Já comprei mais 2 cores!', size: 'M', helpful: 47 },
  { id: 2, name: 'Fernanda R.', rating: 5, date: '10/06/2026', verified: true, title: 'Superou todas as expectativas', body: 'Comprei sem expectativa e me surpreendi muito. A qualidade é premium de verdade. Chegou rápido e na embalagem linda. Com certeza voltarei a comprar.', size: 'P', helpful: 31 },
  { id: 3, name: 'Camila S.', rating: 4, date: '05/06/2026', verified: true, title: 'Muito boa qualidade', body: 'Ótimo produto. Único ponto: encolheu um pouco após a primeira lavagem, então recomendo comprar um tamanho acima. Mas o tecido é excelente!', size: 'G', helpful: 23 },
]

export default function ProductReviews() {
  const [showForm, setShowForm] = useState(false)
  const rating = 4.9
  const total = 312

  const distribution = [
    { stars: 5, percent: 89 },
    { stars: 4, percent: 8 },
    { stars: 3, percent: 2 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 0 },
  ]

  return (
    <section id="reviews" className="container-brand py-16 border-t border-brand-nude/20">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Summary */}
        <div className="lg:col-span-1">
          <h2 className="font-display text-2xl font-bold text-brand-preto mb-6">Avaliações</h2>

          <div className="text-center p-8 bg-brand-offwhite rounded-3xl mb-6">
            <div className="font-display text-6xl font-bold text-brand-preto mb-2">{rating}</div>
            <div className="stars justify-center mb-2">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-brand-dourado text-brand-dourado" />
              ))}
            </div>
            <p className="text-brand-marrom/60 text-sm">{total} avaliações</p>
          </div>

          {/* Distribution */}
          <div className="space-y-2 mb-6">
            {distribution.map(({ stars, percent }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-xs text-brand-marrom/60 w-4">{stars}</span>
                <Star className="w-3.5 h-3.5 fill-brand-dourado text-brand-dourado" />
                <div className="flex-1 bg-brand-offwhite rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percent}%` }}
                    transition={{ duration: 0.8, delay: (5 - stars) * 0.1 }}
                    className="h-full bg-brand-dourado rounded-full"
                  />
                </div>
                <span className="text-xs text-brand-marrom/60 w-8">{percent}%</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-secondary w-full justify-center"
          >
            Escrever Avaliação
          </button>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-6">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 bg-white rounded-2xl shadow-card"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-terracota to-brand-marrom flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-sm text-brand-preto">{review.name}</span>
                      {review.verified && <CheckCircle className="w-3.5 h-3.5 text-green-500" />}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="stars">
                        {[1,2,3,4,5].map((s) => (
                          <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? 'fill-brand-dourado text-brand-dourado' : 'text-brand-nude/30'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-brand-marrom/50">{review.date}</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-brand-marrom/50 bg-brand-offwhite px-2 py-1 rounded-lg">
                  Tam. {review.size}
                </span>
              </div>

              <h4 className="font-semibold text-brand-preto text-sm mb-2">{review.title}</h4>
              <p className="text-brand-marrom/70 text-sm leading-relaxed mb-4">{review.body}</p>

              <div className="flex items-center gap-2 text-xs text-brand-marrom/50">
                <button className="flex items-center gap-1 hover:text-brand-terracota transition-colors">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Útil ({review.helpful})
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Clock, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | Rota Fitwear',
  description: 'Dicas de moda fitness, treinos, saúde, bem-estar e tendências. Conteúdo criado para mulheres que se movem com estilo.',
}

const POSTS = [
  {
    id: '1', slug: 'como-escolher-legging-perfeita', title: 'Como escolher a legging perfeita para o seu treino',
    excerpt: 'Descubra os pontos essenciais para escolher a legging ideal para cada tipo de treino e biotipo corporal.',
    category: 'Moda Fitness', reading_time: 5, image: '/images/blog-1.jpg',
    published_at: '2026-06-20', tags: ['legging', 'escolha', 'treino'],
  },
  {
    id: '2', slug: '5-treinos-para-fazer-casa', title: '5 Treinos Incríveis Para Fazer em Casa',
    excerpt: 'Sem academia, sem desculpa! Confira 5 treinos completos que você pode fazer no conforto da sua casa.',
    category: 'Treinos', reading_time: 8, image: '/images/blog-2.jpg',
    published_at: '2026-06-18', tags: ['treino', 'casa', 'fitness'],
  },
  {
    id: '3', slug: 'autoestima-moda-fitness', title: 'Como a Moda Fitness Eleva sua Autoestima',
    excerpt: 'A relação entre se vestir bem para treinar e o impacto direto na sua autoconfiança e performance.',
    category: 'Autoestima', reading_time: 6, image: '/images/blog-3.jpg',
    published_at: '2026-06-15', tags: ['autoestima', 'confiança', 'fitness'],
  },
  {
    id: '4', slug: 'tendencias-fitness-2026', title: 'Tendências de Moda Fitness para 2026',
    excerpt: 'As cores, tecidos e modelagens que vão dominar o mundo fitness neste ano. Fique por dentro!',
    category: 'Tendências', reading_time: 4, image: '/images/blog-4.jpg',
    published_at: '2026-06-12', tags: ['tendências', '2026', 'moda'],
  },
]

const categories = ['Todos', 'Moda Fitness', 'Treinos', 'Saúde', 'Bem-estar', 'Autoestima', 'Tendências']

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="py-20 bg-brand-offwhite text-center">
          <div className="container-brand max-w-3xl">
            <span className="badge-new mb-4">Blog</span>
            <h1 className="section-title mb-4">Conteúdo que <span className="text-gradient-brand italic">inspira</span></h1>
            <div className="divider-brand mx-auto mb-4" />
            <p className="section-subtitle">Dicas de moda fitness, treinos, saúde e muito mais para você que se move com estilo</p>
          </div>
        </section>

        {/* Categories */}
        <div className="border-b border-brand-nude/20 bg-white sticky top-[72px] z-30">
          <div className="container-brand">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide py-3">
              {categories.map((cat) => (
                <button key={cat} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat === 'Todos' ? 'bg-brand-terracota text-white' : 'text-brand-marrom/70 hover:bg-brand-offwhite'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <section className="section">
          <div className="container-brand">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Featured post */}
              <Link href={`/blog/${POSTS[0].slug}`} className="md:col-span-2 group">
                <article className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
                  <div className="aspect-video bg-brand-offwhite overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${POSTS[0].image})`, backgroundColor: '#DCC8B4' }}
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="badge-new">{POSTS[0].category}</span>
                      <div className="flex items-center gap-1 text-xs text-brand-marrom/50">
                        <Clock className="w-3.5 h-3.5" />
                        {POSTS[0].reading_time} min de leitura
                      </div>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-brand-preto mb-3 group-hover:text-brand-terracota transition-colors">
                      {POSTS[0].title}
                    </h2>
                    <p className="text-brand-marrom/70 leading-relaxed">{POSTS[0].excerpt}</p>
                  </div>
                </article>
              </Link>

              {/* Other posts */}
              {POSTS.slice(1).map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <article className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 h-full flex flex-col">
                    <div className="aspect-video bg-brand-offwhite overflow-hidden flex-shrink-0">
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${post.image})`, backgroundColor: '#C97C5D' }}
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="badge-new text-[10px]">{post.category}</span>
                        <span className="text-[11px] text-brand-marrom/50 flex items-center gap-1">
                          <Clock className="w-3 h-3" />{post.reading_time}min
                        </span>
                      </div>
                      <h2 className="font-display text-base font-bold text-brand-preto mb-2 group-hover:text-brand-terracota transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-brand-marrom/60 text-sm line-clamp-2 flex-1">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {post.tags.map((tag) => (
                          <span key={tag} className="flex items-center gap-1 text-[11px] text-brand-terracota/70">
                            <Tag className="w-2.5 h-2.5" />#{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

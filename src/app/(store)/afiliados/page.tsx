import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Users, DollarSign, BarChart3, Link as LinkIcon, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Programa de Afiliados | Rota Fitwear',
  description: 'Seja afiliada da Rota Fitwear e ganhe comissões indicando produtos incríveis de moda fitness.',
}

const benefits = [
  { icon: DollarSign, title: 'Comissão de 5% a 15%', desc: 'Ganhe comissões crescentes baseadas nas suas vendas mensais.' },
  { icon: LinkIcon, title: 'Link exclusivo', desc: 'Receba um link personalizado para divulgar e rastrear suas conversões.' },
  { icon: BarChart3, title: 'Dashboard próprio', desc: 'Acesse relatórios completos de cliques, conversões e comissões.' },
  { icon: Users, title: 'Suporte dedicado', desc: 'Nossa equipe está disponível para ajudar a maximizar seus ganhos.' },
]

export default function AfiliadosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="py-24 bg-brand-preto text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-terracota/20 to-brand-marrom/30" />
          <div className="container-brand relative z-10 max-w-3xl">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Ganhe dinheiro com a <span className="text-gradient-brand">Rota Fitwear</span>
            </h1>
            <p className="text-white/70 text-xl mb-10">
              Torne-se afiliada e ganhe comissões de até 15% indicando nossa moda fitness premium para suas seguidoras.
            </p>
            <a href="#cadastro" className="btn-primary text-base px-10 py-4">
              Quero ser Afiliada
            </a>
          </div>
        </section>

        {/* Benefits */}
        <section className="section bg-brand-offwhite">
          <div className="container-brand">
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Por que ser afiliada Rota Fitwear?</h2>
              <div className="divider-brand mx-auto" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-2xl p-6 shadow-card text-center hover:shadow-card-hover transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-brand-terracota/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-brand-terracota" />
                  </div>
                  <h3 className="font-semibold text-brand-preto mb-2">{title}</h3>
                  <p className="text-sm text-brand-marrom/70 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section">
          <div className="container-brand max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Como funciona?</h2>
              <div className="divider-brand mx-auto" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Cadastre-se', desc: 'Preencha o formulário abaixo e aguarde a aprovação da nossa equipe em até 24h.' },
                { step: '02', title: 'Divulgue', desc: 'Receba seu link exclusivo e divulgue para suas seguidoras nas redes sociais.' },
                { step: '03', title: 'Receba', desc: 'Ganhe comissões automáticas a cada venda realizada pelo seu link.' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-terracota text-white font-display text-xl font-bold flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-display font-bold text-lg text-brand-preto mb-2">{item.title}</h3>
                  <p className="text-brand-marrom/70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section id="cadastro" className="section bg-brand-offwhite">
          <div className="container-brand max-w-2xl">
            <div className="bg-white rounded-3xl p-8 shadow-card">
              <h2 className="font-display text-2xl font-bold text-brand-preto mb-6 text-center">
                Cadastre-se como Afiliada
              </h2>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-brand-preto mb-1 block">Nome completo</label>
                    <input type="text" className="input-brand" placeholder="Seu nome" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-brand-preto mb-1 block">E-mail</label>
                    <input type="email" className="input-brand" placeholder="seu@email.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-brand-preto mb-1 block">WhatsApp</label>
                    <input type="tel" className="input-brand" placeholder="(11) 99999-9999" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-brand-preto mb-1 block">Instagram</label>
                    <input type="text" className="input-brand" placeholder="@seuusuario" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-preto mb-1 block">Seguidores no Instagram</label>
                  <select className="input-brand">
                    <option>Menos de 1.000</option>
                    <option>1.000 - 5.000</option>
                    <option>5.000 - 20.000</option>
                    <option>20.000 - 100.000</option>
                    <option>Mais de 100.000</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-preto mb-1 block">Conta bancária (Pix)</label>
                  <input type="text" className="input-brand" placeholder="CPF, e-mail ou celular" />
                </div>
                <button type="submit" className="btn-primary w-full justify-center text-base py-4">
                  Enviar Candidatura
                </button>
                <p className="text-xs text-brand-marrom/50 text-center">
                  Ao se cadastrar, você concorda com nossos <a href="/termos" className="text-brand-terracota hover:underline">Termos de Afiliação</a>.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

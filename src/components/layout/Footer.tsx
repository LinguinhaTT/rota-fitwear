'use client'

import Link from 'next/link'
import { Instagram, Youtube, Facebook, Phone, Mail, MapPin, CreditCard, Shield, Truck, RefreshCw } from 'lucide-react'

const footerLinks = {
  loja: [
    { name: 'Novidades', href: '/novidades' },
    { name: 'Mais Vendidos', href: '/mais-vendidos' },
    { name: 'Promoções', href: '/promocoes' },
    { name: 'Coleção Exclusiva', href: '/exclusiva' },
    { name: 'Conjuntos', href: '/categorias/conjuntos' },
    { name: 'Leggings', href: '/categorias/leggings' },
  ],
  ajuda: [
    { name: 'Minha Conta', href: '/conta' },
    { name: 'Meus Pedidos', href: '/conta/pedidos' },
    { name: 'Trocas e Devoluções', href: '/trocas' },
    { name: 'Rastrear Pedido', href: '/rastreamento' },
    { name: 'Tabela de Medidas', href: '/medidas' },
    { name: 'FAQ', href: '/faq' },
  ],
  empresa: [
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Blog', href: '/blog' },
    { name: 'Programa de Fidelidade', href: '/fidelidade' },
    { name: 'Seja Afiliada', href: '/afiliados' },
    { name: 'Trabalhe Conosco', href: '/carreiras' },
    { name: 'Contato', href: '/contato' },
  ],
  legal: [
    { name: 'Política de Privacidade', href: '/privacidade' },
    { name: 'Termos de Uso', href: '/termos' },
    { name: 'Política de Cookies', href: '/cookies' },
    { name: 'Política de Trocas', href: '/politica-trocas' },
  ],
}

const benefits = [
  { icon: Truck, title: 'Frete Grátis', desc: 'Acima de R$299' },
  { icon: RefreshCw, title: 'Troca Fácil', desc: 'em até 30 dias' },
  { icon: Shield, title: 'Compra Segura', desc: 'Criptografia SSL' },
  { icon: CreditCard, title: '12x Sem Juros', desc: 'Parcele no cartão' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-preto text-white">
      {/* Benefits Bar */}
      <div className="border-b border-white/10">
        <div className="container-brand py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-brand-terracota/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-terracota transition-colors duration-300">
                  <Icon className="w-5 h-5 text-brand-terracota group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">{title}</p>
                  <p className="text-xs text-white/50">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-brand py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-terracota to-brand-marrom flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">RF</span>
              </div>
              <div>
                <span className="font-display text-xl font-bold text-white block leading-none">Rota Fitwear</span>
                <span className="text-[10px] text-brand-terracota font-medium tracking-widest uppercase">Moda Fitness com Propósito</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Elevamos a autoestima através da moda fitness. Conjuntos premium criados para mulheres que buscam conforto, estilo e confiança.
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: 'https://instagram.com/rotafitwear', icon: Instagram, label: 'Instagram' },
                { href: 'https://youtube.com/rotafitwear', icon: Youtube, label: 'YouTube' },
                { href: 'https://facebook.com/rotafitwear', icon: Facebook, label: 'Facebook' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-terracota transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-brand-nude mb-5">Loja</h4>
            <ul className="space-y-3">
              {footerLinks.loja.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-brand-terracota transition-colors duration-150">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-brand-nude mb-5">Ajuda</h4>
            <ul className="space-y-3">
              {footerLinks.ajuda.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-brand-terracota transition-colors duration-150">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-brand-nude mb-5">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-brand-terracota transition-colors duration-150">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-brand-nude mb-5">Contato</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Phone className="w-4 h-4 text-brand-terracota flex-shrink-0" />
                <a href="https://wa.me/5511999999999" className="hover:text-brand-terracota transition-colors">
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Mail className="w-4 h-4 text-brand-terracota flex-shrink-0" />
                <a href="mailto:contato@rotafitwear.com.br" className="hover:text-brand-terracota transition-colors">
                  contato@rotafitwear.com.br
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-brand-terracota flex-shrink-0 mt-0.5" />
                <span>São Paulo, SP - Brasil</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <p className="text-sm font-medium text-white mb-3">Receba nossas novidades</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-brand-terracota transition-colors"
                />
                <button type="submit" className="px-4 py-2.5 bg-brand-terracota text-white rounded-xl text-sm font-medium hover:bg-brand-marrom transition-colors">
                  OK
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-white/10">
        <div className="container-brand py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Rota Fitwear. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
            </p>

            <div className="flex items-center gap-3">
              {['Visa', 'Master', 'Amex', 'Elo', 'Pix', 'Boleto'].map((pay) => (
                <div key={pay} className="px-2.5 py-1.5 bg-white/10 rounded-lg text-[10px] font-medium text-white/70">
                  {pay}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {footerLinks.legal.map((l) => (
                <Link key={l.name} href={l.href} className="text-[11px] text-white/40 hover:text-white/70 transition-colors">
                  {l.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

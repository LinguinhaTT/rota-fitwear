'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  User, ShoppingBag, Heart, Star, Gift, Users, LogOut,
  Edit, MapPin, CreditCard, Bell, Shield, ChevronRight,
  Package, Truck, CheckCircle, Clock, Wallet
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const MOCK_USER = {
  name: 'Juliana Ferreira',
  email: 'juliana@email.com',
  loyalty_tier: 'gold' as const,
  loyalty_points: 2840,
  cashback_balance: 47.50,
  wallet_balance: 120.00,
}

const TIER_CONFIG = {
  bronze: { label: 'Bronze', color: 'text-amber-700', bg: 'bg-amber-100', next: 'Prata', pointsToNext: 1000 },
  silver: { label: 'Prata', color: 'text-gray-600', bg: 'bg-gray-100', next: 'Ouro', pointsToNext: 3000 },
  gold: { label: 'Ouro', color: 'text-brand-dourado', bg: 'bg-brand-dourado/10', next: 'Diamante', pointsToNext: 8000 },
  diamond: { label: 'Diamante', color: 'text-blue-600', bg: 'bg-blue-50', next: null, pointsToNext: 0 },
}

const ORDERS = [
  { id: 'RF-2026-001', date: '20/06/2026', status: 'delivered', total: 289.90, items: 1, tracking: 'BR123456789' },
  { id: 'RF-2026-002', date: '15/06/2026', status: 'shipped', total: 479.80, items: 2, tracking: 'BR987654321' },
  { id: 'RF-2026-003', date: '10/06/2026', status: 'processing', total: 159.90, items: 1, tracking: null },
]

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="w-4 h-4" />,
  paid: <CreditCard className="w-4 h-4" />,
  processing: <Package className="w-4 h-4" />,
  shipped: <Truck className="w-4 h-4" />,
  delivered: <CheckCircle className="w-4 h-4" />,
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  paid: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-orange-100 text-orange-700',
  delivered: 'bg-green-100 text-green-700',
}

const statusLabels: Record<string, string> = {
  pending: 'Aguardando', paid: 'Pago', processing: 'Processando',
  shipped: 'Enviado', delivered: 'Entregue',
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'wishlist' | 'loyalty'>('overview')
  const tier = TIER_CONFIG[MOCK_USER.loyalty_tier]

  return (
    <div className="container-brand py-12">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* User Card */}
          <div className="bg-white rounded-2xl p-6 shadow-card text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-terracota to-brand-marrom flex items-center justify-center mx-auto mb-3 text-white font-display text-2xl font-bold">
              {MOCK_USER.name[0]}
            </div>
            <h2 className="font-display font-bold text-lg text-brand-preto">{MOCK_USER.name}</h2>
            <p className="text-sm text-brand-marrom/60 mb-3">{MOCK_USER.email}</p>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${tier.bg} ${tier.color}`}>
              <Star className="w-3 h-3" />
              {tier.label}
            </div>
          </div>

          {/* Wallet Card */}
          <div className="bg-gradient-to-br from-brand-terracota to-brand-marrom text-white rounded-2xl p-5 shadow-brand">
            <p className="text-xs font-medium text-white/70 uppercase tracking-wider mb-1">Carteira Digital</p>
            <p className="font-display text-2xl font-bold mb-3">{formatCurrency(MOCK_USER.wallet_balance)}</p>
            <div className="flex gap-3 text-xs">
              <div>
                <p className="text-white/60">Cashback</p>
                <p className="font-semibold">{formatCurrency(MOCK_USER.cashback_balance)}</p>
              </div>
              <div>
                <p className="text-white/60">Pontos</p>
                <p className="font-semibold">{MOCK_USER.loyalty_points.toLocaleString('pt-BR')}</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="bg-white rounded-2xl shadow-card overflow-hidden">
            {[
              { id: 'overview', label: 'Visão Geral', icon: User },
              { id: 'orders', label: 'Meus Pedidos', icon: ShoppingBag },
              { id: 'wishlist', label: 'Favoritos', icon: Heart },
              { id: 'loyalty', label: 'Fidelidade', icon: Gift },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-all duration-150 ${
                  activeTab === id
                    ? 'bg-brand-terracota text-white'
                    : 'text-brand-marrom/70 hover:bg-brand-offwhite hover:text-brand-preto'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
                <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
              </button>
            ))}
            <button className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors border-t border-brand-nude/20">
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h1 className="font-display text-2xl font-bold text-brand-preto">
                Olá, {MOCK_USER.name.split(' ')[0]}! 👋
              </h1>

              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: 'Pedidos', value: '12', icon: ShoppingBag, href: '#orders' },
                  { label: 'Favoritos', value: '8', icon: Heart, href: '#wishlist' },
                  { label: 'Pontos', value: MOCK_USER.loyalty_points.toLocaleString('pt-BR'), icon: Star, href: '#loyalty' },
                ].map(({ label, value, icon: Icon, href }) => (
                  <div key={label} className="bg-white rounded-2xl p-5 shadow-card text-center hover:shadow-card-hover transition-shadow">
                    <Icon className="w-6 h-6 text-brand-terracota mx-auto mb-2" />
                    <p className="font-display text-2xl font-bold text-brand-preto">{value}</p>
                    <p className="text-sm text-brand-marrom/60">{label}</p>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <div className="px-6 py-4 border-b border-brand-nude/20 flex items-center justify-between">
                  <h3 className="font-semibold text-brand-preto">Pedidos Recentes</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-xs text-brand-terracota font-medium hover:underline">
                    Ver todos
                  </button>
                </div>
                {ORDERS.slice(0, 2).map((order) => (
                  <div key={order.id} className="px-6 py-4 border-b border-brand-nude/10 hover:bg-brand-offwhite/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-brand-preto">{order.id}</p>
                        <p className="text-xs text-brand-marrom/50">{order.date} • {order.items} item(ns)</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-brand-preto">{formatCurrency(order.total)}</p>
                        <div className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${statusColors[order.status]}`}>
                          {statusIcons[order.status]}
                          {statusLabels[order.status]}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-brand-preto">Meus Pedidos</h2>
              {ORDERS.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl p-6 shadow-card">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-brand-preto">{order.id}</p>
                      <p className="text-xs text-brand-marrom/50">{order.date}</p>
                    </div>
                    <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${statusColors[order.status]}`}>
                      {statusIcons[order.status]}
                      {statusLabels[order.status]}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-brand-marrom/60">{order.items} item(ns)</p>
                    <p className="font-bold text-brand-preto">{formatCurrency(order.total)}</p>
                  </div>
                  {order.tracking && (
                    <div className="mt-3 pt-3 border-t border-brand-nude/20">
                      <p className="text-xs text-brand-marrom/60">
                        Rastreamento: <span className="font-mono text-brand-terracota">{order.tracking}</span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'loyalty' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-brand-preto">Programa de Fidelidade</h2>

              {/* Current Tier */}
              <div className="bg-gradient-to-br from-brand-dourado/20 to-brand-terracota/10 rounded-3xl p-8 border border-brand-dourado/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl ${tier.bg} flex items-center justify-center`}>
                    <Star className={`w-8 h-8 ${tier.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-brand-marrom/60">Seu nível atual</p>
                    <p className={`font-display text-3xl font-bold ${tier.color}`}>{tier.label}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="font-display text-3xl font-bold text-brand-preto">
                      {MOCK_USER.loyalty_points.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-sm text-brand-marrom/60">pontos acumulados</p>
                  </div>
                </div>

                {tier.next && (
                  <div>
                    <div className="flex justify-between text-xs text-brand-marrom/60 mb-2">
                      <span>{tier.label}</span>
                      <span>{(tier.pointsToNext - MOCK_USER.loyalty_points).toLocaleString('pt-BR')} pontos para {tier.next}</span>
                    </div>
                    <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (MOCK_USER.loyalty_points / tier.pointsToNext) * 100)}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-brand-terracota to-brand-dourado rounded-full"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Tiers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: 'Bronze', req: 'Cadastro', color: 'text-amber-700', bg: 'bg-amber-50', perks: ['5% cashback', 'Frete grátis acima R$299'] },
                  { name: 'Prata', req: '1.000 pts', color: 'text-gray-600', bg: 'bg-gray-50', perks: ['7% cashback', 'Frete grátis acima R$199', 'Acesso antecipado'] },
                  { name: 'Ouro', req: '3.000 pts', color: 'text-brand-dourado', bg: 'bg-brand-dourado/10', perks: ['10% cashback', 'Frete grátis sempre', 'Desconto aniversário 20%'] },
                  { name: 'Diamante', req: '8.000 pts', color: 'text-blue-600', bg: 'bg-blue-50', perks: ['15% cashback', 'Concierge dedicado', 'Produto exclusivo'] },
                ].map((t) => (
                  <div key={t.name} className={`p-4 rounded-2xl border-2 ${MOCK_USER.loyalty_tier === t.name.toLowerCase() ? 'border-brand-terracota' : 'border-transparent'} ${t.bg}`}>
                    <Star className={`w-5 h-5 ${t.color} mb-2`} />
                    <p className={`font-bold text-sm ${t.color}`}>{t.name}</p>
                    <p className="text-xs text-brand-marrom/50 mb-2">{t.req}</p>
                    <ul className="space-y-0.5">
                      {t.perks.map((perk) => (
                        <li key={perk} className="text-[11px] text-brand-marrom/70">✓ {perk}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

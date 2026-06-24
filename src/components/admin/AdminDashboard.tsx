'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Package, ShoppingCart, Users, Tag,
  BarChart3, Settings, Mail, Bell, LogOut, TrendingUp,
  DollarSign, Eye, Heart, Star, Truck, AlertCircle,
  ChevronUp, ChevronDown, ArrowRight
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Package, label: 'Produtos', href: '/admin/produtos' },
  { icon: ShoppingCart, label: 'Pedidos', href: '/admin/pedidos' },
  { icon: Users, label: 'Clientes', href: '/admin/clientes' },
  { icon: Tag, label: 'Cupons', href: '/admin/cupons' },
  { icon: Users, label: 'Afiliados', href: '/admin/afiliados' },
  { icon: BarChart3, label: 'Relatórios', href: '/admin/relatorios' },
  { icon: Mail, label: 'E-mails', href: '/admin/emails' },
  { icon: Bell, label: 'Notificações', href: '/admin/notificacoes' },
  { icon: Settings, label: 'Configurações', href: '/admin/configuracoes' },
]

const metrics = [
  { label: 'Faturamento Hoje', value: 4820.50, prefix: 'R$', trend: 12.5, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-50' },
  { label: 'Pedidos Hoje', value: 23, prefix: '', trend: 8.3, icon: ShoppingCart, color: 'text-brand-terracota', bg: 'bg-brand-terracota/10' },
  { label: 'Visitantes Hoje', value: 1847, prefix: '', trend: -3.2, icon: Eye, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Ticket Médio', value: 209.59, prefix: 'R$', trend: 5.1, icon: TrendingUp, color: 'text-brand-dourado', bg: 'bg-brand-dourado/10' },
]

const recentOrders = [
  { id: 'RF-001', customer: 'Juliana M.', value: 289.90, status: 'paid', date: '2026-06-24', items: 1 },
  { id: 'RF-002', customer: 'Fernanda R.', value: 479.80, status: 'processing', date: '2026-06-24', items: 2 },
  { id: 'RF-003', customer: 'Camila S.', value: 159.90, status: 'shipped', date: '2026-06-23', items: 1 },
  { id: 'RF-004', customer: 'Beatriz T.', value: 699.70, status: 'delivered', date: '2026-06-23', items: 3 },
  { id: 'RF-005', customer: 'Mariana L.', value: 349.90, status: 'pending', date: '2026-06-23', items: 1 },
]

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  shipped: 'bg-orange-100 text-orange-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

const statusLabels: Record<string, string> = {
  pending: 'Aguardando', paid: 'Pago', processing: 'Processando',
  shipped: 'Enviado', delivered: 'Entregue', cancelled: 'Cancelado',
}

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-16'} flex-shrink-0 bg-brand-preto text-white flex flex-col transition-all duration-300`}>
        {/* Logo */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-terracota to-brand-marrom flex items-center justify-center flex-shrink-0">
              <span className="text-white font-display font-bold text-xs">RF</span>
            </div>
            {isSidebarOpen && (
              <div>
                <p className="font-display font-bold text-sm">Rota Fitwear</p>
                <p className="text-[10px] text-white/50">Painel Admin</p>
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all duration-150 group"
            >
              <Icon className="w-5 h-5 flex-shrink-0 group-hover:text-brand-terracota" />
              {isSidebarOpen && <span className="text-sm font-medium">{label}</span>}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 text-white/60 hover:text-white transition-colors w-full">
            <div className="w-8 h-8 rounded-full bg-brand-terracota flex items-center justify-center flex-shrink-0 text-xs font-bold">A</div>
            {isSidebarOpen && (
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white">Admin</p>
                <p className="text-[11px] text-white/50">contato@rotafitwear.com.br</p>
              </div>
            )}
            {isSidebarOpen && <LogOut className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-brand-preto">Dashboard</h1>
            <p className="text-sm text-brand-marrom/60">Bem-vinda de volta! Aqui está o resumo de hoje.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank" className="btn-ghost text-sm">
              <Eye className="w-4 h-4" />
              Ver Loja
            </Link>
            <button className="relative btn-icon">
              <Bell className="w-5 h-5 text-brand-preto" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map(({ label, value, prefix, trend, icon: Icon, color, bg }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-5 shadow-card"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-brand-marrom/60">{label}</span>
                  <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                </div>
                <p className="font-display text-2xl font-bold text-brand-preto mb-1">
                  {prefix}{typeof value === 'number' && prefix === 'R$' ? formatCurrency(value).replace('R$', '') : value.toLocaleString('pt-BR')}
                </p>
                <div className={`flex items-center gap-1 text-xs font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {trend >= 0 ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  {Math.abs(trend)}% vs ontem
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-brand-preto">Pedidos Recentes</h3>
                <Link href="/admin/pedidos" className="text-xs text-brand-terracota font-medium hover:underline flex items-center gap-1">
                  Ver todos <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <div key={order.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-brand-preto">{order.customer}</p>
                        <p className="text-xs text-brand-marrom/50">{order.id} • {order.items} item(ns)</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-brand-preto">{formatCurrency(order.value)}</p>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              {/* Stock Alert */}
              <div className="bg-white rounded-2xl shadow-card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold text-brand-preto text-sm">Alerta de Estoque</h3>
                </div>
                {[
                  { name: 'Conjunto Ultra Soft P/Terracota', stock: 3 },
                  { name: 'Legging Sculpt GG/Nude', stock: 2 },
                  { name: 'Top Sustentação PP/Preto', stock: 1 },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-xs text-brand-marrom/70 truncate flex-1 mr-3">{item.name}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.stock <= 2 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {item.stock} un.
                    </span>
                  </div>
                ))}
              </div>

              {/* Top Products */}
              <div className="bg-white rounded-2xl shadow-card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-brand-terracota" />
                  <h3 className="font-semibold text-brand-preto text-sm">Mais Vendidos (7 dias)</h3>
                </div>
                {[
                  { name: 'Legging Sculpt Control', sales: 187, revenue: 29940.30 },
                  { name: 'Conjunto Ultra Soft', sales: 134, revenue: 38845.60 },
                  { name: 'Top Sustentação Premium', sales: 98, revenue: 12730.20 },
                ].map((item, idx) => (
                  <div key={item.name} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <span className="text-xs font-bold text-brand-nude w-4">#{idx + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-brand-preto truncate">{item.name}</p>
                      <p className="text-[11px] text-brand-marrom/50">{item.sales} vendas</p>
                    </div>
                    <span className="text-xs font-bold text-green-600">{formatCurrency(item.revenue)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

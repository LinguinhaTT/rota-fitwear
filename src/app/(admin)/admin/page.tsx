import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/admin/AdminDashboard'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Rota Fitwear',
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  // In production: check auth and role
  return <AdminDashboard />
}

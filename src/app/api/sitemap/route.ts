import { NextResponse } from 'next/server'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rotafitwear.com.br'

export async function GET() {
  const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/produtos', priority: '0.9', changefreq: 'daily' },
    { url: '/novidades', priority: '0.9', changefreq: 'daily' },
    { url: '/mais-vendidos', priority: '0.8', changefreq: 'weekly' },
    { url: '/promocoes', priority: '0.8', changefreq: 'daily' },
    { url: '/categorias/conjuntos', priority: '0.8', changefreq: 'weekly' },
    { url: '/categorias/leggings', priority: '0.8', changefreq: 'weekly' },
    { url: '/categorias/tops', priority: '0.8', changefreq: 'weekly' },
    { url: '/categorias/shorts', priority: '0.7', changefreq: 'weekly' },
    { url: '/categorias/vestidos', priority: '0.7', changefreq: 'weekly' },
    { url: '/categorias/macaquinhos', priority: '0.7', changefreq: 'weekly' },
    { url: '/blog', priority: '0.7', changefreq: 'daily' },
    { url: '/sobre', priority: '0.6', changefreq: 'monthly' },
    { url: '/contato', priority: '0.6', changefreq: 'monthly' },
    { url: '/fidelidade', priority: '0.6', changefreq: 'monthly' },
    { url: '/afiliados', priority: '0.5', changefreq: 'monthly' },
  ]

  const now = new Date().toISOString().split('T')[0]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticRoutes.map((route) => `  <url>
    <loc>${siteUrl}${route.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}

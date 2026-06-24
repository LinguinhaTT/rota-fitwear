import { NextResponse } from 'next/server'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rotafitwear.com.br'

export async function GET() {
  const content = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /conta/
Disallow: /carrinho/
Disallow: /checkout/
Disallow: /_next/

Sitemap: ${siteUrl}/sitemap.xml

# Google
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 1
`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}

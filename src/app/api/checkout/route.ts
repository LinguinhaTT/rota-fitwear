import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, address, payment_method, coupon_code } = body

    if (!items?.length) {
      return NextResponse.json({ error: 'Carrinho vazio' }, { status: 400 })
    }

    const subtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)
    const shipping = subtotal >= 299 ? 0 : 19.99
    const discount = coupon_code === 'BEMVINDA10' ? subtotal * 0.10 : 0
    const total = subtotal - discount + shipping

    if (payment_method === 'pix') {
      // In production: integrate with Mercado Pago or Stripe
      const pixTotal = total * 0.9

      return NextResponse.json({
        success: true,
        order_number: `RF-${Date.now().toString(36).toUpperCase()}`,
        payment_method: 'pix',
        total: pixTotal,
        pix_qr_code: 'data:image/png;base64,...', // QR code from MP
        pix_qr_code_text: `00020126580014br.gov.bcb.pix...`, // PIX copy-paste
        message: 'Pedido criado! Aguardando pagamento via PIX.',
      })
    }

    if (payment_method === 'credit_card') {
      // In production: create Stripe PaymentIntent
      return NextResponse.json({
        success: true,
        order_number: `RF-${Date.now().toString(36).toUpperCase()}`,
        payment_method: 'credit_card',
        total,
        client_secret: 'pi_test_...', // Stripe client secret
        message: 'Pedido criado! Complete o pagamento.',
      })
    }

    return NextResponse.json({ error: 'Método de pagamento inválido' }, { status: 400 })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

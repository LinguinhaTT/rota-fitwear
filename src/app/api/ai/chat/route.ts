import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `Você é Ana, a assistente virtual da Rota Fitwear, uma marca premium de moda fitness feminina brasileira.

Sua personalidade:
- Calorosa, empática e entusiasmada com moda fitness
- Especialista em moda fitness feminina
- Conhece todos os produtos da Rota Fitwear
- Fala em português brasileiro, de forma natural e amigável

Seus conhecimentos:
- Tabela de tamanhos: PP (36), P (38), M (40), G (42), GG (44), XGG (46)
- Para leggings e conjuntos: verifique principalmente cintura e quadril
- Guia de tamanhos: Cintura até 68cm = P, 68-74cm = M, 74-80cm = G, 80-86cm = GG
- Produtos disponíveis: Conjuntos, Leggings, Tops, Shorts, Vestidos, Macaquinhos
- Frete grátis acima de R$299
- 10% de desconto no PIX
- Parcelamento em até 12x sem juros
- Prazo de entrega: 3-7 dias úteis
- Política de troca: até 30 dias após recebimento

Como responder:
- Seja concisa (máximo 3-4 frases)
- Sempre sugira produtos relevantes
- Use emojis com moderação
- Direcione para o carrinho quando apropriado
- Para problemas complexos, sugira contato via WhatsApp (11) 99999-9999`

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { message: 'Olá! No momento estou com dificuldades técnicas. Entre em contato pelo WhatsApp: (11) 99999-9999 😊' },
        { status: 200 }
      )
    }

    const { Anthropic } = await import('@anthropic-ai/sdk')
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-10),
    })

    const message = response.content[0].type === 'text'
      ? response.content[0].text
      : 'Desculpe, não entendi sua mensagem. Como posso ajudar?'

    return NextResponse.json({ message })
  } catch (error) {
    console.error('AI Chat error:', error)
    return NextResponse.json(
      { message: 'Ops! Tive um problema. Entre em contato pelo WhatsApp: (11) 99999-9999 😊' },
      { status: 200 }
    )
  }
}

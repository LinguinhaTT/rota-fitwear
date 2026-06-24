'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, Send, Bot, User, Minimize2 } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const QUICK_PROMPTS = [
  'Qual tamanho devo escolher?',
  'Quais são os melhores conjuntos?',
  'Como cuidar das peças?',
  'Monte um look para mim',
]

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: 'Olá! 👋 Sou a Ana, assistente virtual da Rota Fitwear. Posso ajudar você a encontrar o tamanho ideal, sugerir looks incríveis e responder suas dúvidas. Como posso te ajudar hoje?',
  timestamp: new Date(),
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasNotification, setHasNotification] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [messages, isOpen])

  useEffect(() => {
    if (isOpen) {
      setHasNotification(false)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || 'Desculpe, não consegui processar sua mensagem. Tente novamente.',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Ops! Tive um problema de conexão. Que tal entrar em contato pelo WhatsApp? (11) 99999-9999',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-20 right-0 w-[360px] max-h-[520px] bg-white rounded-3xl shadow-2xl border border-brand-nude/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-brand-terracota to-brand-marrom text-white">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Ana — Assistente Rota Fitwear</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <p className="text-white/80 text-xs">Online agora</p>
                </div>
              </div>
              <button onClick={() => setIsMinimized(true)} className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setIsOpen(false)} className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-brand">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    msg.role === 'assistant'
                      ? 'bg-gradient-to-br from-brand-terracota to-brand-marrom'
                      : 'bg-brand-offwhite'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <Sparkles className="w-4 h-4 text-white" />
                    ) : (
                      <User className="w-4 h-4 text-brand-marrom" />
                    )}
                  </div>
                  <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'assistant'
                      ? 'bg-brand-offwhite text-brand-preto rounded-tl-sm'
                      : 'bg-brand-terracota text-white rounded-tr-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-terracota to-brand-marrom flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-brand-offwhite px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.4, 1] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }}
                          className="w-2 h-2 bg-brand-terracota rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full bg-brand-offwhite text-brand-marrom hover:bg-brand-terracota hover:text-white transition-colors border border-brand-nude/30"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-brand-nude/20 flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-brand-offwhite rounded-full text-sm outline-none focus:ring-2 focus:ring-brand-terracota/30 placeholder:text-brand-nude/60 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-brand-terracota text-white flex items-center justify-center hover:bg-brand-marrom transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized bar */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => setIsMinimized(false)}
            className="absolute bottom-20 right-0 flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-brand-terracota to-brand-marrom text-white rounded-2xl shadow-lg cursor-pointer hover:shadow-brand-lg transition-shadow"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Ana — Assistente</span>
            <div className="w-2 h-2 bg-green-400 rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { setIsOpen(!isOpen); setIsMinimized(false) }}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-brand-terracota to-brand-marrom text-white shadow-brand-lg flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Sparkles className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification dot */}
        {hasNotification && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">
            1
          </span>
        )}
      </motion.button>
    </div>
  )
}

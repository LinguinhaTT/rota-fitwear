'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, CheckCircle } from 'lucide-react'

interface Props {
  onSizeSelected?: (size: string) => void
}

function calculateSize(waist: number, hip: number): { size: string; confidence: number; notes: string } {
  // Size guide based on hip measurement (primary for fitness wear)
  if (hip <= 86) return { size: 'PP', confidence: 95, notes: 'Medidas indicam tamanho PP. Se preferir mais conforto, suba um tamanho.' }
  if (hip <= 90) return { size: 'P', confidence: 95, notes: 'Medidas indicam tamanho P. Encaixe perfeito para sua silhueta.' }
  if (hip <= 96) return { size: 'M', confidence: 95, notes: 'Medidas indicam tamanho M. Ideal para seu biotipo.' }
  if (hip <= 102) return { size: 'G', confidence: 90, notes: 'Medidas indicam tamanho G. Para leggings, prefira G para máximo conforto.' }
  return { size: 'GG', confidence: 90, notes: 'Medidas indicam tamanho GG. Perfeito para seu corpo.' }
}

export default function SizeCalculator({ onSizeSelected }: Props) {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [waist, setWaist] = useState('')
  const [hip, setHip] = useState('')
  const [result, setResult] = useState<{ size: string; confidence: number; notes: string } | null>(null)

  const handleCalculate = () => {
    if (!waist || !hip) return
    const rec = calculateSize(parseFloat(waist), parseFloat(hip))
    setResult(rec)
  }

  return (
    <div className="p-5 bg-brand-offwhite rounded-2xl border border-brand-nude/30">
      <h4 className="font-semibold text-brand-preto text-sm mb-4 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-brand-terracota" />
        Calculadora de Tamanho por IA
      </h4>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-xs font-medium text-brand-marrom/70 mb-1 block">Cintura (cm)</label>
          <input
            type="number" placeholder="Ex: 72" value={waist} onChange={(e) => setWaist(e.target.value)}
            className="input-brand text-sm py-2.5"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-brand-marrom/70 mb-1 block">Quadril (cm)</label>
          <input
            type="number" placeholder="Ex: 96" value={hip} onChange={(e) => setHip(e.target.value)}
            className="input-brand text-sm py-2.5"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-brand-marrom/70 mb-1 block">Peso (kg) — opcional</label>
          <input
            type="number" placeholder="Ex: 65" value={weight} onChange={(e) => setWeight(e.target.value)}
            className="input-brand text-sm py-2.5"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-brand-marrom/70 mb-1 block">Altura (cm) — opcional</label>
          <input
            type="number" placeholder="Ex: 165" value={height} onChange={(e) => setHeight(e.target.value)}
            className="input-brand text-sm py-2.5"
          />
        </div>
      </div>

      <button
        onClick={handleCalculate}
        disabled={!waist || !hip}
        className="w-full btn-primary text-sm py-3 disabled:opacity-50"
      >
        <Sparkles className="w-4 h-4" />
        Calcular meu tamanho
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-white rounded-xl border border-brand-terracota/30"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-brand-terracota flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">{result.size}</span>
            </div>
            <div>
              <p className="font-semibold text-brand-preto">Tamanho recomendado: <span className="text-brand-terracota">{result.size}</span></p>
              <p className="text-xs text-brand-marrom/60">{result.confidence}% de confiança</p>
            </div>
          </div>
          <p className="text-xs text-brand-marrom/70 mb-3">{result.notes}</p>
          {onSizeSelected && (
            <button
              onClick={() => onSizeSelected(result.size)}
              className="flex items-center gap-2 text-sm font-semibold text-brand-terracota hover:underline"
            >
              <CheckCircle className="w-4 h-4" />
              Selecionar tamanho {result.size}
            </button>
          )}
        </motion.div>
      )}

      {/* Size guide */}
      <div className="mt-4 pt-4 border-t border-brand-nude/30">
        <p className="text-xs font-semibold text-brand-preto mb-2">Tabela de Medidas</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-brand-marrom/70">
            <thead>
              <tr className="border-b border-brand-nude/30">
                <th className="text-left py-1 font-semibold text-brand-preto">Tam.</th>
                <th className="py-1 font-semibold text-brand-preto">Cintura</th>
                <th className="py-1 font-semibold text-brand-preto">Quadril</th>
              </tr>
            </thead>
            <tbody>
              {[
                { size: 'PP', waist: 'até 68cm', hip: 'até 86cm' },
                { size: 'P', waist: '68-72cm', hip: '86-90cm' },
                { size: 'M', waist: '72-78cm', hip: '90-96cm' },
                { size: 'G', waist: '78-84cm', hip: '96-102cm' },
                { size: 'GG', waist: '84-90cm', hip: '102-108cm' },
              ].map((row) => (
                <tr key={row.size} className={`border-b border-brand-nude/20 ${result?.size === row.size ? 'bg-brand-terracota/10 font-semibold text-brand-terracota' : ''}`}>
                  <td className="py-1.5">{row.size}</td>
                  <td className="py-1.5 text-center">{row.waist}</td>
                  <td className="py-1.5 text-center">{row.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

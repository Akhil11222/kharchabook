'use client'

import { motion } from 'framer-motion'
import { SmartInsights as SmartInsightsType, Expense } from '@/lib/types'
import { formatCurrency } from '@/lib/calculations'

interface SmartInsightsProps {
  insights: SmartInsightsType
  currentExpenses: Expense[]
}

export default function SmartInsights({ insights, currentExpenses }: SmartInsightsProps) {
  const {
    avgPerDay,
    daysRemaining,
    biggestExpense,
    totalEntries,
    spendingStreak,
  } = insights

  if (currentExpenses.length === 0) return null

  const cards = [
    {
      emoji: '📊',
      label: 'Avg per day',
      value: formatCurrency(Math.round(avgPerDay)),
      sub: 'Is mahine ka daily average',
      show: avgPerDay > 0,
    },
    {
      emoji: '⏱️',
      label: 'Balance khatam hoga',
      value: daysRemaining !== null ? `${daysRemaining} din mein` : null,
      sub: 'Is rate se chalte rahe toh',
      show: daysRemaining !== null,
      urgent: daysRemaining !== null && daysRemaining < 7,
    },
    {
      emoji: '👑',
      label: 'Sabse bada kharcha',
      value: biggestExpense ? formatCurrency(biggestExpense.amount) : null,
      sub: biggestExpense?.title,
      show: biggestExpense !== null,
    },
    {
      emoji: '📋',
      label: 'Total entries',
      value: `${totalEntries} kharche`,
      sub: 'Is mahine',
      show: totalEntries > 0,
    },
  ].filter((c) => c.show && c.value !== null)

  if (cards.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="mb-4"
    >
      <div className="grid grid-cols-2 gap-2.5">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className={`bg-white rounded-2xl shadow-card p-4 ${
              card.urgent ? 'border-2 border-garnet/40 animate-pulse-soft' : ''
            }`}
          >
            <div className="text-xl mb-1">{card.emoji}</div>
            <div className={`font-black text-base ${
              card.urgent ? 'text-garnet' : 'text-gray-800'
            }`}>
              {card.value}
            </div>
            <div className="text-xs text-gray-400 font-semibold mt-0.5 truncate">{card.sub}</div>
            <div className="text-xs text-bistre-gold/70 font-bold mt-1">{card.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}


'use client'

import { motion } from 'framer-motion'
import { TrendingDown, Clock, Crown, ListChecks } from 'lucide-react'
import { SmartInsights as SmartInsightsType, Expense } from '@/lib/types'
import { formatCurrency } from '@/lib/calculations'

export default function SmartInsights({
  insights, currentExpenses,
}: {
  insights: SmartInsightsType; currentExpenses: Expense[]
}) {
  const { avgPerDay, daysRemaining, biggestExpense, totalEntries } = insights
  if (currentExpenses.length === 0) return null

  const cards = [
    {
      icon: TrendingDown,
      label: 'Daily average',
      value: formatCurrency(Math.round(avgPerDay)),
      sub: 'Spent per day this month',
      show: avgPerDay > 0,
      urgent: false,
    },
    {
      icon: Clock,
      label: 'Balance lasts',
      value: daysRemaining !== null ? `${daysRemaining} more days` : null,
      sub: 'At the current spending rate',
      show: daysRemaining !== null,
      urgent: daysRemaining !== null && daysRemaining < 7,
    },
    {
      icon: Crown,
      label: 'Biggest expense',
      value: biggestExpense ? formatCurrency(biggestExpense.amount) : null,
      sub: biggestExpense?.title ?? '',
      show: biggestExpense !== null,
      urgent: false,
    },
    {
      icon: ListChecks,
      label: 'Entries this month',
      value: `${totalEntries}`,
      sub: 'Expenses logged',
      show: totalEntries > 0,
      urgent: false,
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
            className={`bg-surface rounded-2xl shadow-card p-4 ${
              card.urgent ? 'border-2 border-garnet/40 animate-pulse-soft' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${
              card.urgent ? 'bg-garnet/10' : 'bg-bistre-gold/10'
            }`}>
              <card.icon size={15} className={card.urgent ? 'text-garnet' : 'text-bistre-gold'} />
            </div>
            <div className={`font-black text-base ${card.urgent ? 'text-garnet' : 'text-text-dark'}`}>
              {card.value}
            </div>
            <div className="text-xs text-text-mid font-semibold mt-0.5 truncate">{card.sub}</div>
            <div className="text-xs text-bistre-gold/70 font-bold mt-1">{card.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

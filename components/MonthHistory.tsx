'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Trophy, AlertCircle, TrendingUp, History } from 'lucide-react'
import { MonthSummary, Expense } from '@/lib/types'
import { formatCurrency, groupExpensesByDate, formatTime } from '@/lib/calculations'

interface MonthHistoryProps {
  summaries: MonthSummary[]
}

function StatusBadge({ status }: { status: MonthSummary['status'] }) {
  const configs = {
    saved: { text: 'Bachaya!', icon: Trophy, className: 'bg-finch/15 text-finch border border-finch/30' },
    tight: { text: 'Tight tha', icon: AlertCircle, className: 'bg-indian-red/15 text-indian-red border border-indian-red/30' },
    overspent: { text: 'Overspent', icon: TrendingUp, className: 'bg-garnet/15 text-garnet border border-garnet/30' },
  }
  const config = configs[status]
  const Icon = config.icon
  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${config.className}`}>
      <Icon size={10} />
      {config.text}
    </span>
  )
}

function MonthCard({ summary }: { summary: MonthSummary }) {
  const [expanded, setExpanded] = useState(false)
  const grouped = groupExpensesByDate(summary.expenses)

  return (
    <motion.div
      layout
      className="bg-card-surface rounded-2xl shadow-card overflow-hidden"
    >
      {/* Card Header */}
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full text-left p-4 flex items-center gap-3"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-black text-stone-800 text-sm">{summary.month_label}</h3>
            <StatusBadge status={summary.status} />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="text-xs text-stone-500 font-semibold">
              Salary: {formatCurrency(summary.salary)}
            </span>
            <span className="text-xs text-stone-500 font-semibold">
              Spent: {formatCurrency(summary.total_spent)}
            </span>
            <span className={`text-xs font-bold ${
              summary.saved >= 0 ? 'text-finch' : 'text-garnet'
            }`}>
              {summary.saved >= 0
                ? `Saved: ${formatCurrency(summary.saved)}`
                : `Over: ${formatCurrency(Math.abs(summary.saved))}`
              }
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 text-bistre-gold">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-stone-200/60 px-4 pb-4 pt-3">
              {summary.expenses.length === 0 ? (
                <p className="text-stone-400 text-sm font-semibold text-center py-4">
                  Is mahine koi kharcha record nahi tha.
                </p>
              ) : (
                <div className="space-y-3">
                  {grouped.map(({ date, label, expenses }) => (
                    <div key={date}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-black text-stone-400 uppercase tracking-wider">
                          {label}
                        </span>
                        <div className="flex-1 h-px bg-stone-200/60" />
                      </div>
                      <div className="space-y-1.5">
                        {expenses.map((expense: Expense) => (
                          <div
                            key={expense.id}
                            className="flex items-center justify-between bg-butter-light/50 rounded-xl px-3 py-2"
                          >
                            <div>
                              <p className="text-sm font-bold text-stone-700">{expense.title}</p>
                              <p className="text-xs text-stone-400 font-semibold">{formatTime(expense.time)}</p>
                            </div>
                            <span className="font-black text-stone-700 text-sm">
                              {formatCurrency(expense.amount)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function MonthHistory({ summaries }: MonthHistoryProps) {
  const [sectionOpen, setSectionOpen] = useState(false)

  return (
    <div className="mb-4">
      <button
        onClick={() => setSectionOpen((p) => !p)}
        className="w-full flex items-center justify-between mb-3 py-1"
      >
        <h2 className="text-lg font-black text-butter flex items-center gap-2">
          <History size={18} className="text-butter-dark" />
          Purane Mahine
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-white/10 text-butter/60 font-bold px-2.5 py-1 rounded-full">
            {summaries.length} months
          </span>
          {sectionOpen ? (
            <ChevronUp size={20} className="text-butter" />
          ) : (
            <ChevronDown size={20} className="text-butter" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {sectionOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3">
              {summaries.map((summary) => (
                <MonthCard key={summary.month_key} summary={summary} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


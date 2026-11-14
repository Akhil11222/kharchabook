'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Trophy, AlertCircle, TrendingUp, History } from 'lucide-react'
import { MonthSummary, Expense } from '@/lib/types'
import { formatCurrency, groupExpensesByDate, formatTime } from '@/lib/calculations'

function StatusBadge({ status }: { status: MonthSummary['status'] }) {
  const configs = {
    saved:     { text: 'Saved',      icon: Trophy,       cls: 'bg-finch/12 text-finch border border-finch/30' },
    tight:     { text: 'Tight',      icon: AlertCircle,  cls: 'bg-indian-red/12 text-indian-red border border-indian-red/30' },
    overspent: { text: 'Overspent',  icon: TrendingUp,   cls: 'bg-garnet/12 text-garnet border border-garnet/30' },
  }
  const { text, icon: Icon, cls } = configs[status]
  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${cls}`}>
      <Icon size={10} /> {text}
    </span>
  )
}

function MonthCard({ summary }: { summary: MonthSummary }) {
  const [expanded, setExpanded] = useState(false)
  const grouped = groupExpensesByDate(summary.expenses)

  return (
    <motion.div layout className="bg-surface rounded-2xl shadow-card overflow-hidden">
      <button onClick={() => setExpanded((p) => !p)}
        className="w-full text-left p-4 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-black text-text-dark text-sm">{summary.month_label}</h3>
            <StatusBadge status={summary.status} />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="text-xs text-text-mid font-semibold">Salary: {formatCurrency(summary.salary)}</span>
            <span className="text-xs text-text-mid font-semibold">Spent: {formatCurrency(summary.total_spent)}</span>
            <span className={`text-xs font-bold ${summary.saved >= 0 ? 'text-finch' : 'text-garnet'}`}>
              {summary.saved >= 0
                ? `Saved: ${formatCurrency(summary.saved)}`
                : `Over: ${formatCurrency(Math.abs(summary.saved))}`}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 text-bistre-gold">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-text-mid/10 px-4 pb-4 pt-3">
              {summary.expenses.length === 0 ? (
                <p className="text-text-mid text-sm font-semibold text-center py-4">
                  No expenses recorded this month.
                </p>
              ) : (
                <div className="space-y-3">
                  {grouped.map(({ date, label, expenses }) => (
                    <div key={date}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-black text-text-mid uppercase tracking-wider">{label}</span>
                        <div className="flex-1 h-px bg-text-mid/15" />
                      </div>
                      <div className="space-y-1.5">
                        {expenses.map((expense: Expense) => (
                          <div key={expense.id}
                            className="flex items-center justify-between bg-butter rounded-xl px-3 py-2">
                            <div>
                              <p className="text-sm font-bold text-text-dark">{expense.title}</p>
                              <p className="text-xs text-text-mid font-semibold">{formatTime(expense.time)}</p>
                            </div>
                            <span className="font-black text-text-dark text-sm">{formatCurrency(expense.amount)}</span>
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

export default function MonthHistory({ summaries }: { summaries: MonthSummary[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-4">
      <button onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between mb-3 py-1">
        <h2 className="text-base font-black text-text-dark flex items-center gap-2">
          <History size={16} className="text-bistre-gold" />
          Past Months
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-bistre-gold/10 text-bistre-gold font-bold px-2.5 py-1 rounded-full">
            {summaries.length} months
          </span>
          {open
            ? <ChevronUp size={18} className="text-bistre-gold" />
            : <ChevronDown size={18} className="text-bistre-gold" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3">
              {summaries.map((s) => <MonthCard key={s.month_key} summary={s} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

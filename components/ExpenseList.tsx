'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, CheckCircle, IndianRupee, CalendarDays } from 'lucide-react'
import { Expense } from '@/lib/types'
import { groupExpensesByDate, formatCurrency, formatTime } from '@/lib/calculations'

interface ExpenseListProps {
  expenses: Expense[]
  onDelete: (id: string) => void
}

function ConfirmDelete({ expense, onConfirm, onCancel }: {
  expense: Expense; onConfirm: () => void; onCancel: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center px-4 pb-6"
      onClick={onCancel}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[480px] bg-surface rounded-3xl p-6 shadow-card-lg"
      >
        <div className="text-center mb-5">
          <div className="w-12 h-12 bg-indian-red/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Trash2 size={22} className="text-indian-red" />
          </div>
          <h3 className="font-black text-text-dark text-lg">Delete this entry?</h3>
          <p className="text-text-mid text-sm font-semibold mt-1">
            &ldquo;{expense.title}&rdquo; &mdash; {formatCurrency(expense.amount)}
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 py-3.5 rounded-2xl border-2 border-text-mid/20 font-bold text-text-mid active:scale-95 transition-all">
            Keep it
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-3.5 rounded-2xl bg-indian-red text-white font-bold active:scale-95 transition-all">
            Yes, delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  const [pendingDelete, setPendingDelete] = useState<Expense | null>(null)
  const grouped = groupExpensesByDate(expenses)

  if (expenses.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="bg-surface rounded-3xl shadow-card p-8 text-center">
        <div className="w-14 h-14 bg-finch-soft rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={28} className="text-finch" />
        </div>
        <p className="font-black text-text-dark text-lg">Nothing spent yet!</p>
        <p className="text-text-mid font-semibold text-sm mt-1">Your balance is fully intact.</p>
      </motion.div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {grouped.map(({ date, label, expenses: dayExpenses }) => (
          <div key={date}>
            {/* Date header */}
            <div className="flex items-center gap-2 mb-2">
              <CalendarDays size={12} className="text-text-mid flex-shrink-0" />
              <span className="text-xs font-black text-text-mid uppercase tracking-wider">{label}</span>
              <div className="flex-1 h-px bg-text-mid/15" />
              <span className="text-xs font-bold text-bistre-gold">
                {formatCurrency(dayExpenses.reduce((s, e) => s + e.amount, 0))}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-2">
              <AnimatePresence initial={false}>
                {dayExpenses.map((expense) => (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, x: -20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="bg-surface rounded-2xl shadow-card border-l-4 border-bistre-gold
                               flex items-center gap-3 px-4 py-3"
                  >
                    <div className="w-8 h-8 bg-bistre-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IndianRupee size={14} className="text-bistre-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-text-dark text-sm truncate">{expense.title}</p>
                      <p className="text-text-mid text-xs font-semibold mt-0.5">{formatTime(expense.time)}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="font-black text-text-dark text-sm">{formatCurrency(expense.amount)}</span>
                      <button
                        onClick={() => setPendingDelete(expense)}
                        className="w-7 h-7 rounded-xl bg-indian-red/8 flex items-center justify-center active:scale-90 transition-all hover:bg-indian-red/15"
                        aria-label="Delete expense">
                        <X size={14} className="text-indian-red" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {pendingDelete && (
          <ConfirmDelete
            expense={pendingDelete}
            onConfirm={() => { onDelete(pendingDelete.id); setPendingDelete(null) }}
            onCancel={() => setPendingDelete(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

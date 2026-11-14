'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Expense } from '@/lib/types'
import { groupExpensesByDate, formatCurrency, formatTime } from '@/lib/calculations'

interface ExpenseListProps {
  expenses: Expense[]
  onDelete: (id: string) => void
}

interface ConfirmDeleteProps {
  expense: Expense
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmDelete({ expense, onConfirm, onCancel }: ConfirmDeleteProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end justify-center px-4 pb-6"
      onClick={onCancel}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[480px] bg-white rounded-3xl p-6 shadow-card-lg"
      >
        <div className="text-center mb-5">
          <div className="text-4xl mb-2">🗑️</div>
          <h3 className="font-black text-gray-800 text-lg">Delete karu?</h3>
          <p className="text-gray-500 text-sm font-semibold mt-1">
            &ldquo;{expense.title}&rdquo; — {formatCurrency(expense.amount)}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3.5 rounded-2xl border-2 border-gray-200 font-bold text-gray-600 active:scale-95 transition-all"
          >
            Nahi, rehne do
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3.5 rounded-2xl bg-indian-red text-white font-bold active:scale-95 transition-all"
          >
            Ha, delete karo
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-3xl shadow-card p-8 text-center"
      >
        <div className="text-6xl mb-4">🎉</div>
        <p className="font-black text-gray-700 text-lg">Abhi tak kuch nahi gaya!</p>
        <p className="text-gray-400 font-semibold text-sm mt-1">Paisa safe hai. Keep it up! 💪</p>
      </motion.div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {grouped.map(({ date, label, expenses: dayExpenses }) => (
          <div key={date}>
            {/* Date Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black text-gray-500 uppercase tracking-wider">
                📅 {label}
              </span>
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs font-bold text-bistre-gold">
                {formatCurrency(dayExpenses.reduce((s, e) => s + e.amount, 0))}
              </span>
            </div>

            {/* Expense Items */}
            <div className="space-y-2">
              <AnimatePresence initial={false}>
                {dayExpenses.map((expense) => (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, x: -20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="bg-white rounded-2xl shadow-card border-l-4 border-bistre-gold
                               flex items-center gap-3 px-4 py-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 text-sm truncate">{expense.title}</p>
                      <p className="text-gray-400 text-xs font-semibold mt-0.5">
                        {formatTime(expense.time)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="font-black text-gray-800 text-sm">
                        {formatCurrency(expense.amount)}
                      </span>
                      <button
                        onClick={() => setPendingDelete(expense)}
                        className="w-7 h-7 rounded-xl bg-indian-red/10 flex items-center justify-center
                                   active:scale-90 transition-all hover:bg-indian-red/20"
                        aria-label="Delete expense"
                      >
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

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {pendingDelete && (
          <ConfirmDelete
            expense={pendingDelete}
            onConfirm={() => {
              onDelete(pendingDelete.id)
              setPendingDelete(null)
            }}
            onCancel={() => setPendingDelete(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}


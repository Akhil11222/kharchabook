'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Expense } from '@/lib/types'

interface AddExpenseFormProps {
  onAdd: (expense: Expense) => void
}

export default function AddExpenseForm({ onAdd }: AddExpenseFormProps) {
  const [title, setTitle]   = useState('')
  const [amount, setAmount] = useState('')
  const [errors, setErrors] = useState<{ title?: string; amount?: string }>({})
  const [submitting, setSubmitting] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)

  const validate = () => {
    const e: { title?: string; amount?: string } = {}
    if (!title.trim())              e.title  = 'Please enter what you spent on.'
    if (!amount || parseFloat(amount) <= 0) e.amount = 'Enter a valid amount.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    setSubmitting(true)

    const now      = new Date()
    const dateStr  = now.toISOString().slice(0, 10)
    const timeStr  = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

    const expense: Expense = {
      id: crypto.randomUUID(),
      title: title.trim(),
      amount: parseFloat(amount),
      date: dateStr,
      time: timeStr,
      timestamp: now.toISOString(),
      month_key: monthKey,
    }

    onAdd(expense)
    setTitle(''); setAmount(''); setErrors({})
    setSubmitting(false)
    setTimeout(() => titleRef.current?.focus(), 100)
  }

  const inputBase = `w-full bg-butter rounded-2xl px-4 py-3.5 text-text-dark font-semibold
                     placeholder-text-mid/50 text-sm focus:outline-none transition-colors duration-150 border-2`

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-surface rounded-3xl shadow-card p-5 mb-4"
    >
      <h3 className="text-base font-black text-text-dark mb-4 flex items-center gap-2">
        <Plus size={18} className="text-bistre-gold" />
        New Expense
      </h3>

      <div className="flex flex-col gap-3">
        {/* Title */}
        <div>
          <input
            ref={titleRef}
            type="text"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: undefined })) }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="What did you spend on? (Rent, food, anything...)"
            className={`${inputBase} ${errors.title ? 'border-indian-red' : 'border-bistre-gold/25 focus:border-bistre-gold'}`}
            maxLength={80}
          />
          {errors.title && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
              className="text-indian-red text-xs font-bold mt-1 ml-2">
              {errors.title}
            </motion.p>
          )}
        </div>

        {/* Amount + Submit */}
        <div className="flex gap-2">
          <div className="flex-1">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-bistre-gold font-black text-lg">₹</span>
              <input
                type="number"
                inputMode="decimal"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setErrors((p) => ({ ...p, amount: undefined })) }}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Amount"
                className={`${inputBase} pl-8 ${errors.amount ? 'border-indian-red' : 'border-bistre-gold/25 focus:border-bistre-gold'}`}
                min="0" step="0.01"
              />
            </div>
            {errors.amount && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                className="text-indian-red text-xs font-bold mt-1 ml-2">
                {errors.amount}
              </motion.p>
            )}
          </div>

          <motion.button
            onClick={handleSubmit}
            disabled={submitting}
            whileTap={{ scale: 0.92 }}
            className="gradient-gold text-white font-black rounded-2xl px-5 py-3.5 flex items-center gap-1.5
                       shadow-card active:shadow-none transition-all duration-150 whitespace-nowrap text-sm"
          >
            <Plus size={18} />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

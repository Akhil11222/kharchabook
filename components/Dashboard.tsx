'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, CalendarDays, ClipboardCopy, Trophy } from 'lucide-react'
import { KharchaBookData, Expense } from '@/lib/types'
import { addExpense, deleteExpense, getCurrentSalary, getExpensesForMonth, getCurrentMonthKey, loadData } from '@/lib/storage'
import { calculateSmartInsights, getMonthSummaries, generateShareText, getMonthLabel } from '@/lib/calculations'
import SalaryCard from './SalaryCard'
import AddExpenseForm from './AddExpenseForm'
import ExpenseList from './ExpenseList'
import MonthHistory from './MonthHistory'
import SmartInsights from './SmartInsights'
import Confetti from './Confetti'

interface DashboardProps {
  data: KharchaBookData
  onDataUpdate: (data: KharchaBookData) => void
  onEditSalary: () => void
}

export default function Dashboard({ data, onDataUpdate, onEditSalary }: DashboardProps) {
  const [animateBalance, setAnimateBalance] = useState(false)
  const [shareToast,     setShareToast]     = useState(false)

  const monthKey        = getCurrentMonthKey()
  const salary          = getCurrentSalary(data)
  const currentExpenses = getExpensesForMonth(data, monthKey)
  const totalSpent      = currentExpenses.reduce((sum, e) => sum + e.amount, 0)
  const balance         = salary - totalSpent
  const insights        = calculateSmartInsights(data)
  const monthSummaries  = getMonthSummaries(data)
  const monthLabel      = getMonthLabel(monthKey)

  const handleAddExpense = (expense: Expense) => {
    const newData = addExpense(expense)
    onDataUpdate(newData)
    setAnimateBalance(true)
    setTimeout(() => setAnimateBalance(false), 500)
  }

  const handleDeleteExpense = (id: string) => {
    const newData = deleteExpense(id)
    onDataUpdate(newData)
  }

  const handleShare = () => {
    const text = generateShareText(data)
    if (navigator.share) {
      navigator.share({ text }).catch(() => {})
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setShareToast(true)
        setTimeout(() => setShareToast(false), 2500)
      })
    }
  }

  useEffect(() => {
    const handleFocus = () => onDataUpdate(loadData())
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [onDataUpdate])

  return (
    /* Warm cream app background */
    <div className="min-h-screen" style={{ background: '#F5EDD5' }}>
      {insights.showCelebration && <Confetti />}

      {/* Share toast */}
      <AnimatePresence>
        {shareToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-finch text-white font-bold text-sm py-3 px-6 rounded-full shadow-card-lg flex items-center gap-2"
          >
            <ClipboardCopy size={14} />
            Summary copied!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[480px] mx-auto px-4 pb-16 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-bistre-gold" />
            <span className="text-lg font-black text-bistre-gold">KharchaBook</span>
          </div>
          <div className="text-sm text-text-mid font-semibold">{monthLabel}</div>
        </div>

        {/* Salary card */}
        <SalaryCard
          salary={salary} totalSpent={totalSpent} balance={balance}
          zone={insights.zone} zonePercent={insights.zonePercent}
          animateBalance={animateBalance}
          onEditSalary={onEditSalary} onShare={handleShare}
          streak={insights.spendingStreak}
        />

        {/* Insights */}
        <SmartInsights insights={insights} currentExpenses={currentExpenses} />

        {/* Add expense */}
        <AddExpenseForm onAdd={handleAddExpense} />

        {/* Celebration */}
        <AnimatePresence>
          {insights.showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="bg-finch-soft border-2 border-finch/30 rounded-2xl p-4 text-center mb-4 flex flex-col items-center gap-1"
            >
              <Trophy size={22} className="text-finch" />
              <p className="font-black text-finch">Great job! Balance still strong.</p>
              <p className="text-sm text-finch/70 font-semibold">Month almost over — well done!</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* This month */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-black text-text-dark flex items-center gap-2">
              <CalendarDays size={16} className="text-bistre-gold" />
              This Month
            </h2>
            <span className="text-xs bg-bistre-gold/10 text-bistre-gold font-bold px-2.5 py-1 rounded-full">
              {insights.totalEntries} entries
            </span>
          </div>
          <ExpenseList expenses={currentExpenses} onDelete={handleDeleteExpense} />
        </div>

        {/* History */}
        {monthSummaries.length > 0 && <MonthHistory summaries={monthSummaries} />}
      </div>
    </div>
  )
}

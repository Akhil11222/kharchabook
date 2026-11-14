'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, IndianRupee } from 'lucide-react'
import { setSalary } from '@/lib/storage'
import { KharchaBookData } from '@/lib/types'

interface SalarySetupProps {
  existingSalary: number
  onSalarySet: (data: KharchaBookData) => void
  onBack?: () => void
}

export default function SalarySetup({ existingSalary, onSalarySet, onBack }: SalarySetupProps) {
  const [amount, setAmount]       = useState(existingSalary > 0 ? String(existingSalary) : '')
  const [error, setError]         = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    const val = parseFloat(amount)
    if (!amount || isNaN(val) || val <= 0) {
      setError('Please enter a valid salary amount.')
      return
    }
    if (val > 10000000) {
      setError('Please enter a realistic amount.')
      return
    }
    setError('')
    setSubmitted(true)
    setTimeout(() => { const d = setSalary(val); onSalarySet(d) }, 600)
  }

  const formatPreview = (val: string) => {
    const n = parseFloat(val)
    return isNaN(n) ? '' : `₹${n.toLocaleString('en-IN')}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}
      className="min-h-screen gradient-landing flex flex-col max-w-[480px] mx-auto px-6 py-10"
    >
      {/* Back */}
      {onBack && (
        <motion.button onClick={onBack}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="flex items-center gap-2 text-butter/70 font-bold mb-8 w-fit">
          <ArrowLeft size={20} />
          <span>Back</span>
        </motion.button>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="text-center mb-12 flex-shrink-0"
      >
        <div className="w-16 h-16 bg-garnet/40 border border-bistre-mid/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <IndianRupee size={32} className="text-butter-mid" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-black text-butter leading-tight">
          {existingSalary > 0
            ? 'Update your monthly salary'
            : 'What is your monthly salary?'}
        </h1>
        <p className="text-butter/45 font-semibold mt-2 text-sm">
          {existingSalary > 0
            ? `Currently set to: ₹${existingSalary.toLocaleString('en-IN')}`
            : 'Stored only on your device — completely private.'}
        </p>
      </motion.div>

      {/* Input section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="flex-1 flex flex-col gap-4"
      >
        {/* Amount input */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black text-bistre-mid">₹</div>
          <input
            type="number" inputMode="numeric" value={amount}
            onChange={(e) => { setAmount(e.target.value); setError('') }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="25000"
            className="w-full bg-white/10 border-2 border-bistre-mid/30 rounded-3xl pl-12 pr-6 py-5
                       text-3xl font-black text-butter placeholder-butter/25
                       focus:outline-none focus:border-bistre-mid transition-colors duration-150"
            autoFocus
          />
        </div>

        {/* Preview */}
        {amount && !error && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <span className="text-butter-mid font-black text-xl">{formatPreview(amount)} / month</span>
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            className="text-indian-red font-bold text-sm text-center bg-indian-red/10 py-2 px-4 rounded-xl">
            {error}
          </motion.p>
        )}

        {/* Quick picks */}
        <div className="mt-2">
          <p className="text-xs text-butter/35 font-semibold mb-2 text-center">Or pick a preset:</p>
          <div className="grid grid-cols-3 gap-2">
            {[15000, 25000, 35000, 50000, 75000, 100000].map((amt) => (
              <button key={amt}
                onClick={() => { setAmount(String(amt)); setError('') }}
                className={`py-2.5 px-3 rounded-2xl border-2 text-sm font-bold transition-all duration-150 active:scale-95
                  ${amount === String(amt)
                    ? 'bg-bistre-gold text-white border-bistre-gold'
                    : 'bg-white/8 border-bistre-mid/25 text-butter/70 hover:border-bistre-mid'}`}>
                ₹{(amt / 1000).toFixed(0)}k
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1" />

        {/* Submit */}
        <motion.button
          onClick={handleSubmit} disabled={submitted}
          whileTap={{ scale: 0.96 }}
          className={`w-full py-5 rounded-3xl font-black text-xl shadow-card-lg
                      flex items-center justify-center gap-3 transition-all duration-300
                      ${submitted ? 'bg-finch text-white' : 'gradient-gold text-white'}`}>
          {submitted ? (
            <><Check size={24} /><span>Done!</span></>
          ) : (
            <span>Save Salary</span>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35 }}
      className="h-[100dvh] max-h-[100dvh] overflow-hidden gradient-landing flex flex-col justify-between px-5 py-4 sm:py-6 max-w-[440px] mx-auto select-none"
    >
      {/* Top Bar / Back */}
      <div className="flex-shrink-0 min-h-[32px]">
        {onBack ? (
          <motion.button
            onClick={onBack}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1.5 text-butter/70 hover:text-butter font-bold text-sm w-fit transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </motion.button>
        ) : <div />}
      </div>

      {/* Main Content Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="my-auto flex flex-col gap-3 sm:gap-4 w-full"
      >
        {/* Icon & Title */}
        <div className="text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-garnet/40 border border-bistre-mid/30 rounded-2xl flex items-center justify-center mx-auto mb-2.5">
            <IndianRupee className="w-6 h-6 sm:w-7 sm:h-7 text-butter-mid" strokeWidth={1.5} />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-butter leading-tight">
            {existingSalary > 0
              ? 'Update your monthly salary'
              : 'What is your monthly salary?'}
          </h1>
          <p className="text-butter/45 font-medium mt-1 text-xs sm:text-sm">
            {existingSalary > 0
              ? `Currently: ₹${existingSalary.toLocaleString('en-IN')}`
              : 'Stored only on your device — completely private.'}
          </p>
        </div>

        {/* Input Box */}
        <div className="relative mt-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black text-bistre-mid">₹</div>
          <input
            type="number"
            inputMode="numeric"
            value={amount}
            onChange={(e) => { setAmount(e.target.value); setError('') }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="25000"
            className="w-full bg-white/10 border-2 border-bistre-mid/30 rounded-2xl sm:rounded-3xl pl-11 pr-5 py-3.5 sm:py-4
                       text-2xl sm:text-3xl font-black text-butter placeholder-butter/25
                       focus:outline-none focus:border-bistre-mid transition-colors"
            autoFocus
          />
        </div>

        {/* Amount Preview */}
        {amount && !error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <span className="text-butter-mid font-black text-base sm:text-lg">{formatPreview(amount)} / month</span>
          </motion.div>
        )}

        {/* Error Notification */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-indian-red font-bold text-xs sm:text-sm text-center bg-indian-red/10 py-1.5 px-3 rounded-xl"
          >
            {error}
          </motion.p>
        )}

        {/* Preset Amounts */}
        <div className="mt-1">
          <p className="text-[11px] sm:text-xs text-butter/35 font-semibold mb-1.5 text-center">Quick select:</p>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {[15000, 25000, 35000, 50000, 75000, 100000].map((amt) => (
              <button
                key={amt}
                onClick={() => { setAmount(String(amt)); setError('') }}
                className={`py-2 px-2 rounded-xl border text-xs sm:text-sm font-bold transition-all active:scale-95
                  ${amount === String(amt)
                    ? 'bg-bistre-gold text-white border-bistre-gold'
                    : 'bg-white/5 border-bistre-mid/25 text-butter/70 hover:border-bistre-mid'}`}
              >
                ₹{(amt / 1000).toFixed(0)}k
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom Submit CTA */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="w-full flex-shrink-0 pt-2"
      >
        <motion.button
          onClick={handleSubmit}
          disabled={submitted}
          whileTap={{ scale: 0.96 }}
          className={`w-full py-3.5 sm:py-4 rounded-2xl sm:rounded-3xl font-black text-base sm:text-lg shadow-card-lg
                      flex items-center justify-center gap-2.5 transition-all
                      ${submitted ? 'bg-finch text-white' : 'gradient-gold text-white'}`}
        >
          {submitted ? (
            <><Check className="w-5 h-5" /><span>Saved!</span></>
          ) : (
            <span>Save Salary</span>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

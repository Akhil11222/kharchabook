'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Pencil, Share2, Flame, AlertTriangle } from 'lucide-react'
import { SpendingZone } from '@/lib/types'
import { formatCurrency, getZoneConfig } from '@/lib/calculations'

interface SalaryCardProps {
  salary: number
  totalSpent: number
  balance: number
  zone: SpendingZone
  zonePercent: number
  animateBalance: boolean
  onEditSalary: () => void
  onShare: () => void
  streak: number
}

export default function SalaryCard({
  salary, totalSpent, balance, zone, zonePercent,
  animateBalance, onEditSalary, onShare, streak,
}: SalaryCardProps) {
  const zoneConfig = getZoneConfig(zone)
  const balanceRef = useRef<HTMLDivElement>(null)

  // Zone bar colour
  const barColour =
    zone === 'green'  ? 'bg-finch' :
    zone === 'orange' ? 'bg-butter-mid' :
    'bg-indian-red'

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      /* Garnet (deep jewel red) card — sharp contrast against warm-bg page */
      className="gradient-salary rounded-3xl p-5 mb-4 shadow-card-lg relative overflow-hidden"
    >
      {/* Subtle circles for depth */}
      <div className="absolute top-0 right-0 w-36 h-36 rounded-full -translate-y-10 translate-x-10"
        style={{ background: 'rgba(255,255,255,0.04)' }} />
      <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full translate-y-10 -translate-x-10"
        style={{ background: 'rgba(0,0,0,0.08)' }} />

      {/* Top row */}
      <div className="flex items-start justify-between relative z-10 mb-4">
        <div>
          <p className="text-white/55 text-xs font-bold uppercase tracking-widest">Balance</p>
          <motion.div
            ref={balanceRef}
            key={balance}
            animate={animateBalance ? { scale: [1, 1.08, 1] } : {}}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="text-4xl font-black text-white mt-1"
          >
            {formatCurrency(balance < 0 ? 0 : balance)}
          </motion.div>
          {balance < 0 && (
            <p className="text-red-200 text-xs font-bold mt-1 bg-white/10 rounded-full px-2 py-0.5 inline-flex items-center gap-1">
              <AlertTriangle size={10} />
              Overspent by {formatCurrency(Math.abs(balance))}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button onClick={onShare}
            className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center active:scale-90 transition-all"
            aria-label="Share summary">
            <Share2 size={16} className="text-white" />
          </button>
          <button onClick={onEditSalary}
            className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center active:scale-90 transition-all"
            aria-label="Edit salary">
            <Pencil size={16} className="text-white" />
          </button>
        </div>
      </div>

      {/* Salary / Spent */}
      <div className="flex items-center gap-4 relative z-10 mb-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white/60" />
          <span className="text-white/70 text-sm font-semibold">
            Salary: {formatCurrency(salary)}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white/35" />
          <span className="text-white/70 text-sm font-semibold">
            Spent: {formatCurrency(totalSpent)}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative z-10">
        <div className="h-2 bg-white/15 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${zonePercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full rounded-full ${barColour}`}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs font-bold text-white/70">{zoneConfig.message}</span>
          <span className="text-white/45 text-xs font-semibold">{Math.round(zonePercent)}% left</span>
        </div>
      </div>

      {/* Streak */}
      {streak > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 mt-3 inline-flex items-center gap-1.5 bg-white/12 rounded-full px-3 py-1"
        >
          <Flame size={13} className="text-orange-300" />
          <span className="text-white text-xs font-bold">
            {streak}-day logging streak!
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, Shield, BarChart2, ArrowRight, IndianRupee } from 'lucide-react'

interface LandingScreenProps {
  onCTA: () => void
}

export default function LandingScreen({ onCTA }: LandingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen gradient-landing flex flex-col items-center justify-between px-6 py-10 max-w-[480px] mx-auto"
    >
      {/* Brand */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center"
      >
        <div className="w-14 h-14 bg-bistre-mid/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-bistre-mid/30">
          <BookOpen size={26} className="text-butter-mid" />
        </div>
        <h1 className="text-3xl font-black text-butter tracking-tight">KharchaBook</h1>
        <p className="text-sm text-butter/50 font-semibold mt-1">Your money, your record.</p>
      </motion.div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6, type: 'spring', stiffness: 100 }}
        className="text-center flex-1 flex flex-col items-center justify-center gap-8 my-8"
      >
        {/* Icon circle */}
        <div className="relative">
          <div className="w-44 h-44 rounded-full flex items-center justify-center border border-bistre-mid/30 shadow-2xl"
            style={{ background: 'rgba(90,24,24,0.4)' }}>
            <IndianRupee size={72} className="text-butter-mid" strokeWidth={1.5} />
          </div>
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-3 -right-3 w-10 h-10 bg-finch/20 rounded-xl flex items-center justify-center border border-finch/30"
          >
            <TrendingUp size={18} className="text-finch" />
          </motion.div>
          <motion.div
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-2 -left-4 w-9 h-9 bg-bistre-mid/20 rounded-xl flex items-center justify-center border border-bistre-mid/30"
          >
            <BarChart2 size={16} className="text-butter-mid" />
          </motion.div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-3xl font-black text-butter leading-tight"
          >
            Welcome back!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="text-lg font-bold text-butter-mid"
          >
            Track every rupee, every day.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-sm text-butter/45 font-semibold leading-relaxed"
          >
            Log expenses in seconds. Watch your<br />salary balance update in real time.
          </motion.p>
        </div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {[
            { icon: TrendingUp, text: 'Salary Tracking' },
            { icon: BarChart2, text: 'Smart Insights' },
            { icon: Shield, text: 'Private & Local' },
          ].map((pill) => (
            <span
              key={pill.text}
              className="bg-bistre-mid/15 border border-bistre-mid/30 text-butter/80 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
            >
              <pill.icon size={11} />
              {pill.text}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="w-full space-y-3"
      >
        <motion.button
          onClick={onCTA}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          className="w-full gradient-gold text-white font-black text-lg py-5 rounded-3xl shadow-card-lg
                     flex items-center justify-center gap-3"
        >
          <span>Let&apos;s Go</span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight size={22} />
          </motion.div>
        </motion.button>
        <p className="text-center text-xs text-butter/30 font-medium flex items-center justify-center gap-1.5">
          <Shield size={10} />
          No sign-up. All data stays on your device.
        </p>
      </motion.div>
    </motion.div>
  )
}

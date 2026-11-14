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
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="h-[100dvh] max-h-[100dvh] overflow-hidden gradient-landing flex flex-col items-center justify-between px-5 py-4 sm:py-6 max-w-[440px] mx-auto select-none"
    >
      {/* Brand Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="text-center flex-shrink-0"
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-bistre-mid/20 rounded-2xl flex items-center justify-center mx-auto mb-1.5 border border-bistre-mid/30">
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-butter-mid" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-butter tracking-tight leading-tight">KharchaBook</h1>
        <p className="text-xs sm:text-sm text-butter/50 font-semibold">Your money, your record.</p>
      </motion.div>

      {/* Hero Visual & Message */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 120 }}
        className="text-center flex flex-col items-center justify-center my-auto py-1 sm:py-2 gap-3 sm:gap-4 w-full"
      >
        {/* Icon Badge */}
        <div className="relative">
          <div
            className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full flex items-center justify-center border border-bistre-mid/30 shadow-2xl"
            style={{ background: 'rgba(90,24,24,0.45)' }}
          >
            <IndianRupee className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-butter-mid" strokeWidth={1.5} />
          </div>
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-7 h-7 sm:w-9 sm:h-9 bg-finch/25 rounded-xl flex items-center justify-center border border-finch/40"
          >
            <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-finch" />
          </motion.div>
          <motion.div
            animate={{ y: [3, -3, 3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-7 h-7 sm:w-8 sm:h-8 bg-bistre-mid/25 rounded-xl flex items-center justify-center border border-bistre-mid/35"
          >
            <BarChart2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-butter-mid" />
          </motion.div>
        </div>

        {/* Text Block */}
        <div className="space-y-1 sm:space-y-1.5 px-2">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-2xl sm:text-3xl font-black text-butter leading-tight"
          >
            Welcome back!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="text-sm sm:text-base font-bold text-butter-mid"
          >
            Track every rupee, every day.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="text-xs sm:text-sm text-butter/50 font-medium leading-relaxed max-w-[320px] mx-auto"
          >
            Log expenses in seconds. Watch your salary balance update in real time.
          </motion.p>
        </div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="flex flex-wrap gap-1.5 sm:gap-2 justify-center pt-1"
        >
          {[
            { icon: TrendingUp, text: 'Salary Tracking' },
            { icon: BarChart2, text: 'Smart Insights' },
            { icon: Shield, text: 'Private & Local' },
          ].map((pill) => (
            <span
              key={pill.text}
              className="bg-bistre-mid/15 border border-bistre-mid/30 text-butter/85 text-[11px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1.5"
            >
              <pill.icon className="w-3 h-3" />
              {pill.text}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.4 }}
        className="w-full space-y-2 flex-shrink-0 pt-2"
      >
        <motion.button
          onClick={onCTA}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.01 }}
          className="w-full gradient-gold text-white font-black text-base sm:text-lg py-3.5 sm:py-4 rounded-2xl sm:rounded-3xl shadow-card-lg
                     flex items-center justify-center gap-2.5 transition-transform"
        >
          <span>Let&apos;s Go</span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </motion.button>
        <p className="text-center text-[11px] sm:text-xs text-butter/35 font-medium flex items-center justify-center gap-1">
          <Shield className="w-3 h-3" />
          No sign-up. All data stays on your device.
        </p>
      </motion.div>
    </motion.div>
  )
}

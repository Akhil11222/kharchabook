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
      className="min-h-screen bg-gradient-to-b from-[#2C2010] via-[#3D2E14] to-[#2C2010] flex flex-col items-center justify-between px-6 py-10 max-w-[480px] mx-auto"
    >
      {/* Top Brand */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center"
      >
        <div className="w-14 h-14 bg-bistre-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-bistre-gold/30">
          <BookOpen size={28} className="text-butter" />
        </div>
        <h1 className="text-3xl font-black text-butter tracking-tight">KharchaBook</h1>
        <p className="text-sm text-butter/50 font-semibold mt-1">Tera paisa, tera hisaab</p>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6, type: 'spring', stiffness: 100 }}
        className="text-center flex-1 flex flex-col items-center justify-center gap-8 my-8"
      >
        {/* Icon Illustration */}
        <div className="relative">
          <div className="w-44 h-44 bg-bistre-gold/15 rounded-full flex items-center justify-center border-2 border-bistre-gold/25 shadow-2xl">
            <IndianRupee size={72} className="text-butter-dark" strokeWidth={1.5} />
          </div>
          <motion.div
            animate={{ y: [-5, 5, -5], rotate: [-8, 8, -8] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-3 -right-3 w-10 h-10 bg-finch/20 rounded-xl flex items-center justify-center border border-finch/30"
          >
            <TrendingUp size={18} className="text-finch" />
          </motion.div>
          <motion.div
            animate={{ y: [5, -5, 5], rotate: [5, -5, 5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-2 -left-4 w-9 h-9 bg-butter/15 rounded-xl flex items-center justify-center border border-butter/25"
          >
            <BarChart2 size={16} className="text-butter" />
          </motion.div>
        </div>

        {/* Greeting Text */}
        <div className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-3xl font-black text-butter leading-tight"
          >
            Aye, aap aa gaye!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="text-lg font-bold text-butter-dark"
          >
            Tera paisa tera hisaab.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-sm text-butter/50 font-semibold leading-relaxed"
          >
            Salary track karo. Kharcha dekhte raho.
            <br />
            Month-end pe surprise band.
          </motion.p>
        </div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {[
            { icon: TrendingUp, text: 'Salary Track' },
            { icon: BarChart2, text: 'Smart Insights' },
            { icon: Shield, text: 'Sirf Tera Data' },
          ].map((pill) => (
            <span
              key={pill.text}
              className="bg-bistre-gold/15 border border-bistre-gold/30 text-butter text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
            >
              <pill.icon size={11} />
              {pill.text}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* CTA Button */}
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
          <span>Chalein?</span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight size={22} />
          </motion.div>
        </motion.button>
        <p className="text-center text-xs text-butter/35 font-medium flex items-center justify-center gap-1.5">
          <Shield size={11} />
          No sign-up needed · Sirf tera phone, teri marzi
        </p>
      </motion.div>
    </motion.div>
  )
}


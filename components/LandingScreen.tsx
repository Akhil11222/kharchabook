'use client'

import { motion } from 'framer-motion'

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
      className="min-h-screen bg-gradient-to-b from-butter via-yellow-50 to-amber-50 flex flex-col items-center justify-between px-6 py-10 max-w-[480px] mx-auto"
    >
      {/* Top Brand */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center"
      >
        <div className="text-5xl mb-2">📒</div>
        <h1 className="text-3xl font-black text-bistre-gold tracking-tight">KharchaBook</h1>
        <p className="text-sm text-bistre-gold/60 font-semibold mt-1">Tera paisa, tera hisaab</p>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6, type: 'spring', stiffness: 100 }}
        className="text-center flex-1 flex flex-col items-center justify-center gap-6 my-8"
      >
        {/* Big Illustration / Emoji Art */}
        <div className="relative">
          <div className="w-48 h-48 bg-bistre-gold/10 rounded-full flex items-center justify-center border-4 border-bistre-gold/20 shadow-lg">
            <div className="text-8xl" role="img" aria-label="Money bag">💰</div>
          </div>
          {/* Floating emojis */}
          <motion.div
            animate={{ y: [-5, 5, -5], rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 -right-4 text-3xl"
          >
            ✨
          </motion.div>
          <motion.div
            animate={{ y: [5, -5, 5], rotate: [5, -5, 5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-2 -left-6 text-2xl"
          >
            🎯
          </motion.div>
          <motion.div
            animate={{ y: [-3, 7, -3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-2 -left-8 text-xl"
          >
            📊
          </motion.div>
        </div>

        {/* Greeting Text */}
        <div className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-3xl font-black text-gray-800 leading-tight text-balance"
          >
            Aye, tu aa gaya! 👋
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="text-xl font-bold text-bistre-gold"
          >
            Tera paisa tera hisaab.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-base text-gray-500 font-semibold leading-relaxed"
          >
            Salary track karo. Kharcha dekhte raho.
            <br />
            Month-end pe surprise mat lo. 😅
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
            { emoji: '💸', text: 'Salary Track' },
            { emoji: '📝', text: 'Daily Kharch' },
            { emoji: '📊', text: 'Smart Insights' },
            { emoji: '🔒', text: 'Sirf Tera Data' },
          ].map((pill) => (
            <span
              key={pill.text}
              className="bg-bistre-gold/10 border border-bistre-gold/30 text-bistre-gold text-xs font-bold px-3 py-1.5 rounded-full"
            >
              {pill.emoji} {pill.text}
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
          className="w-full gradient-gold text-white font-black text-xl py-5 rounded-3xl shadow-card-lg
                     flex items-center justify-center gap-3 relative overflow-hidden"
        >
          <span>Chalein? →</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-2xl"
          >
            🚀
          </motion.span>
        </motion.button>
        <p className="text-center text-xs text-gray-400 font-medium">
          No sign-up needed · Sirf tera phone, teri marzi 🔐
        </p>
      </motion.div>
    </motion.div>
  )
}


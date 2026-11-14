'use client'

import { useState, useEffect } from 'react'
import LandingScreen from '@/components/LandingScreen'
import SalarySetup from '@/components/SalarySetup'
import Dashboard from '@/components/Dashboard'
import { loadData, initData, getCurrentSalary } from '@/lib/storage'
import { KharchaBookData } from '@/lib/types'

type AppScreen = 'landing' | 'salary-setup' | 'dashboard'

export default function Home() {
  const [screen, setScreen] = useState<AppScreen>('landing')
  const [data, setData] = useState<KharchaBookData | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const appData = initData()
    setData(appData)
  }, [])

  const handleLandingCTA = () => {
    if (!data) return
    const salary = getCurrentSalary(data)
    if (salary === 0) {
      setScreen('salary-setup')
    } else {
      setScreen('dashboard')
    }
  }

  const handleSalarySet = (newData: KharchaBookData) => {
    setData(newData)
    setScreen('dashboard')
  }

  const handleDataUpdate = (newData: KharchaBookData) => {
    setData(newData)
  }

  const handleEditSalary = () => {
    setScreen('salary-setup')
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-butter flex items-center justify-center">
        <div className="text-bistre-gold text-4xl animate-pulse">📒</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-butter">
      {screen === 'landing' && (
        <LandingScreen onCTA={handleLandingCTA} />
      )}
      {screen === 'salary-setup' && data && (
        <SalarySetup
          existingSalary={getCurrentSalary(data)}
          onSalarySet={handleSalarySet}
          onBack={getCurrentSalary(data) > 0 ? () => setScreen('dashboard') : undefined}
        />
      )}
      {screen === 'dashboard' && data && (
        <Dashboard
          data={data}
          onDataUpdate={handleDataUpdate}
          onEditSalary={handleEditSalary}
        />
      )}
    </main>
  )
}


"use client"
import { useState, useEffect } from "react"

export default function SpiritualHeader({ onGhostTap }: { onGhostTap?: () => void }) {
  const [time, setTime] = useState(new Date())
  const [tapCount, setTapCount] = useState(0)
  const [lastTap, setLastTap] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const handleHeaderTap = () => {
    const now = Date.now()
    if (now - lastTap < 500) {
      setTapCount(c => {
        const newCount = c + 1
        if (newCount >= 5 && onGhostTap) {
          onGhostTap()
          return 0
        }
        return newCount
      })
    } else {
      setTapCount(1)
    }
    setLastTap(now)
  }

  return (
    <header 
      onClick={handleHeaderTap}
      className="p-6 text-center border-b border-white/10 cursor-pointer select-none"
      data-ghost="true"
    >
      <div className="flex justify-between items-center text-[10px] text-white/40 mb-2 font-mono">
        <span>v2.1</span>
        <span>{time.toLocaleDateString('id-ID')}</span>
        <span className="text-dream-accent">{getPeriod()}</span>
      </div>
      
      <p className="bismillah text-2xl md:text-3xl font-bold mb-1" dir="rtl">        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </p>
      <p className="text-dream-accent/90 text-lg md:text-xl font-arabic mb-1" dir="rtl">
        اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ
      </p>
      <p className="text-[10px] text-white/40 uppercase tracking-[0.3em]">The Power Soul of Shalawat</p>
      <p className="text-[8px] text-white/20 mt-2">🤫 Tap header 5x for Ghost Mode</p>
    </header>
  )
}

function getPeriod() {
  const h = new Date().getHours()
  if (h >= 4 && h < 12) return 'FAJR'
  if (h >= 12 && h < 15) return 'DHUHR'
  if (h >= 15 && h < 18) return 'ASR'
  if (h >= 18 && h < 19) return 'MAGHRIB'
  if (h >= 19 && h < 24) return 'ISHA'
  return 'NIGHT'
}

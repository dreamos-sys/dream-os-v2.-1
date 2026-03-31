"use client"
import { useState, useEffect } from "react"
import SpiritualHeader from "@/components/SpiritualHeader"
import ModuleGrid from "@/components/ModuleGrid"
import BottomNav from "@/components/BottomNav"

export default function Home() {
  const [user, setUser] = useState<{name: string, role: string, modules: string[]} | null>(null)
  const [showGhost, setShowGhost] = useState(false)

  // Check session
  useEffect(() => {
    const session = sessionStorage.getItem('dream_session')
    const userData = sessionStorage.getItem('dream_user')
    if (session && userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  if (!user) {
    return <LoginScreen onLogin={setUser} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dream-900 via-dream-800 to-dream-900 pb-24">
      <SpiritualHeader onGhostTap={() => setShowGhost(true)} />
      
      {/* Welcome Card */}
      <div className="glass-card mx-4 mt-4 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-dream-accent/20 flex items-center justify-center text-dream-accent font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-semibold">{user.name}</p>
              <p className="text-dream-accent text-xs uppercase">{user.role}</p>
            </div>
          </div>
          <div className="text-dream-accent font-mono text-sm" id="live-clock">
            {new Date().toLocaleTimeString('id-ID')}
          </div>
        </div>
      </div>

      {/* 9-Module Grid */}      <ModuleGrid allowed={user.modules} />

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Ghost Mode Overlay */}
      {showGhost && <GhostOverlay onClose={() => setShowGhost(false)} />}
    </div>
  )
}

// Simple Login Screen
function LoginScreen({ onLogin }: { onLogin: (u: any) => void }) {
  const [key, setKey] = useState('')
  
  const ACCESS_KEYS: Record<string, any> = {
    'Mr.M_Architect_2025': { name: 'Mr.M Architect', role: 'MASTER', modules: 'all' },
    '4dm1n_AF6969@00': { name: 'Admin AF', role: 'ADMIN', modules: 'all' },
    'user_@1234': { name: 'Booking User', role: 'BOOKING', modules: ['booking'] },
  }

  const handleLogin = () => {
    const userData = ACCESS_KEYS[key.trim()]
    if (userData) {
      sessionStorage.setItem('dream_session', Date.now().toString())
      sessionStorage.setItem('dream_user', JSON.stringify(userData))
      onLogin(userData)
    } else {
      alert('❌ Access Denied')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-dream-900">
      <div className="glass-card p-6 w-full max-w-sm text-center">
        <div className="text-4xl mb-4">🎯</div>
        <p className="bismillah text-2xl mb-2" dir="rtl">بِسْمِ اللَّهِ</p>
        <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Dream OS v2.1</p>
        
        <input
          type="password"
          value={key}
          onChange={e => setKey(e.target.value)}
          placeholder="Access Key"
          className="w-full bg-dream-800 border border-white/10 rounded-xl p-3 text-white mb-4 font-mono text-sm"
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />
        
        <button
          onClick={handleLogin}          className="w-full bg-gradient-to-r from-dream-accent to-emerald-600 text-white font-bold py-3 rounded-xl uppercase text-sm"
        >
          🔐 Verify Access
        </button>
      </div>
    </div>
  )
}

// Ghost Mode Overlay
function GhostOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-dream-900/98 backdrop-blur-2xl z-[9999] flex items-center justify-center p-4">
      <div className="glass-card p-6 w-full max-w-sm text-center">
        <i className="fas fa-ghost text-3xl text-dream-accent mb-3"></i>
        <p className="text-dream-accent uppercase text-sm font-bold">Ghost Mode</p>
        <p className="text-white/40 text-xs mb-4">Enter prayer-time password</p>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          {['1','2','3','4','5','6','7','8','9','C','0','✓'].map(k => (
            <button
              key={k}
              className={`p-4 rounded-xl font-bold text-lg ${
                k === 'C' ? 'text-red-400' : k === '✓' ? 'text-dream-accent' : 'text-white'
              } bg-dream-800 hover:bg-dream-700 transition`}
              onClick={() => k === '✓' ? onClose() : k === 'C' ? null : console.log(k)}
            >
              {k}
            </button>
          ))}
        </div>
        
        <button onClick={onClose} className="text-white/40 text-sm hover:text-white">Cancel</button>
      </div>
    </div>
  )
}

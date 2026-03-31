"use client"
import { useRouter, usePathname } from "next/navigation"

const NAV_ITEMS = [
  { icon: 'fa-home', label: 'Home', path: '/' },
  { icon: 'fa-user', label: 'Profile', path: '/profile' },
  { icon: 'fa-qrcode', label: 'QR', path: '/qr', center: true },
  { icon: 'fa-info-circle', label: 'About', path: '/about' },
  { icon: 'fa-cog', label: 'Setting', path: '/settings' },
]

export default function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dream-800/95 backdrop-blur-xl border-t border-dream-accent/20 z-50 safe-area-pb">
      <div className="flex justify-around items-center px-2 py-3 max-w-md mx-auto">
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.path
          return (            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                item.center 
                  ? 'p-3 -mt-5 bg-gradient-to-r from-dream-accent to-emerald-600 rounded-2xl shadow-xl hover:scale-110' 
                  : isActive ? 'text-dream-accent bg-dream-accent/10' : 'text-white/60 hover:text-white'
              }`}
            >
              <i className={`fas ${item.icon} ${item.center ? 'text-2xl text-white' : 'text-xl'}`}></i>
              <span className={`text-[10px] font-medium ${item.center ? 'text-white font-bold' : ''}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

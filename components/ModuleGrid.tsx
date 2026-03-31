"use client"
import { useRouter } from "next/navigation"

const MODULES = [
  { id: 'commandcenter', name: 'Command Center', icon: 'fa-desktop', color: 'from-violet-500 to-emerald-500', large: true },
  { id: 'sekuriti', name: 'Security Core', icon: 'fa-shield-halved', color: 'from-emerald-500 to-teal-500', large: true },
  { id: 'booking', name: 'Booking', icon: 'fa-calendar-check', color: 'from-blue-500 to-indigo-500' },
  { id: 'k3', name: 'K3', icon: 'fa-triangle-exclamation', color: 'from-amber-500 to-orange-500' },
  { id: 'janitor', name: 'Janitor', icon: 'fa-broom', color: 'from-pink-500 to-rose-500' },
  { id: 'stok', name: 'Stok', icon: 'fa-boxes-stacked', color: 'from-orange-500 to-red-500' },
  { id: 'maintenance', name: 'Maintenance', icon: 'fa-screwdriver-wrench', color: 'from-cyan-500 to-sky-500' },
  { id: 'inventaris', name: 'Inventaris', icon: 'fa-clipboard-list', color: 'from-indigo-500 to-purple-500' },
  { id: 'gudang', name: 'Gudang', icon: 'fa-warehouse', color: 'from-lime-500 to-green-500' },
]

export default function ModuleGrid({ allowed }: { allowed: string[] }) {
  const router = useRouter()
  
  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Top: 2 Large Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {MODULES.filter(m => m.large && allowed.includes(m.id)).map(mod => (
          <button
            key={mod.id}
            onClick={() => router.push(`/module/${mod.id}`)}            className={`md:col-span-2 glass-card p-8 min-h-[200px] text-left bg-gradient-to-br ${mod.color}`}
          >
            <i className={`fas ${mod.icon} text-5xl text-white mb-4`}></i>
            <h3 className="text-xl font-bold text-white uppercase">{mod.name}</h3>
            <p className="text-white/60 text-sm">Tap to access</p>
          </button>
        ))}
      </div>
      
      {/* Bottom: 7 Small Cards */}
      <div className="grid grid-cols-3 gap-3">
        {MODULES.filter(m => !m.large && allowed.includes(m.id)).map(mod => (
          <button
            key={mod.id}
            onClick={() => router.push(`/module/${mod.id}`)}
            className="glass-card p-4 flex flex-col items-center justify-center hover:scale-105 transition-transform"
          >
            <i className={`fas ${mod.icon} text-3xl text-dream-accent mb-2`}></i>
            <span className="text-[10px] font-bold text-white/80 uppercase text-center">{mod.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

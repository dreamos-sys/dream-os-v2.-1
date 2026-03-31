"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function Dashboard() {
  const router = useRouter()
  const [slide, setSlide] = useState(0)
  const [time, setTime] = useState(new Date())

  const slides = [
    { icon: "🌅", title: "Selamat Pagi", sub: "Semangat!" },
    { icon: "📅", title: "Booking", sub: "2 jadwal" },
    { icon: "⚠️", title: "K3", sub: "1 laporan" },
    { icon: "🌤️", title: "Cuaca", sub: "28°C" },
    { icon: "👔", title: "Management", sub: "3 agenda" },
    { icon: "🏢", title: "Info", sub: "5 pengumuman" },
    { icon: "💬", title: "Kabar", sub: "2 berita" },
  ]

  const modules = [
    { name: "📅 Form", path: "/modules/booking", color: "bg-blue-500" },
    { name: "⚠️ K3", path: "/modules/k3", color: "bg-amber-500" },
    { name: "🧹 Janitor", path: "/modules/janitor", color: "bg-lime-500" },
    { name: "📦 Stock", path: "/modules/stock", color: "bg-purple-500" },
    { name: "🔧 Service", path: "/modules/service", color: "bg-cyan-500" },
    { name: "🏢 Asset", path: "/modules/asset", color: "bg-pink-500" },
    { name: "💾 Backup", path: "/modules/backup", color: "bg-emerald-500" },
    { name: "📺 TV", path: "/modules/tvbox", color: "bg-yellow-500" },
    { name: "⚙️ Settings", path: "/settings", color: "bg-gray-500" },
    { name: "🎛️ Command", path: "/modules/command", color: "bg-red-500" },
    { name: "🛡️ Security", path: "/modules/security", color: "bg-indigo-500" },
    { name: "🌐 Network", path: "/modules/network", color: "bg-teal-500" },
  ]

  useEffect(() => {
    const t1 = setInterval(() => setTime(new Date()), 1000)
    const t2 = setInterval(() => setSlide(s => (s + 1) % slides.length), 2000)
    return () => { clearInterval(t1); clearInterval(t2) }
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-emerald-500 text-white p-4 text-center rounded-b-2xl">
        <div className="text-3xl mb-1">🎯</div>
        <div className="text-lg font-bold">بِسْمِ اللَّهِ</div>
        <div className="text-sm">اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ</div>
        <h1 className="text-2xl font-bold mt-2">DREAM OS</h1>
        <p className="text-sm opacity-80">v2.1 • {time.toLocaleTimeString("id-ID")}</p>      </header>

      {/* Carousel */}
      <div className="p-4">
        <div className="bg-emerald-500 rounded-xl p-4 text-white text-center mb-4">
          <div className="text-4xl mb-2">{slides[slide].icon}</div>
          <div className="text-xl font-bold">{slides[slide].title}</div>
          <div className="text-sm">{slides[slide].sub}</div>
          <div className="flex justify-center gap-1 mt-3">
            {slides.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === slide ? "bg-white" : "bg-white/50"}`} />
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-2">
          {modules.map((m, i) => (
            <button
              key={i}
              onClick={() => router.push(m.path)}
              className={`${m.color} rounded-lg p-3 text-white text-center`}
            >
              <div className="text-xl">{m.name.split(" ")[0]}</div>
              <div className="text-[10px]">{m.name.split(" ")[1]}</div>
            </button>
          ))}
        </div>
      </div>
{/* Bottom Navigation - 5 Buttons */}
<nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl z-50 safe-area-pb">
  <div className="flex justify-around items-center px-2 py-2 max-w-md mx-auto">
    {/* Home */}
    <button 
      onClick={() => router.push("/dashboard")}
      className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-100 transition-all active:scale-95 min-w-[64px]"
    >
      <span className="text-2xl mb-0.5">🏠</span>
      <span className="text-[10px] font-medium text-gray-600">Home</span>
    </button>
    
    {/* Profile */}
    <button 
      onClick={() => router.push("/profile")}
      className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-100 transition-all active:scale-95 min-w-[64px]"
    >
      <span className="text-2xl mb-0.5">👤</span>
      <span className="text-[10px] font-medium text-gray-600">Profile</span>
    </button>
    
    {/* QR - Center Button (Highlighted) */}
    <button 
      onClick={() => router.push("/qr")}
      className="flex flex-col items-center justify-center p-3 -mt-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-110 transition-all active:scale-95"
    >
      <span className="text-3xl mb-0.5">📷</span>
      <span className="text-[10px] font-bold text-white">QR</span>
    </button>
    
    {/* About */}
    <button 
      onClick={() => router.push("/about")}
      className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-100 transition-all active:scale-95 min-w-[64px]"
    >
      <span className="text-2xl mb-0.5">ℹ️</span>
      <span className="text-[10px] font-medium text-gray-600">About</span>
    </button>
    
    {/* Settings */}
    <button 
      onClick={() => router.push("/settings")}
      className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-100 transition-all active:scale-95 min-w-[64px]"
    >
      <span className="text-2xl mb-0.5">⚙️</span>
      <span className="text-[10px] font-medium text-gray-600">Setting</span>
    </button>
  </div>
</nav>

{/* Add padding to prevent content hiding behind nav */}
<style jsx global>{`
  body {
    padding-bottom: 80px;
  }
  .safe-area-pb {
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }
`}</style>
     

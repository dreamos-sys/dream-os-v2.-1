"use client"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white pb-24">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 text-center shadow-lg">
        <h1 className="text-4xl font-bold mb-2">DREAM OS</h1>
        <p className="text-sm opacity-90">v2.1 Sovereign</p>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {["📅 Form","⚠️ K3","🧹 Janitor","📦 Stock","🔧 Service","🏢 Asset"].map((m,i)=>(
            <button key={i} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 text-center">
              <div className="text-3xl mb-2">{m.split(' ')[0]}</div>
              <div className="text-sm font-semibold text-gray-700">{m.split(' ')[1]}</div>
            </button>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
        <div className="flex justify-around items-center px-2 py-3 max-w-md mx-auto">
          <button onClick={()=>router.push("/")} className="flex flex-col items-center p-2 rounded-xl hover:bg-gray-100 transition">
            <span className="text-2xl mb-1">🏠</span>
            <span className="text-xs font-medium text-gray-700">Home</span>
          </button>
          <button onClick={()=>router.push("/profile")} className="flex flex-col items-center p-2 rounded-xl hover:bg-gray-100 transition">
            <span className="text-2xl mb-1">👤</span>
            <span className="text-xs font-medium text-gray-700">Profile</span>
          </button>
          <button onClick={()=>router.push("/qr")} className="flex flex-col items-center p-3 -mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-xl hover:shadow-2xl transition">
            <span className="text-3xl mb-1">📷</span>
            <span className="text-xs font-bold text-white">QR</span>
          </button>
          <button onClick={()=>router.push("/about")} className="flex flex-col items-center p-2 rounded-xl hover:bg-gray-100 transition">
            <span className="text-2xl mb-1">ℹ️</span>
            <span className="text-xs font-medium text-gray-700">About</span>
          </button>
          <button onClick={()=>router.push("/settings")} className="flex flex-col items-center p-2 rounded-xl hover:bg-gray-100 transition">
            <span className="text-2xl mb-1">⚙️</span>
            <span className="text-xs font-medium text-gray-700">Setting</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

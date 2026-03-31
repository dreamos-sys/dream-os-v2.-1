"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function Dashboard() {
  const router = useRouter()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-800 pb-20">
      {/* Header */}
      <header className="bg-emerald-500 text-white p-4 text-center">
        <div className="text-2xl font-bold">بِسْمِ اللَّهِ</div>
        <h1 className="text-xl mt-1">Dream OS v2.1</h1>
        <p className="text-sm opacity-80">{time.toLocaleTimeString("id-ID")}</p>
      </header>

      {/* Content */}
      <main className="p-4">
        <div className="grid grid-cols-3 gap-3">
          {["📅 Form","⚠️ K3","🧹 Janitor","📦 Stock","🔧 Service","🏢 Asset"].map((m,i)=>(
            <button key={i} className="bg-gray-100 p-4 rounded-xl text-center">{m}</button>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"white",borderTop:"1px solid #ddd",padding:"10px",display:"flex",justifyContent:"space-around",zIndex:9999}}>
        <button onClick={()=>router.push("/dashboard")} style={{fontSize:"12px",background:"none",border:"none"}}>🏠 Home</button>
        <button onClick={()=>router.push("/profile")} style={{fontSize:"12px",background:"none",border:"none"}}>👤 Profile</button>
        <button onClick={()=>router.push("/qr")} style={{fontSize:"12px",background:"#10b981",color:"white",border:"none",padding:"8px 15px",borderRadius:"8px",fontWeight:"bold"}}>📷 QR</button>
        <button onClick={()=>router.push("/about")} style={{fontSize:"12px",background:"none",border:"none"}}>ℹ️ About</button>
        <button onClick={()=>router.push("/settings")} style={{fontSize:"12px",background:"none",border:"none"}}>⚙️ Setting</button>
      </div>
    </div>
  )
}

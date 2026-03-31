"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DashboardTV() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 7 Slides dengan data real-time
  const slides = [
    { 
      id: 1, 
      title: "👋 Ucapan Salam", 
      icon: "🌅",
      getData: () => {
        const hour = currentTime.getHours();
        if (hour >= 4 && hour < 11) return { text: "Selamat Pagi", sub: "Semangat memulai hari!" };
        if (hour >= 11 && hour < 15) return { text: "Selamat Siang", sub: "Tetap produktif!" };
        if (hour >= 15 && hour < 18) return { text: "Selamat Sore", sub: "Selesaikan tugas!" };
        return { text: "Selamat Malam", sub: "Istirahat yang cukup!" };
      }
    },
    { 
      id: 2, 
      title: "📅 Booking Realtime", 
      icon: "📅",
      getData: () => ({ text: "Booking Hari Ini", sub: "0 Today · 2 Besok" })
    },
    { 
      id: 3, 
      title: "⚠️ K3 & Safety", 
      icon: "⚠️",
      getData: () => ({ text: "K3 Reports", sub: "2 Pending · 1 Action" })
    },
    { 
      id: 4, 
      title: "🌤️ Weather", 
      icon: "🌤️",
      getData: () => ({ text: "Cerah Berawan", sub: "28°C · Jakarta" })
    },
    {       id: 5, 
      title: "👔 Command Center", 
      icon: "👔",
      getData: () => ({ text: "Management Info", sub: "3 Active Events" })
    },
    { 
      id: 6, 
      title: "🏢 Info Umum", 
      icon: "🏢",
      getData: () => ({ text: "General Info", sub: "5 Tasks Today" })
    },
    { 
      id: 7, 
      title: "💬 Kabar", 
      icon: "💬",
      getData: () => ({ text: "Announcements", sub: "2 News Updates" })
    },
  ];

  // 12 Modules Grid
  const modules = [
    { id: 1, name: "📅 Form", path: "/modules/booking", color: "from-blue-400 to-blue-600" },
    { id: 2, name: "⚠️ K3", path: "/modules/k3", color: "from-amber-400 to-orange-600" },
    { id: 3, name: "🧹 Janitor", path: "/modules/janitor", color: "from-lime-400 to-green-600" },
    { id: 4, name: "📦 Stock", path: "/modules/stock", color: "from-purple-400 to-violet-600" },
    { id: 5, name: "🔧 Service", path: "/modules/service", color: "from-cyan-400 to-sky-600" },
    { id: 6, name: "🏢 Asset", path: "/modules/asset", color: "from-pink-400 to-fuchsia-600" },
    { id: 7, name: "💾 Backup", path: "/modules/backup", color: "from-emerald-400 to-teal-600" },
    { id: 8, name: "📺 TV Box", path: "/modules/tvbox", color: "from-yellow-400 to-amber-600" },
    { id: 9, name: "⚙️ Settings", path: "/settings", color: "from-gray-400 to-slate-600" },
    { id: 10, name: "️ Command", path: "/modules/command", color: "from-red-400 to-rose-600" },
    { id: 11, name: "🛡️ Security", path: "/modules/security", color: "from-indigo-400 to-blue-600" },
    { id: 12, name: "🌐 Network", path: "/modules/network", color: "from-teal-400 to-cyan-600" },
  ];

  // Update waktu setiap detik
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate slides setiap detik
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 1000);
    return () => clearInterval(slideTimer);
  }, [slides.length]);

  // Keyboard navigation  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setCurrentSlide(s => (s + 1) % slides.length);
      if (e.key === "ArrowLeft") setCurrentSlide(s => (s - 1 + slides.length) % slides.length);
      if (e.key === "Enter") {
        // Navigate based on focused element
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [slides.length]);

  const currentSlideData = slides[currentSlide].getData();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-800">
      {/* iOS-Style Header dengan Spiritual Elements */}
      <header className="bg-white shadow-lg rounded-b-3xl p-6 mb-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Icon Dream OS */}
          <div className="text-5xl mb-3 animate-pulse">🎯</div>
          
          {/* Bismillah */}
          <div className="text-emerald-600 text-lg md:text-xl font-bold mb-2 font-arabic" style={{fontFamily: 'Amiri, serif'}}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>
          
          {/* Shalawat */}
          <div className="text-emerald-500 text-sm md:text-base mb-3 font-arabic" style={{fontFamily: 'Amiri, serif'}}>
            اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            DREAM OS
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-500 text-xs md:text-sm mt-1 uppercase tracking-wider">
            v2.1 SOVEREIGN • NEURAL STABLE
          </p>
          
          {/* Real-time Clock */}
          <div className="mt-3 text-gray-600 font-mono text-sm">
            {currentTime.toLocaleTimeString('id-ID')} • {currentTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 pb-32">        {/* 7-Slide Carousel (Auto-rotate per second) */}
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl p-6 mb-6 shadow-2xl">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
            <div className="text-6xl mb-4 animate-bounce">{slides[currentSlide].icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {currentSlideData.text}
            </h2>
            <p className="text-white/90 text-lg">{currentSlideData.sub}</p>
            
            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-white w-8' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
            
            {/* Slide Counter */}
            <div className="text-white/70 text-sm mt-3">
              Slide {currentSlide + 1} dari {slides.length}
            </div>
          </div>
        </div>

        {/* 12-Grid Modules */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => router.push(mod.path)}
              className={`group relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br ${mod.color} shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 min-h-[100px] md:min-h-[120px] flex flex-col items-center justify-center gap-2`}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-3xl md:text-4xl relative z-10">
                {mod.name.split(' ')[0]}
              </span>
              <span className="text-white text-xs md:text-sm font-semibold text-center relative z-10">
                {mod.name.split(' ').slice(1).join(' ')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* iOS-Style Dock Navigation (5 Buttons) */}      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 shadow-2xl safe-area-pb">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-around items-center">
            <button 
              onClick={() => router.push('/dashboard')}
              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl">🏠</span>
              <span className="text-xs text-gray-600 font-medium">Home</span>
            </button>
            
            <button 
              onClick={() => router.push('/modules/booking')}
              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl">📅</span>
              <span className="text-xs text-gray-600 font-medium">Booking</span>
            </button>
            
            {/* Center Button (Larger) */}
            <button 
              onClick={() => router.push('/modules/command')}
              className="flex flex-col items-center gap-1 p-3 -mt-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-110 transition-all"
            >
              <span className="text-3xl">🎛️</span>
              <span className="text-xs text-white font-bold">Command</span>
            </button>
            
            <button 
              onClick={() => router.push('/modules/k3')}
              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl">⚠️</span>
              <span className="text-xs text-gray-600 font-medium">K3</span>
            </button>
            
            <button 
              onClick={() => router.push('/settings')}
              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl">⚙️</span>
              <span className="text-xs text-gray-600 font-medium">Settings</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Custom Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');        
        .safe-area-pb {
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
      `}</style>
    </main>
  );
}

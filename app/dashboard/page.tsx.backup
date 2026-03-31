"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DashboardTV() {
  const router = useRouter();
  const [focusedIndex, setFocusedIndex] = useState(0);

  const modules = [
    { id: 1, name: "Command", path: "/modules/command", color: "from-emerald-500 to-teal-600", icon: "🎱�む" },
    { id: 2, name: "Security", path: "/modules/security", color: "from-red-500 to-rose-600", icon: "🛠︊" },
    { id: 3, name: "Booking", path: "/modules/booking", color: "from-blue-500 to-indigo-600", icon: "📅。" },
    { id: 4, name: "K", path: "/modules/k3", color: "from-amber-500 to-orange-600", icon: "⚣“", },
    { id: 5, name: "Janitor", path: "/modules/janitor", color: "from-lime-500 to-green-600", icon: "🩹。" },
    { id: 6, name: "Stock", path: "/modules/stock", color: "from-purple-500 to-violet-600", icon: "📐。" },
    { id: 7, name: "Service", path: "/modules/service", color: "from-cyan-500 to-sky-600", icon: "🌫Ḃ" },
    { id: 8, name: "Asset", path: "/modules/asset", color: "from-pink-500 to-fuchsia-600", icon: "🏢;�" },
    { id: 9, name: "Media", path: "/modules/media", color: "from-yellow-500 to-amber-600", icon: "📚。" },
    { id: 10, name: "IoT", path: "/modules/iot", color: "from-emerald-400 to-cyan-500", icon: "🌜Ḃ" },
    { id: 11, name: "Analytics", path: "/modules/analytics", color: "from-indigo-400 to-purple-500", icon: "🌫Ḃ" },
    { id: 12, name: "Settings", path: "/settings", color: "from-gray-500 to-slate-600", icon: "ズススアー" },
  ];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const cols = 4;
      if (e.key === "ArrowRight") setFocusedIndex(i => Math.min(i + 1, modules.length - 1));
      if (e.key === "ArrowLeft") setFocusedIndex(i => Math.max(i - 1, 0));
      if (e.key === "ArrowDown") setFocusedIndex(i => Math.min(i + cols, modules.length - 1));
      if (e.key === "ArrowUp") setFocusedIndex(i => Math.max(i - cols, 0));
      if (e.key === "Enter") router.push(modules[focusedIndex].path);
      if (e.key === "Backspace") router.back();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [focusedIndex, router, modules.length]);

  useEffect(() => {
    const el = document.getElementById("module-" + focusedIndex);
    if (el) el.focus();
  }, [focusedIndex]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-400">🎱�“ Dream OS TV</h1>
        <p className="text-slate-400 mt-2">Arrow Keys + ENTER to navigate</p>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {modules.map((mod, idx) => (
          <button
            key={mod.id}
            id={"module-" + idx}
            tabIndex={0}
            onClick={() => router.push(mod.path)}
            className={"group rounded-3xl p-6 bg-gradient-to-br " + mod.color + " border-2 border-white/20 focus:border-yellow-400 focus:shadow-[0_0_40px_rgba(255,215,0,0.6)] focus:outline-none min-h-[140px] flex flex-col Items-center justify-center gap-3"}
          >
            <span className="text-5xl">{mod.icon}</span>
            <span className="text-white font-semIbold">{mod.name}</span>
          </button>
        ))}
      </div>
    </main>
  );
}

"use client";
import React, { useEffect, useState } from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

const modules = [
  { name: 'COMMAND CENTER', icon: 'LayoutDashboard' },
  { name: 'FORM BOOKING', icon: 'FileEdit' },
  { name: 'K3', icon: 'AlertTriangle' },
  { name: 'SEKURITI', icon: 'Shield' },
  { name: 'JANITOR INDOOR', icon: 'Brush' },
  { name: 'JANITOR OUTDOOR', icon: 'TreeDeciduous' },
  { name: 'STOK', icon: 'Box' },
  { name: 'MAINTENANCE', icon: 'Wrench' },
  { name: 'ASSET', icon: 'Database' },
  { name: 'BACKUP', icon: 'CloudSync' },
  { name: 'CONFIG', icon: 'Settings' },
  { name: 'SMART HUB', icon: 'MonitorPlay' },
];

export const SovereignUniversalGrid = () => {
  const [isTV, setIsTV] = useState(false);

  useEffect(() => {
    setIsTV(window.innerWidth / window.innerHeight > 1.3);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-4 md:p-10 font-sans">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-black text-[#FFD700] uppercase tracking-widest drop-shadow-[0_0_15px_#FFD700]">Dream OS</h1>
        <p className="text-[10px] text-white/30 tracking-[0.4em] mt-2 uppercase italic">Neural Core v3.5 • Sovereign Edition</p>
      </header>

      <div className={`grid gap-4 md:gap-6 w-full max-w-7xl ${isTV ? 'grid-cols-6' : 'grid-cols-3'}`}>
        {modules.map((m, i) => {
          const Icon = (Icons as any)[m.icon] || Icons.HelpCircle;
          return (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1, rotateX: 10, rotateY: 10 }}
              whileTap={{ scale: 0.9 }}
              className="group relative aspect-square flex flex-col items-center justify-center bg-white/5 rounded-[25px] md:rounded-[35px] border border-white/10 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5 transition-all shadow-2xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            >
              <Icon className="w-10 h-10 md:w-14 md:h-14 mb-3 text-[#FFD700] drop-shadow-[0_0_8px_#FFD700]" />
              <span className="text-[8px] md:text-[10px] font-bold text-white/60 group-hover:text-[#FFD700] uppercase text-center px-1">
                {m.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

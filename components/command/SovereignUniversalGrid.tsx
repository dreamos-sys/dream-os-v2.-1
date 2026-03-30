"use client";
import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, FileEdit, AlertTriangle, Shield, 
  Brush, TreeDeciduous, Box, Wrench, 
  Database, CloudSync, Settings, MonitorPlay 
} from 'lucide-react';
import { motion } from 'framer-motion';

const modules = [
  { name: 'COMMAND CENTER', icon: LayoutDashboard },
  { name: 'FORM BOOKING', icon: FileEdit },
  { name: 'K3 SYSTEM', icon: AlertTriangle },
  { name: 'SEKURITI', icon: Shield },
  { name: 'JANITOR INDOOR', icon: Brush },
  { name: 'JANITOR OUTDOOR', icon: TreeDeciduous },
  { name: 'STOK GUDANG', icon: Box },
  { name: 'MAINTENANCE', icon: Wrench },
  { name: 'ASSET MANAGEMENT', icon: Database },
  { name: 'BACKUP DATA', icon: CloudSync },
  { name: 'SYSTEM CONFIG', icon: Settings },
  { name: 'SMART HUB TV', icon: MonitorPlay },
];

export const SovereignUniversalGrid = () => {
  const [isTV, setIsTV] = useState(false);
  useEffect(() => { setIsTV(window.innerWidth / window.innerHeight > 1.2); }, []);

  return (
    <div className="w-full min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-4 md:p-10 font-sans">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-black text-[#FFD700] uppercase tracking-[0.2em] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">Dream OS v2.1</h1>
        <p className="text-[10px] text-white/30 tracking-[0.5em] mt-2 uppercase italic text-center">Sovereign Edition • Bismillah</p>
      </header>
      <div className={`grid gap-4 md:gap-6 w-full max-w-7xl ${isTV ? 'grid-cols-6' : 'grid-cols-3'}`}>
        {modules.map((m, i) => (
          <motion.button key={i} whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 215, 0, 0.1)', zIndex: 10 }} whileTap={{ scale: 0.9 }} className="aspect-square flex flex-col items-center justify-center bg-white/5 rounded-[25px] md:rounded-[35px] border border-white/10 shadow-2xl group transition-all duration-300">
            <m.icon className="w-10 h-10 md:w-16 md:h-16 mb-3 text-[#FFD700] group-hover:drop-shadow-[0_0_10px_#FFD700]" />
            <span className="text-[7px] md:text-[10px] font-bold text-white/50 group-hover:text-white uppercase text-center px-1 tracking-tighter">{m.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

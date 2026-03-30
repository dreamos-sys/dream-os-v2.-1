"use client";
import React, { useState, useEffect } from 'react';

export default function GlobalDashboard() {
  const modules = [
    { id: 'k3', name: 'K3 & Safety', icon: '⚠️', color: 'from-amber-500' },
    { id: 'asset', name: 'ISO Assets', icon: '📦', color: 'from-emerald-500' },
    { id: 'ghost', name: 'Ghost Sec', icon: '🛡️', color: 'from-slate-700' },
    { id: 'gudang', name: 'Stok Gudang', icon: '🏗️', color: 'from-orange-500' },
    { id: 'admin', name: 'Admin ISO', icon: '📋', color: 'from-blue-500' },
    { id: 'spj', name: 'Laporan SPJ', icon: '📊', color: 'from-cyan-500' },
    { id: 'approval', name: 'Approval', icon: '✍️', color: 'from-purple-500' },
    { id: 'mon', name: 'Real-time', icon: '🖥️', color: 'from-red-500' },
    { id: 'backup', name: 'Cloud Sync', icon: '💾', color: 'from-indigo-500' }
  ];

  return (
    <div className="p-4 md:p-8 max-w-lg mx-auto">
      <header className="mb-10 text-center animate-pulse">
        <h1 className="text-4xl font-amiri text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">بِسْمِ اللَّهِ</h1>
        <p className="text-[10px] tracking-[0.4em] opacity-50 mt-2 uppercase">Neural Sovereignty v2.1</p>
      </header>

      {/* Stats Board */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 backdrop-blur-xl">
          <div className="text-[8px] opacity-50 uppercase">Immunity</div>
          <div className="text-xl font-bold text-emerald-400">100% 🛡️</div>
        </div>
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 backdrop-blur-xl">
          <div className="text-[8px] opacity-50 uppercase">Global Status</div>
          <div className="text-xl font-bold text-emerald-400">ACTIVE 🟢</div>
        </div>
      </div>

      {/* 9 Grid Modules */}
      <div className="grid grid-cols-3 gap-4">
        {modules.map((m) => (
          <button key={m.id} className="group relative aspect-square bg-slate-900/50 border border-emerald-500/10 rounded-[2rem] flex flex-col items-center justify-center transition-all hover:border-emerald-500/40 active:scale-90">
            <div className={`text-3xl mb-2 group-hover:scale-110 transition-transform`}>{m.icon}</div>
            <span className="text-[9px] font-bold opacity-60 group-hover:opacity-100 uppercase">{m.name}</span>
            <div className={`absolute inset-0 bg-gradient-to-br ${m.color} to-transparent opacity-0 group-hover:opacity-5 rounded-[2rem] transition-opacity`}></div>
          </button>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="text-[12px] font-amiri text-emerald-500/60 italic leading-loose">
          اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ
        </div>
        <div className="text-[7px] opacity-30 mt-4 tracking-tighter">
          DESIGNED BY GHOST ARCHITECT • DEPLOYED WORLDWIDE
        </div>
      </div>
    </div>
  );
}

'use client';

import { useGhostStore } from '@/lib/ghost/store';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export const Header = () => {
  const { active: ghostActive, toggle } = useGhostStore();
  const [slides, setSlides] = useState<string[]>([]);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      const { data } = await supabase
        .from('admin_info')
        .select('content')
        .in('slide_number', [5,6,7])
        .order('slide_number');
      if (data?.length) setSlides(data.map(s => s.content));
      else setSlides(['Dream OS - Enterprise', 'Siap Tempur', 'Bismillah']);
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-900/70 border-b border-emerald-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </h1>
            <p className="text-xs text-slate-400">اللهم صل على سيدنا محمد</p>
          </div>
          <button
            onClick={() => toggle()}
            className="relative group focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-full"
            aria-label="Ghost Mode"
          >
            <i className={`fas fa-ghost text-2xl transition-all duration-300 ${ghostActive ? 'text-emerald-400 scale-110' : 'text-slate-400 group-hover:text-emerald-400 group-hover:scale-110'}`}></i>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition">×5</span>
          </button>
        </div>
        {slides.length > 0 && (
          <div className="mt-4 text-emerald-400/80 text-sm text-center animate-pulse">
            {slides[slideIndex]}
          </div>
        )}
      </div>
    </header>
  );
};

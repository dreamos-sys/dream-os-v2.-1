"use client";

import React, { useState, useEffect } from 'react';

const SLIDES = [
  { id: 1, title: '👋 Say Greeting', content: 'Selamat Datang di Dream OS v2.1 PRO' },
  { id: 2, title: '📅 Booking Realtime', content: '12 Hari Ini · 8 Besok' },
  { id: 3, title: '⚠️ K3 Reports', content: '7 Resolved · 3 Pending' },
  { id: 4, title: '🌤️ Weather & 🚦 Lalin', content: '28°C · Moderate Traffic' },
  { id: 5, title: '👔 Info Management', content: '5 Booking · 3 Dana · 2 K3' },
  { id: 6, title: '🏢 Info Umum', content: 'Meeting dipindah ke Aula' },
  { id: 7, title: '💬 Ucapan Kabar', content: '🎉 Birthday: Bapak Hanung' }
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setCurrent((prev) => (prev + 1) % SLIDES.length);
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [paused]);
  return (
    <div style={{ width: '92%', maxWidth: '500px', background: '#FFFFFF', borderRadius: '28px', margin: '0 auto 20px', border: '0.5px solid #E5E5EA', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottom: '0.5px solid #E5E5EA' }}>
        <span style={{ color: '#34C759', fontSize: '14px', fontWeight: '700' }}>{SLIDES[current].title}</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#8E8E93' }}>◀</button>
          <button onClick={() => setPaused(!paused)} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#8E8E93' }}>{paused ? '▶️' : '⏸️'}</button>
          <button onClick={() => setCurrent((prev) => (prev + 1) % SLIDES.length)} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#8E8E93' }}>▶</button>
        </div>
      </div>

      {/* Content */}
      <div style={{ minHeight: '200px', padding: '40px 20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <div style={{ fontSize: '50px', marginBottom: '15px' }}>
            {SLIDES[current].title.split(' ')[0]}
          </div>
          <p style={{ color: '#1C1C1E', fontSize: '16px', fontWeight: '600' }}>{SLIDES[current].content}</p>
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '15px' }}>
        {SLIDES.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? '20px' : '8px',
              height: '8px',
              borderRadius: i === current ? '4px' : '50%',
              background: i === current ? '#34C759' : '#E5E5EA',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          />
        ))}
      </div>
    </div>
  );
}

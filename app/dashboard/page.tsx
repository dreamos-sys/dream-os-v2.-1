"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState('DEVELOPER');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAI, setShowAI] = useState(false);
  const [aiMessages, setAiMessages] = useState<{role: string, text: string}[]>([]);
  const [aiInput, setAiInput] = useState('');

  const slides = [
    { title: '👋 Say Greeting', icon: '👋', content: 'Selamat Datang\nDream OS v2.1' },
    { title: '📅 Booking', icon: '📅', content: 'Booking Hari Ini\n12 Bookings · 3 Pending' },
    { title: '⚠️ K3', icon: '⚠️', content: 'K3 Reports\n3 Pending · 7 Resolved' },
    { title: '🌤️ Weather', icon: '🌤️', content: 'Weather\n28°C · Depok, ID' },
    { title: '👔 Management', icon: '👔', content: 'Info Management\n5 Approvals Pending' },
    { title: '🏢 Info Umum', icon: '🏢', content: 'Info Umum\n3 Tasks Today' },
    { title: '💬 Ucapan', icon: '💬', content: 'Ucapan Kabar\nBirthday: Bapak Hanung' },
  ];
  const modules = [
    { name: 'Command', icon: '🎯', color: '#8b5cf6', path: '/dashboard' },
    { name: 'Booking', icon: '📅', color: '#3b82f6', path: '/dashboard' },
    { name: 'K3', icon: '⚠️', color: '#f59e0b', path: '/modules/k3' },
    { name: 'Security', icon: '🛡️', color: '#10b981', path: '/dashboard' },
    { name: 'Janitor', icon: '🧹', color: '#ec4899', path: '/dashboard' },
    { name: 'Stok', icon: '📦', color: '#f97316', path: '/dashboard' },
    { name: 'Maintenance', icon: '🔧', color: '#06b6d4', path: '/dashboard' },
    { name: 'Inventaris', icon: '📋', color: '#6366f1', path: '/dashboard' },
    { name: 'TinyGo', icon: '🚀', color: '#84cc16', path: '/modules/tinygo' },
  ];

  useEffect(() => {
    const session = sessionStorage.getItem('dream_session');
    const sessionUser = sessionStorage.getItem('dream_user');
    if (!session) {
      router.push('/login');
    } else if (sessionUser) {
      setUser(sessionUser);
    }
  }, [router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleAIMessage = () => {
    if (!aiInput.trim()) return;
    setAiMessages([...aiMessages, { role: 'user', text: aiInput }]);
    setAiInput('');
    setTimeout(() => {
      setAiMessages(prev => [...prev, { role: 'ai', text: '🤖 Baby AI: Terima kasih atas pertanyaan Anda! Saya akan membantu...' }]);
    }, 1000);
  };

  const handleGhostTap = () => {
    alert('👻 GHOST MODE\n\n5x Tap detected!\n\nEnter password: dreamos[rakaat]');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: 'white', paddingBottom: '100px' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, background: 'rgba(2,6,23,0.95)', backdropFilter: 'blur(20px)', padding: '20px 15px', borderBottom: '1px solid rgba(16,185,129,0.2)', zIndex: 100 }}>
        <div style={{ fontFamily: 'serif', fontSize: '32px', color: '#10b981', marginBottom: '5px', textAlign: 'center', cursor: 'pointer' }} onClick={handleGhostTap}>بِسْمِ اللَّهِ</div>
        <div style={{ fontFamily: 'serif', fontSize: '16px', color: 'rgba(16,185,129,0.7)', textAlign: 'center', marginBottom: '10px', cursor: 'pointer' }} onClick={handleGhostTap}>اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
        <div style={{ fontSize: '14px', color: '#10b981', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center' }}>DREAM OS V2.1</div>
        <div style={{ fontSize: '10px', color: 'rgba(148,163,184,0.7)', textAlign: 'center', marginTop: '5px' }}>Welcome, {user}</div>        <div onClick={handleGhostTap} style={{ position: 'fixed', top: '15px', right: '15px', background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', padding: '6px 12px', borderRadius: '20px', fontSize: '9px', fontWeight: '700', cursor: 'pointer', zIndex: 101 }}>👻 Ghost</div>
      </header>

      {/* Carousel */}
      <div style={{ background: 'rgba(15,23,42,0.9)', border: '2px solid rgba(16,185,129,0.3)', borderRadius: '20px', padding: '20px', margin: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <div style={{ color: '#10b981', fontSize: '14px', fontWeight: '700' }}>{slides[currentSlide].title}</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)} style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>◀</button>
            <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>▶</button>
          </div>
        </div>
        <div style={{ minHeight: '200px', background: 'rgba(2,6,23,0.8)', borderRadius: '15px', padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '50px', marginBottom: '15px' }}>{slides[currentSlide].icon}</div>
          <div style={{ color: '#10b981', fontSize: '18px', marginBottom: '10px' }}>{slides[currentSlide].content.split('\n')[0]}</div>
          <div style={{ color: 'rgba(148,163,184,0.7)', fontSize: '14px' }}>{slides[currentSlide].content.split('\n')[1]}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '15px' }}>
          {slides.map((_, i) => (<button key={i} onClick={() => setCurrentSlide(i)} style={{ width: '10px', height: '10px', borderRadius: '50%', border: '2px solid rgba(16,185,129,0.3)', background: i === currentSlide ? '#10b981' : 'transparent', cursor: 'pointer' }} />))}
        </div>
      </div>

      {/* Module Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', padding: '15px' }}>
        {modules.map((mod) => (
          <div key={mod.name} style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.1)', borderRadius: '25px', padding: '25px 15px', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ width: '60px', height: '60px', margin: '0 auto 10px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', background: `linear-gradient(135deg,${mod.color},#059669)` }}>{mod.icon}</div>
            <div style={{ fontSize: '9px', color: 'rgba(16,185,129,0.8)', textTransform: 'uppercase', fontWeight: '600' }}>{mod.name}</div>
          </div>
        ))}
      </div>

      {/* Baby AI FAB */}
      <button onClick={() => setShowAI(true)} style={{ position: 'fixed', bottom: '90px', right: '20px', width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#059669)', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', zIndex: 999 }}>🤖</button>

      {/* Baby AI Modal */}
      {showAI && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.9)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#0f172a', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '20px', width: '90%', maxWidth: '500px', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid rgba(16,185,129,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#10b981', margin: 0, fontSize: '16px' }}>🤖 Baby AI Assistant</h3>
              <button onClick={() => setShowAI(false)} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', maxHeight: '400px' }}>
              {aiMessages.length === 0 && <div style={{ color: 'rgba(148,163,184,0.7)', textAlign: 'center' }}>Assalamualaikum! Saya Baby AI Assistant. Ada yang bisa saya bantu? 🤖</div>}
              {aiMessages.map((msg, i) => (
                <div key={i} style={{ marginBottom: '15px', padding: '12px 16px', borderRadius: '12px', maxWidth: '80%', background: msg.role === 'ai' ? 'rgba(16,185,129,0.1)' : 'rgba(59,130,246,0.2)', marginLeft: msg.role === 'user' ? 'auto' : '0' }}>
                  <span style={{ color: msg.role === 'ai' ? '#10b981' : '#3b82f6', fontSize: '10px', fontWeight: '700' }}>{msg.role === 'ai' ? '🤖 AI' : '👤 YOU'}</span>
                  <p style={{ color: '#e2e8f0', fontSize: '13px', marginTop: '5px' }}>{msg.text}</p>
                </div>              ))}
            </div>
            <div style={{ padding: '20px', borderTop: '1px solid rgba(16,185,129,0.2)', display: 'flex', gap: '10px' }}>
              <input type="text" value={aiInput} onChange={(e) => setAiInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAIMessage()} placeholder="Tanya sesuatu..." style={{ flex: 1, background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px', padding: '12px', color: '#e2e8f0', outline: 'none' }} />
              <button onClick={handleAIMessage} style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Kirim</button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '480px', height: '70px', background: 'rgba(2,6,23,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(16,185,129,0.2)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 1000 }}>
        <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#10b981', background: 'none', border: 'none', fontSize: '9px' }}><span style={{ fontSize: '20px', marginBottom: '4px' }}>🏠</span><span>Home</span></button>
        <button onClick={() => router.push('/dashboard')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'rgba(148,163,184,0.8)', background: 'none', border: 'none', fontSize: '9px' }}><span style={{ fontSize: '20px', marginBottom: '4px' }}>👤</span><span>Profile</span></button>
        <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'rgba(148,163,184,0.8)', background: 'none', border: 'none', fontSize: '9px' }}><span style={{ fontSize: '20px', marginBottom: '4px' }}>📷</span><span>QR</span></button>
        <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'rgba(148,163,184,0.8)', background: 'none', border: 'none', fontSize: '9px' }}><span style={{ fontSize: '20px', marginBottom: '4px' }}>🔔</span><span>Alerts</span></button>
        <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'rgba(148,163,184,0.8)', background: 'none', border: 'none', fontSize: '9px' }}><span style={{ fontSize: '20px', marginBottom: '4px' }}>⚙️</span><span>Settings</span></button>
      </nav>
    </div>
  );
}

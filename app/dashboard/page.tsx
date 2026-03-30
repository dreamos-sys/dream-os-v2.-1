"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import initTinyGo, { getImmunityLevel, getSystemPerformance, runNeuralSimulation } from '@/lib/wasm/wasm-loader';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState('DEVELOPER');
  const [immunity, setImmunity] = useState(100);
  const [activeNav, setActiveNav] = useState('home');
  const [tinyGoReady, setTinyGoReady] = useState(false);
  const [systemStats, setSystemStats] = useState<any>(null);

  const modules = [
    { name: 'Command Center', icon: '⚡', path: '/modules/command' },
    { name: 'Form Booking', icon: '📅', path: '/modules/booking' },
    { name: 'K3', icon: '⚠️', path: '/modules/k3' },
    { name: 'Sekuriti', icon: '🛡️', path: '/modules/security' },
    { name: 'Janitor Indoor', icon: '🧹', path: '/modules/janitor' },
    { name: 'Janitor Outdoor', icon: '🌳', path: '/modules/janitor' },
    { name: 'Stok', icon: '📦', path: '/modules/stok' },
    { name: 'Maintenance', icon: '🔧', path: '/modules/maintenance' },
    { name: 'Asset', icon: '🗄️', path: '/modules/inventaris' },
  ];

  // Initialize TinyGo WASM Engine
  useEffect(() => {
    const initWASM = async () => {
      console.log('🐹 TINYGO: Initializing...');
      const ready = await initTinyGo();
      setTinyGoReady(ready);
      
      if (ready) {
        console.log('🐹 TINYGO: Engine Ready!');
        
        // Get system stats from WASM
        const stats = await getSystemPerformance();
        if (stats) {
          setSystemStats(stats);
          console.log('📊 SYSTEM STATS:', stats);
        }
        
        // Calculate immunity using WASM
        const immunityCalc = await getImmunityLevel(8, 50, 120);
        setImmunity(Math.min(immunityCalc, 100));        
        // Run neural simulation
        const neural = await runNeuralSimulation(100, 1000);
        if (neural) {
          console.log('🧠 NEURAL SIMULATION:', neural);
        }
      }
    };
    
    initWASM();
  }, []);

  useEffect(() => {
    const session = sessionStorage.getItem('dream_session');
    const sessionUser = sessionStorage.getItem('dream_user');
    if (!session) {
      router.push('/login');
    } else if (sessionUser) {
      setUser(sessionUser);
    }
    
    // Immunity simulation
    const timer = setInterval(() => {
      setImmunity(prev => Math.min(prev + 1, 100));
    }, 2000);
    
    return () => clearInterval(timer);
  }, [router]);

  const handleModuleClick = (path: string) => {
    router.push(path);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', paddingBottom: '120px' }}>
      {/* Header */}
      <header style={{ background: 'white', padding: '30px 20px 20px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src="/assets/img/icon-192.png" alt="Dream OS" style={{ width: '80px', height: '80px', borderRadius: '22px', boxShadow: '0 8px 30px rgba(0,0,0,0.15)', marginBottom: '15px' }} />
          <div style={{ fontFamily: 'Amiri, serif', fontSize: '32px', color: '#10b981', marginBottom: '8px' }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
          <div style={{ fontFamily: 'Amiri, serif', fontSize: '18px', color: 'rgba(16,185,129,0.8)', marginBottom: '15px' }}>اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1c1c1e', marginBottom: '5px' }}>DREAM OS v14.0 PRO</h1>
          <p style={{ fontSize: '14px', color: '#10b981', fontWeight: '600', marginBottom: '5px' }}>
            Global Immunity System Active {tinyGoReady && '🐹'}
          </p>
          <p style={{ fontSize: '12px', color: '#8e8e93' }}>
            🧬 Girangati: FULLY_OPERATIONAL
            {tinyGoReady && <span style={{ color: '#10b981', marginLeft: '8px' }}>· 🐹 WASM ACTIVE</span>}
          </p>
        </div>        
        {/* Immunity Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div className="immunity-badge" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
            <span>🛡️</span>
            <span>IMMUNITY: {Math.floor(immunity)}% ({Math.floor(immunity/10)} Vaccines)</span>
          </div>
          {tinyGoReady && (
            <div className="immunity-badge" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>
              <span>🐹</span>
              <span>TINYGO: ACTIVE</span>
            </div>
          )}
        </div>
        
        {/* Welcome */}
        <div style={{ textAlign: 'center', marginTop: '15px', padding: '12px', background: '#f8f8fa', borderRadius: '16px' }}>
          <span style={{ color: '#8e8e93', fontSize: '13px' }}>Welcome, </span>
          <span style={{ color: '#10b981', fontWeight: '700', fontSize: '15px' }}>{user}</span>
          {systemStats && (
            <div style={{ fontSize: '10px', color: '#8e8e93', marginTop: '5px' }}>
              Engine: {systemStats.engineVersion} · Platform: {systemStats.platform}
            </div>
          )}
        </div>
      </header>

      {/* Booking Section */}
      <div className="ios-card" style={{ marginTop: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '50px', marginBottom: '10px' }}>📅</div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#10b981', marginBottom: '5px' }}>Booking Realtime</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          <div style={{ background: '#f8f8fa', padding: '20px', borderRadius: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#10b981', marginBottom: '5px' }}>12</div>
            <div style={{ fontSize: '13px', color: '#8e8e93' }}>Hari Ini</div>
          </div>
          <div style={{ background: '#f8f8fa', padding: '20px', borderRadius: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#10b981', marginBottom: '5px' }}>8</div>
            <div style={{ fontSize: '13px', color: '#8e8e93' }}>Besok</div>
          </div>
        </div>
        
        <div style={{ background: '#f8f8fa', padding: '18px', borderRadius: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: '600', color: '#1c1c1e', marginBottom: '4px' }}>Ruang Meeting A</div>
            <div style={{ fontSize: '13px', color: '#8e8e93' }}>09:00 - 11:00 · APPROVED</div>
          </div>          <div style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%' }}></div>
        </div>
      </div>

      {/* Module Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', padding: '16px' }}>
        {modules.map((mod) => (
          <div key={mod.name} onClick={() => handleModuleClick(mod.path)} className="module-card">
            <div className="module-icon">{mod.icon}</div>
            <div className="module-label">{mod.name}</div>
          </div>
        ))}
      </div>

      {/* TinyGo Performance Monitor */}
      {tinyGoReady && systemStats && (
        <div className="ios-card" style={{ marginTop: '20px', background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(109,40,217,0.1))', border: '1px solid rgba(139,92,246,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <span style={{ fontSize: '24px' }}>🐹</span>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#8b5cf6' }}>TinyGo Performance Monitor</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: '#f8f8fa', padding: '15px', borderRadius: '16px' }}>
              <div style={{ fontSize: '11px', color: '#8e8e93', marginBottom: '5px' }}>Engine Version</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#1c1c1e' }}>{systemStats.engineVersion}</div>
            </div>
            <div style={{ background: '#f8f8fa', padding: '15px', borderRadius: '16px' }}>
              <div style={{ fontSize: '11px', color: '#8e8e93', marginBottom: '5px' }}>Platform</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#1c1c1e' }}>{systemStats.platform}</div>
            </div>
            <div style={{ background: '#f8f8fa', padding: '15px', borderRadius: '16px' }}>
              <div style={{ fontSize: '11px', color: '#8e8e93', marginBottom: '5px' }}>Performance</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#10b981' }}>{systemStats.performance}</div>
            </div>
            <div style={{ background: '#f8f8fa', padding: '15px', borderRadius: '16px' }}>
              <div style={{ fontSize: '11px', color: '#8e8e93', marginBottom: '5px' }}>Immunity Level</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#10b981' }}>{Math.floor(systemStats.immunityLevel)}%</div>
            </div>
          </div>
        </div>
      )}

      {/* iOS Dock Navigation */}
      <nav className="ios-dock">
        <div onClick={() => { setActiveNav('home'); router.push('/dashboard'); }} className={`dock-item ${activeNav === 'home' ? 'active' : ''}`}>
          <span className="dock-icon">🏠</span>
          <span>HOME</span>
        </div>
        <div onClick={() => { setActiveNav('profile'); router.push('/profile'); }} className={`dock-item ${activeNav === 'profile' ? 'active' : ''}`}>
          <span className="dock-icon">👤</span>          <span>PROFILE</span>
        </div>
        <div className="dock-center">
          <span style={{ fontSize: '28px' }}>📷</span>
        </div>
        <div onClick={() => { setActiveNav('about'); router.push('/about'); }} className={`dock-item ${activeNav === 'about' ? 'active' : ''}`}>
          <span className="dock-icon">ℹ️</span>
          <span>ABOUT</span>
        </div>
        <div onClick={() => { setActiveNav('setting'); router.push('/settings'); }} className={`dock-item ${activeNav === 'setting' ? 'active' : ''}`}>
          <span className="dock-icon">⚙️</span>
          <span>SETTING</span>
        </div>
      </nav>
    </div>
  );
}

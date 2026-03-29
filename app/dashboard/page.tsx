"use client";

import AuthGuard from '@/components/AuthGuard';
import DashboardGrid from '@/components/DashboardGrid';
import Carousel from '@/components/Carousel';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [immunity, setImmunity] = useState({ level: 0, count: 0 });
  const [time, setTime] = useState('--:--');
  const [battery, setBattery] = useState('--%');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    if ('getBattery' in navigator) {
      navigator.getBattery().then(bat => {
        setBattery(Math.round(bat.level * 100) + '%');
      });
    }

    const vaccines = JSON.parse(localStorage.getItem('dream_vaccines') || '{}');
    setImmunity({ level: vaccines.immunityLevel || 0, count: vaccines.count || 0 });

    return () => clearInterval(timeInterval);
  }, []);

  return (
    <AuthGuard>
      <div style={{ minHeight: '100vh', paddingBottom: '100px' }}>
        {/* Utility Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px 8px', background: '#FFFFFF', borderBottom: '0.5px solid #E5E5EA' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/dream/assets/img/icon-512.png" alt="Dream OS" style={{ width: '35px', height: '35px', borderRadius: '10px', cursor: 'pointer' }} />
            <span style={{ fontSize: '15px', fontWeight: '600', color: '#1C1C1E' }}>{time}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '18px', cursor: 'pointer' }}>🌙</span>
            <span style={{ fontSize: '18px', cursor: 'pointer' }}>🇮🇩</span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#34C759' }}>{battery}</span>
            <span style={{ fontSize: '18px', cursor: 'pointer' }}>⚙️</span>          </div>
        </div>

        {/* Spiritual Header */}
        <div style={{ textAlign: 'center', padding: '20px 15px 15px', background: '#FFFFFF', marginBottom: '10px' }}>
          <div style={{ fontSize: '26px', color: '#064e3b', fontFamily: 'serif', fontWeight: '700', marginBottom: '8px' }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
          <div style={{ fontSize: '20px', color: '#064e3b', fontFamily: 'serif', fontWeight: '600' }}>اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
        </div>

        {/* Immunity Badge */}
        <div style={{ background: '#34C759', color: '#fff', padding: '8px 15px', borderRadius: '20px', fontSize: '10px', fontWeight: '800', margin: '0 auto 15px', display: 'inline-block' }}>
          🛡️ IMMUNITY: {immunity.level}% ({immunity.count} Vaccines)
        </div>

        {/* 7 Slide Carousel */}
        <Carousel />

        {/* Module Grid */}
        <DashboardGrid />

        {/* iOS Dock */}
        <nav style={{ position: 'fixed', bottom: '25px', left: '50%', transform: 'translateX(-50%)', width: '92%', maxWidth: '420px', height: '75px', background: 'rgba(28,28,30,0.95)', backdropFilter: 'blur(20px)', borderRadius: '38px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: '9999' }}>
          <div style={{ textAlign: 'center', flex: 1, cursor: 'pointer' }}>
            <span style={{ fontSize: '24px' }}>🏠</span>
            <p style={{ fontSize: '7px', color: '#34C759', fontWeight: '700', margin: '4px 0 0' }}>HOME</p>
          </div>
          <div style={{ textAlign: 'center', flex: 1, cursor: 'pointer' }}>
            <span style={{ fontSize: '24px' }}>👤</span>
            <p style={{ fontSize: '7px', color: '#8E8E93', fontWeight: '700', margin: '4px 0 0' }}>PROFILE</p>
          </div>
          <div style={{ background: '#34C759', width: '60px', height: '60px', borderRadius: '22px', marginTop: '-42px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #F2F2F7', fontSize: '28px', color: '#fff' }}>🔳</div>
          <div style={{ textAlign: 'center', flex: 1, cursor: 'pointer' }}>
            <span style={{ fontSize: '24px' }}>ℹ️</span>
            <p style={{ fontSize: '7px', color: '#8E8E93', fontWeight: '700', margin: '4px 0 0' }}>ABOUT</p>
          </div>
          <div style={{ textAlign: 'center', flex: 1, cursor: 'pointer' }}>
            <span style={{ fontSize: '24px' }}>⚙️</span>
            <p style={{ fontSize: '7px', color: '#8E8E93', fontWeight: '700', margin: '4px 0 0' }}>SETTING</p>
          </div>
        </nav>
      </div>
    </AuthGuard>
  );
}

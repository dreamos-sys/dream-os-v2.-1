"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const PASS_HASH: Record<string, string> = {
    'developer': 'b15m1ll4h_012443410',
    'master': 'Mr.M_Architect2025',
    'admin': '4dm1n_AF6969@00',
    'sekuriti': 'LHPSsec_AF2025',
    'janitor': 'CHCS_AF@003',
    'stok': 'SACS_AF@004',
    'booking': 'user@1234',
    'k3': 'user@2345'
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = username.toLowerCase().trim();
    
    if (PASS_HASH[user] && PASS_HASH[user] === password) {
      sessionStorage.setItem('dream_session', 'ACTIVE');
      sessionStorage.setItem('dream_user', user.toUpperCase());
      router.push('/dashboard');
    } else {
      setError('⚠️ ACCESS DENIED - Check password!');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '30px', padding: '40px 30px', width: '100%', maxWidth: '320px' }}>
        <div style={{ fontFamily: 'serif', fontSize: '28px', color: '#10b981', marginBottom: '8px', textAlign: 'center' }}>بِسْمِ اللَّهِ</div>
        <div style={{ fontSize: '8px', color: 'rgba(16,185,129,0.6)', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center', marginBottom: '30px' }}>Kekuatan Jiwa Shalawat</div>
        
        <div style={{ fontSize: '11px', color: '#10b981', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', textAlign: 'center', fontWeight: '700' }}>🔐 Authorize Access</div>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '12px' }}>            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', background: 'rgba(2,6,23,0.6)', border: '1px solid rgba(16,185,129,0.2)', padding: '14px', borderRadius: '20px', color: 'white', fontSize: '14px', textAlign: 'center', outline: 'none' }} />
          </div>
          
          <div style={{ marginBottom: '12px', position: 'relative' }}>
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', background: 'rgba(2,6,23,0.6)', border: '1px solid rgba(16,185,129,0.2)', padding: '14px 45px 14px 14px', borderRadius: '20px', color: 'white', fontSize: '14px', textAlign: 'center', outline: 'none' }} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(16,185,129,0.6)', cursor: 'pointer', fontSize: '16px' }}>{showPassword ? '🙈' : '👁️'}</button>
          </div>
          
          <button type="submit" style={{ width: '100%', background: '#10b981', border: 'none', padding: '16px', borderRadius: '20px', color: '#020617', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', cursor: 'pointer', marginTop: '10px' }}>🔓 UNLOCK SYSTEM</button>
          
          {error && <div style={{ color: '#ef4444', fontSize: '10px', textAlign: 'center', marginTop: '15px' }}>{error}</div>}
          
          <button type="button" onClick={() => router.push('/')} style={{ width: '100%', background: 'transparent', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', padding: '15px', borderRadius: '25px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', marginTop: '15px' }}>← Back</button>
        </form>
      </div>
    </div>
  );
}

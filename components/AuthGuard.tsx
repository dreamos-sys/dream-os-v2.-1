"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const CREDENTIALS: Record<string, string> = {
  'developer': 'b15m1ll4h_012443410',
  'master': 'Mr.M_Architect_2025',
  'admin': '4dm1n_AF6969@00',
  'sekuriti': 'LHPSsec_AF2025',
  'janitor': 'CHCS_AF_@003',
  'stok': 'SACS_AF@004',
  'maintenance': 'M41n_4F@234',
  'inventaris': '4dm1n_6969@01',
  'gudang': '4dm1n_9696@02',
  'asset': '4553Tumum_AF@1112',
  'booking': 'user_@1234',
  'k3': 'user_@2345'
};

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {    console.log('🛡️ AuthGuard: Checking authentication...');
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        console.log('✅ Supabase session active');
        setAuthenticated(true);
        setUser(session.user.email || session.user.user_metadata?.username);
        setLoading(false);
        vibrate([30, 20]);
        learnAuth('supabase_session');
        return;
      }

      const savedSession = localStorage.getItem('dream_session');
      const savedUser = localStorage.getItem('dream_user');
      
      if (savedSession === 'ACTIVE' && savedUser) {
        console.log('✅ LocalStorage session active (migration mode)');
        setAuthenticated(true);
        setUser(savedUser);
        setLoading(false);
        vibrate([30, 20]);
        learnAuth('localStorage_session');
        return;
      }

      console.log('❌ No session found, redirecting to login...');
      setLoading(false);
      router.push('/login');
      
    } catch (error) {
      console.error('🚨 AuthGuard error:', error);
      setLoading(false);
      router.push('/login');
    }
  }

  function vibrate(pattern: number[]) {
    if (typeof window !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }

  function learnAuth(method: string) {
    if (typeof window !== 'undefined') {
      const logs = JSON.parse(localStorage.getItem('dream_auth_logs') || '[]');
      logs.push({ method, user, timestamp: new Date().toISOString(), success: true });
      localStorage.setItem('dream_auth_logs', JSON.stringify(logs.slice(-100)));    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#020617', color: '#10b981' }}>
        <div style={{ width: '60px', height: '60px', border: '4px solid rgba(16,185,129,0.2)', borderTopColor: '#10b981', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ marginTop: '20px', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase' }}>🧬 Initializing Neural Core...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!authenticated) return null;

  return <>{children}</>;
}

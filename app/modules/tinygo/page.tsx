"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function TinyGoPage() {
  const router = useRouter();

  return (
    <div style={{ padding: '20px', color: 'white', minHeight: '100vh', background: '#020617' }}>
      <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}>← Back</button>
      <h1 style={{ color: '#10b981', marginBottom: '20px' }}>🚀 TinyGo Module</h1>
      <div style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '20px', padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🚀</div>
        <h2 style={{ color: '#10b981', marginBottom: '10px' }}>TinyGo is Coming Soon!</h2>
        <p style={{ color: 'rgba(148,163,184,0.7)' }}>This module is under development.</p>
      </div>
    </div>
  );
}

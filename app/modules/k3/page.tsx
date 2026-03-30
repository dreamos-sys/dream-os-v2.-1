"use client";

import React, { useState } from 'react';

export default function K3Page() {
  const [formData, setFormData] = useState({
    incident_type: '',
    location: '',
    description: '',
    route_to: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    const reports = JSON.parse(localStorage.getItem('k3_reports') || '[]');
    reports.push({
      ...formData,
      id: Date.now(),
      date: new Date().toISOString()
    });
    localStorage.setItem('k3_reports', JSON.stringify(reports));
    
    alert('✅ K3 Report Submitted!');
    setFormData({ incident_type: '', location: '', description: '', route_to: '' });
  };

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h1 style={{ color: '#10b981', marginBottom: '20px' }}>⚠️ K3 & Safety</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          placeholder="Incident Type"
          value={formData.incident_type}
          onChange={(e) => setFormData({...formData, incident_type: e.target.value})}
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #10b981', background: '#0f172a', color: 'white' }}
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #10b981', background: '#0f172a', color: 'white' }}
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #10b981', background: '#0f172a', color: 'white', minHeight: '100px' }}
        />
        <button type="submit" style={{ padding: '12px', borderRadius: '8px', border: 'none', background: '#10b981', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
          Submit Report
        </button>
      </form>
    </div>
  );
}

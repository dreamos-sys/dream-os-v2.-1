// hooks/useDreamAI.js - React Hook ✨
import { useState, useCallback } from 'react';

export function useDreamAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const chat = useCallback(async (prompt, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          spiritual: options.spiritual ?? true
        })
      });
      
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'AI request failed');
      }
      
      const data = await res.json();
      return data.response;
      
    } catch (err) {
      setError(err.message);
      console.error('🤖 AI Error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { chat, loading, error };
}

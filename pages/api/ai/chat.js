export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { prompt, useLocal = false, spiritual = true } = req.body;
  
  // 🔍 Debug log (keluar di Vercel Logs)
  console.log('🔍 Hybrid Debug:', { useLocal, hasLocalUrl: !!process.env.LOCAL_OLLAMA_URL });
  
  // 🎯 Pilih jalur: Lokal atau Cloud
  const isLocal = useLocal === true && process.env.LOCAL_OLLAMA_URL;
  
  let apiUrl, headers, modelName, bodyPayload;
  
  if (isLocal) {
    // 📱 Sis Qwen @ Lokal (via Pinggy)
    apiUrl = `${process.env.LOCAL_OLLAMA_URL}/api/chat`;
    headers = { 
      'Content-Type': 'application/json',
      'X-Pinggy-No-Screen': 'true'
    };
    modelName = 'qwen2.5-coder:1.5b';
    bodyPayload = {
      model: modelName,
      messages: [{ 
        role: 'user', 
        content: spiritual ? `Bismillah bi idznillah. ${prompt}` : prompt 
      }],
      stream: false,
      options: { temperature: 0.3 }
    };
  } else {
    // ☁️ Gemma @ Cloud
    apiUrl = 'https://ollama.com/v1/chat/completions';
    headers = { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OLLAMA_KEY}`
    };
    modelName = 'gemma3:4b';
    bodyPayload = {
      model: modelName,
      messages: [{ 
        role: 'user', 
        content: spiritual ? `Bismillah bi idznillah. ${prompt}` : prompt 
      }],
      stream: false,
      temperature: 0.3
    };
  }
  
  console.log('🎯 Using:', isLocal ? 'LOCAL' : 'CLOUD', '| Model:', modelName);
  
  try {
    const apiRes = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(bodyPayload),
      next: { revalidate: 0 }
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      throw new Error(`${apiRes.status}: ${errText}`);
    }
    
    const data = await apiRes.json();
    
    // 🔄 Format response beda: Lokal vs Cloud
    const finalReply = isLocal 
      ? data.message?.content 
      : data.choices?.[0]?.message?.content;
    
    res.status(200).json({ 
      response: finalReply || '🧘 AI sedang berpikir...', 
      model: modelName,
      source: isLocal ? 'local' : 'cloud'
    });
    
  } catch (err) {
    console.error('💥 Hybrid AI Error:', err.message);
    res.status(500).json({ 
      error: isLocal 
        ? `Sis Qwen error: ${err.message}` 
        : `Gemma Cloud error: ${err.message}`,
      fallback: 'Coba switch mode atau cek koneksi!'
    });
  }
}

fetch('/api/ai/chat', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({prompt: 'Halo Dream OS! Sapa Mr. M!'})
   })
   .then(r => r.json())
   .then(d => console.log('🤖 AI:', d.response));

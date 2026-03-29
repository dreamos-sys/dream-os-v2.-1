// 💖 GIRANGATI ENGINE v1.0 - PURE JAVASCRIPT EDITION
// "Ringan, Tanpa Permission Denied, Tetap Sovereign!"

const Girangati = {
    greet: () => {
        return "Assalamu'alaikum Master M, Girangati Engine v1.0 (JS) Online! ⚡";
    },
    shield: (data) => {
        return `ISO-ENCRYPTED-${data}-SHALAWAT-SHIELD`;
    }
};

// Daftarin ke global biar bisa dipanggil Sis Gemini
window.greetGirangati = Girangati.greet;
window.girangatiShield = Girangati.shield;

console.log("💖 Girangati Engine: Initializing Sovereign Core (Pure JS)... JRENG!");
// 🕵️ Ghost Architect: Global Splash Injected
window.addEventListener('load', () => {
    const splash = document.createElement('div');
    splash.id = 'dream-splash';
    splash.innerHTML = `
        <div style="position:fixed; top:0; left:0; width:100%; height:100vh; background:#0f172a; display:flex; flex-direction:column; justify-content:center; align-items:center; z-index:9999;">
            <img src="assets/img/icon-512x512.png" style="width:120px; animation: pulse 2s infinite;">
            <h2 style="color:#10b981; margin-top:20px; font-family:sans-serif;">Dream OS v2.2</h2>
            <p style="color:#64748b;">Initializing Girangati Engine...</p>
        </div>
        <style>
            @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.7; } 100% { transform: scale(1); opacity: 1; } }
        </style>
    `;
    document.body.appendChild(splash);
    setTimeout(() => splash.remove(), 2500); // 2.5 detik JRENG!
});

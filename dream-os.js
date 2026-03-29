// 🖥️ DREAM OS - THE CELLULAR DASHBOARD
// Integrated with Girangati Nervous System

window.addEventListener('dream_os_pulse', (e) => {
    // Kabel ini nyambung ke Header!
    const statusText = document.getElementById('system-status');
    if(statusText) statusText.innerText = "ONLINE: " + e.detail;
});

window.renderApp = () => {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div style="background:#000000; min-height:100vh; color:#f8fafc; font-family:sans-serif; display:flex; flex-direction:column; align-items:center; padding:20px;">
            <div style="text-align:center; margin-bottom:5px;">
                <p style="margin:0; font-size:13px; color:#10b981; letter-spacing:3px;">BISMILLAH BI IDZNILLAH</p>
                <p id="system-status" style="margin:5px 0; font-size:10px; color:#94a3b8; font-style:italic;">Syncing with Cell...</p>
            </div>

            <div onclick="window.girangati.broadcast('Ghost Mode Triggered!')" style="cursor:pointer; margin-bottom:25px;">
                <img src="assets/img/icon-192x192.png" style="width:30px; height:30px; animation: huBumi 8s infinite ease-in-out; filter: drop-shadow(0 0 8px #fbbf24);">
            </div>

            <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:12px; width:100%; max-width:450px;">
                ${['Logistik', 'Aset ISO', 'Keuangan', 'K3 & SEC', 'Gudang', 'Admin SPJ', 'Girangati', 'Team', 'Settings'].map(item => `
                    <div style="background:linear-gradient(145deg, #1e293b, #0f172a); aspect-ratio:1/1; border-radius:15px; display:flex; flex-direction:column; justify-content:center; align-items:center; border:1px solid #334155;">
                        <span style="font-size:10px; color:#cbd5e1; font-weight:bold;">${item.toUpperCase()}</span>
                    </div>
                `).join('')}
            </div>
            
            <style>
                @keyframes huBumi { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
            </style>
        </div>
    `;
};
window.renderApp();

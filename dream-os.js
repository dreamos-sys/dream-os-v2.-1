/* 🧬 DREAM OS v13.8 - SOVEREIGN HUMAN IMMUNITY SYSTEM
   Mahkota: Pure Bismillah & Shalawat Arabic
   Heart: Icon Hu (هـ) - Pulse 8s
   Struktur: Slider 7s | 9 Grid | Sticky Nav 5
*/

window.onload = () => {
    if (!localStorage.getItem('dream_os_session')) { renderLogin(); } 
    else { renderDashboard(); }
};

function renderDashboard() {
    const app = document.getElementById('app');
    const mods = [
        {n:'Command Center', e:'⚡'}, {n:'Form Booking', e:'📅'}, {n:'K3', e:'⚠️'},
        {n:'Sekuriti', e:'🛡️'}, {n:'Janitor Indoor', e:'🧹'}, {n:'Janitor Outdoor', e:'🌳'},
        {n:'Stok', e:'📦'}, {n:'Maintenance', e:'🔧'}, {n:'Asset', e:'🗄️'}
    ];

    app.innerHTML = `
        <div style="background:#000; min-height:100vh; color:#fff; font-family:sans-serif; display:flex; flex-direction:column; align-items:center; padding-bottom:110px;">
            
            <div style="width:100%; text-align:center; padding:30px 0 10px; background:linear-gradient(to bottom, #064e3b, #000);">
                <div style="font-size:24px; color:#10b981; font-family:serif; margin-bottom:12px;">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
                <div style="font-size:16px; color:#94a3b8; font-family:serif;">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
            </div>

            <div onclick="triggerGhost()" style="margin:10px 0 20px; cursor:pointer;">
                <img src="assets/img/apple-touch-icon.png" style="width:52px; height:52px; animation: huPulse 8s infinite ease-in-out; filter: drop-shadow(0 0 15px rgba(251,191,36,0.5));">
            </div>

            <div style="width:92%; max-width:400px; height:60px; background:rgba(16,185,129,0.05); border-radius:15px; border:1px solid #065f46; display:flex; align-items:center; justify-content:center; margin-bottom:18px;">
                <p style="font-size:10px; color:#fbbf24; font-weight:bold; letter-spacing:1px; animation: slideText 7s infinite;">DREAM OS PRO GLOBAL SYSTEM INTEGRATED</p>
            </div>

            <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:12px; width:92%; max-width:420px;">
                ${mods.map(m => `
                    <div onclick="window.girangati.leukosit.scan('${m.n}')" style="background:rgba(15,15,15,0.95); aspect-ratio:1/1; border-radius:24px; display:flex; flex-direction:column; justify-content:center; align-items:center; border:1px solid #1a1a1a; backdrop-filter:blur(10px);">
                        <span style="font-size:28px; margin-bottom:6px;">${m.e}</span>
                        <span style="font-size:7px; color:#555; font-weight:bold; text-transform:uppercase; text-align:center;">${m.n}</span>
                    </div>
                `).join('')}
            </div>

            <div style="position:fixed; bottom:25px; width:92%; max-width:450px; height:75px; background:rgba(5,5,5,0.98); backdrop-filter:blur(30px); border-radius:30px; display:flex; justify-content:space-around; align-items:center; border:1px solid #222; z-index:9999; box-shadow: 0 20px 60px #000;">
                <div onclick="location.reload()" style="text-align:center; flex:1;"><div style="font-size:20px;">🏠</div><div style="font-size:7px; color:#10b981;">HOME</div></div>
                <div style="text-align:center; flex:1;"><div style="font-size:20px;">👤</div><div style="font-size:7px; color:#444;">PROFILE</div></div>
                <div style="flex:1.2; display:flex; justify-content:center;">
                    <div style="background:#10b981; width:62px; height:62px; border-radius:22px; margin-top:-40px; display:flex; align-items:center; justify-content:center; border:4px solid #000; box-shadow:0 10px 25px rgba(16,185,129,0.3);">
                        <div style="font-size:28px; color:#fff;">🔳</div>
                    </div>
                </div>
                <div style="text-align:center; flex:1;"><div style="font-size:20px;">ℹ️</div><div style="font-size:7px; color:#444;">ABOUT</div></div>
                <div style="text-align:center; flex:1;"><div style="font-size:20px;">⚙️</div><div style="font-size:7px; color:#444;">SETTING</div></div>
            </div>

            <style>
                @keyframes huPulse { 0%, 100% { transform: scale(1); filter: brightness(1); } 50% { transform: scale(1.05); filter: brightness(1.25); } }
                @keyframes slideText { 0%, 100% { opacity: 0.8; } 50% { opacity: 1; } }
            </style>
        </div>
    `;
}

function triggerGhost() {
    window.ghostCount = (window.ghostCount || 0) + 1;
    if(window.ghostCount === 5) { alert("🛡️ GHOST ACCESS ACTIVATED"); window.ghostCount = 0; }
    setTimeout(() => { window.ghostCount = 0; }, 3000);
}

function renderLogin() {
    document.getElementById('app').innerHTML = `<div style="background:#000; height:100vh; display:flex; justify-content:center; align-items:center;"><button onclick="localStorage.setItem('dream_os_session','1');location.reload();" style="padding:15px 40px; background:#10b981; color:#fff; border:none; border-radius:10px; font-weight:bold;">ENTER HOUSE</button></div>`;
}

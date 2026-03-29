/* 🧬 DREAM OS v13.9 - THE SOVEREIGN PRO GLOBAL INTEGRATED
   Layout: Sovereign (Header), Hu Pulse (Left 8s), Extended Slider (7s), Smooth 9 Grid (White), Sticky Nav
*/

window.onload = () => {
    if (!localStorage.getItem('dream_os_session')) renderLogin();
    else renderDashboard();
};

function renderDashboard() {
    const app = document.getElementById('app');
    const mods = [
        {n:'Command Center', e:'⚡'}, {n:'Form Booking', e:'📅'}, {n:'K3', e:'⚠️'},
        {n:'Sekuriti', e:'🛡️'}, {n:'Janitor Indoor', e:'🧹'}, {n:'Janitor Outdoor', e:'🌳'},
        {n:'Stok', e:'📦'}, {n:'Maintenance', e:'🔧'}, {n:'Asset', e:'🗄️'}
    ];

    app.innerHTML = `
        <div style="background:#000; min-height:100vh; color:#fff; font-family:sans-serif; display:flex; flex-direction:column; align-items:center; padding-bottom:120px;">
            
            <div style="width:100%; display:flex; align-items:center; padding:30px 20px 10px; background:linear-gradient(to bottom, #000, #000);">
                
                <div onclick="triggerGhost()" style="flex:0; margin-right:20px; animation: huPulse 8s infinite ease-in-out;">
                    <img src="assets/img/apple-touch-icon.png" style="width:45px; height:45px; filter: drop-shadow(0 0 10px rgba(251,191,36,0.3));">
                </div>

                <div style="flex:1; text-align:center;">
                    <div style="font-size:18px; color:#10b981; font-family:serif; margin-bottom:5px;">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
                    <div style="font-size:13px; color:#94a3b8; font-family:serif; line-height:1.2;">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
                </div>
            </div>

            <div style="width:96%; max-width:480px; height:55px; background:linear-gradient(to right, rgba(16,185,129,0.02), rgba(251,191,36,0.02)); border-radius:12px; border:1px solid #111; display:flex; align-items:center; justify-content:center; margin-bottom:15px;">
                <p style="font-size:9px; color:#666; font-weight:bold; letter-spacing:1.5px; animation: slideText 7s infinite;">DREAM OS PRO GLOBAL SYSTEM INTEGRATED</p>
            </div>

            <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:15px; width:94%; max-width:440px;">
                ${mods.map(m => `
                    <div style="background:#fff; aspect-ratio:1/1; border-radius:24px; display:flex; flex-direction:column; justify-content:center; align-items:center; border:1px solid #f0f0f0; transition:all 0.3s;">
                        <span style="font-size:30px; margin-bottom:8px;">${m.e}</span>
                        <span style="font-size:8px; color:#111; font-weight:bold; text-transform:uppercase; text-align:center; padding:0 8px; line-height:1.2;">${m.n}</span>
                    </div>
                `).join('')}
            </div>

            <div style="position:fixed; bottom:25px; width:92%; max-width:450px; height:75px; background:rgba(5,5,5,0.98); backdrop-filter:blur(30px); border-radius:30px; display:flex; justify-content:space-around; align-items:center; border:1px solid #222; z-index:9999; box-shadow: 0 20px 60px #000;">
                <div onclick="location.reload()" style="text-align:center; flex:1;"><div style="font-size:20px;">🏠</div><div style="font-size:7px; color:#10b981; margin-top:2px;">HOME</div></div>
                <div style="text-align:center; flex:1;"><div style="font-size:20px; color:#444;">👤</div><div style="font-size:7px; color:#444; margin-top:2px;">PROFILE</div></div>
                <div style="flex:1.2; display:flex; justify-content:center;">
                    <div style="background:#10b981; width:62px; height:62px; border-radius:22px; margin-top:-45px; display:flex; align-items:center; justify-content:center; border:4px solid #000; box-shadow:0 10px 25px rgba(16,185,129,0.3);">
                        <div style="font-size:28px; color:#fff;">🔳</div>
                    </div>
                </div>
                <div style="text-align:center; flex:1;"><div style="font-size:20px; color:#444;">ℹ️</div><div style="font-size:7px; color:#444; margin-top:2px;">ABOUT</div></div>
                <div style="text-align:center; flex:1;"><div style="font-size:20px; color:#444;">⚙️</div><div style="font-size:7px; color:#444; margin-top:2px;">SETTING</div></div>
            </div>

            <style>
                @keyframes huPulse { 0%, 100% { transform: scale(1); filter: brightness(1); } 50% { transform: scale(1.05); filter: brightness(1.25); } }
                @keyframes slideText { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
            </style>
        </div>
    `;
}

function triggerGhost() {
    window.ghostCount = (window.ghostCount || 0) + 1;
    if(window.ghostCount === 5) { alert("🛡️ GHOST ACCESS ACTIVATED"); window.ghostCount = 0; }
    setTimeout(() => { window.ghostCount = 0; }, 3000);
}

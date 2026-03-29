/* 🧬 DREAM OS v14.6 - HIGH-EFFICIENCY iOS
   Concept: Every Inch Matters | Integrated Header | Full 9 Grid View
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
        <div style="background:#F2F2F7; min-height:100vh; color:#000; font-family:-apple-system, BlinkMacSystemFont, sans-serif; display:flex; flex-direction:column; align-items:center; padding-bottom:100px;">
            
            <div style="width:100%; display:flex; align-items:center; justify-content:center; padding:35px 15px 10px; background:rgba(242,242,247,0.9); backdrop-filter:blur(10px);">
                <div onclick="triggerGhost()" style="margin-right:15px; animation: huPulse 8s infinite ease-in-out;">
                    <img src="assets/img/apple-touch-icon.png" style="width:38px; height:38px; border-radius:10px;">
                </div>
                <div style="text-align:center;">
                    <div style="font-size:22px; color:#064e3b; font-family:serif; font-weight:700; line-height:1;">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
                    <div style="font-size:12px; color:#8E8E93; font-family:serif; margin-top:2px;">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
                </div>
            </div>

            <div style="width:92%; max-width:440px; height:160px; background:#FFFFFF; border-radius:24px; display:flex; flex-direction:column; align-items:center; justify-content:center; margin:5px 0 15px; box-shadow: 0 8px 25px rgba(0,0,0,0.03); border:0.5px solid rgba(0,0,0,0.05); overflow:hidden;">
                <div style="text-align:center; padding:20px;">
                    <div style="font-size:10px; color:#34C759; font-weight:800; letter-spacing:1px; margin-bottom:5px; text-transform:uppercase;">Immunity Global System</div>
                    <div style="font-size:15px; font-weight:700; color:#1C1C1E;">Sovereign Integrated</div>
                    <div style="font-size:11px; color:#8E8E93; margin-top:3px;">Monitoring Al-Fikri Central Base</div>
                </div>
                <div style="width:100%; height:3px; background:#F2F2F7;">
                    <div style="height:100%; background:#34C759; width:75%;"></div>
                </div>
            </div>

            <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:12px; width:92%; max-width:440px;">
                ${mods.map(m => `
                    <div onclick="window.girangati.brain.emit('MODULE_OPEN', '${m.n}')" style="background:#FFFFFF; aspect-ratio:1/1; border-radius:20px; display:flex; flex-direction:column; justify-content:center; align-items:center; box-shadow: 0 4px 10px rgba(0,0,0,0.02); border:0.5px solid rgba(0,0,0,0.05);">
                        <span style="font-size:32px; margin-bottom:5px;">${m.e}</span>
                        <span style="font-size:7.5px; color:#1C1C1E; font-weight:700; text-transform:uppercase; text-align:center; padding:0 5px;">${m.n}</span>
                    </div>
                `).join('')}
            </div>

            <div style="position:fixed; bottom:25px; width:92%; max-width:420px; height:75px; background:rgba(28, 28, 30, 0.96); backdrop-filter:blur(20px); border-radius:35px; display:flex; justify-content:space-around; align-items:center; z-index:9999; box-shadow: 0 15px 35px rgba(0,0,0,0.3);">
                <div style="text-align:center; flex:1;"><div style="font-size:24px;">🏠</div><div style="font-size:7px; color:#34C759; font-weight:bold; margin-top:2px;">HOME</div></div>
                <div style="text-align:center; flex:1;"><div style="font-size:24px; color:#8E8E93;">👤</div><div style="font-size:7px; color:#8E8E93; font-weight:bold; margin-top:2px;">PROFILE</div></div>
                <div style="flex:1.2; display:flex; justify-content:center;">
                    <div style="background:#34C759; width:62px; height:62px; border-radius:20px; margin-top:-45px; display:flex; align-items:center; justify-content:center; border:5px solid #F2F2F7; box-shadow: 0 8px 15px rgba(52, 199, 89, 0.2);">
                        <div style="font-size:30px; color:#fff;">🔳</div>
                    </div>
                </div>
                <div style="text-align:center; flex:1;"><div style="font-size:24px; color:#8E8E93;">ℹ️</div><div style="font-size:7px; color:#8E8E93; font-weight:bold; margin-top:2px;">ABOUT</div></div>
                <div style="text-align:center; flex:1;"><div style="font-size:24px; color:#8E8E93;">⚙️</div><div style="font-size:7px; color:#8E8E93; font-weight:bold; margin-top:2px;">SETTING</div></div>
            </div>

            <style>
                @keyframes huPulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 1; } }
            </style>
        </div>
    `;
}

function triggerGhost() {
    window.ghostCount = (window.ghostCount || 0) + 1;
    if(window.ghostCount === 5) { alert("🛡️ SYSTEM SECURE: MASTER M ACCESS"); window.ghostCount = 0; }
    setTimeout(() => { window.ghostCount = 0; }, 3000);
}

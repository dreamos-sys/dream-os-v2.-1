/* 🧬 DREAM OS v14.4 - THE iOS SOVEREIGN ELITE
   Style: Full iOS Ecosystem | Glassmorphism | Squircle Grid | Luxury White Standard
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
        <div style="background:#F2F2F7; min-height:100vh; color:#000; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display:flex; flex-direction:column; align-items:center; padding-bottom:140px;">
            
            <div style="width:100%; display:flex; flex-direction:column; align-items:center; padding:60px 20px 20px; background:rgba(242, 242, 247, 0.8); backdrop-filter:blur(20px); sticky:top:0; z-index:100;">
                <div style="display:flex; align-items:center; width:100%; max-width:400px; justify-content:center; position:relative;">
                    <div onclick="triggerGhost()" style="position:absolute; left:0; animation: huPulse 8s infinite ease-in-out;">
                        <img src="assets/img/apple-touch-icon.png" style="width:40px; height:40px; border-radius:10px;">
                    </div>
                    <div style="text-align:center;">
                        <div style="font-size:26px; color:#064e3b; font-family:serif; font-weight:700; letter-spacing:-0.5px;">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
                        <div style="font-size:14px; color:#8E8E93; font-family:serif; margin-top:4px;">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
                    </div>
                </div>
            </div>

            <div style="width:90%; max-width:440px; height:180px; background:#FFFFFF; border-radius:28px; display:flex; flex-direction:column; align-items:center; justify-content:center; margin:10px 0 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border:0.5px solid rgba(0,0,0,0.05); overflow:hidden;">
                <div style="text-align:center; padding:25px;">
                    <div style="font-size:10px; color:#34C759; font-weight:800; letter-spacing:1px; margin-bottom:10px; text-transform:uppercase;">Immunity Global System</div>
                    <div style="font-size:16px; font-weight:600; color:#1C1C1E; margin-bottom:5px;">Sovereign Integrated</div>
                    <div style="font-size:12px; color:#8E8E93;">Monitoring Al-Fikri Central Base</div>
                </div>
                <div style="width:100%; height:4px; background:#F2F2F7; position:relative;">
                    <div style="position:absolute; left:0; height:100%; background:#34C759; width:65%; border-radius:0 2px 2px 0;"></div>
                </div>
            </div>

            <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:20px; width:90%; max-width:440px;">
                ${mods.map(m => `
                    <div onclick="window.girangati.leukosit.scan('${m.n}')" style="background:#FFFFFF; aspect-ratio:1/1; border-radius:22px; display:flex; flex-direction:column; justify-content:center; align-items:center; box-shadow: 0 4px 12px rgba(0,0,0,0.03); border:0.5px solid rgba(0,0,0,0.05); transition: transform 0.2s active;">
                        <span style="font-size:38px; margin-bottom:8px;">${m.e}</span>
                        <span style="font-size:8px; color:#1C1C1E; font-weight:700; text-transform:uppercase; text-align:center; padding:0 5px; letter-spacing:0.3px;">${m.n}</span>
                    </div>
                `).join('')}
            </div>

            <div style="position:fixed; bottom:35px; width:90%; max-width:420px; height:80px; background:rgba(28, 28, 30, 0.94); backdrop-filter:blur(25px); border-radius:40px; display:flex; justify-content:space-around; align-items:center; z-index:9999; box-shadow: 0 20px 40px rgba(0,0,0,0.25);">
                <div style="text-align:center; flex:1;"><div style="font-size:26px;">🏠</div><div style="font-size:7px; color:#34C759; font-weight:bold; margin-top:4px;">HOME</div></div>
                <div style="text-align:center; flex:1;"><div style="font-size:26px; color:#8E8E93;">👤</div><div style="font-size:7px; color:#8E8E93; font-weight:bold; margin-top:4px;">PROFILE</div></div>
                
                <div style="flex:1.2; display:flex; justify-content:center;">
                    <div style="background:#34C759; width:66px; height:66px; border-radius:22px; margin-top:-50px; display:flex; align-items:center; justify-content:center; border:5px solid #F2F2F7; box-shadow: 0 8px 20px rgba(52, 199, 89, 0.3);">
                        <div style="font-size:32px; color:#fff;">🔳</div>
                    </div>
                </div>

                <div style="text-align:center; flex:1;"><div style="font-size:26px; color:#8E8E93;">ℹ️</div><div style="font-size:7px; color:#8E8E93; font-weight:bold; margin-top:4px;">ABOUT</div></div>
                <div style="text-align:center; flex:1;"><div style="font-size:26px; color:#8E8E93;">⚙️</div><div style="font-size:7px; color:#8E8E93; font-weight:bold; margin-top:4px;">SETTING</div></div>
            </div>

            <style>
                @keyframes huPulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 1; } }
                body { -webkit-tap-highlight-color: transparent; }
            </style>
        </div>
    `;
}

function triggerGhost() {
    window.ghostCount = (window.ghostCount || 0) + 1;
    if(window.ghostCount === 5) { alert("🛡️ SYSTEM SECURE: MASTER M ACCESS"); window.ghostCount = 0; }
    setTimeout(() => { window.ghostCount = 0; }, 3000);
}

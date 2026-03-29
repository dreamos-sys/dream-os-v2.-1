/* 🧬 DREAM OS v14.2 - THE WHITE SOVEREIGN GLOBAL
   Style: Global White Standard | Mega Slider BSI | Smooth Grid
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
        <div style="background:#F8F9FA; min-height:100vh; color:#111; font-family:sans-serif; display:flex; flex-direction:column; align-items:center; padding-bottom:120px;">
            
            <div style="width:100%; display:flex; align-items:center; justify-content:center; padding:50px 20px 20px; background:#F8F9FA;">
                <div onclick="triggerGhost()" style="margin-right:20px; animation: huPulse 8s infinite ease-in-out;">
                    <img src="assets/img/apple-touch-icon.png" style="width:42px; height:42px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));">
                </div>
                <div style="text-align:center;">
                    <div style="font-size:22px; color:#064e3b; font-family:serif; margin-bottom:5px;">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
                    <div style="font-size:14px; color:#475569; font-family:serif;">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
                </div>
            </div>

            <div style="width:94%; max-width:500px; height:180px; background:#fff; border-radius:18px; border:1px solid #E5E7EB; display:flex; align-items:center; justify-content:center; margin-bottom:25px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); overflow:hidden;">
                <div style="text-align:center; padding:0 30px;">
                    <p style="font-size:12px; color:#059669; font-weight:bold; letter-spacing:1px; margin-bottom:8px;">DREAM OS PRO GLOBAL</p>
                    <p style="font-size:10px; color:#94a3b8; line-height:1.4;">Integrated Immunity System<br>SIF Al-Fikri Central Base</p>
                </div>
            </div>

            <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:15px; width:92%; max-width:440px;">
                ${mods.map(m => `
                    <div onclick="window.girangati.leukosit.scan('${m.n}')" style="background:#fff; width:110px; height:110px; border-radius:26px; display:flex; flex-direction:column; justify-content:center; align-items:center; border:1px solid #F3F4F6; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); margin:auto; transition: 0.3s;">
                        <span style="font-size:32px; margin-bottom:8px;">${m.e}</span>
                        <span style="font-size:8px; color:#1F2937; font-weight:bold; text-transform:uppercase; text-align:center; padding:0 5px;">${m.n}</span>
                    </div>
                `).join('')}
            </div>

            <div style="position:fixed; bottom:25px; width:92%; max-width:450px; height:75px; background:#111; border-radius:32px; display:flex; justify-content:space-around; align-items:center; z-index:9999; box-shadow: 0 20px 40px rgba(0,0,0,0.2);">
                <div style="text-align:center; flex:1;"><div style="font-size:22px;">🏠</div><div style="font-size:7px; color:#10b981; font-weight:bold;">HOME</div></div>
                <div style="text-align:center; flex:1;"><div style="font-size:22px;">👤</div><div style="font-size:7px; color:#666;">PROFILE</div></div>
                <div style="flex:1.2; display:flex; justify-content:center;">
                    <div style="background:#10b981; width:62px; height:62px; border-radius:22px; margin-top:-45px; display:flex; align-items:center; justify-content:center; border:5px solid #F8F9FA;">
                        <div style="font-size:28px; color:#fff;">🔳</div>
                    </div>
                </div>
                <div style="text-align:center; flex:1;"><div style="font-size:22px;">ℹ️</div><div style="font-size:7px; color:#666;">ABOUT</div></div>
                <div style="text-align:center; flex:1;"><div style="font-size:22px;">⚙️</div><div style="font-size:7px; color:#666;">SETTING</div></div>
            </div>

            <style>
                @keyframes huPulse { 0%, 100% { transform: scale(1); filter: brightness(1); } 50% { transform: scale(1.05); filter: brightness(1.1); } }
            </style>
        </div>
    `;
}

function triggerGhost() {
    window.ghostCount = (window.ghostCount || 0) + 1;
    if(window.ghostCount === 5) { alert("🛡️ GHOST ACCESS ACTIVATED"); window.ghostCount = 0; }
    setTimeout(() => { window.ghostCount = 0; }, 3000);
}

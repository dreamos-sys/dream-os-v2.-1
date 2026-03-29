/* 🧬 DREAM OS v2.1.1 - NEURAL SYNC FIXED
   Fix: Blank screen handling & Safe Neural Core
*/

const VERSION = "v2.1.1";
const ICONS = { logo: './assets/img/icon-512.png' };

window.onload = () => {
    try {
        console.log('🧬 Tiny & Baby Agent: Scanning Neural Core...');
        // Safe Check: Cegah Blank Screen karena localStorage korup
        if(!localStorage.getItem('dream_vaccines')) {
            localStorage.setItem('dream_vaccines', JSON.stringify({count:0, immunityLevel:0}));
        }
        
        if(!sessionStorage.getItem('dream_session')) renderLogin();
        else renderDashboard();
    } catch (e) {
        console.error("🚨 Neural Crash! Executing Emergency Reset...");
        localStorage.clear();
        location.reload();
    }
};

function renderDashboard() {
    // Saraf Baby Agent: Pastiin data valid sebelum render
    let immunityData;
    try {
        immunityData = JSON.parse(localStorage.getItem('dream_vaccines')) || {count:0, immunityLevel:0};
    } catch(e) { immunityData = {count:0, immunityLevel:0}; }

    const app = document.getElementById('app');
    if(!app) return;

    const mods = [
        {n:'Command Center', e:'⚡'}, {n:'Form Booking', e:'📅'}, {n:'K3', e:'⚠️'},
        {n:'Sekuriti', e:'🛡️'}, {n:'Janitor Indoor', e:'🧹'}, {n:'Janitor Outdoor', e:'🌳'},
        {n:'Stok', e:'📦'}, {n:'Maintenance', e:'🔧'}, {n:'Asset', e:'🗄️'}
    ];

    app.innerHTML = `
        <div class="main-container">
            <header class="header-sync">
                <div onclick="triggerGhost()" class="hu-icon">
                    <img src="${ICONS.logo}" style="width:42px; height:42px; border-radius:12px;">
                </div>
                <div class="spiritual-block">
                    <div class="mahkota-text">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
                    <div class="mahkota-text shalawat-margin">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
                </div>
            </header>

            <div class="immunity-badge">🛡️ IMMUNITY: ${immunityData.immunityLevel}% (${immunityData.count} Vaccines)</div>

            <div class="mega-slider">
                <div style="font-size:10px; color:#34C759; font-weight:bold;">🎠 CAROUSEL ACTIVE</div>
                <div style="font-size:14px; font-weight:700; color:#1C1C1E;">Monitoring SIF Al-Fikri</div>
                <div style="font-size:9px; color:#8E8E93;">Integrated with Tiny & Baby Smart AI</div>
            </div>

            <div class="grid-container">
                ${mods.map(m => `
                    <div onclick="window.loadModule('${m.n}')" class="grid-item">
                        <span class="icon">${m.e}</span>
                        <span class="label">${m.n}</span>
                    </div>
                `).join('')}
            </div>

            <div style="height:150px; width:100%;"></div>

            <nav class="ios-dock">
                <div class="nav-btn"><span>🏠</span><p>HOME</p></div>
                <div class="nav-btn"><span>👤</span><p>PROFILE</p></div>
                <div class="qr-btn-container"><div class="qr-btn">🔳</div></div>
                <div class="nav-btn"><span>ℹ️</span><p>ABOUT</p></div>
                <div class="nav-btn"><span>⚙️</span><p>SETTING</p></div>
            </nav>
        </div>
        <style>
            :root { --bg: #F2F2F7; --white: #FFFFFF; --green: #34C759; --dark: #1C1C1E; }
            body { margin: 0; background: var(--bg); font-family: -apple-system, sans-serif; }
            .main-container { display: flex; flex-direction: column; align-items: center; width: 100%; }
            .header-sync { padding: 45px 15px 10px; text-align: center; }
            .mahkota-text { font-size: 22px; color: #064e3b; font-family: serif; font-weight: 700; }
            .immunity-badge { background: var(--green); color:#fff; padding: 8px 18px; border-radius: 20px; font-size: 10px; font-weight: 800; margin: 15px 0; }
            .mega-slider { width: 92%; height: 140px; background: #fff; border-radius: 28px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 0.5px solid #ddd; margin-bottom: 20px; }
            .grid-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; width: 92%; }
            .grid-item { background: #fff; aspect-ratio: 1/1; border-radius: 22px; display: flex; flex-direction: column; justify-content: center; align-items: center; box-shadow: 0 4px 10px rgba(0,0,0,0.02); border: 0.5px solid #eee; cursor: pointer; }
            .icon { font-size: 30px; margin-bottom: 5px; }
            .label { font-size: 8px; font-weight: 800; text-transform: uppercase; }
            .ios-dock { position: fixed; bottom: 25px; width: 90%; max-width: 400px; height: 75px; background: rgba(28,28,30,0.96); backdrop-filter: blur(20px); border-radius: 35px; display: flex; justify-content: space-around; align-items: center; }
            .nav-btn p { font-size: 7px; color: #8E8E93; margin-top: 2px; }
            .qr-btn { background: var(--green); width: 60px; height: 60px; border-radius: 20px; margin-top: -40px; border: 4px solid var(--bg); display: flex; align-items: center; justify-content: center; color:#fff; font-size: 28px; }
        </style>
    `;
}

window.loadModule = (n) => { 
    if(window.girangati) window.girangati.brain.emit('MODULE_OPEN', n);
    alert('📦 Opening: ' + n); 
};

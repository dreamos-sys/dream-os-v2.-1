/* 🧬 DREAM OS v2.1 - ANTI-KELEB LAYOUT
   Fix: Grid bawah (Stok, Maintenance, Asset) tidak tertutup Dock
*/

const VERSION = "v2.1";

window.onload = () => {
    if(!sessionStorage.getItem('dream_session')) renderLogin();
    else renderDashboard();
};

function renderDashboard() {
    const immunityData = JSON.parse(localStorage.getItem('dream_vaccines') || '{}');
    const app = document.getElementById('app');
    const mods = [
        {n:'Command Center', e:'⚡'}, {n:'Form Booking', e:'📅'}, {n:'K3', e:'⚠️'},
        {n:'Sekuriti', e:'🛡️'}, {n:'Janitor Indoor', e:'🧹'}, {n:'Janitor Outdoor', e:'🌳'},
        {n:'Stok', e:'📦'}, {n:'Maintenance', e:'🔧'}, {n:'Asset', e:'🗄️'}
    ];

    app.innerHTML = `
        <div class="main-container">
            <header class="header-sync">
                <div onclick="triggerGhost()" class="hu-icon">
                    <img src="assets/img/apple-touch-icon.png" style="width:40px; height:40px; border-radius:10px;">
                </div>
                <div class="spiritual-block">
                    <div class="mahkota-text">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
                    <div class="mahkota-text shalawat-margin">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
                </div>
            </header>
            
            <div class="immunity-badge">🛡️ IMMUNITY: ${immunityData.immunityLevel || 0}%</div>
            
            <div class="mega-slider">
                <div class="status-title">DREAM OS ${VERSION} PRO</div>
                <div class="status-badge">Global Immunity System Active</div>
            </div>
            
            <div class="grid-container">
                ${mods.map(m => `
                    <div onclick="window.loadModule('${m.n}')" class="grid-item">
                        <span class="icon">${m.e}</span>
                        <span class="label">${m.n}</span>
                    </div>
                `).join('')}
            </div>
            
            <div style="height: 180px; width: 100%;"></div>

            <nav class="ios-dock">
                <div class="nav-btn"><span>🏠</span><p>HOME</p></div>
                <div class="nav-btn"><span>👤</span><p>PROFILE</p></div>
                <div class="qr-btn-container"><div class="qr-btn">🔳</div></div>
                <div class="nav-btn"><span>ℹ️</span><p>ABOUT</p></div>
                <div class="nav-btn"><span>⚙️</span><p>SETTING</p></div>
            </nav>
            
            <style>
                :root { --bg: #F2F2F7; --white: #FFFFFF; --green: #34C759; --dark: #1C1C1E; }
                body { margin: 0; background: var(--bg); font-family: -apple-system, sans-serif; overflow-x: hidden; }
                .main-container { display: flex; flex-direction: column; align-items: center; width: 100%; }
                
                .header-sync { padding: 50px 15px 10px; text-align: center; }
                .hu-icon { margin-bottom: 10px; animation: huPulse 8s infinite; cursor: pointer; }
                .mahkota-text { font-size: 24px; color: #064e3b; font-family: serif; font-weight: 700; line-height: 1.2; }
                .shalawat-margin { font-size: 22px; margin-top: 5px; }

                .immunity-badge { background: var(--green); color: #fff; padding: 8px 15px; border-radius: 20px; font-size: 10px; font-weight: 800; margin: 15px 0; box-shadow: 0 4px 10px rgba(52,199,89,0.2); }
                
                .mega-slider { width: 92%; height: 160px; background: var(--white); border-radius: 28px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 25px; border: 0.5px solid #E5E5EA; }
                .status-title { font-size: 18px; font-weight: 700; color: var(--dark); }
                .status-badge { font-size: 10px; color: var(--green); font-weight: 600; margin-top: 5px; }

                .grid-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 92%; padding-bottom: 20px; }
                .grid-item { background: var(--white); aspect-ratio: 1/1; border-radius: 24px; display: flex; flex-direction: column; justify-content: center; align-items: center; box-shadow: 0 5px 15px rgba(0,0,0,0.03); border: 0.5px solid #F2F2F7; cursor: pointer; }
                .icon { font-size: 34px; margin-bottom: 5px; }
                .label { font-size: 8px; font-weight: 800; color: var(--dark); text-transform: uppercase; text-align: center; }

                .ios-dock { position: fixed; bottom: 25px; width: 92%; max-width: 420px; height: 75px; background: rgba(28,28,30,0.95); backdrop-filter: blur(20px); border-radius: 35px; display: flex; justify-content: space-around; align-items: center; z-index: 9999; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
                .nav-btn span { font-size: 24px; }
                .nav-btn p { font-size: 7px; color: #8E8E93; margin-top: 3px; font-weight: bold; }
                .qr-btn { background: var(--green); width: 60px; height: 60px; border-radius: 20px; margin-top: -40px; display: flex; align-items: center; justify-content: center; border: 4px solid var(--bg); color: #fff; font-size: 28px; }

                @keyframes huPulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 1; } }
            </style>
        </div>
    `;
}

// Render Login & Ghost logic tetep sama...
function renderLogin() { /* ... */ } 
function triggerGhost() { /* ... */ }

window.loadModule = function(n) { alert('📦 Loading: ' + n); };

console.log('✅ Dream OS v2.1 ANTI-KELEB Active!');

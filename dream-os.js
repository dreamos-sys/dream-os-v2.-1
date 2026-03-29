/* 🧬 DREAM OS v2.1 - SOVEREIGN GLOBAL INTEGRATED
   UI: iOS Luxury White | Version: 2.1 Fixed | Security: RLS Ready
   Smart Squad: Tiny + Baby Agent + Duo Bawel
*/

const VERSION = "v2.1";

// 🔐 CREDENTIALS
const CREDENTIALS = {
    'developer': 'b15m1ll4h_012443410',
    'master': 'Mr.M_Architect_2025',
    'admin': '4dm1n_AF6969@00',    'sekuriti': 'LHPSsec_AF2025',
    'janitor': 'CHCS_AF_@003',
    'stok': 'SACS_AF@004',
    'maintenance': 'M41n_4F@234',
    'inventaris': '4dm1n_6969@01',
    'gudang': '4dm1n_9696@02',
    'asset': '4553Tumum_AF@1112',
    'booking': 'user_@1234',
    'k3': 'user_@2345'
};

// 👻 GHOST PASSWORDS
const GHOST_MASTER = 'GhostArchitect2026!@#';

window.onload = () => {
    if(!sessionStorage.getItem('dream_session')) renderLogin();
    else renderDashboard();
};

function renderLogin() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div style="background:#F2F2F7;height:100vh;display:flex;justify-content:center;align-items:center;">
            <div style="background:#FFFFFF;padding:40px 30px;border-radius:28px;box-shadow:0 8px 25px rgba(0,0,0,0.1);text-align:center;max-width:320px;width:90%;">
                <div style="font-size:28px;color:#064e3b;font-family:serif;margin-bottom:10px;">بِسْمِ اللَّهِ</div>
                <div style="font-size:10px;color:#34C759;font-weight:800;letter-spacing:1px;margin-bottom:20px;">DREAM OS ${VERSION}</div>
                <input type="text" id="username" placeholder="Username" style="width:100%;padding:14px;margin-bottom:12px;border:1px solid #E5E5EA;border-radius:12px;background:#F2F2F7;font-size:14px;">
                <input type="password" id="password" placeholder="Password" style="width:100%;padding:14px;margin-bottom:20px;border:1px solid #E5E5EA;border-radius:12px;background:#F2F2F7;font-size:14px;">
                <button onclick="doLogin()" style="width:100%;padding:16px;background:#34C759;color:#fff;border:none;border-radius:15px;font-weight:bold;font-size:14px;box-shadow:0 10px 20px rgba(52,199,89,0.3);">🔐 LOGIN</button>
                <div id="error" style="color:#FF3B30;font-size:11px;margin-top:15px;display:none;">⚠️ ACCESS DENIED</div>
            </div>
        </div>
    `;
}

function doLogin() {
    const user = document.getElementById('username').value.toLowerCase().trim();
    const pass = document.getElementById('password').value;
    const error = document.getElementById('error');
    
    if(CREDENTIALS[user] && CREDENTIALS[user] === pass) {
        sessionStorage.setItem('dream_session', 'ACTIVE');
        sessionStorage.setItem('dream_user', user.toUpperCase());
        renderDashboard();
    } else {
        error.style.display = 'block';
        if(navigator.vibrate) navigator.vibrate([50,50,50]);
    }
}
function renderDashboard() {
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
                    <img src="assets/img/apple-touch-icon.png" style="width:40px;height:40px;border-radius:10px;">
                </div>
                <div class="spiritual-block">
                    <div class="mahkota-text">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
                    <div class="mahkota-text shalawat-margin">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
                </div>
            </header>
            <div class="mega-slider">
                <div class="slider-content">
                    <div class="status-badge">DREAM OS ${VERSION} INTEGRATED</div>
                    <div class="status-title">Immunity Global System</div>
                </div>
                <div class="progress-bar"><div class="progress-fill"></div></div>
            </div>
            <div class="grid-container">
                ${mods.map(m => `
                    <div onclick="window.loadModule('${m.n}')" class="grid-item">
                        <span class="icon">${m.e}</span>
                        <span class="label">${m.n}</span>
                    </div>
                `).join('')}
            </div>
            <nav class="ios-dock">
                <div class="nav-btn active"><span>🏠</span><p>HOME</p></div>
                <div class="nav-btn"><span>👤</span><p>PROFILE</p></div>
                <div class="qr-btn-container"><div class="qr-btn">🔳</div></div>
                <div class="nav-btn"><span>ℹ️</span><p>ABOUT</p></div>
                <div class="nav-btn"><span>⚙️</span><p>SETTING</p></div>
            </nav>
            <style>
                :root { --bg: #F2F2F7; --white: #FFFFFF; --green: #34C759; --dark: #1C1C1E; }
                body { margin: 0; background: var(--bg); font-family: -apple-system, sans-serif; -webkit-tap-highlight-color: transparent; }
                .main-container { display: flex; flex-direction: column; align-items: center; padding-bottom: 110px; }
                .header-sync { width: 100%; display: flex; align-items: center; justify-content: center; padding: 45px 15px 10px; }
                .hu-icon { margin-right: 15px; animation: huPulse 8s infinite ease-in-out; cursor: pointer; }
                .spiritual-block { text-align: center; }
                .mahkota-text { font-size: 24px; color: #064e3b; font-family: serif; font-weight: 700; line-height: 1.1; }
                .shalawat-margin { margin-top: 5px; font-size: 24px; }                .mega-slider { width: 92%; max-width: 500px; height: 165px; background: var(--white); border-radius: 28px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 10px 0 15px; box-shadow: 0 8px 25px rgba(0,0,0,0.03); border: 0.5px solid rgba(0,0,0,0.05); }
                .status-badge { font-size: 10px; color: var(--green); font-weight: 800; letter-spacing: 1px; }
                .status-title { font-size: 16px; font-weight: 700; color: var(--dark); margin-top: 4px; }
                .progress-bar { width: 100%; height: 3px; background: var(--bg); margin-top: 15px; position: relative; overflow: hidden; }
                .progress-fill { height: 100%; background: var(--green); width: 85%; }
                .grid-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 92%; max-width: 440px; }
                .grid-item { background: var(--white); aspect-ratio: 1/1; border-radius: 22px; display: flex; flex-direction: column; justify-content: center; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.03); border: 0.5px solid rgba(0,0,0,0.05); transition: 0.2s; cursor: pointer; }
                .grid-item:active { transform: scale(0.95); }
                .icon { font-size: 36px; margin-bottom: 8px; }
                .label { font-size: 8px; color: var(--dark); font-weight: 800; text-transform: uppercase; text-align: center; }
                .ios-dock { position: fixed; bottom: 30px; width: 92%; max-width: 420px; height: 78px; background: rgba(28, 28, 30, 0.96); backdrop-filter: blur(20px); border-radius: 38px; display: flex; justify-content: space-around; align-items: center; z-index: 9999; box-shadow: 0 20px 45px rgba(0,0,0,0.25); }
                .nav-btn { text-align: center; flex: 1; cursor: pointer; }
                .nav-btn span { font-size: 26px; }
                .nav-btn p { font-size: 7px; color: #8E8E93; font-weight: bold; margin-top: 4px; }
                .nav-btn.active p { color: var(--green); }
                .qr-btn { background: var(--green); width: 64px; height: 64px; border-radius: 22px; margin-top: -48px; display: flex; align-items: center; justify-content: center; border: 5px solid var(--bg); font-size: 32px; color: #fff; cursor: pointer; }
                @media (orientation: landscape) {
                    .header-sync { padding: 15px 15px 5px; }
                    .mahkota-text { font-size: 20px; }
                    .mega-slider { height: 85px; flex-direction: row; }
                    .grid-container { grid-template-columns: repeat(5, 1fr); max-width: 800px; }
                }
                @keyframes huPulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 1; } }
            </style>
        </div>
    `;
}

function triggerGhost() {
    window.ghostCount = (window.ghostCount || 0) + 1;
    if(window.ghostCount === 5) {
        const pwd = prompt('👻 GHOST STEALTH MODE\n\nEnter Password:');
        if(pwd === GHOST_MASTER) {
            alert('👻 GHOST MODE ACTIVATED\n\nMaster access granted!');
            openGhostTools();
        } else {
            alert('❌ WRONG PASSWORD');
        }
        window.ghostCount = 0;
    }
    setTimeout(() => { window.ghostCount = 0; }, 3000);
}

function openGhostTools() {
    const diag = window.girangati ? window.girangati.diagnostics() : 'Girangati not loaded';
    alert('👻 GHOST TOOLS\n\n' + JSON.stringify(diag, null, 2));
}

window.loadModule = function(moduleName) {
    // Use Girangati brain if available    if(window.girangati) {
        window.girangati.brain.emit('MODULE_OPEN', moduleName);
    } else {
        console.log('[Module] Loading:', moduleName);
        alert('📦 Loading: ' + moduleName);
    }
};

function doLogout() {
    sessionStorage.clear();
    location.reload();
}

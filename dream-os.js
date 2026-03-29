/* 🧬 DREAM OS v2.1 - COMPLETE ANTI-BLANK
   Fix: Semua fungsi lengkap, tidak ada yang kosong!
*/

const VERSION = "v2.1";
const GHOST_MASTER = 'GhostArchitect2026!@#';

// ✅ CREDENTIALS LENGKAP
const CREDENTIALS = {
    'developer': 'b15m1ll4h_012443410',
    'master': 'Mr.M_Architect_2025',
    'admin': '4dm1n_AF6969@00',
    'sekuriti': 'LHPSsec_AF2025',
    'janitor': 'CHCS_AF_@003',
    'stok': 'SACS_AF@004',
    'maintenance': 'M41n_4F@234',
    'inventaris': '4dm1n_6969@01',
    'gudang': '4dm1n_9696@02',
    'asset': '4553Tumum_AF@1112',
    'booking': 'user_@1234',
    'k3': 'user_@2345'
};

window.onload = () => {
    console.log('✅ Dream OS Loading...');
    if(!sessionStorage.getItem('dream_session')) renderLogin();
    else renderDashboard();
};

// ✅ LOGIN SCREEN (LENGKAP!)
function renderLogin() {
    console.log('[UI] Rendering login...');
    const app = document.getElementById('app');
    if(!app) {
        console.error('❌ App element not found!');
        return;
    }
    
    app.innerHTML = `
        <div style="background:#F2F2F7;height:100vh;display:flex;justify-content:center;align-items:center;">
            <div style="background:#FFFFFF;padding:40px 30px;border-radius:28px;box-shadow:0 8px 25px rgba(0,0,0,0.1);text-align:center;max-width:320px;width:90%;">
                <div style="font-size:28px;color:#064e3b;font-family:serif;margin-bottom:10px;">بِسْمِ اللَّهِ</div>
                <div style="font-size:10px;color:#34C759;font-weight:800;letter-spacing:1px;margin-bottom:20px;">DREAM OS ${VERSION}</div>
                <input type="text" id="username" placeholder="Username" style="width:100%;padding:14px;margin-bottom:12px;border:1px solid #E5E5EA;border-radius:12px;background:#F2F2F7;font-size:14px;">
                <input type="password" id="password" placeholder="Password" style="width:100%;padding:14px;margin-bottom:20px;border:1px solid #E5E5EA;border-radius:12px;background:#F2F2F7;font-size:14px;">
                <button onclick="doLogin()" style="width:100%;padding:16px;background:#34C759;color:#fff;border:none;border-radius:15px;font-weight:bold;font-size:14px;box-shadow:0 10px 20px rgba(52,199,89,0.3);">🔐 LOGIN</button>
                <div id="error" style="color:#FF3B30;font-size:11px;margin-top:15px;display:none;">⚠️ ACCESS DENIED</div>            </div>
        </div>
    `;
}

// ✅ LOGIN FUNCTION (LENGKAP!)
function doLogin() {
    console.log('[Login] Attempt...');
    const user = document.getElementById('username').value.toLowerCase().trim();
    const pass = document.getElementById('password').value;
    const error = document.getElementById('error');
    
    console.log('[Login] User:', user);
    console.log('[Login] Expected:', CREDENTIALS[user]);
    
    if(CREDENTIALS[user] && CREDENTIALS[user] === pass) {
        sessionStorage.setItem('dream_session', 'ACTIVE');
        sessionStorage.setItem('dream_user', user.toUpperCase());
        console.log('[Login] SUCCESS!');
        renderDashboard();
    } else {
        error.style.display = 'block';
        console.log('[Login] FAILED!');
        if(navigator.vibrate) navigator.vibrate([50,50,50]);
    }
}

// ✅ DASHBOARD (LENGKAP!)
function renderDashboard() {
    console.log('[UI] Rendering dashboard...');
    const immunityData = JSON.parse(localStorage.getItem('dream_vaccines') || '{}');
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
                    <img src="assets/img/apple-touch-icon.png" style="width:40px;height:40px;border-radius:10px;">
                </div>
                <div class="spiritual-block">
                    <div class="mahkota-text">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
                    <div class="mahkota-text shalawat-margin">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
                </div>            </header>
            
            <div class="immunity-badge">🛡️ IMMUNITY: ${immunityData.immunityLevel || 0}% (${immunityData.count || 0} Vaccines)</div>
            
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
            
            <div style="height:180px;width:100%;"></div>

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
                .grid-item:active { transform: scale(0.95); }
                .icon { font-size: 34px; margin-bottom: 5px; }
                .label { font-size: 8px; font-weight: 800; color: var(--dark); text-transform: uppercase; text-align: center; }
                .ios-dock { position: fixed; bottom: 25px; width: 92%; max-width: 420px; height: 75px; background: rgba(28,28,30,0.95); backdrop-filter: blur(20px); border-radius: 35px; display: flex; justify-content: space-around; align-items: center; z-index: 9999; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
                .nav-btn span { font-size: 24px; }
                .nav-btn p { font-size: 7px; color: #8E8E93; margin-top: 3px; font-weight: bold; }
                .qr-btn { background: var(--green); width: 60px; height: 60px; border-radius: 20px; margin-top: -40px; display: flex; align-items: center; justify-content: center; border: 4px solid var(--bg); color: #fff; font-size: 28px; }
                @keyframes huPulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 1; } }            </style>
        </div>
    `;
}

// ✅ GHOST MODE (LENGKAP!)
let ghostTapCount = 0;
let ghostLastTap = 0;

function triggerGhost() {
    console.log('[Ghost] Tap detected');
    const now = Date.now();
    if(now - ghostLastTap > 800) ghostTapCount = 0;
    ghostTapCount++;
    ghostLastTap = now;
    
    if(ghostTapCount === 5) {
        console.log('[Ghost] 5x tap detected!');
        const pwd = prompt('👻 GHOST IMMUNE MODE\n\nEnter Password:');
        if(pwd === GHOST_MASTER || pwd === getPrayerPassword()) {
            activateGhostImmune();
        } else {
            alert('❌ WRONG PASSWORD\n\nTry: ' + getPrayerPassword());
        }
        ghostTapCount = 0;
    }
}

function getPrayerPassword() {
    const hour = new Date().getHours();
    if(hour >= 0 && hour < 6) return 'dreamos02';
    if(hour >= 6 && hour < 12) return 'dreamos02';
    if(hour >= 12 && hour < 15) return 'dreamos04';
    if(hour >= 15 && hour < 18) return 'dreamos04';
    if(hour >= 18 && hour < 19) return 'dreamos03';
    return 'dreamos04';
}

function activateGhostImmune() {
    console.log('[Ghost] Activating immune protocol...');
    
    if('caches' in window) {
        caches.keys().then(names => {
            names.forEach(n => caches.delete(n));
        });
    }
    
    const errors = JSON.parse(localStorage.getItem('girangati_errors') || '[]');
    const oldVaccines = JSON.parse(localStorage.getItem('dream_vaccines') || '{}');
    const newCount = (oldVaccines.count || 0) + errors.length;    const newLevel = Math.min(100, newCount * 5);
    
    localStorage.setItem('dream_vaccines', JSON.stringify({
        count: newCount,
        immunityLevel: newLevel,
        lastActivation: new Date().toISOString(),
        vaccines: oldVaccines.vaccines || []
    }));
    
    localStorage.removeItem('girangati_errors');
    
    alert(`👻 GHOST IMMUNE ACTIVATED\n\n🛡️ Immunity Level: ${newLevel}%\n💉 Vaccines: ${newCount}\n🧹 Bugs Cleaned: ${errors.length}`);
    
    renderDashboard();
}

// ✅ MODULE LOADER
window.loadModule = function(moduleName) {
    console.log('[Module] Loading:', moduleName);
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#34C759;color:#fff;padding:12px 24px;border-radius:30px;font-weight:700;z-index:10000;';
    toast.textContent = '📦 Loading: ' + moduleName;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 2000);
};

console.log('✅ Dream OS v2.1 COMPLETE Loaded!');

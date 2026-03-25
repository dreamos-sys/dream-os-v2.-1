// Dream OS v2.1 - Enterprise Edition (Premium UI)
console.log('💚 Dream OS v2.1 Ultimate - بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ');

// Konfigurasi
const CONFIG = {
    version: '2.1.0-ultimate',
    build: 'enterprise-2026',
    ghostCode: 'dreamos2026',
    tapCount: 5,
    appName: 'Dream OS',
    company: 'DREAM TEAM'
};

// Role & Password
const ROLES = {
    master: { password: 'b15m1ll4h_012443410', name: 'Master M', level: 100, badge: '👑' },
    admin: { password: '4dm1n_AF6969@00', name: 'Administrator', level: 90, badge: '⚡' },
    user: { password: 'user123', name: 'User', level: 50, badge: '👤' }
};

// Multi-language
const TRANSLATIONS = {
    id: {
        welcome: 'Selamat Datang', login: 'LOGIN', password: 'Masukkan password',
        todayBooking: 'Booking Hari Ini', noBooking: 'Tidak ada booking',
        commandCenter: 'Command Center', commandDesc: 'Pusat kendali',
        k3: 'K3', k3Desc: 'Keselamatan & Kesehatan', logout: 'KELUAR'
    },
    en: {
        welcome: 'Welcome', login: 'LOGIN', password: 'Enter password',
        todayBooking: "Today's Booking", noBooking: 'No bookings today',
        commandCenter: 'Command Center', commandDesc: 'Control center',
        k3: 'K3', k3Desc: 'Safety & Health', logout: 'LOGOUT'
    }
};

let currentLang = localStorage.getItem('dreamos_lang') || 'id';
let currentUser = null;
let currentRole = null;
let currentTheme = localStorage.getItem('dreamos_theme') || 'dark';

function t(key) { return TRANSLATIONS[currentLang][key] || key; }
function setLanguage(lang) { currentLang = lang; localStorage.setItem('dreamos_lang', lang); if (isLoggedIn()) renderDashboard(); else renderLogin(); }

// Device ID
function getDeviceId() {
    let id = localStorage.getItem('dreamos_device_id');
    if (!id) { id = 'device_' + Math.random().toString(36).substr(2, 16); localStorage.setItem('dreamos_device_id', id); }
    return id;
}

// Theme
function applyTheme() {
    if (currentTheme === 'light') {
        document.body.style.background = 'linear-gradient(135deg, #f0f9ff 0%, #e6f7f0 100%)';
        document.body.style.color = '#0a0f1e';
    } else {
        document.body.style.background = 'linear-gradient(135deg, #0a0f1e 0%, #0c1222 100%)';
        document.body.style.color = '#e2e8f0';
    }
}
function toggleTheme() { currentTheme = currentTheme === 'dark' ? 'light' : 'dark'; localStorage.setItem('dreamos_theme', currentTheme); applyTheme(); showToast(`Theme: ${currentTheme}`, 'success'); }

// Helper
function showToast(msg, type = 'info') {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = `position:fixed;bottom:100px;left:20px;right:20px;max-width:400px;margin:0 auto;background:${currentTheme === 'dark' ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)'};color:${type === 'success' ? '#10b981' : '#ef4444'};padding:14px;border-radius:16px;text-align:center;z-index:10000;border:1px solid ${type === 'success' ? '#10b981' : '#ef4444'};animation:fadeInUp 0.3s;`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function login(pwd) {
    for (const [role, data] of Object.entries(ROLES)) {
        if (data.password === pwd) {
            currentUser = data.name; currentRole = role;
            sessionStorage.setItem('dreamos_user', currentUser);
            sessionStorage.setItem('dreamos_role', currentRole);
            return true;
        }
    }
    return false;
}
function logout() { sessionStorage.clear(); currentUser = null; currentRole = null; renderLogin(); }
function isLoggedIn() { return sessionStorage.getItem('dreamos_user') !== null; }

// Update time
function updateTime() {
    const now = new Date();
    document.getElementById('current-time') && (document.getElementById('current-time').innerHTML = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    document.getElementById('current-date') && (document.getElementById('current-date').innerHTML = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }));
    const battery = Math.floor(Math.random() * 30) + 60;
    document.getElementById('battery-level') && (document.getElementById('battery-level').innerHTML = `${battery}%`);
}
setInterval(updateTime, 1000);

// Modules
const MODULES = {
    home: { name: 'Home', icon: 'fa-home', nav: true, color: '#10b981' },
    profile: { name: 'Profile', icon: 'fa-user', nav: true, color: '#3b82f6' },
    about: { name: 'About', icon: 'fa-info-circle', nav: true, color: '#8b5cf6' },
    stok: { name: 'Stok', icon: 'fa-boxes', color: '#10b981' },
    maintenance: { name: 'Maintenance', icon: 'fa-tools', color: '#f59e0b' },
    sekuriti: { name: 'Security', icon: 'fa-shield-alt', color: '#ef4444' },
    ai: { name: 'AI Chat', icon: 'fa-robot', color: '#8b5cf6' },
    booking: { name: 'Booking', icon: 'fa-calendar', color: '#3b82f6' },
    k3: { name: 'K3', icon: 'fa-hard-hat', color: '#f97316' },
    asset: { name: 'Asset', icon: 'fa-warehouse', color: '#6366f1' },
    'command-center': { name: 'Command Center', icon: 'fa-desktop', color: '#a855f7' },
    'janitor-in': { name: 'Janitor In', icon: 'fa-broom', color: '#ec4899' },
    'janitor-out': { name: 'Janitor Out', icon: 'fa-leaf', color: '#14b8a6' },
    qr: { name: 'QR Scanner', icon: 'fa-qrcode', color: '#06b6d4' },
    settings: { name: 'Settings', icon: 'fa-cog', color: '#6b7280' }
};

function renderLogin() {
    document.getElementById('app-shell').innerHTML = `
        <div class="app-container">
            <div class="status-bar"><span class="time-display" id="current-time">--:--:--</span><div class="battery-status"><i class="fas fa-battery-full"></i><span id="battery-level">--%</span></div></div>
            <div class="header-premium">
                <div class="lang-toggle"><button class="lang-btn ${currentLang === 'id' ? 'active' : ''}" onclick="setLanguage('id')">ID</button><button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" onclick="setLanguage('en')">EN</button></div>
                <div class="header-icon"><i class="fas fa-crown"></i></div>
                <div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                <div class="shalawat">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
                <div class="version-tag">${CONFIG.version} • Limited Edition 2026</div>
            </div>
            <div class="login-card">
                <h2 style="color:#10b981;text-align:center;">DREAM OS</h2>
                <div class="input-group"><input type="password" id="login-password" placeholder="${t('password')}"><i id="toggle-password" class="fas fa-eye"></i></div>
                <button class="btn" id="login-btn">${t('login')}</button>
                <p style="text-align:center;color:#64748b;font-size:11px;">Demo: b15m1ll4h_012443410</p>
                <div class="device-info"><i class="fas fa-mobile-alt"></i> ${getDeviceId().slice(-12)}</div>
            </div>
        </div>`;
    const pwd = document.getElementById('login-password');
    document.getElementById('toggle-password').onclick = () => { pwd.type = pwd.type === 'password' ? 'text' : 'password'; };
    document.getElementById('login-btn').onclick = () => { if (login(pwd.value)) { showToast(`Welcome ${currentUser}!`, 'success'); renderDashboard(); } else showToast('Invalid password', 'error'); };
    pwd.onkeypress = e => { if (e.key === 'Enter') document.getElementById('login-btn').click(); };
    setTimeout(() => { const l = document.getElementById('loading-screen'); if (l) { l.style.opacity = '0'; setTimeout(() => l.style.display = 'none', 500); } }, 500);
    applyTheme(); updateTime();
}

function renderDashboard() {
    const gridModules = Object.entries(MODULES).filter(([id, m]) => !m.nav);
    const navModules = Object.entries(MODULES).filter(([id, m]) => m.nav);
    document.getElementById('app-shell').innerHTML = `
        <div class="app-container" style="padding-bottom:80px;">
            <div class="status-bar"><span id="current-time">--:--:--</span><div><i class="fas fa-battery-full"></i><span id="battery-level">--%</span></div></div>
            <div class="header-premium" id="ghost-trigger">
                <div class="lang-toggle"><button class="lang-btn ${currentLang === 'id' ? 'active' : ''}" onclick="setLanguage('id')">ID</button><button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" onclick="setLanguage('en')">EN</button></div>
                <div class="header-icon"><i class="fas fa-crown"></i></div>
                <div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                <div class="shalawat">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
                <div><span style="color:#10b981;">${ROLES[currentRole]?.badge || '👤'} ${currentUser}</span> • ${currentRole}</div>
                <div class="version-tag">${CONFIG.version}</div>
            </div>
            <div class="dashboard-cards">
                <div class="info-card" onclick="renderModule('booking')"><div class="card-header"><i class="fas fa-calendar"></i><span>${t('todayBooking')}</span></div><div class="card-value" id="booking-count">0</div><div class="card-sub">${t('noBooking')}</div></div>
                <div class="info-card" onclick="renderModule('command-center')"><div class="card-header"><i class="fas fa-desktop"></i><span>LIMITED</span></div><div class="card-title">${t('commandCenter')}</div><div class="card-sub">${t('commandDesc')}</div></div>
                <div class="info-card" onclick="renderModule('k3')"><div class="card-header"><i class="fas fa-hard-hat"></i><span>K3</span></div><div class="card-title">${t('k3')}</div><div class="card-sub">${t('k3Desc')}</div></div>
                <div class="info-card" onclick="renderModule('stok')"><div class="card-header"><i class="fas fa-boxes"></i><span>INVENTORY</span></div><div class="card-value">245</div><div class="card-sub">items active</div></div>
            </div>
            <div class="module-grid">${gridModules.map(([id, m]) => `<div class="module-card" onclick="renderModule('${id}')"><div class="module-icon"><i class="fas ${m.icon}" style="color:${m.color}"></i></div><div class="module-name">${m.name}</div></div>`).join('')}</div>
            <div id="module-content"><div style="text-align:center;padding:50px;"><i class="fas fa-robot" style="font-size:56px;color:#10b981;"></i><p>Pilih modul di atas</p></div></div>
            <div class="footer"><p>${CONFIG.appName} v${CONFIG.version} | The Power Soul of Shalawat</p><div class="device-info"><i class="fas fa-mobile-alt"></i> ${getDeviceId().slice(-12)} <button onclick="logout()" style="background:none;border:none;color:#ef4444;margin-left:12px;"><i class="fas fa-sign-out-alt"></i> ${t('logout')}</button></div></div>
        </div>
        <div class="bottom-nav">${navModules.map(([id, m]) => `<button class="nav-item" onclick="renderModule('${id}')"><i class="fas ${m.icon}"></i><div>${m.name}</div></button>`).join('')}</div>
        <div class="chat-widget"><div class="chat-toggle" id="chat-toggle"><i class="fas fa-robot"></i></div><div class="chat-container" id="chat-container"><div><span>Dream AI</span><button id="close-chat">&times;</button></div><div class="chat-messages" id="chat-messages"><div>Halo! Tanya stok, maintenance, security, booking, k3, asset.</div></div><div class="chat-input-area"><input id="chat-input"><button id="chat-send"><i class="fas fa-paper-plane"></i></button></div></div></div>`;
    
    document.getElementById('booking-count').innerHTML = Math.floor(Math.random() * 5);
    let tap = 0, to;
    document.getElementById('ghost-trigger').onclick = () => { tap++; clearTimeout(to); to = setTimeout(() => tap = 0, 2000); if (tap === 5 && prompt('Ghost Code:') === 'dreamos2026') showToast('👻 GHOST MODE!', 'success'); };
    initChat(); applyTheme(); updateTime(); setTimeout(() => { const l = document.getElementById('loading-screen'); if (l) l.style.display = 'none'; }, 100);
}

function initChat() {
    const t = document.getElementById('chat-toggle'), c = document.getElementById('chat-container'), close = document.getElementById('close-chat'), inp = document.getElementById('chat-input'), send = document.getElementById('chat-send'), msgs = document.getElementById('chat-messages');
    if (!t) return;
    t.onclick = () => c.style.display = c.style.display === 'none' ? 'block' : 'none';
    close.onclick = () => c.style.display = 'none';
    const add = (txt, user) => { const d = document.createElement('div'); d.style.marginBottom = '12px'; d.style.textAlign = user ? 'right' : 'left'; d.innerHTML = `<span style="background:${user ? '#10b981' : '#334155'};padding:10px 14px;border-radius:18px;display:inline-block;">${txt}</span>`; msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight; };
    const sendMsg = () => {
        const msg = inp.value.trim(); if (!msg) return;
        add(msg, true); inp.value = ''; add('🤖 Memproses...', false);
        setTimeout(() => { msgs.lastChild.remove(); const low = msg.toLowerCase(); let r = ''; if (low.includes('stok')) r = '📦 Stok: 245 item, 3 menipis.'; else if (low.includes('maintenance')) r = '🔧 Maintenance: 3 tugas hari ini.'; else if (low.includes('security')) r = '🔒 Security: Aktif, aman.'; else if (low.includes('booking')) r = '📅 Booking: ' + (document.getElementById('booking-count')?.innerHTML || '0') + ' ruangan.'; else if (low.includes('k3')) r = '⚠️ K3: Aman, patroli rutin.'; else if (low.includes('asset')) r = '🏢 Asset: 1,234 aset.'; else r = '💚 Tanya: stok, maintenance, security, booking, k3, asset.'; add(r, false); }, 600);
    };
    send.onclick = sendMsg; inp.onkeypress = e => { if (e.key === 'Enter') sendMsg(); };
}

function renderModule(id) {
    const content = document.getElementById('module-content');
    const mod = {
        home: () => `<div><h3>🏠 Home</h3><p>Selamat datang, ${currentUser}!</p></div>`,
        profile: () => `<div><h3>👤 Profile</h3><p>Nama: ${currentUser}</p><p>Role: ${currentRole}</p><p>Device: ${getDeviceId().slice(-16)}</p><button class="btn" onclick="logout()">Logout</button></div>`,
        about: () => `<div><h3>📱 Dream OS</h3><p>v${CONFIG.version}</p><p>${CONFIG.company}</p></div>`,
        stok: () => `<div><h3>📦 Stok</h3><p>Total: 245</p><button class="btn" onclick="showToast('Export')">Export</button></div>`,
        maintenance: () => `<div><h3>🔧 Maintenance</h3><p>Server 10:00, Network 14:00</p></div>`,
        sekuriti: () => `<div><h3>🔒 Security</h3><p>Active, CCTV online</p></div>`,
        ai: () => `<div><h3>🤖 AI</h3><button class="btn" onclick="document.getElementById('chat-toggle').click()">Buka Chat</button></div>`,
        booking: () => `<div><h3>📅 Booking</h3><p>Hari ini: ${document.getElementById('booking-count')?.innerHTML || '0'} ruangan</p></div>`,
        k3: () => `<div><h3>⚠️ K3</h3><p>Status: Aman</p></div>`,
        asset: () => `<div><h3>🏢 Asset</h3><p>Total: 1,234</p></div>`,
        'command-center': () => `<div><h3>🎮 Command Center</h3><p>Operational</p></div>`,
        'janitor-in': () => `<div><h3>🧹 Janitor In</h3><p>Lobby, Koridor, Toilet</p></div>`,
        'janitor-out': () => `<div><h3>🌿 Janitor Out</h3><p>Parkiran, Taman</p></div>`,
        qr: () => `<div><h3>📱 QR Scanner</h3><button class="btn">Scan</button></div>`,
        settings: () => `<div><h3>⚙️ Settings</h3><button class="btn" onclick="toggleTheme()">Theme</button><button class="btn" onclick="showToast('Notifikasi')">Notify</button></div>`
    };
    content.innerHTML = (mod[id]?.() || `<div>Modul ${id} sedang dikembangkan</div>`) + '<style>.btn{margin:10px 5px;padding:10px 20px;background:#10b981;border:none;border-radius:12px;cursor:pointer;}</style>';
}

window.renderModule = renderModule; window.logout = logout; window.toggleTheme = toggleTheme; window.setLanguage = setLanguage; window.showToast = showToast;

if (isLoggedIn()) { currentUser = sessionStorage.getItem('dreamos_user'); currentRole = sessionStorage.getItem('dreamos_role'); renderDashboard(); } else renderLogin();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');

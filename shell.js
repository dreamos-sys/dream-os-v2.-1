// Dream OS v2.1 - Enterprise Edition
console.log('💚 Dream OS v2.1 Ultimate - بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ');

// Konfigurasi
const CONFIG = {
    version: '2.1.0-ultimate',
    ghostCode: 'dreamos2026',
    tapCount: 5
};

// Role & Password
const ROLES = {
    master: { password: 'b15m1ll4h_012443410', name: 'Master M', level: 100 },
    admin: { password: '4dm1n_AF6969@00', name: 'Administrator', level: 90 },
    user: { password: 'user123', name: 'User', level: 50 }
};

// Modul Daftar
const MODULES = {
    home: { name: 'Home', icon: 'fa-home', nav: true },
    stok: { name: 'Stok', icon: 'fa-boxes', color: '#10b981' },
    maintenance: { name: 'Maintenance', icon: 'fa-tools', color: '#f59e0b' },
    sekuriti: { name: 'Sekuriti', icon: 'fa-shield-alt', color: '#ef4444' },
    ai: { name: 'AI Chat', icon: 'fa-robot', color: '#8b5cf6' },
    profile: { name: 'Profile', icon: 'fa-user', nav: true },
    about: { name: 'About', icon: 'fa-info-circle', nav: true }
};

let currentUser = null;
let currentRole = null;

// Helper functions
function showToast(msg, type = 'info') {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 20px;
        right: 20px;
        background: rgba(0,0,0,0.9);
        color: ${type === 'success' ? '#10b981' : '#ef4444'};
        padding: 12px;
        border-radius: 12px;
        text-align: center;
        z-index: 10000;
        animation: fadeInUp 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function login(password) {
    for (const [role, data] of Object.entries(ROLES)) {
        if (data.password === password) {
            currentUser = data.name;
            currentRole = role;
            sessionStorage.setItem('dreamos_user', currentUser);
            sessionStorage.setItem('dreamos_role', currentRole);
            return true;
        }
    }
    return false;
}

function logout() {
    sessionStorage.clear();
    currentUser = null;
    currentRole = null;
    renderLogin();
}

function isLoggedIn() {
    return sessionStorage.getItem('dreamos_user') !== null;
}

// Render Functions
function renderLogin() {
    const app = document.getElementById('app-shell');
    app.innerHTML = `
        <div class="app-container">
            <div class="header">
                <div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                <p style="color:#64748b; font-size:12px; margin-top:10px;">THE POWER SOUL OF SHALAWAT</p>
            </div>
            <div class="login-card">
                <h2 style="color:#10b981; text-align:center; margin-bottom:20px;">DREAM OS</h2>
                <div class="input-group">
                    <input type="password" id="login-password" placeholder="Enter password" autocomplete="off">
                </div>
                <button class="btn" id="login-btn">LOGIN</button>
                <p style="text-align:center; color:#64748b; font-size:12px; margin-top:15px;">
                    Demo: b15m1ll4h_012443410
                </p>
            </div>
        </div>
    `;
    
    document.getElementById('login-btn').onclick = () => {
        const pass = document.getElementById('login-password').value;
        if (login(pass)) {
            showToast(`Welcome ${currentUser}!`, 'success');
            renderDashboard();
        } else {
            showToast('Invalid password', 'error');
        }
    };
    
    document.getElementById('login-password').onkeypress = (e) => {
        if (e.key === 'Enter') document.getElementById('login-btn').click();
    };
    
    setTimeout(() => {
        const loading = document.getElementById('loading-screen');
        if (loading) {
            loading.style.opacity = '0';
            setTimeout(() => loading.style.display = 'none', 500);
        }
    }, 500);
}

function renderDashboard() {
    const app = document.getElementById('app-shell');
    app.innerHTML = `
        <div class="app-container" style="padding-bottom: 80px;">
            <div class="header" id="ghost-trigger">
                <div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                <p style="color:#64748b; font-size:12px;">${currentUser} • ${currentRole}</p>
            </div>
            
            <div class="module-grid">
                ${Object.entries(MODULES).filter(([id, m]) => !m.nav).map(([id, m]) => `
                    <div class="module-card" onclick="window.renderModule('${id}')">
                        <div class="module-icon"><i class="fas ${m.icon}" style="color: ${m.color || '#10b981'}"></i></div>
                        <div>${m.name}</div>
                    </div>
                `).join('')}
            </div>
            
            <div id="module-content" style="min-height: 300px;">
                <div style="text-align:center; padding:40px; color:#64748b;">
                    <i class="fas fa-robot" style="font-size:48px; margin-bottom:15px;"></i>
                    <p>Pilih modul di atas untuk memulai</p>
                </div>
            </div>
        </div>
        
        <div class="bottom-nav">
            ${Object.entries(MODULES).filter(([id, m]) => m.nav).map(([id, m]) => `
                <button class="nav-item" onclick="window.renderModule('${id}')">
                    <i class="fas ${m.icon}"></i>
                    <div style="font-size:10px;">${m.name}</div>
                </button>
            `).join('')}
        </div>
        
        <div class="chat-widget">
            <div class="chat-toggle" id="chat-toggle">
                <i class="fas fa-robot" style="font-size:24px;"></i>
            </div>
            <div class="chat-container" id="chat-container">
                <div style="background:#0f172a; padding:12px; border-bottom:1px solid #334155;">
                    <span style="font-weight:bold;">Dream AI Assistant</span>
                    <button id="close-chat" style="float:right; background:none; border:none; color:#94a3b8;">&times;</button>
                </div>
                <div class="chat-messages" id="chat-messages">
                    <div class="bot-message">Halo! Saya asisten AI Dream OS. Tanya apa saja soal stok, maintenance, atau security.</div>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="chat-input" placeholder="Ketik pesan...">
                    <button id="chat-send">Kirim</button>
                </div>
            </div>
        </div>
    `;
    
    // Ghost mode trigger
    let tapCount = 0;
    let tapTimeout;
    document.getElementById('ghost-trigger').onclick = () => {
        tapCount++;
        if (tapTimeout) clearTimeout(tapTimeout);
        tapTimeout = setTimeout(() => tapCount = 0, 2000);
        if (tapCount === CONFIG.tapCount) {
            const code = prompt('🔑 Ghost Access Code:');
            if (code === CONFIG.ghostCode) {
                showToast('👻 GHOST MODE ACTIVATED!', 'success');
                renderModule('ai');
            }
            tapCount = 0;
        }
    };
    
    // Chat widget
    initChat();
    
    setTimeout(() => {
        const loading = document.getElementById('loading-screen');
        if (loading) loading.style.display = 'none';
    }, 100);
}

function initChat() {
    const toggle = document.getElementById('chat-toggle');
    const container = document.getElementById('chat-container');
    const closeBtn = document.getElementById('close-chat');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const messages = document.getElementById('chat-messages');
    
    toggle.onclick = () => container.style.display = container.style.display === 'none' ? 'block' : 'none';
    closeBtn.onclick = () => container.style.display = 'none';
    
    function addMessage(text, isUser) {
        const div = document.createElement('div');
        div.style.marginBottom = '12px';
        div.style.textAlign = isUser ? 'right' : 'left';
        div.innerHTML = `<span style="background: ${isUser ? '#10b981' : '#334155'}; padding: 8px 12px; border-radius: 18px; display: inline-block; max-width: 80%;">${text}</span>`;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }
    
    function sendMessage() {
        const msg = input.value.trim();
        if (!msg) return;
        addMessage(msg, true);
        input.value = '';
        addMessage('🤖 Memproses...', false);
        const lastMsg = messages.lastChild;
        setTimeout(() => {
            lastMsg.remove();
            const lower = msg.toLowerCase();
            let reply = '';
            if (lower.includes('stok')) reply = '📦 Stok saat ini: 245 item aktif. Stok menipis: 3 item.';
            else if (lower.includes('maintenance')) reply = '🔧 Jadwal maintenance hari ini: 3 mesin. Server backup jam 10:00.';
            else if (lower.includes('security')) reply = '🔒 Sistem keamanan aktif. Tidak ada ancaman terdeteksi.';
            else reply = '💚 Saya asisten Dream OS. Tanyakan tentang stok, maintenance, atau security.';
            addMessage(reply, false);
        }, 800);
    }
    
    sendBtn.onclick = sendMessage;
    input.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };
}

function renderModule(moduleId) {
    const content = document.getElementById('module-content');
    const modules = {
        home: () => `<div style="padding:20px; text-align:center;"><h3>🏠 Home Dashboard</h3><p>Selamat datang, ${currentUser}!</p></div>`,
        profile: () => `<div style="padding:20px;"><h3>👤 Profile</h3><p>Nama: ${currentUser}</p><p>Role: ${currentRole}</p><button class="btn" style="margin-top:20px;" onclick="logout()">Logout</button></div>`,
        about: () => `<div style="padding:20px;"><h3>📱 Dream OS v2.1</h3><p>Sovereign Operational Enterprise Ready</p><p>The Power Soul of Shalawat</p></div>`,
        stok: () => `<div style="padding:20px;"><h3>📦 Manajemen Stok</h3><p>Total item: 245</p><p>Low stock: 3 item</p></div>`,
        maintenance: () => `<div style="padding:20px;"><h3>🔧 Maintenance</h3><p>Jadwal hari ini: 3 tugas</p><ul><li>Server backup - 10:00</li><li>Network check - 14:00</li></ul></div>`,
        sekuriti: () => `<div style="padding:20px;"><h3>🔒 Security Report</h3><p>Status: Active</p><p>Last incident: None</p></div>`,
        ai: () => `<div style="padding:20px;"><h3>🤖 AI Assistant</h3><p>Gunakan chat widget di pojok kanan bawah untuk bertanya.</p><button class="btn" onclick="document.getElementById('chat-toggle').click()">Buka Chat</button></div>`
    };
    content.innerHTML = modules[moduleId]?.() || `<div style="padding:20px;">Modul ${moduleId} sedang dalam pengembangan</div>`;
}

// Expose to window
window.renderModule = renderModule;
window.logout = logout;

// Initialize
if (isLoggedIn()) {
    currentUser = sessionStorage.getItem('dreamos_user');
    currentRole = sessionStorage.getItem('dreamos_role');
    renderDashboard();
} else {
    renderLogin();
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('✅ SW registered', reg))
        .catch(err => console.log('❌ SW failed', err));
}

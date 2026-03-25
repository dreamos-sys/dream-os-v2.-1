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

// Modul Daftar LENGKAP dengan semua modul
const MODULES = {
    // Bottom Navigation
    home: { name: 'Home', icon: 'fa-home', nav: true },
    profile: { name: 'Profile', icon: 'fa-user', nav: true },
    about: { name: 'About', icon: 'fa-info-circle', nav: true },
    
    // Core Modules
    stok: { name: 'Stok', icon: 'fa-boxes', color: '#10b981' },
    maintenance: { name: 'Maintenance', icon: 'fa-tools', color: '#f59e0b' },
    sekuriti: { name: 'Sekuriti', icon: 'fa-shield-alt', color: '#ef4444' },
    ai: { name: 'AI Chat', icon: 'fa-robot', color: '#8b5cf6' },
    
    // Legacy Modules
    booking: { name: 'Booking', icon: 'fa-calendar', color: '#3b82f6' },
    k3: { name: 'K3 Safety', icon: 'fa-hard-hat', color: '#f97316' },
    asset: { name: 'Asset', icon: 'fa-warehouse', color: '#6366f1' },
    'command-center': { name: 'Command Center', icon: 'fa-desktop', color: '#a855f7' },
    'janitor-in': { name: 'Janitor In', icon: 'fa-broom', color: '#ec4899' },
    'janitor-out': { name: 'Janitor Out', icon: 'fa-leaf', color: '#14b8a6' },
    qr: { name: 'QR Scanner', icon: 'fa-qrcode', color: '#06b6d4' },
    settings: { name: 'Settings', icon: 'fa-cog', color: '#6b7280' }
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

// Generic module loader untuk modul legacy
async function renderLegacyModule(moduleId) {
    const content = document.getElementById('module-content');
    content.innerHTML = '<div style="text-align:center; padding:40px;"><i class="fas fa-spinner fa-pulse"></i> Loading module...</div>';
    
    try {
        const module = await import(`./modules/${moduleId}/module.js`);
        if (module.default && typeof module.default.render === 'function') {
            const html = await module.default.render({
                user: { name: currentUser, role: currentRole },
                toast: showToast,
                navigate: (id) => renderModule(id)
            });
            content.innerHTML = html;
        } else {
            throw new Error('Invalid module structure');
        }
    } catch (err) {
        console.error(`Failed to load ${moduleId}:`, err);
        content.innerHTML = `
            <div style="padding:20px; text-align:center;">
                <i class="fas fa-exclamation-triangle" style="font-size:48px; color:#f59e0b;"></i>
                <p style="margin:15px 0;">Modul ${moduleId} sedang dalam pengembangan</p>
                <button class="btn" style="margin-top:20px;" onclick="window.renderModule('home')">Kembali ke Home</button>
            </div>
        `;
    }
}

// Built-in render functions
function renderHome() {
    return `
        <div style="padding:20px; text-align:center;">
            <h3 style="color:#10b981; margin-bottom:15px;">🏠 Home Dashboard</h3>
            <p>Selamat datang, ${currentUser}!</p>
            <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:12px; margin-top:25px;">
                <div style="background:rgba(16,185,129,0.1); padding:15px; border-radius:12px;">
                    <i class="fas fa-boxes" style="font-size:28px; color:#10b981;"></i>
                    <p style="margin-top:8px; font-size:12px;">Total Stok: 245 item</p>
                </div>
                <div style="background:rgba(245,158,11,0.1); padding:15px; border-radius:12px;">
                    <i class="fas fa-tools" style="font-size:28px; color:#f59e0b;"></i>
                    <p style="margin-top:8px; font-size:12px;">Maintenance: 3 tugas</p>
                </div>
                <div style="background:rgba(239,68,68,0.1); padding:15px; border-radius:12px;">
                    <i class="fas fa-shield-alt" style="font-size:28px; color:#ef4444;"></i>
                    <p style="margin-top:8px; font-size:12px;">Security: Aktif</p>
                </div>
                <div style="background:rgba(139,92,246,0.1); padding:15px; border-radius:12px;">
                    <i class="fas fa-robot" style="font-size:28px; color:#8b5cf6;"></i>
                    <p style="margin-top:8px; font-size:12px;">AI Assistant: Siap</p>
                </div>
            </div>
        </div>
    `;
}

function renderProfile() {
    return `
        <div style="padding:20px;">
            <h3 style="color:#10b981; margin-bottom:20px;">👤 User Profile</h3>
            <div style="background:rgba(15,23,42,0.5); border-radius:16px; padding:20px;">
                <p><strong>Nama:</strong> ${currentUser}</p>
                <p><strong>Role:</strong> ${currentRole}</p>
                <p><strong>Level:</strong> ${ROLES[currentRole]?.level || 50}</p>
                <p><strong>Session:</strong> Active</p>
                <button class="btn" style="margin-top:20px;" onclick="logout()">Logout</button>
            </div>
        </div>
    `;
}

function renderAbout() {
    return `
        <div style="padding:20px; text-align:center;">
            <h3 style="color:#10b981; margin-bottom:15px;">📱 Dream OS v2.1</h3>
            <p>Sovereign Operational Enterprise Ready</p>
            <p>The Power Soul of Shalawat</p>
            <div style="margin:20px 0; padding:15px; background:rgba(16,185,129,0.1); border-radius:12px;">
                <p style="font-size:12px;">Version: ${CONFIG.version}</p>
                <p style="font-size:12px;">Build: Enterprise Edition 2026</p>
                <p style="font-size:12px;">© 2026 DREAM TEAM</p>
            </div>
        </div>
    `;
}

function renderStok() {
    return `
        <div style="padding:20px;">
            <h3 style="color:#10b981; margin-bottom:15px;">📦 Manajemen Stok</h3>
            <div style="background:rgba(15,23,42,0.5); border-radius:16px; padding:20px;">
                <p><strong>Total item:</strong> 245</p>
                <p><strong>Low stock:</strong> 3 item</p>
                <ul style="margin-top:10px; margin-left:20px;">
                    <li>Kabel HDMI (2 unit)</li>
                    <li>Adaptor (1 unit)</li>
                    <li>Mouse Wireless (2 unit)</li>
                </ul>
            </div>
        </div>
    `;
}

function renderMaintenance() {
    return `
        <div style="padding:20px;">
            <h3 style="color:#f59e0b; margin-bottom:15px;">🔧 Maintenance Schedule</h3>
            <div style="background:rgba(15,23,42,0.5); border-radius:16px; padding:20px;">
                <p><strong>Jadwal hari ini:</strong> 3 tugas</p>
                <ul style="margin-top:10px; margin-left:20px;">
                    <li>Server backup - 10:00</li>
                    <li>Network check - 14:00</li>
                    <li>Database cleanup - 16:00</li>
                </ul>
            </div>
        </div>
    `;
}

function renderSekuriti() {
    return `
        <div style="padding:20px;">
            <h3 style="color:#ef4444; margin-bottom:15px;">🔒 Security Report</h3>
            <div style="background:rgba(15,23,42,0.5); border-radius:16px; padding:20px;">
                <p>Status: <span style="color:#10b981;">Active ✓</span></p>
                <p>Last incident: None (24 jam)</p>
                <p>CCTV: Online (8 kamera aktif)</p>
            </div>
        </div>
    `;
}

function renderAI() {
    return `
        <div style="padding:20px; text-align:center;">
            <h3 style="color:#8b5cf6; margin-bottom:15px;">🤖 AI Assistant</h3>
            <div style="background:rgba(15,23,42,0.5); border-radius:16px; padding:20px;">
                <i class="fas fa-robot" style="font-size:48px; color:#8b5cf6; margin-bottom:15px;"></i>
                <p>Gunakan chat widget di pojok kanan bawah untuk bertanya.</p>
                <p style="font-size:12px; color:#64748b; margin-top:10px;">Contoh: "stok", "maintenance", "security"</p>
                <button class="btn" style="margin-top:20px;" onclick="document.getElementById('chat-toggle').click()">
                    <i class="fas fa-comment"></i> Buka Chat
                </button>
            </div>
        </div>
    `;
}

function renderModule(moduleId) {
    const content = document.getElementById('module-content');
    const builtInModules = {
        home: renderHome,
        profile: renderProfile,
        about: renderAbout,
        stok: renderStok,
        maintenance: renderMaintenance,
        sekuriti: renderSekuriti,
        ai: renderAI
    };
    
    if (builtInModules[moduleId]) {
        content.innerHTML = builtInModules[moduleId]();
    } else if (MODULES[moduleId]) {
        renderLegacyModule(moduleId);
    } else {
        content.innerHTML = `
            <div style="padding:20px; text-align:center;">
                <i class="fas fa-exclamation-circle" style="font-size:48px; color:#f59e0b;"></i>
                <p style="margin-top:15px;">Modul ${moduleId} tidak ditemukan</p>
                <button class="btn" style="margin-top:20px;" onclick="window.renderModule('home')">Kembali</button>
            </div>
        `;
    }
}

// Render Login
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

// Render Dashboard
function renderDashboard() {
    const app = document.getElementById('app-shell');
    const gridModules = Object.entries(MODULES).filter(([id, m]) => !m.nav);
    
    app.innerHTML = `
        <div class="app-container" style="padding-bottom: 80px;">
            <div class="header" id="ghost-trigger">
                <div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                <p style="color:#64748b; font-size:12px;">${currentUser} • ${currentRole}</p>
            </div>
            
            <div class="module-grid">
                ${gridModules.map(([id, m]) => `
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
                    <div>Halo! Saya asisten AI Dream OS. Tanya apa saja soal stok, maintenance, atau security.</div>
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
    
    initChat();
    
    setTimeout(() => {
        const loading = document.getElementById('loading-screen');
        if (loading) loading.style.display = 'none';
    }, 100);
}

// Chat Widget
function initChat() {
    const toggle = document.getElementById('chat-toggle');
    const container = document.getElementById('chat-container');
    const closeBtn = document.getElementById('close-chat');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const messages = document.getElementById('chat-messages');
    
    if (!toggle) return;
    
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
            if (lower.includes('stok')) reply = '📦 Stok saat ini: 245 item aktif. Stok menipis: 3 item (kabel HDMI, adaptor, mouse).';
            else if (lower.includes('maintenance')) reply = '🔧 Jadwal maintenance hari ini: 3 mesin. Server backup jam 10:00, Network check 14:00, Database cleanup 16:00.';
            else if (lower.includes('security')) reply = '🔒 Sistem keamanan aktif. CCTV online (8 kamera). Tidak ada ancaman terdeteksi.';
            else if (lower.includes('booking')) reply = '📅 Booking hari ini: 5 ruangan. Ruang Rapat Utama (10:00-12:00)';
            else if (lower.includes('k3')) reply = '⚠️ K3 Safety: Semua aman. Tidak ada laporan insiden.';
            else if (lower.includes('asset')) reply = '🏢 Asset Management: Total 1,234 aset terdaftar.';
            else reply = '💚 Saya asisten Dream OS. Tanyakan tentang: stok, maintenance, security, booking, k3, atau asset.';
            addMessage(reply, false);
        }, 800);
    }
    
    sendBtn.onclick = sendMessage;
    input.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };
}

// Expose to window
window.renderModule = renderModule;
window.logout = logout;
window.showToast = showToast;

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

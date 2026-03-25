// Dream OS v2.1 - Enterprise Edition (Stable Build with Icon)
console.log('💚 Dream OS v2.1 - Bismillah');

const PASSWORD = 'b15m1ll4h_012443410';
const VERSION = '2.1.0-ultimate';

function showLogin() {
    document.getElementById('app-shell').innerHTML = `
        <div style="max-width:400px;margin:50px auto;padding:20px;">
            <div style="text-align:center;margin-bottom:25px;">
                <img src="./assets/img/icon-512.png" style="width:90px; height:90px; border-radius:24px; margin-bottom:15px; box-shadow:0 10px 25px rgba(16,185,129,0.3);">
                <div style="font-family:'Amiri',serif;font-size:28px;color:#10b981;">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                <div style="font-family:'Amiri',serif;font-size:18px;color:#34d399;margin:10px 0;">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
                <div style="font-size:12px;color:#64748b;">THE POWER SOUL OF SHALAWAT</div>
                <h2 style="color:#10b981;margin-top:20px;">Dream OS</h2>
                <p style="color:#64748b;font-size:12px;">${VERSION}</p>
            </div>
            <div style="background:rgba(15,23,42,0.8);backdrop-filter:blur(20px);border-radius:24px;padding:30px;border:1px solid rgba(16,185,129,0.2);">
                <div style="position:relative;margin-bottom:20px;">
                    <input type="password" id="pwd" style="width:100%;padding:14px 45px 14px 16px;background:rgba(0,0,0,0.5);border:2px solid rgba(16,185,129,0.2);border-radius:16px;color:white;font-size:16px;" placeholder="Enter password">
                    <i id="togglePwd" class="fas fa-eye" style="position:absolute;right:16px;top:50%;transform:translateY(-50%);cursor:pointer;color:#64748b;"></i>
                </div>
                <button onclick="login()" style="width:100%;padding:14px;background:linear-gradient(135deg,#10b981,#34d399);border:none;border-radius:16px;color:#000;font-weight:bold;cursor:pointer;">LOGIN</button>
                <p style="text-align:center;color:#64748b;font-size:11px;margin-top:15px;">Demo: b15m1ll4h_012443410</p>
            </div>
        </div>
    `;
    
    const toggle = document.getElementById('togglePwd');
    const pwdInput = document.getElementById('pwd');
    if (toggle) {
        toggle.onclick = () => {
            if (pwdInput.type === 'password') {
                pwdInput.type = 'text';
                toggle.classList.remove('fa-eye');
                toggle.classList.add('fa-eye-slash');
            } else {
                pwdInput.type = 'password';
                toggle.classList.remove('fa-eye-slash');
                toggle.classList.add('fa-eye');
            }
        };
    }
}

function showDashboard() {
    document.getElementById('app-shell').innerHTML = `
        <div style="max-width:600px;margin:0 auto;padding:20px;padding-bottom:80px;">
            <div style="background:linear-gradient(135deg,rgba(16,185,129,0.15) 0%,rgba(139,92,246,0.1) 100%);backdrop-filter:blur(20px);border:1px solid rgba(16,185,129,0.2);border-radius:32px;padding:25px;text-align:center;margin-bottom:20px;">
                <img src="./assets/img/icon-512.png" style="width:70px; height:70px; border-radius:20px; margin-bottom:12px; box-shadow:0 10px 25px rgba(16,185,129,0.3);">
                <div style="font-family:'Amiri',serif;font-size:24px;color:#10b981;">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                <div style="font-family:'Amiri',serif;font-size:16px;color:#34d399;margin:8px 0;">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
                <div style="margin-top:8px;"><span style="color:#10b981;">👑 Master M</span> • master</div>
                <div style="font-size:10px;color:#64748b;margin-top:8px;">${VERSION}</div>
            </div>
            
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:20px 0;">
                <div onclick="showModule('stok')" style="background:rgba(15,23,42,0.6);border:1px solid rgba(16,185,129,0.15);border-radius:20px;padding:16px;text-align:center;cursor:pointer;transition:all 0.3s;">
                    <div><i class="fas fa-boxes" style="font-size:28px;color:#10b981;"></i></div>
                    <div style="font-size:12px;margin-top:8px;">Stok</div>
                </div>
                <div onclick="showModule('maintenance')" style="background:rgba(15,23,42,0.6);border:1px solid rgba(16,185,129,0.15);border-radius:20px;padding:16px;text-align:center;cursor:pointer;transition:all 0.3s;">
                    <div><i class="fas fa-tools" style="font-size:28px;color:#f59e0b;"></i></div>
                    <div style="font-size:12px;margin-top:8px;">Maintenance</div>
                </div>
                <div onclick="showModule('security')" style="background:rgba(15,23,42,0.6);border:1px solid rgba(16,185,129,0.15);border-radius:20px;padding:16px;text-align:center;cursor:pointer;transition:all 0.3s;">
                    <div><i class="fas fa-shield-alt" style="font-size:28px;color:#ef4444;"></i></div>
                    <div style="font-size:12px;margin-top:8px;">Security</div>
                </div>
                <div onclick="showModule('ai')" style="background:rgba(15,23,42,0.6);border:1px solid rgba(16,185,129,0.15);border-radius:20px;padding:16px;text-align:center;cursor:pointer;transition:all 0.3s;">
                    <div><i class="fas fa-robot" style="font-size:28px;color:#8b5cf6;"></i></div>
                    <div style="font-size:12px;margin-top:8px;">AI Chat</div>
                </div>
                <div onclick="showModule('booking')" style="background:rgba(15,23,42,0.6);border:1px solid rgba(16,185,129,0.15);border-radius:20px;padding:16px;text-align:center;cursor:pointer;transition:all 0.3s;">
                    <div><i class="fas fa-calendar" style="font-size:28px;color:#3b82f6;"></i></div>
                    <div style="font-size:12px;margin-top:8px;">Booking</div>
                </div>
                <div onclick="showModule('k3')" style="background:rgba(15,23,42,0.6);border:1px solid rgba(16,185,129,0.15);border-radius:20px;padding:16px;text-align:center;cursor:pointer;transition:all 0.3s;">
                    <div><i class="fas fa-hard-hat" style="font-size:28px;color:#f97316;"></i></div>
                    <div style="font-size:12px;margin-top:8px;">K3</div>
                </div>
                <div onclick="showModule('asset')" style="background:rgba(15,23,42,0.6);border:1px solid rgba(16,185,129,0.15);border-radius:20px;padding:16px;text-align:center;cursor:pointer;transition:all 0.3s;">
                    <div><i class="fas fa-warehouse" style="font-size:28px;color:#6366f1;"></i></div>
                    <div style="font-size:12px;margin-top:8px;">Asset</div>
                </div>
                <div onclick="loadCommandCenter()" style="background:rgba(15,23,42,0.6);border:1px solid rgba(16,185,129,0.15);border-radius:20px;padding:16px;text-align:center;cursor:pointer;transition:all 0.3s;">
                    <div><i class="fas fa-desktop" style="font-size:28px;color:#a855f7;"></i></div>
                    <div style="font-size:12px;margin-top:8px;">Command Center</div>
                </div>
                <div onclick="showModule('qr')" style="background:rgba(15,23,42,0.6);border:1px solid rgba(16,185,129,0.15);border-radius:20px;padding:16px;text-align:center;cursor:pointer;transition:all 0.3s;">
                    <div><i class="fas fa-qrcode" style="font-size:28px;color:#06b6d4;"></i></div>
                    <div style="font-size:12px;margin-top:8px;">QR</div>
                </div>
            </div>
            
            <div id="moduleContent" style="min-height:200px;background:rgba(15,23,42,0.4);border-radius:20px;padding:20px;margin:20px 0;">
                <div style="text-align:center;color:#64748b;">
                    <i class="fas fa-robot" style="font-size:48px;margin-bottom:15px;"></i>
                    <p>Pilih modul di atas untuk memulai</p>
                </div>
            </div>
            
            <div style="position:fixed;bottom:0;left:0;right:0;background:rgba(2,6,23,0.95);backdrop-filter:blur(30px);border-top:1px solid rgba(16,185,129,0.2);display:flex;justify-content:space-around;padding:10px 0 20px;z-index:1000;">
                <button onclick="showModule('home')" style="background:none;border:none;color:#64748b;text-align:center;cursor:pointer;padding:8px;transition:all 0.3s;"><i class="fas fa-home" style="font-size:20px;"></i><div style="font-size:10px;">Home</div></button>
                <button onclick="showModule('profile')" style="background:none;border:none;color:#64748b;text-align:center;cursor:pointer;padding:8px;transition:all 0.3s;"><i class="fas fa-user" style="font-size:20px;"></i><div style="font-size:10px;">Profile</div></button>
                <button onclick="showModule('qr')" style="background:none;border:none;color:#64748b;text-align:center;cursor:pointer;padding:8px;transition:all 0.3s;"><i class="fas fa-qrcode" style="font-size:20px;"></i><div style="font-size:10px;">QR</div></button>
                <button onclick="showModule('about')" style="background:none;border:none;color:#64748b;text-align:center;cursor:pointer;padding:8px;transition:all 0.3s;"><i class="fas fa-info-circle" style="font-size:20px;"></i><div style="font-size:10px;">About</div></button>
                <button onclick="showModule('settings')" style="background:none;border:none;color:#64748b;text-align:center;cursor:pointer;padding:8px;transition:all 0.3s;"><i class="fas fa-cog" style="font-size:20px;"></i><div style="font-size:10px;">Settings</div></button>
            </div>
            
            <div style="position:fixed;bottom:80px;right:20px;z-index:1000;">
                <div onclick="toggleChat()" style="width:56px;height:56px;background:linear-gradient(135deg,#10b981,#34d399);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 15px rgba(16,185,129,0.4);transition:all 0.3s;">
                    <i class="fas fa-robot" style="font-size:24px;"></i>
                </div>
            </div>
        </div>
    `;
}

function showModule(module) {
    const content = document.getElementById('moduleContent');
    const modules = {
        home: () => `<div style="text-align:center;"><h3 style="color:#10b981;">🏠 Home Dashboard</h3><p>Selamat datang, Master M!</p><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:20px;"><div style="background:rgba(16,185,129,0.1);padding:15px;border-radius:12px;"><i class="fas fa-boxes"></i><p>Stok: 245</p></div><div style="background:rgba(245,158,11,0.1);padding:15px;border-radius:12px;"><i class="fas fa-tools"></i><p>Maintenance: 3</p></div></div></div>`,
        profile: () => `<div><h3 style="color:#10b981;">👤 User Profile</h3><div style="background:rgba(15,23,42,0.5);border-radius:20px;padding:20px;margin-top:15px;"><p><strong>Nama:</strong> Master M</p><p><strong>Role:</strong> Master</p><p><strong>Level:</strong> 100</p><button onclick="logout()" style="background:#ef4444;border:none;padding:12px;border-radius:12px;cursor:pointer;width:100%;margin-top:15px;">Logout</button></div></div>`,
        about: () => `<div style="text-align:center;"><h3 style="color:#10b981;">📱 About Dream OS</h3><div style="background:rgba(15,23,42,0.5);border-radius:20px;padding:20px;margin-top:15px;"><p><strong>Version:</strong> ${VERSION}</p><p><strong>Build:</strong> Enterprise 2026</p><p>The Power Soul of Shalawat</p><p>© 2026 DREAM TEAM</p></div></div>`,
        settings: () => `<div><h3 style="color:#10b981;">⚙️ Settings</h3><div style="background:rgba(15,23,42,0.5);border-radius:20px;padding:20px;margin-top:15px;"><p><strong>Version:</strong> ${VERSION}</p><button onclick="alert('Theme toggle coming soon')" style="background:#10b981;border:none;padding:10px;border-radius:10px;cursor:pointer;margin-top:10px;width:100%;">Toggle Theme</button><button onclick="alert('Clear cache coming soon')" style="background:#ef4444;border:none;padding:10px;border-radius:10px;cursor:pointer;margin-top:10px;width:100%;">Clear Cache</button></div></div>`,
        qr: () => `<div style="text-align:center;"><h3 style="color:#06b6d4;">📱 QR Scanner</h3><div style="background:rgba(15,23,42,0.5);border-radius:20px;padding:20px;margin-top:15px;"><i class="fas fa-qrcode" style="font-size:64px;color:#06b6d4;margin-bottom:15px;"></i><p>Scan QR code untuk absensi & asset tracking</p><button onclick="alert('Fitur scan QR akan segera hadir')" style="background:#06b6d4;border:none;padding:12px;border-radius:12px;cursor:pointer;margin-top:15px;">Scan QR</button></div></div>`,
        stok: () => `<div><h3 style="color:#10b981;">📦 Manajemen Stok</h3><div style="background:rgba(15,23,42,0.5);border-radius:20px;padding:20px;margin-top:15px;"><p><strong>Total item:</strong> 245</p><p><strong>Low stock:</strong> 3 item</p><ul><li>Kabel HDMI (2 unit)</li><li>Adaptor (1 unit)</li><li>Mouse Wireless (2 unit)</li></ul></div></div>`,
        maintenance: () => `<div><h3 style="color:#f59e0b;">🔧 Maintenance Schedule</h3><div style="background:rgba(15,23,42,0.5);border-radius:20px;padding:20px;margin-top:15px;"><p><strong>Jadwal hari ini:</strong> 3 tugas</p><ul><li>Server backup - 10:00</li><li>Network check - 14:00</li><li>Database cleanup - 16:00</li></ul></div></div>`,
        security: () => `<div><h3 style="color:#ef4444;">🔒 Security Report</h3><div style="background:rgba(15,23,42,0.5);border-radius:20px;padding:20px;margin-top:15px;"><p>Status: <span style="color:#10b981;">Active ✓</span></p><p>CCTV: 8 kamera online</p><p>Last incident: None</p></div></div>`,
        ai: () => `<div style="text-align:center;"><h3 style="color:#8b5cf6;">🤖 AI Assistant</h3><div style="background:rgba(15,23,42,0.5);border-radius:20px;padding:20px;margin-top:15px;"><p>Gunakan chat widget di pojok kanan bawah untuk bertanya.</p><button onclick="document.getElementById('chatWidget')?.click()" style="background:#8b5cf6;border:none;padding:12px;border-radius:12px;cursor:pointer;">Buka Chat</button></div></div>`,
        booking: () => `<div><h3 style="color:#3b82f6;">📅 Booking System</h3><div style="background:rgba(15,23,42,0.5);border-radius:20px;padding:20px;margin-top:15px;"><p>Booking hari ini: 3 ruangan</p><ul><li>Ruang Rapat Utama - 10:00</li><li>Meeting Room 2 - 13:00</li><li>Ruang VIP - 14:00</li></ul></div></div>`,
        k3: () => `<div><h3 style="color:#f97316;">⚠️ K3 Safety</h3><div style="background:rgba(15,23,42,0.5);border-radius:20px;padding:20px;margin-top:15px;"><p>Status: <span style="color:#10b981;">Aman ✓</span></p><p>Insiden: 0 hari ini</p><p>Patroli: Rutin setiap 2 jam</p></div></div>`,
        asset: () => `<div><h3 style="color:#6366f1;">🏢 Asset Management</h3><div style="background:rgba(15,23,42,0.5);border-radius:20px;padding:20px;margin-top:15px;"><p>Total aset: 1,234</p><p>Dalam maintenance: 45</p><p>Aset baru: 12 bulan ini</p></div></div>`,
    };
    content.innerHTML = modules[module]?.() || `<div style="text-align:center;"><p>Modul ${module} sedang dalam pengembangan</p><button onclick="showModule('home')" style="background:#10b981;border:none;padding:10px 20px;border-radius:10px;cursor:pointer;">Kembali</button></div>`;
}

let chatVisible = false;
function toggleChat() {
    const content = document.getElementById('moduleContent');
    if (!chatVisible) {
        content.innerHTML = `
            <div style="background:rgba(15,23,42,0.5);border-radius:20px;padding:20px;">
                <h3 style="color:#8b5cf6;margin-bottom:15px;">🤖 Dream AI Assistant</h3>
                <div id="chatMessages" style="height:200px;overflow-y:auto;background:rgba(0,0,0,0.3);border-radius:12px;padding:12px;margin-bottom:12px;">
                    <div style="margin-bottom:8px;"><span style="background:#334155;padding:8px 12px;border-radius:18px;display:inline-block;">Halo! Saya asisten AI Dream OS. Tanya apa saja soal stok, maintenance, atau security.</span></div>
                </div>
                <div style="display:flex;gap:8px;">
                    <input type="text" id="chatInput" placeholder="Ketik pesan..." style="flex:1;padding:12px;border-radius:24px;border:none;background:#0f172a;color:white;">
                    <button onclick="sendChat()" style="background:#8b5cf6;border:none;border-radius:24px;padding:12px 20px;cursor:pointer;">Kirim</button>
                </div>
                <button onclick="closeChat()" style="margin-top:12px;background:#334155;border:none;border-radius:12px;padding:8px;width:100%;cursor:pointer;">Tutup Chat</button>
            </div>
        `;
        chatVisible = true;
    } else {
        closeChat();
    }
}

function closeChat() {
    const content = document.getElementById('moduleContent');
    content.innerHTML = `<div style="text-align:center;color:#64748b;"><i class="fas fa-robot" style="font-size:48px;margin-bottom:15px;"></i><p>Pilih modul di atas untuk memulai</p></div>`;
    chatVisible = false;
}

function sendChat() {
    const input = document.getElementById('chatInput');
    const messages = document.getElementById('chatMessages');
    const msg = input.value.trim();
    if (!msg) return;
    
    messages.innerHTML += `<div style="margin-bottom:8px;text-align:right;"><span style="background:#8b5cf6;padding:8px 12px;border-radius:18px;display:inline-block;">${msg}</span></div>`;
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
    
    const lower = msg.toLowerCase();
    let reply = '';
    if (lower.includes('stok')) reply = '📦 Stok saat ini: 245 item aktif. Stok menipis: 3 item (Kabel HDMI, Adaptor, Mouse).';
    else if (lower.includes('maintenance')) reply = '🔧 Jadwal maintenance hari ini: Server backup jam 10:00, Network check 14:00, Database cleanup 16:00.';
    else if (lower.includes('security')) reply = '🔒 Sistem keamanan aktif. CCTV online (8 kamera). Tidak ada ancaman terdeteksi.';
    else if (lower.includes('booking')) reply = '📅 Booking hari ini: 3 ruangan. Ruang Rapat Utama (10:00), Meeting Room 2 (13:00), Ruang VIP (14:00).';
    else if (lower.includes('k3')) reply = '⚠️ K3 Safety: Semua aman. Patroli rutin setiap 2 jam. Tidak ada insiden.';
    else if (lower.includes('asset')) reply = '🏢 Asset Management: Total 1,234 aset, 45 dalam maintenance, 12 aset baru bulan ini.';
    else if (lower.includes('command')) reply = '🎮 Command Center v3.0: Fitur lengkap Dashboard, Dana, SPJ, Approval, Slides, Files, QR, Activity, Analytics, System. Buka modul Command Center untuk detail.';
    else reply = '💚 Saya asisten Dream OS. Tanyakan tentang: stok, maintenance, security, booking, k3, asset, atau command.';
    
    setTimeout(() => {
        messages.innerHTML += `<div style="margin-bottom:8px;"><span style="background:#334155;padding:8px 12px;border-radius:18px;display:inline-block;">${reply}</span></div>`;
        messages.scrollTop = messages.scrollHeight;
    }, 300);
}

function login() {
    const pwd = document.getElementById('pwd').value;
    if (pwd === PASSWORD) {
        sessionStorage.setItem('logged_in', 'true');
        showDashboard();
    } else {
        alert('Wrong password! Use: b15m1ll4h_012443410');
    }
}

function logout() {
    sessionStorage.clear();
    showLogin();
}

// Initialize
if (sessionStorage.getItem('logged_in') === 'true') {
    showDashboard();
} else {
    showLogin();
}

// Hide loading screen
setTimeout(() => {
    const loading = document.getElementById('loading-screen');
    if (loading) loading.style.display = 'none';
}, 500);

// Load Command Center Module
async function loadCommandCenter() {
    const content = document.getElementById('moduleContent');
    content.innerHTML = '<div style="text-align:center;padding:40px;"><i class="fas fa-spinner fa-pulse" style="font-size:32px;"></i><p>Loading Command Center...</p></div>';
    try {
        const module = await import('./modules/commandcenter/module.js');
        if (module.default && typeof module.default.render === 'function') {
            const html = await module.default.render({
                user: { name: 'Master M', role: 'master' },
                toast: (msg, type) => { const t = document.createElement('div'); t.textContent = msg; t.style.cssText = 'position:fixed;bottom:100px;left:20px;right:20px;background:#000;color:#10b981;padding:12px;border-radius:12px;text-align:center;z-index:10000;'; document.body.appendChild(t); setTimeout(() => t.remove(), 3000); },
                navigate: (id) => showModule(id)
            });
            content.innerHTML = html;
            if (module.default.afterRender) await module.default.afterRender({
                user: { name: 'Master M', role: 'master' },
                toast: (msg, type) => { const t = document.createElement('div'); t.textContent = msg; t.style.cssText = 'position:fixed;bottom:100px;left:20px;right:20px;background:#000;color:#10b981;padding:12px;border-radius:12px;text-align:center;z-index:10000;'; document.body.appendChild(t); setTimeout(() => t.remove(), 3000); },
                navigate: (id) => showModule(id)
            });
        }
    } catch(e) {
        content.innerHTML = `<div style="text-align:center;padding:40px;"><i class="fas fa-exclamation-triangle" style="font-size:48px;color:#f59e0b;"></i><p>Error: ${e.message}</p><button onclick="showModule('home')" style="margin-top:20px;background:#10b981;border:none;padding:10px 20px;border-radius:12px;">Kembali</button></div>`;
    }
}

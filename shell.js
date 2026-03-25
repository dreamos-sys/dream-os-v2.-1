// Dream OS v2.1 - Enterprise Edition (Stable Build)
console.log('💚 Dream OS v2.1 - Bismillah');

const PASSWORD = 'b15m1ll4h_012443410';
const VERSION = '2.1.0-ultimate';

function showLogin() {
    document.getElementById('app-shell').innerHTML = `
        <div style="max-width:400px;margin:50px auto;padding:20px;">
            <div style="text-align:center;margin-bottom:25px;">
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
    
    // Toggle password visibility
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
                <div style="font-family:'Amiri',serif;font-size:24px;color:#10b981;">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                <div style="font-family:'Amiri',serif;font-size:16px;color:#34d399;margin:8px 0;">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
                <div style="margin-top:8px;"><span style="color:#10b981;">👑 Master M</span> • master</div>
                <div style="font-size:10px;color:#64748b;margin-top:8px;">${VERSION}</div>
            </div>
            
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:20px 0;">
                <div onclick="showModule('stok')" style="background:rgba(15,23,42,0.6);border:1px solid rgba(16,185,129,0.15);border-radius:20px;padding:16px;text-align:center;cursor:pointer;">
                    <div><i class="fas fa-boxes" style="font-size:28px;color:#10b981;"></i></div>
                    <div style="font-size:12px;margin-top:8px;">Stok</div>
                </div>
                <div onclick="showModule('maintenance')" style="background:rgba(15,23,42,0.6);border:1px solid rgba(16,185,129,0.15);border-radius:20px;padding:16px;text-align:center;cursor:pointer;">
                    <div><i class="fas fa-tools" style="font-size:28px;color:#f59e0b;"></i></div>
                    <div style="font-size:12px;margin-top:8px;">Maintenance</div>
                </div>
                <div onclick="showModule('security')" style="background:rgba(15,23,42,0.6);border:1px solid rgba(16,185,129,0.15);border-radius:20px;padding:16px;text-align:center;cursor:pointer;">
                    <div><i class="fas fa-shield-alt" style="font-size:28px;color:#ef4444;"></i></div>
                    <div style="font-size:12px;margin-top:8px;">Security</div>
                </div>
                <div onclick="showModule('ai')" style="background:rgba(15,23,42,0.6);border:1px solid rgba(16,185,129,0.15);border-radius:20px;padding:16px;text-align:center;cursor:pointer;">
                    <div><i class="fas fa-robot" style="font-size:28px;color:#8b5cf6;"></i></div>
                    <div style="font-size:12px;margin-top:8px;">AI Chat</div>
                </div>
                <div onclick="showModule('booking')" style="background:rgba(15,23,42,0.6);border:1px solid rgba(16,185,129,0.15);border-radius:20px;padding:16px;text-align:center;cursor:pointer;">
                    <div><i class="fas fa-calendar" style="font-size:28px;color:#3b82f6;"></i></div>
                    <div style="font-size:12px;margin-top:8px;">Booking</div>
                </div>
                <div onclick="showModule('k3')" style="background:rgba(15,23,42,0.6);border:1px solid rgba(16,185,129,0.15);border-radius:20px;padding:16px;text-align:center;cursor:pointer;">
                    <div><i class="fas fa-hard-hat" style="font-size:28px;color:#f97316;"></i></div>
                    <div style="font-size:12px;margin-top:8px;">K3</div>
                </div>
                <div onclick="showModule('asset')" style="background:rgba(15,23,42,0.6);border:1px solid rgba(16,185,129,0.15);border-radius:20px;padding:16px;text-align:center;cursor:pointer;">
                    <div><i class="fas fa-warehouse" style="font-size:28px;color:#6366f1;"></i></div>
                    <div style="font-size:12px;margin-top:8px;">Asset</div>
                </div>
                <div onclick="showModule('command')" style="background:rgba(15,23,42,0.6);border:1px solid rgba(16,185,129,0.15);border-radius:20px;padding:16px;text-align:center;cursor:pointer;">
                    <div><i class="fas fa-desktop" style="font-size:28px;color:#a855f7;"></i></div>
                    <div style="font-size:12px;margin-top:8px;">Command</div>
                </div>
                <div onclick="showModule('qr')" style="background:rgba(15,23,42,0.6);border:1px solid rgba(16,185,129,0.15);border-radius:20px;padding:16px;text-align:center;cursor:pointer;">
                    <div><i class="fas fa-qrcode" style="font-size:28px;color:#06b6d4;"></i></div>
                    <div style="font-size:12px;margin-top:8px;">QR</div>
                </div>
            </div>
            
            <div id="moduleContent" style="min-height:200px;background:rgba(15,23,42,0.4);border-radius:20px;padding:20px;margin:20px 0;">
                <div style="text-align:center;color:#64748b;">
                    <i class="fas fa-robot" style="font-size:48px;margin-bottom:15px;"></i>
                    <p>Pilih modul di atas</p>
                </div>
            </div>
            
            <div style="position:fixed;bottom:0;left:0;right:0;background:rgba(2,6,23,0.95);backdrop-filter:blur(30px);border-top:1px solid rgba(16,185,129,0.2);display:flex;justify-content:space-around;padding:10px 0 20px;">
                <button onclick="showModule('home')" style="background:none;border:none;color:#64748b;text-align:center;cursor:pointer;padding:8px;"><i class="fas fa-home" style="font-size:20px;"></i><div style="font-size:10px;">Home</div></button>
                <button onclick="showModule('profile')" style="background:none;border:none;color:#64748b;text-align:center;cursor:pointer;padding:8px;"><i class="fas fa-user" style="font-size:20px;"></i><div style="font-size:10px;">Profile</div></button>
                <button onclick="showModule('qr')" style="background:none;border:none;color:#64748b;text-align:center;cursor:pointer;padding:8px;"><i class="fas fa-qrcode" style="font-size:20px;"></i><div style="font-size:10px;">QR</div></button>
                <button onclick="showModule('about')" style="background:none;border:none;color:#64748b;text-align:center;cursor:pointer;padding:8px;"><i class="fas fa-info-circle" style="font-size:20px;"></i><div style="font-size:10px;">About</div></button>
                <button onclick="showModule('settings')" style="background:none;border:none;color:#64748b;text-align:center;cursor:pointer;padding:8px;"><i class="fas fa-cog" style="font-size:20px;"></i><div style="font-size:10px;">Settings</div></button>
            </div>
            
            <div style="position:fixed;bottom:80px;right:20px;">
                <div onclick="toggleChat()" style="width:56px;height:56px;background:linear-gradient(135deg,#10b981,#34d399);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 15px rgba(16,185,129,0.4);">
                    <i class="fas fa-robot" style="font-size:24px;"></i>
                </div>
            </div>
        </div>
    `;
}

function showModule(module) {
    const content = document.getElementById('moduleContent');
    const modules = {
        home: () => `<h3 style="color:#10b981;">🏠 Home</h3><p>Welcome to Dream OS Enterprise</p>`,
        profile: () => `<h3 style="color:#10b981;">👤 Profile</h3><p>Name: Master M</p><p>Role: Master</p><button onclick="logout()" style="background:#ef4444;border:none;padding:10px 20px;border-radius:10px;cursor:pointer;">Logout</button>`,
        about: () => `<h3 style="color:#10b981;">📱 About</h3><p>Dream OS v${VERSION}</p><p>The Power Soul of Shalawat</p>`,
        settings: () => `<h3 style="color:#10b981;">⚙️ Settings</h3><p>Version: ${VERSION}</p><button onclick="alert('Coming soon')">Theme</button>`,
        qr: () => `<h3 style="color:#10b981;">📱 QR Scanner</h3><p>Scan QR code for attendance</p><button onclick="alert('Scan feature coming soon')">Scan QR</button>`,
        stok: () => `<h3 style="color:#10b981;">📦 Stok Management</h3><p>Total items: 245</p><p>Low stock: 3 items</p>`,
        maintenance: () => `<h3 style="color:#f59e0b;">🔧 Maintenance</h3><p>Today: 3 tasks</p><ul><li>Server backup - 10:00</li><li>Network check - 14:00</li></ul>`,
        security: () => `<h3 style="color:#ef4444;">🔒 Security</h3><p>Status: Active ✓</p><p>CCTV: 8 online</p>`,
        ai: () => `<h3 style="color:#8b5cf6;">🤖 AI Assistant</h3><p>Ask me about stok, maintenance, or security</p><input type="text" id="chatInput" placeholder="Type your question..." style="width:100%;padding:10px;margin:10px 0;border-radius:20px;border:none;"><button onclick="chat()">Send</button>`,
        booking: () => `<h3 style="color:#3b82f6;">📅 Booking</h3><p>Today: 3 bookings</p><ul><li>Meeting Room A - 10:00</li><li>Conference Room - 14:00</li></ul>`,
        k3: () => `<h3 style="color:#f97316;">⚠️ K3 Safety</h3><p>Status: Safe ✓</p><p>Incidents: 0</p>`,
        asset: () => `<h3 style="color:#6366f1;">🏢 Asset Management</h3><p>Total assets: 1,234</p><p>In maintenance: 45</p>`,
        command: () => `<h3 style="color:#a855f7;">🎮 Command Center</h3><p>Status: Operational</p><p>Uptime: 99.9%</p>`
    };
    content.innerHTML = modules[module]?.() || `<p>Module ${module} coming soon</p>`;
}

function chat() {
    const input = document.getElementById('chatInput');
    const msg = input.value.toLowerCase();
    let reply = '';
    if (msg.includes('stok')) reply = '📦 Stok: 245 items, 3 items low stock.';
    else if (msg.includes('maintenance')) reply = '🔧 Maintenance: 3 tasks today. Server backup at 10:00.';
    else if (msg.includes('security')) reply = '🔒 Security: Active, all systems normal.';
    else reply = '💚 Ask about: stok, maintenance, or security';
    alert(reply);
    input.value = '';
}

function toggleChat() {
    const content = document.getElementById('moduleContent');
    content.innerHTML = `<h3 style="color:#8b5cf6;">🤖 AI Assistant</h3><p>Ask me about stok, maintenance, or security</p><input type="text" id="chatInput" placeholder="Type your question..." style="width:100%;padding:10px;margin:10px 0;border-radius:20px;border:none;"><button onclick="chat()">Send</button>`;
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

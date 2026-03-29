/* 🧬 DREAM OS v2.1 PRO - GLOBAL UI/UX STANDARD
   Layout: Compact Header + Utility Bar + Clean Spiritual
*/

const VERSION = "v2.1 PRO";
const GHOST_MASTER = 'GhostArchitect2026!@#';

const ICONS = {
    logo: './assets/img/icon-512.png',
    apple: './assets/img/apple-touch-icon.png',
    favicon: './assets/img/favicon-32x32.png'
};

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

// 🎠 7 SLIDE CONTENT
const SLIDES = [
    {
        id: 1,
        title: '👋 Say Greeting',
        content: `
            <div style="text-align:center;padding:20px;">
                <h2 style="color:#34C759;font-size:22px;margin-bottom:15px;">Selamat Datang</h2>
                <p style="color:#1C1C1E;font-size:14px;margin-bottom:10px;">Dream OS ${VERSION}</p>
                <p style="color:#8E8E93;font-size:12px;">Global Immunity System Active</p>
                <div style="background:#F2F2F7;padding:15px;border-radius:15px;margin-top:15px;">
                    <p style="color:#064e3b;font-size:16px;font-family:serif;margin-bottom:10px;">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
                    <p style="color:#8E8E93;font-size:11px;">The Power Soul of Shalawat</p>
                </div>
            </div>
        `
    },
    {
        id: 2,        title: '📅 Booking Realtime',
        content: `
            <div style="padding:20px;">
                <h2 style="color:#34C759;font-size:18px;margin-bottom:15px;">Booking Hari Ini & Besok</h2>
                <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">
                    <div style="background:#F2F2F7;padding:12px;border-radius:12px;">
                        <div style="color:#34C759;font-size:20px;font-weight:800;">12</div>
                        <div style="color:#8E8E93;font-size:10px;">Hari Ini</div>
                    </div>
                    <div style="background:#F2F2F7;padding:12px;border-radius:12px;">
                        <div style="color:#34C759;font-size:20px;font-weight:800;">8</div>
                        <div style="color:#8E8E93;font-size:10px;">Besok</div>
                    </div>
                </div>
                <div style="margin-top:15px;">
                    <div style="background:#F2F2F7;padding:10px;border-radius:10px;margin-bottom:8px;">
                        <div style="color:#1C1C1E;font-size:11px;font-weight:700;">Ruang Meeting A</div>
                        <div style="color:#8E8E93;font-size:9px;">09:00 - 11:00 · APPROVED</div>
                    </div>
                    <div style="background:#F2F2F7;padding:10px;border-radius:10px;margin-bottom:8px;">
                        <div style="color:#1C1C1E;font-size:11px;font-weight:700;">Aula Utama</div>
                        <div style="color:#8E8E93;font-size:9px;">13:00 - 15:00 · PENDING</div>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 3,
        title: '⚠️ K3 Reports',
        content: `
            <div style="padding:20px;">
                <h2 style="color:#34C759;font-size:18px;margin-bottom:15px;">K3 Progress Today</h2>
                <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:15px;">
                    <div style="background:#F2F2F7;padding:12px;border-radius:12px;">
                        <div style="color:#34C759;font-size:20px;font-weight:800;">7</div>
                        <div style="color:#8E8E93;font-size:10px;">Resolved</div>
                    </div>
                    <div style="background:#F2F2F7;padding:12px;border-radius:12px;">
                        <div style="color:#FF9500;font-size:20px;font-weight:800;">3</div>
                        <div style="color:#8E8E93;font-size:10px;">Pending</div>
                    </div>
                </div>
                <div style="background:#F2F2F7;padding:10px;border-radius:10px;margin-bottom:8px;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
                        <span style="color:#1C1C1E;font-size:10px;font-weight:700;">🔧 Maintenance</span>
                        <span style="color:#34C759;font-size:10px;font-weight:700;">75%</span>
                    </div>
                    <div style="background:#E5E5EA;height:4px;border-radius:2px;overflow:hidden;">
                        <div style="background:#34C759;width:75%;height:100%;"></div>                    </div>
                </div>
                <div style="background:#F2F2F7;padding:10px;border-radius:10px;margin-bottom:8px;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
                        <span style="color:#1C1C1E;font-size:10px;font-weight:700;">🛡️ Security</span>
                        <span style="color:#34C759;font-size:10px;font-weight:700;">95%</span>
                    </div>
                    <div style="background:#E5E5EA;height:4px;border-radius:2px;overflow:hidden;">
                        <div style="background:#34C759;width:95%;height:100%;"></div>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 4,
        title: '🌤️ Weather & 🚦 Lalin',
        content: `
            <div style="padding:20px;">
                <h2 style="color:#34C759;font-size:18px;margin-bottom:15px;">Weather & Traffic</h2>
                <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:15px;">
                    <div style="background:linear-gradient(135deg,#34C759,#30B350);padding:15px;border-radius:15px;text-align:center;">
                        <div style="font-size:30px;">🌤️</div>
                        <div style="color:#fff;font-size:24px;font-weight:800;">28°C</div>
                        <div style="color:#fff;font-size:10px;">Depok, ID</div>
                    </div>
                    <div style="background:linear-gradient(135deg,#FF9500,#FF8A00);padding:15px;border-radius:15px;text-align:center;">
                        <div style="font-size:30px;">🚦</div>
                        <div style="color:#fff;font-size:14px;font-weight:800;">MODERATE</div>
                        <div style="color:#fff;font-size:10px;">Traffic</div>
                    </div>
                </div>
                <div style="background:#F2F2F7;padding:12px;border-radius:12px;">
                    <div style="color:#1C1C1E;font-size:11px;font-weight:700;margin-bottom:8px;">📍 Real-time Location</div>
                    <div style="color:#8E8E93;font-size:10px;font-family:monospace;">-6.4025° S, 106.7942° E</div>
                    <div style="color:#34C759;font-size:9px;margin-top:5px;">● GPS Active</div>
                </div>
                <div style="background:#FFF4E5;padding:10px;border-radius:10px;margin-top:10px;">
                    <div style="color:#FF9500;font-size:10px;font-weight:700;">⚠️ Prediction</div>
                    <div style="color:#8E8E93;font-size:9px;margin-top:3px;">Rain expected at 15:00 · Traffic heavy at 17:00</div>
                </div>
            </div>
        `
    },
    {
        id: 5,
        title: '👔 Info Management',
        content: `
            <div style="padding:20px;">
                <h2 style="color:#34C759;font-size:18px;margin-bottom:15px;">Info Khusus Management</h2>                <div style="background:#F2F2F7;padding:15px;border-radius:15px;margin-bottom:10px;">
                    <div style="color:#1C1C1E;font-size:11px;font-weight:700;margin-bottom:10px;">📊 Approval Pending</div>
                    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;text-align:center;">
                        <div>
                            <div style="color:#34C759;font-size:18px;font-weight:800;">5</div>
                            <div style="color:#8E8E93;font-size:8px;">Booking</div>
                        </div>
                        <div>
                            <div style="color:#34C759;font-size:18px;font-weight:800;">3</div>
                            <div style="color:#8E8E93;font-size:8px;">Dana</div>
                        </div>
                        <div>
                            <div style="color:#34C759;font-size:18px;font-weight:800;">2</div>
                            <div style="color:#8E8E93;font-size:8px;">K3</div>
                        </div>
                    </div>
                </div>
                <div style="background:#F2F2F7;padding:15px;border-radius:15px;">
                    <div style="color:#1C1C1E;font-size:11px;font-weight:700;margin-bottom:8px;">💰 Budget Overview</div>
                    <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
                        <span style="color:#8E8E93;font-size:10px;">Spent</span>
                        <span style="color:#1C1C1E;font-size:10px;font-weight:700;">Rp 2.5M / Rp 3.0M</span>
                    </div>
                    <div style="background:#E5E5EA;height:6px;border-radius:3px;overflow:hidden;">
                        <div style="background:#34C759;width:83%;height:100%;"></div>
                    </div>
                    <div style="color:#8E8E93;font-size:9px;margin-top:5px;">83% utilized</div>
                </div>
            </div>
        `
    },
    {
        id: 6,
        title: '🏢 Info Umum',
        content: `
            <div style="padding:20px;">
                <h2 style="color:#34C759;font-size:18px;margin-bottom:15px;">Info Khusus Bagian Umum</h2>
                <div style="background:#F2F2F7;padding:15px;border-radius:15px;margin-bottom:10px;">
                    <div style="color:#1C1C1E;font-size:11px;font-weight:700;margin-bottom:10px;">📋 Today's Tasks</div>
                    <div style="margin-bottom:8px;">
                        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                            <span style="color:#34C759;font-size:12px;">✓</span>
                            <span style="color:#8E8E93;font-size:10px;">Morning briefing (08:00)</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                            <span style="color:#FF9500;font-size:12px;">⏳</span>
                            <span style="color:#8E8E93;font-size:10px;">Asset inspection (11:00)</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:8px;">
                            <span style="color:#8E8E93;font-size:12px;">○</span>                            <span style="color:#8E8E93;font-size:10px;">Weekly report (16:00)</span>
                        </div>
                    </div>
                </div>
                <div style="background:#F2F2F7;padding:15px;border-radius:15px;">
                    <div style="color:#1C1C1E;font-size:11px;font-weight:700;margin-bottom:8px;">📢 Announcements</div>
                    <div style="color:#8E8E93;font-size:10px;line-height:1.5;">Meeting ruangan A dipindah ke Aula Utama jam 13:00</div>
                </div>
            </div>
        `
    },
    {
        id: 7,
        title: '💬 Ucapan Kabar',
        content: `
            <div style="padding:20px;">
                <h2 style="color:#34C759;font-size:18px;margin-bottom:15px;">Ucapan Kabar Bagian Umum</h2>
                <div style="background:linear-gradient(135deg,#FF9500,#FF8A00);padding:15px;border-radius:15px;margin-bottom:10px;">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <div style="font-size:30px;">🎉</div>
                        <div>
                            <div style="color:#fff;font-size:12px;font-weight:700;">Birthday Celebration</div>
                            <div style="color:#fff;font-size:10px;opacity:0.9;">Bapak Hanung · Today</div>
                        </div>
                    </div>
                </div>
                <div style="background:#F2F2F7;padding:15px;border-radius:15px;margin-bottom:10px;">
                    <div style="color:#1C1C1E;font-size:11px;font-weight:700;margin-bottom:8px;">📝 Message Board</div>
                    <div style="color:#8E8E93;font-size:10px;line-height:1.5;">"Terima kasih untuk tim maintenance yang sudah bekerja lembur kemarin" - HRD</div>
                </div>
                <div style="background:#F2F2F7;padding:15px;border-radius:15px;">
                    <div style="color:#1C1C1E;font-size:11px;font-weight:700;margin-bottom:8px;">📞 Important Contacts</div>
                    <div style="color:#8E8E93;font-size:10px;line-height:1.8;">
                        <div>📱 Security: 0812-XXXX-XXXX</div>
                        <div>📱 Maintenance: 0813-XXXX-XXXX</div>
                        <div>📱 Umum: 0814-XXXX-XXXX</div>
                    </div>
                </div>
            </div>
        `
    }
];

// 🕐 REAL-TIME CLOCK
function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'});
    const timeEl = document.getElementById('live-time');
    if(timeEl) timeEl.textContent = timeStr;
}
// 🔋 BATTERY STATUS
async function updateBattery() {
    if('getBattery' in navigator) {
        try {
            const battery = await navigator.getBattery();
            const batteryEl = document.getElementById('battery-level');
            if(batteryEl) {
                const level = Math.round(battery.level * 100);
                batteryEl.textContent = level + '%';
                if(battery.level < 0.2) batteryEl.style.color = '#FF3B30';
                else if(battery.level < 0.5) batteryEl.style.color = '#FF9500';
                else batteryEl.style.color = '#34C759';
            }
        } catch(e) { console.log('Battery API not available'); }
    }
}

window.onload = () => {
    console.log('✅ Dream OS Pro Loading...');
    if(window.girangati) {
        window.girangati.init().then(diag => {
            console.log('🧬 Girangati Diagnostics:', diag);
        });
    }
    updateTime();
    updateBattery();
    setInterval(updateTime, 1000);
    setInterval(updateBattery, 60000);
    
    if(!sessionStorage.getItem('dream_session')) renderLogin();
    else renderDashboard();
};

// ✅ PRO LOGIN (CLEAN)
function renderLogin() {
    const app = document.getElementById('app');
    if(!app) { console.error('❌ App not found!'); return; }
    
    app.innerHTML = `
        <div style="background:#F2F2F7;height:100vh;display:flex;justify-content:center;align-items:center;">
            <div style="background:#FFFFFF;padding:40px 30px;border-radius:28px;box-shadow:0 8px 25px rgba(0,0,0,0.1);text-align:center;max-width:320px;width:90%;">
                <img src="${ICONS.logo}" alt="Dream OS" style="width:80px;height:80px;margin-bottom:15px;border-radius:18px;box-shadow:0 4px 15px rgba(212,175,55,0.3);">
                <div style="font-size:28px;color:#064e3b;font-family:serif;margin-bottom:10px;">بِسْمِ اللَّهِ</div>
                <div style="font-size:10px;color:#34C759;font-weight:800;letter-spacing:1px;margin-bottom:20px;">DREAM OS ${VERSION}</div>
                <div style="position:relative;margin-bottom:12px;">
                    <input type="text" id="username" placeholder="Username" style="width:100%;padding:14px;border:1px solid #E5E5EA;border-radius:12px;background:#F2F2F7;font-size:14px;">
                </div>
                <div style="position:relative;margin-bottom:20px;">
                    <input type="password" id="password" placeholder="Password" style="width:100%;padding:14px 45px 14px 14px;border:1px solid #E5E5EA;border-radius:12px;background:#F2F2F7;font-size:14px;">                    <button type="button" onclick="togglePassword()" style="position:absolute;right:15px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:18px;color:#8E8E93;">👁️</button>
                </div>
                <button onclick="doLogin()" style="width:100%;padding:16px;background:#34C759;color:#fff;border:none;border-radius:15px;font-weight:bold;font-size:14px;box-shadow:0 10px 20px rgba(52,199,89,0.3);">🔐 LOGIN</button>
                <div id="error" style="color:#FF3B30;font-size:11px;margin-top:15px;display:none;">⚠️ ACCESS DENIED</div>
            </div>
        </div>
    `;
}

window.togglePassword = function() {
    const pwd = document.getElementById('password');
    const btn = pwd.nextElementSibling;
    if(pwd.type === 'password') { pwd.type = 'text'; btn.innerHTML = '🙈'; }
    else { pwd.type = 'password'; btn.innerHTML = '👁️'; }
};

function doLogin() {
    const user = document.getElementById('username').value.toLowerCase().trim();
    const pass = document.getElementById('password').value;
    const error = document.getElementById('error');
    
    if(CREDENTIALS[user] && CREDENTIALS[user] === pass) {
        sessionStorage.setItem('dream_session', 'ACTIVE');
        sessionStorage.setItem('dream_user', user.toUpperCase());
        if(window.girangati) { window.girangati.babyAgent.learn('login', 'success'); }
        renderDashboard();
    } else {
        error.style.display = 'block';
        if(window.girangati && window.girangati.tiny.vibrate) { window.girangati.tiny.vibrate([50,50,50]); }
        else if(navigator.vibrate) { navigator.vibrate([50,50,50]); }
    }
}

// 🎠 CAROUSEL STATE
let currentSlide = 0;
let slideInterval = null;
let isPaused = false;

// ✅ PRO DASHBOARD (GLOBAL STANDARD)
function renderDashboard() {
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
            <!-- UTILITY BAR (iOS Style) -->
            <div class="utility-bar">
                <div class="utility-left">
                    <img src="${ICONS.logo}" alt="Dream OS" class="mini-logo" onclick="triggerGhost()">
                    <span id="live-time" class="live-time">--:--</span>
                </div>
                <div class="utility-right">
                    <span class="utility-icon" onclick="toggleTheme()" title="Theme">🌙</span>
                    <span class="utility-icon" onclick="toggleLanguage()" title="Language">🇮🇩</span>
                    <span id="battery-level" class="battery-level">--%</span>
                    <span class="utility-icon" onclick="openSettings()" title="Settings">⚙️</span>
                </div>
            </div>
            
            <!-- SPIRITUAL HEADER (Clean, Prominent) -->
            <div class="spiritual-header">
                <div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
                <div class="shalawat">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
            </div>
            
            <!-- IMMUNITY BADGE -->
            <div class="immunity-badge">🛡️ IMMUNITY: ${immunityData.immunityLevel || 0}% (${immunityData.count || 0} Vaccines)</div>
            
            <!-- 7 SLIDE CAROUSEL -->
            <div class="mega-slider">
                <div class="slider-header">
                    <span class="slide-title" id="slide-title">${SLIDES[0].title}</span>
                    <div class="slide-controls">
                        <button onclick="prevSlide()" class="control-btn">◀</button>
                        <button onclick="togglePause()" id="pause-btn" class="control-btn">⏸️</button>
                        <button onclick="nextSlide()" class="control-btn">▶</button>
                    </div>
                </div>
                <div class="slider-content" id="slider-content">${SLIDES[0].content}</div>
                <div class="slide-dots" id="slide-dots"></div>
            </div>
            
            <!-- 9 MODULE GRID -->
            <div class="grid-container">
                ${mods.map(m => `
                    <div onclick="window.loadModule('${m.n}')" class="grid-item">
                        <span class="icon">${m.e}</span>
                        <span class="label">${m.n}</span>
                    </div>
                `).join('')}
            </div>
            
            <div style="height:180px;width:100%;"></div>
            <!-- IOS DOCK -->
            <nav class="ios-dock">
                <div class="nav-btn active"><span>🏠</span><p>HOME</p></div>
                <div class="nav-btn"><span>👤</span><p>PROFILE</p></div>
                <div class="qr-btn-container"><div class="qr-btn">🔳</div></div>
                <div class="nav-btn"><span>ℹ️</span><p>ABOUT</p></div>
                <div class="nav-btn"><span>⚙️</span><p>SETTING</p></div>
            </nav>
        </div>
        
        <style>
            :root { --bg: #F2F2F7; --white: #FFFFFF; --green: #34C759; --dark: #1C1C1E; --gold: #D4AF37; --gray: #8E8E93; }
            body { margin: 0; background: var(--bg); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; overflow-x: hidden; -webkit-tap-highlight-color: transparent; }
            
            /* PRO UTILITY BAR (iOS Style) */
            .utility-bar { 
                display: flex; 
                justify-content: space-between; 
                align-items: center; 
                padding: 12px 20px 8px; 
                background: var(--white);
                border-bottom: 0.5px solid #E5E5EA;
            }
            .utility-left { display: flex; align-items: center; gap: 12px; }
            .utility-right { display: flex; align-items: center; gap: 15px; }
            .mini-logo { width: 35px; height: 35px; border-radius: 10px; cursor: pointer; transition: transform 0.3s; }
            .mini-logo:hover { transform: scale(1.1); }
            .live-time { font-size: 15px; font-weight: 600; color: var(--dark); }
            .utility-icon { font-size: 18px; cursor: pointer; transition: transform 0.2s; }
            .utility-icon:hover { transform: scale(1.2); }
            .battery-level { font-size: 13px; font-weight: 600; color: var(--green); }
            
            /* SPIRITUAL HEADER (Clean & Prominent) */
            .spiritual-header { 
                text-align: center; 
                padding: 20px 15px 15px; 
                background: var(--white);
                margin-bottom: 10px;
            }
            .bismillah { 
                font-size: 26px; 
                color: #064e3b; 
                font-family: 'Amiri', serif; 
                font-weight: 700; 
                line-height: 1.4;
                margin-bottom: 8px;
            }
            .shalawat { 
                font-size: 20px;                 color: #064e3b; 
                font-family: 'Amiri', serif; 
                font-weight: 600;
            }
            
            .immunity-badge { 
                background: var(--green); 
                color: #fff; 
                padding: 8px 15px; 
                border-radius: 20px; 
                font-size: 10px; 
                font-weight: 800; 
                margin: 0 auto 15px; 
                display: inline-block;
                box-shadow: 0 4px 10px rgba(52,199,89,0.3);
            }
            
            .mega-slider { 
                width: 92%; 
                background: var(--white); 
                border-radius: 28px; 
                margin: 0 auto 20px; 
                border: 0.5px solid #E5E5EA; 
                overflow: hidden; 
            }
            .slider-header { 
                display: flex; 
                justify-content: space-between; 
                align-items: center; 
                padding: 15px 20px; 
                border-bottom: 0.5px solid #E5E5EA; 
            }
            .slide-title { color: var(--green); font-size: 14px; font-weight: 700; }
            .slide-controls { display: flex; gap: 8px; }
            .control-btn { 
                background: none; 
                border: none; 
                font-size: 16px; 
                color: var(--gray); 
                cursor: pointer; 
                padding: 5px 10px;
                border-radius: 8px;
                transition: background 0.2s;
            }
            .control-btn:hover { background: #F2F2F7; }
            .slider-content { min-height: 280px; }
            .slide-dots { display: flex; justify-content: center; gap: 8px; padding: 15px; }
            .slide-dot { width: 8px; height: 8px; border-radius: 50%; background: #E5E5EA; cursor: pointer; transition: all 0.3s; }
            .slide-dot.active { background: var(--green); width: 20px; border-radius: 4px; }
                        .grid-container { 
                display: grid; 
                grid-template-columns: repeat(3, 1fr); 
                gap: 15px; 
                width: 92%; 
                margin: 0 auto;
                padding-bottom: 20px;
            }
            .grid-item { 
                background: var(--white); 
                aspect-ratio: 1/1; 
                border-radius: 24px; 
                display: flex; 
                flex-direction: column; 
                justify-content: center; 
                align-items: center; 
                box-shadow: 0 5px 15px rgba(0,0,0,0.03); 
                border: 0.5px solid #F2F2F7; 
                cursor: pointer;
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .grid-item:active { transform: scale(0.95); }
            .grid-item:hover { box-shadow: 0 8px 25px rgba(0,0,0,0.08); }
            .icon { font-size: 34px; margin-bottom: 5px; }
            .label { font-size: 8px; font-weight: 800; color: var(--dark); text-transform: uppercase; text-align: center; letter-spacing: 0.3px; }
            
            .ios-dock { 
                position: fixed; 
                bottom: 25px; 
                left: 50%; 
                transform: translateX(-50%); 
                width: 92%; 
                max-width: 420px; 
                height: 75px; 
                background: rgba(28,28,30,0.95); 
                backdrop-filter: blur(20px); 
                border-radius: 38px; 
                display: flex; 
                justify-content: space-around; 
                align-items: center; 
                z-index: 9999; 
                box-shadow: 0 20px 45px rgba(0,0,0,0.3); 
            }
            .nav-btn { text-align: center; flex: 1; cursor: pointer; padding: 8px; border-radius: 12px; transition: background 0.2s; }
            .nav-btn:hover { background: rgba(255,255,255,0.1); }
            .nav-btn span { font-size: 24px; }
            .nav-btn p { font-size: 7px; color: #8E8E93; font-weight: 700; margin-top: 4px; }
            .nav-btn.active p { color: var(--green); }
            .qr-btn { 
                background: var(--green);                 width: 60px; 
                height: 60px; 
                border-radius: 22px; 
                margin-top: -42px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                border: 4px solid var(--bg); 
                font-size: 28px; 
                color: #fff;
                box-shadow: 0 10px 25px rgba(52,199,89,0.4);
            }
            
            /* Dark Mode */
            body.dark-mode { 
                --bg: #1C1C1E; 
                --white: #2C2C2E; 
                --gray: #98989D;
            }
            body.dark-mode .utility-bar { background: var(--white); border-color: #3A3A3C; }
            body.dark-mode .live-time { color: #fff; }
            body.dark-mode .bismillah, body.dark-mode .shalawat { color: #34C759; }
            body.dark-mode .grid-item { background: var(--white); border-color: #3A3A3C; }
            
            @keyframes huPulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 1; } }
            
            /* Responsive */
            @media (orientation: landscape) {
                .utility-bar { padding: 8px 20px; }
                .spiritual-header { padding: 15px 15px 10px; }
                .bismillah { font-size: 22px; }
                .shalawat { font-size: 18px; }
                .grid-container { grid-template-columns: repeat(5, 1fr); }
            }
        </style>
    `;
    
    // Initialize carousel
    renderDots();
    startCarousel();
}

// 🎠 CAROUSEL FUNCTIONS
function startCarousel() {
    if(slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        if(!isPaused) nextSlide();
    }, 7000);
}
function nextSlide() {
    currentSlide = (currentSlide + 1) % SLIDES.length;
    updateSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + SLIDES.length) % SLIDES.length;
    updateSlide();
}

function togglePause() {
    isPaused = !isPaused;
    document.getElementById('pause-btn').innerHTML = isPaused ? '▶️' : '⏸️';
}

function updateSlide() {
    document.getElementById('slide-title').textContent = SLIDES[currentSlide].title;
    document.getElementById('slider-content').innerHTML = SLIDES[currentSlide].content;
    renderDots();
}

function renderDots() {
    const dots = document.getElementById('slide-dots');
    dots.innerHTML = SLIDES.map((s, i) => 
        `<div class="slide-dot ${i === currentSlide ? 'active' : ''}" onclick="goToSlide(${i})"></div>`
    ).join('');
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
}

// ⚙️ UTILITY FUNCTIONS
window.toggleTheme = function() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('dream_theme', isDark ? 'dark' : 'light');
    console.log('[Theme] Switched to', isDark ? 'Dark' : 'Light');
};

window.toggleLanguage = function() {
    alert('🌐 Language Toggle\n\nCurrent: Indonesian (ID)\nAvailable: English (EN), Arabic (AR)\n\nFeature coming soon!');
};

window.openSettings = function() {
    alert('⚙️ Settings\n\n• Profile\n• Notifications\n• Security\n• About\n• Logout');
};

// ✅ MODULE LOADER WITH GIRANGATIwindow.loadModule = function(moduleName) {
    console.log('[Module] Loading:', moduleName);
    if(window.girangati) {
        window.girangati.brain.emit('MODULE_OPEN', moduleName);
    }
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#34C759;color:#fff;padding:12px 24px;border-radius:30px;font-weight:700;z-index:10000;';
    toast.textContent = '📦 Loading: ' + moduleName;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 2000);
};

// ✅ GHOST MODE
let ghostTapCount = 0;
let ghostLastTap = 0;

function triggerGhost() {
    const now = Date.now();
    if(now - ghostLastTap > 800) ghostTapCount = 0;
    ghostTapCount++;
    ghostLastTap = now;
    
    if(ghostTapCount === 5) {
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
    if('caches' in window) {
        caches.keys().then(names => names.forEach(n => caches.delete(n)));
    }
    
    const errors = JSON.parse(localStorage.getItem('girangati_errors') || '[]');
    const oldVaccines = JSON.parse(localStorage.getItem('dream_vaccines') || '{}');    const newCount = (oldVaccines.count || 0) + errors.length;
    const newLevel = Math.min(100, newCount * 5);
    
    localStorage.setItem('dream_vaccines', JSON.stringify({
        count: newCount,
        immunityLevel: newLevel,
        lastActivation: new Date().toISOString(),
        vaccines: oldVaccines.vaccines || []
    }));
    
    localStorage.removeItem('girangati_errors');
    
    let diagMsg = '';
    if(window.girangati) {
        const diag = window.girangati.diagnostics();
        diagMsg = '\n\n🧬 Girangati: ' + diag.status + '\n🦾 Tiny: ' + diag.tiny.status + '\n🧠 Baby Agent: ' + diag.babyAgent.status;
    }
    
    alert(`👻 GHOST IMMUNE ACTIVATED\n\n🛡️ Immunity Level: ${newLevel}%\n💉 Vaccines: ${newCount}\n🧹 Bugs Cleaned: ${errors.length}${diagMsg}`);
    
    renderDashboard();
}

// Load saved theme
if(localStorage.getItem('dream_theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

console.log('✅ Dream OS v2.1 PRO - Global UI/UX Standard Loaded!');
console.log('🎨 Features: Utility Bar, Dark Mode, Live Clock, Battery');

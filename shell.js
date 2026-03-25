/**
 * ══════════════════════════════════════════════════════════════
 * DREAM OS v2.3.5 - GUARDIAN KERNEL (PRO ENTERPRISE)
 * Integrated Login & Dynamic 8-Grid Dashboard
 * Standard: ISO 27001 & ISO 9001
 * ══════════════════════════════════════════════════════════════
 */

const CONFIG = {
    supabase: {
        url: 'https://lfavawkzvdhdpaaplaiq.supabase.co',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmYXZhd2t6dmRoZHBhYXBsYWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5Mjc0NjgsImV4cCI6MjA4OTUwMzQ2OH0.EhwnhAd20lUVaWHHB51UdWCGWxkyTaWIrsPY8xvhwE00'
    },
    // Password sakral Master
    access: { key: 'b15m1ll4h_012443410' }
};

// Inisialisasi DB Client
const _db = supabase.createClient(CONFIG.supabase.url, CONFIG.supabase.key);

const DREAM_CORE = {
    modules: [],
    
    async init() {
        console.log("🚀 Sovereign Kernel Initializing...");
        
        // 🛡️ Cek apakah Master sudah login sebelumnya
        if (!sessionStorage.getItem('dream_os_authorized')) {
            this.renderLogin();
            return; // Stop di sini, jangan lanjut load dashboard
        }

        // 🏛️ Jika sudah authorized, bangun sistem total
        this.renderShell();
        this.hideLoading();
    },

    // 🛡️ PINTU GERBANG SOVEREIGN
    renderLogin() {
        this.hideLoading(); // Sembunyikan loading screen GitHub
        const shell = document.getElementById('app-shell');
        shell.innerHTML = `
            <div style="height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#020617; color:white; padding:20px;">
                <img src="https://dreamos-sys.github.io/dream-os-v2.-1/assets/img/icon-512.png" width="80" style="margin-bottom:20px;">
                <h1 style="color:#10b981; font-family:'Amiri',serif; margin:0 0 10px 0;">بِسْمِ اللَّهِ</h1>
                <p style="font-size:10px; color:#64748b; margin-bottom:20px;">DREAM OS ACCESS CONTROL</p>
                <input type="password" id="auth-key" placeholder="Enter Sovereign Key..." 
                    style="width:80%; padding:15px; border-radius:12px; border:1px solid #10b981; background:none; color:white; text-align:center; margin-bottom:15px;">
                <button onclick="window.AUTHORIZE_SYSTEM()" 
                    style="width:80%; padding:15px; border-radius:12px; border:none; background:#10b981; color:black; font-weight:bold; cursor:pointer;">
                    BISMILLAH - ENTER
                </button>
            </div>
        `;
    },

    // 🎨 RENDER DASHBOARD (8 Grid) - Play Store UX Standard
    renderShell() {
        const shell = document.getElementById('app-shell');
        shell.innerHTML = `
            <header id="main-header" style="text-align:center; padding:20px; background:rgba(2,6,23,0.5);">
                <p style="font-family:'Amiri',serif; font-size:26px; color:#10b981; margin:0;">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                <div id="sys-clock" style="font-size:20px; color:#fff; font-family:monospace;">00.00.00</div>
            </header>

            <main id="main-viewport" style="padding:20px; padding-bottom:100px;">
                <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:12px; animation: slideUp 0.5s ease;">
                    ${this.createWidget('Dana Umum', 'fa-wallet', '#10b981')}
                    ${this.createWidget('Laporan SPJ', 'fa-file-invoice', '#3b82f6')}
                    ${this.createWidget('Laporan Harian', 'fa-calendar-day', '#f59e0b')}
                    ${this.createWidget('Mingguan', 'fa-calendar-week', '#8b5cf6')}
                    ${this.createWidget('Bulanan', 'fa-calendar-alt', '#ec4899')}
                    ${this.createWidget('Tahunan', 'fa-archive', '#64748b')}
                    ${this.createWidget('K3 & Keamanan', 'fa-shield-alt', '#ef4444')}
                    ${this.createWidget('Aset & Gudang', 'fa-boxes', '#06b6d4')}
                </div>
            </main>

            <nav id="bottom-nav" style="position:fixed; bottom:0; width:100%; background:rgba(2,6,23,0.9); backdrop-filter:blur(20px); display:flex; justify-content:space-around; align-items:center; padding:15px; border-top:1px solid #10b98122; z-index:1000;">
                <i class="fas fa-home" onclick="location.reload()" style="color:#10b981; font-size:20px;"></i>
                <i class="fas fa-user-circle" style="color:#64748b; font-size:20px;"></i>
                <div style="background:#10b981; color:#000; width:55px; height:55px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-top:-35px; border:5px solid #020617; box-shadow:0 0 15px rgba(16,185,129,0.3);">
                    <i class="fas fa-qrcode" style="font-size:24px;"></i>
                </div>
                <i class="fas fa-info-circle" style="color:#64748b; font-size:20px;"></i>
                <i class="fas fa-cog" style="color:#64748b; font-size:20px;"></i>
            </nav>
        `;
        this.startClock();
    },

    createWidget(name, icon, color) {
        return `
            <div style="background:rgba(15,23,42,0.8); border:1px solid ${color}33; padding:15px; border-radius:18px; text-align:center;">
                <div style="background:${color}11; width:50px; height:50px; border-radius:12px; display:flex; align-items:center; justify-content:center; margin:0 auto 10px;">
                    <i class="fas ${icon}" style="color:${color}; font-size:22px;"></i>
                </div>
                <div style="font-size:9px; font-weight:bold; letter-spacing:1px; color:#fff;">${name.toUpperCase()}</div>
                <div style="font-size:8px; color:#64748b; margin-top:4px;">Waiting Sync</div>
            </div>
        `;
    },

    startClock() {
        setInterval(() => {
            const el = document.getElementById('sys-clock');
            if(el) el.innerText = new Date().toLocaleTimeString('id-ID', {hour12:false});
        }, 1000);
    },

    hideLoading() {
        const loader = document.getElementById('loading-screen');
        if(loader) { loader.style.opacity = '0'; setTimeout(() => loader.style.display = 'none', 500); }
    }
};

// --- LOGIKA OTORISASI SAKRAL ---
window.AUTHORIZE_SYSTEM = () => {
    const key = document.getElementById('auth-key').value;
    if(key === CONFIG.access.key) {
        sessionStorage.setItem('dream_os_authorized', 'true');
        location.reload(); // Refresh untuk muat Kernel total
    } else {
        alert("⚠️ Sovereign Key Salah, Master.");
    }
};

// Start System
DREAM_CORE.init();

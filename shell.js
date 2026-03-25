/**
 * ══════════════════════════════════════════════════════════════
 * DREAM OS v2.1.5 - SINGULARITY KERNEL (PRO ENTERPRISE)
 * The Power Soul of Shalawat - Sovereign System
 * ══════════════════════════════════════════════════════════════
 */

const CONFIG = {
    supabase: {
        url: 'https://lfavawkzvdhdpaaplaiq.supabase.co',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmYXZhd2t6dmRoZHBhYXBsYWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5Mjc0NjgsImV4cCI6MjA4OTUwMzQ2OH0.EhwnhAd20lUVaWHHB51UdWCGWxkyTaWIrsPY8xvhwE00'
    },
    ghost: { code: 'dreamos2026', tapCount: 5 }
};

// Inisialisasi Client (Gunakan _db agar tidak bentrok dengan library)
const _db = supabase.createClient(CONFIG.supabase.url, CONFIG.supabase.key);

const DREAM_CORE = {
    modules: [],
    state: { role: 'master', isOnline: navigator.onLine },
    taps: 0,

    async init() {
        console.log("🚀 Singularity Kernel Initializing...");
        this.setupImmunity();
        await this.discoverModules();
        this.renderShell();
        this.hideLoading();
    },

    // 🛡️ IMUNITAS: Deteksi Kesehatan Saraf Sistem
    setupImmunity() {
        window.addEventListener('online', () => {
            this.state.isOnline = true;
            console.log("✅ Imunitas: Network Restored");
        });
        window.addEventListener('offline', () => {
            this.state.isOnline = false;
            console.warn("⚠️ Imunitas: Offline Shield Active");
        });
    },

    // 🔍 AUTO-DISCOVERY: Mendeteksi Organ dari SQL
    async discoverModules() {
        const { data, error } = await _db
            .from('system_modules')
            .select('*')
            .order('sort_order', { ascending: true });
        
        if (!error) this.modules = data;
    },

    // 🎨 RENDER BODY (Play Store UX Standard)
    renderShell() {
        const shell = document.getElementById('app-shell');
        shell.innerHTML = `
            <div style="display:flex; justify-content:space-between; padding:8px 15px; background:rgba(0,0,0,0.3); font-size:10px; color:#10b981;">
                <div id="sys-date">${new Date().toLocaleDateString('id-ID')}</div>
                <div style="display:flex; gap:10px;">
                    <i class="fas fa-wifi"></i>
                    <i class="fas fa-location-dot"></i>
                    <i class="fas fa-battery-three-quarters"></i>
                </div>
            </div>

            <header id="main-header" onclick="DREAM_CORE.handleGhostTap()" style="text-align:center; padding:20px; cursor:pointer;">
                <p style="font-family:'Amiri',serif; font-size:26px; color:#10b981; margin:0;">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                <div id="sys-clock" style="font-size:20px; color:#fff; font-family:monospace; font-weight:bold;">00:00:00</div>
            </header>

            <div id="module-grid" style="display:grid; grid-template-columns:repeat(3,1fr); gap:12px; padding:15px;">
                ${this.modules.map(m => `
                    <div onclick="window.DREAM_NAV('${m.id}')" class="mod-card" style="background:rgba(15,23,42,0.7); border:1px solid ${m.color}33; padding:15px; border-radius:18px; text-align:center; transition:0.3s;">
                        <div style="background:${m.color}22; width:50px; height:50px; border-radius:14px; display:flex; align-items:center; justify-content:center; margin:0 auto 10px;">
                            <i class="fas ${m.icon}" style="color:${m.color}; font-size:22px;"></i>
                        </div>
                        <div style="font-size:9px; font-weight:bold; letter-spacing:1px; color:#cbd5e1;">${m.name.toUpperCase()}</div>
                    </div>
                `).join('')}
            </div>

            <main id="main-viewport" style="display:none; padding:20px; animation: slideUp 0.4s ease;"></main>

            <nav id="bottom-nav" style="position:fixed; bottom:0; width:100%; background:rgba(2,6,23,0.95); backdrop-filter:blur(20px); display:flex; justify-content:space-around; align-items:center; padding:12px; border-top:1px solid #10b98122; z-index:1000;">
                <i class="fas fa-home" onclick="location.reload()" style="color:#10b981; font-size:20px;"></i>
                <i class="fas fa-user-circle" style="color:#64748b; font-size:20px;"></i>
                <div onclick="window.DREAM_NAV('qr')" style="background:#10b981; color:#000; width:55px; height:55px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-top:-35px; border:5px solid #020617; box-shadow:0 5px 15px rgba(16,185,129,0.3);">
                    <i class="fas fa-qrcode" style="font-size:24px;"></i>
                </div>
                <i class="fas fa-info-circle" style="color:#64748b; font-size:20px;"></i>
                <i class="fas fa-cog" style="color:#64748b; font-size:20px;"></i>
            </nav>
        `;
        this.startClock();
    },

    handleGhostTap() {
        this.taps++;
        if (this.taps === CONFIG.ghost.tapCount) {
            const code = prompt("🔑 GHOST ARCHITECT CODE:");
            if(code === CONFIG.ghost.code) alert("👻 GHOST MODE ACTIVE");
            this.taps = 0;
        }
        setTimeout(() => this.taps = 0, 2000);
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

window.DREAM_NAV = async (id) => {
    const mod = DREAM_CORE.modules.find(m => m.id === id);
    if(!mod) return;
    const grid = document.getElementById('module-grid');
    const viewport = document.getElementById('main-viewport');
    grid.style.display = 'none';
    viewport.style.display = 'block';
    viewport.innerHTML = `<div style="text-align:center; padding:50px;"><i class="fas fa-spinner fa-spin"></i> Bismillah...</div>`;
    try {
        const module = await import(mod.path);
        viewport.innerHTML = await module.default.render();
    } catch (e) {
        viewport.innerHTML = `<div style="color:#ef4444; text-align:center;">Module ${id} Belum Siap</div>`;
    }
};

DREAM_CORE.init();

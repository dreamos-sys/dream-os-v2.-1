console.log("💎 Core: AI Super Agent Integrated System Active!");

function renderApp() {
    const app = document.getElementById('app');
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'none';
    
    app.innerHTML = `
        <div class="header-enterprise">
            <div class="header-top">
                <i class="fas fa-bars"></i>
                <div class="logo-text">DREAM OS <span>Sovereign</span></div>
                <div class="header-icons">
                    <i class="fas fa-envelope"></i>
                    <div class="status-dot"></div>
                </div>
            </div>
            <h1 class="bismillah-neon">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</h1>
            <p class="tagline">The Power Soul of Shalawat</p>
            <div class="user-greet">
                📡 Supabase: Connected | Assalamu'alaikum, <strong>Master M</strong><br>
                <span>Depok, Maghrib 20:02</span>
            </div>
        </div>

        <div class="main-grid">
            <div class="card-agent" onclick="loadModule('commandcenter')"><div class="badge">LIMITED</div><div class="icon-circle c-1"><i class="fas fa-chart-line"></i></div><p>COMMAND CENTER</p><span>Pusat kendali</span></div>
            <div class="card-agent" onclick="loadModule('booking')"><div class="icon-circle c-2"><i class="fas fa-calendar-check"></i></div><p>BOOKING</p><span>Pemesanan ruangan</span></div>
            <div class="card-agent" onclick="loadModule('k3')"><div class="icon-circle c-3"><i class="fas fa-exclamation-triangle"></i></div><p>K3</p><span>Keselamatan & kesehatan</span></div>
            <div class="card-agent" onclick="loadModule('sekuriti')"><div class="icon-circle c-4"><i class="fas fa-shield-alt"></i></div><p>SEKURITI</p><span>Keamanan & kehilangan</span></div>
            <div class="card-agent" onclick="loadModule('janitor-indoor')"><div class="icon-circle c-5"><i class="fas fa-broom"></i></div><p>JANITOR IN</p><span>Kebersihan indoor</span></div>
            <div class="card-agent" onclick="loadModule('janitor-outdoor')"><div class="icon-circle c-6"><i class="fas fa-leaf"></i></div><p>JANITOR OUT</p><span>Kebersihan outdoor</span></div>
            <div class="card-agent" onclick="loadModule('stok')"><div class="icon-circle c-7"><i class="fas fa-boxes"></i></div><p>STOK</p><span>Peralatan & inventaris</span></div>
            <div class="card-agent" onclick="loadModule('maintenance')"><div class="icon-circle c-8"><i class="fas fa-tools"></i></div><p>MAINTENANCE</p><span>Perbaikan & kerusakan</span></div>
            <div class="card-agent" onclick="loadModule('asset')"><div class="icon-circle c-9"><i class="fas fa-building"></i></div><p>ASSET</p><span>Inventaris & gudang</span></div>
        </div>

        <div class="nav-bottom">
            <div class="nav-link active"><i class="fas fa-home"></i><span>Home</span></div>
            <div class="nav-link"><i class="fas fa-user-circle"></i><span>Profile</span></div>
            <div class="nav-qr-wrapper">
                <div class="nav-qr-btn"><i class="fas fa-qrcode"></i></div>
                <span class="qr-label">QRIS</span>
            </div>
            <div class="nav-link"><i class="fas fa-info-circle"></i><span>About</span></div>
            <div class="nav-link"><i class="fas fa-cog"></i><span>Setting</span></div>
        </div>

        <style>
            :root { --p-green: #10b981; --bg-dark: #0f172a; --card-bg: rgba(30, 41, 59, 0.7); }
            body { background: var(--bg-dark); color: white; font-family: 'Inter', sans-serif; margin: 0; padding-bottom: 100px; overflow-x: hidden; }
            
            .header-enterprise { padding: 25px 20px; background: linear-gradient(180deg, rgba(16, 185, 129, 0.15) 0%, transparent 100%); border-bottom: 1px solid rgba(255,255,255,0.05); }
            .header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
            .logo-text { font-weight: 800; letter-spacing: 1px; color: var(--p-green); }
            .logo-text span { color: white; font-weight: 300; font-size: 12px; }
            .header-icons { position: relative; font-size: 20px; }
            .status-dot { position: absolute; top: -2px; right: -2px; width: 8px; height: 8px; background: #22c55e; border-radius: 50%; border: 2px solid var(--bg-dark); }
            
            .bismillah-neon { text-align: center; color: var(--p-green); font-size: 24px; text-shadow: 0 0 15px var(--p-green); margin: 10px 0 0; }
            .tagline { text-align: center; font-size: 9px; letter-spacing: 3px; color: #64748b; text-transform: uppercase; margin-bottom: 20px; }
            .user-greet { font-size: 14px; border-left: 3px solid var(--p-green); padding-left: 12px; }
            .user-greet span { font-size: 11px; color: #94a3b8; }

            .main-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 15px; }
            .card-agent { background: var(--card-bg); border: 1px solid rgba(255,255,255,0.03); border-radius: 20px; padding: 15px 5px; text-align: center; position: relative; transition: 0.3s; }
            .card-agent:active { transform: scale(0.95); background: rgba(16, 185, 129, 0.1); }
            .icon-circle { width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-size: 20px; }
            .c-1 { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
            .c-2 { background: rgba(16, 185, 129, 0.2); color: #10b981; }
            .c-3 { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
            .c-4 { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
            .c-5 { background: rgba(139, 92, 246, 0.2); color: #8b5cf6; }
            .c-6 { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
            .c-7 { background: rgba(249, 115, 22, 0.2); color: #f97316; }
            .c-8 { background: rgba(100, 116, 139, 0.2); color: #64748b; }
            .c-9 { background: rgba(20, 184, 166, 0.2); color: #14b8a6; }
            
            .card-agent p { font-size: 9px; font-weight: 800; margin: 0; color: #f1f5f9; letter-spacing: 0.5px; }
            .card-agent span { font-size: 8px; color: #64748b; }
            .badge { position: absolute; top: 8px; right: 8px; background: #f59e0b; color: #000; font-size: 6px; font-weight: 900; padding: 2px 5px; border-radius: 5px; }

            .nav-bottom { position: fixed; bottom: 0; width: 100%; height: 80px; background: #1e293b; display: flex; justify-content: space-around; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); z-index: 1000; padding-bottom: env(safe-area-inset-bottom); }
            .nav-link { display: flex; flex-direction: column; align-items: center; gap: 5px; color: #64748b; transition: 0.3s; }
            .nav-link i { font-size: 20px; }
            .nav-link span { font-size: 10px; font-weight: 500; }
            .nav-link.active { color: var(--p-green); }
            
            .nav-qr-wrapper { display: flex; flex-direction: column; align-items: center; margin-top: -45px; }
            .nav-qr-btn { width: 60px; height: 60px; background: var(--p-green); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; color: white; border: 6px solid var(--bg-dark); box-shadow: 0 5px 15px rgba(16, 185, 129, 0.4); }
            .qr-label { margin-top: 5px; font-size: 10px; font-weight: 800; color: var(--p-green); }
        </style>
    `;
}

// 🚀 SMART MODULE LOADER - GLOBAL ENTERPRISE STANDARD
async function loadModule(moduleName) {
    console.log(`📡 Ghost Architect: Loading Module [${moduleName}]...`);
    const app = document.getElementById('app');
    
    // Tampilkan Loading Ghaib
    app.innerHTML = `<div style="display:flex; justify-content:center; align-items:center; height:100vh; color:#10b981;">
        <i class="fas fa-spinner fa-spin" style="font-size:3rem;"></i>
    </div>`;

    try {
        // Panggil file yang barusan lo kumpulin di root
        const script = document.createElement('script');
        script.src = `modules/${moduleName}.js`;
        script.onload = () => {
            console.log(`✅ Module [${moduleName}] Loaded!`);
            // Di sini kita asumsikan tiap module punya fungsi render-nya sendiri
            if (window.renderModule) window.renderModule();
        };
        document.body.appendChild(script);
    } catch (err) {
        console.error("❌ Loader Error:", err);
    }
}

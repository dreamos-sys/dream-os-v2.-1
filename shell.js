/**
 * ══════════════════════════════════════════════════════════════
 * DREAM OS v2.1 - ULTIMATE ENTERPRISE EDITION
 * The Power Soul of Shalawat - Limited Edition 2026
 * ══════════════════════════════════════════════════════════════
 */

console.log('💚 Dream OS v2.1 Ultimate - بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ');

const CONFIG = {
    version: '2.1.0-ultimate',
    supabase: {
        url: 'https://lfavawkzvdhdpaaplaiq.supabase.co',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmYXZhd2t6dmRoZHBhYXBsYWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5Mjc0NjgsImV4cCI6MjA4OTUwMzQ2OH0.EhwnhAd20lUVaWHHB51UdWCGWxkyTaWIrsPY8xvhwE00'
    },
    ghost: { tapCount: 5, code: 'dreamos2026' }
};

const ROLE_CONFIG = {
    master: { level: 100, passwords: ['b15m1ll4h_012443410', 'Mr.M_Architect_2025'], displayName: 'Master M' },
    admin: { level: 90, passwords: ['4dm1n_AF6969@00'], displayName: 'Administrator' },
    maintenance: { level: 65, passwords: ['M41n_4F@234'], displayName: 'Technician' }
};

// State & Auth Logic
const appState = {
    getRole: () => sessionStorage.getItem('dreamos_role') || 'guest',
    getUser: () => sessionStorage.getItem('dreamos_user') || 'Guest'
};

function renderApp() {
    const loading = document.getElementById('loading-screen');
    if(loading) { loading.style.opacity = '0'; setTimeout(() => loading.style.display = 'none', 500); }

    document.getElementById('app-shell').innerHTML = `
        <header id="islamic-header" style="border:1px solid #d4af37; border-radius:24px; padding:25px; margin:16px; text-align:center; background:rgba(212,175,55,0.05); cursor:pointer;">
            <p style="font-size:24px; color:#d4af37; font-family:serif; margin:0;">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <p style="color:#64748b; font-size:10px; letter-spacing:4px; margin-top:10px;">THE POWER SOUL OF SHALAWAT</p>
        </header>

        <div style="padding:20px; text-align:center;">
            <div style="position:relative; display:inline-block;">
                <img src="./assets/img/icon-512.png" style="width:140px; border-radius:25px; box-shadow: 0 0 30px rgba(212,175,55,0.4); margin-bottom:20px;">
            </div>
            <h3 style="color:#d4af37; font-family:sans-serif; font-weight:bold; letter-spacing:1px;">Sovereign Operational</h3>
            <p style="color:#64748b; font-size:12px;">v${CONFIG.version} - Enterprise Ready</p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; padding:16px; margin-bottom:100px;">
            <div style="background:rgba(212,175,55,0.05); border:1px solid rgba(212,175,55,0.2); border-radius:15px; padding:15px; text-align:center;">
                <i class="fas fa-boxes-stacked" style="color:#d4af37; font-size:20px;"></i>
                <div style="font-size:10px; color:#fff; margin-top:5px;">Stok</div>
            </div>
            <div style="background:rgba(212,175,55,0.05); border:1px solid rgba(212,175,55,0.2); border-radius:15px; padding:15px; text-align:center;">
                <i class="fas fa-screwdriver-wrench" style="color:#d4af37; font-size:20px;"></i>
                <div style="font-size:10px; color:#fff; margin-top:5px;">Maintenance</div>
            </div>
            <div style="background:rgba(212,175,55,0.05); border:1px solid rgba(212,175,55,0.2); border-radius:15px; padding:15px; text-align:center;">
                <i class="fas fa-shield-halved" style="color:#d4af37; font-size:20px;"></i>
                <div style="font-size:10px; color:#fff; margin-top:5px;">Security</div>
            </div>
        </div>

        <nav style="position:fixed; bottom:0; left:0; right:0; background:rgba(2,6,23,0.98); border-top:1px solid rgba(212,175,55,0.3); display:flex; justify-content:space-around; padding:15px; backdrop-filter:blur(15px); z-index:1000;">
            <button onclick="location.reload()" style="background:none; border:none; color:#d4af37; text-align:center;">
                <i class="fas fa-home"></i><br><span style="font-size:10px;">Home</span>
            </button>
            <button style="background:none; border:none; color:#64748b; text-align:center;">
                <i class="fas fa-qrcode"></i><br><span style="font-size:10px;">QR</span>
            </button>
            <button style="background:none; border:none; color:#64748b; text-align:center;">
                <i class="fas fa-user-shield"></i><br><span style="font-size:10px;">User</span>
            </button>
            <button style="background:none; border:none; color:#64748b; text-align:center;">
                <i class="fas fa-cog"></i><br><span style="font-size:10px;">Setup</span>
            </button>
            <button onclick="sessionStorage.clear(); location.reload();" style="background:none; border:none; color:#ef4444; text-align:center;">
                <i class="fas fa-power-off"></i><br><span style="font-size:10px;">Exit</span>
            </button>
        </nav>
    `;

    // Ghost Mode Logic
    let taps = 0;
    document.getElementById('islamic-header').onclick = () => {
        taps++;
        if(taps === CONFIG.ghost.tapCount) { 
            const code = prompt('Ghost Code?');
            if(code === CONFIG.ghost.code) alert('👻 Ghost Architect Mode Active'); 
            taps = 0; 
        }
        setTimeout(() => taps = 0, 2000);
    };
}

// Init Function
window.onload = () => {
    if(!sessionStorage.getItem('dreamos_role')) {
        // Simple fallback login if session empty
        const pw = prompt('Enter Sovereign Key:');
        let success = false;
        for (const [role, cfg] of Object.entries(ROLE_CONFIG)) {
            if (cfg.passwords.includes(pw)) {
                sessionStorage.setItem('dreamos_role', role);
                sessionStorage.setItem('dreamos_user', cfg.displayName);
                success = true; break;
            }
        }
        if(success) renderApp(); else location.reload();
    } else {
        renderApp();
    }
};

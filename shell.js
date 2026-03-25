/**
 * DREAM OS v2.1 - SOVEREIGN ENTERPRISE EDITION
 */

const CONFIG = {
    version: '2.1.0-sovereign',
    supabase: {
        url: 'https://lfavawkzvdhdpaaplaiq.supabase.co',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmYXZhd2t6dmRoZHBhYXBsYWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5Mjc0NjgsImV4cCI6MjA4OTUwMzQ2OH0.EhwnhAd20lUVaWHHB51UdWCGWxkyTaWIrsPY8xvhwE00'
    }
};

const Auth = {
    check() { return sessionStorage.getItem('dreamos_role'); },
    logout() { sessionStorage.clear(); location.reload(); }
};

window.renderApp = function() {
    const loading = document.getElementById('loading-screen');
    if(loading) loading.style.display = 'none';
    
    document.getElementById('app-shell').innerHTML = `
        <header id="islamic-header" style="border:1px solid #d4af37;border-radius:20px;padding:20px;margin:16px;text-align:center;cursor:pointer;background:rgba(212,175,55,0.05);">
            <p style="font-size:24px;color:#d4af37;font-family:'Amiri',serif;margin:0;">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <p style="color:#64748b;font-size:10px;letter-spacing:3px;margin:10px 0 0 0;">THE POWER SOUL OF SHALAWAT</p>
        </header>
        
        <div id="main-content" style="padding:20px;text-align:center;color:#fff;">
            <h2 style="color:#d4af37;">Sovereign Dashboard</h2>
            <p style="color:#64748b;font-size:14px;">System is now operational.</p>
        </div>

        <nav style="position:fixed;bottom:0;left:0;right:0;background:#020617;border-top:1px solid rgba(212,175,55,0.3);display:flex;justify-content:space-around;padding:15px;backdrop-filter:blur(10px);">
            <button onclick="location.reload()" style="background:none;border:none;color:#d4af37;text-align:center;"><i class="fas fa-home"></i><br><span style="font-size:10px;">Home</span></button>
            <button style="background:none;border:none;color:#64748b;text-align:center;"><i class="fas fa-qrcode"></i><br><span style="font-size:10px;">QR</span></button>
            <button style="background:none;border:none;color:#64748b;text-align:center;"><i class="fas fa-user-shield"></i><br><span style="font-size:10px;">Profile</span></button>
            <button style="background:none;border:none;color:#64748b;text-align:center;"><i class="fas fa-cog"></i><br><span style="font-size:10px;">Setup</span></button>
            <button onclick="sessionStorage.clear();location.reload()" style="background:none;border:none;color:#ef4444;text-align:center;"><i class="fas fa-power-off"></i><br><span style="font-size:10px;">Exit</span></button>
        </nav>
    `;

    // 5x Tap Ghost Mode
    let taps = 0;
    document.getElementById('islamic-header').onclick = () => {
        taps++;
        if(taps === 5) { alert('Ghost Mode Triggered'); taps = 0; }
        setTimeout(() => taps = 0, 2000);
    };
};

// Auto Start
if(document.readyState === 'complete') window.renderApp();
else window.addEventListener('load', window.renderApp);

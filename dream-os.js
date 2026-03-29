// 🧬 DREAM OS v13.0 - THE PERFECT FIVE NAVIGATION
// Concept: Home | Profile | QR (Center) | About | Setting

let ghostClicks = 0;

window.onload = () => {
    if (!localStorage.getItem('dream_os_session')) { renderLogin(); } 
    else { renderDashboard(); }
};

function renderLogin() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div style="background:#000; min-height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; font-family:sans-serif;">
            <img src="assets/img/icon-512.png" style="width:110px; border-radius:25px; margin-bottom:20px; box-shadow:0 0 20px rgba(251,191,36,0.2);">
            <h2 style="color:#10b981; margin:0;">DREAM OS</h2>
            <p style="color:#475569; font-size:12px; margin-bottom:30px;">Bismillah bi idznillah</p>
            <input type="password" id="p" placeholder="••••" style="width:250px; padding:15px; background:#111; color:#fff; border:1px solid #222; border-radius:10px; text-align:center; margin-bottom:20px;">
            <button onclick="localStorage.setItem('dream_os_session','1');renderDashboard()" style="width:280px; padding:15px; background:#10b981; color:#fff; border:none; border-radius:10px; font-weight:bold;">ENTER SYSTEM</button>
        </div>
    `;
}

function renderDashboard() {
    const app = document.getElementById('app');
    const mods = [
        {n:'Command', e:'⚡'}, {n:'Booking', e:'📅'}, {n:'K3', e:'⚠️'},
        {n:'Sekuriti', e:'🛡️'}, {n:'Janitor In', e:'🧹'}, {n:'Janitor Out', e:'🌳'},
        {n:'Stok', e:'📦'}, {n:'Maint.', e:'🔧'}, {n:'Asset', e:'🗄️'}
    ];

    app.innerHTML = `
        <div style="background:#000; min-height:100vh; color:#fff; font-family:sans-serif; display:flex; flex-direction:column; align-items:center;">
            
            <div style="text-align:center; padding:20px 0; width:100%; background:linear-gradient(to bottom, #0f172a, #000);">
                <p style="margin:0; font-size:12px; color:#10b981; letter-spacing:3px; font-weight:bold;">BISMILLAH BI IDZNILLAH</p>
                <div onclick="triggerGhost()" style="margin:10px auto; cursor:pointer; width:32px;">
                    <img src="assets/img/apple-touch-icon.png" style="width:32px; height:32px; filter: drop-shadow(0 0 8px #fbbf24);">
                </div>
                <p style="margin:0; font-size:14px; color:#94a3b8; font-family:serif;">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</p>
            </div>

            <div style="width:92%; max-width:400px; height:100px; background:rgba(30,41,59,0.25); border-radius:15px; margin:10px 0 20px; display:flex; align-items:center; justify-content:center; border:1px solid #1e293b;">
                <div style="text-align:center;">
                    <p style="margin:0; font-size:10px; color:#fbbf24; font-weight:bold;">ISO 27001 - SECURE SYSTEM</p>
                    <p style="margin:0; font-size:8px; color:#64748b;">DREAM TEAM SOVEREIGN CORE</p>
                </div>
            </div>

            <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:12px; width:92%; max-width:400px; margin-bottom:120px;">
                ${mods.map(m => `
                    <div style="background:rgba(20,20,20,0.6); aspect-ratio:1/1; border-radius:18px; display:flex; flex-direction:column; justify-content:center; align-items:center; border:1px solid #1a1a1a;">
                        <span style="font-size:26px; margin-bottom:5px;">${m.e}</span>
                        <span style="font-size:8px; color:#444; font-weight:bold; text-transform:uppercase;">${m.n}</span>
                    </div>
                `).join('')}
            </div>

            <div style="position:fixed; bottom:25px; width:94%; max-width:450px; height:75px; background:rgba(10,10,10,0.96); backdrop-filter:blur(25px); border-radius:28px; display:flex; justify-content:space-around; align-items:center; border:1px solid #222; box-shadow:0 15px 50px rgba(0,0,0,1);">
                
                <div onclick="renderDashboard()" style="text-align:center; flex:1;">
                    <div style="font-size:20px; color:#10b981;">🏠</div>
                    <div style="font-size:7px; color:#10b981; margin-top:3px;">HOME</div>
                </div>

                <div style="text-align:center; flex:1;">
                    <div style="font-size:20px; color:#64748b;">👤</div>
                    <div style="font-size:7px; color:#64748b; margin-top:3px;">PROFILE</div>
                </div>

                <div style="flex:1.2; display:flex; justify-content:center;">
                    <div style="background:#10b981; width:60px; height:60px; border-radius:20px; display:flex; align-items:center; justify-content:center; margin-top:-40px; border:4px solid #000; box-shadow:0 8px 25px rgba(16,185,129,0.4);">
                        <div style="font-size:28px; color:#fff;">🔳</div>
                    </div>
                </div>

                <div style="text-align:center; flex:1;">
                    <div style="font-size:20px; color:#64748b;">ℹ️</div>
                    <div style="font-size:7px; color:#64748b; margin-top:3px;">ABOUT</div>
                </div>

                <div style="text-align:center; flex:1;">
                    <div style="font-size:20px; color:#64748b;">⚙️</div>
                    <div style="font-size:7px; color:#64748b; margin-top:3px;">SETTING</div>
                </div>

            </div>
        </div>
    `;
}

function triggerGhost() {
    ghostClicks++;
    if(ghostClicks === 5) {
        window.girangati.executeWasm("GHOST_SHIELD_ACTIVATE"); alert("🛡️ GHOST MODE ACTIVE");
        ghostClicks = 0;
    }
    setTimeout(() => { ghostClicks = 0; }, 2500);
}

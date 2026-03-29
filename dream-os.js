// 🖥️ DREAM OS PRO GLOBAL - SYSTEM INTEGRATED
let secretClicks = 0;

window.onload = () => {
    if (!localStorage.getItem('dream_os_session')) renderLogin();
    else renderDashboard();
};

window.addEventListener('dream_os_sync', (e) => {
    const status = document.getElementById('ai-status');
    if(status) status.innerText = e.detail;
});

function renderDashboard() {
    const app = document.getElementById('app');
    const mods = [
        {n:'Command', e:'⚡'}, {n:'Booking', e:'📅'}, {n:'K3', e:'⚠️'},
        {n:'Sekuriti', e:'🛡️'}, {n:'Janitor In', e:'🧹'}, {n:'Janitor Out', e:'🌳'},
        {n:'Stok', e:'📦'}, {n:'Maint.', e:'🔧'}, {n:'Asset', e:'🗄️'}
    ];

    app.innerHTML = `
        <div style="background:#000; min-height:100vh; color:#fff; font-family:sans-serif; display:flex; flex-direction:column; align-items:center;">
            
            <div style="text-align:center; padding:20px 0; width:100%; background:linear-gradient(to bottom, #064e3b, #000);">
                <p style="margin:0; font-size:12px; color:#10b981; letter-spacing:4px; font-weight:bold;">BISMILLAH BI IDZNILLAH</p>
                <div onclick="triggerGhost()" style="margin:10px auto; cursor:pointer; width:35px;">
                    <img src="assets/img/apple-touch-icon.png" style="width:35px; filter: drop-shadow(0 0 10px #fbbf24);">
                </div>
                <p style="margin:0; font-size:14px; color:#94a3b8;">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</p>
                <p id="ai-status" style="margin-top:8px; font-size:9px; color:#10b981; font-style:italic;">Initializing Smart Agent...</p>
            </div>

            <div style="width:92%; max-width:400px; height:90px; background:rgba(16,185,129,0.1); border-radius:20px; margin:15px 0; border:1px solid #065f46; display:flex; align-items:center; justify-content:center;">
                <p style="font-size:11px; color:#fbbf24; font-weight:bold;">Sovereign Global System Integrated</p>
            </div>

            <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:12px; width:92%; max-width:400px; margin-bottom:100px;">
                ${mods.map(m => `
                    <div onclick="window.girangati.babyAgent.analyze('Opening ${m.n}')" style="background:#0a0a0a; aspect-ratio:1/1; border-radius:20px; display:flex; flex-direction:column; justify-content:center; align-items:center; border:1px solid #111;">
                        <span style="font-size:28px; margin-bottom:5px;">${m.e}</span>
                        <span style="font-size:8px; color:#444; font-weight:bold;">${m.n.toUpperCase()}</span>
                    </div>
                `).join('')}
            </div>

            <div style="position:fixed; bottom:25px; width:90%; max-width:450px; height:75px; background:rgba(10,10,10,0.98); border-radius:30px; display:flex; justify-content:space-around; align-items:center; border:1px solid #222;">
                <div onclick="location.reload()" style="text-align:center;"><div style="font-size:20px;">🏠</div><div style="font-size:7px; color:#666;">HOME</div></div>
                <div style="text-align:center;"><div style="font-size:20px;">👤</div><div style="font-size:7px; color:#666;">PROFILE</div></div>
                <div style="background:#10b981; width:60px; height:60px; border-radius:22px; margin-top:-45px; display:flex; align-items:center; justify-content:center; border:4px solid #000;"><div style="font-size:28px;">🔳</div></div>
                <div style="text-align:center;"><div style="font-size:20px;">ℹ️</div><div style="font-size:7px; color:#666;">ABOUT</div></div>
                <div style="text-align:center;"><div style="font-size:20px;">⚙️</div><div style="font-size:7px; color:#666;">SETTING</div></div>
            </div>
        </div>
    `;
}

function triggerGhost() {
    secretClicks++;
    if(secretClicks === 5) {
        window.girangati.babyAgent.analyze("GHOST_ACCESS_GRANTED");
        alert("🛡️ GHOST MODE ACTIVE");
        secretClicks = 0;
    }
    setTimeout(() => { secretClicks = 0; }, 3000);
}

function renderLogin() {
    document.getElementById('app').innerHTML = `<div style="background:#000; height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center;"><img src="assets/img/icon-512.png" style="width:100px; border-radius:20px; margin-bottom:20px;"><button onclick="localStorage.setItem('dream_os_session','1');location.reload();" style="padding:15px 50px; background:#10b981; border:none; border-radius:10px; color:#fff; font-weight:bold;">LOGIN</button></div>`;
}

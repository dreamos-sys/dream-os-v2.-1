// DREAM OS v2.1 - AUTO-SECURITY CORE (RESTORED)
(function() {
    'use strict';
    let attempts = 0;
    let isLocked = false;

    // Inject CSS
    const s = document.createElement('style');
    s.textContent = `
        :root { --pearl: #e0f2f1; --accent: #10b981; }
        body { margin: 0; background: linear-gradient(135deg, #e0f2f1, #b2dfdb); min-height: 100vh; font-family: sans-serif; }
        #app-shell { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; }
        .login-box { background: #4a148c; padding: 40px; border-radius: 20px; text-align: center; color: white; box-shadow: 0 10px 25px rgba(0,0,0,0.2); width: 85%; max-width: 320px; }
        .input-group { position: relative; margin: 25px 0; }
        input { width: 100%; padding: 12px; border-radius: 25px; border: none; text-align: center; outline: none; box-sizing: border-box; font-weight: bold; }
        .eye-icon { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #4a148c; font-size: 1.2rem; }
        .btn-v { background: var(--accent); color: white; border: none; padding: 12px 30px; border-radius: 25px; cursor: pointer; font-weight: bold; width: 100%; }
        #dashboard { display: none; width: 100%; padding: 20px; box-sizing: border-box; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; text-align: center; margin-top: 20px; }
        .tile img { width: 60px; height: 60px; object-fit: contain; }
    `;
    document.head.appendChild(s);

    // Render HTML
    document.body.innerHTML = `
        <div id="app-shell">
            <div id="login-screen" class="login-box">
                <img src="assets/img/icon-192.png" width="80">
                <div style="margin: 10px 0;">بِسْمِ اللّٰهِ</div>
                <div style="font-size: 0.6rem; opacity: 0.7;">DREAM OS v2.1 Enterprise</div>
                <div class="input-group">
                    <input type="password" id="p" placeholder="ACCESS KEY">
                    <span class="eye-icon" onclick="DREAM.t()">👁️</span>
                </div>
                <button id="v-btn" class="btn-v" onclick="DREAM.v()">VERIFIKASI</button>
                <div id="msg" style="font-size: 0.7rem; margin-top: 10px; color: #ffeb3b;"></div>
            </div>
            <div id="dashboard">
                <h3 style="text-align:center; color:#004d40;">Dream OS | Serene Core</h3>
                <div class="grid" id="module-grid"></div>
            </div>
        </div>
    `;

    window.DREAM = {
        t: function() {
            const p = document.getElementById('p');
            p.type = p.type === "password" ? "text" : "password";
        },
        v: function() {
            if(isLocked) return;
            const p = document.getElementById('p').value;
            const msg = document.getElementById('msg');
            
            if(p === "DREAM13") {
                document.getElementById('login-screen').style.display = 'none';
                document.getElementById('dashboard').style.display = 'block';
                this.render();
            } else {
                attempts++;
                if(attempts >= 3) {
                    isLocked = true;
                    msg.innerText = "SISTEM TERKUNCI 5 MENIT (3x SALAH)";
                    setTimeout(() => { isLocked = false; attempts = 0; msg.innerText = ""; }, 300000);
                } else {
                    msg.innerText = "AKSES DITOLAK! (" + attempts + "/3)";
                }
            }
        },
        render: function() {
            const mods = ['Gudang','Booking','Security','AI Hub','Settings','Sync','Asset','Report','Network'];
            document.getElementById('module-grid').innerHTML = mods.map(m => `
                <div class="tile"><img src="assets/img/icon-192.png"><div style="font-size:0.7rem;">${m}</div></div>
            `).join('');
        }
    };
})();

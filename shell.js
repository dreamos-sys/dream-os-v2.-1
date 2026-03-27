// ========== PASSWORD ==========
const PASSWORDS = {
    master: 'b15m1ll4h_012443410',
    admin: '4dm1n_AF6969@00'
};
let currentUser = null;

// ========== MODAL SYSTEM ==========
function createModal() {
    let modal = document.getElementById('module-modal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'module-modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.85);
        backdrop-filter: blur(8px);
        z-index: 10000;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: #0f172a;
        border-radius: 24px;
        max-width: 800px;
        width: 100%;
        max-height: 90%;
        overflow-y: auto;
        position: relative;
        border: 1px solid #10b981;
        box-shadow: 0 20px 35px rgba(0,0,0,0.5);
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: sticky;
        top: 10px;
        right: 10px;
        float: right;
        background: #10b981;
        border: none;
        color: #000;
        font-size: 24px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        margin: 10px;
        z-index: 1;
    `;
    closeBtn.onclick = () => modal.style.display = 'none';

    const modalBody = document.createElement('div');
    modalBody.id = 'modal-body';
    modalBody.style.padding = '20px';
    modalBody.style.color = '#e2e8f0';

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Tutup modal jika klik di luar konten
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    return modal;
}

async function loadModuleInModal(moduleId) {
    const modal = createModal();
    const modalBody = document.getElementById('modal-body');
    if (!modalBody) return;

    modalBody.innerHTML = '<div style="text-align:center; padding:20px;">⏳ Memuat modul...</div>';
    modal.style.display = 'flex';

    try {
        const module = await import(`./modules/${moduleId}/module.js`);
        const html = module.default.render({ user: currentUser, toast: (msg) => alert(msg) });
        modalBody.innerHTML = html;
        if (module.default.afterRender) module.default.afterRender({ user: currentUser });
    } catch (err) {
        console.error(err);
        modalBody.innerHTML = `<div style="background:#0f172a; padding:20px; border-radius:12px;">❌ Modul "${moduleId}" belum siap: ${err.message}</div>`;
    }
}

// ========== LOGIN MODAL ==========
function showLoginModal() {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.id = 'login-modal';
        modal.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.95);
            backdrop-filter: blur(8px);
            z-index: 20000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        modal.innerHTML = `
            <div style="background: #0f172a; border-radius: 28px; padding: 32px; width: 90%; max-width: 380px; border: 1px solid #10b981; text-align: center;">
                <i class="fas fa-dharmachakra" style="font-size: 48px; color: #10b981;"></i>
                <h2 style="color: #10b981; margin: 16px 0;">Dream OS</h2>
                <p style="color: #94a3b8; font-size: 12px;">Masukkan password</p>
                <input type="password" id="login-pw" placeholder="Password" autocomplete="off"
                    style="width: 100%; padding: 14px; margin: 16px 0; background: #1e293b; border: 1px solid #334155; border-radius: 16px; color: white;">
                <button id="login-submit" style="width: 100%; padding: 14px; background: #10b981; border: none; border-radius: 24px; font-weight: bold; cursor: pointer;">Login</button>
                <div id="login-error" style="color: #ef4444; font-size: 12px; margin-top: 12px;"></div>
            </div>
        `;
        document.body.appendChild(modal);

        const input = modal.querySelector('#login-pw');
        const submit = modal.querySelector('#login-submit');
        const errorDiv = modal.querySelector('#login-error');

        const attempt = () => {
            const pw = input.value.trim();
            if (pw === PASSWORDS.master) {
                currentUser = 'Master M';
                sessionStorage.setItem('user', 'master');
                modal.remove();
                resolve(true);
            } else if (pw === PASSWORDS.admin) {
                currentUser = 'Administrator';
                sessionStorage.setItem('user', 'admin');
                modal.remove();
                resolve(true);
            } else {
                errorDiv.innerText = 'Password salah!';
                input.value = '';
                input.focus();
            }
        };
        submit.onclick = attempt;
        input.onkeypress = (e) => { if (e.key === 'Enter') attempt(); };
        input.focus();
    });
}

// ========== RENDER DASHBOARD ==========
function renderApp() {
    document.getElementById('loading').style.display = 'none';
    const app = document.getElementById('app');
    const modules = window.MODULES || [];

    const cardsHtml = modules.map(mod => `
        <div class="card" data-module="${mod.id}">
            <div class="card-icon"><i class="fas ${mod.icon}"></i></div>
            <div class="card-title">${mod.name}</div>
            <div class="card-desc">${mod.description || ''}</div>
        </div>
    `).join('');

    app.innerHTML = `
        <div class="header">
            <div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            <div style="font-size: 12px; color: #94a3b8;">THE POWER SOUL OF SHALAWAT</div>
            <div style="margin-top: 20px;">Selamat datang, <strong>${currentUser}</strong></div>
        </div>
        <div class="grid" id="module-grid">${cardsHtml}</div>
        <div id="content" style="margin: 20px 0; text-align: center; color: #94a3b8;">Pilih menu di atas</div>
        <nav class="nav">
            <button data-page="home"><i class="fas fa-home"></i><br>Home</button>
            <button data-page="profile"><i class="fas fa-user"></i><br>Profile</button>
            <button data-page="settings"><i class="fas fa-cog"></i><br>Settings</button>
            <button id="logout-btn"><i class="fas fa-sign-out-alt"></i><br>Exit</button>
        </nav>
        <footer>DREAM TEAM © 2026 · v2.1</footer>
    `;

    // Card klik -> modal
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const moduleId = card.dataset.module;
            loadModuleInModal(moduleId);
        });
    });

    // Navigasi bawah juga modal
    document.querySelectorAll('.nav button').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            if (page === 'home') renderApp();
            else if (page === 'profile') loadModuleInModal('profile');
            else if (page === 'settings') loadModuleInModal('settings');
        });
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        sessionStorage.clear();
        location.reload();
    });
}

// ========== INIT ==========
window.onload = () => {
    const script = document.createElement('script');
    script.src = './modules-list.js';
    script.onload = () => {
        const saved = sessionStorage.getItem('user');
        if (saved === 'master' || saved === 'admin') {
            currentUser = saved === 'master' ? 'Master M' : 'Administrator';
            renderApp();
        } else {
            showLoginModal().then(() => renderApp());
        }
    };
    document.head.appendChild(script);
};

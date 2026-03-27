// ========== SUPABASE CLIENT ==========
const SUPABASE_URL = 'https://lfavawkzvdhdpaaplaiq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmYXZhd2t6dmRoZHBhYXBsYWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5Mjc0NjgsImV4cCI6MjA4OTUwMzQ2OH0.EhwnhAd20lUVaWHHB51UdWCGWxkyTaWIrsPY8xvhwE00';
let supabase = null;

// ========== GHOST STEALTH MODE ==========
function generateGhostPassword() {
    const now = new Date();
    const hour = now.getHours();
    let rakaat = 0;
    // Sederhana: berdasarkan waktu shalat wajib (wilayah Indonesia)
    if (hour >= 4 && hour < 6) rakaat = 2;      // Subuh
    else if (hour >= 12 && hour < 15) rakaat = 4; // Dzuhur
    else if (hour >= 15 && hour < 18) rakaat = 4; // Ashar
    else if (hour >= 18 && hour < 19) rakaat = 3; // Maghrib
    else if (hour >= 19 && hour < 20) rakaat = 4; // Isya
    else rakaat = 0;
    return `dreamos2026${rakaat}`;
}

// ========== LOGIN MODAL ==========
function showLoginModal() {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.id = 'login-modal';
        modal.style.cssText = `
            position: fixed; inset: 0; background: rgba(0,0,0,0.95);
            z-index: 10000; display: flex; align-items: center; justify-content: center;
            backdrop-filter: blur(8px);
        `;
        modal.innerHTML = `
            <div style="background: #0f172a; border-radius: 28px; padding: 32px; width: 90%; max-width: 380px; border: 1px solid #10b981;">
                <div style="text-align: center; margin-bottom: 24px;">
                    <i class="fas fa-dharmachakra" style="font-size: 48px; color: #10b981;"></i>
                    <h2 style="color: #10b981;">Dream OS</h2>
                    <p style="color: #94a3b8; font-size: 12px;">Enter your credentials</p>
                </div>
                <input type="text" id="login-username" placeholder="Username" autocomplete="off"
                    style="width: 100%; padding: 14px; margin-bottom: 16px; background: #1e293b; border: 1px solid #334155; border-radius: 16px; color: white;">
                <input type="password" id="login-password" placeholder="Password"
                    style="width: 100%; padding: 14px; margin-bottom: 24px; background: #1e293b; border: 1px solid #334155; border-radius: 16px; color: white;">
                <button id="login-submit" style="width: 100%; padding: 14px; background: #10b981; border: none; border-radius: 24px; font-weight: bold; font-size: 16px; cursor: pointer;">Login</button>
                <div id="login-error" style="color: #ef4444; font-size: 12px; margin-top: 12px; text-align: center;"></div>
            </div>
        `;
        document.body.appendChild(modal);

        const usernameInput = modal.querySelector('#login-username');
        const passwordInput = modal.querySelector('#login-password');
        const submitBtn = modal.querySelector('#login-submit');
        const errorDiv = modal.querySelector('#login-error');

        const attemptLogin = async () => {
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            if (!username || !password) {
                errorDiv.innerText = 'Please enter username and password';
                return;
            }
            const safeUsername = username.replace(/@/g, '_at_');
            const email = `${safeUsername}@dreamos.local`;
            try {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                // Get profile
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('role, full_name')
                    .eq('id', data.user.id)
                    .single();
                if (profileError) throw profileError;
                sessionStorage.setItem('dreamos_role', profile.role);
                sessionStorage.setItem('dreamos_user', profile.full_name || username);
                sessionStorage.setItem('dreamos_session', JSON.stringify(data.session));
                modal.remove();
                resolve(true);
            } catch (err) {
                console.error(err);
                errorDiv.innerText = 'Invalid username or password';
            }
        };
        submitBtn.onclick = attemptLogin;
        usernameInput.onkeypress = (e) => { if (e.key === 'Enter') attemptLogin(); };
        passwordInput.onkeypress = (e) => { if (e.key === 'Enter') attemptLogin(); };
        usernameInput.focus();
    });
}

// ========== GHOST MODE ACTIVATION ==========
let ghostModeActive = false;
function initGhostMode() {
    let tapCount = 0;
    const header = document.querySelector('.bismillah')?.closest('.header');
    if (!header) return;
    header.addEventListener('click', () => {
        tapCount++;
        setTimeout(() => tapCount = 0, 2000);
        if (tapCount === 5 && !ghostModeActive) {
            const code = prompt('👻 Enter Ghost Code:');
            const correctCode = generateGhostPassword();
            if (code === correctCode) {
                ghostModeActive = true;
                sessionStorage.setItem('ghost_mode', 'true');
                alert('👻 Ghost Stealth Mode Activated');
                if (window.DREAM && window.DREAM.navigate) window.DREAM.navigate('ghost');
            } else if (code !== null) {
                alert('Invalid Ghost Code');
            }
            tapCount = 0;
        }
    });
}

// ========== MODULE LOADER (modal) ==========
function createModal() {
    let modal = document.getElementById('module-modal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'module-modal';
    modal.style.cssText = `
        display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 10000;
        align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;
    `;
    const content = document.createElement('div');
    content.style.cssText = `
        background: #0f172a; border-radius: 24px; max-width: 600px; width: 100%;
        max-height: 90%; overflow-y: auto; position: relative; border: 1px solid #10b981;
    `;
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: sticky; top: 10px; right: 10px; float: right;
        background: #10b981; border: none; color: #000; font-size: 24px;
        width: 40px; height: 40px; border-radius: 50%; cursor: pointer; margin: 10px;
    `;
    closeBtn.onclick = () => modal.style.display = 'none';
    const body = document.createElement('div');
    body.id = 'modal-body';
    body.style.padding = '20px';
    body.style.color = '#e2e8f0';
    content.appendChild(closeBtn);
    content.appendChild(body);
    modal.appendChild(content);
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
    return modal;
}

async function loadModule(moduleId) {
    const modal = createModal();
    const modalBody = document.getElementById('modal-body');
    if (!modalBody) return;
    modalBody.innerHTML = '<div style="text-align:center; padding:20px;">⏳ Memuat modul...</div>';
    modal.style.display = 'flex';
    try {
        const module = await import(`./modules/${moduleId}/module.js`);
        const html = module.default.render({
            user: sessionStorage.getItem('dreamos_user'),
            role: sessionStorage.getItem('dreamos_role'),
            toast: (msg) => alert(msg),
            supabase
        });
        modalBody.innerHTML = html;
        if (module.default.afterRender) module.default.afterRender({ supabase, toast: alert });
    } catch (err) {
        console.error(err);
        modalBody.innerHTML = `<div style="background:#0f172a; padding:20px; border-radius:12px;">❌ Modul "${moduleId}" belum siap: ${err.message}</div>`;
    }
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
            <div style="margin-top: 20px;">Selamat datang, <strong>${sessionStorage.getItem('dreamos_user') || 'Guest'}</strong></div>
        </div>
        <div class="grid" id="module-grid">
            ${cardsHtml}
        </div>
        <div id="content" style="margin: 20px 0; text-align: center; color: #94a3b8;">Pilih menu di atas</div>
        <nav class="nav">
            <button data-page="home"><i class="fas fa-home"></i><br>Home</button>
            <button data-page="profile"><i class="fas fa-user"></i><br>Profile</button>
            <button data-page="settings"><i class="fas fa-cog"></i><br>Settings</button>
            <button id="logout-btn"><i class="fas fa-sign-out-alt"></i><br>Exit</button>
        </nav>
        <footer>DREAM TEAM © 2026 · v2.1</footer>
    `;

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => loadModule(card.dataset.module));
    });
    document.querySelectorAll('.nav button').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            if (page === 'home') renderApp();
            else if (page === 'profile') loadModule('profile');
            else if (page === 'settings') loadModule('settings');
        });
    });
    document.getElementById('logout-btn').addEventListener('click', async () => {
        await supabase.auth.signOut();
        sessionStorage.clear();
        location.reload();
    });
    initGhostMode();
}

// ========== INIT ==========
window.onload = async () => {
    if (typeof window.supabase === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        script.onload = async () => {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            await init();
        };
        document.head.appendChild(script);
    } else {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        await init();
    }
};

async function init() {
    const script = document.createElement('script');
    script.src = './modules-list.js';
    script.onload = async () => {
        const session = sessionStorage.getItem('dreamos_session');
        if (session) {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                renderApp();
                return;
            }
        }
        const success = await showLoginModal();
        if (success) renderApp();
        else alert('Login failed');
    };
    document.head.appendChild(script);
}

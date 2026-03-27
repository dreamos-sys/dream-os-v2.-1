const PASSWORDS = {
    master: 'b15m1ll4h_012443410',
    admin: '4dm1n_AF6969@00'
};

let currentUser = null;

function showLogin() {
    const pw = prompt('🔐 Masukkan password Dream OS:');
    if (pw === PASSWORDS.master) {
        currentUser = 'Master M';
        sessionStorage.setItem('user', 'master');
        renderApp();
    } else if (pw === PASSWORDS.admin) {
        currentUser = 'Administrator';
        sessionStorage.setItem('user', 'admin');
        renderApp();
    } else {
        alert('Password salah!');
        showLogin();
    }
}

function logout() {
    sessionStorage.clear();
    currentUser = null;
    location.reload();
}

function renderApp() {
    document.getElementById('loading').style.display = 'none';
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="header">
            <div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            <div style="font-size: 12px; color: #94a3b8;">THE POWER SOUL OF SHALAWAT</div>
            <div style="margin-top: 20px;">Selamat datang, <strong>${currentUser}</strong></div>
        </div>
        <div class="grid">
            <div class="card" data-module="inventory"><i class="fas fa-boxes"></i><div>Stok</div></div>
            <div class="card" data-module="maintenance"><i class="fas fa-screwdriver-wrench"></i><div>Maintenance</div></div>
            <div class="card" data-module="security"><i class="fas fa-shield-halved"></i><div>Security</div></div>
            <div class="card" data-module="report"><i class="fas fa-chart-line"></i><div>Report</div></div>
        </div>
        <div id="content" style="margin: 20px 0; text-align: center; color: #94a3b8;">Pilih menu di atas</div>
        <nav class="nav">
            <button data-page="home"><i class="fas fa-home"></i><br>Home</button>
            <button data-page="profile"><i class="fas fa-user"></i><br>Profile</button>
            <button data-page="settings"><i class="fas fa-cog"></i><br>Settings</button>
            <button onclick="logout()"><i class="fas fa-sign-out-alt"></i><br>Exit</button>
        </nav>
        <footer>DREAM TEAM © 2026 · v2.1</footer>
    `;
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const module = card.dataset.module;
            document.getElementById('content').innerHTML = `<div style="background:#0f172a; padding:20px; border-radius:12px;">📦 Module ${module} (coming soon)</div>`;
        });
    });
    document.querySelectorAll('.nav button').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            if (page === 'home') renderApp();
            else if (page === 'profile') document.getElementById('content').innerHTML = '<div style="background:#0f172a; padding:20px;">👤 Profile: ' + currentUser + '</div>';
            else if (page === 'settings') document.getElementById('content').innerHTML = '<div style="background:#0f172a; padding:20px;">⚙️ Settings page</div>';
        });
    });
}

window.onload = () => {
    const saved = sessionStorage.getItem('user');
    if (saved === 'master' || saved === 'admin') {
        currentUser = saved === 'master' ? 'Master M' : 'Administrator';
        renderApp();
    } else {
        showLogin();
    }
};

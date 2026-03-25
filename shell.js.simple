// Simple Dream OS
console.log('Simple Dream OS');

const PASSWORD = 'b15m1ll4h_012443410';

function showLogin() {
    document.getElementById('app-shell').innerHTML = `
        <div style="max-width:400px;margin:50px auto;padding:20px;background:rgba(15,23,42,0.8);border-radius:20px;text-align:center;">
            <h2 style="color:#10b981;">Dream OS</h2>
            <input type="password" id="pwd" style="width:100%;padding:12px;margin:15px 0;background:#0f172a;border:1px solid #10b981;border-radius:10px;color:white;">
            <button onclick="login()" style="background:#10b981;border:none;padding:12px 20px;border-radius:10px;cursor:pointer;">Login</button>
            <p style="margin-top:15px;font-size:11px;">Demo: b15m1ll4h_012443410</p>
        </div>
    `;
}

function showDashboard() {
    document.getElementById('app-shell').innerHTML = `
        <div style="max-width:600px;margin:0 auto;padding:20px;">
            <div style="text-align:center;margin-bottom:20px;">
                <h1 style="color:#10b981;">Dream OS</h1>
                <p>Welcome Master M</p>
            </div>
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">
                <div style="background:rgba(15,23,42,0.6);padding:15px;border-radius:12px;text-align:center;">Stok: 245</div>
                <div style="background:rgba(15,23,42,0.6);padding:15px;border-radius:12px;text-align:center;">Maintenance: 3</div>
                <div style="background:rgba(15,23,42,0.6);padding:15px;border-radius:12px;text-align:center;">Security: Active</div>
                <div style="background:rgba(15,23,42,0.6);padding:15px;border-radius:12px;text-align:center;">AI Chat</div>
            </div>
            <button onclick="logout()" style="margin-top:20px;background:#ef4444;border:none;padding:10px;border-radius:10px;width:100%;cursor:pointer;">Logout</button>
        </div>
    `;
}

window.login = function() {
    const pwd = document.getElementById('pwd').value;
    if (pwd === PASSWORD) {
        sessionStorage.setItem('logged_in', 'true');
        showDashboard();
    } else {
        alert('Wrong password');
    }
};

window.logout = function() {
    sessionStorage.clear();
    showLogin();
};

if (sessionStorage.getItem('logged_in') === 'true') {
    showDashboard();
} else {
    showLogin();
}

setTimeout(() => {
    const loading = document.getElementById('loading-screen');
    if (loading) loading.style.display = 'none';
}, 1000);

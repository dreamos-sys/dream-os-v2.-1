// modules/login/module.js
export default async function({ container }) {
    container.innerHTML = `
        <div style="min-height:80vh;display:flex;align-items:center;justify-content:center;padding:1rem;">
            <div style="background:rgba(15,23,42,0.65);backdrop-filter:blur(24px);border:1px solid rgba(16,185,129,0.2);border-radius:24px;padding:2rem;max-width:400px;width:100%;">
                <div style="text-align:center;margin-bottom:1.5rem;">
                    <div style="font-size:3rem;">🔐</div>
                    <h2 style="color:#10b981;">Ghost Mode Login</h2>
                    <p style="color:#94a3b8;font-size:0.875rem;">Masuk sebagai developer/architect</p>
                </div>
                <form onsubmit="handleGhostLogin(event)">
                    <div style="margin-bottom:1rem;">
                        <label style="color:#94a3b8;font-size:0.875rem;display:block;margin-bottom:0.25rem;">Username</label>
                        <input id="login-username" type="text" style="width:100%;background:rgba(255,255,255,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:8px;padding:0.75rem;color:white;" required>
                    </div>
                    <div style="margin-bottom:1.5rem;">
                        <label style="color:#94a3b8;font-size:0.875rem;display:block;margin-bottom:0.25rem;">Role</label>
                        <select id="login-role" style="width:100%;background:rgba(255,255,255,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:8px;padding:0.75rem;color:white;">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="developer" selected>Developer</option>
                            <option value="architect">Architect</option>
                        </select>
                    </div>
                    <button type="submit" style="width:100%;background:#10b981;color:white;padding:0.75rem;border:none;border-radius:8px;font-weight:600;cursor:pointer;">
                        🔓 Login
                    </button>
                </form>
                <div style="margin-top:1rem;text-align:center;">
                    <button onclick="DREAM.load('home')" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:0.875rem;">
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    `;

    window.handleGhostLogin = function(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const role = document.getElementById('login-role').value;
        window.DREAM.state.user = { name: username, role, loginTime: new Date().toISOString() };
        sessionStorage.setItem('dreamos-user', JSON.stringify(window.DREAM.state.user));
        window.DREAM.showToast(`Welcome, ${username}!`, 'success');
        setTimeout(() => window.DREAM.load('ghost'), 1000);
    };
}
export function cleanup() { delete window.handleGhostLogin; }

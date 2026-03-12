// modules/login/module.js
// Dream OS 2026 - Login Page for Ghost Module Access

export default async function({ container, utils, state }) {
    // Cek apakah user sudah login
    const savedUser = sessionStorage.getItem('dreamos-user');
    if (savedUser && window.DREAM) {
        window.DREAM.state.user = JSON.parse(savedUser);
        console.log('[LOGIN] User restored:', window.DREAM.state.user.name);
    }
    
    container.innerHTML = `
        <div style="min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 1rem;">
            <div style="
                background: var(--glass-bg);
                backdrop-filter: blur(24px);
                border: var(--glass-border);
                border-radius: var(--radius-xl);
                padding: 2rem;
                width: 100%;
                max-width: 400px;
                box-shadow: var(--glass-shadow);
            ">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">🔐</div>
                    <h1 style="color: var(--color-primary); font-size: 1.5rem; margin-bottom: 0.5rem;">
                        Dream OS Login
                    </h1>
                    <p style="color: var(--color-text-muted); font-size: 0.875rem;">
                        Enter credentials to access Ghost Mode
                    </p>
                </div>
                
                <form onsubmit="window.handleLogin(event)" style="display: flex; flex-direction: column; gap: 1rem;">
                    <div>
                        <label style="display: block; color: var(--color-text); font-size: 0.875rem; margin-bottom: 0.5rem;">
                            Username
                        </label>
                        <input 
                            id="login-username" 
                            type="text" 
                            placeholder="Your name"
                            required
                            style="
                                width: 100%;
                                background: rgba(255,255,255,0.08);
                                border: 1px solid var(--color-border);
                                border-radius: var(--radius-md);
                                padding: 0.75rem 1rem;
                                color: var(--color-text);
                                font-size: 1rem;
                                outline: none;
                            "
                        />
                    </div>
                    
                    <div>
                        <label style="display: block; color: var(--color-text); font-size: 0.875rem; margin-bottom: 0.5rem;">
                            Role
                        </label>
                        <select 
                            id="login-role" 
                            style="
                                width: 100%;
                                background: rgba(255,255,255,0.08);
                                border: 1px solid var(--color-border);
                                border-radius: var(--radius-md);
                                padding: 0.75rem 1rem;
                                color: var(--color-text);
                                font-size: 1rem;
                                outline: none;
                            "
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="developer" selected>Developer</option>
                            <option value="architect">Architect</option>
                        </select>
                    </div>
                    
                    <button 
                        type="submit"
                        style="
                            background: var(--color-primary);
                            color: white;
                            padding: 0.75rem 1.5rem;
                            border-radius: var(--radius-md);
                            border: none;
                            font-weight: 600;
                            font-size: 1rem;
                            cursor: pointer;
                            transition: all var(--transition-base);
                        "
                        onmouseover="this.style.opacity='0.9'"
                        onmouseout="this.style.opacity='1'"
                    >
                        🔓 Login
                    </button>
                </form>
                
                <div style="
                    margin-top: 1.5rem;
                    padding: 1rem;
                    background: rgba(16, 185, 129, 0.1);
                    border: 1px solid rgba(16, 185, 129, 0.2);
                    border-radius: var(--radius-md);
                    font-size: 0.75rem;
                    color: var(--color-text-muted);
                ">
                    <strong>ℹ️ Demo:</strong><br/>
                    • Username: any name<br/>
                    • Role: Developer/Admin/Architect untuk Ghost<br/>
                    • Role User tidak bisa akses Ghost
                </div>
                
                <div style="text-align: center; margin-top: 1.5rem;">
                    <button 
                        onclick="DREAM.load('home')"
                        style="
                            background: transparent;
                            color: var(--color-text-muted);
                            border: none;
                            cursor: pointer;
                            font-size: 0.875rem;
                        "
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    `;

    // Global login handler
    window.handleLogin = function(event) {
        event.preventDefault();
        
        const username = document.getElementById('login-username').value;
        const role = document.getElementById('login-role').value;
        
        // Set user in DREAM state
        window.DREAM.state.user = {
            name: username,
            role: role,
            email: `${username}@dreamos.local`,
            loginTime: new Date().toISOString()
        };
        
        // Save to session
        sessionStorage.setItem('dreamos-user', JSON.stringify(window.DREAM.state.user));
        
        window.DREAM.showToast(`Welcome, ${username}!`, 'success');
        
        // Redirect to Ghost
        setTimeout(() => {
            window.DREAM.load('ghost');
        }, 1000);
    };
}

// Cleanup function
export function cleanup() {
    delete window.handleLogin;
}

/**
 * DREAM OS v2.1 - SHELL.JS (SAFE VERSION)
 * Simplified - No Complex Features
 * Bi idznillah 💚
 */

(function() {
    'use strict';

    console.log('🚀 Dream OS Loading...');

    // Simple config
    const CONFIG = {
        version: '2.1',
        appName: 'Dream OS'
    };

    // Hide loading screen
    function hideLoading() {
        const loading = document.getElementById('loading-screen');
        if (loading) {
            setTimeout(() => {
                loading.classList.add('hide');
                console.log('✅ Loading screen hidden');
            }, 2000);
        } else {
            console.log('⚠️ Loading screen not found');
        }
    }

    // Simple toast
    window.toast = function(msg, type = 'success') {
        console.log('📢 Toast:', msg);
        const container = document.getElementById('toast-container');
        if (container) {
            const toast = document.createElement('div');
            toast.style.cssText = 'background:#10b981;color:white;padding:12px 24px;border-radius:12px;margin:10px;';
            toast.textContent = msg;
            container.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }
    };

    // Simple app shell
    function renderApp() {
        const appShell = document.getElementById('app-shell');
        if (!appShell) {
            console.error('❌ app-shell not found!');
            return;
        }
        appShell.innerHTML = `
            <div style="padding:1rem;">
                <div class="glass-card" style="margin:1rem;padding:1.5rem;">
                    <h1 style="color:#10b981;font-size:1.5rem;margin-bottom:0.5rem;">
                        🕌 Bismillah
                    </h1>
                    <p style="color:#94a3b8;font-size:12px;">
                        Dream OS v${CONFIG.version} loaded successfully!
                    </p>
                    <p style="color:#64748b;font-size:10px;margin-top:1rem;">
                        ${new Date().toLocaleString('id-ID')}
                    </p>
                </div>
                
                <div class="glass-card" style="margin:1rem;padding:1.5rem;">
                    <h2 style="color:#e2e8f0;font-size:1.25rem;margin-bottom:1rem;">
                        Quick Actions
                    </h2>
                    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;">
                        <button onclick="window.toast('Feature coming soon!')" 
                                style="background:#10b981;color:white;border:none;padding:12px;border-radius:12px;font-weight:600;cursor:pointer;">
                            Profile
                        </button>
                        <button onclick="window.toast('Feature coming soon!')" 
                                style="background:#3b82f6;color:white;border:none;padding:12px;border-radius:12px;font-weight:600;cursor:pointer;">
                            QR Scanner
                        </button>
                        <button onclick="window.toast('Feature coming soon!')" 
                                style="background:#8b5cf6;color:white;border:none;padding:12px;border-radius:12px;font-weight:600;cursor:pointer;">
                            About
                        </button>
                        <button onclick="window.toast('Feature coming soon!')" 
                                style="background:#64748b;color:white;border:none;padding:12px;border-radius:12px;font-weight:600;cursor:pointer;">
                            Settings
                        </button>
                    </div>
                </div>
                
                <div style="text-align:center;padding:2rem;">
                    <p style="color:#475569;font-size:9px;">
                        Dream Team © 2026 | ISO 27001
                    </p>
                </div>
            </div>
        `;

        console.log('✅ App shell rendered');
    }
    // Simple bottom nav
    function renderNav() {
        const nav = document.createElement('nav');
        nav.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:rgba(15,23,42,0.95);backdrop-filter:blur(24px);border-top:1px solid rgba(16,185,129,0.2);padding:12px;z-index:100;';
        nav.innerHTML = `
            <div style="display:flex;justify-content:space-around;max-width:500px;margin:0 auto;">
                <button onclick="window.toast('Home')" style="background:none;border:none;color:#10b981;cursor:pointer;">
                    <i class="fas fa-home"></i><br><small>Home</small>
                </button>
                <button onclick="window.toast('Profile')" style="background:none;border:none;color:#94a3b8;cursor:pointer;">
                    <i class="fas fa-user"></i><br><small>Profile</small>
                </button>
                <button onclick="window.toast('QR')" style="background:none;border:none;color:#94a3b8;cursor:pointer;">
                    <i class="fas fa-qrcode"></i><br><small>QR</small>
                </button>
                <button onclick="window.toast('About')" style="background:none;border:none;color:#94a3b8;cursor:pointer;">
                    <i class="fas fa-info-circle"></i><br><small>About</small>
                </button>
                <button onclick="window.toast('Settings')" style="background:none;border:none;color:#94a3b8;cursor:pointer;">
                    <i class="fas fa-cog"></i><br><small>Settings</small>
                </button>
            </div>
        `;
        document.body.appendChild(nav);
        console.log('✅ Navigation rendered');
    }

    // Init
    function init() {
        console.log('🔧 Initializing Dream OS...');
        
        try {
            renderApp();
            renderNav();
            hideLoading();
            window.toast('Dream OS Ready!', 'success');
            console.log('✅ Dream OS initialized successfully!');
        } catch (error) {
            console.error('❌ Init error:', error);
            document.getElementById('loading-screen').innerHTML = `
                <div style="text-align:center;padding:2rem;">
                    <p style="color:#ef4444;">⚠️ Loading Error</p>
                    <p style="color:#94a3b8;font-size:12px;">${error.message}</p>
                    <button onclick="location.reload()" 
                            style="margin-top:1rem;background:#10b981;color:white;border:none;padding:12px 24px;border-radius:12px;cursor:pointer;">
                        Reload
                    </button>
                </div>
            `;
        }    }

    // Run when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

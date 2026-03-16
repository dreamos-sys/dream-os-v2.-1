/**
 * modules/ghost/module.js
 * Dream OS v2.1 - Ghost Core Developer Module
 */

export async function render({ container, user, supabase }) {
    return `
        <div class="module-container active" id="module-ghost">
            <header class="glass-header">
                <div class="status-bar">
                    <span>📍 DEPOK CORE</span>
                    <span>ISO 27001 ✅</span>
                </div>
                <div class="islamic-header">
                    <h1 class="bismillah">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
                    <p class="shalawat">اَللهم صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</p>
                </div>
            </header>

            <main style="padding:16px;padding-bottom:140px;">
                <h2 class="text-2xl font-bold text-purple-400 mb-6">👻 Ghost Core</h2>
                
                <div class="glass-card p-6 mb-6">
                    <div style="text-align:center;padding:40px 20px;">
                        <div style="font-size:4rem;margin-bottom:1rem;">👻</div>
                        <h3 style="color:var(--text-primary);font-size:1.5rem;margin-bottom:10px;">Ghost Core</h3>
                        <p style="color:var(--color-warning);margin-bottom:20px;">⚠️ Developer Access Only</p>
                        
                        <div style="background:rgba(139,92,246,0.1);border:1px solid var(--color-accent);border-radius:12px;padding:1.5rem;margin-bottom:1rem;max-width:500px;margin-left:auto;margin-right:auto;">
                            <h4 style="color:var(--color-accent);margin-bottom:1rem;">🔧 Developer Tools</h4>
                            <div style="display:grid;gap:10px;">
                                <button onclick="openBrainHub()" style="padding:12px;background:rgba(139,92,246,0.2);color:var(--color-accent);border:1px solid var(--color-accent);border-radius:8px;cursor:pointer;">🧠 Brain Hub Console</button>
                                <button onclick="clearCache()" style="padding:12px;background:rgba(139,92,246,0.2);color:var(--color-accent);border:1px solid var(--color-accent);border-radius:8px;cursor:pointer;">🗑️ Clear Cache</button>
                                <button onclick="showSystemInfo()" style="padding:12px;background:rgba(139,92,246,0.2);color:var(--color-accent);border:1px solid var(--color-accent);border-radius:8px;cursor:pointer;">ℹ️ System Info</button>
                            </div>
                        </div>
                        
                        <button class="btn-back" onclick="window.loadModule('home')" style="margin-top:20px;">← Back to Home</button>
                    </div>
                </div>
            </main>

            <nav class="bottom-nav">
                <div class="nav-container">
                    <button class="nav-item" data-nav="home" onclick="window.loadModule('home')">
                        <i class="fas fa-home"></i><span>Home</span>
                    </button>
                    <button class="nav-item active" data-nav="ghost" onclick="window.loadModule('ghost')">
                        <i class="fas fa-ghost"></i><span>Ghost</span>
                    </button>
                    <button class="nav-item" data-nav="settings" onclick="window.loadModule('settings')">
                        <i class="fas fa-sliders"></i><span>Settings</span>
                    </button>
                </div>
            </nav>
        </div>
    `;
}

export async function afterRender() {
    console.log('👻 [GHOST] Module loaded');
    
    window.openBrainHub = function() {
        if (window.BrainHub) {
            window.BrainHub.render?.();
            window.toast?.('🧠 Brain Hub Opened', 'success');
        } else {
            window.toast?.('Brain Hub not loaded', 'error');
        }
    };
    
    window.clearCache = function() {
        localStorage.clear();
        window.toast?.('✅ Cache Cleared', 'success');
    };
    
    window.showSystemInfo = function() {
        const info = {
            version: 'v2.1',
            modules: Object.keys(window.MODULES || {}).length,
            platform: navigator.platform,
            online: navigator.onLine
        };
        alert('System Info:\n' + JSON.stringify(info, null, 2));
    };
}

export function cleanup() {
    console.log('👻 [GHOST] Module cleanup');
    delete window.openBrainHub;
    delete window.clearCache;
    delete window.showSystemInfo;
}

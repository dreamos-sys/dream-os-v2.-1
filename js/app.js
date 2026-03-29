const App = {
    modules: {
        'commandcenter': { path: './modules/commandcenter/module.js', name: 'Command Center', icon: '⚡' },
        'booking': { path: './modules/booking/module.js', name: 'Booking', icon: '📅' },
        'k3': { path: './modules/k3/module.js', name: 'K3', icon: '⚠️' },
        'sekuriti': { path: './modules/sekuriti/module.js', name: 'Security', icon: '🛡️' },
        'janitor-in': { path: './modules/janitor-indoor/module.js', name: 'Janitor Indoor', icon: '🧹' },
        'janitor-out': { path: './modules/janitor-outdoor/module.js', name: 'Janitor Outdoor', icon: '🌳' },
        'stok': { path: './modules/stok/module.js', name: 'Stok', icon: '📦' },
        'maintenance': { path: './modules/maintenance/module.js', name: 'Maintenance', icon: '🔧' },
        'asset': { path: './modules/asset/module.js', name: 'Asset', icon: '🏛️' },
        'gudang': { path: './modules/gudang/module.js', name: 'Gudang', icon: '🏭' },
        'profile': { path: './modules/profile/module.js', name: 'Profile', icon: '👤' },
        'settings': { path: './modules/settings/module.js', name: 'Settings', icon: '⚙️' },
        'connectivity': { path: './modules/connectivity/module.js', name: 'Connectivity', icon: '📡' }
    },
    state: { currentModule: null, currentUser: null },
    
    async init() {
        console.log('🧬 Dream OS v2.1 PRO Initializing...');
        const session = sessionStorage.getItem('dream_session');
        if (session === 'ACTIVE') this.state.currentUser = sessionStorage.getItem('dream_user');
        this.renderDashboard();
        console.log('✅ Dream OS Ready!');
    },

    renderDashboard() {
        const app = document.getElementById('app');
        if (!app) return;        app.innerHTML = `
            <div class="main-container">
                <div class="spiritual-header">
                    <div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
                    <div class="shalawat">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
                    <div style="font-size:14px; color:#34C759; font-weight:700; margin-top:10px;">DREAM OS v2.1 PRO</div>
                </div>
                <div class="module-grid">
                    ${Object.entries(this.modules).map(([key, mod]) => `
                        <div class="module-card" onclick="App.loadModule('${key}')">
                            <div class="module-icon">${mod.icon}</div>
                            <div class="module-label">${mod.name}</div>
                        </div>
                    `).join('')}
                </div>
                <div id="module-container" style="display:none;"></div>
                <button id="back-btn" onclick="App.backToDashboard()" style="display:none; position:fixed; bottom:100px; left:20px; background:#10b981; color:white; border:none; padding:12px 24px; border-radius:30px; cursor:pointer;">← Back</button>
            </div>
            <style>
                .main-container { max-width: 480px; margin: 0 auto; padding: 20px; padding-bottom: 100px; }
                .spiritual-header { text-align: center; padding: 30px 20px; background: linear-gradient(135deg, #064e3b, #059669); border-radius: 20px; margin-bottom: 20px; color: white; }
                .bismillah { font-size: 28px; font-family: serif; margin-bottom: 8px; }
                .shalawat { font-size: 18px; font-family: serif; opacity: 0.9; }
                .module-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
                .module-card { background: #FFFFFF; border-radius: 20px; padding: 20px; text-align: center; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: transform 0.2s; }
                .module-card:active { transform: scale(0.95); }
                .module-icon { font-size: 40px; margin-bottom: 8px; }
                .module-label { font-size: 10px; font-weight: 700; color: #1C1C1E; text-transform: uppercase; }
            </style>
        `;
    },

    async loadModule(moduleId) {
        console.log(`📦 Loading: ${moduleId}`);
        document.querySelector('.module-grid').style.display = 'none';
        document.getElementById('module-container').style.display = 'block';
        document.getElementById('back-btn').style.display = 'block';
        document.getElementById('module-container').innerHTML = '<div style="text-align:center; padding:3rem;">Loading...</div>';
        
        try {
            const response = await fetch(this.modules[moduleId].path);
            const code = await response.text();
            eval(code);
            this.state.currentModule = moduleId;
        } catch (err) {
            alert(`Error loading ${moduleId}: ${err.message}`);
            this.backToDashboard();
        }
    },
    backToDashboard() {
        document.querySelector('.module-grid').style.display = 'grid';
        document.getElementById('module-container').style.display = 'none';
        document.getElementById('back-btn').style.display = 'none';
        this.state.currentModule = null;
    },

    logout() {
        if (confirm('Logout from all devices?')) {
            sessionStorage.clear();
            localStorage.clear();
            alert('✅ Logged out successfully!');
            location.reload();
        }
    }
};

window.App = App;
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => App.init());
else App.init();

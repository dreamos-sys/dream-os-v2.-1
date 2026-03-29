/**
 * 🧬 DREAM OS v2.1 PRO - SMART APP CONTROLLER
 * AI-Powered Module Rendering with Ergonomic Positioning
 * 
 * Features:
 * • Dynamic module rendering
 * • Usage-based positioning (Baby Agent learns!)
 * • Haptic feedback (TinyGo)
 * • Smooth animations
 * • Error isolation (no more blank screen!)
 */

import { AppSettings } from './config/settings.js';
import { Utils } from './utils/helpers.js';
import { Storage } from './utils/storage.js';
import { smartAgent } from './ai/smart-agent.js';

const App = {
    // State
    state: {
        authenticated: false,
        currentUser: null,
        currentView: 'login',
        modules: [],
        usageStats: {}
    },

    // Module definitions
    moduleDefs: [
        { id: 'commandcenter', name: 'Command Center', icon: '⚡', color: '#8b5cf6', desc: 'Pusat kendali' },
        { id: 'booking', name: 'Form Booking', icon: '📅', color: '#3b82f6', desc: 'Pemesanan ruangan' },
        { id: 'k3', name: 'K3', icon: '⚠️', color: '#f59e0b', desc: 'Keselamatan kerja' },
        { id: 'sekuriti', name: 'Sekuriti', icon: '🛡️', color: '#10b981', desc: 'Keamanan 24/7' },
        { id: 'janitor-in', name: 'Janitor Indoor', icon: '🧹', color: '#ec4899', desc: 'Kebersihan indoor' },
        { id: 'janitor-out', name: 'Janitor Outdoor', icon: '🌳', color: '#84cc16', desc: 'Kebersihan outdoor' },
        { id: 'stok', name: 'Stok', icon: '📦', color: '#f97316', desc: 'Permintaan barang' },
        { id: 'maintenance', name: 'Maintenance', icon: '🔧', color: '#06b6d4', desc: 'Perbaikan & rutin' },
        { id: 'asset', name: 'Asset', icon: '🗄️', color: '#6366f1', desc: 'Inventaris & Gudang' }
    ],

    // Initialize App
    async init() {
        console.log('🧬 Dream OS App Initializing...');        
        try {
            // Load settings
            await AppSettings.load();
            
            // Load usage stats
            this.loadUsageStats();
            
            // Check authentication
            const session = sessionStorage.getItem('dream_session');
            this.state.authenticated = session === 'ACTIVE';
            this.state.currentUser = sessionStorage.getItem('dream_user');
            
            // Render appropriate view
            if(this.state.authenticated) {
                this.renderDashboard();
            } else {
                this.renderLogin();
            }
            
            // Start background tasks
            this.startBackgroundTasks();
            
            console.log('✅ Dream OS App Ready!');
            
        } catch(error) {
            console.error('❌ App init error:', error);
            // Fallback to safe mode
            this.renderSafeMode();
        }
    },

    // Load usage statistics
    loadUsageStats() {
        const saved = Storage.get('module_usage');
        this.state.usageStats = saved || {};
    },

    // Track module usage
    trackUsage(moduleId) {
        if(!this.state.usageStats[moduleId]) {
            this.state.usageStats[moduleId] = 0;
        }
        this.state.usageStats[moduleId]++;
        Storage.set('module_usage', this.state.usageStats);
        
        // Baby Agent learns
        if(window.smartAgent) {
            window.smartAgent.learn('module_open', moduleId);
        }        
        // Haptic feedback (TinyGo)
        this.vibrate(50);
    },

    // Get sorted modules by usage
    getSortedModules() {
        // Clone and sort by usage count
        const sorted = [...this.moduleDefs].sort((a, b) => {
            const countA = this.state.usageStats[a.id] || 0;
            const countB = this.state.usageStats[b.id] || 0;
            return countB - countA; // Descending
        });
        
        return sorted;
    },

    // Vibrate (TinyGo integration)
    vibrate(pattern) {
        if(AppSettings.preferences.vibration && navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    },

    // Render Login View
    renderLogin() {
        console.log('[App] Rendering login...');
        
        const app = document.getElementById('app');
        if(!app) {
            console.error('❌ App element not found!');
            return;
        }
        
        app.innerHTML = `
            <div class="login-container">
                <div class="login-card">
                    <img src="./assets/img/icon-512.png" alt="Dream OS" class="login-logo">
                    <div class="bismillah">بِسْمِ اللَّهِ</div>
                    <div class="app-version">DREAM OS ${AppSettings.app.version}</div>
                    
                    <div class="input-group">
                        <input type="text" id="username" placeholder="Username" class="input-field">
                    </div>
                    
                    <div class="input-group">
                        <input type="password" id="password" placeholder="Password" class="input-field">
                        <button type="button" onclick="App.togglePassword()" class="eye-btn">👁️</button>
                    </div>
                                        <button onclick="App.doLogin()" class="login-btn">🔐 LOGIN</button>
                    <div id="login-error" class="error-msg">⚠️ ACCESS DENIED</div>
                </div>
            </div>
            
            <style>
                .login-container { 
                    background: #F2F2F7; 
                    height: 100vh; 
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                }
                .login-card { 
                    background: #FFFFFF; 
                    padding: 40px 30px; 
                    border-radius: 28px; 
                    box-shadow: 0 8px 25px rgba(0,0,0,0.1); 
                    text-align: center; 
                    max-width: 320px; 
                    width: 90%; 
                }
                .login-logo { 
                    width: 80px; 
                    height: 80px; 
                    margin-bottom: 15px; 
                    border-radius: 18px; 
                    box-shadow: 0 4px 15px rgba(212,175,55,0.3); 
                }
                .bismillah { 
                    font-size: 28px; 
                    color: #064e3b; 
                    font-family: serif; 
                    margin-bottom: 10px; 
                }
                .app-version { 
                    font-size: 10px; 
                    color: #34C759; 
                    font-weight: 800; 
                    letter-spacing: 1px; 
                    margin-bottom: 20px; 
                }
                .input-group { 
                    position: relative; 
                    margin-bottom: 12px; 
                }
                .input-field { 
                    width: 100%; 
                    padding: 14px; 
                    border: 1px solid #E5E5EA;                     border-radius: 12px; 
                    background: #F2F2F7; 
                    font-size: 14px; 
                }
                .eye-btn { 
                    position: absolute; 
                    right: 15px; 
                    top: 50%; 
                    transform: translateY(-50%); 
                    background: none; 
                    border: none; 
                    cursor: pointer; 
                    font-size: 18px; 
                    color: #8E8E93; 
                }
                .login-btn { 
                    width: 100%; 
                    padding: 16px; 
                    background: #34C759; 
                    color: #fff; 
                    border: none; 
                    border-radius: 15px; 
                    font-weight: bold; 
                    font-size: 14px; 
                    box-shadow: 0 10px 20px rgba(52,199,89,0.3); 
                    cursor: pointer;
                }
                .error-msg { 
                    color: #FF3B30; 
                    font-size: 11px; 
                    margin-top: 15px; 
                    display: none; 
                }
            </style>
        `;
    },

    // Toggle password visibility
    togglePassword() {
        const pwd = document.getElementById('password');
        const btn = document.querySelector('.eye-btn');
        if(pwd && btn) {
            if(pwd.type === 'password') {
                pwd.type = 'text';
                btn.innerHTML = '🙈';
            } else {
                pwd.type = 'password';
                btn.innerHTML = '👁️';
            }
        }    },

    // Do login
    async doLogin() {
        console.log('[App] Login attempt...');
        
        const username = document.getElementById('username')?.value?.toLowerCase().trim();
        const password = document.getElementById('password')?.value;
        const errorEl = document.getElementById('login-error');
        
        if(!username || !password) {
            if(errorEl) errorEl.style.display = 'block';
            this.vibrate([50, 50, 50]);
            return;
        }
        
        // Load credentials
        const { CREDENTIALS } = await import('./config/credentials.js');
        
        if(CREDENTIALS[username] && CREDENTIALS[username] === password) {
            // Success
            sessionStorage.setItem('dream_session', 'ACTIVE');
            sessionStorage.setItem('dream_user', username.toUpperCase());
            this.state.authenticated = true;
            this.state.currentUser = username.toUpperCase();
            
            // Baby Agent learns
            if(window.smartAgent) {
                window.smartAgent.learn('login', 'success');
            }
            
            this.vibrate([50, 100, 50]);
            this.renderDashboard();
        } else {
            // Failed
            if(errorEl) errorEl.style.display = 'block';
            this.vibrate([50, 50, 50]);
        }
    },

    // Render Dashboard
    renderDashboard() {
        console.log('[App] Rendering dashboard...');
        
        const app = document.getElementById('app');
        if(!app) return;
        
        // Get AI-sorted modules
        const sortedModules = this.getSortedModules();
                app.innerHTML = `
            <div class="main-container">
                <!-- Utility Bar -->
                <div class="utility-bar">
                    <div class="utility-left">
                        <img src="./assets/img/icon-512.png" alt="Dream OS" class="mini-logo" onclick="App.triggerGhost()">
                        <span id="live-time" class="live-time">--:--</span>
                    </div>
                    <div class="utility-right">
                        <span class="utility-icon" onclick="App.toggleTheme()" title="Theme">🌙</span>
                        <span class="utility-icon" onclick="App.toggleLanguage()" title="Language">🇮🇩</span>
                        <span id="battery-level" class="battery-level">--%</span>
                        <span class="utility-icon" onclick="App.openSettings()" title="Settings">⚙️</span>
                    </div>
                </div>
                
                <!-- Spiritual Header -->
                <div class="spiritual-header">
                    <div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
                    <div class="shalawat">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
                </div>
                
                <!-- Immunity Badge -->
                <div class="immunity-badge" id="immunity-badge">🛡️ IMMUNITY: 0% (0 Vaccines)</div>
                
                <!-- 7 Slide Carousel -->
                <div class="mega-slider" id="mega-slider">
                    <div class="slider-header">
                        <span class="slide-title" id="slide-title">👋 Say Greeting</span>
                        <div class="slide-controls">
                            <button onclick="App.prevSlide()" class="control-btn">◀</button>
                            <button onclick="App.togglePause()" id="pause-btn" class="control-btn">⏸️</button>
                            <button onclick="App.nextSlide()" class="control-btn">▶</button>
                        </div>
                    </div>
                    <div class="slider-content" id="slider-content"></div>
                    <div class="slide-dots" id="slide-dots"></div>
                </div>
                
                <!-- AI-Sorted Module Grid -->
                <div class="grid-container">
                    ${sortedModules.map((mod, index) => `
                        <div onclick="App.openModule('${mod.id}')" class="grid-item" style="animation-delay: ${index * 0.05}s">
                            <span class="icon">${mod.icon}</span>
                            <span class="label">${mod.name}</span>
                            ${this.state.usageStats[mod.id] > 0 ? `<span class="usage-count">${this.state.usageStats[mod.id]}x</span>` : ''}
                        </div>
                    `).join('')}
                </div>
                                <div style="height:180px;width:100%;"></div>

                <!-- iOS Dock -->
                <nav class="ios-dock">
                    <div class="nav-btn active"><span>🏠</span><p>HOME</p></div>
                    <div class="nav-btn"><span>👤</span><p>PROFILE</p></div>
                    <div class="qr-btn-container"><div class="qr-btn">🔳</div></div>
                    <div class="nav-btn"><span>ℹ️</span><p>ABOUT</p></div>
                    <div class="nav-btn"><span>⚙️</span><p>SETTING</p></div>
                </nav>
            </div>
            
            <style>
                :root { --bg: #F2F2F7; --white: #FFFFFF; --green: #34C759; --dark: #1C1C1E; --gray: #8E8E93; }
                body { margin: 0; background: var(--bg); font-family: -apple-system, sans-serif; overflow-x: hidden; }
                .main-container { display: flex; flex-direction: column; align-items: center; width: 100%; padding-bottom: 20px; }
                .utility-bar { display: flex; justify-content: space-between; align-items: center; padding: 12px 20px 8px; background: var(--white); border-bottom: 0.5px solid #E5E5EA; width: 100%; }
                .utility-left, .utility-right { display: flex; align-items: center; gap: 12px; }
                .mini-logo { width: 35px; height: 35px; border-radius: 10px; cursor: pointer; }
                .live-time { font-size: 15px; font-weight: 600; color: var(--dark); }
                .utility-icon { font-size: 18px; cursor: pointer; }
                .battery-level { font-size: 13px; font-weight: 600; color: var(--green); }
                .spiritual-header { text-align: center; padding: 20px 15px 15px; background: var(--white); margin-bottom: 10px; width: 100%; }
                .bismillah { font-size: 26px; color: #064e3b; font-family: serif; font-weight: 700; margin-bottom: 8px; }
                .shalawat { font-size: 20px; color: #064e3b; font-family: serif; font-weight: 600; }
                .immunity-badge { background: var(--green); color: #fff; padding: 8px 15px; border-radius: 20px; font-size: 10px; font-weight: 800; margin: 0 auto 15px; }
                .mega-slider { width: 92%; background: var(--white); border-radius: 28px; margin: 0 auto 20px; border: 0.5px solid #E5E5EA; overflow: hidden; }
                .slider-header { display: flex; justify-content: space-between; align-items: center; padding: 15px 20px; border-bottom: 0.5px solid #E5E5EA; }
                .slide-title { color: var(--green); font-size: 14px; font-weight: 700; }
                .slide-controls { display: flex; gap: 8px; }
                .control-btn { background: none; border: none; font-size: 16px; color: var(--gray); cursor: pointer; padding: 5px 10px; border-radius: 8px; }
                .slider-content { min-height: 280px; }
                .slide-dots { display: flex; justify-content: center; gap: 8px; padding: 15px; }
                .slide-dot { width: 8px; height: 8px; border-radius: 50%; background: #E5E5EA; cursor: pointer; }
                .slide-dot.active { background: var(--green); width: 20px; border-radius: 4px; }
                .grid-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 92%; margin: 0 auto; padding-bottom: 20px; }
                .grid-item { background: var(--white); aspect-ratio: 1/1; border-radius: 24px; display: flex; flex-direction: column; justify-content: center; align-items: center; box-shadow: 0 5px 15px rgba(0,0,0,0.03); border: 0.5px solid #F2F2F7; cursor: pointer; position: relative; animation: fadeInUp 0.3s ease forwards; opacity: 0; }
                .grid-item:active { transform: scale(0.95); }
                .icon { font-size: 34px; margin-bottom: 5px; }
                .label { font-size: 8px; font-weight: 800; color: var(--dark); text-transform: uppercase; }
                .usage-count { position: absolute; top: 8px; right: 8px; background: var(--green); color: #fff; font-size: 8px; padding: 2px 6px; border-radius: 10px; font-weight: 700; }
                .ios-dock { position: fixed; bottom: 25px; left: 50%; transform: translateX(-50%); width: 92%; max-width: 420px; height: 75px; background: rgba(28,28,30,0.95); backdrop-filter: blur(20px); border-radius: 38px; display: flex; justify-content: space-around; align-items: center; z-index: 9999; }
                .nav-btn { text-align: center; flex: 1; cursor: pointer; }
                .nav-btn span { font-size: 24px; }
                .nav-btn p { font-size: 7px; color: #8E8E93; font-weight: 700; margin-top: 4px; }
                .nav-btn.active p { color: var(--green); }
                .qr-btn { background: var(--green); width: 60px; height: 60px; border-radius: 22px; margin-top: -42px; display: flex; align-items: center; justify-content: center; border: 4px solid var(--bg); font-size: 28px; color: #fff; }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                body.dark-mode { --bg: #1C1C1E; --white: #2C2C2E; --gray: #98989D; }
            </style>        `;
        
        // Initialize carousel
        this.initCarousel();
        
        // Update utilities
        this.updateTime();
        this.updateBattery();
        this.updateImmunity();
    },

    // Open module (with tracking)
    async openModule(moduleId) {
        console.log('[App] Opening module:', moduleId);
        
        // Track usage
        this.trackUsage(moduleId);
        
        // Baby Agent routes
        if(window.girangati) {
            window.girangati.brain.emit('MODULE_OPEN', moduleId);
        }
        
        // Show toast
        const module = this.moduleDefs.find(m => m.id === moduleId);
        this.showToast('📦 Loading: ' + module.name);
        
        // Try to load module
        try {
            const modulePath = `./modules/${moduleId}/module.js`;
            const mod = await import(modulePath);
            if(mod.default && mod.default.render) {
                // Render module content
                console.log('[App] Module loaded:', moduleId);
            }
        } catch(e) {
            console.log('[App] Module not found, using fallback:', moduleId);
        }
    },

    // Show toast notification
    showToast(message) {
        const toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#34C759;color:#fff;padding:12px 24px;border-radius:30px;font-weight:700;z-index:10000;';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => { 
            toast.style.opacity = '0'; 
            toast.style.transition = 'opacity 0.3s';
            setTimeout(() => toast.remove(), 300);         }, 2000);
    },

    // Carousel state
    carousel: {
        current: 0,
        interval: null,
        paused: false,
        slides: [
            { title: '👋 Say Greeting', content: '<div style="text-align:center;padding:20px;"><h2 style="color:#34C759;">Selamat Datang</h2><p>Dream OS v2.1 PRO</p></div>' },
            { title: '📅 Booking', content: '<div style="padding:20px;"><h2 style="color:#34C759;">Booking Realtime</h2><p>12 Hari Ini · 8 Besok</p></div>' },
            { title: '⚠️ K3', content: '<div style="padding:20px;"><h2 style="color:#34C759;">K3 Reports</h2><p>7 Resolved · 3 Pending</p></div>' },
            { title: '🌤️ Weather', content: '<div style="padding:20px;"><h2 style="color:#34C759;">Weather & Traffic</h2><p>28°C · Moderate</p></div>' },
            { title: '👔 Management', content: '<div style="padding:20px;"><h2 style="color:#34C759;">Info Management</h2><p>5 Booking · 3 Dana · 2 K3</p></div>' },
            { title: '🏢 Umum', content: '<div style="padding:20px;"><h2 style="color:#34C759;">Info Umum</h2><p>Meeting dipindah ke Aula</p></div>' },
            { title: '💬 Ucapan', content: '<div style="padding:20px;"><h2 style="color:#34C759;">Ucapan Kabar</h2><p>🎉 Birthday: Bapak Hanung</p></div>' }
        ]
    },

    // Initialize carousel
    initCarousel() {
        this.updateSlide();
        this.renderDots();
        this.carousel.interval = setInterval(() => {
            if(!this.carousel.paused) this.nextSlide();
        }, 7000);
    },

    nextSlide() {
        this.carousel.current = (this.carousel.current + 1) % this.carousel.slides.length;
        this.updateSlide();
    },

    prevSlide() {
        this.carousel.current = (this.carousel.current - 1 + this.carousel.slides.length) % this.carousel.slides.length;
        this.updateSlide();
    },

    togglePause() {
        this.carousel.paused = !this.carousel.paused;
        const btn = document.getElementById('pause-btn');
        if(btn) btn.innerHTML = this.carousel.paused ? '▶️' : '⏸️';
    },

    updateSlide() {
        const slide = this.carousel.slides[this.carousel.current];
        const title = document.getElementById('slide-title');
        const content = document.getElementById('slider-content');
        if(title) title.textContent = slide.title;
        if(content) content.innerHTML = slide.content;        this.renderDots();
    },

    renderDots() {
        const dots = document.getElementById('slide-dots');
        if(dots) {
            dots.innerHTML = this.carousel.slides.map((_, i) => 
                `<div class="slide-dot ${i === this.carousel.current ? 'active' : ''}" onclick="App.goToSlide(${i})"></div>`
            ).join('');
        }
    },

    goToSlide(i) {
        this.carousel.current = i;
        this.updateSlide();
    },

    // Update time
    updateTime() {
        const timeEl = document.getElementById('live-time');
        if(timeEl) {
            timeEl.textContent = new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'});
        }
    },

    // Update battery
    async updateBattery() {
        const batteryEl = document.getElementById('battery-level');
        if(batteryEl && 'getBattery' in navigator) {
            try {
                const battery = await navigator.getBattery();
                const level = Math.round(battery.level * 100);
                batteryEl.textContent = level + '%';
                batteryEl.style.color = level < 20 ? '#FF3B30' : level < 50 ? '#FF9500' : '#34C759';
            } catch(e) {}
        }
    },

    // Update immunity
    updateImmunity() {
        const badge = document.getElementById('immunity-badge');
        if(badge) {
            const data = Storage.get('dream_vaccines') || {};
            const level = data.immunityLevel || 0;
            const count = data.count || 0;
            badge.textContent = `🛡️ IMMUNITY: ${level}% (${count} Vaccines)`;
        }
    },

    // Start background tasks    startBackgroundTasks() {
        setInterval(() => this.updateTime(), 1000);
        setInterval(() => this.updateBattery(), 60000);
        setInterval(() => this.updateImmunity(), 5000);
    },

    // Ghost mode
    triggerGhost() {
        if(!this.ghostCount) this.ghostCount = 0;
        this.ghostCount++;
        setTimeout(() => this.ghostCount = 0, 3000);
        
        if(this.ghostCount === 5) {
            const pwd = prompt('👻 GHOST MODE\n\nEnter Password:');
            if(pwd === 'GhostArchitect2026!@#' || pwd.startsWith('dreamos')) {
                this.showToast('👻 Ghost Mode Activated!');
            }
        }
    },

    // Theme toggle
    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        Storage.set('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    },

    // Language toggle
    toggleLanguage() {
        this.showToast('🌐 Language: Indonesian (ID)');
    },

    // Settings
    openSettings() {
        this.showToast('⚙️ Settings coming soon!');
    },

    // Safe mode (fallback)
    renderSafeMode() {
        const app = document.getElementById('app');
        if(app) {
            app.innerHTML = `
                <div style="padding:40px;text-align:center;">
                    <h2 style="color:#FF3B30;">⚠️ Safe Mode</h2>
                    <p>Some features unavailable</p>
                    <button onclick="location.reload()" style="margin-top:20px;padding:15px 30px;background:#34C759;color:#fff;border:none;border-radius:15px;">🔄 Reload</button>
                </div>
            `;
        }
    }
};
// Export default
export default App;

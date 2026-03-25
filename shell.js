/**
 * ══════════════════════════════════════════════════════════════
 * DREAM OS v2.1 - ULTIMATE ENTERPRISE EDITION (REMASTERED)
 * The Power Soul of Shalawat - Limited Edition 2026
 * ══════════════════════════════════════════════════════════════
 */

console.log('💚 Dream OS v2.1 Ultimate - بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ');

// ========== 1. CONFIGURATION ==========
const CONFIG = {
    version: '2.1.0-ultimate',
    build: 'enterprise-playstore-2026',
    supabase: {
        url: 'https://lfavawkzvdhdpaaplaiq.supabase.co',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmYXZhd2t6dmRoZHBhYXBsYWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5Mjc0NjgsImV4cCI6MjA4OTUwMzQ2OH0.EhwnhAd20lUVaWHHB51UdWCGWxkyTaWIrsPY8xvhwE00'
    },
    slides: {
        interval: 7000, // 7 detik
        autoRotate: true,
        fetchFromSupabase: true,
        totalSlides: 7 // 7 slide
    },
    ghost: {
        enabled: true,
        tapCount: 5,
        timeout: 2000,
        code: 'dreamos2026'
    },
    security: {
        idleTimeout: 120000,
        maxLoginAttempts: 3,
        sessionExpiry: 3600000
    },
    ai: {
        enabled: true,
        nodes: ['gemini', 'qwen', 'deepseek'],
        roundRobin: true
    }
};

// ========== 2. ROLE-BASED ACCESS CONTROL ==========
const ROLE_CONFIG = {
    master: {
        level: 100,
        modules: ['*'],
        passwords: ['b15m1ll4h_012443410', 'Mr.M_Architect_2025'],
        displayName: 'Master M - Ghost Architect'
    },
    admin: {
        level: 90,
        modules: ['*'],
        passwords: ['4dm1n_AF6969@00', 'cmdaf4dm1n@2026'],
        displayName: 'Administrator'
    },
    sekuriti: {
        level: 70,
        modules: ['home', 'profile', 'sekuriti', 'qr', 'about', 'settings'],
        passwords: ['LHPSsec_AF2025'],
        displayName: 'Security Officer'
    },
    'janitor-in': {
        level: 60,
        modules: ['home', 'profile', 'janitor-in', 'qr', 'about', 'settings'],
        passwords: ['CHCS_AF_@003'],
        displayName: 'Janitor Indoor'
    },
    'janitor-out': {
        level: 60,
        modules: ['home', 'profile', 'janitor-out', 'qr', 'about', 'settings'],
        passwords: ['CHCS_AF_@003'],
        displayName: 'Janitor Outdoor'
    },
    stok: {
        level: 65,
        modules: ['home', 'profile', 'stok', 'asset', 'about', 'settings'],
        passwords: ['SACS_AF@004'],
        displayName: 'Staff Stok'
    },
    maintenance: {
        level: 65,
        modules: ['home', 'profile', 'maintenance', 'about', 'settings'],
        passwords: ['M41n_4F@234'],
        displayName: 'Technician'
    },
    booking: {
        level: 50,
        modules: ['home', 'profile', 'booking', 'about', 'settings'],
        passwords: ['user_@1234'],
        displayName: 'User Booking'
    },
    k3: {
        level: 50,
        modules: ['home', 'profile', 'k3', 'about', 'settings'],
        passwords: ['user_@2345'],
        displayName: 'K3 Officer'
    }
};

// ========== 3. MODULE REGISTRY ==========
const MODULE_REGISTRY = {
    'command-center': {
        path: './modules/command-center/module.js',
        name: 'Command Center',
        icon: 'fa-desktop',
        color: '#8b5cf6',
        protected: true,
        description: 'Enterprise control center'
    },
    booking: {
        path: './modules/booking/module.js',
        name: 'Booking',
        icon: 'fa-calendar-check',
        color: '#3b82f6',
        protected: true,
        description: 'Room & facility booking'
    },
    k3: {
        path: './modules/k3/module.js',
        name: 'K3 Safety',
        icon: 'fa-triangle-exclamation',
        color: '#f59e0b',
        protected: true,
        description: 'Safety & health reports'
    },
    sekuriti: {
        path: './modules/sekuriti/module.js',
        name: 'Sekuriti',
        icon: 'fa-shield-halved',
        color: '#ef4444',
        protected: true,
        description: 'Security patrol & reports'
    },
    'janitor-in': {
        path: './modules/janitor-in/module.js',
        name: 'Janitor In',
        icon: 'fa-broom',
        color: '#ec4899',
        protected: true,
        description: 'Indoor cleaning tasks'
    },
    'janitor-out': {
        path: './modules/janitor-out/module.js',
        name: 'Janitor Out',
        icon: 'fa-leaf',
        color: '#10b981',
        protected: true,
        description: 'Outdoor cleaning tasks'
    },
    stok: {
        path: './modules/stok/module.js',
        name: 'Stok',
        icon: 'fa-boxes-stacked',
        color: '#f97316',
        protected: true,
        description: 'Stock inventory'
    },
    maintenance: {
        path: './modules/maintenance/module.js',
        name: 'Maintenance',
        icon: 'fa-screwdriver-wrench',
        color: '#06b6d4',
        protected: true,
        description: 'Maintenance & repairs'
    },
    asset: {
        path: './modules/asset/module.js',
        name: 'Asset',
        icon: 'fa-warehouse',
        color: '#6366f1',
        protected: true,
        description: 'Asset management'
    },
    home: {
        path: './modules/home/module.js',
        name: 'Home',
        icon: 'fa-home',
        protected: false,
        isNav: true
    },
    profile: {
        path: './modules/profile/module.js',
        name: 'Profile',
        icon: 'fa-user',
        protected: false,
        isNav: true
    },
    qr: {
        path: './modules/qr/module.js',
        name: 'QR Scanner',
        icon: 'fa-qrcode',
        protected: false,
        isNav: true
    },
    about: {
        path: './modules/about/module.js',
        name: 'About',
        icon: 'fa-info-circle',
        protected: false,
        isNav: true
    },
    settings: {
        path: './modules/settings/module.js',
        name: 'Settings',
        icon: 'fa-cog',
        protected: false,
        isNav: true
    },
    ghost: {
        path: './modules/ghost/module.js',
        name: '👻 Ghost Stealth Architect',
        icon: 'fa-ghost',
        protected: true,
        hidden: true,
        requiresMaster: true
    }
};

// ========== 4. STATE MANAGEMENT ==========
class AppState {
    constructor() {
        this.currentUser = null;
        this.currentRole = null;
        this.activeModule = 'home';
        this.sessionStart = null;
        this.lastActivity = Date.now();
        this.loginAttempts = 0;
        this.ghostMode = false;
    }

    getUser() {
        return this.currentUser || sessionStorage.getItem('dreamos_user') || 'Guest';
    }

    getRole() {
        return this.currentRole || sessionStorage.getItem('dreamos_role') || 'guest';
    }

    hasAccess(moduleId) {
        const role = this.getRole();
        const config = ROLE_CONFIG[role];
        if (!config) return false;
        if (config.modules.includes('*')) return true;
        return config.modules.includes(moduleId);
    }

    updateActivity() {
        this.lastActivity = Date.now();
    }

    checkIdle() {
        const idle = Date.now() - this.lastActivity;
        return idle > CONFIG.security.idleTimeout;
    }

    setGhostMode(enabled) {
        this.ghostMode = enabled;
        if (enabled) console.log('👻 GHOST MODE ACTIVATED');
    }
}

const appState = new AppState();

// ========== 5. SUPABASE CLIENT ==========
let supabase = null;

async function initSupabase() {
    if (supabase) return supabase;
    try {
        if (window.supabase && window.supabase.createClient) {
            supabase = window.supabase.createClient(CONFIG.supabase.url, CONFIG.supabase.key);
            console.log('✅ Supabase Connected');
            return supabase;
        } else {
            throw new Error('Supabase library not loaded');
        }
    } catch (error) {
        console.error('❌ Supabase init failed:', error);
        return null;
    }
}

// ========== 6. AUTHENTICATION SYSTEM ==========
class Auth {
    static login(password) {
        for (const [role, config] of Object.entries(ROLE_CONFIG)) {
            if (config.passwords.includes(password)) {
                sessionStorage.setItem('dreamos_role', role);
                sessionStorage.setItem('dreamos_user', config.displayName);
                sessionStorage.setItem('dreamos_session_start', Date.now().toString());
                appState.currentRole = role;
                appState.currentUser = config.displayName;
                appState.sessionStart = Date.now();
                appState.loginAttempts = 0;
                console.log(`✅ Login successful: ${config.displayName} (${role})`);
                return true;
            }
        }
        appState.loginAttempts++;
        console.warn(`❌ Login failed (${appState.loginAttempts}/${CONFIG.security.maxLoginAttempts})`);
        return false;
    }

    static logout() {
        sessionStorage.clear();
        appState.currentUser = null;
        appState.currentRole = null;
        appState.sessionStart = null;
        console.log('🚪 Logout successful');
        location.reload();
    }

    static checkSession() {
        const sessionStart = sessionStorage.getItem('dreamos_session_start');
        if (!sessionStart) return false;
        const elapsed = Date.now() - parseInt(sessionStart);
        if (elapsed > CONFIG.security.sessionExpiry) {
            console.warn('⏰ Session expired');
            this.logout();
            return false;
        }
        return true;
    }
}

// ========== 7. UI UTILITIES ==========
class UI {
    static toast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.style.cssText = `
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#f59e0b'};
            border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#f59e0b'};
            border-radius: 12px;
            padding: 12px 20px;
            margin-bottom: 10px;
            color: #e2e8f0;
            font-size: 13px;
            animation: slideIn 0.3s ease;
            max-width: 350px;
        `;
        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️';
        toast.innerHTML = `<span style="margin-right:8px;">${icon}</span>${escapeHTML(message)}`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    static confirm(message) {
        return new Promise((resolve) => {
            const result = window.confirm(message);
            resolve(result);
        });
    }

    static modal(title, content) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        modal.innerHTML = `
            <div style="background: rgba(15, 23, 42, 0.95); border: 1px solid #10b981; border-radius: 20px; padding: 30px; max-width: 500px; width: 90%; backdrop-filter: blur(20px);">
                <h3 style="color: #10b981; margin-bottom: 20px; font-size: 20px;">${escapeHTML(title)}</h3>
                <div style="color: #e2e8f0; margin-bottom: 20px;">${content}</div>
                <button onclick="this.closest('div').parentElement.remove()" style="background: #10b981; color: #000; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; cursor: pointer; width: 100%;">
                    Close
                </button>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }
}

// Helper sanitization
function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// ========== 8. SMART SLIDER - 7 SLIDES WITH 7 SECONDS ==========
class SmartSlider {
    constructor() {
        this.slides = [];
        this.currentIndex = 0;
        this.timer = null;
    }

    async fetchSlides() {
        try {
            if (!supabase) await initSupabase();
            const today = new Date().toISOString().slice(0, 10);
            
            // 7 SLIDES untuk 7 detik
            const slidesData = await Promise.all([
                Promise.resolve({ title: '✨ Assalamualaikum', content: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nSemoga hari Anda penuh berkah dan keberuntungan.\n\n🤲 "Barang siapa yang bertakwa kepada Allah, niscaya Dia akan membukakan jalan keluar baginya." (QS. At-Talaq: 2)' }),
                supabase?.from('bookings').select('tanggal, ruang, pemesan').gte('tanggal', today).limit(5),
                supabase?.from('k3_reports').select('lokasi, kejadian').eq('status', 'proses').limit(5),
                Promise.resolve({ title: '🌤️ Weather & Info', content: 'Depok: Cerah Berawan (29°C)\nLalin Margonda: Padat Lancar\n\n📊 Kelembaban: 65%\n💨 Angin: 12 km/h' }),
                supabase?.from('admin_info').select('content').eq('category', 'umum').order('created_at', {ascending:false}).limit(1),
                supabase?.from('admin_info').select('content').eq('category', 'manajemen').order('created_at', {ascending:false}).limit(1),
                Promise.resolve({ title: '💝 Quote of the Day', content: '"The best among you are those who have the best manners and character."\n\n— Prophet Muhammad ﷺ\n\n✨ Semoga hari Anda penuh berkah!' })
            ]);
            
            this.slides = [
                slidesData[0],
                { title: '📅 Today\'s Booking', content: slidesData[1]?.data?.length ? `📊 ${slidesData[1].data.length} booking aktif\n\n${slidesData[1].data.slice(0,3).map(b => `• ${b.ruang || 'Ruangan'} - ${b.pemesan || 'Guest'}`).join('\n')}` : '📭 Tidak ada booking hari ini.\nSilakan booking ruangan melalui menu Booking.' },
                { title: '⚠️ K3 Reports', content: slidesData[2]?.data?.length ? `🚨 ${slidesData[2].data.length} laporan dalam proses\n\n${slidesData[2].data.slice(0,3).map(k => `• ${k.lokasi || 'Area'} - ${k.kejadian || 'Dalam penanganan'}`).join('\n')}` : '✅ Semua aman!\nTidak ada laporan insiden.' },
                slidesData[3],
                { title: '📋 Info Umum', content: slidesData[4]?.data?.[0]?.content || '📌 Kehadiran: 100%\n📌 Rapat mingguan: Senin 09.00\n📌 Kegiatan: Training ISO 27001' },
                { title: '🏛️ Info Manajemen', content: slidesData[5]?.data?.[0]?.content || '📊 Rapat Direksi: Jumat 14.00\n📊 Review Performa: Bulanan\n📊 Target Q2: 85%' },
                slidesData[6]
            ];
        } catch (error) {
            console.error('Slide fetch error:', error);
            // 7 SLIDES FALLBACK
            this.slides = [
                { title: '✨ Assalamualaikum', content: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nSelamat datang di Dream OS Enterprise' },
                { title: '📅 Booking', content: 'Booking system ready' },
                { title: '⚠️ K3', content: 'Safety first! Semua aman' },
                { title: '🌤️ Weather', content: 'Depok: Cerah Berawan (29°C)' },
                { title: '📋 Info Umum', content: 'Kehadiran: 100%' },
                { title: '🏛️ Manajemen', content: 'Rapat Direksi: Jumat' },
                { title: '💝 Quote', content: 'The best among you are those with the best manners.' }
            ];
        }
    }

    render() {
        const wrapper = document.getElementById('sliderWrapper');
        const dots = document.getElementById('sliderDots');
        if (!wrapper) return;
        
        wrapper.innerHTML = this.slides.map((slide, i) => `
            <div class="slider-slide" style="min-width: 100%; padding: 30px; text-align: center;">
                <h3 style="color: #10b981; font-size: 20px; margin-bottom: 12px;">${escapeHTML(slide.title)}</h3>
                <div style="color: #94a3b8; font-size: 14px; line-height: 1.6; white-space: pre-line;">${escapeHTML(slide.content)}</div>
            </div>
        `).join('');
        
        if (dots) {
            dots.innerHTML = this.slides.map((_, i) => `
                <button class="slider-dot ${i === this.currentIndex ? 'active' : ''}" onclick="window.goToSlide(${i})"
                    style="width: 10px; height: 10px; border-radius: 50%; background: ${i === this.currentIndex ? '#10b981' : 'rgba(255,255,255,0.3)'}; border: none; cursor: pointer; transition: all 0.3s;">
                </button>
            `).join('');
        }
        this.updateSlide();
    }

    updateSlide() {
        const wrapper = document.getElementById('sliderWrapper');
        if (wrapper) wrapper.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.render();
    }

    goTo(index) {
        this.currentIndex = index;
        this.render();
    }

    start() {
        if (this.timer) clearInterval(this.timer);
        if (CONFIG.slides.autoRotate) {
            this.timer = setInterval(() => this.next(), CONFIG.slides.interval); // 7000ms = 7 detik
        }
    }

    stop() {
        if (this.timer) clearInterval(this.timer);
    }
}

const slider = new SmartSlider();

// ========== 9. MODULE LOADER ==========
class ModuleLoader {
    constructor() {
        this.currentModule = null;
        this.currentCleanup = null;
    }

    async render(moduleId) {
        try {
            if (!appState.hasAccess(moduleId) && moduleId !== 'ghost') {
                UI.toast(`⛔ Access denied to ${moduleId}`, 'error');
                return;
            }
            const moduleData = MODULE_REGISTRY[moduleId];
            if (!moduleData) {
                UI.toast(`Module ${moduleId} not found`, 'error');
                return;
            }
            if (moduleId === 'ghost' && !appState.ghostMode) {
                UI.toast('👻 Ghost access required', 'error');
                return;
            }

            const container = document.getElementById('main-content');
            if (!container) return;
            container.innerHTML = '<div style="text-align: center; padding: 50px; color: #94a3b8;"><i class="fas fa-spinner fa-spin" style="font-size: 2rem; margin-bottom: 15px;"></i><br>Loading module...</div>';

            if (this.currentCleanup && typeof this.currentCleanup === 'function') this.currentCleanup();

            const module = await import(moduleData.path);
            if (!module.default || typeof module.default.render !== 'function') throw new Error('Invalid module structure');

            const renderContext = {
                supabase,
                user: {
                    name: appState.getUser(),
                    role: appState.getRole(),
                    level: ROLE_CONFIG[appState.getRole()]?.level || 0
                },
                toast: UI.toast,
                confirm: UI.confirm,
                modal: UI.modal,
                navigate: (id) => this.render(id)
            };

            const html = await module.default.render(renderContext);
            container.innerHTML = html;
            if (module.default.afterRender) await module.default.afterRender(renderContext);
            if (module.default.cleanup) this.currentCleanup = module.default.cleanup;
            this.currentModule = moduleId;
            appState.activeModule = moduleId;
            console.log(`✅ Module loaded: ${moduleId}`);
        } catch (error) {
            console.error(`Module load error (${moduleId}):`, error);
            UI.toast(`Failed to load ${moduleId}: ${error.message}`, 'error');
            const container = document.getElementById('main-content');
            if (container) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 50px;">
                        <div style="font-size: 3rem; margin-bottom: 20px;">❌</div>
                        <h3 style="color: #ef4444; margin-bottom: 10px;">Module Load Failed</h3>
                        <p style="color: #94a3b8; font-size: 14px;">${escapeHTML(error.message)}</p>
                        <button onclick="window.DREAM.navigate('home')" style="margin-top: 20px; padding: 12px 24px; background: #10b981; color: #000; border: none; border-radius: 8px; font-weight: 700; cursor: pointer;">
                            Return Home
                        </button>
                    </div>
                `;
            }
        }
    }
}

const moduleLoader = new ModuleLoader();

// ========== 10. LOGIN MODAL ==========
function showLoginModal() {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.id = 'login-modal';
        modal.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.95);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;
        modal.innerHTML = `
            <div style="background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(20px); border: 1px solid #10b981; border-radius: 24px; padding: 40px; width: 90%; max-width: 400px; text-align: center;">
                <img src="./icons/icon-192.png" alt="Dream OS Logo" style="width: 120px; height: 120px; margin-bottom: 20px; border-radius: 20px;">
                <p style="font-family: 'Amiri', serif; font-size: 20px; color: #10b981; margin-bottom: 20px;">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                <h2 style="color: #10b981; margin-bottom: 30px;">DREAM OS v2.1</h2>
                <div style="position: relative; margin-bottom: 20px;">
                    <input type="password" id="login-password" placeholder="Enter password..." 
                        style="width: 100%; padding: 15px 45px 15px 15px; background: rgba(0,0,0,0.5); border: 2px solid rgba(16,185,129,0.3); border-radius: 12px; color: #fff; font-size: 16px; outline: none; transition: border-color 0.3s;">
                    <button id="toggle-password" type="button" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 20px;">👁️</button>
                </div>
                <button id="login-submit" style="width: 100%; padding: 15px; background: linear-gradient(135deg, #10b981, #34d399); border: none; border-radius: 12px; color: #000; font-weight: 900; font-size: 16px; cursor: pointer; transition: transform 0.2s; margin-bottom: 20px;">LOGIN</button>
                <div style="color: #64748b; font-size: 11px; line-height: 1.6;">
                    <p>Demo Password:</p>
                    <p style="color: #10b981; font-family: monospace; font-size: 10px; margin-top: 5px;">b15m1ll4h_012443410</p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        const input = modal.querySelector('#login-password');
        const toggle = modal.querySelector('#toggle-password');
        const submit = modal.querySelector('#login-submit');
        toggle.onclick = () => { input.type = input.type === 'password' ? 'text' : 'password'; toggle.innerHTML = input.type === 'password' ? '👁️' : '🙈'; };
        const attemptLogin = () => {
            const password = input.value.trim();
            if (!password) { UI.toast('Please enter password', 'error'); return; }
            if (Auth.login(password)) {
                modal.remove();
                UI.toast(`Welcome ${appState.getUser()}!`, 'success');
                resolve(true);
            } else {
                UI.toast('Invalid password', 'error');
                input.value = '';
                input.focus();
                if (appState.loginAttempts >= CONFIG.security.maxLoginAttempts) {
                    UI.toast('Too many attempts. Please refresh.', 'error');
                    submit.disabled = true;
                }
            }
        };
        submit.onclick = attemptLogin;
        input.onkeypress = (e) => { if (e.key === 'Enter') attemptLogin(); };
        input.focus();
    });
}

// ========== 11. APP RENDERER - BOTTOM NAV 5 MENU ==========
async function renderApp() {
    const appShell = document.getElementById('app-shell');
    if (!appShell) return;

    await slider.fetchSlides();

    // NAVIGATION MODULES (5 BOTTOM NAV)
    const navModules = ['home', 'profile', 'qr', 'about', 'settings'];
    const gridModules = Object.entries(MODULE_REGISTRY).filter(([id, mod]) => !mod.isNav && !mod.hidden && !navModules.includes(id));

    appShell.innerHTML = `
        <header class="islamic-header" id="islamic-header" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(2, 6, 23, 0.95) 100%); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 20px; padding: 25px; margin: 16px; text-align: center; cursor: pointer; transition: all 0.3s;">
            <p class="bismillah" style="font-family: 'Amiri', serif; font-size: 24px; color: #10b981; margin-bottom: 8px; text-shadow: 0 0 20px rgba(16,185,129,0.5);">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <p class="shalawat" style="font-family: 'Amiri', serif; font-size: 18px; color: #34d399; margin-bottom: 8px;">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</p>
            <p class="tagline" style="color: #64748b; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">THE POWER SOUL OF SHALAWAT</p>
        </header>
        <div class="slider-container" style="margin: 16px; border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 16px; overflow: hidden; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(10px); min-height: 180px;">
            <div class="slider-wrapper" id="sliderWrapper" style="display: flex; transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);"></div>
            <div class="slider-dots" id="sliderDots" style="display: flex; justify-content: center; padding: 12px; gap: 8px;"></div>
        </div>
        <div class="module-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 16px;">
            ${gridModules.map(([id, mod]) => `
                <div class="module-card" data-module="${id}" onclick="window.DREAM.navigate('${id}')" style="background: linear-gradient(135deg, rgba(${hexToRgb(mod.color).r}, ${hexToRgb(mod.color).g}, ${hexToRgb(mod.color).b}, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%); border: 1px solid rgba(${hexToRgb(mod.color).r}, ${hexToRgb(mod.color).g}, ${hexToRgb(mod.color).b}, 0.3); border-radius: 16px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.3s; backdrop-filter: blur(10px);">
                    <div class="module-icon" style="width: 60px; height: 60px; margin: 0 auto 12px; background: linear-gradient(135deg, ${mod.color}, ${lightenColor(mod.color)}); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 26px; color: #000; box-shadow: 0 4px 12px rgba(0,0,0,0.3); transition: transform 0.3s;">
                        <i class="fas ${mod.icon}"></i>
                    </div>
                    <span class="module-name" style="color: #e2e8f0; font-size: 12px; font-weight: 600; display: block; margin-bottom: 4px;">${escapeHTML(mod.name)}</span>
                    ${mod.description ? `<span style="color: #64748b; font-size: 9px; display: block;">${escapeHTML(mod.description)}</span>` : ''}
                </div>
            `).join('')}
        </div>
        <div id="main-content" style="padding: 16px; min-height: 400px; margin-bottom: 80px;"></div>
        <nav class="bottom-nav" style="position: fixed; bottom: 0; left: 0; right: 0; background: rgba(2, 6, 23, 0.95); backdrop-filter: blur(30px); border-top: 1px solid rgba(16, 185, 129, 0.3); padding: 8px 0; z-index: 1000; box-shadow: 0 -4px 20px rgba(0,0,0,0.3);">
            <div class="nav-container" style="display: flex; justify-content: space-around; align-items: center; max-width: 600px; margin: 0 auto;">
                ${navModules.map(id => {
                    const mod = MODULE_REGISTRY[id];
                    return `
                        <button class="nav-item" data-module="${id}" onclick="window.DREAM.navigate('${id}')" style="background: none; border: none; color: #64748b; padding: 8px 16px; cursor: pointer; transition: all 0.3s; display: flex; flex-direction: column; align-items: center; gap: 4px;">
                            <i class="fas ${mod.icon}" style="font-size: 20px;"></i>
                            <span style="font-size: 10px; font-weight: 600;">${escapeHTML(mod.name)}</span>
                        </button>
                    `;
                }).join('')}
            </div>
        </nav>
        <footer class="footer" style="text-align: center; padding: 30px 20px; color: #64748b; font-size: 11px; margin-bottom: 80px; border-top: 1px solid rgba(16,185,129,0.1); margin-top: 40px;">
            <p style="margin-bottom: 8px;">
                <img src="./icons/icon-192.png" alt="Dream OS" style="width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin-right: 6px;">
                <strong>DREAM TEAM</strong> © 2026 · v${CONFIG.version}
            </p>
            <p style="margin-bottom: 8px;">AUTO SHALAT · LIQUID CRYSTAL · ISO 27001 · ISO 9001</p>
            <p>Built with 💚 <strong>Bi idznillah</strong> · Enterprise Edition</p>
        </footer>
    `;

    slider.render();
    slider.start();
    await moduleLoader.render('home');

    const loading = document.getElementById('loading-screen');
    if (loading) {
        loading.style.opacity = '0';
        loading.style.transition = 'opacity 0.5s ease';
        setTimeout(() => loading.style.display = 'none', 500);
    }

    UI.toast('✅ Dream OS Enterprise Ready!', 'success');
}

// Utility functions
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 16, g: 185, b: 129 };
}
function lightenColor(hex) {
    const { r, g, b } = hexToRgb(hex);
    return `rgb(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)})`;
}

// ========== 12. GHOST STEALTH ARCHITECT ==========
function initGhostActivation() {
    let tapCount = 0, timeout = null;
    const header = document.getElementById('islamic-header');
    if (!header) return;
    header.addEventListener('click', () => {
        tapCount++;
        header.style.transform = 'scale(0.98)';
        setTimeout(() => header.style.transform = 'scale(1)', 100);
        if (timeout) clearTimeout(timeout);
        if (tapCount === CONFIG.ghost.tapCount) {
            const code = prompt('🔑 GHOST STEALTH ARCHITECT ACCESS CODE:');
            if (code === CONFIG.ghost.code) {
                appState.setGhostMode(true);
                header.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(2, 6, 23, 0.95) 100%)';
                header.style.borderColor = '#8b5cf6';
                UI.toast('👻 GHOST STEALTH ARCHITECT ACTIVATED!', 'success');
                moduleLoader.render('ghost');
            } else if (code !== null) UI.toast('❌ Invalid Ghost Code', 'error');
            tapCount = 0;
            return;
        }
        timeout = setTimeout(() => { tapCount = 0; }, CONFIG.ghost.timeout);
    });
}

// ========== 13. IDLE MONITOR ==========
function initIdleMonitor() {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => document.addEventListener(event, () => appState.updateActivity(), true));
    setInterval(() => {
        if (appState.checkIdle() && appState.getRole() !== 'guest') {
            UI.toast('⏰ Session timeout due to inactivity', 'warning');
            setTimeout(() => Auth.logout(), 2000);
        }
    }, 30000);
}

// ========== 14. GLOBAL API ==========
window.DREAM = {
    version: CONFIG.version,
    navigate: (moduleId) => moduleLoader.render(moduleId),
    toast: UI.toast,
    confirm: UI.confirm,
    modal: UI.modal,
    state: appState,
    slider: slider,
    auth: Auth,
    config: CONFIG
};
window.goToSlide = (index) => slider.goTo(index);

// ========== 15. INITIALIZATION ==========
async function init() {
    console.log("🚀 Initializing Dream OS v2.1 Sovereign Remastered...");
    const forceHideLoading = () => {
        const loading = document.getElementById("loading-screen");
        if (loading) {
            loading.style.opacity = "0";
            setTimeout(() => loading.style.display = "none", 500);
        }
    };
    try { await initSupabase(); } catch (e) { console.warn("Supabase Offline"); }
    const existingRole = sessionStorage.getItem("dreamos_role");
    if (!existingRole) {
        forceHideLoading();
        const loginSuccess = await showLoginModal();
        if (!loginSuccess) return;
    } else {
        if (!Auth.checkSession()) {
            forceHideLoading();
            await showLoginModal();
        }
    }
    await renderApp();
    initGhostActivation();
    initIdleMonitor();
}
init();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeOut { from { opacity:1; transform:translateY(0); } to { opacity:0; transform:translateY(-10px); } }
    @keyframes slideIn { from { opacity:0; transform:translateX(-50%) translateY(20px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
    @keyframes slideOut { from { opacity:1; transform:translateX(-50%) translateY(0); } to { opacity:0; transform:translateX(-50%) translateY(-20px); } }
    .nav-item.active { color: #10b981 !important; }
    .module-card.active { border-color: #10b981 !important; box-shadow: 0 0 30px rgba(16, 185, 129, 0.5) !important; }
    .animate-fade-in { animation: fadeIn 0.5s ease; }
`;
document.head.appendChild(style);
console.log('💚 بارك الله فيكم - May Allah bless you');

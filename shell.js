/**
 * ════════════════════════════════════════════
 * SHELL.JS - DREAM OS v2.1 (FIXED VERSION)
 * Proper Module Loading + Error Logging
 * ════════════════════════════════════════════ */

'use strict';

// 19 MODULES - PATHS SUDAH FIX!
const MODULES = {
    'home': { icon: 'fa-home', color: '#10b981', label: 'Home', subtitle: 'Dashboard' },
    'ai-panel': { icon: 'fa-brain', color: '#8b5cf6', label: 'AI Panel', subtitle: 'Neural Control' },
    'ai-speak': { icon: 'fa-microchip', color: '#06b6d4', label: 'AI Speak', subtitle: 'Voice Synthesis' },
    'prediction': { icon: 'fa-chart-line', color: '#10b981', label: 'Prediction', subtitle: 'Forecast Analytics' },
    'booking': { icon: 'fa-calendar-check', color: '#3b82f6', label: 'Booking', subtitle: 'Pemesanan Ruangan' },
    'asset': { icon: 'fa-cubes', color: '#f59e0b', label: 'Asset', subtitle: 'Inventaris & Gudang' },
    'stok': { icon: 'fa-boxes', color: '#ef4444', label: 'Stok', subtitle: 'Peralatan & Inventaris' },
    'maintenance': { icon: 'fa-wrench', color: '#64748b', label: 'Maintenance', subtitle: 'Perbaikan & Kerusakan' },
    'sekuriti': { icon: 'fa-shield-halved', color: '#0ea5e9', label: 'Sekuriti', subtitle: 'Keamanan & Kehilangan' },
    'k3': { icon: 'fa-triangle-exclamation', color: '#eab308', label: 'K3', subtitle: 'Keselamatan & Kesehatan' },
    'k3-officer': { icon: 'fa-user-shield', color: '#059669', label: 'K3 Officer', subtitle: 'Safety Personnel' },
    'janitor-indoor': { icon: 'fa-broom', color: '#84cc16', label: 'Janitor In', subtitle: 'Kebersihan Indoor' },
    'janitor-outdoor': { icon: 'fa-leaf', color: '#22c55e', label: 'Janitor Out', subtitle: 'Kebersihan Outdoor' },
    'weather': { icon: 'fa-cloud-sun', color: '#f97316', label: 'Weather', subtitle: 'Climate Monitor' },
    'command-center': { icon: 'fa-chess-queen', color: '#a855f7', label: 'Command Center', subtitle: 'Pusat Kendali' },
    'settings': { icon: 'fa-sliders', color: '#64748b', label: 'Settings', subtitle: 'System Config' },
    'profile': { icon: 'fa-user', color: '#ec4899', label: 'Profile', subtitle: 'User Account' },
    'qr': { icon: 'fa-qrcode', color: '#14b8a6', label: 'QR Scanner', subtitle: 'Scan & Generate' },
    'reports': { icon: 'fa-file-lines', color: '#3b82f6', label: 'Reports', subtitle: 'Laporan Terpusat' },
    'ghost': { icon: 'fa-ghost', color: '#8b5cf6', label: 'Ghost Core', subtitle: 'Developer Access', hidden: true }
};

window.MODULES = MODULES;
window.currentModule = 'home';

// SLIDER
let currentSlide = 0;
let slideInterval = null;

window.goToSlide = function(index) {
    currentSlide = index;
    document.querySelectorAll('[data-slide]').forEach((s,i) => s.style.display = i===index ? 'block' : 'none');
    document.querySelectorAll('[data-slide]').forEach((s,i) => {
        const btn = s.parentNode.nextElementSibling?.children[i];
        if(btn) btn.style.background = i===index ? 'var(--color-primary)' : 'var(--text-subtle)';
    });
};

function startSlideShow() {
    if (slideInterval) clearInterval(slideInterval);    slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % 7;
        window.goToSlide(currentSlide);
    }, 7000);
}

// GHOST TRIGGER
let ghostTaps = 0;
let ghostTimeout = null;

function setupGhostTrigger() {
    const zone = document.getElementById('ghost-trigger-zone');
    if (!zone) return;
    
    const newZone = zone.cloneNode(true);
    zone.parentNode.replaceChild(newZone, zone);
    
    newZone.addEventListener('click', () => {
        ghostTaps++;
        if ('vibrate' in navigator) navigator.vibrate(30);
        
        if (ghostTimeout) clearTimeout(ghostTimeout);
        
        if (ghostTaps === 5) {
            ghostTaps = 0;
            setTimeout(() => {
                const code = prompt('🔑 GHOST ACCESS CODE:');
                if (code === 'dreamos2026') {
                    if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
                    toast('👻 Ghost Mode Activated!', 'success');
                    loadModule('ghost');
                } else if (code !== null) {
                    toast('❌ Access Denied', 'error');
                }
            }, 200);
            return;
        }
        
        ghostTimeout = setTimeout(() => ghostTaps = 0, 2000);
    });
}

// MODULE LOADER - IMPROVED!
async function loadModule(moduleName) {
    const app = document.getElementById('app-shell');
    if (!app) {
        console.error('❌ app-shell not found!');
        return;
    }
    console.log(`🔄 Loading module: ${moduleName}`);
    
    // Update nav
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navItem = document.querySelector(`[data-nav="${moduleName}"]`);
    if (navItem) navItem.classList.add('active');
    
    // Haptic
    if ('vibrate' in navigator) navigator.vibrate(30);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Home module - HARDCODED
    if (moduleName === 'home') {
        app.innerHTML = renderHome();
        setTimeout(() => { startSlideShow(); setupGhostTrigger(); }, 500);
        window.currentModule = 'home';
        return;
    }
    
    // Show loading
    app.innerHTML = `
        <div class="module-container active">
            <div style="text-align:center;padding:60px 20px;">
                <div class="loader"></div>
                <p style="margin-top:1rem;color:var(--color-primary);">Loading ${moduleName}...</p>
            </div>
        </div>
    `;
    
    try {
        const mod = MODULES[moduleName];
        if (!mod) throw new Error(`Module "${moduleName}" not found in MODULES`);
        
        // Try to load module file
        const modulePath = `./modules/${moduleName}/module.js?t=${Date.now()}`;
        console.log(`📂 Trying to load: ${modulePath}`);
        
        const module = await import(modulePath);
        console.log(`✅ Module imported: ${moduleName}`, module);
        
        if (!module.render) {
            throw new Error(`Module "${moduleName}" does not have render() function`);
        }
        
        // Render module
        const html = await module.render({
            container: app,
            user: window.DREAM?.state?.user,
            supabase: window.supabase
        });        
        app.innerHTML = html;
        console.log(`✅ Module rendered: ${moduleName}`);
        
        // Call afterRender if exists
        if (module.afterRender) {
            await module.afterRender({
                container: app,
                user: window.DREAM?.state?.user,
                supabase: window.supabase
            });
            console.log(`✅ afterRender called: ${moduleName}`);
        }
        
        window.currentModule = moduleName;
        
    } catch (error) {
        console.error(`❌ Module load error: ${moduleName}`, error);
        
        // Show detailed error
        app.innerHTML = `
            <div class="module-container active">
                <div style="text-align:center;padding:60px 20px;">
                    <div style="font-size:3rem;margin-bottom:1rem;">⚠️</div>
                    <h2 style="color:var(--color-warning);font-size:1.5rem;">Module Not Ready</h2>
                    <p style="color:var(--text-muted);margin:1rem 0;">${moduleName}</p>
                    <p style="color:var(--text-subtle);font-size:0.875rem;margin-bottom:1rem;">${error.message}</p>
                    <div style="background:rgba(239,68,68,0.1);padding:1rem;border-radius:8px;margin-bottom:1rem;text-align:left;font-size:0.75rem;color:var(--color-error);">
                        <strong>Error:</strong><br>
                        ${error.message}<br><br>
                        <strong>Path:</strong><br>
                        ./modules/${moduleName}/module.js<br><br>
                        <strong>Check:</strong><br>
                        1. File exists on GitHub<br>
                        2. File has render() function<br>
                        3. File exports properly
                    </div>
                    <button class="btn-primary" onclick="loadModule('home')">← Back to Home</button>
                </div>
            </div>
        `;
    }
}

// TOAST
function toast(msg, type = 'success') {
    const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;    const container = document.getElementById('toast-container');
    if (container) {
        container.appendChild(el);
        setTimeout(() => { el.style.opacity='0'; setTimeout(() => el.remove(), 350); }, 3500);
    }
}

window.toast = toast;
window.loadModule = loadModule;

// INIT
function init() {
    console.log('🚀 [DREAM OS] v2.1 Initializing...');
    console.log('📦 Available Modules:', Object.keys(MODULES).length);
    loadModule('home');
    
    setTimeout(() => {
        const loading = document.getElementById('loading-screen');
        if (loading) loading.classList.add('hide');
    }, 1500);
    
    console.log('✅ [DREAM OS] Ready!');
    console.log('📦 19 Modules | 📢 7 Slides | 👻 Ghost Mode');
    console.log('💡 Tip: Check console for module load errors');
}

// Run
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

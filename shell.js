/**
 * SOVEREIGN KERNEL v13.6
 * Integrated with Brain Hub LUX v3.5
 */

const MODULES = {
    'home': { path: './modules/home.js' },
    'k3': { path: './modules/k3.js' },
    'asset': { path: './modules/asset.js' },
    'settings': { path: './modules/settings.js' },
    'ghost': { path: './modules/ghost/brain-hub.js' }
};

class SovereignShell {
    constructor() {
        this.ghostCounter = 0;
        this.ghostTimer = null;
        this.init();
    }

    init() {
        window.DREAM = this;
        console.log("⚡ Sovereign Kernel Active.");
        
        // Ghost Header Trigger Logic
        document.getElementById('ghost-header-trigger').onclick = () => this.handleGhostClick();

        // Boot Sequence
        setTimeout(() => this.load('home'), 1500);
    }

    async load(key) {
        this.haptic(40);
        const viewport = document.getElementById('root-viewport');
        const loader = document.getElementById('system-loader');
        const nav = document.getElementById('main-nav');
        const mod = MODULES[key];

        if (!mod) return;

        try {
            // Import module dengan cache buster agar selalu fresh
            const { default: renderModule } = await import(`${mod.path}?v=${Date.now()}`);
            
            viewport.innerHTML = ''; 
            await renderModule({ container: viewport, user: { email: 'girangati1001@gmail.com', role: 'architect' } });

            // Smooth Transition
            if(loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
            }
            nav.style.display = 'flex';
            this.updateNav(key);

        } catch (err) {
            console.error(`[KERNEL ERROR] Failed to load ${key}:`, err);
            // Emergency Antibody: Reload if stuck
            alert("Sistem mendeteksi anomali. Meregenerasi...");
            location.reload();
        }
    }

    handleGhostClick() {
        this.ghostCounter++;
        this.haptic(30);
        clearTimeout(this.ghostTimer);
        this.ghostTimer = setTimeout(() => this.ghostCounter = 0, 2000);

        if (this.ghostCounter >= 5) {
            console.log("👻 Ghost Sequence Validated.");
            this.ghostCounter = 0;
            this.load('ghost');
        }
    }

    updateNav(key) {
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.remove('active');
            if (el.getAttribute('onclick')?.includes(`'${key}'`)) el.classList.add('active');
        });
    }

    haptic(ms) {
        if (navigator.vibrate) navigator.vibrate(ms);
    }
}

new SovereignShell();

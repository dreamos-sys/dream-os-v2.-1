// Dream OS - Core System
import { APP_CONFIG } from '../config/app.js';

class DreamOS {
    constructor() {
        this.initialized = false;
        this.modules = new Map();
        this.state = {
            user: null,
            role: null,
            sessionStart: null,
            ghostMode: false,
            debug: APP_CONFIG.debug
        };
    }
    
    async init() {
        console.log('🚀 Initializing Dream OS...');
        
        // Check ghost mode emergency access
        if (sessionStorage.getItem('ghost_emergency')) {
            this.state.ghostMode = true;
            console.log('👻 Ghost Emergency Mode Activated');
        }
        
        // Load core modules
        await this.loadCoreModules();
        
        this.initialized = true;
        console.log('✅ Dream OS Ready');
        return this;
    }
    
    async loadCoreModules() {
        try {
            const coreModules = APP_CONFIG.modules.core;
            for (const moduleName of coreModules) {
                const module = await import(`../modules/${moduleName}/module.js`);
                this.modules.set(moduleName, module.default);
                console.log(`📦 Loaded: ${moduleName}`);
            }
        } catch (error) {
            console.error('Core module load error:', error);
            this.enterGhostMode('core_load_failed');
        }
    }
    
    enterGhostMode(reason) {
        this.state.ghostMode = true;
        this.state.ghostReason = reason;
        sessionStorage.setItem('ghost_emergency', reason);
        console.warn(`👻 Ghost Mode Activated - Reason: ${reason}`);
        
        // Show ghost notification
        const ghostNotif = document.createElement('div');
        ghostNotif.innerHTML = `
            <div style="position:fixed;top:20px;right:20px;background:linear-gradient(135deg,#1e1b4b,#0c0a2a);border:2px solid #a855f7;border-radius:12px;padding:12px 20px;z-index:99999;animation:fadeIn 0.3s;">
                <i class="fas fa-ghost" style="color:#a855f7;"></i>
                <strong style="color:#a855f7;"> Ghost Mode Active</strong>
                <p style="font-size:10px;margin:0;">Emergency access granted</p>
            </div>
        `;
        document.body.appendChild(ghostNotif);
        setTimeout(() => ghostNotif.remove(), 5000);
    }
    
    async loadModule(moduleName) {
        if (this.modules.has(moduleName)) {
            return this.modules.get(moduleName);
        }
        
        try {
            const module = await import(`../modules/${moduleName}/module.js`);
            this.modules.set(moduleName, module.default);
            return module.default;
        } catch (error) {
            console.error(`Failed to load module: ${moduleName}`, error);
            if (this.state.ghostMode) {
                return this.getGhostFallback(moduleName);
            }
            throw error;
        }
    }
    
    getGhostFallback(moduleName) {
        return {
            name: `${moduleName} (Ghost Mode)`,
            render: async () => `
                <div style="text-align:center;padding:40px;">
                    <i class="fas fa-ghost" style="font-size:48px;color:#a855f7;"></i>
                    <h3 style="color:#a855f7;">Ghost Mode Active</h3>
                    <p>Module ${moduleName} is in ghost recovery mode</p>
                    <details style="margin-top:20px;text-align:left;">
                        <summary style="cursor:pointer;color:#a855f7;">Debug Info</summary>
                        <pre style="background:#000;padding:10px;border-radius:8px;font-size:10px;">${JSON.stringify({module: moduleName, ghost: true, timestamp: new Date().toISOString()}, null, 2)}</pre>
                    </details>
                </div>
            `
        };
    }
    
    getState() {
        return this.state;
    }
    
    isGhostMode() {
        return this.state.ghostMode;
    }
}

export const dreamOS = new DreamOS();

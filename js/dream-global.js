/* ============================================
   🕌 DREAM OS 2026 - GLOBAL OBJECT
   MUST LOAD BEFORE ANY OTHER SCRIPT
   ============================================ */

(function() {
    // Create global DREAM object
    window.DREAM = {
        version: '2026.1.0',
        env: 'production',
        state: {
            currentModule: 'home',
            user: null,
            session: null,
            prayerTimes: null,
            networkStatus: navigator.onLine,
            batteryLevel: null,
            lastSync: null,
            theme: 'dark',
            language: 'id'
        },
        config: {
            supabase: {
                url: 'https://your-project.supabase.co',
                key: 'your-anon-key'
            },
            cloudflare: {
                workerUrl: 'https://your-worker.workers.dev'
            },
            api: {
                prayerTime: 'https://api.aladhan.com/v1/timingsByCity',
                quran: 'https://api.alquran.cloud/v1'
            }
        },
        modules: new Map(),
        cache: new Map(),
        utils: {},
        
        load: function(moduleName, params) {
            console.log('[DREAM.load]', moduleName);
            if (window.app && typeof window.app.loadModule === 'function') {
                return window.app.loadModule(moduleName, params);
            }
            console.warn('[DREAM] App not initialized yet');
        },
        
        showToast: function(message, type = 'info', duration = 3000) {
            const container = document.getElementById('toast-container');
            if (!container) {
                console.log('[TOAST]', message, type);
                return;
            }
            
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.style.cssText = `
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(16, 185, 129, 0.3);
                border-radius: 12px;
                padding: 1rem 1.5rem;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
                margin-bottom: 8px;
                color: #e2e8f0;
                font-size: 0.875rem;
            `;
            
            if (type === 'success') toast.style.borderLeft = '4px solid #10b981';
            if (type === 'error') toast.style.borderLeft = '4px solid #ef4444';
            if (type === 'warning') toast.style.borderLeft = '4px solid #f59e0b';
            
            toast.innerHTML = `<span>${message}</span>`;
            container.appendChild(toast);
            
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(100%)';
                toast.style.transition = 'all 0.3s ease-in-out';
                setTimeout(() => toast.remove(), 300);
            }, duration);
        },
        
        trackEvent: function(eventName, data = {}) {
            console.log('[ANALYTICS]', eventName, data);
            if (window.ANALYTICS) {
                window.ANALYTICS.track(eventName, data);
            }
        }
    };
    
    console.log('✅ [DREAM] Global object initialized');
    console.log('🕌 Dream OS 2026 Version:', window.DREAM.version);
})();

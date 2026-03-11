/**
 * DREAM OS 2026 - FINAL POLISH JAVASCRIPT
 * Production Ready Enhancements
 * Bismillah & Shalawat Standard
 */

// ============================================================
// 1. THEME PERSISTENCE
// ============================================================

DREAM.initTheme = function() {
    const savedTheme = localStorage.getItem('dream-theme') || 'emerald-dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    console.log('[THEME] Loaded:', savedTheme);
};

DREAM.setTheme = function(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('dream-theme', themeName);
    console.log('[THEME] Changed to:', themeName);
    this.showToast(`Tema diubah ke ${themeName}`, 'success');
};

DREAM.toggleTheme = function() {
    const current = document.documentElement.getAttribute('data-theme');
    const isDark = current.includes('dark');
    const newTheme = isDark ? current.replace('dark', 'light') : current.replace('light', 'dark');
    this.setTheme(newTheme);
};

// Initialize theme on load
DREAM.initTheme();

// ============================================================
// 2. KEYBOARD NAVIGATION
// ============================================================

document.addEventListener('keydown', (e) => {
    // Escape - Close current module
    if (e.key === 'Escape' && window.app && window.app.state && window.app.state.currentModule) {
        window.app.closeCurrentModule();
        DREAM.showToast('Kembali ke Dashboard', 'info');
    }
    
    // T - Toggle Theme
    if (e.key === 't' && e.ctrlKey) {
        e.preventDefault();
        DREAM.toggleTheme();
    }
        // F12 - Toggle Performance Monitor (Dev only)
    if (e.key === 'F12') {
        e.preventDefault();
        const monitor = document.getElementById('performance-monitor');
        if (monitor) {
            monitor.classList.toggle('hidden');
        }
    }
});

// ============================================================
// 3. HAPTIC FEEDBACK (Mobile)
// ============================================================

function hapticFeedback(pattern = 'light') {
    if ('vibrate' in navigator) {
        const patterns = {
            light: 10,
            medium: 20,
            heavy: [30, 50, 30],
            success: [50, 100, 50],
            error: [100, 50, 100],
            warning: [50, 50, 50]
        };
        navigator.vibrate(patterns[pattern] || patterns.light);
    }
}

// Add to all interactive elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-item, .btn-primary, .module-card').forEach(el => {
        el.addEventListener('click', () => {
            hapticFeedback('light');
        });
    });
});

// ============================================================
// 4. PERFORMANCE MONITOR ENHANCED
// ============================================================

class PerformanceMonitor {
    constructor() {
        this.fps = 60;
        this.frames = 0;
        this.prevTime = performance.now();
        this.memoryUsage = 0;
    }
    
    update() {        this.frames++;
        const time = performance.now();
        
        if (time >= this.prevTime + 1000) {
            this.fps = Math.round((this.frames * 1000) / (time - this.prevTime));
            this.prevTime = time;
            this.frames = 0;
            
            // Memory (Chrome only)
            if (performance.memory) {
                this.memoryUsage = Math.round(performance.memory.usedJSHeapSize / 1048576);
            }
            
            // Update UI
            this.updateUI();
        }
        
        requestAnimationFrame(() => this.update());
    }
    
    updateUI() {
        const fpsEl = document.getElementById('fps-counter');
        const memEl = document.getElementById('memory-usage');
        const modEl = document.getElementById('module-count');
        
        if (fpsEl) {
            fpsEl.textContent = this.fps;
            fpsEl.style.color = this.fps >= 55 ? '#10b981' : this.fps >= 30 ? '#f59e0b' : '#ef4444';
        }
        
        if (memEl && this.memoryUsage > 0) {
            memEl.textContent = this.memoryUsage;
        }
        
        if (modEl && window.DREAM) {
            modEl.textContent = window.DREAM.modules?.size || 0;
        }
    }
    
    start() {
        this.update();
        console.log('[PERF] Monitor started');
    }
}

// Start performance monitoring
if (document.getElementById('performance-monitor')) {
    const monitor = new PerformanceMonitor();
    monitor.start();
}
// ============================================================
// 5. NETWORK STATUS MONITOR ENHANCED
// ============================================================

function updateNetworkStatus() {
    const statusEl = document.getElementById('network-status');
    const typeEl = document.getElementById('network-type');
    
    if (!statusEl || !typeEl) return;
    
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection) {
        const type = connection.effectiveType || '4G';
        const speed = connection.downlink || 10;
        typeEl.textContent = `${type.toUpperCase()} (${speed} Mbps)`;
        
        // Visual indicator with color coding
        if (speed < 1) {
            statusEl.className = 'flex items-center gap-1 text-red-400/70';
        } else if (speed < 5) {
            statusEl.className = 'flex items-center gap-1 text-yellow-400/70';
        } else {
            statusEl.className = 'flex items-center gap-1 text-emerald-400/70';
        }
    } else {
        typeEl.textContent = navigator.onLine ? 'ONLINE' : 'OFFLINE';
    }
}

// Update on load and change
updateNetworkStatus();
if (navigator.connection) {
    navigator.connection.addEventListener('change', updateNetworkStatus);
}
window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);

// ============================================================
// 6. BATTERY STATUS MONITOR ENHANCED
// ============================================================

async function updateBatteryStatus() {
    if ('getBattery' in navigator) {
        try {
            const battery = await navigator.getBattery();
            const batteryEl = document.getElementById('battery-level');
            const batteryIcon = document.querySelector('#battery-indicator i');
                        if (batteryEl && batteryIcon) {
                const update = () => {
                    const level = Math.round(battery.level * 100);
                    batteryEl.textContent = `${level}%`;
                    
                    // Update icon based on level
                    if (level <= 20) {
                        batteryIcon.className = 'fas fa-battery-quarter text-red-400 text-[10px]';
                    } else if (level <= 50) {
                        batteryIcon.className = 'fas fa-battery-half text-yellow-400 text-[10px]';
                    } else if (level <= 80) {
                        batteryIcon.className = 'fas fa-battery-three-quarters text-emerald-400 text-[10px]';
                    } else {
                        batteryIcon.className = 'fas fa-battery-full text-emerald-400 text-[10px]';
                    }
                    
                    // Charging status
                    if (battery.charging) {
                        batteryIcon.className += ' fa-bolt';
                    }
                };
                
                update();
                
                // Event listeners
                battery.addEventListener('levelchange', update);
                battery.addEventListener('chargingchange', update);
            }
        } catch (err) {
            console.warn('[BATTERY] Not available:', err);
        }
    }
}

updateBatteryStatus();

// ============================================================
// 7. ERROR BOUNDARY ENHANCED
// ============================================================

window.addEventListener('error', (event) => {
    console.error('[GLOBAL ERROR]', event.error);
    
    // Show user-friendly error
    DREAM.showToast('Terjadi kesalahan. Silakan coba lagi.', 'error');
    
    // Log to analytics
    if (window.ANALYTICS) {
        ANALYTICS.track('error', {
            message: event.error?.message,            stack: event.error?.stack,
            timestamp: new Date().toISOString(),
            url: window.location.href
        });
    }
    
    // Show error boundary if critical
    if (event.error?.message?.includes('Critical')) {
        const errorBoundary = document.getElementById('error-boundary');
        const errorMessage = document.getElementById('error-message');
        if (errorBoundary && errorMessage) {
            errorMessage.textContent = event.error?.message || 'System Error';
            errorBoundary.style.display = 'flex';
        }
    }
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('[UNHANDLED REJECTION]', event.reason);
    DREAM.showToast('Gagal memuat data. Periksa koneksi.', 'warning');
});

// ============================================================
// 8. MODULE LOADING WITH PROGRESS
// ============================================================

async function loadModuleWithProgress(moduleInfo, progressBar) {
    const toast = DREAM.showToast;
    
    // Show progress
    if (progressBar) {
        progressBar.style.display = 'block';
        progressBar.style.width = '0%';
    }
    
    toast(`Memuat ${moduleInfo.name}...`, 'info');
    
    // Simulate progress (remove in production)
    if (progressBar) {
        const interval = setInterval(() => {
            const currentWidth = parseInt(progressBar.style.width) || 0;
            if (currentWidth < 90) {
                progressBar.style.width = `${currentWidth + 10}%`;
            }
        }, 100);
        
        setTimeout(() => {
            clearInterval(interval);
            progressBar.style.width = '100%';
        }, 900);    }
    
    try {
        const module = await import(moduleInfo.path);
        
        // Complete progress
        if (progressBar) {
            progressBar.style.width = '100%';
            setTimeout(() => {
                progressBar.style.display = 'none';
            }, 300);
        }
        
        toast(`${moduleInfo.name} berhasil dimuat!`, 'success');
        hapticFeedback('success');
        return module;
    } catch (err) {
        console.error(`[MODULE] Failed: ${moduleInfo.id}`, err);
        toast(`Gagal memuat ${moduleInfo.name}`, 'error');
        hapticFeedback('error');
        throw err;
    }
}

// ============================================================
// 9. SMOOTH PAGE TRANSITIONS
// ============================================================

function smoothTransition(element, duration = 500) {
    element.style.transition = `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    element.style.opacity = '0';
    
    return new Promise(resolve => {
        setTimeout(() => {
            element.style.opacity = '1';
            resolve();
        }, duration);
    });
}

// ============================================================
// 10. SERVICE WORKER UPDATE CHECK
// ============================================================

if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => {
                console.log('[SW] Registered:', reg.scope);
                                // Check for updates
                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            DREAM.showToast('Update tersedia! Refresh untuk update.', 'info', 5000);
                        }
                    });
                });
            })
            .catch(err => console.warn('[SW] Registration failed:', err));
    });
}

// ============================================================
// 11. CLOCK UPDATE
// ============================================================

function updateClock() {
    const clockEl = document.getElementById('clock');
    if (clockEl) {
        clockEl.textContent = new Date().toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
}

setInterval(updateClock, 1000);
updateClock();

// ============================================================
// 12. PRAYER TIME REMINDER
// ============================================================

function checkPrayerTime() {
    const prayerEl = document.getElementById('prayer-time-display');
    if (prayerEl) {
        // This would connect to your prayer time API
        // For now, just update the display
        const now = new Date();
        const hours = now.getHours();
        let prayer = 'Dzuhur';
        
        if (hours >= 4 && hours < 12) prayer = 'Subuh';
        else if (hours >= 12 && hours < 15) prayer = 'Dzuhur';
        else if (hours >= 15 && hours < 18) prayer = 'Ashar';
        else if (hours >= 18 && hours < 19) prayer = 'Maghrib';
        else if (hours >= 19 && hours < 24) prayer = 'Isya';        
        prayerEl.textContent = `${prayer} ${now.toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'})}`;
    }
}

setInterval(checkPrayerTime, 60000); // Update every minute
checkPrayerTime();

// ============================================================
// 13. SESSION MANAGEMENT
// ============================================================

DREAM.checkSession = function() {
    const session = localStorage.getItem('dream-session');
    if (session) {
        try {
            this.state.user = JSON.parse(session);
            this.state.session = session;
            console.log('[SESSION] User logged in:', this.state.user.name);
        } catch (err) {
            console.warn('[SESSION] Invalid session');
            localStorage.removeItem('dream-session');
        }
    }
    return this.state.user;
};

DREAM.login = function(userData) {
    this.state.user = userData;
    this.state.session = JSON.stringify(userData);
    localStorage.setItem('dream-session', JSON.stringify(userData));
    this.showToast(`Selamat datang, ${userData.name}!`, 'success');
    hapticFeedback('success');
};

DREAM.logout = function() {
    this.state.user = null;
    this.state.session = null;
    localStorage.removeItem('dream-session');
    this.showToast('Berhasil logout', 'info');
    hapticFeedback('medium');
    setTimeout(() => location.reload(), 1000);
};

// Check session on init
DREAM.checkSession();

// ============================================================
// 14. ANALYTICS ENHANCED
// ============================================================
window.ANALYTICS = {
    userId: null,
    sessionId: null,
    
    init() {
        this.userId = DREAM.state.user?.id || 'guest';
        this.sessionId = Date.now().toString(36);
        console.log('[ANALYTICS] Initialized:', this.sessionId);
    },
    
    track(event, data = {}) {
        const payload = {
            event,
            data,
            userId: this.userId,
            sessionId: this.sessionId,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };
        
        console.log('[ANALYTICS]', payload);
        
        // Send to your analytics endpoint
        // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(payload) });
    },
    
    pageView(page) {
        this.track('page_view', { page });
    },
    
    error(error, context = {}) {
        this.track('error', { 
            message: error.message, 
            stack: error.stack,
            ...context 
        });
    }
};

ANALYTICS.init();

// ============================================================
// 15. READY CALLBACK
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ [FINAL POLISH] All enhancements loaded');
    console.log('🕌 Dream OS 2026 - Production Ready');    console.log('💚 Built with Bismillah by Dream OS Team');
    
    // Track app load
    ANALYTICS.track('app_load', {
        version: DREAM.version,
        theme: document.documentElement.getAttribute('data-theme'),
        language: DREAM.state.language
    });
});

// ============================================================
// END OF DREAM OS 2026 FINAL POLISH
// ============================================================

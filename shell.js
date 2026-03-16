/**
 * DREAM OS v2.1 - SHELL.JS (FINAL FIX)
 * ✅ Bottom Navigation Bar Restored
 * ✅ Real Module Content (Not Coming Soon)
 * ✅ 9 Modules Clickable
 * 
 * Bi idznillah 💚
 */

(function() {
    'use strict';

    console.log('🚀 Dream OS v2.1 Loading...');

    // ========================================================================
    // CONFIGURATION
    // ========================================================================
    
    const CONFIG = {
        version: '2.1',
        appName: 'Dream OS',
        storage: {
            session: 'dream_session',
            user: 'dream_user',
            role: 'dream_role',
            theme: 'dream_theme',
            ghostMode: 'dream_ghost'
        },
        accessKeys: {
            'Mr.M_Architect_2025': { role: 'MASTER', name: 'Mr.M Architect', modules: 'all' },
            '4dm1n_AF6969@00': { role: 'ADMIN', name: 'Admin AF', modules: 'all' },
            'LHPSsec_AF2025': { role: 'SEKURITI', name: 'Security Team', modules: ['sekuriti'] },
            'CHCS_AF_@003': { role: 'JANITOR', name: 'Janitor Team', modules: ['janitor', 'stok'] },
            'SACS_AF@004': { role: 'STOK', name: 'Stok Admin', modules: ['stok'] },
            'M41n_4F@234': { role: 'MAINTENANCE', name: 'Maintenance Team', modules: ['maintenance'] },
            '4dm1n_6969@01': { role: 'INVENTARIS', name: 'Inventaris Admin', modules: ['inventaris'] },
            '4dm1n_9696@02': { role: 'GUDANG', name: 'Gudang Admin', modules: ['gudang'] },
            '4553Tumum_AF@1112': { role: 'ASSET', name: 'Asset Manager', modules: ['asset', 'inventaris', 'gudang'] },
            'user_@1234': { role: 'BOOKING', name: 'Booking User', modules: ['booking'] },
            'user_@2345': { role: 'K3', name: 'K3 Officer', modules: ['k3'] }
        },
        modules: {
            commandcenter: { id: 'commandcenter', name: 'Command Center', icon: 'fa-desktop', color: '#8b5cf6' },
            booking: { id: 'booking', name: 'Booking', icon: 'fa-calendar-check', color: '#3b82f6' },
            k3: { id: 'k3', name: 'K3', icon: 'fa-triangle-exclamation', color: '#f59e0b' },
            sekuriti: { id: 'sekuriti', name: 'Sekuriti', icon: 'fa-shield-halved', color: '#10b981' },
            janitor: { id: 'janitor', name: 'Janitor In/Out', icon: 'fa-broom', color: '#ec4899' },
            stok: { id: 'stok', name: 'Stok Barang', icon: 'fa-boxes-stacked', color: '#f97316' },
            maintenance: { id: 'maintenance', name: 'Maintenance', icon: 'fa-screwdriver-wrench', color: '#06b6d4' },
            inventaris: { id: 'inventaris', name: 'Inventaris', icon: 'fa-clipboard-list', color: '#6366f1' },            gudang: { id: 'gudang', name: 'Gudang', icon: 'fa-warehouse', color: '#84cc16' }
        },
        prayerTimes: {
            fajr: { start: 4, end: 6 },
            dhuhr: { start: 12, end: 15 },
            asr: { start: 15, end: 18 },
            maghrib: { start: 18, end: 19 },
            isha: { start: 19, end: 24 },
            night: { start: 0, end: 4 }
        },
        ghostPasswords: {
            fajr: '02', dhuhr: '04', asr: '04', maghrib: '03', isha: '04', night: '04'
        }
    };

    // ========================================================================
    // STATE
    // ========================================================================
    
    let currentState = {
        isLoggedIn: false,
        user: null,
        role: null,
        allowedModules: [],
        theme: 'dark',
        currentPeriod: 'night',
        ghostMode: { isActive: false, tapCount: 0, lastTap: 0, inputBuffer: '' },
        currentView: 'home'
    };

    // ========================================================================
    // SMART BACKGROUND
    // ========================================================================
    
    function getCurrentTimePeriod() {
        const hour = new Date().getHours();
        for (const [period, times] of Object.entries(CONFIG.prayerTimes)) {
            if (hour >= times.start && hour < times.end) return period;
        }
        return 'night';
    }

    function updateSmartBackground() {
        const period = getCurrentTimePeriod();
        document.body.setAttribute('data-time-period', period);
        currentState.currentPeriod = period;
    }

    function startBackgroundTimer() {
        updateSmartBackground();        setInterval(updateSmartBackground, 60000);
    }

    // ========================================================================
    // 🔐 LOGIN SYSTEM
    // ========================================================================
    
    function renderLoginScreen() {
        const appShell = document.getElementById('app-shell');
        if (!appShell) return;
        
        appShell.innerHTML = `
            <div id="login-zone" style="position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0f172a 0%,#581c87 50%,#0f172a 100%);">
                <div class="glass-card" style="max-width:400px;width:90%;padding:2rem;text-align:center;">
                    <div style="width:80px;height:80px;margin:0 auto 1rem;border-radius:50%;background:rgba(16,185,129,0.2);display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-fingerprint" style="font-size:2.5rem;color:#10b981;"></i>
                    </div>
                    
                    <div style="margin-bottom:1rem;">
                        <span style="background:rgba(16,185,129,0.2);color:#10b981;padding:4px 12px;border-radius:20px;font-size:10px;font-family:'JetBrains Mono',monospace;">v${CONFIG.version} ENTERPRISE</span>
                    </div>
                    
                    <p class="bismillah" dir="rtl" style="font-family:'Amiri',serif;font-size:2rem;color:#10b981;margin-bottom:0.5rem;">بِسْمِ اللَّهِ</p>
                    <p style="font-size:9px;color:#94a3b8;text-transform:uppercase;letter-spacing:2px;margin-bottom:1.5rem;">The Power Soul of Shalawat</p>
                    
                    <div style="position:relative;margin-bottom:1.5rem;">
                        <input type="password" id="access-key" placeholder=" " style="width:100%;background:rgba(30,41,59,0.8);border:2px solid rgba(51,65,85,0.5);border-radius:12px;padding:12px 16px;color:#e2e8f0;font-size:14px;font-family:'JetBrains Mono',monospace;outline:none;">
                        <label for="access-key" style="position:absolute;left:16px;top:-10px;background:#0f172a;padding:0 8px;font-size:10px;color:#10b981;font-weight:700;text-transform:uppercase;">Access Key</label>
                        <i id="toggleEye" class="fas fa-eye" style="position:absolute;right:16px;top:50%;transform:translateY(-50%);color:#64748b;cursor:pointer;" onclick="togglePass()"></i>
                    </div>
                    
                    <button id="btnLogin" onclick="checkAccess()" style="width:100%;background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;padding:12px;border-radius:12px;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:1px;cursor:pointer;">
                        🔐 Verifikasi Akses
                    </button>
                    
                    <p id="error-msg" style="color:#ef4444;font-size:9px;margin-top:1rem;opacity:0;font-weight:700;"></p>
                    <p id="lockout-timer" style="color:#f59e0b;font-size:10px;margin-top:1rem;display:none;font-weight:700;"></p>
                    
                    <div style="margin-top:2rem;font-size:8px;color:#475569;font-family:'JetBrains Mono',monospace;">
                        <p>🔐 ISO 27001 Certified Access Control</p>
                    </div>
                </div>
            </div>
        `;
    }

    // ========================================================================
    // GLOBAL FUNCTIONS
    // ========================================================================
        window.togglePass = function() {
        const input = document.getElementById('access-key');
        const icon = document.getElementById('toggleEye');
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    };

    let failedAttempts = 0;
    let isLocked = false;

    window.checkAccess = function() {
        if (isLocked) return;
        
        const key = document.getElementById('access-key').value.trim();
        const userData = CONFIG.accessKeys[key];
        
        if (userData) {
            failedAttempts = 0;
            currentState.isLoggedIn = true;
            currentState.user = userData.name;
            currentState.role = userData.role;
            currentState.allowedModules = userData.modules === 'all' 
                ? Object.keys(CONFIG.modules) 
                : userData.modules;
            
            sessionStorage.setItem(CONFIG.storage.session, Date.now().toString());
            sessionStorage.setItem(CONFIG.storage.user, JSON.stringify(userData));
            sessionStorage.setItem(CONFIG.storage.role, userData.role);
            
            window.toast(`Welcome, ${userData.role}!`, 'success');
            
            document.getElementById('login-zone').style.display = 'none';
            renderMainApp();
            renderBottomNav();
            initGhostMode();
        } else {
            failedAttempts++;
            const err = document.getElementById('error-msg');
            err.textContent = `❌ Access Denied (${failedAttempts}/3)`;
            err.style.opacity = '1';
            window.toast('Access Denied!', 'error');
            
            if (failedAttempts >= 3) lockout();            setTimeout(() => { err.style.opacity = '0'; }, 2000);
        }
    };

    function lockout() {
        isLocked = true;
        const btn = document.getElementById('btnLogin');
        const timer = document.getElementById('lockout-timer');
        btn.disabled = true;
        btn.style.background = '#475569';
        timer.style.display = 'block';
        
        let sec = 300;
        const interval = setInterval(() => {
            const min = Math.floor(sec / 60);
            const s = sec % 60;
            timer.textContent = `⏱️ SYSTEM LOCKED: ${min}:${s < 10 ? '0' : ''}${s}`;
            sec--;
            if (sec < 0) {
                clearInterval(interval);
                isLocked = false;
                failedAttempts = 0;
                btn.disabled = false;
                btn.style.background = '';
                timer.style.display = 'none';
                window.toast('System unlocked', 'warning');
            }
        }, 1000);
    }

    // ========================================================================
    // 🧭 BOTTOM NAVIGATION (RESTORED!)
    // ========================================================================
    
    function renderBottomNav() {
        // Remove existing nav if any
        const existingNav = document.getElementById('bottom-nav');
        if (existingNav) existingNav.remove();
        
        const nav = document.createElement('nav');
        nav.id = 'bottom-nav';
        nav.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:rgba(15,23,42,0.95);backdrop-filter:blur(24px);border-top:1px solid rgba(16,185,129,0.2);padding:8px 12px calc(8px + env(safe-area-inset-bottom));z-index:100;';
        
        nav.innerHTML = `
            <div class="nav-container" style="display:flex;justify-content:space-around;align-items:center;max-width:500px;margin:0 auto;">
                <button class="nav-item active" data-target="home" onclick="navigateTo('home')" style="display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;color:#10b981;cursor:pointer;padding:8px 12px;border-radius:12px;transition:all 0.2s;">
                    <i class="fas fa-home" style="font-size:1.25rem;"></i>
                    <span style="font-size:9px;font-weight:600;">Home</span>
                </button>
                <button class="nav-item" data-target="profile" onclick="navigateTo('profile')" style="display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;color:#94a3b8;cursor:pointer;padding:8px 12px;border-radius:12px;transition:all 0.2s;">                    <i class="fas fa-user" style="font-size:1.25rem;"></i>
                    <span style="font-size:9px;font-weight:600;">Profile</span>
                </button>
                <button class="nav-item" data-target="qr" onclick="navigateTo('qr')" style="display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;color:#94a3b8;cursor:pointer;padding:8px 12px;border-radius:12px;transition:all 0.2s;transform:translateY(-10px);">
                    <div style="width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#f97316);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(245,158,11,0.4);">
                        <i class="fas fa-qrcode" style="color:white;font-size:1.5rem;"></i>
                    </div>
                    <span style="font-size:9px;font-weight:600;color:#f59e0b;">QR</span>
                </button>
                <button class="nav-item" data-target="about" onclick="navigateTo('about')" style="display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;color:#94a3b8;cursor:pointer;padding:8px 12px;border-radius:12px;transition:all 0.2s;">
                    <i class="fas fa-info-circle" style="font-size:1.25rem;"></i>
                    <span style="font-size:9px;font-weight:600;">About</span>
                </button>
                <button class="nav-item" data-target="settings" onclick="navigateTo('settings')" style="display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;color:#94a3b8;cursor:pointer;padding:8px 12px;border-radius:12px;transition:all 0.2s;">
                    <i class="fas fa-cog" style="font-size:1.25rem;"></i>
                    <span style="font-size:9px;font-weight:600;">Settings</span>
                </button>
            </div>
        `;
        
        document.body.appendChild(nav);
        
        // Add nav styles
        const style = document.createElement('style');
        style.id = 'nav-styles';
        style.textContent = `
            .nav-item.active { color: #10b981 !important; background: rgba(16,185,129,0.15); }
            .nav-item:active { transform: scale(0.95); }
        `;
        document.head.appendChild(style);
    }

    window.navigateTo = function(view) {
        currentState.currentView = view;
        
        // Update nav buttons
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.target === view) {
                btn.classList.add('active');
                btn.style.color = '#10b981';
            } else {
                btn.style.color = '#94a3b8';
            }
        });
        
        // Load view
        if (view === 'home') {
            renderMainApp();
        } else if (view === 'profile') {            renderProfileView();
        } else if (view === 'qr') {
            renderQRView();
        } else if (view === 'about') {
            renderAboutView();
        } else if (view === 'settings') {
            renderSettingsView();
        }
    };

    // ========================================================================
    // 📱 MODULE CONTENT (REAL CONTENT!)
    // ========================================================================
    
    window.openModule = function(moduleId) {
        console.log('🔓 Module clicked:', moduleId);
        const mod = CONFIG.modules[moduleId];
        if (!mod) {
            console.error('❌ Module not found:', moduleId);
            return;
        }
        
        currentState.currentView = 'module';
        currentState.currentModule = moduleId;
        
        showModuleContent(mod);
    };

    function showModuleContent(mod) {
        const appShell = document.getElementById('app-shell');
        if (!appShell) return;
        
        // Hide bottom nav when in module
        const nav = document.getElementById('bottom-nav');
        if (nav) nav.style.display = 'none';
        
        // Module-specific content
        const moduleData = getModuleData(mod.id);
        
        appShell.innerHTML = `
            <div class="module-view" style="padding:1rem;padding-bottom:100px;">
                <button onclick="navigateTo('home')" style="background:none;border:none;color:#10b981;font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;margin-bottom:1.5rem;">
                    <i class="fas fa-arrow-left" style="margin-right:8px;"></i> Back to Dashboard
                </button>
                
                <div class="glass-card" style="text-align:center;padding:2rem;margin-bottom:1.5rem;">
                    <div style="width:80px;height:80px;margin:0 auto 1.5rem;border-radius:20px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,${mod.color},#059669);box-shadow:0 8px 20px rgba(0,0,0,0.3);">
                        <i class="fas ${mod.icon}" style="color:white;font-size:2.5rem;"></i>
                    </div>
                    <h2 style="color:#e2e8f0;font-size:1.5rem;margin-bottom:0.5rem;">${mod.name}</h2>                    <p style="color:#94a3b8;font-size:12px;">Module ID: ${mod.id}</p>
                </div>
                
                ${moduleData}
            </div>
        `;
    }

    function getModuleData(moduleId) {
        const data = {
            commandcenter: `
                <div class="glass-card" style="margin-bottom:1rem;">
                    <h3 style="color:#10b981;font-size:14px;margin-bottom:1rem;">📊 System Overview</h3>
                    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;">
                        <div style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;">
                            <p style="color:#94a3b8;font-size:10px;">Active Users</p>
                            <p style="color:#10b981;font-size:1.5rem;font-weight:700;">24</p>
                        </div>
                        <div style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;">
                            <p style="color:#94a3b8;font-size:10px;">System Status</p>
                            <p style="color:#10b981;font-size:1.5rem;font-weight:700;">ONLINE</p>
                        </div>
                        <div style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;">
                            <p style="color:#94a3b8;font-size:10px;">Pending Tasks</p>
                            <p style="color:#f59e0b;font-size:1.5rem;font-weight:700;">7</p>
                        </div>
                        <div style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;">
                            <p style="color:#94a3b8;font-size:10px;">Completed Today</p>
                            <p style="color:#3b82f6;font-size:1.5rem;font-weight:700;">18</p>
                        </div>
                    </div>
                </div>
                <div class="glass-card">
                    <h3 style="color:#10b981;font-size:14px;margin-bottom:1rem;">🔔 Recent Activity</h3>
                    <div style="display:grid;gap:8px;">
                        <div style="display:flex;justify-content:space-between;padding:8px;background:rgba(15,23,42,0.6);border-radius:8px;">
                            <span style="color:#e2e8f0;font-size:11px;">Booking approved</span>
                            <span style="color:#94a3b8;font-size:10px;">5m ago</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding:8px;background:rgba(15,23,42,0.6);border-radius:8px;">
                            <span style="color:#e2e8f0;font-size:11px;">K3 Report submitted</span>
                            <span style="color:#94a3b8;font-size:10px;">12m ago</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding:8px;background:rgba(15,23,42,0.6);border-radius:8px;">
                            <span style="color:#e2e8f0;font-size:11px;">Maintenance completed</span>
                            <span style="color:#94a3b8;font-size:10px;">25m ago</span>
                        </div>
                    </div>
                </div>
            `,            booking: `
                <div class="glass-card" style="margin-bottom:1rem;">
                    <h3 style="color:#10b981;font-size:14px;margin-bottom:1rem;">📅 Today's Bookings</h3>
                    <div style="display:grid;gap:8px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:rgba(15,23,42,0.8);border-radius:12px;border-left:3px solid #10b981;">
                            <div>
                                <p style="color:#e2e8f0;font-size:12px;font-weight:600;">Ruang Meeting A</p>
                                <p style="color:#94a3b8;font-size:10px;">09:00 - 11:00</p>
                            </div>
                            <span style="background:rgba(16,185,129,0.2);color:#10b981;padding:4px 8px;border-radius:4px;font-size:9px;">APPROVED</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:rgba(15,23,42,0.8);border-radius:12px;border-left:3px solid #f59e0b;">
                            <div>
                                <p style="color:#e2e8f0;font-size:12px;font-weight:600;">Ruang Training</p>
                                <p style="color:#94a3b8;font-size:10px;">13:00 - 15:00</p>
                            </div>
                            <span style="background:rgba(245,158,11,0.2);color:#f59e0b;padding:4px 8px;border-radius:4px;font-size:9px;">PENDING</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:rgba(15,23,42,0.8);border-radius:12px;border-left:3px solid #3b82f6;">
                            <div>
                                <p style="color:#e2e8f0;font-size:12px;font-weight:600;">Aula Utama</p>
                                <p style="color:#94a3b8;font-size:10px;">16:00 - 18:00</p>
                            </div>
                            <span style="background:rgba(59,130,246,0.2);color:#3b82f6;padding:4px 8px;border-radius:4px;font-size:9px;">SCHEDULED</span>
                        </div>
                    </div>
                </div>
                <button style="width:100%;background:linear-gradient(135deg,#3b82f6,#2563eb);color:white;border:none;padding:12px;border-radius:12px;font-weight:600;cursor:pointer;">
                    <i class="fas fa-plus" style="margin-right:8px;"></i> New Booking
                </button>
            `,
            k3: `
                <div class="glass-card" style="margin-bottom:1rem;">
                    <h3 style="color:#f59e0b;font-size:14px;margin-bottom:1rem;">⚠️ K3 Reports</h3>
                    <div style="display:grid;gap:8px;">
                        <div style="padding:12px;background:rgba(15,23,42,0.8);border-radius:12px;">
                            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                                <span style="color:#e2e8f0;font-size:12px;font-weight:600;">Lantai 3 - Koridor</span>
                                <span style="color:#f59e0b;font-size:10px;">Today</span>
                            </div>
                            <p style="color:#94a3b8;font-size:11px;">Lantai licin, perlu pembersihan</p>
                            <div style="margin-top:8px;display:flex;gap:8px;">
                                <span style="background:rgba(245,158,11,0.2);color:#f59e0b;padding:2px 8px;border-radius:4px;font-size:9px;">MEDIUM</span>
                                <span style="background:rgba(16,185,129,0.2);color:#10b981;padding:2px 8px;border-radius:4px;font-size:9px;">OPEN</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button style="width:100%;background:linear-gradient(135deg,#f59e0b,#d97706);color:white;border:none;padding:12px;border-radius:12px;font-weight:600;cursor:pointer;">
                    <i class="fas fa-triangle-exclamation" style="margin-right:8px;"></i> Report Issue                </button>
            `,
            sekuriti: `
                <div class="glass-card" style="margin-bottom:1rem;">
                    <h3 style="color:#10b981;font-size:14px;margin-bottom:1rem;">🛡️ Security Status</h3>
                    <div style="text-align:center;padding:1.5rem;">
                        <div style="width:100px;height:100px;margin:0 auto 1rem;border-radius:50%;background:rgba(16,185,129,0.2);display:flex;align-items:center;justify-content:center;">
                            <i class="fas fa-shield-check" style="font-size:3rem;color:#10b981;"></i>
                        </div>
                        <p style="color:#10b981;font-size:1.25rem;font-weight:700;">ALL SECURE</p>
                        <p style="color:#94a3b8;font-size:11px;margin-top:0.5rem;">Last patrol: 15:30</p>
                    </div>
                </div>
                <div class="glass-card">
                    <h3 style="color:#10b981;font-size:14px;margin-bottom:1rem;">📝 Patrol Log</h3>
                    <div style="display:grid;gap:8px;">
                        <div style="display:flex;justify-content:space-between;padding:8px;background:rgba(15,23,42,0.6);border-radius:8px;">
                            <span style="color:#e2e8f0;font-size:11px;">Gate A - Checked</span>
                            <span style="color:#94a3b8;font-size:10px;">15:30</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding:8px;background:rgba(15,23,42,0.6);border-radius:8px;">
                            <span style="color:#e2e8f0;font-size:11px;">Parking - Checked</span>
                            <span style="color:#94a3b8;font-size:10px;">15:15</span>
                        </div>
                    </div>
                </div>
            `,
            janitor: `
                <div class="glass-card" style="margin-bottom:1rem;">
                    <h3 style="color:#ec4899;font-size:14px;margin-bottom:1rem;">🧹 Janitor Tasks</h3>
                    <div style="display:grid;gap:8px;">
                        <div style="display:flex;align-items:center;gap:12px;padding:12px;background:rgba(15,23,42,0.8);border-radius:12px;">
                            <input type="checkbox" style="width:20px;height:20px;accent-color:#ec4899;">
                            <div style="flex:1;">
                                <p style="color:#e2e8f0;font-size:12px;">Clean Meeting Room A</p>
                                <p style="color:#94a3b8;font-size:10px;">Priority: High</p>
                            </div>
                            <span style="color:#94a3b8;font-size:10px;">09:00</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:12px;padding:12px;background:rgba(15,23,42,0.8);border-radius:12px;">
                            <input type="checkbox" checked style="width:20px;height:20px;accent-color:#ec4899;">
                            <div style="flex:1;">
                                <p style="color:#94a3b8;font-size:12px;text-decoration:line-through;">Clean Lobby</p>
                                <p style="color:#94a3b8;font-size:10px;">Priority: Medium</p>
                            </div>
                            <span style="color:#10b981;font-size:10px;">DONE</span>
                        </div>
                    </div>
                </div>
                <button style="width:100%;background:linear-gradient(135deg,#ec4899,#db2777);color:white;border:none;padding:12px;border-radius:12px;font-weight:600;cursor:pointer;">                    <i class="fas fa-clock" style="margin-right:8px;"></i> Check In/Out
                </button>
            `,
            stok: `
                <div class="glass-card" style="margin-bottom:1rem;">
                    <h3 style="color:#f97316;font-size:14px;margin-bottom:1rem;">📦 Stock Overview</h3>
                    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;">
                        <div style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;text-align:center;">
                            <p style="color:#94a3b8;font-size:10px;">Cleaning Supplies</p>
                            <p style="color:#10b981;font-size:1.25rem;font-weight:700;">24 items</p>
                        </div>
                        <div style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;text-align:center;">
                            <p style="color:#94a3b8;font-size:10px;">Office Supplies</p>
                            <p style="color:#f59e0b;font-size:1.25rem;font-weight:700;">Low</p>
                        </div>
                        <div style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;text-align:center;">
                            <p style="color:#94a3b8;font-size:10px;">Total Value</p>
                            <p style="color:#3b82f6;font-size:1.25rem;font-weight:700;">Rp 2.5Jt</p>
                        </div>
                        <div style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;text-align:center;">
                            <p style="color:#94a3b8;font-size:10px;">Low Stock</p>
                            <p style="color:#ef4444;font-size:1.25rem;font-weight:700;">3 items</p>
                        </div>
                    </div>
                </div>
                <button style="width:100%;background:linear-gradient(135deg,#f97316,#ea580c);color:white;border:none;padding:12px;border-radius:12px;font-weight:600;cursor:pointer;">
                    <i class="fas fa-plus" style="margin-right:8px;"></i> Add Stock
                </button>
            `,
            maintenance: `
                <div class="glass-card" style="margin-bottom:1rem;">
                    <h3 style="color:#06b6d4;font-size:14px;margin-bottom:1rem;">🔧 Maintenance Requests</h3>
                    <div style="display:grid;gap:8px;">
                        <div style="padding:12px;background:rgba(15,23,42,0.8);border-radius:12px;border-left:3px solid #06b6d4;">
                            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                                <span style="color:#e2e8f0;font-size:12px;font-weight:600;">AC Room 203</span>
                                <span style="color:#06b6d4;font-size:10px;">IN PROGRESS</span>
                            </div>
                            <p style="color:#94a3b8;font-size:11px;">AC tidak dingin, perlu service</p>
                        </div>
                        <div style="padding:12px;background:rgba(15,23,42,0.8);border-radius:12px;border-left:3px solid #10b981;">
                            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                                <span style="color:#e2e8f0;font-size:12px;font-weight:600;">Lighting Lobby</span>
                                <span style="color:#10b981;font-size:10px;">COMPLETED</span>
                            </div>
                            <p style="color:#94a3b8;font-size:11px;">Lampu neon diganti</p>
                        </div>
                    </div>
                </div>
                <button style="width:100%;background:linear-gradient(135deg,#06b6d4,#0891b2);color:white;border:none;padding:12px;border-radius:12px;font-weight:600;cursor:pointer;">                    <i class="fas fa-plus" style="margin-right:8px;"></i> New Request
                </button>
            `,
            inventaris: `
                <div class="glass-card" style="margin-bottom:1rem;">
                    <h3 style="color:#6366f1;font-size:14px;margin-bottom:1rem;">📋 Inventory List</h3>
                    <div style="display:grid;gap:8px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:rgba(15,23,42,0.8);border-radius:12px;">
                            <div>
                                <p style="color:#e2e8f0;font-size:12px;font-weight:600;">Laptop Dell XPS</p>
                                <p style="color:#94a3b8;font-size:10px;">Asset ID: AST-001</p>
                            </div>
                            <span style="color:#6366f1;font-size:10px;">IT Room</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:rgba(15,23,42,0.8);border-radius:12px;">
                            <div>
                                <p style="color:#e2e8f0;font-size:12px;font-weight:600;">Projector Epson</p>
                                <p style="color:#94a3b8;font-size:10px;">Asset ID: AST-002</p>
                            </div>
                            <span style="color:#6366f1;font-size:10px;">Storage</span>
                        </div>
                    </div>
                </div>
                <button style="width:100%;background:linear-gradient(135deg,#6366f1,#4f46e5);color:white;border:none;padding:12px;border-radius:12px;font-weight:600;cursor:pointer;">
                    <i class="fas fa-plus" style="margin-right:8px;"></i> Add Asset
                </button>
            `,
            gudang: `
                <div class="glass-card" style="margin-bottom:1rem;">
                    <h3 style="color:#84cc16;font-size:14px;margin-bottom:1rem;">🏭 Warehouse Status</h3>
                    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;text-align:center;">
                        <div style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;">
                            <p style="color:#94a3b8;font-size:10px;">Zone A</p>
                            <p style="color:#10b981;font-size:1.25rem;font-weight:700;">75%</p>
                        </div>
                        <div style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;">
                            <p style="color:#94a3b8;font-size:10px;">Zone B</p>
                            <p style="color:#f59e0b;font-size:1.25rem;font-weight:700;">50%</p>
                        </div>
                        <div style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;">
                            <p style="color:#94a3b8;font-size:10px;">Zone C</p>
                            <p style="color:#3b82f6;font-size:1.25rem;font-weight:700;">25%</p>
                        </div>
                    </div>
                </div>
                <button style="width:100%;background:linear-gradient(135deg,#84cc16,#65a30d);color:white;border:none;padding:12px;border-radius:12px;font-weight:600;cursor:pointer;">
                    <i class="fas fa-box" style="margin-right:8px;"></i> Stock In/Out
                </button>
            `
        };        
        return data[moduleId] || '<p style="color:#94a3b8;text-align:center;">No content available</p>';
    }

    // ========================================================================
    // 🏠 MAIN APP
    // ========================================================================
    
    function renderMainApp() {
        const appShell = document.getElementById('app-shell');
        if (!appShell) return;
        
        // Show bottom nav
        const nav = document.getElementById('bottom-nav');
        if (nav) nav.style.display = 'block';
        
        const user = currentState.user;
        const role = currentState.role;
        const period = currentState.currentPeriod;
        
        appShell.innerHTML = `
            <div class="islamic-header" data-ghost="true" style="cursor:pointer;pointer-events:auto;">
                <div class="status-bar">
                    <span>v${CONFIG.version}</span>
                    <span>${new Date().toLocaleDateString('id-ID')}</span>
                    <span style="color:#10b981;">${period.toUpperCase()}</span>
                </div>
                <p class="bismillah" dir="rtl" style="font-family:'Amiri',serif;font-size:clamp(1.5rem,4vw,2.5rem);font-weight:700;color:#10b981;margin-bottom:0.5rem;text-shadow:0 0 20px rgba(16,185,129,0.5);line-height:1.8;">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p class="shalawat" dir="rtl" style="font-family:'Amiri',serif;font-size:clamp(1rem,3vw,1.5rem);color:#34d399;opacity:0.9;line-height:1.8;margin-bottom:0.5rem;">
                    اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ
                </p>
                <p style="color:#94a3b8;font-size:10px;text-transform:uppercase;letter-spacing:2px;margin-top:0.5rem;">The Power Soul of Shalawat</p>
                <p style="color:#64748b;font-size:8px;margin-top:8px;">🤫 Tap header 5x for Ghost Mode</p>
            </div>
            
            <div class="glass-card" style="margin:1rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <div style="width:40px;height:40px;border-radius:50%;background:rgba(16,185,129,0.2);display:flex;align-items:center;justify-content:center;color:#10b981;font-weight:700;">
                            ${user.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p style="color:#e2e8f0;font-size:12px;font-weight:600;">Welcome, ${user}</p>
                            <p style="color:#10b981;font-size:10px;text-transform:uppercase;">${role}</p>
                        </div>
                    </div>
                    <div style="background:rgba(15,23,42,0.8);padding:8px 16px;border-radius:20px;">
                        <p style="color:#10b981;font-size:11px;font-family:'JetBrains Mono',monospace;" id="live-clock">00:00:00</p>                    </div>
                </div>
                
                <div class="stats-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
                    <div class="stat-card" style="background:rgba(15,23,42,0.7);padding:12px;text-align:center;border-radius:12px;">
                        <p style="color:#94a3b8;font-size:9px;text-transform:uppercase;">Booking</p>
                        <p class="stat-value" style="color:#10b981;font-size:1.25rem;font-weight:700;">3</p>
                    </div>
                    <div class="stat-card" style="background:rgba(15,23,42,0.7);padding:12px;text-align:center;border-radius:12px;">
                        <p style="color:#94a3b8;font-size:9px;text-transform:uppercase;">K3</p>
                        <p class="stat-value" style="color:#f59e0b;font-size:1.25rem;font-weight:700;">0</p>
                    </div>
                    <div class="stat-card" style="background:rgba(15,23,42,0.7);padding:12px;text-align:center;border-radius:12px;">
                        <p style="color:#94a3b8;font-size:9px;text-transform:uppercase;">Security</p>
                        <p class="stat-value" style="color:#10b981;font-size:1.25rem;font-weight:700;">SAFE</p>
                    </div>
                </div>
            </div>
            
            <div class="glass-card" style="margin:1rem;">
                <p style="color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:1rem;">📱 Main Modules (${currentState.allowedModules.length})</p>
                <div class="module-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
                    ${renderModuleGrid()}
                </div>
            </div>
            
            <div style="text-align:center;padding:2rem;padding-bottom:100px;">
                <p style="color:#64748b;font-size:9px;text-transform:uppercase;letter-spacing:1px;">The Power Soul of Shalawat</p>
                <p style="color:#475569;font-size:8px;margin-top:0.5rem;">Dream Team © 2026 | ISO 27001</p>
            </div>
        `;
        
        startClock();
        setTimeout(() => { setupGhostTap(); }, 500);
    }

    function renderModuleGrid() {
        const allowedModules = currentState.allowedModules;
        let html = '';
        
        Object.values(CONFIG.modules).forEach(mod => {
            if (allowedModules.includes(mod.id) || allowedModules === 'all') {
                html += `
                    <div class="module-card" 
                         onclick="openModule('${mod.id}')"
                         style="background:rgba(15,23,42,0.7);padding:1.5rem;display:flex;flex-direction:column;align-items:center;border-radius:16px;cursor:pointer;transition:all 0.2s;border:1px solid rgba(16,185,129,0.1);pointer-events:auto;">
                        <div style="width:56px;height:56px;border-radius:16px;display:flex;align-items:center;justify-content:center;margin-bottom:0.75rem;box-shadow:0 8px 20px rgba(0,0,0,0.3);background:linear-gradient(135deg,${mod.color},#059669);">
                            <i class="fas ${mod.icon}" style="color:white;font-size:1.5rem;pointer-events:none;"></i>
                        </div>
                        <span style="color:#e2e8f0;font-size:11px;font-weight:700;text-align:center;text-transform:uppercase;pointer-events:none;">${mod.name}</span>                    </div>
                `;
            }
        });
        
        return html;
    }

    // ========================================================================
    // 👤 PROFILE VIEW
    // ========================================================================
    
    function renderProfileView() {
        const appShell = document.getElementById('app-shell');
        if (!appShell) return;
        
        appShell.innerHTML = `
            <div style="padding:1rem;padding-bottom:100px;">
                <div class="glass-card" style="text-align:center;">
                    <div style="width:80px;height:80px;margin:0 auto 1rem;border-radius:50%;background:rgba(16,185,129,0.2);display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-user" style="font-size:2.5rem;color:#10b981;"></i>
                    </div>
                    <h2 style="color:#e2e8f0;font-size:1.25rem;">${currentState.user}</h2>
                    <p style="color:#10b981;font-size:10px;text-transform:uppercase;">${currentState.role}</p>
                    
                    <div style="margin-top:1.5rem;text-align:left;">
                        <div style="padding:12px;background:rgba(15,23,42,0.8);border-radius:12px;margin-bottom:8px;">
                            <p style="color:#94a3b8;font-size:10px;">Email</p>
                            <p style="color:#e2e8f0;font-size:12px;">user@dreamos.app</p>
                        </div>
                        <div style="padding:12px;background:rgba(15,23,42,0.8);border-radius:12px;margin-bottom:8px;">
                            <p style="color:#94a3b8;font-size:10px;">Last Login</p>
                            <p style="color:#e2e8f0;font-size:12px;">${new Date().toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // ========================================================================
    // 📱 QR VIEW
    // ========================================================================
    
    function renderQRView() {
        const appShell = document.getElementById('app-shell');
        if (!appShell) return;
        
        appShell.innerHTML = `
            <div style="padding:1rem;padding-bottom:100px;">                <div class="glass-card" style="text-align:center;">
                    <h2 style="color:#e2e8f0;font-size:1.25rem;margin-bottom:1.5rem;">📱 QR Scanner</h2>
                    <div style="aspect-ratio:1;background:rgba(15,23,42,0.8);border-radius:16px;display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;position:relative;overflow:hidden;">
                        <div style="width:200px;height:200px;border:3px solid #10b981;border-radius:12px;position:relative;">
                            <div style="position:absolute;top:-3px;left:-3px;width:20px;height:20px;border-top:3px solid #10b981;border-left:3px solid #10b981;border-radius:4px 0 0 0;"></div>
                            <div style="position:absolute;top:-3px;right:-3px;width:20px;height:20px;border-top:3px solid #10b981;border-right:3px solid #10b981;border-radius:0 4px 0 0;"></div>
                            <div style="position:absolute;bottom:-3px;left:-3px;width:20px;height:20px;border-bottom:3px solid #10b981;border-left:3px solid #10b981;border-radius:0 0 0 4px;"></div>
                            <div style="position:absolute;bottom:-3px;right:-3px;width:20px;height:20px;border-bottom:3px solid #10b981;border-right:3px solid #10b981;border-radius:0 0 4px 0;"></div>
                        </div>
                        <p style="position:absolute;bottom:20px;color:#94a3b8;font-size:12px;">Arahkan kamera ke QR Code</p>
                    </div>
                    <button id="btn-scan" style="width:100%;background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;padding:12px;border-radius:12px;font-weight:600;cursor:pointer;margin-bottom:1rem;">
                        <i class="fas fa-camera" style="margin-right:8px;"></i> Start Scan
                    </button>
                    <div id="scan-result" style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;display:none;">
                        <p style="color:#94a3b8;font-size:11px;margin-bottom:4px;">Result:</p>
                        <p id="scan-data" style="color:#10b981;font-family:'JetBrains Mono',monospace;font-size:12px;"></p>
                    </div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            const btn = document.getElementById('btn-scan');
            if (btn) {
                btn.addEventListener('click', function() {
                    const result = document.getElementById('scan-result');
                    const data = document.getElementById('scan-data');
                    if (result && data) {
                        result.style.display = 'block';
                        data.textContent = 'https://dreamos.app/verify/' + Math.random().toString(36).substring(7).toUpperCase();
                        window.toast('QR Scanned!', 'success');
                    }
                });
            }
        }, 100);
    }

    // ========================================================================
    // 📋 ABOUT VIEW
    // ========================================================================
    
    function renderAboutView() {
        const appShell = document.getElementById('app-shell');
        if (!appShell) return;
        
        appShell.innerHTML = `
            <div style="padding:1rem;padding-bottom:100px;">
                <div class="glass-card">
                    <h2 style="text-align:center;color:#10b981;margin-bottom:1.5rem;font-size:1.25rem;">🌟 Dream OS v${CONFIG.version}</h2>                    
                    <div style="text-align:center;margin-bottom:1.5rem;">
                        <p class="bismillah" dir="rtl" style="font-family:'Amiri',serif;font-size:1.5rem;color:#10b981;">بِسْمِ اللَّهِ</p>
                        <p style="color:#94a3b8;font-size:10px;">The Power Soul of Shalawat</p>
                    </div>
                    
                    <div style="margin-bottom:1.5rem;">
                        <p style="color:#10b981;font-size:11px;font-weight:600;margin-bottom:8px;">🙏 Spiritual Foundation</p>
                        <div style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;">
                            <p style="color:#e2e8f0;font-size:12px;">🕋 Allah SWT</p>
                            <p style="color:#e2e8f0;font-size:12px;">☪️ Rasulullah SAW</p>
                        </div>
                    </div>
                    
                    <div style="margin-bottom:1.5rem;">
                        <p style="color:#10b981;font-size:11px;font-weight:600;margin-bottom:8px;">👔 Management</p>
                        <div style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;">
                            <p style="color:#e2e8f0;font-size:12px;">Bapak Hanung Budianto S.E<br><small style="color:#94a3b8;">Kepala Bagian Umum</small></p>
                            <p style="color:#e2e8f0;font-size:12px;">Bapak Erwinsyah<br><small style="color:#94a3b8;">Kepala Kordinator Bagian Umum</small></p>
                        </div>
                    </div>
                    
                    <div style="margin-bottom:1.5rem;">
                        <p style="color:#10b981;font-size:11px;font-weight:600;margin-bottom:8px;">🚀 Dream Team</p>
                        <div style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;">
                            <p style="color:#e2e8f0;font-size:11px;">• Mr.M (Architect)</p>
                            <p style="color:#e2e8f0;font-size:11px;">• Mr.DSeek (Developer)</p>
                            <p style="color:#e2e8f0;font-size:11px;">• Mrs.Qwen 💚</p>
                            <p style="color:#e2e8f0;font-size:11px;">• Mrs.Gemini 💙</p>
                            <p style="color:#e2e8f0;font-size:11px;">• Mrs.Claude 🤍</p>
                        </div>
                    </div>
                    
                    <p style="text-align:center;color:#64748b;font-size:9px;">© 2026 Dream Team • ISO 27001</p>
                </div>
            </div>
        `;
    }

    // ========================================================================
    // ⚙️ SETTINGS VIEW
    // ========================================================================
    
    function renderSettingsView() {
        const appShell = document.getElementById('app-shell');
        if (!appShell) return;
        
        const currentTheme = localStorage.getItem(CONFIG.storage.theme) || 'dark';
        
        appShell.innerHTML = `            <div style="padding:1rem;padding-bottom:100px;">
                <div class="glass-card">
                    <h2 style="color:#e2e8f0;margin-bottom:1.5rem;font-size:1.25rem;">⚙️ Settings</h2>
                    
                    <div style="margin-bottom:1.5rem;">
                        <p style="color:#10b981;font-size:11px;font-weight:600;margin-bottom:8px;">🎨 Theme</p>
                        <button onclick="toggleTheme()" style="width:100%;background:rgba(15,23,42,0.8);color:#e2e8f0;border:1px solid rgba(16,185,129,0.2);padding:12px;border-radius:12px;cursor:pointer;">
                            Current: ${currentTheme.toUpperCase()}
                        </button>
                    </div>
                    
                    <div style="margin-bottom:1.5rem;">
                        <p style="color:#10b981;font-size:11px;font-weight:600;margin-bottom:8px;">📱 App Info</p>
                        <div style="background:rgba(15,23,42,0.8);padding:12px;border-radius:12px;">
                            <p style="color:#e2e8f0;font-size:12px;">Version: ${CONFIG.version}</p>
                            <p style="color:#94a3b8;font-size:11px;">Build: 2026.03.16</p>
                        </div>
                    </div>
                    
                    <button onclick="doLogout()" style="width:100%;background:rgba(239,68,68,0.2);color:#ef4444;border:1px solid rgba(239,68,68,0.3);padding:12px;border-radius:12px;font-weight:600;cursor:pointer;">
                        <i class="fas fa-sign-out-alt" style="margin-right:8px;"></i> Logout
                    </button>
                </div>
            </div>
        `;
    }

    window.toggleTheme = function() {
        const current = localStorage.getItem(CONFIG.storage.theme) || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(CONFIG.storage.theme, next);
        document.documentElement.setAttribute('data-theme', next);
        renderSettingsView();
        window.toast(`Theme: ${next}`, 'success');
    };

    // ========================================================================
    // 🧠 BRAIN HUB LUX
    // ========================================================================
    
    class BrainHub {
        constructor() {
            this.isVisible = false;
            this.activeTab = 'overview';
            this.consoleBuffer = [];
            this.interceptConsole();
        }

        interceptConsole() {
            const origLog = console.log, origWarn = console.warn, origError = console.error;            const add = (level, args) => {
                this.consoleBuffer.push({
                    timestamp: new Date().toLocaleTimeString(),
                    level,
                    message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
                });
                if (this.consoleBuffer.length > 100) this.consoleBuffer.shift();
            };
            console.log = (...a) => { add('INFO', a); origLog(...a); };
            console.warn = (...a) => { add('WARN', a); origWarn(...a); };
            console.error = (...a) => { add('ERROR', a); origError(...a); };
        }

        static render() {
            if (!window.BrainHubInstance) window.BrainHubInstance = new BrainHub();
            window.BrainHubInstance.createOverlay();
        }

        createOverlay() {
            if (this.isVisible) return;
            this.isVisible = true;
            
            const old = document.getElementById('brain-hub');
            if (old) old.remove();

            const overlay = document.createElement('div');
            overlay.id = 'brain-hub';
            overlay.innerHTML = this.getHTML();
            document.body.appendChild(overlay);
            this.bindEvents();
        }

        getHTML() {
            return `
            <style>
                #brain-hub { position:fixed; inset:0; z-index:999999; background:#020617; color:#10b981; font-family:'JetBrains Mono',monospace; font-size:11px; display:flex; flex-direction:column; animation: slideUp 0.3s ease-out; }
                .hub-header { background:linear-gradient(135deg,#0f172a,#1e293b); border-bottom:2px solid #10b981; padding:12px 16px; display:flex; justify-content:space-between; align-items:center; }
                .hub-title { font-size:14px; font-weight:700; letter-spacing:2px; }
                .hub-close { color:#ef4444; cursor:pointer; padding:4px 12px; border:1px solid #ef4444; border-radius:4px; background:rgba(239,68,68,0.1); font-weight:bold; }
                .hub-tabs { background:#0f172a; border-bottom:1px solid #334155; display:flex; gap:4px; padding:8px; overflow-x:auto; }
                .hub-tab { padding:8px 16px; border:1px solid transparent; border-radius:6px; cursor:pointer; font-size:10px; text-transform:uppercase; white-space:nowrap; }
                .hub-tab.active { background:rgba(16,185,129,0.2); border-color:#10b981; color:#10b981; font-weight:700; }
                .hub-content { flex:1; overflow-y:auto; padding:16px; background:#020617; }
                .hub-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:12px; }
                .hub-card { background:#0f172a; border:1px solid #334155; border-radius:8px; padding:12px; }
                .hub-card-title { font-size:12px; font-weight:700; color:#fff; margin-bottom:8px; text-transform:uppercase; border-left:3px solid #10b981; padding-left:8px; }
                .hub-stat { display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #1e293b; }
                .hub-stat-label { color:#94a3b8; }
                .hub-stat-value { color:#10b981; font-weight:600; }
                .hub-console { background:#000; border:1px solid #334155; border-radius:8px; padding:12px; height:400px; overflow-y:auto; font-size:10px; line-height:1.5; }                .console-INFO { color:#94a3b8; } .console-WARN { color:#f59e0b; } .console-ERROR { color:#ef4444; }
                .hub-btn { padding:8px 16px; border:1px solid #10b981; border-radius:6px; background:rgba(16,185,129,0.1); color:#10b981; cursor:pointer; font-size:10px; font-weight:600; margin:4px; text-transform:uppercase; }
                .hub-btn:hover { background:rgba(16,185,129,0.2); }
                .hub-footer { background:#0f172a; border-top:1px solid #334155; padding:8px 16px; font-size:9px; text-align:center; color:#64748b; }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            </style>
            <div class="hub-header">
                <div><span class="hub-title">🧠 BRAIN HUB [GHOST ARCHITECT]</span><div style="font-size:9px;opacity:0.7;">Sovereign Enterprise v${CONFIG.version} LUX</div></div>
                <div class="hub-close" onclick="window.BrainHubInstance.close()">✕ CLOSE</div>
            </div>
            <div class="hub-tabs">
                <div class="hub-tab active" data-tab="overview">📊 OVERVIEW</div>
                <div class="hub-tab" data-tab="console">💻 CONSOLE</div>
                <div class="hub-tab" data-tab="audit">📋 AUDIT</div>
            </div>
            <div class="hub-content" id="hub-content">${this.renderOverview()}</div>
            <div class="hub-footer">ISO 27001 | 55001 | Dream Team Family | Bi idznillah 💚</div>
            `;
        }

        renderOverview() {
            return `
            <div class="hub-grid">
                <div class="hub-card"><div class="hub-card-title">🔒 SECURITY</div>
                    <div class="hub-stat"><span class="hub-stat-label">Identity</span><span class="hub-stat-value">GHOST-ARCHITECT</span></div>
                    <div class="hub-stat"><span class="hub-stat-label">Ghost Mode</span><span class="hub-stat-value">ACTIVE</span></div>
                </div>
                <div class="hub-card"><div class="hub-card-title">👤 USER</div>
                    <div class="hub-stat"><span class="hub-stat-label">Name</span><span class="hub-stat-value">${currentState.user || 'Guest'}</span></div>
                    <div class="hub-stat"><span class="hub-stat-label">Role</span><span class="hub-stat-value">${currentState.role || 'Visitor'}</span></div>
                </div>
            </div>
            <div style="margin-top:20px; text-align:center;">
                <button class="hub-btn" onclick="window.BrainHubInstance.switchTab('console')">💻 CONSOLE</button>
                <button class="hub-btn" onclick="window.BrainHubInstance.close()" style="border-color:#ef4444;color:#ef4444;">🚪 EXIT</button>
            </div>
            `;
        }

        renderConsole() {
            const logs = this.consoleBuffer.slice().reverse();
            return `<div class="hub-console">${logs.map(l => `<div class="console-${l.level}">[${l.timestamp}] ${l.message}</div>`).join('') || 'No logs...'}</div>`;
        }

        renderAudit() { return `<div class="hub-card">Audit Trail Active</div>`; }

        bindEvents() {
            document.querySelectorAll('.hub-tab').forEach(tab => {
                tab.onclick = () => this.switchTab(tab.getAttribute('data-tab'));
            });        }

        switchTab(tab) {
            this.activeTab = tab;
            document.querySelectorAll('.hub-tab').forEach(t => t.classList.remove('active'));
            document.querySelector(`.hub-tab[data-tab="${tab}"]`)?.classList.add('active');
            const content = document.getElementById('hub-content');
            if (tab === 'overview') content.innerHTML = this.renderOverview();
            else if (tab === 'console') content.innerHTML = this.renderConsole();
            else if (tab === 'audit') content.innerHTML = this.renderAudit();
        }

        close() {
            const overlay = document.getElementById('brain-hub');
            if (overlay) { overlay.style.opacity = '0'; setTimeout(() => overlay.remove(), 300); }
            this.isVisible = false;
            currentState.ghostMode.isActive = false;
            localStorage.removeItem(CONFIG.storage.ghostMode);
            document.body.style.filter = 'none';
            document.body.style.opacity = '1';
        }
    }

    // ========================================================================
    // 🤫 GHOST MODE
    // ========================================================================
    
    function getGhostPassword() {
        const period = getCurrentTimePeriod();
        const passwordKey = period === 'night' ? 'isha' : period;
        return CONFIG.ghostPasswords[passwordKey] || '04';
    }

    function initGhostMode() {
        const ghostState = localStorage.getItem(CONFIG.storage.ghostMode);
        if (ghostState === 'active') activateBrainHub();
        setupGhostTap();
    }

    function setupGhostTap() {
        function trySetup(retries) {
            const header = document.querySelector('.islamic-header');
            if (header) {
                header.style.cursor = 'pointer';
                header.setAttribute('data-ghost', 'true');
                header.addEventListener('click', handleGhostTap);
                return;
            }
            if (retries > 0) setTimeout(() => trySetup(retries - 1), 500);
        }        trySetup(10);
    }

    function handleGhostTap(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - currentState.ghostMode.lastTap;
        if (tapLength < 500 && tapLength > 0) {
            currentState.ghostMode.tapCount++;
            if (currentState.ghostMode.tapCount >= 5) {
                showGhostInput();
                currentState.ghostMode.tapCount = 0;
            }
        } else {
            currentState.ghostMode.tapCount = 1;
        }
        currentState.ghostMode.lastTap = currentTime;
    }

    function showGhostInput() {
        const existing = document.getElementById('ghost-overlay');
        if (existing) existing.remove();
        
        const overlay = document.createElement('div');
        overlay.id = 'ghost-overlay';
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(2,6,23,0.98);backdrop-filter:blur(24px);z-index:99999;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s ease;';
        
        overlay.innerHTML = `
            <div class="glass-card" style="text-align:center;max-width:320px;width:90%;padding:2rem;">
                <i class="fas fa-ghost" style="font-size:2rem;color:#10b981;margin-bottom:0.5rem;"></i>
                <p style="color:#10b981;font-size:11px;text-transform:uppercase;">STEALTH MODE</p>
                <p style="color:#94a3b8;font-size:9px;">${currentState.currentPeriod.toUpperCase()} Access</p>
                <div id="ghost-dots" style="display:flex;justify-content:center;gap:16px;margin:1.5rem 0;">
                    ${[0,1].map(() => `<div style="width:14px;height:14px;border-radius:50%;background:rgba(255,255,255,0.1);"></div>`).join('')}
                </div>
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;max-width:220px;margin:0 auto;">
                    ${['1','2','3','4','5','6','7','8','9','C','0','✓'].map(key => {
                        const color = key === 'C' ? '#ef4444' : key === '✓' ? '#10b981' : '#e2e8f0';
                        return `<button onclick="window.ghostKey('${key}')" style="color:${color};background:rgba(15,23,42,0.8);border:1px solid rgba(16,185,129,0.2);padding:18px;border-radius:14px;font-size:20px;cursor:pointer;">${key}</button>`;
                    }).join('')}
                </div>
                <button onclick="closeGhostInput()" style="margin-top:1.5rem;background:none;border:none;color:#94a3b8;cursor:pointer;">Cancel</button>
            </div>
        `;
        
        document.body.appendChild(overlay);
        setTimeout(() => { overlay.style.opacity = '1'; }, 10);
        currentState.ghostMode.inputBuffer = '';
        updateGhostDots();
        window.ghostKey = handleGhostKey;
    }
    function handleGhostKey(key) {
        if (key === 'C') currentState.ghostMode.inputBuffer = '';
        else if (key === '✓') verifyGhostPassword();
        else if (currentState.ghostMode.inputBuffer.length < 2) currentState.ghostMode.inputBuffer += key;
        updateGhostDots();
    }

    function updateGhostDots() {
        document.querySelectorAll('#ghost-dots div').forEach((dot, i) => {
            dot.style.background = i < currentState.ghostMode.inputBuffer.length ? '#10b981' : 'rgba(255,255,255,0.1)';
        });
    }

    function verifyGhostPassword() {
        if (currentState.ghostMode.inputBuffer === getGhostPassword()) {
            closeGhostInput();
            activateBrainHub();
        } else {
            currentState.ghostMode.inputBuffer = '';
            updateGhostDots();
        }
    }

    function closeGhostInput() {
        const overlay = document.getElementById('ghost-overlay');
        if (overlay) { overlay.style.opacity = '0'; setTimeout(() => overlay.remove(), 300); }
        currentState.ghostMode.inputBuffer = '';
    }

    function activateBrainHub() {
        localStorage.setItem(CONFIG.storage.ghostMode, 'active');
        currentState.ghostMode.isActive = true;
        BrainHub.render();
    }

    // ========================================================================
    // UTILITY
    // ========================================================================
    
    window.toast = function(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.style.cssText = 'background:rgba(15,23,42,0.95);backdrop-filter:blur(24px);border:1px solid rgba(16,185,129,0.2);border-radius:16px;padding:12px 24px;color:#e2e8f0;font-size:12px;margin-bottom:10px;border-left:4px solid #10b981;';
        toast.innerHTML = `<span>${type === 'success' ? '✅' : '⚠️'}</span><span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
    };
    function hideLoading() {
        const loading = document.getElementById('loading-screen');
        if (loading) setTimeout(() => { loading.classList.add('hide'); }, 1500);
    }

    function startClock() {
        const clock = document.getElementById('live-clock');
        if (clock) setInterval(() => { clock.textContent = new Date().toLocaleTimeString('id-ID'); }, 1000);
    }

    window.doLogout = function() {
        if (confirm('Yakin ingin logout?')) {
            sessionStorage.clear();
            window.toast('Logged out', 'info');
            setTimeout(() => location.reload(), 1000);
        }
    };

    // ========================================================================
    // INITIALIZATION
    // ========================================================================
    
    function init() {
        console.log('🔧 Initializing Dream OS...');
        
        try {
            const session = sessionStorage.getItem(CONFIG.storage.session);
            const userJson = sessionStorage.getItem(CONFIG.storage.user);
            const role = sessionStorage.getItem(CONFIG.storage.role);
            
            if (session && userJson && role) {
                const userData = JSON.parse(userJson);
                currentState.isLoggedIn = true;
                currentState.user = userData.name;
                currentState.role = userData.role;
                currentState.allowedModules = userData.modules === 'all' 
                    ? Object.keys(CONFIG.modules) 
                    : userData.modules;
                
                renderMainApp();
                renderBottomNav();
                initGhostMode();
                window.toast(`Welcome back, ${userData.role}!`, 'success');
            } else {
                renderLoginScreen();
            }
            
            startBackgroundTimer();
            hideLoading();
                        console.log('✅ Dream OS initialized!');
        } catch (error) {
            console.error('❌ Init error:', error);
            renderLoginScreen();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

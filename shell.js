/**
 * shell.js - Dream OS v2.1 Kernel
 * Ghost Architect Edition - Input Logging, Traffic Control & Enterprise Security
 */

const translations = {
    id: { bismillah: "Bismillahirrahmanirrahim", dashboard: "Dasbor", profile: "Profil", home: "Beranda", success: "Data Disimpan" },
    ar: { bismillah: "بسم الله الرحمن الرحيم", dashboard: "لوحة القيادة", profile: "ملف شخصي", home: "الرئيسية", success: "تم حفظ البيانات" }
};

// GHOST MONITORING & INPUT LOGGING
const GhostAudit = {
    logs: JSON.parse(localStorage.getItem('ghost_audit_trail') || '[]'),
    
    record(user, action, details = "") {
        const entry = {
            id: Date.now(),
            user: user || 'Anonymous',
            action: action,
            details: details,
            time: new Date().toLocaleTimeString('id-ID'),
            device: window.DREAM_SECURITY?.getFingerprint?.()?.substring(0, 8) || 'unknown'
        };
        this.logs.unshift(entry);
        if (this.logs.length > 30) this.logs.pop();
        localStorage.setItem('ghost_audit_trail', JSON.stringify(this.logs));
        window.DREAM_SYS?.log('ghost', `Audit Recorded: ${action} by ${user}`);

        if (window.SupabaseBridge) {
            window.SupabaseBridge.sendLog(entry).catch(() => {});
        }
    }
};

const TrafficManager = {
    MAX_CONCURRENCY: 500,
    async validateAndSubmit(user, actionName, actionFn) {
        const currentLoad = Math.floor(Math.random() * 550);
        if (currentLoad > this.MAX_CONCURRENCY) {
            window.DREAM_SYS?.haptic([200, 100, 200]);
            alert("Traffic High: Antrean Sistem Aktif");
            return;
        }
        const result = await actionFn();
        GhostAudit.record(user, "INPUT_DATA", actionName);
        return result;
    }
};

const state = {
    lang: navigator.language.startsWith('ar') ? 'ar' : 'id',
    user: { email: 'girangati1001@gmail.com', role: 'Architect' } // Sementara
};

const t = (key) => translations[state.lang][key] || key;

window.DREAM = {
    state,
    load: (mod) => {
        if (mod === 'ghost') renderGhostDashboard();
        else if (mod === 'home') renderHome();
        else if (mod === 'profile') renderProfile();
        else console.warn('Module not found:', mod);
        window.DREAM_SYS?.log('info', `Routing: ${mod}`);
    }
};

async function init() {
    renderShell();
    GhostAudit.record(state.user.email, "SYSTEM_ACCESS");
    window.DREAM_SYS?.log('success', 'Kernel v2.1 Ready');

    if (window.SystemWatchdog) window.SystemWatchdog.start();
    if (window.BackupManager) window.BackupManager.start();
}

function renderShell() {
    const shell = document.getElementById('app-shell');
    shell.innerHTML = `
        <header class="shell-header glass-header" style="padding:1rem; cursor:pointer;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h1 style="color:#10b981; margin:0; font-size:1rem;">Dream OS v2.1</h1>
                <span class="font-arabic" style="color:var(--dream-gold); font-size:0.8rem;">${t('bismillah')}</span>
            </div>
        </header>
        <main id="main-content" style="padding:1.5rem;">
            <div class="module-card" style="text-align:center;">
                <p>${t('dashboard')}</p>
                <button id="btn-input-test" class="btn-primary" style="width:100%; margin-bottom:10px;">Input Data Laporan</button>
                <button id="btn-go-ghost" class="btn-primary" style="width:100%; background:#8b5cf6;">Buka Ghost Dashboard</button>
            </div>
        </main>
        <footer class="bottom-bar glass-footer" style="position:fixed; bottom:0; width:100%; display:flex; justify-content:space-around; padding:0.8rem;">
            <button class="nav-item" data-module="home" onclick="DREAM.load('home')" style="background:transparent; border:none; color:#94a3b8;">
                <i class="fas fa-home"></i>
            </button>
            <div id="shalawat-center" style="transform:translateY(-15px); background:#10b981; width:50px; height:50px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; cursor:pointer;">
                ﷺ
            </div>
            <button class="nav-item" data-module="profile" onclick="DREAM.load('profile')" style="background:transparent; border:none; color:#94a3b8;">
                <i class="fas fa-user-circle"></i>
            </button>
        </footer>
    `;

    document.getElementById('btn-input-test').addEventListener('click', () => {
        TrafficManager.validateAndSubmit(state.user.email, "Laporan K3 - Kebersihan", () => {
            window.DREAM_SYS?.haptic(50);
            alert(t('success'));
        });
    });

    document.getElementById('btn-go-ghost').addEventListener('click', () => {
        DREAM.load('ghost');
    });
}

function renderGhostDashboard() {
    const logs = JSON.parse(localStorage.getItem('ghost_audit_trail') || '[]');
    document.getElementById('main-content').innerHTML = `
        <div class="glass-wrapper p-4" style="font-size:0.75rem;">
            <h3 style="color:#8b5cf6;"><i class="fas fa-bolt"></i> Monitoring Ghost Architect</h3>
            
            <div class="grid grid-cols-2 gap-2 my-4">
                <button onclick="window.SystemWatchdog?.checkIntegrity()" class="bg-blue-600 p-2 rounded text-white text-[10px]">🛡️ RUN WATCHDOG</button>
                <button onclick="alert('Test Vault: ' + window.SecureVault?.encrypt('Rahasia My Bro'))" class="bg-emerald-600 p-2 rounded text-white text-[10px]">🔐 VAULT TEST</button>
                <button onclick="window.StealthEngine?.activatePanicMode()" class="bg-red-600 p-2 rounded text-white text-[10px]">⚠️ PANIC MODE</button>
                <button onclick="window.BackupManager?.createBackup()" class="bg-purple-600 p-2 rounded text-white text-[10px]">💾 BACKUP NOW</button>
            </div>
            
            <div style="overflow-x:auto;">
                <table style="width:100%; color:white; border-collapse:collapse;">
                    <tr style="border-bottom:1px solid #8b5cf6;">
                        <th align="left">User</th>
                        <th align="left">Aktivitas</th>
                        <th align="left">Waktu</th>
                    </tr>
                    ${logs.map(l => `
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
                            <td>${l.user.split('@')[0]}</td>
                            <td style="color:${l.action === 'INPUT_DATA' ? '#10b981' : '#06b6d4'}">${l.action}</td>
                            <td>${l.time}</td>
                        </tr>
                    `).join('')}
                </table>
            </div>
            <button onclick="DREAM.load('home')" class="mt-4 w-full bg-emerald-500 p-2 rounded">Kembali</button>
        </div>
    `;
}

function renderHome() {
    document.getElementById('main-content').innerHTML = `
        <div class="text-center p-4">
            <h2 class="text-emerald-400 text-2xl mb-4">Beranda</h2>
            <p>Selamat datang di Dream OS v2.1</p>
            <button onclick="DREAM.load('profile')" class="btn-primary mt-4">Lihat Profil</button>
        </div>
    `;
}

function renderProfile() {
    // Fallback jika modul profile belum ada
    if (typeof window.renderProfileModule === 'function') {
        window.renderProfileModule();
    } else {
        document.getElementById('main-content').innerHTML = `
            <div class="p-4">
                <h2 class="text-emerald-400">Profil</h2>
                <p>Fitur profil dalam pengembangan.</p>
                <button onclick="DREAM.load('home')" class="btn-primary mt-4">Kembali</button>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', init);

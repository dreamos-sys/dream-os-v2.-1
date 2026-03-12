/**
 * shell.js - Dream OS v2.1 Kernel
 * Ghost Architect Edition - Input Logging & Traffic Control
 */

const translations = {
    id: { bismillah: "Bismillahirrahmanirrahim", dashboard: "Dasbor", profile: "Profil", home: "Beranda", success: "Data Disimpan" },
    ar: { bismillah: "بسم الله الرحمن الرحيم", dashboard: "لوحة القيادة", profile: "ملف شخصي", home: "الرئيسية", success: "تم حفظ البيانات" }
};

// GHOST MONITORING & INPUT LOGGING
const GhostAudit = {
    logs: JSON.parse(localStorage.getItem('ghost_audit_trail') || '[]'),
    
    // Mencatat aktivitas (Login atau Input Data)
    record(user, action, details = "") {
        const entry = {
            id: Date.now(),
            user: user || 'Anonymous',
            action: action, // e.g., "LOGIN" atau "INPUT_DATA"
            details: details,
            time: new Date().toLocaleTimeString('id-ID'),
            device: window.DREAM_SECURITY.getFingerprint().substring(0, 8)
        };
        this.logs.unshift(entry);
        if (this.logs.length > 30) this.logs.pop(); 
        localStorage.setItem('ghost_audit_trail', JSON.stringify(this.logs));
        window.DREAM_SYS.log('ghost', `Audit Recorded: ${action} by ${user}`);
    }
};

const TrafficManager = {
    MAX_CONCURRENCY: 500,
    async validateAndSubmit(user, actionName, actionFn) {
        const currentLoad = Math.floor(Math.random() * 550); // Simulasi traffic
        if (currentLoad > this.MAX_CONCURRENCY) {
            window.DREAM_SYS.haptic([200, 100, 200]);
            alert("Traffic High: Antrean Sistem Aktif");
            return;
        }
        
        const result = await actionFn();
        // CATAT KE GHOST LOG: Siapa yang input data
        GhostAudit.record(user, "INPUT_DATA", actionName);
        return result;
    }
};

const state = {
    lang: navigator.language.startsWith('ar') ? 'ar' : 'id',
    user: { email: 'girangati1001@gmail.com', role: 'Architect' } 
};

const t = (key) => translations[state.lang][key] || key;

window.DREAM = {
    state,
    load: (mod) => {
        if (mod === 'ghost') renderGhostDashboard();
        window.DREAM_SYS.log('info', `Routing: ${mod}`);
    }
};

async function init() {
    renderShell();
    GhostAudit.record(state.user.email, "SYSTEM_ACCESS");
    window.DREAM_SYS.log('success', 'Kernel v2.1 Ready');
}

function renderShell() {
    const shell = document.getElementById('app-shell');
    shell.innerHTML = `
        <header class="shell-header glass-header" style="padding:1rem; cursor:pointer;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h1 style="color:#10b981; margin:0; font-size:1rem;">Dream OS</h1>
                <span class="font-arabic" style="color:var(--dream-gold); font-size:0.8rem;">${t('bismillah')}</span>
            </div>
        </header>
        <main id="main-content" style="padding:1.5rem;">
            <div class="module-card" style="text-align:center;">
                <p>${t('dashboard')}</p>
                <button id="btn-input-test" class="btn-primary" style="width:100%;">Input Data Laporan</button>
            </div>
        </main>
        <footer class="bottom-bar glass-footer" style="position:fixed; bottom:0; width:100%; display:flex; justify-content:space-around; padding:0.8rem;">
            <div class="nav-item active"><i class="fas fa-home"></i></div>
            <div id="shalawat-center" style="transform:translateY(-15px); background:#10b981; width:50px; height:50px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white;">ﷺ</div>
            <div class="nav-item"><i class="fas fa-user-circle"></i></div>
        </footer>
    `;

    document.getElementById('btn-input-test').addEventListener('click', () => {
        TrafficManager.validateAndSubmit(state.user.email, "Laporan K3 - Kebersihan", () => {
            window.DREAM_SYS.haptic(50);
            alert(t('success'));
        });
    });
}

function renderGhostDashboard() {
    const logs = JSON.parse(localStorage.getItem('ghost_audit_trail') || '[]');
    document.getElementById('main-content').innerHTML = `
        <div class="glass-wrapper" style="padding:1rem; font-size:0.75rem;">
            <h3 style="color:#8b5cf6;"><i class="fas fa-bolt"></i> Monitoring Ghost Architect</h3>
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
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', init);

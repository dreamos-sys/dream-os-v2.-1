/**
 * shell.js – Dream OS v2.1 Kernel Antarmuka
 * Menampilkan header Bismillah, Shalawat, dan navigasi utama.
 */

const renderShell = () => {
    const app = document.getElementById('app-shell');
    if (!app) return;

    app.innerHTML = `
        <!-- LOADING OVERLAY (akan hilang setelah inisialisasi) -->
        <div id="loading-overlay" class="fixed inset-0 bg-slate-950 z-[10000] flex items-center justify-center transition-opacity duration-500" style="background:#020617;">
            <div class="text-center">
                <div class="loader-emerald mb-4" style="width:60px;height:60px;border:4px solid rgba(16,185,129,0.2);border-top-color:#10b981;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto;"></div>
                <p class="text-emerald-400 font-arabic text-xl animate-pulse">بِسْمِ اللَّهِ</p>
            </div>
        </div>

        <!-- HEADER dengan Bismillah & Shalawat -->
        <header class="shell-header glass-effect sticky top-0 z-50 border-b border-emerald-500/20">
            <div class="flex justify-between px-6 py-2 text-[10px] text-emerald-500/60 font-mono">
                <div class="flex gap-4">
                    <span id="p-time">Fajr 04:40</span>
                    <span><i class="fas fa-signal-stream"></i> <span id="net-status">4G+</span></span>
                </div>
                <div><span id="battery-level">93%</span> <i class="fas fa-battery-bolt"></i></div>
            </div>

            <div class="text-center py-4 bg-gradient-to-b from-emerald-500/10 to-transparent">
                <h1 class="font-arabic text-2xl text-emerald-400 drop-shadow-glow mb-1">
                    بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </h1>
                <h2 class="font-arabic text-sm text-emerald-300/70">
                    اَللهم صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ
                </h2>
            </div>
        </header>

        <!-- AREA KONTEN MODUL -->
        <main id="dynamic-stage" class="min-h-screen pb-32 px-4 pt-6"></main>

        <!-- NAVIGASI BAWAH (FIXED) -->
        <nav class="fixed bottom-0 left-0 right-0 glass-effect border-t border-emerald-500/20 px-8 py-5 flex justify-between items-center z-40">
            <button onclick="DREAM.load('home')" class="nav-btn" title="Home"><i class="fas fa-home-lg-alt"></i></button>
            <button onclick="DREAM.load('sekuriti')" class="nav-btn" title="Sekuriti"><i class="fas fa-shield-keyhole"></i></button>
            
            <div class="center-hex-container" onclick="DREAM.load('ai-panel')" title="AI Assistant">
                <div class="center-hex">
                    <div class="hex-inner font-arabic">صلوات</div>
                </div>
            </div>

            <button onclick="DREAM.load('inventory')" class="nav-btn" title="Inventori"><i class="fas fa-inventory"></i></button>
            <button onclick="DREAM.load('profile')" class="nav-btn" title="Profil"><i class="fas fa-user-shield"></i></button>
        </nav>
    `;

    // Update data real-time (dari utility)
    if (window.DREAM?.utils?.prayerTime) {
        const prayerDisplay = document.getElementById('p-time');
        if (prayerDisplay) {
            const times = window.DREAM.utils.prayerTime.getTimes?.() || {};
            prayerDisplay.textContent = `Fajr ${times.Fajr || '04:40'}`;
        }
    }
};

// Inisialisasi setelah DOM siap
document.addEventListener('DOMContentLoaded', () => {
    renderShell();
    window.DREAM_SYS.log('success', 'Dream OS v2.1 Initialized bi idznillah');

    // Jalankan watchdog & backup manager jika ada
    window.SystemWatchdog?.start();
    window.BackupManager?.start();

    // Hilangkan loading overlay setelah 1.5 detik
    setTimeout(() => {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.classList.add('opacity-0', 'pointer-events-none');
            setTimeout(() => overlay.remove(), 500);
        }
        window.DREAM.load('home'); // Muat modul home
    }, 1500);
});

// Animasi spin (jika belum ada di CSS)
const style = document.createElement('style');
style.textContent = `
    @keyframes spin { to { transform: rotate(360deg); } }
    .animate-pulse { animation: pulse 2s cubic-bezier(0.4,0,0.6,1) infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
`;
document.head.appendChild(style);

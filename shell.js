class DreamKernel {
    constructor() {
        this.state = {
            isAuth: sessionStorage.getItem('dream_auth_v2.1') === 'true',
            masterKey: '012443410',
            activeAgent: 'gemini', arenaMode: true,
            db: JSON.parse(localStorage.getItem('dream_db_v13')) || { assets: [], logs: [], ai_convos: [] }
        };
        this.init();
    }

    // --- GLOBAL AI COUNCIL IMMUNITY (The Interrupter) ---
    async runImmunityCheck(action, details) {
        const councilPanel = document.getElementById('global-ai-council');
        if (!councilPanel) return;

        // Logika Interupsi Otomatis
        let alert = null;
        if (action === 'LOW_STOCK') {
            alert = { agent: 'claude', msg: "Master M, stok kritis terdeteksi. Saya sudah menyiapkan draf SPJ pengadaan.", color: '#f27352' };
        } else if (action === 'SECURITY_ALERT') {
            alert = { agent: 'gemini', msg: "Sensor mendeteksi anomali akses. Protokol 'Depok Lightning Strike' siap diaktifkan.", color: '#8b5cf6' };
        } else if (action === 'K3_CRITICAL') {
            alert = { agent: 'gpt', msg: "Laporan K3 masuk. Perlu tindakan segera untuk menjaga standar ISO 9001.", color: '#10a37f' };
        }

        if (alert) {
            councilPanel.innerHTML = `
                <div class="animate-bounce-in glass p-4 rounded-2xl border-l-4 mb-2" style="border-color:${alert.color}">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-[8px] font-black uppercase" style="color:${alert.color}">${alert.agent} INTERRUPT</span>
                    </div>
                    <p class="text-[10px] text-white leading-tight">${alert.msg}</p>
                </div>
            `;
            setTimeout(() => councilPanel.innerHTML = '', 8000); // Hilang setelah 8 detik
        }
    }

    // --- INTEGRATED API ---
    init() {
        if (document.readyState === 'complete') { this.renderUI(); }
        else { window.addEventListener('load', () => this.renderUI()); }
    }

    renderUI() { this.state.isAuth ? this.boot() : this.renderLogin(); }

    boot() {
        window.DREAM = { 
            navigate: (id) => this.navigate(id),
            ask: (q, a) => this.askAI(q, a),
            triggerImmunity: (action, detail) => this.runImmunityCheck(action, detail),
            scan: async () => ({ wifi: navigator.onLine, printer: true, nfc: true })
        };
        
        document.getElementById('app-shell').innerHTML = `
            <div id="global-ai-council" class="fixed top-4 left-4 right-4 z-[9999] pointer-events-none"></div>
            <main id="main-content" class="flex-1 overflow-y-auto"></main>
            <nav class="h-20 bg-zinc-900/80 backdrop-blur-2xl border-t border-white/5 flex justify-around items-center pb-2">
                <button onclick="DREAM.navigate('home')" class="flex flex-col items-center gap-1 text-zinc-500"><i class="fas fa-house"></i><span class="text-[7px]">HOME</span></button>
                <button onclick="DREAM.navigate('command-center')" class="flex flex-col items-center gap-1 text-zinc-500"><i class="fas fa-tower-broadcast"></i><span class="text-[7px]">CORE</span></button>
                <button onclick="DREAM.navigate('ai-chat')" class="w-14 h-14 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-full flex items-center justify-center -translate-y-4 shadow-lg active:scale-90 transition-all">
                    <i class="fas fa-robot text-white text-xl"></i>
                </button>
                <button onclick="DREAM.navigate('stok')" class="flex flex-col items-center gap-1 text-zinc-500"><i class="fas fa-box"></i><span class="text-[7px]">STOK</span></button>
                <button onclick="DREAM.navigate('settings')" class="flex flex-col items-center gap-1 text-zinc-500"><i class="fas fa-gears"></i><span class="text-[7px]">SYSTEM</span></button>
            </nav>
        `;
        this.navigate('home');
    }

    async navigate(id) {
        const shell = document.getElementById('main-content');
        try {
            const mod = await import(`./modules/${id}/module.js?v=${Date.now()}`);
            shell.innerHTML = await mod.default.render({ user: {name: 'Master M'} });
            if (mod.default.afterRender) mod.default.afterRender();
        } catch(e) {
            shell.innerHTML = `<div class="p-20 text-center text-zinc-800 text-[10px] italic">Dream OS Booting...</div>`;
        }
    }
}
new DreamKernel();

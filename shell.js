const MANTRA = "012443410";

class DreamKernel {
    constructor() {
        this.app = document.getElementById('app-shell');
        this.init();
    }

    init() {
        // Hapus loader dan ganti jadi login
        this.app.innerHTML = `
            <div class="text-center p-10 glass rounded-[3rem] w-80">
                <div class="w-16 h-16 bg-green-500 rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-lg shadow-green-500/20">
                    <i class="fas fa-fingerprint text-3xl text-black"></i>
                </div>
                <h1 class="text-[10px] tracking-[10px] text-white/40 uppercase mb-10 font-black">Dream OS v2.1</h1>
                <div class="relative">
                    <input type="password" id="pin" placeholder="MANTRA" class="bg-transparent border-b border-white/10 text-center tracking-[10px] outline-none w-full pb-2 text-sm focus:border-green-500 transition-all uppercase">
                </div>
                <p class="mt-10 text-[7px] text-white/10 tracking-[3px] uppercase italic">Out of The Box Inside</p>
            </div>
        `;

        const pin = document.getElementById('pin');
        if(pin) {
            pin.focus();
            pin.addEventListener('input', (e) => {
                if(e.target.value === MANTRA) this.boot();
            });
        }
    }

    boot() {
        this.app.innerHTML = `
            <div class="p-6 h-full w-full flex flex-col justify-center animate-in zoom-in duration-300">
                <p class="text-green-500 text-lg mb-8 font-serif italic text-center">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
                <div class="grid grid-cols-3 gap-4">
                    ${['Booking','K3','Security','Janitor','Tools','Maintenance','Assets','Arena','Admin'].map((m, i) => `
                        <div class="aspect-square glass rounded-2xl flex flex-col items-center justify-center active:scale-90 transition-all">
                            <i class="fas fa-th-large mb-2 text-white/20"></i>
                            <span class="text-[8px] uppercase font-black text-white/40">${m}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

// Jalankan Kernel
window.addEventListener('DOMContentLoaded', () => {
    new DreamKernel();
});

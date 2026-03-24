export default {
    async render() {
        return `
            <div class="p-5 animate-up">
                <h2 class="text-white font-black text-lg tracking-widest mb-6">ADMIN PANEL ISO</h2>
                
                <div class="grid grid-cols-2 gap-3 mb-6">
                    <div class="glass p-4 rounded-3xl">
                        <i class="fas fa-wifi ${navigator.onLine ? 'text-emerald-500' : 'text-zinc-600'} mb-2"></i>
                        <p class="text-[8px] text-zinc-500 font-bold uppercase tracking-widest text-center">WiFi Printer</p>
                    </div>
                    <div class="glass p-4 rounded-3xl">
                        <i class="fas fa-tv text-purple-500 mb-2"></i>
                        <p class="text-[8px] text-zinc-500 font-bold uppercase tracking-widest text-center">TV Box Detect</p>
                    </div>
                </div>

                <button onclick="DREAM.printSPJ()" class="w-full glass p-6 rounded-[35px] border-l-4 border-l-purple-500 flex justify-between items-center mb-4 active:scale-95 transition-all">
                    <div class="text-left">
                        <h3 class="text-white font-black text-xs">CETAK LAPORAN SPJ</h3>
                        <p class="text-[8px] text-zinc-500 italic uppercase">Format A4 • Cloud Printing</p>
                    </div>
                    <i class="fas fa-print text-purple-500"></i>
                </button>

                <div class="space-y-3">
                    <div class="glass p-5 rounded-3xl flex justify-between items-center">
                        <span class="text-[10px] font-black text-white">NFC SCANNER</span>
                        <div class="w-10 h-5 bg-zinc-800 rounded-full relative"><div class="absolute right-1 top-1 w-3 h-3 bg-purple-500 rounded-full"></div></div>
                    </div>
                    <div class="glass p-5 rounded-3xl flex justify-between items-center">
                        <span class="text-[10px] font-black text-white">BIOMETRIC (FINGER)</span>
                        <i class="fas fa-check-circle text-emerald-500"></i>
                    </div>
                </div>
            </div>
        `;
    }
};

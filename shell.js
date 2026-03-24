const SACRED_MANTRA = "012443410";

const UI = {
    renderLoading() {
        document.getElementById('app').innerHTML = `
            <div class="flex flex-col items-center justify-center h-screen bg-[#050A0F] animate-fade-in">
                <div class="relative w-24 h-24 mb-6">
                    <div class="absolute inset-0 bg-green-500 blur-2xl opacity-20 animate-pulse"></div>
                    <img src="https://img.icons8.com/fluency/96/dreamcast.png" class="relative w-full h-full animate-bounce" alt="Dream OS">
                </div>
                
                <h1 class="text-green-500 font-black tracking-[5px] mb-2">DREAM OS v2.1</h1>
                <p class="text-[10px] text-white/30 uppercase mb-8">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>

                <input type="password" id="mantra-gate" placeholder="· · · · ·" 
                    class="bg-transparent border-b border-white/10 text-center text-white tracking-[10px] outline-none w-32 pb-2 text-sm focus:border-green-500 transition-all">
                
                <button onclick="window.verifyMantra()" class="mt-8 text-[9px] text-white/20 uppercase tracking-[3px] hover:text-green-500 transition-all">Initiate Neural Link</button>
            </div>
        `;
    }
};

window.verifyMantra = () => {
    const val = document.getElementById('mantra-gate').value;
    if (val === SACRED_MANTRA) {
        alert("GHOST MODE ACTIVE: Welcome Sibling Architect.");
        // Disini nanti panggil modul Ghost Stealth lu
    } else {
        alert("STANDARD MODE: Accessing Public Grid.");
        // Disini panggil modul Umum
    }
};

UI.renderLoading();

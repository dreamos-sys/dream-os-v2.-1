export default {
    async render() {
        return `
            <div class="p-5 animate-up">
                <div class="text-center mb-8">
                    <h2 class="text-purple-400 font-bold tracking-[6px] text-xl font-['Amiri']">بِسْمِ اللَّهِ بِإِذْنِ اللَّهِ</h2>
                    <p class="text-emerald-500 text-[10px] font-black mt-2 tracking-[2px] font-['Amiri'] uppercase">اَللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</p>
                </div>

                <div class="relative w-full h-44 overflow-hidden rounded-[35px] glass mb-8">
                    <div id="slider" class="flex transition-transform duration-700 h-full w-[700%]">
                        ${[1,2,3,4,5,6,7].map(i => `
                            <div class="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                                <span class="text-[8px] text-purple-500 font-black mb-2 tracking-[4px]">DREAM SYSTEM CORE</span>
                                <h3 id="slide-title-${i}" class="text-white font-black text-xs uppercase leading-relaxed"></h3>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="grid grid-cols-3 gap-3">
                    ${['🏛️','📅','⚠️','🛡️','🧹','🌿','📦','🔧','🏢'].map((icon, i) => {
                        const labels = ['Admin','Booking','K3','Sekuriti','Janitor In','Janitor Out','Stok','Maint','Assets'];
                        const targets = ['admin','booking','k3','sekuriti','janin','janout','stok','maint','asset'];
                        return `
                        <button onclick="DREAM.navigate('${targets[i]}')" class="glass p-5 rounded-3xl active:scale-90 transition-all flex flex-col items-center gap-2">
                            <span class="text-2xl">${icon}</span>
                            <span class="text-[7px] font-black text-zinc-500 uppercase">${labels[i]}</span>
                        </button>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    afterRender() {
        const slideData = [
            "Bismillah bi idznillah, sistem siap beroperasi.",
            "ISO 27001 Active: Security Management.",
            "ISO 55001 Active: Asset Management.",
            "ISO 9001 Active: Quality Management.",
            "Dream OS v13.2: AI Agent Ready.",
            "Aura Sistem Selaras 5 Waktu Shalat.",
            "Standby for Directives, Master M."
        ];

        slideData.forEach((text, i) => {
            const el = document.getElementById(`slide-title-${i+1}`);
            if(el) el.innerText = text;
        });

        let current = 0;
        const slider = document.getElementById('slider');
        setInterval(() => {
            current = (current + 1) % 7;
            if(slider) slider.style.transform = `translateX(-${current * (100/7)}%)`;
        }, 7000); // 7 Detik
    }
};

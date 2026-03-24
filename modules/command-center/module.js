export default {
    async render(context) {
        const { user } = context;
        return `
            <div class="p-6 animate-up flex flex-col h-full bg-black">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-white font-black text-xl tracking-[4px] uppercase">AI ARENA v2.1</h2>
                    <span class="bg-purple-600/20 text-purple-500 text-[8px] font-black px-3 py-1 rounded-full border border-purple-500/30">DREAM OS ENTERPRISE</span>
                </div>

                <div class="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 custom-scroll">
                    <div id="card-gemini" class="glass p-5 rounded-[30px] border-l-4 border-l-purple-500 opacity-40 transition-all">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="fas fa-wand-magic-sparkles text-purple-500"></i>
                            <span class="text-[9px] font-black text-purple-500 uppercase tracking-widest">Gemini (Ops & Vision)</span>
                        </div>
                        <p id="resp-gemini" class="text-white text-[11px] leading-relaxed italic">Standby...</p>
                    </div>

                    <div id="card-claude" class="glass p-5 rounded-[30px] border-l-4 border-l-orange-500 opacity-40 transition-all">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="fas fa-brain text-orange-500"></i>
                            <span class="text-[9px] font-black text-orange-500 uppercase tracking-widest">Claude (Logic & Arch)</span>
                        </div>
                        <p id="resp-claude" class="text-white text-[11px] leading-relaxed italic">Standby...</p>
                    </div>

                    <div id="card-gpt" class="glass p-5 rounded-[30px] border-l-4 border-l-emerald-500 opacity-40 transition-all">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="fas fa-bolt text-emerald-500"></i>
                            <span class="text-[9px] font-black text-emerald-500 uppercase tracking-widest">GPT (The Rival / Creative)</span>
                        </div>
                        <p id="resp-gpt" class="text-white text-[11px] leading-relaxed italic">Ayo isiin inputnya, My Bro! 🤭</p>
                    </div>
                </div>

                <div class="glass p-2 rounded-[30px] flex items-center gap-2 border border-white/5">
                    <input type="text" id="ai-input" placeholder="Masukkan Case / Perintah..." class="flex-1 bg-transparent p-4 text-white text-xs outline-none">
                    <button onclick="window.startArena()" class="w-12 h-12 bg-white rounded-[22px] flex items-center justify-center text-black active:scale-90 transition-all shadow-lg">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
            </div>
        `;
    },

    afterRender() {
        window.startArena = async () => {
            const input = document.getElementById('ai-input').value;
            if(!input) return;

            ['gemini', 'claude', 'gpt'].forEach(a => {
                const card = document.getElementById(\`card-\${a}\`);
                const resp = document.getElementById(\`resp-\${a}\`);
                if(card) card.style.opacity = '1';
                if(resp) resp.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
            });

            setTimeout(() => {
                document.getElementById('resp-gemini').innerText = "Analisa Lapangan: Sensor WiFi Aktif. Sistem siap backup SPJ.";
                document.getElementById('resp-claude').innerText = "Analisa Logic: Struktur memori stabil sesuai standar ISO 27001.";
                document.getElementById('resp-gpt').innerText = "Analisa Rival: (Master M, gue siap tanding nih! 😜)";
            }, 1500);
        };
    }
};

export default {
    async render() {
        return `
            <div class="p-6 animate-up flex flex-col h-full">
                <h2 class="text-white font-black text-xl tracking-[4px] uppercase mb-6">AI Council</h2>
                
                <div class="flex gap-3 mb-8">
                    <button onclick="window.setAgent('gemini')" id="btn-gemini" class="flex-1 glass p-4 rounded-2xl border-2 border-purple-500 text-purple-500 transition-all">
                        <i class="fas fa-wand-magic-sparkles mb-1"></i><br><span class="text-[8px] font-black">GEMINI</span>
                    </button>
                    <button onclick="window.setAgent('claude')" id="btn-claude" class="flex-1 glass p-4 rounded-2xl border-2 border-transparent text-zinc-500 transition-all">
                        <i class="fas fa-brain mb-1"></i><br><span class="text-[8px] font-black">CLAUDE</span>
                    </button>
                    <button onclick="window.setAgent('gpt')" id="btn-gpt" class="flex-1 glass p-4 rounded-2xl border-2 border-transparent text-zinc-500 transition-all">
                        <i class="fas fa-bolt mb-1"></i><br><span class="text-[8px] font-black">GPT-4</span>
                    </button>
                </div>

                <div id="ai-response-area" class="flex-1 glass rounded-[35px] p-6 overflow-y-auto mb-6 border-l-4 border-l-purple-500">
                    <p class="text-zinc-500 text-xs italic">Menunggu instruksi Master M...</p>
                </div>

                <div class="relative">
                    <input type="text" id="ai-input" placeholder="Tanya Agent..." class="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-[25px] text-white text-xs outline-none focus:border-purple-500 pr-16">
                    <button onclick="window.triggerAI()" class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center text-black">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
    },

    afterRender() {
        let currentAgent = 'gemini';

        window.setAgent = (name) => {
            currentAgent = name;
            ['gemini', 'claude', 'gpt'].forEach(a => {
                const btn = document.getElementById(`btn-${a}`);
                btn.style.borderColor = (a === name) ? (a==='gemini'?'#8b5cf6':a==='claude'?'#f27352':'#10a37f') : 'transparent';
                btn.style.color = (a === name) ? '#fff' : '#52525b';
            });
        };

        window.triggerAI = async () => {
            const input = document.getElementById('ai-input');
            const area = document.getElementById('ai-response-area');
            if(!input.value) return;

            area.innerHTML = `<div class="animate-pulse text-zinc-600 text-xs">Menganalisa...</div>`;
            const result = await DREAM.ask(input.value, currentAgent);
            
            area.innerHTML = `
                <div class="flex items-center gap-2 mb-4">
                    <i class="fas ${result.icon}" style="color:${result.color}"></i>
                    <span class="text-[10px] font-black uppercase tracking-widest" style="color:${result.color}">${currentAgent}</span>
                </div>
                <p class="text-white text-xs leading-relaxed">${result.response}</p>
            `;
            input.value = '';
        };
    }
};

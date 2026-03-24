const MANTRA = "012443410";

const Kernel = {
    init() {
        this.renderGate();
    },

    renderGate() {
        document.getElementById('app').innerHTML = `
            <div class="text-center animate-fade-in">
                <div class="w-24 h-24 mx-auto mb-8 relative">
                    <div class="absolute inset-0 bg-green-500 blur-3xl opacity-10 animate-pulse"></div>
                    <img src="https://img.icons8.com/fluency/96/dreamcast.png" class="w-full h-full relative" alt="Logo">
                </div>
                <h1 class="text-xs tracking-[10px] text-white/40 uppercase mb-12">Dream OS v2.1</h1>
                <input type="password" id="gate-input" placeholder="ACCESS KEY" 
                    class="bg-transparent border-b border-white/10 text-center tracking-[8px] outline-none w-48 pb-2 text-sm focus:border-green-500 transition-all uppercase">
            </div>
        `;

        document.getElementById('gate-input').addEventListener('input', (e) => {
            if(e.target.value === MANTRA) this.renderDashboard();
        });
    },

    renderDashboard() {
        const menus = [
            {id: 'booking', icon: 'calendar-check', label: 'Booking'},
            {id: 'k3', icon: 'shield-alt', label: 'K3'},
            {id: 'security', icon: 'video', label: 'Security'},
            {id: 'janitor', icon: 'broom', label: 'Janitor'},
            {id: 'tools', icon: 'tools', label: 'Tools'},
            {id: 'maintenance', icon: 'hammer', label: 'Maintenance'},
            {id: 'assets', icon: 'box-open', label: 'Assets'},
            {id: 'arena', icon: 'microchip', label: 'AI Arena'},
            {id: 'admin', icon: 'user-shield', label: 'Admin'}
        ];

        document.getElementById('app').innerHTML = `
            <div class="grid grid-cols-3 gap-4 animate-scale-up">
                ${menus.map(m => `
                    <div onclick="alert('Module ${m.label} Active')" class="grid-icon aspect-square flex flex-col items-center justify-center rounded-2xl cursor-pointer">
                        <i class="fas fa-${m.icon} text-2xl mb-2 text-white/80"></i>
                        <span class="text-[9px] uppercase tracking-widest text-white/40 font-bold">${m.label}</span>
                    </div>
                `).join('')}
            </div>
            <p class="text-[8px] text-center mt-12 text-white/10 tracking-[5px] uppercase font-black">Dream Team Family - ISO Standards</p>
        `;
    }
};

Kernel.init();

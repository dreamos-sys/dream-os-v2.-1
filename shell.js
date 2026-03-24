const MANTRA = "012443410";

const Kernel = {
    init() {
        console.log("🚀 Kernel Starting...");
        try {
            this.renderGate();
        } catch (e) {
            document.body.innerHTML = `<div style="color:red; padding:20px;">Kernel Error: ${e.message}</div>`;
        }
    },

    renderGate() {
        const app = document.getElementById('app');
        if(!app) return;
        
        app.innerHTML = `
            <div style="text-align:center; padding-top:100px;">
                <img src="https://img.icons8.com/fluency/96/dreamcast.png" style="width:80px; margin-bottom:30px;">
                <h1 style="letter-spacing:10px; font-size:10px; opacity:0.5; color:white; text-transform:uppercase;">Dream OS v2.1</h1>
                <input type="password" id="gate-input" placeholder="· · · · ·" 
                    style="background:transparent; border:none; border-bottom:1px solid #333; color:white; text-align:center; width:150px; font-size:20px; outline:none; margin-top:20px; letter-spacing:10px;">
            </div>
        `;

        document.getElementById('gate-input').addEventListener('input', (e) => {
            if(e.target.value === MANTRA) this.renderDashboard();
        });
    },

    renderDashboard() {
        const menus = [
            {icon: 'calendar-check', label: 'Booking'},
            {icon: 'shield-alt', label: 'K3'},
            {icon: 'video', label: 'Security'},
            {icon: 'broom', label: 'Janitor'},
            {icon: 'tools', label: 'Tools'},
            {icon: 'hammer', label: 'Maintenance'},
            {icon: 'box-open', label: 'Assets'},
            {icon: 'microchip', label: 'AI Arena'},
            {icon: 'user-shield', label: 'Admin'}
        ];

        document.getElementById('app').innerHTML = `
            <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:15px; padding:10px;">
                ${menus.map(m => `
                    <div style="aspect-ratio:1/1; background:rgba(255,255,255,0.05); border-radius:15px; display:flex; flex-direction:column; align-items:center; justify-content:center; border:1px solid #222;">
                        <i class="fas fa-${m.icon}" style="font-size:20px; margin-bottom:8px; color:#aaa;"></i>
                        <span style="font-size:8px; text-transform:uppercase; color:#555;">${m.label}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
};

window.onload = () => Kernel.init();

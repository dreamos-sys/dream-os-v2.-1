export default async function render({ container }) {
    const menus = [
        { id: 'cc', name: 'COMMAND CENTER', icon: 'fa-chart-column', desc: 'Pusat kendali' },
        { id: 'booking', name: 'BOOKING', icon: 'fa-calendar-check', desc: 'Pemesanan ruangan' },
        { id: 'k3', name: 'K3', icon: 'fa-triangle-exclamation', desc: 'Keselamatan & kesehatan' },
        { id: 'sekuriti', name: 'SEKURITI', icon: 'fa-shield-halved', desc: 'Keamanan & kehilangan' },
        { id: 'janitor-in', name: 'JANITOR IN', icon: 'fa-broom', desc: 'Kebersihan indoor' },
        { id: 'janitor-out', name: 'JANITOR OUT', icon: 'fa-leaf', desc: 'Kebersihan outdoor' }
    ];

    container.innerHTML = `
        <div style="background: #020617; min-h-screen; padding: 20px 15px 100px 15px;">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                ${menus.map(m => `
                    <div onclick="DREAM.haptic(50); DREAM.load('${m.id}')" 
                         style="background: #1e293b; padding: 20px; border-radius: 24px; border: 1px solid #334155; display: flex; flex-direction: column; align-items: center; text-align: center; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);">
                        <div style="width: 50px; height: 50px; background: rgba(16, 185, 129, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 12px;">
                            <i class="fa-solid ${m.icon}" style="color: #10b981; font-size: 20px;"></i>
                        </div>
                        <h3 style="color: #f8fafc; font-size: 10px; font-weight: 800; letter-spacing: 1px; margin: 0; text-transform: uppercase;">${m.name}</h3>
                        <p style="color: #94a3b8; font-size: 8px; margin-top: 4px; font-style: italic;">${m.desc}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

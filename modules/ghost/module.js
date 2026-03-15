/**
 * modules/ghost/index.js
 * 🏛️ GHOST ARCHITECT STEALTH MODE - Dream OS v2.1
 * Stealth Control • ISO 27001 • Sovereign Kernel v4
 */

export default async function({ container, supabase, user }) {
    console.log('👻 [GHOST] Ghost Architect Mode Engaged.');

    // SECURITY CHECK: Master M Bypass
    const isMasterM = user?.email === 'girangati1001@gmail.com';
    if (!isMasterM && user?.role !== 'architect') {
        container.innerHTML = `<div class="p-20 text-center text-red-500">🔒 ACCESS DENIED: GHOST_BYPASS_FAILED</div>`;
        return;
    }

    // STATE MANAGEMENT
    let activeTab = 'overview';
    const logs = JSON.parse(localStorage.getItem('dreamos-logs') || '[]').slice(-50);

    const render = () => {
        container.innerHTML = `
        <div class="ghost-wrapper animate-fade-in" style="padding: 15px; font-family: 'Inter', sans-serif; color: #e2e8f0;">
            
            <div class="glass-card" style="background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 24px; padding: 20px; margin-bottom: 20px; box-shadow: 0 0 30px rgba(16, 185, 129, 0.1);">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="font-size: 40px; filter: drop-shadow(0 0 10px #10b981);">👻</div>
                        <div>
                            <h2 style="margin: 0; font-size: 18px; color: #10b981; letter-spacing: 2px; font-weight: 900;">GHOST ARCHITECT</h2>
                            <p style="margin: 0; font-size: 10px; color: #94a3b8; letter-spacing: 1px;">SOVEREIGN KERNEL ACTIVE • ISO 27001</p>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 10px; color: #10b981; font-weight: bold;">SYSTEM IMMUNITY</div>
                        <div style="font-size: 12px; font-family: monospace;">HEALTHY 100%</div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 20px;">
                    <button onclick="window.ghostExport()" style="background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; color: #10b981; padding: 12px; border-radius: 12px; font-size: 11px; font-weight: bold;">📊 EXPORT DATA</button>
                    <button onclick="window.ghostWipe()" style="background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; color: #ef4444; padding: 12px; border-radius: 12px; font-size: 11px; font-weight: bold;">🗑️ WIPE SYSTEM</button>
                </div>
            </div>

            <div style="display: flex; gap: 20px; margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-left: 10px;">
                ${['overview', 'logs', 'network'].map(t => `
                    <button onclick="window.switchGhostTab('${t}')" style="background: none; border: none; padding: 10px 0; color: ${activeTab === t ? '#10b981' : '#64748b'}; border-bottom: 2px solid ${activeTab === t ? '#10b981' : 'transparent'}; font-size: 12px; font-weight: bold; cursor: pointer; text-transform: uppercase;">${t}</button>
                `).join('')}
            </div>

            <div id="ghost-content-inner" class="glass-card" style="background: rgba(15, 23, 42, 0.5); border-radius: 20px; padding: 20px; border: 1px solid rgba(255,255,255,0.05); min-height: 300px;">
                ${renderActiveTab()}
            </div>

            <div style="text-align: center; margin-top: 30px; opacity: 0.3; font-size: 9px; letter-spacing: 3px;">
                BISMILLAH • THE POWER SOUL OF SHALAWAT
            </div>
        </div>
        `;
    };

    const renderActiveTab = () => {
        if (activeTab === 'overview') {
            return `
                <h3 style="font-size: 14px; color: #10b981; margin-bottom: 15px;">📊 ARCHITECT OVERVIEW</h3>
                <div style="display: grid; grid-template-columns: 1fr; gap: 10px;">
                    <div style="background: rgba(255,255,255,0.03); padding: 15px; border-radius: 12px;">
                        <div style="color: #64748b; font-size: 10px;">AUTH_SESSION</div>
                        <div style="font-family: monospace; font-size: 12px;">${user?.email || 'GHOST_BYPASS'}</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.03); padding: 15px; border-radius: 12px;">
                        <div style="color: #64748b; font-size: 10px;">ENGINE_VERSION</div>
                        <div style="font-family: monospace; font-size: 12px;">Dream OS v2.1 - Architect</div>
                    </div>
                </div>
            `;
        }
        if (activeTab === 'logs') {
            return `
                <div style="background: #000; padding: 15px; border-radius: 12px; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #10b981; max-height: 250px; overflow-y: auto;">
                    ${logs.length > 0 ? logs.map(l => `> [${new Date().toLocaleTimeString()}] ${l.message}`).join('<br>') : '> NO_LOGS_RECORDED'}
                </div>
            `;
        }
        return `<div class="text-center p-10 text-slate-500">Scanning Sovereign Network...</div>`;
    };

    // GLOBAL HANDLERS
    window.switchGhostTab = (tab) => {
        activeTab = tab;
        render();
    };

    window.ghostExport = () => {
        const data = { logs, user, system: 'Dream OS v2.1', timestamp: new Date() };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ghost_dump_${Date.now()}.json`;
        a.click();
    };

    window.ghostWipe = () => {
        if(confirm("ISO 27001 Protocol: Wipe all session data?")) {
            localStorage.clear();
            sessionStorage.clear();
            location.reload();
        }
    };

    render();

    // CLEANUP
    return () => {
        delete window.switchGhostTab;
        delete window.ghostExport;
        delete window.ghostWipe;
    };
}

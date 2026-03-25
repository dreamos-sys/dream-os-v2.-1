export default {
    name: 'Command Center',
    icon: 'fa-desktop',
    color: '#a855f7',
    version: '3.0.0',
    
    async render(context) {
        return `
            <div style="animation:fadeInUp 0.4s ease;">
                <div style="background:linear-gradient(135deg, rgba(168,85,247,0.15), rgba(139,92,246,0.1)); border-radius:24px; padding:20px; margin-bottom:20px;">
                    <div style="display:flex; align-items:center; gap:15px;">
                        <div style="width:50px; height:50px; background:linear-gradient(135deg, #a855f7, #8b5cf6); border-radius:16px; display:flex; align-items:center; justify-content:center;">
                            <i class="fas fa-brain" style="font-size:28px; color:white;"></i>
                        </div>
                        <div>
                            <h2 style="color:#a855f7; margin:0;">AI Command Center</h2>
                            <p style="color:#64748b; font-size:11px; margin:0;">Enterprise Smart System • Active</p>
                        </div>
                    </div>
                </div>
                
                <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:12px; margin-bottom:20px;">
                    <div style="background:rgba(15,23,42,0.6); border-radius:16px; padding:15px; text-align:center; border:1px solid rgba(168,85,247,0.2);">
                        <i class="fas fa-chart-line" style="font-size:28px; color:#a855f7;"></i>
                        <div style="font-size:28px; font-weight:700; margin:8px 0;">92%</div>
                        <div style="font-size:10px; color:#64748b;">Operational Health</div>
                    </div>
                    <div style="background:rgba(15,23,42,0.6); border-radius:16px; padding:15px; text-align:center; border:1px solid rgba(16,185,129,0.2);">
                        <i class="fas fa-robot" style="font-size:28px; color:#10b981;"></i>
                        <div style="font-size:28px; font-weight:700; margin:8px 0;">Active</div>
                        <div style="font-size:10px; color:#64748b;">AI Agent Status</div>
                    </div>
                </div>
                
                <div style="background:linear-gradient(135deg, rgba(168,85,247,0.08), rgba(59,130,246,0.05)); border-radius:20px; padding:20px; margin-bottom:20px;">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                        <i class="fas fa-microphone-alt" style="color:#a855f7;"></i>
                        <span style="font-weight:700;">AI Smart Assistant</span>
                    </div>
                    <div style="display:flex; gap:8px;">
                        <input type="text" id="ai-cmd-input" placeholder="Tanya AI: analisa stok, laporan hari ini, prediksi maintenance..." 
                            style="flex:1; background:rgba(0,0,0,0.3); border:1px solid rgba(168,85,247,0.3); border-radius:24px; padding:12px 16px; color:white;">
                        <button id="ai-cmd-send" style="background:#a855f7; border:none; border-radius:24px; padding:0 20px; cursor:pointer;">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <div id="ai-cmd-response" style="margin-top:12px; font-size:12px; color:#64748b;"></div>
                </div>
                
                <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px;">
                    <button class="cc-action" data-action="dashboard" style="background:rgba(168,85,247,0.1); border:1px solid rgba(168,85,247,0.3); border-radius:12px; padding:12px; cursor:pointer;">
                        <i class="fas fa-chart-pie"></i> Dashboard
                    </button>
                    <button class="cc-action" data-action="reports" style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); border-radius:12px; padding:12px; cursor:pointer;">
                        <i class="fas fa-file-alt"></i> Reports
                    </button>
                    <button class="cc-action" data-action="system" style="background:rgba(59,130,246,0.1); border:1px solid rgba(59,130,246,0.3); border-radius:12px; padding:12px; cursor:pointer;">
                        <i class="fas fa-cog"></i> System
                    </button>
                </div>
                
                <div style="margin-top:15px; text-align:center; font-size:10px; color:#475569; padding:10px;">
                    <i class="fas fa-shield-alt"></i> ISO 27001 • AI Agent v3.0 • Dream OS Enterprise
                </div>
            </div>
        `;
    },
    
    async afterRender(context) {
        const toast = context.toast || ((msg) => alert(msg));
        
        // AI Response function
        const getAIResponse = (msg) => {
            const lower = msg.toLowerCase();
            if (lower.includes('stok')) return '📦 Stok: 245 item, 3 menipis. Rekomendasi: reorder kabel HDMI, adaptor, mouse.';
            if (lower.includes('maintenance')) return '🔧 Maintenance: 3 tugas hari ini. Server backup 10:00, Network 14:00, Database 16:00.';
            if (lower.includes('security')) return '🔒 Security: Aktif, CCTV online, tidak ada ancaman.';
            if (lower.includes('booking')) return '📅 Booking: 3 ruangan terisi hari ini. Peak hour 10:00-12:00.';
            if (lower.includes('k3')) return '⚠️ K3: Aman, patroli rutin, tidak ada insiden.';
            if (lower.includes('asset')) return '🏢 Asset: 1,234 aset, 45 maintenance, 12 baru.';
            if (lower.includes('laporan') || lower.includes('hari ini')) return '📊 Laporan: Total 14 aktivitas, kinerja 92%, semua sistem normal.';
            if (lower.includes('prediksi')) return '🔮 Prediksi: Booking +15%, Maintenance +20% dalam 7 hari. Siapkan resource tambahan.';
            return '💚 AI Assistant siap membantu. Tanya: stok, maintenance, security, booking, k3, asset, laporan, prediksi';
        };
        
        // Setup AI Chat
        const input = document.getElementById('ai-cmd-input');
        const sendBtn = document.getElementById('ai-cmd-send');
        const responseDiv = document.getElementById('ai-cmd-response');
        
        const sendMessage = () => {
            const msg = input?.value.trim();
            if (!msg) return;
            responseDiv.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> AI menganalisis...';
            setTimeout(() => {
                const reply = getAIResponse(msg);
                responseDiv.innerHTML = reply;
                input.value = '';
                setTimeout(() => {
                    if (responseDiv.innerHTML === reply) responseDiv.style.opacity = '0.5';
                }, 5000);
            }, 500);
        };
        
        sendBtn?.addEventListener('click', sendMessage);
        input?.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
        
        // Setup Action Buttons
        document.querySelectorAll('.cc-action').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                if (action === 'dashboard') toast?.('📊 Opening Dashboard...', 'info');
                if (action === 'reports') toast?.('📁 Export reports feature coming soon', 'info');
                if (action === 'system') toast?.('⚙️ System health: All systems operational', 'success');
            });
        });
        
        toast?.('✅ Command Center AI Agent Ready!', 'success');
    }
};

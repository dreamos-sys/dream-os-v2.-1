export default {
    name: 'Super Command Center',
    icon: 'fa-building',
    color: '#a855f7',
    version: '5.1.0',
    
    render(context) {
        return `
            <div style="background:linear-gradient(135deg, #0f0f1f, #1a1a2e); border-radius:28px; padding:24px; margin-bottom:24px; border:1px solid rgba(168,85,247,0.3);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; align-items:center; gap:20px;">
                        <div style="width:70px; height:70px; background:linear-gradient(135deg, #a855f7, #8b5cf6); border-radius:20px; display:flex; align-items:center; justify-content:center;">
                            <i class="fas fa-crown" style="font-size:36px; color:gold;"></i>
                        </div>
                        <div>
                            <h1 style="color:#a855f7; margin:0;">SUPER COMMAND CENTER</h1>
                            <p style="color:#94a3b8;">Head of General Affairs • Enterprise Management</p>
                        </div>
                    </div>
                    <div><span class="badge" style="background:#10b981; padding:6px 14px; border-radius:20px;">LIVE</span></div>
                </div>
            </div>

            <!-- KPI Grid Dinamis -->
            <div class="kpi-grid" style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:24px;">
                <div class="kpi-card" style="background:rgba(168,85,247,0.1); border-radius:20px; padding:16px; text-align:center; transition:all 0.3s;">
                    <i class="fas fa-chart-line" style="font-size:24px; color:#a855f7;"></i>
                    <div style="font-size:28px; font-weight:700;">92%</div>
                    <div>Operational Health <span style="color:#10b981;">▲ 3%</span></div>
                </div>
                <div class="kpi-card" style="background:rgba(59,130,246,0.1); border-radius:20px; padding:16px; text-align:center;">
                    <i class="fas fa-calendar" style="font-size:24px; color:#3b82f6;"></i>
                    <div style="font-size:28px; font-weight:700;">8</div>
                    <div>Booking Today <span style="color:#f59e0b;">▼ 2</span></div>
                </div>
                <div class="kpi-card" style="background:rgba(245,158,11,0.1); border-radius:20px; padding:16px; text-align:center;">
                    <i class="fas fa-tools" style="font-size:24px; color:#f59e0b;"></i>
                    <div style="font-size:28px; font-weight:700;">5</div>
                    <div>Maintenance Active <span style="color:#ef4444;">⚠️</span></div>
                </div>
                <div class="kpi-card" style="background:rgba(16,185,129,0.1); border-radius:20px; padding:16px; text-align:center;">
                    <i class="fas fa-shield-alt" style="font-size:24px; color:#10b981;"></i>
                    <div style="font-size:28px; font-weight:700;">Aman</div>
                    <div>Security Status</div>
                </div>
            </div>

            <!-- AI Predictive Analytics + Smart Recommendation -->
            <div style="background:linear-gradient(135deg, #1e1b4b, #0c0a2a); border-radius:24px; padding:20px; margin-bottom:24px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <h3 style="color:#a855f7; margin:0;"><i class="fas fa-brain"></i> AI Predictive Analytics</h3>
                    <button id="refresh-ai-prediction" style="background:#a855f7; border:none; padding:4px 12px; border-radius:20px; cursor:pointer;">⟳ Refresh</button>
                </div>
                <div id="ai-prediction-content" style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px;">
                    <div><strong>Booking Forecast</strong><div style="font-size:24px;">+15%</div><span style="font-size:12px;">vs last month</span></div>
                    <div><strong>Stok Kritis</strong><div style="font-size:24px;">3</div><span style="font-size:12px;">AC, Proyektor, Meja</span></div>
                    <div><strong>Maintenance Trend</strong><div style="font-size:24px;">+20%</div><span style="font-size:12px;">need preventive</span></div>
                    <div><strong>Division Score</strong><div style="font-size:24px;">94%</div><span style="font-size:12px;">top: Security</span></div>
                </div>
                <div id="ai-recommendation" style="margin-top:16px; background:rgba(168,85,247,0.2); border-radius:16px; padding:12px;">
                    <i class="fas fa-robot"></i> <strong>AI Recommendation:</strong> Jadwalkan maintenance AC sebelum musim panas, tingkatkan stok proyektor cadangan.
                </div>
            </div>

            <!-- Tab Navigation -->
            <div class="nav-tabs" style="display:flex; gap:8px; border-bottom:2px solid rgba(168,85,247,0.3); margin-bottom:24px; flex-wrap:wrap;">
                <button class="nav-tab active" data-tab="dashboard">📊 Dashboard</button>
                <button class="nav-tab" data-tab="divisions">👥 Divisions</button>
                <button class="nav-tab" data-tab="monitoring">📡 Monitoring</button>
                <button class="nav-tab" data-tab="finance">💰 Finance</button>
                <button class="nav-tab" data-tab="reports">📁 Reports</button>
                <button class="nav-tab" data-tab="approval">✅ Approval</button>
                <button class="nav-tab" data-tab="ai-assistant">🤖 AI Assistant</button>
            </div>
            <div id="command-content" style="min-height:400px;">
                <p style="text-align:center;">Pilih tab di atas</p>
            </div>

            <style>
                .kpi-card:hover { transform: translateY(-5px); background: rgba(168,85,247,0.2); }
                .nav-tab { background: none; border: none; padding: 10px 18px; cursor: pointer; color: #94a3b8; border-radius: 12px; transition: all 0.3s; }
                .nav-tab:hover { background: rgba(168,85,247,0.1); color: #a855f7; }
                .nav-tab.active { background: rgba(168,85,247,0.2); color: #a855f7; }
            </style>
        `;
    },
    
    afterRender(context) {
        const tabs = document.querySelectorAll('.nav-tab');
        const contentDiv = document.getElementById('command-content');
        
        // Mock data yang dinamis dan terintegrasi dengan AI
        const contents = {
            dashboard: `
                <div>
                    <h3>📊 Executive Dashboard</h3>
                    <p>Ringkasan operasional harian dan notifikasi penting.</p>
                    <ul>
                        <li>✅ Izin masuk hari ini: 12 orang</li>
                        <li>⚠️ Pembersihan area lobby perlu diulang (skor 85%)</li>
                        <li>📅 Meeting Kabag: 14:00 WIB (Ruang Rapat Utama)</li>
                        <li>🔔 Pengajuan dana acara Halal Bihalal: Rp 5.000.000</li>
                    </ul>
                </div>
            `,
            divisions: `
                <div>
                    <h3>👥 Divisions Performance</h3>
                    <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:12px;">
                        <div>Janitor In: 88% <div class="progress-bar" style="background:#a855f7; width:88%; height:8px; border-radius:4px;"></div></div>
                        <div>Janitor Out: 85% <div class="progress-bar" style="background:#a855f7; width:85%; height:8px; border-radius:4px;"></div></div>
                        <div>Maintenance: 92% <div class="progress-bar" style="background:#10b981; width:92%; height:8px; border-radius:4px;"></div></div>
                        <div>Security: 96% <div class="progress-bar" style="background:#10b981; width:96%; height:8px; border-radius:4px;"></div></div>
                    </div>
                    <p style="margin-top:16px;"><strong>AI Insight:</strong> Division Security memiliki performa terbaik, disarankan untuk berbagi praktik ke divisi lain.</p>
                </div>
            `,
            monitoring: `
                <div>
                    <h3>📡 Live Monitoring</h3>
                    <p>CCTV: 8/8 online | Kebersihan: 95% | System load: normal</p>
                    <p><strong>Alert:</strong> Sensor kebersihan di area A menunjukkan perlu pembersihan tambahan.</p>
                    <p><small>Terakhir diperbarui: ${new Date().toLocaleTimeString()}</small></p>
                </div>
            `,
            finance: `
                <div>
                    <h3>💰 Finance Overview</h3>
                    <p>Annual Budget: Rp 245.000.000</p>
                    <p>Realized: Rp 187.000.000 (76%)</p>
                    <p>Remaining: Rp 58.000.000</p>
                    <p><strong>AI Prediction:</strong> Dengan tren saat ini, dana akan cukup hingga akhir tahun. Disarankan alokasi Rp 10.000.000 untuk cadangan.</p>
                </div>
            `,
            reports: `
                <div>
                    <h3>📁 Reports</h3>
                    <ul>
                        <li><a href="#">Operational Report Mar 2026</a></li>
                        <li><a href="#">Division Performance Q1</a></li>
                        <li><a href="#">AI Predictive Analysis - Maintenance</a></li>
                        <li><a href="#">Audit Log Summary</a></li>
                    </ul>
                    <button id="generate-report" style="background:#a855f7; border:none; padding:8px 16px; border-radius:20px; margin-top:12px;">Generate New Report</button>
                </div>
            `,
            approval: `
                <div>
                    <h3>✅ Approval Workflow</h3>
                    <div style="margin-bottom:12px;">
                        <div><input type="checkbox"> Pengajuan Dana Rp 2.500.000 (Operasional)</div>
                        <div><input type="checkbox"> Booking Ruang Rapat (12 April 2026)</div>
                        <div><input type="checkbox"> SPJ Halal Bihalal (file terlampir)</div>
                    </div>
                    <button id="approve-selected" style="background:#10b981; border:none; padding:8px 16px; border-radius:20px;">Approve Selected</button>
                </div>
            `,
            'ai-assistant': `
                <div>
                    <h3>🤖 AI Assistant</h3>
                    <div style="background:#0f172a; border-radius:16px; padding:16px; margin-bottom:16px;">
                        <p><strong>Ask me anything about operations:</strong></p>
                        <div id="ai-chat-command" style="margin-top:12px;">
                            <input type="text" id="ai-command-input" placeholder="Contoh: Berapa booking hari ini?" style="width:70%; padding:8px; border-radius:20px; border:1px solid #334155; background:#1e293b; color:white;">
                            <button id="ask-ai" style="background:#a855f7; border:none; padding:8px 16px; border-radius:20px;">Ask</button>
                        </div>
                        <div id="ai-response" style="margin-top:16px; color:#94a3b8;">Klik Ask untuk memulai.</div>
                    </div>
                    <p><small>AI Assistant menggunakan model prediktif yang terintegrasi dengan data real-time.</small></p>
                </div>
            `
        };
        
        const switchTab = (tabId) => {
            tabs.forEach(t => {
                if (t.dataset.tab === tabId) t.classList.add('active');
                else t.classList.remove('active');
            });
            contentDiv.innerHTML = contents[tabId] || '<p>Konten sedang disiapkan.</p>';
            
            // Event handler untuk tab yang memerlukan interaksi
            if (tabId === 'reports') {
                const genBtn = document.getElementById('generate-report');
                if (genBtn) genBtn.onclick = () => alert('Generate report akan segera tersedia.');
            }
            if (tabId === 'approval') {
                const approveBtn = document.getElementById('approve-selected');
                if (approveBtn) approveBtn.onclick = () => alert('Approval processed (simulasi).');
            }
            if (tabId === 'ai-assistant') {
                const askBtn = document.getElementById('ask-ai');
                const inputField = document.getElementById('ai-command-input');
                const responseDiv = document.getElementById('ai-response');
                if (askBtn) {
                    askBtn.onclick = async () => {
                        const question = inputField.value.trim();
                        if (!question) return;
                        responseDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
                        try {
                            // Panggil Edge Function yang sudah ada
                            const url = 'https://lfavawkzvdhdpaaplaiq.supabase.co/functions/v1/ai-chat';
                            const res = await fetch(url, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ prompt: `Command Center: ${question}` })
                            });
                            const data = await res.json();
                            responseDiv.innerHTML = data.reply || 'Maaf, tidak ada respons.';
                        } catch (err) {
                            responseDiv.innerHTML = '⚠️ Error: ' + err.message;
                        }
                    };
                }
            }
        };
        
        tabs.forEach(tab => {
            tab.addEventListener('click', 
        // Default active ta
        switchTab('dashboard');
        
        // Refresh AI Prediction (simulasi)
        const refreshBtn = document.getElementById('refresh-ai-prediction');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => 
                const predictionDiv = document.getElementById('ai-prediction-content');
                const recommendationDiv = document.getElementById('ai-recommendation'
                if (predictionDiv && recommendationDiv) {
                    // Simulasi data baru (bisa juga panggil AI)
            

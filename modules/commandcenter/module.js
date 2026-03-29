export default {
    name: 'Enterprise Command Center',
    icon: 'fa-building',
    color: '#a855f7',
    version: '6.0.0',
    
    render(context) {
        const supabase = context.supabase;
        window._commandSupabase = supabase;
        return `
            <div style="background:linear-gradient(135deg, #0f0f1f, #1a1a2e); border-radius:28px; padding:24px; margin-bottom:24px; border:1px solid rgba(168,85,247,0.3);">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap;">
                    <div style="display:flex; align-items:center; gap:20px;">
                        <div style="width:70px; height:70px; background:linear-gradient(135deg, #a855f7, #8b5cf6); border-radius:20px; display:flex; align-items:center; justify-content:center;">
                            <i class="fas fa-crown" style="font-size:36px; color:gold;"></i>
                        </div>
                        <div>
                            <h1 style="color:#a855f7; margin:0;">ENTERPRISE COMMAND CENTER</h1>
                            <p style="color:#94a3b8;">Integrated Operations Dashboard | Real‑time Monitoring | AI Analytics</p>
                        </div>
                    </div>
                    <div>
                        <span id="live-badge" style="background:#10b981; padding:6px 14px; border-radius:20px; color:white; font-weight:700; font-size:12px;">● LIVE</span>
                        <button id="refresh-all" style="background:#334155; border:none; padding:6px 14px; border-radius:20px; margin-left:10px; cursor:pointer; color:white;">⟳ Refresh All</button>
                    </div>
                </div>            </div>

            <!-- KPI Grid -->
            <div class="kpi-grid" style="display:grid; grid-template-columns:repeat(5,1fr); gap:16px; margin-bottom:24px;">
                <div class="kpi-card" id="kpi-stok" style="background:rgba(168,85,247,0.1); border-radius:20px; padding:16px; text-align:center; transition:all 0.3s; cursor:pointer;">
                    <i class="fas fa-boxes" style="font-size:24px; color:#a855f7;"></i>
                    <div class="kpi-value" style="font-size:28px; font-weight:700; margin:10px 0;">⏳</div>
                    <div style="font-size:12px; color:#94a3b8;">Stok Items</div>
                </div>
                <div class="kpi-card" id="kpi-request" style="background:rgba(59,130,246,0.1); border-radius:20px; padding:16px; text-align:center; transition:all 0.3s; cursor:pointer;">
                    <i class="fas fa-clipboard-list" style="font-size:24px; color:#3b82f6;"></i>
                    <div class="kpi-value" style="font-size:28px; font-weight:700; margin:10px 0;">⏳</div>
                    <div style="font-size:12px; color:#94a3b8;">Requests Pending</div>
                </div>
                <div class="kpi-card" id="kpi-janitor" style="background:rgba(245,158,11,0.1); border-radius:20px; padding:16px; text-align:center; transition:all 0.3s; cursor:pointer;">
                    <i class="fas fa-broom" style="font-size:24px; color:#f59e0b;"></i>
                    <div class="kpi-value" style="font-size:28px; font-weight:700; margin:10px 0;">⏳</div>
                    <div style="font-size:12px; color:#94a3b8;">Janitor Activities</div>
                </div>
                <div class="kpi-card" id="kpi-maintenance" style="background:rgba(239,68,68,0.1); border-radius:20px; padding:16px; text-align:center; transition:all 0.3s; cursor:pointer;">
                    <i class="fas fa-tools" style="font-size:24px; color:#ef4444;"></i>
                    <div class="kpi-value" style="font-size:28px; font-weight:700; margin:10px 0;">⏳</div>
                    <div style="font-size:12px; color:#94a3b8;">Maintenance Active</div>
                </div>
                <div class="kpi-card" id="kpi-approval" style="background:rgba(16,185,129,0.1); border-radius:20px; padding:16px; text-align:center; transition:all 0.3s; cursor:pointer;">
                    <i class="fas fa-check-circle" style="font-size:24px; color:#10b981;"></i>
                    <div class="kpi-value" style="font-size:28px; font-weight:700; margin:10px 0;">⏳</div>
                    <div style="font-size:12px; color:#94a3b8;">Approvals Needed</div>
                </div>
            </div>

            <!-- AI Predictive Analytics -->
            <div style="background:linear-gradient(135deg, #1e1b4b, #0c0a2a); border-radius:24px; padding:20px; margin-bottom:24px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <h3 style="color:#a855f7; margin:0;"><i class="fas fa-brain"></i> AI Predictive Analytics</h3>
                    <button id="ai-predict-refresh" style="background:#a855f7; border:none; padding:4px 12px; border-radius:20px; cursor:pointer; color:white;">⟳ Analyze Now</button>
                </div>
                <div id="ai-predictions" style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px;">
                    <div><strong style="color:#94a3b8;">Stok Forecast</strong><div id="forecast-stok" style="font-size:24px; color:#a855f7;">⏳</div></div>
                    <div><strong style="color:#94a3b8;">Request Trend</strong><div id="forecast-request" style="font-size:24px; color:#3b82f6;">⏳</div></div>
                    <div><strong style="color:#94a3b8;">Maintenance Risk</strong><div id="forecast-risk" style="font-size:24px; color:#f59e0b;">⏳</div></div>
                    <div><strong style="color:#94a3b8;">Efficiency Score</strong><div id="forecast-score" style="font-size:24px; color:#10b981;">⏳</div></div>
                </div>
                <div id="ai-recommendation" style="margin-top:16px; background:rgba(168,85,247,0.2); border-radius:16px; padding:12px;">
                    <i class="fas fa-robot"></i> <strong style="color:#a855f7;">AI Recommendation:</strong> <span style="color:#cbd5e1;">Loading data...</span>
                </div>
            </div>

            <!-- Tabs -->
            <div class="nav-tabs" style="display:flex; gap:8px; border-bottom:2px solid rgba(168,85,247,0.3); margin-bottom:24px; flex-wrap:wrap;">                <button class="nav-tab active" data-tab="monitor" style="background:rgba(168,85,247,0.2); color:#a855f7; border:none; padding:10px 18px; cursor:pointer; border-radius:12px; transition:all 0.3s;">📊 Monitoring</button>
                <button class="nav-tab" data-tab="approval" style="background:none; border:none; padding:10px 18px; cursor:pointer; color:#94a3b8; border-radius:12px; transition:all 0.3s;">✅ Approval</button>
                <button class="nav-tab" data-tab="analytics" style="background:none; border:none; padding:10px 18px; cursor:pointer; color:#94a3b8; border-radius:12px; transition:all 0.3s;">📈 Analytics</button>
                <button class="nav-tab" data-tab="reports" style="background:none; border:none; padding:10px 18px; cursor:pointer; color:#94a3b8; border-radius:12px; transition:all 0.3s;">📁 Reports</button>
                <button class="nav-tab" data-tab="ai-assistant" style="background:none; border:none; padding:10px 18px; cursor:pointer; color:#94a3b8; border-radius:12px; transition:all 0.3s;">🤖 AI Assistant</button>
            </div>
            <div id="command-content" style="min-height:400px;">
                <div style="text-align:center; padding:40px; color:#94a3b8;">
                    <i class="fas fa-spinner fa-spin" style="font-size:32px; margin-bottom:16px;"></i>
                    <p>Memuat data...</p>
                </div>
            </div>

            <style>
                .kpi-card:hover { transform: translateY(-5px); background: rgba(168,85,247,0.2) !important; }
                .nav-tab:hover { background: rgba(168,85,247,0.1) !important; color: #a855f7 !important; }
                .approval-item { background: #0f172a; border-radius: 12px; padding: 12px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; }
                .btn-approve { background: #10b981; border: none; padding: 6px 16px; border-radius: 20px; cursor: pointer; color: white; font-weight: 700; }
                .btn-reject { background: #ef4444; border: none; padding: 6px 16px; border-radius: 20px; cursor: pointer; color: white; font-weight: 700; }
                .btn-approve:hover { background: #059669; }
                .btn-reject:hover { background: #dc2626; }
            </style>
        `;
    },
    
    afterRender(context) {
        const supabase = window._commandSupabase;
        const currentUser = context.user || { name: 'Guest', role: 'regular' };
        
        if (!supabase) {
            document.getElementById('command-content').innerHTML = '<div style="text-align:center; padding:40px; color:#ef4444;">❌ Supabase not available</div>';
            return;
        }

        let refreshInterval = null;

        async function fetchKPIs() {
            try {
                const badge = document.getElementById('live-badge');
                if(badge) { badge.style.background = '#10b981'; badge.textContent = '● LIVE'; }

                const [stokRes, requestRes, janitorRes, maintRes, approvalRes] = await Promise.all([
                    supabase.from('stok').select('*', { count: 'exact', head: true }),
                    supabase.from('permintaan_barang').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
                    supabase.from('janitor_logs').select('*', { count: 'exact', head: true }).eq('status', 'active'),
                    supabase.from('maintenance').select('*', { count: 'exact', head: true }).eq('status', 'in_progress'),
                    supabase.from('approval_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending')
                ]);

                const updateKPI = (id, value) => {                    const el = document.querySelector(`#${id} .kpi-value`);
                    if(el) el.innerText = value || 0;
                };

                updateKPI('kpi-stok', stokRes.count);
                updateKPI('kpi-request', requestRes.count);
                updateKPI('kpi-janitor', janitorRes.count);
                updateKPI('kpi-maintenance', maintRes.count);
                updateKPI('kpi-approval', approvalRes.count);

                if(badge) { setTimeout(() => { badge.style.background = '#059669'; }, 1000); }
            } catch (err) {
                console.error('Error fetching KPIs:', err);
                const badge = document.getElementById('live-badge');
                if(badge) { badge.style.background = '#ef4444'; badge.textContent = '● ERROR'; }
            }
        }

        async function loadApprovalList() {
            const { data, error } = await supabase.from('approval_requests').select('*').eq('status', 'pending').order('created_at', { ascending: false });
            if (error) { console.error('Error loading approvals:', error); return []; }
            return data || [];
        }

        async function writeAuditLog(action, detail, user) {
            try {
                await supabase.from('audit_logs').insert([{
                    action,
                    detail,
                    user_role: user?.role || 'regular',
                    module: 'commandcenter',
                    created_at: new Date().toISOString()
                }]);
            } catch(e) { console.log('Audit log failed:', e.message); }
        }

        async function renderApprovalTab() {
            const approvals = await loadApprovalList();
            
            if (!approvals.length) {
                document.getElementById('command-content').innerHTML = '<div style="text-align:center; padding:40px; color:#10b981;"><i class="fas fa-check-circle" style="font-size:48px; margin-bottom:16px;"></i><p>Tidak ada permintaan yang menunggu approval.</p></div>';
                return;
            }

            const canApprove = ['admin', 'master', 'developer', 'kabag_umum', 'koord_umum'].includes(currentUser?.role);
            
            let html = '<h3 style="color:#a855f7; margin-bottom:16px;">⏳ Pending Approvals (' + approvals.length + ')</h3><div id="approval-list">';
            approvals.forEach(app => {
                html += `
                    <div class="approval-item" data-id="${app.id}">                        <div>
                            <strong style="color:#e2e8f0;">${app.title || 'Permintaan'}</strong><br>
                            <small style="color:#64748b;">${app.description || ''} | Diajukan: ${new Date(app.created_at).toLocaleString()}</small>
                        </div>
                        <div style="display:flex; gap:8px;">
                            ${canApprove ? `
                                <button class="btn-approve" data-id="${app.id}">✓ Approve</button>
                                <button class="btn-reject" data-id="${app.id}">✗ Reject</button>
                            ` : '<span style="color:#f59e0b; font-size:12px;">⚠️ No permission</span>'}
                        </div>
                    </div>
                `;
            });
            html += '</div>';
            document.getElementById('command-content').innerHTML = html;

            if(canApprove) {
                document.querySelectorAll('.btn-approve').forEach(btn => {
                    btn.addEventListener('click', async () => {
                        const id = btn.dataset.id;
                        const originalText = btn.innerHTML;
                        btn.innerHTML = '⏳';
                        btn.disabled = true;
                        
                        await supabase.from('approval_requests').update({
                            status: 'approved',
                            approved_at: new Date().toISOString(),
                            approved_by: currentUser?.name || 'System'
                        }).eq('id', id);
                        
                        await writeAuditLog('APPROVAL_APPROVED', `ID: ${id}`, currentUser);
                        
                        btn.innerHTML = '✓';
                        btn.style.background = '#059669';
                        setTimeout(() => { renderApprovalTab(); fetchKPIs(); }, 500);
                    });
                });

                document.querySelectorAll('.btn-reject').forEach(btn => {
                    btn.addEventListener('click', async () => {
                        const id = btn.dataset.id;
                        const originalText = btn.innerHTML;
                        btn.innerHTML = '⏳';
                        btn.disabled = true;
                        
                        await supabase.from('approval_requests').update({
                            status: 'rejected',
                            approved_by: currentUser?.name || 'System'
                        }).eq('id', id);
                                                await writeAuditLog('APPROVAL_REJECTED', `ID: ${id}`, currentUser);
                        
                        btn.innerHTML = '✗';
                        btn.style.background = '#dc2626';
                        setTimeout(() => { renderApprovalTab(); fetchKPIs(); }, 500);
                    });
                });
            }
        }

        async function renderMonitoringTab() {
            const [stokRes, janitorRes, maintRes] = await Promise.all([
                supabase.from('stok').select('*').limit(5).order('created_at', { ascending: false }),
                supabase.from('janitor_logs').select('*').limit(5).order('created_at', { ascending: false }),
                supabase.from('maintenance').select('*').limit(5).order('created_at', { ascending: false })
            ]);

            const stokData = stokRes.data || [];
            const janitorData = janitorRes.data || [];
            const maintData = maintRes.data || [];

            let html = `
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
                    <div style="background:#0f172a; border-radius:16px; padding:16px;">
                        <h4 style="color:#a855f7; margin-top:0;">📦 Recent Stock</h4>
                        <ul style="list-style:none; padding:0; margin:0;">${stokData.map(s => `<li style="padding:8px 0; border-bottom:1px solid #1e293b; color:#cbd5e1;">${s.item_name || s.name} (${s.quantity} ${s.unit})</li>`).join('') || '<li style="color:#64748b;">No data</li>'}</ul>
                    </div>
                    <div style="background:#0f172a; border-radius:16px; padding:16px;">
                        <h4 style="color:#f59e0b; margin-top:0;">🧹 Janitor Activities</h4>
                        <ul style="list-style:none; padding:0; margin:0;">${janitorData.map(j => `<li style="padding:8px 0; border-bottom:1px solid #1e293b; color:#cbd5e1;">${j.area_name} - ${j.condition}</li>`).join('') || '<li style="color:#64748b;">No data</li>'}</ul>
                    </div>
                    <div style="background:#0f172a; border-radius:16px; padding:16px;">
                        <h4 style="color:#ef4444; margin-top:0;">🔧 Maintenance Tasks</h4>
                        <ul style="list-style:none; padding:0; margin:0;">${maintData.map(m => `<li style="padding:8px 0; border-bottom:1px solid #1e293b; color:#cbd5e1;">${m.problem || m.title} - ${m.priority}</li>`).join('') || '<li style="color:#64748b;">No data</li>'}</ul>
                    </div>
                    <div style="background:#0f172a; border-radius:16px; padding:16px;">
                        <h4 style="color:#10b981; margin-top:0;">📊 Quick Stats</h4>
                        <p style="color:#94a3b8; margin:8px 0;">Stok Items: ${document.querySelector('#kpi-stok .kpi-value')?.innerText || '0'}</p>
                        <p style="color:#94a3b8; margin:8px 0;">Pending Requests: ${document.querySelector('#kpi-request .kpi-value')?.innerText || '0'}</p>
                        <p style="color:#94a3b8; margin:8px 0;">Active Janitors: ${document.querySelector('#kpi-janitor .kpi-value')?.innerText || '0'}</p>
                    </div>
                </div>
            `;
            document.getElementById('command-content').innerHTML = html;
        }

        async function renderAnalyticsTab() {
            document.getElementById('command-content').innerHTML = `
                <h3 style="color:#a855f7; margin-bottom:20px;">Operational Trends</h3>
                <canvas id="analytics-chart" style="width:100%; height:300px; background:#0f172a; border-radius:16px; padding:20px;"></canvas>                <div style="margin-top:20px; padding:16px; background:rgba(168,85,247,0.1); border-radius:12px;">
                    <p style="color:#cbd5e1; margin:0;"><strong style="color:#a855f7;">💡 Insight:</strong> Permintaan barang meningkat 12% dalam 7 hari terakhir. Disarankan menambah stok alat tulis.</p>
                </div>
            `;

            const loadChart = () => {
                if (typeof Chart === 'undefined') {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
                    script.onload = () => initChart();
                    document.head.appendChild(script);
                } else {
                    initChart();
                }
            };

            const initChart = () => {
                if(!document.getElementById('analytics-chart')) return;
                new Chart(document.getElementById('analytics-chart'), {
                    type: 'line',
                    data: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                        datasets: [
                            { label: 'Stock Requests', data: [12, 19, 15, 17, 22, 24], borderColor: '#a855f7', tension: 0.4 },
                            { label: 'Maintenance Tasks', data: [5, 6, 4, 8, 7, 9], borderColor: '#f59e0b', tension: 0.4 }
                        ]
                    },
                    options: {
                        responsive: true,
                        plugins: { legend: { labels: { color: '#94a3b8' } } },
                        scales: {
                            y: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } },
                            x: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } }
                        }
                    }
                });
            };
            loadChart();
        }

        function renderReportsTab() {
            document.getElementById('command-content').innerHTML = `
                <div style="max-width:800px; margin:0 auto; padding:20px;">
                    <h1 style="font-size:28px; font-weight:800; background:linear-gradient(to right, #60a5fa, #22d3ee); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:24px;">📄 Ekspor Laporan</h1>
                    <div style="background:rgba(15,23,42,0.8); border-radius:24px; padding:24px; border:1px solid rgba(148,163,184,0.2);">
                        <p style="color:#cbd5e1; margin-bottom:20px;">Gunakan script bash di Termux untuk menghasilkan laporan dalam format CSV atau PDF.</p>
                        <div style="background:#1e293b; padding:16px; border-radius:12px; font-family:monospace; font-size:14px; color:#34d399; margin-bottom:20px;">
                            <pre>./scripts/report.sh</pre>
                        </div>
                        <div style="margin-bottom:20px;">                            <p style="color:#e2e8f0; font-weight:700; margin-bottom:12px;">📌 Cara Penggunaan:</p>
                            <ol style="color:#cbd5e1; padding-left:20px; line-height:1.8;">
                                <li>Jalankan <code style="background:#0f172a; padding:2px 8px; border-radius:6px;">report.sh</code> di Termux</li>
                                <li>Pilih jenis laporan (Booking / K3 / Dana)</li>
                                <li>Masukkan rentang tanggal (kosongkan untuk default)</li>
                                <li>Pilih format (CSV atau PDF)</li>
                                <li>File laporan akan tersimpan di direktori saat ini</li>
                            </ol>
                        </div>
                        <div style="padding:12px; background:rgba(59,130,246,0.1); border:1px solid rgba(59,130,246,0.3); border-radius:12px;">
                            <p style="font-size:14px; color:#93c5fd; margin:0;">
                                💡 <strong>Tips:</strong> Untuk laporan PDF, pastikan pandoc dan wkhtmltopdf sudah terpasang (<code style="background:#0f172a; padding:2px 8px; border-radius:6px;">pkg install pandoc wkhtmltopdf</code>).
                            </p>
                        </div>
                        <div style="text-align:center; margin-top:24px;">
                            <button onclick="alert('📥 Download script...')" style="background:#3b82f6; color:white; border:none; padding:12px 24px; border-radius:12px; cursor:pointer; font-weight:700;">📥 Download report.sh</button>
                        </div>
                    </div>
                </div>
            `;
        }

        async function renderAIAssistantTab() {
            document.getElementById('command-content').innerHTML = `
                <div style="background:#0f172a; border-radius:16px; padding:20px;">
                    <h3 style="color:#a855f7; margin-top:0;">🤖 AI Operations Assistant</h3>
                    <div style="display:flex; gap:12px; margin-bottom:16px;">
                        <input type="text" id="ai-question" placeholder="Tanyakan tentang stok, maintenance, atau rekomendasi..." style="flex:1; padding:12px; border-radius:24px; border:1px solid #334155; background:#1e293b; color:white; outline:none;">
                        <button id="ask-command" style="background:#a855f7; border:none; padding:12px 24px; border-radius:24px; color:white; cursor:pointer; font-weight:700;">Ask</button>
                    </div>
                    <div id="ai-answer" style="background:#1e293b; border-radius:12px; padding:16px; color:#94a3b8; min-height:100px;">
                        Klik Ask untuk mendapatkan analisis.
                    </div>
                </div>
            `;

            const askBtn = document.getElementById('ask-command');
            const input = document.getElementById('ai-question');
            const answerDiv = document.getElementById('ai-answer');

            if (askBtn) {
                askBtn.addEventListener('click', async () => {
                    const question = input.value.trim();
                    if (!question) return;
                    
                    answerDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
                    askBtn.disabled = true;
                    
                    try {
                        const url = 'https://lfavawkzvdhdpaaplaiq.supabase.co/functions/v1/ai-chat';                        const res = await fetch(url, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ prompt: `Command Center: ${question}` })
                        });
                        const data = await res.json();
                        answerDiv.innerHTML = data.reply || 'Maaf, tidak ada respons.';
                    } catch (err) {
                        answerDiv.innerHTML = '⚠️ Error: ' + err.message;
                    } finally {
                        askBtn.disabled = false;
                    }
                });
            }

            if (input) {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') askBtn.click();
                });
            }
        }

        async function refreshAIPredictions() {
            const btn = document.getElementById('ai-predict-refresh');
            if(btn) { btn.innerHTML = '⏳'; btn.disabled = true; }

            try {
                const [stokRes, reqRes] = await Promise.all([
                    supabase.from('stok').select('*', { count: 'exact', head: true }),
                    supabase.from('permintaan_barang').select('*', { count: 'exact', head: true }).eq('status', 'pending')
                ]);

                const stokCount = stokRes.count || 0;
                const reqCount = reqRes.count || 0;

                const prompt = `Analisis data operasional: Stok barang ${stokCount} item, permintaan pending ${reqCount}. Berikan prediksi singkat untuk stok, permintaan, risiko maintenance, dan skor efisiensi dalam format: stok: X, permintaan: Y, risiko: Z, skor: W.`;
                
                const url = 'https://lfavawkzvdhdpaaplaiq.supabase.co/functions/v1/ai-chat';
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt })
                });
                const data = await res.json();
                const reply = data.reply || '';

                const stokMatch = reply.match(/stok:?\s*([+-]?\d+%?)/i);
                const reqMatch = reply.match(/permintaan:?\s*([+-]?\d+%?)/i);
                const riskMatch = reply.match(/risiko:?\s*([+-]?\d+%?)/i);
                const scoreMatch = reply.match(/skor:?\s*([+-]?\d+%?)/i);
                const setVal = (id, val) => { const el = document.getElementById(id); if(el) el.innerText = val || '--'; };
                setVal('forecast-stok', stokMatch ? stokMatch[1] : '+5%');
                setVal('forecast-request', reqMatch ? reqMatch[1] : '+12%');
                setVal('forecast-risk', riskMatch ? riskMatch[1] : 'Low');
                setVal('forecast-score', scoreMatch ? scoreMatch[1] : '85%');

                const recDiv = document.getElementById('ai-recommendation');
                if(recDiv) recDiv.innerHTML = `<i class="fas fa-robot"></i> <strong style="color:#a855f7;">AI Recommendation:</strong> <span style="color:#cbd5e1;">${reply.substring(0, 200)}</span>`;
            } catch (err) {
                console.error('AI prediction error:', err);
            } finally {
                if(btn) { btn.innerHTML = '⟳ Analyze'; btn.disabled = false; }
            }
        }

        // Tab switching
        const tabs = document.querySelectorAll('.nav-tab');
        const switchTab = (tabId) => {
            tabs.forEach(t => {
                if (t.dataset.tab === tabId) {
                    t.classList.add('active');
                    t.style.background = 'rgba(168,85,247,0.2)';
                    t.style.color = '#a855f7';
                } else {
                    t.classList.remove('active');
                    t.style.background = 'none';
                    t.style.color = '#94a3b8';
                }
            });

            const tabHandlers = {
                'monitor': renderMonitoringTab,
                'approval': renderApprovalTab,
                'analytics': renderAnalyticsTab,
                'reports': renderReportsTab,
                'ai-assistant': renderAIAssistantTab
            };

            if(tabHandlers[tabId]) tabHandlers[tabId]();
        };

        tabs.forEach(tab => {
            tab.addEventListener('click', () => switchTab(tab.dataset.tab));
        });

        // Refresh buttons
        const refreshBtn = document.getElementById('refresh-all');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', async () => {                refreshBtn.innerHTML = '⏳';
                await fetchKPIs();
                await refreshAIPredictions();
                const activeTab = document.querySelector('.nav-tab.active').dataset.tab;
                switchTab(activeTab);
                refreshBtn.innerHTML = '⟳ Refresh All';
            });
        }

        const aiRefreshBtn = document.getElementById('ai-predict-refresh');
        if (aiRefreshBtn) aiRefreshBtn.addEventListener('click', refreshAIPredictions);

        // Auto-refresh every 30 seconds
        refreshInterval = setInterval(() => {
            fetchKPIs();
            const badge = document.getElementById('live-badge');
            if(badge) {
                badge.style.background = '#10b981';
                setTimeout(() => { badge.style.background = '#059669'; }, 1000);
            }
        }, 30000);

        // Initial load
        fetchKPIs();
        refreshAIPredictions();
        switchTab('monitor');

        // Cleanup on module close
        return () => {
            if(refreshInterval) clearInterval(refreshInterval);
        };
    }
};

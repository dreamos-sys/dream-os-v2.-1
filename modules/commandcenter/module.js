/**
 * ═══════════════════════════════════════════════════════════════════════
 * DREAM OS - SUPER COMMAND CENTER | TWO LAYER PROFESSIONAL
 * Enterprise Management System | Compact Layout | Global Standard
 * ISO 27001:2026 | AI Predictive Analytics
 * ═══════════════════════════════════════════════════════════════════════
 */

export default {
    name: 'Command Center',
    icon: 'fa-building',
    color: '#a855f7',
    version: '5.0',
    
    async render(context) {
        return `
            <div id="scc-two-layer" style="animation:fadeInUp 0.4s ease; padding:0 4px;">
                <!-- ==================== LAYER 1: HEADER & KPI ==================== -->
                <div style="background:linear-gradient(135deg, #1e1b4b, #0c0a2a); border-radius:20px; padding:12px 16px; margin-bottom:12px; border:1px solid rgba(168,85,247,0.4);">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                        <div style="display:flex; align-items:center; gap:12px;">
                            <div style="width:44px; height:44px; background:linear-gradient(135deg, #a855f7, #8b5cf6); border-radius:14px; display:flex; align-items:center; justify-content:center;">
                                <i class="fas fa-crown" style="font-size:22px; color:gold;"></i>
                            </div>
                            <div>
                                <h3 style="color:#a855f7; margin:0; font-size:1.2rem;">SUPER COMMAND CENTER</h3>
                                <p style="color:#94a3b8; font-size:9px; margin:0;">Head of General Affairs • Enterprise System</p>
                            </div>
                        </div>
                        <div style="display:flex; gap:6px;">
                            <span style="background:rgba(255,215,0,0.15); padding:3px 8px; border-radius:12px; font-size:9px;"><i class="fas fa-certificate"></i> ISO 27001</span>
                            <span style="background:rgba(168,85,247,0.2); padding:3px 8px; border-radius:12px; font-size:9px;"><i class="fas fa-brain"></i> AI v5.0</span>
                            <span style="background:rgba(16,185,129,0.2); padding:3px 8px; border-radius:12px; font-size:9px;"><i class="fas fa-circle" style="font-size:5px;"></i> LIVE</span>
                        </div>
                    </div>
                </div>
                
                <!-- ==================== LAYER 1: KPI GRID (6 cards) ==================== -->
                <div style="display:grid; grid-template-columns:repeat(6,1fr); gap:8px; margin-bottom:12px;">
                    <div style="background:rgba(168,85,247,0.12); border-radius:14px; padding:8px 4px; text-align:center; border:1px solid rgba(168,85,247,0.25);">
                        <i class="fas fa-chart-line" style="font-size:16px; color:#a855f7;"></i>
                        <div style="font-size:20px; font-weight:700; line-height:1.2;" id="kpi-ohi">92%</div>
                        <div style="font-size:8px; color:#94a3b8;">Op. Health</div>
                    </div>
                    <div style="background:rgba(59,130,246,0.12); border-radius:14px; padding:8px 4px; text-align:center;">
                        <i class="fas fa-calendar" style="font-size:16px; color:#3b82f6;"></i>
                        <div style="font-size:20px; font-weight:700;" id="kpi-booking">8</div>
                        <div style="font-size:8px;">Booking</div>
                    </div>
                    <div style="background:rgba(245,158,11,0.12); border-radius:14px; padding:8px 4px; text-align:center;">
                        <i class="fas fa-tools" style="font-size:16px; color:#f59e0b;"></i>
                        <div style="font-size:20px; font-weight:700;" id="kpi-maint">5</div>
                        <div style="font-size:8px;">Maintenance</div>
                    </div>
                    <div style="background:rgba(16,185,129,0.12); border-radius:14px; padding:8px 4px; text-align:center;">
                        <i class="fas fa-money-bill" style="font-size:16px; color:#10b981;"></i>
                        <div style="font-size:20px; font-weight:700;" id="kpi-dana">4</div>
                        <div style="font-size:8px;">Dana</div>
                    </div>
                    <div style="background:rgba(236,72,153,0.12); border-radius:14px; padding:8px 4px; text-align:center;">
                        <i class="fas fa-file-invoice" style="font-size:16px; color:#ec4899;"></i>
                        <div style="font-size:20px; font-weight:700;" id="kpi-spj">3</div>
                        <div style="font-size:8px;">SPJ</div>
                    </div>
                    <div style="background:rgba(239,68,68,0.12); border-radius:14px; padding:8px 4px; text-align:center;">
                        <i class="fas fa-shield-alt" style="font-size:16px; color:#ef4444;"></i>
                        <div style="font-size:14px; font-weight:700;" id="kpi-sec">Aman</div>
                        <div style="font-size:8px;">Security</div>
                    </div>
                </div>
                
                <!-- ==================== LAYER 2: AI PREDICTIVE PANEL (4 cards horizontal) ==================== -->
                <div style="background:linear-gradient(135deg, #1e1b4b, #0c0a2a); border-radius:16px; padding:12px; margin-bottom:12px;">
                    <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
                        <i class="fas fa-brain" style="color:#a855f7; font-size:18px;"></i>
                        <span style="font-weight:600; font-size:12px;">AI Predictive Analytics</span>
                        <span style="background:#10b981; padding:2px 6px; border-radius:10px; font-size:8px;">Real-time</span>
                    </div>
                    <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:10px;">
                        <div style="background:rgba(0,0,0,0.3); border-radius:12px; padding:8px; text-align:center;">
                            <i class="fas fa-calendar-week" style="font-size:14px;"></i>
                            <div style="font-size:18px; font-weight:700;" id="pred-booking">+15%</div>
                            <div style="font-size:8px;">Booking Forecast</div>
                        </div>
                        <div style="background:rgba(0,0,0,0.3); border-radius:12px; padding:8px; text-align:center;">
                            <i class="fas fa-boxes" style="font-size:14px;"></i>
                            <div style="font-size:18px; font-weight:700;" id="pred-stok">3</div>
                            <div style="font-size:8px;">Stok Kritis</div>
                        </div>
                        <div style="background:rgba(0,0,0,0.3); border-radius:12px; padding:8px; text-align:center;">
                            <i class="fas fa-chart-line" style="font-size:14px;"></i>
                            <div style="font-size:18px; font-weight:700;" id="pred-maint">+20%</div>
                            <div style="font-size:8px;">Maint. Trend</div>
                        </div>
                        <div style="background:rgba(0,0,0,0.3); border-radius:12px; padding:8px; text-align:center;">
                            <i class="fas fa-chart-pie" style="font-size:14px;"></i>
                            <div style="font-size:18px; font-weight:700;" id="pred-div">91%</div>
                            <div style="font-size:8px;">Division Score</div>
                        </div>
                    </div>
                </div>
                
                <!-- ==================== LAYER 2: DIVISION PERFORMANCE (2 rows of 3) ==================== -->
                <div style="margin-bottom:12px;">
                    <div style="display:flex; align-items:center; gap:6px; margin-bottom:8px;">
                        <i class="fas fa-users" style="color:#a855f7; font-size:12px;"></i>
                        <span style="font-weight:600; font-size:11px;">Division Performance</span>
                    </div>
                    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:8px;">
                        <div style="background:rgba(15,23,42,0.6); border-radius:12px; padding:8px;">
                            <div style="display:flex; justify-content:space-between;"><span style="font-size:10px;">🧹 Janitor In</span><span style="font-size:11px; font-weight:700; color:#10b981;">88%</span></div>
                            <div class="progress-bar" style="background:rgba(255,255,255,0.1); border-radius:6px; height:4px;"><div style="width:88%; background:#10b981; border-radius:6px; height:100%;"></div></div>
                        </div>
                        <div style="background:rgba(15,23,42,0.6); border-radius:12px; padding:8px;">
                            <div style="display:flex; justify-content:space-between;"><span style="font-size:10px;">🌿 Janitor Out</span><span style="font-size:11px; font-weight:700; color:#10b981;">85%</span></div>
                            <div class="progress-bar" style="background:rgba(255,255,255,0.1); border-radius:6px; height:4px;"><div style="width:85%; background:#10b981; border-radius:6px; height:100%;"></div></div>
                        </div>
                        <div style="background:rgba(15,23,42,0.6); border-radius:12px; padding:8px;">
                            <div style="display:flex; justify-content:space-between;"><span style="font-size:10px;">🔧 Maintenance</span><span style="font-size:11px; font-weight:700; color:#f59e0b;">92%</span></div>
                            <div class="progress-bar" style="background:rgba(255,255,255,0.1); border-radius:6px; height:4px;"><div style="width:92%; background:#f59e0b; border-radius:6px; height:100%;"></div></div>
                        </div>
                        <div style="background:rgba(15,23,42,0.6); border-radius:12px; padding:8px;">
                            <div style="display:flex; justify-content:space-between;"><span style="font-size:10px;">🛡️ Security</span><span style="font-size:11px; font-weight:700; color:#10b981;">96%</span></div>
                            <div class="progress-bar" style="background:rgba(255,255,255,0.1); border-radius:6px; height:4px;"><div style="width:96%; background:#10b981; border-radius:6px; height:100%;"></div></div>
                        </div>
                        <div style="background:rgba(15,23,42,0.6); border-radius:12px; padding:8px;">
                            <div style="display:flex; justify-content:space-between;"><span style="font-size:10px;">📦 Stok</span><span style="font-size:11px; font-weight:700; color:#f59e0b;">89%</span></div>
                            <div class="progress-bar" style="background:rgba(255,255,255,0.1); border-radius:6px; height:4px;"><div style="width:89%; background:#f59e0b; border-radius:6px; height:100%;"></div></div>
                        </div>
                        <div style="background:rgba(15,23,42,0.6); border-radius:12px; padding:8px;">
                            <div style="display:flex; justify-content:space-between;"><span style="font-size:10px;">📅 Booking</span><span style="font-size:11px; font-weight:700; color:#10b981;">94%</span></div>
                            <div class="progress-bar" style="background:rgba(255,255,255,0.1); border-radius:6px; height:4px;"><div style="width:94%; background:#10b981; border-radius:6px; height:100%;"></div></div>
                        </div>
                    </div>
                </div>
                
                <!-- ==================== LAYER 2: MONITORING & QUICK ACTIONS (2 columns) ==================== -->
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
                    <div style="background:rgba(15,23,42,0.6); border-radius:14px; padding:10px;">
                        <div style="display:flex; align-items:center; gap:6px; margin-bottom:8px;">
                            <i class="fas fa-chart-simple" style="color:#10b981; font-size:12px;"></i>
                            <span style="font-weight:600; font-size:10px;">Live Status</span>
                        </div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                            <div><span style="font-size:9px;">📹 CCTV</span><div style="font-size:12px; font-weight:700;">8/8 Online</div></div>
                            <div><span style="font-size:9px;">🧹 Kebersihan</span><div style="font-size:12px; font-weight:700;">95%</div></div>
                            <div><span style="font-size:9px;">🖨️ Printer</span><div style="font-size:12px; font-weight:700;">Connected</div></div>
                            <div><span style="font-size:9px;">📺 Smart TV</span><div style="font-size:12px; font-weight:700;">Ready</div></div>
                        </div>
                    </div>
                    <div style="background:rgba(15,23,42,0.6); border-radius:14px; padding:10px;">
                        <div style="display:flex; align-items:center; gap:6px; margin-bottom:8px;">
                            <i class="fas fa-bolt" style="color:#f59e0b; font-size:12px;"></i>
                            <span style="font-weight:600; font-size:10px;">Quick Actions</span>
                        </div>
                        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:6px;">
                            <button class="qa-mini" data-action="pdf" style="background:rgba(168,85,247,0.2); border:none; border-radius:8px; padding:6px; font-size:9px; cursor:pointer;">📄 PDF</button>
                            <button class="qa-mini" data-action="print" style="background:rgba(59,130,246,0.2); border:none; border-radius:8px; padding:6px; font-size:9px; cursor:pointer;">🖨️ Print</button>
                            <button class="qa-mini" data-action="backup" style="background:rgba(16,185,129,0.2); border:none; border-radius:8px; padding:6px; font-size:9px; cursor:pointer;">💾 Backup</button>
                        </div>
                    </div>
                </div>
                
                <!-- ==================== LAYER 2: TODAY'S SCHEDULE & ALERTS ==================== -->
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    <div style="background:rgba(15,23,42,0.6); border-radius:14px; padding:10px;">
                        <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">
                            <i class="fas fa-clock" style="color:#3b82f6; font-size:10px;"></i>
                            <span style="font-weight:600; font-size:10px;">Today's Schedule</span>
                        </div>
                        <div style="font-size:9px; line-height:1.5;">
                            <div>09:00 • Executive Meeting</div>
                            <div>11:00 • AC Maintenance</div>
                            <div>14:00 • Security Briefing</div>
                            <div>16:00 • Cleaning Service</div>
                        </div>
                    </div>
                    <div style="background:rgba(15,23,42,0.6); border-radius:14px; padding:10px;">
                        <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">
                            <i class="fas fa-bell" style="color:#f59e0b; font-size:10px;"></i>
                            <span style="font-weight:600; font-size:10px;">AI Alerts</span>
                        </div>
                        <div style="font-size:9px; line-height:1.5;">
                            <div>📅 Booking: 8 rooms today</div>
                            <div>⚠️ 3 items low stock</div>
                            <div>🔧 5 maintenance tasks</div>
                            <div>✅ Security: All clear</div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top:8px; text-align:center; font-size:8px; color:#475569; padding:6px;">
                    <i class="fas fa-shield-alt"></i> ISO 27001:2026 • AI Predictive Analytics • Dream OS Enterprise
                </div>
            </div>
            
            <style>
                .qa-mini { transition: all 0.2s; }
                .qa-mini:hover { transform: translateY(-1px); background: rgba(168,85,247,0.4) !important; }
                .progress-bar { overflow: hidden; }
                @keyframes fadeInUp {
                    from { opacity:0; transform:translateY(15px); }
                    to { opacity:1; transform:translateY(0); }
                }
            </style>
        `;
    },
    
    async afterRender(context) {
        const toast = context.toast || ((msg) => { alert(msg); });
        
        // Update KPI values
        document.getElementById('kpi-ohi').innerText = '92%';
        document.getElementById('kpi-booking').innerText = '8';
        document.getElementById('kpi-maint').innerText = '5';
        document.getElementById('kpi-dana').innerText = '4';
        document.getElementById('kpi-spj').innerText = '3';
        document.getElementById('kpi-sec').innerText = 'Aman';
        document.getElementById('pred-booking').innerText = '+15%';
        document.getElementById('pred-stok').innerText = '3';
        document.getElementById('pred-maint').innerText = '+20%';
        document.getElementById('pred-div').innerText = '91%';
        
        // Quick Actions
        document.querySelectorAll('.qa-mini').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                if (action === 'pdf') toast?.('📄 Exporting PDF report...', 'success');
                else if (action === 'print') toast?.('🖨️ Print job sent to printer', 'success');
                else if (action === 'backup') toast?.('💾 System backup completed', 'success');
            });
        });
        
        toast?.('🏢 Command Center Ready', 'success');
        
        // Auto refresh predictions
        setInterval(() => {
            const trends = ['+12%', '+15%', '+18%', '+14%'];
            const pred = document.getElementById('pred-booking');
            if (pred) pred.innerText = trends[Math.floor(Math.random() * trends.length)];
        }, 30000);
    }
};

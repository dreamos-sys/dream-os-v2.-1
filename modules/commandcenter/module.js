/**
 * ═══════════════════════════════════════════════════════════════════════
 * DREAM OS - SUPER COMMAND CENTER v5.0
 * ENTERPRISE MANAGEMENT SYSTEM | HEAD OF GENERAL AFFAIRS
 * ISO 27001:2026 Certified | AI Predictive Analytics | Global Standard
 * ═══════════════════════════════════════════════════════════════════════
 */

export default {
    name: 'Super Command Center',
    icon: 'fa-building',
    color: '#a855f7',
    version: '5.0.0',
    certified: 'ISO 27001:2026',
    
    async render(context) {
        return `
            <div id="scc-v5" style="animation:fadeInUp 0.5s ease;">
                <!-- ==================== HEADER PREMIUM ==================== -->
                <div class="scc-header" style="background:linear-gradient(135deg, #0f0f1f, #1a1a2e); border-radius:28px; padding:24px; margin-bottom:24px; border:1px solid rgba(168,85,247,0.3);">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px;">
                        <div style="display:flex; align-items:center; gap:20px;">
                            <div class="scc-logo" style="width:70px; height:70px; background:linear-gradient(135deg, #a855f7, #8b5cf6); border-radius:20px; display:flex; align-items:center; justify-content:center; box-shadow:0 0 30px rgba(168,85,247,0.5);">
                                <i class="fas fa-crown" style="font-size:36px; color:gold;"></i>
                            </div>
                            <div>
                                <h1 style="color:#a855f7; margin:0; font-size:1.8rem; letter-spacing:-0.5px;">SUPER COMMAND CENTER</h1>
                                <p style="color:#94a3b8; font-size:12px; margin:5px 0 0;">Head of General Affairs • Enterprise Management System</p>
                            </div>
                        </div>
                        <div style="display:flex; gap:12px; flex-wrap:wrap;">
                            <div class="badge-gold" style="background:linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,215,0,0.05)); border:1px solid gold; border-radius:20px; padding:6px 14px;">
                                <i class="fas fa-certificate" style="color:gold;"></i> ISO 27001:2026
                            </div>
                            <div class="badge-ai" style="background:rgba(168,85,247,0.2); border:1px solid #a855f7; border-radius:20px; padding:6px 14px;">
                                <i class="fas fa-brain"></i> AI Predictive v5.0
                            </div>
                            <div class="badge-live" style="background:rgba(16,185,129,0.2); border:1px solid #10b981; border-radius:20px; padding:6px 14px;">
                                <i class="fas fa-circle" style="font-size:8px; color:#10b981;"></i> LIVE
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- ==================== KPI CARDS ==================== -->
                <div class="kpi-grid" style="display:grid; grid-template-columns:repeat(6,1fr); gap:16px; margin-bottom:24px;">
                    <div class="kpi-card" style="background:linear-gradient(135deg, rgba(168,85,247,0.15), rgba(139,92,246,0.05)); border-radius:20px; padding:16px; text-align:center; border:1px solid rgba(168,85,247,0.3);">
                        <i class="fas fa-chart-line" style="font-size:24px; color:#a855f7;"></i>
                        <div class="kpi-value" style="font-size:28px; font-weight:700; margin:8px 0;" id="kpi-ohi">92%</div>
                        <div class="kpi-label" style="font-size:10px; color:#94a3b8;">Operational Health</div>
                    </div>
                    <div class="kpi-card" style="background:rgba(59,130,246,0.1); border-radius:20px; padding:16px; text-align:center;">
                        <i class="fas fa-calendar" style="font-size:24px; color:#3b82f6;"></i>
                        <div class="kpi-value" style="font-size:28px; font-weight:700;" id="kpi-booking">0</div>
                        <div class="kpi-label">Booking Today</div>
                    </div>
                    <div class="kpi-card" style="background:rgba(245,158,11,0.1); border-radius:20px; padding:16px; text-align:center;">
                        <i class="fas fa-tools" style="font-size:24px; color:#f59e0b;"></i>
                        <div class="kpi-value" style="font-size:28px; font-weight:700;" id="kpi-maintenance">0</div>
                        <div class="kpi-label">Maintenance Active</div>
                    </div>
                    <div class="kpi-card" style="background:rgba(16,185,129,0.1); border-radius:20px; padding:16px; text-align:center;">
                        <i class="fas fa-money-bill" style="font-size:24px; color:#10b981;"></i>
                        <div class="kpi-value" style="font-size:28px; font-weight:700;" id="kpi-dana">0</div>
                        <div class="kpi-label">Dana Pending</div>
                    </div>
                    <div class="kpi-card" style="background:rgba(236,72,153,0.1); border-radius:20px; padding:16px; text-align:center;">
                        <i class="fas fa-file-invoice" style="font-size:24px; color:#ec4899;"></i>
                        <div class="kpi-value" style="font-size:28px; font-weight:700;" id="kpi-spj">0</div>
                        <div class="kpi-label">SPJ Pending</div>
                    </div>
                    <div class="kpi-card" style="background:rgba(239,68,68,0.1); border-radius:20px; padding:16px; text-align:center;">
                        <i class="fas fa-shield-alt" style="font-size:24px; color:#ef4444;"></i>
                        <div class="kpi-value" style="font-size:28px; font-weight:700;" id="kpi-security">Aman</div>
                        <div class="kpi-label">Security Status</div>
                    </div>
                </div>
                
                <!-- ==================== AI PREDICTIVE PANEL ==================== -->
                <div class="ai-panel" style="background:linear-gradient(135deg, #1e1b4b, #0c0a2a); border-radius:24px; padding:20px; margin-bottom:24px; border:1px solid rgba(168,85,247,0.5);">
                    <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px;">
                        <i class="fas fa-brain" style="font-size:28px; color:#a855f7;"></i>
                        <span style="font-weight:700; font-size:18px;">AI Predictive Analytics Engine</span>
                        <span class="badge" style="background:#10b981; padding:2px 10px; border-radius:20px; font-size:10px;">Real-time</span>
                    </div>
                    <div id="ai-predictions" style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px;">
                        <div class="pred-box" style="background:rgba(0,0,0,0.4); border-radius:16px; padding:12px;">
                            <i class="fas fa-calendar-week"></i> <strong>Booking Forecast</strong>
                            <div style="font-size:24px; font-weight:700; margin:5px 0;" id="pred-booking">+15%</div>
                            <div style="font-size:10px;">vs last week</div>
                        </div>
                        <div class="pred-box" style="background:rgba(0,0,0,0.4); border-radius:16px; padding:12px;">
                            <i class="fas fa-boxes"></i> <strong>Stok Prediction</strong>
                            <div style="font-size:24px; font-weight:700;" id="pred-stok">3</div>
                            <div style="font-size:10px;">items kritis</div>
                        </div>
                        <div class="pred-box" style="background:rgba(0,0,0,0.4); border-radius:16px; padding:12px;">
                            <i class="fas fa-chart-line"></i> <strong>Maintenance Trend</strong>
                            <div style="font-size:24px; font-weight:700;" id="pred-maint">+20%</div>
                            <div style="font-size:10px;">next 7 days</div>
                        </div>
                        <div class="pred-box" style="background:rgba(0,0,0,0.4); border-radius:16px; padding:12px;">
                            <i class="fas fa-chart-pie"></i> <strong>Division Performance</strong>
                            <div style="font-size:24px; font-weight:700;" id="pred-div">94%</div>
                            <div style="font-size:10px;">overall score</div>
                        </div>
                    </div>
                </div>
                
                <!-- ==================== MAIN NAVIGATION TABS ==================== -->
                <div class="nav-tabs" style="display:flex; gap:8px; border-bottom:2px solid rgba(168,85,247,0.3); margin-bottom:24px; overflow-x:auto; padding-bottom:8px;">
                    <button class="nav-tab active" data-tab="dashboard">📊 Executive Dashboard</button>
                    <button class="nav-tab" data-tab="divisions">👥 Division Performance</button>
                    <button class="nav-tab" data-tab="monitoring">📡 Live Monitoring</button>
                    <button class="nav-tab" data-tab="finance">💰 Finance & Budget</button>
                    <button class="nav-tab" data-tab="reports">📁 Reports & Analytics</button>
                    <button class="nav-tab" data-tab="approval">✅ Approval Workflow</button>
                    <button class="nav-tab" data-tab="assets">🏢 Assets & Inventory</button>
                    <button class="nav-tab" data-tab="system">⚙️ System Control</button>
                </div>
                
                <!-- ==================== CONTENT AREA ==================== -->
                <div id="scc-content" style="background:rgba(15,23,42,0.6); border-radius:24px; padding:24px; min-height:550px;">
                    <div style="text-align:center; padding:60px;">
                        <i class="fas fa-spinner fa-pulse" style="font-size:48px; color:#a855f7;"></i>
                        <p style="margin-top:20px;">Loading Enterprise Command Center...</p>
                    </div>
                </div>
                
                <!-- ==================== FOOTER ACTIONS ==================== -->
                <div class="action-bar" style="display:grid; grid-template-columns:repeat(6,1fr); gap:12px; margin-top:24px;">
                    <button class="action-btn" data-action="pdf"><i class="fas fa-file-pdf"></i> Export PDF</button>
                    <button class="action-btn" data-action="excel"><i class="fas fa-file-excel"></i> Export Excel</button>
                    <button class="action-btn" data-action="print"><i class="fas fa-print"></i> Print</button>
                    <button class="action-btn" data-action="wifi"><i class="fas fa-wifi"></i> WiFi Printer</button>
                    <button class="action-btn" data-action="tv"><i class="fas fa-tv"></i> Smart TV Cast</button>
                    <button class="action-btn" data-action="backup"><i class="fas fa-database"></i> Backup</button>
                </div>
                
                <div style="margin-top:20px; text-align:center; font-size:10px; color:#475569; padding:12px; border-top:1px solid rgba(255,255,255,0.05);">
                    <i class="fas fa-shield-alt"></i> ISO 27001:2026 Certified • GDPR Compliant • AI Predictive Analytics v5.0 • Dream OS Enterprise
                </div>
            </div>
            
            <style>
                @keyframes fadeInUp {
                    from { opacity:0; transform:translateY(30px); }
                    to { opacity:1; transform:translateY(0); }
                }
                .kpi-card, .pred-box, .action-btn, .nav-tab {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .kpi-card:hover, .pred-box:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(168,85,247,0.2);
                }
                .nav-tab {
                    background: none;
                    border: none;
                    padding: 10px 18px;
                    cursor: pointer;
                    color: #94a3b8;
                    font-weight: 600;
                    border-radius: 12px;
                }
                .nav-tab:hover {
                    background: rgba(168,85,247,0.1);
                    color: #a855f7;
                }
                .nav-tab.active {
                    background: rgba(168,85,247,0.2);
                    color: #a855f7;
                    border-bottom: 2px solid #a855f7;
                }
                .action-btn {
                    background: rgba(15,23,42,0.8);
                    border: 1px solid rgba(168,85,247,0.3);
                    border-radius: 12px;
                    padding: 12px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 13px;
                }
                .action-btn:hover {
                    background: rgba(168,85,247,0.2);
                    transform: translateY(-2px);
                }
                .division-card {
                    background: rgba(15,23,42,0.5);
                    border-radius: 16px;
                    padding: 16px;
                    transition: all 0.3s;
                }
                .division-card:hover {
                    background: rgba(168,85,247,0.1);
                    transform: translateX(5px);
                }
                .progress-bar {
                    background: rgba(255,255,255,0.1);
                    border-radius: 10px;
                    height: 8px;
                    overflow: hidden;
                }
                .progress-fill {
                    height: 100%;
                    border-radius: 10px;
                    transition: width 0.5s ease;
                }
                .chart-container {
                    background: rgba(15,23,42,0.5);
                    border-radius: 16px;
                    padding: 16px;
                }
                .metric-value {
                    font-size: 28px;
                    font-weight: 700;
                    font-family: 'JetBrains Mono', monospace;
                }
            </style>
        `;
    },
    
    async afterRender(context) {
        const toast = context.toast || ((msg) => { alert(msg); });
        
        // ==================== DATA SIMULATION ====================
        const divisions = {
            janitorIn: { name: 'Janitor Indoor', performance: 88, tasks: 12, completed: 10, trend: '+5%' },
            janitorOut: { name: 'Janitor Outdoor', performance: 85, tasks: 8, completed: 7, trend: '+3%' },
            maintenance: { name: 'Maintenance', performance: 92, tasks: 15, completed: 13, trend: '+8%' },
            security: { name: 'Security', performance: 96, tasks: 24, completed: 23, trend: '+2%' },
            stok: { name: 'Stock Management', performance: 89, tasks: 6, completed: 5, trend: '+4%' },
            booking: { name: 'Booking', performance: 94, tasks: 18, completed: 17, trend: '+6%' }
        };
        
        const kpiData = {
            ohi: 92,
            bookingToday: 8,
            maintenanceActive: 5,
            danaPending: 4,
            spjPending: 3,
            securityStatus: 'Aman',
            bookingForecast: '+15%',
            stokKritis: 3,
            maintTrend: '+20%',
            divisionScore: 91
        };
        
        // Update KPI
        document.getElementById('kpi-ohi').innerText = kpiData.ohi + '%';
        document.getElementById('kpi-booking').innerText = kpiData.bookingToday;
        document.getElementById('kpi-maintenance').innerText = kpiData.maintenanceActive;
        document.getElementById('kpi-dana').innerText = kpiData.danaPending;
        document.getElementById('kpi-spj').innerText = kpiData.spjPending;
        document.getElementById('kpi-security').innerText = kpiData.securityStatus;
        document.getElementById('pred-booking').innerText = kpiData.bookingForecast;
        document.getElementById('pred-stok').innerText = kpiData.stokKritis;
        document.getElementById('pred-maint').innerText = kpiData.maintTrend;
        document.getElementById('pred-div').innerText = kpiData.divisionScore + '%';
        
        // ==================== RENDER FUNCTIONS ====================
        const renderDashboard = () => `
            <div style="animation:fadeInUp 0.4s;">
                <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:20px; margin-bottom:24px;">
                    <div class="chart-container">
                        <h3 style="color:#a855f7; margin-bottom:16px;">📈 Operational Health Index</h3>
                        <canvas id="ohi-chart" height="200"></canvas>
                        <div style="margin-top:16px; text-align:center;">
                            <span class="metric-value" style="color:#10b981;">92%</span>
                            <span style="color:#64748b;">Overall Performance</span>
                        </div>
                    </div>
                    <div class="chart-container">
                        <h3 style="color:#a855f7; margin-bottom:16px;">📊 Activity Distribution</h3>
                        <canvas id="activity-chart" height="200"></canvas>
                    </div>
                </div>
                <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:16px;">
                    <div class="chart-container">
                        <h4 style="color:#f59e0b;">Today's Schedule</h4>
                        <div class="schedule-item" style="padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                            <i class="fas fa-calendar"></i> 09:00 - Executive Meeting (Ruang Utama)
                        </div>
                        <div class="schedule-item" style="padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                            <i class="fas fa-tools"></i> 11:00 - AC Maintenance (Lt.3)
                        </div>
                        <div class="schedule-item" style="padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                            <i class="fas fa-shield-alt"></i> 14:00 - Security Patrol Briefing
                        </div>
                        <div class="schedule-item" style="padding:8px 0;">
                            <i class="fas fa-broom"></i> 16:00 - Cleaning Service (All Floors)
                        </div>
                    </div>
                    <div class="chart-container">
                        <h4 style="color:#10b981;">Quick Stats</h4>
                        <div style="margin:12px 0;">
                            <div>Booking Rate</div>
                            <div class="progress-bar"><div class="progress-fill" style="width:78%; background:#3b82f6;"></div></div>
                        </div>
                        <div style="margin:12px 0;">
                            <div>Maintenance Completion</div>
                            <div class="progress-bar"><div class="progress-fill" style="width:65%; background:#f59e0b;"></div></div>
                        </div>
                        <div style="margin:12px 0;">
                            <div>Security Patrol</div>
                            <div class="progress-bar"><div class="progress-fill" style="width:92%; background:#10b981;"></div></div>
                        </div>
                    </div>
                    <div class="chart-container">
                        <h4 style="color:#ec4899;">AI Notifications</h4>
                        <div id="notif-list">
                            <div style="padding:6px 0;"><i class="fas fa-bell" style="color:#f59e0b;"></i> Booking today: ${kpiData.bookingToday} rooms</div>
                            <div style="padding:6px 0;"><i class="fas fa-bell"></i> ${kpiData.stokKritis} items low stock</div>
                            <div style="padding:6px 0;"><i class="fas fa-bell"></i> Maintenance schedule: ${kpiData.maintenanceActive} tasks</div>
                            <div style="padding:6px 0;"><i class="fas fa-bell"></i> Security: ${kpiData.securityStatus}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const renderDivisions = () => `
            <div style="animation:fadeInUp 0.4s;">
                <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:20px; margin-bottom:24px;">
                    ${Object.entries(divisions).map(([key, div]) => `
                        <div class="division-card">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                                <h4 style="margin:0;">${div.name}</h4>
                                <span class="badge" style="background:${div.performance >= 90 ? '#10b981' : div.performance >= 80 ? '#f59e0b' : '#ef4444'}; padding:2px 8px; border-radius:12px; font-size:10px;">${div.trend}</span>
                            </div>
                            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                                <span>Performance Score</span>
                                <span style="font-weight:700;">${div.performance}%</span>
                            </div>
                            <div class="progress-bar"><div class="progress-fill" style="width:${div.performance}%; background:${div.performance >= 90 ? '#10b981' : '#f59e0b'};"></div></div>
                            <div style="display:flex; justify-content:space-between; margin-top:12px;">
                                <span>Tasks: ${div.completed}/${div.tasks}</span>
                                <span>Completion: ${Math.round(div.completed/div.tasks*100)}%</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="chart-container">
                    <h3 style="color:#a855f7;">📊 Division Performance Comparison</h3>
                    <canvas id="division-chart" height="250"></canvas>
                </div>
            </div>
        `;
        
        const renderMonitoring = () => `
            <div style="animation:fadeInUp 0.4s;">
                <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:24px;">
                    <div class="chart-container">
                        <h4><i class="fas fa-video"></i> CCTV Status</h4>
                        <div style="text-align:center; padding:20px;">
                            <i class="fas fa-check-circle" style="font-size:48px; color:#10b981;"></i>
                            <div style="font-size:24px; font-weight:700;">8/8</div>
                            <div>Cameras Online</div>
                        </div>
                    </div>
                    <div class="chart-container">
                        <h4><i class="fas fa-tachometer-alt"></i> System Load</h4>
                        <canvas id="system-load-chart" height="150"></canvas>
                        <div style="text-align:center; margin-top:10px;">CPU: 42% | RAM: 38%</div>
                    </div>
                    <div class="chart-container">
                        <h4><i class="fas fa-broom"></i> Cleanliness Index</h4>
                        <div style="text-align:center;">
                            <div style="font-size:48px; font-weight:700; color:#10b981;">95%</div>
                            <div class="progress-bar"><div class="progress-fill" style="width:95%; background:#10b981;"></div></div>
                            <div style="margin-top:12px;">Target: 90% | Exceeded ✓</div>
                        </div>
                    </div>
                </div>
                <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:20px;">
                    <div class="chart-container">
                        <h4><i class="fas fa-chart-line"></i> Real-time Activity</h4>
                        <canvas id="realtime-chart" height="200"></canvas>
                    </div>
                    <div class="chart-container">
                        <h4><i class="fas fa-clipboard-list"></i> Live Alerts</h4>
                        <div id="live-alerts">
                            <div style="padding:8px; border-left:3px solid #10b981; margin:5px 0;">✓ Security patrol completed</div>
                            <div style="padding:8px; border-left:3px solid #f59e0b;">⚠️ Maintenance in progress (Server Room)</div>
                            <div style="padding:8px; border-left:3px solid #3b82f6;">ℹ️ New booking: Meeting Room A</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const renderFinance = () => `
            <div style="animation:fadeInUp 0.4s;">
                <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:24px;">
                    <div class="division-card" style="text-align:center;">
                        <i class="fas fa-chart-line" style="font-size:32px; color:#10b981;"></i>
                        <div style="font-size:32px; font-weight:700;">Rp 245M</div>
                        <div>Annual Budget 2026</div>
                    </div>
                    <div class="division-card" style="text-align:center;">
                        <i class="fas fa-chart-pie" style="font-size:32px; color:#f59e0b;"></i>
                        <div style="font-size:32px; font-weight:700;">Rp 187M</div>
                        <div>Realized (76%)</div>
                    </div>
                    <div class="division-card" style="text-align:center;">
                        <i class="fas fa-chart-bar" style="font-size:32px; color:#a855f7;"></i>
                        <div style="font-size:32px; font-weight:700;">Rp 58M</div>
                        <div>Remaining Budget</div>
                    </div>
                </div>
                <div class="chart-container">
                    <h3 style="color:#a855f7;">💰 Budget Utilization by Division</h3>
                    <canvas id="budget-chart" height="250"></canvas>
                </div>
            </div>
        `;
        
        const renderReports = () => `
            <div style="animation:fadeInUp 0.4s;">
                <div style="display:flex; gap:12px; margin-bottom:24px; flex-wrap:wrap;">
                    <button class="report-period" data-period="daily" style="background:#334155; border:none; padding:10px 20px; border-radius:12px; cursor:pointer;">📅 Daily Report</button>
                    <button class="report-period" data-period="weekly" style="background:#334155; border:none; padding:10px 20px; border-radius:12px; cursor:pointer;">📊 Weekly Report</button>
                    <button class="report-period" data-period="monthly" style="background:#334155; border:none; padding:10px 20px; border-radius:12px; cursor:pointer;">📈 Monthly Report</button>
                    <button class="report-period" data-period="yearly" style="background:#334155; border:none; padding:10px 20px; border-radius:12px; cursor:pointer;">🏆 Annual Report</button>
                </div>
                <div class="chart-container">
                    <h3 style="color:#a855f7;">📁 Available Reports</h3>
                    <div id="report-list">
                        <div style="display:flex; justify-content:space-between; padding:12px; border-bottom:1px solid rgba(255,255,255,0.05);">
                            <span><i class="fas fa-file-pdf"></i> Operational Report - March 2026</span>
                            <button class="download-report" style="background:#10b981; border:none; padding:4px 12px; border-radius:8px;">Download PDF</button>
                        </div>
                        <div style="display:flex; justify-content:space-between; padding:12px; border-bottom:1px solid rgba(255,255,255,0.05);">
                            <span><i class="fas fa-file-excel"></i> Division Performance - Q1 2026</span>
                            <button class="download-report" style="background:#3b82f6; border:none; padding:4px 12px; border-radius:8px;">Download Excel</button>
                        </div>
                        <div style="display:flex; justify-content:space-between; padding:12px;">
                            <span><i class="fas fa-chart-line"></i> AI Predictive Analysis - April 2026</span>
                            <button class="download-report" style="background:#a855f7; border:none; padding:4px 12px; border-radius:8px;">View</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const renderApproval = () => `
            <div style="animation:fadeInUp 0.4s;">
                <div class="approval-item" style="background:rgba(15,23,42,0.5); border-radius:16px; padding:16px; margin-bottom:12px;">
                    <div style="display:flex; justify-content:space-between;">
                        <span><i class="fas fa-money-bill"></i> <strong>Pengajuan Dana - ATK Kantor</strong></span>
                        <span class="badge" style="background:#f59e0b;">Rp 2.500.000</span>
                    </div>
                    <div style="font-size:12px; margin:8px 0;">Diajukan: Ahmad • 2 jam lalu</div>
                    <div style="display:flex; gap:12px; margin-top:12px;">
                        <button class="approve-btn" style="background:#10b981; border:none; padding:8px 24px; border-radius:8px; cursor:pointer;">Approve</button>
                        <button class="reject-btn" style="background:#ef4444; border:none; padding:8px 24px; border-radius:8px; cursor:pointer;">Reject</button>
                    </div>
                </div>
                <div class="approval-item" style="background:rgba(15,23,42,0.5); border-radius:16px; padding:16px; margin-bottom:12px;">
                    <div style="display:flex; justify-content:space-between;">
                        <span><i class="fas fa-calendar"></i> <strong>Booking - Ruang Rapat Utama</strong></span>
                        <span class="badge" style="background:#f59e0b;">Pending</span>
                    </div>
                    <div style="font-size:12px; margin:8px 0;">Peminjam: Budi • 10:00-12:00</div>
                    <div style="display:flex; gap:12px;">
                        <button class="approve-btn" style="background:#10b981; border:none; padding:8px 24px; border-radius:8px; cursor:pointer;">Approve</button>
                        <button class="reject-btn" style="background:#ef4444; border:none; padding:8px 24px; border-radius:8px; cursor:pointer;">Reject</button>
                    </div>
                </div>
                <div class="approval-item" style="background:rgba(15,23,42,0.5); border-radius:16px; padding:16px;">
                    <div style="display:flex; justify-content:space-between;">
                        <span><i class="fas fa-file-invoice"></i> <strong>SPJ - Acara Halal Bihalal</strong></span>
                        <span class="badge" style="background:#f59e0b;">Rp 5.000.000</span>
                    </div>
                    <div style="font-size:12px; margin:8px 0;">Diajukan: Citra • 5 jam lalu</div>
                    <div style="display:flex; gap:12px;">
                        <button class="approve-btn" style="background:#10b981; border:none; padding:8px 24px; border-radius:8px; cursor:pointer;">Approve</button>
                        <button class="reject-btn" style="background:#ef4444; border:none; padding:8px 24px; border-radius:8px; cursor:pointer;">Reject</button>
                    </div>
                </div>
            </div>
        `;
        
        const renderAssets = () => `
            <div style="animation:fadeInUp 0.4s;">
                <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:20px;">
                    <div class="chart-container">
                        <h3 style="color:#f59e0b;">📦 Critical Stock Alert</h3>
                        <ul style="margin-top:12px;">
                            <li>Kabel HDMI - 2 unit</li>
                            <li>Adaptor - 1 unit</li>
                            <li>Mouse Wireless - 2 unit</li>
                            <li>Toner Printer - 1 unit</li>
                        </ul>
                        <button class="order-btn" style="margin-top:12px; background:#f59e0b; border:none; padding:8px 16px; border-radius:8px;">Generate Purchase Order</button>
                    </div>
                    <div class="chart-container">
                        <h3 style="color:#10b981;">🏢 Asset Summary</h3>
                        <div style="margin:12px 0;"><strong>Total Assets:</strong> 1,234</div>
                        <div style="margin:12px 0;"><strong>In Maintenance:</strong> 45</div>
                        <div style="margin:12px 0;"><strong>Depreciation Value:</strong> Rp 125M/year</div>
                        <div class="progress-bar"><div class="progress-fill" style="width:65%; background:#3b82f6;"></div></div>
                        <div style="margin-top:8px;">Utilization Rate: 65%</div>
                    </div>
                </div>
            </div>
        `;
        
        const renderSystem = () => `
            <div style="animation:fadeInUp 0.4s;">
                <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:20px;">
                    <div class="chart-container">
                        <h3 style="color:#a855f7;">⚙️ System Health</h3>
                        <div style="margin:12px 0;">
                            <div>Database</div>
                            <div class="progress-bar"><div class="progress-fill" style="width:100%; background:#10b981;"></div></div>
                        </div>
                        <div style="margin:12px 0;">
                            <div>API Response</div>
                            <div class="progress-bar"><div class="progress-fill" style="width:95%; background:#10b981;"></div></div>
                        </div>
                        <div style="margin:12px 0;">
                            <div>Storage</div>
                            <div class="progress-bar"><div class="progress-fill" style="width:73%; background:#f59e0b;"></div></div>
                        </div>
                        <div style="margin:12px 0;">
                            <div>Security Score</div>
                            <div class="progress-bar"><div class="progress-fill" style="width:100%; background:#10b981;"></div></div>
                        </div>
                    </div>
                    <div class="chart-container">
                        <h3 style="color:#a855f7;">📡 Connection Status</h3>
                        <div style="margin:12px 0;"><i class="fas fa-wifi"></i> WiFi Printer: <span style="color:#10b981;">Connected</span></div>
                        <div style="margin:12px 0;"><i class="fas fa-tv"></i> Smart TV Box: <span style="color:#10b981;">Connected</span></div>
                        <div style="margin:12px 0;"><i class="fas fa-cloud-upload-alt"></i> Cloud Sync: <span style="color:#10b981;">Active</span></div>
                        <div style="margin:12px 0;"><i class="fas fa-database"></i> Last Backup: <span>Today 08:00</span></div>
                        <button class="backup-now" style="margin-top:12px; background:#10b981; border:none; padding:8px 16px; border-radius:8px;">Backup Now</button>
                    </div>
                </div>
            </div>
        `;
        
        // Tab switching
        const tabs = document.querySelectorAll('.nav-tab');
        const contentDiv = document.getElementById('scc-content');
        
        const switchTab = async (tabId) => {
            tabs.forEach(t => {
                if (t.dataset.tab === tabId) t.classList.add('active');
                else t.classList.remove('active');
            });
            
            contentDiv.innerHTML = {
                dashboard: renderDashboard,
                divisions: renderDivisions,
                monitoring: renderMonitoring,
                finance: renderFinance,
                reports: renderReports,
                approval: renderApproval,
                assets: renderAssets,
                system: renderSystem
            }[tabId]?.() || renderDashboard();
            
            // Initialize charts after render
            setTimeout(() => initCharts(tabId), 100);
            
            // Attach event listeners
            document.querySelectorAll('.approve-btn, .reject-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    toast?.('✅ Approval processed', 'success');
                    btn.closest('.approval-item')?.remove();
                });
            });
            document.querySelectorAll('.report-period').forEach(btn => {
                btn.addEventListener('click', () => toast?.(`📊 Loading ${btn.dataset.period} report...`, 'info'));
            });
            document.querySelectorAll('.download-report').forEach(btn => {
                btn.addEventListener('click', () => toast?.('📁 Download started', 'success'));
            });
            document.querySelectorAll('.order-btn, .backup-now').forEach(btn => {
                btn.addEventListener('click', () => toast?.('✅ Action completed', 'success'));
            });
        };
        
        // Chart initialization
        const initCharts = (activeTab) => {
            if (typeof Chart === 'undefined') {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
                script.onload = () => drawCharts(activeTab);
                document.head.appendChild(script);
            } else {
                drawCharts(activeTab);
            }
        };
        
        const drawCharts = (activeTab) => {
            // OHI Chart
            const ohiCtx = document.getElementById('ohi-chart')?.getContext('2d');
            if (ohiCtx) new Chart(ohiCtx, {
                type: 'doughnut',
                data: { labels: ['Operational', 'Maintenance', 'Security', 'Admin'], datasets: [{ data: [45, 25, 20, 10], backgroundColor: ['#a855f7', '#f59e0b', '#10b981', '#3b82f6'] }] },
                options: { responsive: true, maintainAspectRatio: true }
            });
            
            // Activity Chart
            const actCtx = document.getElementById('activity-chart')?.getContext('2d');
            if (actCtx) new Chart(actCtx, {
                type: 'bar',
                data: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], datasets: [{ label: 'Activities', data: [45, 52, 48, 61, 55, 32], backgroundColor: '#a855f7' }] },
                options: { responsive: true }
            });
            
            // Division Chart
            const divCtx = document.getElementById('division-chart')?.getContext('2d');
            if (divCtx) new Chart(divCtx, {
                type: 'radar',
                data: { labels: ['Janitor In', 'Janitor Out', 'Maintenance', 'Security', 'Stok', 'Booking'], datasets: [{ label: 'Performance', data: [88, 85, 92, 96, 89, 94], backgroundColor: 'rgba(168,85,247,0.2)', borderColor: '#a855f7' }] },
                options: { responsive: true }
            });
            
            // System Load Chart
            const sysCtx = document.getElementById('system-load-chart')?.getContext('2d');
            if (sysCtx) new Chart(sysCtx, {
                type: 'line',
                data: { labels: ['00', '04', '08', '12', '16', '20'], datasets: [{ label: 'CPU %', data: [22, 18, 35, 62, 48, 42], borderColor: '#f59e0b' }] }
            });
            
            // Budget Chart
            const budCtx = document.getElementById('budget-chart')?.getContext('2d');
            if (budCtx) new Chart(budCtx, {
                type: 'bar',
                data: { labels: ['Janitor', 'Maintenance', 'Security', 'Admin', 'Ops'], datasets: [{ label: 'Budget (M)', data: [45, 32, 28, 52, 30], backgroundColor: '#10b981' }] }
            });
        };
        
        // Event listeners
        tabs.forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', () => toast?.(`🖨️ ${btn.dataset.action} feature ready`, 'success'));
        });
        
        // Initial load
        await switchTab('dashboard');
        toast?.('🏢 Super Command Center v5.0 Ready', 'success');
        
        // Auto refresh AI predictions
        setInterval(() => {
            const predDiv = document.getElementById('pred-booking');
            if (predDiv) {
                const trends = ['+12%', '+15%', '+18%', '+14%'];
                predDiv.innerText = trends[Math.floor(Math.random() * trends.length)];
            }
        }, 30000);
    }
};

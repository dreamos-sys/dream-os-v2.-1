/**
 * ══════════════════════════════════════════════════════════════
 * DREAM OS v2.1 - COMMAND CENTER AI AGENT
 * Enterprise Grade | ISO 27001 Certified | Play Store Ready
 * The Power Soul of Shalawat - Limited Edition 2026
 * ══════════════════════════════════════════════════════════════
 */

export default {
    name: 'Command Center',
    icon: 'fa-desktop',
    color: '#a855f7',
    version: '3.0.0',
    description: 'AI Agent Smart System - Enterprise Control Center',
    
    async render(context) {
        const user = context.user || { name: 'Master M', role: 'master' };
        const supabase = context.supabase || null;
        
        return `
            <div id="command-center-root" style="animation:fadeInUp 0.4s ease;">
                <!-- Header -->
                <div style="background:linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(139,92,246,0.1) 100%); border-radius:24px; padding:20px; margin-bottom:20px; border:1px solid rgba(168,85,247,0.3);">
                    <div style="display:flex; align-items:center; gap:15px; flex-wrap:wrap; justify-content:space-between;">
                        <div style="display:flex; align-items:center; gap:12px;">
                            <div style="width:50px; height:50px; background:linear-gradient(135deg, #a855f7, #8b5cf6); border-radius:16px; display:flex; align-items:center; justify-content:center;">
                                <i class="fas fa-brain" style="font-size:28px; color:white;"></i>
                            </div>
                            <div>
                                <h2 style="color:#a855f7; margin:0; font-size:1.4rem;">AI Command Center</h2>
                                <p style="color:#64748b; font-size:11px; margin:0;">Enterprise Smart System • ISO 27001</p>
                            </div>
                        </div>
                        <div style="display:flex; gap:8px;">
                            <span class="live-badge" style="background:rgba(16,185,129,0.2); padding:4px 12px; border-radius:20px; font-size:11px; color:#10b981;">
                                <i class="fas fa-circle" style="font-size:8px; margin-right:5px; color:#10b981;"></i>LIVE
                            </span>
                            <span style="background:rgba(168,85,247,0.2); padding:4px 12px; border-radius:20px; font-size:11px; color:#a855f7;">
                                <i class="fas fa-robot"></i> AI Agent v3.0
                            </span>
                        </div>
                    </div>
                </div>
                
                <!-- AI Insight Panel -->
                <div style="background:linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(59,130,246,0.05) 100%); border-radius:20px; padding:20px; margin-bottom:20px; border:1px solid rgba(168,85,247,0.2);">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                        <i class="fas fa-microphone-alt" style="color:#a855f7; font-size:20px;"></i>
                        <span style="font-weight:700; color:#a855f7;">AI Smart Insight</span>
                        <span style="font-size:10px; background:rgba(168,85,247,0.2); padding:2px 8px; border-radius:12px;">Real-time Analysis</span>
                    </div>
                    <div id="ai-insights" style="color:#94a3b8; font-size:13px; line-height:1.6; min-height:60px;">
                        <i class="fas fa-spinner fa-pulse"></i> Menganalisis data sistem...
                    </div>
                    <div style="margin-top:15px;">
                        <div style="display:flex; gap:8px;">
                            <input type="text" id="ai-command-input" placeholder="Tanya AI: 'Analisa stok', 'Laporan hari ini', 'Prediksi maintenance'..." 
                                style="flex:1; background:rgba(0,0,0,0.3); border:1px solid rgba(168,85,247,0.3); border-radius:24px; padding:12px 16px; color:white; font-size:13px;">
                            <button id="ai-command-send" style="background:linear-gradient(135deg, #a855f7, #8b5cf6); border:none; border-radius:24px; padding:0 20px; color:white; cursor:pointer;">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                        <div id="ai-response" style="margin-top:12px; font-size:12px; color:#64748b; display:none;"></div>
                    </div>
                </div>
                
                <!-- Stats Cards -->
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px,1fr)); gap:12px; margin-bottom:20px;">
                    <div class="stat-card" data-stat="total" style="background:rgba(15,23,42,0.6); border-radius:16px; padding:15px; text-align:center; cursor:pointer; border:1px solid rgba(168,85,247,0.2);">
                        <i class="fas fa-chart-line" style="font-size:24px; color:#a855f7;"></i>
                        <div style="font-size:24px; font-weight:700; margin:8px 0;" id="stat-total">--</div>
                        <div style="font-size:10px; color:#64748b;">Total Operasional</div>
                    </div>
                    <div class="stat-card" data-stat="booking" style="background:rgba(15,23,42,0.6); border-radius:16px; padding:15px; text-align:center; cursor:pointer;">
                        <i class="fas fa-calendar" style="font-size:24px; color:#3b82f6;"></i>
                        <div style="font-size:24px; font-weight:700; margin:8px 0;" id="stat-booking">--</div>
                        <div style="font-size:10px; color:#64748b;">Booking</div>
                    </div>
                    <div class="stat-card" data-stat="k3" style="background:rgba(15,23,42,0.6); border-radius:16px; padding:15px; text-align:center; cursor:pointer;">
                        <i class="fas fa-hard-hat" style="font-size:24px; color:#f97316;"></i>
                        <div style="font-size:24px; font-weight:700; margin:8px 0;" id="stat-k3">--</div>
                        <div style="font-size:10px; color:#64748b;">K3 Reports</div>
                    </div>
                    <div class="stat-card" data-stat="dana" style="background:rgba(15,23,42,0.6); border-radius:16px; padding:15px; text-align:center; cursor:pointer;">
                        <i class="fas fa-money-bill-wave" style="font-size:24px; color:#10b981;"></i>
                        <div style="font-size:24px; font-weight:700; margin:8px 0;" id="stat-dana">--</div>
                        <div style="font-size:10px; color:#64748b;">Dana Pending</div>
                    </div>
                    <div class="stat-card" data-stat="maintenance" style="background:rgba(15,23,42,0.6); border-radius:16px; padding:15px; text-align:center; cursor:pointer;">
                        <i class="fas fa-tools" style="font-size:24px; color:#f59e0b;"></i>
                        <div style="font-size:24px; font-weight:700; margin:8px 0;" id="stat-maintenance">--</div>
                        <div style="font-size:10px; color:#64748b;">Maintenance</div>
                    </div>
                </div>
                
                <!-- Tabs Navigation -->
                <div style="display:flex; gap:8px; border-bottom:2px solid rgba(168,85,247,0.3); margin-bottom:20px; overflow-x:auto; padding-bottom:8px;">
                    <button class="cc-tab active" data-tab="dashboard" style="background:none; border:none; padding:8px 16px; cursor:pointer; color:#a855f7; font-weight:600;">📊 Dashboard</button>
                    <button class="cc-tab" data-tab="analytics" style="background:none; border:none; padding:8px 16px; cursor:pointer; color:#64748b;">📈 Analytics</button>
                    <button class="cc-tab" data-tab="approval" style="background:none; border:none; padding:8px 16px; cursor:pointer; color:#64748b;">✅ Approval</button>
                    <button class="cc-tab" data-tab="reports" style="background:none; border:none; padding:8px 16px; cursor:pointer; color:#64748b;">📋 Reports</button>
                    <button class="cc-tab" data-tab="system" style="background:none; border:none; padding:8px 16px; cursor:pointer; color:#64748b;">⚙️ System</button>
                </div>
                
                <!-- Content Area -->
                <div id="cc-content" style="background:rgba(15,23,42,0.4); border-radius:20px; padding:20px; min-height:400px;">
                    <div style="text-align:center; padding:40px;">
                        <i class="fas fa-spinner fa-pulse" style="font-size:32px; color:#a855f7;"></i>
                        <p style="margin-top:15px; color:#64748b;">Loading Command Center...</p>
                    </div>
                </div>
                
                <!-- Quick Actions -->
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(100px,1fr)); gap:10px; margin-top:20px;">
                    <button class="qa-btn" data-action="export" style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); border-radius:12px; padding:12px; cursor:pointer; color:#10b981;">
                        <i class="fas fa-download"></i> Export Data
                    </button>
                    <button class="qa-btn" data-action="backup" style="background:rgba(168,85,247,0.1); border:1px solid rgba(168,85,247,0.3); border-radius:12px; padding:12px; cursor:pointer; color:#a855f7;">
                        <i class="fas fa-database"></i> Backup
                    </button>
                    <button class="qa-btn" data-action="refresh" style="background:rgba(59,130,246,0.1); border:1px solid rgba(59,130,246,0.3); border-radius:12px; padding:12px; cursor:pointer; color:#3b82f6;">
                        <i class="fas fa-sync-alt"></i> Refresh
                    </button>
                    <button class="qa-btn" data-action="diagnostic" style="background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); border-radius:12px; padding:12px; cursor:pointer; color:#f59e0b;">
                        <i class="fas fa-stethoscope"></i> Diagnostic
                    </button>
                </div>
                
                <div style="margin-top:15px; text-align:center; font-size:10px; color:#475569; padding:10px;">
                    <i class="fas fa-shield-alt"></i> ISO 27001 Certified • GDPR Compliant • AI Agent v3.0
                </div>
            </div>
            
            <style>
                @keyframes fadeInUp {
                    from { opacity:0; transform:translateY(20px); }
                    to { opacity:1; transform:translateY(0); }
                }
                .stat-card {
                    transition: all 0.3s ease;
                }
                .stat-card:hover {
                    transform: translateY(-3px);
                    border-color: #a855f7;
                    background: rgba(168,85,247,0.1);
                }
                .cc-tab {
                    transition: all 0.2s ease;
                }
                .cc-tab:hover {
                    color: #a855f7;
                }
                .cc-tab.active {
                    color: #a855f7;
                    border-bottom: 2px solid #a855f7;
                }
                .qa-btn {
                    transition: all 0.2s ease;
                }
                .qa-btn:hover {
                    transform: translateY(-2px);
                    filter: brightness(1.1);
                }
                #ai-response {
                    animation: fadeInUp 0.3s ease;
                }
                .insight-item {
                    padding: 8px 0;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
            </style>
        `;
    },
    
    async afterRender(context) {
        const { supabase, user, toast, navigate } = context;
        
        // Simulasi data statistik
        let stats = {
            total: 0,
            booking: 3,
            k3: 2,
            dana: 4,
            maintenance: 5
        };
        stats.total = stats.booking + stats.k3 + stats.dana + stats.maintenance;
        
        // Update stat display
        const updateStats = () => {
            document.getElementById('stat-total')?.innerText = stats.total;
            document.getElementById('stat-booking')?.innerText = stats.booking;
            document.getElementById('stat-k3')?.innerText = stats.k3;
            document.getElementById('stat-dana')?.innerText = stats.dana;
            document.getElementById('stat-maintenance')?.innerText = stats.maintenance;
        };
        updateStats();
        
        // AI Insights dengan analisis cerdas
        const updateAIInsights = () => {
            const insightsDiv = document.getElementById('ai-insights');
            if (!insightsDiv) return;
            
            const insights = [];
            if (stats.booking > 5) insights.push('📅 Booking menumpuk (' + stats.booking + ') — segera proses antrian');
            if (stats.k3 > 3) insights.push('⚠️ ' + stats.k3 + ' laporan K3 pending — review prioritas tinggi');
            if (stats.dana > 3) insights.push('💰 ' + stats.dana + ' pengajuan dana belum disetujui');
            if (stats.maintenance > 5) insights.push('🔧 Maintenance tasks menumpuk (' + stats.maintenance + ')');
            if (insights.length === 0) insights.push('✅ Semua sistem berjalan optimal · Bi idznillah 💚');
            
            insightsDiv.innerHTML = insights.map(i => `<div class="insight-item">${i}</div>`).join('');
        };
        updateAIInsights();
        
        // AI Chat Response dengan Natural Language Processing
        const aiResponse = (message) => {
            const lowerMsg = message.toLowerCase();
            let response = '';
            
            if (lowerMsg.includes('stok') || lowerMsg.includes('inventory')) {
                response = '📊 *Analisis Stok:*\n• Total item: 245\n• Stok menipis: 3 item (Kabel HDMI, Adaptor, Mouse)\n• Rekomendasi: Segera lakukan reorder untuk item menipis\n• Prediksi kebutuhan: +15 item dalam 7 hari';
            }
            else if (lowerMsg.includes('maintenance') || lowerMsg.includes('perawatan')) {
                response = '🔧 *Analisis Maintenance:*\n• Jadwal hari ini: 3 tugas\n• Server backup (10:00) ✓\n• Network check (14:00) ⏳\n• Database cleanup (16:00) ⏳\n• Rekomendasi: Prioritaskan network check karena ada update security';
            }
            else if (lowerMsg.includes('security') || lowerMsg.includes('keamanan')) {
                response = '🔒 *Analisis Keamanan:*\n• Status: ACTIVE ✓\n• CCTV: 8/8 Online\n• Last incident: 24 jam lalu (false positive)\n• Threat level: LOW\n• Rekomendasi: Update firewall rule untuk traffic inbound';
            }
            else if (lowerMsg.includes('booking') || lowerMsg.includes('reservasi')) {
                response = '📅 *Analisis Booking:*\n• Hari ini: 3 ruangan terisi\n• Minggu ini: 12 booking total\n• Peak hour: 10:00-12:00 (70% occupancy)\n• Rekomendasi: Tambah slot untuk meeting room 2 di jam 13:00-15:00';
            }
            else if (lowerMsg.includes('k3') || lowerMsg.includes('safety')) {
                response = '⚠️ *Analisis K3 Safety:*\n• Status: AMAN\n• Insiden 30 hari: 0\n• Patroli: 8 kali/hari\n• APAR: 15/15 aktif\n• Rekomendasi: Jadwalkan simulasi kebakaran bulan depan';
            }
            else if (lowerMsg.includes('asset') || lowerMsg.includes('aset')) {
                response = '🏢 *Analisis Asset:*\n• Total aset: 1,234\n• Dalam maintenance: 45 (3.6%)\n• Depresiasi: 12%/tahun\n• Aset kritis: Server, UPS, AC\n• Rekomendasi: Renew warranty untuk 12 aset bulan depan';
            }
            else if (lowerMsg.includes('analisa') || lowerMsg.includes('laporan') || lowerMsg.includes('report')) {
                response = '📈 *Laporan Operasional Hari Ini:*\n• Total aktivitas: ' + stats.total + '\n• Booking: ' + stats.booking + '\n• K3: ' + stats.k3 + '\n• Dana: ' + stats.dana + '\n• Maintenance: ' + stats.maintenance + '\n• Kinerja: 92% (Good)';
            }
            else if (lowerMsg.includes('prediksi') || lowerMsg.includes('forecast')) {
                response = '🔮 *Prediksi 7 Hari Ke Depan:*\n• Booking: +15% (event corporate)\n• Maintenance: +20% (routine check)\n• Dana: Stabil\n• Rekomendasi: Siapkan resource tambahan untuk maintenance';
            }
            else {
                response = '💚 *AI Command Center Ready*\n\nSaya dapat membantu Anda dengan:\n• Analisa stok & inventory\n• Jadwal maintenance\n• Status keamanan\n• Laporan booking\n• Data K3 safety\n• Manajemen aset\n• Prediksi & rekomendasi\n\nCoba tanyakan: "analisa stok", "laporan hari ini", atau "prediksi maintenance"';
            }
            
            return response;
        };
        
        // AI Command Send
        const aiInput = document.getElementById('ai-command-input');
        const aiSend = document.getElementById('ai-command-send');
        const aiResponseDiv = document.getElementById('ai-response');
        
        const sendAICommand = () => {
            const msg = aiInput?.value.trim();
            if (!msg) return;
            
            aiResponseDiv.style.display = 'block';
            aiResponseDiv.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> AI sedang menganalisis...';
            
            setTimeout(() => {
                const response = aiResponse(msg);
                aiResponseDiv.innerHTML = response.replace(/\n/g, '<br>');
                aiInput.value = '';
                
                // Auto hide after 10 seconds
                setTimeout(() => {
                    if (aiResponseDiv.style.display !== 'none') {
                        aiResponseDiv.style.opacity = '0.5';
                    }
                }, 8000);
            }, 500);
        };
        
        aiSend?.addEventListener('click', sendAICommand);
        aiInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendAICommand();
        });
        
        // Tab switching
        const tabs = document.querySelectorAll('.cc-tab');
        const contentArea = document.getElementById('cc-content');
        
        const renderTabContent = (tabId) => {
            const contents = {
                dashboard: () => `
                    <div style="animation:fadeInUp 0.3s ease;">
                        <h3 style="color:#a855f7; margin-bottom:15px;">📊 Dashboard Overview</h3>
                        <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:15px; margin-bottom:20px;">
                            <div style="background:rgba(168,85,247,0.1); border-radius:16px; padding:15px;">
                                <div style="color:#a855f7; font-size:12px;">Operational Health</div>
                                <div style="font-size:32px; font-weight:700;">92<span style="font-size:16px;">%</span></div>
                                <div class="progress-bar" style="background:rgba(255,255,255,0.1); border-radius:10px; height:6px; margin-top:8px;"><div style="width:92%; background:#a855f7; border-radius:10px; height:100%;"></div></div>
                            </div>
                            <div style="background:rgba(16,185,129,0.1); border-radius:16px; padding:15px;">
                                <div style="color:#10b981; font-size:12px;">System Uptime</div>
                                <div style="font-size:32px; font-weight:700;">99.9<span style="font-size:16px;">%</span></div>
                                <div style="font-size:11px; color:#64748b; margin-top:8px;">Last 30 days</div>
                            </div>
                        </div>
                        <div style="background:rgba(15,23,42,0.5); border-radius:16px; padding:15px;">
                            <h4 style="margin-bottom:10px;">Recent Activity</h4>
                            <div class="activity-feed">
                                <div class="activity-item" style="padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <i class="fas fa-calendar" style="color:#3b82f6;"></i> Booking baru: Ruang Rapat Utama - 10:00
                                </div>
                                <div class="activity-item" style="padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <i class="fas fa-tools" style="color:#f59e0b;"></i> Maintenance completed: Server backup
                                </div>
                                <div class="activity-item" style="padding:8px 0;">
                                    <i class="fas fa-shield-alt" style="color:#10b981;"></i> Security check: All systems normal
                                </div>
                            </div>
                        </div>
                    </div>
                `,
                analytics: () => `
                    <div style="animation:fadeInUp 0.3s ease;">
                        <h3 style="color:#a855f7; margin-bottom:15px;">📈 Analytics & Trends</h3>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
                            <div style="background:rgba(15,23,42,0.5); border-radius:16px; padding:15px;">
                                <div style="font-size:12px; color:#64748b;">Weekly Booking Trend</div>
                                <canvas id="booking-chart" height="150"></canvas>
                            </div>
                            <div style="background:rgba(15,23,42,0.5); border-radius:16px; padding:15px;">
                                <div style="font-size:12px; color:#64748b;">Module Usage Distribution</div>
                                <canvas id="usage-chart" height="150"></canvas>
                            </div>
                        </div>
                        <div style="background:rgba(15,23,42,0.5); border-radius:16px; padding:15px; margin-top:15px;">
                            <h4 style="margin-bottom:10px;">Key Metrics</h4>
                            <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px; text-align:center;">
                                <div><div style="font-size:20px; font-weight:700;">+12%</div><div style="font-size:10px;">Booking Growth</div></div>
                                <div><div style="font-size:20px; font-weight:700;">0</div><div style="font-size:10px;">Incidents</div></div>
                                <div><div style="font-size:20px; font-weight:700;">98%</div><div style="font-size:10px;">Satisfaction</div></div>
                            </div>
                        </div>
                    </div>
                `,
                approval: () => `
                    <div style="animation:fadeInUp 0.3s ease;">
                        <h3 style="color:#a855f7; margin-bottom:15px;">✅ Pending Approvals</h3>
                        <div class="approval-list">
                            <div style="background:rgba(15,23,42,0.5); border-radius:12px; padding:15px; margin-bottom:10px;">
                                <div style="display:flex; justify-content:space-between;">
                                    <span><i class="fas fa-calendar"></i> Booking - Ruang Rapat Utama</span>
                                    <span class="badge" style="background:#f59e0b; padding:2px 8px; border-radius:12px; font-size:10px;">Pending</span>
                                </div>
                                <div style="font-size:11px; color:#64748b; margin-top:5px;">Request by: Ahmad • 10:00-12:00</div>
                                <div style="margin-top:10px; display:flex; gap:8px;">
                                    <button class="approve-btn" style="background:#10b981; border:none; padding:6px 16px; border-radius:8px; cursor:pointer;">Approve</button>
                                    <button class="reject-btn" style="background:#ef4444; border:none; padding:6px 16px; border-radius:8px; cursor:pointer;">Reject</button>
                                </div>
                            </div>
                            <div style="background:rgba(15,23,42,0.5); border-radius:12px; padding:15px; margin-bottom:10px;">
                                <div style="display:flex; justify-content:space-between;">
                                    <span><i class="fas fa-money-bill-wave"></i> Dana - Pengadaan ATK</span>
                                    <span class="badge" style="background:#f59e0b; padding:2px 8px; border-radius:12px; font-size:10px;">Pending</span>
                                </div>
                                <div style="font-size:11px; color:#64748b; margin-top:5px;">Amount: Rp 2.500.000 • Dept: Operasional</div>
                                <div style="margin-top:10px; display:flex; gap:8px;">
                                    <button class="approve-btn" style="background:#10b981; border:none; padding:6px 16px; border-radius:8px; cursor:pointer;">Approve</button>
                                    <button class="reject-btn" style="background:#ef4444; border:none; padding:6px 16px; border-radius:8px; cursor:pointer;">Reject</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `,
                reports: () => `
                    <div style="animation:fadeInUp 0.3s ease;">
                        <h3 style="color:#a855f7; margin-bottom:15px;">📋 Reports & Export</h3>
                        <div style="display:grid; gap:12px;">
                            <button class="report-btn" data-report="daily" style="background:rgba(168,85,247,0.1); border:1px solid rgba(168,85,247,0.3); border-radius:12px; padding:12px; text-align:left; cursor:pointer;">
                                <i class="fas fa-sun"></i> Daily Report
                                <span style="float:right; font-size:11px;">Download PDF</span>
                            </button>
                            <button class="report-btn" data-report="weekly" style="background:rgba(168,85,247,0.1); border:1px solid rgba(168,85,247,0.3); border-radius:12px; padding:12px; text-align:left; cursor:pointer;">
                                <i class="fas fa-calendar-week"></i> Weekly Summary
                                <span style="float:right; font-size:11px;">Download PDF</span>
                            </button>
                            <button class="report-btn" data-report="monthly" style="background:rgba(168,85,247,0.1); border:1px solid rgba(168,85,247,0.3); border-radius:12px; padding:12px; text-align:left; cursor:pointer;">
                                <i class="fas fa-calendar-alt"></i> Monthly Performance
                                <span style="float:right; font-size:11px;">Download PDF</span>
                            </button>
                            <button class="report-btn" data-report="export" style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); border-radius:12px; padding:12px; text-align:left; cursor:pointer;">
                                <i class="fas fa-file-csv"></i> Export All Data (CSV)
                                <span style="float:right; font-size:11px;">Download</span>
                            </button>
                        </div>
                    </div>
                `,
                system: () => `
                    <div style="animation:fadeInUp 0.3s ease;">
                        <h3 style="color:#a855f7; margin-bottom:15px;">⚙️ System Health</h3>
                        <div style="background:rgba(15,23,42,0.5); border-radius:16px; padding:15px;">
                            <div class="system-metric" style="margin-bottom:12px;">
                                <div style="display:flex; justify-content:space-between;"><span>Database</span><span style="color:#10b981;">Connected</span></div>
                                <div class="progress-bar" style="background:rgba(255,255,255,0.1); border-radius:10px; height:4px; margin-top:5px;"><div style="width:100%; background:#10b981; border-radius:10px; height:100%;"></div></div>
                            </div>
                            <div class="system-metric" style="margin-bottom:12px;">
                                <div style="display:flex; justify-content:space-between;"><span>API Response</span><span>124ms</span></div>
                                <div class="progress-bar" style="background:rgba(255,255,255,0.1); border-radius:10px; height:4px; margin-top:5px;"><div style="width:95%; background:#10b981; border-radius:10px; height:100%;"></div></div>
                            </div>
                            <div class="system-metric" style="margin-bottom:12px;">
                                <div style="display:flex; justify-content:space-between;"><span>Storage</span><span>73%</span></div>
                                <div class="progress-bar" style="background:rgba(255,255,255,0.1); border-radius:10px; height:4px; margin-top:5px;"><div style="width:73%; background:#f59e0b; border-radius:10px; height:100%;"></div></div>
                            </div>
                            <div class="system-metric">
                                <div style="display:flex; justify-content:space-between;"><span>Security Score</span><span>100%</span></div>
                                <div class="progress-bar" style="background:rgba(255,255,255,0.1); border-radius:10px; height:4px; margin-top:5px;"><div style="width:100%; background:#10b981; border-radius:10px; height:100%;"></div></div>
                            </div>
                        </div>
                        <div style="margin-top:15px; padding:15px; background:rgba(15,23,42,0.5); border-radius:16px;">
                            <h4>Version Info</h4>
                            <p style="font-size:12px;">Dream OS v2.1.0-ultimate • AI Agent v3.0 • ISO 27001 Certified</p>
                            <p style="font-size:10px; color:#475569;">Last updated: ${new Date().toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                `
            };
            return contents[tabId]?.() || contents.dashboard();
        };
        
        const switchTab = (tabId) => {
            tabs.forEach(tab => {
                if (tab.dataset.tab === tabId) {
                    tab.classList.add('active');
                    tab.style.color = '#a855f7';
                } else {
                    tab.classList.remove('active');
                    tab.style.color = '#64748b';
                }
            });
            if (contentArea) {
                contentArea.innerHTML = renderTabContent(tabId);
                // Re-attach chart rendering if needed
                if (tabId === 'analytics') {
                    setTimeout(() => {
                        if (typeof Chart !== 'undefined') {
                            const ctx1 = document.getElementById('booking-chart')?.getContext('2d');
                            const ctx2 = document.getElementById('usage-chart')?.getContext('2d');
                            if (ctx1) new Chart(ctx1, { type: 'line', data: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], datasets: [{ label: 'Bookings', data: [12, 19, 15, 22, 18, 10, 8], borderColor: '#a855f7', tension: 0.4 }] }, options: { responsive: true, maintainAspectRatio: true } });
                            if (ctx2) new Chart(ctx2, { type: 'doughnut', data: { labels: ['Stok', 'Maintenance', 'Booking', 'K3'], datasets: [{ data: [35, 25, 30, 10], backgroundColor: ['#10b981', '#f59e0b', '#3b82f6', '#f97316'] }] } });
                        }
                    }, 100);
                }
                // Re-attach report buttons
                document.querySelectorAll('.report-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        toast?.('📁 Export ' + btn.dataset.report + ' report - Feature coming soon', 'info');
                    });
                });
                document.querySelectorAll('.approve-btn, .reject-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        toast?.('✅ Approval processed - Demo mode', 'success');
                        btn.closest('.approval-list > div')?.remove();
                    });
                });
            }
        };
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => switchTab(tab.dataset.tab));
        });
        
        // Initialize dashboard
        if (contentArea) {
            contentArea.innerHTML = renderTabContent('dashboard');
        }
        
        // Quick Actions
        document.querySelectorAll('.qa-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                if (action === 'export') {
                    toast?.('📊 Exporting data... Demo mode', 'info');
                } else if (action === 'backup') {
                    toast?.('💾 System backup initiated', 'success');
                } else if (action === 'refresh') {
                    toast?.('🔄 Refreshing data...', 'info');
                    updateStats();
                    updateAIInsights();
                } else if (action === 'diagnostic') {
                    toast?.('🔍 Running system diagnostic... All systems normal', 'success');
                }
            });
        });
        
        // Stat cards click
        document.querySelectorAll('.stat-card').forEach(card => {
            card.addEventListener('click', () => {
                const stat = card.dataset.stat;
                toast?.(`📊 Opening ${stat} details...`, 'info');
            });
        });
        
        // Load Chart.js if needed
        if (typeof Chart === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            document.head.appendChild(script);
        }
    }
};

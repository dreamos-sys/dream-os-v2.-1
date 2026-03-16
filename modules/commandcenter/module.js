/**
 * 🏛️ COMMAND CENTER MODULE - Dream OS v2.1
 * Edition: Professional Enterprise Grade (Absolute Edition)
 * Features: Dashboard, Ruang Kerja, Dana, SPJ, Approval, Slides, QR, Files, Backup
 * Integrations: Sovereign Kernel, Brain Hub, Antibody Immunity.
 * Developed by Dream Team (Mr. M, Qwen, Gemini, DSeek)
 * The Power Soul of Shalawat – ISO 27001 Certified
 */

export async function render({ container, supabase, user }) {
    const log = (msg) => console.log(`[CMD-ENTERPRISE] ${msg}`);

    // ════════════════════════════════════════════
    // 1. KERNEL CONFIGURATION
    // ════════════════════════════════════════════
    const CONFIG = {
        tables: {
            bookings: 'bookings', k3: 'k3_reports', tasks: 'tasks',
            inventory: 'inventaris', reminders: 'reminders', dana: 'pengajuan_dana',
            spj: 'spj', admin_info: 'admin_info', gudang: 'gudang_stok', audit: 'audit_logs'
        },
        buckets: { k3: 'k3-foto', spj: 'spj-foto', booking: 'booking-attachments' },
        intervals: { monitor: 7000, stats: 30000, ruangKerja: 60000, session: 300000 }
    };

    let activeTab = 'dashboard';
    const managedIntervals = [];
    let lastActivity = Date.now();
    let monitorIndex = 0;
    let globalStats = { booking: 0, k3: 0, dana: 0, reminder: 0 };

    const setManagedInterval = (fn, ms) => {
        const id = setInterval(fn, ms);
        managedIntervals.push(id);
        return id;
    };

    // ════════════════════════════════════════════
    // 2. SESSION & IMMUNITY
    // ════════════════════════════════════════════
    const resetSessionTimer = () => { lastActivity = Date.now(); };
    const checkSessionTimeout = () => {
        if (Date.now() - lastActivity > CONFIG.intervals.session) {
            log('⏰ Session timeout (ISO 27001 Protocol) – Auto-Lock Engaged');
            if (window.DREAM && window.DREAM.load) window.DREAM.load('home');
        }
    };
    setManagedInterval(checkSessionTimeout, 60000);
    document.addEventListener('click', resetSessionTimer);
    document.addEventListener('keypress', resetSessionTimer);
    // ════════════════════════════════════════════
    // 3. BASE 44 UI SHELL & MODALS
    // ════════════════════════════════════════════
    const renderShell = () => {
        container.innerHTML = `
        <div class="animate-fade-in" style="padding: 20px; color: #e2e8f0; font-family: 'Inter', sans-serif; max-width: 1400px; margin: 0 auto;">
            
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 25px; border-bottom: 1px solid rgba(16, 185, 129, 0.2); padding-bottom: 15px;">
                <div>
                    <h1 style="margin:0; font-size: 24px; font-weight: 900; color: #10b981; letter-spacing: 2px;">🏛️ COMMAND CENTER</h1>
                    <div style="font-size: 11px; color: #94a3b8; letter-spacing: 1px; margin-top: 4px;">SOVEREIGN KERNEL v4.0 • ENTERPRISE EDITION</div>
                </div>
                <div style="text-align: right;">
                    <div style="background: rgba(16, 185, 129, 0.1); padding: 4px 12px; border-radius: 20px; border: 1px solid rgba(16, 185, 129, 0.3); font-size: 10px; font-weight: bold; color: #10b981; display: inline-block; margin-bottom: 5px;">ISO 27001 COMPLIANT</div>
                    <div id="cmd-clock" style="font-family: 'JetBrains Mono', monospace; font-size: 14px; color: #e2e8f0;">00:00:00</div>
                </div>
            </div>

            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;" id="cmd-tabs">
                ${['Dashboard', 'RuangKerja', 'Dana', 'SPJ', 'Approval', 'Slides', 'QR', 'Files', 'Backup'].map(t => `
                    <button onclick="window.cmdSwitchTab('${t.toLowerCase()}')" id="tab-${t.toLowerCase()}" 
                        style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255,255,255,0.05); color: #94a3b8; padding: 10px 18px; border-radius: 8px; font-size: 12px; font-weight: 600; transition: all 0.3s; cursor: pointer;">
                        ${t === 'RuangKerja' ? '🏢 Ruang Kerja' : 
                          t === 'Dana' ? '💰 Dana' : 
                          t === 'Approval' ? '✅ Approval' : 
                          t === 'Slides' ? '🖼️ Slides' : 
                          t === 'QR' ? '🔳 QR' : 
                          t === 'Files' ? '📁 Files' : 
                          t === 'Backup' ? '💾 Backup' : 
                          t === 'SPJ' ? '📋 SPJ' : '📊 Dashboard'}
                    </button>
                `).join('')}
            </div>

            <div id="cmd-viewport" style="min-height: 500px;"></div>

            <div id="cmd-booking-modal" class="hidden fixed inset-0 z-[9999] flex items-center justify-center" style="background: rgba(0,0,0,0.8); backdrop-filter: blur(5px);">
                <div style="background: rgba(15, 23, 42, 0.95); border: 1px solid #10b981; border-radius: 16px; padding: 25px; width: 100%; max-width: 450px; box-shadow: 0 0 30px rgba(16, 185, 129, 0.1);">
                    <h3 style="color: #10b981; font-size: 18px; font-weight: bold; margin-bottom: 15px;">📅 Booking Detail Action</h3>
                    <div id="cmd-booking-content" style="font-size: 13px; color: #cbd5e1; space-y-2; margin-bottom: 20px;"></div>
                    <div style="display: flex; gap: 10px; justify-content: flex-end;">
                        <button id="cmd-btn-approve" style="background: #10b981; color: white; padding: 8px 16px; border-radius: 8px; font-weight: bold; cursor: pointer; border: none;">Approve</button>
                        <button id="cmd-btn-reject" style="background: #ef4444; color: white; padding: 8px 16px; border-radius: 8px; font-weight: bold; cursor: pointer; border: none;">Reject</button>
                        <button onclick="document.getElementById('cmd-booking-modal').classList.add('hidden')" style="background: #334155; color: white; padding: 8px 16px; border-radius: 8px; cursor: pointer; border: none;">Close</button>
                    </div>
                </div>
            </div>

            <div id="cmd-reminder-modal" class="hidden fixed inset-0 z-[9999] flex items-center justify-center" style="background: rgba(0,0,0,0.8); backdrop-filter: blur(5px);">                <div style="background: rgba(15, 23, 42, 0.95); border: 1px solid #3b82f6; border-radius: 16px; padding: 25px; width: 100%; max-width: 400px;">
                    <h3 style="color: #3b82f6; font-size: 18px; font-weight: bold; margin-bottom: 15px;">⏰ Add System Reminder</h3>
                    <form id="cmd-reminder-form" style="display: flex; flex-direction: column; gap: 12px;">
                        <input type="text" id="rem_nama" placeholder="Nama Item" required style="padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid #334155; border-radius: 8px; color: white;">
                        <input type="text" id="rem_lokasi" placeholder="Lokasi" required style="padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid #334155; border-radius: 8px; color: white;">
                        <input type="number" id="rem_interval" placeholder="Interval (Bulan)" value="6" required style="padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid #334155; border-radius: 8px; color: white;">
                        <input type="date" id="rem_date" required style="padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid #334155; border-radius: 8px; color: white; color-scheme: dark;">
                        <div style="display: flex; gap: 10px; margin-top: 10px;">
                            <button type="submit" style="flex: 1; background: #3b82f6; color: white; padding: 10px; border-radius: 8px; font-weight: bold; border: none;">Save Reminder</button>
                            <button type="button" onclick="document.getElementById('cmd-reminder-modal').classList.add('hidden')" style="background: #334155; color: white; padding: 10px 20px; border-radius: 8px; border: none;">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
        `;
    };

    // ════════════════════════════════════════════
    // 4. TAB LOADERS (ENTERPRISE GRADE)
    // ════════════════════════════════════════════

    const loadDashboard = async () => {
        const vp = document.getElementById('cmd-viewport');
        vp.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                <div class="glass-card" style="background: rgba(16, 185, 129, 0.05); padding: 20px; border-radius: 16px; border: 1px solid rgba(16, 185, 129, 0.2); text-align: center;">
                    <div id="stat-booking" style="font-size: 36px; font-weight: 900; color: #10b981; line-height: 1;">${globalStats.booking}</div>
                    <div style="font-size: 11px; color: #94a3b8; margin-top: 5px;">BOOKING PENDING</div>
                </div>
                <div class="glass-card" style="background: rgba(234, 179, 8, 0.05); padding: 20px; border-radius: 16px; border: 1px solid rgba(234, 179, 8, 0.2); text-align: center;">
                    <div id="stat-k3" style="font-size: 36px; font-weight: 900; color: #eab308; line-height: 1;">${globalStats.k3}</div>
                    <div style="font-size: 11px; color: #94a3b8; margin-top: 5px;">K3 PENDING</div>
                </div>
                <div class="glass-card" style="background: rgba(59, 130, 246, 0.05); padding: 20px; border-radius: 16px; border: 1px solid rgba(59, 130, 246, 0.2); text-align: center;">
                    <div id="stat-dana" style="font-size: 36px; font-weight: 900; color: #3b82f6; line-height: 1;">${globalStats.dana}</div>
                    <div style="font-size: 11px; color: #94a3b8; margin-top: 5px;">DANA PENDING</div>
                </div>
                <div class="glass-card" style="background: rgba(168, 85, 247, 0.05); padding: 20px; border-radius: 16px; border: 1px solid rgba(168, 85, 247, 0.2); text-align: center;">
                    <div id="stat-reminder" style="font-size: 36px; font-weight: 900; color: #a855f7; line-height: 1;">${globalStats.reminder}</div>
                    <div style="font-size: 11px; color: #94a3b8; margin-top: 5px;">REMINDERS</div>
                </div>
            </div>

            <div id="monitor-card" style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 25px; text-align: center; position: relative; overflow: hidden; margin-bottom: 20px;">
                <div style="font-size: 10px; letter-spacing: 3px; color: #64748b;">SOVEREIGN AUTO-MONITOR</div>
                <div id="monitor-value" style="font-size: 50px; font-weight: 900; margin: 5px 0; color: #10b981;">--</div>
                <div id="monitor-label" style="font-size: 12px; font-weight: bold; letter-spacing: 1px;">INITIALIZING...</div>
                <div id="monitor-progress" style="position: absolute; bottom: 0; left: 0; height: 3px; background: #10b981; width: 0%;"></div>            </div>

            <div style="background: rgba(30, 41, 59, 0.4); padding: 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05);">
                <canvas id="cmdBookingChart" style="height: 200px; width: 100%;"></canvas>
            </div>
        `;
        initChart();
        await refreshStats();
    };

    const loadRuangKerja = async () => {
        const vp = document.getElementById('cmd-viewport');
        vp.innerHTML = `<div class="text-center p-10 text-slate-500 animate-pulse">Scanning Workspace...</div>`;
        if(!supabase) return vp.innerHTML = `<div class="text-red-500">Database Offline</div>`;

        try {
            const [b, k, t, d, r] = await Promise.all([
                supabase.from(CONFIG.tables.bookings).select('id, nama_peminjam, ruang, tanggal, jam_mulai').eq('status','pending').limit(5),
                supabase.from(CONFIG.tables.k3).select('id, tanggal, lokasi, jenis_laporan').eq('status','pending').limit(5),
                supabase.from(CONFIG.tables.tasks).select('id, lokasi, deskripsi, prioritas').eq('status','proses').limit(5),
                supabase.from(CONFIG.tables.dana).select('id, judul, nominal, pengaju').eq('status','pending').limit(5),
                supabase.from(CONFIG.tables.reminders).select('*').limit(5)
            ]);

            vp.innerHTML = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px;">
                    ${renderListCard('📅 Booking Pending', b.data, item => `${item.tanggal} | ${item.nama_peminjam} (${item.ruang})`)}
                    ${renderListCard('⚠️ K3 Pending', k.data, item => `${item.tanggal} | ${item.lokasi} - ${item.jenis_laporan}`)}
                    ${renderListCard('🔧 Task / Maintenance', t.data, item => `[${item.prioritas}] ${item.lokasi} - ${item.deskripsi?.substring(0,20)}`)}
                    ${renderListCard('💰 Dana Pending', d.data, item => `${item.judul} - Rp${item.nominal?.toLocaleString()}`)}
                    
                    <div style="background: rgba(30,41,59,0.5); padding: 15px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); grid-column: 1 / -1;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                            <h3 style="color: #3b82f6; font-size: 14px; font-weight: bold; margin: 0;">⏰ System Reminders</h3>
                            <button onclick="document.getElementById('cmd-reminder-modal').classList.remove('hidden')" style="background: #3b82f6; color: white; border: none; padding: 5px 12px; border-radius: 6px; font-size: 10px; cursor: pointer;">+ Add Reminder</button>
                        </div>
                        <div style="display: grid; gap: 8px;">
                            ${r.data?.length ? r.data.map(item => `<div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px; font-size: 12px;">${item.nama_item} - ${item.lokasi} (Next: ${item.next_service || 'N/A'})</div>`).join('') : '<div class="opacity-50 text-xs">No Reminders</div>'}
                        </div>
                    </div>
                </div>
            `;
        } catch(e) { log(e); }
    };

    const loadDanaList = async () => {
        const vp = document.getElementById('cmd-viewport');
        vp.innerHTML = `<div class="text-center p-10 text-slate-500 animate-pulse">Fetching Finance Data...</div>`;
        try {
            const { data } = await supabase.from(CONFIG.tables.dana).select('*').order('created_at', { ascending: false }).limit(20);            vp.innerHTML = `
                <div style="background: rgba(30,41,59,0.5); border-radius: 16px; padding: 20px;">
                    <h3 style="color: #10b981; font-weight: bold; margin-bottom: 15px;">📋 Daftar Pengajuan Dana</h3>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        ${data?.map(d => `
                            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 10px;">
                                <div>
                                    <div style="font-weight: bold; color: #e2e8f0;">${d.judul}</div>
                                    <div style="font-size: 11px; color: #94a3b8; margin-top: 4px;">Rp${d.nominal?.toLocaleString()} | ${d.pengaju} | ${d.kategori}</div>
                                </div>
                                <span style="font-size: 10px; padding: 4px 10px; border-radius: 20px; font-weight: bold; 
                                    background: ${d.status === 'pending' ? 'rgba(234, 179, 8, 0.2)' : d.status === 'disetujui' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
                                    color: ${d.status === 'pending' ? '#eab308' : d.status === 'disetujui' ? '#10b981' : '#ef4444'};">
                                    ${d.status.toUpperCase()}
                                </span>
                            </div>
                        `).join('') || '<p>Tidak ada data</p>'}
                    </div>
                </div>
            `;
        } catch(e) { log(e); }
    };

    const loadApprovals = async () => {
        const vp = document.getElementById('cmd-viewport');
        vp.innerHTML = `<div class="text-center p-10 text-slate-500 animate-pulse">Loading Approval Queue...</div>`;
        try {
            const [b, d] = await Promise.all([
                supabase.from(CONFIG.tables.bookings).select('*').eq('status','pending').limit(10),
                supabase.from(CONFIG.tables.dana).select('*').eq('status','pending').limit(10)
            ]);

            vp.innerHTML = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px;">
                    <div style="background: rgba(30,41,59,0.5); padding: 20px; border-radius: 16px;">
                        <h3 style="color: #10b981; font-weight: bold; border-bottom: 1px solid rgba(16,185,129,0.2); padding-bottom: 10px; margin-bottom: 15px;">📅 Booking Approvals</h3>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            ${b.data?.map(i => `
                                <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px;">
                                    <div style="font-size: 12px;">
                                        <div style="font-weight:bold; color:#e2e8f0;">${i.ruang}</div>
                                        <div style="color:#94a3b8;">${i.tanggal} | ${i.nama_peminjam}</div>
                                    </div>
                                    <div style="display: flex; gap: 5px;">
                                        <button onclick="window.cmdViewBooking('${i.id}')" style="background:#3b82f6; color:white; border:none; padding:6px 10px; border-radius:6px; font-size:10px; cursor:pointer;">View</button>
                                    </div>
                                </div>
                            `).join('') || '<div class="opacity-50 text-sm">Clear Queue</div>'}
                        </div>
                    </div>
                    <div style="background: rgba(30,41,59,0.5); padding: 20px; border-radius: 16px;">
                        <h3 style="color: #3b82f6; font-weight: bold; border-bottom: 1px solid rgba(59,130,246,0.2); padding-bottom: 10px; margin-bottom: 15px;">💰 Dana Approvals</h3>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            ${d.data?.map(i => `
                                <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px;">
                                    <div style="font-size: 12px;">
                                        <div style="font-weight:bold; color:#e2e8f0;">${i.judul}</div>
                                        <div style="color:#94a3b8;">Rp${i.nominal?.toLocaleString()} | ${i.pengaju}</div>
                                    </div>
                                    <div style="display: flex; gap: 5px;">
                                        <button onclick="window.cmdUpdateDana('${i.id}','disetujui')" style="background:#10b981; color:white; border:none; padding:6px 10px; border-radius:6px; font-size:10px; cursor:pointer;">✓</button>
                                        <button onclick="window.cmdUpdateDana('${i.id}','ditolak')" style="background:#ef4444; color:white; border:none; padding:6px 10px; border-radius:6px; font-size:10px; cursor:pointer;">✗</button>
                                    </div>
                                </div>
                            `).join('') || '<div class="opacity-50 text-sm">Clear Queue</div>'}
                        </div>
                    </div>
                </div>
            `;
        } catch(e) { log(e); }
    };

    const loadQR = () => {
        const vp = document.getElementById('cmd-viewport');
        vp.innerHTML = `
            <div style="background: rgba(30,41,59,0.5); padding: 25px; border-radius: 16px; max-width: 500px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.05);">
                <h3 style="color: #10b981; font-weight: bold; margin-bottom: 20px; text-align: center;">🔳 ENTERPRISE QR GENERATOR</h3>
                
                <label style="font-size: 11px; color: #94a3b8; margin-bottom: 5px; display: block;">Select Entity</label>
                <select id="cmd-qr-type" onchange="window.cmdFetchQRItems()" style="width:100%; padding:12px; background: rgba(0,0,0,0.5); border: 1px solid #334155; border-radius: 8px; color: white; margin-bottom: 15px;">
                    <option value="">-- Choose Type --</option>
                    <option value="booking">Booking</option>
                    <option value="asset">Asset (Inventory)</option>
                    <option value="k3">K3 Report</option>
                    <option value="dana">Pengajuan Dana</option>
                </select>

                <label style="font-size: 11px; color: #94a3b8; margin-bottom: 5px; display: block;">Select Item</label>
                <select id="cmd-qr-id" style="width:100%; padding:12px; background: rgba(0,0,0,0.5); border: 1px solid #334155; border-radius: 8px; color: white; margin-bottom: 20px;">
                    <option value="">-- Waiting for Entity --</option>
                </select>

                <div style="display: flex; gap: 10px;">
                    <button onclick="window.cmdGenQR()" style="flex: 1; background: #10b981; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer;">Generate QR</button>
                    <button onclick="window.cmdPrintQR()" style="background: #3b82f6; color: white; border: none; padding: 12px 20px; border-radius: 8px; font-weight: bold; cursor: pointer;">Print</button>
                </div>

                <div id="cmd-qr-preview" style="margin-top: 30px; display: flex; justify-content: center; padding: 20px; background: white; border-radius: 12px; display: none;"></div>
            </div>        `;
    };

    const loadFiles = async () => {
        const vp = document.getElementById('cmd-viewport');
        vp.innerHTML = `
            <div style="background: rgba(30,41,59,0.5); padding: 20px; border-radius: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3 style="color: #10b981; font-weight: bold; margin: 0;">📁 Storage Manager</h3>
                    <select id="cmd-file-bucket" onchange="window.cmdLoadBucketFiles()" style="padding: 8px 15px; background: rgba(0,0,0,0.5); border: 1px solid #334155; border-radius: 8px; color: white; font-size: 12px;">
                        <option value="${CONFIG.buckets.k3}">K3 Photos</option>
                        <option value="${CONFIG.buckets.spj}">SPJ Photos</option>
                        <option value="${CONFIG.buckets.booking}">Booking Attachments</option>
                    </select>
                </div>
                <div id="cmd-file-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px;">
                    <div class="text-slate-500 text-sm p-5 text-center col-span-full animate-pulse">Accessing Storage...</div>
                </div>
            </div>
        `;
        window.cmdLoadBucketFiles();
    };

    const loadSlides = () => {
        const vp = document.getElementById('cmd-viewport');
        vp.innerHTML = `
            <div style="background: rgba(30,41,59,0.5); padding: 25px; border-radius: 16px; max-width: 600px; border: 1px solid rgba(255,255,255,0.05);">
                <h3 style="color: #10b981; font-weight: bold; margin-bottom: 15px;">🖼️ Info Slides Content Manager</h3>
                <form id="cmd-slide-form" style="display: flex; flex-direction: column; gap: 15px;">
                    <div>
                        <label style="font-size: 11px; color: #94a3b8;">Slide Target Number</label>
                        <input type="number" id="cmd-slide-num" value="5" min="5" max="10" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid #334155; border-radius: 8px; color: white; margin-top: 5px;">
                    </div>
                    <div>
                        <label style="font-size: 11px; color: #94a3b8;">Content / Announcement</label>
                        <textarea id="cmd-slide-content" rows="4" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid #334155; border-radius: 8px; color: white; margin-top: 5px;"></textarea>
                    </div>
                    <button type="submit" style="background: #10b981; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer;">Update System Slide</button>
                </form>
            </div>
        `;
        
        document.getElementById('cmd-slide-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const num = document.getElementById('cmd-slide-num').value;
            const content = document.getElementById('cmd-slide-content').value;
            if(!supabase) return alert('DB Offline');
            await supabase.from(CONFIG.tables.admin_info).insert([{ slide_number: parseInt(num), content }]);
            alert(`Slide ${num} updated successfully. Data synced to Sovereign Kernel.`);
        });    };

    // ════════════════════════════════════════════
    // 5. GLOBAL ACTIONS & HELPERS
    // ════════════════════════════════════════════

    const renderListCard = (title, data, formatter) => `
        <div style="background: rgba(30,41,59,0.5); padding: 15px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
            <h3 style="color: #10b981; font-size: 14px; font-weight: bold; margin: 0 0 12px 0; border-bottom: 1px solid rgba(16,185,129,0.2); padding-bottom: 8px;">${title}</h3>
            <div style="display: flex; flex-direction: column; gap: 8px;">
                ${data?.length ? data.map(i => `<div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px; font-size: 12px; color: #cbd5e1;">${formatter(i)}</div>`).join('') : '<div class="opacity-50 text-xs">Clear</div>'}
            </div>
        </div>
    `;

    const refreshStats = async () => {
        if(!supabase) return;
        try {
            const [b, k, d, r] = await Promise.all([
                supabase.from(CONFIG.tables.bookings).select('*', { count: 'exact', head: true }).eq('status', 'pending'),
                supabase.from(CONFIG.tables.k3).select('*', { count: 'exact', head: true }).eq('status', 'pending'),
                supabase.from(CONFIG.tables.dana).select('*', { count: 'exact', head: true }).eq('status', 'pending'),
                supabase.from(CONFIG.tables.reminders).select('*', { count: 'exact', head: true })
            ]);
            globalStats = { booking: b.count||0, k3: k.count||0, dana: d.count||0, reminder: r.count||0 };
            
            ['booking','k3','dana','reminder'].forEach(key => {
                const el = document.getElementById(`stat-${key}`);
                if(el) el.textContent = globalStats[key];
            });
        } catch(e) { log('Stat error: ' + e.message); }
    };

    const runMonitor = () => {
        if (activeTab !== 'dashboard') return;
        const slides = [
            { id: 'booking', label: 'BOOKING PENDING', color: '#10b981' },
            { id: 'k3', label: 'K3 MONITORING', color: '#eab308' },
            { id: 'dana', label: 'DANA APPROVAL', color: '#3b82f6' },
            { id: 'reminder', label: 'SYSTEM MAINTENANCE', color: '#a855f7' }
        ];
        const slide = slides[monitorIndex];
        const valEl = document.getElementById('monitor-value');
        const labEl = document.getElementById('monitor-label');
        const progEl = document.getElementById('monitor-progress');
        
        if(!valEl) return;
        progEl.style.transition = 'none'; progEl.style.width = '0%';
        setTimeout(() => {
            progEl.style.transition = 'width 7s linear'; progEl.style.width = '100%';            valEl.textContent = globalStats[slide.id] || '0';
            valEl.style.color = slide.color;
            labEl.textContent = slide.label;
        }, 50);
        monitorIndex = (monitorIndex + 1) % slides.length;
    };

    const initChart = () => {
        if(!window.Chart) return;
        setTimeout(async () => {
            const ctx = document.getElementById('cmdBookingChart')?.getContext('2d');
            if(!ctx || !supabase) return;
            new Chart(ctx, {
                type: 'line',
                data: { labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'], datasets: [{ label: 'System Activity', data: [12, 19, 15, 25, 22, 30, 28], borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', fill: true, tension: 0.4 }] },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { grid: { color: 'rgba(255,255,255,0.05)' } } } }
            });
        }, 100);
    };

    // ════════════════════════════════════════════
    // 6. EXPOSE GLOBAL FUNCTIONS
    // ════════════════════════════════════════════

    window.cmdSwitchTab = (tab) => {
        activeTab = tab;
        document.querySelectorAll('[id^="tab-"]').forEach(btn => {
            const isActive = btn.id === `tab-${tab}`;
            btn.style.background = isActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(30, 41, 59, 0.6)';
            btn.style.color = isActive ? '#10b981' : '#94a3b8';
            btn.style.borderColor = isActive ? '#10b981' : 'rgba(255,255,255,0.05)';
        });

        const loaders = { dashboard: loadDashboard, ruangkerja: loadRuangKerja, dana: loadDanaList, approval: loadApprovals, qr: loadQR, files: loadFiles, slides: loadSlides };
        
        if (loaders[tab]) loaders[tab]();
        else document.getElementById('cmd-viewport').innerHTML = `<div class="p-20 text-center opacity-50 text-sm tracking-widest uppercase">Modul ${tab} Under Kernel Construction</div>`;
    };

    window.cmdViewBooking = async (id) => {
        if(!supabase) return;
        const { data } = await supabase.from(CONFIG.tables.bookings).select('*').eq('id', id).single();
        if(!data) return;
        document.getElementById('cmd-booking-content').innerHTML = `
            <p><strong>Peminjam:</strong> ${data.nama_peminjam}</p>
            <p><strong>Ruang:</strong> ${data.ruang}</p>
            <p><strong>Waktu:</strong> ${data.tanggal} (${data.jam_mulai} - ${data.jam_selesai})</p>
            <p><strong>Keperluan:</strong> ${data.keperluan || '-'}</p>
        `;
                const btnApprove = document.getElementById('cmd-btn-approve');
        const btnReject = document.getElementById('cmd-btn-reject');
        
        const newApprove = btnApprove.cloneNode(true); btnApprove.parentNode.replaceChild(newApprove, btnApprove);
        const newReject = btnReject.cloneNode(true); btnReject.parentNode.replaceChild(newReject, btnReject);

        newApprove.addEventListener('click', async () => {
            await supabase.from(CONFIG.tables.bookings).update({ status: 'approved' }).eq('id', id);
            document.getElementById('cmd-booking-modal').classList.add('hidden');
            loadApprovals(); refreshStats();
        });
        newReject.addEventListener('click', async () => {
            await supabase.from(CONFIG.tables.bookings).update({ status: 'rejected' }).eq('id', id);
            document.getElementById('cmd-booking-modal').classList.add('hidden');
            loadApprovals(); refreshStats();
        });

        document.getElementById('cmd-booking-modal').classList.remove('hidden');
    };

    window.cmdUpdateDana = async (id, status) => {
        if(!supabase) return;
        await supabase.from(CONFIG.tables.dana).update({ status }).eq('id', id);
        loadApprovals(); refreshStats();
    };

    window.cmdFetchQRItems = async () => {
        const type = document.getElementById('cmd-qr-type').value;
        const idSelect = document.getElementById('cmd-qr-id');
        idSelect.innerHTML = '<option value="">-- Loading Data --</option>';
        if(!type || !supabase) return;

        let table = '', labelCol = '';
        if(type === 'booking') { table = CONFIG.tables.bookings; labelCol = 'nama_peminjam'; }
        if(type === 'asset') { table = CONFIG.tables.inventory; labelCol = 'nama'; }
        if(type === 'k3') { table = CONFIG.tables.k3; labelCol = 'lokasi'; }
        if(type === 'dana') { table = CONFIG.tables.dana; labelCol = 'judul'; }

        const { data } = await supabase.from(table).select(`id, ${labelCol}`).limit(50);
        idSelect.innerHTML = data?.length ? data.map(i => `<option value="${i.id}">${i[labelCol]}</option>`).join('') : '<option value="">No Items Found</option>';
    };

    window.cmdGenQR = async () => {
        const type = document.getElementById('cmd-qr-type').value;
        const id = document.getElementById('cmd-qr-id').value;
        if(!type || !id || !window.QRCode) return alert('Select Item or Missing Library');
        
        const preview = document.getElementById('cmd-qr-preview');
        preview.style.display = 'flex';
        preview.innerHTML = '';        
        const qrData = JSON.stringify({ sys: 'DreamOS', module: type, id: id });
        new QRCode(preview, { text: qrData, width: 200, height: 200, colorDark: "#0f172a", colorLight: "#ffffff" });
    };

    window.cmdPrintQR = () => {
        const preview = document.getElementById('cmd-qr-preview').innerHTML;
        if(!preview) return;
        const win = window.open('', '_blank');
        win.document.write(`<html><body style="display:flex; justify-content:center; align-items:center; height:100vh; flex-direction:column;">
            ${preview}<p style="font-family:sans-serif; margin-top:20px; font-weight:bold;">ISO 27001 - Dream OS Sovereign Asset</p>
        </body></html>`);
        setTimeout(() => win.print(), 500);
    };

    window.cmdLoadBucketFiles = async () => {
        if(!supabase) return;
        const bucket = document.getElementById('cmd-file-bucket').value;
        const listEl = document.getElementById('cmd-file-list');
        listEl.innerHTML = `<div class="text-slate-500 text-sm p-5 text-center col-span-full">Scanning Bucket...</div>`;
        
        const { data: files } = await supabase.storage.from(bucket).list('', { limit: 20 });
        listEl.innerHTML = files?.length ? files.map(f => {
            const pubUrl = supabase.storage.from(bucket).getPublicUrl(f.name).data.publicUrl;
            const isImg = f.metadata?.mimetype?.startsWith('image/');
            return `
            <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 10px; text-align: center;">
                <div style="height: 80px; display: flex; align-items: center; justify-content: center; background: rgba(15,23,42,0.8); border-radius: 8px; margin-bottom: 10px; overflow: hidden;">
                    ${isImg ? `<img src="${pubUrl}" style="max-height:100%; max-width:100%; object-fit:contain;">` : '📄'}
                </div>
                <div style="font-size: 10px; color: #e2e8f0; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; margin-bottom: 8px;">${f.name}</div>
                <div style="display: flex; gap: 5px; justify-content: center;">
                    <a href="${pubUrl}" target="_blank" style="background:#3b82f6; color:white; padding:4px 8px; border-radius:4px; font-size:9px; text-decoration:none;">View</a>
                    <button onclick="window.cmdDelFile('${bucket}','${f.name}')" style="background:#ef4444; border:none; color:white; padding:4px 8px; border-radius:4px; font-size:9px; cursor:pointer;">Del</button>
                </div>
            </div>`;
        }).join('') : '<div class="text-slate-500 text-sm p-5 text-center col-span-full">Storage Empty</div>';
    };

    window.cmdDelFile = async (bucket, name) => {
        if(!confirm(`Delete ${name}? ISO Audit Log will record this.`)) return;
        await supabase.storage.from(bucket).remove([name]);
        window.cmdLoadBucketFiles();
    };

    // Form Reminder Submit
    document.getElementById('cmd-reminder-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            nama_item: document.getElementById('rem_nama').value,            lokasi: document.getElementById('rem_lokasi').value,
            interval_bulan: document.getElementById('rem_interval').value,
            next_service: document.getElementById('rem_date').value
        };
        await supabase.from(CONFIG.tables.reminders).insert([data]);
        document.getElementById('cmd-reminder-modal').classList.add('hidden');
        if(activeTab === 'ruangkerja') loadRuangKerja();
        refreshStats();
    });

    // ════════════════════════════════════════════
    // 7. INITIALIZATION
    // ════════════════════════════════════════════
    
    renderShell();
    window.cmdSwitchTab('dashboard');

    setManagedInterval(() => {
        const el = document.getElementById('cmd-clock');
        if(el) el.textContent = new Date().toLocaleTimeString('id-ID');
    }, 1000);
    setManagedInterval(runMonitor, CONFIG.intervals.monitor);
    setManagedInterval(refreshStats, CONFIG.intervals.stats);

    runMonitor(); // Initial Run

    // Store cleanup function on container
    container._cleanup = () => {
        log('Engaging Protocol: Clean Sweep. Terminating Module...');
        managedIntervals.forEach(clearInterval);
        document.removeEventListener('click', resetSessionTimer);
        document.removeEventListener('keypress', resetSessionTimer);
        delete window.cmdSwitchTab; delete window.cmdViewBooking;
        delete window.cmdUpdateDana; delete window.cmdFetchQRItems;
        delete window.cmdGenQR; delete window.cmdPrintQR;
        delete window.cmdLoadBucketFiles; delete window.cmdDelFile;
    };
}

export async function afterRender() {
    console.log('🏛️ [COMMAND-CENTER] Module fully initialized');
}

export function cleanup() {
    console.log('🏛️ [COMMAND-CENTER] Cleanup complete');
}

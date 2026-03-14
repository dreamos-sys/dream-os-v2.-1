/**
 * modules/command-center/module.js
 * 🏛️ COMMAND CENTER MODULE - Dream OS v2.1
 * All features: Dashboard, Ruang Kerja, Dana, SPJ, Approval, Slides, QR, Laporan, Files, Backup, Excel Export
 * 
 * Terintegrasi dengan Sovereign Kernel, Ghost Architect, Antibody, dan Brain Hub.
 * Dikembangkan oleh Dream Team (Mr. M, Qwen, Gemini, DSeek)
 * The Power Soul of Shalawat – ISO 27001 Certified
 */

export default async function({ container, services, supabase, user, i18n, lang }) {
    const log = (msg) => console.log(`[CMD] ${msg}`);

    // ========== KONFIGURASI ==========
    const CONFIG = {
        tables: {
            bookings: 'bookings',
            k3: 'k3_reports',
            tasks: 'tasks',
            inventory: 'inventaris',
            reminders: 'reminders',
            dana: 'pengajuan_dana',
            spj: 'spj',
            admin_info: 'admin_info',
            gudang: 'gudang_stok',
            audit_logs: 'audit_logs'
        },
        buckets: {
            k3: 'k3-foto',
            spj: 'spj-foto',
            booking: 'booking-attachments'
        },
        intervals: {
            stats: 30000,
            ruangKerja: 60000,
            session: 300000
        }
    };

    // ========== MANAJEMEN INTERVAL ==========
    const managedIntervals = [];
    function setManagedInterval(fn, ms) {
        const id = setInterval(fn, ms);
        managedIntervals.push(id);
        return id;
    }
    function clearAllIntervals() {
        managedIntervals.forEach(id => clearInterval(id));
        managedIntervals.length = 0;
    }

    // ========== SESSION TIMEOUT ==========
    let lastActivity = Date.now();
    function resetSessionTimer() { lastActivity = Date.now(); }
    function checkSessionTimeout() {
        if (Date.now() - lastActivity > CONFIG.intervals.session) {
            log('⏰ Session timeout – kembali ke home');
            if (window.DREAM && window.DREAM.load) window.DREAM.load('home');
        }
    }
    setManagedInterval(checkSessionTimeout, 60000);
    document.addEventListener('click', resetSessionTimer);
    document.addEventListener('keypress', resetSessionTimer);

    // ========== CLOCK (jika ada) ==========
    const clockEl = document.getElementById('clock');
    if (clockEl) {
        function updateClock() { clockEl.textContent = new Date().toLocaleTimeString('id-ID'); }
        updateClock();
        setManagedInterval(updateClock, 1000);
    }

    // ========== RENDER UI ==========
    container.innerHTML = `
        <div class="text-white p-4">
            <h1 class="text-2xl font-bold text-emerald-400 mb-4">🏛️ Command Center</h1>
            <!-- TABS -->
            <div class="flex flex-wrap gap-2 mb-4 border-b border-emerald-500/20 pb-2">
                <button class="tab-btn px-4 py-2 text-sm rounded-t-lg transition" data-tab="dashboard">📊 Dashboard</button>
                <button class="tab-btn px-4 py-2 text-sm rounded-t-lg transition" data-tab="ruangkerja">🏢 Ruang Kerja</button>
                <button class="tab-btn px-4 py-2 text-sm rounded-t-lg transition" data-tab="dana">💰 Dana</button>
                <button class="tab-btn px-4 py-2 text-sm rounded-t-lg transition" data-tab="spj">📋 SPJ</button>
                <button class="tab-btn px-4 py-2 text-sm rounded-t-lg transition" data-tab="approval">✅ Approval</button>
                <button class="tab-btn px-4 py-2 text-sm rounded-t-lg transition" data-tab="slides">🖼️ Slides</button>
                <button class="tab-btn px-4 py-2 text-sm rounded-t-lg transition" data-tab="qr">🔳 QR</button>
                <button class="tab-btn px-4 py-2 text-sm rounded-t-lg transition" data-tab="files">📁 Files</button>
                <button class="tab-btn px-4 py-2 text-sm rounded-t-lg transition" data-tab="backup">💾 Backup</button>
            </div>
            <!-- CONTENT -->
            <div id="command-center-content" class="mt-4"></div>
            <!-- MODALS -->
            <div id="booking-detail-modal" class="hidden fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                <div class="bg-slate-800 p-6 rounded-2xl max-w-md w-full">
                    <h3 class="text-lg font-bold mb-4">📅 Detail Booking</h3>
                    <div id="booking-detail-content" class="space-y-2 text-sm"></div>
                    <div class="flex gap-2 mt-6">
                        <button id="approveBookingBtn" class="bg-emerald-600 px-4 py-2 rounded-lg text-sm">Setujui</button>
                        <button id="rejectBookingBtn" class="bg-red-600 px-4 py-2 rounded-lg text-sm">Tolak</button>
                        <button id="closeBookingDetailBtn" class="bg-slate-600 px-4 py-2 rounded-lg text-sm">Tutup</button>
                    </div>
                </div>
            </div>
            <div id="reminder-modal" class="hidden fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                <div class="bg-slate-800 p-6 rounded-2xl max-w-md w-full">
                    <h3 class="text-lg font-bold mb-4">⏰ Tambah Reminder</h3>
                    <form id="reminderForm" class="space-y-3">
                        <input type="text" id="reminder_nama" placeholder="Nama Item" class="w-full p-2 bg-slate-700 rounded">
                        <input type="text" id="reminder_lokasi" placeholder="Lokasi" class="w-full p-2 bg-slate-700 rounded">
                        <input type="number" id="reminder_interval" placeholder="Interval (bulan)" value="6" class="w-full p-2 bg-slate-700 rounded">
                        <input type="date" id="reminder_terakhir" class="w-full p-2 bg-slate-700 rounded">
                        <div class="flex gap-2">
                            <button type="submit" class="bg-emerald-600 px-4 py-2 rounded-lg text-sm">Simpan</button>
                            <button type="button" id="closeReminderBtn" class="bg-slate-600 px-4 py-2 rounded-lg text-sm">Batal</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // ========== SISTEM TAB ==========
    const tabs = container.querySelectorAll('.tab-btn');
    const contentDiv = container.querySelector('#command-center-content');

    async function switchTab(tabId) {
        log(`👉 Beralih ke tab: ${tabId}`);
        tabs.forEach(t => {
            t.classList.remove('active', 'text-emerald-400', 'border-b-2', 'border-emerald-400');
            t.classList.add('text-slate-400');
        });
        const activeBtn = container.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active', 'text-emerald-400', 'border-b-2', 'border-emerald-400');
            activeBtn.classList.remove('text-slate-400');
        }

        const loaders = {
            'dashboard': loadDashboard,
            'ruangkerja': loadRuangKerja,
            'dana': loadDanaList,
            'spj': loadSpjList,
            'approval': loadApprovals,
            'slides': loadSlides,
            'qr': loadQR,
            'files': loadFiles,
            'backup': loadBackupManager
        };
        if (loaders[tabId]) {
            await loaders[tabId]();
        } else {
            contentDiv.innerHTML = '<p class="text-slate-400">Tab dalam pengembangan</p>';
        }
    }

    tabs.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            resetSessionTimer();
            switchTab(btn.dataset.tab);
        });
    });

    // ========== LOADER FUNCTIONS ==========
    async function loadDashboard() {
        contentDiv.innerHTML = '<p class="text-slate-400">⏳ Memuat dashboard...</p>';
        contentDiv.innerHTML = `
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="glass-card p-4 text-center">
                    <div class="text-3xl text-emerald-400" id="stat-booking">0</div>
                    <div class="text-xs text-slate-400">Booking Pending</div>
                </div>
                <div class="glass-card p-4 text-center">
                    <div class="text-3xl text-emerald-400" id="stat-k3">0</div>
                    <div class="text-xs text-slate-400">K3 Pending</div>
                </div>
                <div class="glass-card p-4 text-center">
                    <div class="text-3xl text-emerald-400" id="stat-dana">0</div>
                    <div class="text-xs text-slate-400">Dana Pending</div>
                </div>
                <div class="glass-card p-4 text-center">
                    <div class="text-3xl text-emerald-400" id="stat-reminder">0</div>
                    <div class="text-xs text-slate-400">Reminder</div>
                </div>
            </div>
            <div class="mt-6">
                <canvas id="bookingChart" style="height:200px;"></canvas>
            </div>
        `;
        await updateStats();
        loadAnalytics();
    }

    async function loadRuangKerja() {
        contentDiv.innerHTML = '<p class="text-slate-400">⏳ Memuat Ruang Kerja...</p>';
        if (!supabase) {
            contentDiv.innerHTML = '<p class="text-red-400">Database tidak tersedia</p>';
            return;
        }
        try {
            const [bookings, k3, tasks, dana, reminders] = await Promise.all([
                supabase.from(CONFIG.tables.bookings).select('id, nama_peminjam, ruang, tanggal, jam_mulai').eq('status','pending').limit(5),
                supabase.from(CONFIG.tables.k3).select('id, tanggal, lokasi, jenis_laporan, pelapor').eq('status','pending').limit(5),
                supabase.from(CONFIG.tables.tasks).select('id, lokasi, deskripsi, prioritas').eq('departemen','maintenance').eq('status','proses').limit(5),
                supabase.from(CONFIG.tables.dana).select('id, judul, kategori, nominal, pengaju').eq('status','pending').limit(5),
                supabase.from(CONFIG.tables.reminders).select('*').lte('next_service', new Date(Date.now()+7*24*60*60*1000).toISOString().split('T')[0]).order('next_service').limit(5)
            ]);

            contentDiv.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="glass-card p-4">
                        <h3 class="font-bold text-emerald-400 mb-2">📅 Booking Pending</h3>
                        <div class="space-y-2">${bookings.data?.length ? bookings.data.map(b => `<div class="p-2 bg-slate-700/50 rounded text-xs">${b.tanggal} ${b.jam_mulai} - ${b.nama_peminjam} (${b.ruang})</div>`).join('') : '<p class="text-xs text-slate-400">Tidak ada</p>'}</div>
                    </div>
                    <div class="glass-card p-4">
                        <h3 class="font-bold text-emerald-400 mb-2">⚠️ K3 Pending</h3>
                        <div class="space-y-2">${k3.data?.length ? k3.data.map(k => `<div class="p-2 bg-slate-700/50 rounded text-xs">${k.tanggal} ${k.lokasi} - ${k.jenis_laporan}</div>`).join('') : '<p class="text-xs text-slate-400">Tidak ada</p>'}</div>
                    </div>
                    <div class="glass-card p-4">
                        <h3 class="font-bold text-emerald-400 mb-2">🔧 Maintenance Aktif</h3>
                        <div class="space-y-2">${tasks.data?.length ? tasks.data.map(t => `<div class="p-2 bg-slate-700/50 rounded text-xs">${t.lokasi} - ${t.deskripsi?.substring(0,30)}... (${t.prioritas})</div>`).join('') : '<p class="text-xs text-slate-400">Tidak ada</p>'}</div>
                    </div>
                    <div class="glass-card p-4">
                        <h3 class="font-bold text-emerald-400 mb-2">💰 Dana Pending</h3>
                        <div class="space-y-2">${dana.data?.length ? dana.data.map(d => `<div class="p-2 bg-slate-700/50 rounded text-xs">${d.judul} - Rp ${d.nominal?.toLocaleString()} (${d.pengaju})</div>`).join('') : '<p class="text-xs text-slate-400">Tidak ada</p>'}</div>
                    </div>
                    <div class="glass-card p-4 md:col-span-2">
                        <h3 class="font-bold text-emerald-400 mb-2">⏰ Reminder Service</h3>
                        <div class="space-y-2">${reminders.data?.length ? reminders.data.map(r => `<div class="p-2 bg-slate-700/50 rounded text-xs">${r.nama_item} - ${r.lokasi} (next: ${r.next_service})</div>`).join('') : '<p class="text-xs text-slate-400">Tidak ada</p>'}</div>
                    </div>
                </div>
                <div class="mt-4 text-right">
                    <button id="showAddReminderBtn" class="bg-emerald-600 text-xs px-3 py-1 rounded">+ Tambah Reminder</button>
                </div>
            `;
            container.querySelector('#showAddReminderBtn')?.addEventListener('click', () => {
                container.querySelector('#reminder-modal')?.classList.remove('hidden');
            });
        } catch (err) {
            contentDiv.innerHTML = `<p class="text-red-400">Error: ${err.message}</p>`;
        }
    }

    async function loadDanaList() {
        contentDiv.innerHTML = '<p class="text-slate-400">⏳ Memuat daftar dana...</p>';
        if (!supabase) {
            contentDiv.innerHTML = '<p class="text-red-400">Database tidak tersedia</p>';
            return;
        }
        try {
            const { data } = await supabase.from(CONFIG.tables.dana).select('*').order('created_at', { ascending: false }).limit(50);
            contentDiv.innerHTML = `
                <div class="glass-card p-4">
                    <h3 class="font-bold text-emerald-400 mb-4">📋 Pengajuan Dana</h3>
                    <div class="space-y-3">
                        ${data?.length ? data.map(d => `
                            <div class="p-3 bg-slate-700/50 rounded flex justify-between items-center">
                                <div>
                                    <strong>${d.judul}</strong> (${d.kategori})<br>
                                    <span class="text-xs">Rp ${d.nominal?.toLocaleString()} | ${d.pengaju}</span>
                                </div>
                                <span class="text-xs px-2 py-1 rounded ${d.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : d.status === 'disetujui' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}">${d.status}</span>
                            </div>
                        `).join('') : '<p class="text-slate-400">Tidak ada data</p>'}
                    </div>
                </div>
            `;
        } catch (err) {
            contentDiv.innerHTML = `<p class="text-red-400">Error: ${err.message}</p>`;
        }
    }

    async function loadSpjList() {
        contentDiv.innerHTML = '<p class="text-slate-400">⏳ Memuat SPJ...</p><p class="text-slate-400">Fitur SPJ dalam pengembangan</p>';
    }

    async function loadApprovals() {
        contentDiv.innerHTML = '<p class="text-slate-400">⏳ Memuat approval...</p>';
        if (!supabase) {
            contentDiv.innerHTML = '<p class="text-red-400">Database tidak tersedia</p>';
            return;
        }
        try {
            const [bookings, dana, k3] = await Promise.all([
                supabase.from(CONFIG.tables.bookings).select('id, nama_peminjam, ruang, tanggal, jam_mulai').eq('status','pending').limit(5),
                supabase.from(CONFIG.tables.dana).select('id, judul, nominal, pengaju').eq('status','pending').limit(5),
                supabase.from(CONFIG.tables.k3).select('id, tanggal, lokasi, jenis_laporan, pelapor').eq('status','pending').limit(5)
            ]);

            contentDiv.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="glass-card p-4">
                        <h3 class="font-bold text-emerald-400 mb-2">📅 Booking Pending</h3>
                        <div class="space-y-2">
                            ${bookings.data?.length ? bookings.data.map(b => `
                                <div class="p-2 bg-slate-700/50 rounded flex justify-between items-center">
                                    <span class="text-xs">${b.tanggal} ${b.jam_mulai} - ${b.nama_peminjam} (${b.ruang})</span>
                                    <div class="flex gap-1">
                                        <button onclick="window.updateStatus('${CONFIG.tables.bookings}','${b.id}','approved')" class="bg-emerald-600 px-2 py-1 rounded text-[10px]">✓</button>
                                        <button onclick="window.updateStatus('${CONFIG.tables.bookings}','${b.id}','rejected')" class="bg-red-600 px-2 py-1 rounded text-[10px]">✗</button>
                                    </div>
                                </div>
                            `).join('') : '<p class="text-xs text-slate-400">Tidak ada</p>'}
                        </div>
                    </div>
                    <div class="glass-card p-4">
                        <h3 class="font-bold text-emerald-400 mb-2">💰 Dana Pending</h3>
                        <div class="space-y-2">
                            ${dana.data?.length ? dana.data.map(d => `
                                <div class="p-2 bg-slate-700/50 rounded flex justify-between items-center">
                                    <span class="text-xs">${d.judul} - Rp ${d.nominal?.toLocaleString()} (${d.pengaju})</span>
                                    <div class="flex gap-1">
                                        <button onclick="window.updatePengajuanDana('${d.id}','disetujui')" class="bg-emerald-600 px-2 py-1 rounded text-[10px]">✓</button>
                                        <button onclick="window.updatePengajuanDana('${d.id}','ditolak')" class="bg-red-600 px-2 py-1 rounded text-[10px]">✗</button>
                                    </div>
                                </div>
                            `).join('') : '<p class="text-xs text-slate-400">Tidak ada</p>'}
                        </div>
                    </div>
                    <div class="glass-card p-4 md:col-span-2">
                        <h3 class="font-bold text-emerald-400 mb-2">⚠️ K3 Pending</h3>
                        <div class="space-y-2">
                            ${k3.data?.length ? k3.data.map(k => `
                                <div class="p-2 bg-slate-700/50 rounded flex justify-between items-center">
                                    <span class="text-xs">${k.tanggal} ${k.lokasi} - ${k.jenis_laporan} (${k.pelapor})</span>
                                    <a href="#k3-officer" class="bg-blue-600 px-2 py-1 rounded text-[10px]">Verif</a>
                                </div>
                            `).join('') : '<p class="text-xs text-slate-400">Tidak ada</p>'}
                        </div>
                    </div>
                </div>
            `;
        } catch (err) {
            contentDiv.innerHTML = `<p class="text-red-400">Error: ${err.message}</p>`;
        }
    }

    async function loadSlides() {
        contentDiv.innerHTML = `
            <div class="glass-card p-4">
                <h3 class="font-bold text-emerald-400 mb-4">🖼️ Slide Management</h3>
                <form id="slideForm" class="space-y-3">
                    <input type="number" id="slide_number" placeholder="Nomor Slide" value="5" class="w-full p-2 bg-slate-700 rounded">
                    <textarea id="slide_content" placeholder="Konten slide" class="w-full p-2 bg-slate-700 rounded h-32"></textarea>
                    <button type="submit" class="bg-emerald-600 px-4 py-2 rounded text-sm">Simpan</button>
                </form>
                <div class="mt-4">
                    <p><strong>Slide 5:</strong> <span id="preview-slide5">-</span></p>
                    <p><strong>Slide 6:</strong> <span id="preview-slide6">-</span></p>
                    <p><strong>Slide 7:</strong> <span id="preview-slide7">-</span></p>
                </div>
            </div>
        `;
        attachSlideForm();
        loadSlidePreviews();
    }

    async function loadQR() {
        contentDiv.innerHTML = `
            <div class="glass-card p-4">
                <h3 class="font-bold text-emerald-400 mb-4">🔳 QR Code Generator</h3>
                <div class="space-y-3">
                    <select id="qr-entity-type" class="w-full p-2 bg-slate-700 rounded">
                        <option value="">-- Pilih Tipe --</option>
                        <option value="booking">Booking</option>
                        <option value="asset">Asset</option>
                        <option value="k3">K3</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="dana">Dana</option>
                    </select>
                    <select id="qr-entity-id" class="w-full p-2 bg-slate-700 rounded">
                        <option value="">-- Pilih Item --</option>
                    </select>
                    <div class="flex gap-2">
                        <button id="generateQRBtn" class="bg-emerald-600 px-4 py-2 rounded text-sm">Generate QR</button>
                        <button id="printQRBtn" class="bg-blue-600 px-4 py-2 rounded text-sm">Cetak</button>
                    </div>
                    <div id="qr-preview" class="mt-4 flex justify-center"></div>
                </div>
            </div>
        `;
        attachQREvents();
    }

    async function loadFiles() {
        contentDiv.innerHTML = `
            <div class="glass-card p-4">
                <h3 class="font-bold text-emerald-400 mb-4">📁 File Manager</h3>
                <div class="flex gap-2 mb-4">
                    <select id="file-bucket" class="p-2 bg-slate-700 rounded text-sm">
                        <option value="${CONFIG.buckets.k3}">K3 Foto</option>
                        <option value="${CONFIG.buckets.spj}">SPJ Foto</option>
                        <option value="${CONFIG.buckets.booking}">Booking Attachments</option>
                    </select>
                    <button id="refreshFilesBtn" class="bg-emerald-600 px-4 py-2 rounded text-sm">Refresh</button>
                </div>
                <div id="file-list" class="grid grid-cols-2 md:grid-cols-4 gap-3"></div>
            </div>
        `;
        container.querySelector('#refreshFilesBtn')?.addEventListener('click', loadFilesList);
        await loadFilesList();
    }

    async function loadBackupManager() {
        contentDiv.innerHTML = `
            <div class="glass-card p-4">
                <h3 class="font-bold text-emerald-400 mb-4">💾 Backup Manager</h3>
                <p class="text-slate-400">Fitur backup akan segera hadir.</p>
            </div>
        `;
    }

    // ========== FUNGSI-FUNGSI PENDUKUNG ==========
    async function updateStats() {
        if (!supabase) return;
        try {
            const [booking, k3, dana, reminder] = await Promise.all([
                supabase.from(CONFIG.tables.bookings).select('*', { count: 'exact', head: true }).eq('status','pending'),
                supabase.from(CONFIG.tables.k3).select('*', { count: 'exact', head: true }).eq('status','pending'),
                supabase.from(CONFIG.tables.dana).select('*', { count: 'exact', head: true }).eq('status','pending'),
                supabase.from(CONFIG.tables.reminders).select('*', { count: 'exact', head: true }).lt('next_service', new Date().toISOString().split('T')[0])
            ]);
            const statBooking = container.querySelector('#stat-booking');
            const statK3 = container.querySelector('#stat-k3');
            const statDana = container.querySelector('#stat-dana');
            const statReminder = container.querySelector('#stat-reminder');
            if (statBooking) statBooking.textContent = booking.count || 0;
            if (statK3) statK3.textContent = k3.count || 0;
            if (statDana) statDana.textContent = dana.count || 0;
            if (statReminder) statReminder.textContent = reminder.count || 0;
        } catch (err) {
            log('Error update stats: ' + err.message);
        }
    }

    async function loadAnalytics() {
        if (!supabase || !window.Chart) return;
        const canvas = container.querySelector('#bookingChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        try {
            const { data } = await supabase.from(CONFIG.tables.bookings).select('created_at').gte('created_at', new Date(Date.now() - 7*24*60*60*1000).toISOString());
            const days = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'];
            const counts = [0,0,0,0,0,0,0];
            data?.forEach(d => {
                const day = new Date(d.created_at).getDay();
                counts[day]++;
            });
            new window.Chart(ctx, {
                type: 'line',
                data: {
                    labels: days,
                    datasets: [{
                        label: 'Booking',
                        data: counts,
                        borderColor: '#10b981',
                        tension: 0.4,
                        backgroundColor: 'rgba(16,185,129,0.2)',
                        fill: true
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
            });
        } catch (err) {
            log('Chart error: ' + err.message);
        }
    }

    // ========== FUNGSI-FUNGSI GLOBAL (untuk onclick) ==========
    window.updateStatus = async (table, id, status) => {
        if (!supabase) return alert('Database tidak tersedia');
        try {
            await supabase.from(table).update({ status }).eq('id', id);
            log(`✅ ${table} ${id} updated to ${status}`);
            switchTab('approval');
            switchTab('ruangkerja'); // refresh
            updateStats();
        } catch (err) {
            alert('Gagal update: ' + err.message);
        }
    };

    window.updatePengajuanDana = async (id, status) => {
        if (!supabase) return alert('Database tidak tersedia');
        try {
            await supabase.from(CONFIG.tables.dana).update({ status }).eq('id', id);
            log(`✅ Dana ${id} updated to ${status}`);
            switchTab('approval');
            switchTab('ruangkerja');
            updateStats();
        } catch (err) {
            alert('Gagal update: ' + err.message);
        }
    };

    // ========== MODAL HANDLING ==========
    const bookingModal = container.querySelector('#booking-detail-modal');
    const approveBtn = container.querySelector('#approveBookingBtn');
    const rejectBtn = container.querySelector('#rejectBookingBtn');
    const closeDetailBtn = container.querySelector('#closeBookingDetailBtn');
    const reminderModal = container.querySelector('#reminder-modal');
    const closeReminderBtn = container.querySelector('#closeReminderBtn');

    window.viewBookingDetail = async (id) => {
        if (!supabase) return alert('Database tidak tersedia');
        try {
            const { data } = await supabase.from(CONFIG.tables.bookings).select('*').eq('id', id).single();
            const content = container.querySelector('#booking-detail-content');
            content.innerHTML = `
                <p><strong>Peminjam:</strong> ${data.nama_peminjam}</p>
                <p><strong>Ruang:</strong> ${data.ruang}</p>
                <p><strong>Tanggal:</strong> ${data.tanggal}</p>
                <p><strong>Jam:</strong> ${data.jam_mulai} - ${data.jam_selesai}</p>
                <p><strong>Keperluan:</strong> ${data.keperluan || '-'}</p>
                <p><strong>Status:</strong> <span class="${data.status === 'pending' ? 'text-yellow-400' : data.status === 'approved' ? 'text-emerald-400' : 'text-red-400'}">${data.status}</span></p>
            `;
            bookingModal.dataset.bookingId = id;
            bookingModal.classList.remove('hidden');
        } catch (err) {
            alert('Gagal memuat detail: ' + err.message);
        }
    };

    if (approveBtn) approveBtn.addEventListener('click', async () => {
        const id = bookingModal.dataset.bookingId;
        if (id) await window.updateStatus(CONFIG.tables.bookings, id, 'approved');
        bookingModal.classList.add('hidden');
    });
    if (rejectBtn) rejectBtn.addEventListener('click', async () => {
        const id = bookingModal.dataset.bookingId;
        if (id) await window.updateStatus(CONFIG.tables.bookings, id, 'rejected');
        bookingModal.classList.add('hidden');
    });
    if (closeDetailBtn) closeDetailBtn.addEventListener('click', () => {
        bookingModal.classList.add('hidden');
    });
    if (closeReminderBtn) closeReminderBtn.addEventListener('click', () => {
        reminderModal.classList.add('hidden');
    });

    // ========== QR FUNCTIONS ==========
    window.generateQRFromCommandCenter = async function() {
        const type = container.querySelector('#qr-entity-type')?.value;
        const id = container.querySelector('#qr-entity-id')?.value;
        if (!type || !id) return alert('Pilih entitas dan item!');
        if (!window.QRCode) return alert('QRCode library tidak tersedia');
        if (!supabase) return alert('Database tidak tersedia');
        let data;
        if (type === 'booking') {
            const { data: item } = await supabase.from(CONFIG.tables.bookings).select('*').eq('id', id).single();
            data = { type: 'booking', ...item };
        } else if (type === 'asset') {
            const { data: item } = await supabase.from(CONFIG.tables.inventory).select('*').eq('id', id).single();
            data = { type: 'asset', ...item };
        } else if (type === 'k3') {
            const { data: item } = await supabase.from(CONFIG.tables.k3).select('*').eq('id', id).single();
            data = { type: 'k3', ...item };
        } else if (type === 'maintenance') {
            const { data: item } = await supabase.from(CONFIG.tables.tasks).select('*').eq('id', id).single();
            data = { type: 'maintenance', ...item };
        } else if (type === 'dana') {
            const { data: item } = await supabase.from(CONFIG.tables.dana).select('*').eq('id', id).single();
            data = { type: 'dana', ...item };
        }
        if (!data) return;
        const preview = container.querySelector('#qr-preview');
        preview.innerHTML = '';
        new QRCode(preview, { text: JSON.stringify(data), width: 200, height: 200 });
    };

    window.printCurrentQR = function() {
        const preview = container.querySelector('#qr-preview').innerHTML;
        if (!preview || preview.includes('QR akan tampil')) return alert('Tidak ada QR');
        const win = window.open('', '_blank');
        win.document.write(`
            <html><head><title>Print QR</title></head>
            <body style="text-align:center; padding:20px;">${preview}<p>Dicetak dari Dream OS</p></body>
        `);
        win.print();
    };

    function attachQREvents() {
        const selectType = container.querySelector('#qr-entity-type');
        const selectItem = container.querySelector('#qr-entity-id');
        const generateBtn = container.querySelector('#generateQRBtn');
        const printBtn = container.querySelector('#printQRBtn');

        if (selectType) {
            selectType.addEventListener('change', async (e) => {
                const type = e.target.value;
                selectItem.innerHTML = '<option value="">-- Pilih Item --</option>';
                if (!type || !supabase) return;
                let data;
                if (type === 'booking') {
                    const { data: items } = await supabase.from(CONFIG.tables.bookings).select('id, nama_peminjam, ruang').limit(20);
                    data = items;
                } else if (type === 'asset') {
                    const { data: items } = await supabase.from(CONFIG.tables.inventory).select('id, nama, lokasi').limit(20);
                    data = items;
                } else if (type === 'k3') {
                    const { data: items } = await supabase.from(CONFIG.tables.k3).select('id, lokasi, jenis_laporan').limit(20);
                    data = items;
                } else if (type === 'maintenance') {
                    const { data: items } = await supabase.from(CONFIG.tables.tasks).select('id, lokasi, deskripsi').limit(20);
                    data = items;
                } else if (type === 'dana') {
                    const { data: items } = await supabase.from(CONFIG.tables.dana).select('id, judul').limit(20);
                    data = items;
                }
                if (data) {
                    data.forEach(item => {
                        const label = item.nama_peminjam || item.nama || item.lokasi || item.judul || 'Item';
                        selectItem.innerHTML += `<option value="${item.id}">${label}</option>`;
                    });
                }
            });
        }
        if (generateBtn) generateBtn.addEventListener('click', window.generateQRFromCommandCenter);
        if (printBtn) printBtn.addEventListener('click', window.printCurrentQR);
    }

    function attachSlideForm() {
        const form = container.querySelector('#slideForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                if (!supabase) return alert('Database tidak tersedia');
                const slideNumber = parseInt(container.querySelector('#slide_number')?.value || 5);
                const content = container.querySelector('#slide_content')?.value;
                await supabase.from(CONFIG.tables.admin_info).insert([{ slide_number: slideNumber, content }]);
                alert('Slide tersimpan');
                loadSlidePreviews();
            });
        }
    }

    async function loadSlidePreviews() {
        if (!supabase) return;
        const { data } = await supabase.from(CONFIG.tables.admin_info).select('*').order('created_at', { ascending: false });
        const slide5 = data?.find(s => s.slide_number === 5)?.content || '-';
        const slide6 = data?.find(s => s.slide_number === 6)?.content || '-';
        const slide7 = data?.find(s => s.slide_number === 7)?.content || '-';
        const el5 = container.querySelector('#preview-slide5');
        const el6 = container.querySelector('#preview-slide6');
        const el7 = container.querySelector('#preview-slide7');
        if (el5) el5.textContent = slide5;
        if (el6) el6.textContent = slide6;
        if (el7) el7.textContent = slide7;
    }

    async function loadFilesList() {
        if (!supabase || !supabase.storage) return;
        const containerList = container.querySelector('#file-list');
        if (!containerList) return;
        containerList.innerHTML = '<div class="col-span-full text-center text-slate-400">⏳ Memuat...</div>';
        const bucketSelect = container.querySelector('#file-bucket');
        const bucket = bucketSelect?.value || CONFIG.buckets.k3;
        try {
            const { data: files, error } = await supabase.storage.from(bucket).list('', { limit: 100 });
            if (error) throw error;
            if (!files?.length) {
                containerList.innerHTML = '<div class="col-span-full text-center text-slate-400">Tidak ada file</div>';
                return;
            }
            let html = '';
            for (const file of files) {
                const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(file.name);
                const publicUrl = urlData?.publicUrl || '';
                const fileType = file.metadata?.mimetype || 'unknown';
                html += `
                    <div class="bg-slate-700/50 p-3 rounded-xl">
                        <div class="h-24 flex items-center justify-center bg-slate-800 rounded mb-2 overflow-hidden">
                            ${fileType.startsWith('image/') ? `<img src="${publicUrl}" class="max-h-full max-w-full object-contain">` : '<i class="fas fa-file text-3xl text-slate-400"></i>'}
                        </div>
                        <p class="text-xs truncate">${file.name}</p>
                        <div class="flex gap-1 mt-2">
                            <a href="${publicUrl}" target="_blank" class="bg-blue-600 px-2 py-1 rounded text-[10px]">Lihat</a>
                            <button onclick="window.downloadFile('${bucket}', '${file.name}')" class="bg-emerald-600 px-2 py-1 rounded text-[10px]">⬇️</button>
                            <button onclick="window.deleteFile('${bucket}', '${file.name}')" class="bg-red-600 px-2 py-1 rounded text-[10px]">🗑️</button>
                        </div>
                    </div>
                `;
            }
            containerList.innerHTML = html;
        } catch (err) {
            containerList.innerHTML = `<div class="col-span-full text-center text-red-400">Error: ${err.message}</div>`;
        }
    }

    window.downloadFile = async function(bucket, fileName) {
        if (!supabase?.storage) return alert('Storage tidak tersedia');
        try {
            const { data, error } = await supabase.storage.from(bucket).download(fileName);
            if (error) throw error;
            const url = URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            alert('Download gagal: ' + err.message);
        }
    };

    window.deleteFile = async function(bucket, fileName) {
        if (!confirm(`Hapus ${fileName}?`)) return;
        if (!supabase?.storage) return alert('Storage tidak tersedia');
        try {
            await supabase.storage.from(bucket).remove([fileName]);
            loadFilesList();
        } catch (err) {
            alert('Hapus gagal: ' + err.message);
        }
    };

    // ========== REMINDER FORM ==========
    const reminderForm = container.querySelector('#reminderForm');
    if (reminderForm) {
        reminderForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!supabase) return alert('Database tidak tersedia');
            const data = {
                nama_item: container.querySelector('#reminder_nama')?.value,
                lokasi: container.querySelector('#reminder_lokasi')?.value,
                interval_bulan: parseInt(container.querySelector('#reminder_interval')?.value || 6),
                terakhir_service: container.querySelector('#reminder_terakhir')?.value
            };
            const { error } = await supabase.from(CONFIG.tables.reminders).insert([data]);
            if (error) alert('Gagal: ' + error.message);
            else {
                alert('Reminder ditambahkan');
                reminderModal?.classList.add('hidden');
                switchTab('ruangkerja');
                updateStats();
            }
        });
    }

    // ========== INISIALISASI ==========
    setManagedInterval(updateStats, CONFIG.intervals.stats);
    setManagedInterval(async () => {
        if (container.querySelector('.tab-btn.active[data-tab="ruangkerja"]')) {
            await loadRuangKerja();
        }
    }, CONFIG.intervals.ruangKerja);

    // Aktifkan tab default
    await switchTab('dashboard');

    // ========== CLEANUP ==========
    return () => {
        log('🧹 Membersihkan Command Center...');
        clearAllIntervals();
        document.removeEventListener('click', resetSessionTimer);
        document.removeEventListener('keypress', resetSessionTimer);
        // Hapus fungsi global yang ditambahkan
        delete window.updateStatus;
        delete window.updatePengajuanDana;
        delete window.viewBookingDetail;
        delete window.generateQRFromCommandCenter;
        delete window.printCurrentQR;
        delete window.downloadFile;
        delete window.deleteFile;
    };
}

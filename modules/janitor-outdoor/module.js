/**
 * 🌿 MODUL JANITOR OUTDOOR – Dream OS v2.1
 * Ceklis harian kebersihan area outdoor: taman, parkir, lapangan, dll.
 * Fitur:
 * - Form dengan checkbox area outdoor
 * - Riwayat laporan dari Supabase
 * - Jadwal piket mingguan (sementara statis)
 * - Upload foto (placeholder)
 * - Terintegrasi dengan Sovereign Kernel, GhostAudit, dan toast
 */

export async function render() {
    return `
        <div class="max-w-6xl mx-auto p-4">
            <!-- Header -->
            <div class="text-center mb-6">
                <h2 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                    🌿 Ceklis Harian Janitor Outdoor
                </h2>
                <p class="text-sm opacity-70">Taman, Parkir, Lapangan, dan Area Luar</p>
            </div>

            <!-- Tab Navigation -->
            <div class="flex border-b border-slate-700 mb-4">
                <button id="tab-form" class="tab-btn active px-4 py-2 font-semibold border-b-2 border-cyan-500">📝 Form Ceklis</button>
                <button id="tab-history" class="tab-btn px-4 py-2 text-slate-400">📋 Riwayat</button>
                <button id="tab-schedule" class="tab-btn px-4 py-2 text-slate-400">📅 Jadwal Mingguan</button>
            </div>

            <!-- Panel Form -->
            <div id="panel-form" class="tab-panel">
                <form id="janitorOutdoorForm" class="glass-card p-6 rounded-xl space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block mb-1 text-sm font-medium">Tanggal *</label>
                            <input type="date" id="tanggal" required class="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
                        </div>
                        <div>
                            <label class="block mb-1 text-sm font-medium">Shift *</label>
                            <select id="shift" required class="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
                                <option value="pagi">Pagi</option>
                                <option value="siang">Siang</option>
                                <option value="sore">Sore</option>
                            </select>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block mb-1 text-sm font-medium">Petugas *</label>
                            <input type="text" id="petugas" required placeholder="Nama petugas" class="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
                        </div>
                        <div>
                            <label class="block mb-1 text-sm font-medium">Area *</label>
                            <select id="area" required class="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
                                <option value="">Pilih Area</option>
                                <option value="Taman Utama">Taman Utama</option>
                                <option value="Taman Belakang">Taman Belakang</option>
                                <option value="Lapangan Voli">Lapangan Voli</option>
                                <option value="Lapangan Basket">Lapangan Basket</option>
                                <option value="Parkir Motor">Parkir Motor</option>
                                <option value="Parkir Mobil">Parkir Mobil</option>
                                <option value="Area Selasar">Area Selasar</option>
                                <option value="Pos Satpam">Pos Satpam</option>
                                <option value="Jalan Utama">Jalan Utama</option>
                                <option value="Lorong Kecil">Lorong Kecil</option>
                                <option value="Play Ground">Play Ground</option>
                            </select>
                        </div>
                    </div>

                    <!-- Bagian CHECKLIST OUTDOOR -->
                    <div class="border-t border-slate-700 pt-4">
                        <h3 class="text-lg font-semibold text-cyan-400 mb-3">🌳 Area yang Dibersihkan</h3>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                            <label class="flex items-center space-x-2"><input type="checkbox" id="check_jalan_utama" class="accent-cyan-500"> <span>Jalan Utama</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="check_lorong" class="accent-cyan-500"> <span>Lorong & jalan kecil</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="check_parkir_motor" class="accent-cyan-500"> <span>Parkir Motor</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="check_parkir_mobil" class="accent-cyan-500"> <span>Parkir Mobil</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="check_area_loby" class="accent-cyan-500"> <span>Area Loby</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="check_playground" class="accent-cyan-500"> <span>Play Ground</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="check_taman" class="accent-cyan-500"> <span>Taman</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="check_lapangan" class="accent-cyan-500"> <span>Lapangan</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="check_saluran" class="accent-cyan-500"> <span>Saluran Air</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="check_trotoar" class="accent-cyan-500"> <span>Trotoar</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="check_rumput" class="accent-cyan-500"> <span>Pemangkasan Rumput</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="check_penyiraman" class="accent-cyan-500"> <span>Penyiraman Tanaman</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="check_sampah" class="accent-cyan-500"> <span>Pengambilan Sampah</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="check_daun" class="accent-cyan-500"> <span>Pembersihan Daun Kering</span></label>
                        </div>
                    </div>

                    <!-- Catatan -->
                    <div>
                        <label class="block mb-1 text-sm font-medium">Catatan</label>
                        <textarea id="catatan" rows="2" placeholder="Catatan tambahan..." class="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white"></textarea>
                    </div>

                    <!-- Foto (placeholder) -->
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label class="block mb-1 text-sm font-medium">Foto Sebelum</label>
                            <input type="file" id="foto_sebelum" accept="image/*" class="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
                        </div>
                        <div>
                            <label class="block mb-1 text-sm font-medium">Foto Sesudah</label>
                            <input type="file" id="foto_sesudah" accept="image/*" class="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
                        </div>
                    </div>

                    <button type="submit" class="w-full bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-xl font-semibold transition-all">
                        Simpan Ceklis Outdoor
                    </button>
                    <div id="form-result" class="text-center text-sm"></div>
                </form>
            </div>

            <!-- Panel Riwayat -->
            <div id="panel-history" class="tab-panel hidden">
                <div class="glass-card p-6 rounded-xl">
                    <h3 class="text-lg font-semibold mb-4 border-b border-slate-700 pb-2 flex justify-between items-center">
                        <span>Riwayat Ceklis Outdoor</span>
                        <button id="refresh-history" class="text-sm bg-slate-700 px-3 py-1 rounded hover:bg-slate-600 transition">
                            🔄 Refresh
                        </button>
                    </h3>
                    <div class="overflow-x-auto">
                        <table class="min-w-full table-auto text-sm">
                            <thead class="bg-slate-800">
                                <tr>
                                    <th class="px-2 py-2">Tanggal</th>
                                    <th class="px-2 py-2">Shift</th>
                                    <th class="px-2 py-2">Petugas</th>
                                    <th class="px-2 py-2">Area</th>
                                    <th class="px-2 py-2">Status</th>
                                    <th class="px-2 py-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="history-body">
                                <tr><td colspan="6" class="text-center py-4 text-slate-400">Memuat...</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Panel Jadwal Mingguan -->
            <div id="panel-schedule" class="tab-panel hidden">
                <div class="glass-card p-6 rounded-xl">
                    <h3 class="text-lg font-semibold mb-4 border-b border-slate-700 pb-2">📅 Jadwal Piket Outdoor</h3>
                    <div class="overflow-x-auto">
                        <table class="min-w-full table-auto text-sm">
                            <thead class="bg-slate-800">
                                <tr>
                                    <th class="px-2 py-2">Hari</th>
                                    <th class="px-2 py-2">Shift Pagi</th>
                                    <th class="px-2 py-2">Shift Siang</th>
                                    <th class="px-2 py-2">Shift Sore</th>
                                </tr>
                            </thead>
                            <tbody id="schedule-body">
                                <tr><td colspan="4" class="text-center py-4 text-slate-400">Jadwal belum tersedia</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <p class="text-xs text-center mt-4 opacity-60">*Jadwal dapat diatur oleh supervisor</p>
                </div>
            </div>
        </div>
    `;
}

export async function afterRender() {
    console.log('[JANITOR-OUTDOOR] Module loaded');

    const supabase = window.supabase;
    if (!supabase) {
        console.error('[JANITOR-OUTDOOR] Supabase tidak tersedia');
        return;
    }

    // ========== ELEMEN DOM ==========
    const tabForm = document.getElementById('tab-form');
    const tabHistory = document.getElementById('tab-history');
    const tabSchedule = document.getElementById('tab-schedule');
    const panelForm = document.getElementById('panel-form');
    const panelHistory = document.getElementById('panel-history');
    const panelSchedule = document.getElementById('panel-schedule');
    const form = document.getElementById('janitorOutdoorForm');
    const formResult = document.getElementById('form-result');
    const refreshBtn = document.getElementById('refresh-history');
    const historyBody = document.getElementById('history-body');
    const scheduleBody = document.getElementById('schedule-body');

    // ========== FUNGSI UTILITAS ==========
    function setTodayDate() {
        const tanggalInput = document.getElementById('tanggal');
        if (tanggalInput) {
            const today = new Date().toISOString().split('T')[0];
            tanggalInput.value = today;
        }
    }
    setTodayDate();

    // ========== TAB NAVIGASI ==========
    function activateTab(tabId) {
        // Update tombol
        [tabForm, tabHistory, tabSchedule].forEach(btn => {
            btn?.classList.remove('active', 'border-cyan-500', 'text-white');
            btn?.classList.add('text-slate-400');
        });
        const activeBtn = document.getElementById(`tab-${tabId}`);
        if (activeBtn) {
            activeBtn.classList.add('active', 'border-cyan-500', 'text-white');
            activeBtn.classList.remove('text-slate-400');
        }

        // Update panel
        [panelForm, panelHistory, panelSchedule].forEach(panel => panel?.classList.add('hidden'));
        const activePanel = document.getElementById(`panel-${tabId}`);
        if (activePanel) activePanel.classList.remove('hidden');

        // Muat data jika perlu
        if (tabId === 'history') loadHistory();
        else if (tabId === 'schedule') loadSchedule();
    }

    tabForm?.addEventListener('click', (e) => { e.preventDefault(); activateTab('form'); });
    tabHistory?.addEventListener('click', (e) => { e.preventDefault(); activateTab('history'); });
    tabSchedule?.addEventListener('click', (e) => { e.preventDefault(); activateTab('schedule'); });

    // ========== LOAD HISTORY ==========
    async function loadHistory() {
        if (!historyBody) return;
        historyBody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-slate-400">⏳ Memuat...</td></tr>';

        try {
            const { data, error } = await supabase
                .from('janitor_outdoor')
                .select('id, tanggal, shift, petugas, area, status, created_at')
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) throw error;

            if (!data || data.length === 0) {
                historyBody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-slate-400">Belum ada data</td></tr>';
                return;
            }

            let html = '';
            data.forEach(item => {
                const statusClass = item.status === 'pending' ? 'text-yellow-400' : (item.status === 'verified' ? 'text-emerald-400' : 'text-blue-400');
                html += `
                    <tr class="border-b border-slate-700">
                        <td class="px-2 py-2">${item.tanggal}</td>
                        <td class="px-2 py-2">${item.shift || '-'}</td>
                        <td class="px-2 py-2">${item.petugas}</td>
                        <td class="px-2 py-2">${item.area}</td>
                        <td class="px-2 py-2 ${statusClass}">${item.status}</td>
                        <td class="px-2 py-2">
                            <button onclick="window.viewOutdoorDetail('${item.id}')" class="text-blue-400 text-xs">Detail</button>
                        </td>
                    </tr>
                `;
            });
            historyBody.innerHTML = html;
        } catch (err) {
            console.error('[JANITOR-OUTDOOR] Gagal load history:', err);
            historyBody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-red-500">Gagal memuat data</td></tr>';
        }
    }

    window.viewOutdoorDetail = (id) => {
        alert('Fitur detail menyusul. ID: ' + id);
    };

    refreshBtn?.addEventListener('click', loadHistory);

    // ========== LOAD SCHEDULE (sementara statis) ==========
    function loadSchedule() {
        if (!scheduleBody) return;
        scheduleBody.innerHTML = `
            <tr><td>Senin</td><td>Joko</td><td>Rina</td><td>Agus</td></tr>
            <tr><td>Selasa</td><td>Joko</td><td>Rina</td><td>Agus</td></tr>
            <tr><td>Rabu</td><td>Joko</td><td>Rina</td><td>Agus</td></tr>
            <tr><td>Kamis</td><td>Joko</td><td>Rina</td><td>Agus</td></tr>
            <tr><td>Jumat</td><td>Joko</td><td>Rina</td><td>Agus</td></tr>
            <tr><td>Sabtu</td><td>Joko</td><td>Rina</td><td>Agus</td></tr>
            <tr><td>Minggu</td><td>Libur</td><td>Libur</td><td>Libur</td></tr>
        `;
    }

    // ========== SUBMIT FORM ==========
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const tanggal = document.getElementById('tanggal')?.value;
        const shift = document.getElementById('shift')?.value;
        const petugas = document.getElementById('petugas')?.value;
        const area = document.getElementById('area')?.value;
        const catatan = document.getElementById('catatan')?.value;

        if (!tanggal || !petugas || !area) {
            if (formResult) formResult.innerHTML = '<span class="text-red-500">Tanggal, Petugas, Area harus diisi!</span>';
            return;
        }

        // Kumpulkan item outdoor
        const items = {
            jalan_utama: document.getElementById('check_jalan_utama')?.checked || false,
            lorong: document.getElementById('check_lorong')?.checked || false,
            parkir_motor: document.getElementById('check_parkir_motor')?.checked || false,
            parkir_mobil: document.getElementById('check_parkir_mobil')?.checked || false,
            area_loby: document.getElementById('check_area_loby')?.checked || false,
            playground: document.getElementById('check_playground')?.checked || false,
            taman: document.getElementById('check_taman')?.checked || false,
            lapangan: document.getElementById('check_lapangan')?.checked || false,
            saluran: document.getElementById('check_saluran')?.checked || false,
            trotoar: document.getElementById('check_trotoar')?.checked || false,
            rumput: document.getElementById('check_rumput')?.checked || false,
            penyiraman: document.getElementById('check_penyiraman')?.checked || false,
            sampah: document.getElementById('check_sampah')?.checked || false,
            daun: document.getElementById('check_daun')?.checked || false
        };

        const formData = {
            tanggal,
            shift,
            petugas,
            area,
            items,
            catatan: catatan || null,
            foto_sebelum: null,
            foto_sesudah: null,
            status: 'pending',
            created_at: new Date().toISOString()
        };

        try {
            const { error } = await supabase.from('janitor_outdoor').insert([formData]);
            if (error) throw error;

            if (formResult) formResult.innerHTML = '<span class="text-emerald-400">✅ Ceklis outdoor berhasil disimpan!</span>';
            form.reset();
            setTodayDate();

            // Catat ke audit trail
            if (window.GhostAudit) {
                window.GhostAudit.record(
                    window.DREAM?.state?.user?.email || 'system',
                    'JANITOR_OUTDOOR_REPORT',
                    `Petugas: ${petugas}, Area: ${area}`
                );
            }

            // Toast
            if (window.DREAM?.showToast) {
                window.DREAM.showToast('Ceklis outdoor disimpan', 'success');
            }

            // Muat ulang riwayat jika tab history aktif
            if (!panelHistory?.classList.contains('hidden')) loadHistory();
        } catch (err) {
            console.error('[JANITOR-OUTDOOR] Submit error:', err);
            if (formResult) formResult.innerHTML = `<span class="text-red-500">❌ ${err.message}</span>`;
        }
    });

    // ========== INIT ==========
    activateTab('form');
}

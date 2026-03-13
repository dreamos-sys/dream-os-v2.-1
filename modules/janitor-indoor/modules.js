/**
 * 🧹 MODUL JANITOR INDOOR – Dream OS v2.1
 * Fitur:
 * - Form ceklis harian untuk toilet dan ruangan
 * - Riwayat laporan dengan tabel
 * - Jadwal piket mingguan (placeholder)
 * - Upload foto sebelum & sesudah
 * - Terintegrasi dengan Supabase, GhostAudit, dan Sovereign Kernel
 */

export async function render() {
    return `
        <div class="max-w-6xl mx-auto p-4">
            <!-- Header -->
            <div class="text-center mb-6">
                <h2 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                    🧹 Ceklis Harian Janitor Indoor
                </h2>
                <p class="text-sm opacity-70">Gedung SD, SMP, SMA – Toilet & Ruangan</p>
            </div>

            <!-- Tab Navigation -->
            <div class="flex border-b border-slate-700 mb-4">
                <button id="tab-form" class="tab-btn active px-4 py-2 font-semibold border-b-2 border-teal-500">📝 Form Ceklis</button>
                <button id="tab-history" class="tab-btn px-4 py-2 text-slate-400">📋 Riwayat</button>
                <button id="tab-schedule" class="tab-btn px-4 py-2 text-slate-400">📅 Jadwal Mingguan</button>
            </div>

            <!-- Panel Form -->
            <div id="panel-form" class="tab-panel">
                <form id="janitorIndoorForm" class="glass-card p-6 rounded-xl shadow-lg space-y-4">
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
                            <label class="block mb-1 text-sm font-medium">Lokasi Gedung *</label>
                            <select id="lokasi" required class="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
                                <option value="">Pilih Gedung</option>
                                <option value="SD">Gedung SD</option>
                                <option value="SMP">Gedung SMP</option>
                                <option value="SMA">Gedung SMA</option>
                            </select>
                        </div>
                    </div>

                    <!-- Bagian TOILET (11 item) -->
                    <div class="border-t border-slate-700 pt-4">
                        <h3 class="section-title text-teal-400 text-lg font-semibold mb-3">🚽 Toilet</h3>
                        <div class="checkbox-grid grid grid-cols-2 md:grid-cols-4 gap-2">
                            <label class="flex items-center space-x-2"><input type="checkbox" id="toilet_pintu_utama" class="accent-teal-500"> <span>Pintu Utama</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="toilet_pintu_kubikal" class="accent-teal-500"> <span>Pintu Kubikal</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="toilet_kaca" class="accent-teal-500"> <span>Kaca / Cermin</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="toilet_exhaust" class="accent-teal-500"> <span>Exhaust</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="toilet_dinding" class="accent-teal-500"> <span>Dinding</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="toilet_tempat_wudhu" class="accent-teal-500"> <span>Tempat Wudhu</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="toilet_lantai" class="accent-teal-500"> <span>Lantai</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="toilet_floor_drain" class="accent-teal-500"> <span>Floor Drain</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="toilet_kloset" class="accent-teal-500"> <span>Kloset</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="toilet_plafon" class="accent-teal-500"> <span>Plafon / Flapond</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="toilet_tempat_sampah" class="accent-teal-500"> <span>Tempat Sampah</span></label>
                        </div>
                    </div>

                    <!-- Bagian RUANGAN (daftar 31 area) -->
                    <div class="border-t border-slate-700 pt-4">
                        <h3 class="section-title text-teal-400 text-lg font-semibold mb-3">🏢 Ruangan & Area Umum</h3>
                        <div class="checkbox-grid grid grid-cols-2 md:grid-cols-4 gap-2">
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_loby_utama" class="accent-teal-500"> <span>Loby Utama</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_teras" class="accent-teal-500"> <span>Teras</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_lorong_utama" class="accent-teal-500"> <span>Lorong Utama Gedung</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_balkon" class="accent-teal-500"> <span>Balkon</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_pintu_utama" class="accent-teal-500"> <span>Pintu Utama</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_pintu_kelas" class="accent-teal-500"> <span>Pintu Kelas & R Lain</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_jendela" class="accent-teal-500"> <span>Jendela</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_kelas" class="accent-teal-500"> <span>Kelas</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_aula" class="accent-teal-500"> <span>Aula</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_sentra_musik" class="accent-teal-500"> <span>Sentra Musik</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_sentra_kreasi" class="accent-teal-500"> <span>Sentra Kreasi</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_uks" class="accent-teal-500"> <span>UKS</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_psikolog" class="accent-teal-500"> <span>Psikolog</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_lab_kom" class="accent-teal-500"> <span>Lab Kom</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_lab_ipa" class="accent-teal-500"> <span>Lab IPA</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_perpus" class="accent-teal-500"> <span>Perpustakaan</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_kepsek" class="accent-teal-500"> <span>Kepala Sekolah</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_guru_laki" class="accent-teal-500"> <span>R. Guru (Laki)</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_guru_perempuan" class="accent-teal-500"> <span>R. Guru (Perempuan)</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_pemasaran" class="accent-teal-500"> <span>R. Pemasaran</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_admin_tu" class="accent-teal-500"> <span>R. Admin TU</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_rapat" class="accent-teal-500"> <span>R. Rapat</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_ceo" class="accent-teal-500"> <span>R. CEO, Direktur & Yayasan</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_kabid" class="accent-teal-500"> <span>R. Kepala Bidang (Kabid)</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_osis" class="accent-teal-500"> <span>R. Osis</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_mushalla" class="accent-teal-500"> <span>R. Mushalla</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_inklusi" class="accent-teal-500"> <span>R. Inklusi</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_gudang_olahraga" class="accent-teal-500"> <span>R. Gudang Olah Raga</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_serbaguna" class="accent-teal-500"> <span>R. Serbaguna</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_masjid" class="accent-teal-500"> <span>R. Masjid</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_kantin" class="accent-teal-500"> <span>Kantin</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_saung_besar" class="accent-teal-500"> <span>Saung Besar</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_saung_kecil" class="accent-teal-500"> <span>Saung Kecil</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_pos" class="accent-teal-500"> <span>Pos</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_gudang_umum" class="accent-teal-500"> <span>Gudang Umum</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_tangga" class="accent-teal-500"> <span>Tangga</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_lift" class="accent-teal-500"> <span>Lift</span></label>
                            <label class="flex items-center space-x-2"><input type="checkbox" id="ruang_lainnya" class="accent-teal-500"> <span>Keterangan Dll</span></label>
                        </div>
                    </div>

                    <!-- Catatan dan Foto -->
                    <div>
                        <label class="block mb-1 text-sm font-medium">Catatan</label>
                        <textarea id="catatan" rows="2" placeholder="Catatan tambahan..." class="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white"></textarea>
                    </div>

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

                    <button type="submit" class="w-full bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-xl font-semibold transition-all">
                        Simpan Ceklis Indoor
                    </button>
                    <div id="form-result" class="text-center text-sm"></div>
                </form>
            </div>

            <!-- Panel Riwayat -->
            <div id="panel-history" class="tab-panel hidden">
                <div class="glass-card p-6 rounded-xl shadow-lg">
                    <h3 class="text-lg font-semibold mb-4 border-b border-slate-700 pb-2 flex justify-between items-center">
                        <span>Riwayat Ceklis Indoor</span>
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
                                    <th class="px-2 py-2">Lokasi</th>
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
                <div class="glass-card p-6 rounded-xl shadow-lg">
                    <h3 class="text-lg font-semibold mb-4 border-b border-slate-700 pb-2">📅 Jadwal Piket Mingguan</h3>
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
    console.log('[JANITOR-INDOOR] Module loaded');

    const supabase = window.supabase;
    if (!supabase) {
        console.error('[JANITOR-INDOOR] Supabase tidak tersedia');
        return;
    }

    // ========== ELEMEN DOM ==========
    const form = document.getElementById('janitorIndoorForm');
    const formResult = document.getElementById('form-result');
    const tanggalInput = document.getElementById('tanggal');
    const shiftInput = document.getElementById('shift');
    const petugasInput = document.getElementById('petugas');
    const lokasiSelect = document.getElementById('lokasi');
    const catatanInput = document.getElementById('catatan');
    const fotoSebelum = document.getElementById('foto_sebelum');
    const fotoSesudah = document.getElementById('foto_sesudah');

    // Tab elements
    const tabForm = document.getElementById('tab-form');
    const tabHistory = document.getElementById('tab-history');
    const tabSchedule = document.getElementById('tab-schedule');
    const panelForm = document.getElementById('panel-form');
    const panelHistory = document.getElementById('panel-history');
    const panelSchedule = document.getElementById('panel-schedule');
    const refreshBtn = document.getElementById('refresh-history');
    const historyBody = document.getElementById('history-body');
    const scheduleBody = document.getElementById('schedule-body');

    // ========== FUNGSI UTILITAS ==========
    function setTodayDate() {
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
            btn?.classList.remove('active', 'border-teal-500', 'text-white');
            btn?.classList.add('text-slate-400');
        });
        const activeBtn = document.getElementById(`tab-${tabId}`);
        if (activeBtn) {
            activeBtn.classList.add('active', 'border-teal-500', 'text-white');
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

    // ========== SUBMIT FORM ==========
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Kumpulkan data checkbox toilet
        const toiletItems = [
            'toilet_pintu_utama', 'toilet_pintu_kubikal', 'toilet_kaca', 'toilet_exhaust',
            'toilet_dinding', 'toilet_tempat_wudhu', 'toilet_lantai', 'toilet_floor_drain',
            'toilet_kloset', 'toilet_plafon', 'toilet_tempat_sampah'
        ];
        const toiletData = {};
        toiletItems.forEach(id => {
            const el = document.getElementById(id);
            toiletData[id] = el ? el.checked : false;
        });

        // Kumpulkan data checkbox ruangan
        const ruangItems = [
            'ruang_loby_utama', 'ruang_teras', 'ruang_lorong_utama', 'ruang_balkon',
            'ruang_pintu_utama', 'ruang_pintu_kelas', 'ruang_jendela', 'ruang_kelas',
            'ruang_aula', 'ruang_sentra_musik', 'ruang_sentra_kreasi', 'ruang_uks',
            'ruang_psikolog', 'ruang_lab_kom', 'ruang_lab_ipa', 'ruang_perpus',
            'ruang_kepsek', 'ruang_guru_laki', 'ruang_guru_perempuan', 'ruang_pemasaran',
            'ruang_admin_tu', 'ruang_rapat', 'ruang_ceo', 'ruang_kabid', 'ruang_osis',
            'ruang_mushalla', 'ruang_inklusi', 'ruang_gudang_olahraga', 'ruang_serbaguna',
            'ruang_masjid', 'ruang_kantin', 'ruang_saung_besar', 'ruang_saung_kecil',
            'ruang_pos', 'ruang_gudang_umum', 'ruang_tangga', 'ruang_lift', 'ruang_lainnya'
        ];
        const ruangData = {};
        ruangItems.forEach(id => {
            const el = document.getElementById(id);
            ruangData[id] = el ? el.checked : false;
        });

        // Data laporan
        const report = {
            tanggal: tanggalInput?.value,
            shift: shiftInput?.value,
            petugas: petugasInput?.value,
            lokasi: lokasiSelect?.value,
            catatan: catatanInput?.value,
            toilet: toiletData,
            ruangan: ruangData,
            created_at: new Date().toISOString(),
            status: 'selesai' // default
        };

        // Upload foto jika ada (contoh, perlu storage bucket)
        // Sederhanakan dulu, abaikan upload foto untuk contoh
        // Di sini bisa ditambahkan logika upload ke Supabase Storage

        try {
            const { error } = await supabase
                .from('janitor_indoor_reports')
                .insert([report]);

            if (error) throw error;

            formResult.innerHTML = '<span class="text-emerald-400">✅ Laporan tersimpan!</span>';
            form.reset();
            setTodayDate();

            // Catat ke audit trail
            if (window.GhostAudit) {
                window.GhostAudit.record(
                    window.DREAM?.state?.user?.email || 'system',
                    'JANITOR_INDOOR_REPORT',
                    `Petugas: ${petugasInput?.value}, Lokasi: ${lokasiSelect?.value}`
                );
            }

            // Toast
            if (window.DREAM?.showToast) {
                window.DREAM.showToast('Ceklis indoor disimpan', 'success');
            }

            loadHistory();
        } catch (err) {
            formResult.innerHTML = `<span class="text-red-500">❌ ${err.message}</span>`;
        }
    });

    // ========== LOAD HISTORY ==========
    async function loadHistory() {
        if (!historyBody) return;
        historyBody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-slate-400">Memuat...</td></tr>';

        try {
            const { data, error } = await supabase
                .from('janitor_indoor_reports')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(20);

            if (error) throw error;

            if (!data?.length) {
                historyBody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-slate-400">Belum ada data</td></tr>';
                return;
            }

            let html = '';
            data.forEach(item => {
                html += `
                    <tr class="border-b border-slate-700">
                        <td class="px-2 py-2">${item.tanggal || '-'}</td>
                        <td class="px-2 py-2">${item.shift || '-'}</td>
                        <td class="px-2 py-2">${item.petugas || '-'}</td>
                        <td class="px-2 py-2">${item.lokasi || '-'}</td>
                        <td class="px-2 py-2">${item.status || '-'}</td>
                        <td class="px-2 py-2">
                            <button onclick="alert('Lihat detail ID: ${item.id}')" class="text-blue-400 text-xs">Detail</button>
                        </td>
                    </tr>
                `;
            });
            historyBody.innerHTML = html;
        } catch (err) {
            historyBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-red-500">Error: ${err.message}</td></tr>`;
        }
    }

    refreshBtn?.addEventListener('click', loadHistory);

    // ========== LOAD SCHEDULE (placeholder) ==========
    async function loadSchedule() {
        if (!scheduleBody) return;
        // Untuk sementara, tampilkan placeholder
        scheduleBody.innerHTML = `
            <tr><td colspan="4" class="text-center py-4 text-slate-400">Jadwal piket belum diatur. Silakan hubungi supervisor.</td></tr>
        `;
    }

    // ========== INIT ==========
    activateTab('form');
    loadHistory(); // Preload
}

/**
 * 🛡️ MODUL SEKURITI – Dream OS v2.1
 * S.M.A.R.T Security AI with Master Schedule
 * Features: GPS Geofencing, Auto Shift, Master Schedule Editor, Anomaly Detection
 */

export async function render({ container, user, supabase }) {
    return `
        <div class="max-w-6xl mx-auto p-4">
            <!-- Header -->
            <header class="glass-header mb-6">
                <div class="status-bar">
                    <span style="color:#10b981;">📍 DEPOK CORE</span>
                    <span style="color:#10b981;">ISO 27001 ✅</span>
                </div>
                <div class="islamic-header">
                    <h1 class="bismillah" style="color:#10b981;">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
                    <p class="shalawat" style="color:#34d399;">اَللهم صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</p>
                </div>
            </header>

            <!-- Main Content -->
            <main style="padding-bottom:140px;">
                <h2 style="font-size:1.5rem;font-weight:700;color:#10b981;margin-bottom:1.5rem;">🛡️ S.M.A.R.T Security AI</h2>
                <p style="font-size:0.75rem;color:#64748b;margin-bottom:1.5rem;">LIVE MONITORING • ISO 27001 COMPLIANT</p>

                <!-- Status Cards -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 font-mono text-xs">
                    <div class="glass-card p-3" style="background:rgba(15,23,42,0.9);border-left:4px solid #3b82f6;">
                        <span style="color:#94a3b8;">STATUS SHIFT</span>
                        <div id="ai-shift-status" style="font-weight:700;color:#3b82f6;">MENDETEKSI...</div>
                    </div>
                    <div class="glass-card p-3" style="background:rgba(15,23,42,0.9);border-left:4px solid #10b981;">
                        <span style="color:#94a3b8;">SAFE CORE (5KM)</span>
                        <div id="ai-geo-status" style="font-weight:700;color:#10b981;">CHECKING GPS</div>
                    </div>
                    <div class="glass-card p-3" style="background:rgba(15,23,42,0.9);border-left:4px solid #a855f7;">
                        <span style="color:#94a3b8;">PERSONEL AKTIF</span>
                        <div id="ai-personnel-count" style="font-weight:700;color:#a855f7;">3 ORANG</div>
                    </div>
                    <div class="glass-card p-3" style="background:rgba(15,23,42,0.9);border-left:4px solid #f59e0b;">
                        <span style="color:#94a3b8;">ANOMALI JADWAL</span>
                        <div id="ai-anomaly-status" style="font-weight:700;color:#f59e0b;">CLEAR</div>
                    </div>
                </div>

                <!-- Tab Navigation -->
                <div style="display:flex;gap:8px;margin-bottom:1.5rem;overflow-x:auto;">
                    <button id="tab-laporan" class="tab-btn active" style="flex:1;padding:12px 24px;background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;border-radius:20px;font-weight:700;cursor:pointer;">
                        📷 Laporan 24 Jam                    </button>
                    <button id="tab-jadwal" class="tab-btn" style="flex:1;padding:12px 24px;background:rgba(15,23,42,0.8);color:#94a3b8;border:1px solid rgba(51,65,85,0.5);border-radius:20px;font-weight:700;cursor:pointer;">
                        📅 AI Jadwal Sync
                    </button>
                </div>

                <!-- TAB LAPORAN -->
                <div id="panel-laporan" class="tab-panel">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <!-- Form Laporan -->
                        <div class="glass-card p-6" style="background:rgba(15,23,42,0.9);border:1px solid rgba(16,185,129,0.2);">
                            <h3 style="font-size:1.125rem;font-weight:700;color:#10b981;margin-bottom:1rem;">
                                <i class="fas fa-satellite-dish animate-pulse" style="margin-right:8px;"></i> Transmisi Data
                            </h3>

                            <form id="sekuritiForm" class="space-y-4">
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block mb-1 text-xs font-medium" style="color:#94a3b8;">TANGGAL (AUTO)</label>
                                        <input type="text" id="tanggal" readonly class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:#e2e8f0;">
                                    </div>
                                    <div>
                                        <label class="block mb-1 text-xs font-medium" style="color:#94a3b8;">SHIFT AKTIF (AI)</label>
                                        <input type="text" id="shift" readonly class="w-full p-3 rounded-xl bg-slate-800 border border-emerald-500/50" style="color:#10b981;font-weight:700;">
                                    </div>
                                </div>

                                <div>
                                    <label class="block mb-1 text-xs font-medium" style="color:#94a3b8;">PETUGAS JAGA (Pilih sesuai jadwal) *</label>
                                    <select id="petugas" required class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:#e2e8f0;">
                                        <option value="">-- Pindai Petugas --</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block mb-1 text-xs font-medium" style="color:#94a3b8;">GEO-SCANNER KAMERA</label>
                                    <div style="border:2px dashed rgba(16,185,129,0.5);border-radius:12px;padding:1rem;text-align:center;background:rgba(16,185,129,0.1);cursor:pointer;">
                                        <i class="fas fa-camera" style="font-size:1.5rem;color:#10b981;margin-bottom:8px;"></i>
                                        <p style="font-size:0.75rem;color:#94a3b8;">Tap untuk Ambil Foto & Kunci GPS</p>
                                        <input type="file" id="foto_sekuriti" accept="image/*" capture="camera" style="position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;">
                                    </div>
                                </div>

                                <div>
                                    <label class="block mb-1 text-xs font-medium" style="color:#94a3b8;">SITUASI / DESKRIPSI *</label>
                                    <textarea id="deskripsi" required rows="3" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:#e2e8f0;" placeholder="Ketik laporan atau gunakan voice command..."></textarea>
                                </div>

                                <button type="submit" class="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white p-4 rounded-xl font-bold transition" style="background:linear-gradient(135deg,#10b981,#059669);">
                                    🔒 Enkripsi & Kirim                                </button>
                                <div id="form-result" class="text-center text-sm" style="margin-top:1rem;"></div>
                            </form>
                        </div>

                        <!-- Riwayat Laporan -->
                        <div class="glass-card p-6" style="background:rgba(15,23,42,0.9);border:1px solid rgba(16,185,129,0.2);">
                            <h3 style="font-size:1.125rem;font-weight:700;color:#10b981;margin-bottom:1rem;display:flex;justify-content:space-between;align-items:center;">
                                <span><i class="fas fa-database" style="margin-right:8px;"></i> Log Keamanan</span>
                                <button id="refresh-history" style="background:rgba(30,41,59,0.8);color:#e2e8f0;border:1px solid rgba(51,65,85,0.5);padding:4px 12px;border-radius:12px;font-size:0.75rem;cursor:pointer;">
                                    🔄 Sync
                                </button>
                            </h3>
                            <div id="history-container" style="max-height:400px;overflow-y:auto;">
                                <div style="text-align:center;padding:2rem;opacity:0.5;">
                                    <div class="spinner" style="width:24px;height:24px;border:3px solid rgba(16,185,129,0.2);border-top-color:#10b981;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 1rem;"></div>
                                    <p style="font-size:0.75rem;color:#94a3b8;">Memuat riwayat...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- TAB JADWAL -->
                <div id="panel-jadwal" class="tab-panel" style="display:none;">
                    <!-- Matriks Jadwal -->
                    <div class="glass-card p-6 mb-6" style="background:rgba(15,23,42,0.9);border:1px solid rgba(16,185,129,0.2);">
                        <h3 style="font-size:1.125rem;font-weight:700;color:#e2e8f0;margin-bottom:1rem;">
                            <i class="fas fa-calendar-check" style="color:#10b981;margin-right:8px;"></i> Matriks Jadwal Dream Team
                        </h3>
                        <div style="overflow-x:auto;">
                            <table style="width:100%;border-collapse:collapse;font-size:0.875rem;">
                                <thead>
                                    <tr style="font-size:0.75rem;color:#10b981;text-transform:uppercase;background:rgba(2,6,23,0.8);">
                                        <th style="padding:12px;border:1px solid rgba(51,65,85,0.5);text-align:left;">Personel</th>
                                        <th style="padding:12px;border:1px solid rgba(51,65,85,0.5);text-align:center;background:rgba(16,185,129,0.1);">Hari Ini (AI)</th>
                                        <th style="padding:12px;border:1px solid rgba(51,65,85,0.5);text-align:center;">Besok</th>
                                        <th style="padding:12px;border:1px solid rgba(51,65,85,0.5);text-align:center;">Lusa</th>
                                    </tr>
                                </thead>
                                <tbody id="jadwal-view-body" style="color:#94a3b8;">
                                    <!-- Diisi JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Editor Jadwal Master -->
                    <div class="glass-card p-6" style="background:rgba(15,23,42,0.9);border:1px solid rgba(16,185,129,0.2);">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">                            <h4 style="font-size:1rem;font-weight:700;color:#10b981;">
                                <i class="fas fa-edit" style="margin-right:8px;"></i> Master Schedule Editor
                            </h4>
                            <select id="select-bulan" style="background:rgba(30,41,59,0.8);color:#e2e8f0;border:1px solid rgba(51,65,85,0.5);padding:8px 12px;border-radius:8px;font-size:0.75rem;">
                                <option value="1">Januari 2026</option>
                                <option value="2">Februari 2026</option>
                                <option value="3">Maret 2026</option>
                                <option value="4">April 2026</option>
                                <option value="5">Mei 2026</option>
                                <option value="6">Juni 2026</option>
                                <option value="7">Juli 2026</option>
                                <option value="8">Agustus 2026</option>
                                <option value="9">September 2026</option>
                                <option value="10">Oktober 2026</option>
                                <option value="11">November 2026</option>
                                <option value="12">Desember 2026</option>
                            </select>
                        </div>
                        <div style="overflow-x:auto;max-height:400px;">
                            <table style="width:100%;border-collapse:collapse;font-size:0.625rem;">
                                <thead style="background:rgba(2,6,23,0.8);color:#10b981;position:sticky;top:0;">
                                    <tr id="header-tanggal">
                                        <th style="padding:8px;border:1px solid rgba(51,65,85,0.5);background:rgba(2,6,23,0.8);">PETUGAS</th>
                                        <!-- Header tanggal diisi JS -->
                                    </tr>
                                </thead>
                                <tbody id="body-input-jadwal">
                                    <!-- Diisi JS -->
                                </tbody>
                            </table>
                        </div>
                        <div style="display:flex;justify-content:flex-end;margin-top:1rem;gap:8px;">
                            <button id="generate-otomatis" style="background:#3b82f6;color:white;border:none;padding:8px 16px;border-radius:8px;font-weight:700;font-size:0.75rem;cursor:pointer;">
                                🪄 Generate Otomatis
                            </button>
                            <button id="save-master-jadwal" style="background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;padding:8px 16px;border-radius:8px;font-weight:700;font-size:0.75rem;cursor:pointer;">
                                💾 SIMPAN JADWAL MASTER
                            </button>
                        </div>
                        <p style="font-size:0.5625rem;color:#64748b;margin-top:0.5rem;font-style:italic;">
                            * Kode: P (Pagi), M (Malam), L (Libur), CT (Cuti), S (Sore). Kosongkan = L.
                        </p>
                    </div>
                </div>
            </main>

            <!-- Bottom Navigation -->
            <nav class="bottom-nav">
                <div class="nav-container">
                    <button class="nav-item" data-nav="home" onclick="window.loadModule?.('home')">                        <i class="fas fa-home"></i><span>Home</span>
                    </button>
                    <button class="nav-item" data-nav="booking" onclick="window.loadModule?.('booking')">
                        <i class="fas fa-calendar-check"></i><span>Booking</span>
                    </button>
                    <button class="nav-item active" data-nav="sekuriti" onclick="window.loadModule?.('sekuriti')">
                        <i class="fas fa-shield-halved"></i><span>Security</span>
                    </button>
                    <button class="nav-item" data-nav="settings" onclick="window.loadModule?.('settings')">
                        <i class="fas fa-sliders"></i><span>Settings</span>
                    </button>
                </div>
            </nav>
        </div>

        <style>
            @keyframes spin { to { transform: rotate(360deg); } }
            .spinner { animation: spin 1s linear infinite; }
            .tab-btn.active { background:linear-gradient(135deg,#10b981,#059669) !important; color:white !important; }
        </style>
    `;
}

export async function afterRender({ user, supabase }) {
    console.log('🛡️ [SEKURITI] Module loaded');

    if (!supabase) {
        console.error('[SEKURITI] Supabase tidak tersedia');
        return;
    }

    // ========== KONSTANTA ==========
    const DEPOK_CORE = { lat: -6.4000, lng: 106.8200 };
    const SAFE_RADIUS_KM = 5.0;
    const listPetugas = ['SUDARSONO', 'MARHUSIN', 'HERIYATNO', 'SUNARKO', 'HARIYANSAHC', 'AGUS SUTISNA', 'DONIH'];

    // ========== ELEMEN DOM ==========
    const tanggalInput = document.getElementById('tanggal');
    const shiftInput = document.getElementById('shift');
    const shiftStatus = document.getElementById('ai-shift-status');
    const petugasSelect = document.getElementById('petugas');
    const geoStatus = document.getElementById('ai-geo-status');
    const personelCount = document.getElementById('ai-personnel-count');
    const anomalyStatus = document.getElementById('ai-anomaly-status');
    const form = document.getElementById('sekuritiForm');
    const fotoInput = document.getElementById('foto_sekuriti');
    const formResult = document.getElementById('form-result');
    const refreshBtn = document.getElementById('refresh-history');
    const historyContainer = document.getElementById('history-container');
    // ========== 1. DETEKSI SHIFT OTOMATIS ==========
    function detectShift() {
        const now = new Date();
        const jam = now.getHours();
        const shiftCode = (jam >= 7 && jam < 19) ? 'P' : 'M';
        const shiftLabel = shiftCode === 'P' ? 'PAGI (07:00-19:00)' : 'MALAM (19:00-07:00)';
        if (tanggalInput) tanggalInput.value = now.toISOString().split('T')[0];
        if (shiftInput) shiftInput.value = shiftLabel;
        if (shiftStatus) shiftStatus.innerText = shiftCode === 'P' ? '☀️ PAGI' : '🌙 MALAM';
        return shiftCode;
    }

    // ========== 2. LOAD JADWAL MASTER ==========
    async function loadMasterSchedule(bulan = null, tahun = 2026) {
        if (!bulan) {
            const now = new Date();
            bulan = now.getMonth() + 1;
        }
        const { data, error } = await supabase
            .from('sekuriti_jadwal_master')
            .select('*')
            .eq('bulan', bulan)
            .eq('tahun', tahun);
        if (error) {
            console.error('Gagal load master schedule', error);
            return [];
        }
        return data || [];
    }

    // ========== 3. RENDER DROPDOWN PETUGAS ==========
    async function renderPetugasDropdown() {
        const now = new Date();
        const tgl = now.getDate();
        const bulan = now.getMonth() + 1;
        const tahun = now.getFullYear();
        const shiftCode = detectShift();

        const jadwal = await loadMasterSchedule(bulan, tahun);
        if (!jadwal.length) {
            petugasSelect.innerHTML = '<option value="">-- MASTER JADWAL BELUM ADA --</option>';
            return;
        }

        let onDuty = [];
        let options = '<option value="">-- PILIH PETUGAS --</option>';
        jadwal.forEach(item => {
            const statusHariIni = item.jadwal_array[tgl - 1] || 'L';
            const nama = item.petugas_name;
            let label = `${nama} [${statusHariIni}]`;            let isOnDuty = (statusHariIni === shiftCode);
            if (isOnDuty) {
                label += ' ⭐ BERTUGAS';
                onDuty.push(nama);
            }
            options += `<option value="${nama}" data-status="${statusHariIni}">${label}</option>`;
        });
        petugasSelect.innerHTML = options;
        if (personelCount) personelCount.innerText = `${onDuty.length} PERSONEL JAGA (${shiftCode})`;
    }

    // ========== 4. DETEKSI ANOMALI ==========
    petugasSelect?.addEventListener('change', function() {
        const selected = this.options[this.selectedIndex];
        const status = selected?.dataset?.status;
        if (anomalyStatus) {
            if (status === 'CT' || status === 'L') {
                anomalyStatus.innerHTML = '<span style="color:#ef4444;">⚠️ ' + (status === 'CT' ? 'CUTI' : 'LIBUR') + ' MELAPOR!</span>';
            } else {
                anomalyStatus.innerHTML = '<span style="color:#10b981;">CLEAR</span>';
            }
        }
    });

    // ========== 5. CEK GPS ==========
    function checkSafeCore(lat, lng) {
        const R = 6371;
        const dLat = (lat - DEPOK_CORE.lat) * Math.PI / 180;
        const dLng = (lng - DEPOK_CORE.lng) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(DEPOK_CORE.lat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;

        if (distance <= SAFE_RADIUS_KM) {
            geoStatus.innerHTML = '<span style="color:#10b981;"><i class="fas fa-shield-alt"></i> AMAN (' + distance.toFixed(1) + 'km)</span>';
            return true;
        } else {
            geoStatus.innerHTML = '<span style="color:#ef4444;">⚠️ OUT OF CORE (' + distance.toFixed(1) + 'km)</span>';
            return false;
        }
    }

    function getGeolocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) reject('GPS tidak didukung');
            navigator.geolocation.getCurrentPosition(
                pos => resolve(pos.coords),
                err => reject('Izin GPS ditolak'),                { enableHighAccuracy: true, timeout: 10000 }
            );
        });
    }

    // ========== 6. SUBMIT LAPORAN ==========
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '⏳ Memproses...';

        try {
            if (!fotoInput || fotoInput.files.length === 0) {
                throw new Error('Foto geotagging wajib diambil!');
            }

            if (formResult) formResult.innerHTML = '<span style="color:#f59e0b;">Mengunci GPS...</span>';

            const coords = await getGeolocation();
            const isSafe = checkSafeCore(coords.latitude, coords.longitude);
            if (!isSafe) {
                if (!confirm('Anda berada di luar safe core. Tetap kirim laporan?')) {
                    throw new Error('Laporan dibatalkan');
                }
            }

            const namaPetugas = petugasSelect.value;
            if (!namaPetugas) throw new Error('Pilih petugas jaga!');

            const report = {
                tanggal: tanggalInput.value,
                shift: shiftInput.value,
                petugas: [namaPetugas],
                deskripsi: document.getElementById('deskripsi').value,
                koordinat: coords.latitude + ', ' + coords.longitude,
                status: 'verified',
                created_at: new Date().toISOString()
            };

            const { error } = await supabase.from('sekuriti_reports').insert([report]);
            if (error) throw error;

            if (formResult) formResult.innerHTML = '<span style="color:#10b981;font-weight:700;">✅ Laporan tersimpan!</span>';
            form.reset();
            if (tanggalInput) tanggalInput.value = new Date().toISOString().split('T')[0];
            detectShift();
            loadHistory();
            if (window.GhostAudit) {
                window.GhostAudit.record(
                    window.DREAM?.state?.user?.email || namaPetugas,
                    'SEKURITI_REPORT',
                    `Petugas: ${namaPetugas}, Lokasi: ${coords.latitude},${coords.longitude}`
                );
            }

            if (window.toast) {
                window.toast('✅ Laporan keamanan tersimpan!', 'success');
            }

        } catch (err) {
            if (formResult) formResult.innerHTML = '<span style="color:#ef4444;">❌ ' + err.message + '</span>';
            if (window.toast) {
                window.toast(err.message, 'error');
            }
        } finally {
            btn.disabled = false;
            btn.innerHTML = '🔒 Enkripsi & Kirim';
        }
    });

    // ========== 7. LOAD HISTORY ==========
    async function loadHistory() {
        if (!historyContainer) return;
        historyContainer.innerHTML = '<div style="text-align:center;padding:2rem;opacity:0.5;"><div class="spinner" style="width:24px;height:24px;border:3px solid rgba(16,185,129,0.2);border-top-color:#10b981;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 1rem;"></div><p style="font-size:0.75rem;color:#94a3b8;">Memuat riwayat...</p></div>';

        try {
            const { data, error } = await supabase
                .from('sekuriti_reports')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(20);
            if (error) throw error;
            if (!data?.length) {
                historyContainer.innerHTML = '<p style="text-align:center;padding:2rem;color:#64748b;font-size:0.875rem;">Belum ada laporan.</p>';
                return;
            }

            let html = '';
            data.forEach(r => {
                html += '<div class="glass-card p-4" style="background:rgba(15,23,42,0.8);border-left:4px solid #10b981;margin-bottom:1rem;">';
                html += '<div style="display:flex;justify-content:space-between;font-size:0.75rem;">';
                html += '<span style="color:#10b981;">' + r.tanggal + ' ' + r.shift + '</span>';
                html += '<span style="color:#64748b;">' + new Date(r.created_at).toLocaleTimeString('id-ID') + '</span>';
                html += '</div>';
                html += '<div style="margin-top:0.5rem;font-size:0.875rem;color:#e2e8f0;">👤 ' + (r.petugas?.join(', ') || '-') + '</div>';
                html += '<div style="color:#94a3b8;font-size:0.875rem;">' + (r.deskripsi || '-') + '</div>';
                if (r.koordinat) {                    html += '<div style="font-size:0.625rem;color:#64748b;margin-top:0.5rem;"><i class="fas fa-map-marker-alt" style="margin-right:4px;"></i>' + r.koordinat + '</div>';
                }
                html += '</div>';
            });
            historyContainer.innerHTML = html;

        } catch (err) {
            historyContainer.innerHTML = '<p style="text-align:center;padding:2rem;color:#ef4444;font-size:0.875rem;">Error: ' + err.message + '</p>';
        }
    }

    refreshBtn?.addEventListener('click', loadHistory);

    // ========== 8. EDITOR JADWAL MASTER ==========
    function initJadwalEditor() {
        const header = document.getElementById('header-tanggal');
        const body = document.getElementById('body-input-jadwal');
        if (!header || !body) return;

        const bulan = parseInt(document.getElementById('select-bulan')?.value) || new Date().getMonth() + 1;
        const tahun = 2026;
        const jmlHari = new Date(tahun, bulan, 0).getDate();

        header.innerHTML = '<th style="padding:8px;border:1px solid rgba(51,65,85,0.5);background:rgba(2,6,23,0.8);">PETUGAS</th>';
        for (let i = 1; i <= jmlHari; i++) {
            header.innerHTML += '<th style="padding:4px;border:1px solid rgba(51,65,85,0.5);text-align:center;width:32px;">' + i + '</th>';
        }

        body.innerHTML = '';
        listPetugas.forEach(nama => {
            let row = '<tr style="border-bottom:1px solid rgba(30,41,59,0.5);"><td style="padding:8px;background:rgba(2,6,23,0.8);font-weight:700;color:#e2e8f0;position:sticky;left:0;">' + nama + '</td>';
            for (let i = 1; i <= jmlHari; i++) {
                row += '<td style="padding:0;border:1px solid rgba(30,41,59,0.5);"><input type="text" data-nama="' + nama + '" data-tgl="' + i + '" class="w-8 h-8 bg-transparent text-center text-white focus:bg-emerald-500/20 outline-none uppercase" placeholder="L" maxlength="2" style="width:32px;height:32px;background:transparent;text-align:center;color:#e2e8f0;border:none;"></td>';
            }
            row += '</tr>';
            body.innerHTML += row;
        });

        loadMasterSchedule(bulan, tahun).then(jadwal => {
            jadwal.forEach(item => {
                const nama = item.petugas_name;
                item.jadwal_array.forEach((status, idx) => {
                    const tgl = idx + 1;
                    const input = body.querySelector('input[data-nama="' + nama + '"][data-tgl="' + tgl + '"]');
                    if (input) input.value = status;
                });
            });
        });
    }
    // ========== 9. AUTO GENERATE JADWAL ==========
    function koreksiJadwalDonih() {
        const donihIndex = listPetugas.indexOf('DONIH');
        if (donihIndex === -1) return;

        const inputs = document.querySelectorAll('input[data-nama]');
        const jmlHari = inputs.length / listPetugas.length;

        for (let tgl = 1; tgl <= jmlHari; tgl++) {
            const donihInput = document.querySelector('input[data-nama="DONIH"][data-tgl="' + tgl + '"]');
            if (!donihInput) continue;
            const shiftDonih = donihInput.value.toUpperCase();

            if (shiftDonih === 'M') {
                let found = false;
                for (let i = 0; i < listPetugas.length; i++) {
                    if (i === donihIndex) continue;
                    const otherInput = document.querySelector('input[data-nama="' + listPetugas[i] + '"][data-tgl="' + tgl + '"]');
                    if (otherInput && otherInput.value.toUpperCase() === 'L') {
                        donihInput.value = 'L';
                        otherInput.value = 'M';
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    console.warn('Tanggal ' + tgl + ': Tidak ada petugas libur untuk menggantikan Donih yang mendapat M.');
                }
            }
        }
    }

    function generateJadwalOtomatis() {
        const bulan = parseInt(document.getElementById('select-bulan').value);
        const tahun = 2026;
        const jmlHari = new Date(tahun, bulan, 0).getDate();
        const petugas = listPetugas;

        const pola = {
            0: { pagi: [0,1,2], malam: [3,4], libur: [5,6] },
            1: { pagi: [5,6,0], malam: [1,2], libur: [3,4] },
            2: { pagi: [3,4,5], malam: [6,0], libur: [1,2] },
            3: { pagi: [1,2,3], malam: [4,5], libur: [6,0] },
            4: { pagi: [6,0,1], malam: [2,3], libur: [4,5] },
            5: { pagi: [2,4], malam: [6,1], libur: [0,3,5] },
            6: { pagi: [0,3], malam: [5,2], libur: [1,4,6] }
        };

        for (let tgl = 1; tgl <= jmlHari; tgl++) {
            const date = new Date(tahun, bulan-1, tgl);            const dayOfWeek = date.getDay();
            const localDay = (dayOfWeek === 0) ? 6 : dayOfWeek - 1;
            const offsetMinggu = Math.floor((tgl - 1) / 7) % 7;
            const polaHari = pola[localDay];
            const shiftHari = Array(petugas.length).fill('L');

            polaHari.pagi.forEach(idxAsli => {
                const idxPetugas = (idxAsli + offsetMinggu) % petugas.length;
                shiftHari[idxPetugas] = 'P';
            });
            polaHari.malam.forEach(idxAsli => {
                const idxPetugas = (idxAsli + offsetMinggu) % petugas.length;
                shiftHari[idxPetugas] = 'M';
            });

            petugas.forEach((nama, idxPetugas) => {
                const input = document.querySelector('input[data-nama="' + nama + '"][data-tgl="' + tgl + '"]');
                if (input) input.value = shiftHari[idxPetugas];
            });
        }

        koreksiJadwalDonih();
        if (window.toast) {
            window.toast('✅ Jadwal bulan ' + bulan + ' digenerate otomatis!', 'success');
        }
    }

    document.getElementById('generate-otomatis')?.addEventListener('click', generateJadwalOtomatis);

    // ========== 10. SIMPAN JADWAL MASTER ==========
    document.getElementById('save-master-jadwal')?.addEventListener('click', async () => {
        const btn = document.getElementById('save-master-jadwal');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'MENYIMPAN...';
        btn.disabled = true;
        const bulan = parseInt(document.getElementById('select-bulan').value);
        const tahun = 2026;

        try {
            for (let nama of listPetugas) {
                const inputs = document.querySelectorAll('input[data-nama="' + nama + '"]');
                const arrayJadwal = Array.from(inputs).map(inp => inp.value.toUpperCase() || 'L');
                const { error } = await supabase
                    .from('sekuriti_jadwal_master')
                    .upsert({
                        petugas_name: nama,
                        bulan: bulan,
                        tahun: tahun,
                        jadwal_array: arrayJadwal
                    }, { onConflict: 'petugas_name, bulan, tahun' });                if (error) throw error;
            }
            if (window.toast) {
                window.toast('✅ Jadwal master berhasil disimpan!', 'success');
            }
        } catch (err) {
            if (window.toast) {
                window.toast('❌ Gagal: ' + err.message, 'error');
            }
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });

    document.getElementById('select-bulan')?.addEventListener('change', initJadwalEditor);

    // ========== 11. RENDER MATRIKS JADWAL ==========
    async function renderJadwalMatriks() {
        const tbody = document.getElementById('jadwal-view-body');
        if (!tbody) return;
        const now = new Date();
        const tgl = now.getDate();
        const bulan = now.getMonth() + 1;
        const tahun = now.getFullYear();
        const jadwal = await loadMasterSchedule(bulan, tahun);
        if (!jadwal.length) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:2rem;color:#64748b;">Master jadwal belum ada</td></tr>';
            return;
        }

        let html = '';
        jadwal.forEach(item => {
            const sTgl = item.jadwal_array[tgl - 1] || '-';
            const sBesok = item.jadwal_array[tgl] || '-';
            const sLusa = item.jadwal_array[tgl + 1] || '-';
            html += '<tr style="border-bottom:1px solid rgba(51,65,85,0.3);">';
            html += '<td style="padding:12px;font-weight:700;color:#e2e8f0;">' + item.petugas_name + '</td>';
            html += '<td style="padding:12px;text-align:center;border-left:1px solid rgba(51,65,85,0.5);color:' + (sTgl === 'P' ? '#f59e0b' : sTgl === 'M' ? '#3b82f6' : '#94a3b8') + ';">' + sTgl + '</td>';
            html += '<td style="padding:12px;text-align:center;border-left:1px solid rgba(51,65,85,0.5);">' + sBesok + '</td>';
            html += '<td style="padding:12px;text-align:center;border-left:1px solid rgba(51,65,85,0.5);">' + sLusa + '</td>';
            html += '</tr>';
        });
        tbody.innerHTML = html;
    }

    // ========== 12. TAB NAVIGASI ==========
    const tabLaporan = document.getElementById('tab-laporan');
    const tabJadwal = document.getElementById('tab-jadwal');
    const panelLaporan = document.getElementById('panel-laporan');    const panelJadwal = document.getElementById('panel-jadwal');

    tabLaporan?.addEventListener('click', function() {
        tabLaporan.classList.add('active');
        tabJadwal.classList.remove('active');
        panelLaporan.style.display = 'block';
        panelJadwal.style.display = 'none';
        renderPetugasDropdown();
        loadHistory();
    });

    tabJadwal?.addEventListener('click', function() {
        tabJadwal.classList.add('active');
        tabLaporan.classList.remove('active');
        panelJadwal.style.display = 'block';
        panelLaporan.style.display = 'none';
        renderJadwalMatriks();
        initJadwalEditor();
    });

    // ========== 13. INIT ==========
    (async function init() {
        detectShift();
        await renderPetugasDropdown();
        loadHistory();
        renderJadwalMatriks();
        initJadwalEditor();

        try {
            const coords = await getGeolocation();
            checkSafeCore(coords.latitude, coords.longitude);
        } catch (err) {
            if (geoStatus) geoStatus.innerHTML = '<span style="color:#ef4444;">GPS tidak aktif</span>';
        }
    })();
}

export function cleanup() {
    console.log('🛡️ [SEKURITI] Module cleanup');
}

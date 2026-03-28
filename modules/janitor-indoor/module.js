export default {
    render: (ctx) => {
        const userName = (ctx.user?.name || 'GUEST').toUpperCase();
        return `
            <div id="janitor-in-root">
                <div class="ji-panel ji-header" style="margin-bottom:1.5rem">
                    <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
                        <div style="font-size:3rem;">🧹</div>
                        <div>
                            <div class="ji-title">JANITOR INDOOR</div>
                            <div style="font-size:0.75rem;color:#94a3b8;">Ceklis Harian · 11 Petugas · Gedung & Lantai</div>
                        </div>
                        <div style="margin-left:auto; display:flex; gap:0.5rem;">
                            <span style="background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);color:#a855f7;padding:0.4rem 1rem;border-radius:30px;font-size:0.8rem;">${userName}</span>
                        </div>
                    </div>
                </div>

                <div class="ji-panel" style="background:rgba(20,184,166,0.08);border-color:#14b8a6;margin-bottom:1.5rem;">
                    <div style="font-size:0.85rem;color:#e2e8f0;">
                        <strong>📋 Info Kerja:</strong><br>
                        • Jam: Senin-Jumat 06:30-17:00, Sabtu 06:30-14:00, Minggu LIBUR<br>
                        • Ceklis: 3x/hari (Pagi ~07:00, Siang ~12:00, Sore ~16:00)<br>
                        • Petugas: 11 orang (SD:3, SMP:4, SMA:3, Serbaguna:1)<br>
                        • <strong style="color:#ef4444;">Area wajib diisi!</strong>
                    </div>
                </div>

                <div class="ji-tabs">
                    <div class="ji-tab active" data-tab="form">📝 Form Ceklis</div>
                    <div class="ji-tab" data-tab="history">📜 Riwayat</div>
                    <div class="ji-tab" data-tab="schedule">📅 Jadwal</div>
                </div>

                <div id="ji-form-tab" class="tab-content">
                    <div class="ji-panel">
                        <h3 style="font-size:1.2rem;font-weight:700;margin-bottom:1.5rem;color:#14b8a6;">📝 Form Ceklis Indoor</h3>
                        <form id="jiForm">
                            <div class="ji-form-grid">
                                <div><label class="ji-label">Tanggal *</label><input type="date" id="ji-tanggal" class="ji-input" required></div>
                                <div><label class="ji-label">Ceklis Laporan *</label><select id="ji-shift" class="ji-select" required><option value="pagi">Pagi (~07:00)</option><option value="siang">Siang (~12:00)</option><option value="sore">Sore (~16:00)</option></select></div>
                                <div><label class="ji-label">Petugas *</label><input type="text" id="ji-petugas" class="ji-input" placeholder="Nama petugas" value="${ctx.user?.name || ''}" required></div>
                                <div><label class="ji-label">Area / Lokasi *</label><input type="text" id="ji-area" class="ji-input" placeholder="Contoh: SD - Lantai 1" required><span style="font-size:0.65rem;color:#94a3b8;">Wajib diisi (sesuai penugasan)</span></div>
                                <div><label class="ji-label">Gedung</label><input type="text" id="ji-gedung" class="ji-input" placeholder="SD / SMP / SMA / Serbaguna"></div>
                                <div><label class="ji-label">Lantai</label><input type="text" id="ji-lantai" class="ji-input" placeholder="1 / 2 / 3 / 3-4"></div>
                            </div>

                            <div style="margin-top:1.5rem;">
                                <h4 style="font-size:1rem;font-weight:700;color:#14b8a6;margin-bottom:0.5rem;">🚽 Toilet</h4>
                                <div class="ji-checkbox-grid" id="toilet-grid">
                                    <label><input type="checkbox" id="toilet_pintu_utama"> Pintu Utama</label>
                                    <label><input type="checkbox" id="toilet_pintu_kubikal"> Pintu Kubikal</label>
                                    <label><input type="checkbox" id="toilet_kaca"> Kaca / Cermin</label>
                                    <label><input type="checkbox" id="toilet_exhaust"> Exhaust</label>
                                    <label><input type="checkbox" id="toilet_dinding"> Dinding</label>
                                    <label><input type="checkbox" id="toilet_tempat_wudhu"> Tempat Wudhu</label>
                                    <label><input type="checkbox" id="toilet_lantai"> Lantai</label>
                                    <label><input type="checkbox" id="toilet_floor_drain"> Floor Drain</label>
                                    <label><input type="checkbox" id="toilet_kloset"> Kloset</label>
                                    <label><input type="checkbox" id="toilet_plafon"> Plafon / Flapond</label>
                                    <label><input type="checkbox" id="toilet_tempat_sampah"> Tempat Sampah</label>
                                </div>
                            </div>

                            <div style="margin-top:1.5rem;">
                                <h4 style="font-size:1rem;font-weight:700;color:#14b8a6;margin-bottom:0.5rem;">🏢 Ruangan & Area Umum</h4>
                                <div class="ji-checkbox-grid" id="ruang-grid">
                                    <label><input type="checkbox" id="ruang_loby_utama"> Loby Utama</label>
                                    <label><input type="checkbox" id="ruang_teras"> Teras</label>
                                    <label><input type="checkbox" id="ruang_lorong_utama"> Lorong Utama</label>
                                    <label><input type="checkbox" id="ruang_balkon"> Balkon</label>
                                    <label><input type="checkbox" id="ruang_pintu_utama"> Pintu Utama</label>
                                    <label><input type="checkbox" id="ruang_pintu_kelas"> Pintu Kelas</label>
                                    <label><input type="checkbox" id="ruang_jendela"> Jendela</label>
                                    <label><input type="checkbox" id="ruang_kelas"> Kelas</label>
                                    <label><input type="checkbox" id="ruang_aula"> Aula</label>
                                    <label><input type="checkbox" id="ruang_sentra_musik"> Sentra Musik</label>
                                    <label><input type="checkbox" id="ruang_sentra_kreasi"> Sentra Kreasi</label>
                                    <label><input type="checkbox" id="ruang_uks"> UKS</label>
                                    <label><input type="checkbox" id="ruang_psikolog"> Psikolog</label>
                                    <label><input type="checkbox" id="ruang_lab_kom"> Lab Kom</label>
                                    <label><input type="checkbox" id="ruang_lab_ipa"> Lab IPA</label>
                                    <label><input type="checkbox" id="ruang_perpus"> Perpustakaan</label>
                                    <label><input type="checkbox" id="ruang_kepsek"> Kepala Sekolah</label>
                                    <label><input type="checkbox" id="ruang_guru_laki"> R. Guru Laki</label>
                                    <label><input type="checkbox" id="ruang_guru_perempuan"> R. Guru Perempuan</label>
                                    <label><input type="checkbox" id="ruang_pemasaran"> R. Pemasaran</label>
                                    <label><input type="checkbox" id="ruang_admin_tu"> R. Admin TU</label>
                                    <label><input type="checkbox" id="ruang_rapat"> R. Rapat</label>
                                    <label><input type="checkbox" id="ruang_ceo"> R. CEO</label>
                                    <label><input type="checkbox" id="ruang_kabid"> R. Kabid</label>
                                    <label><input type="checkbox" id="ruang_osis"> R. Osis</label>
                                    <label><input type="checkbox" id="ruang_mushalla"> R. Mushalla</label>
                                    <label><input type="checkbox" id="ruang_inklusi"> R. Inklusi</label>
                                    <label><input type="checkbox" id="ruang_gudang_olahraga"> Gudang Olahraga</label>
                                    <label><input type="checkbox" id="ruang_serbaguna"> R. Serbaguna</label>
                                    <label><input type="checkbox" id="ruang_masjid"> R. Masjid</label>
                                    <label><input type="checkbox" id="ruang_kantin"> Kantin</label>
                                    <label><input type="checkbox" id="ruang_saung_besar"> Saung Besar</label>
                                    <label><input type="checkbox" id="ruang_saung_kecil"> Saung Kecil</label>
                                    <label><input type="checkbox" id="ruang_pos"> Pos</label>
                                    <label><input type="checkbox" id="ruang_gudang_umum"> Gudang Umum</label>
                                    <label><input type="checkbox" id="ruang_tangga"> Tangga</label>
                                    <label><input type="checkbox" id="ruang_lift"> Lift</label>
                                    <label><input type="checkbox" id="ruang_lainnya"> Keterangan Lain</label>
                                </div>
                            </div>

                            <div><label class="ji-label">Catatan</label><textarea id="ji-catatan" rows="2" class="ji-textarea" placeholder="Catatan tambahan..."></textarea></div>
                            <div class="ji-form-grid">
                                <div><label class="ji-label">Foto Sebelum</label><input type="file" id="ji-foto-sebelum" accept="image/*" class="ji-input"></div>
                                <div><label class="ji-label">Foto Sesudah</label><input type="file" id="ji-foto-sesudah" accept="image/*" class="ji-input"></div>
                            </div>
                            <button type="submit" class="ji-btn ji-btn-primary" id="ji-submit"><i class="fas fa-save"></i> Simpan Ceklis Indoor</button>
                            <div id="ji-form-result" style="margin-top:1rem;text-align:center;"></div>
                        </form>
                    </div>
                </div>

                <div id="ji-history-tab" class="tab-content" style="display:none;">
                    <div class="ji-panel">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
                            <h3 style="font-size:1.2rem;font-weight:700;color:#14b8a6;">📜 Riwayat Ceklis Indoor</h3>
                            <button id="ji-refresh-history" class="ji-btn ji-btn-sm"><i class="fas fa-sync-alt"></i> Refresh</button>
                        </div>
                        <div class="ji-table-wrap">
                            <table class="ji-table"><thead> tr<th>Tanggal</th><th>Ceklis</th><th>Petugas</th><th>Area</th><th>Gedung</th><th>Status</th><th>Aksi</th> </thead><tbody id="ji-history-body"><tr><td colspan="7">Memuat...</td></tr></tbody></table>
                        </div>
                    </div>
                </div>

                <div id="ji-schedule-tab" class="tab-content" style="display:none;">
                    <div class="ji-panel">
                        <h3 style="font-size:1.2rem;font-weight:700;margin-bottom:1.5rem;color:#14b8a6;">📅 Penugasan Petugas Indoor</h3>
                        <div class="ji-table-wrap">
                            <table class="ji-table"><thead> tr<th>Gedung</th><th>Lantai</th><th>Petugas</th><th>Ceklis/Hari</th> </thead><tbody>
                                <tr><td>SD</td><td>1</td><td>Ahmad</td><td>3x (Pagi, Siang, Sore)</td></tr>
                                <tr><td>SD</td><td>2</td><td>Siti</td><td>3x</td></tr>
                                <tr><td>SD</td><td>3</td><td>Budi</td><td>3x</td></tr>
                                <tr><td>SMP</td><td>1</td><td>Dewi</td><td>3x</td></tr>
                                <tr><td>SMP</td><td>2</td><td>Eko</td><td>3x</td></tr>
                                <tr><td>SMP</td><td>3</td><td>Fitri</td><td>3x</td></tr>
                                <tr><td>SMP Baru</td><td>1</td><td>Gunawan</td><td>3x</td></tr>
                                <tr><td>SMA</td><td>1</td><td>Hadi</td><td>3x</td></tr>
                                <tr><td>SMA</td><td>2</td><td>Indah</td><td>3x</td></tr>
                                <tr><td>SMA</td><td>3-4</td><td>Joko</td><td>3x</td></tr>
                                <tr><td>Serbaguna</td><td>1</td><td>Karni</td><td>3x</td></tr>
                            </tbody></table>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                .ji-panel { background: rgba(15,23,42,0.88); backdrop-filter: blur(18px); border: 1px solid rgba(20,184,166,0.25); border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; }
                .ji-header { background: linear-gradient(135deg, rgba(20,184,166,0.15), rgba(20,184,166,0.05)); border-left: 4px solid #14b8a6; }
                .ji-title { font-size: 1.8rem; font-weight: 800; background: linear-gradient(135deg, #14b8a6, #0d9488); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .ji-tabs { display: flex; gap: 0.5rem; border-bottom: 2px solid rgba(20,184,166,0.3); margin-bottom: 1.5rem; overflow-x: auto; }
                .ji-tab { padding: 0.65rem 1.5rem; background: rgba(255,255,255,0.04); border: 1px solid transparent; border-radius: 8px 8px 0 0; cursor: pointer; font-weight: 600; color: #94a3b8; white-space: nowrap; }
                .ji-tab:hover { background: rgba(20,184,166,0.08); color: #e2e8f0; }
                .ji-tab.active { background: rgba(20,184,166,0.18); border-color: #14b8a6; color: #14b8a6; }
                .ji-form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr)); gap: 1rem; margin-bottom: 1rem; }
                .ji-label { display: block; font-size: 0.75rem; color: #94a3b8; margin-bottom: 0.25rem; text-transform: uppercase; }
                .ji-input, .ji-select, .ji-textarea { width: 100%; padding: 0.75rem 1rem; background: rgba(0,0,0,0.3); border: 1.5px solid rgba(20,184,166,0.3); border-radius: 8px; color: #e2e8f0; font-size: 0.9rem; }
                .ji-input:focus, .ji-select:focus, .ji-textarea:focus { border-color: #14b8a6; box-shadow: 0 0 0 3px rgba(20,184,166,0.2); outline: none; }
                .ji-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: 0.2s; border: none; }
                .ji-btn-primary { background: linear-gradient(135deg, #14b8a6, #0d9488); color: #020617; width: 100%; }
                .ji-btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(20,184,166,0.4); }
                .ji-btn-sm { padding: 0.4rem 1rem; font-size: 0.8rem; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #e2e8f0; }
                .ji-btn-sm:hover { background: rgba(20,184,166,0.2); border-color: #14b8a6; }
                .ji-table-wrap { overflow-x: auto; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); }
                table.ji-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
                table.ji-table thead { background: rgba(0,0,0,0.3); }
                table.ji-table th { padding: 0.75rem 1rem; text-align: left; font-size: 0.7rem; text-transform: uppercase; color: #94a3b8; }
                table.ji-table td { padding: 0.75rem 1rem; border-top: 1px solid rgba(255,255,255,0.05); }
                .ji-badge { display: inline-block; padding: 0.2rem 0.75rem; border-radius: 20px; font-size: 0.7rem; font-weight: 600; }
                .ji-badge-pending { background: rgba(245,158,11,0.2); color: #f59e0b; }
                .ji-badge-verified { background: rgba(16,185,129,0.2); color: #10b981; }
                .ji-checkbox-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px,1fr)); gap: 0.5rem; margin: 0.5rem 0 1rem; }
                .ji-checkbox-grid label { display: flex; align-items: center; gap: 0.25rem; font-size: 0.85rem; color: #cbd5e1; }
                .ji-spinner { width: 40px; height: 40px; border: 3px solid rgba(20,184,166,0.2); border-top-color: #14b8a6; border-radius: 50%; animation: ji-spin 1s linear infinite; }
                @keyframes ji-spin { to { transform: rotate(360deg); } }
            </style>
        `;
    },

    afterRender: async (ctx) => {
        const supabase = ctx.supabase;
        const currentUser = ctx.user;
        const toast = ctx.toast || ((msg, type) => alert(`${type?.toUpperCase()}: ${msg}`));

        function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
        function fmtDate(d) { return d ? new Date(d).toLocaleDateString('id-ID', {day:'2-digit',month:'short',year:'numeric'}) : '—'; }

        async function loadHistory() {
            const tbody = document.getElementById('ji-history-body');
            if (!tbody || !supabase) return;
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;"><div class="ji-spinner"></div><p>Memuat...</p></td></tr>';
            try {
                const { data, error } = await supabase
                    .from('janitor_indoor')
                    .select('id, tanggal, shift, petugas, area, gedung, lantai, status, created_at')
                    .order('created_at', { ascending: false })
                    .limit(50);
                if (error) throw error;
                if (!data || data.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;">Belum ada data</td></tr>';
                    return;
                }
                let html = '';
                data.forEach(item => {
                    let statusClass = 'ji-badge-pending', statusText = 'Pending';
                    if (item.status === 'verified') { statusClass = 'ji-badge-verified'; statusText = 'Selesai'; }
                    html += `<tr>
                        <td>${fmtDate(item.tanggal)}</td>
                        <td>${esc(item.shift)}</td>
                        <td>${esc(item.petugas)}</td>
                        <td>${esc(item.area || '—')}</td>
                        <td>${esc(item.gedung || '')}</td>
                        <td><span class="ji-badge ${statusClass}">${statusText}</span></td>
                        <td><button class="ji-btn ji-btn-sm" data-id="${item.id}" data-action="detail"><i class="fas fa-eye"></i></button></td>
                    </tr>`;
                });
                tbody.innerHTML = html;
            } catch (err) {
                console.error(err);
                tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:#ef4444;">Gagal memuat: ${esc(err.message)}</td></tr>`;
            }
        }

        async function handleSubmit(e) {
            e.preventDefault();
            const tanggal = document.getElementById('ji-tanggal')?.value;
            const shift = document.getElementById('ji-shift')?.value;
            const petugas = document.getElementById('ji-petugas')?.value.trim();
            const area = document.getElementById('ji-area')?.value.trim();
            const gedung = document.getElementById('ji-gedung')?.value.trim() || null;
            const lantai = document.getElementById('ji-lantai')?.value.trim() || null;
            const catatan = document.getElementById('ji-catatan')?.value.trim() || null;

            if (!tanggal || !petugas || !area) {
                toast('Tanggal, Petugas, dan Area wajib diisi!', 'warning');
                return;
            }

            const toilet = {};
            document.querySelectorAll('#toilet-grid input[type=checkbox]').forEach(cb => {
                const id = cb.id.replace('toilet_', '');
                toilet[id] = cb.checked;
            });
            const ruangan = {};
            document.querySelectorAll('#ruang-grid input[type=checkbox]').forEach(cb => {
                const id = cb.id.replace('ruang_', '');
                ruangan[id] = cb.checked;
            });
            const items = { toilet, ruangan };

            const data = {
                tanggal, shift, petugas, area, gedung, lantai,
                items, catatan,
                status: 'pending',
                created_at: new Date().toISOString(),
                created_by: petugas
            };

            const btn = document.getElementById('ji-submit');
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyimpan...';
            try {
                if (!supabase) throw new Error('Supabase tidak tersedia');
                const { error } = await supabase.from('janitor_indoor').insert([data]);
                if (error) throw error;
                toast('Ceklis indoor berhasil disimpan!', 'success');
                document.getElementById('jiForm').reset();
                document.getElementById('ji-tanggal').value = new Date().toISOString().split('T')[0];
                document.querySelectorAll('#toilet-grid input[type=checkbox]').forEach(cb => cb.checked = false);
                document.querySelectorAll('#ruang-grid input[type=checkbox]').forEach(cb => cb.checked = false);
                if (document.querySelector('.ji-tab.active')?.dataset.tab === 'history') loadHistory();
            } catch (err) {
                console.error(err);
                toast('Gagal: ' + err.message, 'error');
                document.getElementById('ji-form-result').innerHTML = `<span style="color:#ef4444;">❌ ${err.message}</span>`;
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        }

        function switchTab(tab) {
            document.querySelectorAll('.ji-tab').forEach(t => t.classList.remove('active'));
            const activeTab = document.querySelector(`.ji-tab[data-tab="${tab}"]`);
            if (activeTab) activeTab.classList.add('active');
            document.getElementById('ji-form-tab').style.display = tab === 'form' ? 'block' : 'none';
            document.getElementById('ji-history-tab').style.display = tab === 'history' ? 'block' : 'none';
            document.getElementById('ji-schedule-tab').style.display = tab === 'schedule' ? 'block' : 'none';
            if (tab === 'history') loadHistory();
        }

        // Attach events
        document.querySelectorAll('.ji-tab').forEach(btn => {
            btn.addEventListener('click', () => switchTab(btn.dataset.tab));
        });
        const form = document.getElementById('jiForm');
        if (form) form.addEventListener('submit', handleSubmit);
        const refreshBtn = document.getElementById('ji-refresh-history');
        if (refreshBtn) refreshBtn.addEventListener('click', loadHistory);
        const tbody = document.getElementById('ji-history-body');
        if (tbody) {
            tbody.addEventListener('click', (e) => {
                const btn = e.target.closest('[data-action="detail"]');
                if (btn) toast(`Detail ID: ${btn.dataset.id} (fitur detail segera hadir)`, 'info');
            });
        }
        const tglInput = document.getElementById('ji-tanggal');
        if (tglInput) tglInput.value = new Date().toISOString().split('T')[0];

        if (document.getElementById('ji-history-tab').style.display !== 'none') loadHistory();
    }
};

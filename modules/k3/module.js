/**
 * ⚠️ MODUL K3 – Dream OS v2.1
 * Laporan K3 dengan form dinamis berdasarkan jenis (kerusakan, kehilangan, kebersihan)
 * Fitur:
 * - Kamera untuk foto evidence
 * - Field dinamis sesuai jenis laporan
 * - Riwayat laporan hari ini
 * - Terintegrasi dengan Supabase, GhostAudit, dan toast
 */

export async function render() {
    return `
        <div class="max-w-6xl mx-auto p-4">
            <!-- Header -->
            <div class="text-center mb-6">
                <h1 class="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                    ⚠️ LAPORAN K3
                </h1>
                <p class="text-xs text-slate-400 font-mono mt-1">ISO 45001 • Smart Evidence System</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Kolom Kiri: Form Laporan -->
                <div class="glass-card p-6 rounded-3xl border border-orange-500/30">
                    <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
                        <i class="fas fa-pen-alt text-orange-500"></i> Form Laporan Baru
                    </h2>

                    <form id="k3Form" class="space-y-5">
                        <!-- Baris Tanggal & Waktu -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-xs font-mono text-slate-400 uppercase">Tanggal Kejadian *</label>
                                <input type="date" id="tanggal" required class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500">
                            </div>
                            <div>
                                <label class="text-xs font-mono text-slate-400 uppercase">Waktu Kejadian</label>
                                <input type="time" id="waktu" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500">
                            </div>
                        </div>

                        <!-- Lokasi -->
                        <div>
                            <label class="text-xs font-mono text-slate-400 uppercase">Lokasi *</label>
                            <input type="text" id="lokasi" required placeholder="Contoh: Gedung A Lantai 2" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500">
                        </div>

                        <!-- Jenis Laporan -->
                        <div>
                            <label class="text-xs font-mono text-slate-400 uppercase">Jenis Laporan *</label>
                            <select id="jenis_laporan" required class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500">
                                <option value="">Pilih Jenis</option>
                                <option value="kerusakan">🔧 Kerusakan</option>
                                <option value="kehilangan">🔒 Kehilangan</option>
                                <option value="kebersihan">🧹 Kebersihan</option>
                            </select>
                        </div>

                        <!-- Field Dinamis -->
                        <div id="dynamic-fields"></div>

                        <!-- Deskripsi -->
                        <div>
                            <label class="text-xs font-mono text-slate-400 uppercase">Deskripsi Kejadian *</label>
                            <textarea id="deskripsi" required rows="3" placeholder="Jelaskan kronologi kejadian" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500"></textarea>
                        </div>

                        <!-- Korban & Tindakan -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-xs font-mono text-slate-400 uppercase">Korban</label>
                                <input type="text" id="korban" placeholder="Nama korban atau 'Tidak ada'" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white">
                            </div>
                            <div>
                                <label class="text-xs font-mono text-slate-400 uppercase">Tindakan Pertama</label>
                                <textarea id="tindakan" rows="1" placeholder="Tindakan yang sudah dilakukan" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white"></textarea>
                            </div>
                        </div>

                        <!-- Pelapor & No HP -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-xs font-mono text-slate-400 uppercase">Nama Pelapor *</label>
                                <input type="text" id="pelapor" required placeholder="Nama lengkap" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white">
                            </div>
                            <div>
                                <label class="text-xs font-mono text-slate-400 uppercase">No. HP Pelapor</label>
                                <input type="tel" id="no_hp" placeholder="08xxxxxxxxxx" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white">
                            </div>
                        </div>

                        <!-- Foto Evidence dengan Kamera -->
                        <div class="border-t border-slate-700 pt-4">
                            <label class="text-xs font-mono text-orange-400 uppercase flex items-center gap-2">
                                <i class="fas fa-camera-retro"></i> FOTO EVIDENCE
                            </label>
                            <div id="k3PhotoPreview" class="photo-preview mt-2 border-2 border-dashed border-orange-500 rounded-xl p-4 text-center min-h-[120px] flex items-center justify-center">
                                <span class="text-slate-400 text-sm">Belum ada foto</span>
                            </div>
                            <input type="hidden" id="k3PhotoData">
                            <button type="button" id="btn-take-photo" class="mt-3 w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white p-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2">
                                <i class="fas fa-camera"></i> AMBIL FOTO
                            </button>
                        </div>

                        <!-- Submit -->
                        <button type="submit" id="submit-btn" class="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 text-white p-4 rounded-xl font-black tracking-widest uppercase shadow-xl transition-all active:scale-95">
                            <i class="fas fa-paper-plane mr-2"></i> KIRIM LAPORAN
                        </button>
                        <div id="form-result" class="text-center text-sm font-mono"></div>
                    </form>
                </div>

                <!-- Kolom Kanan: Riwayat Laporan -->
                <div class="glass-card p-6 rounded-3xl border border-orange-500/30">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-lg font-bold flex items-center gap-2">
                            <i class="fas fa-history text-orange-500"></i> Riwayat Laporan
                        </h2>
                        <button id="refresh-history" class="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded-full transition-colors border border-slate-600">
                            <i class="fas fa-sync-alt mr-1"></i> Refresh
                        </button>
                    </div>

                    <div class="overflow-x-auto scroll-custom max-h-[600px]">
                        <table class="min-w-full text-xs">
                            <thead class="bg-slate-800 sticky top-0">
                                <tr class="text-left text-slate-400">
                                    <th class="p-2">No</th>
                                    <th class="p-2">Tanggal</th>
                                    <th class="p-2">Lokasi</th>
                                    <th class="p-2">Jenis</th>
                                    <th class="p-2">Pelapor</th>
                                    <th class="p-2">Status</th>
                                </tr>
                            </thead>
                            <tbody id="history-table-body">
                                <tr><td colspan="6" class="text-center py-6 text-slate-500">Memuat data...</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Link Kembali -->
            <div class="text-center mt-6">
                <a href="#" onclick="window.DREAM.load('home'); return false;" class="text-blue-400 hover:text-blue-300 text-sm">
                    <i class="fas fa-arrow-left mr-1"></i> Kembali ke Dashboard
                </a>
            </div>
        </div>
    `;
}

export async function afterRender() {
    console.log('[K3] Module loaded');

    const supabase = window.supabase;
    if (!supabase) {
        console.error('[K3] Supabase tidak tersedia');
        return;
    }

    // ========== ELEMEN DOM ==========
    const jenisSelect = document.getElementById('jenis_laporan');
    const dynamicFields = document.getElementById('dynamic-fields');
    const form = document.getElementById('k3Form');
    const resultDiv = document.getElementById('form-result');
    const submitBtn = document.getElementById('submit-btn');
    const refreshBtn = document.getElementById('refresh-history');
    const historyBody = document.getElementById('history-table-body');
    const btnTakePhoto = document.getElementById('btn-take-photo');
    const photoPreview = document.getElementById('k3PhotoPreview');
    const photoDataInput = document.getElementById('k3PhotoData');

    // ========== FIELD TEMPLATES ==========
    const fieldTemplates = {
        kerusakan: `
            <div class="field-section space-y-3 border-l-4 border-orange-400 pl-4 py-2 bg-slate-800/50 rounded-r-xl">
                <h4 class="font-semibold text-orange-400">🔧 Detail Kerusakan</h4>
                <div>
                    <label class="text-xs font-mono text-slate-400">Kategori Kerusakan</label>
                    <input type="text" id="kategori_kerusakan" placeholder="Contoh: Listrik, Plumbing" class="w-full p-2 rounded-lg bg-slate-700 border border-slate-600">
                </div>
                <div>
                    <label class="text-xs font-mono text-slate-400">Prioritas</label>
                    <select id="priority" class="w-full p-2 rounded-lg bg-slate-700 border border-slate-600">
                        <option value="rendah">Rendah</option>
                        <option value="normal" selected>Normal</option>
                        <option value="tinggi">Tinggi</option>
                    </select>
                </div>
            </div>
        `,
        kehilangan: `
            <div class="field-section space-y-3 border-l-4 border-blue-400 pl-4 py-2 bg-slate-800/50 rounded-r-xl">
                <h4 class="font-semibold text-blue-400">🔒 Detail Kehilangan</h4>
                <div>
                    <label class="text-xs font-mono text-slate-400">Barang Hilang</label>
                    <input type="text" id="barang_hilang" placeholder="Sebutkan barang" class="w-full p-2 rounded-lg bg-slate-700 border border-slate-600">
                </div>
                <div>
                    <label class="text-xs font-mono text-slate-400">Estimasi Nilai (Rp)</label>
                    <input type="number" id="nilai_estimasi" placeholder="Contoh: 500000" class="w-full p-2 rounded-lg bg-slate-700 border border-slate-600">
                </div>
            </div>
        `,
        kebersihan: `
            <div class="field-section space-y-3 border-l-4 border-green-400 pl-4 py-2 bg-slate-800/50 rounded-r-xl">
                <h4 class="font-semibold text-green-400">🧹 Detail Kebersihan</h4>
                <div>
                    <label class="text-xs font-mono text-slate-400">Area Kebersihan</label>
                    <input type="text" id="area_kebersihan" placeholder="Contoh: Toilet, Koridor" class="w-full p-2 rounded-lg bg-slate-700 border border-slate-600">
                </div>
                <div>
                    <label class="text-xs font-mono text-slate-400">Tingkat Kekotoran</label>
                    <select id="tingkat_kekotoran" class="w-full p-2 rounded-lg bg-slate-700 border border-slate-600">
                        <option value="ringan">Ringan</option>
                        <option value="sedang">Sedang</option>
                        <option value="berat">Berat</option>
                    </select>
                </div>
            </div>
        `
    };

    function toggleFields() {
        const jenis = jenisSelect.value;
        dynamicFields.innerHTML = fieldTemplates[jenis] || '';
    }
    jenisSelect.addEventListener('change', toggleFields);
    toggleFields(); // inisialisasi

    // ========== KAMERA SEDERHANA ==========
    function openCamera() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Kamera tidak didukung browser ini');
            return;
        }

        // Buat elemen video overlay sederhana (modal)
        const modal = document.createElement('div');
        modal.id = 'camera-modal';
        modal.style.cssText = `
            position: fixed; inset: 0; background: rgba(0,0,0,0.9);
            z-index: 10000; display: flex; align-items: center; justify-content: center;
            flex-direction: column; padding: 20px;
        `;
        modal.innerHTML = `
            <video id="camera-preview" autoplay playsinline style="max-width: 100%; max-height: 70vh; border-radius: 12px;"></video>
            <div style="display: flex; gap: 20px; margin-top: 20px;">
                <button id="camera-capture" class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold">📸 Ambil Foto</button>
                <button id="camera-close" class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold">✕ Tutup</button>
            </div>
        `;
        document.body.appendChild(modal);

        const video = document.getElementById('camera-preview');
        let stream = null;

        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(s => {
                stream = s;
                video.srcObject = s;
            })
            .catch(err => {
                alert('Gagal akses kamera: ' + err.message);
                modal.remove();
            });

        document.getElementById('camera-capture').addEventListener('click', () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');

            photoPreview.innerHTML = `<img src="${dataUrl}" class="max-w-full max-h-32 rounded-lg">`;
            photoDataInput.value = dataUrl;

            // Hentikan stream dan tutup modal
            if (stream) stream.getTracks().forEach(t => t.stop());
            modal.remove();
        });

        document.getElementById('camera-close').addEventListener('click', () => {
            if (stream) stream.getTracks().forEach(t => t.stop());
            modal.remove();
        });
    }

    btnTakePhoto.addEventListener('click', openCamera);

    // ========== SET TANGGAL DEFAULT ==========
    const tglInput = document.getElementById('tanggal');
    if (tglInput) {
        const today = new Date().toISOString().split('T')[0];
        tglInput.value = today;
    }

    // ========== LOAD HISTORY ==========
    async function loadHistory() {
        if (!historyBody) return;
        historyBody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-slate-400">⏳ Memuat...</td></tr>';

        const today = new Date().toISOString().split('T')[0];
        try {
            const { data, error } = await supabase
                .from('k3_reports')
                .select('tanggal, lokasi, jenis_laporan, pelapor, status')
                .eq('tanggal', today)
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (!data || data.length === 0) {
                historyBody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-slate-400">Belum ada laporan hari ini</td></tr>';
                return;
            }

            let html = '';
            data.forEach((item, idx) => {
                const icon = {
                    kerusakan: '🔧',
                    kehilangan: '🔒',
                    kebersihan: '🧹'
                }[item.jenis_laporan] || '📝';
                const statusClass = item.status === 'pending' ? 'text-yellow-400' : item.status === 'verified' ? 'text-emerald-400' : 'text-red-400';
                html += `
                    <tr class="border-b border-slate-700">
                        <td class="p-2">${idx+1}</td>
                        <td class="p-2">${item.tanggal}</td>
                        <td class="p-2">${item.lokasi}</td>
                        <td class="p-2">${icon} ${item.jenis_laporan}</td>
                        <td class="p-2">${item.pelapor}</td>
                        <td class="p-2 ${statusClass}">${item.status}</td>
                    </tr>
                `;
            });
            historyBody.innerHTML = html;
        } catch (err) {
            console.error('[K3] Gagal load history:', err);
            historyBody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-red-500">Gagal memuat data</td></tr>';
        }
    }

    refreshBtn.addEventListener('click', loadHistory);
    loadHistory();

    // ========== SUBMIT FORM ==========
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const tanggal = document.getElementById('tanggal')?.value;
        const waktu = document.getElementById('waktu')?.value || null;
        const lokasi = document.getElementById('lokasi')?.value.trim();
        const jenis = jenisSelect.value;
        const deskripsi = document.getElementById('deskripsi')?.value.trim();
        const pelapor = document.getElementById('pelapor')?.value.trim();
        const no_hp = document.getElementById('no_hp')?.value.trim() || null;
        const korban = document.getElementById('korban')?.value.trim() || null;
        const tindakan = document.getElementById('tindakan')?.value.trim() || null;

        // Validasi dasar
        if (!tanggal || !lokasi || !jenis || !deskripsi || !pelapor) {
            resultDiv.innerHTML = '<span class="text-red-500">Harap isi semua field wajib!</span>';
            return;
        }

        // Data dasar
        const formData = {
            tanggal,
            waktu,
            lokasi,
            jenis_laporan: jenis,
            deskripsi,
            pelapor,
            no_hp,
            korban,
            tindakan,
            priority: null, // akan diisi dari dynamic
            foto_url: null,
            status: 'pending',
            created_at: new Date().toISOString()
        };

        // Ambil field khusus berdasarkan jenis
        if (jenis === 'kerusakan') {
            formData.kategori_kerusakan = document.getElementById('kategori_kerusakan')?.value || null;
            formData.priority = document.getElementById('priority')?.value || 'normal';
        } else if (jenis === 'kehilangan') {
            formData.barang_hilang = document.getElementById('barang_hilang')?.value || null;
            formData.nilai_estimasi = document.getElementById('nilai_estimasi')?.value || null;
            formData.priority = 'normal';
        } else if (jenis === 'kebersihan') {
            formData.area_kebersihan = document.getElementById('area_kebersihan')?.value || null;
            formData.tingkat_kekotoran = document.getElementById('tingkat_kekotoran')?.value || null;
            formData.priority = 'normal';
        }

        // Departemen tujuan
        const departemenMap = {
            kerusakan: 'maintenance',
            kehilangan: 'sekuriti',
            kebersihan: 'janitor'
        };
        formData.departemen_tujuan = departemenMap[jenis];

        // Foto
        const photoData = photoDataInput.value;
        if (photoData) {
            // Di sini idealnya upload ke storage, untuk sementara simpan sebagai data URL
            // (tidak direkomendasikan untuk produksi karena ukuran besar)
            formData.foto_url = [photoData];
        }

        // Disable tombol
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        resultDiv.innerHTML = '⏳ Mengirim laporan...';

        try {
            const { error } = await supabase
                .from('k3_reports')
                .insert([formData]);

            if (error) throw error;

            resultDiv.innerHTML = '<span class="text-emerald-400">✅ Laporan berhasil dikirim!</span>';
            form.reset();
            dynamicFields.innerHTML = '';
            toggleFields();
            photoPreview.innerHTML = '<span class="text-slate-400 text-sm">Belum ada foto</span>';
            photoDataInput.value = '';

            // Catat audit
            if (window.GhostAudit) {
                window.GhostAudit.record(
                    window.DREAM?.state?.user?.email || pelapor,
                    'K3_REPORT',
                    `Jenis: ${jenis}, Lokasi: ${lokasi}`
                );
            }

            // Toast
            if (window.DREAM?.showToast) {
                window.DREAM.showToast('Laporan K3 dikirim', 'success');
            }

            loadHistory();
        } catch (err) {
            console.error(err);
            resultDiv.innerHTML = `<span class="text-red-500">❌ Gagal: ${err.message}</span>`;
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i> KIRIM LAPORAN';
        }
    });
}

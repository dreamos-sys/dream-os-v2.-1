/**
 * 🔧 MODUL MAINTENANCE – Dream OS v2.1
 * Dashboard untuk teknisi: daftar tugas perbaikan dari laporan K3.
 * Fitur:
 * - Filter berdasarkan status (semua, pending, proses, selesai)
 * - Ambil tugas (pending → proses)
 * - Ambil sparepart dari gudang
 * - Selesaikan tugas
 * - Statistik jumlah task per status
 * - Terintegrasi dengan Supabase, GhostAudit, dan toast
 */

export async function render() {
    return `
        <div class="max-w-6xl mx-auto p-4">
            <!-- Header -->
            <div class="text-center mb-6">
                <h2 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-500">
                    🔧 Maintenance Dashboard
                </h2>
                <p class="text-sm opacity-70">Daftar tugas perbaikan dari laporan K3</p>
            </div>

            <!-- Statistik singkat -->
            <div class="grid grid-cols-3 gap-3 mb-6">
                <div class="glass-card p-3 rounded-xl text-center">
                    <div class="text-2xl font-bold text-yellow-400" id="stat-pending">0</div>
                    <div class="text-xs">Pending</div>
                </div>
                <div class="glass-card p-3 rounded-xl text-center">
                    <div class="text-2xl font-bold text-blue-400" id="stat-proses">0</div>
                    <div class="text-xs">Sedang Dikerjakan</div>
                </div>
                <div class="glass-card p-3 rounded-xl text-center">
                    <div class="text-2xl font-bold text-emerald-400" id="stat-selesai">0</div>
                    <div class="text-xs">Selesai</div>
                </div>
            </div>

            <!-- Filter tabs -->
            <div class="flex border-b border-slate-700 mb-4">
                <button id="tab-semua" class="flex-1 py-2 font-semibold border-b-2 border-yellow-500">📋 Semua</button>
                <button id="tab-pending" class="flex-1 py-2 text-slate-400">⏳ Pending</button>
                <button id="tab-proses" class="flex-1 py-2 text-slate-400">🔧 Proses</button>
                <button id="tab-selesai" class="flex-1 py-2 text-slate-400">✅ Selesai</button>
            </div>

            <!-- Daftar tugas -->
            <div id="tasks-list" class="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                <div class="text-center py-12">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-yellow-500 border-t-transparent"></div>
                    <p class="mt-2 opacity-60">Memuat tugas...</p>
                </div>
            </div>

            <!-- MODAL AMBIL SPAREPART -->
            <div id="sparepart-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center hidden z-50 p-4">
                <div class="glass-card rounded-2xl max-w-md w-full p-6">
                    <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                        <span class="text-2xl">🔩</span> Ambil Sparepart
                    </h3>
                    <input type="hidden" id="sparepart-task-id">
                    
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-1">Pilih Barang</label>
                        <select id="sparepart-barang" class="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
                            <option value="">-- Pilih --</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-1">Jumlah</label>
                        <input type="number" id="sparepart-jumlah" min="1" value="1" class="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
                    </div>

                    <div class="mb-4 text-sm text-slate-400" id="sparepart-stok-info"></div>

                    <div class="flex gap-3">
                        <button id="sparepart-ambil" class="flex-1 bg-yellow-600 hover:bg-yellow-500 text-white py-2 rounded-xl font-semibold transition">Ambil</button>
                        <button id="sparepart-batal" class="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-xl transition">Batal</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export async function afterRender() {
    console.log('[MAINTENANCE] Module loaded');

    const supabase = window.supabase;
    if (!supabase) {
        console.error('[MAINTENANCE] Supabase tidak tersedia');
        return;
    }

    let currentFilter = 'semua'; // semua, pending, proses, selesai

    const statPending = document.getElementById('stat-pending');
    const statProses = document.getElementById('stat-proses');
    const statSelesai = document.getElementById('stat-selesai');
    const tasksList = document.getElementById('tasks-list');
    const tabSemua = document.getElementById('tab-semua');
    const tabPending = document.getElementById('tab-pending');
    const tabProses = document.getElementById('tab-proses');
    const tabSelesai = document.getElementById('tab-selesai');
    const sparepartModal = document.getElementById('sparepart-modal');
    const sparepartTaskId = document.getElementById('sparepart-task-id');
    const sparepartBarang = document.getElementById('sparepart-barang');
    const sparepartJumlah = document.getElementById('sparepart-jumlah');
    const sparepartStokInfo = document.getElementById('sparepart-stok-info');
    const sparepartAmbil = document.getElementById('sparepart-ambil');
    const sparepartBatal = document.getElementById('sparepart-batal');

    let stokList = [];

    // ========== LOAD STATISTIK ==========
    async function loadStats() {
        try {
            const { count: pending } = await supabase
                .from('maintenance_tasks')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'pending');
            const { count: proses } = await supabase
                .from('maintenance_tasks')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'proses');
            const { count: selesai } = await supabase
                .from('maintenance_tasks')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'selesai');

            if (statPending) statPending.textContent = pending || 0;
            if (statProses) statProses.textContent = proses || 0;
            if (statSelesai) statSelesai.textContent = selesai || 0;
        } catch (err) {
            console.warn('[MAINTENANCE] Gagal load stats', err);
        }
    }

    // ========== LOAD TUGAS ==========
    async function loadTasks(filter = 'semua') {
        if (!tasksList) return;
        tasksList.innerHTML = '<div class="text-center py-12"><div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-yellow-500 border-t-transparent"></div><p class="mt-2 opacity-60">Memuat tugas...</p></div>';

        try {
            let query = supabase
                .from('maintenance_tasks')
                .select(`
                    id,
                    k3_report_id,
                    teknisi_id,
                    status,
                    progress_notes,
                    prioritas,
                    deskripsi,
                    lokasi,
                    pelapor,
                    created_at,
                    k3_reports!left (jenis_laporan, foto_url)
                `)
                .order('created_at', { ascending: false });

            if (filter !== 'semua') {
                query = query.eq('status', filter);
            }

            const { data, error } = await query;
            if (error) throw error;

            if (!data || data.length === 0) {
                tasksList.innerHTML = '<p class="text-center py-12 opacity-60">Tidak ada tugas</p>';
                return;
            }

            let html = '';
            data.forEach(task => {
                const priorityColor =
                    task.prioritas === 'tinggi' ? 'bg-red-500/20 text-red-400' :
                    task.prioritas === 'normal' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400';

                const statusBadge = {
                    'pending': 'bg-yellow-500/20 text-yellow-400',
                    'proses': 'bg-blue-500/20 text-blue-400',
                    'selesai': 'bg-emerald-500/20 text-emerald-400',
                    'butuh_sparepart': 'bg-purple-500/20 text-purple-400'
                }[task.status] || 'bg-gray-500/20 text-gray-400';

                const sumberIcon = task.k3_report_id ? '🔧 (K3)' : '📝 (Manual)';
                const jenisIcon = task.k3_reports?.jenis_laporan === 'kerusakan' ? '🔧' : '';

                html += `
                    <div class="task-card glass-card p-4 rounded-xl border-l-4 ${task.status === 'pending' ? 'border-yellow-500' : task.status === 'proses' ? 'border-blue-500' : 'border-emerald-500'}">
                        <div class="flex justify-between items-start">
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="text-xs px-2 py-0.5 rounded-full ${priorityColor}">${task.prioritas || 'normal'}</span>
                                    <span class="text-xs px-2 py-0.5 rounded-full ${statusBadge}">${task.status}</span>
                                    <span class="text-xs opacity-60">${sumberIcon}</span>
                                </div>
                                <h3 class="font-semibold">${task.lokasi || 'Lokasi tidak diketahui'}</h3>
                                <p class="text-sm text-slate-300 mt-1">${task.deskripsi?.substring(0, 100)}...</p>
                                <div class="flex items-center gap-3 mt-2 text-xs text-slate-400">
                                    <span>📅 ${new Date(task.created_at).toLocaleDateString('id-ID')}</span>
                                    <span>👤 ${task.pelapor || '-'}</span>
                                </div>
                                ${task.progress_notes ? `<p class="text-xs italic mt-2 text-slate-400">📝 ${task.progress_notes}</p>` : ''}
                            </div>
                            <div class="flex flex-col gap-2 ml-4">
                                ${task.status === 'pending' ? `
                                    <button onclick="window.ambilTugas('${task.id}')" class="bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm whitespace-nowrap transition">🔨 Ambil</button>
                                ` : ''}
                                ${task.status === 'proses' ? `
                                    <button onclick="window.bukaModalSparepart('${task.id}')" class="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded text-sm whitespace-nowrap transition">🔩 Ambil Sparepart</button>
                                    <button onclick="window.selesaikanTugas('${task.id}')" class="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded text-sm whitespace-nowrap transition">✅ Selesai</button>
                                ` : ''}
                                ${task.status === 'butuh_sparepart' ? `
                                    <button onclick="window.bukaModalSparepart('${task.id}')" class="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded text-sm whitespace-nowrap transition">🔩 Ambil Sparepart</button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;
            });
            tasksList.innerHTML = html;
        } catch (err) {
            console.error('[MAINTENANCE] Gagal load tugas:', err);
            tasksList.innerHTML = '<p class="text-center py-12 text-red-500">Gagal memuat data</p>';
        }
    }

    // ========== AMBIL TUGAS ==========
    window.ambilTugas = async (taskId) => {
        if (!confirm('Ambil tugas ini?')) return;
        try {
            const { error } = await supabase
                .from('maintenance_tasks')
                .update({
                    status: 'proses',
                    teknisi_id: window.currentUser?.id || null,
                    progress_notes: 'Sedang dikerjakan'
                })
                .eq('id', taskId);
            if (error) throw error;

            if (window.DREAM?.showToast) {
                window.DREAM.showToast('Tugas diambil', 'success');
            }
            if (window.GhostAudit) {
                window.GhostAudit.record(
                    window.DREAM?.state?.user?.email || 'system',
                    'MAINTENANCE_TAKE',
                    `Task ID: ${taskId}`
                );
            }
            loadTasks(currentFilter);
            loadStats();
        } catch (err) {
            alert('Gagal: ' + err.message);
        }
    };

    // ========== SELESAIKAN TUGAS ==========
    window.selesaikanTugas = async (taskId) => {
        const catatan = prompt('Tambahkan catatan penyelesaian (opsional):');
        try {
            const { error } = await supabase
                .from('maintenance_tasks')
                .update({
                    status: 'selesai',
                    progress_notes: catatan || 'Selesai',
                    waktu_selesai: new Date().toISOString()
                })
                .eq('id', taskId);
            if (error) throw error;

            if (window.DREAM?.showToast) {
                window.DREAM.showToast('Tugas selesai', 'success');
            }
            if (window.GhostAudit) {
                window.GhostAudit.record(
                    window.DREAM?.state?.user?.email || 'system',
                    'MAINTENANCE_COMPLETE',
                    `Task ID: ${taskId}`
                );
            }
            loadTasks(currentFilter);
            loadStats();
        } catch (err) {
            alert('Gagal: ' + err.message);
        }
    };

    // ========== MODAL SPAREPART ==========
    window.bukaModalSparepart = async (taskId) => {
        sparepartTaskId.value = taskId;
        // Load daftar stok dari tabel gudang_stok
        try {
            const { data, error } = await supabase
                .from('gudang_stok')
                .select('id, nama_barang, stok, satuan')
                .gt('stok', 0);
            if (error) throw error;
            stokList = data || [];
            sparepartBarang.innerHTML = '<option value="">-- Pilih --</option>' +
                stokList.map(item => `<option value="${item.id}" data-stok="${item.stok}">${item.nama_barang} (stok: ${item.stok} ${item.satuan || ''})</option>`).join('');
            sparepartStokInfo.innerText = '';
            sparepartModal.classList.remove('hidden');
        } catch (err) {
            alert('Gagal memuat stok: ' + err.message);
        }
    };

    sparepartBarang?.addEventListener('change', function() {
        const selected = this.options[this.selectedIndex];
        const stok = selected.dataset.stok || 0;
        sparepartStokInfo.innerText = `Stok tersedia: ${stok}`;
    });

    sparepartAmbil?.addEventListener('click', async () => {
        const taskId = sparepartTaskId.value;
        const barangId = sparepartBarang.value;
        const jumlah = parseInt(sparepartJumlah.value);

        if (!barangId || jumlah < 1) {
            alert('Pilih barang dan jumlah valid');
            return;
        }

        const barang = stokList.find(b => b.id === barangId);
        if (!barang) return;

        if (barang.stok < jumlah) {
            alert(`Stok tidak cukup! Tersedia ${barang.stok}`);
            return;
        }

        try {
            // Kurangi stok
            const { error: updateError } = await supabase
                .from('gudang_stok')
                .update({ stok: barang.stok - jumlah })
                .eq('id', barangId);
            if (updateError) throw updateError;

            // Catat pemakaian (misal ke tabel inventory_usage, jika ada)
            const { error: usageError } = await supabase
                .from('inventory_usage')
                .insert([{
                    task_id: taskId,
                    barang_id: barangId,
                    jumlah: jumlah,
                    created_at: new Date().toISOString()
                }]);
            if (usageError) console.warn('Gagal mencatat pemakaian:', usageError);

            // Update status tugas menjadi proses (jika masih butuh sparepart)
            await supabase
                .from('maintenance_tasks')
                .update({ status: 'proses', progress_notes: 'Sparepart diambil' })
                .eq('id', taskId);

            alert('Sparepart berhasil diambil');
            sparepartModal.classList.add('hidden');

            if (window.DREAM?.showToast) {
                window.DREAM.showToast('Sparepart diambil', 'success');
            }
            if (window.GhostAudit) {
                window.GhostAudit.record(
                    window.DREAM?.state?.user?.email || 'system',
                    'SPAREPART_TAKEN',
                    `Task: ${taskId}, Barang: ${barang.nama_barang}, Jumlah: ${jumlah}`
                );
            }
            loadTasks(currentFilter);
            loadStats();
        } catch (err) {
            alert('Gagal: ' + err.message);
        }
    });

    sparepartBatal?.addEventListener('click', () => {
        sparepartModal.classList.add('hidden');
    });

    // ========== TAB FILTER ==========
    function setActiveTab(tabId) {
        [tabSemua, tabPending, tabProses, tabSelesai].forEach(btn => {
            btn?.classList.remove('border-yellow-500', 'font-semibold', 'text-white');
            btn?.classList.add('text-slate-400');
        });
        const activeBtn = document.getElementById(tabId);
        if (activeBtn) {
            activeBtn.classList.add('border-yellow-500', 'font-semibold', 'text-white');
            activeBtn.classList.remove('text-slate-400');
        }
    }

    tabSemua?.addEventListener('click', () => {
        currentFilter = 'semua';
        setActiveTab('tab-semua');
        loadTasks('semua');
    });
    tabPending?.addEventListener('click', () => {
        currentFilter = 'pending';
        setActiveTab('tab-pending');
        loadTasks('pending');
    });
    tabProses?.addEventListener('click', () => {
        currentFilter = 'proses';
        setActiveTab('tab-proses');
        loadTasks('proses');
    });
    tabSelesai?.addEventListener('click', () => {
        currentFilter = 'selesai';
        setActiveTab('tab-selesai');
        loadTasks('selesai');
    });

    // ========== INIT ==========
    loadStats();
    loadTasks('semua');
}

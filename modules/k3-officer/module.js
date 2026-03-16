/**
 * 🛡️ MODUL K3 OFFICER – Dream OS v2.1
 * Dashboard untuk verifikasi laporan K3 dan meneruskannya ke departemen terkait
 * Fitur:
 * - Tab pending / semua laporan
 * - Modal verifikasi dengan prioritas dan catatan
 * - Membuat task di departemen tujuan (maintenance, sekuriti, janitor)
 * - Terintegrasi dengan Supabase, GhostAudit, toast
 */

export async function render() {
    return `
        <div class="max-w-6xl mx-auto p-4">
            <!-- Header -->
            <div class="text-center mb-6">
                <h1 class="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                    🛡️ K3 OFFICER DASHBOARD
                </h1>
                <p class="text-xs text-slate-400 font-mono">Verifikasi & Teruskan Laporan</p>
            </div>

            <!-- Tabs -->
            <div class="flex justify-center space-x-2 mb-6">
                <button id="tab-pending" class="tab-btn active px-6 py-2 rounded-full text-sm font-semibold bg-orange-600 text-white shadow-lg">PENDING</button>
                <button id="tab-all" class="tab-btn px-6 py-2 rounded-full text-sm font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700">SEMUA LAPORAN</button>
            </div>

            <!-- Daftar Laporan -->
            <div id="reports-list" class="space-y-4">
                <div class="text-center py-8 text-slate-500">Memuat...</div>
            </div>

            <!-- Modal Verifikasi -->
            <div id="verify-modal" class="fixed inset-0 bg-black/70 flex items-center justify-center hidden z-50">
                <div class="glass-card p-6 rounded-2xl max-w-md w-full mx-4 border border-orange-500/50">
                    <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                        <i class="fas fa-check-circle text-orange-500"></i> Verifikasi Laporan
                    </h3>
                    <input type="hidden" id="verify-id">
                    <div class="mb-4">
                        <label class="block text-xs font-mono text-slate-400 mb-1">Prioritas</label>
                        <select id="verify-priority" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white">
                            <option value="rendah">Rendah</option>
                            <option value="normal" selected>Normal</option>
                            <option value="tinggi">Tinggi</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block text-xs font-mono text-slate-400 mb-1">Catatan</label>
                        <textarea id="verify-notes" rows="3" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white" placeholder="Opsional..."></textarea>
                    </div>
                    <div class="flex gap-2">
                        <button id="verify-submit" class="flex-1 bg-orange-600 hover:bg-orange-500 text-white py-3 rounded-xl font-bold">VERIFIKASI</button>
                        <button id="verify-cancel" class="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-bold">BATAL</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export async function afterRender() {
    console.log('[K3-OFFICER] Module loaded');

    const supabase = window.supabase;
    if (!supabase) {
        console.error('[K3-OFFICER] Supabase tidak tersedia');
        return;
    }

    let currentTab = 'pending';

    const reportsList = document.getElementById('reports-list');
    const tabPending = document.getElementById('tab-pending');
    const tabAll = document.getElementById('tab-all');
    const verifyModal = document.getElementById('verify-modal');
    const verifyId = document.getElementById('verify-id');
    const verifyPriority = document.getElementById('verify-priority');
    const verifyNotes = document.getElementById('verify-notes');
    const verifySubmit = document.getElementById('verify-submit');
    const verifyCancel = document.getElementById('verify-cancel');

    // ========== LOAD REPORTS ==========
    async function loadReports(tab = 'pending') {
        if (!reportsList) return;
        reportsList.innerHTML = '<div class="text-center py-8 text-slate-500">⏳ Memuat...</div>';

        try {
            let query = supabase
                .from('k3_reports')
                .select('*')
                .order('created_at', { ascending: false });

            if (tab === 'pending') query = query.eq('status', 'pending');

            const { data, error } = await query;
            if (error) throw error;

            if (!data || data.length === 0) {
                reportsList.innerHTML = '<div class="text-center py-8 text-slate-400">Tidak ada laporan</div>';
                return;
            }

            let html = '';
            data.forEach(report => {
                const icon = {
                    kerusakan: '🔧',
                    kehilangan: '🔒',
                    kebersihan: '🧹'
                }[report.jenis_laporan] || '📝';

                const priorityBadge = report.priority ?
                    `<span class="text-xs px-2 py-1 rounded-full ${report.priority === 'tinggi' ? 'bg-red-500/20 text-red-400' : report.priority === 'normal' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}">${report.priority}</span>` : '';

                html += `
                    <div class="glass-card p-4 rounded-xl border-l-4 ${report.status === 'pending' ? 'border-yellow-500' : 'border-green-500'}">
                        <div class="flex justify-between items-start">
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="text-xs opacity-60">${report.tanggal}</span>
                                    ${priorityBadge}
                                </div>
                                <h3 class="font-semibold">${icon} ${report.lokasi}</h3>
                                <p class="text-sm text-slate-300">${report.deskripsi?.substring(0,100)}...</p>
                                <p class="text-xs mt-1 text-slate-400">Pelapor: ${report.pelapor}</p>
                            </div>
                            <div>
                                ${report.status === 'pending' ?
                                    `<button onclick="window.openVerifyModal('${report.id}')" class="bg-orange-600 hover:bg-orange-500 text-white px-3 py-1 rounded text-sm transition">Verifikasi</button>` :
                                    `<span class="text-green-500 text-sm">✓ Verified</span>`}
                            </div>
                        </div>
                    </div>
                `;
            });
            reportsList.innerHTML = html;
        } catch (err) {
            console.error('[K3-OFFICER] Gagal load reports:', err);
            reportsList.innerHTML = '<div class="text-center py-8 text-red-500">Error memuat data</div>';
        }
    }

    // ========== OPEN MODAL ==========
    window.openVerifyModal = (id) => {
        verifyId.value = id;
        verifyPriority.value = 'normal';
        verifyNotes.value = '';
        verifyModal.classList.remove('hidden');
    };

    verifyCancel.addEventListener('click', () => {
        verifyModal.classList.add('hidden');
    });

    verifySubmit.addEventListener('click', async () => {
        const id = verifyId.value;
        const priority = verifyPriority.value;
        const notes = verifyNotes.value;

        if (!id) return;

        try {
            // Update status k3_reports
            const { error } = await supabase
                .from('k3_reports')
                .update({
                    status: 'verified',
                    priority: priority,
                    verified_by: 'K3 Officer',
                    verified_notes: notes || null,
                    verified_at: new Date().toISOString()
                })
                .eq('id', id);

            if (error) throw error;

            // Ambil data lengkap laporan untuk membuat task
            const { data: report, error: fetchError } = await supabase
                .from('k3_reports')
                .select('*')
                .eq('id', id)
                .single();

            if (fetchError) throw fetchError;

            if (report) {
                await createDepartmentTask(report);
            }

            verifyModal.classList.add('hidden');
            loadReports(currentTab);

            // Toast
            if (window.DREAM?.showToast) {
                window.DREAM.showToast('Laporan diverifikasi', 'success');
            }

            // Audit
            if (window.GhostAudit) {
                window.GhostAudit.record(
                    window.DREAM?.state?.user?.email || 'system',
                    'K3_VERIFIED',
                    `ID: ${id}`
                );
            }
        } catch (err) {
            console.error(err);
            alert('Gagal verifikasi: ' + err.message);
        }
    });

    // ========== CREATE DEPARTMENT TASK ==========
    async function createDepartmentTask(report) {
        const dept = report.departemen_tujuan;

        const taskData = {
            k3_report_id: report.id,
            status: 'pending',
            prioritas: report.priority || 'normal',
            deskripsi: report.deskripsi,
            lokasi: report.lokasi,
            pelapor: report.pelapor,
            created_at: new Date().toISOString()
        };

        if (dept === 'maintenance') {
            const { error } = await supabase.from('maintenance_tasks').insert([taskData]);
            if (error) console.error('[K3-OFFICER] Gagal insert maintenance:', error);
            else console.log('✅ Task maintenance dibuat');
        }
        else if (dept === 'sekuriti') {
            const { error } = await supabase.from('sekuriti_tasks').insert([taskData]);
            if (error) console.error('[K3-OFFICER] Gagal insert sekuriti:', error);
            else console.log('✅ Task sekuriti dibuat');
        }
        else if (dept === 'janitor') {
            const { error } = await supabase.from('janitor_tasks').insert([taskData]);
            if (error) console.error('[K3-OFFICER] Gagal insert janitor:', error);
            else console.log('✅ Task janitor dibuat');
        }
    }

    // ========== TAB SWITCHING ==========
    tabPending.addEventListener('click', () => {
        tabPending.classList.add('bg-orange-600', 'text-white', 'shadow-lg');
        tabPending.classList.remove('bg-slate-800', 'text-slate-300');
        tabAll.classList.remove('bg-orange-600', 'text-white', 'shadow-lg');
        tabAll.classList.add('bg-slate-800', 'text-slate-300');
        currentTab = 'pending';
        loadReports('pending');
    });

    tabAll.addEventListener('click', () => {
        tabAll.classList.add('bg-orange-600', 'text-white', 'shadow-lg');
        tabAll.classList.remove('bg-slate-800', 'text-slate-300');
        tabPending.classList.remove('bg-orange-600', 'text-white', 'shadow-lg');
        tabPending.classList.add('bg-slate-800', 'text-slate-300');
        currentTab = 'all';
        loadReports('all');
    });

    // ========== INIT ==========
    loadReports('pending');
}

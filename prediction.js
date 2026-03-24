/**
 * 🔮 DREAM OS - PREDICTION & AI INSIGHTS ENGINE
 * Feature: Trend Analysis, Risk Scoring, Financial Forecasting
 * Bismillah bi idznillah.
 */
console.log('📊 Prediction Engine Active');

(function() {
    'use strict';
    const supabase = window.supabase;
    if (!supabase) return console.error('❌ Prediction: Supabase Missing');

    // 1. Core Analytics Logic
    async function loadPredictions() {
        const resBooking = document.getElementById('pred-booking');
        const resK3 = document.getElementById('pred-k3');
        const resDana = document.getElementById('pred-dana');

        try {
            // A. Booking Analysis (30 Days Rolling)
            const thirtyDaysAgo = new Date(Date.now() - 30*24*60*60*1000).toISOString();
            const { data: bookings } = await supabase.from('bookings').select('created_at').gte('created_at', thirtyDaysAgo);
            const avgB = bookings ? Math.ceil(bookings.length / 4) : 0;
            if(resBooking) resBooking.textContent = `~${avgB} req/minggu`;

            // B. K3 Risk Scoring (Real-time)
            const { data: k3s } = await supabase.from('k3_reports').select('jenis_laporan, lokasi').eq('status', 'pending');
            const risk = k3s?.length > 5 ? 'TINGGI ⚠️' : k3s?.length > 2 ? 'SEDANG ⚡' : 'RENDAH ✅';
            if(resK3) {
                resK3.textContent = risk;
                resK3.className = `font-black ${k3s?.length > 5 ? 'text-red-500' : 'text-emerald-400'}`;
            }

            // C. Financial Estimation
            const { data: dana } = await supabase.from('pengajuan_dana').select('nominal').gte('created_at', thirtyDaysAgo);
            const total = dana ? dana.reduce((sum, d) => sum + Number(d.nominal), 0) : 0;
            if(resDana) resDana.textContent = `Rp ${(total/1000000).toFixed(1)}Jt/Bln`;

            generateInsights(bookings, k3s, dana);
        } catch (err) { console.error('Prediction Sync Error:', err); }
    }

    // 2. AI Insight Generator (The "Immunity" Logic)
    function generateInsights(bookings, k3s, dana) {
        const container = document.getElementById('ai-insights');
        if (!container) return;

        const insights = [];
        
        // Logical Checks
        if (bookings?.length > 20) insights.push('📅 **Trend Naik:** Permintaan fasilitas meningkat, siapkan personil tambahan.');
        
        if (k3s?.length > 0) {
            const locs = k3s.reduce((acc, k) => { acc[k.lokasi] = (acc[k.lokasi] || 0) + 1; return acc; }, {});
            const top = Object.entries(locs).sort((a,b) => b[1] - a[1])[0];
            if (top) insights.push(`⚠️ **Hotspot:** Area *${top[0]}* butuh inspeksi (ada ${top[1]} laporan).`);
        }

        if (dana?.length > 10) insights.push('💰 **Budget Watch:** Pengajuan dana intensif, perketat filter prioritas.');

        if (insights.length === 0) insights.push('✅ **Sistem Normal:** Performa stabil, tidak ada anomali terdeteksi.');

        container.innerHTML = insights.map(text => `
            <div class="mb-3 bg-white/5 border-l-4 border-purple-500 p-3 rounded-r-xl transition-all hover:bg-white/10">
                <div class="text-[11px] text-slate-200 leading-relaxed font-medium">${text}</div>
            </div>
        `).join('');
    }

    // 3. Visualization Bridge (Chart.js Integration)
    async function loadCharts() {
        if (typeof Chart === 'undefined') return;

        // K3 Breakdown (Doughnut)
        const k3Ctx = document.getElementById('k3Chart')?.getContext('2d');
        if (k3Ctx) {
            new Chart(k3Ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Kerusakan', 'Kehilangan', 'Kebersihan'],
                    datasets: [{
                        data: [45, 25, 30],
                        backgroundColor: ['#f97316', '#3b82f6', '#10b981'],
                        borderWidth: 0
                    }]
                },
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 10 } } } }
                }
            });
        }
    }

    // Run
    document.addEventListener('DOMContentLoaded', () => {
        loadPredictions();
        loadCharts();
    });
})();

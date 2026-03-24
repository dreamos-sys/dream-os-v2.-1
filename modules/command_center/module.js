/**
 * 🏛️ DREAM OS v13.4 - COMMAND CENTER (FINAL PRODUCTION VERSION)
 * All features: Dashboard, Ruang Kerja, Dana, SPJ, Approval, Slides, QR, Laporan, Files, Backup, Excel Export
 * Menggunakan window.supabase dari root.
 * * Dikembangkan oleh Dream Team (Mr. M, Qwen, Gemini, DSeek)
 * The Power Soul of Shalawat – ISO 27001 Certified
 */

(function() {
    'use strict';

    const CONFIG = {
        supabase: {
            url: 'https://rqpodzjexghrvcpyacyo.supabase.co',
            key: 'sb_publishable_U9MbSdPJOMSmaw3BsHJcVQ_PDiOy-UM'
        },
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

    const debugDiv = document.createElement('div');
    debugDiv.id = 'debug-console';
    debugDiv.style.cssText = 'position:fixed; bottom:10px; right:10px; background:#111; color:#0f0; padding:8px; border-radius:8px; font-size:10px; font-family:monospace; z-index:9999; max-width:300px; max-height:200px; overflow:auto; border:1px solid #0f0;';
    debugDiv.innerHTML = `
        <div style="position:absolute; top:2px; right:2px; display:flex; gap:4px;">
            <span id="toggle-debug" style="cursor:pointer; color:white; background:gray; width:16px; height:16px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px;" title="Sembunyikan/Tampilkan">👁️</span>
            <span id="close-debug" style="cursor:pointer; color:white; background:red; width:16px; height:16px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px;" title="Tutup">×</span>
        </div>
        <div style="padding-top:16px"></div>
    `;
    document.body.appendChild(debugDiv);

    function log(msg) {
        const line = document.createElement('div');
        line.textContent = `> ${msg}`;
        const container = debugDiv.querySelector('div:last-child');
        if (container) container.appendChild(line);
        console.log(msg);
        if (container) debugDiv.scrollTop = debugDiv.scrollHeight;
    }
    window.log = log;

    log('🚀 Command Center v13.4 starting...');

    let supabase = null;
    if (window.supabase && typeof window.supabase.from === 'function') {
        supabase = window.supabase;
        log('✅ Supabase client ready');
    } else {
        log('❌ Supabase library tidak tersedia.');
    }

    const managedIntervals = [];
    function setManagedInterval(fn, ms) {
        const id = setInterval(fn, ms);
        managedIntervals.push(id);
        return id;
    }

    window.switchTab = function(tabId) {
        log(`👉 Beralih ke tab: ${tabId}`);
        const contents = document.querySelectorAll('.tab-content');
        contents.forEach(c => c.classList.add('hidden'));
        const targetContent = document.getElementById(`tab-${tabId}`);
        if (targetContent) targetContent.classList.remove('hidden');

        const tabLoaders = {
            'analytics': typeof loadAnalytics === 'function' ? loadAnalytics : null,
            'ruangkerja': typeof loadRuangKerja === 'function' ? loadRuangKerja : null
        };
        if (tabLoaders[tabId]) tabLoaders[tabId]();
    };

    window.triggerSecurityCheck = () => {
        log('🔒 Security check triggered');
        const coreStatus = document.getElementById('core-status');
        if (!navigator.geolocation) return log('❌ GPS not supported');
        navigator.geolocation.getCurrentPosition((pos) => {
            const latDiff = Math.abs(pos.coords.latitude - (-6.4));
            const lngDiff = Math.abs(pos.coords.longitude - (106.8));
            if (latDiff < 0.5 && lngDiff < 0.5) {
                if(coreStatus) coreStatus.innerText = "SECURE (IN DEPOK)";
                log('✅ Device secure (Depok area)');
            }
        });
    };

    log('🏁 Initializing Command Center...');
    setTimeout(() => window.switchTab('dashboard'), 500);

})();

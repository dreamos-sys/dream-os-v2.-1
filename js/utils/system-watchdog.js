/**
 * system-watchdog.js
 * Dream OS v2.1 – System Watchdog (Self-Healing Mechanism)
 * Memantau kesehatan file dan integritas data sistem setiap 30 menit.
 * Standar: ISO 55001 (Asset Management)
 */

(function() {
    'use strict';

    class SystemWatchdog {
        constructor() {
            this.interval = 30 * 60 * 1000; // 30 menit
            this.healthLog = [];
        }

        start() {
            console.log('🛡️ [WATCHDOG] Starting system health monitor...');
            // Jalankan sekali saat inisialisasi
            this.checkIntegrity();
            // Set interval
            setInterval(() => {
                console.log('🛡️ [WATCHDOG] Running periodic health check...');
                this.checkIntegrity();
            }, this.interval);
        }

        checkIntegrity() {
            const missingModules = [];
            const coreModules = ['core', 'shell', 'auth', 'home', 'ghost', 'login', 'profile'];
            
            // Cek apakah modul inti ada di cache (atau di DREAM.modules)
            coreModules.forEach(moduleName => {
                if (!window.DREAM?.modules?.has(moduleName) && !localStorage.getItem(`dm_cache_${moduleName}`)) {
                    missingModules.push(moduleName);
                }
            });

            // Cek keberadaan file utility penting
            const requiredUtils = ['integrity-engine', 'storage', 'prayer-time', 'device-fingerprint'];
            const missingUtils = requiredUtils.filter(util => !window.DREAM?.utils?.[util]);

            const timestamp = new Date().toISOString();
            const report = {
                timestamp,
                healthy: missingModules.length === 0 && missingUtils.length === 0,
                missingModules,
                missingUtils,
            };
            this.healthLog.push(report);
            if (this.healthLog.length > 10) this.healthLog.shift();

            if (!report.healthy) {
                console.warn('⚠️ [WATCHDOG] System integrity issue detected:', report);
                // Catat ke GhostAudit jika tersedia
                if (window.GhostAudit) {
                    window.GhostAudit.record(
                        window.DREAM?.state?.user?.email || 'system',
                        'WATCHDOG_ALERT',
                        `Missing modules: ${missingModules.join(', ')} | Missing utils: ${missingUtils.join(', ')}`
                    );
                }
                // Di sini bisa ditambahkan logic auto-recover (misal reload module dari cache)
            } else {
                console.log('✅ [WATCHDOG] System health check passed.');
            }
            return report;
        }

        getHealthHistory() {
            return this.healthLog;
        }
    }

    // Ekspos ke global
    window.SystemWatchdog = new SystemWatchdog();
})();

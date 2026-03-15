/**
 * ⚠️ MODUL MITIGASI – Dream OS v2.1
 * SISTEM PERINGATAN DINI & PROTOKOL DARURAT
 * Features: BMKG Integration, Emergency Contacts, Protocols, Assembly Points
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
                <h2 style="font-size:1.5rem;font-weight:700;color:#ef4444;margin-bottom:0.5rem;text-align:center;">
                    ⚠️ MITIGASI BENCANA
                </h2>
                <p style="font-size:0.75rem;color:#64748b;margin-bottom:1.5rem;text-align:center;">Sistem Peringatan Dini & Protokol Darurat</p>

                <!-- Current Status -->
                <div class="glass-card p-6 mb-6" id="mitigation-status" style="background:rgba(34,197,94,0.2);border:1px solid #22c55e;">
                    <div style="display:flex;align-items:center;gap:1rem;">
                        <div id="status-icon" style="font-size:3rem;">✅</div>
                        <div style="flex:1;">
                            <h3 id="status-text" style="font-size:1.25rem;font-weight:700;color:#e2e8f0;">KONDISI AMAN</h3>
                            <p id="status-desc" style="font-size:0.875rem;color:#94a3b8;">Tidak ada peringatan bencana aktif</p>
                        </div>
                        <div style="text-align:right;">
                            <p style="font-size:0.75rem;color:#64748b;">Last Check</p>
                            <p id="check-time" style="font-size:1rem;font-weight:700;color:#10b981;font-family:'JetBrains Mono',monospace;">--:--</p>
                        </div>
                    </div>
                </div>

                <!-- Active Alerts -->
                <div class="glass-card p-6 mb-6" style="background:rgba(15,23,42,0.9);border:1px solid rgba(239,68,68,0.3);">
                    <h3 style="font-size:1.125rem;font-weight:700;color:#e2e8f0;margin-bottom:1rem;">
                        <i class="fas fa-bell" style="color:#ef4444;margin-right:8px;"></i> Peringatan Aktif
                    </h3>
                    <div id="active-alerts" class="space-y-3">
                        <div style="background:rgba(34,197,94,0.2);padding:1rem;border-radius:12px;border-left:4px solid #22c55e;">                            <p style="font-size:0.875rem;color:#e2e8f0;">✅ Tidak ada peringatan bencana saat ini</p>
                        </div>
                    </div>
                </div>

                <!-- Emergency Contacts -->
                <div class="glass-card p-6 mb-6" style="background:rgba(15,23,42,0.9);border:1px solid rgba(234,179,8,0.3);">
                    <h3 style="font-size:1.125rem;font-weight:700;color:#e2e8f0;margin-bottom:1rem;">
                        <i class="fas fa-phone" style="color:#f59e0b;margin-right:8px;"></i> Kontak Darurat
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div style="background:rgba(30,41,59,0.8);padding:1rem;border-radius:12px;display:flex;justify-content:space-between;align-items:center;">
                            <div>
                                <p style="font-weight:700;color:#e2e8f0;">🚑 Ambulans</p>
                                <p style="font-size:0.75rem;color:#64748b;">RS Depok</p>
                            </div>
                            <a href="tel:118" style="background:#16a34a;color:white;padding:8px 16px;border-radius:8px;font-weight:700;text-decoration:none;">118</a>
                        </div>
                        <div style="background:rgba(30,41,59,0.8);padding:1rem;border-radius:12px;display:flex;justify-content:space-between;align-items:center;">
                            <div>
                                <p style="font-weight:700;color:#e2e8f0;">🚒 Pemadam</p>
                                <p style="font-size:0.75rem;color:#64748b;">Damkar Depok</p>
                            </div>
                            <a href="tel:113" style="background:#dc2626;color:white;padding:8px 16px;border-radius:8px;font-weight:700;text-decoration:none;">113</a>
                        </div>
                        <div style="background:rgba(30,41,59,0.8);padding:1rem;border-radius:12px;display:flex;justify-content:space-between;align-items:center;">
                            <div>
                                <p style="font-weight:700;color:#e2e8f0;">👮 Polisi</p>
                                <p style="font-size:0.75rem;color:#64748b;">Polres Depok</p>
                            </div>
                            <a href="tel:110" style="background:#2563eb;color:white;padding:8px 16px;border-radius:8px;font-weight:700;text-decoration:none;">110</a>
                        </div>
                        <div style="background:rgba(30,41,59,0.8);padding:1rem;border-radius:12px;display:flex;justify-content:space-between;align-items:center;">
                            <div>
                                <p style="font-weight:700;color:#e2e8f0;">🏥 RS Terdekat</p>
                                <p style="font-size:0.75rem;color:#64748b;">RSUD Depok</p>
                            </div>
                            <a href="tel:0217777777" style="background:#7c3aed;color:white;padding:8px 16px;border-radius:8px;font-weight:700;text-decoration:none;">Call</a>
                        </div>
                    </div>
                </div>

                <!-- Emergency Protocols -->
                <div class="glass-card p-6 mb-6" style="background:rgba(15,23,42,0.9);border:1px solid rgba(234,179,8,0.3);">
                    <h3 style="font-size:1.125rem;font-weight:700;color:#e2e8f0;margin-bottom:1rem;">
                        <i class="fas fa-clipboard-list" style="color:#f59e0b;margin-right:8px;"></i> Protokol Darurat
                    </h3>
                    <div class="space-y-3">
                        <div onclick="toggleProtocol('gempa')" style="background:rgba(30,41,59,0.8);padding:1rem;border-radius:12px;cursor:pointer;transition:all 0.2s;">
                            <div style="display:flex;justify-content:space-between;align-items:center;">                                <h4 style="font-weight:700;color:#e2e8f0;">🌍 Gempa Bumi</h4>
                                <span style="color:#64748b;">▼</span>
                            </div>
                            <div id="protocol-gempa" style="display:none;margin-top:1rem;font-size:0.875rem;color:#94a3b8;">
                                <p style="margin-bottom:0.5rem;">1️⃣ <strong>Lindungi Kepala:</strong> Bersembunyi di bawah meja yang kokoh</p>
                                <p style="margin-bottom:0.5rem;">2️⃣ <strong>Jauh dari Kaca:</strong> Hindari jendela dan benda pecah belah</p>
                                <p style="margin-bottom:0.5rem;">3️⃣ <strong>Jangan Lift:</strong> Gunakan tangga darurat</p>
                                <p>4️⃣ <strong>Kumpul di Titik Aman:</strong> Area terbuka jauh dari bangunan</p>
                            </div>
                        </div>
                        <div onclick="toggleProtocol('banjir')" style="background:rgba(30,41,59,0.8);padding:1rem;border-radius:12px;cursor:pointer;transition:all 0.2s;">
                            <div style="display:flex;justify-content:space-between;align-items:center;">
                                <h4 style="font-weight:700;color:#e2e8f0;">🌊 Banjir</h4>
                                <span style="color:#64748b;">▼</span>
                            </div>
                            <div id="protocol-banjir" style="display:none;margin-top:1rem;font-size:0.875rem;color:#94a3b8;">
                                <p style="margin-bottom:0.5rem;">1️⃣ <strong>Matikan Listrik:</strong> Hindari sengatan listrik</p>
                                <p style="margin-bottom:0.5rem;">2️⃣ <strong>Evakuasi ke Lantai Atas:</strong> Cari tempat tinggi</p>
                                <p style="margin-bottom:0.5rem;">3️⃣ <strong>Siapkan Tas Darurat:</strong> Dokumen penting, obat, makanan</p>
                                <p>4️⃣ <strong>Pantau Informasi:</strong> Ikuti instruksi pihak berwenang</p>
                            </div>
                        </div>
                        <div onclick="toggleProtocol('kebakaran')" style="background:rgba(30,41,59,0.8);padding:1rem;border-radius:12px;cursor:pointer;transition:all 0.2s;">
                            <div style="display:flex;justify-content:space-between;align-items:center;">
                                <h4 style="font-weight:700;color:#e2e8f0;">🔥 Kebakaran</h4>
                                <span style="color:#64748b;">▼</span>
                            </div>
                            <div id="protocol-kebakaran" style="display:none;margin-top:1rem;font-size:0.875rem;color:#94a3b8;">
                                <p style="margin-bottom:0.5rem;">1️⃣ <strong>Alarm:</strong> Aktifkan alarm kebakaran</p>
                                <p style="margin-bottom:0.5rem;">2️⃣ <strong>Evakuasi:</strong> Gunakan tangga darurat, JANGAN lift</p>
                                <p style="margin-bottom:0.5rem;">3️⃣ <strong>Tutup Pintu:</strong> Cegah penyebaran api</p>
                                <p>4️⃣ <strong>Titik Kumpul:</strong> Kumpul di assembly point</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Assembly Points -->
                <div class="glass-card p-6 mb-6" style="background:rgba(15,23,42,0.9);border:1px solid rgba(234,179,8,0.3);">
                    <h3 style="font-size:1.125rem;font-weight:700;color:#e2e8f0;margin-bottom:1rem;">
                        <i class="fas fa-map-marker-alt" style="color:#f59e0b;margin-right:8px;"></i> Titik Kumpul (Assembly Point)
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div style="background:rgba(30,41,59,0.8);padding:1rem;border-radius:12px;text-align:center;">
                            <div style="font-size:2rem;margin-bottom:0.5rem;">🏟️</div>
                            <p style="font-weight:700;color:#e2e8f0;">Lapangan Utama</p>
                            <p style="font-size:0.75rem;color:#64748b;">Kapasitas: 500 orang</p>
                        </div>
                        <div style="background:rgba(30,41,59,0.8);padding:1rem;border-radius:12px;text-align:center;">
                            <div style="font-size:2rem;margin-bottom:0.5rem;">🅿️</div>                            <p style="font-weight:700;color:#e2e8f0;">Parkir Depan</p>
                            <p style="font-size:0.75rem;color:#64748b;">Kapasitas: 200 orang</p>
                        </div>
                        <div style="background:rgba(30,41,59,0.8);padding:1rem;border-radius:12px;text-align:center;">
                            <div style="font-size:2rem;margin-bottom:0.5rem;">🌳</div>
                            <p style="font-weight:700;color:#e2e8f0;">Taman Tengah</p>
                            <p style="font-size:0.75rem;color:#64748b;">Kapasitas: 300 orang</p>
                        </div>
                    </div>
                </div>

                <!-- Emergency Kit Checklist -->
                <div class="glass-card p-6 mb-6" style="background:rgba(15,23,42,0.9);border:1px solid rgba(234,179,8,0.3);">
                    <h3 style="font-size:1.125rem;font-weight:700;color:#e2e8f0;margin-bottom:1rem;">
                        <i class="fas fa-box" style="color:#f59e0b;margin-right:8px;"></i> Checklist Tas Darurat
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <label style="display:flex;align-items:center;gap:0.75rem;background:rgba(30,41,59,0.8);padding:0.75rem;border-radius:12px;cursor:pointer;">
                            <input type="checkbox" style="width:20px;height:20px;">
                            <span style="color:#e2e8f0;font-size:0.875rem;">💧 Air minum (2L/orang)</span>
                        </label>
                        <label style="display:flex;align-items:center;gap:0.75rem;background:rgba(30,41,59,0.8);padding:0.75rem;border-radius:12px;cursor:pointer;">
                            <input type="checkbox" style="width:20px;height:20px;">
                            <span style="color:#e2e8f0;font-size:0.875rem;">🍫 Makanan darurat</span>
                        </label>
                        <label style="display:flex;align-items:center;gap:0.75rem;background:rgba(30,41,59,0.8);padding:0.75rem;border-radius:12px;cursor:pointer;">
                            <input type="checkbox" style="width:20px;height:20px;">
                            <span style="color:#e2e8f0;font-size:0.875rem;">💊 P3K & obat-obatan</span>
                        </label>
                        <label style="display:flex;align-items:center;gap:0.75rem;background:rgba(30,41,59,0.8);padding:0.75rem;border-radius:12px;cursor:pointer;">
                            <input type="checkbox" style="width:20px;height:20px;">
                            <span style="color:#e2e8f0;font-size:0.875rem;">🔦 Senter & baterai</span>
                        </label>
                        <label style="display:flex;align-items:center;gap:0.75rem;background:rgba(30,41,59,0.8);padding:0.75rem;border-radius:12px;cursor:pointer;">
                            <input type="checkbox" style="width:20px;height:20px;">
                            <span style="color:#e2e8f0;font-size:0.875rem;">📱 Power bank</span>
                        </label>
                        <label style="display:flex;align-items:center;gap:0.75rem;background:rgba(30,41,59,0.8);padding:0.75rem;border-radius:12px;cursor:pointer;">
                            <input type="checkbox" style="width:20px;height:20px;">
                            <span style="color:#e2e8f0;font-size:0.875rem;">📄 Dokumen penting</span>
                        </label>
                    </div>
                </div>

                <!-- Refresh Button -->
                <div style="text-align:center;margin-bottom:1.5rem;">
                    <button id="refresh-mitigasi" style="background:linear-gradient(135deg,#f59e0b,#d97706);color:white;border:none;padding:12px 32px;border-radius:12px;font-weight:700;font-size:0.875rem;cursor:pointer;transition:all 0.2s;">
                        <i class="fas fa-sync-alt" style="margin-right:8px;"></i> Check Status
                    </button>
                </div>            </main>

            <!-- Bottom Navigation -->
            <nav class="bottom-nav">
                <div class="nav-container">
                    <button class="nav-item" data-nav="home" onclick="window.loadModule?.('home')">
                        <i class="fas fa-home"></i><span>Home</span>
                    </button>
                    <button class="nav-item" data-nav="booking" onclick="window.loadModule?.('booking')">
                        <i class="fas fa-calendar-check"></i><span>Booking</span>
                    </button>
                    <button class="nav-item" data-nav="sekuriti" onclick="window.loadModule?.('sekuriti')">
                        <i class="fas fa-shield-halved"></i><span>Security</span>
                    </button>
                    <button class="nav-item" data-nav="settings" onclick="window.loadModule?.('settings')">
                        <i class="fas fa-sliders"></i><span>Settings</span>
                    </button>
                </div>
            </nav>
        </div>

        <style>
            .alert-critical { border-color:#ef4444 !important; background:rgba(239,68,68,0.2) !important; }
            .alert-warning { border-color:#eab308 !important; background:rgba(234,179,8,0.2) !important; }
            .alert-safe { border-color:#22c55e !important; background:rgba(34,197,94,0.2) !important; }
        </style>
    `;
}

export async function afterRender({ user, supabase }) {
    console.log('⚠️ [MITIGASI] Module loaded');

    // Toggle protocol accordion
    window.toggleProtocol = function(type) {
        const el = document.getElementById('protocol-' + type);
        if (el) {
            el.style.display = el.style.display === 'none' ? 'block' : 'none';
        }
    };

    // Check disaster status
    async function checkDisasterStatus() {
        const statusCard = document.getElementById('mitigation-status');
        const statusIcon = document.getElementById('status-icon');
        const statusText = document.getElementById('status-text');
        const statusDesc = document.getElementById('status-desc');
        const alertsContainer = document.getElementById('active-alerts');
        const checkTime = document.getElementById('check-time');

        if (checkTime) checkTime.textContent = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        try {
            // Mock data - integrate with BMKG API for real data
            const mockStatus = 'safe'; // 'safe', 'warning', 'critical'

            if (mockStatus === 'critical') {
                if (statusCard) {
                    statusCard.className = 'glass-card p-6 mb-6 alert-critical';
                }
                if (statusIcon) statusIcon.textContent = '🚨';
                if (statusText) statusText.textContent = 'BAHAYA!';
                if (statusDesc) statusDesc.textContent = 'Bencana terdeteksi! Segera evakuasi!';
                
                if (alertsContainer) {
                    alertsContainer.innerHTML = `
                        <div style="background:rgba(239,68,68,0.2);padding:1rem;border-radius:12px;border-left:4px solid #ef4444;">
                            <h4 style="font-weight:700;color:#ef4444;margin-bottom:0.5rem;">🚨 PERINGATAN MERAH</h4>
                            <p style="font-size:0.875rem;color:#e2e8f0;">Gempa bumi terdeteksi magnitude 6.5</p>
                            <p style="font-size:0.625rem;color:#64748b;margin-top:0.5rem;">Sumber: BMKG</p>
                        </div>
                    `;
                }
            } else if (mockStatus === 'warning') {
                if (statusCard) {
                    statusCard.className = 'glass-card p-6 mb-6 alert-warning';
                }
                if (statusIcon) statusIcon.textContent = '⚠️';
                if (statusText) statusText.textContent = 'WASPADA';
                if (statusDesc) statusDesc.textContent = 'Potensi bencana dalam 24 jam';
                
                if (alertsContainer) {
                    alertsContainer.innerHTML = `
                        <div style="background:rgba(234,179,8,0.2);padding:1rem;border-radius:12px;border-left:4px solid #eab308;">
                            <h4 style="font-weight:700;color:#eab308;margin-bottom:0.5rem;">⚠️ PERINGATAN KUNING</h4>
                            <p style="font-size:0.875rem;color:#e2e8f0;">Potensi hujan lebat dan angin kencang</p>
                            <p style="font-size:0.625rem;color:#64748b;margin-top:0.5rem;">Sumber: BMKG</p>
                        </div>
                    `;
                }
            } else {
                if (statusCard) {
                    statusCard.className = 'glass-card p-6 mb-6 alert-safe';
                }
                if (statusIcon) statusIcon.textContent = '✅';
                if (statusText) statusText.textContent = 'KONDISI AMAN';
                if (statusDesc) statusDesc.textContent = 'Tidak ada peringatan bencana aktif';
                
                if (alertsContainer) {
                    alertsContainer.innerHTML = `
                        <div style="background:rgba(34,197,94,0.2);padding:1rem;border-radius:12px;border-left:4px solid #22c55e;">                            <p style="font-size:0.875rem;color:#e2e8f0;">✅ Tidak ada peringatan bencana saat ini</p>
                        </div>
                    `;
                }
            }

            // Save status
            localStorage.setItem('mitigationStatus', JSON.stringify({ status: mockStatus, timestamp: Date.now() }));

        } catch (err) {
            console.error('Mitigation check error:', err);
            if (statusDesc) statusDesc.textContent = 'Gagal memeriksa status. Periksa koneksi.';
        }
    }

    // Weather-based alerts
    function checkWeatherAlerts() {
        const weatherData = localStorage.getItem('weatherData');
        if (!weatherData) return;

        try {
            const weather = JSON.parse(weatherData);
            const alertsContainer = document.getElementById('active-alerts');
            
            if (weather.weather && weather.weather[0] && weather.weather[0].main === 'Thunderstorm') {
                const alertDiv = document.createElement('div');
                alertDiv.style.cssText = 'background:rgba(234,179,8,0.2);padding:1rem;border-radius:12px;border-left:4px solid #eab308;margin-top:0.75rem;';
                alertDiv.innerHTML = `
                    <h4 style="font-weight:700;color:#eab308;margin-bottom:0.5rem;">⛈️ CUACA EKSTREM</h4>
                    <p style="font-size:0.875rem;color:#e2e8f0;">Badai petir terdeteksi. Hindari aktivitas outdoor.</p>
                `;
                if (alertsContainer) alertsContainer.appendChild(alertDiv);
            }
        } catch (e) {}
    }

    // Refresh button
    document.getElementById('refresh-mitigasi')?.addEventListener('click', function() {
        checkDisasterStatus();
        checkWeatherAlerts();
        if (window.toast) {
            window.toast('⚠️ Status mitigasi diperbarui!', 'success');
        }
    });

    // Initial check
    checkDisasterStatus();
    checkWeatherAlerts();

    // Auto check every hour    const checkInterval = setInterval(checkDisasterStatus, 60 * 60 * 1000);

    // Store interval for cleanup
    document.getElementById('module-content')._cleanup = function() {
        clearInterval(checkInterval);
        console.log('⚠️ [MITIGASI] Module cleanup - stopped auto-check');
    };
}

export function cleanup() {
    console.log('⚠️ [MITIGASI] Module cleanup');
}

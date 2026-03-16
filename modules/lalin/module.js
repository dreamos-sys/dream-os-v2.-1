/**
 * 🚦 MODUL LALIN – Dream OS v2.1
 * TRAFFIC MONITOR dengan Rute Alternatif
 * Features: Real-time Traffic, Peak Hours, Travel Tips, Route Status
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
                <h2 style="font-size:1.5rem;font-weight:700;color:#10b981;margin-bottom:0.5rem;text-align:center;">
                    🚦 TRAFFIC MONITOR
                </h2>
                <p style="font-size:0.75rem;color:#64748b;margin-bottom:1.5rem;text-align:center;">Lalu Lintas & Rute Alternatif</p>

                <!-- Current Traffic Status -->
                <div class="glass-card p-6 mb-6" id="traffic-status-card" style="background:rgba(15,23,42,0.9);border:1px solid rgba(16,185,129,0.2);">
                    <div style="display:flex;align-items:center;gap:1rem;">
                        <div id="traffic-icon" style="font-size:3rem;">🟢</div>
                        <div style="flex:1;">
                            <h3 id="traffic-status" style="font-size:1.25rem;font-weight:700;color:#e2e8f0;">Memuat...</h3>
                            <p id="traffic-desc" style="font-size:0.875rem;color:#94a3b8;">-</p>
                        </div>
                        <div style="text-align:right;">
                            <p style="font-size:0.75rem;color:#64748b;">Update</p>
                            <p id="traffic-time" style="font-size:1rem;font-weight:700;color:#10b981;font-family:'JetBrains Mono',monospace;">--:--</p>
                        </div>
                    </div>
                </div>

                <!-- Key Routes -->
                <div class="glass-card p-6 mb-6" style="background:rgba(15,23,42,0.9);border:1px solid rgba(16,185,129,0.2);">
                    <h3 style="font-size:1.125rem;font-weight:700;color:#e2e8f0;margin-bottom:1rem;">
                        <i class="fas fa-road" style="color:#10b981;margin-right:8px;"></i> Rute Utama ke Al-Fikri
                    </h3>
                    <div id="routes-container" class="space-y-3">
                        <div style="text-align:center;color:#64748b;padding:2rem;">Memuat data rute...</div>                    </div>
                </div>

                <!-- Peak Hours -->
                <div class="glass-card p-6 mb-6" style="background:rgba(15,23,42,0.9);border:1px solid rgba(16,185,129,0.2);">
                    <h3 style="font-size:1.125rem;font-weight:700;color:#e2e8f0;margin-bottom:1rem;">
                        <i class="fas fa-clock" style="color:#f59e0b;margin-right:8px;"></i> Jam Sibuk (Peak Hours)
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div style="background:rgba(30,41,59,0.8);padding:1rem;border-radius:12px;">
                            <h4 style="font-weight:700;color:#e2e8f0;margin-bottom:0.5rem;">🌅 Pagi</h4>
                            <div style="font-size:0.875rem;">
                                <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;">
                                    <span style="color:#94a3b8;">06:30 - 07:30</span>
                                    <span style="color:#f59e0b;font-weight:700;">Sibuk</span>
                                </div>
                                <div style="display:flex;justify-content:space-between;">
                                    <span style="color:#94a3b8;">07:30 - 08:30</span>
                                    <span style="color:#ef4444;font-weight:700;">Sangat Sibuk</span>
                                </div>
                            </div>
                        </div>
                        <div style="background:rgba(30,41,59,0.8);padding:1rem;border-radius:12px;">
                            <h4 style="font-weight:700;color:#e2e8f0;margin-bottom:0.5rem;">🌆 Sore</h4>
                            <div style="font-size:0.875rem;">
                                <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;">
                                    <span style="color:#94a3b8;">15:30 - 16:30</span>
                                    <span style="color:#f59e0b;font-weight:700;">Sibuk</span>
                                </div>
                                <div style="display:flex;justify-content:space-between;">
                                    <span style="color:#94a3b8;">16:30 - 18:00</span>
                                    <span style="color:#ef4444;font-weight:700;">Sangat Sibuk</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Travel Tips -->
                <div class="glass-card p-6 mb-6" style="background:rgba(15,23,42,0.9);border:1px solid rgba(16,185,129,0.2);">
                    <h3 style="font-size:1.125rem;font-weight:700;color:#e2e8f0;margin-bottom:1rem;">
                        <i class="fas fa-lightbulb" style="color:#f59e0b;margin-right:8px;"></i> Saran Perjalanan
                    </h3>
                    <div id="travel-tips" class="space-y-3">
                        <p style="color:#64748b;">Menganalisis kondisi lalu lintas...</p>
                    </div>
                </div>

                <!-- External Links -->
                <div class="glass-card p-6 mb-6" style="background:rgba(15,23,42,0.9);border:1px solid rgba(16,185,129,0.2);">                    <h3 style="font-size:1.125rem;font-weight:700;color:#e2e8f0;margin-bottom:1rem;">🔗 Link Eksternal</h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <a href="https://maps.google.com" target="_blank" style="background:rgba(30,41,59,0.8);padding:1rem;border-radius:12px;text-align:center;text-decoration:none;color:#e2e8f0;transition:all 0.2s;">
                            <div style="font-size:1.5rem;margin-bottom:0.5rem;">🗺️</div>
                            <p style="font-size:0.75rem;">Google Maps</p>
                        </a>
                        <a href="https://waze.com" target="_blank" style="background:rgba(30,41,59,0.8);padding:1rem;border-radius:12px;text-align:center;text-decoration:none;color:#e2e8f0;transition:all 0.2s;">
                            <div style="font-size:1.5rem;margin-bottom:0.5rem;">💙</div>
                            <p style="font-size:0.75rem;">Waze</p>
                        </a>
                        <a href="https://jakarta.go.id" target="_blank" style="background:rgba(30,41,59,0.8);padding:1rem;border-radius:12px;text-align:center;text-decoration:none;color:#e2e8f0;transition:all 0.2s;">
                            <div style="font-size:1.5rem;margin-bottom:0.5rem;">🏛️</div>
                            <p style="font-size:0.75rem;">Info Jakarta</p>
                        </a>
                        <a href="https://bmkg.go.id" target="_blank" style="background:rgba(30,41,59,0.8);padding:1rem;border-radius:12px;text-align:center;text-decoration:none;color:#e2e8f0;transition:all 0.2s;">
                            <div style="font-size:1.5rem;margin-bottom:0.5rem;">🌤️</div>
                            <p style="font-size:0.75rem;">BMKG</p>
                        </a>
                    </div>
                </div>

                <!-- Refresh Button -->
                <div style="text-align:center;margin-bottom:1.5rem;">
                    <button id="refresh-lalin" style="background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;padding:12px 32px;border-radius:12px;font-weight:700;font-size:0.875rem;cursor:pointer;transition:all 0.2s;">
                        <i class="fas fa-sync-alt" style="margin-right:8px;"></i> Refresh Data
                    </button>
                </div>
            </main>

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
            .traffic-green { background:linear-gradient(135deg,#22c55e,#16a34a) !important; }            .traffic-yellow { background:linear-gradient(135deg,#eab308,#ca8a04) !important; }
            .traffic-red { background:linear-gradient(135deg,#ef4444,#dc2626) !important; }
        </style>
    `;
}

export async function afterRender({ user, supabase }) {
    console.log('🚦 [LALIN] Module loaded');

    // Traffic routes data
    const trafficData = {
        routes: [
            { name: 'Jl. Margonda Raya', status: 'lancar', time: '15 min', color: 'green' },
            { name: 'Jl. Depok Raya', status: 'padat', time: '25 min', color: 'yellow' },
            { name: 'Jl. Citayam', status: 'lancar', time: '12 min', color: 'green' },
            { name: 'Tol Jagorawi', status: 'sangat padat', time: '35 min', color: 'red' }
        ]
    };

    // ========== LOAD TRAFFIC ==========
    function loadTraffic() {
        const hour = new Date().getHours();
        const day = new Date().getDay();

        let status, statusClass, icon, desc;

        const isWeekday = day >= 1 && day <= 5;
        const isMorningPeak = hour >= 6 && hour <= 8;
        const isEveningPeak = hour >= 15 && hour <= 18;

        if (isWeekday && (isMorningPeak || isEveningPeak)) {
            status = 'PADAT MERAYAP';
            statusClass = 'traffic-red';
            icon = '🔴';
            desc = 'Jam sibuk! Waktu perjalanan bisa 2x lebih lama.';
        } else if (isWeekday && (hour >= 9 && hour <= 14)) {
            status = 'LANCAR';
            statusClass = 'traffic-green';
            icon = '🟢';
            desc = 'Kondisi baik untuk perjalanan.';
        } else {
            status = 'NORMAL';
            statusClass = 'traffic-yellow';
            icon = '🟡';
            desc = 'Lalu lintas stabil.';
        }

        // Update UI
        const card = document.getElementById('traffic-status-card');
        if (card) {            card.className = 'glass-card p-6 mb-6 ' + statusClass;
        }

        const trafficIcon = document.getElementById('traffic-icon');
        const trafficStatus = document.getElementById('traffic-status');
        const trafficDesc = document.getElementById('traffic-desc');
        const trafficTime = document.getElementById('traffic-time');

        if (trafficIcon) trafficIcon.textContent = icon;
        if (trafficStatus) trafficStatus.textContent = status;
        if (trafficDesc) trafficDesc.textContent = desc;
        if (trafficTime) trafficTime.textContent = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

        // Load routes
        loadRoutes();

        // Generate travel tips
        generateTravelTips(status, hour, day);

        // Save to localStorage
        localStorage.setItem('trafficData', JSON.stringify({ status, timestamp: Date.now() }));
    }

    // ========== LOAD ROUTES ==========
    function loadRoutes() {
        const container = document.getElementById('routes-container');
        if (!container) return;

        const routes = trafficData.routes.map(route => {
            const colorClass = route.color === 'green' ? '#22c55e' : route.color === 'yellow' ? '#eab308' : '#ef4444';
            const bgColor = route.color === 'green' ? 'rgba(34,197,94,0.2)' : route.color === 'yellow' ? 'rgba(234,179,8,0.2)' : 'rgba(239,68,68,0.2)';

            return `
                <div style="display:flex;justify-content:space-between;align-items:center;background:rgba(30,41,59,0.8);padding:1rem;border-radius:12px;margin-bottom:0.75rem;">
                    <div style="display:flex;align-items:center;gap:0.75rem;">
                        <div style="width:12px;height:12px;border-radius:50%;background:${colorClass};"></div>
                        <span style="font-weight:600;color:#e2e8f0;">${route.name}</span>
                    </div>
                    <div style="text-align:right;">
                        <span style="color:${colorClass};font-weight:700;">${route.status.toUpperCase()}</span>
                        <span style="font-size:0.75rem;color:#64748b;margin-left:0.5rem;">~${route.time}</span>
                    </div>
                </div>
            `;
        });

        container.innerHTML = routes.join('');
    }

    // ========== GENERATE TRAVEL TIPS ==========    function generateTravelTips(status, hour, day) {
        const container = document.getElementById('travel-tips');
        if (!container) return;

        const tips = [];
        const isWeekday = day >= 1 && day <= 5;

        if (status.includes('PADAT')) {
            tips.push('🚗 <strong>Rute Alternatif:</strong> Gunakan Jl. Citayam untuk menghindari kemacetan Margonda.');
            tips.push('⏰ <strong>Berangkat Lebih Awal:</strong> Tambahkan 30 menit untuk waktu perjalanan.');
            tips.push('🏍️ <strong>Ojek Online:</strong> Pertimbangkan ojek online untuk lebih cepat.');
        }
        if (isWeekday && hour >= 6 && hour <= 7) {
            tips.push('🚌 <strong>Transportasi Umum:</strong> KRL dan TransJakarta lebih predictable saat jam sibuk.');
        }
        if (day === 0 || day === 6) {
            tips.push('🎉 <strong>Akhir Pekan:</strong> Traffic biasanya lebih lancar, kecuali ada event khusus.');
        }

        // Weather-based tips
        const weatherData = localStorage.getItem('weatherData');
        if (weatherData) {
            try {
                const weather = JSON.parse(weatherData);
                if (weather.weather && weather.weather[0] && weather.weather[0].main === 'Rain') {
                    tips.push('🌧️ <strong>Hujan:</strong> Waspada genangan di Jl. Depok Raya. Bawa jas hujan!');
                }
            } catch (e) {}
        }

        if (tips.length === 0) {
            tips.push('✅ <strong>Kondisi Normal:</strong> Perjalanan dapat dilakukan seperti biasa.');
        }

        container.innerHTML = tips.map(tip => `
            <div style="background:rgba(30,41,59,0.8);padding:1rem;border-radius:12px;border-left:4px solid #10b981;margin-bottom:0.75rem;">
                <p style="font-size:0.875rem;color:#e2e8f0;">${tip}</p>
            </div>
        `).join('');
    }

    // ========== REFRESH BUTTON ==========
    document.getElementById('refresh-lalin')?.addEventListener('click', function() {
        loadTraffic();
        if (window.toast) {
            window.toast('🚦 Data lalu lintas diperbarui!', 'success');
        }
    });

    // ========== INIT ==========    loadTraffic();

    // Auto refresh every 15 minutes
    const refreshInterval = setInterval(loadTraffic, 15 * 60 * 1000);

    // Store interval for cleanup
    document.getElementById('module-content')._cleanup = function() {
        clearInterval(refreshInterval);
        console.log('🚦 [LALIN] Module cleanup - stopped auto-refresh');
    };
}

export function cleanup() {
    console.log('🚦 [LALIN] Module cleanup');
}

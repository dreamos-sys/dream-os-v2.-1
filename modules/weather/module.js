/**
 * 🌤️ MODUL WEATHER MONITOR – Dream OS v2.1
 * Menampilkan cuaca real-time untuk wilayah Depok menggunakan OpenWeatherMap API.
 * Fitur:
 * - Cuaca saat ini (suhu, kelembaban, angin, deskripsi)
 * - Peringatan cuaca ekstrem (badai, panas, hujan lebat)
 * - Rekomendasi aktivitas berdasarkan cuaca
 * - Forecast 7 hari (simulasi)
 * - Auto-refresh setiap 30 menit
 * - Integrasi dengan GhostAudit dan toast
 */

export async function render() {
    return `
        <div class="max-w-6xl mx-auto p-4 space-y-6">
            <!-- Header -->
            <div class="text-center">
                <h1 class="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    🌤️ WEATHER MONITOR
                </h1>
                <p class="text-xs text-slate-400 font-mono mt-1">Real-Time Weather & Disaster Alert</p>
            </div>

            <!-- Alert Banner -->
            <div id="weather-alert" class="hidden glass-card p-4 rounded-2xl border-2 border-red-500 alert-pulse bg-red-500/20">
                <div class="flex items-center gap-3">
                    <div class="text-3xl">⚠️</div>
                    <div class="flex-1">
                        <h3 class="font-bold text-red-400">PERINGATAN CUACA EKSTREM</h3>
                        <p id="alert-message" class="text-sm text-slate-300">-</p>
                    </div>
                </div>
            </div>

            <!-- Current Weather -->
            <div class="glass-card weather-gradient p-8 rounded-3xl" style="background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);">
                <div class="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div class="text-center md:text-left">
                        <p class="text-sm opacity-80 mb-1">📍 Depok, Indonesia</p>
                        <h2 class="text-5xl font-black mb-2" id="current-temp">--°C</h2>
                        <p class="text-xl opacity-90" id="weather-desc">Memuat...</p>
                        <p class="text-sm opacity-70 mt-1" id="update-time">Updated: --</p>
                    </div>
                    <div class="text-8xl" id="weather-icon">🌤️</div>
                    <div class="grid grid-cols-3 gap-4 text-center">
                        <div class="bg-white/20 p-4 rounded-2xl">
                            <p class="text-xs opacity-80">Kelembaban</p>
                            <p class="text-xl font-bold" id="humidity">--%</p>
                        </div>
                        <div class="bg-white/20 p-4 rounded-2xl">
                            <p class="text-xs opacity-80">Angin</p>
                            <p class="text-xl font-bold" id="wind">-- km/h</p>
                        </div>
                        <div class="bg-white/20 p-4 rounded-2xl">
                            <p class="text-xs opacity-80">UV Index</p>
                            <p class="text-xl font-bold" id="uv">--</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 7-Day Forecast -->
            <div class="glass-card p-6 rounded-3xl border border-cyan-500/30">
                <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
                    <i class="fas fa-calendar-week text-cyan-500"></i> Forecast 7 Hari
                </h2>
                <div id="forecast-container" class="grid grid-cols-2 md:grid-cols-7 gap-3">
                    <div class="text-center text-slate-400 col-span-full">Memuat data...</div>
                </div>
            </div>

            <!-- Activity Recommendations -->
            <div class="glass-card p-6 rounded-3xl border border-cyan-500/30">
                <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
                    <i class="fas fa-lightbulb text-yellow-500"></i> Rekomendasi Aktivitas
                </h2>
                <div id="activity-recommendations" class="space-y-3">
                    <p class="text-slate-400">Menganalisis kondisi cuaca...</p>
                </div>
            </div>

            <!-- Manual Refresh -->
            <div class="text-center">
                <button id="refresh-weather" class="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold transition-all">
                    <i class="fas fa-sync-alt mr-2"></i> Refresh Data
                </button>
                <p class="text-xs text-slate-500 mt-2">Data otomatis refresh setiap 30 menit</p>
            </div>

            <div class="text-center">
                <a href="#" onclick="window.DREAM.load('home'); return false;" class="text-blue-400 hover:text-blue-300 text-sm">
                    <i class="fas fa-arrow-left mr-1"></i> Kembali ke Dashboard
                </a>
            </div>
        </div>
    `;
}

export async function afterRender() {
    console.log('[WEATHER] Module loaded');

    // OpenWeatherMap API key (ganti dengan key Anda jika perlu)
    const WEATHER_API_KEY = 'f7890d7569950ffa34a5827880e8442f'; 
    const WEATHER_URL = 'https://api.openweathermap.org/data/2.5';
    const LOCATION = { lat: -6.4, lon: 106.8 }; // Depok coordinates

    // Weather icon mapping
    const weatherIcons = {
        'Clear': '☀️', 'Clouds': '☁️', 'Rain': '🌧️', 'Drizzle': '🌦️',
        'Thunderstorm': '⛈️', 'Snow': '❄️', 'Mist': '🌫️', 'Smoke': '🌫️',
        'Haze': '🌫️', 'Dust': '🌪️', 'Fog': '🌫️', 'Sand': '🌪️', 'Ash': '🌋',
        'Squall': '💨', 'Tornado': '🌪️'
    };

    // ========== LOAD WEATHER DATA ==========
    async function loadWeather() {
        try {
            const currentRes = await fetch(`${WEATHER_URL}/weather?lat=${LOCATION.lat}&lon=${LOCATION.lon}&appid=${WEATHER_API_KEY}&units=metric`);
            const current = await currentRes.json();

            if (current.cod !== 200) throw new Error('Failed to fetch weather');

            // Update UI
            document.getElementById('current-temp').textContent = `${Math.round(current.main.temp)}°C`;
            document.getElementById('weather-desc').textContent = current.weather[0].description;
            document.getElementById('weather-icon').textContent = weatherIcons[current.weather[0].main] || '🌤️';
            document.getElementById('humidity').textContent = `${current.main.humidity}%`;
            document.getElementById('wind').textContent = `${Math.round(current.wind.speed * 3.6)} km/h`; // m/s to km/h
            document.getElementById('uv').textContent = 'Moderate'; // UV perlu API terpisah
            document.getElementById('update-time').textContent = `Updated: ${new Date().toLocaleTimeString('id-ID')}`;

            // Cek peringatan cuaca
            checkWeatherAlerts(current);

            // Generate rekomendasi
            generateRecommendations(current);

            // Simpan ke localStorage untuk offline
            localStorage.setItem('weatherData', JSON.stringify({
                ...current,
                timestamp: Date.now()
            }));

            // Catat ke audit
            if (window.GhostAudit) {
                window.GhostAudit.record(
                    window.DREAM?.state?.user?.email || 'system',
                    'WEATHER_UPDATE',
                    `Suhu: ${current.main.temp}°C, Kondisi: ${current.weather[0].main}`
                );
            }

            // Toast
            if (window.DREAM?.showToast) {
                window.DREAM.showToast('Data cuaca diperbarui', 'info');
            }

        } catch (err) {
            console.error('[WEATHER] Error:', err);
            // Fallback ke cache
            const cached = localStorage.getItem('weatherData');
            if (cached) {
                const data = JSON.parse(cached);
                if (Date.now() - data.timestamp < 2 * 60 * 60 * 1000) { // cache < 2 jam
                    document.getElementById('weather-desc').textContent = 'Data cached (offline)';
                }
            }
        }
    }

    // ========== CEK PERINGATAN CUACA ==========
    function checkWeatherAlerts(data) {
        const alertBanner = document.getElementById('weather-alert');
        const alertMessage = document.getElementById('alert-message');
        
        const temp = data.main.temp;
        const weather = data.weather[0].main;
        const wind = data.wind.speed;

        let alert = null;

        if (weather === 'Thunderstorm') {
            alert = '⛈️ Badai petir terdeteksi! Hindari aktivitas outdoor.';
        } else if (temp > 35) {
            alert = '🔥 Panas ekstrem! Pastikan hidrasi cukup dan hindari matahari langsung.';
        } else if (temp < 20) {
            alert = '❄️ Suhu dingin! Gunakan pakaian hangat.';
        } else if (wind > 10) {
            alert = '💨 Angin kencang! Amankan benda-benda ringan di luar.';
        } else if (weather === 'Rain' && data.rain?.['1h'] > 10) {
            alert = '🌧️ Hujan lebat! Waspada banjir dan genangan.';
        }

        if (alert) {
            alertMessage.textContent = alert;
            alertBanner.classList.remove('hidden');
        } else {
            alertBanner.classList.add('hidden');
        }
    }

    // ========== GENERATE REKOMENDASI AKTIVITAS ==========
    function generateRecommendations(data) {
        const container = document.getElementById('activity-recommendations');
        const temp = data.main.temp;
        const weather = data.weather[0].main;
        const humidity = data.main.humidity;

        const recommendations = [];

        if (weather === 'Clear' && temp >= 25 && temp <= 32) {
            recommendations.push('✅ **Cuaca Ideal:** Kondisi sempurna untuk aktivitas outdoor dan olahraga.');
        }

        if (humidity > 80) {
            recommendations.push('💧 **Kelembaban Tinggi:** Pastikan ventilasi udara baik. Waspada jamur.');
        }

        if (weather === 'Rain') {
            recommendations.push('🏫 **Untuk Sekolah:** Siapkan payung/jas hujan. Waspadai lantai licin.');
            recommendations.push('🚌 **Transport:** Antisipasi kemacetan saat hujan. Berangkat lebih awal.');
        }

        if (temp > 33) {
            recommendations.push('❄️ **AC & Ventilasi:** Pastikan AC berfungsi baik. Sediakan air minum cukup.');
            recommendations.push('⚡ **Listrik:** Beban AC tinggi. Monitor konsumsi listrik.');
        }

        if (weather === 'Thunderstorm') {
            recommendations.push('⚡ **Safety:** Hindari penggunaan perangkat elektronik outdoor.');
            recommendations.push('🔌 **Listrik:** Waspada gangguan listrik. Siapkan UPS jika ada.');
        }

        if (recommendations.length === 0) {
            recommendations.push('✅ **Kondisi Normal:** Aktivitas dapat berjalan seperti biasa.');
        }

        container.innerHTML = recommendations.map(rec => `
            <div class="bg-slate-800/50 p-4 rounded-xl border-l-4 border-cyan-500">
                <p class="text-sm">${rec}</p>
            </div>
        `).join('');
    }

    // ========== LOAD FORECAST (SIMULASI) ==========
    async function loadForecast() {
        const container = document.getElementById('forecast-container');
        
        const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
        const today = new Date().getDay();
        
        let html = '';
        for (let i = 0; i < 7; i++) {
            const dayIndex = (today + i) % 7;
            const temp = Math.round(28 + Math.random() * 8 - 4); // Mock 24-36°C
            const weathers = ['☀️', '☁️', '🌧️', '⛈️', '🌦️'];
            const weather = weathers[Math.floor(Math.random() * weathers.length)];
            
            html += `
                <div class="bg-slate-800/50 p-4 rounded-2xl text-center">
                    <p class="text-xs text-slate-400 mb-2">${days[dayIndex]}</p>
                    <p class="text-3xl mb-2">${weather}</p>
                    <p class="text-lg font-bold">${temp}°C</p>
                </div>
            `;
        }
        
        container.innerHTML = html;
    }

    // ========== REFRESH BUTTON ==========
    document.getElementById('refresh-weather')?.addEventListener('click', () => {
        loadWeather();
        loadForecast();
    });

    // ========== INIT ==========
    loadWeather();
    loadForecast();

    // Auto-refresh setiap 30 menit
    const interval = setInterval(loadWeather, 30 * 60 * 1000);

    // Cleanup interval saat modul ditutup (opsional, karena setelahRender hanya sekali)
    // Kita bisa menyimpan interval ID untuk dibersihkan jika diperlukan
    window._weatherInterval = interval;
}

export function cleanup() {
    if (window._weatherInterval) {
        clearInterval(window._weatherInterval);
        console.log('[WEATHER] Interval dibersihkan');
    }
}

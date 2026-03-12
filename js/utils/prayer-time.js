/* ============================================
   🕌 DREAM OS 2026 - PRAYER TIME UTILITY
   Islamic Integration - FIXED
   ============================================ */

(function() {
    if (typeof window.DREAM === 'undefined') {
        console.error('[PRAYER] DREAM not available');
        return;
    }
    if (!window.DREAM.utils) window.DREAM.utils = {};

    class PrayerTimeUtility {
        constructor() {
            this.api = 'https://api.aladhan.com/v1/timingsByCity';
            this.cache = null;
            this.cacheExpiry = 24 * 60 * 60 * 1000;
            this.location = { city: 'Jakarta', country: 'Indonesia' };
            this.defaultTimes = {
                Fajr: '04:30',
                Dhuhr: '12:05',
                Asr: '15:20',
                Maghrib: '18:00',
                Isha: '19:15'
            };
            this.init();
        }

        async init() {
            if (window.DREAM?.config?.api?.prayerTime) {
                this.api = window.DREAM.config.api.prayerTime;
            }
            await this.loadFromCache();
            await this.fetchPrayerTimes();
            this.startAutoUpdate();
        }

        async fetchPrayerTimes() {
            try {
                const url = `${this.api}?city=${this.location.city}&country=${this.location.country}`;
                const response = await fetch(url);
                if (!response.ok) throw new Error('API failed');
                const data = await response.json();
                this.cache = {
                    data: data.data,
                    timestamp: Date.now()
                };
                localStorage.setItem('dreamos-prayer-times', JSON.stringify(this.cache));
                this.updateUI();
            } catch (error) {
                console.warn('⚠️ [PRAYER] Fetch failed, using cache:', error);
                this.loadFromCache();
            }
        }

        async loadFromCache() {
            try {
                const cached = localStorage.getItem('dreamos-prayer-times');
                if (cached) {
                    this.cache = JSON.parse(cached);
                    this.updateUI();
                }
            } catch (e) {}
        }

        startAutoUpdate() {
            setInterval(() => this.fetchPrayerTimes(), this.cacheExpiry);
        }

        updateUI() {
            const timings = this.cache?.data?.timings || this.defaultTimes;
            const display = document.getElementById('prayer-time-display');
            if (display) {
                const next = this.getNextPrayer(timings);
                display.textContent = `${next.name} ${next.time}`;
            }
        }

        getNextPrayer(timings) {
            const now = new Date();
            const prayers = [
                { name: 'Fajr', time: timings.Fajr || this.defaultTimes.Fajr },
                { name: 'Dhuhr', time: timings.Dhuhr || this.defaultTimes.Dhuhr },
                { name: 'Asr', time: timings.Asr || this.defaultTimes.Asr },
                { name: 'Maghrib', time: timings.Maghrib || this.defaultTimes.Maghrib },
                { name: 'Isha', time: timings.Isha || this.defaultTimes.Isha }
            ];
            for (const p of prayers) {
                const [h, m] = p.time.split(':').map(Number);
                const prayerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
                if (prayerDate > now) return p;
            }
            return prayers[0];
        }

        getTimes() {
            return this.cache?.data?.timings || this.defaultTimes;
        }
    }

    window.DREAM.utils.prayerTime = new PrayerTimeUtility();
    console.log('✅ [PRAYER] Utility ready');
})();

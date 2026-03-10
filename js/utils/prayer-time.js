/* ============================================
   🕌 DREAM OS 2026 - PRAYER TIME UTILITY
   Islamic Integration
   ============================================ */

class PrayerTimeUtility {
  constructor() {
    this.api = DREAM.config.api.prayerTime;
    this.cache = null;
    this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours
    this.location = { city: 'Jakarta', country: 'Indonesia' };
  }

  async init() {
    await this.loadFromCache();
    await this.fetchPrayerTimes();
    this.startAutoUpdate();
  }

  async fetchPrayerTimes() {
    try {
      const response = await fetch(
        `${this.api}?city=${this.location.city}&country=${this.location.country}`
      );
      
      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      this.cache = {
        data: data.data,
        timestamp: Date.now()
      };
      
      localStorage.setItem('dreamos-prayer-times', JSON.stringify(this.cache));
      this.updateUI();
      
    } catch (error) {
      console.warn('⚠️ [PRAYER] Failed to fetch:', error);
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
    } catch (error) {      console.warn('⚠️ [PRAYER] Cache load failed:', error);
    }
  }

  startAutoUpdate() {
    setInterval(() => this.fetchPrayerTimes(), this.cacheExpiry);
  }

  updateUI() {
    if (!this.cache?.data?.timings) return;
    
    const timings = this.cache.data.timings;
    const display = document.getElementById('prayer-time-display');
    
    if (display) {
      const nextPrayer = this.getNextPrayer(timings);
      display.textContent = `${nextPrayer.name} ${nextPrayer.time}`;
    }
  }

  getNextPrayer(timings) {
    const now = new Date();
    const prayers = [
      { name: 'Fajr', time: timings.Fajr },
      { name: 'Dhuhr', time: timings.Dhuhr },
      { name: 'Asr', time: timings.Asr },
      { name: 'Maghrib', time: timings.Maghrib },
      { name: 'Isha', time: timings.Isha }
    ];
    
    for (const prayer of prayers) {
      const prayerTime = this.parseTime(prayer.time);
      if (prayerTime > now) {
        return prayer;
      }
    }
    
    return prayers[0]; // Return Fajr for next day
  }

  parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(':');
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  }

  getTimes() {
    return this.cache?.data?.timings || null;
  }
}
DREAM.utils = DREAM.utils || {};
DREAM.utils.prayerTime = new PrayerTimeUtility();

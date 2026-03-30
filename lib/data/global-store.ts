export interface BookingData { id: number; title: string; date: string; status: 'pending' | 'approved' | 'rejected'; }
export interface K3Report { id: number; type: string; location: string; status: 'pending' | 'resolved'; }

class GlobalStore {
  private static instance: GlobalStore;
  constructor() {}
  static getInstance(): GlobalStore {
    if (!GlobalStore.instance) GlobalStore.instance = new GlobalStore();
    return GlobalStore.instance;
  }
  set(key: string, value: any) { if (typeof window !== 'undefined') localStorage.setItem(`dream_${key}`, JSON.stringify(value)); }
  get(key: string) {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(`dream_${key}`);
    return stored ? JSON.parse(stored) : [];
  }
  add(key: string, item: any) {
    const data = this.get(key) || [];
    data.push(item);
    this.set(key, data);
  }
  getGreeting() {
    const hour = new Date().getHours();
    if (hour < 11) return { text: 'Selamat Pagi', icon: '🌅', subtext: 'Bismillah memulai hari!' };
    if (hour < 15) return { text: 'Selamat Siang', icon: '☀️', subtext: 'Tetap produktif!' };
    return { text: 'Selamat Malam', icon: '🌙', subtext: 'Istirahat yang cukup!' };
  }
}
export const store = GlobalStore.getInstance();

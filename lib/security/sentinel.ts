export const NeuralSentinel = {
  // 1. Deteksi Injector (F12 / PC Usage)
  detectInjector: () => {
    const isPC = !/Android|iPhone|iPad/i.test(navigator.userAgent);
    const devToolsOpen = window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160;
    
    if (isPC || devToolsOpen) {
      console.warn("⚠️ SENTINEL: Unnatural System Access Detected (PC/DevTools)");
      return true;
    }
    return false;
  },

  // 2. IP Identity & Geofencing (Depok Safe Core)
  checkIPIdentity: async () => {
    try {
      const res = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      
      // Cek apakah di area Depok (Safe Core 5km)
      const isLocal = data.city === 'Depok' || data.region === 'West Java';
      
      return {
        ip: data.ip,
        area: data.city,
        isTrusted: isLocal,
        isp: data.org
      };
    } catch (e) {
      return { ip: 'hidden', isTrusted: false };
    }
  },

  // 3. Lockout Logic (3 Minutes)
  handleLockout: () => {
    const attempts = parseInt(localStorage.getItem('login_attempts') || '0');
    const lockoutUntil = parseInt(localStorage.getItem('lockout_until') || '0');
    
    if (Date.now() < lockoutUntil) {
      const remaining = Math.ceil((lockoutUntil - Date.now()) / 60000);
      return { isLocked: true, remaining };
    }
    
    if (attempts >= 3) {
      const threeMinutes = Date.now() + (3 * 60 * 1000);
      localStorage.setItem('lockout_until', threeMinutes.toString());
      localStorage.setItem('login_attempts', '0');
      return { isLocked: true, remaining: 3 };
    }
    
    return { isLocked: false };
  }
};

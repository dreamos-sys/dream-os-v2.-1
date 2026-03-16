// shared/services/index.js

export const services = {
  auth: {
    login: (code) => {
      // Ganti '1234' dengan Access Code rahasia lo, My Bro!
      if (code === 'b15m1ll4h_012443410') {
        localStorage.setItem('dream_os_session', 'active');
        return true;
      }
      return false;
    }
  },
  toast: (msg, type) => {
    alert(`${type === 'error' ? '❌' : '✅'} ${msg}`);
  }
};

export async function initServices() {
  console.log("🛠️ Services Initialized...");
  // Di sini nanti kita tancap kabel ke Supabase
  return true;
}
export const services = {
  toast: (msg, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    const container = document.getElementById('toast-container');
    if (container) {
      container.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    } else {
      alert(msg);
    }
  }
};

export async function initServices() {
  console.log('✅ Shared services initialized');
}

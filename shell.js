// shell.js - Dream OS v2.1 (Kernel Core)
// Official Enterprise Modular Platform - Bismillah & Shalawat Standard

import { services, initServices } from './shared/services/index.js';

// State App
const state = {
  user: null,
  currentModule: null,
  cleanup: null,
  isInitialized: false,
  logoAngle: 240 // Sudut awal: Huruf ه
};

/**
 * Inisialisasi Kernel
 */
async function init() {
  try {
    await initServices();
    const manifestRes = await fetch('./manifest.json');
    if (!manifestRes.ok) throw new Error('System Manifest tidak ditemukan.');
    const { modules } = await manifestRes.json();

    // Render Framework Utama
    renderShell();

    // Render Grid Modul
    renderModuleGrid(modules);

    // Cek Session (Placeholder Supabase)
    checkSession();

    state.isInitialized = true;
    console.log('✅ Dream OS v2.1 Kernel Ready (Bismillah Mode)');
  } catch (err) {
    console.error('Kernel Initialization Failed:', err);
    document.getElementById('app-shell').innerHTML = `
      <div style="color:white; padding:2rem; text-align:center;">
        <h2 style="color:#ef4444">Critical System Failure</h2>
        <p>${err.message}</p>
        <button onclick="location.reload()" style="padding:10px; margin-top:10px; cursor:pointer">Reboot Kernel</button>
      </div>
    `;
  }
}

/**
 * Render Struktur Framework dengan Bismillah & Transisi Logo
 */
function renderShell() {
  const shell = document.getElementById('app-shell');
  shell.innerHTML = `
    <header class="shell-header">
      <div class="header-content">
        <div class="logo-area">
          <img id="dream-os-logo" src="./assets/icons/logo_haa.svg" alt="Dream OS" style="transform: rotate(${state.logoAngle}deg);" />
          <h1 style="color:#10b981">Dream OS <span class="version">v2.1</span></h1>
        </div>
        
        <div class="system-meta">
          <span class="arabic bismillah-text">بسم الله الرحمن الرحيم</span>
          <div class="user-info">
            <span id="clock" class="clock">00:00:00</span>
            <div id="user-badge" class="user-badge">OFFLINE</div>
          </div>
        </div>
      </div>
    </header>
    
    <main id="main-content">
      <div id="module-grid" class="module-grid"></div>
      <div id="module-container" class="module-container" style="display:none"></div>
    </main>

    <footer class="bottom-bar">
      <button id="shalawat-btn" class="nav-btn shalawat-action">
        <span class="arabic">اللهم صل على محمد</span>
        <span class="btn-subtext">Dashoard</span>
      </button>
    </footer>
  `;

  // Bind Event Tombol Home
  document.getElementById('shalawat-btn').addEventListener('click', closeCurrentModule);

  // Jalankan Jam
  setInterval(() => {
    const clockEl = document.getElementById('clock');
    if (clockEl) clockEl.textContent = new Date().toLocaleTimeString('id-ID');
  }, 1000);
}

/**
 * Render Menu Modul (Standard Grid)
 */
function renderModuleGrid(modules) {
  const grid = document.getElementById('module-grid');
  grid.innerHTML = modules.map(m => `
    <div class="module-card" data-module-id="${m.id}" style="cursor:pointer">
      <div class="module-icon">${m.icon}</div>
      <div class="module-namearabic arabic" style="color: #64748b;">${m.nameArabic || ''}</div>
      <div class="module-name">${m.name}</div>
    </div>
  `).join('');

  grid.querySelectorAll('.module-card').forEach(card => {
    card.addEventListener('click', async () => {
      const id = card.dataset.moduleId;
      const moduleInfo = modules.find(m => m.id === id);
      if (moduleInfo) await openModule(moduleInfo);
    });
  });
}

/**
 * Membuka Modul & Trigger Transisi Visual (ه → d)
 */
async function openModule(moduleInfo) {
  if (services.toast) services.toast(`Bismillah, Memuat ${moduleInfo.name}...`);
  
  // Cleanup sebelumnya
  if (state.cleanup) {
    state.cleanup();
    state.cleanup = null;
  }

  // TRANSISI VISUAL LOGO: ه (240°) → d (275°)
  const logoEl = document.getElementById('dream-os-logo');
  if (logoEl) {
    logoEl.style.transition = 'transform 0.5s ease-in-out';
    logoEl.style.transform = `rotate(275deg)`; // Sudut transisi: d
    state.logoAngle = 275;
  }

  // UI Ganti
  document.getElementById('module-grid').style.display = 'none';
  const container = document.getElementById('module-container');
  container.style.display = 'block';
  container.innerHTML = '<div class="loader">Initializing Module...</div>';

  try {
    const module = await import(moduleInfo.path);
    const cleanup = await module.default({
      container: container,
      services: services,
      user: state.user
    });

    state.cleanup = cleanup;
    state.currentModule = moduleInfo.id;
    
  } catch (err) {
    console.error(`Error loading module ${moduleInfo.id}:`, err);
    if (services.toast) services.toast('Gagal memuat modul!', 'error');
    closeCurrentModule();
  }
}

/**
 * Kembali ke Dashboard & Trigger Transisi Visual (d → ه)
 */
function closeCurrentModule() {
  if (state.cleanup) {
    state.cleanup();
    state.cleanup = null;
  }

  // TRANSISI VISUAL LOGO: d (275°) → ه (240°)
  const logoEl = document.getElementById('dream-os-logo');
  if (logoEl) {
    logoEl.style.transition = 'transform 0.5s ease-in-out';
    logoEl.style.transform = `rotate(240deg)`; // Kembali ke Sudut: ه
    state.logoAngle = 240;
  }

  document.getElementById('module-container').style.display = 'none';
  document.getElementById('module-grid').style.display = 'grid';
  state.currentModule = null;
}

function checkSession() {
  const badge = document.getElementById('user-badge');
  if (state.user) {
    badge.textContent = state.user.name;
    badge.classList.add('online');
  } else {
    badge.textContent = 'GUEST';
    badge.classList.remove('online');
  }
}

// Bismillah, Boot!
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Tambahkan di shell.js atau file terpisah

// === SMOOTH PAGE TRANSITIONS ===
function smoothTransition(element, duration = 500) {
    element.style.transition = `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    element.style.opacity = '0';
    
    setTimeout(() => {
        element.style.opacity = '1';
    }, duration);
}

// === LAZY LOADING FOR MODULES ===
async function loadModuleWithProgress(moduleInfo, progressBar) {
    const toast = services.toast;
    
    // Show progress
    if (progressBar) {
        progressBar.style.display = 'block';
        progressBar.style.width = '0%';
    }
    
    toast(`Loading ${moduleInfo.name}...`, 'info');
    
    // Simulate progress (remove in production)
    if (progressBar) {
        const interval = setInterval(() => {
            const currentWidth = parseInt(progressBar.style.width);
            if (currentWidth < 90) {
                progressBar.style.width = `${currentWidth + 10}%`;
            }
        }, 100);
        
        setTimeout(() => {
            clearInterval(interval);
            progressBar.style.width = '100%';
        }, 900);
    }
    
    try {
        const module = await import(moduleInfo.path);
        
        // Complete progress
        if (progressBar) {
            progressBar.style.width = '100%';
            setTimeout(() => {
                progressBar.style.display = 'none';
            }, 300);
        }
                toast(`${moduleInfo.name} loaded successfully!`, 'success');
        return module;
    } catch (err) {
        toast(`Failed to load ${moduleInfo.name}`, 'error');
        throw err;
    }
}

// === HAPTIC FEEDBACK (Mobile) ===
function hapticFeedback(pattern = 'light') {
    if ('vibrate' in navigator) {
        const patterns = {
            light: 10,
            medium: 20,
            heavy: [30, 50, 30],
            success: [50, 100, 50],
            error: [100, 50, 100]
        };
        navigator.vibrate(patterns[pattern] || patterns.light);
    }
}

// Add to nav items
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        hapticFeedback('light');
    });
});

// === PERFORMANCE MONITORING ===
class PerformanceMonitor {
    constructor() {
        this.fps = 60;
        this.frames = 0;
        this.prevTime = performance.now();
    }
    
    update() {
        this.frames++;
        const time = performance.now();
        
        if (time >= this.prevTime + 1000) {
            this.fps = Math.round((this.frames * 1000) / (time - this.prevTime));
            this.prevTime = time;
            this.frames = 0;
            
            // Update UI
            const fpsEl = document.getElementById('fps-counter');
            if (fpsEl) {
                fpsEl.textContent = this.fps;                fpsEl.style.color = this.fps >= 55 ? '#10b981' : '#f59e0b';
            }
        }
        
        requestAnimationFrame(() => this.update());
    }
    
    start() {
        this.update();
    }
}

// Start performance monitoring
if (document.getElementById('performance-monitor')) {
    const monitor = new PerformanceMonitor();
    monitor.start();
}

// === ERROR BOUNDARY ENHANCEMENT ===
window.addEventListener('error', (event) => {
    console.error('[GLOBAL ERROR]', event.error);
    
    // Show user-friendly error
    if (services.toast) {
        services.toast('Something went wrong. Please try again.', 'error');
    }
    
    // Log to analytics (placeholder)
    if (window.ANALYTICS) {
        ANALYTICS.track('error', {
            message: event.error?.message,
            stack: event.error?.stack,
            timestamp: new Date().toISOString()
        });
    }
});

// === NETWORK STATUS MONITOR ===
function updateNetworkStatus() {
    const statusEl = document.getElementById('network-status');
    const typeEl = document.getElementById('network-type');
    
    if (!statusEl || !typeEl) return;
    
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection) {
        const type = connection.effectiveType || '4G';
        const speed = connection.downlink || 10;
                typeEl.textContent = `${type.toUpperCase()} (${speed} Mbps)`;
        
        // Visual indicator
        if (speed < 1) {
            statusEl.className = 'flex items-center gap-1 text-red-400/70';
        } else if (speed < 5) {
            statusEl.className = 'flex items-center gap-1 text-yellow-400/70';
        } else {
            statusEl.className = 'flex items-center gap-1 text-emerald-400/70';
        }
    }
}

// Update on load and change
updateNetworkStatus();
if (navigator.connection) {
    navigator.connection.addEventListener('change', updateNetworkStatus);
}

// === BATTERY STATUS MONITOR ===
async function updateBatteryStatus() {
    if ('getBattery' in navigator) {
        const battery = await navigator.getBattery();
        const batteryEl = document.getElementById('battery-level');
        const batteryIcon = document.querySelector('#battery-indicator i');
        
        if (batteryEl && batteryIcon) {
            const level = Math.round(battery.level * 100);
            batteryEl.textContent = `${level}%`;
            
            // Update icon based on level
            if (level <= 20) {
                batteryIcon.className = 'fas fa-battery-quarter text-red-400 text-[10px]';
            } else if (level <= 50) {
                batteryIcon.className = 'fas fa-battery-half text-yellow-400 text-[10px]';
            } else {
                batteryIcon.className = 'fas fa-battery-full text-emerald-400 text-[10px]';
            }
            
            // Update on change
            battery.addEventListener('levelchange', () => updateBatteryStatus());
        }
    }
}

updateBatteryStatus();

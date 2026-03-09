// shell.js - Dream OS v2.1 Shell (Modular Core)
import { services, initServices } from './shared/services/index.js';

// State App
const state = {
  user: null,
  currentModule: null,
  cleanup: null,
  isInitialized: false
};

/**
 * Inisialisasi Utama
 */
async function init() {
  try {
    // 1. Jalankan shared services (Auth, Config, dll)
    await initServices();
    
    // 2. Load Manifest (Pastikan path relatif ./)
    const manifestRes = await fetch('./manifest.json');
    if (!manifestRes.ok) throw new Error('Manifest tidak ditemukan');
    const { modules } = await manifestRes.json();

    // 3. Render Shell Framework
    renderShell();

    // 4. Render Grid Utama
    renderModuleGrid(modules);

    // 5. Cek Session (Placeholder untuk Supabase Auth nanti)
    checkSession();

    state.isInitialized = true;
    console.log('✅ Dream OS v2.1 Shell Ready');
  } catch (err) {
    console.error('Initialization Failed:', err);
    document.getElementById('app-shell').innerHTML = `
      <div style="color:white; padding:2rem; text-align:center;">
        <h2 style="color:#ef4444">Critical System Error</h2>
        <p>${err.message}</p>
        <button onclick="location.reload()" style="padding:10px; margin-top:10px; cursor:pointer">Reboot System</button>
      </div>
    `;
  }
}

/**
 * Render Struktur Dasar Shell
 */
function renderShell() {
  const shell = document.getElementById('app-shell');
  shell.innerHTML = `
    <header class="shell-header">
      <div class="brand">
        <span class="logo">🚀</span>
        <h1>Dream OS <span class="version">v2.1</span></h1>
      </div>
      <div class="system-status">
        <div id="clock" class="clock">00:00:00</div>
        <div id="user-badge" class="user-badge">OFFLINE</div>
      </div>
    </header>
    
    <main id="main-content">
      <div id="module-grid" class="module-grid"></div>
      <div id="module-container" class="module-container" style="display:none"></div>
    </main>

    <nav class="bottom-bar">
      <button id="home-btn" class="nav-btn">🏠 Home</button>
    </nav>
  `;

  // Event untuk tombol Home
  document.getElementById('home-btn').addEventListener('click', closeCurrentModule);

  // Jalankan Jam
  setInterval(() => {
    const clockEl = document.getElementById('clock');
    if (clockEl) clockEl.textContent = new Date().toLocaleTimeString('id-ID');
  }, 1000);
}

/**
 * Render Menu Modul
 */
function renderModuleGrid(modules) {
  const grid = document.getElementById('module-grid');
  grid.innerHTML = modules.map(m => `
    <div class="module-card" data-module-id="${m.id}">
      <div class="module-icon">${m.icon}</div>
      <div class="module-name">${m.name}</div>
    </div>
  `).join('');

  // Event Listener Delegasi
  grid.querySelectorAll('.module-card').forEach(card => {
    card.addEventListener('click', async () => {
      const id = card.dataset.moduleId;
      const moduleInfo = modules.find(m => m.id === id);
      if (moduleInfo) await openModule(moduleInfo);
    });
  });
}

/**
 * Logika Membuka Modul (Dynamic Import)
 */
async function openModule(moduleInfo) {
  // 1. Tampilkan Loading
  if (services.toast) services.toast(`Memuat ${moduleInfo.name}...`);
  
  // 2. Bersihkan modul aktif sebelumnya
  if (state.cleanup) {
    state.cleanup();
    state.cleanup = null;
  }

  // 3. Transisi UI
  document.getElementById('module-grid').style.display = 'none';
  const container = document.getElementById('module-container');
  container.style.display = 'block';
  container.innerHTML = '<div class="loader">Inisialisasi Modul...</div>';

  try {
    // 4. Import file module (Gunakan path dari manifest)
    const module = await import(moduleInfo.path);
    
    // 5. Eksekusi fungsi default modul
    // Mengirimkan context agar modul bisa akses services & user
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
 * Kembali ke Dashboard
 */
function closeCurrentModule() {
  if (state.cleanup) {
    state.cleanup();
    state.cleanup = null;
  }
  document.getElementById('module-container').style.display = 'none';
  document.getElementById('module-grid').style.display = 'grid';
  state.currentModule = null;
}

/**
 * Placeholder Auth Session
 */
function checkSession() {
  // Integrasi Supabase Auth di sini nanti
  const badge = document.getElementById('user-badge');
  if (state.user) {
    badge.textContent = state.user.name;
    badge.classList.add('online');
  } else {
    badge.textContent = 'GUEST';
    badge.classList.remove('online');
  }
}

// Boot up!
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

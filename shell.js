// ===== shell.js =====
import { services, initServices } from '/shared/services/index.js';

let currentCleanup = null;

async function init() {
  await initServices();

  // Ambil manifest
  const manifestRes = await fetch('/manifest.json');
  const { modules } = await manifestRes.json();

  // Render shell (header, grid, container)
  document.getElementById('app-shell').innerHTML = `
    <header class="shell-header">
      <div class="clock" id="clock">--:--:--</div>
      <div class="user-badge" id="user-badge">GUEST</div>
    </header>
    <div id="module-grid" class="module-grid"></div>
    <div id="module-container" class="module-container"></div>
  `;

  // Render grid modul
  const grid = document.getElementById('module-grid');
  grid.innerHTML = modules.map(m => `
    <button class="module-card" data-module-id="${m.id}">
      <span class="icon">${m.icon}</span>
      <span>${m.name}</span>
    </button>
  `).join('');

  // Event listener modul
  document.querySelectorAll('.module-card').forEach(btn => {
    btn.addEventListener('click', async () => {
      const moduleId = btn.dataset.moduleId;
      const moduleInfo = modules.find(m => m.id === moduleId);
      if (moduleInfo) await openModule(moduleInfo);
    });
  });

  // Mulai clock
  setInterval(() => {
    const clock = document.getElementById('clock');
    if (clock) clock.textContent = new Date().toLocaleTimeString('id-ID');
  }, 1000);
}

async function openModule(moduleInfo) {
  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  try {
    const module = await import(moduleInfo.path);
    const cleanup = await module.default({
      container: document.getElementById('module-container'),
      services,
      user: services.auth.getUser()
    });
    currentCleanup = cleanup;
  } catch (err) {
    services.toast('Gagal memuat modul: ' + err.message, 'error');
    console.error(err);
  }
}

init();

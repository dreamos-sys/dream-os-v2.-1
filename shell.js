import { services, initServices } from './shared/services/index.js';

const state = { user: null, currentModule: null, cleanup: null };

async function init() {
  try {
    await initServices();
    const res = await fetch('./manifest.json');
    const { modules } = await res.json();
    
    renderShell();
    renderModuleGrid(modules);
  } catch (err) {
    document.body.innerHTML = `<h1>Critical System Error</h1><p>${err.message}</p>`;
  }
}

function renderShell() {
  document.getElementById('app-shell').innerHTML = `
    <header class="shell-header">
      <h1>Dream OS v2.1</h1>
      <div id="clock">00:00:00</div>
    </header>
    <main id="main-content">
      <div id="module-grid" class="module-grid"></div>
      <div id="module-container" class="module-container" style="display:none"></div>
    </main>
    <nav class="bottom-bar">
      <button id="home-btn">🏠 Home</button>
    </nav>
  `;
  document.getElementById('home-btn').onclick = closeModule;
}

// Tambahin di shell.js, setelah renderShell()
function startClock() {
  const clockEl = document.getElementById('clock');
  if (!clockEl) return;
  
  function update() {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString('id-ID', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }
  update();
  setInterval(update, 1000);
}

// Call inside init(), after renderShell()
startClock();

function renderModuleGrid(modules) {
  const grid = document.getElementById('module-grid');
  grid.innerHTML = modules.map(m => `
    <div class="module-card" data-id="${m.id}">
      <span>${m.icon}</span> ${m.name}
    </div>
  `).join('');
  
  grid.querySelectorAll('.module-card').forEach(card => {
    card.onclick = () => openModule(modules.find(m => m.id === card.dataset.id));
  });
}

async function openModule(mod) {
  if (state.cleanup) state.cleanup();
  
  const cont = document.getElementById('module-container');
  cont.style.display = 'block';
  document.getElementById('module-grid').style.display = 'none';
  
  try {
    const m = await import(mod.path);
    state.cleanup = await m.default({ container: cont, services, user: state.user });
  } catch (err) {
    cont.innerHTML = `<div class="error">Gagal memuat modul: ${mod.name}</div>`;
  }
}

function closeModule() {
  if (state.cleanup) state.cleanup();
  document.getElementById('module-container').style.display = 'none';
  document.getElementById('module-grid').style.display = 'grid';
}

init();

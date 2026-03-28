// ========== LOAD MODULES LIST ==========
function loadModules() {
    const script = document.createElement('script');
    script.src = './modules-list.js';
    script.onload = () => {
        console.log("Modules loaded:", window.MODULES);
        renderDashboard();
    };
    script.onerror = () => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('app').innerHTML = '<div style="color:red">Gagal memuat modul.</div>';
    };
    document.head.appendChild(script);
}

// ========== RENDER DASHBOARD ==========
function renderDashboard() {
    document.getElementById('loading').style.display = 'none';
    const app = document.getElementById('app');
    const modules = window.MODULES || [];

    const cardsHtml = modules.map(mod => `
        <div class="card" data-module="${mod.id}">
            <div class="card-icon"><i class="fas ${mod.icon}"></i></div>
            <div class="card-title">${mod.name}</div>
            <div class="card-desc">${mod.description || ''}</div>
        </div>
    `).join('');

    app.innerHTML = `
        <div class="header">
            <div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            <div style="font-size: 12px; color: #94a3b8;">THE POWER SOUL OF SHALAWAT</div>
        </div>
        <div class="grid" id="module-grid">${cardsHtml}</div>
        <div id="content" style="margin: 20px 0; text-align: center; color: #94a3b8;">Pilih menu di atas</div>
        <nav class="nav">
            <button data-page="home"><i class="fas fa-home"></i><br>Home</button>
            <button data-page="profile"><i class="fas fa-user"></i><br>Profile</button>
            <button data-page="settings"><i class="fas fa-cog"></i><br>Settings</button>
        </nav>
        <footer>DREAM TEAM © 2026 · v2.1</footer>
    `;

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const moduleId = card.dataset.module;
            loadModule(moduleId);
        });
    });

    document.querySelector('[data-page="home"]').addEventListener('click', () => renderDashboard());
    document.querySelector('[data-page="profile"]').addEventListener('click', () => alert("Modul profile akan menyusul"));
    document.querySelector('[data-page="settings"]').addEventListener('click', () => alert("Modul settings akan menyusul"));
}

function loadModule(moduleId) {
    const modal = document.createElement('div');
    modal.id = 'temp-modal';
    modal.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
        z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px;
    `;
    const content = document.createElement('div');
    content.style.cssText = `
        background: #0f172a; border-radius: 24px; max-width: 800px; width: 100%;
        max-height: 90%; overflow-y: auto; position: relative; border: 1px solid #10b981; padding: 20px;
        color: #e2e8f0;
    `;
    const close = document.createElement('button');
    close.innerHTML = '&times;';
    close.style.cssText = `
        position: sticky; top: 0; float: right;
        background: #10b981; border: none; color: #000; font-size: 24px;
        width: 40px; height: 40px; border-radius: 50%; cursor: pointer; margin: 0 0 10px 10px;
    `;
    close.onclick = () => modal.remove();
    content.appendChild(close);
    const body = document.createElement('div');
    body.innerHTML = '<div style="text-align:center; padding:20px;">⏳ Memuat modul...</div>';
    content.appendChild(body);
    modal.appendChild(content);
    document.body.appendChild(modal);

    import(`./modules/${moduleId}/module.js`)
        .then(module => {
            const html = module.default.render({ user: "Test", role: "user", toast: alert, supabase: null });
            body.innerHTML = html;
            if (module.default.afterRender) module.default.afterRender({ supabase: null, toast: alert });
        })
        .catch(err => {
            body.innerHTML = `<div style="background:#0f172a; padding:20px; border-radius:12px;">❌ Modul "${moduleId}" belum siap: ${err.message}</div>`;
            console.error(err);
        });
}

// Start
loadModules();

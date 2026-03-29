console.log("💎 Core: System Loaded!");

function renderApp() {
    console.log("🎨 Core: Rendering Dashboard...");
    const app = document.getElementById('app');
    const loading = document.getElementById('loading');
    
    if (loading) loading.style.display = 'none';
    
    app.innerHTML = `
        <div class="header">
            <h1 class="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّhِيمِ</h1>
            <p>Dream OS v2.1 - Sovereign Build</p>
        </div>
        <div class="grid">
            <div class="card"><i class="fas fa-shield-alt"></i><p>Security</p></div>
            <div class="card"><i class="fas fa-tools"></i><p>Maint</p></div>
            <div class="card"><i class="fas fa-file-invoice"></i><p>SPJ</p></div>
            <div class="card"><i class="fas fa-boxes"></i><p>Stok</p></div>
        </div>
        <footer>ISO 27001 | Depok Lightning Strike Active</footer>
    `;
}

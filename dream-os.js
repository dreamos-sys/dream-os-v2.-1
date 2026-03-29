console.log("💎 Core: System Loaded!");

function renderApp() {
    const app = document.getElementById('app');
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'none';
    
    app.innerHTML = `
        <div class="header" style="padding: 20px; text-align: center;">
            <h1 class="bismillah" style="color: #10b981; font-size: 28px; margin-bottom: 5px;">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</h1>
            <p style="color: #94a3b8; font-size: 14px; margin: 0;">Dream OS v2.2 - Sovereign Build</p>
            <p style="color: #475569; font-size: 12px;">Assalamu'alaikum, Master M</p>
        </div>
        
        <div class="grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; padding: 10px;">
            <div class="card-bank">
                <i class="fas fa-shield-alt"></i>
                <p>Security</p>
            </div>
            <div class="card-bank">
                <i class="fas fa-tools"></i>
                <p>Maint</p>
            </div>
            <div class="card-bank">
                <i class="fas fa-file-invoice"></i>
                <p>SPJ</p>
            </div>
            <div class="card-bank">
                <i class="fas fa-boxes"></i>
                <p>Stok</p>
            </div>
        </div>

        <style>
            .card-bank {
                background: #1e293b;
                border: 1px solid #10b981;
                border-radius: 12px;
                padding: 20px;
                text-align: center;
                transition: 0.3s;
            }
            .card-bank i {
                color: #10b981;
                font-size: 24px;
                margin-bottom: 10px;
            }
            .card-bank p {
                color: white;
                font-size: 14px;
                margin: 0;
            }
        </style>

        <footer style="text-align: center; margin-top: 30px; color: #475569; font-size: 10px;">
            ISO 27001 | Depok Lightning Strike Active
        </footer>
    `;
}

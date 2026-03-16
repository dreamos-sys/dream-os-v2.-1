/**
 * modules/qr/module.js
 * Dream OS v2.1 - QR Scanner Module
 */

export async function render({ container, user, supabase }) {
    return `
        <div class="module-container active" id="module-qr">
            <header class="glass-header">
                <div class="status-bar">
                    <span>📍 DEPOK CORE</span>
                    <span>ISO 27001 ✅</span>
                </div>
                <div class="islamic-header">
                    <h1 class="bismillah">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
                    <p class="shalawat">اَللهم صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</p>
                </div>
            </header>

            <main style="padding:16px;padding-bottom:140px;">
                <h2 class="text-2xl font-bold text-emerald-400 mb-6">📷 QR Scanner</h2>
                
                <div class="glass-card p-6 mb-6">
                    <div style="text-align:center;padding:40px 20px;">
                        <div style="font-size:4rem;margin-bottom:1rem;">📷</div>
                        <h3 style="color:var(--text-primary);font-size:1.5rem;margin-bottom:10px;">QR Scanner</h3>
                        <p style="color:var(--text-muted);margin-bottom:20px;">Scan QR codes for facility access</p>
                        
                        <button onclick="startScan()" style="padding:16px 32px;background:var(--color-primary);color:white;border:none;border-radius:12px;cursor:pointer;font-size:1rem;font-weight:600;">
                            📷 Start Scanner
                        </button>
                        
                        <div id="scan-result" style="margin-top:20px;padding:1rem;background:rgba(16,185,129,0.1);border-radius:8px;display:none;">
                            <p style="color:var(--color-primary);">Scan Result: <span id="result-text"></span></p>
                        </div>
                    </div>
                </div>
            </main>

            <nav class="bottom-nav">
                <div class="nav-container">
                    <button class="nav-item" data-nav="home" onclick="window.loadModule('home')">
                        <i class="fas fa-home"></i><span>Home</span>
                    </button>
                    <button class="nav-item active" data-nav="qr" onclick="window.loadModule('qr')">
                        <i class="fas fa-qrcode"></i><span>QR Scanner</span>
                    </button>
                    <button class="nav-item" data-nav="settings" onclick="window.loadModule('settings')">
                        <i class="fas fa-sliders"></i><span>Settings</span>
                    </button>
                </div>
            </nav>
        </div>
    `;
}

export async function afterRender() {
    console.log('📷 [QR] Module loaded');
    
    window.startScan = function() {
        const result = document.getElementById('scan-result');
        const resultText = document.getElementById('result-text');
        if (result && resultText) {
            result.style.display = 'block';
            resultText.textContent = 'Camera permission required (Coming Soon v2.2)';
            window.toast?.('Camera access coming in v2.2', 'info');
        }
    };
}

export function cleanup() {
    console.log('📷 [QR] Module cleanup');
    delete window.startScan;
}

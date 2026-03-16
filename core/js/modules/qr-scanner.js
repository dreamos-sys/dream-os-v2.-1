export function renderQRScanner() {
    return `
        <div class="module-container active">
            <div class="glass-card">
                <h2 style="color:var(--color-text);margin-bottom:1rem;font-size:1.25rem;text-align:center;">📱 QR Scanner</h2>
                
                <div style="aspect-ratio:1;background:var(--glass-bg);border-radius:16px;display:flex;align-items:center;justify-content:center;margin-bottom:1rem;position:relative;overflow:hidden;">
                    <div style="width:200px;height:200px;border:3px solid var(--color-primary);border-radius:12px;position:relative;">
                        <div style="position:absolute;top:-3px;left:-3px;width:20px;height:20px;border-top:3px solid var(--color-primary);border-left:3px solid var(--color-primary);border-radius:4px 0 0 0;"></div>
                        <div style="position:absolute;top:-3px;right:-3px;width:20px;height:20px;border-top:3px solid var(--color-primary);border-right:3px solid var(--color-primary);border-radius:0 4px 0 0;"></div>
                        <div style="position:absolute;bottom:-3px;left:-3px;width:20px;height:20px;border-bottom:3px solid var(--color-primary);border-left:3px solid var(--color-primary);border-radius:0 0 0 4px;"></div>
                        <div style="position:absolute;bottom:-3px;right:-3px;width:20px;height:20px;border-bottom:3px solid var(--color-primary);border-right:3px solid var(--color-primary);border-radius:0 0 4px 0;"></div>
                    </div>
                    <p style="position:absolute;bottom:20px;color:var(--color-text-muted);font-size:12px;">Arahkan kamera ke QR Code</p>
                </div>
                
                <button id="btn-scan" class="btn-primary" style="width:100%;margin-bottom:1rem;">
                    <i class="fas fa-camera" style="margin-right:8px;"></i> Start Scan
                </button>
                
                <div id="scan-result" style="background:var(--glass-bg);padding:12px;border-radius:12px;display:none;">
                    <p style="color:var(--color-text-muted);font-size:11px;margin-bottom:4px;">Result:</p>
                    <p id="scan-data" style="color:var(--color-primary);font-family:var(--font-mono);font-size:12px;word-break:break-all;"></p>
                </div>
                
                <button class="btn-back" onclick="navigateTo('home')" style="margin-top:1rem;">
                    <i class="fas fa-arrow-left" style="margin-right:8px;"></i> Kembali
                </button>
            </div>
        </div>
    `;
}

// Simple scan simulation (bisa diganti dengan library html5-qrcode nanti)
document.addEventListener('click', function(e) {
    if (e.target.id === 'btn-scan') {
        const result = document.getElementById('scan-result');
        const data = document.getElementById('scan-data');
        result.style.display = 'block';
        data.textContent = 'https://dreamos.app/verify/ABC123XYZ';
        window.toast?.('QR Scanned!', 'success');
    }
});

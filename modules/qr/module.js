/**
 * QR Scanner Module - Dream OS 2026
 * Bismillah Standard
 */

export default async function({ container, services, user }) {
    console.log('[QR MODULE] Initializing...');
    
    container.innerHTML = `
        <div class="qr-scanner-container" style="padding: 2rem; text-align: center;">
            <h2 class="text-xl font-bold mb-4" style="color: var(--dream-primary);">
                📷 QR Scanner
            </h2>
            
            <div id="qr-video" style="width: 100%; max-width: 400px; margin: 0 auto; background: #000; border-radius: 16px; overflow: hidden;">
                <video id="qr-video-element" autoplay playsinline style="width: 100%;"></video>
            </div>
            
            <div id="qr-result" class="mt-4 p-4 rounded-xl" style="background: rgba(16, 185, 129, 0.1); display: none;">
                <p class="text-sm" style="color: var(--dream-text);">Result: <span id="qr-data"></span></p>
            </div>
            
            <div class="mt-6 flex gap-4 justify-center">
                <button id="btn-start-scan" class="btn-primary">
                    <i class="fas fa-camera"></i> Start Scan
                </button>
                <button id="btn-stop-scan" class="btn-primary" style="background: linear-gradient(135deg, #ef4444, #dc2626);">
                    <i class="fas fa-stop"></i> Stop
                </button>
            </div>
            
            <p class="mt-4 text-xs" style="color: var(--dream-text-muted);">
                🔒 Scan QR Code untuk akses fasilitas
            </p>
        </div>
    `;
    
    // QR Scanner Logic
    let stream = null;
    const video = document.getElementById('qr-video-element');
    const resultDiv = document.getElementById('qr-result');
    const qrData = document.getElementById('qr-data');
    const btnStart = document.getElementById('btn-start-scan');
    const btnStop = document.getElementById('btn-stop-scan');
    
    // Start Scan
    btnStart?.addEventListener('click', async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } 
            });
            video.srcObject = stream;
            services?.toast?.('Kamera aktif, arahkan ke QR Code', 'success');
            hapticFeedback('success');
        } catch (err) {
            console.error('[QR] Camera error:', err);
            services?.toast?.('Gagal akses kamera', 'error');
            hapticFeedback('error');
        }
    });
    
    // Stop Scan
    btnStop?.addEventListener('click', () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            video.srcObject = null;
            services?.toast?.('Scanner dihentikan', 'info');
        }
    });
    
    // Cleanup on module close
    return function cleanup() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        console.log('[QR MODULE] Cleaned up');
    };
}

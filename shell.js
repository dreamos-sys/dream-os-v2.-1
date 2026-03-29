console.log("🐚 Shell: Ignition...");

window.onload = () => {
    console.log("🚀 System: Checking Core...");
    
    // Nunggu 500ms biar dream-os.js bener-bener siap
    setTimeout(() => {
        if (typeof renderApp === 'function') {
            console.log("✅ Core Found! Rendering...");
            renderApp();
        } else {
            console.error("❌ renderApp tetap Missing!");
            document.getElementById('loading').innerHTML = `
                <div style="color: #ef4444; text-align: center;">
                    <p>⚠️ Core Error: renderApp Missing</p>
                    <small>Cek apakah dream-os.js sudah di root.</small>
                </div>`;
        }
    }, 500);
};

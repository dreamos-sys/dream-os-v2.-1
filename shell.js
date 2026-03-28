console.log("🐚 Shell: Force Start!");
window.onload = () => {
    console.log("🚀 System: Triggering Render...");
    if (typeof renderApp === 'function') {
        renderApp();
    } else {
        console.error("❌ renderApp gak ketemu! Cek dream-os.js lo!");
        document.getElementById('loading').innerHTML = "⚠️ Core Error: renderApp Missing";
    }
};

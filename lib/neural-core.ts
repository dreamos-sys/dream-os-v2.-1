export const initWasmEngine = async () => {
  if (typeof window === 'undefined') return;
  
  try {
    // Kita panggil runtime WebAssembly TinyGo
    const go = new (window as any).Go();
    const result = await WebAssembly.instantiateStreaming(
      fetch('/wasm/main.wasm'), 
      go.importObject
    );
    go.run(result.instance);
    console.log("🐹 TinyGo WASM Engine: JRENGGG TOTAL!");
  } catch (err) {
    console.error("❌ WASM Failed to load:", err);
  }
};

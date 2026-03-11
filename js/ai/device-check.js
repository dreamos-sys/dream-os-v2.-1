// ════════════════════════════════════════════
// FILE: js/ai/device-check.js
// ════════════════════════════════════════════

class DeviceCheck {
    static async checkForLocalAI() {
        const checks = {
            // RAM
            ram: {
                value: navigator.deviceMemory || 'Unknown',
                pass: navigator.deviceMemory >= 6,
                message: navigator.deviceMemory >= 8 ? '✅ Excellent' : 
                         navigator.deviceMemory >= 6 ? '✅ Good' : '⚠️ Limited'
            },
            
            // CPU Cores
            cpu: {
                value: navigator.hardwareConcurrency || 'Unknown',
                pass: navigator.hardwareConcurrency >= 6,
                message: navigator.hardwareConcurrency >= 8 ? '✅ Excellent' : 
                         navigator.hardwareConcurrency >= 6 ? '✅ Good' : '⚠️ Limited'
            },
            
            // WebGPU
            webgpu: {
                value: 'gpu' in navigator ? 'Available' : 'Not Available',
                pass: 'gpu' in navigator,
                message: 'gpu' in navigator ? '✅ Ready for GPU acceleration' : '⚠️ CPU only'
            },
            
            // Storage
            storage: {
                value: 'Estimating...',
                pass: true,
                message: 'Check manually'
            },
            
            // WASM
            wasm: {
                value: typeof WebAssembly === 'object' ? 'Supported' : 'Not Supported',
                pass: typeof WebAssembly === 'object',
                message: '✅ Required for local AI'
            },
            
            // Service Worker
            sw: {
                value: 'serviceWorker' in navigator ? 'Available' : 'Not Available',
                pass: 'serviceWorker' in navigator,
                message: '✅ Required for offline AI'
            }
        };
        
        // Estimate storage
        if (navigator.storage && navigator.storage.estimate) {
            const estimate = await navigator.storage.estimate();
            const quotaGB = Math.round(estimate.quota / 1073741824);
            checks.storage.value = quotaGB + ' GB';
            checks.storage.pass = quotaGB >= 32;
            checks.storage.message = quotaGB >= 64 ? '✅ Plenty of space' : 
                                      quotaGB >= 32 ? '✅ Enough space' : '⚠️ Limited space';
        }
        
        // Overall score
        const passed = Object.values(checks).filter(c => c.pass).length;
        const total = Object.values(checks).length;
        const score = Math.round((passed / total) * 100);
        
        return {
            checks: checks,
            score: score,
            recommendation: score >= 80 ? '✅ Ready for Local AI' : 
                            score >= 60 ? '⚠️ Can run smaller models' : '❌ Use cloud AI'
        };
    }
}

window.DeviceCheck = DeviceCheck;
console.log('✅ [DEVICE CHECK] Module ready');

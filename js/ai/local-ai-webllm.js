// ════════════════════════════════════════════
// FILE: js/ai/local-ai-webllm.js
// ════════════════════════════════════════════

class WebLLM {
    constructor() {
        this.engine = null;
        this.isLoaded = false;
        this.selectedModel = 'Llama-3-8B-Instruct-q4f32_1-MLC';
    }
    
    // Initialize
    async init() {
        try {
            const { CreateMLCEngine } = await import('https://esm.run/@mlc-ai/web-llm');
            
            this.engine = await CreateMLCEngine(this.selectedModel, {
                initProgressCallback: (progress) => {
                    console.log('[WEBLLM] Loading:', progress);
                    window.DREAM?.showToast(`Loading AI: ${Math.round(progress.progress * 100)}%`, 'info');
                }
            });
            
            this.isLoaded = true;
            console.log('✅ [WEBLLM] Engine ready:', this.selectedModel);
            
            return { success: true };
            
        } catch(e) {
            console.error('[WEBLLM] Init failed:', e);
            return { success: false, error: e.message };
        }
    }
    
    // Chat completion
    async chat(messages) {
        if (!this.isLoaded) {
            await this.init();
        }
        
        try {
            const reply = await this.engine.chat.completions.create({
                messages: messages,
                temperature: 0.7,
                max_tokens: 512
            });
            
            return {
                success: true,
                text: reply.choices[0].message.content,
                local: true
            };
            
        } catch(e) {
            return { success: false, error: e.message };
        }
    }
    
    // Available models
    getAvailableModels() {
        return [
            { id: 'Llama-3-8B-Instruct-q4f32_1-MLC', name: 'Llama 3 8B', size: '~5GB', ram: '8GB+' },
            { id: 'Phi-3-mini-4k-instruct-q4f16_1-MLC', name: 'Phi-3 Mini', size: '~2GB', ram: '6GB+' },
            { id: 'gemma-2b-it-q4f16_1-mlc', name: 'Gemma 2B', size: '~1.5GB', ram: '4GB+' },
            { id: 'Qwen2-1.5B-Instruct-q4f16_1-MLC', name: 'Qwen2 1.5B', size: '~1GB', ram: '4GB+' }
        ];
    }
    
    // Check WebGPU support
    static checkWebGPU() {
        return {
            supported: 'gpu' in navigator,
            adapter: navigator.gpu ? 'Available' : 'Not Available',
            recommendation: navigator.gpu ? 'Ready for Local AI' : 'Need WebGPU Support'
        };
    }
}

window.WebLLM = new WebLLM();
console.log('✅ [WEBLLM] Module ready');

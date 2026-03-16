// ════════════════════════════════════════════
// FILE: js/ai/local-ai-transformers.js
// ════════════════════════════════════════════

class TransformersAI {
    constructor() {
        this.pipeline = null;
        this.isLoaded = false;
    }
    
    // Load model
    async load(task = 'text-generation', model = 'Xenova/gemma-2b-it') {
        try {
            const { pipeline } = await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.0/+esm');
            
            this.pipeline = await pipeline(task, model, {
                quantized: true,
                progress_callback: (progress) => {
                    console.log('[TRANSFORMERS] Loading:', progress);
                }
            });
            
            this.isLoaded = true;
            console.log('✅ [TRANSFORMERS] Model loaded:', model);
            
            return { success: true };
            
        } catch(e) {
            console.error('[TRANSFORMERS] Load failed:', e);
            return { success: false, error: e.message };
        }
    }
    
    // Generate text
    async generate(text, options = {}) {
        if (!this.isLoaded) {
            await this.load();
        }
        
        try {
            const output = await this.pipeline(text, {
                max_new_tokens: options.maxTokens || 256,
                temperature: options.temperature || 0.7,
                top_k: options.topK || 40,
                top_p: options.topP || 0.9
            });
            
            return {
                success: true,
                text: output[0].generated_text,
                local: true
            };
            
        } catch(e) {
            return { success: false, error: e.message };
        }
    }
    
    // Different tasks
    async classify(text) {
        if (!this.isLoaded) {
            await this.load('text-classification', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
        }
        
        const result = await this.pipeline(text);
        return result;
    }
    
    async embed(text) {
        if (!this.isLoaded) {
            await this.load('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
        }
        
        const result = await this.pipeline(text);
        return result;
    }
}

window.TransformersAI = new TransformersAI();
console.log('✅ [TRANSFORMERS AI] Module ready');

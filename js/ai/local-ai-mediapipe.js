// ════════════════════════════════════════════
// FILE: js/ai/local-ai-mediapipe.js
// ════════════════════════════════════════════

class LocalAI {
    constructor() {
        this.model = null;
        this.isLoaded = false;
        this.modelPath = '/models/gemma-2b-it-q4f16_1-mlc/';
    }
    
    // Load model
    async load() {
        try {
            // Load MediaPipe LLM Inference
            const { FilesetResolver, LlmInference } = await import(
                'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai@0.10.0/+esm'
            );
            
            const wasmPath = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai@0.10.0/wasm/genai.wasm';
            
            const filesetResolver = await FilesetResolver.forGenAiTasks(wasmPath);
            
            this.model = await LlmInference.createFromOptions(filesetResolver, {
                modelPath: this.modelPath,
                maxTokens: 512,
                temperature: 0.7
            });
            
            this.isLoaded = true;
            console.log('✅ [LOCAL AI] Model loaded:', this.modelPath);
            
            return { success: true };
            
        } catch(e) {
            console.error('[LOCAL AI] Load failed:', e);
            return { success: false, error: e.message };
        }
    }
    
    // Generate response
    async generate(prompt) {
        if (!this.isLoaded) {
            await this.load();
        }
        
        try {
            const response = await this.model.generateResponse(prompt);
            
            return {                success: true,
                text: response.text,
                local: true
            };
            
        } catch(e) {
            console.error('[LOCAL AI] Generate failed:', e);
            return { success: false, error: e.message };
        }
    }
    
    // Stream response
    async generateStream(prompt, onChunk) {
        if (!this.isLoaded) {
            await this.load();
        }
        
        try {
            const stream = this.model.generateResponseStream(prompt);
            
            for await (const chunk of stream) {
                onChunk(chunk.text);
            }
            
            return { success: true };
            
        } catch(e) {
            return { success: false, error: e.message };
        }
    }
    
    // Check if device can run local AI
    static checkCompatibility() {
        const ram = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 4;
        
        return {
            compatible: ram >= 6 && cores >= 6,
            ram: ram + ' GB',
            cores: cores,
            recommendation: ram >= 8 ? 'Full Model' : ram >= 6 ? 'Quantized Model' : 'Cloud Fallback'
        };
    }
    
    // Get model info
    getInfo() {
        return {
            loaded: this.isLoaded,
            path: this.modelPath,
            type: 'Gemma 2B (Quantized)',            size: '~2GB',
            ramRequired: '6GB+'
        };
    }
}

window.LocalAI = new LocalAI();
console.log('✅ [LOCAL AI] Module ready');

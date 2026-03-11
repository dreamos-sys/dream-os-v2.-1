/**
 * Dream AI Core - Hybrid Local + Cloud
 * Dream OS 2026 - Intelligent AI Orchestration
 * Auto-detect & Auto-switch
 */

(function() {
    'use strict';
    
    console.log('🤖 [DREAM AI CORE] Initializing...');
    
    class DreamAICore {
        constructor() {
            this.mode = 'hybrid'; // 'local', 'cloud', 'hybrid'
            this.localAI = null;
            this.cloudAI = null;
            this.isLocalAvailable = false;
            this.isInitialized = false;
            this.modelInfo = null;
        }
        
        // ════════════════════════════════════════════
        // CHECK DEVICE CAPABILITY
        // ════════════════════════════════════════════
        
        async checkCapability() {
            const checks = {
                // WebGPU (Required for local AI)
                webgpu: 'gpu' in navigator,
                
                // RAM (Minimum 4GB)
                ram: (navigator.deviceMemory || 4) >= 4,
                
                // WASM Support
                wasm: typeof WebAssembly === 'object',
                
                // Storage (Minimum 2GB free)
                storage: await this.checkStorage()
            };
            
            const score = Object.values(checks).filter(v => v).length;
            this.isLocalAvailable = score >= 3;
            
            this.modelInfo = {
                recommended: score >= 4 ? 'Phi-3-mini (2GB)' : 
                            score >= 3 ? 'Qwen2-1.5B (1GB)' : 'Cloud Only',
                ram: navigator.deviceMemory || 4,
                webgpu: checks.webgpu
            };
                        console.log('[AI CORE] Capability:', this.modelInfo);
            
            return {
                capable: this.isLocalAvailable,
                score: score + '/4',
                recommendation: this.modelInfo.recommended
            };
        }
        
        async checkStorage() {
            if (!navigator.storage || !navigator.storage.estimate) return true;
            const estimate = await navigator.storage.estimate();
            const freeGB = (estimate.quota - estimate.usage) / 1073741824;
            return freeGB >= 2;
        }
        
        // ════════════════════════════════════════════
        // INITIALIZE AI
        // ════════════════════════════════════════════
        
        async init() {
            if (this.isInitialized) {
                return { success: true, message: 'Already initialized' };
            }
            
            try {
                // Check capability first
                const capability = await this.checkCapability();
                
                if (capability.capable) {
                    // Try local AI first
                    window.DREAM?.showToast('🤖 Loading Local AI...', 'info');
                    const localResult = await this.initLocalAI();
                    
                    if (localResult.success) {
                        this.mode = 'local';
                        this.isInitialized = true;
                        console.log('✅ [AI CORE] Local AI active');
                        return { success: true, mode: 'local' };
                    }
                }
                
                // Fallback to cloud
                window.DREAM?.showToast('☁️ Using Cloud AI', 'info');
                this.mode = 'cloud';
                this.isInitialized = true;
                console.log('✅ [AI CORE] Cloud AI active');
                
                return { success: true, mode: 'cloud' };
                            } catch(e) {
                console.error('[AI CORE] Init failed:', e);
                this.mode = 'cloud';
                this.isInitialized = true;
                return { success: true, mode: 'cloud', fallback: true };
            }
        }
        
        // ════════════════════════════════════════════
        // LOCAL AI (WebLLM / MediaPipe)
        // ════════════════════════════════════════════
        
        async initLocalAI() {
            try {
                // Dynamic import WebLLM
                const { CreateMLCEngine } = await import('https://esm.run/@mlc-ai/web-llm');
                
                // Choose model based on device
                const model = this.selectModel();
                
                this.localAI = await CreateMLCEngine(model, {
                    initProgressCallback: (progress) => {
                        const percent = Math.round(progress.progress * 100);
                        window.DREAM?.showToast(`Loading AI: ${percent}%`, 'info');
                        console.log('[AI CORE] Loading:', percent + '%');
                    }
                });
                
                console.log('✅ [LOCAL AI] Loaded:', model);
                return { success: true, model: model };
                
            } catch(e) {
                console.warn('[LOCAL AI] Failed:', e.message);
                return { success: false, error: e.message };
            }
        }
        
        selectModel() {
            const ram = navigator.deviceMemory || 4;
            
            if (ram >= 8) {
                return 'Llama-3-8B-Instruct-q4f32_1-MLC';
            } else if (ram >= 6) {
                return 'Phi-3-mini-4k-instruct-q4f16_1-MLC';
            } else {
                return 'Qwen2-1.5B-Instruct-q4f16_1-MLC';
            }
        }
        
        // ════════════════════════════════════════════        // GENERATE RESPONSE
        // ════════════════════════════════════════════
        
        async generate(prompt, options = {}) {
            if (!this.isInitialized) {
                await this.init();
            }
            
            try {
                if (this.mode === 'local' && this.localAI) {
                    return await this.generateLocal(prompt, options);
                } else {
                    return await this.generateCloud(prompt, options);
                }
            } catch(e) {
                // Auto-fallback if local fails
                if (this.mode === 'local') {
                    console.warn('[AI CORE] Local failed, fallback to cloud');
                    this.mode = 'cloud';
                    return await this.generateCloud(prompt, options);
                }
                throw e;
            }
        }
        
        async generateLocal(prompt, options) {
            const messages = [
                { role: 'system', content: 'Kamu adalah Dream AI Assistant. Jawab dengan singkat, jelas, dan bermanfaat.' },
                { role: 'user', content: prompt }
            ];
            
            const reply = await this.localAI.chat.completions.create({
                messages: messages,
                temperature: options.temperature || 0.7,
                max_tokens: options.maxTokens || 512
            });
            
            return {
                success: true,
                text: reply.choices[0].message.content,
                mode: 'local',
                model: this.modelInfo?.recommended
            };
        }
        
        async generateCloud(prompt, options) {
            // Fallback to cloud AI (existing ai-orchestrator.js)
            if (window.AIOrchestrator) {
                const reply = await window.AIOrchestrator.ask(prompt);
                return {                    success: true,
                    text: reply,
                    mode: 'cloud'
                };
            }
            
            // Ultimate fallback - simple response
            return {
                success: true,
                text: 'Maaf, AI sedang tidak tersedia. Silakan coba lagi nanti.',
                mode: 'fallback'
            };
        }
        
        // ════════════════════════════════════════════
        // STREAM RESPONSE
        // ════════════════════════════════════════════
        
        async generateStream(prompt, onChunk) {
            if (!this.isInitialized) {
                await this.init();
            }
            
            if (this.mode === 'local' && this.localAI) {
                const messages = [
                    { role: 'system', content: 'Kamu adalah Dream AI Assistant.' },
                    { role: 'user', content: prompt }
                ];
                
                const stream = this.localAI.chat.completions.create({
                    messages: messages,
                    stream: true
                });
                
                for await (const chunk of stream) {
                    if (chunk.choices?.[0]?.delta?.content) {
                        onChunk(chunk.choices[0].delta.content);
                    }
                }
                
                return { success: true, mode: 'local' };
            } else {
                // Cloud fallback (non-streaming)
                const result = await this.generate(prompt);
                onChunk(result.text);
                return { success: true, mode: 'cloud' };
            }
        }
        
        // ════════════════════════════════════════════        // UTILITY FUNCTIONS
        // ════════════════════════════════════════════
        
        getStatus() {
            return {
                initialized: this.isInitialized,
                mode: this.mode,
                localAvailable: this.isLocalAvailable,
                model: this.modelInfo
            };
        }
        
        async switchMode(mode) {
            if (mode === 'local' && !this.isLocalAvailable) {
                return { success: false, error: 'Local AI not available on this device' };
            }
            
            this.mode = mode;
            window.DREAM?.showToast(`AI Mode: ${mode}`, 'info');
            
            return { success: true, mode: mode };
        }
        
        async clearCache() {
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                for (const name of cacheNames) {
                    if (name.includes('mlc') || name.includes('webllm')) {
                        await caches.delete(name);
                    }
                }
            }
            window.DREAM?.showToast('AI cache cleared', 'info');
        }
    }
    
    // Create global instance
    window.DreamAI = new DreamAICore();
    
    // Auto-initialize on load
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🤖 [DREAM AI] Auto-init...');
        window.DreamAI.init().catch(console.warn);
    });
    
    console.log('✅ [DREAM AI CORE] Ready');
    
})();

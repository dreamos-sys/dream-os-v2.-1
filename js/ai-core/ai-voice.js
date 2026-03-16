/**
 * AI Voice Command
 * Dream OS v2.1 - Web Speech API
 */

class AIVoiceCommand {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.commands = [];
        this.init();
    }
    
    init() {
        // Check browser support
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            console.warn('[VOICE] Not supported in this browser');
            return;
        }
        
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'id-ID';
        
        // Register default commands
        this.registerCommands();
        
        // Event handlers
        this.recognition.onstart = () => {
            this.isListening = true;
            console.log('[VOICE] Listening...');
            if (window.DREAM) window.DREAM.showToast('🎤 Mendengarkan...', 'info');
        };
        
        this.recognition.onend = () => {
            this.isListening = false;
            console.log('[VOICE] Stopped');
        };
        
        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log('[VOICE] Heard:', transcript);
            this.processCommand(transcript);
        };
        
        this.recognition.onerror = (event) => {
            console.error('[VOICE] Error:', event.error);            if (window.DREAM) window.DREAM.showToast('❌ Voice error: ' + event.error, 'error');
        };
        
        console.log('✅ [VOICE] Initialized');
    }
    
    registerCommands() {
        // Command patterns
        this.commands = [
            {
                pattern: /buka|open|launch/,
                action: (match) => {
                    const moduleName = this.extractModuleName(match.input);
                    if (moduleName) {
                        window.DREAM.load(moduleName);
                        return `Membuka ${moduleName}...`;
                    }
                    return 'Modul tidak ditemukan';
                }
            },
            {
                pattern: /tutup|close|exit/,
                action: () => {
                    if (window.app && window.app.closeCurrentModule) {
                        window.app.closeCurrentModule();
                        return 'Modul ditutup';
                    }
                    return 'Tidak ada modul aktif';
                }
            },
            {
                pattern: /home|beranda|dashboard/,
                action: () => {
                    window.DREAM.load('home');
                    return 'Kembali ke home';
                }
            },
            {
                pattern: /siapa kamu|who are you/,
                action: () => {
                    return 'Saya Dream AI Assistant, siap membantu Anda mengelola fasilitas dengan lebih baik. Bismillah!';
                }
            },
            {
                pattern: /fitur apa|what features/,
                action: () => {
                    return 'Fitur tersedia: Home, Sekuriti, QR Scanner, Settings, Ghost, dan AI Panel';
                }
            },
            {                pattern: /bismillah|assalamualaikum/,
                action: () => {
                    return 'Waalaikumsalam! Ada yang bisa saya bantu?';
                }
            },
            {
                pattern: /terima kasih|thank you/,
                action: () => {
                    return 'Sama-sama! Senang bisa membantu 💚';
                }
            },
            {
                pattern: /bantuan|help|tolong/,
                action: () => {
                    return 'Katakan "Buka [nama modul]" untuk membuka modul. Contoh: "Buka Sekuriti"';
                }
            }
        ];
    }
    
    extractModuleName(text) {
        const moduleMap = {
            'home': 'home',
            'beranda': 'home',
            'sekuriti': 'sekuriti',
            'security': 'sekuriti',
            'qr': 'qr',
            'scanner': 'qr',
            'settings': 'settings',
            'pengaturan': 'settings',
            'ghost': 'ghost',
            'ai': 'ai-panel',
            'ai panel': 'ai-panel'
        };
        
        for (const [key, value] of Object.entries(moduleMap)) {
            if (text.includes(key)) {
                return value;
            }
        }
        
        return null;
    }
    
    processCommand(text) {
        for (const cmd of this.commands) {
            if (cmd.pattern.test(text)) {
                const response = cmd.action({ input: text });
                console.log('[VOICE] Response:', response);
                                // Speak response
                this.speak(response);
                
                return response;
            }
        }
        
        // No match
        const fallback = 'Maaf, saya tidak mengerti. Coba katakan "Bantuan"';
        this.speak(fallback);
        return fallback;
    }
    
    speak(text) {
        if (!window.speechSynthesis) return;
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'id-ID';
        utterance.rate = 1;
        utterance.pitch = 1;
        
        window.speechSynthesis.speak(utterance);
    }
    
    startListening() {
        if (!this.recognition) {
            window.DREAM.showToast('❌ Voice not supported', 'error');
            return;
        }
        
        if (this.isListening) {
            this.recognition.stop();
            return;
        }
        
        this.recognition.start();
    }
    
    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    }
    
    getStatus() {
        return {
            supported: !!(window.SpeechRecognition || window.webkitSpeechRecognition),
            listening: this.isListening,
            commands: this.commands.length
        };    }
}

// Initialize global voice command
window.AIVoice = new AIVoiceCommand();

console.log('✅ [VOICE COMMAND] Ready - Dream OS v2.1');

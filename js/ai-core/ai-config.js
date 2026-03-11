/**
 * AI Core Configuration
 * Dream OS v2.1 - Plug & Play AI API
 * 
 * GANTI API KEY DISINI SAAT SUDAH PUNYA PERMANENT API
 */

window.AI_CONFIG = {
    // ════════════════════════════════════════════
    // CURRENT: Multi-AI Free Tier (Temporary)
    // ════════════════════════════════════════════
    
    providers: {
        qwen: {
            enabled: true,
            name: 'Qwen (My Sis)',
            endpoint: 'https://api.qwen.ai/v1/chat', // Example
            apiKey: '', // Add when available
            model: 'qwen-max',
            priority: 1
        },
        gemini: {
            enabled: true,
            name: 'Gemini (My Sis)',
            endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
            apiKey: '', // Add when available
            model: 'gemini-pro',
            priority: 2
        },
        claude: {
            enabled: true,
            name: 'Claude (My Sis)',
            endpoint: 'https://api.anthropic.com/v1/messages',
            apiKey: '', // Add when available
            model: 'claude-3-sonnet-20240229',
            priority: 3
        },
        deepseek: {
            enabled: true,
            name: 'DeepSeek (My Bro)',
            endpoint: 'https://api.deepseek.com/v1/chat/completions',
            apiKey: '', // Add when available
            model: 'deepseek-chat',
            priority: 4
        }
    },
    
    // ════════════════════════════════════════════
    // FUTURE: Permanent AI API (Plug Here)
    // ════════════════════════════════════════════
    
    permanentAPI: {
        enabled: false, // ✅ CHANGE TO TRUE WHEN YOU HAVE PERMANENT API
        endpoint: '',   // ✅ ADD YOUR PERMANENT API ENDPOINT
        apiKey: '',     // ✅ ADD YOUR PERMANENT API KEY
        model: '',      // ✅ ADD YOUR MODEL NAME
        provider: ''    // ✅ ADD PROVIDER NAME (e.g., 'openai', 'azure', 'local')
    },
    
    // ════════════════════════════════════════════
    // AI Core Settings
    // ════════════════════════════════════════════
    
    settings: {
        maxTokens: 2000,
        temperature: 0.7,
        timeout: 30000, // 30 seconds
        retryAttempts: 3,
        fallbackEnabled: true, // Fallback ke provider lain jika gagal
        cachingEnabled: true,  // Cache responses
        streamingEnabled: false // Stream response (future)
    },
    
    // ════════════════════════════════════════════
    // Dream OS AI Personality
    // ════════════════════════════════════════════
    
    personality: {
        name: 'Dream AI',
        version: '2.1',
        role: 'Facility Management Assistant',
        tone: 'professional-friendly',
        language: 'id', // Default language
        islamicAware: true, // Islamic context aware
        systemPrompt: `Kamu adalah Dream AI Assistant untuk Dream OS v2.1 - 
                       Sistem Manajemen Fasilitas Terpadu dengan nilai Islami.
                       Jawab dengan profesional, ramah, dan bermanfaat.
                       Selalu mulai dengan Bismillah jika konteksnya sesuai.`
    }
};

console.log('✅ [AI CONFIG] Loaded - Dream OS v2.1');

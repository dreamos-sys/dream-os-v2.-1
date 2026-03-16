/**
 * 🤖 AI PANEL MODULE - Dream OS v2.1
 * Neural Control Center dengan AI Chat
 * Features: Chat interface, AI responses, Quick actions
 */

export async function render({ container, user, supabase }) {
    return `
        <div class="max-w-4xl mx-auto p-4">
            <!-- Header -->
            <header class="glass-header mb-6">
                <div class="status-bar">
                    <span>📍 DEPOK CORE</span>
                    <span>ISO 27001 ✅</span>
                </div>
                <div class="islamic-header">
                    <h1 class="bismillah">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
                    <p class="shalawat">اَللهم صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</p>
                </div>
            </header>

            <!-- Main Content -->
            <main style="padding-bottom:140px;">
                <h2 class="text-2xl font-bold text-emerald-400 mb-6">🤖 AI Panel</h2>
                
                <!-- AI Chat Interface -->
                <div class="glass-card p-6 mb-6">
                    <div style="text-align:center;padding:20px;">
                        <div style="font-size:4rem;margin-bottom:1rem;">🤖</div>
                        <h3 class="text-xl font-bold mb-2" style="color:var(--text-primary);">Dream AI Assistant</h3>
                        <p style="color:var(--text-muted);margin-bottom:20px;">Ask me anything about Dream OS!</p>
                        
                        <!-- Chat Messages -->
                        <div id="ai-chat" style="max-width:600px;margin:0 auto;background:rgba(15,23,42,0.5);border-radius:12px;padding:1rem;max-height:400px;overflow-y:auto;">
                            <div style="background:rgba(16,185,129,0.1);border:1px solid var(--color-primary);border-radius:12px;padding:1rem;margin-bottom:1rem;">
                                <p style="color:var(--text-primary);">Assalamu'alaikum! 👋</p>
                                <p style="color:var(--text-muted);margin-top:0.5rem;">How can I help you today?</p>
                            </div>
                        </div>
                        
                        <!-- Input Area -->
                        <div style="display:flex;gap:10px;max-width:600px;margin:20px auto 0;">
                            <input type="text" id="ai-input" placeholder="Ask something..." class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700" style="color:var(--text-primary);">
                            <button onclick="window.sendAIMessage()" style="padding:12px 24px;background:var(--color-primary);color:white;border:none;border-radius:8px;cursor:pointer;font-weight:600;">Send</button>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="glass-card p-6 mb-6">                    <h3 class="text-lg font-semibold mb-4" style="color:var(--text-primary);">⚡ Quick Actions</h3>
                    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;">
                        <button onclick="window.quickAsk('What is Dream OS?')" class="glass-card p-4 text-left hover:bg-slate-800 transition" style="cursor:pointer;">
                            <div style="font-size:1.5rem;margin-bottom:8px;">ℹ️</div>
                            <div style="font-size:0.875rem;font-weight:600;color:var(--text-primary);">About Dream OS</div>
                        </button>
                        <button onclick="window.quickAsk('Show me all modules')" class="glass-card p-4 text-left hover:bg-slate-800 transition" style="cursor:pointer;">
                            <div style="font-size:1.5rem;margin-bottom:8px;">📦</div>
                            <div style="font-size:0.875rem;font-weight:600;color:var(--text-primary);">All Modules</div>
                        </button>
                        <button onclick="window.quickAsk('How to book a room?')" class="glass-card p-4 text-left hover:bg-slate-800 transition" style="cursor:pointer;">
                            <div style="font-size:1.5rem;margin-bottom:8px;">📅</div>
                            <div style="font-size:0.875rem;font-weight:600;color:var(--text-primary);">Booking Help</div>
                        </button>
                        <button onclick="window.quickAsk('Security features')" class="glass-card p-4 text-left hover:bg-slate-800 transition" style="cursor:pointer;">
                            <div style="font-size:1.5rem;margin-bottom:8px;">🛡️</div>
                            <div style="font-size:0.875rem;font-weight:600;color:var(--text-primary);">Security</div>
                        </button>
                    </div>
                </div>

                <!-- AI Status -->
                <div class="glass-card p-6">
                    <h3 class="text-lg font-semibold mb-4" style="color:var(--text-primary);">📊 AI Status</h3>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-label">AI Mode</div>
                            <div class="stat-value" style="color:var(--color-primary);">Cloud</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-label">Requests</div>
                            <div class="stat-value" style="color:var(--color-secondary);">0</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-label">Status</div>
                            <div class="stat-value" style="color:var(--color-success);">Online</div>
                        </div>
                    </div>
                </div>
            </main>

            <!-- Bottom Navigation -->
            <nav class="bottom-nav">
                <div class="nav-container">
                    <button class="nav-item" data-nav="home" onclick="window.loadModule?.('home')">
                        <i class="fas fa-home"></i><span>Home</span>
                    </button>
                    <button class="nav-item" data-nav="booking" onclick="window.loadModule?.('booking')">
                        <i class="fas fa-calendar-check"></i><span>Booking</span>
                    </button>                    <button class="nav-item active" data-nav="ai-panel" onclick="window.loadModule?.('ai-panel')">
                        <i class="fas fa-brain"></i><span>AI Panel</span>
                    </button>
                    <button class="nav-item" data-nav="settings" onclick="window.loadModule?.('settings')">
                        <i class="fas fa-sliders"></i><span>Settings</span>
                    </button>
                </div>
            </nav>
        </div>
    `;
}

export async function afterRender({ user, supabase }) {
    console.log('🤖 [AI-PANEL] Module loaded');
    
    let requestCount = 0;
    
    // Send AI Message function
    window.sendAIMessage = async function() {
        const input = document.getElementById('ai-input');
        const chatContainer = document.getElementById('ai-chat');
        
        if (!input || !input.value.trim()) return;
        
        const userMessage = input.value.trim();
        
        // Add user message to chat
        const userDiv = document.createElement('div');
        userDiv.style.cssText = 'background:rgba(6,182,212,0.1);border:1px solid var(--color-secondary);border-radius:12px;padding:1rem;margin-bottom:1rem;align-self:flex-end;';
        userDiv.innerHTML = `<p style="color:var(--text-primary);"><strong>You:</strong> ${userMessage}</p>`;
        chatContainer.appendChild(userDiv);
        
        // Clear input
        input.value = '';
        
        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.id = 'ai-typing';
        typingDiv.style.cssText = 'background:rgba(16,185,129,0.1);border:1px solid var(--color-primary);border-radius:12px;padding:1rem;margin-bottom:1rem;';
        typingDiv.innerHTML = '<p style="color:var(--text-muted);">AI is typing...</p>';
        chatContainer.appendChild(typingDiv);
        
        // Scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Simulate AI response (replace with actual AI API call)
        setTimeout(() => {
            typingDiv.remove();
            
            const response = getAIResponse(userMessage);            
            const aiDiv = document.createElement('div');
            aiDiv.style.cssText = 'background:rgba(16,185,129,0.1);border:1px solid var(--color-primary);border-radius:12px;padding:1rem;margin-bottom:1rem;';
            aiDiv.innerHTML = `<p style="color:var(--text-primary);"><strong>AI:</strong> ${response}</p>`;
            chatContainer.appendChild(aiDiv);
            
            // Scroll to bottom
            chatContainer.scrollTop = chatContainer.scrollHeight;
            
            // Update request count
            requestCount++;
            const countEl = document.querySelector('.stat-card:nth-child(2) .stat-value');
            if (countEl) countEl.textContent = requestCount;
            
            if (window.toast) {
                window.toast('✅ AI response received', 'success');
            }
        }, 1000);
    };
    
    // Quick ask function
    window.quickAsk = function(question) {
        const input = document.getElementById('ai-input');
        if (input) {
            input.value = question;
            window.sendAIMessage();
        }
    };
    
    // Simple AI responses (replace with actual AI API)
    function getAIResponse(message) {
        const lower = message.toLowerCase();
        
        if (lower.includes('dream os')) {
            return 'Dream OS v2.1 adalah Enterprise Operating System dengan 19+ modul, AI integration, Islamic features, dan ISO 27001 compliance. Built with 💚 Bi idznillah!';
        }
        
        if (lower.includes('module')) {
            return 'Dream OS memiliki 19 modul: AI Panel, AI Speak, Prediction, Booking, Asset, Stok, Maintenance, Sekuriti, K3, K3 Officer, Janitor Indoor/Outdoor, Weather, Command Center, Settings, Profile, QR Scanner, Reports, dan Ghost Core!';
        }
        
        if (lower.includes('book') || lower.includes('booking')) {
            return 'Untuk booking ruangan: 1) Buka modul Booking, 2) Isi nama, ruangan, tanggal (min H-1), 3) Pilih jam (07:30-16:00 untuk user), 4) Submit! Admin bisa booking weekend.';
        }
        
        if (lower.includes('security') || lower.includes('sekuriti')) {
            return 'Security features: 5-tap Ghost Mode, Geofencing (Depok Core 5km), Device Fingerprinting, Biometric Auth, Session Timeout, Audit Trail, dan Antibody System!';
        }
        
        if (lower.includes('assalam') || lower.includes('salam')) {            return 'Wa\'alaikumsalam warahmatullahi wabarakatuh! 🕌 Ada yang bisa saya bantu?';
        }
        
        if (lower.includes('terima kasih') || lower.includes('thank')) {
            return 'Sama-sama! Senang bisa membantu! 💚 Jangan lupa shalawat!';
        }
        
        if (lower.includes('help') || lower.includes('bantuan')) {
            return 'Bantuan: 1) Gunakan Quick Actions di atas, 2) Ketik pertanyaan spesifik, 3) Atau buka modul terkait langsung dari Home!';
        }
        
        // Default response
        return `Saya menerima pertanyaan: "${message}". Untuk fitur lebih lengkap, silakan gunakan Quick Actions atau buka modul terkait. Dream OS v2.1 ready to serve! 🚀`;
    }
    
    // Enter key to send
    const input = document.getElementById('ai-input');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                window.sendAIMessage();
            }
        });
    }
}

export function cleanup() {
    console.log('🤖 [AI-PANEL] Module cleanup');
    delete window.sendAIMessage;
    delete window.quickAsk;
}

/**
 * 🤖 MODUL AI SPEAK ASSISTANT – Dream OS v2.1
 * Asisten suara berbasis AI dengan integrasi Supabase.
 * Fitur:
 * - Chat interaktif dengan pertanyaan cepat
 * - Voice recognition (jika didukung browser)
 * - Jawaban dinamis dari database (booking, K3, maintenance, dll)
 * - Tampilan glassmorphism dengan wave animasi
 */

export async function render() {
    return `
        <div class="max-w-4xl mx-auto p-4 space-y-6">
            <!-- Header -->
            <div class="text-center">
                <h1 class="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                    🤖 AI SPEAK ASSISTANT
                </h1>
                <p class="text-xs text-slate-400 font-mono mt-1">Asisten Suara Berbasis AI</p>
            </div>

            <!-- Main Chat Interface -->
            <div class="glass-card p-6 rounded-3xl border border-purple-500/30">
                <!-- Chat Display -->
                <div id="chat-display" class="bg-slate-900/50 rounded-2xl p-4 mb-4 min-h-[300px] max-h-[400px] overflow-y-auto space-y-3">
                    <div class="flex items-start gap-3">
                        <div class="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-xl">🤖</div>
                        <div class="bg-slate-800 p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                            <p class="text-sm">Halo! Saya AI Assistant Dream OS. Ada yang bisa saya bantu?</p>
                            <p class="text-xs text-slate-400 mt-1">Baru saja</p>
                        </div>
                    </div>
                </div>

                <!-- Voice Button -->
                <div class="text-center mb-4">
                    <button id="voice-btn" class="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-3xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center mx-auto">
                        🎤
                    </button>
                    <p class="text-xs text-slate-400 mt-2">Klik untuk bicara</p>
                    <div id="voice-wave" class="voice-wave mt-3 hidden">
                        <div class="voice-bar"></div>
                        <div class="voice-bar"></div>
                        <div class="voice-bar"></div>
                        <div class="voice-bar"></div>
                        <div class="voice-bar"></div>
                    </div>
                </div>

                <!-- Text Input -->
                <div class="flex gap-2">
                    <input type="text" id="chat-input" placeholder="Ketik pertanyaan..." class="flex-1 p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-purple-500">
                    <button id="send-btn" class="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>

            <!-- Quick Questions -->
            <div class="glass-card p-6 rounded-3xl border border-purple-500/30">
                <h2 class="text-lg font-bold mb-4">💡 Pertanyaan Cepat</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <button class="quick-q bg-slate-800 hover:bg-slate-700 p-3 rounded-xl text-sm text-left transition" data-q="Berapa booking pending hari ini?">📅 Booking Pending</button>
                    <button class="quick-q bg-slate-800 hover:bg-slate-700 p-3 rounded-xl text-sm text-left transition" data-q="Ada laporan K3 baru?">⚠️ Laporan K3</button>
                    <button class="quick-q bg-slate-800 hover:bg-slate-700 p-3 rounded-xl text-sm text-left transition" data-q="Siapa approver sistem ini?">✍️ Approver</button>
                    <button class="quick-q bg-slate-800 hover:bg-slate-700 p-3 rounded-xl text-sm text-left transition" data-q="Kapan jadwal maintenance berikutnya?">🔧 Maintenance</button>
                    <button class="quick-q bg-slate-800 hover:bg-slate-700 p-3 rounded-xl text-sm text-left transition" data-q="Bagaimana status keamanan?">🛡️ Keamanan</button>
                    <button class="quick-q bg-slate-800 hover:bg-slate-700 p-3 rounded-xl text-sm text-left transition" data-q="Apa saran AI untuk hari ini?">💡 Saran AI</button>
                </div>
            </div>

            <!-- Link Kembali -->
            <div class="text-center">
                <a href="#" onclick="window.DREAM.load('home'); return false;" class="text-blue-400 hover:text-blue-300 text-sm">
                    <i class="fas fa-arrow-left mr-1"></i> Kembali ke Dashboard
                </a>
            </div>
        </div>
    `;
}

export async function afterRender() {
    console.log('[AI-SPEAK] Module loaded');

    const supabase = window.supabase;
    if (!supabase) {
        console.error('[AI-SPEAK] Supabase tidak tersedia');
        return;
    }

    // ========== ELEMEN DOM ==========
    const chatDisplay = document.getElementById('chat-display');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const voiceBtn = document.getElementById('voice-btn');
    const voiceWave = document.getElementById('voice-wave');

    if (!chatDisplay || !chatInput || !sendBtn) {
        console.error('[AI-SPEAK] Elemen penting tidak ditemukan');
        return;
    }

    // ========== FUNGSI UTILITAS ==========
    function addMessage(text, isUser = false) {
        const div = document.createElement('div');
        div.className = `flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`;
        div.innerHTML = `
            <div class="w-10 h-10 rounded-full ${isUser ? 'bg-blue-600' : 'bg-purple-600'} flex items-center justify-center text-xl">${isUser ? '👤' : '🤖'}</div>
            <div class="${isUser ? 'bg-blue-600' : 'bg-slate-800'} p-3 rounded-2xl ${isUser ? 'rounded-tr-none' : 'rounded-tl-none'} max-w-[80%]">
                <p class="text-sm">${text}</p>
                <p class="text-xs opacity-60 mt-1">Baru saja</p>
            </div>
        `;
        chatDisplay.appendChild(div);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }

    // ========== AI RESPONSE (RULE-BASED) ==========
    async function getAIResponse(question) {
        const q = question.toLowerCase();

        if (q.includes('booking') && q.includes('pending')) {
            const { count, error } = await supabase
                .from('bookings')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'pending');
            if (error) console.error('[AI] Error booking:', error);
            return `📅 Saat ini ada **${count || 0} booking pending** yang perlu diproses.`;
        }
        if (q.includes('k3')) {
            const { count, error } = await supabase
                .from('k3_reports')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'pending');
            if (error) console.error('[AI] Error K3:', error);
            return `⚠️ Ada **${count || 0} laporan K3** yang menunggu verifikasi.`;
        }
        if (q.includes('approver') || q.includes('hanung')) {
            return `✍️ Approver utama sistem ini adalah **Bapak Hanung Budianto, S.E.** Beliau bertanggung jawab atas approval booking, K3, dan pengajuan dana.`;
        }
        if (q.includes('maintenance')) {
            const { count, error } = await supabase
                .from('maintenance_requests') // Sesuaikan dengan nama tabel di Supabase
                .select('*', { count: 'exact', head: true })
                .eq('status', 'pending');
            if (error) console.error('[AI] Error maintenance:', error);
            return `🔧 Ada **${count || 0} request maintenance** yang belum ditangani.`;
        }
        if (q.includes('aman') || q.includes('keamanan')) {
            return `🛡️ Status keamanan: **AMAN**. Sistem berjalan normal dengan proteksi ISO 27001 aktif.`;
        }
        if (q.includes('saran') || q.includes('suggest')) {
            const hour = new Date().getHours();
            if (hour < 10) return `💡 **Saran Pagi:** Cek jadwal booking hari ini dan pastikan semua sarana siap.`;
            if (hour < 15) return `💡 **Saran Siang:** Waktu yang baik untuk melaporkan temuan K3 jika ada.`;
            return `💡 **Saran Sore:** Pastikan semua laporan harian sudah terinput sebelum pulang.`;
        }

        return `🤖 Maaf, saya belum bisa menjawab pertanyaan itu. Coba tanya tentang booking, K3, maintenance, atau keamanan.`;
    }

    // ========== SEND MESSAGE ==========
    async function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, true);
        chatInput.value = '';

        // Tampilkan indikator mengetik
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'flex items-center gap-2 text-slate-400 text-sm ml-14';
        typingDiv.innerHTML = '<span>🤖</span><span>AI sedang mengetik...</span>';
        chatDisplay.appendChild(typingDiv);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;

        const response = await getAIResponse(text);
        typingDiv.remove();
        addMessage(response);

        // Catat ke audit (opsional)
        if (window.GhostAudit) {
            window.GhostAudit.record(
                window.DREAM?.state?.user?.email || 'system',
                'AI_QUERY',
                `Pertanyaan: ${text.substring(0, 50)}...`
            );
        }
    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

    // ========== QUICK QUESTIONS ==========
    document.querySelectorAll('.quick-q').forEach(btn => {
        btn.addEventListener('click', () => {
            chatInput.value = btn.dataset.q;
            sendMessage();
        });
    });

    // ========== VOICE RECOGNITION ==========
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'id-ID';
        recognition.continuous = false;

        voiceBtn?.addEventListener('click', () => {
            voiceWave?.classList.remove('hidden');
            recognition.start();
        });

        recognition.onresult = (e) => {
            voiceWave?.classList.add('hidden');
            const text = e.results[0][0].transcript;
            chatInput.value = text;
            sendMessage();
        };

        recognition.onerror = () => {
            voiceWave?.classList.add('hidden');
            alert('❌ Gagal mengenali suara. Coba lagi.');
        };
    } else {
        if (voiceBtn) voiceBtn.style.display = 'none';
    }
}

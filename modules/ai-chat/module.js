export default {
    render: () => {
        return `
            <div style="padding:20px;">
                <h3>AI Chat</h3>
                <div id="chat-log" style="height:300px; overflow-y:auto; background:#1e293b; padding:10px; border-radius:8px; margin-bottom:10px;"></div>
                <input type="text" id="chat-input" placeholder="Ketik pesan..." style="width:80%; padding:8px; border-radius:8px;">
                <button id="chat-send">Kirim</button>
            </div>
        `;
    },
    afterRender: () => {
        const log = document.getElementById('chat-log');
        const input = document.getElementById('chat-input');
        const send = document.getElementById('chat-send');

        const addMessage = (text, isUser) => {
            const div = document.createElement('div');
            div.textContent = (isUser ? '👤 ' : '🤖 ') + text;
            div.style.padding = '5px';
            div.style.margin = '5px';
            div.style.borderRadius = '8px';
            div.style.backgroundColor = isUser ? '#10b98120' : '#334155';
            log.appendChild(div);
            log.scrollTop = log.scrollHeight;
        };

        // Versi test: respon statis, untuk memastikan modul berfungsi
        const callAI = async (prompt) => {
            return `Kamu bilang: "${prompt}". Ini respon statis dari AI Chat. Edge Function akan segera dihubungkan.`;
        };

        send.onclick = async () => {
            const msg = input.value.trim();
            if (!msg) return;
            addMessage(msg, true);
            input.value = '';
            addMessage('⏳ Mengetik...', false);
            const reply = await callAI(msg);
            log.lastChild.remove();
            addMessage(reply, false);
        };
    }
};

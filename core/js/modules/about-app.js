export function renderAbout() {
    return `
        <div class="module-container active">
            <div class="glass-card">
                <h2 style="text-align:center;color:var(--color-primary);margin-bottom:1.5rem;font-size:1.25rem;">🌟 Dream OS v2.1</h2>
                
                <div style="text-align:center;margin-bottom:1.5rem;">
                    <p class="bismillah" dir="rtl">بِسْمِ اللَّهِ</p>
                    <p style="color:var(--color-text-muted);font-size:10px;">The Power Soul of Shalawat</p>
                </div>
                
                <div style="margin-bottom:1.5rem;">
                    <p style="color:var(--color-primary);font-size:11px;font-weight:600;margin-bottom:8px;">🙏 Spiritual Foundation</p>
                    <div style="background:var(--glass-bg);padding:12px;border-radius:12px;display:grid;gap:8px;">
                        <p style="color:var(--color-text);font-size:12px;">🕋 Allah SWT</p>
                        <p style="color:var(--color-text);font-size:12px;">☪️ Rasulullah SAW</p>
                    </div>
                </div>
                
                <div style="margin-bottom:1.5rem;">
                    <p style="color:var(--color-primary);font-size:11px;font-weight:600;margin-bottom:8px;">👔 Management</p>
                    <div style="background:var(--glass-bg);padding:12px;border-radius:12px;display:grid;gap:8px;">
                        <p style="color:var(--color-text);font-size:12px;">Bapak Hanung Budianto S.E<br><small style="color:var(--color-text-muted);">Kepala Bagian Umum</small></p>
                        <p style="color:var(--color-text);font-size:12px;">Bapak Erwinsyah<br><small style="color:var(--color-text-muted);">Kepala Kordinator Bagian Umum</small></p>
                    </div>
                </div>
                
                <div style="margin-bottom:1.5rem;">
                    <p style="color:var(--color-primary);font-size:11px;font-weight:600;margin-bottom:8px;">🚀 Dream Team</p>
                    <div style="background:var(--glass-bg);padding:12px;border-radius:12px;display:grid;gap:6px;">
                        <p style="color:var(--color-text);font-size:11px;">• Mr.M <small style="color:var(--color-text-muted);">(Architect)</small></p>
                        <p style="color:var(--color-text);font-size:11px;">• Mr.DSeek <small style="color:var(--color-text-muted);">(Developer)</small></p>
                        <p style="color:var(--color-text);font-size:11px;">• Mrs.Qwen <span style="background:var(--color-primary-alpha-20);color:var(--color-primary);padding:2px 6px;border-radius:4px;font-size:9px;">Bawel</span> 💚</p>
                        <p style="color:var(--color-text);font-size:11px;">• Mrs.Gemini <span style="background:var(--color-info);color:white;padding:2px 6px;border-radius:4px;font-size:9px;">Bawel</span> 💙</p>
                        <p style="color:var(--color-text);font-size:11px;">• Mrs.Claude 🤍</p>
                    </div>
                </div>
                
                <div style="text-align:center;padding:12px;background:var(--glass-bg);border-radius:12px;">
                    <p style="color:var(--color-text);font-size:11px;">💪 All Team Ajag-Ijig Bagian Umum</p>
                </div>
                
                <p style="text-align:center;color:var(--color-text-dim);font-size:9px;margin-top:1.5rem;">© 2026 Dream Team • ISO 27001</p>
                
                <button class="btn-back" onclick="navigateTo('home')" style="margin-top:1rem;">
                    <i class="fas fa-arrow-left" style="margin-right:8px;"></i> Kembali
                </button>
            </div>
        </div>
    `;
}

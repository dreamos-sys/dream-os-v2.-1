export function renderProfilUser({ user }) {
    return `
        <div class="module-container active">
            <div class="glass-card">
                <div style="text-align:center;margin-bottom:1.5rem;">
                    <div style="width:80px;height:80px;margin:0 auto 1rem;border-radius:50%;background:var(--color-primary-alpha-20);display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-user" style="font-size:2rem;color:var(--color-primary);"></i>
                    </div>
                    <h2 style="color:var(--color-text);font-size:1.25rem;">${user?.name || 'User'}</h2>
                    <p style="color:var(--color-primary);font-size:10px;text-transform:uppercase;">${user?.role || 'Guest'}</p>
                </div>
                
                <div style="display:grid;gap:12px;">
                    <div style="display:flex;justify-content:space-between;padding:12px;background:var(--glass-bg);border-radius:12px;">
                        <span style="color:var(--color-text-muted);font-size:12px;">Email</span>
                        <span style="color:var(--color-text);font-size:12px;">${user?.email || '-'}</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;padding:12px;background:var(--glass-bg);border-radius:12px;">
                        <span style="color:var(--color-text-muted);font-size:12px;">Last Login</span>
                        <span style="color:var(--color-text);font-size:12px;">${new Date().toLocaleString('id-ID')}</span>
                    </div>
                </div>
                
                <button class="btn-back" onclick="navigateTo('home')" style="margin-top:1.5rem;">
                    <i class="fas fa-arrow-left" style="margin-right:8px;"></i> Kembali
                </button>
            </div>
        </div>
    `;
}

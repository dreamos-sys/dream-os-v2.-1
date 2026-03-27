export default {
    name: 'Settings',
    icon: 'fa-cog',
    color: '#6b7280',
    render() {
        return `
            <div style="background:#0f172a; border-radius:24px; padding:24px;">
                <h3 style="color:#10b981;"><i class="fas fa-info-circle"></i> System Information</h3>
                <div style="background:rgba(16,185,129,0.1); border-radius:16px; padding:16px; margin:16px 0;">
                    <p><strong>Dream OS</strong> v2.1 Enterprise</p>
                    <p>Manajemen Aset & Gedung Sekolah</p>
                    <p>ISO 27001:2026 Ready</p>
                    <hr style="border-color:#334155;">
                    <p><i class="fas fa-database"></i> Database: Supabase</p>
                    <p><i class="fas fa-cloud-upload-alt"></i> Last Sync: ${new Date().toLocaleString()}</p>
                    <p><i class="fas fa-shield-alt"></i> Security: RLS + Audit Trail</p>
                </div>
                <button id="logout-settings" style="background:#ef4444; border:none; padding:12px; border-radius:12px; width:100%; cursor:pointer;">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
        `;
    },
    afterRender(context) {
        document.getElementById('logout-settings')?.addEventListener('click', () => {
            context.supabase?.auth.signOut();
            sessionStorage.clear();
            location.reload();
        });
    }
};

export default {
    name: 'Profile',
    icon: 'fa-user',
    color: '#10b981',

    async render(context) {
        const { supabase, user, toast } = context;
        let profile = null;
        let authUser = null;

        if (supabase) {
            // Ambil data profile dari tabel profiles
            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('username', user)
                .single();
            profile = profileData;

            // Ambil data auth user (email, dll)
            const { data: { user: authData } } = await supabase.auth.getUser();
            authUser = authData;
        }

        return `
            <div style="background:#0f172a; border-radius:24px; padding:24px;">
                <div style="display:flex; align-items:center; gap:20px; margin-bottom:24px;">
                    <div style="width:80px; height:80px; background:linear-gradient(135deg, #10b981, #34d399); border-radius:50%; display:flex; align-items:center; justify-content:center;">
                        <i class="fas fa-user" style="font-size:40px; color:white;"></i>
                    </div>
                    <div>
                        <h2 style="color:#10b981; margin:0;">${profile?.full_name || user}</h2>
                        <p style="color:#94a3b8;">${profile?.role || 'User'}</p>
                    </div>
                </div>

                <div style="background:rgba(16,185,129,0.1); border-radius:16px; padding:16px; margin-bottom:24px;">
                    <h3 style="color:#10b981; margin-top:0;">Informasi Akun</h3>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                        <div><span style="color:#94a3b8;">Username:</span> <strong>${profile?.username || user}</strong></div>
                        <div><span style="color:#94a3b8;">Email:</span> <strong>${authUser?.email || '-'}</strong></div>
                        <div><span style="color:#94a3b8;">Role:</span> <strong>${profile?.role || '-'}</strong></div>
                        <div><span style="color:#94a3b8;">Bergabung:</span> <strong>${profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : '-'}</strong></div>
                    </div>
                </div>

                <div style="background:rgba(16,185,129,0.1); border-radius:16px; padding:16px;">
                    <h3 style="color:#10b981; margin-top:0;">Edit Profile</h3>
                    <div style="margin-bottom:16px;">
                        <label>Nama Lengkap</label>
                        <input type="text" id="full_name" value="${profile?.full_name || ''}" style="width:100%; padding:12px; background:#1e293b; border:1px solid #334155; border-radius:12px; color:white; margin-top:5px;">
                    </div>
                    <button id="save-profile" style="background:#10b981; border:none; padding:12px 24px; border-radius:12px; cursor:pointer;">
                        <i class="fas fa-save"></i> Simpan Perubahan
                    </button>
                    <div id="save-message" style="margin-top:12px;"></div>
                </div>
            </div>
        `;
    },

    afterRender(context) {
        const { supabase, toast, user } = context;

        const saveBtn = document.getElementById('save-profile');
        const fullNameInput = document.getElementById('full_name');
        const messageDiv = document.getElementById('save-message');

        if (saveBtn) {
            saveBtn.addEventListener('click', async () => {
                const newName = fullNameInput.value.trim();
                if (!newName) {
                    messageDiv.innerHTML = '<span style="color:#ef4444;">Nama tidak boleh kosong</span>';
                    return;
                }

                try {
                    // Update profile di tabel profiles
                    const { error } = await supabase
                        .from('profiles')
                        .update({ full_name: newName })
                        .eq('username', user);

                    if (error) throw error;

                    messageDiv.innerHTML = '<span style="color:#10b981;">✅ Profile berhasil diperbarui</span>';
                    toast('Profile updated', 'success');
                    
                    // Update session storage agar nama di header langsung berubah
                    sessionStorage.setItem('dreamos_user', newName);
                    // Reload dashboard agar nama di header berubah
                    setTimeout(() => location.reload(), 1000);
                } catch (err) {
                    console.error(err);
                    messageDiv.innerHTML = '<span style="color:#ef4444;">❌ Gagal memperbarui: ' + err.message + '</span>';
                }
            });
        }
    }
};

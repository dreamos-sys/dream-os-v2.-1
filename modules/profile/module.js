// modules/profile/module.js
export async function render() {
    const user = window.DREAM?.state?.user || { name: 'Guest', role: 'guest', email: '-' };
    const deviceFingerprint = window.DeviceFingerprint || null;
    const isTrusted = deviceFingerprint?.deviceId ? 
        (JSON.parse(localStorage.getItem('dreamos_known_devices') || '[]')).includes(deviceFingerprint.deviceId) : false;

    return `
        <div class="p-4 max-w-2xl mx-auto animate-fade-in">
            <h2 class="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
                <i class="fas fa-user-circle"></i> Profil Anggota
                <span class="text-xs bg-emerald-500/20 px-3 py-1 rounded-full ml-auto">ISO 27001</span>
            </h2>

            <div class="glass-card p-6 mb-6 relative overflow-hidden">
                <div class="flex items-center gap-4 relative z-10">
                    <div class="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-3xl font-bold text-white">
                        ${user.name ? user.name.charAt(0).toUpperCase() : '👤'}
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center gap-2">
                            <h3 class="text-xl font-bold text-white">${user.name}</h3>
                            <span class="text-xs font-semibold px-2 py-1 rounded-full" style="background:${user.role === 'architect' ? '#8b5cf620' : '#10b98120'}; color:${user.role === 'architect' ? '#8b5cf6' : '#10b981'}">
                                ${user.role.toUpperCase()}
                            </span>
                        </div>
                        <p class="text-sm text-slate-400 mt-1"><i class="fas fa-envelope mr-1"></i> ${user.email}</p>
                    </div>
                </div>
            </div>

            <div class="glass-card p-6 mb-6">
                <h3 class="text-lg font-semibold text-emerald-400 mb-4"><i class="fas fa-shield-alt"></i> Status Perangkat</h3>
                <div class="bg-white/5 rounded-lg p-4 border border-white/10 mb-3">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm text-slate-400">Keamanan</span>
                        ${isTrusted ? 
                            '<span class="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">TERPERCAYA</span>' : 
                            '<span class="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">BARU / ASING</span>'
                        }
                    </div>
                    <p class="text-xs font-mono text-slate-500 break-all">${deviceFingerprint?.deviceId || 'Belum direkam'}</p>
                </div>
            </div>

            <button onclick="DREAM.load('home')" class="w-full py-3 bg-emerald-500 text-white rounded-xl font-bold active:scale-95 transition-all shadow-lg shadow-emerald-500/30">
                ← Kembali ke Beranda
            </button>
        </div>
    `;
}

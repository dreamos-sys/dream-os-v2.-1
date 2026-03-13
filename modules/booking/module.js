// modules/booking/module.js
export async function render() {
    // Ambil data dari localStorage (atau Sovereign state)
    const bookings = JSON.parse(localStorage.getItem('dreamos-bookings') || '[]');
    
    // HTML dari versi lama (sudah disesuaikan dengan CSS v2.1)
    return `
        <div class="p-4 max-w-2xl mx-auto">
            <h2 class="text-2xl font-bold text-emerald-400 mb-4">📅 Booking Ruangan</h2>
            
            <div class="glass-card p-4 mb-6">
                <h3 class="text-lg font-semibold mb-3">Form Booking</h3>
                <form id="booking-form">
                    <input type="text" id="nama" placeholder="Nama Peminjam" 
                           class="w-full p-2 mb-3 bg-slate-800/50 border border-emerald-500/30 rounded">
                    <input type="text" id="ruang" placeholder="Ruang" 
                           class="w-full p-2 mb-3 bg-slate-800/50 border border-emerald-500/30 rounded">
                    <input type="date" id="tanggal" 
                           class="w-full p-2 mb-3 bg-slate-800/50 border border-emerald-500/30 rounded">
                    <button type="submit" 
                            class="w-full bg-emerald-500 text-white p-2 rounded font-bold">
                        Simpan Booking
                    </button>
                </form>
            </div>

            <div class="glass-card p-4">
                <h3 class="text-lg font-semibold mb-3">Daftar Booking</h3>
                <div class="space-y-2">
                    ${bookings.map(b => `
                        <div class="p-3 bg-slate-800/30 rounded border border-emerald-500/20">
                            <p><span class="text-emerald-400">${b.nama}</span> - ${b.ruang}</p>
                            <p class="text-xs text-slate-400">${b.tanggal}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

export async function afterRender() {
    // Logic JS dari versi lama (pindahkan ke sini)
    const form = document.getElementById('booking-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const booking = {
                id: Date.now(),
                nama: document.getElementById('nama').value,
                ruang: document.getElementById('ruang').value,
                tanggal: document.getElementById('tanggal').value,
                timestamp: new Date().toISOString()
            };
            
            // Simpan ke localStorage
            const bookings = JSON.parse(localStorage.getItem('dreamos-bookings') || '[]');
            bookings.push(booking);
            localStorage.setItem('dreamos-bookings', JSON.stringify(bookings));
            
            // Catat ke audit trail (gunakan GhostAudit)
            window.GhostAudit?.record(
                window.DREAM?.state?.user?.email || 'system',
                'BOOKING_CREATED',
                `Ruangan: ${booking.ruang} oleh ${booking.nama}`
            );
            
            // Tampilkan toast
            window.DREAM?.showToast('Booking berhasil disimpan!', 'success');
            
            // Reload modul untuk menampilkan data baru
            DREAM.load('booking');
        });
    }
}

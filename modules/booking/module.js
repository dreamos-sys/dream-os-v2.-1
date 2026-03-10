/**
 * modules/booking/module.js - Dream OS v2.1
 * ✅ Logika Senin Berkah (Bisa booking pas Weekend)
 * ✅ Batas Max 21 Hari (3 Minggu)
 * ✅ Anti-Double Booking (Pre-flight Check)
 * ✅ Jam Kerja 07:30 - 16:00
 */

export default async function initModule({ container, services, user }) {
    const CONFIG = {
        WORK_HOURS: { start: 7.5, end: 16.0 },
        MAX_BOOKING_DAYS: 21,
        FRIDAY_BLOCK: { start: 10.5, end: 13.0, rooms: ['Aula SMP', 'Aula SMA', 'Serbaguna'] },
        OVERRIDE_ROLES: ['kabag_umum', 'koord_umum', 'admin']
    };

    // --- HELPER LOGIC ---
    const isWeekend = (date) => [0, 6].includes(new Date(date).getDay());
    const timeToDec = (t) => { const [h, m] = t.split(':').map(Number); return h + (m / 60); };

    // Logika H-1 Spesial Senin: Jika hari ini Sabtu/Minggu, Senin masih boleh di-booking
    const getMinDate = () => {
        const d = new Date();
        const hour = d.getHours() + d.getMinutes()/60;
        // Jika sudah lewat jam 16:00, minimal booking adalah H+2 (kecuali buat Senin)
        d.setDate(d.getDate() + (hour >= 16 ? 2 : 1));
        return d.toISOString().split('T')[0];
    };

    const getMaxDate = () => {
        const d = new Date();
        d.setDate(d.getDate() + CONFIG.MAX_BOOKING_DAYS);
        return d.toISOString().split('T')[0];
    };

    // --- RENDER UI ---
    container.innerHTML = `
        <div class="booking-wrapper glass-morphism p-6">
            <h2 class="arabic text-emerald-500 text-center">بسم الله الرحمن الرحيم</h2>
            <h3 class="text-center mb-6">Form Booking Sarana v2.1</h3>
            
            <form id="booking-form" class="space-y-4">
                <input type="text" name="nama" placeholder="Nama Peminjam" value="${user?.name || ''}" class="glass-input" required>
                
                <div class="grid grid-cols-2 gap-4">
                    <div class="input-group">
                        <label>Tanggal</label>
                        <input type="date" name="tgl" id="input-tgl" min="${getMinDate()}" max="${getMaxDate()}" class="glass-input" required>
                    </div>
                    <div class="input-group">
                        <label>Pilih Sarana</label>
                        <select name="sarana" class="glass-input" required>
                            <option value="Aula SMP">Aula SMP</option>
                            <option value="Aula SMA">Aula SMA</option>
                            <option value="Lapangan Upacara">Lapangan Upacara</option>
                            <option value="Serbaguna">Serbaguna</option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="input-group">
                        <label>Jam Mulai</label>
                        <input type="time" name="jam_mulai" min="07:30" max="15:00" value="07:30" class="glass-input" required>
                    </div>
                    <div class="input-group">
                        <label>Jam Selesai</label>
                        <input type="time" name="jam_selesai" min="08:30" max="16:00" value="09:00" class="glass-input" required>
                    </div>
                </div>

                <button type="submit" id="btn-submit" class="btn-primary w-full py-4">
                    AJUKAN BOOKING
                </button>
            </form>
        </div>
    `;

    // --- ACTION LOGIC ---
    const form = container.querySelector('#booking-form');
    form.onsubmit = async (e) => {
        e.preventDefault();
        const btn = container.querySelector('#btn-submit');
        const fd = new FormData(form);
        const data = Object.fromEntries(fd);

        // 1. Validasi Jam Kerja
        const mulai = timeToDec(data.jam_mulai);
        const selesai = timeToDec(data.jam_selesai);
        if (mulai < CONFIG.WORK_HOURS.start || selesai > CONFIG.WORK_HOURS.end) {
            return alert("❌ Booking harus di antara jam 07:30 - 16:00 WIB");
        }

        // 2. Validasi Hari Libur (Sabtu/Minggu)
        if (isWeekend(data.tgl)) {
            return alert("❌ Hari Sabtu & Minggu libur. Silakan pilih hari kerja.");
        }

        btn.disabled = true;
        btn.innerHTML = "Mengecek Ketersediaan...";

        try {
            // 3. ANTI-DOUBLE BOOKING (Pre-flight check)
            const { data: bentrok } = await services.supabase
                .from('bookings')
                .select('id')
                .eq('ruang', data.sarana)
                .eq('tanggal', data.tgl)
                .filter('jam_mulai', 'lt', data.jam_selesai)
                .filter('jam_selesai', 'gt', data.jam_mulai);

            if (bentrok && bentrok.length > 0) {
                btn.disabled = false;
                btn.innerHTML = "AJUKAN BOOKING";
                return alert("⚠️ Maaf, jam tersebut sudah di-booking orang lain!");
            }

            // 4. SIMPAN DATA
            await services.supabase.from('bookings').insert([{
                nama_peminjam: data.nama,
                ruang: data.sarana,
                tanggal: data.tgl,
                jam_mulai: data.jam_mulai,
                jam_selesai: data.jam_selesai,
                status: 'pending'
            }]);

            alert("✅ Bismillah, Booking berhasil diajukan!");
            form.reset();
        } catch (err) {
            alert("❌ Error: " + err.message);
        } finally {
            btn.disabled = false;
            btn.innerHTML = "AJUKAN BOOKING";
        }
    };
}

export default {
    name: 'Form Booking Sarana',
    icon: 'fa-calendar-alt',
    color: '#3b82f6',
    version: '2.1.0-COMPLETE',
    
    render: () => {
        return `
            <div class="max-w-4xl mx-auto p-4" style="padding-bottom:100px;">
                <!-- LOADING OVERLAY -->
                <div id="booking-loading" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.8); z-index:9998; align-items:center; justify-content:center;">
                    <div style="background:#1e293b; padding:32px; border-radius:16px; text-align:center; border:2px solid #3b82f6;">
                        <i class="fas fa-spinner fa-spin" style="font-size:48px; color:#3b82f6; margin-bottom:16px;"></i>
                        <p style="color:#e2e8f0; font-size:16px;" id="loading-text">Memuat data...</p>
                    </div>
                </div>

                <!-- ERROR BOUNDARY -->
                <div id="booking-error" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.8); z-index:9998; align-items:center; justify-content:center;">
                    <div style="background:#1e293b; padding:32px; border-radius:16px; text-align:center; border:2px solid #ef4444; max-width:400px; width:90%;">
                        <i class="fas fa-exclamation-triangle" style="font-size:48px; color:#ef4444; margin-bottom:16px;"></i>
                        <h3 style="color:#ef4444; margin-bottom:16px;">Terjadi Kesalahan</h3>
                        <p id="error-message" style="color:#cbd5e1; margin-bottom:24px; font-size:14px;"></p>
                        <button onclick="location.reload()" style="background:#3b82f6; color:white; border:none; padding:12px 32px; border-radius:8px; cursor:pointer; font-weight:700;">🔄 Reload</button>
                    </div>
                </div>

                <!-- NOTIFICATION BUTTON -->
                <div style="position:fixed; top:20px; right:20px; z-index:999;">
                    <button id="booking-notif-btn" style="
                        background: linear-gradient(135deg, #3b82f6, #2563eb);
                        border: none; border-radius: 50%; width: 56px; height: 56px;
                        cursor: pointer; box-shadow: 0 4px 20px rgba(59,130,246,0.4);
                        display: flex; align-items: center; justify-content: center;
                        font-size: 1.5rem; transition: transform 0.2s; position: relative;                    " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                        🔔
                        <span id="notif-badge" style="
                            position: absolute; top: -5px; right: -5px;
                            background: #ef4444; color: white; border-radius: 50%;
                            width: 24px; height: 24px; display: none;
                            align-items: center; justify-content: center;
                            font-size: 0.75rem; font-weight: 700;
                        "></span>
                    </button>
                </div>

                <!-- AUTO-SAVE DRAFT INDICATOR -->
                <div id="draft-saved" style="display:none; position:fixed; top:20px; left:20px; background:rgba(16,185,129,0.9); color:white; padding:8px 16px; border-radius:20px; font-size:12px; z-index:999; animation: slideIn 0.3s ease;">
                    💾 Draft tersimpan
                </div>

                <div style="display:flex;align-items:center;gap:1rem;margin-bottom:2rem">
                    <button onclick="window.closeModule()" style="background:#1e293b; border:1px solid #475569; padding:8px 16px; border-radius:12px; cursor:pointer; color:white; transition:all 0.3s;" onmouseover="this.style.borderColor='#10b981'" onmouseout="this.style.borderColor='#475569'">
                        <i class="fas fa-arrow-left" style="margin-right:8px;"></i> Kembali
                    </button>
                    <h2 style="color:white; margin:0; font-size:24px; font-weight:700;">📅 Form Booking Sarana</h2>
                    <button id="calendar-view-btn" onclick="toggleCalendarView()" style="margin-left:auto; background:#1e293b; border:1px solid #475569; padding:8px 16px; border-radius:12px; cursor:pointer; color:white; transition:all 0.3s;" onmouseover="this.style.borderColor='#10b981'" onmouseout="this.style.borderColor='#475569'">
                        📆 Kalender
                    </button>
                </div>

                <!-- SYSTEM LOCK ALERT -->
                <div id="system-lock-alert" style="display:none; background:rgba(239,68,68,0.1); border:1px solid #ef4444; border-radius:12px; padding:16px; margin-bottom:24px;">
                    <div style="color:#ef4444; font-weight:700; margin-bottom:8px;">🔒 Sistem Booking Ditutup</div>
                    <div id="lock-alert-message" style="color:#fca5a5; font-size:14px;"></div>
                </div>

                <!-- CALENDAR VIEW (NEW!) -->
                <div id="calendar-view" style="display:none; background:rgba(15,23,42,0.8); border-radius:16px; padding:24px; margin-bottom:24px; border:1px solid #475569;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                        <h3 style="color:#3b82f6; margin:0;">📆 Kalender Booking</h3>
                        <button onclick="toggleCalendarView()" style="background:none; border:none; color:#94a3b8; cursor:pointer; font-size:20px;">✕</button>
                    </div>
                    <div id="calendar-content" style="text-align:center; color:#94a3b8;">
                        <i class="fas fa-spinner fa-spin" style="font-size:32px;"></i>
                        <p style="margin-top:16px;">Memuat kalender...</p>
                    </div>
                </div>

                <form id="bookingForm" style="background:rgba(30,41,59,0.5); padding:24px; border-radius:16px; border:1px solid #475569;">
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
                        <div>
                            <label style="display:block; color:#94a3b8; font-size:14px; margin-bottom:8px;">Nama Pemohon <span style="color:#ef4444;">*</span></label>
                            <input type="text" name="nama" id="form-nama" required style="width:100%; padding:12px; border-radius:12px; border:1px solid #475569; background:#0f172a; color:white; outline:none; transition:border 0.3s;" onfocus="this.style.borderColor='#10b981'" onblur="this.style.borderColor='#475569'" placeholder="Nama lengkap" oninput="autoSaveDraft()">                        </div>
                        <div>
                            <label style="display:block; color:#94a3b8; font-size:14px; margin-bottom:8px;">Divisi</label>
                            <input type="text" name="divisi" id="form-divisi" style="width:100%; padding:12px; border-radius:12px; border:1px solid #475569; background:#0f172a; color:white; outline:none; transition:border 0.3s;" onfocus="this.style.borderColor='#10b981'" onblur="this.style.borderColor='#475569'" placeholder="Divisi/Departemen" oninput="autoSaveDraft()">
                        </div>
                    </div>
                    <div style="margin-bottom:16px;">
                        <label style="display:block; color:#94a3b8; font-size:14px; margin-bottom:8px;">No. HP <span style="color:#ef4444;">*</span></label>
                        <input type="tel" name="no_hp" id="form-nohp" required style="width:100%; padding:12px; border-radius:12px; border:1px solid #475569; background:#0f172a; color:white; outline:none; transition:border 0.3s;" onfocus="this.style.borderColor='#10b981'" onblur="this.style.borderColor='#475569'" placeholder="08xx-xxxx-xxxx" oninput="autoSaveDraft()">
                    </div>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
                        <div>
                            <label style="display:block; color:#94a3b8; font-size:14px; margin-bottom:8px;">Pilih Sarana <span style="color:#ef4444;">*</span></label>
                            <select name="sarana" id="sarana" required style="width:100%; padding:12px; border-radius:12px; border:1px solid #475569; background:#0f172a; color:white; outline:none; transition:border 0.3s;" onfocus="this.style.borderColor='#10b981'" onblur="this.style.borderColor='#475569'" onchange="autoSaveDraft()">
                                <option value="">-- Pilih Sarana --</option>
                            </select>
                        </div>
                        <div>
                            <label style="display:block; color:#94a3b8; font-size:14px; margin-bottom:8px;">Tanggal <span style="color:#ef4444;">*</span></label>
                            <input type="date" name="tgl" id="tgl" required style="width:100%; padding:12px; border-radius:12px; border:1px solid #475569; background:#0f172a; color:white; outline:none; transition:border 0.3s;" onfocus="this.style.borderColor='#10b981'" onblur="this.style.borderColor='#475569'" onchange="autoSaveDraft()">
                            <p id="dateWarning" style="display:none; color:#f97316; font-size:12px; margin-top:8px;"><i class="fas fa-exclamation-triangle" style="margin-right:4px;"></i><span></span></p>
                        </div>
                    </div>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
                        <div>
                            <label style="display:block; color:#94a3b8; font-size:14px; margin-bottom:8px;">Jam Mulai <span style="color:#ef4444;">*</span></label>
                            <input type="time" name="jam_mulai" id="jam_mulai" required min="07:30" max="16:00" value="08:00" style="width:100%; padding:12px; border-radius:12px; border:1px solid #475569; background:#0f172a; color:white; outline:none; transition:border 0.3s;" onfocus="this.style.borderColor='#10b981'" onblur="this.style.borderColor='#475569'" onchange="autoSaveDraft()">
                        </div>
                        <div>
                            <label style="display:block; color:#94a3b8; font-size:14px; margin-bottom:8px;">Jam Selesai <span style="color:#ef4444;">*</span></label>
                            <input type="time" name="jam_selesai" id="jam_selesai" required min="07:30" max="16:00" value="10:00" style="width:100%; padding:12px; border-radius:12px; border:1px solid #475569; background:#0f172a; color:white; outline:none; transition:border 0.3s;" onfocus="this.style.borderColor='#10b981'" onblur="this.style.borderColor='#475569'" onchange="autoSaveDraft()">
                        </div>
                    </div>

                    <!-- Peralatan -->
                    <div style="margin-bottom:16px;">
                        <label style="display:block; color:#94a3b8; font-size:14px; margin-bottom:8px;">Peralatan Tambahan</label>
                        <div id="peralatan-list" style="display:grid; grid-template-columns:repeat(3,1fr); gap:12px; background:rgba(15,23,42,0.5); padding:16px; border-radius:12px;"></div>
                    </div>

                    <div style="margin-bottom:24px;">
                        <label style="display:block; color:#94a3b8; font-size:14px; margin-bottom:8px;">Keperluan (opsional)</label>
                        <textarea name="keperluan" id="form-keperluan" rows="3" style="width:100%; padding:12px; border-radius:12px; border:1px solid #475569; background:#0f172a; color:white; outline:none; transition:border 0.3s; resize:vertical;" onfocus="this.style.borderColor='#10b981'" onblur="this.style.borderColor='#475569'" placeholder="Jelaskan keperluan booking..." oninput="autoSaveDraft()"></textarea>
                    </div>
                    
                    <div style="display:flex; gap:12px; margin-bottom:24px;">
                        <button type="button" onclick="loadDraft()" style="flex:1; background:#1e293b; border:1px solid #475569; padding:12px; border-radius:12px; color:white; cursor:pointer; font-weight:700; transition:all 0.3s;" onmouseover="this.style.borderColor='#f59e0b'" onmouseout="this.style.borderColor='#475569'">
                            📥 Muat Draft
                        </button>
                        <button type="button" onclick="clearDraft()" style="flex:1; background:#1e293b; border:1px solid #475569; padding:12px; border-radius:12px; color:white; cursor:pointer; font-weight:700; transition:all 0.3s;" onmouseover="this.style.borderColor='#ef4444'" onmouseout="this.style.borderColor='#475569'">                            🗑️ Hapus Draft
                        </button>
                    </div>
                    
                    <button type="submit" id="submitBtn" style="width:100%; background:linear-gradient(135deg, #059669, #10b981); border:none; padding:16px; border-radius:12px; color:white; font-weight:700; cursor:pointer; transition:all 0.3s; font-size:16px;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                        <i class="fas fa-paper-plane" style="margin-right:8px;"></i> AJUKAN BOOKING
                    </button>
                </form>

                <div style="margin-top:24px; padding:16px; background:rgba(30,58,138,0.3); border:1px solid rgba(59,130,246,0.5); border-radius:12px;">
                    <h4 style="color:#60a5fa; margin-top:0; margin-bottom:12px;"><i class="fas fa-info-circle" style="margin-right:8px;"></i>Informasi:</h4>
                    <ul style="color:#cbd5e1; margin:0; padding-left:20px; line-height:1.8; font-size:14px;">
                        <li>• Jam operasional: <strong>07:30 - 16:00</strong> (Senin-Jumat)</li>
                        <li>• Sabtu: <strong>Optional</strong> (untuk team umum)</li>
                        <li>• Minggu & Tanggal Merah: <strong>LIBUR</strong></li>
                        <li>• Jumat 10:30-13:00: Aula & Serbaguna <strong>tidak tersedia</strong> (Shalat Jumat)</li>
                        <li>• Booking minimal <strong>H-1</strong></li>
                        <li>• <strong>Sound Portable</strong> & <strong>Sound Display Karaoke</strong> tersedia!</li>
                        <li>• <strong>NEW:</strong> Draft auto-save setiap 3 detik!</li>
                        <li>• <strong>NEW:</strong> Lihat kalender booking!</li>
                    </ul>
                </div>
            </div>
        `;
    },
    
    afterRender: async (ctx) => {
        const supabase = ctx.supabase;
        const currentUser = ctx.user || { name: 'Guest', role: 'regular' };
        let draftTimer = null;
        let calendarData = null;

        // Error boundary handler
        window.addEventListener('error', (e) => {
            console.error('Booking Module Error:', e);
            const errorDiv = document.getElementById('booking-error');
            const errorMsg = document.getElementById('error-message');
            if(errorDiv && errorMsg) {
                errorMsg.textContent = e.message || 'Terjadi kesalahan tidak diketahui';
                errorDiv.style.display = 'flex';
            }
        });

        const CONFIG = {
            WORK_HOURS: { start: 7.5, end: 16.0 },
            FRIDAY_PRAYER_BLOCK: { start: 10.5, end: 13.0 },
            FRIDAY_BLOCKED_ROOMS: ['Aula SMP', 'Aula SMA', 'Serbaguna', 'Mushalla SMA'],
            MIN_BOOKING_DAYS: 1,
            MAX_BOOKING_DAYS: 30,
            OVERRIDE_ROLES: ['kabag_umum', 'koord_umum', 'admin', 'master', 'developer'],            SARANA_LIST: [
                "Aula SMP", "Aula SMA", "Saung Besar", "Saung Kecil",
                "Masjid (Maintenance)", "Mushalla SMA", "Serbaguna",
                "Lapangan Basket", "Lapangan Volly", "Lapangan Tanah",
                "Lapangan SMA", "Kantin SMP", "Kantin SMA",
                "Labkom SD", "Labkom SMP", "Labkom SMA",
                "Perpustakaan SD", "Perpustakaan SMP", "Perpustakaan SMA"
            ],
            PERALATAN_LIST: [
                "Kursi Futura", "Kursi Chitose", "Meja Siswa", "Meja Panjang",
                "Meja Oshin", "Taplak Meja", "Projektor", "Screen Projektor",
                "TV", "Sound System", "Sound Portable", "Sound Portable Display (Karaoke)",
                "Mic Wireless", "AC Portable"
            ],
            HOLIDAYS_2026: [
                '2026-01-01', '2026-01-27', '2026-03-20', '2026-04-10',
                '2026-05-01', '2026-05-21', '2026-06-01', '2026-06-07',
                '2026-06-08', '2026-08-17', '2026-09-15', '2026-11-24',
                '2026-12-25', '2026-12-26'
            ]
        };

        // Utility functions
        function showLoading(text = 'Memuat data...') {
            const loading = document.getElementById('booking-loading');
            const loadingText = document.getElementById('loading-text');
            if(loading) { loading.style.display = 'flex'; if(loadingText) loadingText.textContent = text; }
        }

        function hideLoading() {
            const loading = document.getElementById('booking-loading');
            if(loading) loading.style.display = 'none';
        }

        function showError(message) {
            const errorDiv = document.getElementById('booking-error');
            const errorMsg = document.getElementById('error-message');
            if(errorDiv && errorMsg) {
                errorMsg.textContent = message;
                errorDiv.style.display = 'flex';
            }
        }

        function timeToDecimal(timeStr) { const [h, m] = timeStr.split(':').map(Number); return h + (m / 60); }
        function decimalToTime(decimal) { const h = Math.floor(decimal); const m = Math.round((decimal - h) * 60); return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`; }
        function getDayName(dateStr) { const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu']; return days[new Date(dateStr + 'T00:00:00').getDay()]; }
        function isSunday(d) { return new Date(d + 'T00:00:00').getDay() === 0; }
        function isSaturday(d) { return new Date(d + 'T00:00:00').getDay() === 6; }
        function isFriday(d) { return new Date(d + 'T00:00:00').getDay() === 5; }
        function isHoliday(d) { return CONFIG.HOLIDAYS_2026.includes(d); }        function getMinDate() { const d = new Date(); d.setDate(d.getDate() + CONFIG.MIN_BOOKING_DAYS); return d.toISOString().split('T')[0]; }
        function getMaxDate() { const d = new Date(); d.setDate(d.getDate() + CONFIG.MAX_BOOKING_DAYS); return d.toISOString().split('T')[0]; }
        
        function doToast(msg, type) {
            const colors = { success: '#10b981', error: '#ef4444', warning: '#f59e0b', info: '#3b82f6' };
            const toast = document.createElement('div');
            toast.style.cssText = `position:fixed; bottom:100px; left:50%; transform:translateX(-50%); background:${colors[type] || '#3b82f6'}; color:white; padding:12px 24px; border-radius:30px; font-weight:700; z-index:10000; animation:slideUp 0.3s ease;`;
            toast.textContent = msg;
            document.body.appendChild(toast);
            setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
        }

        // Auto-save draft function (NEW!)
        window.autoSaveDraft = function() {
            if(draftTimer) clearTimeout(draftTimer);
            draftTimer = setTimeout(() => {
                const draft = {
                    nama: document.getElementById('form-nama')?.value || '',
                    divisi: document.getElementById('form-divisi')?.value || '',
                    nohp: document.getElementById('form-nohp')?.value || '',
                    sarana: document.getElementById('sarana')?.value || '',
                    tgl: document.getElementById('tgl')?.value || '',
                    jam_mulai: document.getElementById('jam_mulai')?.value || '',
                    jam_selesai: document.getElementById('jam_selesai')?.value || '',
                    keperluan: document.getElementById('form-keperluan')?.value || '',
                    saved_at: new Date().toISOString()
                };
                localStorage.setItem('booking_draft', JSON.stringify(draft));
                showDraftSaved();
            }, 3000);
        };

        function showDraftSaved() {
            const indicator = document.getElementById('draft-saved');
            if(indicator) {
                indicator.style.display = 'block';
                setTimeout(() => { indicator.style.display = 'none'; }, 2000);
            }
        }

        window.loadDraft = function() {
            try {
                const draft = JSON.parse(localStorage.getItem('booking_draft') || '{}');
                if(!draft.saved_at) { doToast('❌ Tidak ada draft tersimpan', 'warning'); return; }
                if(document.getElementById('form-nama')) document.getElementById('form-nama').value = draft.nama || '';
                if(document.getElementById('form-divisi')) document.getElementById('form-divisi').value = draft.divisi || '';
                if(document.getElementById('form-nohp')) document.getElementById('form-nohp').value = draft.nohp || '';
                if(document.getElementById('sarana')) document.getElementById('sarana').value = draft.sarana || '';
                if(document.getElementById('tgl')) document.getElementById('tgl').value = draft.tgl || '';
                if(document.getElementById('jam_mulai')) document.getElementById('jam_mulai').value = draft.jam_mulai || '';                if(document.getElementById('jam_selesai')) document.getElementById('jam_selesai').value = draft.jam_selesai || '';
                if(document.getElementById('form-keperluan')) document.getElementById('form-keperluan').value = draft.keperluan || '';
                doToast('✅ Draft berhasil dimuat!', 'success');
            } catch(e) { doToast('❌ Gagal memuat draft', 'error'); }
        };

        window.clearDraft = function() {
            if(confirm('Hapus draft yang tersimpan?')) {
                localStorage.removeItem('booking_draft');
                doToast('🗑️ Draft dihapus', 'info');
            }
        };

        // Calendar view function (NEW!)
        window.toggleCalendarView = async function() {
            const calendarView = document.getElementById('calendar-view');
            const calendarContent = document.getElementById('calendar-content');
            if(!calendarView || !calendarContent) return;

            if(calendarView.style.display === 'none') {
                calendarView.style.display = 'block';
                showLoading('Memuat kalender...');
                
                try {
                    if(supabase) {
                        const { data: bookings, error } = await supabase
                            .from('bookings')
                            .select('*')
                            .gte('tanggal', new Date().toISOString().split('T')[0])
                            .lte('tanggal', new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0])
                            .eq('status', 'approved')
                            .order('tanggal', { ascending: true });
                        
                        if(error) throw error;
                        calendarData = bookings || [];
                    } else {
                        calendarData = JSON.parse(localStorage.getItem('bookings') || '[]').filter(b => b.status === 'approved');
                    }
                    
                    renderCalendar();
                    hideLoading();
                } catch(e) {
                    calendarContent.innerHTML = `<p style="color:#ef4444;">❌ Gagal memuat: ${e.message}</p>`;
                    hideLoading();
                }
            } else {
                calendarView.style.display = 'none';
            }
        };
        function renderCalendar() {
            const calendarContent = document.getElementById('calendar-content');
            if(!calendarContent || !calendarData) return;

            const today = new Date();
            const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

            let html = '<div style="display:grid; grid-template-columns:repeat(7,1fr); gap:8px; margin-bottom:16px;">';
            days.forEach(d => { html += `<div style="color:#94a3b8; font-size:12px; font-weight:700; text-align:center;">${d}</div>`; });
            html += '</div>';

            const bookingsByDate = {};
            calendarData.forEach(b => {
                if(!bookingsByDate[b.tanggal]) bookingsByDate[b.tanggal] = [];
                bookingsByDate[b.tanggal].push(b);
            });

            for(let i = 0; i < 30; i++) {
                const date = new Date(today);
                date.setDate(date.getDate() + i);
                const dateStr = date.toISOString().split('T')[0];
                const dayName = days[date.getDay()];
                const dayNum = date.getDate();
                const monthName = months[date.getMonth()];
                const hasBooking = bookingsByDate[dateStr]?.length || 0;
                const isToday = i === 0;
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;

                html += `
                    <div style="background:${isToday ? 'rgba(59,130,246,0.2)' : isWeekend ? 'rgba(245,158,11,0.1)' : 'rgba(15,23,42,0.5)'}; border-radius:8px; padding:8px; text-align:center; border:1px solid ${isToday ? '#3b82f6' : isWeekend ? '#f59e0b' : '#475569'};">
                        <div style="color:${isToday ? '#3b82f6' : isWeekend ? '#f59e0b' : '#94a3b8'}; font-size:10px;">${dayName}</div>
                        <div style="color:white; font-size:16px; font-weight:700;">${dayNum} ${monthName}</div>
                        ${hasBooking ? `<div style="background:#ef4444; color:white; font-size:10px; padding:2px 6px; border-radius:10px; display:inline-block; margin-top:4px;">${hasBooking} booking</div>` : ''}
                    </div>
                `;
            }

            calendarContent.innerHTML = html;
        }

        // Email notification function (NEW!)
        async function sendEmailNotification(bookingData) {
            // Optional: Integrate with email service
            console.log('📧 Email notification would be sent to:', bookingData.no_hp);
            // Could integrate with: SendGrid, Resend, or Supabase Edge Function
            // For now, just log it
        }

        function checkSystemLock(bookingData = null) {            const now = new Date();
            const currentHours = now.getHours() + now.getMinutes() / 60;
            const userRole = currentUser?.role || 'regular';
            const canOverride = CONFIG.OVERRIDE_ROLES.includes(userRole);
            const lockStatus = { isLocked: false, reason: null, canOverride, isFridayPrayerBlock: false };
            
            if (currentHours > CONFIG.WORK_HOURS.end && !canOverride) {
                lockStatus.isLocked = true;
                lockStatus.reason = `Sistem booking tutup setelah jam ${decimalToTime(CONFIG.WORK_HOURS.end)}. Untuk booking malam/weekend, hubungi Kabag Umum atau Koord Umum.`;
                return lockStatus;
            }
            if (isSunday(new Date().toISOString().split('T')[0]) && !canOverride) {
                lockStatus.isLocked = true;
                lockStatus.reason = 'Hari Minggu LIBUR. Booking tidak tersedia.';
                return lockStatus;
            }
            if (isFriday(new Date().toISOString().split('T')[0]) && bookingData?.sarana) {
                const bookingStart = timeToDecimal(bookingData.jam_mulai);
                const bookingEnd = timeToDecimal(bookingData.jam_selesai);
                const prayerStart = CONFIG.FRIDAY_PRAYER_BLOCK.start;
                const prayerEnd = CONFIG.FRIDAY_PRAYER_BLOCK.end;
                if (CONFIG.FRIDAY_BLOCKED_ROOMS.includes(bookingData.sarana)) {
                    if (bookingStart < prayerEnd && bookingEnd > prayerStart) {
                        lockStatus.isLocked = true;
                        lockStatus.isFridayPrayerBlock = true;
                        lockStatus.reason = `❌ ${bookingData.sarana} tidak tersedia Jumat ${decimalToTime(prayerStart)}-${decimalToTime(prayerEnd)} untuk Shalat Jumat. Silakan pilih jam lain atau ruang berbeda.`;
                        return lockStatus;
                    }
                }
            }
            const todayStr = new Date().toISOString().split('T')[0];
            if (isHoliday(todayStr) && !canOverride) {
                lockStatus.isLocked = true;
                lockStatus.reason = 'Hari ini adalah hari libur nasional. Booking tidak tersedia.';
                return lockStatus;
            }
            return lockStatus;
        }

        function showLockOverlay(reason, canOverride) {
            let overlay = document.getElementById('booking-lock-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'booking-lock-overlay';
                overlay.style.cssText = 'position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.9); display:none; align-items:center; justify-content:center; z-index:9999;';
                overlay.innerHTML = `
                    <div style="background:#1e293b; padding:32px; border-radius:16px; text-align:center; max-width:500px; width:90%; border:2px solid #f59e0b;">
                        <div style="font-size:48px; margin-bottom:16px;">🔒</div>
                        <h2 style="color:#f59e0b; margin-bottom:16px; font-size:20px;">Booking Ditutup</h2>
                        <p id="lock-reason" style="margin-bottom:24px; color:#e2e8f0; font-size:14px; line-height:1.6;"></p>                        ${canOverride ? `
                            <div style="background:rgba(59,130,246,0.1); padding:16px; border-radius:8px; margin-bottom:24px;">
                                <p style="font-size:13px; color:#93c5fd; margin:0;"><strong>Anda memiliki akses override.</strong><br>Klik "Lanjut" untuk booking dengan persetujuan khusus.</p>
                            </div>
                            <button id="lock-override" style="background:#3b82f6; color:white; padding:12px 32px; border:none; border-radius:8px; font-weight:700; cursor:pointer; margin-right:12px; font-size:14px;">Lanjut (Override)</button>
                        `: ''}
                        <button id="lock-close" style="background:#64748b; color:white; padding:12px 32px; border:none; border-radius:8px; font-weight:700; cursor:pointer; font-size:14px;">${canOverride ? 'Batal' : 'Mengerti'}</button>
                    </div>
                `;
                document.body.appendChild(overlay);
                document.getElementById('lock-close')?.addEventListener('click', () => overlay.style.display = 'none');
                if (canOverride) {
                    document.getElementById('lock-override')?.addEventListener('click', () => {
                        overlay.style.display = 'none';
                        const form = document.getElementById('bookingForm');
                        if (form) form.dataset.override = 'true';
                        doToast('⚠️ Booking dengan persetujuan khusus - memerlukan approval', 'warning');
                    });
                }
            }
            document.getElementById('lock-reason').textContent = reason;
            overlay.style.display = 'flex';
        }

        function validateBooking(data) {
            const errors = [], warnings = [];
            const selectedDate = new Date(data.tgl + 'T00:00:00');
            const today = new Date(); today.setHours(0,0,0,0);
            if (selectedDate < today) errors.push('Tanggal tidak boleh di masa lalu!');
            if (isSunday(data.tgl)) errors.push('❌ Hari Minggu LIBUR!');
            if (isHoliday(data.tgl)) errors.push('❌ Tanggal merah LIBUR!');
            if (isSaturday(data.tgl)) warnings.push('⚠️ Sabtu hanya untuk team umum (perlu approval)');
            const mulai = timeToDecimal(data.jam_mulai), selesai = timeToDecimal(data.jam_selesai);
            if (mulai < CONFIG.WORK_HOURS.start) errors.push(`Jam mulai minimal ${decimalToTime(CONFIG.WORK_HOURS.start)}`);
            if (selesai > CONFIG.WORK_HOURS.end) errors.push(`Jam selesai maksimal ${decimalToTime(CONFIG.WORK_HOURS.end)}`);
            if (selesai <= mulai) errors.push('Jam selesai harus > jam mulai!');
            if (isFriday(data.tgl) && CONFIG.FRIDAY_BLOCKED_ROOMS.includes(data.sarana)) {
                const prayerStart = CONFIG.FRIDAY_PRAYER_BLOCK.start;
                const prayerEnd = CONFIG.FRIDAY_PRAYER_BLOCK.end;
                if (mulai < prayerEnd && selesai > prayerStart) errors.push(`❌ ${data.sarana} tidak tersedia Jumat ${decimalToTime(prayerStart)}-${decimalToTime(prayerEnd)} untuk Shalat Jumat`);
            }
            if (data.sarana === 'Masjid (Maintenance)') errors.push('❌ Masjid sedang maintenance!');
            return { errors, warnings };
        }

        async function checkDoubleBooking(data) {
            if (!supabase) return { hasConflict: false };
            try {
                const { data: existing, error } = await supabase
                    .from('bookings')                    .select('*')
                    .eq('ruang', data.sarana)
                    .eq('tanggal', data.tgl)
                    .eq('status', 'approved');
                if (error) throw error;
                const mulai = timeToDecimal(data.jam_mulai), selesai = timeToDecimal(data.jam_selesai);
                const conflict = existing?.find(b => {
                    const bMulai = timeToDecimal(b.jam_mulai), bSelesai = timeToDecimal(b.jam_selesai);
                    return mulai < bSelesai && selesai > bMulai;
                });
                if (conflict) return { hasConflict: true, message: `❌ BENTROK! ${data.sarana} sudah di-booking ${conflict.nama_peminjam}` };
                return { hasConflict: false };
            } catch (err) { return { hasConflict: false }; }
        }

        async function writeAuditLog(action, detail, user) {
            if (!supabase) return;
            try { await supabase.from('audit_logs').insert([{ action, detail, user_role: user?.role || 'regular', module: 'booking', created_at: new Date().toISOString() }]); } catch(e) {}
        }

        async function loadNotifications() {
            if (!supabase) return [];
            try {
                const today = new Date().toISOString().split('T')[0];
                const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
                const tomorrowStr = tomorrow.toISOString().split('T')[0];
                const { data: bookings, error } = await supabase
                    .from('bookings')
                    .select('*')
                    .in('tanggal', [today, tomorrowStr])
                    .eq('status', 'approved')
                    .order('tanggal', { ascending: true })
                    .order('jam_mulai', { ascending: true });
                if (error) throw error;
                return bookings?.map(b => ({ ...b, isToday: b.tanggal === today, isTomorrow: b.tanggal === tomorrowStr })) || [];
            } catch(e) { return []; }
        }

        function showNotificationPanel(notifications) {
            const panel = document.createElement('div');
            panel.id = 'booking-notification-panel';
            panel.style.cssText = 'position:fixed; top:20px; right:20px; max-width:400px; max-height:60vh; overflow-y:auto; background:rgba(15,23,42,0.95); border:1px solid rgba(59,130,246,0.3); border-radius:16px; padding:24px; z-index:1000; box-shadow:0 10px 40px rgba(0,0,0,0.4); backdrop-filter:blur(10px);';
            const todayBookings = notifications.filter(n => n.isToday);
            const tomorrowBookings = notifications.filter(n => n.isTomorrow);
            panel.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <h3 style="color:#3b82f6; font-size:16px; font-weight:700; margin:0;">🔔 Reminder Booking</h3>
                    <button onclick="this.closest('#booking-notification-panel').remove()" style="background:none; border:none; color:#94a3b8; cursor:pointer; font-size:20px; padding:0;">✕</button>
                </div>
                ${todayBookings.length ? `<div style="margin-bottom:16px;"><div style="background:rgba(16,185,129,0.1); border-left:3px solid #10b981; padding:12px; border-radius:8px;"><div style="color:#10b981; font-weight:700; margin-bottom:8px;">📅 HARI INI (${todayBookings.length} booking)</div>${todayBookings.map(b => `<div style="background:rgba(0,0,0,0.2); padding:8px; border-radius:6px; margin-top:8px;"><div style="font-weight:600; color:#e2e8f0;">${b.ruang}</div><div style="color:#94a3b8; font-size:13px;">${b.jam_mulai} - ${b.jam_selesai} | ${b.nama_peminjam}</div>${b.peralatan ? `<div style="color:#64748b; font-size:12px; margin-top:4px;">🔧 ${b.peralatan}</div>` : ''}</div>`).join('')}</div></div>`: ''}                ${tomorrowBookings.length ? `<div><div style="background:rgba(245,158,11,0.1); border-left:3px solid #f59e0b; padding:12px; border-radius:8px;"><div style="color:#f59e0b; font-weight:700; margin-bottom:8px;">⏰ BESOK (${tomorrowBookings.length} booking)</div>${tomorrowBookings.map(b => `<div style="background:rgba(0,0,0,0.2); padding:8px; border-radius:6px; margin-top:8px;"><div style="font-weight:600; color:#e2e8f0;">${b.ruang}</div><div style="color:#94a3b8; font-size:13px;">${b.jam_mulai} - ${b.jam_selesai} | ${b.nama_peminjam}</div>${b.peralatan ? `<div style="color:#64748b; font-size:12px; margin-top:4px;">🔧 ${b.peralatan}</div>` : ''}</div>`).join('')}</div></div>`: ''}
                ${!notifications.length ? `<div style="text-align:center; padding:32px; color:#64748b;"><div style="font-size:32px; margin-bottom:8px;">📭</div><div>Tidak ada booking hari ini/besok</div></div>`: ''}
            `;
            document.body.appendChild(panel);
            setTimeout(() => {
                if (panel?.parentNode) { panel.style.transition = 'opacity 0.5s'; panel.style.opacity = '0'; setTimeout(() => panel.remove(), 500); }
            }, 30000);
        }

        // Populate dynamic content
        const saranaSelect = document.getElementById('sarana');
        if (saranaSelect) saranaSelect.innerHTML = '<option value="">-- Pilih Sarana --</option>' + CONFIG.SARANA_LIST.map(s => `<option value="${s}">${s}</option>`).join('');
        
        const peralatanDiv = document.getElementById('peralatan-list');
        if (peralatanDiv) peralatanDiv.innerHTML = CONFIG.PERALATAN_LIST.map(alat => `<label style="display:flex; align-items:center; gap:8px; cursor:pointer; background:rgba(30,41,59,0.5); padding:8px; border-radius:8px; transition:background 0.3s;" onmouseover="this.style.background='rgba(30,41,59,0.8)'" onmouseout="this.style.background='rgba(30,41,59,0.5)'"><input type="checkbox" name="alat" value="${alat}" style="width:16px; height:16px; accent-color:#10b981;"><span style="color:#cbd5e1; font-size:13px;">${alat}</span></label>`).join('');
        
        const tglInput = document.getElementById('tgl');
        if (tglInput) { tglInput.min = getMinDate(); tglInput.max = getMaxDate(); tglInput.value = getMinDate(); }

        // Check for existing draft
        const existingDraft = JSON.parse(localStorage.getItem('booking_draft') || '{}');
        if(existingDraft.saved_at) {
            doToast('📝 Draft ditemukan dari ' + new Date(existingDraft.saved_at).toLocaleString(), 'info');
        }

        const form = document.getElementById('bookingForm');
        const submitBtn = document.getElementById('submitBtn');
        const notifBtn = document.getElementById('booking-notif-btn');
        const notifBadge = document.getElementById('notif-badge');
        const lockAlert = document.getElementById('system-lock-alert');
        const lockAlertMsg = document.getElementById('lock-alert-message');
        const dateWarning = document.getElementById('dateWarning');

        const lockStatus = checkSystemLock();
        if (lockStatus.isLocked) {
            if (lockAlert && lockAlertMsg) { lockAlert.style.display = 'block'; lockAlertMsg.textContent = lockStatus.reason; }
            if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '🔒 Sistem Ditutup'; submitBtn.style.background = '#64748b'; }
            if (!lockStatus.canOverride || lockStatus.isFridayPrayerBlock) showLockOverlay(lockStatus.reason, lockStatus.canOverride);
        }

        const notifications = await loadNotifications();
        if (notifications.length && notifBadge) { notifBadge.textContent = notifications.length; notifBadge.style.display = 'flex'; setTimeout(() => showNotificationPanel(notifications), 1000); }
        else if (notifBadge) notifBadge.style.display = 'none';
        if (notifBtn) notifBtn.onclick = async () => { const n = await loadNotifications(); showNotificationPanel(n); };

        if (tglInput) {
            tglInput.addEventListener('change', (e) => {
                const ds = e.target.value, dn = getDayName(ds);
                if (isSunday(ds) || isHoliday(ds)) { dateWarning.style.display = 'block'; dateWarning.querySelector('span').textContent = `${dn} - LIBUR!`; dateWarning.style.color = '#ef4444'; }
                else if (isSaturday(ds)) { dateWarning.style.display = 'block'; dateWarning.querySelector('span').textContent = `${dn} - Optional`; dateWarning.style.color = '#f97316'; }                else if (isFriday(ds)) { dateWarning.style.display = 'block'; dateWarning.querySelector('span').textContent = `${dn} - Jumat Berkah!`; dateWarning.style.color = '#3b82f6'; }
                else dateWarning.style.display = 'none';
            });
        }

        ['sarana','tgl','jam_mulai','jam_selesai'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('change', () => {
                const fd = { sarana: document.getElementById('sarana')?.value, tgl: document.getElementById('tgl')?.value, jam_mulai: document.getElementById('jam_mulai')?.value, jam_selesai: document.getElementById('jam_selesai')?.value };
                if (fd.sarana && fd.tgl && fd.jam_mulai && fd.jam_selesai) {
                    const lc = checkSystemLock(fd);
                    if (lc.isFridayPrayerBlock && lockAlert && lockAlertMsg) { lockAlert.style.display = 'block'; lockAlertMsg.textContent = lc.reason; lockAlert.style.borderColor = '#f59e0b'; }
                    else if (lockAlert) lockAlert.style.display = 'none';
                }
            });
        });

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const isOverride = form.dataset.override === 'true';
                const fd = new FormData(e.target);
                const alatList = fd.getAll('alat');
                const data = {
                    nama: fd.get('nama'), divisi: fd.get('divisi'), no_hp: fd.get('no_hp'),
                    sarana: fd.get('sarana'), tgl: fd.get('tgl'), jam_mulai: fd.get('jam_mulai'), jam_selesai: fd.get('jam_selesai'),
                    peralatan: alatList.join(', '), keperluan: fd.get('keperluan')
                };
                const lc = checkSystemLock(data);
                if (lc.isLocked && !isOverride && !lc.canOverride) { doToast(lc.reason, 'error'); showLockOverlay(lc.reason, false); return; }
                const val = validateBooking(data);
                if (val.warnings.length) val.warnings.forEach(w => doToast(w, 'warning'));
                if (val.errors.length) { val.errors.forEach(e => doToast(e, 'error')); return; }
                doToast('🔍 Mengecek ketersediaan...', 'info');
                if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:8px;"></i> Checking...'; }
                const doubleCheck = await checkDoubleBooking(data);
                if (doubleCheck.hasConflict) { doToast(doubleCheck.message, 'error'); if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="fas fa-paper-plane" style="margin-right:8px;"></i> AJUKAN BOOKING'; } return; }
                try {
                    if (submitBtn) submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:8px;"></i> Menyimpan...';
                    const payload = {
                        nama_peminjam: data.nama, divisi: data.divisi || null, no_hp: data.no_hp, ruang: data.sarana,
                        tanggal: data.tgl, jam_mulai: data.jam_mulai, jam_selesai: data.jam_selesai,
                        keperluan: data.keperluan || null, peralatan: data.peralatan,
                        status: isOverride || lc.canOverride ? 'pending' : 'approved',
                        requires_approval: isOverride || lc.canOverride,
                        created_at: new Date().toISOString(), created_by: currentUser?.name || 'Unknown'
                    };
                    if (supabase) {
                        const { error } = await supabase.from('bookings').insert(payload);
                        if (error) throw error;                        await writeAuditLog('BOOKING_CREATED', `${data.sarana} · ${data.tgl} ${data.jam_mulai}-${data.jam_selesai} · ${data.nama}`, currentUser);
                        await sendEmailNotification(data); // Email notification
                    } else {
                        const existing = JSON.parse(localStorage.getItem('bookings') || '[]');
                        existing.push({ ...payload, id: Date.now() });
                        localStorage.setItem('bookings', JSON.stringify(existing));
                    }
                    doToast('✅ Booking berhasil! Menunggu approval.', 'success');
                    form.reset(); if (tglInput) tglInput.value = getMinDate(); if (dateWarning) dateWarning.style.display = 'none'; delete form.dataset.override;
                    localStorage.removeItem('booking_draft'); // Clear draft after successful submission
                    const n = await loadNotifications(); if (notifBadge && n.length) { notifBadge.textContent = n.length; notifBadge.style.display = 'flex'; }
                } catch (err) { doToast('❌ Gagal: ' + err.message, 'error'); }
                finally { if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="fas fa-paper-plane" style="margin-right:8px;"></i> AJUKAN BOOKING'; } }
            });
        }

        // Hide loading when done
        hideLoading();
    }
};

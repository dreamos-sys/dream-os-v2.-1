// ════════════════════════════════════════════
// FILE: js/utils/database.js
// ════════════════════════════════════════════

import { createClient } from '@supabase/supabase-js';
global.window = global;
global.DREAM = { config: { supabase: { url: 'https://xyz.supabase.co', key: 'eyJhbG...' } } };

export const Database = {
    client: null,
    connected: false,
    
    init() {
        const config = window.DREAM?.config?.supabase;
        if (!config) {
            console.error('❌ [DB] Supabase config not found');
            return false;
        }
        
        this.client = createClient(config.url, config.key);
        this.connected = true;
        console.log('✅ [DB] Supabase connected');
        return true;
    },
    
    // BOOKING MODULE
    async createBooking(data) {
        if (!this.connected) return this.saveLocal('bookings', data);
        
        try {
            const { data: result, error } = await this.client
                .from('bookings')
                .insert([{
                    room: data.room,
                    user: data.user,
                    date: data.date,
                    time_start: data.time_start,
                    time_end: data.time_end,
                    purpose: data.purpose,
                    status: 'pending',
                    created_at: new Date().toISOString()
                }]);
            
            if (error) throw error;
            console.log('✅ [DB] Booking created:', result);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [DB] Booking failed:', error);
            return { success: false, error: error.message };
        }
    },
        async getBookings(filters = {}) {
        if (!this.connected) return this.getLocal('bookings');
        
        try {
            let query = this.client.from('bookings').select('*');
            
            if (filters.date) {
                query = query.eq('date', filters.date);
            }
            if (filters.user) {
                query = query.eq('user', filters.user);
            }
            if (filters.status) {
                query = query.eq('status', filters.status);
            }
            
            const { data, error } = await query;
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error('❌ [DB] Get bookings failed:', error);
            return { success: false, error: error.message };
        }
    },
    
    // K3 REPORTS
    async createK3Report(data) {
        if (!this.connected) return this.saveLocal('k3_reports', data);
        
        try {
            const { data: result, error } = await this.client
                .from('k3_reports')
                .insert([{
                    type: data.type,
                    location: data.location,
                    description: data.description,
                    priority: data.priority || 'normal',
                    reported_by: data.user,
                    status: 'pending',
                    created_at: new Date().toISOString()
                }]);
            
            if (error) throw error;
            console.log('✅ [DB] K3 Report created:', result);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [DB] K3 Report failed:', error);
            return { success: false, error: error.message };
        }    },
    
    // SECURITY LOGS
    async createSecurityLog(data) {
        if (!this.connected) return this.saveLocal('security_logs', data);
        
        try {
            const { data: result, error } = await this.client
                .from('security_logs')
                .insert([{
                    officer: data.officer,
                    shift: data.shift,
                    report: data.report,
                    incident: data.incident || false,
                    created_at: new Date().toISOString()
                }]);
            
            if (error) throw error;
            console.log('✅ [DB] Security log created:', result);
            return { success: true, data: result };
        } catch (error) {
            console.error('❌ [DB] Security log failed:', error);
            return { success: false, error: error.message };
        }
    },
    
    // LOCAL STORAGE FALLBACK
    saveLocal(collection, data) {
        const key = `dreamos_${collection}`;
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push({ ...data, id: crypto.randomUUID(), local: true });
        localStorage.setItem(key, JSON.stringify(existing));
        console.log('💾 [DB] Saved locally:', collection);
        return { success: true, local: true };
    },
    
    getLocal(collection) {
        const key = `dreamos_${collection}`;
        const data = JSON.parse(localStorage.getItem(key) || '[]');
        return { success: true, data, local: true };
    }
};

// Auto-init
Database.init();

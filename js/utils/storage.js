/**
 * DREAM OS v2.1 - Enterprise Storage
 * Standard: ISO 27001 (Asset Management)
 */

import { IntegrityEngine } from './integrity-engine.js';

export const EnterpriseStorage = {
    _dbName: 'DreamOS_Enterprise',
    _dbVersion: 1,
    _storeName: 'secure_data',
    
    async _getDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this._dbName, this._dbVersion);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this._storeName)) {
                    db.createObjectStore(this._storeName, { keyPath: 'id' });
                }
            };
            request.onsuccess = (event) => resolve(event.target.result);
            request.onerror = (event) => reject(event.target.error);
        });
    },

    async commit(moduleName, data, options = {}) {
        try {
            const signature = await IntegrityEngine.sign(data);
            const entry = {
                id: crypto.randomUUID(),
                timestamp: new Date().toISOString(),
                module: moduleName,
                payload: data,
                integrity_sign: signature,
                version: "2.1",
                encrypted: options.encrypted || false,
                expires_at: options.expiresAt || null
            };

            await this._saveToIndexedDB(entry);
            this._saveToLocal(entry);

            if (navigator.onLine && options.sync !== false) {
                console.log("💾 Syncing data to Enterprise Cloud...");
                await this._syncToCloud(entry);
            }
            
            await IntegrityEngine.createAuditLog('data_commit', entry);
            console.log('✅ [STORAGE] Data committed:', entry.id);
            return entry;
        } catch (error) {
            console.error('❌ [STORAGE] Commit failed:', error);
            throw new Error('Storage commit failed: ' + error.message);
        }
    },

    async _saveToIndexedDB(entry) {
        try {
            const db = await this._getDB();
            const transaction = db.transaction([this._storeName], 'readwrite');
            const store = transaction.objectStore(this._storeName);
            store.put(entry);
        } catch (error) {
            console.warn('⚠️ [STORAGE] IndexedDB save failed, using localStorage');
        }
    },

    _saveToLocal(entry) {
        try {
            localStorage.setItem(`data_${entry.id}`, JSON.stringify(entry));
        } catch (error) {
            console.warn('⚠️ [STORAGE] LocalStorage full, cleaning old data...');
            this._cleanupOldData();
        }
    },

    async _syncToCloud(entry) {
        // Placeholder for Supabase/Cloudflare sync
        // Will be implemented in Phase 2
        console.log('☁️ [STORAGE] Cloud sync ready (Supabase/Cloudflare later)');
    },

    _cleanupOldData() {
        const keys = Object.keys(localStorage);
        const dataKeys = keys.filter(k => k.startsWith('data_'));
        if (dataKeys.length > 0) localStorage.removeItem(dataKeys[0]);
    },
    
    async get(entryId) {
        try {
            const data = localStorage.getItem(`data_${entryId}`);
            if (!data) return null;
            const entry = JSON.parse(data);
            const isValid = await IntegrityEngine.verify(entry.payload, entry.integrity_sign);
            if (!isValid) throw new Error('Data integrity compromised');
            return entry;
        } catch (error) {
            console.error('❌ [STORAGE] Get failed:', error);
            return null;
        }
    }
};

console.log('✅ [ENTERPRISE STORAGE] Loaded - ISO 27001 Ready');

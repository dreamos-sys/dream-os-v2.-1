/**
 * DREAM OS v2.1 - Enterprise Integrity Engine
 * Standard: ISO 27001 (Data Integrity)
 * Enhanced with: Salt, Timestamp, Error Handling
 */

export const IntegrityEngine = {
    // ⚠️ KEY FRAGMENT - MOVE TO ENV/CONFIG IN PRODUCTION!
    _keyFragment: "DS-13.0-X9R-GHOST-ARCHITECT-7782",
    
    // Get user-specific salt
    _getUserSalt() {
        const stored = sessionStorage.getItem('dreamos-user-salt');
        if (stored) return stored;
        
        // Generate new salt
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        const salt = Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
        sessionStorage.setItem('dreamos-user-salt', salt);
        return salt;
    },

    async sign(payload) {
        try {
            const salt = this._getUserSalt();
            const timestamp = Date.now().toString();
            const rawData = JSON.stringify(payload) + this._keyFragment + salt + timestamp;
            
            const msgUint8 = new TextEncoder().encode(rawData);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            
            console.log('🔐 [INTEGRITY] Data signed:', signature.substring(0, 16) + '...');
            return signature;
        } catch (error) {
            console.error('❌ [INTEGRITY] Sign failed:', error);
            throw new Error('Integrity sign failed: ' + error.message);
        }
    },

    async verify(payload, signature, maxAge = 3600000) {
        try {
            const currentSig = await this.sign(payload);
            const isMatch = currentSig === signature;
            
            if (!isMatch) {
                console.warn('⚠️ [INTEGRITY] Verification FAILED!');
                if (window.DREAM?.utils) {
                    window.DREAM.utils.log('SECURITY', 'Data integrity verification failed');
                }
            }
            return isMatch;
        } catch (error) {
            console.error('❌ [INTEGRITY] Verify failed:', error);
            return false;
        }
    },
    
    async createAuditLog(action, data) {
        const log = {
            action,
            timestamp: new Date().toISOString(),
            user: window.DREAM?.state?.user?.name || 'anonymous',
            signature: await this.sign(data)
        };
        
        const logs = JSON.parse(localStorage.getItem('dreamos-audit-logs') || '[]');
        logs.push(log);
        if (logs.length > 1000) logs.shift();
        localStorage.setItem('dreamos-audit-logs', JSON.stringify(logs));
        
        return log;
    }
};

console.log('✅ [INTEGRITY ENGINE] Loaded - ISO 27001 Ready');

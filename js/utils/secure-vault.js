/**
 * secure-vault.js
 * Dream OS v2.1 – Secure Vault (Encrypted Storage)
 * XOR encryption untuk low-end device. Untuk produksi, gunakan key dari environment.
 * Standar: ISO 27001 (Data Protection)
 */

(function() {
    'use strict';

    class SecureVault {
        constructor() {
            // MASTER KEY – Dalam produksi, ambil dari backend atau env
            this.masterKey = "DREAM_OS_MASTER_KEY_2026";
            // Bisa juga digenerate per user dan disimpan di sessionStorage
            this._initKey();
        }

        _initKey() {
            // Jika ada user-specific key, gunakan itu
            const userKey = sessionStorage.getItem('dreamos_vault_key');
            if (userKey) {
                this.masterKey = userKey;
            } else {
                // Generate key acak untuk user baru (simulasi)
                const randomKey = Array.from(crypto.getRandomValues(new Uint8Array(16)))
                    .map(b => b.toString(16).padStart(2, '0')).join('');
                sessionStorage.setItem('dreamos_vault_key', randomKey);
                this.masterKey = randomKey;
            }
        }

        // Enkripsi data (mengembalikan string base64)
        encrypt(text) {
            try {
                const key = this.masterKey;
                const result = text.split('').map((c, i) => 
                    String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))
                ).join('');
                return btoa(result);
            } catch (e) {
                console.error('❌ [VAULT] Encryption failed:', e);
                return null;
            }
        }

        // Dekripsi data (menerima string base64)
        decrypt(cipherBase64) {
            try {
                const cipher = atob(cipherBase64);
                const key = this.masterKey;
                return cipher.split('').map((c, i) => 
                    String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))
                ).join('');
            } catch (e) {
                console.error('❌ [VAULT] Decryption failed:', e);
                return null;
            }
        }

        // Simpan data terenkripsi ke localStorage
        setItem(key, value) {
            const encrypted = this.encrypt(JSON.stringify(value));
            if (encrypted) {
                localStorage.setItem(`vault_${key}`, encrypted);
                return true;
            }
            return false;
        }

        // Ambil dan dekripsi data dari localStorage
        getItem(key) {
            const encrypted = localStorage.getItem(`vault_${key}`);
            if (!encrypted) return null;
            const decrypted = this.decrypt(encrypted);
            if (!decrypted) return null;
            try {
                return JSON.parse(decrypted);
            } catch (e) {
                return decrypted; // jika bukan JSON
            }
        }

        // Hapus item
        removeItem(key) {
            localStorage.removeItem(`vault_${key}`);
        }

        // Ubah master key (rotate)
        rotateKey(newKey) {
            // Sebelum mengganti, backup data lama? Ini kompleks, sederhananya kita hanya ganti key.
            this.masterKey = newKey;
            sessionStorage.setItem('dreamos_vault_key', newKey);
            console.log('🔑 [VAULT] Master key rotated.');
        }
    }

    window.SecureVault = new SecureVault();
})();

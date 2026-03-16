/**
 * Device Fingerprint & Security
 * Dream OS 2026 - Enterprise Security Module
 * ISO 27001 Compliant
 */

(function() {
    'use strict';
    console.log('🔐 [DEVICE FINGERPRINT] Initializing...');
    
    class DeviceFingerprint {
        constructor() {
            this.components = {};
            this.hash = null;
            this.deviceId = null;
        }
        
        async collect() {
            this.components.userAgent = navigator.userAgent;
            this.components.language = navigator.language;
            this.components.platform = navigator.platform;
            this.components.hardwareConcurrency = navigator.hardwareConcurrency || 'unknown';
            this.components.deviceMemory = navigator.deviceMemory || 'unknown';
            this.components.screenResolution = `${screen.width}x${screen.height}`;
            this.components.colorDepth = screen.colorDepth;
            this.components.pixelRatio = window.devicePixelRatio || 1;
            this.components.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            this.components.canvas = await this.getCanvasFingerprint();
            this.components.webgl = await this.getWebGLFingerprint();
            this.components.audio = await this.getAudioFingerprint();
            if (navigator.connection) {
                this.components.network = {
                    type: navigator.connection.effectiveType,
                    downlink: navigator.connection.downlink,
                    rtt: navigator.connection.rtt
                };
            }
            if (navigator.getBattery) {
                try {
                    const battery = await navigator.getBattery();
                    this.components.battery = { level: battery.level, charging: battery.charging };
                } catch(e) {}
            }
            this.hash = await this.generateHash();
            this.deviceId = this.getOrCreateDeviceId();
            return { hash: this.hash, deviceId: this.deviceId, components: this.components, timestamp: new Date().toISOString() };
        }
        
        async getCanvasFingerprint() {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 200; canvas.height = 50;
                ctx.textBaseline = 'top';
                ctx.font = '14px Arial';
                ctx.fillStyle = '#f60';
                ctx.fillRect(125, 1, 62, 20);
                ctx.fillStyle = '#069';
                ctx.fillText('Dream OS Fingerprint 🔐', 2, 15);
                ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
                ctx.fillText('Dream OS Fingerprint 🔐', 4, 17);
                return canvas.toDataURL();
            } catch(e) { return 'canvas_unavailable'; }
        }
        
        async getWebGLFingerprint() {
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                if (!gl) return 'webgl_unavailable';
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (!debugInfo) return 'webgl_no_debug_info';
                return { vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL), renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) };
            } catch(e) { return 'webgl_error'; }
        }
        
        async getAudioFingerprint() {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (!AudioContext) return 'audio_unavailable';
                const context = new AudioContext();
                const oscillator = context.createOscillator();
                const analyser = context.createAnalyser();
                const gain = context.createGain();
                oscillator.connect(analyser);
                analyser.connect(gain);
                gain.connect(context.destination);
                oscillator.type = 'triangle';
                oscillator.frequency.value = 10000;
                gain.gain.value = 0;
                oscillator.start();
                const buffer = new Float32Array(context.sampleRate * 0.1);
                analyser.getFloatTimeDomainData(buffer);
                oscillator.stop();
                context.close();
                return Array.from(buffer).slice(0, 100).join(',');
            } catch(e) { return 'audio_error'; }
        }
        
        async generateHash() {
            const data = JSON.stringify(this.components);
            const encoder = new TextEncoder();
            const dataBuffer = encoder.encode(data);
            const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }
        
        getOrCreateDeviceId() {
            const storageKey = 'dreamos_device_id';
            let deviceId = localStorage.getItem(storageKey);
            if (!deviceId) {
                deviceId = 'dev_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now().toString(36);
                localStorage.setItem(storageKey, deviceId);
            }
            return deviceId;
        }
        
        async isRecognizedDevice() {
            const knownDevices = JSON.parse(localStorage.getItem('dreamos_known_devices') || '[]');
            return knownDevices.includes(this.deviceId);
        }
        
        async registerDevice() {
            const knownDevices = JSON.parse(localStorage.getItem('dreamos_known_devices') || '[]');
            if (!knownDevices.includes(this.deviceId)) {
                knownDevices.push(this.deviceId);
                localStorage.setItem('dreamos_known_devices', JSON.stringify(knownDevices));
                await this.logDeviceRegistration();
                return true;
            }
            return false;
        }
        
        async logDeviceRegistration() {
            if (window.DREAM && window.DREAM.trackEvent) {
                window.DREAM.trackEvent('device_registered', { deviceId: this.deviceId, fingerprint: this.hash.substring(0, 16) + '...', timestamp: new Date().toISOString(), userAgent: navigator.userAgent });
            }
        }
        
        getRiskScore() {
            let score = 0;
            let risks = [];
            if (navigator.webdriver) { score += 30; risks.push('Automation detected'); }
            if (this.components.timezone === 'UTC') { score += 10; risks.push('UTC timezone (suspicious)'); }
            if (this.components.hardwareConcurrency === 'unknown') { score += 10; risks.push('Hardware info hidden'); }
            if (!localStorage.getItem('dreamos_device_id')) { score += 20; risks.push('New device'); }
            return { score: Math.min(score, 100), level: score < 20 ? 'low' : score < 50 ? 'medium' : 'high', risks };
        }
    }
    
    class BiometricAuth {
        constructor() { this.isSupported = window.PublicKeyCredential !== undefined; }
        async isAvailable() {
            if (!this.isSupported) return { available: false, reason: 'WebAuthn not supported' };
            try {
                const isPlatformSupported = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
                return { available: isPlatformSupported, reason: isPlatformSupported ? 'Ready' : 'No biometric sensor' };
            } catch(e) { return { available: false, reason: e.message }; }
        }
        generateChallenge() {
            const array = new Uint8Array(32);
            crypto.getRandomValues(array);
            return array;
        }
        stringToBuffer(str) { return new TextEncoder().encode(str); }
        bufferToString(buffer) { return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join(''); }
        async register(username) {
            try {
                const publicKeyOptions = {
                    challenge: this.generateChallenge(),
                    rp: { name: 'Dream OS 2026', id: window.location.hostname },
                    user: { id: this.stringToBuffer(username), name: username, displayName: username },
                    pubKeyCredParams: [ { type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 } ],
                    authenticatorSelection: { authenticatorAttachment: 'platform', userVerification: 'required' },
                    timeout: 60000, attestation: 'none'
                };
                const credential = await navigator.credentials.create({ publicKey: publicKeyOptions });
                const credentialId = this.bufferToString(credential.rawId);
                localStorage.setItem('dreamos_biometric_credential', credentialId);
                return { success: true, credentialId };
            } catch(e) { return { success: false, error: e.message }; }
        }
        async authenticate() {
            try {
                const credentialId = localStorage.getItem('dreamos_biometric_credential');
                if (!credentialId) return { success: false, error: 'No biometric credential registered' };
                const publicKeyOptions = {
                    challenge: this.generateChallenge(),
                    allowCredentials: [ { type: 'public-key', id: this.stringToBuffer(credentialId) } ],
                    timeout: 60000, userVerification: 'required'
                };
                const assertion = await navigator.credentials.get({ publicKey: publicKeyOptions });
                return { success: true, verified: true };
            } catch(e) { return { success: false, error: e.message }; }
        }
    }
    
    window.DeviceFingerprint = new DeviceFingerprint();
    window.BiometricAuth = new BiometricAuth();
    
    (async function init() {
        try {
            const fingerprint = await window.DeviceFingerprint.collect();
            if (window.DREAM) {
                window.DREAM.state.deviceFingerprint = fingerprint.hash;
                window.DREAM.state.deviceId = fingerprint.deviceId;
            }
            const riskScore = window.DeviceFingerprint.getRiskScore();
            console.log('🔐 [SECURITY] Risk Score:', riskScore.score + '/100 (' + riskScore.level + ')');
            const biometric = await window.BiometricAuth.isAvailable();
            console.log('🔐 [BIOMETRIC] Available:', biometric.available, '-', biometric.reason);
        } catch(e) { console.error('❌ [DEVICE FINGERPRINT] Init failed:', e); }
    })();
})();

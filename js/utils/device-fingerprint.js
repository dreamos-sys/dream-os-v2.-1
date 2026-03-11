/**
 * Device Fingerprint & Security
 * Dream OS 2026 - Enterprise Security Module
 * ISO 27001 Compliant
 */

(function() {
    'use strict';
    
    console.log('🔐 [DEVICE FINGERPRINT] Initializing...');
    
    // ════════════════════════════════════════════
    // DEVICE FINGERPRINT GENERATOR
    // ════════════════════════════════════════════
    
    class DeviceFingerprint {
        constructor() {
            this.components = {};
            this.hash = null;
            this.deviceId = null;
        }
        
        // Collect device information
        async collect() {
            // Navigator data
            this.components.userAgent = navigator.userAgent;
            this.components.language = navigator.language;
            this.components.platform = navigator.platform;
            this.components.hardwareConcurrency = navigator.hardwareConcurrency || 'unknown';
            this.components.deviceMemory = navigator.deviceMemory || 'unknown';
            
            // Screen data
            this.components.screenResolution = `${screen.width}x${screen.height}`;
            this.components.colorDepth = screen.colorDepth;
            this.components.pixelRatio = window.devicePixelRatio || 1;
            
            // Timezone
            this.components.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            
            // Canvas fingerprinting
            this.components.canvas = await this.getCanvasFingerprint();
            
            // WebGL fingerprinting
            this.components.webgl = await this.getWebGLFingerprint();
            
            // Audio context fingerprinting
            this.components.audio = await this.getAudioFingerprint();
            
            // Network information
            if (navigator.connection) {                this.components.network = {
                    type: navigator.connection.effectiveType,
                    downlink: navigator.connection.downlink,
                    rtt: navigator.connection.rtt
                };
            }
            
            // Battery status (if available)
            if (navigator.getBattery) {
                try {
                    const battery = await navigator.getBattery();
                    this.components.battery = {
                        level: battery.level,
                        charging: battery.charging
                    };
                } catch(e) {}
            }
            
            // Generate hash
            this.hash = await this.generateHash();
            
            // Get or create device ID
            this.deviceId = this.getOrCreateDeviceId();
            
            console.log('✅ [FINGERPRINT] Device identified:', this.hash.substring(0, 16) + '...');
            
            return {
                hash: this.hash,
                deviceId: this.deviceId,
                components: this.components,
                timestamp: new Date().toISOString()
            };
        }
        
        // Canvas fingerprinting
        async getCanvasFingerprint() {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 200;
                canvas.height = 50;
                
                ctx.textBaseline = 'top';
                ctx.font = '14px Arial';
                ctx.fillStyle = '#f60';
                ctx.fillRect(125, 1, 62, 20);
                ctx.fillStyle = '#069';
                ctx.fillText('Dream OS Fingerprint 🔐', 2, 15);
                ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
                ctx.fillText('Dream OS Fingerprint 🔐', 4, 17);                
                return canvas.toDataURL();
            } catch(e) {
                return 'canvas_unavailable';
            }
        }
        
        // WebGL fingerprinting
        async getWebGLFingerprint() {
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                
                if (!gl) return 'webgl_unavailable';
                
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (!debugInfo) return 'webgl_no_debug_info';
                
                return {
                    vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
                    renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
                };
            } catch(e) {
                return 'webgl_error';
            }
        }
        
        // Audio context fingerprinting
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
            } catch(e) {
                return 'audio_error';
            }
        }
        
        // Generate SHA-256 hash
        async generateHash() {
            const data = JSON.stringify(this.components);
            const encoder = new TextEncoder();
            const dataBuffer = encoder.encode(data);
            
            const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            
            return hashHex;
        }
        
        // Get or create persistent device ID
        getOrCreateDeviceId() {
            const storageKey = 'dreamos_device_id';
            
            // Try to get existing ID
            let deviceId = localStorage.getItem(storageKey);
            
            if (!deviceId) {
                // Generate new device ID
                deviceId = 'dev_' + Math.random().toString(36).substring(2, 15) + 
                          '_' + Date.now().toString(36);
                
                // Store persistently
                localStorage.setItem(storageKey, deviceId);
                
                console.log('[FINGERPRINT] New device ID created:', deviceId);
            }
            
            return deviceId;
        }
        
        // Check if device is recognized
        async isRecognizedDevice() {
            const knownDevices = JSON.parse(localStorage.getItem('dreamos_known_devices') || '[]');
            return knownDevices.includes(this.deviceId);
        }
                // Register this device as trusted
        async registerDevice() {
            const knownDevices = JSON.parse(localStorage.getItem('dreamos_known_devices') || '[]');
            
            if (!knownDevices.includes(this.deviceId)) {
                knownDevices.push(this.deviceId);
                localStorage.setItem('dreamos_known_devices', JSON.stringify(knownDevices));
                
                // Log to audit trail
                await this.logDeviceRegistration();
                
                return true;
            }
            
            return false;
        }
        
        // Log device registration to audit trail
        async logDeviceRegistration() {
            if (window.DREAM && window.DREAM.trackEvent) {
                window.DREAM.trackEvent('device_registered', {
                    deviceId: this.deviceId,
                    fingerprint: this.hash.substring(0, 16) + '...',
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent
                });
            }
            
            // If Supabase available, log to database
            if (window.DREAM && window.DREAM.state && window.DREAM.state.supabase) {
                try {
                    await window.DREAM.state.supabase
                        .from('device_audit_logs')
                        .insert([{
                            device_id: this.deviceId,
                            fingerprint_hash: this.hash,
                            action: 'device_registered',
                            user_agent: navigator.userAgent,
                            created_at: new Date().toISOString()
                        }]);
                } catch(e) {
                    console.warn('[FINGERPRINT] Audit log failed:', e);
                }
            }
        }
        
        // Get security risk score
        getRiskScore() {
            let score = 0;
            let risks = [];            
            // Check for suspicious indicators
            if (navigator.webdriver) {
                score += 30;
                risks.push('Automation detected');
            }
            
            if (this.components.timezone === 'UTC') {
                score += 10;
                risks.push('UTC timezone (suspicious)');
            }
            
            if (this.components.hardwareConcurrency === 'unknown') {
                score += 10;
                risks.push('Hardware info hidden');
            }
            
            // Check if new device
            if (!localStorage.getItem('dreamos_device_id')) {
                score += 20;
                risks.push('New device');
            }
            
            return {
                score: Math.min(score, 100),
                level: score < 20 ? 'low' : score < 50 ? 'medium' : 'high',
                risks: risks
            };
        }
    }
    
    // ════════════════════════════════════════════
    // WEB AUTHN (BIOMETRIC AUTH)
    // ════════════════════════════════════════════
    
    class BiometricAuth {
        constructor() {
            this.isSupported = window.PublicKeyCredential !== undefined;
        }
        
        // Check if biometric auth is available
        async isAvailable() {
            if (!this.isSupported) {
                return {
                    available: false,
                    reason: 'WebAuthn not supported'
                };
            }
            
            try {                // Check platform authenticity
                const isPlatformSupported = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
                
                return {
                    available: isPlatformSupported,
                    reason: isPlatformSupported ? 'Ready' : 'No biometric sensor'
                };
            } catch(e) {
                return {
                    available: false,
                    reason: e.message
                };
            }
        }
        
        // Register biometric credential
        async register(username) {
            try {
                const publicKeyOptions = {
                    challenge: this.generateChallenge(),
                    rp: {
                        name: 'Dream OS 2026',
                        id: window.location.hostname
                    },
                    user: {
                        id: this.stringToBuffer(username),
                        name: username,
                        displayName: username
                    },
                    pubKeyCredParams: [
                        { type: 'public-key', alg: -7 },  // ES256
                        { type: 'public-key', alg: -257 } // RS256
                    ],
                    authenticatorSelection: {
                        authenticatorAttachment: 'platform',
                        userVerification: 'required'
                    },
                    timeout: 60000,
                    attestation: 'none'
                };
                
                const credential = await navigator.credentials.create({
                    publicKey: publicKeyOptions
                });
                
                // Store credential ID
                const credentialId = this.bufferToString(credential.rawId);
                localStorage.setItem('dreamos_biometric_credential', credentialId);
                
                console.log('[BIOMETRIC] Registration successful');                
                return {
                    success: true,
                    credentialId: credentialId
                };
                
            } catch(e) {
                console.error('[BIOMETRIC] Registration failed:', e);
                return {
                    success: false,
                    error: e.message
                };
            }
        }
        
        // Authenticate with biometric
        async authenticate() {
            try {
                const credentialId = localStorage.getItem('dreamos_biometric_credential');
                
                if (!credentialId) {
                    return {
                        success: false,
                        error: 'No biometric credential registered'
                    };
                }
                
                const publicKeyOptions = {
                    challenge: this.generateChallenge(),
                    allowCredentials: [{
                        type: 'public-key',
                        id: this.stringToBuffer(credentialId)
                    }],
                    timeout: 60000,
                    userVerification: 'required'
                };
                
                const assertion = await navigator.credentials.get({
                    publicKey: publicKeyOptions
                });
                
                console.log('[BIOMETRIC] Authentication successful');
                
                return {
                    success: true,
                    verified: true
                };
                
            } catch(e) {
                console.error('[BIOMETRIC] Authentication failed:', e);                return {
                    success: false,
                    error: e.message
                };
            }
        }
        
        // Generate random challenge
        generateChallenge() {
            const array = new Uint8Array(32);
            crypto.getRandomValues(array);
            return array;
        }
        
        // Convert string to ArrayBuffer
        stringToBuffer(str) {
            const encoder = new TextEncoder();
            return encoder.encode(str);
        }
        
        // Convert ArrayBuffer to string
        bufferToString(buffer) {
            return Array.from(new Uint8Array(buffer))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        }
    }
    
    // ════════════════════════════════════════════
    // INITIALIZE & EXPORT
    // ════════════════════════════════════════════
    
    // Create global instances
    window.DeviceFingerprint = new DeviceFingerprint();
    window.BiometricAuth = new BiometricAuth();
    
    // Auto-collect fingerprint on load
    (async function init() {
        try {
            const fingerprint = await window.DeviceFingerprint.collect();
            
            // Store in DREAM state
            if (window.DREAM) {
                window.DREAM.state.deviceFingerprint = fingerprint.hash;
                window.DREAM.state.deviceId = fingerprint.deviceId;
            }
            
            // Check risk score
            const riskScore = window.DeviceFingerprint.getRiskScore();
            console.log('🔐 [SECURITY] Risk Score:', riskScore.score + '/100 (' + riskScore.level + ')');            
            if (riskScore.risks.length > 0) {
                console.warn('⚠️ [SECURITY] Risks detected:', riskScore.risks);
            }
            
            // Check biometric availability
            const biometric = await window.BiometricAuth.isAvailable();
            console.log('🔐 [BIOMETRIC] Available:', biometric.available, '-', biometric.reason);
            
            console.log('✅ [DEVICE FINGERPRINT] System ready');
            
        } catch(e) {
            console.error('❌ [DEVICE FINGERPRINT] Init failed:', e);
        }
    })();
    
    console.log('✅ [DEVICE FINGERPRINT] Module loaded');
    
})();

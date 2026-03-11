/**
 * NFC Scanner Module
 * Dream OS 2026 - Near Field Communication
 * Enterprise Asset Tracking
 */

(function() {
    'use strict';
    
    console.log('📡 [NFC SCANNER] Initializing...');
    
    class NFCScanner {
        constructor() {
            this.isSupported = 'NDEFReader' in window;
            this.isScanning = false;
            this.controller = null;
        }
        
        // Check NFC support
        checkSupport() {
            return {
                supported: this.isSupported,
                https: window.location.protocol === 'https:',
                message: this.isSupported ? 'NFC supported' : 'NFC not supported'
            };
        }
        
        // Start NFC scanning
        async startScan() {
            if (!this.isSupported) {
                throw new Error('NFC not supported in this browser');
            }
            
            if (window.location.protocol !== 'https:') {
                throw new Error('NFC requires HTTPS');
            }
            
            try {
                this.controller = new AbortController();
                
                const ndef = new NDEFReader();
                
                await ndef.scan({
                    signal: this.controller.signal
                });
                
                this.isScanning = true;
                
                ndef.onreadingerror = () => {
                    console.error('[NFC] Cannot read data');                    window.DREAM?.showToast('📡 NFC read error', 'error');
                };
                
                ndef.onreading = event => {
                    const message = event.message;
                    
                    for (const record of message.records) {
                        console.log('[NFC] Record:', record);
                        
                        const data = {
                            recordType: record.recordType,
                            mediaType: record.mediaType,
                            data: this.decodeNFCRecord(record)
                        };
                        
                        // Trigger scan success
                        if (this.onScanSuccess) {
                            this.onScanSuccess(data);
                        }
                    }
                };
                
                console.log('✅ [NFC] Scanning started');
                
                return {
                    success: true,
                    message: 'NFC scanning active'
                };
                
            } catch(e) {
                console.error('[NFC] Scan failed:', e);
                
                return {
                    success: false,
                    error: e.message
                };
            }
        }
        
        // Decode NFC record
        decodeNFCRecord(record) {
            const decoder = new TextDecoder();
            
            switch(record.recordType) {
                case 'text':
                    return decoder.decode(record.data);
                
                case 'url':
                    return decoder.decode(record.data);
                                case 'mime':
                    if (record.mediaType === 'application/json') {
                        try {
                            return JSON.parse(decoder.decode(record.data));
                        } catch(e) {
                            return decoder.decode(record.data);
                        }
                    }
                    return decoder.decode(record.data);
                
                default:
                    return decoder.decode(record.data);
            }
        }
        
        // Stop NFC scanning
        stopScan() {
            if (this.controller) {
                this.controller.abort();
                this.controller = null;
            }
            
            this.isScanning = false;
            console.log('⏹️ [NFC] Scanning stopped');
        }
        
        // Write NFC tag
        async writeNFC(data) {
            if (!this.isSupported) {
                throw new Error('NFC not supported');
            }
            
            try {
                const ndef = new NDEFReader();
                
                await ndef.write({
                    records: [
                        { recordType: 'text', data: data }
                    ]
                });
                
                console.log('✅ [NFC] Write successful');
                
                return {
                    success: true,
                    message: 'NFC tag written'
                };
                
            } catch(e) {
                console.error('[NFC] Write failed:', e);                
                return {
                    success: false,
                    error: e.message
                };
            }
        }
        
        // Set scan success callback
        onScanSuccess(callback) {
            this.onScanSuccess = callback;
        }
        
        // Get NFC status
        getStatus() {
            return {
                supported: this.isSupported,
                https: window.location.protocol === 'https:',
                scanning: this.isScanning
            };
        }
    }
    
    // Create global instance
    window.NFCScanner = new NFCScanner();
    
    console.log('✅ [NFC SCANNER] Module loaded');
    
})();

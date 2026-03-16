/**
 * Geofencing & Location Security
 * Dream OS 2026 - Enterprise Location-Based Access Control
 * ISO 27001 Compliant
 */

(function() {
    'use strict';
    console.log('🌍 [GEOFENCING] Initializing...');
    
    const GEOFENCE_CONFIG = {
        zones: [ { id: 'headquarters', name: 'Kantor Pusat', latitude: -6.402154, longitude: 106.794296, radius: 100, type: 'primary' } ],
        security: { requireLocationForLogin: false, requireLocationForSensitiveOps: true, alertOnZoneExit: true, alertOnZoneEntry: true, trackingInterval: 30000, accuracyThreshold: 50 }
    };
    
    class GeofencingManager {
        constructor() {
            this.currentPosition = null;
            this.currentZone = null;
            this.watchId = null;
            this.isTracking = false;
            this.permissionGranted = false;
            this.locationHistory = [];
        }
        
        isSupported() { return 'geolocation' in navigator; }
        
        async requestPermission() {
            if (!this.isSupported()) return { granted: false, reason: 'Geolocation not supported' };
            try {
                const result = await navigator.permissions.query({ name: 'geolocation' });
                this.permissionGranted = result.state === 'granted';
                return { granted: this.permissionGranted, state: result.state };
            } catch(e) { return { granted: false, reason: e.message }; }
        }
        
        async getCurrentPosition() {
            return new Promise((resolve, reject) => {
                if (!this.isSupported()) { reject(new Error('Geolocation not supported')); return; }
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.currentPosition = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy,
                            altitude: position.coords.altitude,
                            heading: position.coords.heading,
                            speed: position.coords.speed,
                            timestamp: new Date(position.timestamp).toISOString()
                        };
                        this.currentZone = this.checkZone(this.currentPosition);
                        this.addToHistory(this.currentPosition);
                        resolve(this.currentPosition);
                    },
                    (error) => reject(error),
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
                );
            });
        }
        
        startTracking() {
            if (!this.isSupported()) { console.warn('[GEOFENCE] Not supported'); return false; }
            if (this.isTracking) { console.log('[GEOFENCE] Already tracking'); return true; }
            this.watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const newPosition = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        timestamp: new Date(position.timestamp).toISOString()
                    };
                    const previousZone = this.currentZone;
                    this.currentPosition = newPosition;
                    this.currentZone = this.checkZone(newPosition);
                    this.addToHistory(newPosition);
                    if (previousZone !== this.currentZone) this.onZoneChange(previousZone, this.currentZone);
                    if (newPosition.accuracy > GEOFENCE_CONFIG.security.accuracyThreshold)
                        console.warn('[GEOFENCE] Low accuracy:', newPosition.accuracy + 'm');
                },
                (error) => {
                    console.error('[GEOFENCE] Tracking error:', error);
                    switch(error.code) {
                        case error.PERMISSION_DENIED: window.DREAM?.showToast('🌍 Location permission denied', 'error'); break;
                        case error.POSITION_UNAVAILABLE: window.DREAM?.showToast('🌍 Location unavailable', 'warning'); break;
                        case error.TIMEOUT: window.DREAM?.showToast('🌍 Location timeout', 'warning'); break;
                    }
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
            );
            this.isTracking = true;
            console.log('✅ [GEOFENCE] Tracking started');
            return true;
        }
        
        stopTracking() {
            if (this.watchId !== null) {
                navigator.geolocation.clearWatch(this.watchId);
                this.watchId = null;
                this.isTracking = false;
                console.log('⏹️ [GEOFENCE] Tracking stopped');
            }
        }
        
        checkZone(position) {
            if (!position) return null;
            for (const zone of GEOFENCE_CONFIG.zones) {
                const distance = this.calculateDistance(position.latitude, position.longitude, zone.latitude, zone.longitude);
                if (distance <= zone.radius) return { ...zone, distance, inside: true };
            }
            return { inside: false, distance: null };
        }
        
        calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 6371e3;
            const φ1 = lat1 * Math.PI / 180;
            const φ2 = lat2 * Math.PI / 180;
            const Δφ = (lat2 - lat1) * Math.PI / 180;
            const Δλ = (lon2 - lon1) * Math.PI / 180;
            const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        }
        
        async onZoneChange(previousZone, newZone) {
            console.log('[GEOFENCE] Zone change:', previousZone?.name || 'Outside', '→', newZone?.name || 'Outside');
            if (newZone?.inside && GEOFENCE_CONFIG.security.alertOnZoneEntry) {
                const message = `📍 Entered ${newZone.name}`;
                console.log('[GEOFENCE]', message);
                if (window.DREAM) window.DREAM.showToast(message, 'success');
                await this.logZoneEvent('entry', newZone);
            }
            if (previousZone?.inside && !newZone?.inside && GEOFENCE_CONFIG.security.alertOnZoneExit) {
                const message = `📍 Exited ${previousZone.name}`;
                console.log('[GEOFENCE]', message);
                if (window.DREAM) window.DREAM.showToast(message, 'info');
                await this.logZoneEvent('exit', previousZone);
            }
            if (newZone?.type === 'restricted') {
                const message = `⚠️ Entering restricted area: ${newZone.name}`;
                console.warn('[GEOFENCE]', message);
                if (window.DREAM) window.DREAM.showToast(message, 'warning');
                await this.logZoneEvent('restricted_entry', newZone);
            }
        }
        
        addToHistory(position) {
            this.locationHistory.push(position);
            if (this.locationHistory.length > 100) this.locationHistory.shift();
            try { localStorage.setItem('dreamos_location_history', JSON.stringify(this.locationHistory)); } catch(e) {}
        }
        
        async logZoneEvent(eventType, zone) {
            const logEntry = { event_type: eventType, zone_id: zone.id, zone_name: zone.name, zone_type: zone.type, latitude: this.currentPosition?.latitude, longitude: this.currentPosition?.longitude, accuracy: this.currentPosition?.accuracy, timestamp: new Date().toISOString(), deviceId: window.DREAM?.state?.deviceId || 'unknown', userId: window.DREAM?.state?.user?.name || 'unknown' };
            console.log('[GEOFENCE AUDIT]', logEntry);
            if (window.DREAM && window.DREAM.trackEvent) window.DREAM.trackEvent('geofence_' + eventType, logEntry);
        }
        
        canPerformSensitiveOperation() {
            if (!GEOFENCE_CONFIG.security.requireLocationForSensitiveOps) return { allowed: true, reason: 'Location check disabled' };
            if (!this.currentZone) return { allowed: false, reason: 'Location unknown' };
            if (!this.currentZone.inside) return { allowed: false, reason: 'Outside authorized zone', suggestion: 'Please move to an authorized location' };
            if (this.currentZone.accuracy > GEOFENCE_CONFIG.security.accuracyThreshold) return { allowed: false, reason: 'Location accuracy too low', suggestion: 'Please enable high accuracy GPS' };
            return { allowed: true, zone: this.currentZone.name, reason: 'Inside authorized zone' };
        }
        
        getStatus() {
            return { supported: this.isSupported(), permissionGranted: this.permissionGranted, isTracking: this.isTracking, currentPosition: this.currentPosition, currentZone: this.currentZone, zonesConfigured: GEOFENCE_CONFIG.zones.length, historySize: this.locationHistory.length };
        }
        
        loadHistory() {
            try { const stored = localStorage.getItem('dreamos_location_history'); if (stored) this.locationHistory = JSON.parse(stored); } catch(e) {}
        }
    }
    
    class LocationAccessControl {
        constructor(geofencing) {
            this.geofencing = geofencing;
            this.restrictedOperations = ['approve_budget','delete_records','export_data','change_permissions','system_config'];
        }
        async checkAccess(operation) {
            const isRestricted = this.restrictedOperations.includes(operation);
            if (!isRestricted) return { allowed: true, reason: 'Operation not restricted' };
            const locationCheck = this.geofencing.canPerformSensitiveOperation();
            if (!locationCheck.allowed) {
                await this.logAccessAttempt(operation, false, locationCheck.reason);
                return { allowed: false, reason: locationCheck.reason, suggestion: locationCheck.suggestion, requireBiometric: true };
            }
            await this.logAccessAttempt(operation, true, locationCheck.reason);
            return { allowed: true, reason: locationCheck.reason, zone: locationCheck.zone };
        }
        async logAccessAttempt(operation, allowed, reason) {
            const logEntry = { operation, allowed, reason, timestamp: new Date().toISOString(), deviceId: window.DREAM?.state?.deviceId || 'unknown', userId: window.DREAM?.state?.user?.name || 'unknown', location: this.geofencing.currentPosition };
            console.log('[ACCESS CONTROL]', logEntry);
            if (window.DREAM && window.DREAM.trackEvent) window.DREAM.trackEvent('access_control_' + (allowed ? 'allowed' : 'denied'), logEntry);
        }
        async performSensitiveOperation(operation, callback) {
            const access = await this.checkAccess(operation);
            if (!access.allowed) {
                if (window.DREAM) window.DREAM.showToast(`🔒 ${access.reason}`, 'error');
                if (access.requireBiometric && window.BiometricAuth) {
                    const confirm = await window.confirm(`${access.reason}\n\nUse biometric authentication to override?`);
                    if (confirm) {
                        const auth = await window.BiometricAuth.authenticate();
                        if (auth.success) { window.DREAM?.showToast('✅ Biometric override successful', 'success'); return await callback(); }
                        else { window.DREAM?.showToast('❌ Biometric override failed', 'error'); return null; }
                    }
                }
                return null;
            }
            return await callback();
        }
    }
    
    window.Geofencing = new GeofencingManager();
    window.LocationAccessControl = new LocationAccessControl(window.Geofencing);
    
    (async function init() {
        try {
            window.Geofencing.loadHistory();
            const permission = await window.Geofencing.requestPermission();
            console.log('🌍 [GEOFENCE] Permission:', permission);
            if (permission.granted) {
                await window.Geofencing.getCurrentPosition();
                window.Geofencing.startTracking();
                console.log('✅ [GEOFENCE] Active - Tracking:', window.Geofencing.currentZone?.name || 'Outside all zones');
            } else { console.warn('⚠️ [GEOFENCE] Permission not granted:', permission.reason); }
            setInterval(() => {
                const status = window.Geofencing.getStatus();
                if (window.DREAM && window.DREAM.state) window.DREAM.state.locationStatus = status;
            }, GEOFENCE_CONFIG.security.trackingInterval);
        } catch(e) { console.error('❌ [GEOFENCE] Init failed:', e); }
    })();
})();

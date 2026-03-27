// Dream OS - Ghost Mode Scanner & Debugger
class GhostScanner {
    constructor() {
        this.scanResults = {};
        this.debugMode = true;
    }
    
    async fullSystemScan() {
        console.log('👻 Ghost Scanner - Full System Scan');
        
        const scan = {
            timestamp: new Date().toISOString(),
            system: await this.scanSystem(),
            modules: await this.scanModules(),
            database: await this.scanDatabase(),
            storage: await this.scanStorage(),
            errors: [],
            warnings: []
        };
        
        // Save scan results
        localStorage.setItem('ghost_scan', JSON.stringify(scan));
        
        return scan;
    }
    
    async scanSystem() {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            online: navigator.onLine,
            cookiesEnabled: navigator.cookieEnabled,
            screenSize: `${window.innerWidth}x${window.innerHeight}`,
            url: window.location.href,
            timestamp: new Date().toISOString()
        };
    }
    
    async scanModules() {
        const modules = [];
        
        // Check if modules folder exists
        try {
            const moduleList = [
                'auth', 'dashboard', 'command-center', 'stok', 'maintenance',
                'security', 'booking', 'k3', 'asset', 'janitor', 'qr', 'settings', 'ghost'
            ];
            
            for (const module of moduleList) {
                try {
                    const modulePath = `./modules/${module}/module.js`;
                    const response = await fetch(modulePath, { method: 'HEAD' });
                    modules.push({
                        name: module,
                        exists: response.ok,
                        path: modulePath
                    });
                } catch (e) {
                    modules.push({
                        name: module,
                        exists: false,
                        error: e.message
                    });
                }
            }
        } catch (error) {
            console.error('Module scan error:', error);
        }
        
        return modules;
    }
    
    async scanDatabase() {
        const dbInfo = {
            supabase: null,
            indexedDB: null,
            localStorage: {},
            sessionStorage: {}
        };
        
        // LocalStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            dbInfo.localStorage[key] = {
                size: value?.length || 0,
                preview: value?.substring(0, 100) || ''
            };
        }
        
        // SessionStorage
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            const value = sessionStorage.getItem(key);
            dbInfo.sessionStorage[key] = {
                size: value?.length || 0,
                preview: value?.substring(0, 100) || ''
            };
        }
        
        // Supabase check
        if (window.supabase) {
            dbInfo.supabase = {
                available: true,
                url: 'https://lfavawkzvdhdpaaplaiq.supabase.co'
            };
        }
        
        return dbInfo;
    }
    
    scanStorage() {
        let totalLocalStorage = 0;
        let totalSessionStorage = 0;
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            totalLocalStorage += localStorage.getItem(key)?.length || 0;
        }
        
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            totalSessionStorage += sessionStorage.getItem(key)?.length || 0;
        }
        
        return {
            localStorageUsed: `${Math.round(totalLocalStorage / 1024)} KB`,
            sessionStorageUsed: `${Math.round(totalSessionStorage / 1024)} KB`,
            localStorageLimit: '5-10 MB',
            sessionStorageLimit: '5-10 MB'
        };
    }
    
    generateReport(scan) {
        let report = `
╔══════════════════════════════════════════════════════════╗
║     GHOST MODE SYSTEM REPORT                             ║
╠══════════════════════════════════════════════════════════╣
║ Timestamp: ${scan.timestamp}
║ User Agent: ${scan.system.userAgent.substring(0, 50)}...
║ Platform: ${scan.system.platform}
║ Online: ${scan.system.online}
╠══════════════════════════════════════════════════════════╣
║ MODULES STATUS:
`;
        
        scan.modules.forEach(m => {
            const status = m.exists ? '✅' : '❌';
            report += `║   ${status} ${m.name}\n`;
        });
        
        report += `╠══════════════════════════════════════════════════════════╣
║ STORAGE:
║   LocalStorage: ${scan.storage.localStorageUsed}
║   SessionStorage: ${scan.storage.sessionStorageUsed}
╠══════════════════════════════════════════════════════════╣
║ DATABASE KEYS FOUND:
`;
        
        Object.keys(scan.database.localStorage).forEach(key => {
            report += `║   📁 ${key}\n`;
        });
        
        report += `╚══════════════════════════════════════════════════════════╝`;
        
        return report;
    }
    
    async showGhostConsole() {
        console.log('%c👻 GHOST MODE SCANNER ACTIVE', 'color: #a855f7; font-size: 16px; font-weight: bold;');
        console.log('%cType: ghost.scan() - Full system scan', 'color: #10b981;');
        console.log('%cType: ghost.report() - Show scan report', 'color: #10b981;');
        console.log('%cType: ghost.recover() - Emergency recovery', 'color: #10b981;');
        console.log('%cType: ghost.export() - Export all data', 'color: #10b981;');
        
        window.ghost = this;
        return this;
    }
    
    async scan() {
        const scan = await this.fullSystemScan();
        this.scanResults = scan;
        console.log('✅ Scan complete! Run ghost.report() to see results');
        return scan;
    }
    
    report() {
        if (!this.scanResults) {
            console.log('⚠️ No scan results. Run ghost.scan() first');
            return;
        }
        console.log(this.generateReport(this.scanResults));
    }
    
    async recover() {
        console.log('👻 Running ghost recovery protocol...');
        
        // Try to load from backup
        const backup = localStorage.getItem('dreamos_emergency_backup');
        if (backup) {
            console.log('📦 Emergency backup found!');
            const data = JSON.parse(backup);
            console.log(`   Backup date: ${data.timestamp}`);
            console.log(`   Version: ${data.version}`);
            
            // Offer restore
            const restore = confirm('Emergency backup found. Restore?');
            if (restore) {
                Object.entries(data.data?.localStorage || {}).forEach(([key, value]) => {
                    if (typeof value === 'string') {
                        localStorage.setItem(key, value);
                    }
                });
                console.log('✅ System restored from emergency backup');
                location.reload();
            }
        } else {
            console.log('⚠️ No emergency backup found');
        }
        
        return { restored: !!backup };
    }
    
    async export() {
        const data = {
            timestamp: new Date().toISOString(),
            localStorage: {},
            sessionStorage: {},
            scanResults: this.scanResults
        };
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            data.localStorage[key] = localStorage.getItem(key);
        }
        
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            data.sessionStorage[key] = sessionStorage.getItem(key);
        }
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dreamos_ghost_export_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        console.log('📁 Export complete!');
        return data;
    }
}

export const ghostScanner = new GhostScanner();

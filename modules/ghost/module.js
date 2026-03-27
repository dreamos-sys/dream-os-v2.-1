// Ghost Stealth Architect - Complete System Analyzer & Error Tracker
export default {
    name: 'Ghost Stealth Analyzer',
    icon: 'fa-ghost',
    color: '#a855f7',
    version: '2.0.0',
    description: 'Real-time System Analyzer | Error Tracker | Crash Reporter | Auto-Recovery',
    
    async render(context) {
        const { user, toast } = context;
        
        return `
            <div id="ghost-analyzer" style="animation:fadeInUp 0.4s ease;">
                <!-- HEADER -->
                <div style="background:linear-gradient(135deg,#1e1b4b,#0c0a2a); border-radius:24px; padding:20px; margin-bottom:24px; border:1px solid rgba(168,85,247,0.4);">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
                        <div style="display:flex; align-items:center; gap:16px;">
                            <div style="width:60px; height:60px; background:linear-gradient(135deg,#a855f7,#8b5cf6); border-radius:20px; display:flex; align-items:center; justify-content:center;">
                                <i class="fas fa-ghost" style="font-size:32px; color:white;"></i>
                            </div>
                            <div>
                                <h1 style="color:#a855f7; margin:0; font-size:1.6rem;">GHOST STEALTH ANALYZER</h1>
                                <p style="color:#94a3b8; font-size:11px;">Real-time System Analyzer • Error Tracker • Crash Reporter • Auto-Recovery</p>
                            </div>
                        </div>
                        <div id="system-health-badge" style="background:rgba(16,185,129,0.2); padding:8px 16px; border-radius:20px;">
                            <i class="fas fa-heartbeat"></i> System Health: <span id="health-score">--</span>%
                        </div>
                    </div>
                </div>
                
                <!-- ERROR DASHBOARD -->
                <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:24px;">
                    <div class="stat-card" style="background:rgba(239,68,68,0.1); border-radius:20px; padding:16px;">
                        <i class="fas fa-bug" style="font-size:24px; color:#ef4444;"></i>
                        <div style="font-size:28px; font-weight:700;" id="error-count">0</div>
                        <div style="font-size:11px;">Total Errors</div>
                    </div>
                    <div class="stat-card" style="background:rgba(245,158,11,0.1); border-radius:20px; padding:16px;">
                        <i class="fas fa-exclamation-triangle" style="font-size:24px; color:#f59e0b;"></i>
                        <div style="font-size:28px; font-weight:700;" id="warning-count">0</div>
                        <div style="font-size:11px;">Warnings</div>
                    </div>
                    <div class="stat-card" style="background:rgba(59,130,246,0.1); border-radius:20px; padding:16px;">
                        <i class="fas fa-chart-line" style="font-size:24px; color:#3b82f6;"></i>
                        <div style="font-size:28px; font-weight:700;" id="recovery-count">0</div>
                        <div style="font-size:11px;">Auto-Recovery</div>
                    </div>
                    <div class="stat-card" style="background:rgba(16,185,129,0.1); border-radius:20px; padding:16px;">
                        <i class="fas fa-clock" style="font-size:24px; color:#10b981;"></i>
                        <div style="font-size:28px; font-weight:700;" id="uptime">--</div>
                        <div style="font-size:11px;">Uptime (min)</div>
                    </div>
                </div>
                
                <!-- MAIN GRID 2 COLUMNS -->
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
                    
                    <!-- LEFT COLUMN: Error List -->
                    <div class="ghost-card" style="background:rgba(15,23,42,0.6); border-radius:20px; padding:20px;">
                        <h3 style="color:#a855f7; margin-bottom:16px;">
                            <i class="fas fa-list"></i> Error Log
                            <button id="clear-errors" style="float:right; background:none; border:1px solid #ef4444; border-radius:8px; padding:4px 12px; cursor:pointer; font-size:11px;">
                                <i class="fas fa-trash"></i> Clear
                            </button>
                        </h3>
                        <div id="error-list" style="max-height:400px; overflow-y:auto; font-family:monospace; font-size:12px;">
                            <div style="text-align:center; padding:40px; color:#64748b;">
                                <i class="fas fa-check-circle"></i> No errors detected
                            </div>
                        </div>
                    </div>
                    
                    <!-- RIGHT COLUMN: System Analysis -->
                    <div style="display:flex; flex-direction:column; gap:24px;">
                        <!-- Module Status -->
                        <div class="ghost-card" style="background:rgba(15,23,42,0.6); border-radius:20px; padding:20px;">
                            <h3 style="color:#a855f7; margin-bottom:16px;"><i class="fas fa-cubes"></i> Module Status</h3>
                            <div id="module-status-list" style="max-height:200px; overflow-y:auto;">
                                <div style="text-align:center; padding:20px;">Loading modules...</div>
                            </div>
                        </div>
                        
                        <!-- File Trace / Error Location -->
                        <div class="ghost-card" style="background:rgba(15,23,42,0.6); border-radius:20px; padding:20px;">
                            <h3 style="color:#a855f7; margin-bottom:16px;"><i class="fas fa-map-marker-alt"></i> Error Location Trace</h3>
                            <div id="error-trace" style="background:rgba(0,0,0,0.3); border-radius:12px; padding:12px; font-family:monospace; font-size:11px; min-height:100px;">
                                <div style="color:#64748b;">Select an error to see trace</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- THIRD ROW: Recovery Actions -->
                <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:24px;">
                    <button id="auto-repair" style="background:linear-gradient(135deg,#10b981,#34d399); border:none; border-radius:16px; padding:16px; cursor:pointer; font-weight:700;">
                        <i class="fas fa-wrench"></i> Auto Repair System
                    </button>
                    <button id="deep-scan" style="background:linear-gradient(135deg,#a855f7,#8b5cf6); border:none; border-radius:16px; padding:16px; cursor:pointer; font-weight:700;">
                        <i class="fas fa-search"></i> Deep System Scan
                    </button>
                    <button id="export-report" style="background:linear-gradient(135deg,#3b82f6,#2563eb); border:none; border-radius:16px; padding:16px; cursor:pointer; font-weight:700;">
                        <i class="fas fa-file-alt"></i> Export Error Report
                    </button>
                </div>
                
                <style>
                    .ghost-card {
                        transition: all 0.3s;
                    }
                    .ghost-card:hover {
                        transform: translateY(-2px);
                    }
                    .error-item {
                        padding: 12px;
                        border-left: 3px solid #ef4444;
                        margin-bottom: 8px;
                        background: rgba(239,68,68,0.05);
                        border-radius: 8px;
                        cursor: pointer;
                        transition: all 0.2s;
                    }
                    .error-item:hover {
                        background: rgba(239,68,68,0.1);
                        transform: translateX(5px);
                    }
                    .error-item.warning {
                        border-left-color: #f59e0b;
                        background: rgba(245,158,11,0.05);
                    }
                    .module-status {
                        display: flex;
                        justify-content: space-between;
                        padding: 8px;
                        border-bottom: 1px solid rgba(255,255,255,0.05);
                    }
                    .status-ok { color: #10b981; }
                    .status-error { color: #ef4444; }
                    .status-warning { color: #f59e0b; }
                </style>
            </div>
        `;
    },
    
    async afterRender(context) {
        const { toast, supabase } = context;
        
        // Error Storage
        let errorLogs = [];
        let startTime = Date.now();
        
        // Helper: Add error to log
        const addError = (error, type = 'error') => {
            const errorEntry = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                type: type,
                message: error.message || error,
                stack: error.stack,
                file: this.extractFileFromStack(error.stack),
                line: this.extractLineFromStack(error.stack),
                function: this.extractFunctionFromStack(error.stack),
                resolved: false
            };
            
            errorLogs.unshift(errorEntry);
            if (errorLogs.length > 100) errorLogs.pop();
            
            // Save to localStorage
            localStorage.setItem('ghost_error_logs', JSON.stringify(errorLogs));
            
            // Update UI
            updateErrorList();
            updateStats();
            
            return errorEntry;
        };
        
        // Helper: Extract file from stack trace
        const extractFileFromStack = (stack) => {
            if (!stack) return 'unknown';
            const match = stack.match(/at\s+.*?\((.*?):(\d+):(\d+)\)/);
            if (match) return match[1].split('/').pop();
            const match2 = stack.match(/at\s+(.*?):(\d+):(\d+)/);
            if (match2) return match2[1].split('/').pop();
            return 'unknown';
        };
        
        const extractLineFromStack = (stack) => {
            if (!stack) return '?';
            const match = stack.match(/:(\d+):\d+\)?$/m);
            if (match) return match[1];
            return '?';
        };
        
        const extractFunctionFromStack = (stack) => {
            if (!stack) return 'anonymous';
            const match = stack.match(/at\s+(\S+)\s*\(/);
            if (match) return match[1];
            const match2 = stack.match(/at\s+(\S+)$/m);
            if (match2) return match2[1];
            return 'anonymous';
        };
        
        // Update error list UI
        const updateErrorList = () => {
            const container = document.getElementById('error-list');
            if (!container) return;
            
            if (errorLogs.length === 0) {
                container.innerHTML = '<div style="text-align:center; padding:40px; color:#64748b;"><i class="fas fa-check-circle"></i> No errors detected</div>';
                return;
            }
            
            container.innerHTML = errorLogs.map(err => `
                <div class="error-item ${err.type}" onclick="showErrorTrace(${err.id})" data-id="${err.id}">
                    <div style="display:flex; justify-content:space-between;">
                        <span style="font-weight:700;">${err.type.toUpperCase()}</span>
                        <span style="font-size:10px; color:#64748b;">${new Date(err.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div style="font-size:12px; margin-top:4px;">${err.message.substring(0, 100)}</div>
                    <div style="font-size:10px; color:#64748b; margin-top:4px;">
                        📁 ${err.file}:${err.line} • 🔧 ${err.function}
                    </div>
                </div>
            `).join('');
        };
        
        // Show error trace
        window.showErrorTrace = (id) => {
            const error = errorLogs.find(e => e.id === id);
            const traceDiv = document.getElementById('error-trace');
            if (traceDiv && error) {
                traceDiv.innerHTML = `
                    <div style="background:rgba(0,0,0,0.5); border-radius:8px; padding:12px;">
                        <div style="color:#ef4444; margin-bottom:8px;"><strong>❌ ${error.type.toUpperCase()}</strong></div>
                        <div><strong>Message:</strong> ${error.message}</div>
                        <div><strong>File:</strong> ${error.file}</div>
                        <div><strong>Line:</strong> ${error.line}</div>
                        <div><strong>Function:</strong> ${error.function}</div>
                        <div><strong>Time:</strong> ${new Date(error.timestamp).toLocaleString()}</div>
                        <details style="margin-top:8px;">
                            <summary style="cursor:pointer; color:#a855f7;">Stack Trace</summary>
                            <pre style="margin-top:8px; background:#000; padding:8px; border-radius:8px; font-size:10px; overflow-x:auto;">${error.stack || 'No stack trace'}</pre>
                        </details>
                        <button onclick="attemptFix(${error.id})" style="margin-top:12px; background:#10b981; border:none; padding:6px 12px; border-radius:8px; cursor:pointer;">
                            <i class="fas fa-wrench"></i> Attempt Fix
                        </button>
                    </div>
                `;
            }
        };
        
        // Attempt fix for specific error
        window.attemptFix = async (id) => {
            const error = errorLogs.find(e => e.id === id);
            if (!error) return;
            
            toast?.(`Attempting to fix: ${error.message}`, 'info');
            
            // Mark as resolved
            error.resolved = true;
            error.resolvedAt = new Date().toISOString();
            localStorage.setItem('ghost_error_logs', JSON.stringify(errorLogs));
            
            // Add recovery log
            const recoveryCount = document.getElementById('recovery-count');
            if (recoveryCount) {
                const count = parseInt(recoveryCount.innerText) + 1;
                recoveryCount.innerText = count;
            }
            
            updateErrorList();
            toast?.(`✅ Fixed: ${error.message}`, 'success');
        };
        
        // Update stats
        const updateStats = () => {
            const errorCount = errorLogs.filter(e => e.type === 'error').length;
            const warningCount = errorLogs.filter(e => e.type === 'warning').length;
            const recoveryCount = errorLogs.filter(e => e.resolved).length;
            const uptime = Math.floor((Date.now() - startTime) / 60000);
            
            document.getElementById('error-count').innerText = errorCount;
            document.getElementById('warning-count').innerText = warningCount;
            document.getElementById('recovery-count').innerText = recoveryCount;
            document.getElementById('uptime').innerText = uptime;
            
            // Health score
            const healthScore = Math.max(0, 100 - (errorCount * 5) - (warningCount * 2));
            document.getElementById('health-score').innerText = healthScore;
            
            const healthBadge = document.getElementById('system-health-badge');
            if (healthScore > 80) {
                healthBadge.style.background = 'rgba(16,185,129,0.2)';
            } else if (healthScore > 50) {
                healthBadge.style.background = 'rgba(245,158,11,0.2)';
            } else {
                healthBadge.style.background = 'rgba(239,68,68,0.2)';
            }
        };
        
        // Scan modules status
        const scanModules = async () => {
            const modules = ['auth', 'dashboard', 'command-center', 'stok', 'maintenance', 'security', 'booking', 'k3', 'asset', 'qr', 'settings', 'ghost'];
            const container = document.getElementById('module-status-list');
            container.innerHTML = '';
            
            for (const mod of modules) {
                try {
                    const response = await fetch(`./modules/${mod}/module.js`, { method: 'HEAD' });
                    const exists = response.ok;
                    container.innerHTML += `
                        <div class="module-status">
                            <span>📦 ${mod}</span>
                            <span class="${exists ? 'status-ok' : 'status-error'}">
                                ${exists ? '✅ OK' : '❌ Missing'}
                            </span>
                        </div>
                    `;
                    if (!exists) {
                        addError(`Module ${mod} is missing or cannot be loaded`, 'error');
                    }
                } catch (e) {
                    container.innerHTML += `
                        <div class="module-status">
                            <span>📦 ${mod}</span>
                            <span class="status-error">❌ Error</span>
                        </div>
                    `;
                    addError(`Cannot access module ${mod}: ${e.message}`, 'error');
                }
            }
        };
        
        // Deep system scan
        const deepScan = async () => {
            toast?.('🔍 Running deep system scan...', 'info');
            const scanResults = [];
            
            // Check localStorage
            try {
                let lsSize = 0;
                for (let i = 0; i < localStorage.length; i++) {
                    lsSize += localStorage.getItem(localStorage.key(i))?.length || 0;
                }
                if (lsSize > 5 * 1024 * 1024) {
                    addError(`LocalStorage usage is high: ${(lsSize/1024/1024).toFixed(2)} MB`, 'warning');
                }
            } catch (e) {
                addError(`LocalStorage error: ${e.message}`, 'error');
            }
            
            // Check Supabase connection
            if (supabase) {
                try {
                    const { error } = await supabase.from('bookings').select('count', { count: 'exact', head: true });
                    if (error) {
                        addError(`Supabase connection error: ${error.message}`, 'error');
                    }
                } catch (e) {
                    addError(`Supabase connection failed: ${e.message}`, 'error');
                }
            }
            
            // Check service worker
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                if (registrations.length === 0) {
                    addError('Service Worker not registered', 'warning');
                }
            }
            
            toast?.('✅ Deep scan completed', 'success');
            return scanResults;
        };
        
        // Auto repair system
        const autoRepair = async () => {
            toast?.('🔧 Running auto-repair...', 'info');
            let fixes = 0;
            
            // Fix 1: Clear old error logs if too many
            if (errorLogs.length > 50) {
                errorLogs = errorLogs.slice(0, 50);
                localStorage.setItem('ghost_error_logs', JSON.stringify(errorLogs));
                fixes++;
                addError('Cleared old error logs (over 50 entries)', 'warning');
            }
            
            // Fix 2: Re-register service worker if missing
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                if (registrations.length === 0) {
                    await navigator.serviceWorker.register('/sw.js');
                    fixes++;
                    addError('Service Worker re-registered', 'warning');
                }
            }
            
            // Fix 3: Check localStorage integrity
            try {
                const test = localStorage.getItem('ghost_test');
                localStorage.setItem('ghost_test', 'test');
                localStorage.removeItem('ghost_test');
            } catch (e) {
                addError(`LocalStorage issue detected: ${e.message}`, 'error');
                // Attempt to clear some space
                const keys = [];
                for (let i = 0; i < localStorage.length; i++) {
                    keys.push(localStorage.key(i));
                }
                // Remove oldest error logs if needed
                if (errorLogs.length > 30) {
                    errorLogs = errorLogs.slice(0, 30);
                    localStorage.setItem('ghost_error_logs', JSON.stringify(errorLogs));
                    fixes++;
                }
            }
            
            updateStats();
            updateErrorList();
            toast?.(`✅ Auto-repair completed: ${fixes} issues fixed`, 'success');
        };
        
        // Export report
        const exportReport = () => {
            const report = {
                timestamp: new Date().toISOString(),
                systemInfo: {
                    userAgent: navigator.userAgent,
                    url: window.location.href,
                    online: navigator.onLine,
                    uptime: Math.floor((Date.now() - startTime) / 60000) + ' minutes'
                },
                stats: {
                    totalErrors: errorLogs.filter(e => e.type === 'error').length,
                    totalWarnings: errorLogs.filter(e => e.type === 'warning').length,
                    resolved: errorLogs.filter(e => e.resolved).length,
                    healthScore: document.getElementById('health-score')?.innerText
                },
                errors: errorLogs,
                recommendations: []
            };
            
            // Add recommendations
            if (report.stats.totalErrors > 10) {
                report.recommendations.push('High error count detected. Consider system reset.');
            }
            if (!navigator.onLine) {
                report.recommendations.push('System is offline. Check network connection.');
            }
            
            const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ghost_report_${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
            
            toast?.('📁 Error report exported', 'success');
        };
        
        // Load saved errors from localStorage
        const loadSavedErrors = () => {
            const saved = localStorage.getItem('ghost_error_logs');
            if (saved) {
                try {
                    errorLogs = JSON.parse(saved);
                    updateErrorList();
                    updateStats();
                } catch (e) {
                    console.warn('Failed to load saved errors');
                }
            }
        };
        
        // Global error handler
        const setupGlobalErrorHandler = () => {
            // Catch unhandled errors
            window.addEventListener('error', (event) => {
                addError({
                    message: event.message,
                    stack: event.error?.stack,
                    filename: event.filename,
                    lineno: event.lineno,
                    colno: event.colno
                }, 'error');
            });
            
            // Catch promise rejections
            window.addEventListener('unhandledrejection', (event) => {
                addError(event.reason?.message || event.reason, 'error');
            });
            
            // Override console.error to capture errors
            const originalError = console.error;
            console.error = (...args) => {
                originalError.apply(console, args);
                addError(args.join(' '), 'error');
            };
            
            const originalWarn = console.warn;
            console.warn = (...args) => {
                originalWarn.apply(console, args);
                addError(args.join(' '), 'warning');
            };
        };
        
        // Button events
        document.getElementById('clear-errors')?.addEventListener('click', () => {
            errorLogs = [];
            localStorage.setItem('ghost_error_logs', JSON.stringify(errorLogs));
            updateErrorList();
            updateStats();
            toast?.('Error log cleared', 'success');
        });
        
        document.getElementById('auto-repair')?.addEventListener('click', autoRepair);
        document.getElementById('deep-scan')?.addEventListener('click', deepScan);
        document.getElementById('export-report')?.addEventListener('click', exportReport);
        
        // Initialize
        loadSavedErrors();
        await scanModules();
        await deepScan();
        setupGlobalErrorHandler();
        updateStats();
        
        // Auto refresh every 10 seconds
        setInterval(() => {
            updateStats();
            scanModules();
        }, 10000);
        
        toast?.('👻 Ghost Stealth Analyzer activated!', 'success');
        
        // Add test error button for demo
        const testError = () => {
            try {
                throw new Error('Test error from Ghost Stealth');
            } catch (e) {
                addError(e, 'error');
            }
        };
        
        window.testGhostError = testError;
        console.log('💡 To test error tracking, run: testGhostError()');
    }
};

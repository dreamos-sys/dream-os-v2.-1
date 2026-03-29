// 🧬 GIRANGATI NEURAL CORE v2.1 - THE SMART SQUAD
// Integrated: Tiny (Muscles) + Baby Agent (Brain) + Duo Bawel (Security & UI)

const Girangati = {
    identity: "DREAM OS v2.1",
    version: "2.1.0",
    mode: "DYNAMIC_PRO",
    status: "ACTIVE",

    // 🦾 TINY: The Muscles (Low-Level Execution)
    tiny: {
        status: "READY",
        device: navigator.userAgent.includes('Mobile') ? 'MOBILE' : 'DESKTOP',
        battery: null,
        network: navigator.onLine ? 'ONLINE' : 'OFFLINE',
        
        init: async function() {
            console.log('🦾 Tiny: Initializing muscles...');
            if('getBattery' in navigator) {
                const battery = await navigator.getBattery();
                this.battery = battery.level * 100;
                console.log('🦾 Tiny: Battery at ' + this.battery + '%');
            }
            this.status = 'ACTIVE';
        },

        execute: function(cmd) {
            console.log('🦾 Tiny: Executing -> ' + cmd);
            // Hardware triggers
            if(cmd === 'MODULE_OPEN') {
                this.vibrate([50, 50, 50]);
            }
        },

        vibrate: function(pattern) {
            if(navigator.vibrate) navigator.vibrate(pattern);
        },

        getStatus: function() {
            return {
                status: this.status,
                device: this.device,
                battery: this.battery,
                network: this.network
            };
        }
    },
    // 🧠 BABY AGENT: The Brain (Smart Logic)
    babyAgent: {
        intelligence: "SUPER_AGENT",
        status: "LEARNING",
        context: {},
        
        init: function() {
            console.log('🧠 Baby Agent: Waking up...');
            this.status = 'ACTIVE';
            this.loadContext();
        },

        loadContext: function() {
            this.context = {
                user: sessionStorage.getItem('dream_user') || 'GUEST',
                session: sessionStorage.getItem('dream_session') || 'INACTIVE',
                timestamp: new Date().toISOString()
            };
        },

        analyze: function(input) {
            console.log('🧠 Baby Agent Analyzing: ' + input);
            
            // Smart routing based on input
            const routes = {
                'Command Center': 'dashboard',
                'Form Booking': 'booking',
                'K3': 'safety',
                'Sekuriti': 'security',
                'Janitor': 'cleaning',
                'Stok': 'inventory',
                'Maintenance': 'repair',
                'Asset': 'assets'
            };

            const category = routes[input] || 'general';
            console.log('🧠 Baby Agent: Routed to ' + category);
            
            return {
                category: category,
                confidence: 0.95,
                timestamp: Date.now()
            };
        },

        learn: function(input, output) {
            console.log('🧠 Baby Agent: Learning from interaction...');
            // Store learning data
            localStorage.setItem('baby_agent_learn_' + Date.now(), JSON.stringify({input, output}));        },

        getStatus: function() {
            return {
                status: this.status,
                intelligence: this.intelligence,
                context: this.context
            };
        }
    },

    // 🛡️ INTEGRATED IMMUNITY (Duo Bawel)
    brain: {
        emit: function(signal, data) {
            console.log(`✨ [${Girangati.identity}] Signal: ${signal}`);
            
            try {
                // Baby Agent analyzes first
                const analysis = Girangati.babyAgent.analyze(data);
                
                // Tiny executes
                Girangati.tiny.execute(signal);
                
                // Route to appropriate handler
                Girangati.brain.route(signal, data, analysis);
                
                // Log for audit
                Girangati.brain.audit(signal, data);
                
            } catch(error) {
                console.error('❌ Brain emit error:', error);
                Girangati.brain.handleError(error);
            }
        },

        route: function(signal, data, analysis) {
            console.log('🔄 Routing:', analysis.category);
            
            // Module routing
            const handlers = {
                'dashboard': () => loadModule('commandcenter'),
                'booking': () => loadModule('booking'),
                'safety': () => loadModule('k3'),
                'security': () => loadModule('sekuriti'),
                'cleaning': () => loadModule('janitor'),
                'inventory': () => loadModule('stok'),
                'repair': () => loadModule('maintenance'),
                'assets': () => loadModule('asset')
            };
            if(handlers[analysis.category]) {
                handlers[analysis.category]();
            }
        },

        audit: function(signal, data) {
            const log = {
                timestamp: new Date().toISOString(),
                signal: signal,
                data: data,
                user: Girangati.babyAgent.context.user,
                status: 'SUCCESS'
            };
            
            // Store audit log
            const logs = JSON.parse(localStorage.getItem('girangati_audit') || '[]');
            logs.push(log);
            localStorage.setItem('girangati_audit', JSON.stringify(logs.slice(-100)));
        },

        handleError: function(error) {
            console.error('🚨 Error Handler:', error);
            
            const errorLog = {
                timestamp: new Date().toISOString(),
                error: error.message,
                stack: error.stack,
                user: Girangati.babyAgent.context.user,
                status: 'ERROR'
            };
            
            const logs = JSON.parse(localStorage.getItem('girangati_errors') || '[]');
            logs.push(errorLog);
            localStorage.setItem('girangati_errors', JSON.stringify(logs.slice(-50)));
        },

        getStatus: function() {
            return {
                identity: Girangati.identity,
                version: Girangati.version,
                mode: Girangati.mode,
                status: Girangati.status
            };
        }
    },

    // 📊 SYSTEM DIAGNOSTICS
    diagnostics: function() {
        return {
            identity: this.identity,            version: this.version,
            tiny: this.tiny.getStatus(),
            babyAgent: this.babyAgent.getStatus(),
            brain: this.brain.getStatus(),
            memory: {
                localStorage: localStorage.length + ' items',
                sessionStorage: sessionStorage.length + ' items'
            },
            network: navigator.onLine ? 'ONLINE' : 'OFFLINE'
        };
    },

    // 🚀 INITIALIZATION
    init: async function() {
        console.log('🧬 Girangati Neural Core Initializing...');
        await this.tiny.init();
        this.babyAgent.init();
        this.status = 'FULLY_OPERATIONAL';
        console.log('✅ Girangati Ready!');
        return this.diagnostics();
    }
};

// Global assignment
window.girangati = Girangati;

// Auto-init on load
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Girangati.init());
} else {
    Girangati.init();
}

export default {
    name: 'Ghost Stealth',
    icon: 'fa-ghost',
    color: '#a855f7',
    version: '1.0.0',

    render(context) {
        return `
            <div style="padding:20px; background:#0f172a; border-radius:28px; border:1px solid #a855f7;">
                <h2 style="color:#a855f7;"><i class="fas fa-ghost"></i> Ghost Stealth Mode</h2>
                <p style="color:#94a3b8;">Akses alat pengembangan & debugging sistem. Hanya untuk pengguna terverifikasi.</p>

                <div class="ghost-tabs" style="display:flex; gap:8px; margin:20px 0;">
                    <button class="ghost-tab active" data-tool="eruda">🕵️ Eruda Console</button>
                    <button class="ghost-tab" data-tool="terminal">🐉 Kali Terminal</button>
                    <button class="ghost-tab" data-tool="docker">🐳 Docker Control</button>
                    <button class="ghost-tab" data-tool="debug">🔧 Debug Tools</button>
                </div>

                <div id="ghost-content" style="background:#0f0f1f; border-radius:16px; padding:16px; min-height:400px;">
                    <p>Pilih alat di atas.</p>
                </div>

                <div style="margin-top:16px; font-size:12px; color:#64748b; text-align:center;">
                    <i class="fas fa-skull"></i> Ghost mode aktif – semua aktivitas dicatat secara anonim.
                </div>
            </div>

            <style>
                .ghost-tab {
                    background: #1e293b;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 20px;
                    cursor: pointer;
                    color: #94a3b8;
                    transition: all 0.3s;
                }
                .ghost-tab.active {
                    background: #a855f7;
                    color: #000;
                }
                .ghost-tab:hover {
                    background: #a855f7;
                    color: #000;
                }
                #ghost-content {
                    overflow-y: auto;
                    max-height: 500px;
                }
                .terminal {
                    background: #000;
                    color: #0f0;
                    font-family: monospace;
                    padding: 10px;
                    border-radius: 8px;
                    height: 300px;
                    overflow-y: auto;
                }
                .terminal-input {
                    display: flex;
                    gap: 8px;
                    margin-top: 10px;
                }
                .terminal-input input {
                    flex: 1;
                    background: #1e293b;
                    border: 1px solid #334155;
                    color: #0f0;
                    padding: 8px;
                    border-radius: 8px;
                }
                .docker-card {
                    background: #0f172a;
                    border-radius: 12px;
                    padding: 12px;
                    margin-bottom: 12px;
                }
            </style>
        `;
    },

    afterRender(context) {
        // ========== ERUDA ==========
        function loadEruda() {
            if (typeof window.eruda === 'undefined') {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/eruda';
                script.onload = () => {
                    window.eruda.init();
                    window.eruda.show();
                };
                document.head.appendChild(script);
            } else {
                window.eruda.show();
            }
        }

        // ========== SIMULASI TERMINAL KALI ==========
        let terminalHistory = [];
        function initTerminal(container) {
            const termDiv = document.createElement('div');
            termDiv.className = 'terminal';
            termDiv.innerHTML = `
                <div>Kali Linux Simulation (Type 'help' for commands)</div>
                <div id="term-output"></div>
                <div class="terminal-input">
                    <span style="color:#0f0;">$</span>
                    <input type="text" id="term-input" placeholder="Masukkan perintah...">
                </div>
            `;
            container.innerHTML = '';
            container.appendChild(termDiv);

            const outputDiv = termDiv.querySelector('#term-output');
            const inputField = termDiv.querySelector('#term-input');

            const addLine = (text, isError = false) => {
                const line = document.createElement('div');
                line.textContent = text;
                line.style.color = isError ? '#f00' : '#0f0';
                outputDiv.appendChild(line);
                outputDiv.scrollTop = outputDiv.scrollHeight;
            };

            const processCommand = async (cmd) => {
                const trimmed = cmd.trim().toLowerCase();
                addLine(`$ ${cmd}`);

                // Simulasi perintah umum
                if (trimmed === 'help') {
                    addLine('Perintah yang tersedia:');
                    addLine('  ls          - daftar direktori');
                    addLine('  ifconfig    - tampilkan konfigurasi jaringan');
                    addLine('  docker ps   - daftar container Docker');
                    addLine('  clear       - bersihkan terminal');
                    addLine('  neofetch    - tampilkan info sistem (mock)');
                    addLine('  apt update  - update package (simulasi)');
                } else if (trimmed === 'ls') {
                    addLine('Desktop  Documents  Downloads  Pictures  Videos  tools  docker');
                } else if (trimmed === 'ifconfig') {
                    addLine('eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500');
                    addLine('        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255');
                    addLine('        inet6 fe80::1  prefixlen 64  scopeid 0x20');
                    addLine('lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536');
                    addLine('        inet 127.0.0.1  netmask 255.0.0.0');
                } else if (trimmed === 'docker ps') {
                    addLine('CONTAINER ID   IMAGE          COMMAND       CREATED        STATUS        PORTS');
                    addLine('abc123def456   kali-rolling   "/bin/bash"   2 hours ago    Up 2 hours    0.0.0.0:22->22/tcp');
                    addLine('789ghi012jk   alpine:latest  "sleep 3600"  1 day ago     Up 1 day');
                } else if (trimmed === 'clear') {
                    outputDiv.innerHTML = '';
                } else if (trimmed === 'neofetch') {
                    addLine('            .-/+oossssoo+/-.               ghost@kali');
                    addLine('        `:+ssssssssssssssssss+:`           OS: Kali Linux Rolling x86_64');
                    addLine('      -+ssssssssssssssssssyyssss+-         Host: Dream OS VM');
                    addLine('    .ossssssssssssssssssdMMMNysssso.       Kernel: 6.1.0-kali7-amd64');
                    addLine('   /ssssssssssshdmmNNmmyNMMMMhssssss/      Uptime: 3 days, 14 hours');
                    addLine('  +ssssssssshmydMMMMMMMNddddyssssssss+     Packages: 2345 (dpkg)');
                    addLine(' /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/    Shell: zsh 5.9');
                    addLine('.ssssssssdMMMNhsssssssssshNMMMdssssssss.   Terminal: Ghost Terminal');
                    addLine('+sssshhhyNMMNyssssssssssssyNMMMysssssss+   CPU: Intel Core i7-10750H (12) @ 2.60GHz');
                    addLine('ossyNMMMNyMMhsssssssssssssshmmmhssssssso   GPU: NVIDIA GeForce GTX 1650 Ti');
                    addLine('ossyNMMMNyMMhsssssssssssssshmmmhssssssso   Memory: 15687MiB / 32100MiB');
                    addLine('+sssshhhyNMMNyssssssssssssyNMMMysssssss+   Disk: 256G / 512G');
                    addLine('.ssssssssdMMMNhsssssssssshNMMMdssssssss.   Local IP: 192.168.1.100');
                    addLine(' /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/    Public IP: 103.xx.xx.xx');
                    addLine('  +ssssssssshmydMMMMMMMNddddyssssssss+     GitHub: @dreamos');
                    addLine('   /ssssssssssshdmmNNmmyNMMMMhssssss/      Discord: dreamos');
                    addLine('    .ossssssssssssssssssdMMMNysssso.       Twitter: @dreamos_sys');
                    addLine('      -+ssssssssssssssssssyyssss+-         ');
                    addLine('        `:+ssssssssssssssssss+:`           ');
                    addLine('            .-/+oossssoo+/-.               ');
                } else if (trimmed === 'apt update') {
                    addLine('Get:1 http://kali.download/kali kali-rolling InRelease [30.5 kB]');
                    addLine('Get:2 http://kali.download/kali kali-rolling/main amd64 Packages [15.2 MB]');
                    addLine('Fetched 15.2 MB in 2s (7,600 kB/s)');
                    addLine('Reading package lists... Done');
                    addLine('Building dependency tree... Done');
                    addLine('All packages are up to date.');
                } else {
                    addLine(`Command not found: ${cmd}`, true);
                }
            };

            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const cmd = inputField.value;
                    if (cmd.trim()) processCommand(cmd);
                    inputField.value = '';
                }
            });
        }

        // ========== DOCKER SIMULASI ==========
        function initDocker(container) {
            container.innerHTML = `
                <div class="docker-card">
                    <h3>🐳 Docker Status</h3>
                    <p>Docker Engine: <span style="color:#10b981;">● Running</span></p>
                    <p>Version: 24.0.7</p>
                    <p>Containers: 2 running, 0 stopped</p>
                    <p>Images: 5</p>
                    <hr>
                    <h4>Containers</h4>
                    <ul>
                        <li><span style="color:#10b981;">▲</span> kali-rolling (Up 2 hours) - Port: 22->22/tcp</li>
                        <li><span style="color:#10b981;">▲</span> alpine:latest (Up 1 day) - CMD: sleep 3600</li>
                    </ul>
                    <h4>Images</h4>
                    <ul>
                        <li>kali-rolling:latest (2.3GB)</li>
                        <li>alpine:latest (5.6MB)</li>
                        <li>ubuntu:22.04 (77MB)</li>
                        <li>nginx:latest (142MB)</li>
                        <li>node:18-alpine (112MB)</li>
                    </ul>
                    <button id="docker-pull" style="background:#a855f7; border:none; padding:6px 12px; border-radius:20px;">Pull Image (simulasi)</button>
                </div>
            `;
            const pullBtn = container.querySelector('#docker-pull');
            if (pullBtn) {
                pullBtn.addEventListener('click', () => {
                    alert('Simulasi: Pulling image... (tidak ada koneksi Docker nyata)');
                });
            }
        }

        // ========== DEBUG TOOLS ==========
        function initDebug(container) {
            container.innerHTML = `
                <div class="docker-card">
                    <h3>🔧 Debug Tools</h3>
                    <p><strong>LocalStorage:</strong> <button id="show-storage">Tampilkan</button></p>
                    <p><strong>SessionStorage:</strong> <button id="show-session">Tampilkan</button></p>
                    <p><strong>Network Info:</strong> <button id="network-info">Cek Koneksi</button></p>
                    <p><strong>Browser Info:</strong> <span id="browser-info"></span></p>
                    <p><strong>User Agent:</strong> <span id="user-agent"></span></p>
                    <hr>
                    <h4>System Logs (simulasi)</h4>
                    <div id="debug-logs" style="background:#0f172a; padding:8px; border-radius:8px; max-height:150px; overflow-y:auto;">
                        <div>[INFO] Ghost module loaded</div>
                        <div>[DEBUG] Eruda initialized</div>
                        <div>[WARN] Docker mock mode active</div>
                    </div>
                    <button id="clear-logs" style="background:#ef4444; border:none; padding:4px 8px; border-radius:12px; margin-top:8px;">Clear Logs</button>
                </div>
            `;

            document.getElementById('browser-info').innerText = navigator.userAgent;
            document.getElementById('user-agent').innerText = navigator.userAgent;

            const showStorage = container.querySelector('#show-storage');
            showStorage.addEventListener('click', () => {
                let str = '';
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    str += `${key}: ${localStorage.getItem(key)}\n`;
                }
                alert(str || 'Kosong');
            });

            const showSession = container.querySelector('#show-session');
            showSession.addEventListener('click', () => {
                let str = '';
                for (let i = 0; i < sessionStorage.length; i++) {
                    const key = sessionStorage.key(i);
                    str += `${key}: ${sessionStorage.getItem(key)}\n`;
                }
                alert(str || 'Kosong');
            });

            const networkInfo = container.querySelector('#network-info');
            networkInfo.addEventListener('click', () => {
                if (navigator.onLine) {
                    alert('Koneksi internet aktif');
                } else {
                    alert('Tidak ada koneksi internet');
                }
            });

            const clearLogs = container.querySelector('#clear-logs');
            const logsDiv = container.querySelector('#debug-logs');
            clearLogs.addEventListener('click', () => {
                logsDiv.innerHTML = '<div>[INFO] Logs cleared</div>';
            });
        }

        // ========== TAB SWITCHING ==========
        const tabs = document.querySelectorAll('.ghost-tab');
        const contentDiv = document.getElementById('ghost-content');

        const switchTool = (tool) => {
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelector(`.ghost-tab[data-tool="${tool}"]`).classList.add('active');

            if (tool === 'eruda') {
                contentDiv.innerHTML = '<p>Mengaktifkan Eruda...</p>';
                loadEruda();
                setTimeout(() => {
                    contentDiv.innerHTML = '<p>Eruda sudah aktif. Gunakan ikon di pojok kanan bawah.</p>';
                }, 500);
            } else if (tool === 'terminal') {
                initTerminal(contentDiv);
            } else if (tool === 'docker') {
                initDocker(contentDiv);
            } else if (tool === 'debug') {
                initDebug(contentDiv);
            }
        };

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tool = tab.dataset.tool;
                switchTool(tool);
            });
        });

        // Default: terminal
        switchTool('terminal');
    }
};

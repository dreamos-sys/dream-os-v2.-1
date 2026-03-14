/**
 * modules/settings/module.js
 * Dream OS v2.1 - Settings with Theme Switcher
 */

export default async function({ container, services, supabase, user }) {
    
    const themes = window.ThemeManager?.getAvailable() || [];

    container.innerHTML = `
        <style>
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .settings-card {
                background: var(--glass-bg);
                backdrop-filter: var(--glass-blur);
                border: var(--glass-border);
                border-radius: var(--radius-lg);
                padding: 16px;
                margin-bottom: 16px;
                animation: fadeInUp 0.5s ease;
            }
            .theme-card {
                background: var(--card-bg);
                border: 2px solid transparent;
                border-radius: var(--radius-lg);
                padding: 16px;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
            }
            .theme-card:hover {
                transform: translateY(-3px);
                box-shadow: var(--shadow);
            }
            .theme-card.active {
                border-color: var(--color-primary);
                box-shadow: 0 0 0 3px var(--color-primary-glow);
            }
            .theme-card.active::after {
                content: '✓';
                position: absolute;
                top: 8px;
                right: 8px;
                background: var(--color-primary);
                color: white;
                width: 24px;                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-weight: 700;
            }
            .theme-preview {
                width: 100%;
                height: 80px;
                border-radius: var(--radius-md);
                margin-bottom: 12px;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 4px;
                padding: 8px;
            }
            .theme-preview-item {
                border-radius: 6px;
            }
            .setting-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid var(--color-border);
            }
            .setting-row:last-child {
                border-bottom: none;
            }
            .toggle {
                width: 50px;
                height: 26px;
                background: var(--color-text-subtle);
                border-radius: 13px;
                position: relative;
                cursor: pointer;
                transition: all 0.3s;
            }
            .toggle.active {
                background: var(--color-primary);
            }
            .toggle::after {
                content: '';
                position: absolute;
                top: 3px;
                left: 3px;
                width: 20px;
                height: 20px;                background: white;
                border-radius: 50%;
                transition: all 0.3s;
            }
            .toggle.active::after {
                left: 27px;
            }
            .btn-primary {
                background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: var(--radius-md);
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
                box-shadow: 0 4px 15px var(--color-primary-glow);
            }
            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px var(--color-primary-glow);
            }
        </style>

        <div style="padding: 16px; padding-bottom: 100px;">
            <!-- Header -->
            <div style="margin-bottom: 24px; animation: fadeInUp 0.5s ease;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); border-radius: 14px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px var(--color-primary-glow);">
                        <i class="fas fa-sliders" style="color: white; font-size: 1.5rem;"></i>
                    </div>
                    <div>
                        <h1 style="color: var(--text-primary); font-size: 1.5rem; font-weight: 700;">Settings</h1>
                        <p style="color: var(--text-muted); font-size: 0.875rem;">System Configuration</p>
                    </div>
                </div>
            </div>

            <!-- Theme Selector -->
            <div class="settings-card">
                <h2 style="color: var(--text-primary); font-size: 1.1rem; font-weight: 600; margin-bottom: 16px;">
                    <i class="fas fa-palette" style="color: var(--color-primary); margin-right: 8px;"></i> Theme
                </h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px;">
                    ${themes.map(theme => `
                        <div class="theme-card ${window.ThemeManager?.getCurrent() === theme.id ? 'active' : ''}" 
                             onclick="window.changeTheme('${theme.id}')">
                            <div class="theme-preview" style="
                                background: linear-gradient(135deg, ${theme.colors['--bg-primary']}, ${theme.colors['--bg-secondary']});
                            ">                                <div class="theme-preview-item" style="background: ${theme.colors['--color-primary']};"></div>
                                <div class="theme-preview-item" style="background: ${theme.colors['--color-secondary']};"></div>
                                <div class="theme-preview-item" style="background: ${theme.colors['--color-accent']};"></div>
                            </div>
                            <div style="color: var(--text-primary); font-size: 12px; font-weight: 600; text-align: center;">
                                ${theme.name}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Display Settings -->
            <div class="settings-card">
                <h2 style="color: var(--text-primary); font-size: 1.1rem; font-weight: 600; margin-bottom: 16px;">
                    <i class="fas fa-display" style="color: var(--color-secondary); margin-right: 8px;"></i> Display
                </h2>
                <div class="setting-row">
                    <div>
                        <div style="color: var(--text-primary); font-size: 14px; font-weight: 600; margin-bottom: 4px;">Dark Mode</div>
                        <div style="color: var(--text-muted); font-size: 12px;">Use dark theme</div>
                    </div>
                    <div class="toggle ${window.ThemeManager?.getCurrent() === 'dark-glass' ? 'active' : ''}" 
                         onclick="window.toggleDarkMode(this)"></div>
                </div>
                <div class="setting-row">
                    <div>
                        <div style="color: var(--text-primary); font-size: 14px; font-weight: 600; margin-bottom: 4px;">Animations</div>
                        <div style="color: var(--text-muted); font-size: 12px;">Smooth transitions</div>
                    </div>
                    <div class="toggle active" onclick="window.toggleSetting(this, 'animations')"></div>
                </div>
                <div class="setting-row">
                    <div>
                        <div style="color: var(--text-primary); font-size: 14px; font-weight: 600; margin-bottom: 4px;">Haptic Feedback</div>
                        <div style="color: var(--text-muted); font-size: 12px;">Vibration on touch</div>
                    </div>
                    <div class="toggle active" onclick="window.toggleSetting(this, 'haptic')"></div>
                </div>
            </div>

            <!-- System Info -->
            <div class="settings-card">
                <h2 style="color: var(--text-primary); font-size: 1.1rem; font-weight: 600; margin-bottom: 16px;">
                    <i class="fas fa-info-circle" style="color: var(--color-accent); margin-right: 8px;"></i> System Info
                </h2>
                <div class="setting-row">
                    <div style="color: var(--text-muted); font-size: 13px;">Version</div>
                    <div style="color: var(--text-primary); font-size: 13px; font-family: var(--font-mono);">2.1.0-Sovereign</div>
                </div>                <div class="setting-row">
                    <div style="color: var(--text-muted); font-size: 13px;">Build</div>
                    <div style="color: var(--text-primary); font-size: 13px; font-family: var(--font-mono);">2026.1.0</div>
                </div>
                <div class="setting-row">
                    <div style="color: var(--text-muted); font-size: 13px;">Current Theme</div>
                    <div style="color: var(--color-primary); font-size: 13px; font-weight: 600;" id="current-theme-display">
                        ${themes.find(t => t.id === window.ThemeManager?.getCurrent())?.name || 'Dark Glass'}
                    </div>
                </div>
                <div class="setting-row">
                    <div style="color: var(--text-muted); font-size: 13px;">Storage</div>
                    <div style="color: var(--text-primary); font-size: 13px;">${localStorage.length} items</div>
                </div>
            </div>

            <!-- Actions -->
            <div style="display: grid; gap: 12px; margin-top: 24px;">
                <button class="btn-primary" style="width: 100%;" onclick="window.clearCache()">
                    <i class="fas fa-trash" style="margin-right: 8px;"></i> Clear Cache
                </button>
                <button class="btn-primary" style="width: 100%; background: linear-gradient(135deg, #ef4444, #dc2626);" onclick="window.resetSettings()">
                    <i class="fas fa-undo" style="margin-right: 8px;"></i> Reset Settings
                </button>
            </div>
        </div>
    `;

    // Global functions
    window.changeTheme = async (themeId) => {
        await window.ThemeManager?.set(themeId);
        document.querySelectorAll('.theme-card').forEach(card => {
            card.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
        document.getElementById('current-theme-display').textContent = 
            themes.find(t => t.id === themeId)?.name || themeId;
    };

    window.toggleDarkMode = (el) => {
        el.classList.toggle('active');
        const isDark = el.classList.contains('active');
        window.ThemeManager?.set(isDark ? 'dark-glass' : 'light-minimal');
    };

    window.toggleSetting = (el, setting) => {
        el.classList.toggle('active');
        const isActive = el.classList.contains('active');
        localStorage.setItem(`dreamos-${setting}`, isActive);
        if (window.DREAM_SYS) {            window.DREAM_SYS.toast(`${setting}: ${isActive ? 'ON' : 'OFF'}`, 'info');
        }
    };

    window.clearCache = async () => {
        if (confirm('Clear all cache and local data?')) {
            localStorage.clear();
            sessionStorage.clear();
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(name => caches.delete(name)));
            }
            if (window.DREAM_SYS) {
                window.DREAM_SYS.toast('Cache cleared! Reload...', 'success');
            }
            setTimeout(() => location.reload(), 1000);
        }
    };

    window.resetSettings = async () => {
        if (confirm('Reset all settings to default?')) {
            localStorage.setItem('dreamos-theme', 'dark-glass');
            await window.ThemeManager?.set('dark-glass');
            if (window.DREAM_SYS) {
                window.DREAM_SYS.toast('Settings reset!', 'success');
            }
            setTimeout(() => location.reload(), 1000);
        }
    };

    console.log('✅ [SETTINGS] Module loaded with Theme Switcher');
    
    return function cleanup() {
        console.log('🧹 [SETTINGS] Cleanup complete');
    };
}

export default {
    name: 'Command Center',
    icon: 'fa-building',
    color: '#a855f7',
    version: '5.0',
    
    async render(context) {
        // Redirect ke halaman terpisah
        window.open('/command-center.html', '_blank');
        return `
            <div style="text-align:center; padding:40px;">
                <i class="fas fa-external-link-alt" style="font-size:48px; color:#a855f7;"></i>
                <p style="margin-top:15px;">Opening Command Center in new window...</p>
                <p style="font-size:12px; color:#64748b;">If not opened, <a href="/command-center.html" target="_blank">click here</a></p>
            </div>
        `;
    }
};

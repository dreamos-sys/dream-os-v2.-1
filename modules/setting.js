// 🛠️ SETTING ENGINE - DREAM OS v13.0 MASTER CONFIG
// ISO Standard: 27001, 9001, 55001 Integrated

window.renderModule = () => {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div style="padding:20px; color:#f8fafc; font-family:sans-serif;">
            <h2 style="color:#10b981; border-bottom:2px solid #10b981; padding-bottom:10px;">⚙️ System Settings</h2>
            
            <div style="margin-top:20px; background:#1e293b; padding:15px; border-radius:10px;">
                <h4 style="margin:0; color:#94a3b8;">Sovereign ID</h4>
                <p style="margin:5px 0; font-weight:bold;">Dream OS ver. 13.0 (ISO Certified)</p>
                <p style="font-size:12px; color:#64748b;">Device: Xiaomi Redmi Note 9 Pro</p>
            </div>

            <div style="margin-top:15px;">
                <h4 style="color:#10b981;">🛡️ Security & Tools</h4>
                <ul style="list-style:none; padding:0;">
                    <li style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #334155;">
                        <span>Ghost Mode (Stealth)</span>
                        <input type="checkbox" checked>
                    </li>
                    <li style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #334155;">
                        <span>Depok Lightning Shield</span>
                        <span style="color:#10b981; font-size:12px;">ACTIVE</span>
                    </li>
                    <li style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #334155;">
                        <span>Fingerprint Listening</span>
                        <input type="checkbox" checked>
                    </li>
                </ul>
            </div>

            <div style="margin-top:15px;">
                <h4 style="color:#10b981;">📋 Approval System</h4>
                <div style="background:#0f172a; padding:10px; border-left:4px solid #fbbf24;">
                    <p style="font-size:13px; margin:0;"><b>Approver:</b> Hanung Budianto S. E</p>
                    <p style="font-size:13px; margin:5px 0 0 0;"><b>Applicant:</b> Erwinsyah</p>
                </div>
            </div>

            <button onclick="loadModule('home')" style="margin-top:30px; width:100%; padding:15px; background:#10b981; color:white; border:none; border-radius:8px; font-weight:bold;">SAVE & BACK TO DASHBOARD</button>
            
            <p style="text-align:center; font-size:10px; margin-top:20px; color:#475569;">Bismillah bi idznillah - The Power Soul of Shalawat</p>
        </div>
    `;
};

/**
 * modules/home/module.js
 * Dream OS v2.1 - Home Dashboard
 */

export default async function({ container, user }) {
    container.innerHTML = `
        <div style="padding:16px;padding-bottom:100px;">
            <h1 style="color:var(--text-primary);font-size:1.5rem;margin-bottom:16px;">Welcome Home</h1>
            <p style="color:var(--text-muted);">Dashboard coming soon...</p>
        </div>
    `;
}

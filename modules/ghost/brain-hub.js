export default async function render({ container }) {
    container.innerHTML = `
        <div class="p-6 bg-[#020617] min-h-screen text-emerald-400 font-mono">
            <h2 class="text-xl mb-6 border-b border-emerald-900 pb-2">GHOST MONITORING</h2>
            <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-slate-900 p-4 rounded-xl border border-emerald-800">
                    <p class="text-[10px] opacity-70">ACTIVE USERS</p>
                    <p class="text-2xl">842</p>
                </div>
                <div class="bg-slate-900 p-4 rounded-xl border border-emerald-800">
                    <p class="text-[10px] opacity-70">SYSTEM LOAD</p>
                    <p class="text-2xl">42%</p>
                </div>
            </div>
            <div class="bg-slate-900 p-4 rounded-xl border border-emerald-800 text-[10px]">
                <p>STATUS: OPERATIONAL (ISO 27001)</p>
                <p>AUDIT: ERWINSYAH -> HANUNG APPROVED</p>
            </div>
        </div>
    `;
}

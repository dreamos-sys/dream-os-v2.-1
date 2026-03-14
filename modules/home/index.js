export default async function render({ container }) {
    const menus = ['Home','K3','Sekuriti','Ceklis','Stok','Maint','Asset','Laporan','TV'];
    container.innerHTML = `
        <div class="max-w-md mx-auto pt-8 pb-24 px-4">
            <div class="grid grid-cols-3 gap-3">
                ${menus.map(m => `
                    <div class="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-none flex flex-col items-center justify-center">
                        <i class="fa-solid fa-box text-emerald-500 text-xl mb-2"></i>
                        <span class="text-[10px] font-bold text-slate-700 dark:text-emerald-50">${m}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

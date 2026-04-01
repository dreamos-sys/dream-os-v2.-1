export default function CommandCenterPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <h1 className="text-lg font-bold">🚀 Command Center</h1>
      </header>
      <div className="p-4">
        <p className="text-gray-700">Command Center loaded successfully! ✨</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-gray-500">Total</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-2xl font-bold">5</p>
            <p className="text-xs text-gray-500">Pending</p>
          </div>
        </div>
      </div>
    </main>
  );
}

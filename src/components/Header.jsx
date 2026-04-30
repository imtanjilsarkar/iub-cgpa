export default function Header({ dark, toggleDark }) {
  return (
    <header className="text-center pt-8 pb-4 px-4">
      <div className="flex justify-end max-w-2xl mx-auto mb-2">
        <button
          onClick={toggleDark}
          className="px-4 py-2 rounded-xl text-sm font-medium transition-all bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 flex items-center gap-2"
        >
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-[#1a365d] dark:text-blue-400">
        🎓 IUB CGPA Calculator
      </h1>
      <div className="mt-3 max-w-2xl mx-auto bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg px-4 py-2 text-sm text-amber-700 dark:text-amber-300">
        ⚠️ <strong>Disclaimer:</strong> This is not the official calculator. The CGPA calculated may vary from the official transcript. Use at your own risk.
      </div>
    </header>
  );
}
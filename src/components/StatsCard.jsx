export default function StatsCard({ label, value, highlight }) {
  return (
    <div className={`rounded-xl p-4 text-center shadow-sm border transition-all ${
      highlight 
        ? 'bg-blue-600 border-blue-700' 
        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'
    }`}>
      <p className={`text-xs uppercase tracking-wide font-medium ${
        highlight ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
      }`}>
        {label}
      </p>
      <p className={`text-3xl font-bold mt-1 ${highlight ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
        {value}
      </p>
    </div>
  );
}
import { useState } from 'react';

export default function PreviousCGPA({ previousCGPA, previousCredits, onUpdate }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div
        className="flex items-center gap-2 px-4 py-3 bg-green-50 dark:bg-green-900/20 cursor-pointer select-none"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <span className="text-gray-400 dark:text-gray-500 text-sm shrink-0">{isCollapsed ? '▶' : '▼'}</span>
        <span className="font-semibold text-green-700 dark:text-green-300 text-sm sm:text-base">
           Previous CGPA
        </span>
        {(previousCGPA > 0 || previousCredits > 0) && (
          <span className="text-xs text-green-600 dark:text-green-400 ml-auto">
            CGPA: {previousCGPA.toFixed(2)} | Credits: {previousCredits}
          </span>
        )}
      </div>

      {!isCollapsed && (
        <div className="px-4 py-3 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Your Current CGPA
            </label>
            <input
              type="number"
              value={previousCGPA || ''}
              onChange={(e) => onUpdate({ cgpa: parseFloat(e.target.value) || 0, credits: previousCredits })}
              placeholder="e.g. 3.69"
              step="0.01"
              min="0"
              max="4.00"
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Credits Earned
            </label>
            <input
              type="number"
              value={previousCredits || ''}
              onChange={(e) => onUpdate({ cgpa: previousCGPA, credits: parseInt(e.target.value) || 0 })}
              placeholder="e.g. 79"
              min="0"
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>
        </div>
      )}
    </div>
  );
}

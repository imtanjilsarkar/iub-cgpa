import ExportButton from './ExportButton';

export default function Footer({ onReset, onAddSemester, hasData, showExport }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mt-6 px-4 pb-8">
      <button
        onClick={onAddSemester}
        className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
      >
        + Add Semester
      </button>
      {showExport && <ExportButton />}
      {hasData && (
        <button
          onClick={onReset}
          className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-5 py-2.5 rounded-xl font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-200 dark:border-red-800"
        >
          Reset All
        </button>
      )}
    </div>
  );
}
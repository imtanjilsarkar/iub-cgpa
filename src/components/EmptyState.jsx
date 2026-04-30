export default function EmptyState({ onAddSemester }) {
  return (
    <div className="text-center py-16 px-4">
      <div className="text-6xl mb-4">📚</div>
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Courses Yet</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Add your first semester to start calculating your CGPA</p>
      <button
        onClick={onAddSemester}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
      >
        + Add Semester
      </button>
    </div>
  );
}
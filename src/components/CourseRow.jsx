import { getGradePoint, getGradeColor, gradeOptions } from '../utils/gradeData';

export default function CourseRow({ course, index, onUpdate, onDelete }) {
  const gradePoint = getGradePoint(course.grade);
  const colorClass = course.grade ? getGradeColor(gradePoint) : '';

  return (
    <div className="flex items-center gap-2 py-2 group hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg px-2 transition-colors">
      <span className="text-gray-400 dark:text-gray-500 text-sm w-6 text-center shrink-0">{index + 1}</span>

      <input
        type="text"
        value={course.name}
        onChange={(e) => onUpdate({ ...course, name: e.target.value })}
        placeholder="Course name"
        className="flex-1 min-w-[100px] px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500"
      />

      <select
        value={course.grade}
        onChange={(e) => onUpdate({ ...course, grade: e.target.value })}
        className={`px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:bg-gray-800 dark:text-gray-200 ${colorClass}`}
        style={course.grade ? {} : { color: '#9ca3af' }}
      >
        <option value="">Grade</option>
        {gradeOptions.map(g => (
          <option key={g.grade} value={g.grade} className="dark:bg-gray-800">
            {g.grade} ({g.point.toFixed(2)})
          </option>
        ))}
      </select>

      <input
        type="number"
        value={course.credits || ''}
        onChange={(e) => onUpdate({ ...course, credits: Number(e.target.value) })}
        placeholder="Cr"
        min="0"
        max="6"
        className="w-14 px-2 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-center dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400 dark:placeholder-gray-500"
      />

      <button
        onClick={onDelete}
        className="text-gray-300 dark:text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 shrink-0 text-lg"
        title="Delete course"
      >
        ✕
      </button>
    </div>
  );
}
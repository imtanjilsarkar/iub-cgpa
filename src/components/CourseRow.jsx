import { getGradePoint, getGradeColor, gradeOptions } from '../utils/gradeData';

export default function CourseRow({ course, index, onUpdate, onDelete }) {
  const gradePoint = getGradePoint(course.grade);
  const colorClass = course.grade ? getGradeColor(gradePoint) : '';

  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2 py-2 group hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg px-1 sm:px-2 transition-colors">
      {/* Row Number - Hidden on mobile */}
      <span className="hidden sm:block text-gray-400 dark:text-gray-500 text-sm w-6 text-center shrink-0">{index + 1}</span>

      {/* Course Name - Full width on mobile */}
      <input
        type="text"
        value={course.name}
        onChange={(e) => onUpdate({ ...course, name: e.target.value })}
        placeholder="Course"
        className="w-full sm:flex-1 sm:min-w-[100px] px-2 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500"
      />

      {/* Grade + Credit + Delete - In a row below on mobile */}
      <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
        <select
          value={course.grade}
          onChange={(e) => onUpdate({ ...course, grade: e.target.value })}
          className={`flex-1 sm:w-28 px-2 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:bg-gray-800 dark:text-gray-200 ${colorClass}`}
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
          className="w-14 px-2 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-center dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400 dark:placeholder-gray-500 shrink-0"
        />

        <button
          onClick={onDelete}
          className="text-gray-300 dark:text-gray-600 hover:text-red-500 transition-colors text-lg shrink-0 p-1"
          title="Delete course"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

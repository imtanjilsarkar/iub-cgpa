import { useState } from 'react';
import CourseRow from './CourseRow';
import { calculateSGPA } from '../utils/calculator';

export default function SemesterBlock({ semester, index, onUpdate, onDelete }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sgpa = calculateSGPA(semester.courses);

  const addCourse = () => {
    const newCourse = { id: Date.now(), name: '', grade: '', credits: 0 };
    onUpdate({ ...semester, courses: [...semester.courses, newCourse] });
  };

  const updateCourse = (courseId, updatedCourse) => {
    onUpdate({ ...semester, courses: semester.courses.map(c => c.id === courseId ? updatedCourse : c) });
  };

  const deleteCourse = (courseId) => {
    onUpdate({ ...semester, courses: semester.courses.filter(c => c.id !== courseId) });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-all">
      <div
        className="flex items-center justify-between px-5 py-4 bg-gray-50 dark:bg-gray-800/50 cursor-pointer select-none"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-3">
          <span className="text-gray-400 dark:text-gray-500 text-sm">{isCollapsed ? '▶' : '▼'}</span>
          <input
            type="text"
            value={semester.name}
            onChange={(e) => onUpdate({ ...semester, name: e.target.value })}
            onClick={(e) => e.stopPropagation()}
            placeholder={`Semester ${index + 1}`}
            className="font-semibold text-gray-800 dark:text-gray-200 bg-transparent border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 focus:border-blue-500 focus:outline-none px-1"
          />
          <span className="text-xs text-gray-400 dark:text-gray-500">{semester.courses.length} courses</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full">
            SGPA: {sgpa.toFixed(2)}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="text-gray-400 dark:text-gray-500 hover:text-red-500 transition-colors"
            title="Delete semester"
          >
            🗑
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="px-5 py-3">
          <div className="flex items-center gap-2 py-2 text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 font-medium border-b border-gray-100 dark:border-gray-800 mb-1 px-2">
            <span className="w-6 text-center">#</span>
            <span className="flex-1 min-w-[100px]">Course</span>
            <span className="w-28">Grade</span>
            <span className="w-14 text-center">Credit</span>
            <span className="w-6"></span>
          </div>

          {semester.courses.map((course, idx) => (
            <CourseRow
              key={course.id}
              course={course}
              index={idx}
              onUpdate={(updated) => updateCourse(course.id, updated)}
              onDelete={() => deleteCourse(course.id)}
            />
          ))}

          <button
            onClick={addCourse}
            className="mt-3 text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
          >
            + Add Course
          </button>
        </div>
      )}
    </div>
  );
}
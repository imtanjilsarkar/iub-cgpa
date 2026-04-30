export const gradeOptions = [
  { grade: 'A', point: 4.00 },
  { grade: 'A-', point: 3.70 },
  { grade: 'B+', point: 3.30 },
  { grade: 'B', point: 3.00 },
  { grade: 'B-', point: 2.70 },
  { grade: 'C+', point: 2.30 },
  { grade: 'C', point: 2.00 },
  { grade: 'C-', point: 1.70 },
  { grade: 'D+', point: 1.30 },
  { grade: 'D', point: 1.00 },
  { grade: 'F', point: 0.00 },
];

export const getGradePoint = (grade) => {
  const found = gradeOptions.find(g => g.grade === grade);
  return found ? found.point : 0;
};

export const getGradeColor = (point) => {
  if (point >= 3.70) return 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/40';
  if (point >= 3.00) return 'text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/40';
  if (point >= 2.00) return 'text-orange-700 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/40';
  return 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/40';
};
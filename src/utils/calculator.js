import { getGradePoint } from './gradeData';

export const calculateSGPA = (courses) => {
  const validCourses = courses.filter(c => c.grade && c.credits > 0);
  if (validCourses.length === 0) return 0;
  const totalCredits = validCourses.reduce((sum, c) => sum + c.credits, 0);
  const totalPoints = validCourses.reduce((sum, c) => sum + c.credits * getGradePoint(c.grade), 0);
  return totalCredits > 0 ? (totalPoints / totalCredits) : 0;
};

export const calculateCGPA = (semesters) => {
  const allCourses = semesters.flatMap(s => s.courses);
  return calculateSGPA(allCourses);
};

export const getTotalCreditsEarned = (semesters) => {
  return semesters.flatMap(s => s.courses).reduce((sum, c) => sum + c.credits, 0);
};

export const calculateTotalCGPA = (semesters, previousCGPA = 0, previousCredits = 0) => {
  const newCourses = semesters.flatMap(s => s.courses).filter(c => c.grade && c.credits > 0);
  const newCredits = newCourses.reduce((sum, c) => sum + c.credits, 0);
  const newPoints = newCourses.reduce((sum, c) => sum + c.credits * getGradePoint(c.grade), 0);
  const oldPoints = previousCGPA * previousCredits;
  const totalCredits = previousCredits + newCredits;
  const totalPoints = oldPoints + newPoints;
  return totalCredits > 0 ? totalPoints / totalCredits : 0;
};

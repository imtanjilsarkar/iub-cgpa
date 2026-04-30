import { useState } from 'react';
import { calculateCGPA, getTotalCreditsEarned } from '../utils/calculator';
import { getGradePoint, gradeOptions, getGradeColor } from '../utils/gradeData';

export default function WhatIfSimulator({ semesters }) {
  const [targetCGPA, setTargetCGPA] = useState('');
  const [remainingCredits, setRemainingCredits] = useState('');
  const [showResult, setShowResult] = useState(false);

  const currentCGPA = calculateCGPA(semesters);
  const creditsEarned = getTotalCreditsEarned(semesters);
  const totalGradePoints = currentCGPA * creditsEarned;

  // Calculate required GPA
  const target = parseFloat(targetCGPA);
  const remaining = parseFloat(remainingCredits);
  const requiredGPA = target && remaining
    ? ((target * (creditsEarned + remaining)) - totalGradePoints) / remaining
    : null;

  const isRealistic = requiredGPA !== null && requiredGPA <= 4.00 && requiredGPA >= 0;

  const getRequiredGrade = (gpa) => {
    if (gpa === null) return '';
    if (gpa > 4.00) return 'Impossible';
    if (gpa >= 3.70) return 'A / A-';
    if (gpa >= 3.30) return 'B+';
    if (gpa >= 3.00) return 'B';
    if (gpa >= 2.70) return 'B-';
    if (gpa >= 2.30) return 'C+';
    if (gpa >= 2.00) return 'C';
    if (gpa >= 1.70) return 'C-';
    if (gpa >= 1.00) return 'D';
    return 'Below D';
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden mt-6">
      <div className="px-5 py-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-b border-gray-200 dark:border-gray-800">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
           What-If Simulator
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          See what GPA you need in future semesters to reach your target CGPA
        </p>
      </div>

      <div className="px-5 py-4">
        {/* Current Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Current CGPA</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{currentCGPA.toFixed(2)}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Credits Earned</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{creditsEarned}</p>
          </div>
        </div>

        {/* Inputs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
               Target CGPA
            </label>
            <input
              type="number"
              value={targetCGPA}
              onChange={(e) => { setTargetCGPA(e.target.value); setShowResult(false); }}
              placeholder="e.g. 3.75"
              step="0.01"
              min="0"
              max="4.00"
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
               Remaining Credits
            </label>
            <input
              type="number"
              value={remainingCredits}
              onChange={(e) => { setRemainingCredits(e.target.value); setShowResult(false); }}
              placeholder="e.g. 30"
              min="0"
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={() => setShowResult(true)}
          disabled={!targetCGPA || !remainingCredits}
          className="w-full bg-purple-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate Required GPA
        </button>

        {/* Result */}
        {showResult && requiredGPA !== null && (
          <div className={`mt-4 rounded-xl p-4 text-center ${
            isRealistic 
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}>
            {isRealistic ? (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  To reach <strong>CGPA {target.toFixed(2)}</strong>, you need:
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                  GPA {requiredGPA.toFixed(2)}
                </p>
                <p className="text-lg font-semibold text-green-700 dark:text-green-300 mt-1">
                  ≈ {getRequiredGrade(requiredGPA)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  across your remaining {remaining} credits
                </p>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                   Impossible!
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  You'd need GPA {requiredGPA.toFixed(2)} but maximum is 4.00
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Try a lower target CGPA
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import SemesterBlock from './components/SemesterBlock';
import PreviousCGPA from './components/PreviousCGPA';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';
import WhatIfSimulator from './components/WhatIfSimulator';
import { calculateCGPA, getTotalCreditsEarned, calculateTotalCGPA } from './utils/calculator';

export default function App() {
  const [semesters, setSemesters] = useLocalStorage('iub-cgpa-data', []);
  const [dark, setDark] = useTheme();
  const [previousCGPA, setPreviousCGPA] = useState(() => {
    const saved = localStorage.getItem('iub-previous-cgpa');
    return saved ? JSON.parse(saved) : { cgpa: 0, credits: 0 };
  });

  const cgpa = calculateTotalCGPA(semesters, previousCGPA.cgpa, previousCGPA.credits);
  const newCredits = getTotalCreditsEarned(semesters);
  const creditsEarned = newCredits + previousCGPA.credits;

  const addSemester = () => {
    const newSemester = {
      id: Date.now(),
      name: '',
      courses: [{ id: Date.now() + 1, name: '', grade: '', credits: 0 }]
    };
    setSemesters([...semesters, newSemester]);
  };

  const updateSemester = (semesterId, updatedSemester) => {
    setSemesters(semesters.map(s => s.id === semesterId ? updatedSemester : s));
  };

  const deleteSemester = (semesterId) => {
    setSemesters(semesters.filter(s => s.id !== semesterId));
  };

  const updatePreviousCGPA = (data) => {
    setPreviousCGPA(data);
    localStorage.setItem('iub-previous-cgpa', JSON.stringify(data));
  };

  const resetAll = () => {
    if (window.confirm('Are you sure you want to delete all data?')) {
      setSemesters([]);
      setPreviousCGPA({ cgpa: 0, credits: 0 });
      localStorage.removeItem('iub-previous-cgpa');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Header dark={dark} toggleDark={() => setDark(!dark)} />

      <main className="max-w-2xl mx-auto px-4">
        <div id="cgpa-export-area">
          {/* Previous CGPA Section */}
          <PreviousCGPA
            previousCGPA={previousCGPA.cgpa}
            previousCredits={previousCGPA.credits}
            onUpdate={updatePreviousCGPA}
          />

          {/* Stats Cards */}
          {(semesters.length > 0 || previousCGPA.credits > 0) && (
            <div className="grid grid-cols-2 gap-3 my-4">
              <StatsCard label="Overall CGPA" value={cgpa.toFixed(2)} highlight />
              <StatsCard label="Credits Earned" value={creditsEarned} />
            </div>
          )}

          {/* Semester Blocks */}
          {semesters.length === 0 && previousCGPA.credits === 0 ? (
            <EmptyState onAddSemester={addSemester} />
          ) : (
            <div className="flex flex-col gap-4">
              {semesters.map((semester, index) => (
                <SemesterBlock
                  key={semester.id}
                  semester={semester}
                  index={index}
                  onUpdate={(updated) => updateSemester(semester.id, updated)}
                  onDelete={() => deleteSemester(semester.id)}
                />
              ))}
            </div>
          )}

          {/* Show add semester button if only previous CGPA exists */}
          {semesters.length === 0 && previousCGPA.credits > 0 && (
            <button
              onClick={addSemester}
              className="mt-4 w-full bg-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              + Add New Semester
            </button>
          )}
        </div>

        {/* What-If Simulator */}
        <WhatIfSimulator semesters={semesters} previousCGPA={previousCGPA.cgpa} previousCredits={previousCGPA.credits} />
      </main>

      <Footer
        onReset={resetAll}
        onAddSemester={addSemester}
        hasData={semesters.length > 0 || previousCGPA.credits > 0}
        showExport={semesters.length > 0 || previousCGPA.credits > 0}
      />
    </div>
  );
}

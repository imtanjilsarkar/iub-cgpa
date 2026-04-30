import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import SemesterBlock from './components/SemesterBlock';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';
import WhatIfSimulator from './components/WhatIfSimulator';
import { calculateCGPA, getTotalCreditsEarned } from './utils/calculator';

export default function App() {
  const [semesters, setSemesters] = useLocalStorage('iub-cgpa-data', []);
  const [dark, setDark] = useTheme();

  const cgpa = calculateCGPA(semesters);
  const creditsEarned = getTotalCreditsEarned(semesters);

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

  const resetAll = () => {
    if (window.confirm('Are you sure you want to delete all data?')) {
      setSemesters([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Header dark={dark} toggleDark={() => setDark(!dark)} />

      <main className="max-w-2xl mx-auto px-4">
        <div id="cgpa-export-area">
          {semesters.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              <StatsCard label="CGPA" value={cgpa.toFixed(2)} highlight />
              <StatsCard label="Credits Earned" value={creditsEarned} />
            </div>
          )}

          {semesters.length === 0 ? (
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
        </div>

        {/* What-If Simulator */}
        {semesters.length > 0 && (
          <WhatIfSimulator semesters={semesters} />
        )}
      </main>

      <Footer
        onReset={resetAll}
        onAddSemester={addSemester}
        hasData={semesters.length > 0}
        showExport={semesters.length > 0}
      />
    </div>
  );
}
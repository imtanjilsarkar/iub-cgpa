import { useState } from 'react';
import { toPng } from 'html-to-image';

export default function ExportButton() {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    
    try {
      const element = document.getElementById('cgpa-export-area');
      if (!element) {
        alert('Nothing to export!');
        setExporting(false);
        return;
      }

      const dataUrl = await toPng(element, {
        backgroundColor: '#f3f4f6',
        pixelRatio: 2,
        cacheBust: true,
      });

      const link = document.createElement('a');
      link.download = 'IUB-CGPA-Report.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert('Export failed. Check console.');
    }

    setExporting(false);
  };

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className="bg-green-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors shadow-sm disabled:opacity-60 flex items-center gap-2"
    >
      {exporting ? '⏳ Exporting...' : '📸 Export'}
    </button>
  );
}
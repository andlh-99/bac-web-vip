import React from 'react';
import './style.css'; // استيراد الأنماط الخاصة بالدوار

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      {/* الدوار الذي يظهر أثناء التحميل */}
      <div className="spinner"></div>
    </div>
  );
}

export default LoadingSpinner;


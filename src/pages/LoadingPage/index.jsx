import React from 'react';
import LoadingSpinner from '../../components/LoadingSpinner'; // استيراد مكون الدوار
import './style.css'; // استيراد الأنماط الخاصة بالصفحة

function LoadingPage() {
  return (
    <div className="loading-page flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-blue-400 to-purple-600 text-white p-4">
      <LoadingSpinner />
      <p className="mt-4 text-xl font-bold text-center">
        <span className="block">جاري تحميل التطبيق...</span>
        <span className="block text-sm opacity-80">يرجى الانتظار قليلاً.</span>
      </p>
    </div>
  );
}

export default LoadingPage;


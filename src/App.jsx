import React, { useState, useEffect } from 'react';
import LoadingPage from './pages/LoadingPage';
import WelcomeTour from './components/WelcomeTour';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // استيراد مزود السياق وهوك useAuth
import HomePage from './pages/HomePage';
import CounterPage from './pages/CounterPage';
import Navbar from './components/Navbar';

function AppContent() {
  // استخدام هوك useAuth لجلب حالة المصادقة والتحميل وجولة الترحيب
  const { isLoading, showWelcomeTour, closeWelcomeTour } = useAuth();
  const [currentPage, setCurrentPage] = useState('home'); // لإدارة التنقل بين الصفحات

  // عرض صفحة التحميل إذا كان التطبيق لا يزال يحمل البيانات الأولية
  if (isLoading) {
    return <LoadingPage />;
  }

  // عرض جولة الترحيب إذا كانت هذه هي الزيارة الأولى للمستخدم
  // يتم تمرير دالة الإغلاق من السياق
  if (showWelcomeTour) {
    return <WelcomeTour isOpen={showWelcomeTour} onClose={closeWelcomeTour} />;
  }

  // عرض المحتوى الرئيسي للتطبيق بعد التحميل وجولة الترحيب
  return (
    <div className="flex flex-col h-full">
      <main className="flex-grow overflow-auto">
        {/* بناءً على 'currentPage'، سنعرض الصفحة المناسبة */}
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'counter' && <CounterPage />}
      </main>
      {/* شريط التنقل السفلي */}
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
}

// المكون الرئيسي App الذي يوفر سياق المصادقة للتطبيق بأكمله
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;


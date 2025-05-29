import React, { useState, useEffect } from 'react';
import LoadingPage from './pages/LoadingPage';
import WelcomeTour from './components/WelcomeTour';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // سنقوم بإنشاء هذا السياق لاحقًا
import HomePage from './pages/HomePage'; // سنقوم بإنشاء هذه الصفحات لاحقًا
import CounterPage from './pages/CounterPage'; // سنقوم بإنشاء هذه الصفحات لاحقًا
import Navbar from './components/Navbar'; // سنقوم بإنشاء هذا المكون لاحقًا

function AppContent() {
  const { isLoading, showWelcomeTour, hasVisitedBefore } = useAuth();
  const [currentPage, setCurrentPage] = useState('home'); // لإدارة التنقل بين الصفحات

  // عرض صفحة التحميل إذا كان التطبيق لا يزال يحمل البيانات الأولية
  if (isLoading) {
    return <LoadingPage />;
  }

  // عرض جولة الترحيب إذا كانت هذه هي الزيارة الأولى للمستخدم
  if (showWelcomeTour) {
    return <WelcomeTour onClose={() => { /* منطق إغلاق جولة الترحيب */ }} />;
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


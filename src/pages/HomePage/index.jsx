import React from 'react';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-gradient-to-br from-blue-100 to-indigo-200 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">الصفحة الرئيسية</h1>
      <p className="text-lg text-center">
        هنا سيتم عرض معلومات حساب تليجرام الخاص بك، نقاطك، ولوحة الصدارة.
      </p>
    </div>
  );
}

export default HomePage;


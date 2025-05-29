import React from 'react';

function CounterPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-gradient-to-br from-green-100 to-teal-200 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-green-700">صفحة العداد</h1>
      <p className="text-lg text-center">
        هنا ستجد العداد الذي سيساعدك على جمع النقاط من خلال التركيز.
      </p>
    </div>
  );
}

export default CounterPage;


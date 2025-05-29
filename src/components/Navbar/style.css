import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClock } from '@fortawesome/free-solid-svg-icons'; // أيقونات للمنزل والساعة
import './style.css'; // استيراد الأنماط الخاصة بشريط التنقل

function Navbar({ currentPage, onNavigate }) {
  return (
    <nav className="navbar bg-blue-700 text-white p-3 shadow-lg flex justify-around items-center w-full">
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-300 ${
          currentPage === 'home' ? 'bg-blue-800 text-yellow-300' : 'hover:bg-blue-600'
        }`}
      >
        <FontAwesomeIcon icon={faHome} className="text-2xl mb-1" />
        <span className="text-xs">الرئيسية</span>
      </button>
      <button
        onClick={() => onNavigate('counter')}
        className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-300 ${
          currentPage === 'counter' ? 'bg-blue-800 text-yellow-300' : 'hover:bg-blue-600'
        }`}
      >
        <FontAwesomeIcon icon={faClock} className="text-2xl mb-1" />
        <span className="text-xs">العداد</span>
      </button>
    </nav>
  );
}

export default Navbar;


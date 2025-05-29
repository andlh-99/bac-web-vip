import React from 'react';
import './style.css'; // استيراد الأنماط الخاصة بالنافذة المنبثقة

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // لا تعرض المودال إذا لم يكن مفتوحًا

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="modal-content bg-white rounded-lg shadow-xl p-6 w-full max-w-sm relative transform transition-all duration-300 scale-95 opacity-0 animate-modal-open">
        {/* زر الإغلاق (اختياري، يمكن التحكم به من المكون الأب) */}
        {/* <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button> */}
        {children} {/* المحتوى الذي سيتم تمريره إلى المودال */}
      </div>
    </div>
  );
}

export default Modal;


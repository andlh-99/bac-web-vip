import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './assets/styles/base.css'; // استيراد الأنماط الأساسية (بما في ذلك Tailwind وخط Cairo)

// تهيئة تطبيق React وعرضه في العنصر ذي المعرف 'root' في index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);


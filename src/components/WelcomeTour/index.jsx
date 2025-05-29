import React, { useState } from 'react';
import Modal from '../Modal'; // استيراد مكون المودال العام
import './style.css'; // استيراد الأنماط الخاصة بجولة الترحيب

function WelcomeTour({ isOpen, onClose }) {
  const [page, setPage] = useState(0); // حالة لتتبع الصفحة الحالية في الجولة

  const pagesContent = [
    {
      title: "أهلاً بك في تطبيق الطلاب التنافسي!",
      description: (
        <>
          <p className="mb-3">
            هذا التطبيق مصمم خصيصًا لمساعدتك على تحسين تركيزك ومهاراتك الدراسية بطريقة ممتعة وتنافسية.
            الفكرة بسيطة: كلما قضيت وقتًا أطول في صفحة "العداد" المخصصة للدراسة المركزة،
            كلما جمعت نقاطًا أكثر!
          </p>
          <p className="mb-3">
            نظام النقاط يعتمد على الوقت: كل 10 ثوانٍ تقضيها في التركيز تساوي نقطة واحدة.
            هذا يشجعك على البقاء منخرطًا وتحقيق أقصى استفادة من وقت دراستك.
            تتبع تقدمك وشاهد كيف تتسلق سلم الترتيب بين زملائك!
          </p>
          <p className="font-semibold text-blue-600">
            استعد للتحدي وأطلق العنان لقدراتك!
          </p>
        </>
      ),
      image: "https://placehold.co/400x200/ADD8E6/000000?text=التنافس+الذكي", // صورة توضيحية
    },
    {
      title: "من نحن؟",
      description: (
        <>
          <p className="mb-3">
            هذا التطبيق هو ثمرة جهود فريق "Askeladd" المبدع،
            وهو جزء من مبادرة "4 YOU" التي تهدف إلى تقديم حلول تعليمية مبتكرة ومحفزة للطلاب.
            نحن نؤمن بأن التعلم يمكن أن يكون ممتعًا وتنافسيًا في آن واحد،
            وهذا التطبيق هو خطوتنا الأولى نحو تحقيق ذلك.
          </p>
          <p className="mb-3">
            نسعى دائمًا لتقديم الأفضل وتطوير أدوات تساعدك على تحقيق أهدافك الأكاديمية والشخصية.
            نحن هنا لدعم رحلتك التعليمية.
          </p>
          <p className="font-semibold text-green-600">
            شكرًا لكونك جزءًا من مجتمعنا!
          </p>
        </>
      ),
      image: "https://placehold.co/400x200/90EE90/000000?text=فريق+Askeladd", // صورة توضيحية
    },
    {
      title: "ماذا بعد؟",
      description: (
        <>
          <p className="mb-3">
            هذه مجرد البداية! نحن نعمل باستمرار على إضافة المزيد من الميزات المثيرة
            التي ستجعل تجربتك أكثر إثراءً ومتعة.
            ترقبوا التحديثات القادمة التي ستشمل تحديات جديدة، مكافآت، والمزيد من طرق التفاعل.
          </p>
          <p className="mb-3">
            هدفنا هو بناء مجتمع تعليمي نشط ومحفز. ابقَ معنا، فهناك الكثير مما هو قادم!
            نتمنى لك رحلة تنافسية ممتعة ومثمرة.
          </p>
          <p className="font-semibold text-purple-600">
            لنبدأ رحلتك نحو التميز!
          </p>
        </>
      ),
      image: "https://placehold.co/400x200/DDA0DD/000000?text=ميزات+قادمة", // صورة توضيحية
    },
  ];

  const handleNext = () => {
    if (page < pagesContent.length - 1) {
      setPage(page + 1);
    } else {
      onClose(); // إغلاق الجولة عند الوصول للصفحة الأخيرة والضغط على "أغلق"
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="welcome-tour-content text-center flex flex-col h-full">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          {pagesContent[page].title}
        </h2>
        <div className="flex-grow text-gray-700 text-lg mb-6">
          <img
            src={pagesContent[page].image}
            alt="صورة توضيحية"
            className="w-full h-auto rounded-lg mb-4 object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x200/cccccc/000000?text=صورة+غير+متوفرة"; }}
          />
          {pagesContent[page].description}
        </div>
        <div className="flex justify-between items-center mt-auto">
          {page > 0 && (
            <button
              onClick={() => setPage(page - 1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
            >
              السابق
            </button>
          )}
          <button
            onClick={handleNext}
            className={`
              ${page === pagesContent.length - 1 ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}
              text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out shadow-lg
              ${page === 0 ? 'w-full' : 'flex-grow'}
            `}
          >
            {page === pagesContent.length - 1 ? 'أغلق النافذة' : 'التالي'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default WelcomeTour;


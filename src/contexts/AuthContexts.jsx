import React, { createContext, useContext, useState, useEffect } from 'react';
import { hasUserVisited, recordUserVisit } from '../services/supabase';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// إنشاء سياق المصادقة
const AuthContext = createContext(null);

// هوك مخصص لاستخدام سياق المصادقة
export const useAuth = () => useContext(AuthContext);

// مزود سياق المصادقة
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // حالة التحميل الأولية
  const [showWelcomeTour, setShowWelcomeTour] = useState(false); // حالة عرض جولة الترحيب
  const [userId, setUserId] = useState(null); // معرف المستخدم (من Firebase Auth)
  const [telegramUserData, setTelegramUserData] = useState(null); // بيانات مستخدم Telegram
  const [hasVisitedBefore, setHasVisitedBefore] = useState(false); // هل زار المستخدم من قبل؟

  // تهيئة Firebase و Supabase والتحقق من حالة المستخدم
  useEffect(() => {
    const initializeAppAndAuth = async () => {
      try {
        // هذه المتغيرات يتم توفيرها بواسطة بيئة Canvas
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app); // على الرغم من أننا نستخدم Supabase، إلا أن Firebase Auth مطلوب هنا

        // تسجيل الدخول باستخدام الرمز المميز المخصص أو بشكل مجهول
        if (initialAuthToken) {
          await signInWithCustomToken(auth, initialAuthToken);
        } else {
          await signInAnonymously(auth);
        }

        // الاستماع لتغييرات حالة المصادقة
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const currentUserId = user.uid;
            setUserId(currentUserId);

            // TODO: هنا يجب أن نحصل على بيانات مستخدم Telegram الفعلية
            // في تطبيق Telegram Web App الحقيقي، يتم تمرير هذه البيانات عبر Telegram.WebApp.initData
            // حاليًا، سنستخدم بيانات وهمية لأغراض التطوير
            const mockTelegramUser = {
              id: currentUserId, // استخدام Firebase UID كمعرف Telegram مؤقت
              first_name: "طالب جديد",
              photo_url: "https://placehold.co/100x100/cccccc/000000?text=صورة",
            };
            setTelegramUserData(mockTelegramUser);

            // التحقق من Supabase إذا كان المستخدم قد زار من قبل
            const visited = await hasUserVisited(mockTelegramUser.id);
            setHasVisitedBefore(visited);

            if (!visited) {
              // إذا كانت هذه هي الزيارة الأولى، سجلها واعرض جولة الترحيب
              await recordUserVisit(mockTelegramUser.id, mockTelegramUser.first_name, mockTelegramUser.photo_url);
              setShowWelcomeTour(true);
            } else {
              setShowWelcomeTour(false); // لا تعرض جولة الترحيب إذا زار من قبل
            }
          } else {
            setUserId(null);
            setTelegramUserData(null);
            setHasVisitedBefore(false);
            setShowWelcomeTour(true); // إذا لم يكن هناك مستخدم، افترض أنها زيارة أولى أو تحتاج للترحيب
          }
          setIsLoading(false); // انتهى التحميل الأولي
        });

        return () => unsubscribe(); // تنظيف المستمع عند إلغاء تحميل المكون
      } catch (error) {
        console.error("خطأ في تهيئة Firebase أو المصادقة:", error);
        setIsLoading(false); // توقف التحميل حتى لو حدث خطأ
        setShowWelcomeTour(true); // قد ترغب في عرض جولة الترحيب أو رسالة خطأ
      }
    };

    initializeAppAndAuth();
  }, []); // يتم التشغيل مرة واحدة عند تحميل المكون

  // دالة لإغلاق جولة الترحيب
  const handleCloseWelcomeTour = () => {
    setShowWelcomeTour(false);
  };

  // القيم التي سيتم توفيرها للسياق
  const value = {
    isLoading,
    showWelcomeTour,
    telegramUserData,
    userId,
    hasVisitedBefore,
    closeWelcomeTour: handleCloseWelcomeTour,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


import { createClient } from '@supabase/supabase-js';

// استيراد متغيرات البيئة الخاصة بـ Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// التحقق من وجود المتغيرات
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing in environment variables.');
  // يمكنك رمي خطأ أو التعامل مع الحالة بطريقة أخرى
}

// تهيئة عميل Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * دالة للتحقق مما إذا كان المستخدم قد زار التطبيق من قبل.
 * @param {string} telegramUserId - معرف مستخدم Telegram.
 * @returns {Promise<boolean>} - True إذا كان المستخدم قد زار من قبل، False بخلاف ذلك.
 */
export async function hasUserVisited(telegramUserId) {
  try {
    // حاول جلب سجل المستخدم من جدول 'users'
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('telegram_user_id', telegramUserId)
      .single(); // نتوقع سجلًا واحدًا فقط

    if (error && error.code !== 'PGRST116') { // PGRST116 يعني "لا يوجد صفوف"
      throw error;
    }

    // إذا تم العثور على بيانات، فهذا يعني أن المستخدم قد زار من قبل
    return !!data;
  } catch (error) {
    console.error('خطأ في التحقق من زيارة المستخدم:', error.message);
    return false; // التعامل مع الأخطاء كأن المستخدم لم يزر من قبل
  }
}

/**
 * دالة لتسجيل زيارة المستخدم لأول مرة.
 * @param {string} telegramUserId - معرف مستخدم Telegram.
 * @param {string} telegramFirstName - الاسم الأول لمستخدم Telegram.
 * @param {string} [telegramPhotoUrl] - رابط صورة الملف الشخصي لمستخدم Telegram (اختياري).
 * @returns {Promise<boolean>} - True إذا تم التسجيل بنجاح، False بخلاف ذلك.
 */
export async function recordUserVisit(telegramUserId, telegramFirstName, telegramPhotoUrl = null) {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          telegram_user_id: telegramUserId,
          telegram_first_name: telegramFirstName,
          telegram_photo_url: telegramPhotoUrl,
          score: 0, // النقاط الأولية للمستخدم الجديد
          last_visit: new Date().toISOString(), // تسجيل وقت الزيارة الأولى
        },
      ]);

    if (error) {
      throw error;
    }

    console.log('تم تسجيل زيارة المستخدم بنجاح:', data);
    return true;
  } catch (error) {
    console.error('خطأ في تسجيل زيارة المستخدم:', error.message);
    return false;
  }
}

// يمكنك إضافة المزيد من الدوال هنا للتفاعل مع Supabase، مثل:
// - جلب لوحة الصدارة
// - تحديث نقاط المستخدم
// - جلب معلومات مستخدم معين


/** @type {import('tailwindcss').Config} */
export default {
  // تحديد الملفات التي يجب على Tailwind مسحها ضوئيًا للعثور على فئات Tailwind
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // إضافة خط Cairo إلى خطوط Tailwind الافتراضية
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

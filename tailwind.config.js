/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1', // Indigo
        secondary: '#EC4899', // Pink
        accent: '#F59E0B', // Amber
        success: '#10B981', // Emerald
        background: '#F3F4F6', // Light gray
      }
    },
  },
  plugins: [],
  darkMode: 'class',
};
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <header className="w-full py-4 px-4 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              TinyStreaks
            </h1>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-gray-200" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto py-6 px-4">
        {children}
      </main>
      
      <footer className="w-full py-4 bg-white dark:bg-gray-800 mt-auto transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          TinyStreaks — Build one small habit. One day at a time.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
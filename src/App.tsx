import React, { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import HabitTracker from './components/HabitTracker';
import { ToastContainer } from './components/Toast';

function App() {
  // Set title
  useEffect(() => {
    document.title = 'TinyStreaks - Build one small habit';
    
    // Update favicon
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (link) {
      link.href = '/favicon.svg';
    }
  }, []);

  return (
    <ThemeProvider>
      <Layout>
        <HabitTracker />
        <ToastContainer />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
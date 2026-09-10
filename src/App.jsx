import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import FloatingContactWidget from './components/FloatingContactWidget';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ArticlesPage from './pages/ArticlesPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';

import { useAdminStore } from './store/useAdminStore';

export default function App() {
  const { isAuthenticated, logout } = useAdminStore();

  const [currentPath, setCurrentPath] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return ['home', 'about', 'services', 'portfolio', 'articles', 'contact', 'admin'].includes(hash)
      ? hash
      : 'home';
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navigateTo = (path) => {
    setCurrentPath(path);
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['home', 'about', 'services', 'portfolio', 'articles', 'contact', 'admin'].includes(hash)) {
        setCurrentPath(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    if (currentPath === 'admin') {
      if (!isAuthenticated) {
        return (
          <AdminLoginPage 
            onLoginSuccess={() => navigateTo('admin')} 
            onNavigateHome={() => navigateTo('home')} 
          />
        );
      }
      return <DashboardPage onNavigate={navigateTo} onLogout={logout} />;
    }

    switch (currentPath) {
      case 'home':
        return <HomePage onNavigate={navigateTo} />;
      case 'about':
        return <AboutPage onNavigate={navigateTo} />;
      case 'services':
        return <ServicesPage onNavigate={navigateTo} />;
      case 'portfolio':
        return <PortfolioPage onNavigate={navigateTo} />;
      case 'articles':
        return <ArticlesPage onNavigate={navigateTo} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  const isAdminPage = currentPath === 'admin';

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex flex-col justify-between selection:bg-secondary selection:text-white relative">
      
      {/* Top Architectural Golden Scroll Progress Bar */}
      {!isAdminPage && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-secondary z-[60] origin-right"
          style={{ scaleX }}
        />
      )}

      {/* Global Navbar */}
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />

      {/* Main Content with Animated Transitions */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <PageTransition pageKey={currentPath}>
            {renderPage()}
          </PageTransition>
        </AnimatePresence>
      </main>

      {/* Floating Quick Action Contact Widget (On public pages) */}
      {!isAdminPage && <FloatingContactWidget onNavigate={navigateTo} />}

      {/* Global Footer (On public pages) */}
      {!isAdminPage && <Footer onNavigate={navigateTo} />}

    </div>
  );
}

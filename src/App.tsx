import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import NotFound from './pages/NotFound';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const timer = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 60);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollManager />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:bg-pist focus:p-3 focus:text-aub">Skip to content</a>
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </MotionConfig>
  );
}

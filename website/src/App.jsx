import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ScrollySection from './components/ScrollySection';
import RequestForm from './components/RequestForm';
import './App.css';

function App() {
  // Initialize from hash if present
  const getInitialTab = () => {
    if (typeof window !== 'undefined' && window.location.hash === '#request') {
      return 'request';
    }
    return 'paper';
  };
  
  const [activeTab, setActiveTab] = useState(getInitialTab);

  // Update URL when tab changes
  useEffect(() => {
    if (activeTab === 'request') {
      window.history.replaceState(null, '', '#request');
    } else {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [activeTab]);

  return (
    <div className="app">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <AnimatePresence mode="wait">
        {activeTab === 'paper' ? (
          <motion.main
            key="paper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Hero />
            <ScrollySection />
            <footer className="footer">
              <div className="footer-content">
                <p className="footer-citation">
                  Bellemare-Lespinasse et al. (2024). 
                  <em> Divergent Creativity in Humans and Large Language Models.</em>
                  <a href="https://arxiv.org/abs/2405.13012" target="_blank" rel="noopener noreferrer">
                    arXiv:2405.13012
                  </a>
                </p>
                <div className="footer-decoration">⁓</div>
              </div>
            </footer>
          </motion.main>
        ) : (
          <motion.main
            key="request"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="request-page"
          >
            <RequestForm />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

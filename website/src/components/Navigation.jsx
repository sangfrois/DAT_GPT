import { useState, useEffect } from 'react';
import './Navigation.css';

export default function Navigation({ activeTab, setActiveTab }) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <a href="/" className="nav-logo">
          <span className="logo-symbol">~</span>
          <span className="logo-text">DAT</span>
        </a>

        <div className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'paper' ? 'active' : ''}`}
            onClick={() => setActiveTab('paper')}
          >
            <span className="tab-indicator" />
            Paper
          </button>
          <button
            className={`nav-tab ${activeTab === 'request' ? 'active' : ''}`}
            onClick={() => setActiveTab('request')}
          >
            <span className="tab-indicator" />
            Request Model
          </button>
        </div>

        <a
          href="https://arxiv.org/abs/2405.13012"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-arxiv"
        >
          arXiv
        </a>
      </div>
    </nav>
  );
}

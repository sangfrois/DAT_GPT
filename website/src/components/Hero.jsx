import { motion } from 'framer-motion';
import { paperMetadata } from '../data/paperData';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-gradient" />
      </div>
      
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-decoration">
          <span className="deco-line" />
          <span className="deco-symbol">⁓</span>
          <span className="deco-line" />
        </div>
        
        <h1 className="hero-title">
          Divergent<br />
          <span className="title-accent">Creativity</span>
        </h1>
        
        <p className="hero-subtitle">
          in Humans and Large Language Models
        </p>
        
        <p className="hero-abstract">
          {paperMetadata.abstract}
        </p>
        
        <div className="hero-actions">
          <a
            href={paperMetadata.arxivLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-paper"
          >
            <span className="btn-icon">📄</span>
            Read Paper
          </a>
          <a href="#request" className="btn-compete">
            <span className="btn-icon">🎯</span>
            Compete
          </a>
        </div>
        
        <motion.div
          className="hero-scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span>Scroll to explore</span>
          <span className="scroll-arrow">↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

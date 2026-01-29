import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { scrollSections } from '../data/paperData';
import DATChart from './DATChart';
import DSIChart from './DSIChart';
import './ScrollySection.css';

function Section({ section, index }) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className={`scrolly-section ${inView ? 'in-view' : ''}`}
      id={section.id}
    >
      <div className="section-content">
        <motion.div
          className="section-text"
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="section-number">{String(index + 1).padStart(2, '0')}</div>
          <h2 className="section-title">{section.title}</h2>
          <p className="section-body">{section.content}</p>
          {section.highlight && (
            <div className="section-highlight">
              <span className="highlight-decoration">~</span>
              <span className="highlight-text">{section.highlight}</span>
            </div>
          )}
        </motion.div>

        {section.visualization && (
          <motion.div
            className="section-visualization"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {section.visualization === 'dat-comparison' && <DATChart />}
            {section.visualization === 'dsi-comparison' && <DSIChart />}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default function ScrollySection() {
  return (
    <div className="scrolly-container">
      {scrollSections.map((section, index) => (
        <Section key={section.id} section={section} index={index} />
      ))}
    </div>
  );
}

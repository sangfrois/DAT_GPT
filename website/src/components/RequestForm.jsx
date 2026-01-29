import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RequestForm.css';

const API_PROVIDERS = [
  { value: 'ollama', label: 'Ollama (Local)', description: 'Self-hosted models' },
  { value: 'openai', label: 'OpenAI', description: 'GPT-4, GPT-4o, etc.' },
  { value: 'anthropic', label: 'Anthropic', description: 'Claude models' },
  { value: 'google', label: 'Google', description: 'Gemini models' },
  { value: 'other', label: 'Other', description: 'Custom provider' },
];

const STRATEGIES = [
  { value: 'none', label: 'Standard DAT', description: 'Original instructions' },
  { value: 'etymology', label: 'Etymology', description: 'Vary word origins' },
  { value: 'opposites', label: 'Opposites', description: 'Meaning opposition' },
  { value: 'thesaurus', label: 'Thesaurus', description: 'Synonym exploration' },
  { value: 'random', label: 'Random', description: 'Random strategy' },
];

export default function RequestForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    modelName: '',
    provider: 'ollama',
    apiEndpoint: '',
    strategy: 'none',
    temperature: '1.0',
    notes: '',
  });
  
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [hoveredProvider, setHoveredProvider] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`DAT Competition Request: ${formData.modelName}`);
    const body = encodeURIComponent(`
DAT Competition Model Request
=============================

Requester Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Organization: ${formData.organization || 'N/A'}

Model Configuration:
- Model Name: ${formData.modelName}
- Provider: ${formData.provider}
- API Endpoint: ${formData.apiEndpoint || 'Default'}
- Strategy: ${formData.strategy}
- Temperature: ${formData.temperature}

Additional Notes:
${formData.notes || 'None'}

---
This request was submitted via the DAT Companion Website.
Please verify the model configuration and trigger the evaluation pipeline.
`);
    
    // Open mailto link - uses placeholder that should be configured for production
    // The email address can be changed in vite.config.js using VITE_CONTACT_EMAIL environment variable
    const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'dat-research@example.com';
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    
    // Simulate success after a moment
    setTimeout(() => {
      setStatus('success');
    }, 1000);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      organization: '',
      modelName: '',
      provider: 'ollama',
      apiEndpoint: '',
      strategy: 'none',
      temperature: '1.0',
      notes: '',
    });
    setStatus('idle');
  };

  return (
    <div className="request-form-container">
      <div className="form-header">
        <div className="form-title-decoration">⁓</div>
        <h2 className="form-title">Request Model Evaluation</h2>
        <p className="form-subtitle">
          Submit your LLM to compete on the Divergent Association Task
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="success-message"
          >
            <div className="success-icon">✓</div>
            <h3>Request Submitted</h3>
            <p>Your email client should have opened with the request details. 
               We will review your submission and trigger the evaluation pipeline.</p>
            <button onClick={resetForm} className="btn-secondary">
              Submit Another Request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="request-form"
          >
            {/* Requester Information */}
            <div className="form-section">
              <h3 className="section-title">
                <span className="section-number">01</span>
                Requester Information
              </h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="organization">Organization</label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="University, company, or independent"
                />
              </div>
            </div>

            {/* Model Configuration */}
            <div className="form-section">
              <h3 className="section-title">
                <span className="section-number">02</span>
                Model Configuration
              </h3>
              
              <div className="form-group">
                <label htmlFor="modelName">Model Name *</label>
                <input
                  type="text"
                  id="modelName"
                  name="modelName"
                  value={formData.modelName}
                  onChange={handleChange}
                  required
                  placeholder="e.g., llama3:8b, gpt-4-turbo, claude-3-opus"
                />
              </div>

              <div className="form-group">
                <label>API Provider *</label>
                <div className="provider-grid">
                  {API_PROVIDERS.map(provider => (
                    <div
                      key={provider.value}
                      className={`provider-option ${formData.provider === provider.value ? 'selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, provider: provider.value }))}
                      onMouseEnter={() => setHoveredProvider(provider.value)}
                      onMouseLeave={() => setHoveredProvider(null)}
                    >
                      <div className="provider-label">{provider.label}</div>
                      <motion.div
                        className="provider-description"
                        initial={false}
                        animate={{ 
                          opacity: hoveredProvider === provider.value || formData.provider === provider.value ? 1 : 0.5 
                        }}
                      >
                        {provider.description}
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>

              {formData.provider === 'other' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="form-group"
                >
                  <label htmlFor="apiEndpoint">API Endpoint</label>
                  <input
                    type="url"
                    id="apiEndpoint"
                    name="apiEndpoint"
                    value={formData.apiEndpoint}
                    onChange={handleChange}
                    placeholder="https://api.example.com/v1/generate"
                  />
                </motion.div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="strategy">Strategy</label>
                  <select
                    id="strategy"
                    name="strategy"
                    value={formData.strategy}
                    onChange={handleChange}
                  >
                    {STRATEGIES.map(strategy => (
                      <option key={strategy.value} value={strategy.value}>
                        {strategy.label} — {strategy.description}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="temperature">Temperature</label>
                  <input
                    type="number"
                    id="temperature"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    min="0"
                    max="2"
                    step="0.1"
                    placeholder="1.0"
                  />
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="form-section">
              <h3 className="section-title">
                <span className="section-number">03</span>
                Additional Information
              </h3>
              
              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Any additional context about your model, special requirements, or questions..."
                />
              </div>
            </div>

            <div className="form-info">
              <div className="info-icon">ℹ</div>
              <p>
                Upon submission, we will verify your request and trigger the evaluation pipeline 
                to collect 500 responses from your specified model. Results will be added to the 
                public leaderboard and shared with you.
              </p>
            </div>

            <motion.button
              type="submit"
              className="btn-primary"
              disabled={status === 'submitting'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {status === 'submitting' ? (
                <span className="loading">Preparing Request...</span>
              ) : (
                <>Submit Request</>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

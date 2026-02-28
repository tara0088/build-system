import React, { useState, useEffect } from 'react';
import './PremiumLayout.css';

const steps = [
  'Problem',
  'Market',
  'Architecture',
  'HLD',
  'LLD',
  'Build',
  'Test',
  'Ship'
];

const getStatusText = (stepIndex) => {
  // In a real implementation, this would check if artifacts exist
  const storedData = localStorage.getItem(`rb_step_${stepIndex}_artifact`);
  return storedData ? 'Completed' : 'Pending';
};

const PremiumLayout = ({ children, currentPage, isProofPage = false }) => {
  const [currentStep, setCurrentStep] = useState(currentPage);
  const [stepStatuses, setStepStatuses] = useState([]);

  useEffect(() => {
    // Load step statuses from localStorage
    const statuses = steps.map((_, index) => {
      const storedData = localStorage.getItem(`rb_step_${index + 1}_artifact`);
      return storedData ? 'completed' : 'pending';
    });
    setStepStatuses(statuses);
  }, []);

  const getStatusBadge = () => {
    if (isProofPage) {
      return <span className="status-badge proof-status">PROOF SUBMISSION</span>;
    }
    
    const status = stepStatuses[currentPage - 1] || 'pending';
    return (
      <span className={`status-badge ${status}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const getTitle = () => {
    if (isProofPage) {
      return "AI Resume Builder";
    }
    return steps[currentPage - 1] ? `AI Resume Builder` : "AI Resume Builder";
  };

  const getSubtitle = () => {
    if (isProofPage) {
      return "Project 3 — Proof Submission";
    }
    const stepName = steps[currentPage - 1];
    return `Project 3 — Step ${currentPage} of 8: ${stepName}`;
  };

  return (
    <div className="premium-layout">
      {/* Top Bar */}
      <header className="top-bar">
        <div className="top-bar-left">
          <h1>{getTitle()}</h1>
        </div>
        <div className="top-bar-center">
          <h2>{getSubtitle()}</h2>
        </div>
        <div className="top-bar-right">
          {getStatusBadge()}
        </div>
      </header>

      {/* Context Header */}
      <div className="context-header">
        <div className="step-indicators">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`step-indicator ${index + 1 === currentPage ? 'active' : ''} ${stepStatuses[index] === 'completed' ? 'completed' : ''}`}
            >
              <span className="step-number">{index + 1}</span>
              <span className="step-label">{step}</span>
              {stepStatuses[index] === 'completed' && <span className="checkmark">✓</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content-area">
        <div className="workspace">
          {/* Children content goes here */}
          {children}
        </div>
        
        {!isProofPage && (
          <div className="build-panel">
            <div className="build-panel-header">
              <h3>Build Panel</h3>
            </div>
            
            <div className="lovable-section">
              <textarea 
                className="lovable-textarea" 
                placeholder="Copy this into Lovable textarea"></textarea>
              <button className="copy-button">Copy</button>
            </div>
            
            <div className="build-actions">
              <button className="build-button">Build in Lovable</button>
            </div>
            
            <div className="status-indicators">
              <div className="status-it-worked">It Worked</div>
              <div className="status-error">Error</div>
              <div className="add-screenshot">Add Screenshot</div>
            </div>
          </div>
        )}
      </div>

      {/* Proof Footer - only shown on proof page */}
      {isProofPage && (
        <footer className="proof-footer">
          <div className="proof-content">
            <p>Final submission ready for review</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default PremiumLayout;
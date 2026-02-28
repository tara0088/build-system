import React, { useState, useEffect } from 'react';
import './ProofPage.css';

const ProofPage = () => {
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState([
    {
      id: 1,
      title: 'Complete Profile',
      description: 'Fill out your complete profile information',
      completed: false,
      link: '/settings'
    },
    {
      id: 2,
      title: 'Upload Resume',
      description: 'Upload your latest resume document',
      completed: false,
      link: '/resume'
    },
    {
      id: 3,
      title: 'Analyze Job Descriptions',
      description: 'Analyze at least 3 job descriptions',
      completed: false,
      link: '/analyze'
    },
    {
      id: 4,
      title: 'Apply to Positions',
      description: 'Submit applications to at least 5 positions',
      completed: false,
      link: '/jobs'
    },
    {
      id: 5,
      title: 'Track Applications',
      description: 'Update application statuses regularly',
      completed: false,
      link: '/applications'
    },
    {
      id: 6,
      title: 'Practice Interview Questions',
      description: 'Complete at least 10 practice interview questions',
      completed: false,
      link: '#'
    }
  ]);

  useEffect(() => {
    // Load progress from localStorage
    const storedSteps = localStorage.getItem('proofSteps');
    if (storedSteps) {
      setSteps(JSON.parse(storedSteps));
    }
  }, []);

  useEffect(() => {
    // Calculate progress based on completed steps
    const completedCount = steps.filter(step => step.completed).length;
    const calculatedProgress = Math.round((completedCount / steps.length) * 100);
    setProgress(calculatedProgress);
    
    // Save steps to localStorage
    localStorage.setItem('proofSteps', JSON.stringify(steps));
  }, [steps]);

  const toggleStep = (stepId) => {
    setSteps(prevSteps => 
      prevSteps.map(step => 
        step.id === stepId ? { ...step, completed: !step.completed } : step
      )
    );
  };

  const generateCertificate = () => {
    alert('Certificate generated successfully! You can download it now.');
  };

  return (
    <div className="proof-page">
      <header className="proof-header">
        <h1>Verification & Certification</h1>
        <p>Complete these steps to verify your job search progress</p>
      </header>

      <section className="progress-overview">
        <div className="progress-container">
          <div className="circular-progress">
            <svg width="150" height="150" viewBox="0 0 150 150">
              <circle cx="75" cy="75" r="65" stroke="#e6e6e6" strokeWidth="10" fill="transparent" />
              <circle 
                cx="75" 
                cy="75" 
                r="65" 
                stroke="#4CAF50" 
                strokeWidth="10" 
                fill="transparent" 
                strokeDasharray={`${2 * Math.PI * 65}`} 
                strokeDashoffset={`${2 * Math.PI * 65 * (1 - progress / 100)}`} 
                transform="rotate(-90 75 75)"
              />
              <text x="75" y="75" textAnchor="middle" dy=".3em" fontSize="24" fontWeight="bold">{progress}%</text>
            </svg>
          </div>
          <div className="progress-text">
            <h2>Job Search Progress</h2>
            <p>You've completed {steps.filter(s => s.completed).length} of {steps.length} steps</p>
            <button 
              onClick={generateCertificate} 
              disabled={progress < 100}
              className={`certificate-btn ${progress < 100 ? 'disabled' : ''}`}
            >
              {progress < 100 ? 'Complete All Steps First' : 'Generate Certificate'}
            </button>
          </div>
        </div>
      </section>

      <section className="verification-steps">
        <h2>Verification Steps</h2>
        <div className="steps-list">
          {steps.map(step => (
            <div key={step.id} className="step-card">
              <div className="step-header">
                <div className="step-checkbox">
                  <input
                    type="checkbox"
                    id={`step-${step.id}`}
                    checked={step.completed}
                    onChange={() => toggleStep(step.id)}
                  />
                  <label htmlFor={`step-${step.id}`}></label>
                </div>
                <div className="step-info">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
              <div className="step-action">
                <a href={step.link} className="step-link">Go to Step</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="certification-section">
        <h2>Certification</h2>
        <div className="certification-content">
          <p>Upon completing all verification steps, you will receive a certification that validates your job search efforts and preparation.</p>
          <p>This certification can be shared with career counselors, mentors, or potential employers to demonstrate your commitment to professional development.</p>
          <div className="certification-example">
            <h3>Sample Certificate</h3>
            <div className="certificate-preview">
              <div className="certificate-body">
                <h3>Career Preparation Certificate</h3>
                <p>This certifies that the holder has completed a comprehensive job search preparation program including resume optimization, application tracking, and interview preparation.</p>
                <p>Date: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProofPage;
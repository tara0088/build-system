import React, { useState, useEffect } from 'react';
import './proof.css';

const ProofPage = () => {
  const [stepStatuses, setStepStatuses] = useState({});
  const [lovableLink, setLovableLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [deployLink, setDeployLink] = useState('');

  useEffect(() => {
    // Load step statuses from localStorage
    const statuses = {};
    for (let i = 1; i <= 8; i++) {
      const artifact = localStorage.getItem(`rb_step_${i}_artifact`);
      statuses[i] = !!artifact;
    }
    setStepStatuses(statuses);
    
    // Load saved links if they exist
    const savedLovable = localStorage.getItem('rb_lovable_link');
    const savedGithub = localStorage.getItem('rb_github_link');
    const savedDeploy = localStorage.getItem('rb_deploy_link');
    
    if (savedLovable) setLovableLink(savedLovable);
    if (savedGithub) setGithubLink(savedGithub);
    if (savedDeploy) setDeployLink(savedDeploy);
  }, []);

  const handleLinkChange = (type, value) => {
    if (type === 'lovable') {
      setLovableLink(value);
      localStorage.setItem('rb_lovable_link', value);
    } else if (type === 'github') {
      setGithubLink(value);
      localStorage.setItem('rb_github_link', value);
    } else if (type === 'deploy') {
      setDeployLink(value);
      localStorage.setItem('rb_deploy_link', value);
    }
  };

  const copyFinalSubmission = () => {
    const submissionData = {
      project: "AI Resume Builder",
      lovableLink: lovableLink,
      githubLink: githubLink,
      deployLink: deployLink,
      stepStatuses: stepStatuses,
      completedSteps: Object.values(stepStatuses).filter(status => status).length,
      totalSteps: 8
    };

    navigator.clipboard.writeText(JSON.stringify(submissionData, null, 2))
      .then(() => {
        alert('Final submission copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy to clipboard. Please try again.');
      });
  };

  const allStepsComplete = Object.values(stepStatuses).every(status => status);

  return (
    <div className="proof-page">
      <h2>Project Completion Proof</h2>
      <p>Review your progress and submit the final project.</p>

      <div className="step-status-summary">
        <h3>Step Completion Status</h3>
        <div className="step-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(stepNum => (
            <div 
              key={stepNum} 
              className={`step-card ${stepStatuses[stepNum] ? 'completed' : 'pending'}`}
            >
              <div className="step-number">Step {stepNum}</div>
              <div className="step-status">
                {stepStatuses[stepNum] ? '✅ Completed' : '❌ Pending'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="submission-links">
        <h3>Project Links</h3>
        
        <div className="link-input-group">
          <label htmlFor="lovable-link">Lovable Link:</label>
          <input
            id="lovable-link"
            type="url"
            value={lovableLink}
            onChange={(e) => handleLinkChange('lovable', e.target.value)}
            placeholder="https://lovable.example.com/project"
          />
        </div>
        
        <div className="link-input-group">
          <label htmlFor="github-link">GitHub Link:</label>
          <input
            id="github-link"
            type="url"
            value={githubLink}
            onChange={(e) => handleLinkChange('github', e.target.value)}
            placeholder="https://github.com/username/repo"
          />
        </div>
        
        <div className="link-input-group">
          <label htmlFor="deploy-link">Deploy Link:</label>
          <input
            id="deploy-link"
            type="url"
            value={deployLink}
            onChange={(e) => handleLinkChange('deploy', e.target.value)}
            placeholder="https://your-app.vercel.app"
          />
        </div>
      </div>

      <div className="final-submission">
        <button 
          className={`submit-button ${!allStepsComplete ? 'disabled' : ''}`}
          onClick={copyFinalSubmission}
          disabled={!allStepsComplete}
        >
          {allStepsComplete ? 'Copy Final Submission' : 'Complete All Steps First'}
        </button>
        
        {!allStepsComplete && (
          <p className="warning-message">
            ⚠️ You must complete all 8 steps before submitting the final project.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProofPage;
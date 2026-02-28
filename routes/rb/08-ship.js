import React, { useState, useEffect } from 'react';
import StepPageTemplate from '../../components/common/StepPageTemplate';

const ShipPage = () => {
  const stepNumber = 8;
  const stepTitle = "Ship";
  
  const [isArtifactUploaded, setIsArtifactUploaded] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  useEffect(() => {
    // Check if artifact exists in localStorage
    const artifact = localStorage.getItem(`rb_step_${stepNumber}_artifact`);
    if (artifact) {
      setIsArtifactUploaded(true);
      setNextEnabled(true);
    } else {
      setNextEnabled(false);
    }
  }, [stepNumber]);

  const handleArtifactUpload = (artifactData) => {
    // Store the artifact in localStorage
    localStorage.setItem(`rb_step_${stepNumber}_artifact`, JSON.stringify(artifactData));
    setIsArtifactUploaded(true);
    setNextEnabled(true);
  };

  return (
    <StepPageTemplate 
      stepNumber={stepNumber}
      stepTitle={stepTitle}
      isArtifactUploaded={isArtifactUploaded}
      nextEnabled={nextEnabled}
      onNext={() => window.location.href = `/rb/proof`}
      onArtifactUpload={handleArtifactUpload}
    >
      <div className="step-content">
        <h2>Shipping Phase</h2>
        <p>Deployment and shipping of the AI Resume Builder system.</p>
        
        <div className="deployment-plan">
          <h3>Deployment Plan</h3>
          <textarea 
            placeholder="Outline the deployment strategy and plan..."
            rows="8"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          ></textarea>
        </div>
        
        <div className="release-notes">
          <h3>Release Notes</h3>
          <textarea 
            placeholder="Document the release notes and features..."
            rows="10"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          ></textarea>
        </div>
        
        <div className="post-deployment">
          <h3>Post-Deployment Activities</h3>
          <textarea 
            placeholder="Plan post-deployment monitoring and maintenance..."
            rows="8"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          ></textarea>
        </div>
      </div>
    </StepPageTemplate>
  );
};

export default ShipPage;
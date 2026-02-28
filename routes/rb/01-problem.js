import React, { useState, useEffect } from 'react';
import StepPageTemplate from '../../components/common/StepPageTemplate';

const ProblemPage = () => {
  const stepNumber = 1;
  const stepTitle = "Problem";
  
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
      onNext={() => window.location.href = `/rb/02-market`}
      onArtifactUpload={handleArtifactUpload}
    >
      <div className="step-content">
        <h2>Problem Statement</h2>
        <p>Define the problem that the AI Resume Builder aims to solve.</p>
        
        <div className="problem-definition">
          <h3>Problem Definition</h3>
          <textarea 
            placeholder="Describe the problem in detail..."
            rows="10"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          ></textarea>
        </div>
        
        <div className="problem-validation">
          <h3>Problem Validation</h3>
          <textarea 
            placeholder="Provide evidence or research supporting the existence of this problem..."
            rows="6"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          ></textarea>
        </div>
      </div>
    </StepPageTemplate>
  );
};

export default ProblemPage;
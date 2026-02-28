import React, { useState, useEffect } from 'react';
import StepPageTemplate from '../../components/common/StepPageTemplate';

const TestPage = () => {
  const stepNumber = 7;
  const stepTitle = "Test";
  
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
      onNext={() => window.location.href = `/rb/08-ship`}
      onArtifactUpload={handleArtifactUpload}
    >
      <div className="step-content">
        <h2>Testing Phase</h2>
        <p>Testing and validation of the AI Resume Builder system.</p>
        
        <div className="test-plan">
          <h3>Test Plan</h3>
          <textarea 
            placeholder="Outline the testing strategy and plan..."
            rows="8"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          ></textarea>
        </div>
        
        <div className="test-cases">
          <h3>Test Cases</h3>
          <textarea 
            placeholder="Document the test cases and scenarios..."
            rows="10"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          ></textarea>
        </div>
        
        <div className="test-results">
          <h3>Test Results</h3>
          <textarea 
            placeholder="Record the testing outcomes and results..."
            rows="8"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          ></textarea>
        </div>
      </div>
    </StepPageTemplate>
  );
};

export default TestPage;
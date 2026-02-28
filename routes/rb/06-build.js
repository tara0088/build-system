import React, { useState, useEffect } from 'react';
import StepPageTemplate from '../../components/common/StepPageTemplate';

const BuildPage = () => {
  const stepNumber = 6;
  const stepTitle = "Build";
  
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
      onNext={() => window.location.href = `/rb/07-test`}
      onArtifactUpload={handleArtifactUpload}
    >
      <div className="step-content">
        <h2>Build Phase</h2>
        <p>Implementation and building of the AI Resume Builder system.</p>
        
        <div className="build-plan">
          <h3>Build Plan</h3>
          <textarea 
            placeholder="Outline the build plan and implementation strategy..."
            rows="8"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          ></textarea>
        </div>
        
        <div className="development-progress">
          <h3>Development Progress</h3>
          <textarea 
            placeholder="Track the development progress and milestones..."
            rows="10"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          ></textarea>
        </div>
        
        <div className="code-structure">
          <h3>Code Structure</h3>
          <textarea 
            placeholder="Document the code structure and organization..."
            rows="8"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          ></textarea>
        </div>
      </div>
    </StepPageTemplate>
  );
};

export default BuildPage;
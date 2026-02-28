import React, { useState, useEffect } from 'react';
import StepPageTemplate from '../../components/common/StepPageTemplate';

const ArchitecturePage = () => {
  const stepNumber = 3;
  const stepTitle = "Architecture";
  
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
      onNext={() => window.location.href = `/rb/04-hld`}
      onArtifactUpload={handleArtifactUpload}
    >
      <div className="step-content">
        <h2>System Architecture</h2>
        <p>Define the overall architecture for the AI Resume Builder solution.</p>
        
        <div className="arch-overview">
          <h3>Architecture Overview</h3>
          <textarea 
            placeholder="Describe the high-level architecture of the system..."
            rows="8"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          ></textarea>
        </div>
        
        <div className="tech-stack">
          <h3>Technology Stack</h3>
          <textarea 
            placeholder="List the technologies, frameworks, and tools to be used..."
            rows="6"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          ></textarea>
        </div>
        
        <div className="components-diagram">
          <h3>Component Diagram</h3>
          <textarea 
            placeholder="Describe the major components and their interactions..."
            rows="8"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          ></textarea>
        </div>
      </div>
    </StepPageTemplate>
  );
};

export default ArchitecturePage;
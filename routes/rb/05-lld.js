import React, { useState, useEffect } from 'react';
import StepPageTemplate from '../../components/common/StepPageTemplate';

const LLDPage = () => {
  const stepNumber = 5;
  const stepTitle = "LLD";
  
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
      onNext={() => window.location.href = `/rb/06-build`}
      onArtifactUpload={handleArtifactUpload}
    >
      <div className="step-content">
        <h2>Low-Level Design (LLD)</h2>
        <p>Create the low-level design for the AI Resume Builder system.</p>
        
        <div className="lld-overview">
          <h3>LLD Overview</h3>
          <textarea 
            placeholder="Provide an overview of the low-level design..."
            rows="8"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          ></textarea>
        </div>
        
        <div className="class-diagrams">
          <h3>Class Diagrams</h3>
          <textarea 
            placeholder="Describe the classes and their relationships..."
            rows="10"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          ></textarea>
        </div>
        
        <div className="database-design">
          <h3>Database Design</h3>
          <textarea 
            placeholder="Detail the database schema and table structures..."
            rows="8"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          ></textarea>
        </div>
      </div>
    </StepPageTemplate>
  );
};

export default LLDPage;
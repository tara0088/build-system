import React, { useState, useEffect } from 'react';
import StepPageTemplate from '../../components/common/StepPageTemplate';

const MarketPage = () => {
  const stepNumber = 2;
  const stepTitle = "Market";
  
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
      onNext={() => window.location.href = `/rb/03-architecture`}
      onArtifactUpload={handleArtifactUpload}
    >
      <div className="step-content">
        <h2>Market Analysis</h2>
        <p>Analyze the market for AI Resume Builder solution.</p>
        
        <div className="market-overview">
          <h3>Market Overview</h3>
          <textarea 
            placeholder="Describe the current market landscape..."
            rows="8"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          ></textarea>
        </div>
        
        <div className="target-audience">
          <h3>Target Audience</h3>
          <textarea 
            placeholder="Define your target audience and their characteristics..."
            rows="6"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          ></textarea>
        </div>
        
        <div className="competition-analysis">
          <h3>Competition Analysis</h3>
          <textarea 
            placeholder="Analyze existing competitors and their offerings..."
            rows="8"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          ></textarea>
        </div>
      </div>
    </StepPageTemplate>
  );
};

export default MarketPage;
import React, { useState } from 'react';
import './StepPageTemplate.css';

const StepPageTemplate = ({ 
  stepNumber, 
  stepTitle, 
  isArtifactUploaded, 
  nextEnabled, 
  onNext, 
  onArtifactUpload,
  children 
}) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [artifactPreview, setArtifactPreview] = useState(null);

  const handleNextClick = () => {
    if (nextEnabled) {
      onNext();
    }
  };

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const confirmUpload = () => {
    // Create a simple artifact object
    const artifactData = {
      step: stepNumber,
      title: stepTitle,
      timestamp: new Date().toISOString(),
      content: `Artifact for ${stepTitle} step`
    };
    
    onArtifactUpload(artifactData);
    setShowUploadModal(false);
  };

  return (
    <div className="step-page-template">
      {children}
      
      <div className="navigation-controls">
        {stepNumber > 1 && (
          <button 
            className="nav-button prev-button"
            onClick={() => window.location.href = `/rb/${String(stepNumber - 1).padStart(2, '0')}-${getStepSlug(stepNumber - 1)}`}
          >
            ← Previous
          </button>
        )}
        
        <button 
          className={`nav-button next-button ${!nextEnabled ? 'disabled' : ''}`}
          onClick={handleNextClick}
          disabled={!nextEnabled}
        >
          {isArtifactUploaded ? 'Continue →' : 'Upload Artifact First'}
        </button>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Upload Artifact for Step {stepNumber}: {stepTitle}</h3>
            <p>Please upload your artifact for this step to continue to the next step.</p>
            
            <div className="upload-area">
              <input 
                type="file" 
                id="artifact-upload"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setArtifactPreview(file.name);
                  }
                }}
              />
              {artifactPreview && <p>Selected: {artifactPreview}</p>}
            </div>
            
            <div className="modal-actions">
              <button 
                className="confirm-button" 
                onClick={confirmUpload}
                disabled={!artifactPreview}
              >
                Confirm Upload
              </button>
              <button 
                className="cancel-button" 
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Button */}
      {!isArtifactUploaded && (
        <div className="upload-control">
          <button 
            className="upload-button"
            onClick={handleUploadClick}
          >
            Upload Artifact
          </button>
        </div>
      )}

      {isArtifactUploaded && (
        <div className="artifact-status">
          ✅ Artifact uploaded successfully
        </div>
      )}
    </div>
  );
};

// Helper function to get step slug based on step number
function getStepSlug(stepNum) {
  const stepNames = [
    '', 'problem', 'market', 'architecture', 'hld', 'lld', 'build', 'test', 'ship'
  ];
  return stepNames[stepNum] || 'step';
}

export default StepPageTemplate;
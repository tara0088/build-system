import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="headline">Build a Resume That Gets Read.</h1>
        <p className="subtitle">Craft professional resumes with AI-powered suggestions and ATS-friendly templates.</p>
        <a href="/builder" className="cta-button">Start Building</a>
      </div>
      
      <div className="features-section">
        <div className="feature-card">
          <h3>Premium Templates</h3>
          <p>Choose from professionally designed templates that stand out.</p>
        </div>
        <div className="feature-card">
          <h3>ATS Compatible</h3>
          <p>Ensure your resume passes through Applicant Tracking Systems.</p>
        </div>
        <div className="feature-card">
          <h3>Real-time Preview</h3>
          <p>See changes as you make them with our live preview feature.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
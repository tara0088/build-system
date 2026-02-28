import React, { useState } from 'react';
import './AnalyzePage.css';

const AnalyzePage = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sampleJDs = [
    {
      id: 1,
      title: "Software Engineer",
      content: "We are looking for a Software Engineer with experience in React, Node.js, and MongoDB. The candidate should have 3+ years of experience building scalable web applications. Responsibilities include developing new features, optimizing performance, and collaborating with cross-functional teams."
    },
    {
      id: 2,
      title: "Frontend Developer",
      content: "Seeking a Frontend Developer proficient in JavaScript, React, and CSS. The ideal candidate has experience with modern frontend tools like Webpack, Babel, and testing frameworks. Responsibilities include creating responsive UIs, implementing design systems, and ensuring cross-browser compatibility."
    },
    {
      id: 3,
      title: "UX Designer",
      content: "Looking for a UX Designer with expertise in Figma, user research, and prototyping. The candidate should have a portfolio demonstrating successful product designs. Responsibilities include conducting user research, creating wireframes, and collaborating with developers to implement designs."
    }
  ];

  const analyzeJD = () => {
    if (!jobDescription.trim()) {
      alert("Please enter a job description to analyze");
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // This would be replaced with actual AI analysis in a real app
      const mockAnalysis = {
        missingSkills: ['TypeScript', 'GraphQL', 'AWS'],
        recommendedSkills: ['Advanced React', 'Performance Optimization', 'Testing'],
        keyRequirements: ['3+ years experience', 'React proficiency', 'Team collaboration'],
        improvementTips: [
          'Focus on learning TypeScript for better code quality',
          'Gain experience with cloud platforms like AWS',
          'Strengthen testing skills with Jest and React Testing Library'
        ],
        matchPercentage: 78,
        atsScore: 85
      };

      setAnalysisResult(mockAnalysis);
      setIsLoading(false);
    }, 1500);
  };

  const loadSampleJD = (jd) => {
    setJobDescription(jd.content);
  };

  return (
    <div className="analyze-page">
      <header className="analyze-header">
        <h1>Job Description Analyzer</h1>
        <p>Analyze job descriptions to optimize your applications and identify skill gaps</p>
      </header>

      <section className="jd-input-section">
        <div className="input-container">
          <label htmlFor="job-description">Paste Job Description:</label>
          <textarea
            id="job-description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here to analyze..."
            rows="15"
          ></textarea>
        </div>

        <div className="sample-jds">
          <h3>Sample Job Descriptions:</h3>
          <div className="sample-buttons">
            {sampleJDs.map(jd => (
              <button 
                key={jd.id} 
                onClick={() => loadSampleJD(jd)}
                className="sample-btn"
              >
                {jd.title}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={analyzeJD} 
          disabled={isLoading}
          className="analyze-btn"
        >
          {isLoading ? 'Analyzing...' : 'Analyze JD'}
        </button>
      </section>

      {analysisResult && (
        <section className="analysis-results">
          <h2>Analysis Results</h2>
          
          <div className="results-summary">
            <div className="score-card">
              <h3>Match Percentage</h3>
              <p className="score">{analysisResult.matchPercentage}%</p>
            </div>
            <div className="score-card">
              <h3>ATS Score</h3>
              <p className="score">{analysisResult.atsScore}%</p>
            </div>
          </div>

          <div className="analysis-details">
            <div className="missing-skills">
              <h3>Missing Skills</h3>
              <ul>
                {analysisResult.missingSkills.map((skill, index) => (
                  <li key={index} className="skill-item missing">
                    <span className="icon">⚠️</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="recommended-skills">
              <h3>Recommended Skills to Learn</h3>
              <ul>
                {analysisResult.recommendedSkills.map((skill, index) => (
                  <li key={index} className="skill-item recommended">
                    <span className="icon">💡</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="key-requirements">
              <h3>Key Requirements</h3>
              <ul>
                {analysisResult.keyRequirements.map((req, index) => (
                  <li key={index} className="requirement-item">
                    <span className="icon">✅</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="improvement-tips">
              <h3>Improvement Tips</h3>
              <ul>
                {analysisResult.improvementTips.map((tip, index) => (
                  <li key={index} className="tip-item">
                    <span className="icon">📋</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="action-plan">
            <h3>Action Plan</h3>
            <p>Based on this analysis, we recommend focusing on the following areas to improve your match with this position:</p>
            <ol>
              <li>Acquire the missing skills identified above</li>
              <li>Update your resume to highlight relevant experience</li>
              <li>Prepare examples that demonstrate the key requirements</li>
              <li>Research the company to tailor your cover letter</li>
            </ol>
          </div>
        </section>
      )}
    </div>
  );
};

export default AnalyzePage;
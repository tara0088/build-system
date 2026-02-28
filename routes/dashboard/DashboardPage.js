import React, { useState, useEffect } from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
  const [data, setData] = useState({
    preferences: {},
    resumeData: {},
    jobMatches: [],
    applications: [],
    jdAnalyses: [],
    readinessScore: 0,
    lastActivity: []
  });

  useEffect(() => {
    const storedData = localStorage.getItem('jobTrackerData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  // Calculate readiness score
  const calculateReadinessScore = () => {
    const { jobMatches, applications, jdAnalyses, resumeData } = data;

    // Job Match Quality (30%)
    const jobMatchQuality = jobMatches.length > 0 
      ? (jobMatches.reduce((sum, job) => sum + (job.matchScore || 0), 0) / jobMatches.length) 
      : 0;
    
    // JD Skill Alignment (25%)
    const jdSkillAlignment = jdAnalyses.length > 0 
      ? 100 - (jdAnalyses.reduce((sum, analysis) => sum + (analysis.missingSkills?.length || 0), 0) / jdAnalyses.length * 10) // Assuming each missing skill reduces score
      : 0;
    
    // Resume ATS Score (25%)
    const resumeAtsScore = resumeData.atsScore || 0;
    
    // Application Progress (10%)
    const applicationProgress = applications.length > 0 
      ? (applications.filter(app => app.status !== 'applied').length / applications.length) * 100 
      : 0;
    
    // Practice Completion (10%)
    const practiceCompletion = 70; // Placeholder - would come from actual practice data

    const totalScore = (jobMatchQuality * 0.3) + (jdSkillAlignment * 0.25) + (resumeAtsScore * 0.25) + (applicationProgress * 0.1) + (practiceCompletion * 0.1);
    
    return {
      totalScore: Math.min(100, Math.max(0, Math.round(totalScore))),
      jobMatchQuality,
      jdSkillAlignment,
      resumeAtsScore,
      applicationProgress,
      practiceCompletion
    };
  };

  const { totalScore: readinessScore, jobMatchQuality, jdSkillAlignment, resumeAtsScore, applicationProgress, practiceCompletion } = calculateReadinessScore();

  // Stats calculations
  const totalApplications = data.applications.length;
  const pendingApplications = data.applications.filter(app => app.status === 'applied').length;
  const interviewCount = data.applications.filter(app => app.status === 'interview').length;
  const offerCount = data.applications.filter(app => app.status === 'offer').length;

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Job Application Dashboard</h1>
        <p>Welcome back! Here's your job search progress.</p>
      </header>

      <section className="dashboard-metrics">
        <div className="metric-card">
          <h3>Total Applications</h3>
          <p className="metric-value">{totalApplications}</p>
        </div>
        <div className="metric-card">
          <h3>Pending</h3>
          <p className="metric-value">{pendingApplications}</p>
        </div>
        <div className="metric-card">
          <h3>Interviews</h3>
          <p className="metric-value">{interviewCount}</p>
        </div>
        <div className="metric-card">
          <h3>Offers</h3>
          <p className="metric-value">{offerCount}</p>
        </div>
      </section>

      <section className="readiness-section">
        <h2>Your Readiness Score</h2>
        <div className="readiness-score-container">
          <div className="circular-progress">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" stroke="#e6e6e6" strokeWidth="8" fill="transparent" />
              <circle 
                cx="60" 
                cy="60" 
                r="50" 
                stroke="#4CAF50" 
                strokeWidth="8" 
                fill="transparent" 
                strokeDasharray={`${2 * Math.PI * 50}`} 
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - readinessScore / 100)}`} 
                transform="rotate(-90 60 60)"
              />
              <text x="60" y="60" textAnchor="middle" dy=".3em" fontSize="20" fontWeight="bold">{readinessScore}%</text>
            </svg>
          </div>
          <div className="readiness-details">
            <h3>Job Readiness Analysis</h3>
            <ul>
              <li><strong>Job Match Quality:</strong> {(jobMatchQuality * 0.3).toFixed(1)}%</li>
              <li><strong>JD Skill Alignment:</strong> {(jdSkillAlignment * 0.25).toFixed(1)}%</li>
              <li><strong>Resume ATS Score:</strong> {(resumeAtsScore * 0.25).toFixed(1)}%</li>
              <li><strong>Application Progress:</strong> {(applicationProgress * 0.1).toFixed(1)}%</li>
              <li><strong>Practice Completion:</strong> {(practiceCompletion * 0.1).toFixed(1)}%</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {data.lastActivity && data.lastActivity.slice(0, 5).map((activity, index) => (
            <div key={index} className="activity-item">
              <span className="activity-time">{activity.time}</span>
              <p>{activity.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-btn">Find Jobs</button>
          <button className="action-btn">Analyze JD</button>
          <button className="action-btn">Update Resume</button>
          <button className="action-btn">Track Applications</button>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
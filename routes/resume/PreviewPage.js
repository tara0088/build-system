import React, { useState, useEffect } from 'react';
import './PreviewPage.css';

const PreviewPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [selectedColor, setSelectedColor] = useState('teal');
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: ''
    },
    summary: '',
    education: [{ institution: '', degree: '', year: '' }],
    experience: [{ company: '', position: '', duration: '', description: '' }],
    projects: [{ name: '', description: '', techStack: [], liveUrl: '', githubUrl: '' }],
    skills: {
      technical: [],
      soft: [],
      tools: []
    },
    links: {
      github: '',
      linkedin: ''
    }
  });

  useEffect(() => {
    const savedTemplate = localStorage.getItem('resumeTemplate');
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate);
    }
    
    const savedColor = localStorage.getItem('resumeColorTheme');
    if (savedColor) {
      setSelectedColor(savedColor);
    }
    
    const savedData = localStorage.getItem('resumeBuilderData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setResumeData(parsedData);
      } catch (error) {
        console.error('Error loading resume data:', error);
      }
    }
  }, []);

  // Save template and color to localStorage when they change
  useEffect(() => {
    localStorage.setItem('resumeTemplate', selectedTemplate);
    localStorage.setItem('resumeColorTheme', selectedColor);
  }, [selectedTemplate, selectedColor]);

  // Check for validation issues
  const hasValidationIssues = !resumeData.personalInfo.name || 
                             (resumeData.projects.filter(p => p.name || p.description).length === 0 && 
                              resumeData.experience.filter(e => e.company || e.position).length === 0);

  // Calculate ATS Score
  const calculateATSScore = () => {
    let score = 0;
    
    // +10 if name provided
    if (resumeData.personalInfo.name) {
      score += 10;
    }
    
    // +10 if email provided
    if (resumeData.personalInfo.email) {
      score += 10;
    }
    
    // +10 if summary > 50 chars
    if (resumeData.summary && resumeData.summary.length > 50) {
      score += 10;
    }
    
    // +15 if at least 1 experience entry with bullets
    if (resumeData.experience.length >= 1 && 
        resumeData.experience.some(exp => exp.description && exp.description.trim() !== '')) {
      score += 15;
    }
    
    // +10 if at least 1 education entry
    if (resumeData.education.length >= 1 && 
        resumeData.education.some(edu => edu.institution || edu.degree || edu.year)) {
      score += 10;
    }
    
    // +10 if at least 5 skills added
    const totalSkills = resumeData.skills.technical.length + 
                       resumeData.skills.soft.length + 
                       resumeData.skills.tools.length;
    if (totalSkills >= 5) {
      score += 10;
    }
    
    // +10 if at least 1 project added
    if (resumeData.projects.length >= 1 && 
        resumeData.projects.some(proj => proj.name || proj.description)) {
      score += 10;
    }
    
    // +5 if phone provided
    if (resumeData.personalInfo.phone) {
      score += 5;
    }
    
    // +5 if LinkedIn provided
    if (resumeData.links.linkedin) {
      score += 5;
    }
    
    // +5 if GitHub provided
    if (resumeData.links.github) {
      score += 5;
    }
    
    // +10 if summary contains action verbs
    const actionVerbs = ['built', 'led', 'designed', 'improved', 'managed', 'created', 'developed', 'implemented', 'optimized', 'established', 'launched', 'executed', 'coordinated', 'organized', 'supervised', 'trained', 'facilitated', 'negotiated', 'resolved', 'analyzed'];
    const summaryLower = resumeData.summary.toLowerCase();
    if (actionVerbs.some(verb => summaryLower.includes(verb))) {
      score += 10;
    }
    
    // Cap at 100
    return Math.min(score, 100);
  };

  // Generate improvement suggestions
  const generateImprovementSuggestions = () => {
    const suggestions = [];
    
    if (!resumeData.personalInfo.name) {
      suggestions.push("Add your name (+10 points)");
    }
    
    if (!resumeData.personalInfo.email) {
      suggestions.push("Add your email (+10 points)");
    }
    
    if (!resumeData.summary || resumeData.summary.length <= 50) {
      suggestions.push("Write a stronger summary (>50 chars, +10 points)");
    }
    
    if (resumeData.experience.length === 0 || 
        !resumeData.experience.some(exp => exp.description && exp.description.trim() !== '')) {
      suggestions.push("Add at least 1 experience with bullet points (+15 points)");
    }
    
    if (resumeData.education.length === 0 || 
        !resumeData.education.some(edu => edu.institution || edu.degree || edu.year)) {
      suggestions.push("Add at least 1 education entry (+10 points)");
    }
    
    const totalSkills = resumeData.skills.technical.length + 
                       resumeData.skills.soft.length + 
                       resumeData.skills.tools.length;
    if (totalSkills < 5) {
      suggestions.push(`Add more skills (currently ${totalSkills}, need 5+, +10 points)`);
    }
    
    if (resumeData.projects.length === 0 || 
        !resumeData.projects.some(proj => proj.name || proj.description)) {
      suggestions.push("Add at least 1 project (+10 points)");
    }
    
    if (!resumeData.personalInfo.phone) {
      suggestions.push("Add your phone (+5 points)");
    }
    
    if (!resumeData.links.linkedin) {
      suggestions.push("Add LinkedIn profile (+5 points)");
    }
    
    if (!resumeData.links.github) {
      suggestions.push("Add GitHub profile (+5 points)");
    }
    
    const actionVerbs = ['built', 'led', 'designed', 'improved', 'managed', 'created', 'developed', 'implemented', 'optimized', 'established', 'launched', 'executed', 'coordinated', 'organized', 'supervised', 'trained', 'facilitated', 'negotiated', 'resolved', 'analyzed'];
    const summaryLower = resumeData.summary.toLowerCase();
    if (!actionVerbs.some(verb => summaryLower.includes(verb))) {
      suggestions.push("Include action verbs in summary (+10 points)");
    }
    
    return suggestions;
  };

  const atsScore = calculateATSScore();
  const improvementSuggestions = generateImprovementSuggestions();

  const printResume = () => {
    window.print();
  };

  const showToast = () => {
    const toast = document.createElement('div');
    toast.textContent = 'PDF export ready! Check your downloads.';
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #4297d4;
      color: white;
      padding: 12px 20px;
      border-radius: 6px;
      z-index: 1000;
      font-family: Arial, sans-serif;
      font-size: 14px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const copyResumeAsText = () => {
    let text = '';
    
    // Add name
    if (resumeData.personalInfo.name) {
      text += `${resumeData.personalInfo.name}\n\n`;
    }
    
    // Add contact info
    if (resumeData.personalInfo.email) text += `Email: ${resumeData.personalInfo.email}\n`;
    if (resumeData.personalInfo.phone) text += `Phone: ${resumeData.personalInfo.phone}\n`;
    if (resumeData.personalInfo.location) text += `Location: ${resumeData.personalInfo.location}\n`;
    if (resumeData.links.github) text += `GitHub: ${resumeData.links.github}\n`;
    if (resumeData.links.linkedin) text += `LinkedIn: ${resumeData.links.linkedin}\n`;
    text += '\n';
    
    // Add summary
    if (resumeData.summary) {
      text += `Summary\n`;
      text += `${resumeData.summary}\n\n`;
    }
    
    // Add education
    if (resumeData.education.filter(edu => edu.institution || edu.degree || edu.year).length > 0) {
      text += `Education\n`;
      resumeData.education.filter(edu => edu.institution || edu.degree || edu.year).forEach(edu => {
        text += `${edu.institution || '[Institution]'} - ${edu.year || '[Year]'}\n`;
        text += `${edu.degree || '[Degree]'}\n\n`;
      });
    }
    
    // Add experience
    if (resumeData.experience.filter(exp => exp.company || exp.position).length > 0) {
      text += `Experience\n`;
      resumeData.experience.filter(exp => exp.company || exp.position).forEach(exp => {
        text += `${exp.position || '[Position]'} - ${exp.company || '[Company]'} (${exp.duration || '[Duration]'})\n`;
        text += `${exp.description || '[Description]'}\n\n`;
      });
    }
    
    // Add projects
    if (resumeData.projects.filter(proj => proj.name || proj.description).length > 0) {
      text += `Projects\n`;
      resumeData.projects.filter(proj => proj.name || proj.description).forEach(proj => {
        text += `${proj.name || '[Project Name]'}\n`;
        text += `${proj.description || '[Description]'}\n`;
        if (proj.techStack && proj.techStack.length > 0) {
          text += `Tech: ${proj.techStack.join(', ')}\n`;
        }
        if (proj.liveUrl) text += `Live: ${proj.liveUrl}\n`;
        if (proj.githubUrl) text += `GitHub: ${proj.githubUrl}\n`;
        text += '\n';
      });
    }
    
    // Add skills
    if ((resumeData.skills.technical && resumeData.skills.technical.length > 0) ||
        (resumeData.skills.soft && resumeData.skills.soft.length > 0) ||
        (resumeData.skills.tools && resumeData.skills.tools.length > 0)) {
      text += `Skills\n`;
      if (resumeData.skills.technical && resumeData.skills.technical.length > 0) {
        text += `Technical: ${resumeData.skills.technical.join(', ')}\n`;
      }
      if (resumeData.skills.soft && resumeData.skills.soft.length > 0) {
        text += `Soft: ${resumeData.skills.soft.join(', ')}\n`;
      }
      if (resumeData.skills.tools && resumeData.skills.tools.length > 0) {
        text += `Tools: ${resumeData.skills.tools.join(', ')}\n`;
      }
      text += '\n';
    }
    
    // Add links
    if (resumeData.links.github || resumeData.links.linkedin) {
      text += `Links\n`;
      if (resumeData.links.github) text += `GitHub: ${resumeData.links.github}\n`;
      if (resumeData.links.linkedin) text += `LinkedIn: ${resumeData.links.linkedin}\n`;
    }

    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Resume copied to clipboard as plain text!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy resume to clipboard.');
      });
  };

  // Template thumbnails data
  const templates = [
    { id: 'classic', name: 'Classic', description: 'Traditional single-column layout' },
    { id: 'modern', name: 'Modern', description: 'Two-column with colored sidebar' },
    { id: 'minimal', name: 'Minimal', description: 'Clean single-column, no borders' }
  ];

  // Color themes data
  const colorThemes = [
    { id: 'teal', name: 'Teal', color: 'hsl(168, 60%, 40%)' },
    { id: 'navy', name: 'Navy', color: 'hsl(220, 60%, 35%)' },
    { id: 'burgundy', name: 'Burgundy', color: 'hsl(345, 60%, 35%)' },
    { id: 'forest', name: 'Forest', color: 'hsl(150, 50%, 30%)' },
    { id: 'charcoal', name: 'Charcoal', color: 'hsl(0, 0%, 25%)' }
  ];

  // Determine score status
  const getScoreStatus = (score) => {
    if (score <= 40) return { status: 'Needs Work', color: '#e53e3e' }; // Red
    if (score <= 70) return { status: 'Getting There', color: '#dd6b20' }; // Amber
    return { status: 'Strong Resume', color: '#38a169' }; // Green
  };

  const scoreStatus = getScoreStatus(atsScore);

  return (
    <div className={`preview-page template-${selectedTemplate} color-${selectedColor}`}>
      <div className="top-nav">
        <a href="/">Home</a>
        <a href="/builder">Builder</a>
        <a href="/preview" className="active">Preview</a>
        <a href="/proof">Proof</a>
      </div>
      
      <div className="page-title">
        <h1>Resume Preview</h1>
      </div>
      
      <div className="export-buttons">
        <button className="export-btn print-btn" onClick={() => { printResume(); showToast(); }}>
          Download PDF
        </button>
        <button className="export-btn copy-btn" onClick={copyResumeAsText}>
          Copy Resume as Text
        </button>
      </div>
      
      {hasValidationIssues && (
        <div className="validation-warning">
          Your resume may look incomplete.
        </div>
      )}
      
      <div className="template-and-color-picker">
        {/* Template Picker */}
        <div className="template-picker">
          <h3>Select Template</h3>
          <div className="template-thumbnails">
            {templates.map(template => (
              <div 
                key={template.id}
                className={`template-thumbnail ${selectedTemplate === template.id ? 'active' : ''}`}
                onClick={() => setSelectedTemplate(template.id)}
                title={template.description}
              >
                <div className={`thumbnail-preview template-${template.id}-preview`}></div>
                <span>{template.name}</span>
                {selectedTemplate === template.id && <div className="checkmark">✓</div>}
              </div>
            ))}
          </div>
        </div>
        
        {/* Color Theme Picker */}
        <div className="color-picker">
          <h3>Select Color Theme</h3>
          <div className="color-options">
            {colorThemes.map(theme => (
              <div 
                key={theme.id}
                className={`color-option ${selectedColor === theme.id ? 'active' : ''}`}
                style={{ backgroundColor: theme.color }}
                onClick={() => setSelectedColor(theme.id)}
                title={theme.name}
              >
                {selectedColor === theme.id && <div className="color-checkmark">✓</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* ATS Score Section */}
      <div className="ats-score-section">
        <div className="score-display">
          <div className="circular-progress">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path
                className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                stroke="#eee"
                strokeWidth="3"
              />
              <path
                className="circle"
                stroke={scoreStatus.color}
                strokeWidth="3"
                strokeLinecap="round"
                fill="transparent"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                style={{
                  strokeDasharray: `${atsScore}, 100`,
                }}
              />
              <text x="18" y="20.5" className="percentage" fill={scoreStatus.color}>
                {atsScore}
              </text>
            </svg>
          </div>
          <div className="score-info">
            <div className="score-value">{atsScore}/100</div>
            <div className="score-status" style={{ color: scoreStatus.color }}>
              {scoreStatus.status}
            </div>
          </div>
        </div>
        
        {improvementSuggestions.length > 0 && (
          <div className="improvement-suggestions">
            <h3>How to improve:</h3>
            <ul>
              {improvementSuggestions.slice(0, 3).map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="resume-container">
        <div className="resume-content">
          {/* Resume Header */}
          <header className="resume-header">
            <h1>{resumeData.personalInfo.name || '[Your Name]'}</h1>
            <div className="contact-info">
              <p>Email: {resumeData.personalInfo.email || '[email@example.com]'} | Phone: {resumeData.personalInfo.phone || '[phone number]'}</p>
              <p>Location: {resumeData.personalInfo.location || '[city, state]'} 
                {resumeData.links.github && ` | GitHub: ${resumeData.links.github}`} 
                {resumeData.links.linkedin && ` | LinkedIn: ${resumeData.links.linkedin}`}</p>
            </div>
          </header>
          
          {/* Summary Section */}
          {resumeData.summary && (
          <section className="resume-section">
            <h2>Summary</h2>
            <p className="summary-text">
              {resumeData.summary}
            </p>
          </section>
          )}
          
          {/* Education Section */}
          {resumeData.education.filter(edu => edu.institution || edu.degree || edu.year).length > 0 && (
          <section className="resume-section">
            <h2>Education</h2>
            {resumeData.education.filter(edu => edu.institution || edu.degree || edu.year).map((edu, index) => (
              <div key={index} className="education-entry">
                <div className="entry-header">
                  <h3>{edu.institution || '[Institution Name]'}</h3>
                  <span className="date">{edu.year || '[Year]'}</span>
                </div>
                <p className="degree">{edu.degree || '[Degree]'} | [Field of Study]</p>
              </div>
            ))}
          </section>
          )}
          
          {/* Experience Section */}
          {resumeData.experience.filter(exp => exp.company || exp.position).length > 0 && (
          <section className="resume-section">
            <h2>Experience</h2>
            {resumeData.experience.filter(exp => exp.company || exp.position).map((exp, index) => (
              <div key={index} className="experience-entry">
                <div className="entry-header">
                  <h3>{exp.position || '[Job Title]'}</h3>
                  <span className="date">{exp.duration || '[Duration]'}</span>
                </div>
                <p className="company">{exp.company || '[Company Name]'}</p>
                <ul className="responsibilities">
                  {(exp.description || '[Responsibility or achievement goes here]').split('. ').map((item, idx) => 
                    item.trim() && <li key={idx}>{item.trim()}{!item.trim().endsWith('.') ? '.' : ''}</li>
                  )}
                </ul>
              </div>
            ))}
          </section>
          )}
          
          {/* Projects Section */}
          {resumeData.projects.filter(proj => proj.name || proj.description).length > 0 && (
          <section className="resume-section">
            <h2>Projects</h2>
            {resumeData.projects.filter(proj => proj.name || proj.description).map((proj, index) => (
              <div key={index} className="project-entry">
                <div className="entry-header">
                  <h3>{proj.name || '[Project Name]'}</h3>
                  <span className="date">[Date]</span>
                </div>
                <p className="project-description">
                  {proj.description || '[Brief description of the project, technologies used, and your contribution.]'}
                </p>
                {proj.techStack && proj.techStack.length > 0 && (
                  <div className="tech-stack-tags">
                    {proj.techStack.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag-preview">{tech}</span>
                    ))}
                  </div>
                )}
                <div className="project-links">
                  {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer">Live</a>}
                  {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>}
                </div>
              </div>
            ))}
          </section>
          )}
          
          {/* Skills Section */}
          {(resumeData.skills.technical.length > 0 || 
            resumeData.skills.soft.length > 0 || 
            resumeData.skills.tools.length > 0) && (
          <section className="resume-section">
            <h2>Skills</h2>
            <div className="skills-container">
              {resumeData.skills.technical.length > 0 && (
                <div className="skill-category">
                  <h4>Technical Skills:</h4>
                  <div className="skill-tags-preview">
                    {resumeData.skills.technical.map((skill, index) => (
                      <span key={index} className="skill-tag-preview">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              {resumeData.skills.soft.length > 0 && (
                <div className="skill-category">
                  <h4>Soft Skills:</h4>
                  <div className="skill-tags-preview">
                    {resumeData.skills.soft.map((skill, index) => (
                      <span key={index} className="skill-tag-preview">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              {resumeData.skills.tools.length > 0 && (
                <div className="skill-category">
                  <h4>Tools & Technologies:</h4>
                  <div className="skill-tags-preview">
                    {resumeData.skills.tools.map((skill, index) => (
                      <span key={index} className="skill-tag-preview">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
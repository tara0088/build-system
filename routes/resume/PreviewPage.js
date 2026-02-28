import React, { useState, useEffect } from 'react';
import './PreviewPage.css';

const PreviewPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
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
    projects: [{ name: '', description: '', link: '' }],
    skills: '',
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

  return (
    <div className={`preview-page template-${selectedTemplate}`}>
      <div className="top-nav">
        <a href="/">Home</a>
        <a href="/builder">Builder</a>
        <a href="/preview" className="active">Preview</a>
        <a href="/proof">Proof</a>
      </div>
      
      <div className="page-title">
        <h1>Resume Preview</h1>
      </div>
      
      <div className="template-selector">
        <button 
          className={`template-btn ${selectedTemplate === 'classic' ? 'active' : ''}`}
          onClick={() => setSelectedTemplate('classic')}
        >
          Classic
        </button>
        <button 
          className={`template-btn ${selectedTemplate === 'modern' ? 'active' : ''}`}
          onClick={() => setSelectedTemplate('modern')}
        >
          Modern
        </button>
        <button 
          className={`template-btn ${selectedTemplate === 'minimal' ? 'active' : ''}`}
          onClick={() => setSelectedTemplate('minimal')}
        >
          Minimal
        </button>
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
              </div>
            ))}
          </section>
          )}
          
          {/* Skills Section */}
          {resumeData.skills && (
          <section className="resume-section">
            <h2>Skills</h2>
            <div className="skills-container">
              <div className="skill-category">
                <h4>Technical Skills:</h4>
                <p>{resumeData.skills}</p>
              </div>
            </div>
          </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
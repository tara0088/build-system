import React from 'react';
import './PreviewPage.css';

const PreviewPage = () => {
  return (
    <div className="preview-page">
      <div className="top-nav">
        <a href="/">Home</a>
        <a href="/builder">Builder</a>
        <a href="/preview" className="active">Preview</a>
        <a href="/proof">Proof</a>
      </div>
      
      <div className="page-title">
        <h1>Resume Preview</h1>
      </div>
      
      <div className="resume-container">
        <div className="resume-content">
          {/* Resume Header */}
          <header className="resume-header">
            <h1>[Your Name]</h1>
            <div className="contact-info">
              <p>Email: [email@example.com] | Phone: [phone number]</p>
              <p>Location: [city, state] | GitHub: [github-profile] | LinkedIn: [linkedin-profile]</p>
            </div>
          </header>
          
          {/* Summary Section */}
          <section className="resume-section">
            <h2>Summary</h2>
            <p className="summary-text">
              [Professional summary will appear here. This is where your professional 
              experience, skills, and career objectives are concisely presented to 
              potential employers. A well-crafted summary can make a strong first impression.]
            </p>
          </section>
          
          {/* Education Section */}
          <section className="resume-section">
            <h2>Education</h2>
            <div className="education-entry">
              <div className="entry-header">
                <h3>[Institution Name]</h3>
                <span className="date">[Year]</span>
              </div>
              <p className="degree">[Degree] | [Field of Study]</p>
            </div>
            <div className="education-entry">
              <div className="entry-header">
                <h3>[Institution Name]</h3>
                <span className="date">[Year]</span>
              </div>
              <p className="degree">[Degree] | [Field of Study]</p>
            </div>
          </section>
          
          {/* Experience Section */}
          <section className="resume-section">
            <h2>Experience</h2>
            <div className="experience-entry">
              <div className="entry-header">
                <h3>[Job Title]</h3>
                <span className="date">[Duration]</span>
              </div>
              <p className="company">[Company Name]</p>
              <ul className="responsibilities">
                <li>[Responsibility or achievement goes here. Describe your role and contributions.]</li>
                <li>[Highlight quantifiable achievements and key responsibilities relevant to the job.]</li>
                <li>[Use action verbs to start each bullet point for better readability.]</li>
              </ul>
            </div>
            <div className="experience-entry">
              <div className="entry-header">
                <h3>[Job Title]</h3>
                <span className="date">[Duration]</span>
              </div>
              <p className="company">[Company Name]</p>
              <ul className="responsibilities">
                <li>[Responsibility or achievement goes here. Describe your role and contributions.]</li>
                <li>[Highlight quantifiable achievements and key responsibilities relevant to the job.]</li>
              </ul>
            </div>
          </section>
          
          {/* Projects Section */}
          <section className="resume-section">
            <h2>Projects</h2>
            <div className="project-entry">
              <div className="entry-header">
                <h3>[Project Name]</h3>
                <span className="date">[Date]</span>
              </div>
              <p className="project-description">
                [Brief description of the project, technologies used, and your contribution. 
                Highlight the impact and outcomes of the project.]
              </p>
            </div>
            <div className="project-entry">
              <div className="entry-header">
                <h3>[Project Name]</h3>
                <span className="date">[Date]</span>
              </div>
              <p className="project-description">
                [Brief description of the project, technologies used, and your contribution. 
                Highlight the impact and outcomes of the project.]
              </p>
            </div>
          </section>
          
          {/* Skills Section */}
          <section className="resume-section">
            <h2>Skills</h2>
            <div className="skills-container">
              <div className="skill-category">
                <h4>Technical Skills:</h4>
                <p>[Skill 1], [Skill 2], [Skill 3], [Skill 4], [Skill 5]</p>
              </div>
              <div className="skill-category">
                <h4>Soft Skills:</h4>
                <p>[Communication], [Leadership], [Problem Solving], [Teamwork]</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
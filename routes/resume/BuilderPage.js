import React, { useState, useEffect } from 'react';
import './BuilderPage.css';

const BuilderPage = () => {
  const [formData, setFormData] = useState({
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

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeBuilderData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Auto-save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('resumeBuilderData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (section, field, value, index = null) => {
    if (index !== null) {
      const newArray = [...formData[section]];
      newArray[index] = { ...newArray[index], [field]: value };
      setFormData({ ...formData, [section]: newArray });
    } else if (section === 'links') {
      setFormData({
        ...formData,
        links: { ...formData.links, [field]: value }
      });
    } else if (section === 'personalInfo') {
      setFormData({
        ...formData,
        personalInfo: { ...formData.personalInfo, [field]: value }
      });
    } else {
      setFormData({
        ...formData,
        [section]: value
      });
    }
  };

  const addEntry = (section) => {
    const newEntry = section === 'education' 
      ? { institution: '', degree: '', year: '' }
      : section === 'experience'
      ? { company: '', position: '', duration: '', description: '' }
      : { name: '', description: '', link: '' };
    
    setFormData({
      ...formData,
      [section]: [...formData[section], newEntry]
    });
  };

  const removeEntry = (section, index) => {
    const newArray = [...formData[section]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [section]: newArray });
  };

  const loadSampleData = () => {
    setFormData({
      personalInfo: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA'
      },
      summary: 'Experienced software engineer with expertise in JavaScript, React, and Node.js. Passionate about creating efficient, scalable applications and solving complex problems.',
      education: [
        { institution: 'Stanford University', degree: 'BS Computer Science', year: '2015-2019' },
        { institution: 'City College', degree: 'Associate Degree', year: '2013-2015' }
      ],
      experience: [
        { 
          company: 'Tech Corp', 
          position: 'Senior Software Engineer', 
          duration: 'Jan 2021 - Present', 
          description: 'Increased application performance by 40%. Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to define, design, and ship new features.' 
        },
        { 
          company: 'Startup Inc', 
          position: 'Software Engineer', 
          duration: 'Jun 2019 - Dec 2020', 
          description: 'Built responsive web applications. Implemented RESTful APIs and integrated third-party services. Improved system efficiency by 25%.' 
        }
      ],
      projects: [
        { name: 'E-commerce Platform', description: 'Full-stack e-commerce solution with React frontend and Node.js backend, serving 10k+ daily active users', link: 'https://github.com/example/project1' },
        { name: 'Task Management App', description: 'Collaborative task management application with real-time updates, used by 500+ team members', link: 'https://github.com/example/project2' }
      ],
      skills: 'JavaScript, React, Node.js, Express, MongoDB, PostgreSQL, HTML, CSS, Git',
      links: {
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe'
      }
    });
  };

  // Calculate ATS Score
  const calculateATSScore = () => {
    let score = 0;
    
    // +15 if summary length is 40–120 words
    const summaryWords = formData.summary.trim().split(/\s+/).filter(word => word.length > 0);
    if (summaryWords.length >= 40 && summaryWords.length <= 120) {
      score += 15;
    }
    
    // +10 if at least 2 projects
    if (formData.projects.length >= 2) {
      score += 10;
    }
    
    // +10 if at least 1 experience entry
    if (formData.experience.length >= 1 && formData.experience.some(exp => exp.company && exp.position)) {
      score += 10;
    }
    
    // +10 if skills list has ≥ 8 items
    const skillsList = formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
    if (skillsList.length >= 8) {
      score += 10;
    }
    
    // +10 if GitHub or LinkedIn link exists
    if (formData.links.github.trim() || formData.links.linkedin.trim()) {
      score += 10;
    }
    
    // +15 if any experience/project bullet contains a number (%, X, k, etc.)
    const hasNumbers = [
      ...formData.experience.flatMap(exp => [exp.description]),
      ...formData.projects.flatMap(proj => [proj.description])
    ].some(text => /\d|%/i.test(text));
    
    if (hasNumbers) {
      score += 15;
    }
    
    // +10 if education section has complete fields
    if (formData.education.length > 0 && 
        formData.education.every(edu => edu.institution && edu.degree && edu.year)) {
      score += 10;
    }
    
    // Cap at 100
    return Math.min(score, 100);
  };

  // Generate suggestions based on missing elements
  const generateSuggestions = () => {
    const suggestions = [];
    const summaryWords = formData.summary.trim().split(/\s+/).filter(word => word.length > 0);
    const skillsList = formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
    
    if (summaryWords.length < 40 || summaryWords.length > 120) {
      suggestions.push("Write a stronger summary (40–120 words).");
    }
    
    if (formData.projects.length < 2) {
      suggestions.push("Add at least 2 projects.");
    }
    
    if (skillsList.length < 8) {
      suggestions.push("Add more skills (target 8+).");
    }
    
    const hasNumbers = [
      ...formData.experience.flatMap(exp => [exp.description]),
      ...formData.projects.flatMap(proj => [proj.description])
    ].some(text => /\d|%/i.test(text));
    
    if (!hasNumbers) {
      suggestions.push("Add measurable impact (numbers) in bullets.");
    }
    
    if (formData.education.length === 0 || 
        !formData.education.every(edu => edu.institution && edu.degree && edu.year)) {
      suggestions.push("Complete your education details.");
    }
    
    return suggestions.slice(0, 3); // Return max 3 suggestions
  };

  const atsScore = calculateATSScore();
  const suggestions = generateSuggestions();

  return (
    <div className="builder-page">
      <div className="top-nav">
        <a href="/">Home</a>
        <a href="/builder" className="active">Builder</a>
        <a href="/preview">Preview</a>
        <a href="/proof">Proof</a>
      </div>
      
      <div className="page-title">
        <h1>AI Resume Builder</h1>
      </div>
      
      <div className="builder-container">
        {/* Left Column - Form Sections */}
        <div className="form-sections">
          <div className="ats-score-section">
            <div className="score-meter">
              <div className="score-value">{atsScore}/100</div>
              <div className="score-label">ATS Readiness Score</div>
              <div className="meter-container">
                <div 
                  className="meter-fill" 
                  style={{ width: `${atsScore}%` }}
                ></div>
              </div>
            </div>
            
            {suggestions.length > 0 && (
              <div className="suggestions-section">
                <h3>Suggestions:</h3>
                <ul>
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="form-group">
            <h2>Personal Info</h2>
            <div className="form-row">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.personalInfo.name}
                onChange={(e) => handleChange('personalInfo', 'name', e.target.value)}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.personalInfo.email}
                onChange={(e) => handleChange('personalInfo', 'email', e.target.value)}
              />
            </div>
            <div className="form-row">
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.personalInfo.phone}
                onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.personalInfo.location}
                onChange={(e) => handleChange('personalInfo', 'location', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <h2>Summary</h2>
            <textarea
              placeholder="Professional summary..."
              rows="4"
              value={formData.summary}
              onChange={(e) => handleChange('summary', null, e.target.value)}
            />
          </div>

          <div className="form-group">
            <div className="section-header">
              <h2>Education</h2>
              <button type="button" className="add-btn" onClick={() => addEntry('education')}>
                + Add Entry
              </button>
            </div>
            {formData.education.map((edu, index) => (
              <div key={index} className="entry-form">
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => handleChange('education', 'institution', e.target.value, index)}
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleChange('education', 'degree', e.target.value, index)}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Year (e.g., 2015-2019)"
                    value={edu.year}
                    onChange={(e) => handleChange('education', 'year', e.target.value, index)}
                  />
                </div>
                {index > 0 && (
                  <button 
                    type="button" 
                    className="remove-btn"
                    onClick={() => removeEntry('education', index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="form-group">
            <div className="section-header">
              <h2>Experience</h2>
              <button type="button" className="add-btn" onClick={() => addEntry('experience')}>
                + Add Entry
              </button>
            </div>
            {formData.experience.map((exp, index) => (
              <div key={index} className="entry-form">
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleChange('experience', 'company', e.target.value, index)}
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) => handleChange('experience', 'position', e.target.value, index)}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Duration (e.g., Jan 2021 - Present)"
                  value={exp.duration}
                  onChange={(e) => handleChange('experience', 'duration', e.target.value, index)}
                />
                <textarea
                  placeholder="Description..."
                  rows="3"
                  value={exp.description}
                  onChange={(e) => handleChange('experience', 'description', e.target.value, index)}
                />
                {index > 0 && (
                  <button 
                    type="button" 
                    className="remove-btn"
                    onClick={() => removeEntry('experience', index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="form-group">
            <div className="section-header">
              <h2>Projects</h2>
              <button type="button" className="add-btn" onClick={() => addEntry('projects')}>
                + Add Entry
              </button>
            </div>
            {formData.projects.map((proj, index) => (
              <div key={index} className="entry-form">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={proj.name}
                  onChange={(e) => handleChange('projects', 'name', e.target.value, index)}
                />
                <textarea
                  placeholder="Description..."
                  rows="3"
                  value={proj.description}
                  onChange={(e) => handleChange('projects', 'description', e.target.value, index)}
                />
                <input
                  type="url"
                  placeholder="Project Link"
                  value={proj.link}
                  onChange={(e) => handleChange('projects', 'link', e.target.value, index)}
                />
                {index > 0 && (
                  <button 
                    type="button" 
                    className="remove-btn"
                    onClick={() => removeEntry('projects', index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="form-group">
            <h2>Skills</h2>
            <input
              type="text"
              placeholder="Skills (comma-separated)"
              value={formData.skills}
              onChange={(e) => handleChange('skills', null, e.target.value)}
            />
          </div>

          <div className="form-group">
            <h2>Links</h2>
            <div className="form-row">
              <input
                type="url"
                placeholder="GitHub Profile"
                value={formData.links.github}
                onChange={(e) => handleChange('links', 'github', e.target.value)}
              />
              <input
                type="url"
                placeholder="LinkedIn Profile"
                value={formData.links.linkedin}
                onChange={(e) => handleChange('links', 'linkedin', e.target.value)}
              />
            </div>
          </div>

          <button type="button" className="sample-data-btn" onClick={loadSampleData}>
            Load Sample Data
          </button>
        </div>

        {/* Right Column - Live Preview Panel */}
        <div className="preview-panel">
          <h2>Live Preview</h2>
          <div className="resume-preview">
            {/* Resume structure with actual content */}
            <div className="resume-header">
              <h1>{formData.personalInfo.name || '[Your Name]'}</h1>
              <div className="contact-info">
                <p>Email: {formData.personalInfo.email || '[email@example.com]'}</p>
                <p>Phone: {formData.personalInfo.phone || '[phone number]'}</p>
                <p>Location: {formData.personalInfo.location || '[city, state]'}</p>
                {formData.links.github && <p>GitHub: {formData.links.github}</p>}
                {formData.links.linkedin && <p>LinkedIn: {formData.links.linkedin}</p>}
              </div>
            </div>
            
            {formData.summary && (
              <div className="section">
                <h3>Summary</h3>
                <p>{formData.summary}</p>
              </div>
            )}
            
            {formData.education.filter(edu => edu.institution || edu.degree || edu.year).length > 0 && (
              <div className="section">
                <h3>Education</h3>
                {formData.education.filter(edu => edu.institution || edu.degree || edu.year).map((edu, index) => (
                  <div key={index} className="entry">
                    <div className="entry-header">
                      <strong>{edu.institution || '[Institution]'}</strong>
                      <span>{edu.year || '[Year]'}</span>
                    </div>
                    <p>{edu.degree || '[Degree]'}</p>
                  </div>
                ))}
              </div>
            )}
            
            {formData.experience.filter(exp => exp.company || exp.position).length > 0 && (
              <div className="section">
                <h3>Experience</h3>
                {formData.experience.filter(exp => exp.company || exp.position).map((exp, index) => (
                  <div key={index} className="entry">
                    <div className="entry-header">
                      <strong>{exp.position || '[Position]'}</strong>
                      <span>{exp.duration || '[Duration]'}</span>
                    </div>
                    <p>{exp.company || '[Company]'}</p>
                    <p>{exp.description || '[Experience description will appear here...]'}</p>
                  </div>
                ))}
              </div>
            )}
            
            {formData.projects.filter(proj => proj.name || proj.description).length > 0 && (
              <div className="section">
                <h3>Projects</h3>
                {formData.projects.filter(proj => proj.name || proj.description).map((proj, index) => (
                  <div key={index} className="entry">
                    <div className="entry-header">
                      <strong>{proj.name || '[Project Name]'}</strong>
                      {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.link}</a>}
                    </div>
                    <p>{proj.description || '[Project description will appear here...]'}</p>
                  </div>
                ))}
              </div>
            )}
            
            {formData.skills && (
              <div className="section">
                <h3>Skills</h3>
                <p>{formData.skills}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
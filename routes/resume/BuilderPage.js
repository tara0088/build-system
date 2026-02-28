import React, { useState } from 'react';
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
          description: 'Develop and maintain web applications using React and Node.js. Collaborate with cross-functional teams to define, design, and ship new features.' 
        },
        { 
          company: 'Startup Inc', 
          position: 'Software Engineer', 
          duration: 'Jun 2019 - Dec 2020', 
          description: 'Built responsive web applications. Implemented RESTful APIs and integrated third-party services.' 
        }
      ],
      projects: [
        { name: 'E-commerce Platform', description: 'Full-stack e-commerce solution with React frontend and Node.js backend', link: 'https://github.com/example/project1' },
        { name: 'Task Management App', description: 'Collaborative task management application with real-time updates', link: 'https://github.com/example/project2' }
      ],
      skills: 'JavaScript, React, Node.js, Express, MongoDB, PostgreSQL, HTML, CSS, Git',
      links: {
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe'
      }
    });
  };

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
            {/* Resume structure placeholder */}
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
            
            <div className="section">
              <h3>Summary</h3>
              <p>{formData.summary || '[Professional summary will appear here...]'}</p>
            </div>
            
            <div className="section">
              <h3>Education</h3>
              {formData.education.map((edu, index) => (
                <div key={index} className="entry">
                  <div className="entry-header">
                    <strong>{edu.institution || '[Institution]'}</strong>
                    <span>{edu.year || '[Year]'}</span>
                  </div>
                  <p>{edu.degree || '[Degree]'}</p>
                </div>
              ))}
            </div>
            
            <div className="section">
              <h3>Experience</h3>
              {formData.experience.map((exp, index) => (
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
            
            <div className="section">
              <h3>Projects</h3>
              {formData.projects.map((proj, index) => (
                <div key={index} className="entry">
                  <div className="entry-header">
                    <strong>{proj.name || '[Project Name]'}</strong>
                    {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.link}</a>}
                  </div>
                  <p>{proj.description || '[Project description will appear here...]'}</p>
                </div>
              ))}
            </div>
            
            <div className="section">
              <h3>Skills</h3>
              <p>{formData.skills || '[Skills will appear here...]'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
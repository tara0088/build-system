import React, { useState, useEffect } from 'react';
import './ResumePage.css';

const ResumeManagerPage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: ''
    },
    summary: {
      text: ''
    },
    experience: [
      {
        id: 1,
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    education: [
      {
        id: 1,
        institution: '',
        degree: '',
        fieldOfStudy: '',
        graduationDate: ''
      }
    ],
    projects: [
      {
        id: 1,
        title: '',
        description: '',
        technologies: '',
        link: ''
      }
    ],
    skills: {
      technical: [],
      soft: []
    }
  });
  const [atsScore, setAtsScore] = useState(0);

  useEffect(() => {
    // Load resume data from localStorage
    const storedResume = localStorage.getItem('resumeData');
    if (storedResume) {
      setResumeData(JSON.parse(storedResume));
    }
  }, []);

  useEffect(() => {
    // Calculate ATS score based on completeness
    const calculateAtsScore = () => {
      let score = 0;
      let totalFields = 0;
      
      // Personal info
      totalFields += 5;
      if (resumeData.personalInfo.fullName) score += 1;
      if (resumeData.personalInfo.email) score += 1;
      if (resumeData.personalInfo.phone) score += 1;
      if (resumeData.personalInfo.location) score += 1;
      if (resumeData.personalInfo.linkedin) score += 1;
      
      // Summary
      totalFields += 1;
      if (resumeData.summary.text) score += 1;
      
      // Experience
      if (resumeData.experience.length > 0) {
        totalFields += resumeData.experience.length;
        resumeData.experience.forEach(exp => {
          if (exp.company && exp.position && exp.startDate && exp.description) score += 1;
        });
      }
      
      // Education
      if (resumeData.education.length > 0) {
        totalFields += resumeData.education.length;
        resumeData.education.forEach(edu => {
          if (edu.institution && edu.degree && edu.graduationDate) score += 1;
        });
      }
      
      // Projects
      if (resumeData.projects.length > 0) {
        totalFields += resumeData.projects.length;
        resumeData.projects.forEach(project => {
          if (project.title && project.description) score += 1;
        });
      }
      
      // Skills
      totalFields += 1;
      if (resumeData.skills.technical.length > 0) score += 1;
      
      return Math.round((score / totalFields) * 100);
    };
    
    setAtsScore(calculateAtsScore());
  }, [resumeData]);

  const handleInputChange = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setResumeData(prev => {
      const newArray = [...prev[section]];
      newArray[index][field] = value;
      return {
        ...prev,
        [section]: newArray
      };
    });
  };

  const addArrayItem = (section) => {
    setResumeData(prev => {
      const newItem = section === 'experience' ? {
        id: Date.now(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      } : section === 'education' ? {
        id: Date.now(),
        institution: '',
        degree: '',
        fieldOfStudy: '',
        graduationDate: ''
      } : {
        id: Date.now(),
        title: '',
        description: '',
        technologies: '',
        link: ''
      };
      
      return {
        ...prev,
        [section]: [...prev[section], newItem]
      };
    });
  };

  const removeArrayItem = (section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const handleSkillChange = (type, value) => {
    const skills = value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [type]: skills
      }
    }));
  };

  const saveResume = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    alert('Resume saved successfully!');
  };

  const renderPersonalInfo = () => (
    <div className="form-section">
      <h3>Personal Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={resumeData.personalInfo.fullName}
            onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={resumeData.personalInfo.email}
            onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
            placeholder="john.doe@example.com"
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            value={resumeData.personalInfo.phone}
            onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
            placeholder="(123) 456-7890"
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={resumeData.personalInfo.location}
            onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
            placeholder="City, State"
          />
        </div>
        <div className="form-group">
          <label>LinkedIn</label>
          <input
            type="url"
            value={resumeData.personalInfo.linkedin}
            onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/username"
          />
        </div>
        <div className="form-group">
          <label>GitHub</label>
          <input
            type="url"
            value={resumeData.personalInfo.github}
            onChange={(e) => handleInputChange('personalInfo', 'github', e.target.value)}
            placeholder="https://github.com/username"
          />
        </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="form-section">
      <h3>Professional Summary</h3>
      <div className="form-group">
        <label>Summary</label>
        <textarea
          value={resumeData.summary.text}
          onChange={(e) => handleInputChange('summary', 'text', e.target.value)}
          placeholder="Write a brief summary of your professional background and career goals..."
          rows="5"
        ></textarea>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Work Experience</h3>
        <button onClick={() => addArrayItem('experience')} className="add-btn">+ Add Experience</button>
      </div>
      {resumeData.experience.map((exp, index) => (
        <div key={exp.id} className="entry-card">
          <div className="card-header">
            <h4>Experience #{index + 1}</h4>
            <button 
              onClick={() => removeArrayItem('experience', exp.id)} 
              className="remove-btn"
            >
              Remove
            </button>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                placeholder="Company Name"
              />
            </div>
            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => handleArrayChange('experience', index, 'position', e.target.value)}
                placeholder="Job Title"
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="month"
                value={exp.endDate}
                onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={exp.description}
              onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
              placeholder="Describe your responsibilities and achievements..."
              rows="4"
            ></textarea>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEducation = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Education</h3>
        <button onClick={() => addArrayItem('education')} className="add-btn">+ Add Education</button>
      </div>
      {resumeData.education.map((edu, index) => (
        <div key={edu.id} className="entry-card">
          <div className="card-header">
            <h4>Education #{index + 1}</h4>
            <button 
              onClick={() => removeArrayItem('education', edu.id)} 
              className="remove-btn"
            >
              Remove
            </button>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Institution</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                placeholder="University/College Name"
              />
            </div>
            <div className="form-group">
              <label>Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                placeholder="Degree Type"
              />
            </div>
            <div className="form-group">
              <label>Field of Study</label>
              <input
                type="text"
                value={edu.fieldOfStudy}
                onChange={(e) => handleArrayChange('education', index, 'fieldOfStudy', e.target.value)}
                placeholder="Major/Specialization"
              />
            </div>
            <div className="form-group">
              <label>Graduation Date</label>
              <input
                type="month"
                value={edu.graduationDate}
                onChange={(e) => handleArrayChange('education', index, 'graduationDate', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProjects = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Projects</h3>
        <button onClick={() => addArrayItem('projects')} className="add-btn">+ Add Project</button>
      </div>
      {resumeData.projects.map((project, index) => (
        <div key={project.id} className="entry-card">
          <div className="card-header">
            <h4>Project #{index + 1}</h4>
            <button 
              onClick={() => removeArrayItem('projects', project.id)} 
              className="remove-btn"
            >
              Remove
            </button>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)}
                placeholder="Project Title"
              />
            </div>
            <div className="form-group">
              <label>Technologies Used</label>
              <input
                type="text"
                value={project.technologies}
                onChange={(e) => handleArrayChange('projects', index, 'technologies', e.target.value)}
                placeholder="React, Node.js, etc."
              />
            </div>
            <div className="form-group">
              <label>Link (Optional)</label>
              <input
                type="url"
                value={project.link}
                onChange={(e) => handleArrayChange('projects', index, 'link', e.target.value)}
                placeholder="https://project-url.com"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={project.description}
              onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
              placeholder="Describe the project, your role, and key accomplishments..."
              rows="4"
            ></textarea>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div className="form-section">
      <h3>Skills</h3>
      <div className="form-group">
        <label>Technical Skills (comma separated)</label>
        <input
          type="text"
          value={resumeData.skills.technical.join(', ')}
          onChange={(e) => handleSkillChange('technical', e.target.value)}
          placeholder="JavaScript, React, Node.js, etc."
        />
      </div>
      <div className="form-group">
        <label>Soft Skills (comma separated)</label>
        <input
          type="text"
          value={resumeData.skills.soft.join(', ')}
          onChange={(e) => handleSkillChange('soft', e.target.value)}
          placeholder="Communication, Leadership, Teamwork, etc."
        />
      </div>
    </div>
  );

  return (
    <div className="resume-manager-page">
      <header className="resume-manager-header">
        <h1>Resume Manager</h1>
        <p>Build and manage your resume to maximize ATS compatibility</p>
      </header>

      <div className="resume-stats">
        <div className="stat-card">
          <h3>ATS Score</h3>
          <p className="score">{atsScore}%</p>
        </div>
        <div className="stat-card">
          <h3>Completion</h3>
          <p className="score">{atsScore}%</p>
        </div>
        <div className="stat-card">
          <h3>Sections</h3>
          <p className="score">6/6</p>
        </div>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={activeTab === 'personal' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('personal')}
          >
            Personal Info
          </button>
          <button 
            className={activeTab === 'summary' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('summary')}
          >
            Summary
          </button>
          <button 
            className={activeTab === 'experience' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('experience')}
          >
            Experience
          </button>
          <button 
            className={activeTab === 'education' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('education')}
          >
            Education
          </button>
          <button 
            className={activeTab === 'projects' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button 
            className={activeTab === 'skills' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('skills')}
          >
            Skills
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'personal' && renderPersonalInfo()}
          {activeTab === 'summary' && renderSummary()}
          {activeTab === 'experience' && renderExperience()}
          {activeTab === 'education' && renderEducation()}
          {activeTab === 'projects' && renderProjects()}
          {activeTab === 'skills' && renderSkills()}
        </div>
      </div>

      <div className="resume-actions">
        <button onClick={saveResume} className="save-btn">Save Resume</button>
        <button className="preview-btn">Preview Resume</button>
      </div>
    </div>
  );
};

export default ResumeManagerPage;
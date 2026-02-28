import React, { useState, useEffect } from 'react';
import './BuilderPage.css';

const BuilderPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [selectedColor, setSelectedColor] = useState('teal');
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

  // Load template from localStorage on component mount
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
        setFormData(parsedData);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Auto-save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('resumeBuilderData', JSON.stringify(formData));
    localStorage.setItem('resumeTemplate', selectedTemplate);
    localStorage.setItem('resumeColorTheme', selectedColor);
  }, [formData, selectedTemplate, selectedColor]);

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
    } else if (section === 'skills') {
      setFormData({
        ...formData,
        skills: { ...formData.skills, [field]: value }
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
      : { name: '', description: '', techStack: [], liveUrl: '', githubUrl: '' };
    
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

  // Skills functions
  const addSkill = (category, skill) => {
    if (skill && !formData.skills[category].includes(skill)) {
      const newSkills = [...formData.skills[category], skill];
      setFormData({
        ...formData,
        skills: {
          ...formData.skills,
          [category]: newSkills
        }
      });
    }
  };

  const removeSkill = (category, skill) => {
    const newSkills = formData.skills[category].filter(s => s !== skill);
    setFormData({
      ...formData,
      skills: {
        ...formData.skills,
        [category]: newSkills
      }
    });
  };

  const handleSkillInput = (category, e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      addSkill(category, e.target.value.trim());
      e.target.value = '';
      e.preventDefault();
    }
  };

  const suggestSkills = () => {
    // Show loading state
    const originalSkills = {...formData.skills};
    setFormData({
      ...formData,
      skills: {
        technical: [],
        soft: [],
        tools: []
      }
    });
    
    setTimeout(() => {
      setFormData({
        ...formData,
        skills: {
          technical: ["TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"],
          soft: ["Team Leadership", "Problem Solving"],
          tools: ["Git", "Docker", "AWS"]
        }
      });
    }, 1000);
  };

  // Projects functions
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { name: '', description: '', techStack: [], liveUrl: '', githubUrl: '' }
      ]
    });
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...formData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setFormData({ ...formData, projects: newProjects });
  };

  const addTechToProject = (projectIndex, tech) => {
    if (tech && !formData.projects[projectIndex].techStack.includes(tech)) {
      const newProjects = [...formData.projects];
      newProjects[projectIndex] = {
        ...newProjects[projectIndex],
        techStack: [...newProjects[projectIndex].techStack, tech]
      };
      setFormData({ ...formData, projects: newProjects });
    }
  };

  const removeTechFromProject = (projectIndex, tech) => {
    const newProjects = [...formData.projects];
    newProjects[projectIndex] = {
      ...newProjects[projectIndex],
      techStack: newProjects[projectIndex].techStack.filter(t => t !== tech)
    };
    setFormData({ ...formData, projects: newProjects });
  };

  const handleTechInput = (projectIndex, e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      addTechToProject(projectIndex, e.target.value.trim());
      e.target.value = '';
      e.preventDefault();
    }
  };

  const removeProject = (index) => {
    const newProjects = [...formData.projects];
    newProjects.splice(index, 1);
    setFormData({ ...formData, projects: newProjects });
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
        { 
          name: 'E-commerce Platform', 
          description: 'Full-stack e-commerce solution with React frontend and Node.js backend, serving 10k+ daily active users', 
          techStack: ['React', 'Node.js', 'MongoDB'],
          liveUrl: 'https://ecommerce-platform-demo.com',
          githubUrl: 'https://github.com/example/project1' 
        },
        { 
          name: 'Task Management App', 
          description: 'Collaborative task management application with real-time updates, used by 500+ team members', 
          techStack: ['Vue.js', 'Express', 'PostgreSQL'],
          liveUrl: 'https://task-manager-demo.com',
          githubUrl: 'https://github.com/example/project2' 
        }
      ],
      skills: {
        technical: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'HTML', 'CSS', 'Git'],
        soft: ['Communication', 'Leadership', 'Problem Solving', 'Teamwork'],
        tools: ['VS Code', 'Git', 'Docker', 'AWS', 'Jira']
      },
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
    
    // +10 if skills list has ≥ 8 items total
    const totalSkills = formData.skills.technical.length + formData.skills.soft.length + formData.skills.tools.length;
    if (totalSkills >= 8) {
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
    const totalSkills = formData.skills.technical.length + formData.skills.soft.length + formData.skills.tools.length;
    
    if (summaryWords.length < 40 || summaryWords.length > 120) {
      suggestions.push("Write a stronger summary (40–120 words).");
    }
    
    if (formData.projects.length < 2) {
      suggestions.push("Add at least 2 projects.");
    }
    
    if (totalSkills < 8) {
      suggestions.push("Add more skills (target 8+ total).");
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

  // Generate improvement suggestions
  const generateImprovements = () => {
    const improvements = [];
    const summaryWords = formData.summary.trim().split(/\s+/).filter(word => word.length > 0);
    const totalSkills = formData.skills.technical.length + formData.skills.soft.length + formData.skills.tools.length;
    
    if (formData.projects.length < 2) {
      improvements.push("Consider adding more projects to showcase your skills.");
    }
    
    const hasNumbers = [
      ...formData.experience.flatMap(exp => [exp.description]),
      ...formData.projects.flatMap(proj => [proj.description])
    ].some(text => /\d|%/i.test(text));
    
    if (!hasNumbers) {
      improvements.push("Include measurable impact with numbers in your bullets.");
    }
    
    if (summaryWords.length < 40) {
      improvements.push("Expand your summary to at least 40 words.");
    }
    
    if (totalSkills < 8) {
      improvements.push("Add more skills to reach at least 8 items total.");
    }
    
    if (formData.experience.length === 0) {
      improvements.push("Consider adding internship or project work experience.");
    }
    
    return improvements.slice(0, 3); // Return max 3 improvements
  };

  // Check if a bullet starts with an action verb
  const startsWithActionVerb = (bullet) => {
    const actionVerbs = ['built', 'developed', 'designed', 'implemented', 'led', 'improved', 'created', 'optimized', 'automated'];
    const lowerBullet = bullet.toLowerCase().trim();
    return actionVerbs.some(verb => lowerBullet.startsWith(verb));
  };

  // Check if a bullet has numeric indicators
  const hasNumericIndicator = (bullet) => {
    return /\d|%/i.test(bullet);
  };

  const atsScore = calculateATSScore();
  const suggestions = generateSuggestions();
  const improvements = generateImprovements();

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

  return (
    <div className={`builder-page template-${selectedTemplate} color-${selectedColor}`}>
      <div className="top-nav">
        <a href="/">Home</a>
        <a href="/builder" className="active">Builder</a>
        <a href="/preview">Preview</a>
        <a href="/proof">Proof</a>
      </div>
      
      <div className="page-title">
        <h1>AI Resume Builder</h1>
      </div>
      
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
            
            {improvements.length > 0 && (
              <div className="improvements-section">
                <h3>Top 3 Improvements:</h3>
                <ul>
                  {improvements.map((improvement, index) => (
                    <li key={index}>{improvement}</li>
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
                {!startsWithActionVerb(exp.description) && exp.description.trim() && (
                  <div className="guidance-suggestion">Start with a strong action verb.</div>
                )}
                {exp.description.trim() && !hasNumericIndicator(exp.description) && (
                  <div className="guidance-suggestion">Add measurable impact (numbers).</div>
                )}
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

          {/* Projects Section */}
          <div className="form-group">
            <div className="section-header">
              <h2>Projects</h2>
              <button type="button" className="add-btn" onClick={addProject}>
                + Add Project
              </button>
            </div>
            {formData.projects.map((project, index) => (
              <div key={index} className="project-accordion">
                <div className="project-header">
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={project.name}
                    onChange={(e) => updateProject(index, 'name', e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="remove-btn"
                    onClick={() => removeProject(index)}
                    title="Delete Project"
                  >
                    ×
                  </button>
                </div>
                <div className="project-content">
                  <textarea
                    placeholder="Description (max 200 chars)"
                    rows="3"
                    value={project.description}
                    maxLength="200"
                    onChange={(e) => updateProject(index, 'description', e.target.value)}
                  />
                  <div className="char-counter">{project.description.length}/200</div>
                  
                  <div className="tech-stack-input">
                    <input
                      type="text"
                      placeholder="Add technology (press Enter)"
                      onKeyDown={(e) => handleTechInput(index, e)}
                    />
                    <div className="tech-tags">
                      {project.techStack.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">
                          {tech}
                          <button 
                            type="button" 
                            onClick={() => removeTechFromProject(index, tech)}
                            className="remove-tech-btn"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <input
                      type="url"
                      placeholder="Live URL (optional)"
                      value={project.liveUrl}
                      onChange={(e) => updateProject(index, 'liveUrl', e.target.value)}
                    />
                    <input
                      type="url"
                      placeholder="GitHub URL (optional)"
                      value={project.githubUrl}
                      onChange={(e) => updateProject(index, 'githubUrl', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div className="form-group">
            <h2>Skills</h2>
            <div className="skills-categories">
              <div className="skill-category">
                <div className="category-header">
                  <h3>Technical Skills ({formData.skills.technical.length})</h3>
                  <button type="button" className="suggest-btn" onClick={suggestSkills}>
                    ✨ Suggest Skills
                  </button>
                </div>
                <div className="skill-input-container">
                  <input
                    type="text"
                    placeholder="Add technical skill (press Enter)"
                    onKeyDown={(e) => handleSkillInput('technical', e)}
                  />
                  <div className="skill-tags">
                    {formData.skills.technical.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                        <button 
                          type="button" 
                          onClick={() => removeSkill('technical', skill)}
                          className="remove-skill-btn"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>Soft Skills ({formData.skills.soft.length})</h3>
                <div className="skill-input-container">
                  <input
                    type="text"
                    placeholder="Add soft skill (press Enter)"
                    onKeyDown={(e) => handleSkillInput('soft', e)}
                  />
                  <div className="skill-tags">
                    {formData.skills.soft.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                        <button 
                          type="button" 
                          onClick={() => removeSkill('soft', skill)}
                          className="remove-skill-btn"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>Tools & Technologies ({formData.skills.tools.length})</h3>
                <div className="skill-input-container">
                  <input
                    type="text"
                    placeholder="Add tool/technology (press Enter)"
                    onKeyDown={(e) => handleSkillInput('tools', e)}
                  />
                  <div className="skill-tags">
                    {formData.skills.tools.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                        <button 
                          type="button" 
                          onClick={() => removeSkill('tools', skill)}
                          className="remove-skill-btn"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
                  <div key={index} className="project-card">
                    <div className="project-header">
                      <h4>{proj.name || '[Project Name]'}</h4>
                      <div className="project-links">
                        {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" title="Live URL">🌐</a>}
                        {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub URL">🔗</a>}
                      </div>
                    </div>
                    <p>{proj.description || '[Project description will appear here...]'}</p>
                    <div className="tech-stack-tags">
                      {proj.techStack.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag-preview">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {(formData.skills.technical.length > 0 || formData.skills.soft.length > 0 || formData.skills.tools.length > 0) && (
              <div className="section">
                <h3>Skills</h3>
                <div className="skills-groups">
                  {formData.skills.technical.length > 0 && (
                    <div className="skill-group">
                      <h4>Technical Skills</h4>
                      <div className="skill-tags-preview">
                        {formData.skills.technical.map((skill, index) => (
                          <span key={index} className="skill-tag-preview">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {formData.skills.soft.length > 0 && (
                    <div className="skill-group">
                      <h4>Soft Skills</h4>
                      <div className="skill-tags-preview">
                        {formData.skills.soft.map((skill, index) => (
                          <span key={index} className="skill-tag-preview">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {formData.skills.tools.length > 0 && (
                    <div className="skill-group">
                      <h4>Tools & Technologies</h4>
                      <div className="skill-tags-preview">
                        {formData.skills.tools.map((skill, index) => (
                          <span key={index} className="skill-tag-preview">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
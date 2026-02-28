import React, { useState, useEffect } from 'react';
import './JobsPage.css';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');

  useEffect(() => {
    // Load jobs from localStorage or use sample data
    const storedJobs = localStorage.getItem('jobList');
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
      setFilteredJobs(JSON.parse(storedJobs));
    } else {
      // Sample job data
      const sampleJobs = [
        {
          id: 1,
          title: 'Frontend Developer',
          company: 'Tech Corp',
          location: 'San Francisco, CA',
          salary: '$90,000 - $120,000',
          type: 'Full-time',
          postedDate: '2 days ago',
          requirements: ['React', 'JavaScript', 'CSS'],
          description: 'We are looking for an experienced Frontend Developer...',
          matchScore: 85
        },
        {
          id: 2,
          title: 'Backend Engineer',
          company: 'Innovate Inc',
          location: 'New York, NY',
          salary: '$100,000 - $130,000',
          type: 'Full-time',
          postedDate: '1 day ago',
          requirements: ['Node.js', 'Express', 'MongoDB'],
          description: 'Join our backend team to build scalable services...',
          matchScore: 78
        },
        {
          id: 3,
          title: 'UX Designer',
          company: 'Creative Studio',
          location: 'Remote',
          salary: '$80,000 - $100,000',
          type: 'Contract',
          postedDate: '3 days ago',
          requirements: ['Figma', 'UI/UX', 'Prototyping'],
          description: 'Design beautiful user experiences for our clients...',
          matchScore: 92
        }
      ];
      setJobs(sampleJobs);
      setFilteredJobs(sampleJobs);
    }
  }, []);

  useEffect(() => {
    let result = jobs;

    if (searchTerm) {
      result = result.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter) {
      result = result.filter(job =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (jobTypeFilter) {
      result = result.filter(job => job.type === jobTypeFilter);
    }

    setFilteredJobs(result);
  }, [searchTerm, locationFilter, jobTypeFilter, jobs]);

  const handleSaveJob = (jobId) => {
    // In a real app, this would save the job to the user's saved jobs
    alert(`Job ${jobId} saved!`);
  };

  const handleApply = (jobId) => {
    // In a real app, this would initiate the application process
    alert(`Applying to job ${jobId}...`);
  };

  const handleAnalyzeJD = (jobId) => {
    // In a real app, this would navigate to the analyze page with the job details
    alert(`Analyzing job description for job ${jobId}`);
  };

  return (
    <div className="jobs-page">
      <header className="jobs-header">
        <h1>Job Opportunities</h1>
        <p>Discover and track job opportunities that match your skills</p>
      </header>

      <section className="search-filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search jobs, companies, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="filter-input"
          />
        </div>
        <div className="filter-group">
          <select
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
      </section>

      <section className="jobs-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <div className="job-title-section">
                  <h3>{job.title}</h3>
                  <p className="company-location">{job.company} • {job.location}</p>
                </div>
                <div className="job-match-score">
                  <span className={`match-badge ${job.matchScore >= 80 ? 'high' : job.matchScore >= 60 ? 'medium' : 'low'}`}>
                    Match: {job.matchScore}%
                  </span>
                </div>
              </div>
              
              <div className="job-details">
                <div className="salary-type">
                  <span className="salary">{job.salary}</span>
                  <span className="type">{job.type}</span>
                </div>
                <div className="posted-date">Posted: {job.postedDate}</div>
              </div>
              
              <div className="job-description">
                <p>{job.description}</p>
              </div>
              
              <div className="requirements">
                <h4>Requirements:</h4>
                <ul>
                  {job.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
              
              <div className="job-actions">
                <button onClick={() => handleAnalyzeJD(job.id)} className="btn-analyze">Analyze JD</button>
                <button onClick={() => handleSaveJob(job.id)} className="btn-save">Save Job</button>
                <button onClick={() => handleApply(job.id)} className="btn-apply">Apply Now</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-jobs">
            <p>No jobs found matching your criteria.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobsPage;
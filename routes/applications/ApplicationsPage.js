import React, { useState, useEffect } from 'react';
import './ApplicationsPage.css';

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load applications from localStorage or use sample data
    const storedApps = localStorage.getItem('applications');
    if (storedApps) {
      setApplications(JSON.parse(storedApps));
      setFilteredApplications(JSON.parse(storedApps));
    } else {
      // Sample application data
      const sampleApps = [
        {
          id: 1,
          jobId: 1,
          jobTitle: 'Frontend Developer',
          company: 'Tech Corp',
          appliedDate: '2023-05-15',
          status: 'applied',
          nextSteps: 'Waiting for response',
          notes: 'Applied through company website',
          contactPerson: 'HR Department',
          contactEmail: 'hr@techcorp.com'
        },
        {
          id: 2,
          jobId: 2,
          jobTitle: 'Backend Engineer',
          company: 'Innovate Inc',
          appliedDate: '2023-05-18',
          status: 'interview',
          nextSteps: 'Technical interview scheduled for May 25',
          notes: 'Phone screening completed successfully',
          contactPerson: 'Jane Smith',
          contactEmail: 'jane.smith@innovate.com'
        },
        {
          id: 3,
          jobId: 3,
          jobTitle: 'UX Designer',
          company: 'Creative Studio',
          appliedDate: '2023-05-20',
          status: 'offer',
          nextSteps: 'Reviewing offer details',
          notes: 'Received offer with competitive salary',
          contactPerson: 'Mike Johnson',
          contactEmail: 'mike.johnson@creativestudio.com'
        }
      ];
      setApplications(sampleApps);
      setFilteredApplications(sampleApps);
    }
  }, []);

  useEffect(() => {
    let result = applications;

    if (statusFilter !== 'all') {
      result = result.filter(app => app.status === statusFilter);
    }

    if (searchTerm) {
      result = result.filter(app =>
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredApplications(result);
  }, [statusFilter, searchTerm, applications]);

  const updateApplicationStatus = (appId, newStatus) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === appId ? { ...app, status: newStatus } : app
      )
    );
    alert(`Application status updated to ${newStatus}`);
  };

  const deleteApplication = (appId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setApplications(prev => prev.filter(app => app.id !== appId));
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'applied':
        return '#2196F3';
      case 'interview':
        return '#FF9800';
      case 'offer':
        return '#4CAF50';
      case 'rejected':
        return '#f44336';
      default:
        return '#9E9E9E';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="applications-page">
      <header className="applications-header">
        <h1>Application Tracker</h1>
        <p>Track and manage your job applications</p>
      </header>

      <section className="controls-section">
        <div className="search-filter-group">
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Statuses</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <button className="add-application-btn">+ Add Application</button>
      </section>

      <section className="applications-list">
        {filteredApplications.length > 0 ? (
          filteredApplications.map(app => (
            <div key={app.id} className="application-card">
              <div className="application-header">
                <div className="job-info">
                  <h3>{app.jobTitle}</h3>
                  <p className="company">{app.company}</p>
                </div>
                <div className="status-badge" style={{ backgroundColor: getStatusColor(app.status) }}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </div>
              </div>

              <div className="application-details">
                <div className="detail-item">
                  <span className="label">Applied Date:</span>
                  <span className="value">{formatDate(app.appliedDate)}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Next Steps:</span>
                  <span className="value">{app.nextSteps}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Contact:</span>
                  <span className="value">{app.contactPerson} ({app.contactEmail})</span>
                </div>
                <div className="detail-item">
                  <span className="label">Notes:</span>
                  <span className="value">{app.notes}</span>
                </div>
              </div>

              <div className="application-actions">
                <select
                  value={app.status}
                  onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                  className="status-dropdown"
                >
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button 
                  onClick={() => deleteApplication(app.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-applications">
            <p>No applications found.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ApplicationsPage;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './JobTrackerNavigation.css';

const JobTrackerNavigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="job-tracker-nav">
      <div className="nav-brand">
        <Link to="/dashboard">Job Tracker</Link>
      </div>
      <ul className="nav-menu">
        <li className="nav-item">
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/jobs" 
            className={`nav-link ${isActive('/jobs') ? 'active' : ''}`}
          >
            Jobs
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/analyze" 
            className={`nav-link ${isActive('/analyze') ? 'active' : ''}`}
          >
            Analyze JD
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/resume" 
            className={`nav-link ${isActive('/resume') ? 'active' : ''}`}
          >
            Resume
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/applications" 
            className={`nav-link ${isActive('/applications') ? 'active' : ''}`}
          >
            Applications
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/settings" 
            className={`nav-link ${isActive('/settings') ? 'active' : ''}`}
          >
            Settings
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/proof" 
            className={`nav-link ${isActive('/proof') ? 'active' : ''}`}
          >
            Proof
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default JobTrackerNavigation;
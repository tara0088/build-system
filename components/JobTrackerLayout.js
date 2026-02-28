import React from 'react';
import JobTrackerNavigation from './JobTrackerNavigation';
import { Outlet } from 'react-router-dom';
import './JobTrackerLayout.css';

const JobTrackerLayout = () => {
  return (
    <div className="job-tracker-layout">
      <JobTrackerNavigation />
      <main className="job-tracker-main">
        <div className="job-tracker-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default JobTrackerLayout;
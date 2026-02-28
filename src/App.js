import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PremiumLayout from '../components/PremiumLayout';
import JobTrackerLayout from '../components/JobTrackerLayout';
import ProblemPage from '../routes/rb/01-problem';
import MarketPage from '../routes/rb/02-market';
import ArchitecturePage from '../routes/rb/03-architecture';
import HLDPage from '../routes/rb/04-hld';
import LLDPage from '../routes/rb/05-lld';
import BuildPage from '../routes/rb/06-build';
import TestPage from '../routes/rb/07-test';
import ShipPage from '../routes/rb/08-ship';
import RBProofPage from '../routes/rb/proof';
import HomePage from '../routes/resume/HomePage';
import BuilderPage from '../routes/resume/BuilderPage';
import PreviewPage from '../routes/resume/PreviewPage';
import ResumeProofPage from '../routes/resume/ProofPage';
import DashboardPage from '../routes/dashboard/DashboardPage';
import JobsPage from '../routes/jobs/JobsPage';
import AnalyzePage from '../routes/analyze/AnalyzePage';
import ResumeManagerPage from '../routes/resume/ResumePage';
import ApplicationsPage from '../routes/applications/ApplicationsPage';
import SettingsPage from '../routes/settings/SettingsPage';
import ProofPage from '../routes/proof/ProofPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* AI Resume Builder Routes (Build Track) */}
        <Route path="/rb/01-problem" element={
          <PremiumLayout currentPage={1}>
            <ProblemPage />
          </PremiumLayout>
        } />
        <Route path="/rb/02-market" element={
          <PremiumLayout currentPage={2}>
            <MarketPage />
          </PremiumLayout>
        } />
        <Route path="/rb/03-architecture" element={
          <PremiumLayout currentPage={3}>
            <ArchitecturePage />
          </PremiumLayout>
        } />
        <Route path="/rb/04-hld" element={
          <PremiumLayout currentPage={4}>
            <HLDPage />
          </PremiumLayout>
        } />
        <Route path="/rb/05-lld" element={
          <PremiumLayout currentPage={5}>
            <LLDPage />
          </PremiumLayout>
        } />
        <Route path="/rb/06-build" element={
          <PremiumLayout currentPage={6}>
            <BuildPage />
          </PremiumLayout>
        } />
        <Route path="/rb/07-test" element={
          <PremiumLayout currentPage={7}>
            <TestPage />
          </PremiumLayout>
        } />
        <Route path="/rb/08-ship" element={
          <PremiumLayout currentPage={8}>
            <ShipPage />
          </PremiumLayout>
        } />
        <Route path="/rb/proof" element={
          <PremiumLayout currentPage={9} isProofPage={true}>
            <RBProofPage />
          </PremiumLayout>
        } />
        {/* AI Resume Builder Main App Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/proof-resume" element={<ResumeProofPage />} />
        {/* Job Application Tracker Routes */}
        <Route path="/dashboard" element={<JobTrackerLayout />}><Route path="" element={<DashboardPage />} /></Route>
        <Route path="/jobs" element={<JobTrackerLayout />}><Route path="" element={<JobsPage />} /></Route>
        <Route path="/analyze" element={<JobTrackerLayout />}><Route path="" element={<AnalyzePage />} /></Route>
        <Route path="/resume" element={<JobTrackerLayout />}><Route path="" element={<ResumeManagerPage />} /></Route>
        <Route path="/applications" element={<JobTrackerLayout />}><Route path="" element={<ApplicationsPage />} /></Route>
        <Route path="/settings" element={<JobTrackerLayout />}><Route path="" element={<SettingsPage />} /></Route>
        <Route path="/proof" element={<JobTrackerLayout />}><Route path="" element={<ProofPage />} /></Route>
      </Routes>
    </Router>
  );
};

export default App;
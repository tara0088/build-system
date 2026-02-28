import React, { useState, useEffect } from 'react';
import './SettingsPage.css';

const SettingsPage = () => {
  const [preferences, setPreferences] = useState({
    jobPreferences: {
      location: '',
      remoteOnly: false,
      salaryMin: '',
      jobTypes: [],
      industries: []
    },
    notificationSettings: {
      emailNotifications: true,
      pushNotifications: false,
      dailyDigest: true,
      weeklyReport: true
    },
    privacySettings: {
      profileVisibility: 'public',
      dataSharing: false,
      marketingEmails: true
    },
    accountInfo: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      timezone: 'UTC'
    }
  });

  useEffect(() => {
    // Load preferences from localStorage
    const storedPrefs = localStorage.getItem('userPreferences');
    if (storedPrefs) {
      setPreferences(JSON.parse(storedPrefs));
    }
  }, []);

  const handlePreferenceChange = (section, field, value) => {
    setPreferences(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayPreferenceChange = (section, field, value) => {
    const values = value.split(',').map(item => item.trim()).filter(item => item);
    setPreferences(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: values
      }
    }));
  };

  const toggleJobType = (type) => {
    setPreferences(prev => {
      const currentTypes = prev.jobPreferences.jobTypes || [];
      if (currentTypes.includes(type)) {
        return {
          ...prev,
          jobPreferences: {
            ...prev.jobPreferences,
            jobTypes: currentTypes.filter(t => t !== type)
          }
        };
      } else {
        return {
          ...prev,
          jobPreferences: {
            ...prev.jobPreferences,
            jobTypes: [...currentTypes, type]
          }
        };
      }
    });
  };

  const saveSettings = () => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    alert('Settings saved successfully!');
  };

  const exportData = () => {
    const dataStr = JSON.stringify(preferences, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'job_tracker_data.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          setPreferences(importedData);
          localStorage.setItem('userPreferences', JSON.stringify(importedData));
          alert('Data imported successfully!');
        } catch (error) {
          alert('Error importing data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const resetData = () => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      localStorage.removeItem('userPreferences');
      localStorage.removeItem('jobTrackerData');
      localStorage.removeItem('resumeData');
      localStorage.removeItem('applications');
      localStorage.removeItem('jobList');
      window.location.reload();
    }
  };

  return (
    <div className="settings-page">
      <header className="settings-header">
        <h1>Settings</h1>
        <p>Manage your preferences and account settings</p>
      </header>

      <div className="settings-tabs">
        <div className="tab-buttons">
          <button className="tab-btn active">Job Preferences</button>
          <button className="tab-btn">Notification Settings</button>
          <button className="tab-btn">Privacy Settings</button>
          <button className="tab-btn">Account Information</button>
          <button className="tab-btn">Data Management</button>
        </div>

        <div className="tab-content">
          {/* Job Preferences Tab */}
          <div className="tab-panel">
            <h2>Job Preferences</h2>
            
            <div className="form-section">
              <div className="form-group">
                <label>Preferred Location</label>
                <input
                  type="text"
                  value={preferences.jobPreferences.location}
                  onChange={(e) => handlePreferenceChange('jobPreferences', 'location', e.target.value)}
                  placeholder="Enter your preferred location"
                />
              </div>
              
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="remoteOnly"
                  checked={preferences.jobPreferences.remoteOnly}
                  onChange={(e) => handlePreferenceChange('jobPreferences', 'remoteOnly', e.target.checked)}
                />
                <label htmlFor="remoteOnly">Remote work only</label>
              </div>
              
              <div className="form-group">
                <label>Minimum Salary ($)</label>
                <input
                  type="number"
                  value={preferences.jobPreferences.salaryMin}
                  onChange={(e) => handlePreferenceChange('jobPreferences', 'salaryMin', e.target.value)}
                  placeholder="Enter minimum salary"
                />
              </div>
              
              <div className="form-group">
                <label>Job Types (comma separated)</label>
                <input
                  type="text"
                  value={(preferences.jobPreferences.jobTypes || []).join(', ')}
                  onChange={(e) => handleArrayPreferenceChange('jobPreferences', 'jobTypes', e.target.value)}
                  placeholder="e.g., Full-time, Part-time, Contract"
                />
              </div>
              
              <div className="form-group">
                <label>Industries (comma separated)</label>
                <input
                  type="text"
                  value={(preferences.jobPreferences.industries || []).join(', ')}
                  onChange={(e) => handleArrayPreferenceChange('jobPreferences', 'industries', e.target.value)}
                  placeholder="e.g., Tech, Finance, Healthcare"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings Tab */}
          <div className="tab-panel hidden">
            <h2>Notification Settings</h2>
            
            <div className="form-section">
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  checked={preferences.notificationSettings.emailNotifications}
                  onChange={(e) => handlePreferenceChange('notificationSettings', 'emailNotifications', e.target.checked)}
                />
                <label htmlFor="emailNotifications">Email notifications</label>
              </div>
              
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="pushNotifications"
                  checked={preferences.notificationSettings.pushNotifications}
                  onChange={(e) => handlePreferenceChange('notificationSettings', 'pushNotifications', e.target.checked)}
                />
                <label htmlFor="pushNotifications">Push notifications</label>
              </div>
              
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="dailyDigest"
                  checked={preferences.notificationSettings.dailyDigest}
                  onChange={(e) => handlePreferenceChange('notificationSettings', 'dailyDigest', e.target.checked)}
                />
                <label htmlFor="dailyDigest">Daily digest emails</label>
              </div>
              
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="weeklyReport"
                  checked={preferences.notificationSettings.weeklyReport}
                  onChange={(e) => handlePreferenceChange('notificationSettings', 'weeklyReport', e.target.checked)}
                />
                <label htmlFor="weeklyReport">Weekly progress report</label>
              </div>
            </div>
          </div>

          {/* Privacy Settings Tab */}
          <div className="tab-panel hidden">
            <h2>Privacy Settings</h2>
            
            <div className="form-section">
              <div className="form-group">
                <label>Profile Visibility</label>
                <select
                  value={preferences.privacySettings.profileVisibility}
                  onChange={(e) => handlePreferenceChange('privacySettings', 'profileVisibility', e.target.value)}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="connections">Connections only</option>
                </select>
              </div>
              
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="dataSharing"
                  checked={preferences.privacySettings.dataSharing}
                  onChange={(e) => handlePreferenceChange('privacySettings', 'dataSharing', e.target.checked)}
                />
                <label htmlFor="dataSharing">Allow data sharing with partners</label>
              </div>
              
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="marketingEmails"
                  checked={preferences.privacySettings.marketingEmails}
                  onChange={(e) => handlePreferenceChange('privacySettings', 'marketingEmails', e.target.checked)}
                />
                <label htmlFor="marketingEmails">Receive marketing emails</label>
              </div>
            </div>
          </div>

          {/* Account Information Tab */}
          <div className="tab-panel hidden">
            <h2>Account Information</h2>
            
            <div className="form-section">
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={preferences.accountInfo.firstName}
                    onChange={(e) => handlePreferenceChange('accountInfo', 'firstName', e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={preferences.accountInfo.lastName}
                    onChange={(e) => handlePreferenceChange('accountInfo', 'lastName', e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={preferences.accountInfo.email}
                  onChange={(e) => handlePreferenceChange('accountInfo', 'email', e.target.value)}
                  placeholder="Enter your email address"
                />
              </div>
              
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={preferences.accountInfo.phone}
                  onChange={(e) => handlePreferenceChange('accountInfo', 'phone', e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div className="form-group">
                <label>Timezone</label>
                <select
                  value={preferences.accountInfo.timezone}
                  onChange={(e) => handlePreferenceChange('accountInfo', 'timezone', e.target.value)}
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">EST</option>
                  <option value="PST">PST</option>
                  <option value="CST">CST</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Management Tab */}
          <div className="tab-panel hidden">
            <h2>Data Management</h2>
            
            <div className="form-section">
              <div className="data-actions">
                <button onClick={exportData} className="action-btn export-btn">Export Data</button>
                <input 
                  type="file" 
                  id="import-file" 
                  accept=".json" 
                  onChange={importData} 
                  style={{display: 'none'}} 
                />
                <label htmlFor="import-file" className="action-btn import-btn">Import Data</label>
                <button onClick={resetData} className="action-btn reset-btn">Reset All Data</button>
              </div>
              
              <div className="data-info">
                <h3>Storage Information</h3>
                <p>Your data is stored locally in your browser and is not shared with any third parties.</p>
                <p>Total stored data: ~2.5 MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button onClick={saveSettings} className="save-btn">Save Settings</button>
        <button className="cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default SettingsPage;
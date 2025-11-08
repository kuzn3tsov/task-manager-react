import React, { useState, useEffect } from 'react';

function ReminderSettings({ list, onSaveReminders, t, lang }) {
  const [settings, setSettings] = useState({
    emailEnabled: false,
    smsEnabled: false,
    email: '',
    phone: '',
    reminderType: 'daily',
    reminderTime: '09:00'
  });

  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    if (list?.reminders) {
      setSettings(list.reminders);
    }
  }, [list]);

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSaveReminders(list.id, settings);
  };

  const handleTest = async (type) => {
    setIsTesting(type);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    alert(t('testSent'));
    setIsTesting(false);
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone) => {
    return /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\s/g, ''));
  };

  return (
    <div className="reminder-settings">
      <h3>{t('reminderSettings')}</h3>
      <p className="reminder-desc">{t('reminderDesc')}</p>

      {/* Email Reminders */}
      <div className="reminder-section">
        <div className="reminder-header">
          <h4>{t('emailReminders')}</h4>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.emailEnabled}
              onChange={(e) => handleChange('emailEnabled', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        {settings.emailEnabled && (
          <div className="reminder-content">
            <div className="form-group">
              <label>{t('emailAddress')}</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="your@email.com"
                className={settings.email && !isValidEmail(settings.email) ? 'error' : ''}
              />
              {settings.email && !isValidEmail(settings.email) && (
                <small className="error-text">{t('enterValidEmail')}</small>
              )}
            </div>
            <button
              className="test-btn"
              onClick={() => handleTest('email')}
              disabled={!isValidEmail(settings.email) || isTesting === 'email'}
            >
              {isTesting === 'email' ? 'Sending...' : t('testEmail')}
            </button>
          </div>
        )}
      </div>

      {/* SMS Reminders */}
      <div className="reminder-section">
        <div className="reminder-header">
          <h4>{t('smsReminders')}</h4>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.smsEnabled}
              onChange={(e) => handleChange('smsEnabled', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        {settings.smsEnabled && (
          <div className="reminder-content">
            <div className="form-group">
              <label>{t('phoneNumber')}</label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1234567890"
                className={settings.phone && !isValidPhone(settings.phone) ? 'error' : ''}
              />
              {settings.phone && !isValidPhone(settings.phone) && (
                <small className="error-text">{t('enterValidPhone')}</small>
              )}
            </div>
            <button
              className="test-btn"
              onClick={() => handleTest('sms')}
              disabled={!isValidPhone(settings.phone) || isTesting === 'sms'}
            >
              {isTesting === 'sms' ? 'Sending...' : t('testSMS')}
            </button>
          </div>
        )}
      </div>

      {/* Reminder Preferences */}
      <div className="reminder-preferences">
        <h4>{t('reminderTime')}</h4>
        <div className="preference-grid">
          <div className="form-group">
            <label>{t('reminderType')}</label>
            <select
              value={settings.reminderType}
              onChange={(e) => handleChange('reminderType', e.target.value)}
            >
              <option value="daily">{t('dailyDigest')}</option>
              <option value="due">{t('taskDue')}</option>
            </select>
          </div>
          <div className="form-group">
            <label>{t('reminderTime')}</label>
            <select
              value={settings.reminderTime}
              onChange={(e) => handleChange('reminderTime', e.target.value)}
            >
              <option value="09:00">9:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="18:00">6:00 PM</option>
            </select>
          </div>
        </div>
      </div>

      <button
        className="save-reminders-btn primary"
        onClick={handleSave}
        disabled={
          (settings.emailEnabled && !isValidEmail(settings.email)) ||
          (settings.smsEnabled && !isValidPhone(settings.phone))
        }
      >
        <i className="fa-solid fa-bell"></i>
        {t('saveReminders')}
      </button>
    </div>
  );
}

export default ReminderSettings;
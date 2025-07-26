"use client";

import { useState } from 'react';
import { 
  Settings, 
  Save, 
  Database, 
  Mail, 
  Shield, 
  Globe, 
  Bell,
  Key,
  Server,
  AlertCircle,
  CheckCircle,
  Edit,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SystemSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  // Mock settings data
  const [settings, setSettings] = useState({
    general: {
      siteName: 'ScholarsRus',
      siteDescription: 'AI-Powered Scholarship Discovery Platform',
      adminEmail: 'admin@scholarsrus.com',
      supportEmail: 'support@scholarsrus.com',
      timezone: 'America/Los_Angeles',
      maintenanceMode: false,
      registrationEnabled: true,
      emailVerificationRequired: true
    },
    database: {
      connectionString: 'postgresql://user:***@db.scholarsrus.com:5432/production',
      maxConnections: 100,
      connectionTimeout: 30,
      queryTimeout: 60,
      backupInterval: 24,
      backupRetention: 30
    },
    email: {
      provider: 'SendGrid',
      apiKey: 'SG.***********************************',
      fromEmail: 'noreply@scholarsrus.com',
      fromName: 'ScholarsRus',
      dailyLimit: 10000,
      templatesEnabled: true
    },
    security: {
      sessionTimeout: 60,
      maxLoginAttempts: 5,
      passwordMinLength: 8,
      requireTwoFactor: false,
      ipWhitelistEnabled: false,
      auditLoggingEnabled: true,
      encryptionEnabled: true
    },
    ai: {
      openaiApiKey: 'sk-***********************************',
      model: 'gpt-4',
      maxTokens: 4000,
      temperature: 0.7,
      rateLimitPerUser: 50,
      moderationEnabled: true
    },
    notifications: {
      systemAlerts: true,
      userNotifications: true,
      emailNotifications: true,
      smsNotifications: false,
      slackWebhook: '',
      discordWebhook: ''
    }
  });

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'ai', label: 'AI Settings', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 2000);
  };

  const handleSettingChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const testConnection = (type) => {
    alert(`Testing ${type} connection... This would perform a real connection test.`);
  };

  const resetToDefaults = (category) => {
    if (window.confirm(`Are you sure you want to reset ${category} settings to defaults?`)) {
      alert(`${category} settings reset to defaults!`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-700 mt-2">Configure platform-wide settings and preferences</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-lg font-semibold text-green-800">System Online</p>
                <p className="text-sm text-green-600">All services operational</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">99.9%</p>
              <p className="text-sm text-gray-600">Uptime</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">3,450</p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">125ms</p>
              <p className="text-sm text-gray-600">Response Time</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'general' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">General Settings</CardTitle>
            <CardDescription className="text-gray-600">Basic platform configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                <input
                  type="text"
                  value={settings.general.siteName}
                  onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                <input
                  type="email"
                  value={settings.general.adminEmail}
                  onChange={(e) => handleSettingChange('general', 'adminEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                <textarea
                  value={settings.general.siteDescription}
                  onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                <select
                  value={settings.general.timezone}
                  onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.general.maintenanceMode}
                    onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Maintenance Mode</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.general.registrationEnabled}
                    onChange={(e) => handleSettingChange('general', 'registrationEnabled', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Allow New Registrations</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.general.emailVerificationRequired}
                    onChange={(e) => handleSettingChange('general', 'emailVerificationRequired', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Require Email Verification</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'database' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Database Configuration</CardTitle>
            <CardDescription className="text-gray-600">Database connection and performance settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Connection String</label>
                <div className="flex">
                  <input
                    type="password"
                    value={settings.database.connectionString}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    readOnly
                  />
                  <button
                    onClick={() => testConnection('Database')}
                    className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors"
                  >
                    Test Connection
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Connections</label>
                  <input
                    type="number"
                    value={settings.database.maxConnections}
                    onChange={(e) => handleSettingChange('database', 'maxConnections', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Connection Timeout (s)</label>
                  <input
                    type="number"
                    value={settings.database.connectionTimeout}
                    onChange={(e) => handleSettingChange('database', 'connectionTimeout', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Query Timeout (s)</label>
                  <input
                    type="number"
                    value={settings.database.queryTimeout}
                    onChange={(e) => handleSettingChange('database', 'queryTimeout', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Backup Interval (hours)</label>
                  <input
                    type="number"
                    value={settings.database.backupInterval}
                    onChange={(e) => handleSettingChange('database', 'backupInterval', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Backup Retention (days)</label>
                  <input
                    type="number"
                    value={settings.database.backupRetention}
                    onChange={(e) => handleSettingChange('database', 'backupRetention', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'security' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Security Settings</CardTitle>
            <CardDescription className="text-gray-600">Authentication and security configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                <input
                  type="number"
                  value={settings.security.maxLoginAttempts}
                  onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password Min Length</label>
                <input
                  type="number"
                  value={settings.security.passwordMinLength}
                  onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.security.requireTwoFactor}
                    onChange={(e) => handleSettingChange('security', 'requireTwoFactor', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Require Two-Factor Authentication</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.security.ipWhitelistEnabled}
                    onChange={(e) => handleSettingChange('security', 'ipWhitelistEnabled', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable IP Whitelist</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.security.auditLoggingEnabled}
                    onChange={(e) => handleSettingChange('security', 'auditLoggingEnabled', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable Audit Logging</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.security.encryptionEnabled}
                    onChange={(e) => handleSettingChange('security', 'encryptionEnabled', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable Data Encryption</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'ai' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">AI Configuration</CardTitle>
            <CardDescription className="text-gray-600">OpenAI and AI service settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">OpenAI API Key</label>
                <div className="flex">
                  <input
                    type={showApiKeys ? 'text' : 'password'}
                    value={settings.ai.openaiApiKey}
                    onChange={(e) => handleSettingChange('ai', 'openaiApiKey', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                  <button
                    onClick={() => setShowApiKeys(!showApiKeys)}
                    className="px-4 py-2 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-50 transition-colors"
                  >
                    {showApiKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                  <select
                    value={settings.ai.model}
                    onChange={(e) => handleSettingChange('ai', 'model', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  >
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Tokens</label>
                  <input
                    type="number"
                    value={settings.ai.maxTokens}
                    onChange={(e) => handleSettingChange('ai', 'maxTokens', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Temperature</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="2"
                    value={settings.ai.temperature}
                    onChange={(e) => handleSettingChange('ai', 'temperature', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rate Limit Per User (per day)</label>
                  <input
                    type="number"
                    value={settings.ai.rateLimitPerUser}
                    onChange={(e) => handleSettingChange('ai', 'rateLimitPerUser', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div className="pt-8">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.ai.moderationEnabled}
                      onChange={(e) => handleSettingChange('ai', 'moderationEnabled', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable Content Moderation</span>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {(activeTab === 'email' || activeTab === 'notifications') && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900">
                {activeTab === 'email' ? 'Email Configuration' : 'Notification Settings'}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {activeTab === 'email' ? 'Email service provider settings' : 'System and user notification preferences'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeTab === 'email' ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Provider</label>
                      <select
                        value={settings.email.provider}
                        onChange={(e) => handleSettingChange('email', 'provider', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      >
                        <option value="SendGrid">SendGrid</option>
                        <option value="AWS SES">AWS SES</option>
                        <option value="Mailgun">Mailgun</option>
                        <option value="SMTP">Custom SMTP</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Daily Limit</label>
                      <input
                        type="number"
                        value={settings.email.dailyLimit}
                        onChange={(e) => handleSettingChange('email', 'dailyLimit', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                    <input
                      type="password"
                      value={settings.email.apiKey}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      readOnly
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(settings.notifications).map(([key, value]) => (
                      <label key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 
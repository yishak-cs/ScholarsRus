"use client";

import { useState } from 'react';
import { 
  Activity, 
  Search, 
  Filter, 
  Clock, 
  User, 
  Shield, 
  Database, 
  AlertTriangle,
  CheckCircle,
  Info,
  Download,
  RefreshCw,
  Eye,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SystemActivity() {
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock activity data
  const [activities, setActivities] = useState([
    {
      id: 1,
      timestamp: '2024-01-20T14:30:25Z',
      type: 'authentication',
      severity: 'info',
      user: 'alex.johnson@email.com',
      action: 'User login successful',
      details: 'Login from IP 192.168.1.100, Chrome browser',
      metadata: { ip: '192.168.1.100', browser: 'Chrome', location: 'California, US' }
    },
    {
      id: 2,
      timestamp: '2024-01-20T14:28:15Z',
      type: 'scholarship',
      severity: 'info',
      user: 'manager@techfound.org',
      action: 'Scholarship published',
      details: 'Tech Innovators Scholarship 2024 published with $25,000 award',
      metadata: { scholarshipId: 'TECH-2024-001', amount: 25000 }
    },
    {
      id: 3,
      timestamp: '2024-01-20T14:25:40Z',
      type: 'system',
      severity: 'warning',
      user: 'System',
      action: 'Database connection timeout',
      details: 'Connection to primary database timed out, switched to backup',
      metadata: { database: 'primary', timeout: '30s', action: 'failover' }
    },
    {
      id: 4,
      timestamp: '2024-01-20T14:20:10Z',
      type: 'security',
      severity: 'critical',
      user: 'unknown@malicious.com',
      action: 'Failed login attempt',
      details: 'Multiple failed login attempts detected from suspicious IP',
      metadata: { ip: '198.51.100.42', attempts: 5, blocked: true }
    },
    {
      id: 5,
      timestamp: '2024-01-20T14:15:30Z',
      type: 'ai',
      severity: 'info',
      user: 'sarah.chen@stanford.edu',
      action: 'AI document generated',
      details: 'Essay generated for Tech Innovators Scholarship application',
      metadata: { documentType: 'essay', wordCount: 485, processingTime: '2.3s' }
    },
    {
      id: 6,
      timestamp: '2024-01-20T14:10:20Z',
      type: 'admin',
      severity: 'info',
      user: 'admin@scholarsrus.com',
      action: 'User status updated',
      details: 'Changed user john.smith@email.com status to suspended',
      metadata: { targetUser: 'john.smith@email.com', oldStatus: 'active', newStatus: 'suspended' }
    },
    {
      id: 7,
      timestamp: '2024-01-20T14:05:45Z',
      type: 'system',
      severity: 'info',
      user: 'System',
      action: 'Backup completed',
      details: 'Daily system backup completed successfully',
      metadata: { backupSize: '2.4GB', duration: '15min', location: 'AWS S3' }
    },
    {
      id: 8,
      timestamp: '2024-01-20T14:00:12Z',
      type: 'application',
      severity: 'info',
      user: 'emily.davis@email.com',
      action: 'Application submitted',
      details: 'Scholarship application submitted for Women in STEM Excellence Award',
      metadata: { scholarshipId: 'STEM-2024-015', applicationId: 'APP-2024-001234' }
    }
  ]);

  const activityTypes = [
    { value: 'all', label: 'All Types', icon: Activity },
    { value: 'authentication', label: 'Authentication', icon: User },
    { value: 'scholarship', label: 'Scholarship', icon: FileText },
    { value: 'system', label: 'System', icon: Database },
    { value: 'security', label: 'Security', icon: Shield },
    { value: 'ai', label: 'AI Operations', icon: Activity },
    { value: 'admin', label: 'Admin Actions', icon: Shield },
    { value: 'application', label: 'Applications', icon: FileText }
  ];

  const severityConfig = {
    info: { label: 'Info', color: 'bg-blue-100 text-blue-800', icon: Info },
    warning: { label: 'Warning', color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle },
    critical: { label: 'Critical', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
    success: { label: 'Success', color: 'bg-green-100 text-green-800', icon: CheckCircle }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      alert('Activity feed refreshed!');
    }, 2000);
  };

  const exportLogs = () => {
    alert('Exporting activity logs... This would download a CSV file.');
  };

  const filteredActivities = activities.filter(activity => {
    const matchesType = filterType === 'all' || activity.type === filterType;
    const matchesSeverity = filterSeverity === 'all' || activity.severity === filterSeverity;
    const matchesSearch = activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesSeverity && matchesSearch;
  });

  const stats = [
    { label: 'Total Events', value: activities.length, color: 'text-blue-600' },
    { label: 'Critical Issues', value: activities.filter(a => a.severity === 'critical').length, color: 'text-red-600' },
    { label: 'Warnings', value: activities.filter(a => a.severity === 'warning').length, color: 'text-yellow-600' },
    { label: 'System Events', value: activities.filter(a => a.type === 'system').length, color: 'text-green-600' }
  ];

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Activity</h1>
          <p className="text-gray-700 mt-2">Monitor real-time platform events and system logs</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={exportLogs}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <Activity className="w-5 h-5 mr-2" />
            Activity Monitor
          </CardTitle>
          <CardDescription className="text-gray-600">
            Filter and search through system activities and events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Activities</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search actions, users, details..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                {activityTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Severity Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="all">All Severities</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
                <option value="success">Success</option>
              </select>
            </div>

            {/* Time Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900">
                <option value="last_hour">Last Hour</option>
                <option value="last_24h">Last 24 Hours</option>
                <option value="last_week">Last Week</option>
                <option value="last_month">Last Month</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredActivities.length} of {activities.length} activities
          </div>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card>
        <CardContent className="p-0">
          <div className="space-y-0">
            {filteredActivities.map((activity) => {
              const severityInfo = severityConfig[activity.severity];
              const SeverityIcon = severityInfo.icon;
              const typeInfo = activityTypes.find(t => t.value === activity.type);
              const TypeIcon = typeInfo?.icon || Activity;
              
              return (
                <div key={activity.id} className="border-b border-gray-100 p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex items-center space-x-2">
                        <TypeIcon className="w-5 h-5 text-gray-500" />
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${severityInfo.color}`}>
                          <SeverityIcon className="w-3 h-3 mr-1" />
                          {severityInfo.label}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-lg font-semibold text-gray-900">{activity.action}</h4>
                          <span className="text-sm text-gray-500">by {activity.user}</span>
                        </div>
                        <p className="text-gray-700 mb-2">{activity.details}</p>
                        
                        {/* Metadata */}
                        {activity.metadata && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-2">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                              {Object.entries(activity.metadata).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                  <span className="text-gray-900 font-medium">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatTimestamp(activity.timestamp)}
                        </div>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredActivities.length === 0 && (
              <div className="text-center py-12">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
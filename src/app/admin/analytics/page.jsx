"use client";

import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Award, 
  DollarSign, 
  FileText,
  Brain,
  Clock,
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Analytics() {
  const [dateRange, setDateRange] = useState('last_30_days');
  const [metricType, setMetricType] = useState('overview');

  // Mock analytics data
  const overviewMetrics = [
    { name: 'Total Users', value: '12,847', change: '+8.2%', trend: 'up', icon: Users },
    { name: 'Total Applications', value: '45,678', change: '+12.5%', trend: 'up', icon: FileText },
    { name: 'Scholarships Posted', value: '3,521', change: '+15.7%', trend: 'up', icon: Award },
    { name: 'Total Awards', value: '$125.3M', change: '+22.1%', trend: 'up', icon: DollarSign },
    { name: 'AI Documents Generated', value: '12,534', change: '+18.9%', trend: 'up', icon: Brain },
    { name: 'Success Rate', value: '78.5%', change: '+2.3%', trend: 'up', icon: TrendingUp }
  ];

  const userGrowthData = [
    { month: 'Jan', users: 8500, applications: 3200, scholarships: 280 },
    { month: 'Feb', users: 9200, applications: 3800, scholarships: 320 },
    { month: 'Mar', users: 10100, applications: 4500, scholarships: 380 },
    { month: 'Apr', users: 11200, applications: 5200, scholarships: 420 },
    { month: 'May', users: 12100, applications: 5800, scholarships: 450 },
    { month: 'Jun', users: 12847, applications: 6100, scholarships: 485 }
  ];

  const topUniversities = [
    { name: 'UC Berkeley', students: 1250, applications: 4500, successRate: 82 },
    { name: 'Stanford University', students: 980, applications: 3800, successRate: 85 },
    { name: 'MIT', students: 890, applications: 3200, successRate: 78 },
    { name: 'Harvard University', students: 750, applications: 2900, successRate: 80 },
    { name: 'UCLA', students: 920, applications: 3100, successRate: 76 }
  ];

  const scholarshipCategories = [
    { category: 'STEM', count: 1250, funding: 45000000, color: 'bg-blue-500' },
    { category: 'Merit-Based', count: 980, funding: 35000000, color: 'bg-green-500' },
    { category: 'Need-Based', count: 750, funding: 25000000, color: 'bg-purple-500' },
    { category: 'Research', count: 540, funding: 20000000, color: 'bg-orange-500' }
  ];

  const recentActivity = [
    { time: '10 min ago', event: 'Bulk scholarship import completed', type: 'system', count: '150 scholarships' },
    { time: '25 min ago', event: 'New user registration spike', type: 'user', count: '+45 users' },
    { time: '1 hour ago', event: 'AI document generation peak', type: 'ai', count: '320 documents' },
    { time: '2 hours ago', event: 'Manager approval processed', type: 'manager', count: '3 new managers' },
    { time: '3 hours ago', event: 'System backup completed', type: 'system', count: '100% success' }
  ];

  const platformHealth = {
    uptime: 99.9,
    responseTime: 120,
    errorRate: 0.1,
    activeUsers: 3450,
    storageUsed: 85
  };

  return (
    <div className="space-y-8">
      {/* Header with Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
          <p className="text-gray-700 mt-2">Comprehensive platform analytics and performance metrics</p>
        </div>
        <div className="flex gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            <option value="last_7_days">Last 7 Days</option>
            <option value="last_30_days">Last 30 Days</option>
            <option value="last_90_days">Last 90 Days</option>
            <option value="last_year">Last Year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {overviewMetrics.map((metric) => {
          const IconComponent = metric.icon;
          return (
            <Card key={metric.name} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-sm text-gray-600">{metric.name}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Growth Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Platform Growth Trends
            </CardTitle>
            <CardDescription>Monthly growth across key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-6 gap-4">
                {userGrowthData.map((data, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-4 flex flex-col items-center space-y-2">
                      {/* Users Bar */}
                      <div 
                        className="w-6 bg-blue-500 rounded-t"
                        style={{ height: `${(data.users / 13000) * 80}px` }}
                        title={`${data.users.toLocaleString()} users`}
                      ></div>
                      {/* Applications Bar */}
                      <div 
                        className="w-6 bg-green-500 rounded-t"
                        style={{ height: `${(data.applications / 6500) * 60}px` }}
                        title={`${data.applications.toLocaleString()} applications`}
                      ></div>
                      {/* Scholarships Bar */}
                      <div 
                        className="w-6 bg-purple-500 rounded-t"
                        style={{ height: `${(data.scholarships / 500) * 40}px` }}
                        title={`${data.scholarships} scholarships`}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 font-medium">{data.month}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center space-x-6 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  <span>Users</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span>Applications</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                  <span>Scholarships</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Universities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Top Universities
            </CardTitle>
            <CardDescription>Universities with highest user engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topUniversities.map((university, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{university.name}</p>
                      <p className="text-sm text-gray-600">{university.students} students</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{university.applications}</p>
                    <p className="text-xs text-green-600">{university.successRate}% success</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scholarship Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Scholarship Categories
            </CardTitle>
            <CardDescription>Distribution by category and funding</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scholarshipCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">{category.category}</span>
                    <span className="text-sm text-gray-600">{category.count} scholarships</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className={`h-2 rounded-full ${category.color}`}
                        style={{ width: `${(category.count / 1250) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-green-600 font-medium">
                      ${(category.funding / 1000000).toFixed(1)}M
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Platform Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Platform Health
            </CardTitle>
            <CardDescription>Real-time system performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{platformHealth.uptime}%</p>
                  <p className="text-sm text-gray-600">Uptime</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{platformHealth.responseTime}ms</p>
                  <p className="text-sm text-gray-600">Response Time</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{platformHealth.errorRate}%</p>
                  <p className="text-sm text-gray-600">Error Rate</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{platformHealth.activeUsers.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Active Users</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Storage Usage</span>
                  <span className="text-sm text-gray-600">{platformHealth.storageUsed}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      platformHealth.storageUsed > 90 ? 'bg-red-500' :
                      platformHealth.storageUsed > 75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${platformHealth.storageUsed}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Recent System Activity
            </CardTitle>
            <CardDescription>Latest events and system updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'user' ? 'bg-blue-500' :
                    activity.type === 'system' ? 'bg-green-500' :
                    activity.type === 'ai' ? 'bg-purple-500' :
                    activity.type === 'manager' ? 'bg-orange-500' :
                    'bg-gray-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.event}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">{activity.time}</p>
                      <p className="text-xs text-blue-600 font-medium">{activity.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>User Demographics</CardTitle>
            <CardDescription>Breakdown by academic level and field</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { level: 'Undergraduate', count: 8450, percentage: 65.8 },
                { level: 'Graduate', count: 3200, percentage: 24.9 },
                { level: 'PhD', count: 980, percentage: 7.6 },
                { level: 'High School', count: 217, percentage: 1.7 }
              ].map((demo, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{demo.level}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{demo.count.toLocaleString()}</span>
                    <span className="text-xs text-gray-500">({demo.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Users by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { region: 'United States', count: 9200, percentage: 71.6 },
                { region: 'Canada', count: 1850, percentage: 14.4 },
                { region: 'International', count: 1350, percentage: 10.5 },
                { region: 'Other', count: 447, percentage: 3.5 }
              ].map((geo, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{geo.region}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{geo.count.toLocaleString()}</span>
                    <span className="text-xs text-gray-500">({geo.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
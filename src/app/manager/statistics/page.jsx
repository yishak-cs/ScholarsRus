"use client";

import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  FileText, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  DollarSign,
  Globe,
  GraduationCap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Statistics() {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock data - in real app, this would come from your analytics API
  const overviewStats = [
    { 
      name: 'Total Scholarships', 
      value: '248', 
      change: '+12%', 
      changeType: 'increase',
      icon: FileText,
      description: 'Total scholarships in database'
    },
    { 
      name: 'Published', 
      value: '186', 
      change: '+8%', 
      changeType: 'increase',
      icon: CheckCircle,
      description: 'Currently active scholarships'
    },
    { 
      name: 'Drafts', 
      value: '62', 
      change: '+4%', 
      changeType: 'increase',
      icon: Clock,
      description: 'Unpublished scholarships'
    },
    { 
      name: 'Total Applications', 
      value: '12,485', 
      change: '+23%', 
      changeType: 'increase',
      icon: Users,
      description: 'Applications received'
    },
  ];

  const studyLevelStats = [
    { level: "Bachelor's Degree", count: 98, percentage: 39.5, color: 'bg-blue-500' },
    { level: "Master's Degree", count: 76, percentage: 30.6, color: 'bg-green-500' },
    { level: "PhD/Doctorate", count: 45, percentage: 18.1, color: 'bg-purple-500' },
    { level: "Professional Degree", count: 18, percentage: 7.3, color: 'bg-orange-500' },
    { level: "Certificate Program", count: 11, percentage: 4.4, color: 'bg-pink-500' }
  ];

  const recentActivity = [
    { action: 'New scholarship published', item: 'Tech Innovation Grant 2024', time: '2 hours ago', type: 'published' },
    { action: 'Scholarship updated', item: 'Women in STEM Award', time: '4 hours ago', type: 'updated' },
    { action: 'New applications received', item: '45 new applications', time: '6 hours ago', type: 'applications' },
    { action: 'Scholarship expired', item: 'Graduate Research Fund', time: '1 day ago', type: 'expired' },
    { action: 'Bulk import completed', item: '12 scholarships imported', time: '2 days ago', type: 'import' }
  ];

  const topPerformingScholarships = [
    { name: 'International Student Excellence Award', applications: 456, provider: 'Global Education Fund' },
    { name: 'STEM Innovation Scholarship', applications: 392, provider: 'Tech Foundation' },
    { name: 'First Generation College Grant', applications: 278, provider: 'Education Access' },
    { name: 'Women in Leadership Award', applications: 201, provider: 'Leadership Institute' },
    { name: 'Graduate Research Fellowship', applications: 156, provider: 'Research Foundation' }
  ];

  const monthlyData = [
    { month: 'Jan', scholarships: 45, applications: 1200 },
    { month: 'Feb', scholarships: 52, applications: 1450 },
    { month: 'Mar', scholarships: 38, applications: 1100 },
    { month: 'Apr', scholarships: 61, applications: 1650 },
    { month: 'May', scholarships: 48, applications: 1380 },
    { month: 'Jun', scholarships: 55, applications: 1520 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Statistics & Analytics</h1>
          <p className="text-gray-600">Track performance and insights across your scholarship programs</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.name} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Study Level Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Scholarships by Study Level
            </CardTitle>
            <CardDescription>Distribution of scholarships across different academic levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studyLevelStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                    <span className="text-sm font-medium text-gray-700">{stat.level}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${stat.color}`}
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{stat.count}</span>
                    <span className="text-xs text-gray-500 w-12">{stat.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest actions and updates in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'published' ? 'bg-green-500' :
                    activity.type === 'updated' ? 'bg-blue-500' :
                    activity.type === 'applications' ? 'bg-purple-500' :
                    activity.type === 'expired' ? 'bg-red-500' :
                    'bg-orange-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-sm text-blue-600 font-medium">{activity.item}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Scholarships */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Top Performing Scholarships
          </CardTitle>
          <CardDescription>Scholarships with the most applications this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Scholarship</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Provider</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Applications</th>
                </tr>
              </thead>
              <tbody>
                {topPerformingScholarships.map((scholarship, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-yellow-100 text-yellow-800' :
                          index === 1 ? 'bg-gray-100 text-gray-800' :
                          index === 2 ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{scholarship.name}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{scholarship.provider}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end">
                        <Users className="w-4 h-4 mr-1 text-gray-400" />
                        <span className="font-semibold text-gray-900">{scholarship.applications}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Monthly Trends
          </CardTitle>
          <CardDescription>Scholarship postings and application trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="text-center">
                <div className="mb-2">
                  <div className="flex flex-col items-center space-y-2">
                    <div 
                      className="w-8 bg-blue-500 rounded-t"
                      style={{ height: `${(data.scholarships / 61) * 60}px` }}
                    ></div>
                    <div 
                      className="w-8 bg-green-500 rounded-t"
                      style={{ height: `${(data.applications / 1650) * 40}px` }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs text-gray-600">{data.month}</div>
                <div className="text-xs text-blue-600 font-medium">{data.scholarships}</div>
                <div className="text-xs text-green-600 font-medium">{data.applications}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
              <span>Scholarships Posted</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
              <span>Applications (÷100)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
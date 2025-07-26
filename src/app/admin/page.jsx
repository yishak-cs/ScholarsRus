"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  UserCheck, 
  BarChart3, 
  Activity, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Database,
  Server,
  Globe,
  Award,
  FileText,
  Brain
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
  // Mock data - in real app, this would come from your analytics API
  const systemStats = [
    { 
      name: 'Total Users', 
      value: '12,847', 
      change: '+8.2%', 
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-600',
      description: 'Registered students'
    },
    { 
      name: 'Active Managers', 
      value: '45', 
      change: '+12%', 
      changeType: 'increase',
      icon: UserCheck,
      color: 'text-green-600',
      description: 'Scholarship managers'
    },
    { 
      name: 'Total Scholarships', 
      value: '3,521', 
      change: '+15.7%', 
      changeType: 'increase',
      icon: Award,
      color: 'text-purple-600',
      description: 'Available opportunities'
    },
    { 
      name: 'System Health', 
      value: '99.9%', 
      change: '+0.1%', 
      changeType: 'increase',
      icon: Server,
      color: 'text-emerald-600',
      description: 'Uptime this month'
    },
  ];

  const quickActions = [
    {
      name: 'Manage Users',
      description: 'View and manage user accounts',
      href: '/admin/users',
      icon: Users,
      color: 'bg-blue-600 hover:bg-blue-700',
      count: '12.8K users'
    },
    {
      name: 'Manage Managers',
      description: 'Oversee manager accounts and permissions',
      href: '/admin/managers',
      icon: UserCheck,
      color: 'bg-green-600 hover:bg-green-700',
      count: '45 managers'
    },
    {
      name: 'View Analytics',
      description: 'Detailed system analytics and reports',
      href: '/admin/analytics',
      icon: BarChart3,
      color: 'bg-purple-600 hover:bg-purple-700',
      count: 'Live data'
    },
    {
      name: 'System Activity',
      description: 'Monitor system activity and logs',
      href: '/admin/activity',
      icon: Activity,
      color: 'bg-orange-600 hover:bg-orange-700',
      count: 'Real-time'
    }
  ];

  const recentActivity = [
    { action: "New user registration", user: "sarah.chen@email.com", time: "2 minutes ago", type: "user" },
    { action: "Scholarship published", user: "manager@techfound.org", time: "15 minutes ago", type: "scholarship" },
    { action: "Manager account created", user: "alex.wilson@stemfund.org", time: "1 hour ago", type: "manager" },
    { action: "System backup completed", user: "System", time: "2 hours ago", type: "system" },
    { action: "Bulk scholarship import", user: "admin@scholarsrus.com", time: "4 hours ago", type: "data" }
  ];

  const systemAlerts = [
    { id: 1, level: 'warning', message: 'Database storage at 85% capacity', time: '1 hour ago' },
    { id: 2, level: 'info', message: 'Scheduled maintenance tonight at 2 AM EST', time: '3 hours ago' },
    { id: 3, level: 'success', message: 'Security patch installed successfully', time: '1 day ago' }
  ];

  const platformMetrics = {
    totalApplications: 45678,
    totalAwardAmount: 125000000,
    successRate: 78.5,
    aiGenerations: 12534,
    activeScholarships: 2847
  };

  const userGrowth = [
    { month: 'Jan', users: 8500, managers: 32 },
    { month: 'Feb', users: 9200, managers: 35 },
    { month: 'Mar', users: 10100, managers: 38 },
    { month: 'Apr', users: 11200, managers: 41 },
    { month: 'May', users: 12100, managers: 44 },
    { month: 'Jun', users: 12847, managers: 45 }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">System Administration Dashboard</h1>
        <p className="text-lg opacity-90">
          Monitor and manage the ScholarsRus platform with comprehensive admin tools.
        </p>
      </div>

      {/* System Status Alerts */}
      {systemAlerts.length > 0 && (
        <div className="space-y-3">
          {systemAlerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
              alert.level === 'warning' ? 'bg-yellow-50 border-yellow-400' :
              alert.level === 'info' ? 'bg-blue-50 border-blue-400' :
              'bg-green-50 border-green-400'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {alert.level === 'warning' ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
                  ) : alert.level === 'info' ? (
                    <Clock className="w-5 h-5 text-blue-600 mr-3" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  )}
                  <span className={`font-medium ${
                    alert.level === 'warning' ? 'text-yellow-800' :
                    alert.level === 'info' ? 'text-blue-800' :
                    'text-green-800'
                  }`}>
                    {alert.message}
                  </span>
                </div>
                <span className="text-sm text-gray-600">{alert.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.name} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
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

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Link
                  key={action.name}
                  href={action.href}
                  className={`${action.color} text-white p-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg`}
                >
                  <div className="flex flex-col items-center text-center">
                    <IconComponent className="w-8 h-8 mb-3" />
                    <h3 className="font-semibold mb-1">{action.name}</h3>
                    <p className="text-sm opacity-90 mb-2">{action.description}</p>
                    <span className="text-xs opacity-75">{action.count}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Platform Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Platform Metrics
            </CardTitle>
            <CardDescription>Key performance indicators across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Applications</span>
                <span className="font-semibold text-gray-900">{platformMetrics.totalApplications.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Award Amount</span>
                <span className="font-semibold text-green-600">
                  ${(platformMetrics.totalAwardAmount / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-semibold text-blue-600">{platformMetrics.successRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">AI Documents Generated</span>
                <span className="font-semibold text-purple-600">{platformMetrics.aiGenerations.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Scholarships</span>
                <span className="font-semibold text-orange-600">{platformMetrics.activeScholarships.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent System Activity
            </CardTitle>
            <CardDescription>Latest actions and events across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'user' ? 'bg-blue-500' :
                    activity.type === 'scholarship' ? 'bg-green-500' :
                    activity.type === 'manager' ? 'bg-purple-500' :
                    activity.type === 'system' ? 'bg-orange-500' :
                    'bg-gray-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-sm text-blue-600 font-medium">{activity.user}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            User Growth Trends
          </CardTitle>
          <CardDescription>Monthly growth of users and managers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {userGrowth.map((data, index) => (
              <div key={index} className="text-center">
                <div className="mb-2">
                  <div className="flex flex-col items-center space-y-2">
                    <div 
                      className="w-8 bg-blue-500 rounded-t"
                      style={{ height: `${(data.users / 13000) * 60}px` }}
                    ></div>
                    <div 
                      className="w-8 bg-green-500 rounded-t"
                      style={{ height: `${(data.managers / 50) * 40}px` }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs text-gray-600">{data.month}</div>
                <div className="text-xs text-blue-600 font-medium">{(data.users / 1000).toFixed(1)}K</div>
                <div className="text-xs text-green-600 font-medium">{data.managers}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
              <span>Users (K)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
              <span>Managers</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
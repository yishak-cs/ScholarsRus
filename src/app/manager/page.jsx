"use client";

import Link from 'next/link';
import { 
  Plus, 
  Edit, 
  BarChart3, 
  Upload, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ManagerDashboard() {
  // Mock data - in real app, this would come from your API
  const stats = [
    { 
      name: 'Total Scholarships', 
      value: '248', 
      change: '+12%', 
      changeType: 'increase',
      icon: FileText,
      color: 'text-blue-600'
    },
    { 
      name: 'Published', 
      value: '186', 
      change: '+8%', 
      changeType: 'increase',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    { 
      name: 'Drafts', 
      value: '62', 
      change: '+4%', 
      changeType: 'increase',
      icon: Clock,
      color: 'text-yellow-600'
    },
    { 
      name: 'Expiring Soon', 
      value: '14', 
      change: '-2%', 
      changeType: 'decrease',
      icon: AlertCircle,
      color: 'text-red-600'
    },
  ];

  const recentScholarships = [
    {
      id: 1,
      name: "Tech Innovation Scholarship 2024",
      provider: "Tech Foundation",
      deadline: "2024-03-15",
      status: "Published",
      applicants: 125
    },
    {
      id: 2,
      name: "Graduate Research Grant",
      provider: "Research Institute",
      deadline: "2024-04-01",
      status: "Draft",
      applicants: 0
    },
    {
      id: 3,
      name: "Women in STEM Award",
      provider: "STEM Foundation",
      deadline: "2024-02-28",
      status: "Published",
      applicants: 89
    },
    {
      id: 4,
      name: "International Student Fund",
      provider: "Global Education",
      deadline: "2024-05-15",
      status: "Published",
      applicants: 203
    }
  ];

  const quickActions = [
    {
      name: 'Post New Scholarship',
      description: 'Create a new scholarship listing',
      href: '/manager/post',
      icon: Plus,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Manage Scholarships',
      description: 'Edit and manage existing scholarships',
      href: '/manager/manage',
      icon: Edit,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      name: 'View Statistics',
      description: 'View detailed analytics and reports',
      href: '/manager/statistics',
      icon: BarChart3,
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      name: 'Bulk Import',
      description: 'Import multiple scholarships via Excel',
      href: '/manager/import',
      icon: Upload,
      color: 'bg-orange-600 hover:bg-orange-700'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Manager!</h1>
        <p className="text-lg opacity-90">
          Manage scholarships and help students achieve their educational goals.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.name} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
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
          <CardDescription>Common tasks and shortcuts</CardDescription>
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
                    <p className="text-sm opacity-90">{action.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Scholarships */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Scholarships</CardTitle>
            <CardDescription>Recently created and modified scholarships</CardDescription>
          </div>
          <Link 
            href="/manager/manage"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            View All
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Scholarship</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Provider</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Deadline</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Applicants</th>
                </tr>
              </thead>
              <tbody>
                {recentScholarships.map((scholarship) => (
                  <tr key={scholarship.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{scholarship.name}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{scholarship.provider}</td>
                    <td className="py-3 px-4 text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {scholarship.deadline}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        scholarship.status === 'Published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {scholarship.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-1" />
                        {scholarship.applicants}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
"use client";

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Calendar, 
  DollarSign, 
  FileText, 
  Brain, 
  User, 
  Bell, 
  Settings, 
  Award,
  TrendingUp,
  Clock,
  BookOpen,
  Zap,
  Target,
  ChevronRight,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - In real app, this would come from your backend/API
  const scholarships = [
    {
      id: 1,
      title: "Tech Innovators Scholarship",
      organization: "Future Tech Foundation",
      amount: 25000,
      deadline: "2024-03-15",
      matchScore: 98,
      category: "Technology",
      description: "Supporting the next generation of tech innovators and entrepreneurs...",
      requirements: ["3.5+ GPA", "Computer Science Major", "Leadership Experience"],
      applied: false
    },
    {
      id: 2,
      title: "Future Leaders Grant",
      organization: "Leadership Institute",
      amount: 15000,
      deadline: "2024-04-01",
      matchScore: 87,
      category: "Leadership",
      description: "Empowering future leaders who will make a positive impact...",
      requirements: ["Community Service", "Leadership Role", "Essay Required"],
      applied: true
    },
    {
      id: 3,
      title: "Green Energy Research Fund",
      organization: "Environmental Science Association",
      amount: 30000,
      deadline: "2024-02-28",
      matchScore: 93,
      category: "Environmental",
      description: "Supporting research in renewable energy and sustainability...",
      requirements: ["Environmental Science Major", "Research Experience", "3.7+ GPA"],
      applied: false
    }
  ];

  const stats = [
    { label: "Scholarships Found", value: "1,247", icon: Search, color: "text-blue-600" },
    { label: "Applications Sent", value: "23", icon: FileText, color: "text-green-600" },
    { label: "Success Rate", value: "78%", icon: TrendingUp, color: "text-purple-600" },
    { label: "Total Applied", value: "$125K", icon: DollarSign, color: "text-orange-600" }
  ];

  const recentActivities = [
    { action: "New scholarship match", item: "STEM Excellence Award", time: "2 hours ago", type: "match" },
    { action: "Application submitted", item: "Future Leaders Grant", time: "1 day ago", type: "application" },
    { action: "Document generated", item: "Personal Statement", time: "2 days ago", type: "document" },
    { action: "Profile updated", item: "Academic achievements", time: "3 days ago", type: "profile" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ScholarsRus
              </span>
            </div>

            {/* Navigation Items */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setActiveTab('discover')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'discover' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Discover
              </button>
              <button 
                onClick={() => setActiveTab('applications')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'applications' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Applications
              </button>
              <button 
                onClick={() => setActiveTab('documents')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'documents' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                AI Documents
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'profile' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Profile
              </button>
            </div>

            {/* Right side items */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Alex! 👋
          </h1>
          <p className="text-gray-600">
            You have 5 new scholarship matches and 3 upcoming deadlines.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'discover' && (
              <div className="space-y-6">
                {/* Search and Filters */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Search className="w-5 h-5 mr-2" />
                      Discover Scholarships
                    </CardTitle>
                    <CardDescription>
                      Find scholarships that match your profile and interests
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 mb-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Search scholarships..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Scholarship Results */}
                <div className="space-y-4">
                  {scholarships.map((scholarship) => (
                    <Card key={scholarship.id} className="hover:shadow-lg transition-shadow duration-200">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h3 className="text-xl font-semibold text-gray-900">{scholarship.title}</h3>
                              <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                                scholarship.matchScore > 95 ? 'bg-green-100 text-green-800' :
                                scholarship.matchScore > 85 ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {scholarship.matchScore}% Match
                              </span>
                            </div>
                            <p className="text-gray-600 mb-2">{scholarship.organization}</p>
                            <p className="text-gray-700 mb-4">{scholarship.description}</p>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-2xl font-bold text-green-600 mb-1">
                              {formatCurrency(scholarship.amount)}
                            </div>
                            <div className="text-sm text-gray-600 flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(scholarship.deadline)}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {scholarship.requirements.map((req, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                              {req}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                            {scholarship.category}
                          </span>
                          <div className="flex gap-2">
                            {scholarship.applied ? (
                              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                                Applied ✓
                              </span>
                            ) : (
                              <>
                                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                                  Save
                                </button>
                                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center">
                                  <Brain className="w-4 h-4 mr-2" />
                                  Generate Application
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="w-5 h-5 mr-2" />
                      AI Document Generator
                    </CardTitle>
                    <CardDescription>
                      Generate personalized essays, resumes, and cover letters using AI
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { type: "Essay", icon: FileText, description: "Generate compelling scholarship essays" },
                        { type: "Resume", icon: User, description: "Create ATS-optimized resumes" },
                        { type: "Cover Letter", icon: BookOpen, description: "Write personalized cover letters" },
                        { type: "Personal Statement", icon: Star, description: "Craft your unique story" }
                      ].map((doc, index) => {
                        const IconComponent = doc.icon;
                        return (
                          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-6 text-center">
                              <IconComponent className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                              <h3 className="font-semibold text-gray-900 mb-2">{doc.type}</h3>
                              <p className="text-sm text-gray-600 mb-4">{doc.description}</p>
                              <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center">
                                <Plus className="w-4 h-4 mr-2" />
                                Generate
                              </button>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center">
                  <Brain className="w-4 h-4 mr-2" />
                  Generate Essay
                </button>
                <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Search className="w-4 h-4 mr-2" />
                  Find More Scholarships
                </button>
                <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <User className="w-4 h-4 mr-2" />
                  Update Profile
                </button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'match' ? 'bg-blue-500' :
                        activity.type === 'application' ? 'bg-green-500' :
                        activity.type === 'document' ? 'bg-purple-500' :
                        'bg-gray-500'
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

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Green Energy Fund</p>
                      <p className="text-xs text-red-600">Due in 5 days</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Tech Innovators</p>
                      <p className="text-xs text-yellow-600">Due in 15 days</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 
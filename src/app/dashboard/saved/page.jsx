"use client";

import { useState } from 'react';
import { 
  Bookmark, 
  Search, 
  Calendar, 
  DollarSign, 
  MapPin,
  GraduationCap,
  Brain,
  Filter,
  Heart,
  Star,
  Trash2,
  ExternalLink,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function SavedScholarships() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  // Mock saved scholarships data
  const [savedScholarships, setSavedScholarships] = useState([
    {
      id: 1,
      title: "Tech Innovators Scholarship 2024",
      organization: "Future Tech Foundation",
      amount: 25000,
      deadline: "2024-03-15",
      category: "Technology",
      location: "United States",
      studyLevel: "Bachelor's, Master's",
      description: "Supporting the next generation of tech innovators and entrepreneurs who will shape the future of digital transformation.",
      requirements: ["3.5+ GPA", "Computer Science Major", "Leadership Experience", "Portfolio Required"],
      savedDate: "2024-01-10",
      priority: "high",
      notes: "Perfect match for my CS background. Deadline is coming up soon!",
      applied: false,
      matchScore: 98
    },
    {
      id: 2,
      title: "Green Energy Research Fund",
      organization: "Environmental Science Association",
      amount: 30000,
      deadline: "2024-02-28",
      category: "Environmental",
      location: "North America",
      studyLevel: "Master's, PhD",
      description: "Supporting cutting-edge research in renewable energy and sustainability solutions for a greener future.",
      requirements: ["Environmental Science Major", "Research Experience", "3.7+ GPA", "Research Proposal"],
      savedDate: "2024-01-08",
      priority: "high",
      notes: "High amount and aligns with my research interests.",
      applied: false,
      matchScore: 93
    },
    {
      id: 3,
      title: "Women in STEM Excellence Award",
      organization: "STEM Foundation",
      amount: 15000,
      deadline: "2024-04-01",
      category: "STEM",
      location: "Global",
      studyLevel: "Bachelor's",
      description: "Empowering women to pursue careers in Science, Technology, Engineering, and Mathematics fields.",
      requirements: ["Female", "STEM Major", "Community Service", "Essay Required"],
      savedDate: "2024-01-05",
      priority: "medium",
      notes: "Good opportunity, longer deadline gives me time to prepare.",
      applied: true,
      matchScore: 87
    },
    {
      id: 4,
      title: "International Leadership Excellence",
      organization: "Global Leaders Institute",
      amount: 40000,
      deadline: "2024-06-30",
      category: "Leadership",
      location: "Global",
      studyLevel: "Master's",
      description: "Developing future global leaders who will drive positive change in their communities and beyond.",
      requirements: ["Leadership Experience", "International Exposure", "3.5+ GPA", "Language Skills"],
      savedDate: "2024-01-03",
      priority: "medium",
      notes: "Highest amount but very competitive. Need to work on leadership portfolio.",
      applied: false,
      matchScore: 91
    },
    {
      id: 5,
      title: "Community Impact Scholarship",
      organization: "Local Community Foundation",
      amount: 8000,
      deadline: "2024-05-15",
      category: "Community Service",
      location: "California",
      studyLevel: "Bachelor's",
      description: "Recognizing students who have made significant contributions to their local communities.",
      requirements: ["Community Service", "Local Residency", "2.5+ GPA", "Service Portfolio"],
      savedDate: "2024-01-01",
      priority: "low",
      notes: "Smaller amount but easier requirements. Good backup option.",
      applied: false,
      matchScore: 76
    }
  ]);

  const categories = ['all', 'Technology', 'STEM', 'Environmental', 'Leadership', 'Community Service'];
  const priorities = ['all', 'high', 'medium', 'low'];

  const priorityConfig = {
    high: { color: 'text-red-600', bg: 'bg-red-100', label: 'High Priority' },
    medium: { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Medium Priority' },
    low: { color: 'text-green-600', bg: 'bg-green-100', label: 'Low Priority' }
  };

  const removeScholarship = (id) => {
    setSavedScholarships(prev => prev.filter(scholarship => scholarship.id !== id));
  };

  const updatePriority = (id, newPriority) => {
    setSavedScholarships(prev => 
      prev.map(scholarship => 
        scholarship.id === id ? { ...scholarship, priority: newPriority } : scholarship
      )
    );
  };

  const filteredScholarships = savedScholarships.filter(scholarship => {
    const matchesSearch = scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scholarship.organization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || scholarship.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || scholarship.priority === filterPriority;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const stats = {
    total: savedScholarships.length,
    highPriority: savedScholarships.filter(s => s.priority === 'high').length,
    applied: savedScholarships.filter(s => s.applied).length,
    totalValue: savedScholarships.reduce((sum, s) => sum + s.amount, 0)
  };

  const upcomingDeadlines = savedScholarships
    .filter(s => !s.applied)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Saved Scholarships</h1>
        <p className="text-gray-700 mt-2">Manage your bookmarked scholarship opportunities</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Bookmark className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600">Total Saved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.highPriority}</p>
            <p className="text-sm text-gray-600">High Priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Heart className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.applied}</p>
            <p className="text-sm text-gray-600">Applied</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalValue)}</p>
            <p className="text-sm text-gray-600">Total Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Deadlines Alert */}
      {upcomingDeadlines.length > 0 && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800">
              <Clock className="w-5 h-5 mr-2" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcomingDeadlines.map(scholarship => (
                <div key={scholarship.id} className="flex justify-between items-center">
                  <span className="text-yellow-800 font-medium">{scholarship.title}</span>
                  <span className="text-yellow-700 text-sm">{formatDate(scholarship.deadline)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <Search className="w-5 h-5 mr-2" />
            Search & Filter
          </CardTitle>
          <CardDescription className="text-gray-600">
            Find specific scholarships in your saved list
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search saved scholarships..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>
                    {priority === 'all' ? 'All Priorities' : `${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredScholarships.length} of {savedScholarships.length} saved scholarships
          </div>
        </CardContent>
      </Card>

      {/* Saved Scholarships List */}
      <div className="space-y-4">
        {filteredScholarships.map((scholarship) => {
          const priorityInfo = priorityConfig[scholarship.priority];
          
          return (
            <Card key={scholarship.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{scholarship.title}</h3>
                      <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${priorityInfo.bg} ${priorityInfo.color}`}>
                        {priorityInfo.label}
                      </span>
                      {scholarship.applied && (
                        <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Applied ✓
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 font-medium mb-2">{scholarship.organization}</p>
                    <p className="text-gray-600 mb-4">{scholarship.description}</p>
                    
                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{scholarship.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        <span className="text-sm">{scholarship.studyLevel}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">Due: {formatDate(scholarship.deadline)}</span>
                      </div>
                    </div>

                    {/* Notes */}
                    {scholarship.notes && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800 italic">
                          <strong>Notes:</strong> {scholarship.notes}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right ml-6">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {formatCurrency(scholarship.amount)}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">Award Amount</div>
                    <div className="text-sm text-gray-600">
                      Saved: {formatDate(scholarship.savedDate)}
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {scholarship.requirements.map((req, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                      {scholarship.category}
                    </span>
                    <select
                      value={scholarship.priority}
                      onChange={(e) => updatePriority(scholarship.id, e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded text-xs text-gray-700"
                    >
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center text-sm">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                    {!scholarship.applied && (
                      <button className="px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center text-sm">
                        <Brain className="w-4 h-4 mr-1" />
                        Generate Application
                      </button>
                    )}
                    <button
                      onClick={() => removeScholarship(scholarship.id)}
                      className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center text-sm"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredScholarships.length === 0 && (
          <div className="text-center py-12">
            <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {savedScholarships.length === 0 ? 'No saved scholarships yet' : 'No scholarships match your filters'}
            </h3>
            <p className="text-gray-600">
              {savedScholarships.length === 0 
                ? 'Start exploring scholarships and save the ones that interest you!'
                : 'Try adjusting your search criteria or filters.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 
"use client";

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Calendar, 
  DollarSign, 
  Brain, 
  MapPin,
  GraduationCap,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function DiscoverScholarships() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterAmount, setFilterAmount] = useState('all');
  const [savedScholarships, setSavedScholarships] = useState(new Set());

  // Mock scholarship data
  const scholarships = [
    {
      id: 1,
      title: "Tech Innovators Scholarship 2024",
      organization: "Future Tech Foundation",
      amount: 25000,
      deadline: "2024-03-15",
      matchScore: 98,
      category: "Technology",
      location: "United States",
      studyLevel: "Bachelor's, Master's",
      description: "Supporting the next generation of tech innovators and entrepreneurs who will shape the future of digital transformation.",
      requirements: ["3.5+ GPA", "Computer Science Major", "Leadership Experience", "Portfolio Required"],
      applied: false
    },
    {
      id: 2,
      title: "Women in STEM Excellence Award",
      organization: "STEM Foundation",
      amount: 15000,
      deadline: "2024-04-01",
      matchScore: 87,
      category: "STEM",
      location: "Global",
      studyLevel: "Bachelor's",
      description: "Empowering women to pursue careers in Science, Technology, Engineering, and Mathematics fields.",
      requirements: ["Female", "STEM Major", "Community Service", "Essay Required"],
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
      location: "North America",
      studyLevel: "Master's, PhD",
      description: "Supporting cutting-edge research in renewable energy and sustainability solutions for a greener future.",
      requirements: ["Environmental Science Major", "Research Experience", "3.7+ GPA", "Research Proposal"],
      applied: false
    },
    {
      id: 4,
      title: "First Generation College Success Grant",
      organization: "Education Access Foundation",
      amount: 12000,
      deadline: "2024-05-15",
      matchScore: 85,
      category: "Education",
      location: "United States",
      studyLevel: "Bachelor's",
      description: "Supporting first-generation college students in achieving their educational dreams and breaking barriers.",
      requirements: ["First Generation", "Financial Need", "3.0+ GPA", "Community Involvement"],
      applied: false
    },
    {
      id: 5,
      title: "International Leadership Excellence",
      organization: "Global Leaders Institute",
      amount: 40000,
      deadline: "2024-06-30",
      matchScore: 91,
      category: "Leadership",
      location: "Global",
      studyLevel: "Master's",
      description: "Developing future global leaders who will drive positive change in their communities and beyond.",
      requirements: ["Leadership Experience", "International Exposure", "3.5+ GPA", "Language Skills"],
      applied: false
    }
  ];

  const categories = ['all', 'Technology', 'STEM', 'Environmental', 'Education', 'Leadership'];
  const amounts = ['all', '10000', '20000', '30000'];

  const toggleSaveScholarship = (id) => {
    setSavedScholarships(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scholarship.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || scholarship.category === filterCategory;
    
    const matchesAmount = filterAmount === 'all' || scholarship.amount >= parseInt(filterAmount);
    
    return matchesSearch && matchesCategory && matchesAmount;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Discover Scholarships</h1>
        <p className="text-gray-700 mt-2">Find scholarships that match your profile and academic goals</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <Search className="w-5 h-5 mr-2" />
            Search & Filter Scholarships
          </CardTitle>
          <CardDescription className="text-gray-600">
            Use filters to find the most relevant opportunities for you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Keywords</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search scholarships..."
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

            {/* Amount Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Amount</label>
              <select
                value={filterAmount}
                onChange={(e) => setFilterAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="all">Any Amount</option>
                <option value="10000">$10,000+</option>
                <option value="20000">$20,000+</option>
                <option value="30000">$30,000+</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredScholarships.length} of {scholarships.length} scholarships
          </div>
        </CardContent>
      </Card>

      {/* Scholarship Results */}
      <div className="space-y-4">
        {filteredScholarships.map((scholarship) => (
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
                  <p className="text-gray-700 font-medium mb-2">{scholarship.organization}</p>
                  <p className="text-gray-600 mb-4">{scholarship.description}</p>
                  
                  {/* Scholarship Details */}
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
                </div>
                
                <div className="text-right ml-6">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {formatCurrency(scholarship.amount)}
                  </div>
                  <div className="text-sm text-gray-600">Award Amount</div>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements:</h4>
                <div className="flex flex-wrap gap-2">
                  {scholarship.requirements.map((req, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
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
                      <button
                        onClick={() => toggleSaveScholarship(scholarship.id)}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                          savedScholarships.has(scholarship.id)
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {savedScholarships.has(scholarship.id) ? (
                          <>
                            <BookmarkCheck className="w-4 h-4 inline mr-1" />
                            Saved
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-4 h-4 inline mr-1" />
                            Save
                          </>
                        )}
                      </button>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center text-sm font-medium">
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

        {filteredScholarships.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No scholarships found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
} 
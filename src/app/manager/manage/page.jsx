"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Plus,
  Calendar,
  MapPin,
  GraduationCap,
  DollarSign,
  MoreVertical,
  ArrowUpDown
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ManageScholarships() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterStudyLevel, setFilterStudyLevel] = useState('all');
  const [sortBy, setSortBy] = useState('updated_date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Mock data - in real app, this would come from your API
  const [scholarships, setScholarships] = useState([
    {
      id: 1,
      name: "Tech Innovation Scholarship 2024",
      provider: "Tech Foundation",
      deadline: "2024-03-15",
      status: "Published",
      study_levels: ["Bachelor's Degree", "Master's Degree"],
      funding_amount: "$25,000",
      location: "United States",
      applicants: 125,
      updated_date: "2024-01-15",
      submitted_by: "John Manager"
    },
    {
      id: 2,
      name: "Graduate Research Grant",
      provider: "Research Institute",
      deadline: "2024-04-01",
      status: "Draft",
      study_levels: ["Master's Degree", "PhD/Doctorate"],
      funding_amount: "$15,000",
      location: "Canada",
      applicants: 0,
      updated_date: "2024-01-14",
      submitted_by: "Sarah Admin"
    },
    {
      id: 3,
      name: "Women in STEM Award",
      provider: "STEM Foundation",
      deadline: "2024-02-28",
      status: "Published",
      study_levels: ["Bachelor's Degree"],
      funding_amount: "$20,000",
      location: "Global",
      applicants: 89,
      updated_date: "2024-01-13",
      submitted_by: "John Manager"
    },
    {
      id: 4,
      name: "International Student Fund",
      provider: "Global Education",
      deadline: "2024-05-15",
      status: "Published",
      study_levels: ["Bachelor's Degree", "Master's Degree"],
      funding_amount: "Full Tuition",
      location: "United Kingdom",
      applicants: 203,
      updated_date: "2024-01-12",
      submitted_by: "Mike Coordinator"
    },
    {
      id: 5,
      name: "First Generation College Grant",
      provider: "Education Access Foundation",
      deadline: "2024-06-30",
      status: "Draft",
      study_levels: ["Bachelor's Degree"],
      funding_amount: "$12,000",
      location: "United States",
      applicants: 0,
      updated_date: "2024-01-11",
      submitted_by: "John Manager"
    }
  ]);

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      setScholarships(prev => prev.filter(s => s.id !== id));
      alert('Scholarship deleted successfully!');
    }
  };

  const handleStatusToggle = (id, currentStatus) => {
    const newStatus = currentStatus === 'Published' ? 'Draft' : 'Published';
    setScholarships(prev => 
      prev.map(s => 
        s.id === id ? { ...s, status: newStatus } : s
      )
    );
    alert(`Scholarship ${newStatus.toLowerCase()} successfully!`);
  };

  // Filter and search logic
  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || scholarship.status.toLowerCase() === filterStatus;
    
    const matchesStudyLevel = filterStudyLevel === 'all' || 
                             scholarship.study_levels.some(level => level.toLowerCase().includes(filterStudyLevel.toLowerCase()));
    
    return matchesSearch && matchesStatus && matchesStudyLevel;
  });

  // Sort logic
  const sortedScholarships = [...filteredScholarships].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'updated_date' || sortBy === 'deadline') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Scholarships</h1>
          <p className="text-gray-600">Edit, delete, and manage existing scholarships</p>
        </div>
        <Link
          href="/manager/post"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Scholarship
        </Link>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>Find and filter scholarships</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search scholarships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>

            {/* Study Level Filter */}
            <select
              value={filterStudyLevel}
              onChange={(e) => setFilterStudyLevel(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Study Levels</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD/Doctorate</option>
            </select>

            {/* Sort */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="updated_date-desc">Recently Updated</option>
              <option value="updated_date-asc">Oldest Updated</option>
              <option value="deadline-asc">Deadline (Earliest)</option>
              <option value="deadline-desc">Deadline (Latest)</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </select>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            Showing {sortedScholarships.length} of {scholarships.length} scholarships
          </div>
        </CardContent>
      </Card>

      {/* Scholarships Table */}
      <Card>
        <CardHeader>
          <CardTitle>Scholarship Listings</CardTitle>
          <CardDescription>Manage your scholarship database</CardDescription>
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
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Funding</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Applicants</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Updated</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedScholarships.map((scholarship) => (
                  <tr key={scholarship.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-semibold text-gray-900">{scholarship.name}</div>
                        <div className="text-sm text-gray-600 flex items-center mt-1">
                          <GraduationCap className="w-3 h-3 mr-1" />
                          {scholarship.study_levels.join(', ')}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {scholarship.location}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-900">{scholarship.provider}</div>
                      <div className="text-xs text-gray-500">by {scholarship.submitted_by}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-gray-700">
                        <Calendar className="w-4 h-4 mr-2" />
                        {scholarship.deadline}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleStatusToggle(scholarship.id, scholarship.status)}
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          scholarship.status === 'Published'
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        }`}
                      >
                        {scholarship.status}
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-gray-700">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {scholarship.funding_amount}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-700">{scholarship.applicants}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-700">{scholarship.updated_date}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                          title="Edit Scholarship"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(scholarship.id, scholarship.name)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete Scholarship"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {sortedScholarships.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No scholarships found matching your criteria.</p>
                <p className="text-sm">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
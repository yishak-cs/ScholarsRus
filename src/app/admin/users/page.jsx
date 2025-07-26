"use client";

import { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Ban, 
  CheckCircle,
  Mail,
  Calendar,
  GraduationCap,
  Award,
  MoreVertical,
  Eye,
  UserCheck
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [sortBy, setSortBy] = useState('created_date');

  // Mock user data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      role: 'student',
      status: 'active',
      createdDate: '2024-01-15',
      lastLogin: '2024-01-20',
      university: 'UC Berkeley',
      gpa: '3.85',
      applications: 5,
      scholarshipsWon: 2,
      totalAwarded: 35000
    },
    {
      id: 2,
      name: 'Sarah Chen',
      email: 'sarah.chen@stanford.edu',
      role: 'student',
      status: 'active',
      createdDate: '2024-01-10',
      lastLogin: '2024-01-19',
      university: 'Stanford University',
      gpa: '3.92',
      applications: 8,
      scholarshipsWon: 3,
      totalAwarded: 50000
    },
    {
      id: 3,
      name: 'Mike Rodriguez',
      email: 'mike.rodriguez@email.com',
      role: 'student',
      status: 'inactive',
      createdDate: '2023-12-20',
      lastLogin: '2023-12-25',
      university: 'MIT',
      gpa: '3.78',
      applications: 3,
      scholarshipsWon: 1,
      totalAwarded: 15000
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@manager.com',
      role: 'manager',
      status: 'active',
      createdDate: '2023-11-15',
      lastLogin: '2024-01-20',
      organization: 'Tech Foundation',
      scholarshipsManaged: 15,
      totalFunding: 750000
    },
    {
      id: 5,
      name: 'John Smith',
      email: 'john.smith@email.com',
      role: 'student',
      status: 'suspended',
      createdDate: '2024-01-05',
      lastLogin: '2024-01-18',
      university: 'Harvard University',
      gpa: '3.65',
      applications: 2,
      scholarshipsWon: 0,
      totalAwarded: 0
    }
  ]);

  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-800', icon: MoreVertical },
    suspended: { label: 'Suspended', color: 'bg-red-100 text-red-800', icon: Ban }
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    alert(`User status updated to ${newStatus}`);
  };

  const handleDeleteUser = (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      setUsers(prev => prev.filter(user => user.id !== userId));
      alert('User deleted successfully!');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const stats = [
    { label: 'Total Users', value: users.length, color: 'text-blue-600' },
    { label: 'Active Students', value: users.filter(u => u.role === 'student' && u.status === 'active').length, color: 'text-green-600' },
    { label: 'Active Managers', value: users.filter(u => u.role === 'manager' && u.status === 'active').length, color: 'text-purple-600' },
    { label: 'Suspended', value: users.filter(u => u.status === 'suspended').length, color: 'text-red-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-700 mt-2">Manage student and manager accounts across the platform</p>
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
            <Users className="w-5 h-5 mr-2" />
            User Database
          </CardTitle>
          <CardDescription className="text-gray-600">
            Search, filter, and manage user accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Users</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="manager">Managers</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">User</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Role</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Performance</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Last Login</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const statusInfo = statusConfig[user.status];
                  const StatusIcon = statusInfo.icon;
                  
                  return (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                            <span className="text-white font-medium">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-600 flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {user.email}
                            </div>
                            {user.university && (
                              <div className="text-sm text-gray-600 flex items-center">
                                <GraduationCap className="w-3 h-3 mr-1" />
                                {user.university}
                              </div>
                            )}
                            {user.organization && (
                              <div className="text-sm text-gray-600">
                                {user.organization}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'student' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {user.role === 'student' ? 'Student' : 'Manager'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="relative">
                          <select
                            value={user.status}
                            onChange={(e) => handleStatusChange(user.id, e.target.value)}
                            className={`text-xs font-medium rounded-full border-0 pr-8 ${statusInfo.color} focus:ring-2 focus:ring-blue-500`}
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="suspended">Suspended</option>
                          </select>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {user.role === 'student' ? (
                          <div className="text-sm">
                            <div className="text-gray-900">GPA: {user.gpa}</div>
                            <div className="text-gray-600">Apps: {user.applications}</div>
                            <div className="text-green-600">Won: {user.scholarshipsWon}</div>
                            {user.totalAwarded > 0 && (
                              <div className="text-green-600 font-medium">
                                ${user.totalAwarded.toLocaleString()}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-sm">
                            <div className="text-gray-900">Scholarships: {user.scholarshipsManaged}</div>
                            <div className="text-green-600 font-medium">
                              ${user.totalFunding?.toLocaleString()}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-600 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {user.lastLogin}
                        </div>
                        <div className="text-xs text-gray-500">
                          Joined: {user.createdDate}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user.id, user.name)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
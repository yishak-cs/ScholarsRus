"use client";

import { useState } from 'react';
import { 
  UserCheck, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Ban, 
  CheckCircle,
  Mail,
  Calendar,
  Building,
  Award,
  BarChart3,
  Eye,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ManagerManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddManager, setShowAddManager] = useState(false);

  // Mock manager data
  const [managers, setManagers] = useState([
    {
      id: 1,
      name: 'Emily Davis',
      email: 'emily.davis@techfound.org',
      organization: 'Tech Foundation',
      status: 'active',
      createdDate: '2023-11-15',
      lastLogin: '2024-01-20',
      scholarshipsManaged: 15,
      totalFunding: 750000,
      activeScholarships: 12,
      applications: 245,
      permissions: ['post', 'edit', 'delete', 'analytics']
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@stemfund.org',
      organization: 'STEM Foundation',
      status: 'active',
      createdDate: '2023-12-01',
      lastLogin: '2024-01-19',
      scholarshipsManaged: 8,
      totalFunding: 400000,
      activeScholarships: 6,
      applications: 156,
      permissions: ['post', 'edit', 'analytics']
    },
    {
      id: 3,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@education.org',
      organization: 'Education Access Foundation',
      status: 'inactive',
      createdDate: '2023-10-15',
      lastLogin: '2023-12-15',
      scholarshipsManaged: 5,
      totalFunding: 200000,
      activeScholarships: 2,
      applications: 89,
      permissions: ['post', 'edit']
    },
    {
      id: 4,
      name: 'David Rodriguez',
      email: 'david.rodriguez@global.org',
      organization: 'Global Leaders Institute',
      status: 'suspended',
      createdDate: '2023-09-20',
      lastLogin: '2024-01-10',
      scholarshipsManaged: 3,
      totalFunding: 150000,
      activeScholarships: 0,
      applications: 45,
      permissions: []
    }
  ]);

  const [newManager, setNewManager] = useState({
    name: '',
    email: '',
    organization: '',
    permissions: []
  });

  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-100 text-green-800' },
    inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-800' },
    suspended: { label: 'Suspended', color: 'bg-red-100 text-red-800' }
  };

  const permissionOptions = [
    { id: 'post', label: 'Post Scholarships' },
    { id: 'edit', label: 'Edit Scholarships' },
    { id: 'delete', label: 'Delete Scholarships' },
    { id: 'analytics', label: 'View Analytics' },
    { id: 'bulk_import', label: 'Bulk Import' }
  ];

  const handleStatusChange = (managerId, newStatus) => {
    setManagers(prev => 
      prev.map(manager => 
        manager.id === managerId ? { ...manager, status: newStatus } : manager
      )
    );
    alert(`Manager status updated to ${newStatus}`);
  };

  const handleDeleteManager = (managerId, managerName) => {
    if (window.confirm(`Are you sure you want to delete manager "${managerName}"? This action cannot be undone.`)) {
      setManagers(prev => prev.filter(manager => manager.id !== managerId));
      alert('Manager deleted successfully!');
    }
  };

  const handleAddManager = () => {
    if (newManager.name && newManager.email && newManager.organization) {
      const manager = {
        id: managers.length + 1,
        ...newManager,
        status: 'active',
        createdDate: new Date().toISOString().split('T')[0],
        lastLogin: null,
        scholarshipsManaged: 0,
        totalFunding: 0,
        activeScholarships: 0,
        applications: 0
      };
      setManagers(prev => [...prev, manager]);
      setNewManager({ name: '', email: '', organization: '', permissions: [] });
      setShowAddManager(false);
      alert('Manager added successfully!');
    }
  };

  const filteredManagers = managers.filter(manager => {
    const matchesSearch = manager.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         manager.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         manager.organization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || manager.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Managers', value: managers.length, color: 'text-blue-600' },
    { label: 'Active Managers', value: managers.filter(m => m.status === 'active').length, color: 'text-green-600' },
    { label: 'Total Scholarships', value: managers.reduce((sum, m) => sum + m.scholarshipsManaged, 0), color: 'text-purple-600' },
    { label: 'Total Funding', value: `$${(managers.reduce((sum, m) => sum + m.totalFunding, 0) / 1000000).toFixed(1)}M`, color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manager Management</h1>
          <p className="text-gray-700 mt-2">Oversee manager accounts and their scholarship activities</p>
        </div>
        <button
          onClick={() => setShowAddManager(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Manager
        </button>
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

      {/* Add Manager Modal */}
      {showAddManager && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-gray-900">Add New Manager</CardTitle>
            <CardDescription className="text-gray-600">Create a new manager account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Manager Name</label>
                <input
                  type="text"
                  value={newManager.name}
                  onChange={(e) => setNewManager(prev => ({...prev, name: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Enter manager name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={newManager.email}
                  onChange={(e) => setNewManager(prev => ({...prev, email: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Enter email address"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                <input
                  type="text"
                  value={newManager.organization}
                  onChange={(e) => setNewManager(prev => ({...prev, organization: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Enter organization name"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {permissionOptions.map(permission => (
                    <label key={permission.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newManager.permissions.includes(permission.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewManager(prev => ({
                              ...prev,
                              permissions: [...prev.permissions, permission.id]
                            }));
                          } else {
                            setNewManager(prev => ({
                              ...prev,
                              permissions: prev.permissions.filter(p => p !== permission.id)
                            }));
                          }
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{permission.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddManager}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Manager
              </button>
              <button
                onClick={() => setShowAddManager(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <UserCheck className="w-5 h-5 mr-2" />
            Manager Database
          </CardTitle>
          <CardDescription className="text-gray-600">
            Search and filter manager accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Managers</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or organization..."
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
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredManagers.length} of {managers.length} managers
          </div>
        </CardContent>
      </Card>

      {/* Managers Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Manager</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Organization</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Performance</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Permissions</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredManagers.map((manager) => {
                  const statusInfo = statusConfig[manager.status];
                  
                  return (
                    <tr key={manager.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-4">
                            <span className="text-white font-medium">
                              {manager.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{manager.name}</div>
                            <div className="text-sm text-gray-600 flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {manager.email}
                            </div>
                            <div className="text-xs text-gray-500">
                              Joined: {manager.createdDate}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center text-gray-900">
                          <Building className="w-4 h-4 mr-2" />
                          {manager.organization}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={manager.status}
                          onChange={(e) => handleStatusChange(manager.id, e.target.value)}
                          className={`text-xs font-medium rounded-full border-0 pr-8 ${statusInfo.color} focus:ring-2 focus:ring-blue-500`}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="suspended">Suspended</option>
                        </select>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Award className="w-3 h-3 mr-1 text-blue-600" />
                            <span className="text-gray-900">{manager.scholarshipsManaged} scholarships</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <BarChart3 className="w-3 h-3 mr-1 text-green-600" />
                            <span className="text-green-600">${manager.totalFunding.toLocaleString()}</span>
                          </div>
                          <div className="text-xs text-gray-600">
                            {manager.applications} applications received
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1">
                          {manager.permissions.map(permission => (
                            <span
                              key={permission}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {permissionOptions.find(p => p.id === permission)?.label.split(' ')[0]}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                            <Settings className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteManager(manager.id, manager.name)}
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

            {filteredManagers.length === 0 && (
              <div className="text-center py-12">
                <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No managers found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
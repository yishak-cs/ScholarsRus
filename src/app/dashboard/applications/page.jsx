"use client";

import { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function Applications() {
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock application data
  const applications = [
    {
      id: 1,
      title: "Tech Innovators Scholarship 2024",
      organization: "Future Tech Foundation",
      amount: 25000,
      deadline: "2024-03-15",
      status: "submitted",
      submittedDate: "2024-01-15",
      progress: 75,
      documents: ["Essay", "Transcript", "Recommendation Letter"],
      notes: "Submitted all required documents. Waiting for review."
    },
    {
      id: 2,
      title: "Women in STEM Excellence Award",
      organization: "STEM Foundation",
      amount: 15000,
      deadline: "2024-04-01",
      status: "in_progress",
      submittedDate: null,
      progress: 60,
      documents: ["Essay", "Transcript"],
      notes: "Need to submit recommendation letter and personal statement."
    },
    {
      id: 3,
      title: "Green Energy Research Fund",
      organization: "Environmental Science Association",
      amount: 30000,
      deadline: "2024-02-28",
      status: "accepted",
      submittedDate: "2024-01-10",
      progress: 100,
      documents: ["Essay", "Transcript", "Research Proposal", "Recommendation Letter"],
      notes: "Congratulations! You've been selected for this scholarship."
    },
    {
      id: 4,
      title: "First Generation College Grant",
      organization: "Education Access Foundation",
      amount: 12000,
      deadline: "2024-05-15",
      status: "rejected",
      submittedDate: "2023-12-20",
      progress: 100,
      documents: ["Essay", "Transcript"],
      notes: "Unfortunately, not selected this time. Consider applying next year."
    },
    {
      id: 5,
      title: "International Leadership Excellence",
      organization: "Global Leaders Institute",
      amount: 40000,
      deadline: "2024-06-30",
      status: "draft",
      submittedDate: null,
      progress: 25,
      documents: ["Essay (Draft)"],
      notes: "Application started. Need to complete remaining sections."
    }
  ];

  const statusConfig = {
    draft: { label: 'Draft', color: 'bg-gray-100 text-gray-800', icon: Edit },
    in_progress: { label: 'In Progress', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    submitted: { label: 'Submitted', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
    accepted: { label: 'Accepted', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircle },
    under_review: { label: 'Under Review', color: 'bg-purple-100 text-purple-800', icon: AlertCircle }
  };

  const filteredApplications = applications.filter(app => 
    filterStatus === 'all' || app.status === filterStatus
  );

  const stats = [
    { label: 'Total Applications', value: applications.length, color: 'text-blue-600' },
    { label: 'In Progress', value: applications.filter(app => app.status === 'in_progress' || app.status === 'draft').length, color: 'text-yellow-600' },
    { label: 'Submitted', value: applications.filter(app => app.status === 'submitted').length, color: 'text-blue-600' },
    { label: 'Accepted', value: applications.filter(app => app.status === 'accepted').length, color: 'text-green-600' }
  ];

  const totalAwarded = applications
    .filter(app => app.status === 'accepted')
    .reduce((sum, app) => sum + app.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-700 mt-2">Track and manage your scholarship applications</p>
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

      {/* Total Awarded */}
      {totalAwarded > 0 && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-green-800 mb-2">🎉 Congratulations!</h3>
            <p className="text-green-700">
              You've been awarded <span className="font-bold text-2xl">{formatCurrency(totalAwarded)}</span> in scholarships!
            </p>
          </CardContent>
        </Card>
      )}

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-gray-900">
            <span className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Application Dashboard
            </span>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center text-sm">
              <Plus className="w-4 h-4 mr-2" />
              New Application
            </button>
          </CardTitle>
          <CardDescription className="text-gray-600">
            Monitor your application progress and deadlines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex items-center">
              <Filter className="w-4 h-4 mr-2 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="in_progress">In Progress</option>
                <option value="submitted">Submitted</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600 mb-4">
            Showing {filteredApplications.length} of {applications.length} applications
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => {
          const statusInfo = statusConfig[application.status];
          const StatusIcon = statusInfo.icon;
          
          return (
            <Card key={application.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{application.title}</h3>
                      <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium flex items-center ${statusInfo.color}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.label}
                      </span>
                    </div>
                    <p className="text-gray-700 font-medium mb-2">{application.organization}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-gray-600">{application.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${application.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Documents */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Documents:</p>
                      <div className="flex flex-wrap gap-2">
                        {application.documents.map((doc, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    {application.notes && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 italic">{application.notes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right ml-6">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {formatCurrency(application.amount)}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">Award Amount</div>
                    <div className="text-sm text-gray-600 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Due: {formatDate(application.deadline)}
                    </div>
                  </div>
                </div>

                {/* Application Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {application.submittedDate && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Submitted:</span> {formatDate(application.submittedDate)}
                    </div>
                  )}
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Deadline:</span> {formatDate(application.deadline)}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center text-sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  {(application.status === 'draft' || application.status === 'in_progress') && (
                    <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Continue
                    </button>
                  )}
                  <button className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center text-sm">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600">
              {filterStatus === 'all' 
                ? "You haven't started any applications yet. Discover scholarships to get started!"
                : "No applications match the selected filter."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 
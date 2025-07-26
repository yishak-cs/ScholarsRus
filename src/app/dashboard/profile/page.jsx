"use client";

import { useState, useRef } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Award,
  Save,
  Edit,
  Camera,
  School,
  Calendar,
  Trophy,
  Briefcase,
  Settings,
  Shield,
  Upload,
  Download,
  FileText,
  Plus,
  Trash2,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  // Mock user data
  const [userData, setUserData] = useState({
    personal: {
      firstName: 'Alex',
      lastName: 'Johnson',
      email: 'alex.johnson@email.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '2002-03-15',
      address: '123 University Ave, College Town, CA 90210',
      profilePicture: null
    },
    academic: {
      currentSchool: 'University of California, Berkeley',
      degree: "Bachelor's in Computer Science",
      graduationYear: '2025',
      gpa: '3.85',
      major: 'Computer Science',
      minor: 'Mathematics',
      academicLevel: 'Undergraduate',
      schoolType: 'Public University'
    },
    achievements: [
      { id: 1, title: 'Dean\'s List', year: '2023', description: 'Fall Semester 2023' },
      { id: 2, title: 'Programming Contest Winner', year: '2023', description: 'First place in university coding competition' },
      { id: 3, title: 'Research Assistant', year: '2022-2023', description: 'AI/ML Research Lab, Prof. Sarah Chen' }
    ],
    experience: [
      { id: 1, title: 'Software Development Intern', company: 'Tech Corp', duration: 'Summer 2023', description: 'Worked on mobile app development using React Native' },
      { id: 2, title: 'Tutor', company: 'University Tutoring Center', duration: '2022-2023', description: 'Tutored students in calculus and programming fundamentals' }
    ],
    preferences: {
      scholarshipTypes: ['Merit-based', 'Need-based', 'Research'],
      fieldOfInterest: ['Computer Science', 'Technology', 'AI/Machine Learning'],
      geographicPreference: 'United States',
      minAmount: 5000,
      notifications: {
        email: true,
        sms: false,
        deadlineReminders: true,
        newMatches: true
      }
    },
    documents: {
      resume: null,
      resumeName: '',
      resumeUploadDate: null
    }
  });

  const resumeTemplates = [
    {
      id: 1,
      name: 'Professional Modern',
      description: 'Clean and professional design perfect for tech roles',
      preview: '/templates/modern.jpg',
      category: 'Professional'
    },
    {
      id: 2,
      name: 'Academic Scholar',
      description: 'Ideal for academic applications and research positions',
      preview: '/templates/academic.jpg',
      category: 'Academic'
    },
    {
      id: 3,
      name: 'Creative Designer',
      description: 'Eye-catching design for creative and design roles',
      preview: '/templates/creative.jpg',
      category: 'Creative'
    },
    {
      id: 4,
      name: 'Minimalist Clean',
      description: 'Simple and clean layout focusing on content',
      preview: '/templates/minimal.jpg',
      category: 'Minimalist'
    }
  ];

  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        setUserData(prev => ({
          ...prev,
          personal: {
            ...prev.personal,
            profilePicture: e.target.result
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUserData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          resume: file,
          resumeName: file.name,
          resumeUploadDate: new Date().toISOString()
        }
      }));
      alert('Resume uploaded successfully!');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      alert('Profile updated successfully!');
    }, 2000);
  };

  const handleInputChange = (section, field, value) => {
    setUserData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const buildResumeWithTemplate = (templateId) => {
    alert(`Starting resume builder with template ${templateId}. This would open the resume builder interface.`);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'academic', label: 'Academic', icon: GraduationCap },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-700 mt-2">Manage your personal information and preferences</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile Summary Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                {profileImage || userData.personal.profilePicture ? (
                  <img 
                    src={profileImage || userData.personal.profilePicture} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              {isEditing && (
                <>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                  >
                    <Camera className="w-3 h-3" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    className="hidden"
                  />
                </>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {userData.personal.firstName} {userData.personal.lastName}
              </h2>
              <p className="text-gray-600">{userData.academic.degree}</p>
              <p className="text-gray-600">{userData.academic.currentSchool}</p>
              <div className="flex items-center mt-2 space-x-4">
                <span className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-1" />
                  {userData.personal.email}
                </span>
                <span className="flex items-center text-sm text-gray-600">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  GPA: {userData.academic.gpa}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'personal' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Personal Information</CardTitle>
            <CardDescription className="text-gray-600">Basic personal details and contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={userData.personal.firstName}
                  onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={userData.personal.lastName}
                  onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={userData.personal.email}
                  onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={userData.personal.phone}
                  onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={userData.personal.dateOfBirth}
                  onChange={(e) => handleInputChange('personal', 'dateOfBirth', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={userData.personal.address}
                  onChange={(e) => handleInputChange('personal', 'address', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'academic' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Academic Information</CardTitle>
            <CardDescription className="text-gray-600">Educational background and current studies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Current School</label>
                <input
                  type="text"
                  value={userData.academic.currentSchool}
                  onChange={(e) => handleInputChange('academic', 'currentSchool', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Degree Program</label>
                <input
                  type="text"
                  value={userData.academic.degree}
                  onChange={(e) => handleInputChange('academic', 'degree', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                <input
                  type="text"
                  value={userData.academic.graduationYear}
                  onChange={(e) => handleInputChange('academic', 'graduationYear', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GPA</label>
                <input
                  type="text"
                  value={userData.academic.gpa}
                  onChange={(e) => handleInputChange('academic', 'gpa', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
                <input
                  type="text"
                  value={userData.academic.major}
                  onChange={(e) => handleInputChange('academic', 'major', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minor (Optional)</label>
                <input
                  type="text"
                  value={userData.academic.minor}
                  onChange={(e) => handleInputChange('academic', 'minor', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Academic Level</label>
                <select
                  value={userData.academic.academicLevel}
                  onChange={(e) => handleInputChange('academic', 'academicLevel', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
                >
                  <option value="High School">High School</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'achievements' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Achievements & Awards</CardTitle>
            <CardDescription className="text-gray-600">Academic and extracurricular accomplishments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.achievements.map((achievement) => (
                <div key={achievement.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                      <p className="text-gray-600 text-sm">{achievement.description}</p>
                    </div>
                    <span className="text-sm text-gray-500">{achievement.year}</span>
                  </div>
                </div>
              ))}
              {isEditing && (
                <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors">
                  + Add Achievement
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'experience' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Work & Volunteer Experience</CardTitle>
            <CardDescription className="text-gray-600">Professional and volunteer experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.experience.map((exp) => (
                <div key={exp.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                    <span className="text-sm text-gray-500">{exp.duration}</span>
                  </div>
                  <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                  <p className="text-gray-600 text-sm">{exp.description}</p>
                </div>
              ))}
              {isEditing && (
                <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors">
                  + Add Experience
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'documents' && (
        <div className="space-y-6">
          {/* Resume Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900">Resume Management</CardTitle>
              <CardDescription className="text-gray-600">Upload your resume or build one using our templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Current Resume */}
                {userData.documents.resume ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="w-8 h-8 text-green-600 mr-3" />
                        <div>
                          <h4 className="font-semibold text-green-800">{userData.documents.resumeName}</h4>
                          <p className="text-sm text-green-600">
                            Uploaded: {new Date(userData.documents.resumeUploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors flex items-center text-sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                        <button className="px-3 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors flex items-center text-sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </button>
                        <button className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center text-sm">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No resume uploaded yet</p>
                  </div>
                )}

                {/* Upload Section */}
                <div className="flex gap-4">
                  <button
                    onClick={() => resumeInputRef.current?.click()}
                    className="flex-1 px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center font-medium"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Resume
                  </button>
                  <input
                    ref={resumeInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resume Builder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900">Resume Builder</CardTitle>
              <CardDescription className="text-gray-600">Create a professional resume using our templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resumeTemplates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
                      <FileText className="w-16 h-16 text-gray-400" />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{template.name}</h4>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {template.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                      <button
                        onClick={() => buildResumeWithTemplate(template.id)}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Use This Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'preferences' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Scholarship Preferences</CardTitle>
            <CardDescription className="text-gray-600">Customize your scholarship discovery experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Scholarship Types</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Merit-based', 'Need-based', 'Research', 'Athletic', 'Leadership', 'Community Service'].map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={userData.preferences.scholarshipTypes.includes(type)}
                        disabled={!isEditing}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fields of Interest</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Computer Science', 'Technology', 'AI/Machine Learning', 'Engineering', 'Business', 'Medicine'].map(field => (
                    <label key={field} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={userData.preferences.fieldOfInterest.includes(field)}
                        disabled={!isEditing}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{field}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Geographic Preference</label>
                  <select
                    value={userData.preferences.geographicPreference}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="International">International</option>
                    <option value="Global">Global</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Award Amount</label>
                  <input
                    type="number"
                    value={userData.preferences.minAmount}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-4">Notification Preferences</h4>
                <div className="space-y-3">
                  {[
                    { key: 'email', label: 'Email Notifications' },
                    { key: 'sms', label: 'SMS Notifications' },
                    { key: 'deadlineReminders', label: 'Deadline Reminders' },
                    { key: 'newMatches', label: 'New Scholarship Matches' }
                  ].map(pref => (
                    <label key={pref.key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={userData.preferences.notifications[pref.key]}
                        disabled={!isEditing}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{pref.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 
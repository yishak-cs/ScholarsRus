"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  Home, 
  Search, 
  ArrowLeft, 
  Award,
  BookOpen,
  Users,
  RefreshCw
} from 'lucide-react';

export default function NotFound() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get user role from localStorage if available
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      if (user) {
        const userData = JSON.parse(user);
        setUserRole(userData.role || 'student');
      }
    }
  }, []);

  const getHomeUrl = () => {
    switch (userRole) {
      case 'admin':
        return '/admin';
      case 'manager':
        return '/manager';
      case 'student':
      default:
        return '/dashboard';
    }
  };

  const getQuickLinks = () => {
    switch (userRole) {
      case 'admin':
        return [
          { href: '/admin/users', label: 'User Management', icon: Users },
          { href: '/admin/analytics', label: 'Analytics', icon: BookOpen },
          { href: '/admin/settings', label: 'Settings', icon: Award }
        ];
      case 'manager':
        return [
          { href: '/manager/post', label: 'Post Scholarship', icon: Award },
          { href: '/manager/manage', label: 'Manage Scholarships', icon: BookOpen },
          { href: '/manager/statistics', label: 'Statistics', icon: Users }
        ];
      case 'student':
      default:
        return [
          { href: '/dashboard/discover', label: 'Discover Scholarships', icon: Search },
          { href: '/dashboard/applications', label: 'My Applications', icon: BookOpen },
          { href: '/dashboard/documents', label: 'AI Documents', icon: Award }
        ];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 animate-pulse">
            <span className="text-4xl font-bold text-white">404</span>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            The page you're looking for seems to have gone on a scholarship hunt.
          </p>
          <p className="text-gray-500">
            Don't worry, we'll help you find your way back to discovering amazing opportunities!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href={getHomeUrl()}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Dashboard
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Refresh Page
          </button>
        </div>

        {/* Quick Links */}
        {userRole && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Quick Links for {userRole === 'student' ? 'Students' : userRole === 'manager' ? 'Managers' : 'Administrators'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {getQuickLinks().map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <IconComponent className="w-6 h-6 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-gray-900">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* No User Logged In */}
        {!userRole && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Started with ScholarsRus</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/login"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
              >
                <Users className="w-6 h-6 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-gray-900">Sign In</span>
              </Link>
              <Link
                href="/"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
              >
                <Home className="w-6 h-6 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-gray-900">Homepage</span>
              </Link>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <Award className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ScholarsRus</span>
          </div>
          <p className="text-gray-500 text-sm">
            AI-Powered Scholarship Discovery Platform
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Error Code: 404 | Page Not Found
          </p>
        </div>
      </div>
    </div>
  );
} 
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Award, ArrowLeft, Mail, Shield, Zap, Users } from 'lucide-react';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, this would handle actual Google OAuth
      // For now, just redirect to dashboard
      router.push('/dashboard');
    }, 2000);
  };

  const handleEmailLogin = async () => {
    setIsLoading(true);
    
    // Simulate email login
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-16 w-12 h-12 bg-white rounded-full"></div>
          <div className="absolute bottom-40 right-10 w-24 h-24 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4">
              <Award className="w-7 h-7 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold">ScholarsRus</h1>
          </div>

          {/* Main Message */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Your Scholarship Journey Starts Here
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of students who have secured funding with our AI-powered platform
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6 w-full max-w-md">
            {[
              {
                icon: Zap,
                title: "Instant Matching",
                description: "AI finds perfect scholarships in seconds"
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your data is protected with enterprise security"
              },
              {
                icon: Users,
                title: "Proven Success",
                description: "95% of our users secure at least one scholarship"
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm opacity-80">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <Award className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ScholarsRus
          </span>
        </div>

        {/* Back Button */}
        <div className="w-full max-w-md mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
              <p className="text-gray-600">Sign in to continue your scholarship journey</p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-6 py-4 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mr-3"></div>
              ) : (
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              {isLoading ? 'Signing in...' : 'Continue with Google'}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Email Login Button */}
            <button
              onClick={handleEmailLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
              <Mail className="w-5 h-5 mr-3" />
              Continue with Email
            </button>

            {/* Quick Demo Button */}
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full text-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              🚀 Try Quick Demo (No Sign-up Required)
            </button>

            {/* Terms */}
            <p className="text-xs text-gray-500 text-center mt-6">
              By continuing, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              New to ScholarsRus?{' '}
              <button 
                onClick={handleGoogleLogin}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Create free account
              </button>
            </p>
          </div>

          {/* Social Proof */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">Trusted by students at</p>
            <div className="flex justify-center items-center space-x-6 text-gray-400">
              <div className="font-semibold">Harvard</div>
              <div className="font-semibold">Stanford</div>
              <div className="font-semibold">MIT</div>
              <div className="font-semibold">Yale</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
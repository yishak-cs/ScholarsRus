'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Award,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Zap,
  Users,
  Github,
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const router = useRouter();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // simulate login
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // simulate Google OAuth
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/',
        fetchOptions: {
          onError: (err) => console.error('GitHub login failed:', err),
        },
      });
    } catch (error) {
      console.error('Unexpected GitHub login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex">
      {/* Left Side Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-16 h-16 bg-white rounded-full" />
          <div className="absolute top-28 right-16 w-12 h-12 bg-white rounded-full" />
          <div className="absolute bottom-16 left-12 w-8 h-8 bg-white rounded-full" />
          <div className="absolute bottom-32 right-8 w-20 h-20 bg-white rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-8 w-full">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold">ScholarsRus</h1>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-3">Your Scholarship Journey Starts Here</h2>
            <p className="text-lg opacity-90 mb-6">
              Join thousands of students who have secured funding with our AI-powered platform
            </p>
          </div>

          <div className="space-y-4 w-full max-w-sm">
            {[{ icon: Zap, title: 'Instant Matching', description: 'AI finds perfect scholarships in seconds' },
              { icon: Shield, title: 'Secure & Private', description: 'Your data is protected with enterprise security' },
              { icon: Users, title: 'Proven Success', description: '95% of our users secure at least one scholarship' }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-xs opacity-80">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6">
        <div className="lg:hidden flex items-center mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <Award className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ScholarsRus
          </span>
        </div>

        <div className="w-full max-w-sm mb-4">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back!</h2>
              <p className="text-gray-600 text-sm">Sign in to continue your scholarship journey</p>
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-4 mb-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-3.5 w-3.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-gray-700">
                    Remember me
                  </label>
                </div>
                <div>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                )}
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">or continue with</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mr-2"></div>
                ) : (
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24"> {/* Google Icon */}</svg>
                )}
                Continue with Google
              </button>

              <button
                onClick={handleGithubLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-white rounded-full animate-spin mr-2"></div>
                ) : (
                  <Github className="w-4 h-4 mr-2" />
                )}
                Continue with GitHub
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm"
              >
                🚀 Try Quick Demo (No Sign-up Required)
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              By continuing, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              New to ScholarsRus?{' '}
              <button
                onClick={handleGoogleLogin}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Create free account
              </button>
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 mb-3">Trusted by students at</p>
            <div className="flex justify-center items-center space-x-3 text-gray-400 text-xs">
              <span className="font-semibold">Harvard</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span className="font-semibold">Stanford</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span className="font-semibold">MIT</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span className="font-semibold">Yale</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

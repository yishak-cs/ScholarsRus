import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, FileText, Search, Target, Users, Zap, DollarSign, Clock, Award, Star, BookOpen, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ScholarsRus
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
          <a href="#success-stories" className="text-gray-600 hover:text-blue-600 transition-colors">Success</a>
          <Link href="/login">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Scholarship Discovery
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Perfect 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Scholarship</span>
            <br />in Seconds, Not Hours
          </h1>
          <p className="text-xl text-gray-800 leading-relaxed max-w-2xl mx-auto">
            Discover personalized scholarships and generate winning applications with AI assistance. 
            Join thousands of students who have secured over $50M in scholarships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/login">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                Start Finding Scholarships
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center">
              <Users className="mr-2 w-5 h-5" />
              Watch Demo
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span>4.9/5 Student Rating</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 text-green-500 mr-1" />
              <span>50,000+ Scholarships</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
              <span>95% Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { number: "50K+", label: "Scholarships Tracked", icon: Search, color: "text-blue-600" },
            { number: "95%", label: "Match Accuracy", icon: Target, color: "text-green-600" },
            { number: "$2.3B", label: "Available Funding", icon: DollarSign, color: "text-purple-600" },
            { number: "24/7", label: "AI Assistant", icon: Brain, color: "text-orange-600" },
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <IconComponent className={`w-10 h-10 ${stat.color} mx-auto mb-4`} />
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to Win Scholarships
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform handles every aspect of scholarship discovery and application
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Search,
              title: "Smart Discovery Engine",
              description: "AI scans 1000+ scholarship sites daily to find opportunities that match your unique profile with 95% accuracy",
              color: "from-blue-500 to-cyan-500",
              features: ["Real-time updates", "Advanced filtering", "Personalized matches"]
            },
            {
              icon: FileText,
              title: "AI Document Generator",
              description: "Generate personalized essays, resumes, and cover letters that highlight your strengths in under 30 seconds",
              color: "from-purple-500 to-pink-500",
              features: ["Essay writing", "Resume optimization", "Cover letters"]
            },
            {
              icon: Brain,
              title: "Intelligent Matching",
              description: "Advanced algorithms analyze 50+ criteria to rank scholarships by your likelihood of winning",
              color: "from-green-500 to-emerald-500",
              features: ["Success prediction", "Eligibility check", "Competition analysis"]
            },
            {
              icon: Clock,
              title: "Smart Deadline Management",
              description: "Never miss an opportunity with intelligent reminders and application timeline management",
              color: "from-orange-500 to-red-500",
              features: ["Deadline tracking", "Auto reminders", "Timeline planning"]
            },
            {
              icon: Users,
              title: "Success Analytics",
              description: "Track your application success rate and get insights to improve future applications",
              color: "from-indigo-500 to-blue-500",
              features: ["Performance metrics", "Success insights", "Improvement tips"]
            },
            {
              icon: Zap,
              title: "One-Click Applications",
              description: "Submit applications to multiple scholarships with pre-filled forms and AI-generated documents",
              color: "from-yellow-500 to-orange-500",
              features: ["Bulk applications", "Auto-fill forms", "Document management"]
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{feature.title}</h3>
              <p className="text-gray-700 text-center leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">See ScholarsRus in Action</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Watch how our AI finds perfect scholarships and generates winning applications in real-time
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              🎥 Watch Live Demo
            </button>
            <Link href="/login">
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                Try It Free Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 text-center text-gray-600 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
            <Award className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold">ScholarsRus</span>
        </div>
        <p className="mb-4">&copy; 2024 ScholarsRus. Empowering students worldwide with AI-powered scholarship discovery.</p>
        <div className="flex justify-center space-x-6 text-sm">
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a>
        </div>
      </footer>
    </div>
  );
} 
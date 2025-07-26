"use client";

import { useState } from 'react';
import { 
  Brain, 
  FileText, 
  User, 
  BookOpen, 
  Star,
  Plus,
  Download,
  Edit,
  Trash2,
  Clock,
  Zap,
  Copy,
  Check
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AIDocuments() {
  const [activeTab, setActiveTab] = useState('generate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Mock generated documents
  const generatedDocuments = [
    {
      id: 1,
      type: 'Essay',
      title: 'Why I Deserve the Tech Innovators Scholarship',
      scholarship: 'Tech Innovators Scholarship 2024',
      wordCount: 485,
      createdAt: '2024-01-15',
      content: 'As a computer science student passionate about artificial intelligence and machine learning, I believe I am uniquely positioned to contribute to the technological innovations that will shape our future...',
      status: 'completed'
    },
    {
      id: 2,
      type: 'Resume',
      title: 'Academic & Professional Resume',
      scholarship: 'Women in STEM Excellence Award',
      wordCount: 350,
      createdAt: '2024-01-12',
      content: 'A comprehensive resume highlighting academic achievements, technical skills, and leadership experience...',
      status: 'completed'
    },
    {
      id: 3,
      type: 'Cover Letter',
      title: 'Research Fellowship Application Letter',
      scholarship: 'Green Energy Research Fund',
      wordCount: 420,
      createdAt: '2024-01-10',
      content: 'A professional cover letter expressing interest in sustainable energy research opportunities...',
      status: 'completed'
    },
    {
      id: 4,
      type: 'Personal Statement',
      title: 'My Journey in Environmental Science',
      scholarship: 'Green Energy Research Fund',
      wordCount: 0,
      createdAt: '2024-01-16',
      content: '',
      status: 'generating'
    }
  ];

  const documentTypes = [
    {
      type: 'Essay',
      icon: FileText,
      title: 'Scholarship Essay',
      description: 'Generate compelling and personalized scholarship essays',
      color: 'from-blue-500 to-blue-600',
      estimatedTime: '2-3 minutes'
    },
    {
      type: 'Resume',
      icon: User,
      title: 'Professional Resume',
      description: 'Create ATS-optimized resumes tailored for scholarships',
      color: 'from-green-500 to-green-600',
      estimatedTime: '1-2 minutes'
    },
    {
      type: 'Cover Letter',
      icon: BookOpen,
      title: 'Cover Letter',
      description: 'Write personalized cover letters for applications',
      color: 'from-purple-500 to-purple-600',
      estimatedTime: '1-2 minutes'
    },
    {
      type: 'Personal Statement',
      icon: Star,
      title: 'Personal Statement',
      description: 'Craft your unique story and academic journey',
      color: 'from-orange-500 to-orange-600',
      estimatedTime: '3-4 minutes'
    }
  ];

  const handleGenerate = async (type) => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      alert(`${type} generation started! Check the "My Documents" tab to see progress.`);
    }, 2000);
  };

  const handleCopy = async (id, content) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = (document) => {
    // Create a blob with the document content
    const blob = new Blob([document.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${document.title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Document Generator</h1>
        <p className="text-gray-700 mt-2">Generate personalized scholarship documents using AI</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
        <div className="flex space-x-1">
          <button 
            onClick={() => setActiveTab('generate')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'generate' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <Brain className="w-4 h-4 inline mr-2" />
            Generate Documents
          </button>
          <button 
            onClick={() => setActiveTab('documents')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'documents' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            My Documents ({generatedDocuments.filter(doc => doc.status === 'completed').length})
          </button>
        </div>
      </div>

      {activeTab === 'generate' && (
        <div className="space-y-6">
          {/* Generator Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documentTypes.map((docType) => {
              const IconComponent = docType.icon;
              return (
                <Card key={docType.type} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${docType.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{docType.title}</h3>
                      <p className="text-gray-600 mb-4">{docType.description}</p>
                      <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                        <Clock className="w-4 h-4 mr-1" />
                        Est. {docType.estimatedTime}
                      </div>
                      <button
                        onClick={() => handleGenerate(docType.type)}
                        disabled={isGenerating}
                        className={`w-full px-6 py-3 bg-gradient-to-r ${docType.color} text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {isGenerating ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-2" />
                            Generate {docType.type}
                          </>
                        )}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* AI Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Zap className="w-5 h-5 mr-2" />
                AI-Powered Features
              </CardTitle>
              <CardDescription className="text-gray-600">
                Our AI technology makes your documents stand out
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Smart Personalization</h4>
                  <p className="text-sm text-gray-600">Tailored content based on your profile and scholarship requirements</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Professional Quality</h4>
                  <p className="text-sm text-gray-600">Grammar-perfect, well-structured documents that impress reviewers</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Keyword Optimization</h4>
                  <p className="text-sm text-gray-600">Optimized with relevant keywords to match scholarship criteria</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="space-y-6">
          {/* Documents List */}
          <div className="space-y-4">
            {generatedDocuments.map((document) => (
              <Card key={document.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{document.title}</h3>
                        <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                          document.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {document.status === 'completed' ? 'Ready' : 'Generating...'}
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium mb-2">{document.scholarship}</p>
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <span className="mr-4">Type: {document.type}</span>
                        {document.wordCount > 0 && (
                          <span className="mr-4">Words: {document.wordCount}</span>
                        )}
                        <span>Created: {document.createdAt}</span>
                      </div>
                      
                      {document.content && (
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {document.content.substring(0, 200)}
                            {document.content.length > 200 && '...'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2">
                    {document.status === 'completed' && (
                      <>
                        <button
                          onClick={() => handleCopy(document.id, document.content)}
                          className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center text-sm"
                        >
                          {copiedId === document.id ? (
                            <>
                              <Check className="w-4 h-4 mr-1 text-green-600" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-1" />
                              Copy
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleDownload(document)}
                          className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center text-sm"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </button>
                        <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                      </>
                    )}
                    <button className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center text-sm">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {generatedDocuments.length === 0 && (
              <div className="text-center py-12">
                <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No documents generated yet</h3>
                <p className="text-gray-600">Start by generating your first AI-powered document!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 
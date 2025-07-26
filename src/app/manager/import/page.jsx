"use client";

import { useState } from 'react';
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function BulkImport() {
  const [uploadStep, setUploadStep] = useState('upload'); // upload, preview, processing, complete
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [validationResults, setValidationResults] = useState([]);

  // Mock data for preview
  const samplePreviewData = [
    {
      row: 1,
      name: "AI Research Scholarship 2024",
      provider: "Tech Institute",
      description: "Supporting AI research in higher education",
      application_deadline: "2024-06-15",
      funding_amount: "$15,000",
      study_levels: "Master's Degree, PhD/Doctorate",
      eligible_countries: "United States, Canada",
      validation: { isValid: true, errors: [] }
    },
    {
      row: 2,
      name: "Women in Engineering Grant",
      provider: "Engineering Foundation",
      description: "Supporting women pursuing engineering degrees",
      application_deadline: "2024-05-30",
      funding_amount: "$20,000",
      study_levels: "Bachelor's Degree",
      eligible_countries: "Global",
      validation: { isValid: true, errors: [] }
    },
    {
      row: 3,
      name: "", // Missing required field
      provider: "Innovation Hub",
      description: "Supporting innovative student projects",
      application_deadline: "invalid-date",
      funding_amount: "$10,000",
      study_levels: "Bachelor's Degree",
      eligible_countries: "United States",
      validation: { 
        isValid: false, 
        errors: ["Name is required", "Invalid date format"] 
      }
    },
    {
      row: 4,
      name: "Sustainability Leadership Award",
      provider: "Green Future Foundation",
      description: "For students leading sustainability initiatives",
      application_deadline: "2024-07-20",
      funding_amount: "$25,000",
      study_levels: "Bachelor's Degree, Master's Degree",
      eligible_countries: "European Union",
      validation: { isValid: true, errors: [] }
    }
  ];

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Simulate file processing
      setTimeout(() => {
        setPreviewData(samplePreviewData);
        setUploadStep('preview');
      }, 1000);
    }
  };

  const handleProcess = () => {
    setIsProcessing(true);
    setUploadStep('processing');
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setUploadStep('complete');
      setValidationResults([
        { status: 'success', count: 3, message: '3 scholarships imported successfully' },
        { status: 'error', count: 1, message: '1 scholarship failed validation' }
      ]);
    }, 3000);
  };

  const downloadTemplate = () => {
    // In real app, this would download an actual Excel template
    alert('Excel template download would start here');
  };

  const resetUpload = () => {
    setUploadStep('upload');
    setFile(null);
    setPreviewData([]);
    setValidationResults([]);
    setIsProcessing(false);
  };

  const validRows = previewData.filter(row => row.validation.isValid).length;
  const invalidRows = previewData.filter(row => !row.validation.isValid).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bulk Import Scholarships</h1>
        <p className="text-gray-600">Upload multiple scholarships from an Excel file</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 py-8">
        {[
          { step: 'upload', label: 'Upload File', icon: Upload },
          { step: 'preview', label: 'Preview & Validate', icon: Eye },
          { step: 'processing', label: 'Processing', icon: RefreshCw },
          { step: 'complete', label: 'Complete', icon: CheckCircle }
        ].map((item, index) => {
          const IconComponent = item.icon;
          const isActive = uploadStep === item.step;
          const isCompleted = ['upload', 'preview', 'processing'].indexOf(uploadStep) > ['upload', 'preview', 'processing'].indexOf(item.step);
          
          return (
            <div key={item.step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isActive ? 'bg-blue-600 text-white' :
                isCompleted ? 'bg-green-600 text-white' :
                'bg-gray-200 text-gray-600'
              }`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <span className={`ml-2 text-sm font-medium ${
                isActive ? 'text-blue-600' :
                isCompleted ? 'text-green-600' :
                'text-gray-500'
              }`}>
                {item.label}
              </span>
              {index < 3 && (
                <div className={`w-12 h-0.5 mx-4 ${
                  isCompleted ? 'bg-green-600' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Upload Step */}
      {uploadStep === 'upload' && (
        <div className="space-y-6">
          {/* Template Download */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Download Template
              </CardTitle>
              <CardDescription>
                Start by downloading our Excel template with the required columns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <button
                onClick={downloadTemplate}
                className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Download Excel Template
              </button>
              <div className="mt-4 text-sm text-gray-600">
                <p className="font-medium mb-2">Required columns:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                  <span>• name (required)</span>
                  <span>• provider (required)</span>
                  <span>• description</span>
                  <span>• application_deadline</span>
                  <span>• funding_amount</span>
                  <span>• study_levels</span>
                  <span>• eligible_countries</span>
                  <span>• fields_of_study</span>
                  <span>• academic_year</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Upload File
              </CardTitle>
              <CardDescription>
                Upload your completed Excel file for processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-700">Drop your Excel file here</p>
                  <p className="text-gray-500">or click to browse</p>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    Select File
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Supported formats: .xlsx, .xls (Max size: 10MB)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Preview Step */}
      {uploadStep === 'preview' && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <FileSpreadsheet className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-lg font-bold text-gray-900">{previewData.length}</p>
                <p className="text-sm text-gray-600">Total Rows</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-lg font-bold text-green-900">{validRows}</p>
                <p className="text-sm text-gray-600">Valid Rows</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="text-lg font-bold text-red-900">{invalidRows}</p>
                <p className="text-sm text-gray-600">Invalid Rows</p>
              </CardContent>
            </Card>
          </div>

          {/* Preview Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Data Preview
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={resetUpload}
                    className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1 inline" />
                    Reset
                  </button>
                  <button
                    onClick={handleProcess}
                    disabled={validRows === 0}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Import {validRows} Valid Rows
                  </button>
                </div>
              </CardTitle>
              <CardDescription>
                Review and validate your data before importing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2">Status</th>
                      <th className="text-left py-2 px-2">Row</th>
                      <th className="text-left py-2 px-2">Name</th>
                      <th className="text-left py-2 px-2">Provider</th>
                      <th className="text-left py-2 px-2">Deadline</th>
                      <th className="text-left py-2 px-2">Funding</th>
                      <th className="text-left py-2 px-2">Errors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, index) => (
                      <tr key={index} className={`border-b border-gray-100 ${
                        row.validation.isValid ? 'bg-green-50' : 'bg-red-50'
                      }`}>
                        <td className="py-2 px-2">
                          {row.validation.isValid ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                        </td>
                        <td className="py-2 px-2">{row.row}</td>
                        <td className="py-2 px-2">{row.name || '(empty)'}</td>
                        <td className="py-2 px-2">{row.provider}</td>
                        <td className="py-2 px-2">{row.application_deadline}</td>
                        <td className="py-2 px-2">{row.funding_amount}</td>
                        <td className="py-2 px-2">
                          {row.validation.errors.length > 0 && (
                            <div className="text-xs text-red-600">
                              {row.validation.errors.join(', ')}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Processing Step */}
      {uploadStep === 'processing' && (
        <Card>
          <CardContent className="p-12 text-center">
            <RefreshCw className="w-16 h-16 text-blue-600 mx-auto mb-6 animate-spin" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Import</h3>
            <p className="text-gray-600 mb-6">
              Importing {validRows} scholarships into the database...
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Complete Step */}
      {uploadStep === 'complete' && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Import Complete!</h3>
              <p className="text-gray-600 mb-6">Your scholarship data has been processed</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                {validationResults.map((result, index) => (
                  <div key={index} className={`p-4 rounded-lg ${
                    result.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <div className={`text-lg font-bold ${
                      result.status === 'success' ? 'text-green-900' : 'text-red-900'
                    }`}>
                      {result.count}
                    </div>
                    <div className={`text-sm ${
                      result.status === 'success' ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {result.message}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-x-4">
                <button
                  onClick={resetUpload}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Import More Files
                </button>
                <button
                  onClick={() => window.location.href = '/manager/manage'}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Scholarships
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 
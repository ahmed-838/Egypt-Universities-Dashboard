import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getFacultyById } from '../services/facultyService';
import { Building2, MapPin, GraduationCap, Users, Globe, Mail, Star, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';

export function UniversityDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: university, isLoading, error } = useQuery(
    ['university', id],
    () => getFacultyById(id!),
    {
      enabled: !!id,
      retry: 1
    }
  );

  const handleExportPDF = () => {
    const element = document.getElementById('university-details');
    if (!element || !university) return;

    const opt = {
      margin: [0.5, 0.5],
      filename: `${university.name}-details.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { 
        scale: 3,
        useCORS: true,
        logging: true,
        letterRendering: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      }
    };

    // Add print-specific styles
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        .university-pdf {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        .university-pdf img {
          max-height: 300px;
          width: 100%;
          object-fit: cover;
        }
        .university-pdf .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin: 20px 0;
        }
        .university-pdf .stat-card {
          padding: 15px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }
        .university-pdf .departments span {
          display: inline-block;
          margin: 5px;
          padding: 5px 10px;
          background: #eef2ff;
          border-radius: 4px;
        }
      }
    `;
    document.head.appendChild(style);

    // Create a special version for PDF export
    const pdfContent = `
      <div class="university-pdf" style="font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="${university.imageUrl}" 
               alt="${university.name}" 
               style="max-height: 250px; width: auto; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
        </div>

        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-size: 28px; color: #1e40af; margin-bottom: 10px;">${university.name}</h1>
          <p style="font-size: 18px; color: #6b7280;">${university.location}</p>
        </div>

        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
            <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <p style="color: #4b5563; font-size: 14px; margin-bottom: 5px;">Rating</p>
              <p style="font-size: 20px; font-weight: bold; color: #1e40af;">⭐ ${university.rating}/5</p>
            </div>
            <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <p style="color: #4b5563; font-size: 14px; margin-bottom: 5px;">Annual Tuition</p>
              <p style="font-size: 20px; font-weight: bold; color: #1e40af;">$${university.tuition.toLocaleString()}</p>
            </div>
            <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <p style="color: #4b5563; font-size: 14px; margin-bottom: 5px;">Students</p>
              <p style="font-size: 20px; font-weight: bold; color: #1e40af;">${university.studentCount.toLocaleString()}</p>
            </div>
            <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <p style="color: #4b5563; font-size: 14px; margin-bottom: 5px;">Faculty Members</p>
              <p style="font-size: 20px; font-weight: bold; color: #1e40af;">${university.facultyCount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 22px; color: #1e40af; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">About</h2>
          <p style="color: #4b5563; line-height: 1.8; font-size: 16px;">${university.description}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 22px; color: #1e40af; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Departments</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            ${university.departments.map(dept => `
              <span style="
                background-color: #eef2ff;
                color: #1e40af;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 500;
              ">${dept}</span>
            `).join('')}
          </div>
        </div>

        <div style="
          background-color: #f3f4f6; 
          padding: 20px; 
          border-radius: 8px; 
          page-break-inside: avoid;
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
          position: relative;
          display: inline-block;
          width: 100%;
        ">
          <h2 style="font-size: 22px; color: #1e40af; margin-bottom: 15px;">Contact Information</h2>
          <div style="display: grid; gap: 15px;">
            <div style="display: flex; align-items: center;">
              <span style="font-weight: 600; width: 100px;">Website:</span>
              <a href="${university.website}" style="color: #1e40af; text-decoration: underline;">${university.website}</a>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="font-weight: 600; width: 100px;">Email:</span>
              <span style="color: #4b5563;">${university.contactEmail}</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="font-weight: 600; width: 100px;">Founded:</span>
              <span style="color: #4b5563;">${university.established}</span>
            </div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 40px; color: #9ca3af; font-size: 12px;">
          Generated on ${new Date().toLocaleDateString()}
        </div>
      </div>
    `;

    // Create temporary element for PDF generation
    const pdfElement = document.createElement('div');
    pdfElement.innerHTML = pdfContent;
    document.body.appendChild(pdfElement);

    // Generate PDF
    html2pdf().set(opt).from(pdfElement).save();

    // Cleanup
    document.body.removeChild(pdfElement);
    document.head.removeChild(style);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error loading university details. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">{university.name}</h1>
        <button
          onClick={handleExportPDF}
          className="flex items-center px-6 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          <Download className="h-5 w-5 mr-2" />
          Download Details
        </button>
      </div>

      <div id="university-details" className="space-y-8">
        {/* Hero Section */}
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <img
            src={university.imageUrl}
            alt={university.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
            <div className="text-white space-y-2">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">{university.location}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-white/20 rounded-full">
                  {university.type}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full">
                  {university.degreeType}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Star, label: 'Rating', value: `${university.rating}/5` },
            { icon: Users, label: 'Students', value: university.studentCount.toLocaleString() },
            { icon: GraduationCap, label: 'Faculty', value: university.facultyCount.toLocaleString() },
            { icon: Building2, label: 'Annual Tuition', value: `$${university.tuition.toLocaleString()}` }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <stat.icon className="h-8 w-8 text-indigo-600 mb-3" />
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{university.description}</p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Departments</h2>
              <div className="flex flex-wrap gap-3">
                {university.departments.map((dept, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium text-sm"
                  >
                    {dept}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <a
                  href={university.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Globe className="h-6 w-6 text-indigo-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <p className="text-indigo-600">Visit Official Website</p>
                  </div>
                </a>

                <a
                  href={`mailto:${university.contactEmail}`}
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Mail className="h-6 w-6 text-indigo-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{university.contactEmail}</p>
                  </div>
                </a>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Building2 className="h-6 w-6 text-indigo-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Established</p>
                    <p className="text-gray-900">{university.established}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
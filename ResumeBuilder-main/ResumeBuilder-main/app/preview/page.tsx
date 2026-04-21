'use client'

import { useState, useEffect, useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default function Preview() {
  const [resume, setResume] = useState('')
  const [formattedResume, setFormattedResume] = useState<{[key: string]: string}>({})
  const resumeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchResume = async () => {
      const response = await fetch('/api/preview')
      if (response.ok) {
        const data = await response.json()
        setResume(data.resume || 'No resume generated yet.')
        formatResume(data.resume || '')
      }
    }
    fetchResume()
  }, [])

  const formatResume = (text: string) => {
    const sections: {[key: string]: string} = {}
    const lines = text.split('\n')
    let currentSection = ''
    let currentContent = ''

    for (const line of lines) {
      if (line.startsWith('# ')) {
        if (currentSection) {
          sections[currentSection] = currentContent.trim()
        }
        currentSection = 'name'
        currentContent = line.replace('# ', '')
      } else if (line.startsWith('**') && line.endsWith('**')) {
        sections['role'] = line.replace(/\*\*/g, '')
      } else if (line.startsWith('## ')) {
        if (currentSection && currentSection !== 'name') {
          sections[currentSection] = currentContent.trim()
        }
        currentSection = line.replace('## ', '').toLowerCase().replace(/\s+/g, '_')
        currentContent = ''
      } else if (line.startsWith('### ')) {
        currentContent += line.replace('### ', '**') + '\n'
      } else if (line.startsWith('- ')) {
        currentContent += line + '\n'
      } else if (line.trim() === '---') {
        // Skip separators
      } else if (line.trim()) {
        currentContent += line + '\n'
      }
    }
    if (currentSection) {
      sections[currentSection] = currentContent.trim()
    }
    setFormattedResume(sections)
  }

  const handleExportPDF = async () => {
    if (!resumeRef.current) return

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794, // A4 width in pixels at 96 DPI
        height: 1123, // A4 height in pixels at 96 DPI
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = pdfWidth
      const imgHeight = (canvas.height * pdfWidth) / canvas.width

      // If content is taller than one page, scale it down
      let finalHeight = imgHeight
      if (imgHeight > pdfHeight) {
        finalHeight = pdfHeight - 10 // Leave some margin
      }

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, finalHeight)
      pdf.save('resume.pdf')
    } catch (error) {
      console.error('Error generating PDF:', error)
      // Fallback to basic PDF generation
      const doc = new jsPDF()
      doc.setFontSize(16)
      doc.text(formattedResume.name || 'Resume', 20, 30)

      if (formattedResume.role) {
        doc.setFontSize(12)
        doc.text(formattedResume.role, 20, 45)
      }

      let yPosition = 65
      const sections = ['professional_summary', 'skills', 'projects', 'education', 'tools_&_technologies']

      sections.forEach(section => {
        if (formattedResume[section]) {
          doc.setFontSize(14)
          doc.setFont('helvetica', 'bold')
          doc.text(section.replace(/_/g, ' ').toUpperCase(), 20, yPosition)
          yPosition += 10

          doc.setFontSize(10)
          doc.setFont('helvetica', 'normal')
          const lines = formattedResume[section].split('\n')
          lines.forEach(line => {
            if (line.trim()) {
              doc.text(line, 25, yPosition)
              yPosition += 6
            }
          })
          yPosition += 10
        }
      })

      doc.save('resume.pdf')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📋</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Preview & Export Resume</h1>
            <p className="text-gray-600 mt-2">Review your AI-generated resume and export it</p>
          </div>

          {/* Resume Preview Container - A4 Proportions */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8 border shadow-sm">
            <div
              ref={resumeRef}
              className="bg-white mx-auto shadow-sm border"
              style={{
                width: '210mm',
                minHeight: '297mm',
                maxWidth: '100%',
                aspectRatio: '210/297',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
            >
              {/* Resume Content */}
              <div className="p-8 h-full flex flex-col">
                {/* Header Section */}
                <div className="text-center mb-8 pb-4 border-b-2 border-gray-800">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-wide">
                    {formattedResume.name || 'YOUR NAME'}
                  </h1>
                  <p className="text-xl text-gray-700 font-medium mb-3">
                    {formattedResume.role || 'Professional Title'}
                  </p>
                  <div className="flex justify-center items-center space-x-6 text-sm text-gray-600">
                    <span className="flex items-center">
                      <span className="mr-1">📧</span>
                      {formattedResume.email || 'email@example.com'}
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">📍</span>
                      Location
                    </span>
                  </div>
                </div>

                {/* Professional Summary */}
                {formattedResume.professional_summary && (
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-300 pb-1">
                      Professional Summary
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {formattedResume.professional_summary}
                    </p>
                  </div>
                )}

                {/* Skills */}
                {formattedResume.skills && (
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-300 pb-1">
                      Skills
                    </h2>
                    <div className="text-gray-700 text-sm">
                      {formattedResume.skills.split('\n').filter(skill => skill.trim()).map((skill, index) => (
                        <span key={index} className="inline-block mr-3 mb-2">
                          {skill.startsWith('- ') ? skill.substring(2) : skill}
                          {index < formattedResume.skills.split('\n').filter(s => s.trim()).length - 1 && ' • '}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {formattedResume.projects && (
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-300 pb-1">
                      Projects
                    </h2>
                    <div className="space-y-4 text-sm">
                      {formattedResume.projects.split('\n').map((line, index) => {
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return (
                            <div key={index} className="font-semibold text-gray-800">
                              {line.replace(/\*\*/g, '')}
                            </div>
                          )
                        } else if (line.startsWith('- ')) {
                          return (
                            <div key={index} className="flex items-start ml-4">
                              <span className="text-gray-600 mr-2 mt-1.5">•</span>
                              <span className="text-gray-700 leading-relaxed">{line.substring(2)}</span>
                            </div>
                          )
                        }
                        return null
                      })}
                    </div>
                  </div>
                )}

                {/* Education */}
                {formattedResume.education && (
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-300 pb-1">
                      Education
                    </h2>
                    <div className="text-gray-700 text-sm space-y-2">
                      {formattedResume.education.split('\n').filter(edu => edu.trim()).map((edu, index) => (
                        <div key={index}>{edu}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tools & Technologies */}
                {formattedResume['tools_&_technologies'] && (
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-300 pb-1">
                      Tools & Technologies
                    </h2>
                    <div className="text-gray-700 text-sm">
                      {formattedResume['tools_&_technologies'].split('\n').filter(tool => tool.trim()).map((tool, index) => (
                        <span key={index} className="inline-block mr-3 mb-2">
                          {tool.startsWith('- ') ? tool.substring(2) : tool}
                          {index < formattedResume['tools_&_technologies'].split('\n').filter(t => t.trim()).length - 1 && ' • '}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Spacer to push content to top */}
                <div className="flex-grow"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleExportPDF}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              <span className="mr-2">📄</span>
              Export to PDF
            </button>
            <button
              onClick={() => window.print()}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              <span className="mr-2">🖨️</span>
              Print Resume
            </button>
          </div>

          <div className="mt-8 text-center">
            <a href="/" className="text-red-600 hover:text-red-800 font-medium transition-colors">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
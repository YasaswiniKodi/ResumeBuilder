'use client'

import { useState } from 'react'

export default function JobDescription() {
  const [jobDesc, setJobDesc] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/job-description', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobDescription: jobDesc }),
    })
    if (response.ok) {
      setMessage('Job description saved successfully!')
    } else {
      setMessage('Failed to save job description.')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📄</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Job Description</h1>
            <p className="text-gray-600 mt-2">Paste the job description for AI analysis</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="jobDesc">
                Job Description
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                id="jobDesc"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the complete job description here. Include requirements, responsibilities, and qualifications..."
                rows={12}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Save Job Description
            </button>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-lg ${message.includes('successfully') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              {message}
            </div>
          )}

          <div className="mt-8 text-center">
            <a href="/" className="text-green-600 hover:text-green-800 font-medium transition-colors">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
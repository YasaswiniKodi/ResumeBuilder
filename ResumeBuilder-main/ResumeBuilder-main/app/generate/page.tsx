'use client'

import { useState } from 'react'

export default function Generate() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    setMessage('')
    const response = await fetch('/api/generate', {
      method: 'POST',
    })
    if (response.ok) {
      const data = await response.json()
      setMessage('Resume generated successfully! Go to Preview to view it.')
    } else {
      const error = await response.json()
      setMessage(error.error || 'Failed to generate resume.')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🤖</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Generate Your Resume</h1>
            <p className="text-gray-600 mt-2">Let AI create a customized resume based on your profile and the job description</p>
          </div>

          <div className="text-center mb-8">
            <p className="text-lg text-gray-700 mb-6">
              Click the button below to generate your customized resume using AI based on your profile and the job description.
            </p>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Resume...
                </>
              ) : (
                <>
                  <span className="mr-2">🚀</span>
                  Generate Resume
                </>
              )}
            </button>
          </div>

          {message && (
            <div className={`p-4 rounded-lg text-center ${message.includes('successfully') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              {message}
            </div>
          )}

          <div className="mt-8 text-center">
            <a href="/" className="text-purple-600 hover:text-purple-800 font-medium transition-colors">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
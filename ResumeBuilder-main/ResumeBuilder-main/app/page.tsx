export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">AI-Powered Resume Builder</h1>
          <p className="text-xl text-gray-600">Create professional resumes tailored to job descriptions using advanced AI</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a
            href="/profile"
            className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-blue-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl">👤</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile</h2>
              <p className="text-gray-600 text-sm">Enter your personal details, skills, and projects</p>
              <div className="mt-4 text-blue-500 group-hover:text-blue-600 font-medium">Get Started →</div>
            </div>
          </a>

          <a
            href="/job-description"
            className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-green-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <span className="text-2xl">📄</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Job Description</h2>
              <p className="text-gray-600 text-sm">Paste the job description to analyze</p>
              <div className="mt-4 text-green-500 group-hover:text-green-600 font-medium">Analyze →</div>
            </div>
          </a>

          <a
            href="/generate"
            className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-purple-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <span className="text-2xl">🤖</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Generate Resume</h2>
              <p className="text-gray-600 text-sm">Use AI to create your customized resume</p>
              <div className="mt-4 text-purple-500 group-hover:text-purple-600 font-medium">Generate →</div>
            </div>
          </a>

          <a
            href="/preview"
            className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-red-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                <span className="text-2xl">📋</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Preview & Export</h2>
              <p className="text-gray-600 text-sm">Review your resume and export to PDF</p>
              <div className="mt-4 text-red-500 group-hover:text-red-600 font-medium">View →</div>
            </div>
          </a>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">Follow the steps in order to create your perfect resume</p>
        </div>
      </div>
    </main>
  )
}
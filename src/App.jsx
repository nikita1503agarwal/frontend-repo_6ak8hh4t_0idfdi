import Header from './components/Header'
import StudentForm from './components/StudentForm'
import CourseForm from './components/CourseForm'
import ResultEntry from './components/ResultEntry'
import Transcript from './components/Transcript'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)]"></div>

      <div className="relative min-h-screen p-6 md:p-10">
        <Header />

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
            <h2 className="text-white font-semibold mb-4">Add Student</h2>
            <StudentForm onCreated={() => {}} />
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
            <h2 className="text-white font-semibold mb-4">Add Course</h2>
            <CourseForm onCreated={() => {}} />
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl md:col-span-2">
            <h2 className="text-white font-semibold mb-4">Enter Result</h2>
            <ResultEntry onCreated={() => {}} />
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl md:col-span-2">
            <h2 className="text-white font-semibold mb-4">Student Transcript</h2>
            <Transcript />
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-blue-300/60">Use the panels above to manage students, courses, results, and view transcripts.</p>
        </div>
      </div>
    </div>
  )
}

export default App

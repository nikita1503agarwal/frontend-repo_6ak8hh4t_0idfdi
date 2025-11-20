import { useEffect, useState } from 'react'

export default function Transcript() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [students, setStudents] = useState([])
  const [studentId, setStudentId] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${baseUrl}/api/students`).then(r => r.json()).then(setStudents)
  }, [baseUrl])

  const loadTranscript = async () => {
    if (!studentId) return
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/students/${studentId}/transcript`)
      const json = await res.json()
      setData(json)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <select value={studentId} onChange={(e) => setStudentId(e.target.value)} className="input">
          <option value="">Select Student</option>
          {students.map(s => (
            <option key={s._id} value={s._id}>{s.first_name} {s.last_name} • {s.roll_number}</option>
          ))}
        </select>
        <button onClick={loadTranscript} className="btn-secondary">{loading ? 'Loading...' : 'View Transcript'}</button>
      </div>

      {data && (
        <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
          <div className="mb-3">
            <h3 className="text-white font-semibold">{data.student.first_name} {data.student.last_name}</h3>
            <p className="text-blue-200 text-sm">Roll: {data.student.roll_number} • Class: {data.student.class_name} • Year: {data.student.year}</p>
          </div>
          <div className="divide-y divide-slate-700">
            {data.results.map((r, idx) => (
              <div key={idx} className="py-2 flex items-center justify-between text-blue-100">
                <div>
                  <p className="font-medium">{r.course_code} — {r.course_title}</p>
                  <p className="text-sm opacity-80">Credits: {r.credits}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{r.marks} / 100</p>
                  <p className="text-sm">Grade: {r.grade} • GP: {r.grade_point}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-white font-semibold">GPA: {data.gpa}</div>
        </div>
      )}
    </div>
  )
}

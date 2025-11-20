import { useEffect, useState } from 'react'

export default function ResultEntry({ onCreated }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [form, setForm] = useState({ student_id: '', course_id: '', marks: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const [s, c] = await Promise.all([
          fetch(`${baseUrl}/api/students`).then(r => r.json()),
          fetch(`${baseUrl}/api/courses`).then(r => r.json()),
        ])
        setStudents(s)
        setCourses(c)
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [baseUrl])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/results`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, marks: Number(form.marks) })
      })
      if (!res.ok) {
        const t = await res.text()
        throw new Error(t || 'Failed to enter result')
      }
      const data = await res.json()
      onCreated && onCreated(data)
      setForm({ student_id: '', course_id: '', marks: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select name="student_id" value={form.student_id} onChange={handleChange} className="input" required>
          <option value="">Select Student</option>
          {students.map(s => (
            <option key={s._id} value={s._id}>{s.first_name} {s.last_name} • {s.roll_number}</option>
          ))}
        </select>
        <select name="course_id" value={form.course_id} onChange={handleChange} className="input" required>
          <option value="">Select Course</option>
          {courses.map(c => (
            <option key={c._id} value={c._id}>{c.code} • {c.title}</option>
          ))}
        </select>
        <input type="number" min="0" max="100" name="marks" value={form.marks} onChange={handleChange} placeholder="Marks / 100" className="input" required />
      </div>
      {error && <p className="text-red-300 text-sm whitespace-pre-wrap">{error}</p>}
      <button disabled={loading} className="btn-primary w-full">{loading ? 'Saving...' : 'Save Result'}</button>
    </form>
  )
}

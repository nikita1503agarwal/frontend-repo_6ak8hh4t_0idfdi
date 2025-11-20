import { useState } from 'react'

export default function StudentForm({ onCreated }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({ first_name: '', last_name: '', roll_number: '', class_name: '', year: new Date().getFullYear(), email: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, year: Number(form.year) })
      })
      if (!res.ok) throw new Error('Failed to create student')
      const data = await res.json()
      onCreated && onCreated(data.id)
      setForm({ first_name: '', last_name: '', roll_number: '', class_name: '', year: new Date().getFullYear(), email: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="First name" className="input" required />
        <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Last name" className="input" required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input name="roll_number" value={form.roll_number} onChange={handleChange} placeholder="Roll number" className="input" required />
        <input name="class_name" value={form.class_name} onChange={handleChange} placeholder="Class / Grade" className="input" required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input type="number" name="year" value={form.year} onChange={handleChange} placeholder="Year" className="input" required />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email (optional)" className="input" />
      </div>
      {error && <p className="text-red-300 text-sm">{error}</p>}
      <button disabled={loading} className="btn-primary w-full">{loading ? 'Adding...' : 'Add Student'}</button>
    </form>
  )
}

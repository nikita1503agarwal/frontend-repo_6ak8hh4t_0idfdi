import { useState } from 'react'

export default function CourseForm({ onCreated }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({ code: '', title: '', credits: 3 })
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
      const res = await fetch(`${baseUrl}/api/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, credits: Number(form.credits) })
      })
      if (!res.ok) throw new Error('Failed to create course')
      const data = await res.json()
      onCreated && onCreated(data.id)
      setForm({ code: '', title: '', credits: 3 })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <input name="code" value={form.code} onChange={handleChange} placeholder="Code" className="input col-span-1" required />
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="input col-span-2" required />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <input type="number" step="0.5" min="0" name="credits" value={form.credits} onChange={handleChange} placeholder="Credits" className="input col-span-1" required />
      </div>
      {error && <p className="text-red-300 text-sm">{error}</p>}
      <button disabled={loading} className="btn-primary w-full">{loading ? 'Adding...' : 'Add Course'}</button>
    </form>
  )
}

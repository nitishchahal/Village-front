
import React from 'react'
import { useParams } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL
const token = () => localStorage.getItem('ve_token')

export default function Village() {
  const { id } = useParams()
  const [village, setVillage] = React.useState(null)
  const [queries, setQueries] = React.useState([])
  const [form, setForm] = React.useState({ title:'', description:'' })
  const [comment, setComment] = React.useState('')

  const load = async () => {
    const vres = await fetch(`${API}/api/villages/${id}`, { headers: { Authorization: `Bearer ${token()}` } })
    const vdata = await vres.json()
    if (vres.ok) setVillage(vdata)
    const qres = await fetch(`${API}/api/queries/village/${id}`, { headers: { Authorization: `Bearer ${token()}` } })
    const qdata = await qres.json()
    if (qres.ok) setQueries(qdata)
  }
  React.useEffect(()=>{ load() }, [id])

  const postQuery = async (e) => {
    e.preventDefault()
    const res = await fetch(`${API}/api/queries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ ...form, villageId: id })
    })
    if (res.ok) { setForm({ title:'', description:'' }); load() }
  }

  const react = async (qid, type) => {
    await fetch(`${API}/api/queries/${qid}/react`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ type })
    })
    load()
  }

  const addComment = async (qid) => {
    if (!comment.trim()) return
    await fetch(`${API}/api/queries/${qid}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ text: comment })
    })
    setComment('')
    load()
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{village ? village.name : 'Village'}</h1>

      <form onSubmit={postQuery} className="card space-y-3">
        <h2 className="text-xl font-semibold">Post a Query</h2>
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <button className="btn">Post</button>
      </form>

      <div className="space-y-4">
        {queries.map(q => (
          <div key={q._id} className="card space-y-2">
            <div className="font-semibold">{q.title}</div>
            <div className="text-gray-700">{q.description}</div>
            <div className="text-sm text-gray-500">by {q.user?.name}</div>
            <div className="space-x-2">
              <button className="btn" onClick={()=>react(q._id, 'like')}>Like</button>
              <button className="btn" onClick={()=>react(q._id, 'dislike')}>Dislike</button>
            </div>
            <div className="flex gap-2 pt-2">
              <input className="flex-1" placeholder="Comment..." value={comment} onChange={e=>setComment(e.target.value)} />
              <button className="btn" onClick={()=>addComment(q._id)} type="button">Send</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

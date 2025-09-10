
import React from 'react'

const API = import.meta.env.VITE_API_URL
const token = () => localStorage.getItem('ve_token')

export default function Admin() {
  const [users, setUsers] = React.useState([])
  const [villages, setVillages] = React.useState([])

  const load = async () => {
    const ur = await fetch(`${API}/api/admin/users`, { headers: { Authorization: `Bearer ${token()}` } })
    const u = await ur.json()
    if (ur.ok) setUsers(u)
    const vr = await fetch(`${API}/api/admin/villages`, { headers: { Authorization: `Bearer ${token()}` } })
    const v = await vr.json()
    if (vr.ok) setVillages(v)
  }
  React.useEffect(()=>{ load() }, [])

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2">
      <div className="card">
        <h2 className="text-xl font-semibold">Users</h2>
        <ul className="space-y-2 mt-2">
          {users.map(u => (
            <li key={u._id} className="flex justify-between">
              <span>{u.name} • {u.email} • {u.role}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold">Villages</h2>
        <ul className="space-y-2 mt-2">
          {villages.map(v => (
            <li key={v._id} className="flex justify-between">
              <span>{v.name} • {v.location} • head: {v.head?.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

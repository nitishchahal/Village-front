import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const API = import.meta.env.VITE_API_URL;
const token = () => localStorage.getItem("ve_token");

export default function Dashboard() {
  const { user } = React.useContext(AuthContext);
  const [villages, setVillages] = React.useState([]);
  const [createForm, setCreateForm] = React.useState({
    name: "",
    population: "",
    location: "",
  });
  const [inviteCode, setInviteCode] = React.useState("");
  const [newVillageCode, setNewVillageCode] = React.useState("");
  const [error, setError] = React.useState("");

  const loadVillages = async () => {
    try {
      const res = await fetch(`${API}/api/villages`, {
        headers: { Authorization: `Bearer ${token()}` },
      });
      const data = await res.json();
      if (res.ok) setVillages(data);
      else throw new Error(data.message || "Failed to load villages");
    } catch (err) {
      setError(err.message);
    }
  };

  React.useEffect(() => {
    loadVillages();
  }, []);

  // ---------------- Create Village ----------------
  const createVillage = async (e) => {
    e.preventDefault();
    setError("");
    setNewVillageCode("");
    try {
      const res = await fetch(`${API}/api/villages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify({
          ...createForm,
          population: Number(createForm.population),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create village");
      setNewVillageCode(data.village.inviteCode);
      setCreateForm({ name: "", population: "", location: "" });
      loadVillages();
    } catch (err) {
      setError(err.message);
    }
  };

  // ---------------- Generate Invite Code ----------------
  const generateCode = async (villageId) => {
    setError("");
    try {
      const res = await fetch(`${API}/api/villages/generate-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify({ villageId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to generate code");
      alert(`Invite Code: ${data.inviteCode}`);
    } catch (err) {
      setError(err.message);
    }
  };

  // ---------------- Join Village ----------------
  const joinVillage = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API}/api/villages/join/${inviteCode}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token()}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid code");
      alert(`🎉 Joined ${data.villageName}`);
      setInviteCode("");
      loadVillages();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Village Dashboard</h1>
        <div className="space-x-2">
          {user?.role === "admin" && (
            <Link className="btn bg-gray-800 text-white" to="/admin">
              Admin Panel
            </Link>
          )}
          {user?.role === "head" && (
            <Link className="btn bg-green-600 text-white" to="/villages/manage">
              Manage Villages
            </Link>
          )}
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Villages List */}
        <div className="card space-y-4">
          <h2 className="text-xl font-semibold">Villages</h2>
          <ul className="space-y-2">
            {villages.map((v) => (
              <li
                key={v._id}
                className="flex items-center justify-between border p-3 rounded"
              >
                <div>
                  <div className="font-medium">{v.name}</div>
                  <div className="text-sm text-gray-600">
                    {v.location} • {v.population} people
                  </div>
                </div>
                <div className="flex gap-2">
                  {user?.role === "head" && (
                    <button
                      className="btn bg-green-600 text-white"
                      onClick={() => generateCode(v._id)}
                    >
                      Generate Invite
                    </button>
                  )}
                  <Link
                    to={`/village/${v._id}`}
                    className="btn bg-blue-600 text-white"
                  >
                    Open
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {user?.role === "head" && (
            <form onSubmit={createVillage} className="card space-y-3">
              <h2 className="text-xl font-semibold">Create Village</h2>
              {error && <div className="text-red-600">{error}</div>}
              <input
                placeholder="Name"
                value={createForm.name}
                onChange={(e) =>
                  setCreateForm({ ...createForm, name: e.target.value })
                }
                className="input"
              />
              <input
                placeholder="Population"
                value={createForm.population}
                onChange={(e) =>
                  setCreateForm({ ...createForm, population: e.target.value })
                }
                className="input"
              />
              <input
                placeholder="Location"
                value={createForm.location}
                onChange={(e) =>
                  setCreateForm({ ...createForm, location: e.target.value })
                }
                className="input"
              />
              <button className="btn bg-green-600 text-white">Create</button>
              {newVillageCode && (
                <div className="mt-2 text-green-700">
                  Invite Code: <b>{newVillageCode}</b>
                </div>
              )}
            </form>
          )}

          {user?.role === "user" && (
            <form onSubmit={joinVillage} className="card space-y-3">
              <h2 className="text-xl font-semibold">Join via Invite Code</h2>
              {error && <div className="text-red-600">{error}</div>}
              <input
                placeholder="Invite Code"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="input"
              />
              <button className="btn bg-blue-600 text-white">Join</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

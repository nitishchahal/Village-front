// src/pages/VillageMembers.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ use context

const API = import.meta.env.VITE_API_URL;

export default function VillageMembers() {
  const { id } = useParams(); // village id from URL
  const { token } = useAuth(); // ✅ get token from context
  const [members, setMembers] = useState([]);
  const [villageName, setVillageName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(`${API}/api/villages/${id}/members`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ attach token
          },
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText || "Failed to load members");
        }

        const data = await res.json();
        setMembers(data.members || []);
        setVillageName(data.villageName || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchMembers();
    } else {
      setError("You must be logged in to view members.");
      setLoading(false);
    }
  }, [id, token]);

  if (loading) return <div className="p-6">Loading members...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Members of {villageName || "Village"}
      </h1>

      {members.length === 0 ? (
        <p className="text-gray-600">No members found.</p>
      ) : (
        <ul className="space-y-2">
          {members.map((m) => (
            <li
              key={m._id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{m.name}</div>
                <div className="text-gray-600 text-sm">{m.email}</div>
              </div>
              <span className="px-2 py-1 text-sm rounded bg-gray-100">
                {m.role}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

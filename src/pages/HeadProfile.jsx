// src/pages/HeadProfile.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const API = import.meta.env.VITE_API_URL;
const token = () => localStorage.getItem("ve_token");

export default function HeadProfile() {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API}/api/users/me`, {
          headers: { Authorization: `Bearer ${token()}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfileData(data);
      } catch (err) {
        console.error("Error fetching head profile:", err);
      }
    };
    fetchProfile();
  }, []);

  if (!profileData) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold">
          {profileData.name[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{profileData.name}</h1>
          <p className="text-gray-600">{profileData.email}</p>
        </div>
      </div>

      <div className="card p-4">
        <h2 className="text-xl font-semibold mb-2">Additional Info (Optional)</h2>
        <p>You can add a profile photo, bio, or other details later.</p>
      </div>
    </div>
  );
}

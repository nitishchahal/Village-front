// src/pages/UserProfile.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const API = import.meta.env.VITE_API_URL;
const token = () => localStorage.getItem("ve_token");

export default function UserProfile() {
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
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  if (!profileData) return <div>Loading...</div>;

  const firstLetter = profileData.name ? profileData.name[0].toUpperCase() : "?";

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        {profileData.avatar ? (
          <img
            src={profileData.avatar}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold">
            {firstLetter}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold">{profileData.name}</h1>
          <p className="text-gray-600">{profileData.email}</p>
          {profileData.bio && <p className="text-gray-500 mt-1">{profileData.bio}</p>}
        </div>
      </div>

    {profileData.villages?.length > 0 && (
  <div className="card p-4">
    <h2 className="text-xl font-semibold mb-2">Villages Joined</h2>
    {profileData.villages.map((v) => (
      <div key={v._id} className="border p-2 rounded mb-2">
        <div className="font-medium">{v.name}</div>
        <div className="text-gray-600 text-sm">{v.location}</div>
        {v.joinedViaInvite && (
          <span className="text-green-600 text-sm font-medium">Joined via Invite</span>
        )}
        {/* Display village members */}
        {v.users?.length > 0 && (
          <div className="mt-2 text-gray-700 text-sm">
            <div className="font-medium">Members:</div>
            <ul className="ml-4 list-disc">
              {v.users.map((u) => (
                <li key={u._id}>{u.name} ({u.email})</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ))}
  </div>
)}


      {/* Additional Info */}
      <div className="card p-4">
        <h2 className="text-xl font-semibold mb-2">Additional Info (Optional)</h2>
        <p>You can add a profile photo, bio, or other details later.</p>
      </div>
    </div>
  );
}

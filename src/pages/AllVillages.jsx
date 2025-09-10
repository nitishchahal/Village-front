import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BiMap } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;

export default function AllVillages() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [villages, setVillages] = useState([]);

  useEffect(() => {
    if (!user) {
      alert("You need to login or register first!");
      navigate("/login");
      return;
    }

    const loadVillages = async () => {
      try {
        const token = localStorage.getItem("ve_token");
        const res = await fetch(`${API}/api/villages`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          alert("Unauthorized! Please login again.");
          navigate("/login");
          return;
        }

        const data = await res.json();
        if (res.ok) setVillages(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load villages. Try again later.");
      }
    };

    loadVillages();
  }, [user, navigate]);

  const handleView = (id) => {
    navigate(`/village/${id}`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-8 text-center">
        All Villages
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {villages.map((v) => (
          <div
            key={v._id}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={v.imageUrl}
              alt={v.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{v.name}</h2>
            <p className="text-gray-600 flex items-center gap-2 mb-1">
              <BiMap className="w-5 h-5 text-blue-500" />
              {v.location}
            </p>
            <p className="text-gray-600 flex items-center gap-2 mb-4">
              <FaUsers className="w-5 h-5 text-blue-500" />
              {v.population} people
            </p>
            <button
              onClick={() => handleView(v._id)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-colors duration-300"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

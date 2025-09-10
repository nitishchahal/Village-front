// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("ve_token");

  if (!token) {
    alert("You need to login or register first!"); // popup message
    return <Navigate to="/login" replace />;
  }

  return children;
}

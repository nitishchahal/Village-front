import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Village from './pages/Village.jsx'
import Admin from './pages/Admin.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import All_Villages from './pages/AllVillages.jsx'
import Contact from './pages/Contact.jsx'
import UserProfile from './pages/UserProfile.jsx'
import HeadProfile from './pages/HeadProfile.jsx'
import VillageMembers from './pages/VillageMembers.jsx'

import Navbar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'

import { AuthProvider } from './context/AuthContext.jsx'

const Private = ({ children }) => {
  const token = localStorage.getItem('ve_token')
  return token ? children : <Navigate to="/login" replace />
}

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/villages" element={<All_Villages />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
        <Route path="/village/:id/members" element={<VillageMembers />} />

        <Route path="/village/:id" element={<Private><Village /></Private>} />
        <Route path="/admin" element={<Private><Admin /></Private>} />

        {/* Profile Routes */}
        <Route path="/user-profile" element={<Private><UserProfile /></Private>} />
        <Route path="/head-profile" element={<Private><HeadProfile /></Private>} />

        <Route path="*" element={<div className="p-8">Not Found</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </AuthProvider>
)

export default App

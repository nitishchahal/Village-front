import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// React Icons imports
import { FaHome, FaMapMarkedAlt, FaInfoCircle, FaEnvelope, FaTachometerAlt, FaUser, FaCog, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { name: 'Home', to: '/', icon: FaHome, userOnly: false },
    { name: 'All Villages', to: '/villages', icon: FaMapMarkedAlt, userOnly: false },
    { name: 'About', to: '/about', icon: FaInfoCircle, userOnly: false },
    { name: 'Contact', to: '/contact', icon: FaEnvelope, userOnly: false },
    { name: 'Dashboard', to: '/dashboard', icon: FaTachometerAlt, userOnly: true },
  ];

  const userLinks = [
    { name: 'My Profile', to: user?.role === 'head' ? '/head-profile' : '/user-profile', icon: FaUser, userOnly: true },
    { name: 'Settings', to: '/settings', icon: FaCog, userOnly: true },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-4 shadow-xl rounded-b-3xl relative z-50">
      <div className="container mx-auto flex justify-between items-center relative z-20 px-4 py-2">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold tracking-wide mr-8 transform hover:scale-105 transition duration-300 ease-in-out">
            Village Explorer
          </Link>
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              (!link.userOnly || user) && (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center space-x-2 text-sm lg:text-base font-medium opacity-80 hover:opacity-100 transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              )
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white focus:outline-none transition-transform duration-300 ease-in-out transform hover:scale-110"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FaTimes className="w-8 h-8" /> : <FaBars className="w-8 h-8" />}
          </button>

          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login" className="modern-button">Login</Link>
                <Link to="/register" className="modern-button">Register</Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 cursor-pointer focus:outline-none transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-700 font-bold shadow-lg transition-transform duration-300 ease-in-out hover:rotate-6">
                    {user.name[0].toUpperCase()}
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-blue-600 rounded-xl shadow-2xl flex flex-col z-10 p-2 transform scale-95 origin-top-right animate-scale-in">
                    {userLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="px-4 py-2 flex items-center space-x-2 hover:bg-blue-100 rounded-lg transition duration-200"
                      >
                        <link.icon className="w-5 h-5" />
                        <span>{link.name}</span>
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 mt-2 text-left flex items-center space-x-2 text-red-500 hover:bg-red-50 rounded-lg transition duration-200"
                    >
                      <FaSignOutAlt className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className={`md:hidden absolute top-full left-0 right-0 z-40 bg-blue-800 bg-opacity-90 backdrop-blur-sm shadow-xl transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100 p-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="flex flex-col items-center space-y-4">
          {navLinks.map((link) => (
            (!link.userOnly || user) && (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 text-lg font-medium hover:text-gray-200 transition duration-300 transform hover:scale-105"
              >
                {link.name}
              </Link>
            )
          ))}
          {!user && (
            <>
              <Link to="/login" className="w-full text-center modern-button-mobile">Login</Link>
              <Link to="/register" className="w-full text-center modern-button-mobile">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

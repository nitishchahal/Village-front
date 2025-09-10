import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('ve_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('ve_token') || null);

  useEffect(() => {
    const raw = localStorage.getItem('ve_user');
    const savedToken = localStorage.getItem('ve_token');
    if (raw && savedToken) {
      setUser(JSON.parse(raw));
      setToken(savedToken);
    }
  }, []);

  const login = (payload) => {
    if (!payload?.user || !payload?.token) return;
    localStorage.setItem('ve_token', payload.token);
    localStorage.setItem('ve_user', JSON.stringify(payload.user));
    setUser(payload.user);
    setToken(payload.token);
  };

  const logout = () => {
    localStorage.removeItem('ve_token');
    localStorage.removeItem('ve_user');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);

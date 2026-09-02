import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Ensure axios sends credentials (cookies) on all requests
axios.defaults.withCredentials = true;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || null);
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  // Check auth session from backend on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get('/api/auth/me', { headers });
        if (res.data.success && res.data.data?.user) {
          setAdminUser(res.data.data.user);
        }
      } catch (err) {
        // Token expired or unauthenticated
        setToken(null);
        setAdminUser(null);
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  const login = (authToken, user) => {
    setToken(authToken);
    setAdminUser(user);
    if (authToken) localStorage.setItem('admin_token', authToken);
    if (user) localStorage.setItem('admin_user', JSON.stringify(user));
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (e) {}
    setToken(null);
    setAdminUser(null);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  };

  return (
    <AuthContext.Provider value={{ token, adminUser, login, logout, isAuthenticated: Boolean(adminUser || token), loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

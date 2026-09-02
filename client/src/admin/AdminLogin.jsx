import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, Mail, AlertCircle, Car, ArrowRight } from 'lucide-react';
import axios from 'axios';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@punemumbaicabs.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Send login request to MERN Auth endpoint
      const res = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
      if (res.data.success) {
        const token = res.data.data.token;
        const user = res.data.data.user;
        login(token, user);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      try {
        // Fallback to /api/admin/login
        const fallbackRes = await axios.post('/api/admin/login', { email, password }, { withCredentials: true });
        if (fallbackRes.data.success) {
          const token = fallbackRes.data.data?.token || fallbackRes.data.token;
          const user = fallbackRes.data.data?.user || fallbackRes.data.user;
          login(token, user);
          navigate('/admin/dashboard');
          return;
        }
      } catch (e) {}
      setError(err.response?.data?.message || 'Login failed. Please check admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 w-screen h-screen min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 overflow-y-auto m-0"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(8, 12, 22, 0.96) 0%, rgba(8, 12, 22, 0.88) 50%, rgba(8, 12, 22, 0.65) 100%), url('/images/hero-bg.jpg')`
      }}
    >
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl relative z-10 my-auto">
        
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2 text-amber-400 font-extrabold text-xl tracking-wide mb-2">
            <Car className="w-7 h-7 text-amber-400" />
            <span className="text-white">Pune<span className="text-amber-400">↔</span>Mumbai Cabs</span>
          </Link>
          <div className="w-12 h-12 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin CMS Authentication</h1>
          <p className="text-xs text-slate-400">MERN Stack secure access for cab business administrators</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-3 text-sm text-white focus:border-amber-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-3 text-sm text-white focus:border-amber-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 text-sm uppercase tracking-wider cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Admin Panel'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400 font-semibold pt-2 border-t border-slate-800/80">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Protected by Encrypted JWT & HTTP-Only Secure Session</span>
        </div>

        <div className="text-center pt-2">
          <Link to="/" title="Return to Pune Mumbai Cabs Public Website" className="text-xs text-slate-400 hover:text-amber-400 transition-colors font-semibold">
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}

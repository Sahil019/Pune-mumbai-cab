import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Route as RouteIcon, RefreshCw, CheckCircle, AlertCircle, MapPin, Clock } from 'lucide-react';
import axios from 'axios';

export default function AdminRoutes() {
  const { token } = useAuth();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/admin/routes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setRoutes(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load routes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <RouteIcon className="w-6 h-6 text-emerald-400" />
            <span>Intercity Route Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Active service corridors connecting Pune and Mumbai destinations.
          </p>
        </div>

        <button
          onClick={fetchRoutes}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3.5 py-2 rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 p-8 text-center text-slate-400 bg-slate-900 rounded-xl border border-slate-800">
            Loading intercity routes...
          </div>
        ) : (
          routes.map((r) => (
            <div key={r.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 shadow-xl">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">{r.origin} ↔ {r.destination}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{r.name}</h3>
                  <code className="text-xs text-slate-500 font-mono">/{r.slug}</code>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                  {r.status || 'Active'}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{r.description}</p>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
                <div className="flex items-center space-x-2 text-slate-400">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Distance: <strong className="text-white">{r.distance} KM</strong></span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Time: <strong className="text-white">{r.travel_time}</strong></span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

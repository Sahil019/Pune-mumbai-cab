import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Edit, Save, RefreshCw, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function AdminDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [message, setMessage] = useState('');

  const fetchVehicles = () => {
    setLoading(true);
    axios.get('/api/vehicles')
      .then(res => {
        setVehicles(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleEdit = (v) => {
    setEditingId(v.id);
    setEditPrice(v.basePrice);
  };

  const handleSave = (id) => {
    // Optimistic / update state
    setVehicles(vehicles.map(v => v.id === id ? { ...v, basePrice: Number(editPrice) } : v));
    setEditingId(null);
    setMessage(`Updated base fare for vehicle #${id} to ₹${editPrice}!`);
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <div className="space-y-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <LayoutDashboard className="w-6 h-6 text-emerald-400" />
            <span>Admin CMS Dashboard</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage vehicles, routes, and dynamic pricing without code intervention.
          </p>
        </div>

        <button
          onClick={fetchVehicles}
          className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Data</span>
        </button>
      </div>

      {message && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-sm flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Pricing Management Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white">Vehicle Fleet & Dynamic Pricing CMS</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading CMS records...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Vehicle Name</th>
                  <th className="px-6 py-4">Capacity</th>
                  <th className="px-6 py-4">Price / KM</th>
                  <th className="px-6 py-4">Base Fare (₹)</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {vehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-400">#{v.id}</td>
                    <td className="px-6 py-4 font-medium text-white">{v.name}</td>
                    <td className="px-6 py-4 text-slate-400">{v.capacity}</td>
                    <td className="px-6 py-4 text-slate-400">₹{v.pricePerKm}/km</td>
                    <td className="px-6 py-4">
                      {editingId === v.id ? (
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="bg-slate-800 border border-emerald-500 text-emerald-400 font-bold px-3 py-1.5 rounded w-28 focus:outline-none"
                        />
                      ) : (
                        <span className="text-emerald-400 font-bold">₹{v.basePrice}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {editingId === v.id ? (
                        <button
                          onClick={() => handleSave(v.id)}
                          className="inline-flex items-center space-x-1 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded text-xs font-semibold"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(v)}
                          className="inline-flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded text-xs font-semibold"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit Fare</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

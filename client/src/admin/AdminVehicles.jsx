import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Car, Plus, Trash2, Edit2, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import axios from 'axios';

export default function AdminVehicles() {
  const { token } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    slug: '',
    seating_capacity: '4+1',
    description: '',
    base_price: 2999,
    status: 'active'
  });

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/admin/vehicles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setVehicles(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load vehicles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/vehicles', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setMessage('New vehicle added successfully!');
        setForm({ name: '', slug: '', seating_capacity: '4+1', description: '', base_price: 2999, status: 'active' });
        fetchVehicles();
        setTimeout(() => setMessage(''), 4000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add vehicle.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deactivate/delete this vehicle?')) return;
    try {
      await axios.delete(`/api/admin/vehicles/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Vehicle deleted/deactivated.');
      fetchVehicles();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete vehicle.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Car className="w-6 h-6 text-emerald-400" />
            <span>Fleet Vehicles CMS</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Add, edit, or deactivate cabs in the fleet database.</p>
        </div>
        <button
          onClick={fetchVehicles}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3.5 py-2 rounded-lg flex items-center space-x-1.5 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {message && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-sm flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Add Vehicle Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Plus className="w-5 h-5 text-emerald-400" />
          <span>Add New Fleet Vehicle</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-slate-300 mb-1">Vehicle Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Swift Dzire / Etios"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">Slug *</label>
            <input
              type="text"
              required
              placeholder="e.g. sedan-dzire"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">Seating Capacity *</label>
            <input
              type="text"
              required
              placeholder="e.g. 4+1 Seats"
              value={form.seating_capacity}
              onChange={(e) => setForm({ ...form, seating_capacity: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
        >
          Add Vehicle to Fleet
        </button>
      </form>

      {/* Fleet Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white">Current Fleet Vehicles</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Seating</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-800/40">
                  <td className="px-6 py-4 font-semibold text-white">{v.name}</td>
                  <td className="px-6 py-4 text-slate-400">{v.slug}</td>
                  <td className="px-6 py-4 text-emerald-400">{v.seating_capacity}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded font-semibold ${v.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'}`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(v.id)}
                      className="bg-slate-800 hover:bg-red-500/20 text-red-400 border border-slate-700 px-3 py-1.5 rounded text-xs font-semibold"
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

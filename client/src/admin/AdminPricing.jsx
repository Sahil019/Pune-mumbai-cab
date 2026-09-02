import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { DollarSign, Edit3, Save, X, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function AdminPricing() {
  const { token } = useAuth();
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ one_way_price: '', round_trip_price: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchPricing = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/admin/pricing', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setPricing(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load pricing records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditForm({
      one_way_price: item.one_way_price,
      round_trip_price: item.round_trip_price
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleSave = async (id) => {
    setSaving(true);
    setError('');
    try {
      const res = await axios.put(
        `/api/admin/pricing/${id}`,
        {
          one_way_price: Number(editForm.one_way_price),
          round_trip_price: Number(editForm.round_trip_price)
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setMessage('Pricing updated in database! Public website now reflects this new rate.');
        setEditingId(null);
        fetchPricing();
        setTimeout(() => setMessage(''), 5000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update pricing.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <DollarSign className="w-6 h-6 text-emerald-400" />
            <span>Dynamic Route Pricing CMS</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Update pricing per route and vehicle. Database changes instantly update the public website.
          </p>
        </div>

        <button
          onClick={fetchPricing}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3.5 py-2 rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
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

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading route pricing matrix...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Route</th>
                  <th className="px-6 py-4">Vehicle</th>
                  <th className="px-6 py-4">One-Way Fare (₹)</th>
                  <th className="px-6 py-4">Round-Trip Fare (₹)</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {pricing.map((p) => {
                  const routeName = p.route?.name || p.routes?.name || 'Pune to Mumbai Cab';
                  const vehicleName = p.vehicle?.name || p.vehicles?.name || 'Cab';
                  const isEditing = editingId === p.id;

                  return (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 font-semibold text-white">{routeName}</td>
                      <td className="px-6 py-4 text-emerald-400 font-medium">{vehicleName}</td>
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editForm.one_way_price}
                            onChange={(e) => setEditForm({ ...editForm, one_way_price: e.target.value })}
                            className="bg-slate-950 border border-emerald-500 text-emerald-400 font-bold px-3 py-1 rounded w-32 focus:outline-none"
                          />
                        ) : (
                          <span className="font-extrabold text-white">₹{p.one_way_price}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editForm.round_trip_price}
                            onChange={(e) => setEditForm({ ...editForm, round_trip_price: e.target.value })}
                            className="bg-slate-950 border border-emerald-500 text-emerald-400 font-bold px-3 py-1 rounded w-32 focus:outline-none"
                          />
                        ) : (
                          <span className="font-bold text-slate-300">₹{p.round_trip_price}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {isEditing ? (
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleSave(p.id)}
                              disabled={saving}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center space-x-1 cursor-pointer"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>{saving ? 'Saving...' : 'Save'}</span>
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1.5 rounded text-xs cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => startEdit(p)}
                            className="bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1.5 ml-auto cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Fare</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

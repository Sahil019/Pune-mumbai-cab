import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, RefreshCw, CheckCircle, AlertCircle, Phone, Mail, Calendar, MapPin, User, Tag } from 'lucide-react';
import axios from 'axios';

export default function AdminEnquiries() {
  const { token } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/admin/enquiries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setEnquiries(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load enquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(
        `/api/admin/enquiries/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setMessage(`Enquiry #${id.slice(0, 8)} status updated to "${newStatus}".`);
        fetchEnquiries();
        setTimeout(() => setMessage(''), 4000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status.');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Contacted': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Confirmed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Closed': return 'bg-slate-700/50 text-slate-400 border-slate-700';
      default: return 'bg-slate-800 text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <MessageSquare className="w-6 h-6 text-emerald-400" />
            <span>Customer Booking Enquiries CMS</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track, contact, and manage Pune ↔ Mumbai cab reservation requests in real-time.
          </p>
        </div>

        <button
          onClick={fetchEnquiries}
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

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading customer enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No enquiries submitted yet.</div>
        ) : (
          <div className="divide-y divide-slate-800">
            {enquiries.map((e) => (
              <div key={e.id} className="p-6 space-y-4 hover:bg-slate-800/20 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-white text-base">{e.name}</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusBadge(e.status)}`}>
                      {e.status}
                    </span>
                    <span className="text-xs text-slate-500">{new Date(e.created_at).toLocaleString()}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-400">Change Status:</span>
                    <select
                      value={e.status}
                      onChange={(evt) => handleStatusChange(e.id, evt.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs font-semibold text-white px-2.5 py-1.5 rounded focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 bg-slate-950 p-4 rounded-lg border border-slate-800/80">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5"><Phone className="w-3.5 h-3.5 text-emerald-400" /> <span className="font-semibold">{e.mobile_number}</span></div>
                    {e.email && <div className="flex items-center space-x-1.5"><Mail className="w-3.5 h-3.5 text-slate-500" /> <span>{e.email}</span></div>}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> <span>From: {e.pickup_location}</span></div>
                    <div className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-red-400" /> <span>To: {e.drop_location}</span></div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> <span>Date: {e.travel_date} ({e.travel_time})</span></div>
                    <div className="flex items-center space-x-1.5"><Tag className="w-3.5 h-3.5 text-slate-400" /> <span>Type: {e.trip_type} ({e.number_of_passengers} pax)</span></div>
                  </div>
                </div>

                {e.message && (
                  <p className="text-xs text-slate-400 italic bg-slate-950/40 p-2.5 rounded border border-slate-900">
                    "{e.message}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

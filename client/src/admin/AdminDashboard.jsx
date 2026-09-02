import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Car, MapPin, DollarSign, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    vehiclesCount: 0,
    routesCount: 0,
    enquiriesCount: 0,
    newEnquiriesCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [vRes, rRes, eRes] = await Promise.all([
          axios.get('/api/admin/vehicles', { headers }),
          axios.get('/api/admin/routes', { headers }),
          axios.get('/api/admin/enquiries', { headers })
        ]);

        const vehicles = vRes.data.data || [];
        const routes = rRes.data.data || [];
        const enquiries = eRes.data.data || [];

        setStats({
          vehiclesCount: vehicles.length,
          routesCount: routes.length,
          enquiriesCount: enquiries.length,
          newEnquiriesCount: enquiries.filter(e => e.status === 'New').length
        });
      } catch (err) {
        console.error('Error fetching admin dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div className="space-y-8">
      <section
        className="relative w-full bg-cover bg-center bg-no-repeat rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(8, 12, 22, 0.95) 0%, rgba(8, 12, 22, 0.85) 50%, rgba(8, 12, 22, 0.55) 100%), url('/images/hero-bg.jpg')`
        }}
      >
        <div className="p-8 space-y-2">
          <h1 className="text-3xl font-extrabold text-white flex items-center space-x-3">
            <LayoutDashboard className="w-8 h-8 text-emerald-400" />
            <span>Cab Service Management Dashboard</span>
          </h1>
          <p className="text-slate-300 text-sm max-w-xl">
            Welcome to the Pune ↔ Mumbai Cab Service CMS. Manage dynamic fare pricing, fleet vehicles, active travel routes, and incoming customer enquiries.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="inline-flex items-center space-x-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full backdrop-blur-sm text-xs font-semibold text-slate-300">
              <span>📊</span>
              <span>Real-time Analytics</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full backdrop-blur-sm text-xs font-semibold text-slate-300">
              <span>💰</span>
              <span>Dynamic Pricing</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full backdrop-blur-sm text-xs font-semibold text-slate-300">
              <span>🚗</span>
              <span>Fleet Management</span>
            </span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase">Total Vehicles</span>
            <Car className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white">{loading ? '...' : stats.vehiclesCount}</div>
          <Link to="/admin/vehicles" className="inline-flex items-center space-x-1 text-xs text-emerald-400 font-semibold hover:underline">
            <span>Manage Fleet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase">Active Routes</span>
            <MapPin className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white">{loading ? '...' : stats.routesCount}</div>
          <Link to="/admin/routes" className="inline-flex items-center space-x-1 text-xs text-emerald-400 font-semibold hover:underline">
            <span>Manage Routes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase">New Enquiries</span>
            <MessageSquare className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-amber-400">{loading ? '...' : stats.newEnquiriesCount}</div>
          <Link to="/admin/enquiries" className="inline-flex items-center space-x-1 text-xs text-amber-400 font-semibold hover:underline">
            <span>View Requests</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase">Dynamic Pricing</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-emerald-400">Active</div>
          <Link to="/admin/pricing" className="inline-flex items-center space-x-1 text-xs text-emerald-400 font-semibold hover:underline">
            <span>Edit Live Prices</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

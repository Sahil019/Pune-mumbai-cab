import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Car, Users, CheckCircle2, ShieldCheck } from 'lucide-react';
import axios from 'axios';

export default function FleetPage() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/vehicles')
      .then(res => {
        if (res.data.success) {
          setVehicles(res.data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-12 py-8">
      <SEO
        title="Cab Fleet | Sedan, Ertiga SUV, Innova & Innova Crysta"
        description="Explore our Pune to Mumbai intercity taxi fleet. Choose from AC Swift Dzire, Ertiga 6+1, Innova MPV & luxury Innova Crysta with verified drivers."
      />

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Our Intercity Express Vehicles</span>
        <h1 className="text-4xl font-extrabold text-white">Pune ↔ Mumbai Cab Fleet</h1>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Sanitized, GPS-enabled, and air-conditioned cabs driven by professional, verified commercial drivers.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading active fleet...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((v) => (
            <div key={v.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between">
              <div>
                <div className="aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={v.image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'}
                    alt={v.name}
                    title={`${v.name} Pune to Mumbai Intercity Cab`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white">{v.name}</h3>
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold px-2.5 py-1 rounded">
                      {v.seating_capacity}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{v.description}</p>

                  <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm">
                    <span className="text-slate-400">Starting Base Fare:</span>
                    <span className="text-emerald-400 font-extrabold text-lg">₹{v.base_price || v.price}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href="/pune-to-mumbai-cab#booking"
                  title={`Book ${v.name} Cab Pune to Mumbai`}
                  className="block text-center w-full bg-slate-800 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
                >
                  Book {v.name}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

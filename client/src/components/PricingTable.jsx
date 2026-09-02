import React, { useState, useEffect } from 'react';
import { CheckCircle2, TrendingUp, RefreshCw, ArrowRight } from 'lucide-react';
import axios from 'axios';

export default function PricingTable({ routeSlug = 'pune-to-mumbai-cab', routeName = 'Pune to Mumbai' }) {
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultVehicleImages = {
    'sedan': '/images/sedan.jpg',
    'suv': '/images/suv.jpg',
    'innova': '/images/innova.jpg',
    'innova-crysta': '/images/innova-crysta.jpg'
  };

  const fetchPricing = async () => {
    setLoading(true);
    setError(null);
    try {
      const routeRes = await axios.get(`/api/routes/${routeSlug}`);
      if (routeRes.data.success && routeRes.data.data) {
        const routeData = routeRes.data.data;
        if (routeData.pricing && Array.isArray(routeData.pricing) && routeData.pricing.length > 0) {
          setPricing(routeData.pricing);
        } else {
          const pricingRes = await axios.get(`/api/routes/${routeData.id}/pricing`);
          if (pricingRes.data.success) {
            setPricing(pricingRes.data.data);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching dynamic route pricing:', err);
      setError('Unable to load current dynamic pricing from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPricing();
  }, [routeSlug]);

  if (loading) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-400" />
        <p className="text-sm">Fetching real-time database pricing for {routeName}...</p>
      </div>
    );
  }

  if (error || pricing.length === 0) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
        <p>{error || 'No pricing records configured yet.'}</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-sm">
      
      {/* Header matching exact reference design */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Dynamic Fare Chart ({routeName})
            </h3>
            <p className="text-xs text-slate-400">Live prices pulled directly from our system</p>
          </div>
        </div>

        <button
          onClick={fetchPricing}
          className="text-xs bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-emerald-400 px-3.5 py-2 rounded-xl flex items-center space-x-2 transition-all cursor-pointer shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Rates</span>
        </button>
      </div>

      {/* Grid of 4 Horizontal Cards matching reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricing.map((p) => {
          const vehicle = p.vehicle || p.vehicles || {};
          const vehicleSlug = vehicle.slug || (vehicle.name ? vehicle.name.toLowerCase().replace(/\s+/g, '-') : 'sedan');
          const imageUrl = vehicle.image || defaultVehicleImages[vehicleSlug] || '/images/sedan.jpg';

          return (
            <div
              key={p.id}
              className="bg-slate-900/90 border border-slate-800/80 hover:border-emerald-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-emerald-500/5"
            >
              <div className="space-y-4">
                
                {/* Horizontal Mini Card Header */}
                <div className="flex items-center space-x-3">
                  <div className="w-20 h-14 rounded-xl overflow-hidden bg-slate-950 flex-shrink-0 border border-slate-800">
                    <img
                      src={imageUrl}
                      alt={vehicle.name || 'Cab'}
                      title={`${vehicle.name || 'Cab'} Pune to Mumbai Service`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-white leading-tight">
                      {vehicle.name || 'Cab'}
                    </h4>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Capacity: {vehicle.seating_capacity || '4+1'}
                    </span>
                  </div>
                </div>

                {/* Price Matrix */}
                <div className="py-3 border-y border-slate-800/80 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">One-Way Fare</span>
                    <span className="text-emerald-400 font-extrabold text-lg">₹{p.one_way_price?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Round-Trip Fare</span>
                    <span className="text-slate-300 font-semibold text-xs">₹{p.round_trip_price?.toLocaleString()}</span>
                  </div>
                </div>

                {/* Included Features Bullet Points */}
                <ul className="space-y-2 text-[11px] text-slate-300 font-medium">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Include Expressway Toll</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Driver Allowance Included</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Clean & Sanitized AC Cab</span>
                  </li>
                </ul>
              </div>

              {/* Full Width Green Button matching reference */}
              <a
                href="#booking-form-section"
                title={`Book ${vehicle.name || 'Cab'} Pune to Mumbai`}
                className="mt-5 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2.5 px-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <span>Book {vehicle.name || 'Cab'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

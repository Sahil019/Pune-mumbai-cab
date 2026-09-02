import React from 'react';
import SEO from '../components/SEO';
import PricingTable from '../components/PricingTable';
import BookingForm from '../components/BookingForm';
import { MapPin, ShieldCheck, Clock, Plane, CheckCircle2 } from 'lucide-react';

export default function MumbaiToPune() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mumbai to Pune Cab Service',
    provider: { '@type': 'LocalBusiness', name: 'Pune ↔ Mumbai Cabs' },
    areaServed: 'Mumbai, Mumbai Airport, Pune'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-8">
      <SEO
        title="Mumbai to Pune Cab Service | Airport Pickup & Intercity Taxi"
        description="Book Mumbai to Pune cabs with reliable pickup from Mumbai Airport T1/T2 or any Mumbai location. Clean AC sedans & SUVs at transparent fares."
        jsonLd={jsonLd}
      />

      {/* Hero Section with Half-Mid Part Mumbai Airport Background Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* LEFT HALF MID PART - High Resolution Mumbai Airport Background Image */}
        <div
          className="h-full min-h-[460px] p-8 sm:p-10 flex flex-col justify-center space-y-5 bg-cover bg-center bg-no-repeat relative border-r border-slate-800/80"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(8, 12, 22, 0.95) 0%, rgba(8, 12, 22, 0.85) 60%, rgba(8, 12, 22, 0.70) 100%), url('/images/mumbai-airport.jpg')`
          }}
        >
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-3.5 py-1.5 rounded-full w-fit">
            <Plane className="w-4 h-4" />
            <span>Airport Pickup & Express Return</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Mumbai to Pune <br />
            <span className="text-amber-400">Cab Service</span>
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed max-w-md bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-sm">
            Reliable pickups directly from Mumbai International Airport T2/T1 arrival gates or any Mumbai address with direct delivery to Pune.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-medium">
            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 backdrop-blur-sm">
              <span className="text-slate-400 block text-[11px] font-bold">Expressway Distance</span>
              <span className="text-amber-400 font-extrabold text-lg">~150 KM</span>
            </div>
            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 backdrop-blur-sm">
              <span className="text-slate-400 block text-[11px] font-bold">Average Travel Time</span>
              <span className="text-amber-400 font-extrabold text-lg">3h 30m</span>
            </div>
          </div>
        </div>

        {/* RIGHT HALF MID PART - Interactive Booking Form */}
        <div id="booking" className="p-4 sm:p-6 lg:p-8">
          <BookingForm initialRoute="mumbai-to-pune" />
        </div>
      </div>

      {/* Dynamic Database Pricing Table */}
      <PricingTable routeSlug="mumbai-to-pune-cab" routeName="Mumbai to Pune" />

      {/* Direction Specific Mumbai -> Pune Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            <span>Popular Pickups in Mumbai</span>
          </h3>
          <ul className="text-xs text-slate-300 space-y-2">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Chhatrapati Shivaji Maharaj International Airport (T2 Arrival Gate)</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Domestic Airport Terminal 1 (Vile Parle)</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Dadar West & East Terminal Points</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Navi Mumbai, Vashi, Kharghar & Panvel Expressway Exit</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-red-400" />
            <span>Popular Drops in Pune</span>
          </h3>
          <ul className="text-xs text-slate-300 space-y-2">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>Hinjewadi IT Hub (Phases 1, 2, 3) & Wakad</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>Baner, Pashan, Aundh & Kothrud</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>Swargate, Shivaji Nagar & Pune Station</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>Viman Nagar, Kharadi IT Park & Pune Airport (Lohegaon)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

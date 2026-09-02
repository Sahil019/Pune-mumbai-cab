import React from 'react';
import SEO from '../components/SEO';
import PricingTable from '../components/PricingTable';
import BookingForm from '../components/BookingForm';
import { MapPin, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export default function PuneToMumbai() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Pune to Mumbai Cab Service',
    provider: { '@type': 'LocalBusiness', name: 'Pune ↔ Mumbai Cabs' },
    areaServed: 'Pune, Mumbai, Mumbai Airport'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-8">
      <SEO
        title="Pune to Mumbai Cab Service | Doorstep Drop & Airport Taxi"
        description="Book Pune to Mumbai cabs with doorstep pickup across Pune & drops to Dadar, BKC or Mumbai Airport T1/T2. Clean AC cars, driver allowance included."
        jsonLd={jsonLd}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <div className="space-y-4">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Express Highway Travel</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Pune to Mumbai Cab Service</h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Travel seamlessly from Pune (Kothrud, Wakad, Hinjewadi, Kharadi, Viman Nagar) to anywhere in Mumbai or Mumbai International Airport T2.
          </p>

          <div className="grid grid-cols-2 gap-4 py-2 border-y border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 block">Distance:</span>
              <span className="text-emerald-400 font-bold text-base">~150 KM</span>
            </div>
            <div>
              <span className="text-slate-500 block">Travel Time:</span>
              <span className="text-emerald-400 font-bold text-base">3 hrs 30 mins</span>
            </div>
          </div>
        </div>

        <div id="booking">
          <BookingForm initialRoute="pune-to-mumbai" />
        </div>
      </div>

      {/* Dynamic Database Pricing Table */}
      <PricingTable routeSlug="pune-to-mumbai-cab" routeName="Pune to Mumbai" />

      {/* Direction Specific Pune -> Mumbai Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <span>Popular Pickups in Pune</span>
          </h3>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
            <li>Hinjewadi IT Park (Phase 1, 2, 3)</li>
            <li>Wakad, Baner, Aundh, Kothrud</li>
            <li>Viman Nagar, Kharadi, Hadapsar</li>
            <li>Pune Railway Station & Lohegaon Airport</li>
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-red-400" />
            <span>Popular Drops in Mumbai</span>
          </h3>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
            <li>Mumbai International Airport T2 / T1</li>
            <li>Dadar, Kurla, Bandra-Kurla Complex (BKC)</li>
            <li>Andheri, Borivali, Goregaon, Thane</li>
            <li>Navi Mumbai (Vashi, Nerul, Kharghar)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

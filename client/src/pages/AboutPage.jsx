import React from 'react';
import SEO from '../components/SEO';
import { ShieldCheck, Award, Users, Clock } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-12 py-8">
      <SEO
        title="About Us | Pune Mumbai Cab Service"
        description="Learn about Pune ↔ Mumbai Cabs — leading intercity cab service provider operating 24/7 between Pune and Mumbai Expressway."
      />

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 space-y-4">
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Our Story & Commitment</span>
        <h1 className="text-4xl font-extrabold text-white">Connecting Pune & Mumbai Seamlessly</h1>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
          Founded with a mission to deliver safe, reliable, and transparently priced intercity rides across the Yashwantrao Chavan Expressway, Pune ↔ Mumbai Cabs serves over 10,000+ happy travelers every month.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">Verified Drivers</h3>
          <p className="text-xs text-slate-400">All drivers undergo background checks and possess commercial intercity driving permits.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
          <Clock className="w-8 h-8 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">24/7 Availability</h3>
          <p className="text-xs text-slate-400">Early morning airport drops or late night travel — we operate round-the-clock 365 days a year.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
          <Award className="w-8 h-8 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">Zero Hidden Charges</h3>
          <p className="text-xs text-slate-400">Database-driven dynamic fares include toll taxes and driver allowances upfront.</p>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, PhoneCall, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-slate-950/30 backdrop-blur-md border-b border-white/10 m-0 p-0 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          title="Pune to Mumbai Cab Service Homepage"
          className="flex items-center space-x-3 text-amber-400 font-extrabold text-xl tracking-wide group"
        >
          <img
            src="/images/logo.png"
            alt="Pune Mumbai Cabs Logo"
            title="Pune Mumbai Cabs Official Logo"
            className="w-10 h-10 rounded-full object-cover border border-amber-500/40 group-hover:scale-105 transition-transform shadow-md shadow-amber-500/20"
          />
          <span className="text-white">Pune<span className="text-amber-400">↔</span>Mumbai Cabs</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            title="Home Page"
            className={`text-sm font-bold transition-colors hover:text-amber-400 ${
              location.pathname === '/' ? 'text-amber-400' : 'text-slate-300'
            }`}
          >
            Home
          </Link>
          <Link
            to="/pune-to-mumbai-cab"
            title="Pune to Mumbai Cab Service"
            className={`text-sm font-bold transition-colors hover:text-amber-400 ${
              location.pathname === '/pune-to-mumbai-cab' ? 'text-amber-400' : 'text-slate-300'
            }`}
          >
            Pune → Mumbai
          </Link>
          <Link
            to="/mumbai-to-pune-cab"
            title="Mumbai to Pune Cab Service"
            className={`text-sm font-bold transition-colors hover:text-amber-400 ${
              location.pathname === '/mumbai-to-pune-cab' ? 'text-amber-400' : 'text-slate-300'
            }`}
          >
            Mumbai → Pune
          </Link>
          <Link
            to="/fleet"
            title="Our Intercity Cab Fleet"
            className={`text-sm font-bold transition-colors hover:text-amber-400 ${
              location.pathname === '/fleet' ? 'text-amber-400' : 'text-slate-300'
            }`}
          >
            Our Fleet
          </Link>
          <Link
            to="/admin"
            title="Admin CMS Dashboard"
            className={`text-sm font-bold flex items-center space-x-1.5 transition-colors hover:text-amber-400 ${
              location.pathname.startsWith('/admin') ? 'text-amber-400' : 'text-slate-300'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-amber-400" />
            <span>Admin CMS</span>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <a
            href="tel:+919876543210"
            title="Call Customer Support +91 98765 43210"
            className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 uppercase tracking-wider"
          >
            <PhoneCall className="w-4 h-4" />
            <span className="hidden sm:inline">Call Now: +91 98765 43210</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </div>
    </header>
  );
}

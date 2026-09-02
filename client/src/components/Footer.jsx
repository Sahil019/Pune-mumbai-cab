import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <Link
            to="/"
            title="Pune to Mumbai Cab Service Homepage"
            className="flex items-center space-x-3 text-white font-extrabold text-lg tracking-wide group"
          >
            <img
              src="/images/logo.png"
              alt="Pune Mumbai Cabs Logo"
              title="Pune Mumbai Cabs Official Logo"
              className="w-10 h-10 rounded-full object-cover border border-amber-500/40 group-hover:scale-105 transition-transform shadow-md shadow-amber-500/20"
            />
            <span className="text-white">Pune<span className="text-amber-400">↔</span>Mumbai Cabs</span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            Reliable, comfortable & transparent dynamic pricing intercity cab services connecting Pune and Mumbai 24/7.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs mb-4 tracking-widest uppercase">Quick Links</h4>
          <ul className="space-y-2 text-xs font-medium">
            <li><Link to="/" title="Home Page" className="hover:text-amber-400 transition-colors">Home Page</Link></li>
            <li><Link to="/pune-to-mumbai-cab" title="Pune to Mumbai Cabs" className="hover:text-amber-400 transition-colors">Pune to Mumbai Cabs</Link></li>
            <li><Link to="/mumbai-to-pune-cab" title="Mumbai to Pune Cabs" className="hover:text-amber-400 transition-colors">Mumbai to Pune Cabs</Link></li>
            <li><Link to="/fleet" title="Our Cab Fleet" className="hover:text-amber-400 transition-colors">Our Fleet</Link></li>
            <li><Link to="/admin" title="Admin CMS Dashboard" className="hover:text-amber-400 transition-colors">Admin CMS</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs mb-4 tracking-widest uppercase">Services</h4>
          <ul className="space-y-2 text-xs text-slate-400 font-medium">
            <li>One-Way Drop Taxi</li>
            <li>Round Trip Express</li>
            <li>Mumbai Airport Pick & Drop (T1/T2)</li>
            <li>Pune Airport Transfer</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs mb-4 tracking-widest uppercase">Contact Us</h4>
          <ul className="space-y-3 text-xs font-medium">
            <li className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <a href="tel:+919876543210" title="Call Support +91 98765 43210" className="hover:text-amber-400 transition-colors">+91 98765 43210</a>
            </li>
            <li className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <a href="mailto:booking@punemumbaicabs.com" title="Email Booking Support" className="hover:text-amber-400 transition-colors">booking@punemumbaicabs.com</a>
            </li>
            <li className="flex items-center space-x-2.5">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Pune & Mumbai, Maharashtra</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-slate-900 text-[11px] text-center text-slate-500 font-medium">
        © {new Date().getFullYear()} Pune ↔ Mumbai Cabs. All rights reserved. Dynamic Database Pricing Enabled.
      </div>
    </footer>
  );
}

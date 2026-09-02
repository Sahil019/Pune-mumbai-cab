import React from 'react';
import SEO from '../components/SEO';
import BookingForm from '../components/BookingForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="space-y-12 py-8">
      <SEO
        title="Book a Pune Mumbai Cab | Contact & Enquiry"
        description="Contact Pune ↔ Mumbai Cabs for instant cab booking, airport pickups, and customer support. Call +91 98765 43210."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Get In Touch</span>
            <h1 className="text-4xl font-extrabold text-white">Contact & Quick Booking</h1>
            <p className="text-slate-300">
              Have questions about your Pune to Mumbai travel or need a custom fleet package? Reach out to us anytime!
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Call / WhatsApp Support</h4>
                <p className="text-sm text-emerald-400 font-semibold mt-0.5">+91 98765 43210</p>
                <p className="text-xs text-slate-500">Available 24 Hours / 7 Days</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Email Booking Helpdesk</h4>
                <p className="text-sm text-slate-300 mt-0.5">booking@punemumbaicabs.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Office Locations</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  <strong>Pune Hub:</strong> Swargate & Wakad, Pune, Maharashtra 411057<br />
                  <strong>Mumbai Hub:</strong> Dadar & CSMT Airport T2, Mumbai 400099
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}

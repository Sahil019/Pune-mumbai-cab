import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, Car, Calendar, MapPin, User, Phone, Mail, Clock, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import axios from 'axios';

// ─── Validation Rules ────────────────────────────────────────────────
const validators = {
  name: (v) => {
    if (!v.trim()) return 'Full name is required';
    if (v.trim().length < 2) return 'Name must be at least 2 characters';
    if (/\d/.test(v.trim())) return 'Name should not contain numbers';
    if (!/^[a-zA-Z\s.'-]+$/.test(v.trim())) return 'Name contains invalid characters';
    return '';
  },
  mobile_number: (v) => {
    const cleaned = v.replace(/[\s\-+]/g, '');
    if (!cleaned) return 'Mobile number is required';
    if (!/^\d{10,15}$/.test(cleaned)) return 'Enter a valid 10–15 digit phone number';
    if (cleaned.length === 10 && !/^[6-9]/.test(cleaned)) return 'Indian mobile numbers start with 6, 7, 8, or 9';
    return '';
  },
  email: (v) => {
    if (!v.trim()) return ''; // optional field
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'Enter a valid email address (e.g. name@example.com)';
    return '';
  },
  pickup_location: (v) => {
    if (!v.trim()) return 'Pickup location is required';
    if (v.trim().length < 3) return 'Enter a more specific pickup location';
    return '';
  },
  drop_location: (v) => {
    if (!v.trim()) return 'Drop location is required';
    if (v.trim().length < 3) return 'Enter a more specific drop location';
    return '';
  },
  travel_date: (v) => {
    if (!v) return 'Travel date is required';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(v);
    if (selected < today) return 'Travel date cannot be in the past';
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 90);
    if (selected > maxDate) return 'Bookings can be made up to 90 days in advance';
    return '';
  },
  travel_time: (v) => {
    if (!v.trim()) return 'Pickup time is required';
    const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])(\s?(AM|PM|am|pm))?$/;
    if (!timeRegex.test(v.trim())) return 'Enter valid time (e.g. 08:00 AM)';
    return '';
  },
  number_of_passengers: (v) => {
    const num = Number(v);
    if (!num || num < 1) return 'At least 1 passenger required';
    if (num > 7) return 'Maximum 7 passengers allowed';
    return '';
  }
};

export default function BookingForm({ initialVehicleId = '', initialRoute = '' }) {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    mobile_number: '',
    email: '',
    pickup_location: initialRoute === 'mumbai-to-pune' ? 'Mumbai Airport T2' : 'Pune City',
    drop_location: initialRoute === 'mumbai-to-pune' ? 'Hinjewadi, Pune' : 'Mumbai International Airport T2',
    travel_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    travel_time: '08:00 AM',
    trip_type: 'One Way',
    vehicle_id: initialVehicleId,
    number_of_passengers: 1,
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);           // top-level submit errors
  const [fieldErrors, setFieldErrors] = useState({});  // per-field inline errors
  const [touched, setTouched] = useState({});          // tracks blur per field
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios.get('/api/vehicles')
      .then(res => {
        if (res.data.success) {
          setVehicles(res.data.data);
          if (!formData.vehicle_id && res.data.data.length > 0) {
            setFormData(prev => ({ ...prev, vehicle_id: res.data.data[0].id }));
          }
        }
      })
      .catch(console.error);
  }, []);

  // ─── Per-field blur handler ─────────────────────────────────────────
  const handleBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    const error = validators[fieldName]?.(formData[fieldName]) || '';
    setFieldErrors(prev => ({ ...prev, [fieldName]: error }));
  };

  // ─── On-change with live re-validation if already touched ──────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validators[name]?.(value) || '';
      setFieldErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // ─── Full form validation ──────────────────────────────────────────
  const validateAll = () => {
    const newFieldErrors = {};
    let hasError = false;
    Object.keys(validators).forEach((field) => {
      const err = validators[field](formData[field]) || '';
      newFieldErrors[field] = err;
      if (err) hasError = true;
    });
    setFieldErrors(newFieldErrors);
    setTouched(Object.keys(validators).reduce((a, k) => ({ ...a, [k]: true }), {}));
    return !hasError;
  };

  // ─── Inline error message component ────────────────────────────────
  const FieldError = ({ field }) => {
    if (!touched[field] || !fieldErrors[field]) return null;
    return (
      <p className="text-[11px] text-red-400 mt-1 flex items-center space-x-1 animate-in slide-in-from-top-1 duration-150">
        <AlertCircle className="w-3 h-3 flex-shrink-0" />
        <span>{fieldErrors[field]}</span>
      </p>
    );
  };

  // ─── Get field border class ────────────────────────────────────────
  const fieldBorder = (field) => {
    if (touched[field] && fieldErrors[field]) return 'border-red-500 focus:border-red-500 focus:ring-red-500';
    if (touched[field] && !fieldErrors[field] && formData[field]) return 'border-emerald-500/50 focus:border-amber-500';
    return 'border-slate-800 focus:border-amber-500';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!validateAll()) {
      setErrors(['Please fix the highlighted fields below before submitting.']);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('/api/enquiries', formData);
      if (res.data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      setErrors([err.response?.data?.message || 'Failed to submit booking enquiry. Please try again.']);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-slate-900/95 border border-amber-500/40 rounded-3xl p-8 text-center space-y-5 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/30 animate-bounce">
          <CheckCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-extrabold text-white">Booking Request Confirmed!</h3>
          <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
            Thank you <span className="font-bold text-amber-400">{formData.name}</span>. Our Pune ↔ Mumbai trip manager will contact you at <span className="font-bold text-amber-400">{formData.mobile_number}</span> within 10 minutes to verify your exact pickup location.
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs space-y-2 text-slate-300 max-w-md mx-auto text-left">
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Route:</span>
            <span className="font-bold text-white">{formData.pickup_location} → {formData.drop_location}</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Date & Time:</span>
            <span className="font-bold text-white">{formData.travel_date} ({formData.travel_time})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Advance Fee:</span>
            <span className="font-bold text-emerald-400">₹0 (Pay Driver After Ride)</span>
          </div>
        </div>

        <button
          onClick={() => {
            setSubmitted(false);
            setFieldErrors({});
            setTouched({});
            setErrors([]);
            setFormData(prev => ({ ...prev, message: '' }));
          }}
          className="mt-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-6 py-3 rounded-xl transition-all cursor-pointer border border-slate-700"
        >
          Submit Another Booking
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900/95 border border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md relative overflow-hidden group" noValidate>
      
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-700"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold px-3 py-1 rounded-full mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Confirmation • Zero Advance Fee</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white flex items-center space-x-2 tracking-tight">
            <Car className="w-6 h-6 text-amber-400" />
            <span>Book Your Journey</span>
          </h3>
        </div>

        {/* Trip Type */}
        <div className="inline-flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, trip_type: 'One Way' }))}
            className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              formData.trip_type === 'One Way'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⊙ One Way
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, trip_type: 'Round Trip' }))}
            className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              formData.trip_type === 'Round Trip'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⇄ Round Trip
          </button>
        </div>
      </div>

      {/* Top-level validation alert */}
      {errors.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl text-xs space-y-1.5 animate-in slide-in-from-top-2 duration-200">
          {errors.map((err, i) => (
            <div key={i} className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{err}</span>
            </div>
          ))}
        </div>
      )}

      {/* Vehicle Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-wider">Select Preferred Cab *</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {vehicles.map((v) => {
            const isSelected = formData.vehicle_id === v.id;
            return (
              <button
                type="button"
                key={v.id}
                onClick={() => setFormData(prev => ({ ...prev, vehicle_id: v.id }))}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10 ring-1 ring-amber-500'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="font-extrabold text-sm text-white">{v.name}</div>
                <div className="text-[11px] text-slate-400 font-medium">{v.seating_capacity}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-0.5">
          <label className="block text-xs font-bold text-slate-300">Full Name *</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
              placeholder="e.g. Anil Deshmukh"
              className={`w-full bg-slate-950 border rounded-xl pl-10 pr-4 py-3 text-sm text-white font-medium focus:ring-1 focus:outline-none transition-all ${fieldBorder('name')}`}
            />
          </div>
          <FieldError field="name" />
        </div>

        {/* Mobile */}
        <div className="space-y-0.5">
          <label className="block text-xs font-bold text-slate-300">Mobile Phone Number *</label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="tel"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              onBlur={() => handleBlur('mobile_number')}
              placeholder="e.g. 9876543210"
              maxLength={15}
              className={`w-full bg-slate-950 border rounded-xl pl-10 pr-4 py-3 text-sm text-white font-medium focus:ring-1 focus:outline-none transition-all ${fieldBorder('mobile_number')}`}
            />
          </div>
          <FieldError field="mobile_number" />
        </div>

        {/* Email */}
        <div className="space-y-0.5">
          <label className="block text-xs font-bold text-slate-300">Email <span className="text-slate-500">(optional)</span></label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
              placeholder="e.g. anil@gmail.com"
              className={`w-full bg-slate-950 border rounded-xl pl-10 pr-4 py-3 text-sm text-white font-medium focus:ring-1 focus:outline-none transition-all ${fieldBorder('email')}`}
            />
          </div>
          <FieldError field="email" />
        </div>

        {/* Passengers */}
        <div className="space-y-0.5">
          <label className="block text-xs font-bold text-slate-300">Passengers *</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <select
              name="number_of_passengers"
              value={formData.number_of_passengers}
              onChange={handleChange}
              onBlur={() => handleBlur('number_of_passengers')}
              className={`w-full bg-slate-950 border rounded-xl pl-10 pr-4 py-3 text-sm text-white font-medium focus:ring-1 focus:outline-none transition-all appearance-none ${fieldBorder('number_of_passengers')}`}
            >
              {[1, 2, 3, 4, 5, 6, 7].map(n => (
                <option key={n} value={n}>{n} Passenger{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <FieldError field="number_of_passengers" />
        </div>

        {/* Pickup */}
        <div className="space-y-0.5">
          <label className="block text-xs font-bold text-slate-300">Pickup Location *</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              name="pickup_location"
              value={formData.pickup_location}
              onChange={handleChange}
              onBlur={() => handleBlur('pickup_location')}
              placeholder="e.g. Kothrud, Pune / Mumbai T2"
              className={`w-full bg-slate-950 border rounded-xl pl-10 pr-4 py-3 text-sm text-white font-medium focus:ring-1 focus:outline-none transition-all ${fieldBorder('pickup_location')}`}
            />
          </div>
          <FieldError field="pickup_location" />
        </div>

        {/* Drop */}
        <div className="space-y-0.5">
          <label className="block text-xs font-bold text-slate-300">Drop Location *</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-red-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              name="drop_location"
              value={formData.drop_location}
              onChange={handleChange}
              onBlur={() => handleBlur('drop_location')}
              placeholder="e.g. Dadar, Mumbai / Pune Airport"
              className={`w-full bg-slate-950 border rounded-xl pl-10 pr-4 py-3 text-sm text-white font-medium focus:ring-1 focus:outline-none transition-all ${fieldBorder('drop_location')}`}
            />
          </div>
          <FieldError field="drop_location" />
        </div>

        {/* Travel Date */}
        <div className="space-y-0.5">
          <label className="block text-xs font-bold text-slate-300">Travel Date *</label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="date"
              name="travel_date"
              value={formData.travel_date}
              onChange={handleChange}
              onBlur={() => handleBlur('travel_date')}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full bg-slate-950 border rounded-xl pl-10 pr-4 py-3 text-sm text-white font-medium focus:ring-1 focus:outline-none transition-all ${fieldBorder('travel_date')}`}
            />
          </div>
          <FieldError field="travel_date" />
        </div>

        {/* Travel Time */}
        <div className="space-y-0.5">
          <label className="block text-xs font-bold text-slate-300">Pickup Time *</label>
          <div className="relative">
            <Clock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              name="travel_time"
              value={formData.travel_time}
              onChange={handleChange}
              onBlur={() => handleBlur('travel_time')}
              placeholder="e.g. 08:00 AM"
              className={`w-full bg-slate-950 border rounded-xl pl-10 pr-4 py-3 text-sm text-white font-medium focus:ring-1 focus:outline-none transition-all ${fieldBorder('travel_time')}`}
            />
          </div>
          <FieldError field="travel_time" />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-0.5">
        <label className="block text-xs font-bold text-slate-300">Flight Number / Additional Instructions</label>
        <textarea
          name="message"
          rows="2"
          value={formData.message}
          onChange={handleChange}
          placeholder="e.g. Flight AI-842 landing at Mumbai T2 @ 10:15 AM..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-white font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-all resize-none"
        ></textarea>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-4 px-6 rounded-xl transition-all flex items-center justify-center space-x-2 text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 disabled:opacity-50 cursor-pointer group/btn"
      >
        {loading ? (
          <span className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Processing Booking Request...</span>
          </span>
        ) : (
          <span className="flex items-center space-x-2">
            <span>Confirm & Request Booking</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </span>
        )}
      </button>

      <div className="flex items-center justify-center space-x-4 text-[11px] text-slate-400 font-semibold pt-1 border-t border-slate-800/60">
        <span className="flex items-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Pay Driver After Journey</span>
        </span>
        <span>•</span>
        <span>Free Cancellation Anytime</span>
      </div>
    </form>
  );
}

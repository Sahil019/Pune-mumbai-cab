import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import PricingTable from '../components/PricingTable';
import BookingForm from '../components/BookingForm';
import { ShieldCheck, Clock, Award, ArrowRight, CheckCircle2, Car, MapPin, HelpCircle, ChevronDown, Calendar, User, Phone, Sparkles, RefreshCw, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const navigate = useNavigate();

  // Search Bar State matching exact PRD & Reference UI
  const [tripType, setTripType] = useState('One Way');
  const [pickup, setPickup] = useState('Pune');
  const [drop, setDrop] = useState('Mumbai');
  const [travelDate, setTravelDate] = useState(() => new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [passengers, setPassengers] = useState('4');

  // Fleet state from Database
  const [vehicles, setVehicles] = useState([]);
  const [loadingFleet, setLoadingFleet] = useState(true);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 45, seconds: 32 });

  useEffect(() => {
    // Fetch fleet dynamically from MERN API / MongoDB
    axios.get('/api/vehicles')
      .then(res => {
        if (res.data.success) {
          setVehicles(res.data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoadingFleet(false));

    // Countdown timer tick
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const targetRoute = pickup.toLowerCase().includes('mumbai') ? '/mumbai-to-pune-cab#booking' : '/pune-to-mumbai-cab#booking';
    navigate(targetRoute);
  };

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Pune ↔ Mumbai Cab Service',
    description: 'Premier intercity taxi service operating between Pune and Mumbai Expressway.',
    telephone: '+919876543210',
    areaServed: ['Pune', 'Mumbai', 'Navi Mumbai', 'Mumbai Airport']
  };

  return (
    <div className="w-full space-y-12 m-0 p-0">
      <SEO
        title="Pune Mumbai Cab Service | One Way & Round Trip Taxi"
        description="Book reliable Pune to Mumbai & Mumbai to Pune one-way and round-trip cabs. Transparent dynamic pricing, zero hidden charges."
        jsonLd={homeJsonLd}
      />

      {/* FULL-WIDTH HERO SECTION WITH SUNSET SUV BACKGROUND IMAGE */}
      <section
        className="relative w-full min-h-[560px] bg-cover bg-center bg-no-repeat pt-16 pb-28 flex flex-col justify-center border-b border-slate-800 shadow-2xl mt-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(8, 12, 22, 0.96) 0%, rgba(8, 12, 22, 0.82) 48%, rgba(8, 12, 22, 0.30) 100%), url('/images/hero-bg.jpg')`
        }}
      >
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Hero Header Content */}
          <div className="max-w-2xl space-y-4 pt-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-none tracking-tight">
              Pune to Mumbai <br />
              <span className="text-amber-400">Cab Service</span>
            </h1>
            <p className="text-slate-300 text-lg font-medium leading-snug">
              Safe. Reliable. On-time. <br />
              <span className="text-slate-400 text-base">One Way & Round Trip Cabs at Best Prices</span>
            </p>

            <p className="text-slate-300 text-sm leading-relaxed max-w-xl bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80 backdrop-blur-sm">
              We provide premium doorstep intercity cab services connecting Pune and Mumbai Expressway. Choose from our fleet of AC Sedans, Ertiga SUVs, and Innova Crystas with zero advance booking fees, verified courteous drivers, toll-inclusive fares, and instant Mumbai Airport (T1/T2) drop confirmation.
            </p>

            {/* Badges Row */}
            <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-slate-300">
              <span className="inline-flex items-center space-x-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>24/7 Support</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Verified Drivers</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Car className="w-3.5 h-3.5 text-amber-400" />
                <span>Clean & Sanitized Cars</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Best Price Guarantee</span>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* SEARCH & FARE ESTIMATOR WIDGET PLACED BELOW HERO IMAGE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28 relative z-20">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4 mb-10">
          
          {/* Trip Type Tabs */}
          <div className="inline-flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setTripType('One Way')}
              className={`px-5 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center space-x-2 ${
                tripType === 'One Way' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>⊙ One Way</span>
            </button>
            <button
              type="button"
              onClick={() => setTripType('Round Trip')}
              className={`px-5 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center space-x-2 ${
                tripType === 'Round Trip' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>⇄ Round Trip</span>
            </button>
          </div>

          {/* Horizontal Input Row */}
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            {/* From */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">From</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={pickup}
                  onChange={e => setPickup(e.target.value)}
                  placeholder="Pickup City / Area"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white font-semibold focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* To */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">To</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-red-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={drop}
                  onChange={e => setDrop(e.target.value)}
                  placeholder="Drop City / Airport"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white font-semibold focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Travel Date */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Travel Date</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={travelDate}
                  onChange={e => setTravelDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white font-semibold focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Passengers */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Passengers</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  value={passengers}
                  onChange={e => setPassengers(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white font-semibold focus:border-amber-500 focus:outline-none appearance-none"
                >
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="4">4 Passengers</option>
                  <option value="6">6 Passengers</option>
                  <option value="7">7 Passengers</option>
                </select>
              </div>
            </div>

            {/* Get Fare Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-amber-500/20 text-sm flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider h-[42px]"
              >
                <span>Get Fare</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* SPECIAL OFFER PROMO BANNER (Matching exact reference screenshot) */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center space-x-6">
            {/* Starburst Offer Badge */}
            <div className="relative w-20 h-20 bg-amber-500 text-slate-950 rounded-full flex flex-col items-center justify-center text-center p-2 font-black shadow-lg shadow-amber-500/30 flex-shrink-0 animate-pulse">
              <span className="text-[10px] uppercase leading-none">SPECIAL OFFER</span>
              <span className="text-xl leading-none font-extrabold">30%</span>
              <span className="text-[10px] leading-none">OFF</span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-amber-400">Limited Time Offer!</h3>
              <p className="text-slate-300 text-sm mt-1">Book your Pune to Mumbai cab today and get up to 30% OFF on your ride.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Live Countdown Clock */}
            <div className="flex items-center space-x-2 text-center">
              <div className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5">
                <span className="text-xl font-bold text-amber-400 block">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[9px] text-slate-400 uppercase">HRS</span>
              </div>
              <span className="text-amber-400 font-bold text-lg">:</span>
              <div className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5">
                <span className="text-xl font-bold text-amber-400 block">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[9px] text-slate-400 uppercase">MINS</span>
              </div>
              <span className="text-amber-400 font-bold text-lg">:</span>
              <div className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5">
                <span className="text-xl font-bold text-amber-400 block">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[9px] text-slate-400 uppercase">SECS</span>
              </div>
            </div>

            <a
              href="#booking-form-section"
              title="Book Your Pune to Mumbai Cab with Special 30% Offer"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl transition-all text-sm flex items-center space-x-2 shadow-md shadow-amber-500/20 uppercase cursor-pointer"
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* TRUST STATS COUNTER ROW (Matching exact reference screenshot) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-slate-800/80">
          <div className="flex items-center space-x-3 p-3 bg-slate-900/40 rounded-xl border border-slate-800/60">
            <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-white block">10+ Years</span>
              <span className="text-xs text-slate-400">Experience</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-slate-900/40 rounded-xl border border-slate-800/60">
            <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-white block">5000+</span>
              <span className="text-xs text-slate-400">Happy Customers</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-slate-900/40 rounded-xl border border-slate-800/60">
            <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-white block">50+</span>
              <span className="text-xs text-slate-400">Well Maintained Cars</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-slate-900/40 rounded-xl border border-slate-800/60">
            <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-white block">24/7</span>
              <span className="text-xs text-slate-400">Customer Support</span>
            </div>
          </div>
        </div>

        {/* OUR FLEET SECTION (Matching exact reference screenshot grid & cards) */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <span>❖ — OUR FLEET — ❖</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Our Fleet</h2>
            <p className="text-slate-400 text-sm">Choose the right car for your comfortable journey</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sedan Card */}
            <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group hover:shadow-2xl hover:shadow-amber-500/10">
              <div>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                  <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-extrabold text-[10px] px-3 py-1 rounded-lg flex items-center space-x-1 shadow-lg z-10 uppercase">
                    <Star className="w-3 h-3 fill-slate-950" />
                    <span>POPULAR</span>
                  </div>
                  <img
                    src="/images/sedan.jpg"
                    alt="Swift Dzire Sedan Cab"
                    title="Swift Dzire Sedan Cab Pune to Mumbai"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 space-y-4 text-center">
                  <h3 className="text-xl font-extrabold text-white">Sedan (Dzire / Etios)</h3>
                  <p className="text-xs text-slate-300 font-semibold flex items-center justify-center space-x-2">
                    <span>👤 4+1 Seater</span>
                    <span className="text-slate-600">•</span>
                    <span>❄️ AC • Comfortable Cab</span>
                  </p>

                  <div className="py-3 border-t border-slate-800/80 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">ONE WAY FARE</span>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-3xl font-extrabold text-amber-400">₹2,999</span>
                      <span className="bg-slate-950 border border-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded font-semibold">One Way</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to="/pune-to-mumbai-cab#booking"
                  title="Book Swift Dzire Sedan Cab"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 rounded-xl transition-all text-xs flex items-center justify-center space-x-2 uppercase tracking-wider cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* SUV Card */}
            <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group hover:shadow-2xl hover:shadow-amber-500/10">
              <div>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                  <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-extrabold text-[10px] px-3 py-1 rounded-lg flex items-center space-x-1 shadow-lg z-10 uppercase">
                    <Star className="w-3 h-3 fill-slate-950" />
                    <span>BEST SELLER</span>
                  </div>
                  <img
                    src="/images/suv.jpg"
                    alt="SUV Maruti Ertiga Cab"
                    title="SUV Maruti Ertiga Cab Pune to Mumbai"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 space-y-4 text-center">
                  <h3 className="text-xl font-extrabold text-white">SUV (Ertiga)</h3>
                  <p className="text-xs text-slate-300 font-semibold flex items-center justify-center space-x-2">
                    <span>👤 6+1 Seater</span>
                    <span className="text-slate-600">•</span>
                    <span>❄️ AC • Family Cab</span>
                  </p>

                  <div className="py-3 border-t border-slate-800/80 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">ONE WAY FARE</span>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-3xl font-extrabold text-amber-400">₹4,499</span>
                      <span className="bg-slate-950 border border-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded font-semibold">One Way</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to="/pune-to-mumbai-cab#booking"
                  title="Book SUV Ertiga Cab"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 rounded-xl transition-all text-xs flex items-center justify-center space-x-2 uppercase tracking-wider cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Toyota Innova Card */}
            <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group hover:shadow-2xl hover:shadow-amber-500/10">
              <div>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                  <img
                    src="/images/innova.jpg"
                    alt="Toyota Innova Cab"
                    title="Toyota Innova Cab Pune to Mumbai"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 space-y-4 text-center">
                  <h3 className="text-xl font-extrabold text-white">Toyota Innova</h3>
                  <p className="text-xs text-slate-300 font-semibold flex items-center justify-center space-x-2">
                    <span>👤 6+1 Seater</span>
                    <span className="text-slate-600">•</span>
                    <span>❄️ AC • Spacious MPV</span>
                  </p>

                  <div className="py-3 border-t border-slate-800/80 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">ONE WAY FARE</span>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-3xl font-extrabold text-amber-400">₹4,999</span>
                      <span className="bg-slate-950 border border-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded font-semibold">One Way</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to="/pune-to-mumbai-cab#booking"
                  title="Book Toyota Innova Cab"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 rounded-xl transition-all text-xs flex items-center justify-center space-x-2 uppercase tracking-wider cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Innova Crysta Card */}
            <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group hover:shadow-2xl hover:shadow-amber-500/10">
              <div>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                  <img
                    src="/images/innova-crysta.jpg"
                    alt="Toyota Innova Crysta Luxury Cab"
                    title="Toyota Innova Crysta Luxury Cab Pune to Mumbai"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 space-y-4 text-center">
                  <h3 className="text-xl font-extrabold text-white">Innova Crysta</h3>
                  <p className="text-xs text-slate-300 font-semibold flex items-center justify-center space-x-2">
                    <span>👤 6+1 Seater</span>
                    <span className="text-slate-600">•</span>
                    <span>❄️ AC • Luxury Cruiser</span>
                  </p>

                  <div className="py-3 border-t border-slate-800/80 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">ONE WAY FARE</span>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-3xl font-extrabold text-amber-400">₹5,999</span>
                      <span className="bg-slate-950 border border-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded font-semibold">One Way</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to="/pune-to-mumbai-cab#booking"
                  title="Book Toyota Innova Crysta Luxury Cab"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 rounded-xl transition-all text-xs flex items-center justify-center space-x-2 uppercase tracking-wider cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Database Pricing Table */}
        <section id="pricing">
          <PricingTable routeSlug="pune-to-mumbai-cab" routeName="Pune to Mumbai" />
        </section>

        {/* Full Booking Form Section */}
        <section id="booking-form-section" className="space-y-4">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-white">Book Your Journey</h2>
            <p className="text-slate-400 text-sm">Fill out details below for instant confirmation with zero advance fee</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <BookingForm />
          </div>
        </section>

        {/* FAQ Section — Professional Accordion */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl overflow-hidden mb-12 shadow-xl">
          {/* FAQ Header */}
          <div className="relative px-8 py-8 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl" />
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
                <p className="text-xs text-slate-400 mt-0.5">Everything you need to know about our Pune ↔ Mumbai cab service</p>
              </div>
            </div>
          </div>

          {/* FAQ Accordion Items */}
          <div className="divide-y divide-slate-800/80">
            {[
              {
                q: "Is toll tax included in the Pune to Mumbai cab fare?",
                a: "Yes! All standard one-way and round-trip fares displayed on our website are all-inclusive — covering the Pune-Mumbai Expressway toll tax, driver allowance, and GST. There are absolutely no hidden charges. You pay exactly what you see at the time of booking."
              },
              {
                q: "How do I book an airport transfer to Mumbai Airport (T1/T2)?",
                a: "Simply select your pickup city and choose 'Mumbai Airport' as your drop location in the booking form. Specify Terminal 1 or Terminal 2 in the notes. Our drivers are well-versed with airport layouts and will drop you right at the departure gate on time."
              },
              {
                q: "What is the cancellation and refund policy?",
                a: "You can cancel your booking free of charge up to 12 hours before the scheduled pickup time. Cancellations within 12 hours incur a 25% fee, and no-shows are non-refundable. Refunds are processed within 24–48 hours to your original payment method."
              },
              {
                q: "How much luggage can I carry?",
                a: "Each vehicle comes with adequate boot space — sedans accommodate 2 medium suitcases, while SUVs (Ertiga, Innova) can hold 3–4 large bags comfortably. If you have excess luggage, please mention it during booking so we can arrange the right vehicle."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept UPI (Google Pay, PhonePe, Paytm), net banking, credit/debit cards, and cash payment to the driver. There is zero advance booking fee — you can pay the driver directly at the end of your trip for complete peace of mind."
              }
            ].map((faq, i) => (
              <div key={i} className="group">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between px-8 py-5 text-left transition-colors hover:bg-slate-800/30 cursor-pointer"
                >
                  <span className="flex items-start space-x-3 pr-4">
                    <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-white group-hover:text-amber-400 transition-colors">
                      {faq.q}
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-8 pb-5 pl-[4.5rem] text-sm text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Bottom CTA */}
          <div className="px-8 py-6 bg-slate-950/50 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Still have questions? Our support team is available 24/7.
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="tel:+919876543210"
                title="Call 24/7 Support +91 98765 43210"
                className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors border border-slate-700"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us</span>
              </a>
              <a
                href="#booking-form-section"
                title="Book Your Cab Now"
                className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-amber-500/20"
              >
                <span>Book Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

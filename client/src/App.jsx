import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import PuneToMumbai from './pages/PuneToMumbai';
import MumbaiToPune from './pages/MumbaiToPune';
import FleetPage from './pages/FleetPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Admin CMS Suite
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminVehicles from './admin/AdminVehicles';
import AdminPricing from './admin/AdminPricing';
import AdminEnquiries from './admin/AdminEnquiries';

import AdminRoutes from './admin/AdminRoutes';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ADMIN LOGIN */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ADMIN PROTECTED CMS LAYOUT */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="vehicles" element={<AdminVehicles />} />
            <Route path="routes" element={<AdminRoutes />} />
            <Route path="pricing" element={<AdminPricing />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
          </Route>

          {/* PUBLIC WEBSITE LAYOUT */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
                <Navbar />
                <main className="flex-grow w-full">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pune-to-mumbai-cab" element={<PuneToMumbai />} />
                    <Route path="/mumbai-to-pune-cab" element={<MumbaiToPune />} />
                    <Route path="/fleet" element={<FleetPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

import axios from 'axios';

// Ensure withCredentials is enabled for HTTP-only cookies
axios.defaults.withCredentials = true;

export const api = {
  // Public APIs
  getVehicles: async () => {
    const res = await axios.get('/api/vehicles');
    return res.data;
  },

  getVehicleBySlug: async (slug) => {
    const res = await axios.get(`/api/vehicles/${slug}`);
    return res.data;
  },

  getRoutes: async () => {
    const res = await axios.get('/api/routes');
    return res.data;
  },

  getRouteBySlug: async (slug) => {
    const res = await axios.get(`/api/routes/${slug}`);
    return res.data;
  },

  getRoutePricing: async (routeIdOrSlug) => {
    const res = await axios.get(`/api/routes/${routeIdOrSlug}/pricing`);
    return res.data;
  },

  submitEnquiry: async (enquiryData) => {
    const res = await axios.post('/api/enquiries', enquiryData);
    return res.data;
  },

  // Auth APIs
  loginAdmin: async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    return res.data;
  },

  logoutAdmin: async () => {
    const res = await axios.post('/api/auth/logout');
    return res.data;
  },

  getCurrentUser: async () => {
    const res = await axios.get('/api/auth/me');
    return res.data;
  },

  // Admin APIs
  getAdminVehicles: async () => {
    const res = await axios.get('/api/admin/vehicles');
    return res.data;
  },

  updateVehicle: async (id, vehicleData) => {
    const res = await axios.put(`/api/admin/vehicles/${id}`, vehicleData);
    return res.data;
  },

  getAdminRoutes: async () => {
    const res = await axios.get('/api/admin/routes');
    return res.data;
  },

  getAdminPricing: async () => {
    const res = await axios.get('/api/admin/pricing');
    return res.data;
  },

  updatePricing: async (id, pricingData) => {
    const res = await axios.put(`/api/admin/pricing/${id}`, pricingData);
    return res.data;
  },

  getAdminEnquiries: async () => {
    const res = await axios.get('/api/admin/enquiries');
    return res.data;
  },

  updateEnquiryStatus: async (id, status) => {
    const res = await axios.put(`/api/admin/enquiries/${id}/status`, { status });
    return res.data;
  }
};

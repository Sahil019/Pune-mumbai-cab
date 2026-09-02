import { dbService } from '../services/dbService.js';
import { validateEnquiry } from '../validators/index.js';

export const publicController = {
  async getVehicles(req, res) {
    try {
      const vehicles = await dbService.getVehicles();
      const activeVehicles = vehicles.filter(v => v.status === 'active');
      return res.json({ success: true, data: activeVehicles });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  async getVehicleBySlug(req, res) {
    try {
      const vehicle = await dbService.getVehicleBySlug(req.params.slug);
      if (!vehicle || vehicle.status !== 'active') {
        return res.status(404).json({ success: false, message: 'Vehicle not found or inactive' });
      }
      return res.json({ success: true, data: vehicle });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  async getRoutes(req, res) {
    try {
      const routes = await dbService.getRoutes();
      const activeRoutes = routes.filter(r => r.status === 'active');
      return res.json({ success: true, data: activeRoutes });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  async getRouteBySlug(req, res) {
    try {
      const route = await dbService.getRouteBySlug(req.params.slug);
      if (!route || route.status !== 'active') {
        return res.status(404).json({ success: false, message: 'Route not found' });
      }
      return res.json({ success: true, data: route });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  async getRoutePricing(req, res) {
    try {
      const { routeId } = req.params;
      const pricing = await dbService.getPricing(routeId);
      return res.json({ success: true, data: pricing });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  async submitEnquiry(req, res) {
    try {
      const { isValid, errors } = validateEnquiry(req.body);
      if (!isValid) {
        return res.status(400).json({ success: false, message: 'Validation failed', errors });
      }

      const newEnquiry = await dbService.createEnquiry({
        name: req.body.name.trim(),
        mobile_number: req.body.mobile_number.trim(),
        email: req.body.email ? req.body.email.trim() : null,
        pickup_location: req.body.pickup_location.trim(),
        drop_location: req.body.drop_location.trim(),
        travel_date: req.body.travel_date,
        travel_time: req.body.travel_time || '08:00 AM',
        trip_type: req.body.trip_type,
        vehicle_id: req.body.vehicle_id || null,
        number_of_passengers: req.body.number_of_passengers || 1,
        message: req.body.message || ''
      });

      return res.status(201).json({
        success: true,
        message: 'Booking enquiry submitted successfully!',
        data: newEnquiry
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
};

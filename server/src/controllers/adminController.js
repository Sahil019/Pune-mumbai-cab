import { dbService } from '../services/dbService.js';
import { validatePricingUpdate } from '../validators/index.js';
import { ADMIN_SECRET_TOKEN } from '../middleware/auth.js';

export const adminController = {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (email === 'admin@punemumbaicabs.com' && (password === 'admin123' || password === 'admin@2026')) {
        return res.json({
          success: true,
          token: ADMIN_SECRET_TOKEN,
          user: { email: 'admin@punemumbaicabs.com', role: 'admin' }
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Invalid administrative email or password.'
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // VEHICLES CRUD
  async getVehicles(req, res) {
    try {
      const vehicles = await dbService.getVehicles();
      return res.json({ success: true, data: vehicles });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  async createVehicle(req, res) {
    try {
      const vehicle = await dbService.createVehicle(req.body);
      return res.status(201).json({ success: true, data: vehicle });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  async updateVehicle(req, res) {
    try {
      const updated = await dbService.updateVehicle(req.params.id, req.body);
      if (!updated) return res.status(404).json({ success: false, message: 'Vehicle not found' });
      return res.json({ success: true, data: updated });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  async deleteVehicle(req, res) {
    try {
      await dbService.deleteVehicle(req.params.id);
      return res.json({ success: true, message: 'Vehicle deleted/deactivated' });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // ROUTES CRUD
  async getRoutes(req, res) {
    try {
      const routes = await dbService.getRoutes();
      return res.json({ success: true, data: routes });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  async createRoute(req, res) {
    try {
      const route = await dbService.createRoute(req.body);
      return res.status(201).json({ success: true, data: route });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  async updateRoute(req, res) {
    try {
      const updated = await dbService.updateRoute(req.params.id, req.body);
      if (!updated) return res.status(404).json({ success: false, message: 'Route not found' });
      return res.json({ success: true, data: updated });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  async deleteRoute(req, res) {
    try {
      await dbService.deleteRoute(req.params.id);
      return res.json({ success: true, message: 'Route deleted/deactivated' });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // PRICING MANAGEMENT (Core Requirement)
  async getPricing(req, res) {
    try {
      const pricing = await dbService.getPricing();
      return res.json({ success: true, data: pricing });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  async updatePricing(req, res) {
    try {
      const { id } = req.params;
      const { isValid, errors } = validatePricingUpdate(req.body);
      if (!isValid) {
        return res.status(400).json({ success: false, message: 'Invalid pricing data', errors });
      }

      const updated = await dbService.updatePricing(id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Pricing record not found' });
      }

      return res.json({
        success: true,
        message: 'Dynamic pricing updated successfully in database!',
        data: updated
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // ENQUIRIES MANAGEMENT
  async getEnquiries(req, res) {
    try {
      const enquiries = await dbService.getEnquiries();
      return res.json({ success: true, data: enquiries });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  async getEnquiryById(req, res) {
    try {
      const enquiry = await dbService.getEnquiryById(req.params.id);
      if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
      return res.json({ success: true, data: enquiry });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  async updateEnquiryStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      if (!['New', 'Contacted', 'Confirmed', 'Closed'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status value' });
      }

      const updated = await dbService.updateEnquiryStatus(id, status);
      if (!updated) return res.status(404).json({ success: false, message: 'Enquiry not found' });

      return res.json({
        success: true,
        message: `Enquiry status updated to "${status}"`,
        data: updated
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
};

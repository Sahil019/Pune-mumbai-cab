import { vehicleService } from '../services/vehicleService.js';

export const vehicleController = {
  getVehicles: async (req, res, next) => {
    try {
      const vehicles = await vehicleService.getAllVehicles(false);
      res.json({ success: true, data: vehicles });
    } catch (err) {
      next(err);
    }
  },

  getVehicleBySlug: async (req, res, next) => {
    try {
      const vehicle = await vehicleService.getVehicleBySlug(req.params.slug);
      res.json({ success: true, data: vehicle });
    } catch (err) {
      next(err);
    }
  },

  getAdminVehicles: async (req, res, next) => {
    try {
      const vehicles = await vehicleService.getAllVehicles(true);
      res.json({ success: true, data: vehicles });
    } catch (err) {
      next(err);
    }
  },

  createVehicle: async (req, res, next) => {
    try {
      const vehicle = await vehicleService.createVehicle(req.body);
      res.status(201).json({ success: true, data: vehicle });
    } catch (err) {
      next(err);
    }
  },

  updateVehicle: async (req, res, next) => {
    try {
      const vehicle = await vehicleService.updateVehicle(req.params.id, req.body);
      res.json({ success: true, data: vehicle });
    } catch (err) {
      next(err);
    }
  },

  deleteVehicle: async (req, res, next) => {
    try {
      const result = await vehicleService.deleteVehicle(req.params.id);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }
};

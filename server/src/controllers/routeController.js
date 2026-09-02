import { routeService } from '../services/routeService.js';
import { pricingService } from '../services/pricingService.js';

export const routeController = {
  getRoutes: async (req, res, next) => {
    try {
      const routes = await routeService.getAllRoutes(false);
      res.json({ success: true, data: routes });
    } catch (err) {
      next(err);
    }
  },

  getRouteBySlug: async (req, res, next) => {
    try {
      const route = await routeService.getRouteBySlug(req.params.slug);
      res.json({ success: true, data: route });
    } catch (err) {
      next(err);
    }
  },

  getRoutePricing: async (req, res, next) => {
    try {
      const pricing = await pricingService.getPricingByRouteId(req.params.routeId);
      res.json({ success: true, data: pricing });
    } catch (err) {
      next(err);
    }
  },

  getAdminRoutes: async (req, res, next) => {
    try {
      const routes = await routeService.getAllRoutes(true);
      res.json({ success: true, data: routes });
    } catch (err) {
      next(err);
    }
  },

  createRoute: async (req, res, next) => {
    try {
      const route = await routeService.createRoute(req.body);
      res.status(201).json({ success: true, data: route });
    } catch (err) {
      next(err);
    }
  },

  updateRoute: async (req, res, next) => {
    try {
      const route = await routeService.updateRoute(req.params.id, req.body);
      res.json({ success: true, data: route });
    } catch (err) {
      next(err);
    }
  },

  deleteRoute: async (req, res, next) => {
    try {
      const result = await routeService.deleteRoute(req.params.id);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }
};

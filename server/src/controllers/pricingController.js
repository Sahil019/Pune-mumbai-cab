import { pricingService } from '../services/pricingService.js';

export const pricingController = {
  getAllPricing: async (req, res, next) => {
    try {
      const pricing = await pricingService.getAllPricing();
      res.json({ success: true, data: pricing });
    } catch (err) {
      next(err);
    }
  },

  updatePricing: async (req, res, next) => {
    try {
      const updated = await pricingService.updatePricing(req.params.id, req.body);
      res.json({ success: true, data: updated });
    } catch (err) {
      next(err);
    }
  },

  upsertPricing: async (req, res, next) => {
    try {
      const result = await pricingService.upsertPricing(req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }
};

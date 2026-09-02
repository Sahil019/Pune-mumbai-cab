import express from 'express';
import { authController } from '../controllers/authController.js';
import { vehicleController } from '../controllers/vehicleController.js';
import { routeController } from '../controllers/routeController.js';
import { pricingController } from '../controllers/pricingController.js';
import { enquiryController } from '../controllers/enquiryController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Auth Routes - support both /api/admin/login and /api/admin/auth/login
router.post('/login', authController.login);
router.post('/auth/login', authController.login);
router.get('/auth/me', authMiddleware, authController.me);

// Protected Admin Routes
router.use(authMiddleware);

// Vehicles CMS
router.get('/vehicles', vehicleController.getAdminVehicles);
router.post('/vehicles', vehicleController.createVehicle);
router.put('/vehicles/:id', vehicleController.updateVehicle);
router.delete('/vehicles/:id', vehicleController.deleteVehicle);

// Routes CMS
router.get('/routes', routeController.getAdminRoutes);
router.post('/routes', routeController.createRoute);
router.put('/routes/:id', routeController.updateRoute);
router.delete('/routes/:id', routeController.deleteRoute);

// Pricing CMS
router.get('/pricing', pricingController.getAllPricing);
router.put('/pricing/:id', pricingController.updatePricing);
router.post('/pricing', pricingController.upsertPricing);

// Enquiry CMS
router.get('/enquiries', enquiryController.getAllEnquiries);
router.get('/enquiries/:id', enquiryController.getEnquiryById);
router.put('/enquiries/:id/status', enquiryController.updateStatus);
router.put('/enquiries/:id', enquiryController.updateStatus);

export default router;

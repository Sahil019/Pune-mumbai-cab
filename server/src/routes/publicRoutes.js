import express from 'express';
import { authController } from '../controllers/authController.js';
import { vehicleController } from '../controllers/vehicleController.js';
import { routeController } from '../controllers/routeController.js';
import { enquiryController } from '../controllers/enquiryController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Auth Endpoints
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);
router.get('/auth/me', authMiddleware, authController.me);

// Vehicles
router.get('/vehicles', vehicleController.getVehicles);
router.get('/vehicles/:slug', vehicleController.getVehicleBySlug);

// Routes & Dynamic Pricing
router.get('/routes', routeController.getRoutes);
router.get('/routes/:slug', routeController.getRouteBySlug);
router.get('/routes/:routeId/pricing', routeController.getRoutePricing);

// Customer Enquiry Submission
router.post('/enquiries', enquiryController.createEnquiry);

export default router;

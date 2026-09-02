import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { connectDB } from './config/db.js';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Connect to MongoDB
connectDB();

// 1. Production Security Headers (Helmet)
app.use(helmet({
  contentSecurityPolicy: false, // Disabled for flexible cross-origin assets in dev/demo
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// 2. NoSQL Injection Prevention (Sanitizes req.body, req.query, req.params)
app.use(mongoSanitize({
  replaceWith: '_'
}));

// 3. Strict CORS Origin Policy
app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 4. Request Payload Size Limit (Prevents payload memory flood DDoS)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// 5. Rate Limiting Protection

// Login Brute Force Protection (Max 10 login attempts per 15 mins)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many authentication attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Booking Enquiry Spam Protection (Max 20 booking enquiries per 15 mins)
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many booking enquiries submitted. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// General API Protection (Max 300 requests per 15 mins)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { success: false, message: 'Rate limit exceeded. Please slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/admin/login', authLimiter);
app.use('/api/enquiries', enquiryLimiter);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Pune ↔ Mumbai Cab Booking & CMS MERN API is running',
    stack: 'MERN (MongoDB, Express, React, Node.js)',
    database: 'MongoDB / Mongoose',
    security: 'Production Hardened (Helmet, Rate-Limited, NoSQL-Sanitized, JWT-Protected)'
  });
});

// Technical SEO Endpoints
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/admin/\n\nSitemap: http://localhost:${PORT}/sitemap.xml`);
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>http://localhost:3000/</loc><priority>1.0</priority></url>
  <url><loc>http://localhost:3000/pune-to-mumbai-cab</loc><priority>0.9</priority></url>
  <url><loc>http://localhost:3000/mumbai-to-pune-cab</loc><priority>0.9</priority></url>
  <url><loc>http://localhost:3000/fleet</loc><priority>0.8</priority></url>
  <url><loc>http://localhost:3000/about</loc><priority>0.7</priority></url>
  <url><loc>http://localhost:3000/contact</loc><priority>0.8</priority></url>
</urlset>`);
});

// API Routes
app.use('/api', publicRoutes);
app.use('/api/auth', publicRoutes);
app.use('/api/admin', adminRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Production-Hardened MERN Server running on http://localhost:${PORT}`);
  console.log(`🔒 Security active: Helmet, NoSQL Sanitizer, Rate Limiters, CORS Protection`);
});

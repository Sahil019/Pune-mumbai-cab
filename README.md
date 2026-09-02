# 🚖 Pune ↔ Mumbai Cab Service — MERN Stack Website & Admin CMS

A production-grade, conversion-focused **intercity cab booking website** with a fully functional **Admin CMS** built on the **MERN Stack** (MongoDB, Express.js, React 19, Node.js). Features dynamic database-driven pricing, real-time admin management, professional SEO, custom AI-generated fleet photography, production-hardened API security, and a polished dark-themed UI.

---

## 🔐 Default Admin Credentials

| Field | Value |
|---|---|
| **Admin Login URL** | `http://localhost:3000/admin/login` |
| **Default Email** | `admin@punemumbaicabs.com` |
| **Default Password** | `admin123` |
| **Auth Type** | JWT Token + HTTP-Only Cookie Session |

> ⚠️ **Production Note:** Change these default credentials before deploying to production. Update `ADMIN_EMAIL` and `ADMIN_PASSWORD` in your `.env` file and re-run `npm run seed`.

---

## 📸 Live Preview & Features

| Public Website | Admin CMS |
|---|---|
| Hero with intercity search widget | Live KPI Dashboard |
| Custom photorealistic Indian fleet cards | Vehicle CRUD & Status Toggle |
| Dynamic database pricing matrix | Route Management |
| Mumbai Airport T2 Arrival Pickups | Inline Dynamic Fare Editor |
| Interactive animated booking form | Live Customer Enquiry Tracker |
| 100% Technical & Image SEO Compliant | JWT Security & Protected Routes |

---

## 🚀 Key Technical Features

### Customer-Facing Website
- **SEO-Optimized Landing Pages** — Dedicated pages for Pune→Mumbai, Mumbai→Pune, and Fleet with 54-char title tags, 151-char meta descriptions, canonical URLs, Open Graph, Twitter Cards, and JSON-LD structured data.
- **Image & Link SEO Compliance** — All vehicle images include descriptive `alt` and `title` tags; all internal navigation links include `title="..."` attributes.
- **Dynamic Database Pricing** — Fares are loaded directly from MongoDB (`RoutePricing` collection). Admin changes instantly reflect on the public site without restarting.
- **Indian Fleet Photography** — High-res custom photography for Suzuki Swift Dzire, Maruti Ertiga SUV, Toyota Innova, and Toyota Innova Crysta.
- **Mumbai Airport T2 Special Section** — Dedicated airport arrival section featuring custom Chhatrapati Shivaji Maharaj International Airport T2 terminal background photography.
- **Interactive Animated Booking Form** — Vehicle selector pills, trip type toggle (One Way / Round Trip), real-time field validation, focus glow micro-animations, and instant booking summary modal.
- **Interactive FAQ Accordion** — Collapsible FAQs with smooth transitions and quick contact CTA triggers.

### Production-Hardened Backend Security
- **HTTP Security Headers (`helmet`)** — Enables 11 security headers (`X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, HSTS, XSS protection).
- **NoSQL Injection Prevention (`express-mongo-sanitize`)** — Automatically strips MongoDB operators (`$gt`, `$where`) from `req.body`, `req.query`, and `req.params`.
- **DDoS & Brute-Force Rate Limiting (`express-rate-limit`)**:
  - `authLimiter`: Max 10 login requests per 15 minutes per IP on `/api/auth/login`.
  - `enquiryLimiter`: Max 20 booking enquiries per 15 minutes per IP on `/api/enquiries`.
  - `apiLimiter`: Max 300 requests per 15 minutes per IP across general API endpoints.
- **Request Size Limiting** — Capped at `10kb` (`express.json({ limit: '10kb' })`) to prevent memory exhaustion flood attacks.

---

## 🔮 Unique Future Features You Can Add

### 🤖 1. AI & Smart Features
| Feature | Description |
|---|---|
| **AI Dynamic Price Predictor** | Machine learning algorithm that automatically adjusts fares based on peak weekend demand, monsoon season, and holiday travel rushes |
| **Google Maps Live Distance & Toll API** | Calculate exact live distance, toll gate costs, and real-time travel duration for custom routes |
| **AI WhatsApp Booking Assistant** | AI bot on WhatsApp capable of quoting prices, confirming pickup slots, and issuing PDF tickets 24/7 |
| **Automated Driver Dispatching** | Smart algorithm matching nearest available driver based on GPS location and vehicle type |

### 💳 2. Payments & Financial Features
| Feature | Description |
|---|---|
| **Razorpay / UPI Payment Gateway** | Accept instant advance payments via UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, and Netbanking |
| **Automated GST Invoice Generator** | Downloadable PDF invoices with GST details for corporate expense claims |
| **Promo Code & Discount Engine** | Admin-managed coupon codes (e.g., `FIRST500`, `FESTIVE20`) with usage limits and minimum fare constraints |
| **Driver Earnings & Commission Portal** | Dashboard tracking driver payout, commission splits, and fuel expense logging |

### 📱 3. Real-Time Tracking & Mobile App
| Feature | Description |
|---|---|
| **Live Driver GPS Tracking** | Customer web tracking link showing live driver location on Google Maps once ride is assigned |
| **SMS & WhatsApp Alerts** | Automatic SMS alerts when driver is assigned, arriving, or trip is completed |
| **Driver Companion PWA / Mobile App** | Native mobile app for cab drivers to manage trips, start rides, and collect payment |
| **Push Notifications** | Browser push notifications for instant booking status updates and special fare sales |

### 📊 4. Business Intelligence & Analytics
| Feature | Description |
|---|---|
| **Revenue & Profitability Analytics** | Interactive Recharts dashboard showing daily revenue, net profit margin, and top performing vehicles |
| **Route Demand Heatmap** | Visual map displaying high-volume pickup zones across Pune and Mumbai |
| **Audit Logs & Activity Stream** | Complete admin audit log recording every pricing edit, status change, and user login with IP timestamps |
| **Role-Based Admin Access (RBAC)** | Multi-tier admin permissions (Super Admin, Fleet Manager, Support Agent, Accountant) |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 8, TailwindCSS v4, React Router v7, Lucide Icons |
| **Backend** | Node.js, Express.js 4 |
| **Database** | MongoDB (Mongoose ODM) |
| **Security** | Helmet, Express-Rate-Limit, Express-Mongo-Sanitize, JWT, BcryptJS, HTTP-Only Cookies |
| **SEO** | React Helmet Async, OpenGraph, JSON-LD Schema |

---

## ⚡ Quick Start Guide

### Prerequisites
- **Node.js** ≥ 18
- **MongoDB** running locally or MongoDB Atlas URI

### 1. Clone & Install

```bash
git clone https://github.com/Sahil019/Pune-mumbai-cab.git
cd Pune-mumbai-cab

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Environment

Copy `.env.example` to `server/.env`:

```bash
cp .env.example server/.env
```

Set environment variables in `server/.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/pune_mumbai_cab
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Admin Credentials (used during seeding)
ADMIN_NAME=Admin User
ADMIN_EMAIL=admin@punemumbaicabs.com
ADMIN_PASSWORD=admin123
```

### 3. Seed Database

```bash
cd server
npm run seed
```

This creates:
- 1 Default Admin User (`admin@punemumbaicabs.com` / `admin123`)
- 4 Indian Cab Models (Swift Dzire, Ertiga SUV, Toyota Innova, Innova Crysta)
- 2 Primary Intercity Routes (Pune→Mumbai, Mumbai→Pune)
- 8 Dynamic Route Pricing Entries
- 1 Initial Enquiry

### 4. Run Servers

**Terminal 1 — Express Backend:**
```bash
cd server
npm run dev
# → API running on http://localhost:5000
```

**Terminal 2 — React Frontend:**
```bash
cd client
npm run dev
# → Public Web App running on http://localhost:3000
```

---

## 📄 License
This project is open-source under the MIT License. Built for commercial and educational use.

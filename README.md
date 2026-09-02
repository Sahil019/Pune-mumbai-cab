# 🚖 Pune ↔ Mumbai Cab Service — MERN Stack Website & Admin CMS

A production-grade, conversion-focused **intercity cab booking website** with a fully functional **Admin CMS** built on the **MERN Stack** (MongoDB, Express.js, React 19, Node.js). Features dynamic database-driven pricing, real-time admin management, professional SEO, and a polished dark-themed UI.

---

## 📸 Live Preview

| Public Website | Admin CMS |
|---|---|
| Hero with search widget | Dashboard with live stats |
| Fleet vehicle cards | Vehicle / Route CRUD |
| Dynamic pricing tables | Dynamic pricing editor |
| Professional booking form | Enquiry management |
| Interactive FAQ accordion | JWT-protected auth |

---

## 🚀 Key Features

### Customer-Facing Website
- **SEO-Optimized Landing Pages** — Dedicated pages for Pune→Mumbai and Mumbai→Pune with unique titles, meta descriptions, canonical URLs, Open Graph, and JSON-LD structured data
- **Dynamic Database Pricing** — All prices are fetched from MongoDB, never hard-coded. Admin changes instantly reflect on the public site
- **Interactive Fare Estimator** — Search bar with trip type toggle (One Way / Round Trip), city inputs, date picker, and passenger selector
- **Fleet Showcase** — Vehicle cards with images, seating capacity, and real-time pricing loaded from the database
- **Professional Booking Form** — Multi-field enquiry form with inline per-field validation, real-time blur validation, red/green border states, and error messaging
- **Interactive FAQ Accordion** — 5 collapsible questions with smooth animations and numbered items
- **Special Offer Banner** — Countdown timer with live ticking seconds
- **Mobile-First Responsive** — Fully responsive across mobile, tablet, and desktop

### Admin CMS
- **JWT Authentication** — Secure login with HTTP-only cookies and Bearer token fallback
- **Protected Routes** — Server-side authorization on all admin API endpoints
- **Vehicle Management** — Add, edit, deactivate fleet vehicles (auto-creates pricing entries for all routes)
- **Route Management** — Create and manage intercity travel routes
- **Dynamic Pricing Editor** — Inline-edit one-way and round-trip prices per route+vehicle combination
- **Enquiry Tracker** — View customer bookings, update status (New → Contacted → Confirmed → Closed)
- **Hero Background Images** — Admin login and dashboard pages feature styled hero backgrounds

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 8, TailwindCSS v4, React Router v7 |
| **Icons** | Lucide React |
| **HTTP Client** | Axios |
| **Backend** | Node.js, Express.js 4 |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | JWT (jsonwebtoken) + bcryptjs + HTTP-only cookies |
| **Dev Tools** | Nodemon, OxLint |

---

## 🔐 Admin Credentials

| Field | Value |
|---|---|
| **URL** | `http://localhost:3000/admin/login` |
| **Email** | `admin@punemumbaicabs.com` |
| **Password** | `admin123` |

> ⚠️ **Change these credentials before deploying to production.** Update `ADMIN_EMAIL` and `ADMIN_PASSWORD` in your `.env` file and re-run `npm run seed`.

---

## 📁 Project Structure

```
pune-mumbai-cab/
├── client/                          # React Frontend
│   ├── public/
│   │   └── images/
│   │       └── hero-bg.jpg          # Hero background image
│   ├── src/
│   │   ├── admin/                   # Admin CMS pages
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminVehicles.jsx
│   │   │   ├── AdminPricing.jsx
│   │   │   ├── AdminEnquiries.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   └── AdminRoutes.jsx
│   │   ├── components/              # Shared components
│   │   │   ├── BookingForm.jsx      # Professional booking form with validation
│   │   │   ├── PricingTable.jsx
│   │   │   └── SEO.jsx
│   │   ├── pages/                   # Public pages
│   │   │   ├── Home.jsx
│   │   │   ├── PuneToMumbai.jsx
│   │   │   ├── MumbaiToPune.jsx
│   │   │   ├── FleetPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   └── ContactPage.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
│
├── server/                          # Express Backend
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── vehicleController.js
│   │   │   ├── routeController.js
│   │   │   ├── pricingController.js
│   │   │   └── enquiryController.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── vehicleService.js    # Auto-creates pricing on vehicle add
│   │   │   ├── routeService.js
│   │   │   ├── pricingService.js
│   │   │   └── enquiryService.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Vehicle.js
│   │   │   ├── Route.js
│   │   │   ├── RoutePricing.js
│   │   │   └── Enquiry.js
│   │   ├── routes/
│   │   │   ├── adminRoutes.js
│   │   │   ├── publicRoutes.js
│   │   │   └── authRoutes.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── db/
│   │   │   └── store.js             # Seed data + in-memory fallback
│   │   ├── scripts/
│   │   │   └── seed.js              # Database seeder
│   │   └── index.js
│   └── .env
│
├── .env.example
├── ARCHITECTURE.md
├── PRD.md
└── README.md
```

---

## ⚡ Quick Start

### Prerequisites
- **Node.js** ≥ 18
- **MongoDB** running locally or MongoDB Atlas URI

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd pune-mumbai-cab

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Environment

```bash
cp .env.example server/.env
```

Edit `server/.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/pune_mumbai_cab
JWT_SECRET=your_super_secret_key_here
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Admin Credentials (used during seeding)
ADMIN_NAME=Admin User
ADMIN_EMAIL=admin@punemumbaicabs.com
ADMIN_PASSWORD=admin123
```

### 3. Seed the Database

```bash
cd server
npm run seed
```

This creates:
- 1 Admin user
- 4 Fleet vehicles (Sedan, SUV, Innova, Crysta)
- 2 Routes (Pune→Mumbai, Mumbai→Pune)
- 8 Route pricing records (vehicle × route matrix)
- 1 Sample enquiry

### 4. Run Development Servers

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# → http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# → http://localhost:3000
```

---

## 📡 API Reference

### Public Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/vehicles` | List all active vehicles |
| `GET` | `/api/vehicles/:slug` | Get vehicle by slug |
| `GET` | `/api/routes` | List all active routes |
| `GET` | `/api/routes/:slug` | Get route with pricing |
| `GET` | `/api/routes/:routeId/pricing` | Get pricing by route |
| `POST` | `/api/enquiries` | Submit booking enquiry |

### Auth Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Admin login (returns JWT + cookie) |
| `POST` | `/api/auth/logout` | Clear auth session |
| `GET` | `/api/auth/me` | Get current authenticated user |

### Admin Endpoints (Protected — requires JWT)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/vehicles` | List all vehicles (incl. inactive) |
| `POST` | `/api/admin/vehicles` | Add new vehicle (auto-creates pricing) |
| `PUT` | `/api/admin/vehicles/:id` | Update vehicle |
| `DELETE` | `/api/admin/vehicles/:id` | Delete vehicle |
| `GET` | `/api/admin/routes` | List all routes |
| `POST` | `/api/admin/routes` | Add new route |
| `PUT` | `/api/admin/routes/:id` | Update route |
| `DELETE` | `/api/admin/routes/:id` | Delete route |
| `GET` | `/api/admin/pricing` | Get all pricing records |
| `PUT` | `/api/admin/pricing/:id` | Update pricing (one-way / round-trip) |
| `POST` | `/api/admin/pricing` | Upsert pricing entry |
| `GET` | `/api/admin/enquiries` | List all enquiries |
| `PUT` | `/api/admin/enquiries/:id/status` | Update enquiry status |

---

## 🗄️ Database Schema

```
┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
│    routes     │       │  route_pricing   │       │   vehicles   │
├──────────────┤       ├──────────────────┤       ├──────────────┤
│ _id          │──1:N──│ route (FK)       │──N:1──│ _id          │
│ name         │       │ vehicle (FK)     │       │ name         │
│ slug (uniq)  │       │ oneWayPrice      │       │ slug (uniq)  │
│ origin       │       │ roundTripPrice   │       │ passengerCap │
│ destination  │       └──────────────────┘       │ imageUrl     │
│ distance     │                                  │ isActive     │
│ travelTime   │                                  └──────────────┘
│ isActive     │
└──────────────┘

┌──────────────────────────────┐       ┌──────────────┐
│          enquiries           │       │     users    │
├──────────────────────────────┤       ├──────────────┤
│ name                         │       │ name         │
│ mobile_number                │       │ email (uniq) │
│ email                        │       │ password     │
│ pickup_location              │       │ role         │
│ drop_location                │       └──────────────┘
│ travel_date                  │
│ travel_time                  │
│ trip_type                    │
│ vehicle_id                   │
│ number_of_passengers         │
│ message                      │
│ status (New/Contacted/...)   │
└──────────────────────────────┘
```

---

## 🧪 Demo Scenario: Dynamic Pricing

This is the core functional requirement:

1. Open `http://localhost:3000/admin/login`
2. Login with admin credentials
3. Navigate to **Dynamic Pricing**
4. Find **Pune → Mumbai + Sedan** row
5. Click **Edit Fare** → change ₹2,999 to ₹3,499 → click **Save**
6. Open `http://localhost:3000` (public homepage)
7. The fleet section and pricing table now show **₹3,499**

✅ Pricing is database-driven — no code changes required.

---

## 🔮 Unique Future Features to Add

### 🤖 AI & Smart Features
| Feature | Description |
|---|---|
| **AI Fare Predictor** | Use historical booking data + demand patterns to suggest optimal dynamic pricing |
| **Smart Route Optimizer** | Integrate Google Maps API to calculate real-time fare based on actual distance + tolls |
| **Chatbot Assistant** | AI-powered WhatsApp/web chatbot for instant booking and FAQs |
| **Sentiment Analysis** | Auto-analyse customer messages to flag urgent/angry enquiries |

### 💳 Payments & Business
| Feature | Description |
|---|---|
| **Razorpay / Stripe Integration** | Online advance payment option with refund support |
| **Invoice Generator** | Auto-generate PDF invoices with GST for corporate clients |
| **Coupon & Promo Codes** | Discount code system with expiry, usage limits, and minimum fare |
| **Corporate Dashboard** | Dedicated portal for business clients with monthly billing and trip history |
| **Loyalty Program** | Points-based reward system for repeat customers |

### 📱 Mobile & Communication
| Feature | Description |
|---|---|
| **WhatsApp Booking API** | Send booking confirmations and driver details via WhatsApp |
| **SMS Notifications** | Automated trip reminders, OTP verification, and driver arrival alerts |
| **PWA Support** | Make the website installable as a Progressive Web App on mobile |
| **Push Notifications** | Browser push notifications for fare drops and offers |
| **Driver App** | Separate React Native app for drivers to accept/reject rides |

### 📊 Admin & Analytics
| Feature | Description |
|---|---|
| **Revenue Dashboard** | Charts showing daily/weekly/monthly revenue, bookings, and trends |
| **Booking Heatmap** | Visual map showing peak booking times and popular routes |
| **Driver Management** | Add drivers, assign vehicles, track performance ratings |
| **Multi-Route Support** | Add routes beyond Pune-Mumbai (e.g., Pune-Nashik, Mumbai-Goa) |
| **Vehicle Image Upload** | Upload vehicle photos directly from admin instead of URL |
| **Email Reports** | Weekly automated email reports to admin with key metrics |
| **Audit Log** | Track all admin actions (who changed what price, when) |
| **Role-Based Access** | Support for multiple admin roles (Super Admin, Manager, Viewer) |

### 🔍 SEO & Marketing
| Feature | Description |
|---|---|
| **Google Analytics Integration** | Track visitor behaviour, conversion funnel, and bounce rate |
| **Blog / Travel Guide** | SEO-rich content hub (e.g., "Best stops on Pune-Mumbai Expressway") |
| **Google Search Console** | Submit sitemap and monitor indexing status |
| **Schema Markup Expansion** | Add Review, Event, and Offer structured data |
| **Referral System** | Refer-a-friend program with tracking codes |
| **A/B Testing** | Test different CTA buttons, form layouts, and hero sections |

### 🛡️ Security & Performance
| Feature | Description |
|---|---|
| **Rate Limiting** | Prevent API abuse with express-rate-limit |
| **ReCAPTCHA** | Add Google reCAPTCHA to booking form to prevent spam |
| **Two-Factor Auth** | OTP-based 2FA for admin login |
| **Image Optimization** | Auto-compress and resize vehicle images on upload |
| **Redis Caching** | Cache vehicle/route data to reduce MongoDB queries |
| **CI/CD Pipeline** | GitHub Actions for automated testing and deployment |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│              BROWSER (User)                 │
│  ┌──────────────┐  ┌────────────────────┐   │
│  │ Public React  │  │   Admin React      │   │
│  │ Pages         │  │   CMS Pages        │   │
│  └──────┬───────┘  └────────┬───────────┘   │
│         └──────────┬────────┘               │
└────────────────────┼────────────────────────┘
                     │ HTTP / REST / JSON
┌────────────────────┼────────────────────────┐
│         EXPRESS.JS API SERVER               │
│  Routes → Controllers → Services → Models   │
│  JWT Auth │ Input Validation │ Error Handle  │
└────────────────────┼────────────────────────┘
                     │ Mongoose ODM
┌────────────────────┼────────────────────────┐
│              MONGODB                        │
│  users │ vehicles │ routes │                │
│  route_pricing │ enquiries                  │
└─────────────────────────────────────────────┘
```

---

## 📄 License

This project is for educational and commercial use. Modify freely for your cab service business.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

For issues or questions:
- **Email:** booking@punemumbaicabs.com
- **Phone:** +91 98765 43210

---

> **Built with ❤️ using React 19, Express.js, MongoDB, and TailwindCSS**

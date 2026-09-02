# SYSTEM ARCHITECTURE --- Pune ↔ Mumbai Cab Booking Website

**Project:** Pune ↔ Mumbai Cab Service Website + CMS\
**Architecture:** React + Node.js + Express + Supabase PostgreSQL\
**Document:** Technical System Architecture\
**Status:** Implementation Blueprint\
**Version:** 1.0

------------------------------------------------------------------------

# 1. Architecture Overview

The application is a full-stack cab-service website with two major
systems:

1.  **Public Website**
    -   SEO-focused customer-facing website.
    -   Displays routes, vehicles, pricing and service information.
    -   Provides booking/enquiry functionality.
2.  **Admin CMS**
    -   Secure administrator interface.
    -   Allows business owners to manage vehicles, routes, pricing and
        enquiries.
    -   Pricing changes must immediately become available to the public
        website through the database/API.

The recommended architecture is:

``` text
┌───────────────────────────────────────────────────────────────┐
│                        CUSTOMER / ADMIN                       │
└──────────────────────────────┬────────────────────────────────┘
                               │
                               ▼
┌───────────────────────────────────────────────────────────────┐
│                     REACT FRONTEND                            │
│                                                               │
│  Public Website              Admin CMS                        │
│  ├── Home                    ├── Login                        │
│  ├── Pune → Mumbai            ├── Dashboard                    │
│  ├── Mumbai → Pune            ├── Vehicles                     │
│  ├── Fleet                    ├── Routes                       │
│  ├── About                    ├── Pricing                      │
│  └── Contact                  └── Enquiries                    │
└──────────────────────────────┬────────────────────────────────┘
                               │ HTTPS / JSON
                               ▼
┌───────────────────────────────────────────────────────────────┐
│                    NODE.JS + EXPRESS API                      │
│                                                               │
│  Routes → Controllers → Services → Validation → Database     │
│                                                               │
│  Authentication / Authorization                               │
│  Error Handling                                               │
│  Input Validation                                             │
│  Business Rules                                               │
└──────────────────────────────┬────────────────────────────────┘
                               │
                               ▼
┌───────────────────────────────────────────────────────────────┐
│                         SUPABASE                              │
│                                                               │
│  PostgreSQL Database                                          │
│  ├── vehicles                                                  │
│  ├── routes                                                    │
│  ├── route_pricing                                             │
│  └── enquiries                                                 │
│                                                               │
│  Supabase Auth                                                 │
│  Supabase Storage                                              │
└───────────────────────────────────────────────────────────────┘
```

------------------------------------------------------------------------

# 2. Technology Stack

## Frontend

Recommended:

-   React
-   React Router
-   JavaScript or TypeScript
-   CSS / Tailwind CSS
-   Fetch API or Axios
-   React Hook Form or controlled forms
-   A metadata strategy suitable for the chosen React deployment

## Backend

-   Node.js
-   Express.js
-   REST API
-   Server-side validation
-   Authentication middleware
-   Authorization middleware

## Database / Backend Services

-   Supabase
-   PostgreSQL
-   Supabase Auth
-   Supabase Storage where required

## Development

-   Git
-   `.env`
-   `.env.example`
-   ESLint
-   Prettier
-   npm

------------------------------------------------------------------------

# 3. Why This Architecture

The assignment explicitly allows the developer to choose the technology
stack and mentions React, Node.js, Express, Supabase and PostgreSQL.

This architecture is preferred because the application's data is
relational:

``` text
Route
   │
   ├── Vehicle
   │
   └── Route-specific Pricing

Customer
   │
   └── Enquiry
```

Supabase PostgreSQL is therefore a strong fit.

A MongoDB-based MERN implementation is possible, but PostgreSQL is
cleaner for:

-   Route relationships
-   Vehicle relationships
-   Route/vehicle pricing
-   Constraints
-   Unique slugs
-   Referential integrity
-   Querying CMS data

Therefore the practical architecture is:

``` text
React
+
Node.js
+
Express
+
Supabase PostgreSQL
```

This should be described as a **React + Express + Supabase/PostgreSQL
full-stack application**, rather than claiming it is traditional MERN.

------------------------------------------------------------------------

# 4. High-Level System Components

``` text
                    ┌────────────────────┐
                    │      Browser       │
                    └─────────┬──────────┘
                              │
                  ┌───────────┴───────────┐
                  │                       │
                  ▼                       ▼
        ┌──────────────────┐    ┌──────────────────┐
        │  Public React    │    │   Admin React    │
        │      App         │    │       App        │
        └────────┬─────────┘    └────────┬─────────┘
                 │                       │
                 └───────────┬───────────┘
                             ▼
                  ┌────────────────────┐
                  │   Express REST API │
                  └─────────┬──────────┘
                            │
             ┌──────────────┼───────────────┐
             │              │               │
             ▼              ▼               ▼
       ┌──────────┐   ┌──────────┐   ┌─────────────┐
       │ Supabase │   │  Storage │   │ Supabase    │
       │ Postgres │   │  Images  │   │ Auth        │
       └──────────┘   └──────────┘   └─────────────┘
```

------------------------------------------------------------------------

# 5. Application Layers

The backend follows a layered architecture.

``` text
HTTP Request
     ↓
Route
     ↓
Middleware
     ↓
Controller
     ↓
Service
     ↓
Repository / Supabase Client
     ↓
PostgreSQL
```

## 5.1 Route Layer

Responsible for mapping HTTP methods and URLs to controllers.

Example:

``` text
GET /api/vehicles
POST /api/enquiries
PUT /api/admin/pricing/:id
```

Routes should not contain complex business logic.

------------------------------------------------------------------------

# 6. Middleware Layer

Middleware handles cross-cutting concerns.

Recommended middleware:

``` text
authMiddleware
adminMiddleware
validateRequest
errorHandler
notFoundHandler
rateLimitMiddleware
```

Example request flow:

``` text
Request
  ↓
CORS
  ↓
JSON Parser
  ↓
Authentication
  ↓
Authorization
  ↓
Validation
  ↓
Controller
```

------------------------------------------------------------------------

# 7. Controller Layer

Controllers should handle HTTP concerns:

-   Read request parameters.
-   Read request body.
-   Call service layer.
-   Return HTTP response.
-   Handle expected application errors.

Controllers should remain thin.

Example:

``` text
updatePricingController()
        ↓
pricingService.updatePricing()
        ↓
database update
        ↓
response
```

------------------------------------------------------------------------

# 8. Service Layer

Business rules should live in services.

Suggested services:

``` text
vehicleService
routeService
pricingService
enquiryService
authService
```

Example pricing operation:

``` text
Admin Request
     ↓
pricingController
     ↓
pricingService
     ↓
Validate price
     ↓
Verify route
     ↓
Verify vehicle
     ↓
Update route_pricing
     ↓
Return updated pricing
```

This prevents business logic from becoming tightly coupled to Express
routes.

------------------------------------------------------------------------

# 9. Database Layer

Supabase PostgreSQL is the primary data store.

Core tables:

``` text
vehicles
routes
route_pricing
enquiries
```

Authentication data is handled by Supabase Auth.

------------------------------------------------------------------------

# 10. Entity Relationship Architecture

``` text
┌─────────────────────┐
│       routes        │
├─────────────────────┤
│ id PK               │
│ name                │
│ slug UNIQUE         │
│ origin              │
│ destination         │
│ distance            │
│ travel_time         │
│ description         │
│ status              │
│ created_at          │
│ updated_at          │
└──────────┬──────────┘
           │
           │ 1:N
           ▼
┌──────────────────────────────┐
│        route_pricing         │
├──────────────────────────────┤
│ id PK                        │
│ route_id FK                  │
│ vehicle_id FK                │
│ one_way_price                │
│ round_trip_price             │
│ created_at                   │
│ updated_at                   │
└──────────────┬───────────────┘
               │ N:1
               ▼
┌─────────────────────┐
│      vehicles       │
├─────────────────────┤
│ id PK               │
│ name                │
│ slug UNIQUE         │
│ image               │
│ seating_capacity    │
│ description         │
│ price                │
│ status              │
│ created_at          │
│ updated_at          │
└─────────────────────┘


┌─────────────────────────────┐
│         enquiries           │
├─────────────────────────────┤
│ id PK                       │
│ name                        │
│ mobile_number               │
│ email                       │
│ pickup_location             │
│ drop_location               │
│ travel_date                 │
│ travel_time                 │
│ trip_type                   │
│ vehicle_id FK nullable      │
│ number_of_passengers        │
│ message                     │
│ status                      │
│ created_at                  │
│ updated_at                  │
└─────────────────────────────┘
```

------------------------------------------------------------------------

# 11. Important Pricing Architecture Decision

Pricing must be database-driven.

The architecture must avoid this:

``` text
React
 └── const sedanPrice = 2999
```

Instead:

``` text
Admin
  ↓
Pricing UI
  ↓
Express API
  ↓
Supabase
  ↓
route_pricing
  ↓
Public API
  ↓
React
```

The public application never owns the source of truth for business
pricing.

**Supabase PostgreSQL is the source of truth.**

------------------------------------------------------------------------

# 12. Why Route Pricing Should Be Separate

A vehicle can have different prices for different routes.

For example:

``` text
Sedan
Pune → Mumbai       ₹3,499
Mumbai → Pune       ₹3,599
```

Therefore a global vehicle price alone is not enough.

Use:

``` text
route_pricing
```

to create the relationship:

``` text
Route + Vehicle = Pricing
```

Example:

``` text
Pune → Mumbai + Sedan
Pune → Mumbai + SUV
Mumbai → Pune + Sedan
Mumbai → Pune + SUV
```

Each combination can have:

-   One-way price
-   Round-trip price

------------------------------------------------------------------------

# 13. Source of Truth

  Data                  Source of Truth
  --------------------- -----------------------------------
  Vehicle name          PostgreSQL
  Vehicle image         Supabase Storage / PostgreSQL URL
  Seating               PostgreSQL
  Vehicle description   PostgreSQL
  Vehicle status        PostgreSQL
  Route name            PostgreSQL
  Route origin          PostgreSQL
  Route destination     PostgreSQL
  Distance              PostgreSQL
  Travel time           PostgreSQL
  One-way pricing       PostgreSQL
  Round-trip pricing    PostgreSQL
  Enquiries             PostgreSQL
  Admin identity        Supabase Auth

The frontend should only render data returned from the API.

------------------------------------------------------------------------

# 14. Public API Architecture

Public endpoints should be read-oriented.

Recommended:

``` text
GET /api/vehicles
GET /api/vehicles/:slug

GET /api/routes
GET /api/routes/:slug

GET /api/routes/:routeId/pricing

POST /api/enquiries
```

The public client should not receive administrative database
credentials.

------------------------------------------------------------------------

# 15. Admin API Architecture

Admin endpoints require authentication and authorization.

``` text
GET    /api/admin/vehicles
POST   /api/admin/vehicles
PUT    /api/admin/vehicles/:id
DELETE /api/admin/vehicles/:id

GET    /api/admin/routes
POST   /api/admin/routes
PUT    /api/admin/routes/:id
DELETE /api/admin/routes/:id

GET    /api/admin/pricing
PUT    /api/admin/pricing/:id

GET    /api/admin/enquiries
GET    /api/admin/enquiries/:id
PUT    /api/admin/enquiries/:id/status
```

------------------------------------------------------------------------

# 16. Authentication Architecture

Use Supabase Auth for administrator authentication.

Flow:

``` text
Admin
  ↓
Login Form
  ↓
Supabase Auth
  ↓
Session / Access Token
  ↓
React stores session safely
  ↓
Protected API request
  ↓
Express verifies authentication
  ↓
Express verifies admin authorization
  ↓
Operation allowed
```

Important:

**Frontend route protection is not sufficient.**

Even if `/admin/pricing` is hidden from normal users, an attacker could
call the API directly.

Therefore:

``` text
UI Protection
+
Server Authorization
```

are both required.

------------------------------------------------------------------------

# 17. Admin Authorization

Recommended model:

``` text
authenticated user
        │
        ▼
is admin?
   ┌────┴────┐
   │         │
  YES        NO
   │         │
   ▼         ▼
Allow      403
```

Admin authorization can be represented using a secure server-side
role/allowlist strategy compatible with Supabase Auth.

Do not trust an arbitrary `isAdmin` value supplied by the browser.

------------------------------------------------------------------------

# 18. Supabase Security

The architecture must protect database access.

## Browser

The browser may use only the public Supabase key where direct Supabase
access is intentionally used.

## Server

The Supabase service-role key, if used, must exist only on the backend.

Never expose:

``` text
SUPABASE_SERVICE_ROLE_KEY
```

in frontend code.

Never commit secrets to Git.

------------------------------------------------------------------------

# 19. Row Level Security

Supabase PostgreSQL should use RLS thoughtfully.

Recommended logical policy:

``` text
Public:
  SELECT active public data

Admin:
  SELECT/INSERT/UPDATE/DELETE CMS data

Public:
  INSERT enquiries

Admin:
  SELECT/UPDATE enquiries
```

Exact policies should be implemented according to whether database
access goes through Express only or partly through Supabase directly.

If Express is the only database gateway, the backend should enforce
authorization consistently and RLS should still be configured
defensively where appropriate.

------------------------------------------------------------------------

# 20. Enquiry Architecture

Customer flow:

``` text
Customer
   ↓
Booking Form
   ↓
Client Validation
   ↓
POST /api/enquiries
   ↓
Server Validation
   ↓
Sanitize / Normalize
   ↓
Insert into enquiries
   ↓
status = New
   ↓
Success Response
```

Admin flow:

``` text
Admin
 ↓
Enquiries
 ↓
GET /api/admin/enquiries
 ↓
Review enquiry
 ↓
Update status
 ↓
Contacted / Confirmed / Closed
```

------------------------------------------------------------------------

# 21. Enquiry Status State Machine

``` text
             ┌────────────┐
             │    New     │
             └─────┬──────┘
                   │
                   ▼
             ┌────────────┐
             │ Contacted  │
             └─────┬──────┘
                   │
             ┌─────┴──────┐
             ▼            ▼
       ┌───────────┐ ┌───────────┐
       │ Confirmed │ │   Closed  │
       └─────┬─────┘ └───────────┘
             │
             ▼
       ┌───────────┐
       │   Closed  │
       └───────────┘
```

The UI should prevent nonsensical status values.

------------------------------------------------------------------------

# 22. Vehicle Architecture

Public:

``` text
GET /api/vehicles
```

Should return active vehicles.

Admin:

``` text
GET /api/admin/vehicles
POST /api/admin/vehicles
PUT /api/admin/vehicles/:id
DELETE /api/admin/vehicles/:id
```

Recommended behavior:

-   Prefer deactivation over destructive deletion when a vehicle has
    historical references.
-   Do not display inactive vehicles as available.
-   Keep slugs unique.

------------------------------------------------------------------------

# 23. Route Architecture

Routes should have stable SEO-friendly slugs.

Examples:

``` text
pune-to-mumbai-cab
mumbai-to-pune-cab
```

Public URL:

``` text
/pune-to-mumbai-cab
```

API:

``` text
GET /api/routes/pune-to-mumbai-cab
```

The route record should provide all data required for the landing page.

------------------------------------------------------------------------

# 24. SEO Architecture

SEO is a first-class architectural requirement.

The application must support:

``` text
Unique title
Unique meta description
Canonical URL
Semantic headings
SEO-friendly route
Open Graph
Structured data
Internal linking
Sitemap
Robots.txt
```

------------------------------------------------------------------------

# 25. Rendering Strategy

The route landing pages are important SEO pages.

If the deployment permits, prefer a rendering strategy that allows
crawlers to receive meaningful HTML metadata/content without depending
entirely on client-side JavaScript execution.

For a standard React SPA, the implementation must carefully handle:

-   Per-route metadata.
-   Canonicals.
-   Social metadata.
-   Crawlable URLs.
-   Static SEO assets.

If stronger SEO rendering is desired, Next.js would be a valid
alternative architecture because the assignment explicitly permits
Next.js.

However, the current architecture assumes React + Express unless
implementation constraints indicate otherwise.

------------------------------------------------------------------------

# 26. SEO URL Map

``` text
/
├── /pune-to-mumbai-cab
├── /mumbai-to-pune-cab
├── /fleet
├── /about
└── /contact
```

Potential future pages:

``` text
/pune-airport-to-mumbai-cab
/mumbai-airport-to-pune-cab
/pune-to-mumbai-one-way-cab
/mumbai-to-pune-one-way-cab
/pune-outstation-cab
/mumbai-outstation-cab
```

Only add pages when they contain unique, useful content.

------------------------------------------------------------------------

# 27. Sitemap Architecture

Generate or maintain:

``` text
/sitemap.xml
```

The sitemap should contain indexable public URLs.

Do not include:

``` text
/admin
/admin/*
```

as normal public SEO pages.

If the application is deployed dynamically, the sitemap can be generated
from the current set of indexable routes.

------------------------------------------------------------------------

# 28. Robots Architecture

Provide:

``` text
/robots.txt
```

Conceptually:

``` text
User-agent: *
Allow: /

Sitemap: /sitemap.xml
```

Admin/private paths should not be intended for indexing.

Robots.txt is not a replacement for authentication.

------------------------------------------------------------------------

# 29. Structured Data Architecture

Use JSON-LD where appropriate.

Potential schemas:

``` text
Organization
LocalBusiness
Service
FAQPage
BreadcrumbList
```

Example conceptual hierarchy:

``` text
Home
 ├── Organization / LocalBusiness
 └── Service

Route Page
 ├── Service
 ├── BreadcrumbList
 └── FAQPage

Fleet
 └── Service / relevant business data
```

Schema values must match visible page content.

------------------------------------------------------------------------

# 30. Internal Linking Architecture

Internal links should form a logical content network.

``` text
Home
 ├── Pune → Mumbai
 │      ├── Fleet
 │      └── Contact
 │
 ├── Mumbai → Pune
 │      ├── Fleet
 │      └── Contact
 │
 ├── Fleet
 ├── About
 └── Contact
```

Route pages should link to relevant booking and fleet information.

------------------------------------------------------------------------

# 31. Frontend Architecture

Recommended React architecture:

``` text
App
│
├── PublicRoutes
│   ├── Home
│   ├── PuneToMumbai
│   ├── MumbaiToPune
│   ├── Fleet
│   ├── About
│   └── Contact
│
└── AdminRoutes
    ├── Login
    ├── Dashboard
    ├── Vehicles
    ├── Routes
    ├── Pricing
    └── Enquiries
```

------------------------------------------------------------------------

# 32. Component Architecture

Reusable UI components:

``` text
Layout
Header
Footer
Button
CTAButton
Breadcrumbs
Hero
RouteCard
RouteSummary
VehicleCard
VehicleGrid
PricingTable
BookingForm
FAQAccordion
TestimonialCard
LoadingState
ErrorState
EmptyState
```

This prevents duplication between the two route pages.

------------------------------------------------------------------------

# 33. Route Page Reusability

Do not create two completely separate implementations containing
duplicated logic.

Instead:

``` text
RoutePage
    ↓
routeSlug
    ↓
fetch route
    ↓
fetch pricing
    ↓
render route-specific content
```

For example:

``` text
<RoutePage slug="pune-to-mumbai-cab" />

<RoutePage slug="mumbai-to-pune-cab" />
```

The content must still be direction-specific.

Reuse the component structure, not identical copy.

------------------------------------------------------------------------

# 34. Frontend Data Layer

Centralize API communication.

Recommended:

``` text
src/services/api/
    vehicles.ts
    routes.ts
    pricing.ts
    enquiries.ts
```

or:

``` text
src/services/apiClient.ts
```

Example conceptual functions:

``` text
getVehicles()
getVehicleBySlug()
getRouteBySlug()
getRoutePricing()
submitEnquiry()
```

Admin:

``` text
createVehicle()
updateVehicle()
deleteVehicle()
createRoute()
updateRoute()
updatePricing()
getEnquiries()
updateEnquiryStatus()
```

------------------------------------------------------------------------

# 35. State Management

A large global state library is not required for this assignment.

Use:

-   React local state for forms/UI.
-   Context where authentication state is shared.
-   Server/API state management where useful.

Avoid putting all API data into a giant global store without need.

------------------------------------------------------------------------

# 36. Booking Form Architecture

``` text
BookingForm
     │
     ├── customer details
     ├── trip details
     ├── route details
     ├── vehicle
     └── message
          │
          ▼
     validation
          │
          ▼
     API client
          │
          ▼
     POST /api/enquiries
```

The form should not directly write arbitrary data into database tables.

------------------------------------------------------------------------

# 37. Pricing UI Architecture

Public:

``` text
Route Page
   ↓
Pricing API
   ↓
Pricing Table
```

Admin:

``` text
Admin Pricing
   ↓
Route selector
   ↓
Vehicle selector
   ↓
One-way price
   ↓
Round-trip price
   ↓
Save
```

The UI should make it obvious which route and vehicle are being edited.

------------------------------------------------------------------------

# 38. Caching Strategy

Pricing is business-critical and may change through the CMS.

Therefore:

-   Avoid excessively long caching of pricing.
-   After an admin update, public requests should receive the latest
    price.
-   If client-side caching is used, invalidate/revalidate pricing after
    updates where applicable.

For an assignment/demo implementation, a simple request-based API
retrieval is acceptable.

------------------------------------------------------------------------

# 39. Error Handling Architecture

Central backend error handler:

``` text
Controller
    ↓
throw/return application error
    ↓
errorHandler middleware
    ↓
standard JSON response
```

Example:

``` json
{
  "success": false,
  "message": "Unable to update pricing"
}
```

Do not return:

-   Stack traces
-   Database credentials
-   Internal SQL details
-   Environment variables

to public users.

------------------------------------------------------------------------

# 40. API Response Convention

Use a consistent response structure.

Success:

``` json
{
  "success": true,
  "data": {}
}
```

Collection:

``` json
{
  "success": true,
  "data": [],
  "meta": {}
}
```

Error:

``` json
{
  "success": false,
  "message": "Something went wrong"
}
```

Consistency makes frontend integration easier.

------------------------------------------------------------------------

# 41. Validation Architecture

Validation should exist at two levels.

``` text
Frontend validation
       ↓
User experience
       ↓
Backend validation
       ↓
Security / data integrity
```

Backend must validate:

-   Name
-   Mobile
-   Email
-   Locations
-   Date
-   Time
-   Trip type
-   Vehicle ID
-   Passenger count
-   Prices
-   Status values
-   Route IDs
-   Vehicle IDs

------------------------------------------------------------------------

# 42. Security Architecture

Minimum protections:

``` text
Authentication
Authorization
Input validation
Rate limiting
CORS configuration
Environment secrets
Secure headers
Error sanitization
Database access control
```

For enquiry forms, basic rate limiting or abuse protection should be
considered because the endpoint is publicly writable.

------------------------------------------------------------------------

# 43. Image Architecture

Vehicle images can be stored using Supabase Storage.

Flow:

``` text
Admin
 ↓
Upload Vehicle Image
 ↓
Supabase Storage
 ↓
Public/controlled image URL
 ↓
vehicles.image
 ↓
Public Fleet
```

Store the image reference/URL in the database, not the raw image binary.

Images should be optimized for web delivery.

------------------------------------------------------------------------

# 44. Environment Architecture

Local:

``` text
.env
```

Production:

``` text
Deployment platform environment variables
```

Example:

``` text
PORT
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
CLIENT_URL
```

Frontend environment variables must never contain server-only secrets.

------------------------------------------------------------------------

# 45. Suggested Project Structure

``` text
pune-mumbai-cab/
│
├── client/
│   ├── public/
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   │
│   └── src/
│       ├── components/
│       │   ├── common/
│       │   ├── layout/
│       │   ├── home/
│       │   ├── route/
│       │   ├── fleet/
│       │   ├── booking/
│       │   └── seo/
│       │
│       ├── pages/
│       │   ├── HomePage
│       │   ├── PuneToMumbaiPage
│       │   ├── MumbaiToPunePage
│       │   ├── FleetPage
│       │   ├── AboutPage
│       │   └── ContactPage
│       │
│       ├── admin/
│       │   ├── pages/
│       │   ├── components/
│       │   └── layouts/
│       │
│       ├── services/
│       │   ├── apiClient
│       │   ├── vehicles
│       │   ├── routes
│       │   ├── pricing
│       │   └── enquiries
│       │
│       ├── hooks/
│       ├── context/
│       ├── utils/
│       ├── types/
│       └── App
│
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── validators/
│   │   ├── config/
│   │   ├── utils/
│   │   └── app
│   │
│   └── server
│
├── supabase/
│   ├── migrations/
│   └── seed/
│
├── docs/
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   ├── API_SPECIFICATION.md
│   ├── UI_SPECIFICATION.md
│   └── SEO_SPECIFICATION.md
│
├── .env.example
├── .gitignore
├── README.md
└── package.json
```

------------------------------------------------------------------------

# 46. Deployment Architecture

Recommended production topology:

``` text
                 Internet
                    │
                    ▼
             ┌─────────────┐
             │ CDN / HTTPS │
             └──────┬──────┘
                    │
          ┌─────────┴─────────┐
          │                   │
          ▼                   ▼
   React Frontend       Express API
                              │
                              ▼
                       Supabase
                       PostgreSQL
                       Auth
                       Storage
```

The exact hosting provider is not mandated.

------------------------------------------------------------------------

# 47. Production Request Flow --- Public Page

Example:

``` text
GET /pune-to-mumbai-cab
          │
          ▼
       Browser
          │
          ▼
     React Router
          │
          ▼
     Route Page
          │
          ├── GET /api/routes/pune-to-mumbai-cab
          │
          └── GET /api/routes/:id/pricing
                         │
                         ▼
                  Express API
                         │
                         ▼
                    Supabase
                         │
                         ▼
                    PostgreSQL
                         │
                         ▼
                   JSON response
                         │
                         ▼
                    React UI
```

------------------------------------------------------------------------

# 48. Production Request Flow --- Admin Price Update

``` text
Admin Browser
      │
      ▼
Admin Login
      │
      ▼
Supabase Auth
      │
      ▼
Authenticated Session
      │
      ▼
PUT /api/admin/pricing/:id
      │
      ▼
Express
      │
      ├── Authenticate
      │
      ├── Authorize Admin
      │
      ├── Validate Request
      │
      └── Pricing Service
              │
              ▼
        Supabase PostgreSQL
              │
              ▼
       Updated Pricing
```

------------------------------------------------------------------------

# 49. Production Request Flow --- Public Price Retrieval

``` text
Customer
   │
   ▼
Pune → Mumbai Page
   │
   ▼
GET current pricing
   │
   ▼
Express
   │
   ▼
Supabase PostgreSQL
   │
   ▼
route_pricing
   │
   ▼
Current price
   │
   ▼
React
   │
   ▼
₹3,499
```

The value displayed to the customer is therefore controlled by the
CMS/database.

------------------------------------------------------------------------

# 50. Performance Architecture

Performance priorities:

``` text
1. Small initial JS payload
2. Optimized images
3. Efficient API requests
4. No unnecessary re-renders
5. Lazy loading where appropriate
6. Good caching strategy
7. Fast database queries
8. Responsive layout
9. Avoid layout shifts
10. Avoid blocking third-party scripts
```

------------------------------------------------------------------------

# 51. Database Performance

Recommended indexes:

``` text
vehicles.slug
vehicles.status
routes.slug
routes.status
route_pricing.route_id
route_pricing.vehicle_id
enquiries.status
enquiries.created_at
```

Use constraints for:

-   Unique vehicle slug.
-   Unique route slug.
-   Valid status values.
-   Positive prices.
-   Valid foreign keys.

------------------------------------------------------------------------

# 52. Scalability

The architecture should support future expansion.

Current:

``` text
2 Routes
4 Vehicles
1 Admin
```

Future:

``` text
Many routes
Many vehicles
Multiple admins
More service pages
Airport-specific routes
More cities
```

The route/vehicle/pricing separation allows this growth without
redesigning the entire data model.

------------------------------------------------------------------------

# 53. Future Expansion Example

Current:

``` text
Pune → Mumbai
Mumbai → Pune
```

Future:

``` text
Pune → Nashik
Pune → Goa
Mumbai → Nashik
Mumbai → Pune
```

The same architecture can support:

``` text
route
  +
vehicle
  +
pricing
```

without hard-coding each route into React.

------------------------------------------------------------------------

# 54. Observability

For a production-quality implementation, log:

-   API errors
-   Authentication failures
-   Database failures
-   Important admin mutations
-   Enquiry submission errors

Do not log sensitive information unnecessarily.

Useful development checks:

``` text
Browser console
Network tab
Server logs
Supabase logs
Database records
```

------------------------------------------------------------------------

# 55. Testing Architecture

Minimum testing areas:

## Frontend

-   Navigation.
-   Route pages.
-   Booking form validation.
-   Pricing rendering.
-   Responsive behavior.

## Backend

-   Vehicle API.
-   Route API.
-   Pricing API.
-   Enquiry API.
-   Authentication.
-   Authorization.

## Database

-   Foreign keys.
-   Unique slugs.
-   Pricing relationships.
-   Enquiry status.
-   Active/inactive records.

------------------------------------------------------------------------

# 56. Critical End-to-End Test

The single most important acceptance test is:

``` text
Admin changes:
Pune → Mumbai
Sedan
One-way
₹2,999 → ₹3,499

        ↓

Database updated

        ↓

Public API reads database

        ↓

Pune → Mumbai page displays ₹3,499
```

If this test works, the core CMS/pricing requirement is proven.

------------------------------------------------------------------------

# 57. Failure Scenarios

## Database unavailable

Public UI:

``` text
Current pricing is temporarily unavailable.
Please contact us for the latest fare.
```

## API unavailable

Do not crash the entire page.

Show a recoverable error state.

## Unauthorized admin

Return:

``` text
401 Unauthorized
```

or:

``` text
403 Forbidden
```

depending on the condition.

## Invalid price

Reject:

``` text
negative price
empty price
non-numeric price
```

## Invalid vehicle

Reject references to unavailable/nonexistent vehicle IDs.

------------------------------------------------------------------------

# 58. Architecture Principles

The implementation should follow these principles:

### 1. Database as source of truth

Business data belongs in Supabase, not React constants.

### 2. API boundary

Frontend communicates through a controlled API for business operations.

### 3. Secure by default

Authentication and authorization are enforced server-side.

### 4. Reusable components

Avoid duplicated UI/business logic.

### 5. SEO first

Public route pages are designed around crawlability and search intent.

### 6. Mobile first

The customer experience must work well on mobile.

### 7. Simple admin

Functionality is more important than elaborate dashboard design.

### 8. Validate twice

Frontend for UX, backend for integrity/security.

### 9. Avoid unnecessary complexity

Do not introduce Redux, microservices, queues or other infrastructure
unless it solves a real requirement.

### 10. Keep future expansion possible

Routes, vehicles and pricing should be data-driven.

------------------------------------------------------------------------

# 59. Architecture Decision Record

## ADR-001 --- Use Supabase PostgreSQL

**Decision:** Use Supabase PostgreSQL.

**Reason:**

-   Relational data.
-   Easy foreign keys.
-   Good fit for route/vehicle pricing.
-   Authentication available.
-   Storage available.
-   Fast development for assignment.

------------------------------------------------------------------------

## ADR-002 --- Separate Route Pricing

**Decision:** Store route-specific pricing in `route_pricing`.

**Reason:**

A vehicle's price can differ between routes and trip types.

------------------------------------------------------------------------

## ADR-003 --- Express API

**Decision:** Use Express as backend API.

**Reason:**

-   Familiar Node.js architecture.
-   Clear REST endpoints.
-   Central validation.
-   Central authorization.
-   Keeps database/business logic away from frontend.

------------------------------------------------------------------------

## ADR-004 --- Reusable Route Page

**Decision:** Use reusable route-page components.

**Reason:**

Pune → Mumbai and Mumbai → Pune have the same structural requirements
but need different content/data.

------------------------------------------------------------------------

## ADR-005 --- CMS-Driven Pricing

**Decision:** Pricing must be retrieved dynamically.

**Reason:**

This is explicitly a high-priority requirement in the assignment.

------------------------------------------------------------------------

# 60. Final Architecture

``` text
                           USERS
                             │
                ┌────────────┴────────────┐
                │                         │
             CUSTOMER                  ADMIN
                │                         │
                ▼                         ▼
        ┌───────────────┐        ┌────────────────┐
        │ React Public  │        │ React Admin    │
        │ Website       │        │ CMS            │
        └───────┬───────┘        └───────┬────────┘
                │                        │
                └──────────┬─────────────┘
                           │ HTTPS
                           ▼
                 ┌────────────────────┐
                 │ Node + Express API │
                 │                    │
                 │ Routes             │
                 │ Controllers        │
                 │ Services           │
                 │ Validation         │
                 │ Auth               │
                 │ Authorization      │
                 └─────────┬──────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │ Supabase             │
                │                      │
                │ PostgreSQL           │
                │ ├── vehicles         │
                │ ├── routes           │
                │ ├── route_pricing    │
                │ └── enquiries        │
                │                      │
                │ Auth                 │
                │ Storage              │
                └──────────────────────┘
```

------------------------------------------------------------------------

# 61. Final Implementation Rule

The entire implementation should be guided by one central principle:

> **The public website is a presentation layer; Supabase is the source
> of truth; Express is the controlled business/API layer; and the admin
> CMS is the mechanism through which the business owner changes
> operational data.**

Especially for pricing:

``` text
CMS → API → Supabase → API → Website
```

Never:

``` text
CMS → React source code
```

This architecture directly supports the assignment's most important
functional, CMS, SEO and technical requirements.

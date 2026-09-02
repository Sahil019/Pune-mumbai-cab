# PRD --- Pune ↔ Mumbai Cab Booking Website & CMS

**Document Type:** Product Requirements Document\
**Project:** Pune ↔ Mumbai Cab Service Website\
**Primary Goal:** Build a professional, conversion-focused, SEO-first
cab booking website with a functional admin CMS where business owners
can manage vehicles, routes, pricing, and enquiries without developer
intervention.

------------------------------------------------------------------------

## 1. Product Overview

The product is a cab-service website focused primarily on **Pune ↔
Mumbai intercity cab services**.

The website must serve two audiences:

1.  **Customers** looking for Pune--Mumbai or Mumbai--Pune cab services,
    including one-way, round-trip and airport-related journeys.
2.  **Business administrators** who need to manage vehicle information,
    route information, pricing and booking/enquiry records through a
    basic CMS/admin dashboard.

The implementation must prioritize:

-   Functional business flows over decorative UI.
-   Dynamic database-driven pricing rather than hard-coded prices.
-   Strong technical and on-page SEO.
-   Mobile and desktop responsiveness.
-   Fast loading and easy navigation.
-   Clear conversion-oriented CTAs.
-   A simple but functional admin dashboard.

> **Important assignment constraint:** The evaluator must be able to
> change a price from the admin interface and see the updated price
> reflected on the public website. Pricing must not be hard-coded into
> React, HTML or JavaScript.

------------------------------------------------------------------------

# 2. Product Objectives

## 2.1 Primary Objectives

The website should:

-   Clearly communicate what the cab company offers.
-   Target Pune ↔ Mumbai cab-related Google searches.
-   Provide dedicated SEO landing pages for both directions.
-   Display available vehicles and their pricing dynamically.
-   Allow customers to submit a booking/enquiry.
-   Store enquiries so administrators can manage them.
-   Allow administrators to manage vehicles.
-   Allow administrators to manage routes.
-   Allow administrators to change vehicle/route pricing.
-   Provide useful FAQs and service content.
-   Implement technical SEO requirements.
-   Provide a professional, trustworthy and conversion-focused
    experience.

## 2.2 Success Criteria

The implementation will be considered successful when:

-   A visitor can understand the service immediately from the homepage.
-   A visitor can navigate to Pune → Mumbai and Mumbai → Pune landing
    pages.
-   Vehicle data comes from the database.
-   Route data comes from the database.
-   Pricing comes from the database.
-   An admin can update pricing without changing source code.
-   The public website reflects the updated pricing.
-   A visitor can submit an enquiry/booking.
-   The enquiry is stored and visible in the admin panel.
-   Enquiry status can be changed.
-   The website works on mobile and desktop.
-   Important pages have unique titles and meta descriptions.
-   SEO-friendly URLs are used.
-   Sitemap and robots.txt are available.
-   Appropriate structured data is implemented.
-   Important pages are internally linked.

------------------------------------------------------------------------

# 3. Target Users

## 3.1 Customer

A customer may be searching for:

-   Pune to Mumbai cab
-   Mumbai to Pune cab
-   Pune to Mumbai taxi
-   Mumbai to Pune taxi
-   Pune to Mumbai one-way cab
-   Mumbai to Pune one-way cab
-   Pune airport to Mumbai cab
-   Mumbai airport to Pune cab
-   Pune to Mumbai airport taxi
-   Mumbai to Pune airport taxi
-   Pune outstation cab
-   Mumbai outstation cab
-   Pune car rental
-   Mumbai car rental
-   Pune taxi service
-   Mumbai taxi service

The customer should be able to discover relevant information, compare
vehicle options, understand pricing and submit an enquiry with minimal
friction.

## 3.2 Administrator

The administrator manages the operational website content.

The administrator must be able to:

-   Log in.
-   View vehicles.
-   Add vehicles.
-   Edit vehicles.
-   Delete vehicles.
-   Activate/deactivate vehicles.
-   Change vehicle pricing.
-   Manage routes.
-   Add/edit route information.
-   Change route pricing.
-   View enquiries/bookings.
-   Update enquiry status.

------------------------------------------------------------------------

# 4. Core Business Requirements

## 4.1 Pune → Mumbai Service

A dedicated SEO landing page must target:

**Pune to Mumbai Cab**

The page must contain meaningful content specifically about this
direction.

It must not simply duplicate another page and replace the city names.

The page should include:

-   Distance
-   Approximate travel time
-   Route
-   One-way service
-   Round-trip service
-   Available cars
-   Pricing
-   Pickup/drop locations
-   Airport options
-   FAQs
-   Booking/enquiry CTA

## 4.2 Mumbai → Pune Service

A dedicated SEO landing page must target:

**Mumbai to Pune Cab**

This page must have content genuinely relevant to Mumbai → Pune travel.

It must not be a simple copy of the Pune → Mumbai page with city names
changed.

It should contain:

-   Direction-specific introduction
-   Route information
-   Distance
-   Approximate travel time
-   One-way service
-   Round-trip service
-   Available cars
-   Pricing
-   Pickup/drop locations
-   Airport options
-   FAQs
-   Booking/enquiry CTA

------------------------------------------------------------------------

# 5. Keyword / Search Intent Coverage

## 5.1 Primary Search Terms

The website structure should be capable of targeting:

-   Mumbai to Pune cab
-   Pune Mumbai taxi
-   Mumbai Pune taxi
-   Pune to Mumbai taxi
-   Mumbai to Pune taxi
-   Pune to Mumbai one way cab
-   Mumbai to Pune one way cab

## 5.2 Secondary Search Terms

The website should also be structured to potentially target:

-   Pune airport to Mumbai cab
-   Mumbai airport to Pune cab
-   Pune to Mumbai airport taxi
-   Mumbai to Pune airport taxi
-   Pune outstation cab
-   Mumbai outstation cab
-   Pune car rental
-   Mumbai car rental
-   Pune taxi service
-   Mumbai taxi service

SEO content must be useful and natural. Keywords must not be
artificially repeated just for keyword density.

------------------------------------------------------------------------

# 6. Required Website Pages

At minimum, implement the following public pages.

## 6.1 Home

Suggested route:

`/`

The homepage must clearly communicate:

-   What the company does.
-   Pune → Mumbai service.
-   Mumbai → Pune service.

It should also cover:

-   One-way cabs
-   Round-trip cabs
-   Airport transfers
-   Available vehicles
-   Pricing
-   Why choose us
-   How the service works
-   Customer reviews/testimonials
-   FAQ
-   Strong enquiry/booking CTA

### Homepage CTA

The primary CTA must be obvious.

Possible CTAs from the assignment:

-   Book Your Cab
-   Get Fare
-   Enquire Now
-   Call Now
-   WhatsApp Us

The implementation should use a clear primary CTA and supporting contact
actions.

------------------------------------------------------------------------

## 6.2 Pune → Mumbai Cab

Route:

`/pune-to-mumbai-cab`

Primary topic:

**Pune to Mumbai Cab**

Required content:

-   Route overview
-   Distance
-   Approximate travel time
-   One-way option
-   Round-trip option
-   Available vehicles
-   Dynamic pricing
-   Pickup locations
-   Drop locations
-   Airport options
-   FAQs
-   Booking/enquiry CTA

------------------------------------------------------------------------

## 6.3 Mumbai → Pune Cab

Route:

`/mumbai-to-pune-cab`

Primary topic:

**Mumbai to Pune Cab**

Required content:

-   Route overview
-   Distance
-   Approximate travel time
-   One-way option
-   Round-trip option
-   Available vehicles
-   Dynamic pricing
-   Pickup locations
-   Drop locations
-   Airport options
-   FAQs
-   Booking/enquiry CTA

------------------------------------------------------------------------

## 6.4 Fleet / Cars

Route:

`/fleet`

The fleet page must display available vehicles.

The assignment gives example vehicles:

  Vehicle     Seating   Example Base Price
  --------- --------- --------------------
  Sedan           4+1               ₹2,999
  SUV             6+1               ₹4,499
  Innova          6+1               ₹4,999
  Crysta          6+1               ₹5,999

**These prices are examples only.**

The actual implementation must load prices from the CMS/database.

Each vehicle should support:

-   Name
-   Image
-   Seating capacity
-   Description
-   Price
-   Active/inactive status

Inactive vehicles should not be presented as currently available on the
public site.

------------------------------------------------------------------------

## 6.5 About Us

Route:

`/about`

Create a professional company introduction.

The content should establish:

-   Service credibility
-   Professional drivers
-   Comfortable vehicles
-   Transparent pricing
-   Reliable intercity travel
-   Customer-focused service

Avoid generic filler content.

------------------------------------------------------------------------

## 6.6 Contact / Booking

Route:

`/contact` or an equivalent booking page/section.

Create a booking/enquiry form.

Required/suggested fields from the assignment:

-   Name
-   Mobile Number
-   Email
-   Pickup Location
-   Drop Location
-   Travel Date
-   Travel Time
-   Trip Type
    -   One Way
    -   Round Trip
-   Vehicle
-   Number of Passengers
-   Message

The form must have basic validation.

------------------------------------------------------------------------

# 7. Booking / Enquiry Requirements

When a visitor submits the booking form:

1.  Validate required fields.
2.  Submit data to the backend.
3.  Store the enquiry in the database.
4.  Assign a default status of `New`.
5.  Make the enquiry visible to the administrator.
6.  Allow the administrator to update its status.

## 7.1 Enquiry Statuses

At minimum:

-   New
-   Contacted
-   Confirmed
-   Closed

## 7.2 Example Admin Record

  Name    Phone      Route           Date     Vehicle   Status
  ------- ---------- --------------- -------- --------- --------
  Rahul   98XXXXXX   Pune → Mumbai   15 Sep   Sedan     New

The exact UI may differ, but the information must be easily
understandable.

------------------------------------------------------------------------

# 8. CMS / Admin Dashboard

## 8.1 Critical Requirement

The website must include a CMS/admin interface that allows the business
owner to manage important website information.

The client should **not need a developer to change cab pricing**.

A simple functional dashboard is preferred over a visually beautiful but
non-functional dashboard.

------------------------------------------------------------------------

## 8.2 Admin Authentication

The administrator must have a login flow.

Requirements:

-   Admin login screen.
-   Protected admin routes.
-   Unauthenticated users cannot access admin management pages.
-   Authentication state must be validated server-side for protected API
    operations.
-   Admin credentials/secrets must not be hard-coded into the frontend.

------------------------------------------------------------------------

## 8.3 Admin Dashboard

Suggested dashboard sections:

``` text
Dashboard
├── Overview
├── Vehicles
├── Routes
├── Pricing
└── Enquiries
```

The dashboard does not need elaborate analytics.

A simple functional interface is sufficient.

------------------------------------------------------------------------

# 9. Vehicle Management

The admin must be able to manage:

-   Vehicle name
-   Image
-   Seating capacity
-   Description
-   Price
-   Active/inactive status

Supported actions:

-   View vehicles
-   Add vehicle
-   Edit vehicle
-   Delete/deactivate vehicle
-   Change vehicle price

------------------------------------------------------------------------

# 10. Route Management

The CMS must allow route management.

The assignment specifically expects routes such as:

-   Pune → Mumbai
-   Mumbai → Pune

The route data should support:

-   Route name
-   Slug
-   Origin
-   Destination
-   Distance
-   Approximate travel time
-   One-way price
-   Round-trip price
-   Description
-   Active/inactive status

Additional SEO/service routes may be added where appropriate.

------------------------------------------------------------------------

# 11. Pricing Management

Pricing is a **high-priority functional requirement**.

## 11.1 Required Behavior

Pricing must be stored outside the frontend source code.

Example:

``` text
Admin changes:

Sedan — Pune → Mumbai
₹2,999 → ₹3,499
```

The public website must subsequently display:

``` text
₹3,499
```

without requiring a React code change.

## 11.2 Data Flow

``` text
Admin Dashboard
       ↓
Authenticated API
       ↓
Supabase PostgreSQL
       ↓
Public API
       ↓
React Frontend
       ↓
Updated Price
```

## 11.3 No Hard-Coding

Do NOT do:

``` js
const price = 2999;
```

for production pricing.

Instead, pricing should be retrieved dynamically from the database/API.

------------------------------------------------------------------------

# 12. Recommended Database Design

The assignment allows the developer to design the database.

Recommended relational structure:

``` text
vehicles
routes
route_pricing
enquiries
```

Authentication should be handled separately using the selected
authentication mechanism.

------------------------------------------------------------------------

## 12.1 `vehicles`

Fields:

``` text
id
name
slug
image
seating_capacity
description
price
status
created_at
updated_at
```

Suggested types:

-   `id` --- UUID / primary key
-   `name` --- text
-   `slug` --- unique text
-   `image` --- text URL/path
-   `seating_capacity` --- text or integer representation
-   `description` --- text
-   `price` --- numeric
-   `status` --- active/inactive
-   timestamps

------------------------------------------------------------------------

## 12.2 `routes`

Fields:

``` text
id
name
slug
origin
destination
distance
travel_time
description
status
created_at
updated_at
```

------------------------------------------------------------------------

## 12.3 `route_pricing`

For scalable route-specific pricing:

``` text
id
route_id
vehicle_id
one_way_price
round_trip_price
created_at
updated_at
```

Relationships:

``` text
routes 1 ─────── * route_pricing * ─────── 1 vehicles
```

This prevents pricing from being tied only to a vehicle globally and
allows different prices for different routes.

------------------------------------------------------------------------

## 12.4 `enquiries`

Suggested fields:

``` text
id
name
mobile_number
email
pickup_location
drop_location
travel_date
travel_time
trip_type
vehicle_id
number_of_passengers
message
status
created_at
updated_at
```

------------------------------------------------------------------------

# 13. Recommended Technology Architecture

The assignment allows the developer to choose the technology stack.

Recommended implementation:

``` text
Frontend:
React

Backend:
Node.js
Express.js

Database:
Supabase PostgreSQL

Authentication:
Supabase Auth or secure server-managed authentication

Storage:
Supabase Storage for vehicle images, where appropriate
```

### Important terminology

If using Supabase PostgreSQL as the primary database, the implementation
is not technically a traditional MERN stack because MERN uses MongoDB.

For this assignment, **React + Node.js + Express + Supabase PostgreSQL**
is the cleaner architecture because the requirements are strongly
relational: vehicles, routes, route-specific pricing and enquiries.

------------------------------------------------------------------------

# 14. Backend Requirements

The backend must act as the controlled interface between the React
application and database for business operations.

Suggested API groups:

``` text
/api/vehicles
/api/routes
/api/pricing
/api/enquiries
/api/admin
```

Example endpoints:

``` text
GET    /api/vehicles
GET    /api/vehicles/:slug

GET    /api/routes
GET    /api/routes/:slug

GET    /api/routes/:routeId/pricing

POST   /api/enquiries

GET    /api/admin/vehicles
POST   /api/admin/vehicles
PUT    /api/admin/vehicles/:id
DELETE /api/admin/vehicles/:id

GET    /api/admin/routes
POST   /api/admin/routes
PUT    /api/admin/routes/:id

GET    /api/admin/pricing
PUT    /api/admin/pricing/:id

GET    /api/admin/enquiries
PUT    /api/admin/enquiries/:id/status
```

The exact API naming can differ, but the functionality must be covered.

------------------------------------------------------------------------

# 15. Frontend Requirements

The public frontend should be component-based.

Suggested structure:

``` text
src/
├── components/
│   ├── Header
│   ├── Footer
│   ├── Hero
│   ├── RouteCard
│   ├── VehicleCard
│   ├── PricingTable
│   ├── BookingForm
│   ├── FAQ
│   ├── CTA
│   └── Testimonials
│
├── pages/
│   ├── Home
│   ├── PuneToMumbai
│   ├── MumbaiToPune
│   ├── Fleet
│   ├── About
│   └── Contact
│
└── services/
    └── api
```

Admin can be separated:

``` text
admin/
├── Login
├── Dashboard
├── Vehicles
├── Routes
├── Pricing
└── Enquiries
```

------------------------------------------------------------------------

# 16. User Experience Requirements

The website must be:

-   Mobile responsive
-   Desktop responsive
-   Fast
-   Easy to navigate
-   Professional
-   Trustworthy
-   Conversion focused

The visual design should feel like a real cab-service business rather
than a blank development template.

------------------------------------------------------------------------

# 17. Navigation

A recommended navigation structure:

``` text
Logo
Home
Pune → Mumbai
Mumbai → Pune
Fleet
About
Contact
[Book Your Cab]
```

The navigation should make the two primary route pages easy to discover.

Footer should provide natural links to:

-   Home
-   Pune → Mumbai
-   Mumbai → Pune
-   Fleet
-   About
-   Contact
-   Relevant service pages

------------------------------------------------------------------------

# 18. Content Requirements

The website must not look like a blank template.

Create realistic sample content.

## 18.1 Why Choose Us

The assignment suggests including:

-   Transparent pricing
-   Professional drivers
-   Clean and comfortable vehicles
-   On-time pickup
-   One-way and round-trip options
-   24×7 booking assistance

These should be presented as meaningful customer benefits, not keyword
stuffing.

------------------------------------------------------------------------

# 19. FAQ Requirements

Create at least **6 useful FAQs**.

Required topic examples include:

1.  How much does a Pune to Mumbai cab cost?
2.  How long does the journey from Pune to Mumbai take?
3.  Do you provide one-way cabs?
4.  Do you provide Mumbai airport pickup?
5.  Can I choose my vehicle?
6.  Is the fare inclusive of tolls and taxes?

FAQ content must be genuinely useful and relevant.

It should not be written only to insert keywords.

------------------------------------------------------------------------

# 20. SEO --- HIGH PRIORITY

SEO is one of the most important evaluation criteria.

The website depends heavily on Google search traffic.

The implementation must demonstrate both:

-   Technical SEO
-   Content/on-page SEO

------------------------------------------------------------------------

# 21. Page Titles

Each important page must have a unique title.

Example:

``` text
Pune to Mumbai Cab | One Way & Round Trip Taxi
```

Do not use the same title on every page.

------------------------------------------------------------------------

# 22. Meta Descriptions

Every important page must have a relevant and compelling meta
description.

The description should:

-   Explain the page.
-   Match search intent.
-   Encourage clicks.
-   Avoid keyword stuffing.

------------------------------------------------------------------------

# 23. Heading Structure

Use semantic heading hierarchy:

``` text
H1
 ├── H2
 │    ├── H3
 │    └── H3
 └── H2
      └── H3
```

Each page should have a clear primary topic.

The main route landing pages should have one clear H1 corresponding to
the route.

------------------------------------------------------------------------

# 24. SEO-Friendly URLs

Prefer:

``` text
/pune-to-mumbai-cab
```

over:

``` text
/page?id=123
```

Required primary route URLs:

``` text
/pune-to-mumbai-cab
/mumbai-to-pune-cab
```

URLs should be readable, descriptive and stable.

------------------------------------------------------------------------

# 25. Internal Linking

Important pages should link to each other naturally.

Examples from the assignment:

``` text
Home → Pune to Mumbai Cab
Home → Mumbai to Pune Cab
Pune to Mumbai → Fleet
Pune to Mumbai → Booking
Mumbai to Pune → Fleet
Mumbai to Pune → Booking
```

Additional contextual links can be included where useful.

Avoid artificial link stuffing.

------------------------------------------------------------------------

# 26. Canonical URLs

Implement canonical URLs where appropriate.

Each indexable page should have the correct canonical URL.

Avoid duplicate indexing caused by alternate URL variations.

------------------------------------------------------------------------

# 27. Sitemap

Provide:

``` text
/sitemap.xml
```

The sitemap should include important indexable pages.

At minimum, this should cover the primary public pages and important SEO
landing pages.

------------------------------------------------------------------------

# 28. Robots.txt

Provide:

``` text
/robots.txt
```

It must be correctly configured for search engine crawlers.

Admin/private pages should not be treated as public SEO landing pages.

------------------------------------------------------------------------

# 29. Structured Data / Schema

Where appropriate, implement valid structured data.

The assignment specifically mentions:

-   LocalBusiness
-   Organization
-   Service
-   FAQPage
-   BreadcrumbList

Schema should represent the actual page/business content.

Do not create misleading structured data.

------------------------------------------------------------------------

# 30. Open Graph

Implement appropriate Open Graph metadata for shareable public pages.

At minimum consider:

``` text
og:title
og:description
og:type
og:url
og:image
```

The values should correspond to each page.

------------------------------------------------------------------------

# 31. Content / On-Page SEO

The website should contain meaningful content for:

-   Pune to Mumbai cab
-   Mumbai to Pune cab
-   Fleet
-   Airport transfers
-   One-way travel
-   Round trips
-   Taxi service
-   Outstation travel

Content should satisfy user intent rather than repeat exact keywords
unnaturally.

------------------------------------------------------------------------

# 32. Conversion Requirements

The primary business goal is enquiry/booking conversion.

Important pages should have clear CTAs.

Primary CTA examples:

-   Book Your Cab
-   Get Fare
-   Enquire Now

Supporting actions:

-   Call Now
-   WhatsApp Us

CTA placement should be logical:

-   Hero section
-   After pricing
-   After service explanation
-   Near FAQ/content end
-   Contact/booking section

------------------------------------------------------------------------

# 33. Booking Form Validation

Basic client-side validation should include:

-   Required name
-   Valid mobile number format
-   Valid email format when provided/required
-   Pickup location required
-   Drop location required
-   Travel date required
-   Travel time required
-   Trip type required
-   Passenger count valid
-   Vehicle selection valid

Server-side validation must also be performed.

Never rely only on frontend validation.

------------------------------------------------------------------------

# 34. Security Requirements

The implementation should protect the admin system.

Requirements:

-   Protected admin routes.
-   Server-side authorization for admin operations.
-   No secret keys exposed in frontend code.
-   Environment variables for sensitive configuration.
-   Input validation on API endpoints.
-   Safe database queries through the selected database client.
-   Proper authentication/session handling.
-   Admin APIs must not be publicly writable.

The Supabase service-role key, if used, must remain server-side and must
never be exposed to the browser.

------------------------------------------------------------------------

# 35. Performance Requirements

The website should be fast.

Recommended practices:

-   Optimize vehicle images.
-   Use appropriately sized images.
-   Lazy-load non-critical images where appropriate.
-   Avoid unnecessary JavaScript.
-   Avoid unnecessary API calls.
-   Cache/read data sensibly.
-   Keep components lightweight.
-   Minimize layout shifts.
-   Use responsive images.
-   Avoid blocking resources where possible.

Performance should be evaluated on both mobile and desktop.

------------------------------------------------------------------------

# 36. Responsive Design

The website must work on:

-   Mobile
-   Tablet
-   Desktop

Responsive behavior should cover:

-   Navigation
-   Hero section
-   Booking form
-   Vehicle cards
-   Pricing tables
-   FAQ
-   Admin tables
-   CTA buttons
-   Footer

The admin dashboard may prioritize desktop usability but should remain
usable on smaller screens where practical.

------------------------------------------------------------------------

# 37. Data Flow

## Public Pricing Flow

``` text
Visitor opens route page
        ↓
React requests route/pricing data
        ↓
Express API
        ↓
Supabase PostgreSQL
        ↓
Route + vehicle + pricing records
        ↓
API response
        ↓
React renders current price
```

## Booking Flow

``` text
Visitor
   ↓
Booking Form
   ↓
Frontend validation
   ↓
POST /api/enquiries
   ↓
Express validation
   ↓
Supabase
   ↓
enquiries table
   ↓
Status = New
   ↓
Admin Dashboard
```

## Pricing Update Flow

``` text
Admin Login
    ↓
Admin Pricing Page
    ↓
Edit price
    ↓
PUT pricing API
    ↓
Authorization check
    ↓
Supabase update
    ↓
Database contains new price
    ↓
Public API returns new price
    ↓
Website displays new price
```

------------------------------------------------------------------------

# 38. Admin Workflow

## Vehicle Workflow

``` text
Login
 ↓
Vehicles
 ↓
Add/Edit Vehicle
 ↓
Save
 ↓
Database
 ↓
Public Fleet
```

## Pricing Workflow

``` text
Login
 ↓
Pricing
 ↓
Select Route
 ↓
Select Vehicle
 ↓
Edit One-Way / Round-Trip Price
 ↓
Save
 ↓
Database
 ↓
Public Route Page
```

## Enquiry Workflow

``` text
Customer submits form
 ↓
New enquiry
 ↓
Admin opens Enquiries
 ↓
Reviews customer details
 ↓
Contacted
 ↓
Confirmed / Closed
```

------------------------------------------------------------------------

# 39. Admin Authorization Model

Recommended logical roles:

``` text
Public User
   └── Public website only

Admin
   ├── Vehicles
   ├── Routes
   ├── Pricing
   └── Enquiries
```

Only authorized administrators should be able to mutate CMS data.

------------------------------------------------------------------------

# 40. Error Handling

The application should provide useful error states.

Examples:

### Public API failure

Display:

> Unable to load current pricing. Please try again or contact us.

### Booking submission failure

Display:

> We couldn't submit your enquiry. Please try again.

### Successful booking

Display:

> Thank you. Your enquiry has been received. Our team will contact you
> shortly.

### Admin save failure

Display:

> Changes could not be saved. Please try again.

Avoid exposing database errors or secrets directly to users.

------------------------------------------------------------------------

# 41. Loading States

Use loading states for:

-   Fleet loading
-   Pricing loading
-   Route page loading
-   Booking submission
-   Admin tables
-   Admin save/update operations

Avoid blank screens while data is loading.

------------------------------------------------------------------------

# 42. Empty States

Examples:

### No active vehicles

> No vehicles are currently available. Please contact us for assistance.

### No enquiries

> No enquiries have been received yet.

### No pricing record

> Pricing is currently unavailable for this route/vehicle combination.

------------------------------------------------------------------------

# 43. Suggested Component Model

## Shared Components

``` text
Header
Footer
Button
CTASection
VehicleCard
VehicleGrid
PricingTable
FAQAccordion
BookingForm
Breadcrumbs
RouteSummary
```

## Page-Level Components

``` text
HomePage
PuneToMumbaiPage
MumbaiToPunePage
FleetPage
AboutPage
ContactPage
```

## Admin Components

``` text
AdminLayout
Sidebar
DashboardStats
VehicleTable
VehicleForm
RouteTable
RouteForm
PricingTable
PricingForm
EnquiryTable
StatusSelector
```

------------------------------------------------------------------------

# 44. Suggested Folder Structure

``` text
project/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── admin/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── data/
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── validators/
│   ├── config/
│   └── ...
│
├── supabase/
│   ├── migrations/
│   └── seed/
│
├── public/
│   ├── robots.txt
│   └── sitemap.xml
│
├── README.md
├── PRD.md
└── .env.example
```

The exact structure can be adjusted to the selected implementation.

------------------------------------------------------------------------

# 45. SEO Route Architecture

Recommended public URL structure:

``` text
/
├── /pune-to-mumbai-cab
├── /mumbai-to-pune-cab
├── /fleet
├── /about
└── /contact
```

Potential future SEO pages:

``` text
/pune-airport-to-mumbai-cab
/mumbai-airport-to-pune-cab
/pune-to-mumbai-one-way-cab
/mumbai-to-pune-one-way-cab
/pune-outstation-cab
/mumbai-outstation-cab
/pune-taxi-service
/mumbai-taxi-service
```

Only create additional landing pages when they have genuinely useful,
differentiated content.

------------------------------------------------------------------------

# 46. SEO Metadata Plan

## Home

**Title:** Pune Mumbai Cab Service \| One Way & Round Trip Taxi

**Primary topic:** Pune ↔ Mumbai cab service

## Pune → Mumbai

**Title:** Pune to Mumbai Cab \| One Way & Round Trip Taxi

**Primary topic:** Pune to Mumbai cab

## Mumbai → Pune

**Title:** Mumbai to Pune Cab \| One Way & Round Trip Taxi

**Primary topic:** Mumbai to Pune cab

## Fleet

**Title:** Cab Fleet \| Sedan, SUV, Innova & Crysta

**Primary topic:** available cab fleet

## About

**Title:** About Us \| Pune Mumbai Cab Service

## Contact

**Title:** Book a Pune Mumbai Cab \| Contact & Enquiry

Exact final titles/descriptions can be refined during implementation.

------------------------------------------------------------------------

# 47. FAQ Structured Data

If FAQ structured data is used:

-   The visible FAQ content must match the structured data.
-   Questions and answers must be genuine.
-   Do not generate fake FAQs solely for SEO.

Example topics:

``` text
Pune to Mumbai fare
Journey duration
One-way availability
Airport pickup
Vehicle selection
Tolls and taxes
Round-trip booking
Advance booking
Pickup/drop locations
```

At least six useful FAQs are required.

------------------------------------------------------------------------

# 48. Breadcrumb Structure

Example:

``` text
Home
  ↓
Pune to Mumbai Cab
```

For deeper pages:

``` text
Home
  ↓
Fleet
  ↓
Vehicle
```

Breadcrumb structured data should correspond to visible navigation where
implemented.

------------------------------------------------------------------------

# 49. Acceptance Criteria

## Homepage

-   [ ] Company service is immediately understandable.
-   [ ] Pune → Mumbai service is visible.
-   [ ] Mumbai → Pune service is visible.
-   [ ] Strong CTA exists.
-   [ ] Fleet/pricing section exists.
-   [ ] Why Choose Us exists.
-   [ ] FAQ exists.
-   [ ] Reviews/testimonials exist.
-   [ ] Responsive design works.

## Route Pages

-   [ ] Dedicated Pune → Mumbai page.
-   [ ] Dedicated Mumbai → Pune page.
-   [ ] Direction-specific content.
-   [ ] Distance displayed.
-   [ ] Travel time displayed.
-   [ ] One-way service displayed.
-   [ ] Round-trip service displayed.
-   [ ] Available vehicles displayed.
-   [ ] Dynamic pricing displayed.
-   [ ] Pickup/drop information.
-   [ ] Airport information.
-   [ ] FAQs.
-   [ ] Booking CTA.

## Fleet

-   [ ] Vehicles load from database.
-   [ ] Image displayed.
-   [ ] Seating capacity displayed.
-   [ ] Description displayed.
-   [ ] Price displayed.
-   [ ] Inactive vehicles handled correctly.

## Booking

-   [ ] Form exists.
-   [ ] Required fields validated.
-   [ ] Data sent to backend.
-   [ ] Enquiry stored.
-   [ ] Default status is New.
-   [ ] Admin can view enquiry.
-   [ ] Admin can update status.

## CMS

-   [ ] Admin login.
-   [ ] Protected admin area.
-   [ ] View vehicles.
-   [ ] Add vehicle.
-   [ ] Edit vehicle.
-   [ ] Delete/deactivate vehicle.
-   [ ] Manage routes.
-   [ ] Change pricing.
-   [ ] View enquiries.
-   [ ] Change enquiry status.

## Dynamic Pricing

-   [ ] Price is not hard-coded.
-   [ ] Price exists in database.
-   [ ] Admin can change price.
-   [ ] API saves price.
-   [ ] Public API returns current price.
-   [ ] Public website displays changed price.

## SEO

-   [ ] Unique page titles.
-   [ ] Meta descriptions.
-   [ ] Correct H1/H2/H3 hierarchy.
-   [ ] SEO-friendly URLs.
-   [ ] Internal linking.
-   [ ] Canonical URLs.
-   [ ] sitemap.xml.
-   [ ] robots.txt.
-   [ ] Appropriate schema.
-   [ ] Open Graph metadata.

## Quality

-   [ ] Mobile responsive.
-   [ ] Desktop responsive.
-   [ ] Fast loading.
-   [ ] No obvious console errors.
-   [ ] Error states handled.
-   [ ] Loading states handled.
-   [ ] Forms are usable.
-   [ ] Admin is functional.
-   [ ] No secrets committed.

------------------------------------------------------------------------

# 50. Required Demo Scenario

The most important functional demonstration should be:

## Scenario: Change Pricing From Admin

### Step 1

Open admin login.

### Step 2

Open Pricing.

### Step 3

Find:

``` text
Pune → Mumbai
Sedan
One Way
```

### Step 4

Change:

``` text
₹2,999
```

to:

``` text
₹3,499
```

### Step 5

Save.

### Step 6

Open the public Pune → Mumbai page.

### Step 7

Verify that the website displays:

``` text
₹3,499
```

This proves that the pricing is database-driven and the CMS is
functional.

------------------------------------------------------------------------

# 51. Interview / Technical Discussion Readiness

The implementation should make it possible to clearly answer:

### Why did you choose this technology?

Because the project requires a responsive React frontend, a Node/Express
API layer and relational business data. Supabase PostgreSQL provides
relational storage, authentication options and storage capabilities
while keeping the implementation relatively lightweight.

### How does your CMS work?

The admin authenticates, changes CMS data through protected backend
endpoints, the backend validates the request and updates Supabase, and
the public frontend retrieves the latest data through the API.

### Where is pricing stored?

Pricing is stored in Supabase PostgreSQL, preferably in a route/vehicle
pricing table so a vehicle can have different prices for different
routes.

### How does the frontend retrieve pricing?

The React route page requests the relevant route and pricing data from
the backend API. The API reads the current pricing records from Supabase
and returns them to React.

### How would you prevent unauthorized admin access?

Use authentication plus server-side authorization on protected admin
endpoints. The frontend route guard is only a UX layer; actual
authorization must happen on the server/database side.

### How is SEO implemented?

Use descriptive URLs, unique titles, meta descriptions, semantic
headings, canonical URLs, internal links, sitemap.xml, robots.txt,
structured data and meaningful direction-specific content.

### How would you improve Google rankings?

Focus on search intent, unique useful landing pages, strong technical
SEO, internal linking, fast Core Web Vitals, mobile usability,
trustworthy business information, structured data where appropriate and
quality content rather than keyword stuffing.

### How would you optimize performance?

Optimize images, reduce unnecessary JavaScript, avoid duplicate API
calls, lazy-load non-critical resources, use caching where appropriate
and keep the initial page payload small.

------------------------------------------------------------------------

# 52. Non-Functional Requirements

## Performance

Target a fast experience on typical mobile connections.

## Accessibility

Use:

-   Semantic HTML
-   Labels for form controls
-   Keyboard-accessible controls
-   Sufficient text contrast
-   Meaningful alt text
-   Accessible buttons and links

## Reliability

-   API failures should not crash the entire page.
-   Forms should show useful feedback.
-   Admin updates should confirm success/failure.
-   Database operations should handle errors safely.

## Maintainability

-   Reusable React components.
-   Clear API boundaries.
-   Environment-based configuration.
-   Validation separated from controllers where practical.
-   No duplicated pricing constants.
-   Clear README/setup instructions.

------------------------------------------------------------------------

# 53. Environment Configuration

Use environment variables for secrets/configuration.

Example:

``` env
PORT=5000

SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

The service-role key must remain server-side.

Provide:

``` text
.env.example
```

with placeholders only.

------------------------------------------------------------------------

# 54. Seed Data

For the initial demonstration, seed the database with realistic sample
data.

Suggested vehicles:

``` text
Sedan
SUV
Innova
Crysta
```

Suggested routes:

``` text
Pune → Mumbai
Mumbai → Pune
```

The exact example prices from the assignment may be used as initial
seed/demo values, but they must remain editable through the CMS.

------------------------------------------------------------------------

# 55. Out of Scope for the Initial Version

Unless time permits, the following are not required by the assignment:

-   Online payment gateway
-   Live GPS tracking
-   Driver mobile application
-   Customer account system
-   Automated fare calculation from maps
-   Real-time vehicle tracking
-   Complex analytics
-   Multi-role enterprise permissions
-   Full reservation inventory management
-   Automated WhatsApp API integration

The priority is the required website, CMS, dynamic pricing,
booking/enquiry workflow and SEO.

------------------------------------------------------------------------

# 56. Implementation Priority

## P0 --- Must Have

1.  Homepage
2.  Pune → Mumbai page
3.  Mumbai → Pune page
4.  Fleet
5.  Booking/enquiry form
6.  Supabase database
7.  Dynamic pricing
8.  Admin login
9.  Vehicle management
10. Route management
11. Pricing management
12. Enquiry management
13. Responsive UI
14. SEO titles/meta/URLs
15. sitemap.xml
16. robots.txt
17. Basic schema
18. Internal linking

## P1 --- Important

1.  Open Graph
2.  Canonical URLs
3.  Breadcrumbs
4.  Loading/error states
5.  Image optimization
6.  Strong FAQ section
7.  Testimonials
8.  Call/WhatsApp CTAs

## P2 --- Nice to Have

1.  Advanced analytics
2.  More SEO landing pages
3.  Advanced filtering
4.  Rich dashboard statistics
5.  Automated notifications
6.  Payment integration

------------------------------------------------------------------------

# 57. Final Product Flow

``` text
                    PUBLIC WEBSITE
                         │
        ┌────────────────┼────────────────┐
        │                │                │
      Home          Route Pages         Fleet
        │          Pune ↔ Mumbai          │
        │                │                │
        └────────────────┼────────────────┘
                         │
                    Booking CTA
                         │
                   Booking Form
                         │
                         ▼
                  Express Backend
                         │
                         ▼
                Supabase PostgreSQL
                         │
                         ▼
                  Enquiry Stored


                    ADMIN SYSTEM
                         │
                    Admin Login
                         │
                    Admin Dashboard
                         │
       ┌─────────────────┼─────────────────┐
       │                 │                 │
    Vehicles           Routes           Pricing
       │                 │                 │
       └─────────────────┼─────────────────┘
                         │
                    Supabase DB
                         │
                         ▼
                  Public Website
```

------------------------------------------------------------------------

# 58. Definition of Done

The project is complete when a reviewer can perform this sequence
successfully:

``` text
1. Open website
2. Understand Pune ↔ Mumbai cab service
3. Open Pune → Mumbai page
4. See vehicle options
5. See current database-driven price
6. Submit booking enquiry
7. Open admin login
8. View the submitted enquiry
9. Change enquiry status
10. Open vehicle management
11. Edit a vehicle
12. Open pricing management
13. Change a route/vehicle price
14. Save
15. Return to public website
16. Verify new price is displayed
17. Inspect SEO metadata
18. Open sitemap.xml
19. Open robots.txt
20. Test website on mobile and desktop
```

If all of the above works, the implementation directly addresses the
core requirements in the supplied assignment document.

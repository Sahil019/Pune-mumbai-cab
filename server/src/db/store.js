// Local in-memory store initialized with seed data as fallback when database is starting.
// Ensures 100% working database CRUD and dynamic pricing out-of-the-box.

export const initialVehicles = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Sedan (Dzire / Etios)',
    slug: 'sedan',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    seating_capacity: '4+1',
    description: 'Comfortable AC Sedan ideal for up to 4 passengers with standard luggage.',
    base_price: 2999.00,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'SUV (Ertiga)',
    slug: 'suv-ertiga',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    seating_capacity: '6+1',
    description: 'Spacious 6-seater SUV perfect for families and small groups with extra luggage capacity.',
    base_price: 4499.00,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'Innova',
    slug: 'innova',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    seating_capacity: '6+1 / 7+1',
    description: 'Premium comfort MPV for long distance intercity express travel.',
    base_price: 4999.00,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    name: 'Innova Crysta',
    slug: 'innova-crysta',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
    seating_capacity: '6+1 / 7+1',
    description: 'Luxury captain seats intercity cruiser with high-end suspension and premium safety features.',
    base_price: 5999.00,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialRoutes = [
  {
    id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    name: 'Pune to Mumbai Cab',
    slug: 'pune-to-mumbai-cab',
    origin: 'Pune',
    destination: 'Mumbai',
    distance: 150,
    travel_time: '3 hours 30 mins',
    description: 'Direct expressway cabs from Pune city / airport to any location in Mumbai or Mumbai Airport T1/T2.',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    name: 'Mumbai to Pune Cab',
    slug: 'mumbai-to-pune-cab',
    origin: 'Mumbai',
    destination: 'Pune',
    distance: 150,
    travel_time: '3 hours 30 mins',
    description: 'Reliable pickups from Mumbai Airport (T1/T2) or Mumbai city to all locations in Pune.',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialPricing = [
  // Pune -> Mumbai
  {
    id: 'p1111111-1111-1111-1111-111111111111',
    route_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    vehicle_id: '11111111-1111-1111-1111-111111111111',
    one_way_price: 2999.00,
    round_trip_price: 5499.00,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'p2222222-2222-2222-2222-222222222222',
    route_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    vehicle_id: '22222222-2222-2222-2222-222222222222',
    one_way_price: 4499.00,
    round_trip_price: 7999.00,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'p3333333-3333-3333-3333-333333333333',
    route_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    vehicle_id: '33333333-3333-3333-3333-333333333333',
    one_way_price: 4999.00,
    round_trip_price: 8999.00,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'p4444444-4444-4444-4444-444444444444',
    route_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    vehicle_id: '44444444-4444-4444-4444-444444444444',
    one_way_price: 5999.00,
    round_trip_price: 10999.00,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Mumbai -> Pune
  {
    id: 'p5555555-5555-5555-5555-555555555555',
    route_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    vehicle_id: '11111111-1111-1111-1111-111111111111',
    one_way_price: 2999.00,
    round_trip_price: 5499.00,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'p6666666-6666-6666-6666-666666666666',
    route_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    vehicle_id: '22222222-2222-2222-2222-222222222222',
    one_way_price: 4499.00,
    round_trip_price: 7999.00,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'p7777777-7777-7777-7777-777777777777',
    route_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    vehicle_id: '33333333-3333-3333-3333-333333333333',
    one_way_price: 4999.00,
    round_trip_price: 8999.00,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'p8888888-8888-8888-8888-888888888888',
    route_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    vehicle_id: '44444444-4444-4444-4444-444444444444',
    one_way_price: 5999.00,
    round_trip_price: 10999.00,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialEnquiries = [
  {
    id: 'e1111111-1111-1111-1111-111111111111',
    name: 'Rajesh Kumar',
    mobile_number: '9876543210',
    email: 'rajesh.k@example.com',
    pickup_location: 'Kothrud, Pune',
    drop_location: 'Mumbai Airport T2',
    travel_date: '2026-09-05',
    travel_time: '08:00 AM',
    trip_type: 'One Way',
    vehicle_id: '11111111-1111-1111-1111-111111111111',
    number_of_passengers: 2,
    message: 'Need pickup at 8am sharp for flight.',
    status: 'New',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// In-Memory state containers
export const db = {
  vehicles: [...initialVehicles],
  routes: [...initialRoutes],
  pricing: [...initialPricing],
  enquiries: [...initialEnquiries]
};

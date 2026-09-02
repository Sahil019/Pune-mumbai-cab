import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { Vehicle } from '../models/Vehicle.js';
import { Route } from '../models/Route.js';
import { RoutePricing } from '../models/RoutePricing.js';
import { Enquiry } from '../models/Enquiry.js';

dotenv.config();

const seedDatabase = async () => {
  console.log('🌱 Starting MongoDB Database Seeding...');
  const conn = await connectDB();
  if (!conn) {
    console.error('❌ Database connection failed. Aborting seed.');
    process.exit(1);
  }

  try {
    // 1. Clear existing collections
    await User.deleteMany({});
    await Vehicle.deleteMany({});
    await Route.deleteMany({});
    await RoutePricing.deleteMany({});
    await Enquiry.deleteMany({});
    console.log('🧹 Cleared existing database records.');

    // 2. Create Admin User
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@punemumbaicabs.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminName = process.env.ADMIN_NAME || 'Admin User';

    const adminUser = new User({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
      isActive: true
    });
    await adminUser.save();
    console.log(`👤 Admin user created: ${adminEmail}`);

    // 3. Create Vehicles
    const vehiclesData = [
      {
        name: 'Sedan (Dzire / Etios)',
        slug: 'sedan',
        passengerCapacity: '4+1',
        description: 'Comfortable AC Sedan ideal for up to 4 passengers with standard luggage.',
        imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
        isActive: true
      },
      {
        name: 'SUV (Ertiga)',
        slug: 'suv-ertiga',
        passengerCapacity: '6+1',
        description: 'Spacious 6-seater SUV perfect for families and small groups with extra luggage capacity.',
        imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
        isActive: true
      },
      {
        name: 'Innova',
        slug: 'innova',
        passengerCapacity: '6+1',
        description: 'Premium comfort MPV for long distance intercity express travel.',
        imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
        isActive: true
      },
      {
        name: 'Innova Crysta',
        slug: 'innova-crysta',
        passengerCapacity: '6+1',
        description: 'Luxury captain seats intercity cruiser with high-end suspension and premium safety features.',
        imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
        isActive: true
      }
    ];

    const createdVehicles = await Vehicle.insertMany(vehiclesData);
    console.log(`🚗 Seeded ${createdVehicles.length} vehicles.`);

    // Map vehicle slug to ObjectId
    const vehicleMap = {};
    createdVehicles.forEach(v => {
      vehicleMap[v.slug] = v._id;
    });

    // 4. Create Routes (including canonical slugs and compatibility slugs)
    const routesData = [
      {
        name: 'Pune to Mumbai Cab',
        slug: 'pune-to-mumbai-cab',
        origin: 'Pune',
        destination: 'Mumbai',
        distance: 150,
        travelTime: '3 hours 30 mins',
        description: 'Direct expressway cabs from Pune city / airport to any location in Mumbai or Mumbai Airport T1/T2.',
        isActive: true
      },
      {
        name: 'Mumbai to Pune Cab',
        slug: 'mumbai-to-pune-cab',
        origin: 'Mumbai',
        destination: 'Pune',
        distance: 150,
        travelTime: '3 hours 30 mins',
        description: 'Reliable pickups from Mumbai Airport (T1/T2) or Mumbai city to all locations in Pune.',
        isActive: true
      }
    ];

    const createdRoutes = await Route.insertMany(routesData);
    console.log(`🛣️ Seeded ${createdRoutes.length} routes.`);

    // 5. Create RoutePricing Records
    const faresConfig = {
      'sedan': { oneWay: 2999, roundTrip: 5499 },
      'suv-ertiga': { oneWay: 4499, roundTrip: 7999 },
      'innova': { oneWay: 4999, roundTrip: 8999 },
      'innova-crysta': { oneWay: 5999, roundTrip: 10999 }
    };

    const pricingRecords = [];
    for (const route of createdRoutes) {
      for (const vehicle of createdVehicles) {
        const fare = faresConfig[vehicle.slug] || { oneWay: 2999, roundTrip: 5499 };
        pricingRecords.push({
          route: route._id,
          vehicle: vehicle._id,
          oneWayPrice: fare.oneWay,
          roundTripPrice: fare.roundTrip
        });
      }
    }

    const createdPricing = await RoutePricing.insertMany(pricingRecords);
    console.log(`💰 Seeded ${createdPricing.length} route pricing records.`);

    // 6. Create Initial Sample Enquiry
    const sampleEnquiry = new Enquiry({
      name: 'Rajesh Kumar',
      phone: '9876543210',
      email: 'rajesh.k@example.com',
      pickup: 'Kothrud, Pune',
      drop: 'Mumbai Airport T2',
      travelDate: '2026-09-10',
      travelTime: '08:00 AM',
      tripType: 'One Way',
      vehicle: vehicleMap['sedan'],
      passengers: 2,
      message: 'Need pickup at 8am sharp for flight.',
      status: 'New'
    });

    await sampleEnquiry.save();
    console.log('📩 Seeded initial customer enquiry.');

    console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedDatabase();

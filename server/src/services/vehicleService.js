import { Vehicle } from '../models/Vehicle.js';
import { Route } from '../models/Route.js';
import { RoutePricing } from '../models/RoutePricing.js';
import { db } from '../db/store.js';

export const vehicleService = {
  getAllVehicles: async (includeInactive = false) => {
    try {
      const filter = includeInactive ? {} : { isActive: true };
      const vehicles = await Vehicle.find(filter).sort({ createdAt: 1 }).lean();
      if (vehicles && vehicles.length > 0) {
        return vehicles.map(v => ({
          ...v,
          id: v._id.toString(),
          seating_capacity: v.passengerCapacity,
          image: v.imageUrl,
          status: v.isActive ? 'active' : 'inactive'
        }));
      }
    } catch (e) {
      console.warn('MongoDB query warning (vehicles):', e.message);
    }

    // Fallback to seeded store if MongoDB collection empty/connecting
    const filterFn = includeInactive ? () => true : v => v.status === 'active';
    return db.vehicles.filter(filterFn);
  },

  getVehicleBySlug: async (slug) => {
    try {
      const vehicle = await Vehicle.findOne({ slug }).lean();
      if (vehicle) {
        return {
          ...vehicle,
          id: vehicle._id.toString(),
          seating_capacity: vehicle.passengerCapacity,
          image: vehicle.imageUrl,
          status: vehicle.isActive ? 'active' : 'inactive'
        };
      }
    } catch (e) {
      console.warn('MongoDB query warning (vehicle slug):', e.message);
    }

    const vehicle = db.vehicles.find(v => v.slug === slug);
    if (!vehicle) {
      const err = new Error('Vehicle not found');
      err.statusCode = 404;
      throw err;
    }
    return vehicle;
  },

  createVehicle: async (vehicleData) => {
    const slug = vehicleData.slug || vehicleData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const defaultOneWay = Number(vehicleData.base_price) || 2999;
    const defaultRoundTrip = Number(vehicleData.round_trip_price) || Math.round(defaultOneWay * 1.8);
    
    try {
      const vehicle = new Vehicle({
        name: vehicleData.name,
        slug,
        passengerCapacity: vehicleData.seating_capacity || vehicleData.passengerCapacity || '4+1',
        description: vehicleData.description || '',
        imageUrl: vehicleData.image || vehicleData.imageUrl || '/images/default-cab.jpg',
        isActive: vehicleData.status === 'active' || vehicleData.isActive !== false
      });
      await vehicle.save();

      // Auto-create RoutePricing entries for all active routes
      try {
        const activeRoutes = await Route.find({ isActive: true }).lean();
        if (activeRoutes.length > 0) {
          const pricingEntries = activeRoutes.map(route => ({
            route: route._id,
            vehicle: vehicle._id,
            oneWayPrice: defaultOneWay,
            roundTripPrice: defaultRoundTrip
          }));
          await RoutePricing.insertMany(pricingEntries, { ordered: false });
          console.log(`Auto-created ${pricingEntries.length} pricing entries for new vehicle: ${vehicle.name}`);
        }
      } catch (pricingErr) {
        console.warn('Failed to auto-create pricing entries:', pricingErr.message);
      }

      return {
        ...vehicle.toObject(),
        id: vehicle._id.toString(),
        seating_capacity: vehicle.passengerCapacity,
        image: vehicle.imageUrl,
        status: vehicle.isActive ? 'active' : 'inactive'
      };
    } catch (e) {
      console.warn('MongoDB create vehicle fallback:', e.message);
      const newV = {
        id: `v-${Date.now()}`,
        name: vehicleData.name,
        slug,
        seating_capacity: vehicleData.seating_capacity || '4+1',
        description: vehicleData.description || '',
        image: vehicleData.image || '/images/default-cab.jpg',
        status: vehicleData.status || 'active',
        created_at: new Date().toISOString()
      };
      db.vehicles.push(newV);

      // Fallback: create in-memory pricing for each route
      try {
        db.routes
          .filter(r => r.status === 'active')
          .forEach(route => {
            const exists = db.pricing.find(p => p.route_id === route.id && p.vehicle_id === newV.id);
            if (!exists) {
              db.pricing.push({
                id: `p-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                route_id: route.id,
                vehicle_id: newV.id,
                one_way_price: defaultOneWay,
                round_trip_price: defaultRoundTrip,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              });
            }
          });
      } catch (fallbackErr) {}

      return newV;
    }
  },

  updateVehicle: async (id, vehicleData) => {
    try {
      const updateObj = {};
      if (vehicleData.name) updateObj.name = vehicleData.name;
      if (vehicleData.slug) updateObj.slug = vehicleData.slug;
      if (vehicleData.seating_capacity || vehicleData.passengerCapacity) {
        updateObj.passengerCapacity = vehicleData.seating_capacity || vehicleData.passengerCapacity;
      }
      if (vehicleData.description) updateObj.description = vehicleData.description;
      if (vehicleData.image || vehicleData.imageUrl) updateObj.imageUrl = vehicleData.image || vehicleData.imageUrl;
      if (vehicleData.status !== undefined || vehicleData.isActive !== undefined) {
        updateObj.isActive = vehicleData.status === 'active' || vehicleData.isActive === true;
      }

      const vehicle = await Vehicle.findByIdAndUpdate(id, updateObj, { new: true }).lean();
      if (vehicle) {
        return {
          ...vehicle,
          id: vehicle._id.toString(),
          seating_capacity: vehicle.passengerCapacity,
          image: vehicle.imageUrl,
          status: vehicle.isActive ? 'active' : 'inactive'
        };
      }
    } catch (e) {
      console.warn('MongoDB update vehicle fallback:', e.message);
    }

    const idx = db.vehicles.findIndex(v => v.id === id);
    if (idx !== -1) {
      db.vehicles[idx] = { ...db.vehicles[idx], ...vehicleData };
      return db.vehicles[idx];
    }
    const err = new Error('Vehicle not found');
    err.statusCode = 404;
    throw err;
  },

  deleteVehicle: async (id) => {
    try {
      await Vehicle.findByIdAndDelete(id);
      return { message: 'Vehicle deleted successfully' };
    } catch (e) {
      const idx = db.vehicles.findIndex(v => v.id === id);
      if (idx !== -1) db.vehicles.splice(idx, 1);
      return { message: 'Vehicle deleted successfully' };
    }
  }
};

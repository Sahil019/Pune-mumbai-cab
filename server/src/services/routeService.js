import { Route } from '../models/Route.js';
import { RoutePricing } from '../models/RoutePricing.js';
import { db } from '../db/store.js';

export const routeService = {
  getAllRoutes: async (includeInactive = false) => {
    try {
      const filter = includeInactive ? {} : { isActive: true };
      const routes = await Route.find(filter).sort({ createdAt: 1 }).lean();
      if (routes && routes.length > 0) {
        return routes.map(r => ({
          ...r,
          id: r._id.toString(),
          travel_time: r.travelTime,
          status: r.isActive ? 'active' : 'inactive'
        }));
      }
    } catch (e) {
      console.warn('MongoDB query warning (routes):', e.message);
    }

    const filterFn = includeInactive ? () => true : r => r.status === 'active';
    return db.routes.filter(filterFn);
  },

  getRouteBySlug: async (slug) => {
    try {
      const route = await Route.findOne({ slug }).lean();
      if (route) {
        const pricingDocs = await RoutePricing.find({ route: route._id })
          .populate('vehicle')
          .lean();

        const pricingFormatted = pricingDocs.map(p => {
          const v = p.vehicle || {};
          return {
            id: p._id.toString(),
            vehicle_id: v._id ? v._id.toString() : p.vehicle?.toString(),
            one_way_price: p.oneWayPrice,
            round_trip_price: p.roundTripPrice,
            vehicle: {
              ...v,
              id: v._id ? v._id.toString() : '',
              seating_capacity: v.passengerCapacity,
              image: v.imageUrl,
              status: v.isActive ? 'active' : 'inactive'
            }
          };
        });

        return {
          ...route,
          id: route._id.toString(),
          travel_time: route.travelTime,
          status: route.isActive ? 'active' : 'inactive',
          pricing: pricingFormatted
        };
      }
    } catch (e) {
      console.warn('MongoDB query warning (route slug):', e.message);
    }

    // Fallback to seeded store if route slug matching
    const route = db.routes.find(r => r.slug === slug || r.slug === `${slug}-cab`);
    if (!route) {
      const err = new Error('Route not found');
      err.statusCode = 404;
      throw err;
    }

    const pricingList = db.pricing
      .filter(p => p.route_id === route.id)
      .map(p => {
        const vehicle = db.vehicles.find(v => v.id === p.vehicle_id);
        return {
          id: p.id,
          vehicle_id: p.vehicle_id,
          one_way_price: parseFloat(p.one_way_price),
          round_trip_price: parseFloat(p.round_trip_price),
          vehicle
        };
      });

    return { ...route, pricing: pricingList };
  },

  createRoute: async (routeData) => {
    const slug = routeData.slug || routeData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    try {
      const route = new Route({
        name: routeData.name,
        slug,
        origin: routeData.origin,
        destination: routeData.destination,
        distance: Number(routeData.distance) || 150,
        travelTime: routeData.travel_time || routeData.travelTime || '3 hours 30 mins',
        description: routeData.description || '',
        isActive: routeData.status === 'active' || routeData.isActive !== false
      });
      await route.save();
      return {
        ...route.toObject(),
        id: route._id.toString(),
        travel_time: route.travelTime,
        status: route.isActive ? 'active' : 'inactive'
      };
    } catch (e) {
      const newR = {
        id: `r-${Date.now()}`,
        name: routeData.name,
        slug,
        origin: routeData.origin,
        destination: routeData.destination,
        distance: Number(routeData.distance) || 150,
        travel_time: routeData.travel_time || '3 hours 30 mins',
        description: routeData.description || '',
        status: routeData.status || 'active'
      };
      db.routes.push(newR);
      return newR;
    }
  },

  updateRoute: async (id, routeData) => {
    try {
      const updateObj = {};
      if (routeData.name) updateObj.name = routeData.name;
      if (routeData.slug) updateObj.slug = routeData.slug;
      if (routeData.origin) updateObj.origin = routeData.origin;
      if (routeData.destination) updateObj.destination = routeData.destination;
      if (routeData.distance) updateObj.distance = Number(routeData.distance);
      if (routeData.travel_time || routeData.travelTime) updateObj.travelTime = routeData.travel_time || routeData.travelTime;
      if (routeData.description) updateObj.description = routeData.description;
      if (routeData.status !== undefined) updateObj.isActive = routeData.status === 'active';

      const route = await Route.findByIdAndUpdate(id, updateObj, { new: true }).lean();
      if (route) {
        return {
          ...route,
          id: route._id.toString(),
          travel_time: route.travelTime,
          status: route.isActive ? 'active' : 'inactive'
        };
      }
    } catch (e) {}

    const idx = db.routes.findIndex(r => r.id === id);
    if (idx !== -1) {
      db.routes[idx] = { ...db.routes[idx], ...routeData };
      return db.routes[idx];
    }
    const err = new Error('Route not found');
    err.statusCode = 404;
    throw err;
  },

  deleteRoute: async (id) => {
    try {
      await Route.findByIdAndDelete(id);
      return { message: 'Route deleted successfully' };
    } catch (e) {
      const idx = db.routes.findIndex(r => r.id === id);
      if (idx !== -1) db.routes.splice(idx, 1);
      return { message: 'Route deleted successfully' };
    }
  }
};

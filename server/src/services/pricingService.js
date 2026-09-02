import { RoutePricing } from '../models/RoutePricing.js';
import { Route } from '../models/Route.js';
import { Vehicle } from '../models/Vehicle.js';
import { db } from '../db/store.js';

export const pricingService = {
  getAllPricing: async () => {
    try {
      const pricingDocs = await RoutePricing.find({})
        .populate('route')
        .populate('vehicle')
        .lean();

      if (pricingDocs && pricingDocs.length > 0) {
        return pricingDocs.map(p => {
          const r = p.route || {};
          const v = p.vehicle || {};
          return {
            id: p._id.toString(),
            route_id: r._id ? r._id.toString() : p.route?.toString(),
            vehicle_id: v._id ? v._id.toString() : p.vehicle?.toString(),
            one_way_price: p.oneWayPrice,
            round_trip_price: p.roundTripPrice,
            oneWayPrice: p.oneWayPrice,
            roundTripPrice: p.roundTripPrice,
            route: {
              ...r,
              id: r._id ? r._id.toString() : '',
              travel_time: r.travelTime
            },
            vehicle: {
              ...v,
              id: v._id ? v._id.toString() : '',
              seating_capacity: v.passengerCapacity,
              image: v.imageUrl
            },
            routes: r,
            vehicles: v,
            created_at: p.createdAt,
            updated_at: p.updatedAt
          };
        });
      }
    } catch (e) {
      console.warn('MongoDB query warning (pricing):', e.message);
    }

    return db.pricing.map(item => {
      const route = db.routes.find(r => r.id === item.route_id);
      const vehicle = db.vehicles.find(v => v.id === item.vehicle_id);
      return {
        ...item,
        one_way_price: parseFloat(item.one_way_price),
        round_trip_price: parseFloat(item.round_trip_price),
        route,
        vehicle,
        routes: route,
        vehicles: vehicle
      };
    });
  },

  getPricingByRouteId: async (routeIdOrSlug) => {
    try {
      let routeId = routeIdOrSlug;
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(routeIdOrSlug);

      if (!isObjectId) {
        const foundRoute = await Route.findOne({
          $or: [{ slug: routeIdOrSlug }, { slug: `${routeIdOrSlug}-cab` }]
        }).lean();
        if (foundRoute) routeId = foundRoute._id;
      }

      const pricingDocs = await RoutePricing.find({ route: routeId })
        .populate('vehicle')
        .lean();

      if (pricingDocs && pricingDocs.length > 0) {
        return pricingDocs.map(p => {
          const v = p.vehicle || {};
          return {
            id: p._id.toString(),
            route_id: p.route.toString(),
            vehicle_id: v._id ? v._id.toString() : p.vehicle?.toString(),
            one_way_price: p.oneWayPrice,
            round_trip_price: p.roundTripPrice,
            oneWayPrice: p.oneWayPrice,
            roundTripPrice: p.roundTripPrice,
            vehicle: {
              ...v,
              id: v._id ? v._id.toString() : '',
              seating_capacity: v.passengerCapacity,
              image: v.imageUrl
            },
            vehicles: v
          };
        });
      }
    } catch (e) {
      console.warn('MongoDB route pricing warning:', e.message);
    }

    // Fallback if DB pending
    let targetId = routeIdOrSlug;
    const r = db.routes.find(rt => rt.slug === routeIdOrSlug || rt.slug === `${routeIdOrSlug}-cab`);
    if (r) targetId = r.id;

    return db.pricing
      .filter(p => p.route_id === targetId || p.route_id === routeIdOrSlug)
      .map(p => ({
        ...p,
        one_way_price: parseFloat(p.one_way_price),
        round_trip_price: parseFloat(p.round_trip_price),
        vehicle: db.vehicles.find(v => v.id === p.vehicle_id)
      }));
  },

  updatePricing: async (id, { one_way_price, round_trip_price, oneWayPrice, roundTripPrice }) => {
    const finalOneWay = Number(one_way_price ?? oneWayPrice);
    const finalRoundTrip = Number(round_trip_price ?? roundTripPrice);

    try {
      const updateFields = {};
      if (!isNaN(finalOneWay)) updateFields.oneWayPrice = finalOneWay;
      if (!isNaN(finalRoundTrip)) updateFields.roundTripPrice = finalRoundTrip;

      const updated = await RoutePricing.findByIdAndUpdate(id, updateFields, { new: true })
        .populate('route')
        .populate('vehicle')
        .lean();

      if (updated) {
        const r = updated.route || {};
        const v = updated.vehicle || {};
        return {
          id: updated._id.toString(),
          route_id: r._id ? r._id.toString() : updated.route?.toString(),
          vehicle_id: v._id ? v._id.toString() : updated.vehicle?.toString(),
          one_way_price: updated.oneWayPrice,
          round_trip_price: updated.roundTripPrice,
          oneWayPrice: updated.oneWayPrice,
          roundTripPrice: updated.roundTripPrice,
          route: {
            ...r,
            id: r._id ? r._id.toString() : ''
          },
          vehicle: {
            ...v,
            id: v._id ? v._id.toString() : '',
            seating_capacity: v.passengerCapacity,
            image: v.imageUrl
          }
        };
      }
    } catch (e) {
      console.warn('MongoDB update pricing warning:', e.message);
    }

    // In-memory fallback
    const idx = db.pricing.findIndex(p => p.id === id);
    if (idx !== -1) {
      if (!isNaN(finalOneWay)) db.pricing[idx].one_way_price = finalOneWay;
      if (!isNaN(finalRoundTrip)) db.pricing[idx].round_trip_price = finalRoundTrip;
      db.pricing[idx].updated_at = new Date().toISOString();

      const item = db.pricing[idx];
      return {
        ...item,
        one_way_price: parseFloat(item.one_way_price),
        round_trip_price: parseFloat(item.round_trip_price),
        route: db.routes.find(r => r.id === item.route_id),
        vehicle: db.vehicles.find(v => v.id === item.vehicle_id)
      };
    }

    const err = new Error('Pricing entry not found');
    err.statusCode = 404;
    throw err;
  },

  upsertPricing: async ({ route_id, vehicle_id, one_way_price, round_trip_price }) => {
    const finalOneWay = Number(one_way_price);
    const finalRoundTrip = Number(round_trip_price);

    try {
      const updated = await RoutePricing.findOneAndUpdate(
        { route: route_id, vehicle: vehicle_id },
        { oneWayPrice: finalOneWay, roundTripPrice: finalRoundTrip },
        { upsert: true, new: true }
      ).lean();

      if (updated) {
        return {
          id: updated._id.toString(),
          route_id,
          vehicle_id,
          one_way_price: updated.oneWayPrice,
          round_trip_price: updated.roundTripPrice
        };
      }
    } catch (e) {}

    const idx = db.pricing.findIndex(p => p.route_id === route_id && p.vehicle_id === vehicle_id);
    if (idx !== -1) {
      db.pricing[idx].one_way_price = finalOneWay;
      db.pricing[idx].round_trip_price = finalRoundTrip;
      return db.pricing[idx];
    } else {
      const newP = {
        id: `p-${Date.now()}`,
        route_id,
        vehicle_id,
        one_way_price: finalOneWay,
        round_trip_price: finalRoundTrip
      };
      db.pricing.push(newP);
      return newP;
    }
  }
};

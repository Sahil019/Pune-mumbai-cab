import { Enquiry } from '../models/Enquiry.js';
import { db } from '../db/store.js';

export const enquiryService = {
  createEnquiry: async (enquiryData) => {
    const requiredFields = ['name', 'mobile_number', 'pickup_location', 'drop_location', 'travel_date', 'travel_time', 'trip_type'];
    for (const field of requiredFields) {
      if (!enquiryData[field] && !enquiryData[field.replace('_location', '')]) {
        const err = new Error(`Field '${field}' is required.`);
        err.statusCode = 400;
        throw err;
      }
    }

    const name = enquiryData.name;
    const phone = enquiryData.mobile_number || enquiryData.phone;
    const email = enquiryData.email || '';
    const pickup = enquiryData.pickup_location || enquiryData.pickup;
    const drop = enquiryData.drop_location || enquiryData.drop;
    const travelDate = enquiryData.travel_date || enquiryData.travelDate;
    const travelTime = enquiryData.travel_time || enquiryData.travelTime;
    const tripType = enquiryData.trip_type || enquiryData.tripType || 'One Way';
    const vehicle = (enquiryData.vehicle_id && /^[0-9a-fA-F]{24}$/.test(enquiryData.vehicle_id)) ? enquiryData.vehicle_id : null;
    const passengers = parseInt(enquiryData.number_of_passengers || enquiryData.passengers) || 1;
    const message = enquiryData.message || '';

    try {
      const enquiry = new Enquiry({
        name,
        phone,
        email,
        pickup,
        drop,
        travelDate,
        travelTime,
        tripType,
        vehicle,
        passengers,
        message,
        status: 'New'
      });
      await enquiry.save();
      const obj = enquiry.toObject();
      return {
        ...obj,
        id: obj._id.toString(),
        mobile_number: obj.phone,
        pickup_location: obj.pickup,
        drop_location: obj.drop,
        travel_date: obj.travelDate,
        travel_time: obj.travelTime,
        trip_type: obj.tripType,
        number_of_passengers: obj.passengers,
        created_at: obj.createdAt
      };
    } catch (e) {
      console.warn('MongoDB create enquiry warning:', e.message);
    }

    const newE = {
      id: `e-${Date.now()}`,
      name,
      mobile_number: phone,
      email,
      pickup_location: pickup,
      drop_location: drop,
      travel_date: travelDate,
      travel_time: travelTime,
      trip_type: tripType,
      vehicle_id: enquiryData.vehicle_id || null,
      number_of_passengers: passengers,
      message,
      status: 'New',
      created_at: new Date().toISOString()
    };
    db.enquiries.unshift(newE);
    return newE;
  },

  getAllEnquiries: async () => {
    try {
      const enquiryDocs = await Enquiry.find({})
        .populate('vehicle')
        .sort({ createdAt: -1 })
        .lean();

      if (enquiryDocs && enquiryDocs.length > 0) {
        return enquiryDocs.map(e => {
          const v = e.vehicle || {};
          return {
            ...e,
            id: e._id.toString(),
            mobile_number: e.phone,
            pickup_location: e.pickup,
            drop_location: e.drop,
            travel_date: e.travelDate,
            travel_time: e.travelTime,
            trip_type: e.tripType,
            number_of_passengers: e.passengers,
            created_at: e.createdAt,
            updated_at: e.updatedAt,
            vehicle: {
              ...v,
              id: v._id ? v._id.toString() : '',
              seating_capacity: v.passengerCapacity,
              image: v.imageUrl
            }
          };
        });
      }
    } catch (e) {
      console.warn('MongoDB getAllEnquiries warning:', e.message);
    }

    return db.enquiries.map(e => ({
      ...e,
      vehicle: e.vehicle_id ? db.vehicles.find(v => v.id === e.vehicle_id) : null
    }));
  },

  getEnquiryById: async (id) => {
    try {
      const e = await Enquiry.findById(id).populate('vehicle').lean();
      if (e) {
        const v = e.vehicle || {};
        return {
          ...e,
          id: e._id.toString(),
          mobile_number: e.phone,
          pickup_location: e.pickup,
          drop_location: e.drop,
          travel_date: e.travelDate,
          travel_time: e.travelTime,
          trip_type: e.tripType,
          number_of_passengers: e.passengers,
          created_at: e.createdAt,
          vehicle: {
            ...v,
            id: v._id ? v._id.toString() : '',
            seating_capacity: v.passengerCapacity,
            image: v.imageUrl
          }
        };
      }
    } catch (e) {}

    const enquiry = db.enquiries.find(e => e.id === id);
    if (!enquiry) {
      const err = new Error('Enquiry not found');
      err.statusCode = 404;
      throw err;
    }
    return enquiry;
  },

  updateStatus: async (id, status) => {
    const validStatuses = ['New', 'Contacted', 'Confirmed', 'Closed'];
    if (!validStatuses.includes(status)) {
      const err = new Error(`Invalid status. Allowed values: ${validStatuses.join(', ')}`);
      err.statusCode = 400;
      throw err;
    }

    try {
      const e = await Enquiry.findByIdAndUpdate(id, { status }, { new: true }).lean();
      if (e) {
        return {
          ...e,
          id: e._id.toString(),
          mobile_number: e.phone,
          pickup_location: e.pickup,
          drop_location: e.drop,
          travel_date: e.travelDate,
          travel_time: e.travelTime,
          trip_type: e.tripType,
          number_of_passengers: e.passengers
        };
      }
    } catch (e) {
      console.warn('MongoDB update status warning:', e.message);
    }

    const enquiry = db.enquiries.find(e => e.id === id);
    if (!enquiry) {
      const err = new Error('Enquiry not found');
      err.statusCode = 404;
      throw err;
    }
    enquiry.status = status;
    enquiry.updated_at = new Date().toISOString();
    return enquiry;
  }
};

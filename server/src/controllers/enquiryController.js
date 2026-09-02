import { enquiryService } from '../services/enquiryService.js';

// Helper function to sanitize user string input against XSS
const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

export const enquiryController = {
  createEnquiry: async (req, res, next) => {
    try {
      const { name, mobile_number, email, pickup_location, drop_location, travel_date, travel_time, trip_type, vehicle_id, number_of_passengers, message } = req.body;

      // Server-Side Input Validation
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ success: false, message: 'Full name is required.' });
      }

      if (!mobile_number || !/^[0-9+\-\s]{10,15}$/.test(String(mobile_number).trim())) {
        return res.status(400).json({ success: false, message: 'Valid 10-digit mobile number is required.' });
      }

      const sanitizedPayload = {
        name: sanitizeString(name),
        mobile_number: sanitizeString(mobile_number),
        email: email ? sanitizeString(email) : '',
        pickup_location: sanitizeString(pickup_location),
        drop_location: sanitizeString(drop_location),
        travel_date: sanitizeString(travel_date),
        travel_time: sanitizeString(travel_time),
        trip_type: sanitizeString(trip_type),
        vehicle_id: sanitizeString(vehicle_id),
        number_of_passengers: Number(number_of_passengers) || 1,
        message: message ? sanitizeString(message) : ''
      };

      const enquiry = await enquiryService.createEnquiry(sanitizedPayload);
      res.status(201).json({ success: true, data: enquiry });
    } catch (err) {
      next(err);
    }
  },

  getAllEnquiries: async (req, res, next) => {
    try {
      const enquiries = await enquiryService.getAllEnquiries();
      res.json({ success: true, data: enquiries });
    } catch (err) {
      next(err);
    }
  },

  getEnquiryById: async (req, res, next) => {
    try {
      const enquiry = await enquiryService.getEnquiryById(req.params.id);
      res.json({ success: true, data: enquiry });
    } catch (err) {
      next(err);
    }
  },

  updateStatus: async (req, res, next) => {
    try {
      const { status } = req.body;
      const validStatuses = ['New', 'Contacted', 'Confirmed', 'Closed'];
      const sanitizedStatus = sanitizeString(status);
      
      if (!validStatuses.includes(sanitizedStatus)) {
        return res.status(400).json({ success: false, message: 'Invalid enquiry status.' });
      }

      const updated = await enquiryService.updateStatus(req.params.id, sanitizedStatus);
      res.json({ success: true, data: updated });
    } catch (err) {
      next(err);
    }
  }
};

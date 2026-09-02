export function validateEnquiry(data) {
  const errors = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Full name is required (at least 2 characters).');
  }

  if (!data.mobile_number || typeof data.mobile_number !== 'string' || !/^[0-9+\-\s]{10,15}$/.test(data.mobile_number.trim())) {
    errors.push('Valid mobile phone number is required (10-15 digits).');
  }

  if (data.email && (!typeof data.email === 'string' || !/\S+@\S+\.\S+/.test(data.email.trim()))) {
    errors.push('Invalid email address format.');
  }

  if (!data.pickup_location || typeof data.pickup_location !== 'string' || data.pickup_location.trim().length < 3) {
    errors.push('Pickup location is required.');
  }

  if (!data.drop_location || typeof data.drop_location !== 'string' || data.drop_location.trim().length < 3) {
    errors.push('Drop location is required.');
  }

  if (!data.travel_date) {
    errors.push('Travel date is required.');
  }

  if (!data.trip_type || !['One Way', 'Round Trip'].includes(data.trip_type)) {
    errors.push('Trip type must be either "One Way" or "Round Trip".');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validatePricingUpdate(data) {
  const errors = [];

  if (data.one_way_price === undefined || isNaN(Number(data.one_way_price)) || Number(data.one_way_price) <= 0) {
    errors.push('One-way price must be a positive number.');
  }

  if (data.round_trip_price === undefined || isNaN(Number(data.round_trip_price)) || Number(data.round_trip_price) <= 0) {
    errors.push('Round-trip price must be a positive number.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

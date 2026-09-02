import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vehicle name is required'],
      trim: true
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    passengerCapacity: {
      type: String,
      required: [true, 'Passenger capacity is required'],
      default: '4+1'
    },
    description: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: '/images/default-cab.jpg'
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);

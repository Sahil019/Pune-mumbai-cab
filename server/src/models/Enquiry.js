import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true
    },
    email: {
      type: String,
      default: '',
      trim: true
    },
    pickup: {
      type: String,
      required: [true, 'Pickup location is required'],
      trim: true
    },
    drop: {
      type: String,
      required: [true, 'Drop location is required'],
      trim: true
    },
    travelDate: {
      type: String,
      required: [true, 'Travel date is required']
    },
    travelTime: {
      type: String,
      required: [true, 'Travel time is required']
    },
    tripType: {
      type: String,
      enum: ['One Way', 'Round Trip'],
      required: true,
      default: 'One Way'
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      default: null
    },
    passengers: {
      type: Number,
      default: 1,
      min: 1
    },
    message: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Confirmed', 'Closed'],
      default: 'New'
    }
  },
  { timestamps: true }
);

enquirySchema.index({ status: 1 });
enquirySchema.index({ createdAt: -1 });

export const Enquiry = mongoose.model('Enquiry', enquirySchema);

import mongoose from 'mongoose';

const routePricingSchema = new mongoose.Schema(
  {
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Route',
      required: true
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true
    },
    oneWayPrice: {
      type: Number,
      required: [true, 'One way price is required'],
      min: [0, 'Price cannot be negative']
    },
    roundTripPrice: {
      type: Number,
      required: [true, 'Round trip price is required'],
      min: [0, 'Price cannot be negative']
    }
  },
  { timestamps: true }
);

// Compound unique index so route + vehicle is unique
routePricingSchema.index({ route: 1, vehicle: 1 }, { unique: true });

export const RoutePricing = mongoose.model('RoutePricing', routePricingSchema);

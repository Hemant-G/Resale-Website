import mongoose from 'mongoose';

const scooterSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  kmsDriven: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  emiStart: {
    type: Number
  },
  owner: {
    type: String,
    enum: ["1st Owner", "2nd Owner", "More than 2 owners"],
    required: true
  },
  color: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required : true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Scooter = mongoose.model('Scooter', scooterSchema);
export default Scooter;
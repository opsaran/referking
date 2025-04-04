import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  shopifyId: { type: String, required: true, unique: true },
  email: { type: String },
  name: { type: String },
  referredBy: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Customer', CustomerSchema);
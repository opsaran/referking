import mongoose from 'mongoose';

const ReferralSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  referralCode: { type: String, required: true, unique: true },
  referralLink: { type: String, required: true },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
  visits: { type: Number, default: 0 },
  conversions: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Referral', ReferralSchema);
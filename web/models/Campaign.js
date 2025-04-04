import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rewardType: { type: String, enum: ['discount', 'cashback', 'free_product'], required: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Campaign', CampaignSchema);
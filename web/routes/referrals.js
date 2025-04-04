import express from 'express';
import Referral from '../models/Referral.js';
import { generateReferralCode, createReferralLink } from '../utils/linkGenerator.js';

const router = express.Router();

router.post('/generate', async (req, res) => {
  const { customerId, shop } = req.body;
  try {
    const existing = await Referral.findOne({ customerId });
    if (existing) return res.json({ referralLink: existing.referralLink });

    const referralCode = generateReferralCode();
    const referralLink = createReferralLink(shop, referralCode);

    const newReferral = new Referral({ customerId, referralCode, referralLink });
    await newReferral.save();
    res.status(201).json({ referralLink });
  } catch (err) {
    res.status(500).json({ error: 'Link generation failed' });
  }
});

router.get('/metrics', async (req, res) => {
  try {
    const stats = await Referral.aggregate([
      {
        $group: {
          _id: null,
          totalReferrals: { $sum: 1 },
          totalVisits: { $sum: "$visits" },
          totalConversions: { $sum: "$conversions" }
        }
      }
    ]);
    res.json(stats[0] || {});
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

export default router;
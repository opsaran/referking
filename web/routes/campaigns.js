import express from 'express';
import Campaign from '../models/Campaign.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, rewardType } = req.body;
  try {
    const newCampaign = new Campaign({ name, rewardType });
    await newCampaign.save();
    res.status(201).json({ message: 'Campaign created', campaign: newCampaign });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create campaign' });
  }
});

router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

export default router;
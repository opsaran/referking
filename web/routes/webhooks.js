import express from 'express';
import Referral from '../models/Referral.js';
import Customer from '../models/Customer.js';

const router = express.Router();

router.post('/orders', async (req, res) => {
  try {
    const { customer, note_attributes } = req.body;
    const refCodeAttr = note_attributes.find(attr => attr.name === 'ref');
    if (!refCodeAttr) return res.status(200).send('No referral code');

    const refCode = refCodeAttr.value;
    const referral = await Referral.findOne({ referralCode: refCode });
    if (!referral) return res.status(200).send('Referral not found');

    referral.conversions += 1;
    await referral.save();

    const referredCustomer = new Customer({
      shopifyId: customer.id,
      name: `${customer.first_name} ${customer.last_name}`,
      email: customer.email,
      referredBy: refCode
    });
    await referredCustomer.save();

    res.status(200).send('Referral conversion tracked');
  } catch (err) {
    res.status(500).json({ error: 'Webhook error' });
  }
});

export default router;
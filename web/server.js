// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import referralRoutes from './routes/referrals.js';
import campaignRoutes from './routes/campaigns.js';
import webhookRoutes from './routes/webhooks.js';
import { shopify } from './shopify.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Shopify Auth Middleware
app.use(shopify.cspHeaders());
app.get(shopify.config.auth.path, shopify.auth);
app.get(shopify.config.auth.callbackPath, shopify.authCallback);
app.use(shopify.verifyRequest());

// API Routes
app.use('/api/referrals', referralRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/webhooks', webhookRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => console.log(`Referking backend running on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection failed:', err));

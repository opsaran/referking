import '@shopify/shopify-api/adapters/node';
import shopifyApp from '@shopify/shopify-app-express'; // ✅ use default import
import { shopifyApi } from '@shopify/shopify-api';
import dotenv from 'dotenv';
dotenv.config();

export const shopify = shopifyApp({ // ✅ this is the correct function
  api: shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    scopes: ['read_customers', 'read_orders', 'write_discounts'],
    hostName: process.env.HOST.replace(/^https?:\/\//, ''),
    apiVersion: '2025-04',
    isEmbeddedApp: true,
  }),
  auth: {
    path: '/auth',
    callbackPath: '/auth/callback',
  },
  webhooks: {
    path: '/api/webhooks',
  },
});

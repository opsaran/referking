import '@shopify/shopify-api/adapters/node';
import * as shopifyApp from '@shopify/shopify-app-express';
import dotenv from 'dotenv';
dotenv.config();


export const shopify = shopifyApp.shopifyApp({ // 👈 now correct
  api: shopifyApp.shopifyApi({
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


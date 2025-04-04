import '@shopify/shopify-api/adapters/node';
import pkg from '@shopify/shopify-app-express';
const { ShopifyExpress } = pkg;

import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import dotenv from 'dotenv';
dotenv.config();

export const shopify = ShopifyExpress({
  api: shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    scopes: ['read_customers', 'read_orders', 'write_discounts'],
    hostName: process.env.HOST.replace(/^https?:\/\//, ''),
    apiVersion: LATEST_API_VERSION,
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

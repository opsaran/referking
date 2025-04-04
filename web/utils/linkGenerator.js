import crypto from 'crypto';

export function generateReferralCode() {
  return crypto.randomBytes(4).toString('hex');
}

export function createReferralLink(shopDomain, code) {
  return `https://${shopDomain}/?ref=${code}`;
}
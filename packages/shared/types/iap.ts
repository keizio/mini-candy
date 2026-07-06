export enum ProductId {
  SubscriptionMonthly = 'candy_subscription_monthly',
  SubscriptionYearly = 'candy_subscription_yearly',
  FullUnlock = 'candy_full_unlock',
}

export enum Entitlement {
  Premium = 'premium',
  FullUnlock = 'full_unlock',
}

export interface Product {
  id: ProductId;
  title: string;
  description: string;
  price: number;
  currencyCode: string;
  period?: string;
  trialPeriod?: string;
}

export interface PurchaseInfo {
  productId: ProductId;
  transactionId: string;
  purchaseDate: string;
  expirationDate?: string;
}

export interface EntitlementInfo {
  entitlement: Entitlement;
  isActive: boolean;
  willRenew: boolean;
  expirationDate?: string;
}

export interface Offerings {
  current: Product[];
}

export const PRODUCTS_CONFIG = {
  [ProductId.SubscriptionMonthly]: {
    id: ProductId.SubscriptionMonthly,
    title: 'Monthly Premium',
    description: 'Ad-free, unlimited lives, 5x daily bonus, exclusive skins',
    price: 4.99,
    currencyCode: 'USD',
    period: 'monthly',
    trialPeriod: '3-day free trial',
  },
  [ProductId.SubscriptionYearly]: {
    id: ProductId.SubscriptionYearly,
    title: 'Yearly Premium',
    description: 'All monthly benefits, save 50%',
    price: 29.99,
    currencyCode: 'USD',
    period: 'yearly',
    trialPeriod: '',
  },
  [ProductId.FullUnlock]: {
    id: ProductId.FullUnlock,
    title: 'Full Game Unlock',
    description: 'All 50 levels, no timer, ad-free, premium benefits',
    price: 9.99,
    currencyCode: 'USD',
    period: 'lifetime',
    trialPeriod: '',
  },
} as const;

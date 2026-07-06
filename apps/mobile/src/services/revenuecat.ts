import Purchases, { CustomerInfo, PurchasesPackage } from 'react-native-purchases';
import { Platform } from 'react-native';

const API_KEYS = {
  apple: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_IOS || '',
  google: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_ANDROID || '',
};

export function configureRevenueCat(): void {
  const apiKey = Platform.OS === 'ios' ? API_KEYS.apple : API_KEYS.google;

  if (!apiKey) {
    console.warn('RevenueCat API key not configured');
    return;
  }

  Purchases.configure({ apiKey });
}

export async function getOfferings(): Promise<PurchasesPackage[]> {
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current?.availablePackages || [];
  } catch (error) {
    console.error('Failed to fetch offerings:', error);
    return [];
  }
}

export async function purchasePackage(
  pack: PurchasesPackage
): Promise<CustomerInfo> {
  const { purchaserInfo } = await Purchases.purchasePackage(pack);
  return purchaserInfo;
}

export async function checkEntitlements(): Promise<{
  isPremium: boolean;
  isFullUnlock: boolean;
}> {
  try {
    const { entitlements } = await Purchases.getPurchaserInfo();
    return {
      isPremium: entitlements.active['premium'] !== undefined,
      isFullUnlock: entitlements.active['full_unlock'] !== undefined,
    };
  } catch {
    return { isPremium: false, isFullUnlock: false };
  }
}

export async function restorePurchases(): Promise<{
  isPremium: boolean;
  isFullUnlock: boolean;
}> {
  try {
    const { purchaserInfo } = await Purchases.restorePurchases();
    return {
      isPremium: purchaserInfo.entitlements.active['premium'] !== undefined,
      isFullUnlock: purchaserInfo.entitlements.active['full_unlock'] !== undefined,
    };
  } catch {
    return { isPremium: false, isFullUnlock: false };
  }
}

export function onCustomerInfoUpdate(
  callback: (customerInfo: CustomerInfo) => void
): void {
  Purchases.addCustomerInfoUpdateListener(callback);
}

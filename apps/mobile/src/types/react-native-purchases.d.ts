declare module 'react-native-purchases' {
  export interface PurchasesPackage {
    identifier: string;
    packageType: string;
    product: PurchasesStoreProduct;
  }

  export interface PurchasesStoreProduct {
    identifier: string;
    title: string;
    description: string;
    price: number;
    priceString: string;
    currencyCode: string;
  }

  export interface CustomerInfo {
    entitlements: {
      active: Record<string, { expiresDate: string | null; productIdentifier: string }>;
    };
  }

  export interface Offerings {
    current: {
      availablePackages: PurchasesPackage[];
    } | null;
  }

  export default class Purchases {
    static configure(config: { apiKey: string }): void;
    static getOfferings(): Promise<Offerings>;
    static purchasePackage(pack: PurchasesPackage): Promise<{ purchaserInfo: CustomerInfo }>;
    static getPurchaserInfo(): Promise<{ entitlements: CustomerInfo['entitlements'] }>;
    static restorePurchases(): Promise<{ purchaserInfo: CustomerInfo }>;
    static addCustomerInfoUpdateListener(callback: (customerInfo: CustomerInfo) => void): void;
    static purchaseAd(): Promise<{ adInfo: any }>;
  }
}

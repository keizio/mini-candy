import { Platform } from 'react-native';

const AD_UNIT_IDS = {
  android: {
    rewarded: process.env.EXPO_PUBLIC_ADMOB_REWARDED_AD_UNIT_ID || 'ca-app-pub-xxxxxxxx/yyyyyyyy',
    interstitial: process.env.EXPO_PUBLIC_ADMOB_INTERSTITIAL_AD_UNIT_ID || 'ca-app-pub-xxxxxxxx/zzzzzzzz',
  },
};

export function getRewardedAdUnitId(): string {
  return Platform.OS === 'android'
    ? AD_UNIT_IDS.android.rewarded
    : '';
}

export function getInterstitialAdUnitId(): string {
  return Platform.OS === 'android'
    ? AD_UNIT_IDS.android.interstitial
    : '';
}

export const MAX_ADS_PER_SESSION = 5;

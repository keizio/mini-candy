# Mini Candy — Mobile App

The Expo/React Native mobile app for **Mini Candy**, a casual game built for RevenueCat Shipaton 2026.

## Getting Started

```bash
npm install
npx expo start
```

Run on device:
```bash
npx expo start --ios
npx expo start --android
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo dev server |
| `npm run ios` | Run on iOS simulator |
| `npm run android` | Run on Android emulator |
| `npm run lint` | Lint with Biome |
| `npm run typecheck` | TypeScript type check |

## Environment

Create a `.env.local` file:

```
EXPO_PUBLIC_REVENUECAT_API_KEY=your_api_key
EXPO_PUBLIC_API_URL=your_backend_url
```

## Build

```bash
eas build --platform all
eas submit
```

## Tech Stack

- **Framework**: Expo SDK 57 + React Native
- **Navigation**: Expo Router (file-based)
- **Payments**: RevenueCat SDK (subscriptions, IAP, ads)
- **Backend**: Hono API (Cloudflare Workers)
- **Database**: Supabase
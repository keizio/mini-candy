# Mini Candy

A mobile casual game built for **RevenueCat Shipaton 2026** — ship a brand-new mobile app to App Store / Google Play with RevenueCat SDK integration.

Built with Expo (React Native), Hono (Cloudflare Workers), and Supabase.

## Project Structure

```
shipaton-project/
├── apps/
│   └── mobile/          # Expo/React Native mobile app
├── backend/             # Hono API server (Cloudflare Workers)
├── packages/
│   └── shared/          # Shared types, utils, game logic
├── assets/              # Source images, audio, fonts
├── public/              # Generated/optimized images
├── scripts/             # Build, image gen, deploy helpers
└── AGENTS.md            # Agent instructions (for AI coding assistants)
```

## Quick Start

```bash
# Install all dependencies
npm run install:all

# Start mobile app
npm run mobile

# Start backend (dev)
npm run backend:dev
```

## Features

- RevenueCat subscriptions (ad-free, power-ups, cosmetics)
- RevenueCat Ads (rewarded video ads)
- Consumable IAPs (coins, gems)
- Daily challenges, leaderboards, progression system
- Cloudflare Workers backend with Supabase

## Scripts

| Command | Description |
|---------|-------------|
| `npm run mobile` | Start Expo dev server |
| `npm run mobile:android` | Run on Android |
| `npm run mobile:ios` | Run on iOS |
| `npm run backend:dev` | Start backend in dev mode |
| `npm run backend:deploy` | Deploy backend to Cloudflare Workers |

## Deployment

```bash
# Build and submit mobile app
eas build --platform all
eas submit

# Deploy backend
npm run backend:deploy
```

## License

ISC
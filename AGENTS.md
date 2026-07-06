# RevenueCat Shipaton 2026 — AGENTS.md

## Hackathon Context

**RevenueCat Shipaton 2026** (Aug 1–Sep 30, 2026). Ship a **brand-new** mobile app to App Store, Google Play, or Samsung Galaxy Store. Must integrate RevenueCat SDK for at least one IAP or serve ads via RevenueCat Ads. See https://revenuecat-shipaton-2026.devpost.com

## Winning Strategy

### Recommended Category to Target
**Best Game Award** + **HAMM Award** (monetization) + **#BuildInPublic Award** simultaneously.

### Why
- Best Game Award has clear criteria (gameplay, art direction, monetization fit)
- HAMM Award rewards creative RevenueCat monetization — subscriptions, consumables, ads
- #BuildInPublic Award is about documenting the journey on social media
- All three reinforce each other: a game with smart monetization, documented publicly, is the strongest signal

### App Idea
A mobile casual game (hyper-casual to mid-core) with:
- RevenueCat subscription for premium features (ad-free, power-ups, cosmetics)
- RevenueCat Ads for rewarded video ads (extra lives, boosters)
- Consumable IAPs (coins, gems)
- Strong visual identity (use `token-plan-image-gen` for sprites/UI, `image-design` for icons)
- Daily challenges, leaderboards, progression system

### How to Win (#BuildInPublic)
- Post daily on X/Twitter with #Shipaton and #BuildInPublic
- Share a YouTube devlog series (2-3 min per episode)
- Cross-post on LinkedIn, TikTok, or Bluesky
- Join the Shipaton Discord (https://discord.gg/X95EwqBxQT) and share in #post-engagement-boost
- Post a 2-minute demo video on YouTube (required for submission — keep it under 2 min)
- Include a free trial or promo code for judges

### Submission Requirements (must have)
- Text description of your app features
- Demo video on YouTube/Vimeo (≤2 min)
- Published app URL on App Store / Google Play / Samsung Galaxy Store
- 1024×1024 app icon
- At least 1 screenshot at 1179×2556px (no device frame)
- Free trial or promo code for judges to unlock IAP

## Available Skills

Load these with `skill` tool when the task matches:

| Skill | When to Use |
|-------|------------|
| `expo` | Project scaffolding, mobile app build, EAS Build, OTA updates |
| `web-game-developer` | Game loop, sprite animation, physics, ECS, canvas rendering |
| `payment-gateway` | RevenueCat integration reference, IAP/subscription patterns |
| `frontend-specialist` | UI screens, React components, Tailwind, responsive layout |
| `backend-specialist` | API server, leaderboard, auth, game state persistence |
| `design-systems` | Design tokens, color palette, component library, theme |
| `ai-integration` | AI features (NPC dialogue, procedural content, chatbots) |
| `image-design` | SVG icons, icon system, sprite sheet optimization |
| `token-plan-image-gen` | Hero images, game sprites, app icon, screenshots, OG image |
| `copy-professional-writer` | App Store description, marketing copy, social posts |
| `database-specialist` | Schema, queries, migrations for game data, users, leaderboards |
| `testing-qa` | Tests, E2E, CI quality gates |
| `security` | Auth, input validation, secure storage |
| `social-media` | #BuildInPublic content strategy, posting schedule |

## Project Structure Convention

```
shipaton-project/
├── apps/
│   └── mobile/          # Expo/React Native app (primary)
├── packages/
│   └── shared/          # Shared types, utils, game logic
├── assets/              # Source images, audio, fonts
├── public/              # Generated/optimized images (WebP/AVIF)
├── scripts/             # Build, image gen, deploy helpers
├── AGENTS.md            # This file
├── package.json
└── app.json
```

## Quick Start

```bash
npx create-expo-app@latest apps/mobile --template blank-typescript
cd apps/mobile
npx expo install revenuecat/react-native-purchases
npx expo start
```

## Key Conventions

- **Expo Router** for navigation (file-based routing in `app/`)
- **RevenueCat SDK** for all IAP/subscription management
- **EAS Build** for production builds to App Store / Google Play
- **Assets** in `public/images/` with WebP/AVIF variants
- **App icon** at `assets/icon.png` (1024×1024) and `assets/adaptive-icon.png`
- **Screenshots** at 1179×2556px for submission (generate via `token-plan-image-gen`)
- **OG image** at `public/opengraph-image.png` (1200×630)
- **Demo video** ≤2 min, uploaded to YouTube, link in Devpost submission

## RevenueCat Integration Patterns

```typescript
import Purchases from 'react-native-purchases';

// Initialize
Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY! });

// Get offerings
const offerings = await Purchases.getOfferings();
const current = offerings.current;

// Purchase
if (current?.availablePackages[0]) {
  const { purchaserInfo } = await Purchases.purchasePackage(current.availablePackages[0]);
}

// Check subscription status
const { entitlements } = await Purchases.getPurchaserInfo();
const isPro = entitlements.active['pro'] !== undefined;

// RevenueCat Ads (rewarded)
const adInfo = await Purchases.purchaseAd();
```

## Important Gotchas

- RevenueCat requires **sandbox testing** on physical devices (not simulator) for IAP
- App must be **brand new** — updates to existing apps don't qualify
- Submission opens Aug 1, closes Sep 30, 2026
- Next Gen Award (student category): no paid dev account needed, video + source code only
- Use `eas build --platform all` for production builds
- `eas submit` for App Store / Google Play submission
- ShipKit freebies are while supplies last — register early

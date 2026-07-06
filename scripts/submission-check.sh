#!/bin/bash
# Submission checklist verification for Mini Candy Shipaton entry
# Run this before submitting to verify all requirements are met

set -e

echo "=== Mini Candy - Submission Checklist ==="
echo ""

check() {
  local desc="$1" status="$2"
  if [ "$status" = "ok" ]; then
    echo "  ✅ $desc"
  else
    echo "  ❌ $desc - MISSING"
    HAS_ERRORS=1
  fi
}

HAS_ERRORS=0

echo "📱 App Requirements:"
check "Expo app exists" "$([ -d apps/mobile ] && echo ok || echo fail)"
check "app.json configured" "$([ -f apps/mobile/app.json ] && echo ok || echo fail)"
check "eas.json configured" "$([ -f apps/mobile/eas.json ] && echo ok || echo fail)"
check "RevenueCat SDK installed" "$(grep -q 'react-native-purchases' apps/mobile/package.json 2>/dev/null && echo ok || echo fail)"
check "AdMob configured" "$(grep -q 'google-mobile-ads' apps/mobile/package.json 2>/dev/null && echo ok || echo fail)"

echo ""
echo "🎨 Assets:"
check "App icon (1024x1024)" "$([ -f assets/sprites/app-icon.svg ] && echo ok || echo fail)"
check "OG image (1200x630)" "$([ -f public/opengraph-image.svg ] && echo ok || echo fail)"
check "Splash background" "$([ -f apps/mobile/assets/splash-icon.png ] && echo ok || echo fail)"

echo ""
echo "🎮 Game Engine:"
check "Match-3 engine exists" "$([ -f apps/mobile/src/game/engine/Grid.ts ] && echo ok || echo fail)"
check "50 levels defined" "$(grep -q 'id: 50' apps/mobile/src/game/levels/world5.ts 2>/dev/null && echo ok || echo fail)"
check "Skia canvas renderer" "$([ -f apps/mobile/src/game/renderer/GameCanvas.tsx ] && echo ok || echo fail)"

echo ""
echo "💰 Monetization:"
check "RevenueCat service" "$([ -f apps/mobile/src/services/revenuecat.ts ] && echo ok || echo fail)"
check "Paywall screen" "$([ -f apps/mobile/app/paywall.tsx ] && echo ok || echo fail)"
check "Restore purchases flow" "$(grep -q 'restorePurchases' apps/mobile/src/services/revenuecat.ts 2>/dev/null && echo ok || echo fail)"

echo ""
echo "🌐 Backend:"
check "Hono API server" "$([ -f backend/src/index.ts ] && echo ok || echo fail)"
check "Leaderboard routes" "$([ -f backend/src/routes/leaderboard.ts ] && echo ok || echo fail)"
check "Daily challenge routes" "$([ -f backend/src/routes/daily.ts ] && echo ok || echo fail)"
check "Supabase schema" "$([ -f backend/supabase-schema.sql ] && echo ok || echo fail)"

echo ""
echo "📋 Devpost Submission:"
check "Demo video (≤2 min)" "$([ -n "$DEMO_VIDEO_URL" ] && echo ok || echo 'pending - set DEMO_VIDEO_URL')"
check "Promo code generated" "$([ -n "$PROMO_CODE" ] && echo ok || echo 'pending - generate in RC dashboard')"
check "Google Play URL" "$([ -n "$PLAY_STORE_URL" ] && echo ok || echo 'pending - set PLAY_STORE_URL')"
check "Screenshots (1179x2556, 3x)" "$([ -d public/images ] && echo ok || echo 'pending - run generate-assets.sh')"

echo ""
if [ "$HAS_ERRORS" = "1" ]; then
  echo "⚠️  Some items need attention. Fix the ❌ items above."
  exit 1
else
  echo "✅ All checks passed! Ready for submission."
fi

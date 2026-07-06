#!/bin/bash
# Shipaton 2026 submission helper
# Generates metadata and opens submission links

set -e

echo "=== Mini Candy - Shipaton 2026 Submission ==="
echo ""

echo "App Store Description:"
echo ""
cat << DESCRIPTION
Title: Mini Candy - Match 3 Puzzle
Subtitle: Sweet match-3 fun for everyone!

Description:
Dive into the sweetest match-3 puzzle adventure! Mini Candy is a delightful
puzzle game packed with colorful candies, exciting combos, and challenging
levels. Swap and match your way through 50 levels across 5 delicious worlds.

FEATURES:
• 50 levels across 5 candy-themed worlds
• 6 candy types with special candies (striped, wrapped, color bombs)
• Daily challenges with streak rewards
• Leaderboards to compete with friends
• Premium subscription: ad-free, unlimited lives, 5x bonus
• Lifetime unlock: all levels + premium benefits
• Hand-crafted art style with warm, colorful visuals
• Haptic feedback and particle effects
• Tutorial system for new players

Available for free on Android with optional in-app purchases.

Subscription Options:
• Monthly Premium ($4.99/mo) - 3-day free trial
• Yearly Premium ($29.99/yr) - Save 50%
• Lifetime Full Unlock ($9.99)

Privacy Policy: [PRIVACY_POLICY_URL]
Terms of Service: [TERMS_URL]

Keywords: match-3, puzzle, candy, casual, free, fun, brain, challenge
DESCRIPTION

echo ""
echo "=== Devpost Submission Checklist ==="
echo "1. Text description of app features (see above)"
echo "2. Demo video URL (≤2 min on YouTube):"
echo "   → Record gameplay: tutorial → gameplay → special candy → level complete → paywall → daily"
echo "3. Google Play URL:"
echo "   → Submit via EAS Build → Google Play Console → Copy URL"
echo "4. App icon (1024x1024):"
echo "   → assets/sprites/app-icon.svg"
echo "5. Screenshots (3x 1179x2556, no device frame):"
echo "   → Run: ./scripts/generate-assets.sh screenshots"
echo "6. Promo code for judges:"
echo "   → Generate in RevenueCat dashboard → Promo Codes"
echo "   → 3-month free premium access"
echo "7. Free trial available:"
echo "   → Monthly subscription includes 3-day free trial"
echo ""
echo "Deadline: September 30, 2026"
echo "Submit at: https://revenuecat-shipaton-2026.devpost.com/"
echo ""
echo "#BuildInPublic:"
echo "  - Post daily on X/Twitter with #Shipaton #BuildInPublic"
echo "  - Share devlog on YouTube (2-3 min per episode)"
echo "  - Join Discord: https://discord.gg/X95EwqBxQT"
echo "  - Share in #post-engagement-boost"

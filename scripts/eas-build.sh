#!/bin/bash
# EAS Build helper for Mini Candy
# Usage: ./scripts/eas-build.sh [profile]

set -e

PROFILE="${1:-preview}"

echo "=== Mini Candy EAS Build ==="
echo "Profile: $PROFILE"

case "$PROFILE" in
  development)
    echo "Building development APK for testing..."
    cd apps/mobile
    eas build --platform android --profile development
    ;;
  preview)
    echo "Building preview APK for internal testing..."
    cd apps/mobile
    eas build --platform android --profile preview
    ;;
  production)
    echo "Building production AAB for Google Play..."
    cd apps/mobile
    eas build --platform android --profile production
    ;;
  samsung)
    echo "Building APK for Samsung Galaxy Store..."
    cd apps/mobile
    eas build --platform android --profile preview
    echo "APK built. Submit to Samsung Galaxy Store via seller portal."
    ;;
  all)
    echo "Building all profiles..."
    cd apps/mobile
    eas build --platform android --profile development
    eas build --platform android --profile preview
    eas build --platform android --profile production
    ;;
  *)
    echo "Usage: $0 [development|preview|production|samsung|all]"
    exit 1
    ;;
esac

echo "=== Build complete ==="
echo "Next steps:"
echo "  - Test APK on physical device"
echo "  - Submit AAB to Google Play Console"
echo "  - Submit APK to Samsung Galaxy Store (bonus)"

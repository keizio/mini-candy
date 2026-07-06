#!/bin/bash
# Asset Generation Script for Mini Candy
# Requires: DASHSCOPE_API_KEY, curl, ImageMagick
# Usage: ./scripts/generate-assets.sh [phase]

set -e

PHASE="${1:-all}"
OUTPUT_DIR="./public"
MOBILE_ASSETS="./apps/mobile/assets"
SKILL_DIR="/Users/alan/skills/token-plan-game-asset-gen"
IMAGE_GEN="/Users/alan/skills/token-plan-image-gen"

if [ -z "$DASHSCOPE_API_KEY" ]; then
  echo "ERROR: DASHSCOPE_API_KEY not set"
  echo "Obtain from: https://help.aliyun.com/zh/model-studio/get-api-key"
  exit 1
fi

mkdir -p "$OUTPUT_DIR/images"
mkdir -p "$MOBILE_ASSETS/sprites"
mkdir -p "$MOBILE_ASSETS/backgrounds"

generate_sprite() {
  local name="$1" prompt="$2" model="${3:-wan2.7-image}"
  echo "Generating sprite: $name"
  bash "$SKILL_DIR/scripts/generate-image.sh" \
    --prompt "$prompt" \
    --model "$model" \
    --size "1024*1024" \
    --output "$MOBILE_ASSETS/sprites" \
    --count 4 \
    --no-watermark
  echo "  -> $name generated"
}

generate_bg() {
  local name="$1" prompt="$2"
  echo "Generating background: $name"
  bash "$IMAGE_GEN/scripts/generate-image.sh" \
    --prompt "$prompt" \
    --model "wan2.7-image-pro" \
    --size "1179*2556" \
    --output "$MOBILE_ASSETS/backgrounds" \
    --count 1 \
    --no-watermark
  echo "  -> $name generated"
}

generate_screenshot() {
  local name="$1" prompt="$2"
  echo "Generating screenshot: $name"
  bash "$IMAGE_GEN/scripts/generate-image.sh" \
    --prompt "$prompt" \
    --model "qwen-image-2.0-pro" \
    --size "1179*2556" \
    --output "$OUTPUT_DIR/images" \
    --count 1 \
    --no-watermark
  echo "  -> $name generated"
}

if [ "$PHASE" = "sprites" ] || [ "$PHASE" = "all" ]; then
  echo "=== Phase 1: Candy Sprites ==="
  generate_sprite "candy-red" "Pixel art 64x64 candy sprite, red round candy with glossy highlight, hand-crafted style, warm palette, transparent background, 32 colors max"
  generate_sprite "candy-blue" "Pixel art 64x64 candy sprite, blue square candy with glossy highlight, hand-crafted style, warm palette, transparent background, 32 colors max"
  generate_sprite "candy-green" "Pixel art 64x64 candy sprite, green triangular candy with glossy highlight, hand-crafted style, warm palette, transparent background, 32 colors max"
  generate_sprite "candy-yellow" "Pixel art 64x64 candy sprite, yellow star-shaped candy with glossy highlight, hand-crafted style, warm palette, transparent background, 32 colors max"
  generate_sprite "candy-purple" "Pixel art 64x64 candy sprite, purple heart-shaped candy with glossy highlight, hand-crafted style, warm palette, transparent background, 32 colors max"
  generate_sprite "candy-orange" "Pixel art 64x64 candy sprite, orange rounded candy with glossy highlight, hand-crafted style, warm palette, transparent background, 32 colors max"

  echo "=== Phase 2: Special Candy Sprites ==="
  generate_sprite "special-striped" "Pixel art 64x64 candy sprite, striped candy with horizontal white lines, hand-crafted style, warm palette, transparent background"
  generate_sprite "special-wrapped" "Pixel art 64x64 candy sprite, wrapped candy with gold ribbon, hand-crafted style, warm palette, transparent background"
  generate_sprite "special-bomb" "Pixel art 64x64 candy sprite, dark color bomb candy with glowing center, hand-crafted style, warm palette, transparent background"

  echo "Optimizing sprites..."
  bash "$SKILL_DIR/scripts/optimize-game-assets.sh" \
    --action pack-atlas \
    --input "$MOBILE_ASSETS/sprites" \
    --output "$MOBILE_ASSETS/sprites" \
    --atlas-name candies \
    --max-size 512
fi

if [ "$PHASE" = "backgrounds" ] || [ "$PHASE" = "all" ]; then
  echo "=== Phase 3: Backgrounds ==="
  generate_bg "splash" "Hand-crafted illustration of a candy-themed mobile game splash screen, warm pastel colors, pink and cream gradient background, 1179x2556 portrait"
  generate_bg "menu" "Hand-crafted candy-themed game menu background, soft warm pastel colors, subtle candy patterns, paper texture, 1179x2556 portrait"
  generate_bg "gameplay" "Hand-crafted candy-themed gameplay background, soft warm pastel gradient, subtle grid pattern, 1179x2556 portrait"
  generate_bg "levels" "Hand-crafted level select map background, candy-themed world map, warm pastel colors, 1179x2556 portrait"
  generate_bg "paywall" "Hand-crafted premium paywall background, royal purple and gold accents, elegant candy theme, 1179x2556 portrait"
fi

if [ "$PHASE" = "screenshots" ] || [ "$PHASE" = "all" ]; then
  echo "=== Phase 4: Screenshots ==="
  generate_screenshot "screenshot-gameplay" "Mobile game screenshot of a match-3 puzzle game, colorful candies on an 8x8 grid, score and moves HUD, warm candy theme, 1179x2556 portrait, no device frame"
  generate_screenshot "screenshot-levels" "Mobile game screenshot of a level select map, 5 worlds with candy-themed nodes, warm pastel colors, 1179x2556 portrait, no device frame"
  generate_screenshot "screenshot-features" "Mobile game screenshot showing special candy effects, chain reactions, particle effects, match-3 game, 1179x2556 portrait, no device frame"
fi

if [ "$PHASE" = "icon" ] || [ "$PHASE" = "all" ]; then
  echo "=== Phase 5: App Icon ==="
  bash "$IMAGE_GEN/scripts/generate-image.sh" \
    --prompt "Candy letter M made of swirled pink and white candy, glossy finish, warm pastel background, 1024x1024 app icon, centered composition, high quality" \
    --model "wan2.7-image" \
    --size "1024*1024" \
    --output "$OUTPUT_DIR" \
    --count 4 \
    --no-watermark
  echo "App icon generated"
fi

if [ "$PHASE" = "og" ] || [ "$PHASE" = "all" ]; then
  echo "=== Phase 6: OG Image ==="
  bash "$IMAGE_GEN/scripts/generate-image.sh" \
    --prompt "Mini Candy Match-3 Puzzle game title, colorful candies arrangement, 'Match-3 Puzzle' subtitle, warm pastel colors, Shipaton 2026, 1200x630 social card" \
    --model "qwen-image-2.0-pro" \
    --size "1200*630" \
    --output "$OUTPUT_DIR" \
    --count 2 \
    --no-watermark
  echo "OG image generated"
fi

echo "=== Asset generation complete ==="
echo "Output directories:"
echo "  Sprites: $MOBILE_ASSETS/sprites/"
echo "  Backgrounds: $MOBILE_ASSETS/backgrounds/"
echo "  Screenshots: $OUTPUT_DIR/images/"
echo "  Icon: $OUTPUT_DIR/"
echo ""
echo "Next steps:"
echo "  - Run ImageMagick post-processing: mogrify -resize 64x64 $MOBILE_ASSETS/sprites/*.png"
echo "  - Convert to WebP: for f in $MOBILE_ASSETS/sprites/*.png; do cwebp -q 80 \$f -o \${f%.png}.webp; done"
echo "  - Trim transparency: bash $SKILL_DIR/scripts/optimize-game-assets.sh --action reduce-palette ..."

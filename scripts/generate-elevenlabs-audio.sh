#!/usr/bin/env bash
set -euo pipefail

ELEVENLABS_API_KEY="${ELEVENLABS_API_KEY:-$(grep -E '^export ELEVENLABS_API_KEY=' ~/.zshrc | sed 's/^export ELEVENLABS_API_KEY=//; s/["'\'']//g')}"
AUDIO_DIR="/Users/alan/Desktop/shipaton-project/apps/mobile/assets/audio"
VOICE_ID="cgSgspJ2msm6clMCkdW9"

if [ -z "$ELEVENLABS_API_KEY" ]; then
  echo "ERROR: ELEVENLABS_API_KEY not found"
  exit 1
fi

generate_sfx() {
  local name="$1" prompt="$2" duration="$3"
  local tmpfile=$(mktemp)
  echo "  [SFX] $name — $prompt"

  curl -s -X POST "https://api.elevenlabs.io/v1/sound-generation" \
    -H "xi-api-key: $ELEVENLABS_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg text "$prompt" --argjson dur "$duration" '{text: $text, duration_seconds: $dur}')" \
    -o "$tmpfile"

  if [ ! -s "$tmpfile" ]; then
    echo "    ERROR: Empty response for $name"
    rm -f "$tmpfile"
    return 1
  fi

  ffmpeg -y -i "$tmpfile" -ac 1 -sample_fmt s16 -ar 44100 \
    -af "loudnorm=I=-16:LRA=11:TP=-1.5,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.01,areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.01,areverse" \
    "$AUDIO_DIR/$name" 2>/dev/null

  local size=$(stat -f%z "$AUDIO_DIR/$name" 2>/dev/null || stat -c%s "$AUDIO_DIR/$name" 2>/dev/null)
  echo "    Saved: $AUDIO_DIR/$name ($(( size / 1024 )) KB)"
  rm -f "$tmpfile"
  sleep 1
}

generate_tts() {
  local name="$1" text="$2"
  local tmpfile=$(mktemp)
  echo "  [TTS] $name — \"$text\""

  curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_ID" \
    -H "xi-api-key: $ELEVENLABS_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg text "$text" '{text: $text, model_id: "eleven_turbo_v2_5"}')" \
    -o "$tmpfile"

  if [ ! -s "$tmpfile" ]; then
    echo "    ERROR: Empty response for $name"
    rm -f "$tmpfile"
    return 1
  fi

  ffmpeg -y -i "$tmpfile" -ac 1 -sample_fmt s16 -ar 44100 \
    -af "loudnorm=I=-16:LRA=11:TP=-1.5,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.01,areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.01,areverse" \
    "$AUDIO_DIR/$name" 2>/dev/null

  local size=$(stat -f%z "$AUDIO_DIR/$name" 2>/dev/null || stat -c%s "$AUDIO_DIR/$name" 2>/dev/null)
  echo "    Saved: $AUDIO_DIR/$name ($(( size / 1024 )) KB)"
  rm -f "$tmpfile"
}

echo "========================================="
echo " ElevenLabs Audio Generation"
echo "========================================="
echo " Output: $AUDIO_DIR"
echo " Voice:  Jessica ($VOICE_ID)"
echo "========================================="
echo ""

# --- SFX: 12 files ---
echo "--- Sound Effects ---"
generate_sfx "sfx_swap.wav" "A soft candy swoosh, two objects sliding past each other, smooth and quick" 0.5
generate_sfx "sfx_match.wav" "Three candies popping in quick succession, bright and cheerful" 0.5
generate_sfx "sfx_cascade.wav" "A cascade of small candies falling and bouncing, rapid tinkling sounds" 0.5
generate_sfx "sfx_special_create.wav" "A magical sparkle sound, a special candy being created, rising chime" 0.5
generate_sfx "sfx_special_activate.wav" "A powerful explosion of candy, whoosh with sparkles, exciting burst" 0.5
generate_sfx "sfx_win.wav" "A triumphant victory fanfare, uplifting and celebratory, happy ending" 1.0
generate_sfx "sfx_lose.wav" "A gentle sad descending tone, game over, soft and not harsh" 0.5
generate_sfx "sfx_button.wav" "A soft UI click, candy-like, gentle tap" 0.5
generate_sfx "sfx_coin.wav" "A coin collecting sound, metallic ping, rewarding" 0.5
generate_sfx "sfx_star.wav" "A star appearing sound, magical twinkle, ascending chime" 0.5
generate_sfx "sfx_life_lost.wav" "A heart breaking sound, soft glass crack, sad but gentle" 0.5
generate_sfx "sfx_notification.wav" "A cheerful notification ding, pleasant alert, bell-like" 0.5

echo ""
echo "--- Combo Callouts (TTS) ---"
generate_tts "sfx_combo_1.wav" "Nice!"
generate_tts "sfx_combo_2.wav" "Great!"
generate_tts "sfx_combo_3.wav" "Amazing!"

echo ""
echo "========================================="
echo " Done"
echo "========================================="
#!/usr/bin/env bash
set -euo pipefail

ELEVENLABS_API_KEY="${ELEVENLABS_API_KEY:-$(grep -E '^export ELEVENLABS_API_KEY=' ~/.zshrc | sed 's/^export ELEVENLABS_API_KEY=//; s/["'\'']//g')}"
AUDIO_DIR="/Users/alan/Desktop/shipaton-project/apps/mobile/assets/audio"

if [ -z "$ELEVENLABS_API_KEY" ]; then
  echo "ERROR: ELEVENLABS_API_KEY not found"
  exit 1
fi

generate_bgm() {
  local name="$1" prompt="$2" duration_ms="$3"
  local tmpfile=$(mktemp).mp3
  local tmpfile2=$(mktemp).mp3
  echo "  [BGM] $name — ${duration_ms}ms"

  curl -s -X POST "https://api.elevenlabs.io/v1/music?output_format=mp3_44100_192" \
    -H "xi-api-key: $ELEVENLABS_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$(jq -n \
      --arg prompt "$prompt" \
      --argjson dur "$duration_ms" \
      '{
        prompt: $prompt,
        music_length_ms: $dur,
        model_id: "music_v2",
        force_instrumental: true
      }')" \
    -o "$tmpfile"

  local size=$(stat -f%z "$tmpfile" 2>/dev/null || stat -c%s "$tmpfile" 2>/dev/null)
  if [ "$size" -lt 1000 ]; then
    echo "    ERROR: Response too small ($size bytes), likely an error"
    cat "$tmpfile" | head -c 500
    rm -f "$tmpfile" "$tmpfile2"
    return 1
  fi
  echo "    Downloaded: $(( size / 1024 )) KB"

  # Trim silence + normalize loudness
  ffmpeg -y -i "$tmpfile" \
    -af "silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.1,areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.1,areverse,loudnorm=I=-16:LRA=11:TP=-1.5" \
    -codec:a libmp3lame -b:a 192k \
    "$tmpfile2" 2>/dev/null

  cp "$tmpfile2" "$AUDIO_DIR/$name"
  local final_size=$(stat -f%z "$AUDIO_DIR/$name" 2>/dev/null || stat -c%s "$AUDIO_DIR/$name" 2>/dev/null)
  echo "    Saved: $AUDIO_DIR/$name ($(( final_size / 1024 )) KB)"
  rm -f "$tmpfile" "$tmpfile2"
}

echo "========================================="
echo " ElevenLabs BGM Generation"
echo "========================================="
echo " Output: $AUDIO_DIR"
echo " Model:  music_v2"
echo "========================================="
echo ""

generate_bgm "bgm_menu.mp3" \
  "Warm and cozy candy shop music box melody, gentle glockenspiel and pizzicato strings, soft harp arpeggios, cheerful and inviting, 80 BPM, instrumental, loop-friendly, no vocals, warm acoustic feel" \
  30000

generate_bgm "bgm_gameplay.mp3" \
  "Playful candy land background music, toy piano and gentle marimba melody, light flute embellishments, soft warm percussion, 100 BPM, instrumental, loop-friendly, no vocals, sweet and focused" \
  30000

generate_bgm "bgm_victory.mp3" \
  "A triumphant and warm instrumental jingle lasting 6 to 8 seconds, featuring warm chimes and bells ascending, a soft brass stinger, and a harp glissando flourish, evoking a sense of celebration without referencing any specific brand, artist, or copyrighted work" \
  8000

echo ""
echo "========================================="
echo " Done"
echo "========================================="
echo ""
echo "Files:"
ls -lh "$AUDIO_DIR"/bgm_*.mp3
import { Audio, AVPlaybackSource } from 'expo-av';

let musicSound: Audio.Sound | null = null;
let sfxCache: Map<string, Audio.Sound> = new Map();

export async function playMusic(source: AVPlaybackSource, volume = 0.7): Promise<void> {
  try {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    if (musicSound) {
      await musicSound.unloadAsync();
    }
    musicSound = new Audio.Sound();
    await musicSound.loadAsync(source, { isLooping: true, volume });
    await musicSound.playAsync();
  } catch {}
}

export async function stopMusic(): Promise<void> {
  if (musicSound) {
    await musicSound.stopAsync();
    await musicSound.unloadAsync();
    musicSound = null;
  }
}

export async function setMusicVolume(volume: number): Promise<void> {
  if (musicSound) {
    await musicSound.setVolumeAsync(volume);
  }
}

export async function playSFX(source: AVPlaybackSource, volume = 0.8): Promise<void> {
  try {
    if (sfxCache.has(source.toString())) {
      const sound = sfxCache.get(source.toString())!;
      await sound.replayAsync();
      return;
    }
    const sound = new Audio.Sound();
    sfxCache.set(source.toString(), sound);
    await sound.loadAsync(source, { volume });
    await sound.playAsync();
  } catch {}
}

export async function unloadAllSFX(): Promise<void> {
  for (const sound of sfxCache.values()) {
    await sound.unloadAsync();
  }
  sfxCache.clear();
}

import { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts as useFontsFredoka, Fredoka_600SemiBold } from '@expo-google-fonts/fredoka';
import { useFonts as useFontsNunito, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { usePlayerStore } from '../src/store/playerStore';
import SplashScreen from '../src/components/SplashScreen';

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const [fredokaLoaded] = useFontsFredoka({ Fredoka: Fredoka_600SemiBold });
  const [nunitoLoaded] = useFontsNunito({ Nunito: Nunito_700Bold });
  const loadFromStorage = usePlayerStore((s) => s.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
  }, []);

  const fontsLoaded = fredokaLoaded && nunitoLoaded;

  useEffect(() => {
    if (fontsLoaded && showSplash) {
      const timer = setTimeout(() => setShowSplash(false), 500);
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, showSplash]);

  if (showSplash || !fontsLoaded) {
    return (
      <View style={{ flex: 1 }}>
        <SplashScreen onFinish={() => {}} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
          contentStyle: { backgroundColor: '#FFF5E6' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="levels" />
        <Stack.Screen name="play/[id]" />
        <Stack.Screen name="result/win" />
        <Stack.Screen name="result/lose" />
        <Stack.Screen name="shop" />
        <Stack.Screen name="paywall" />
        <Stack.Screen name="leaderboard" />
        <Stack.Screen name="daily" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="boosters" />
        <Stack.Screen name="profile" />
      </Stack>
    </GestureHandlerRootView>
  );
}
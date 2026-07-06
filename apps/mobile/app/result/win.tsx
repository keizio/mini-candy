import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fonts } from '../../src/utils/typography';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import StarRating from '../../src/components/StarRating';
import CoinDisplay from '../../src/components/CoinDisplay';

export default function WinScreen() {
  const { levelId, stars, score, coins } = useLocalSearchParams<{
    levelId: string; stars: string; score: string; coins: string;
  }>();
  const [showStars, setShowStars] = useState(false);
  const [showCoins, setShowCoins] = useState(false);

  const starCount = parseInt(stars || '0');
  const coinCount = parseInt(coins || '0');
  const levelNum = parseInt(levelId || '1');

  useEffect(() => {
    const t1 = setTimeout(() => setShowStars(true), 300);
    const t2 = setTimeout(() => setShowCoins(true), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🎉</Text>
      <Text style={styles.title}>Level Complete!</Text>
      <Text style={styles.subtitle}>Level {levelNum}</Text>
      <Text style={styles.score}>{score} pts</Text>

      {showStars && (
        <View style={styles.starsContainer}>
          <StarRating stars={starCount} size={36} />
        </View>
      )}

      {showCoins && (
        <View style={styles.coinContainer}>
          <CoinDisplay amount={coinCount} size="lg" />
        </View>
      )}

      <View style={styles.buttons}>
        {levelNum < 50 && (
          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.replace(`/play/${levelNum + 1}`)}>
            <Text style={styles.primaryBtnText}>Next Level</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.replace(`/play/${levelNum}`)}>
          <Text style={styles.secondaryBtnText}>Replay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ghostBtn} onPress={() => router.replace('/levels')}>
          <Text style={styles.ghostBtnText}>Level Select</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5E6', alignItems: 'center', justifyContent: 'center', padding: 24 },
  emoji: { fontSize: 64, marginBottom: 8 },
  title: { fontSize: 32, fontWeight: '900', color: '#2D2D2D', marginBottom: 4, fontFamily: fonts.heading },
  subtitle: { fontSize: 16, color: '#888', marginBottom: 8, fontFamily: fonts.body },
  score: { fontSize: 28, fontWeight: '700', color: '#FF6B9D', marginBottom: 16, fontFamily: fonts.heading },
  starsContainer: { marginBottom: 16 },
  coinContainer: { marginBottom: 32, backgroundColor: '#FFE8D0', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  buttons: { gap: 10, width: '100%', maxWidth: 240 },
  primaryBtn: { backgroundColor: '#FF6B9D', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  primaryBtnText: { color: '#FFF', fontWeight: '700', fontSize: 16, fontFamily: fonts.body },
  secondaryBtn: { backgroundColor: '#FFD700', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  secondaryBtnText: { color: '#2D2D2D', fontWeight: '700', fontSize: 16, fontFamily: fonts.body },
  ghostBtn: { paddingVertical: 10, alignItems: 'center' },
  ghostBtnText: { color: '#888', fontWeight: '600', fontSize: 14, fontFamily: fonts.body },
});

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fonts } from '../../src/utils/typography';
import { useLocalSearchParams, router } from 'expo-router';
import { usePlayerStore } from '../../src/store/playerStore';

export default function LoseScreen() {
  const { levelId } = useLocalSearchParams<{ levelId: string }>();
  const levelNum = parseInt(levelId || '1');
  const spendCoins = usePlayerStore((s) => s.spendCoins);
  const addCoins = usePlayerStore((s) => s.addCoins);

  const handleBuyMoves = () => {
    const spent = spendCoins(100);
    if (spent) {
      router.replace(`/play/${levelNum}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>😢</Text>
      <Text style={styles.title}>Out of Moves!</Text>
      <Text style={styles.subtitle}>Keep trying, you'll get it!</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.replace(`/play/${levelNum}`)}>
          <Text style={styles.primaryBtnText}>Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={handleBuyMoves}>
          <Text style={styles.secondaryBtnText}>Buy +5 Moves (100 coins)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ghostBtn} onPress={() => router.replace('/levels')}>
          <Text style={styles.ghostBtnText}>Give Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5E6', alignItems: 'center', justifyContent: 'center', padding: 24 },
  emoji: { fontSize: 64, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '900', color: '#2D2D2D', marginBottom: 4, fontFamily: fonts.heading },
  subtitle: { fontSize: 16, color: '#888', marginBottom: 40, fontFamily: fonts.body },
  buttons: { gap: 10, width: '100%', maxWidth: 240 },
  primaryBtn: { backgroundColor: '#FF6B9D', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  primaryBtnText: { color: '#FFF', fontWeight: '700', fontSize: 16, fontFamily: fonts.body },
  secondaryBtn: { backgroundColor: '#FFD700', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  secondaryBtnText: { color: '#2D2D2D', fontWeight: '700', fontSize: 12, fontFamily: fonts.body },
  ghostBtn: { paddingVertical: 10, alignItems: 'center' },
  ghostBtnText: { color: '#888', fontWeight: '600', fontSize: 14, fontFamily: fonts.body },
});

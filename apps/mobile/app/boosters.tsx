import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { usePlayerStore } from '../src/store/playerStore';
import { useIAPStore } from '../src/store/iapStore';
import CandyCard from '../src/components/CandyCard';
import CoinDisplay from '../src/components/CoinDisplay';
import { fonts } from '../src/utils/typography';

const ALL_BOOSTERS = [
  { id: 'hammer', name: '🔨 Hammer', desc: 'Crush any single candy' },
  { id: 'color_bomb', name: '💣 Color Bomb', desc: 'Clears all of one color' },
  { id: 'shuffle', name: '🔀 Shuffle', desc: 'Rearrange the board' },
  { id: 'extra_moves', name: '➕ Extra Moves', desc: '+5 moves added' },
];

export default function BoosterSelectScreen() {
  const coins = usePlayerStore((s) => s.coins);
  const spendCoins = usePlayerStore((s) => s.spendCoins);
  const isPremium = useIAPStore((s) => s.isPremium);
  const [selected, setSelected] = useState<string[]>([]);
  const maxSlots = isPremium ? 3 : 2;

  const toggleBooster = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : prev.length < maxSlots ? [...prev, id] : prev
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Boosters</Text>
        <CoinDisplay amount={coins} />
      </View>

      <Text style={styles.hint}>
        Select up to {maxSlots} boosters{isPremium ? ' (Premium)' : ''}
      </Text>

      <View style={styles.grid}>
        {ALL_BOOSTERS.map((booster) => (
          <TouchableOpacity
            key={booster.id}
            style={[styles.card, selected.includes(booster.id) && styles.selectedCard]}
            onPress={() => toggleBooster(booster.id)}
          >
            <Text style={booster.id === 'extra_moves' ? {} : styles.boosterEmoji}>{booster.id === 'extra_moves' ? '➕' : ''}</Text>
            <Text style={styles.boosterName}>{booster.name}</Text>
            <Text style={styles.boosterDesc}>{booster.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.playBtn} onPress={() => router.back()}>
          <Text style={styles.playBtnText}>Play with Boosters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipBtn} onPress={() => router.back()}>
          <Text style={styles.skipBtnText}>No boosters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5E6', padding: 20, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '900', color: '#2D2D2D', fontFamily: fonts.heading },
  hint: { fontSize: 13, color: '#888', marginBottom: 16, fontFamily: fonts.body },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  card: { width: '48%' as any, backgroundColor: '#FFF', borderRadius: 12, padding: 16, alignItems: 'center', borderWidth: 2, borderColor: 'transparent' },
  selectedCard: { borderColor: '#FF6B9D' },
  boosterEmoji: { fontSize: 28, marginBottom: 6 },
  boosterName: { fontSize: 14, fontWeight: '700', color: '#2D2D2D', marginBottom: 4, fontFamily: fonts.heading },
  boosterDesc: { fontSize: 11, color: '#888', textAlign: 'center', fontFamily: fonts.body },
  footer: { marginTop: 'auto', gap: 8, paddingBottom: 20 },
  playBtn: { backgroundColor: '#FF6B9D', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  playBtnText: { color: '#FFF', fontWeight: '700', fontSize: 16, fontFamily: fonts.body },
  skipBtn: { paddingVertical: 10, alignItems: 'center' },
  skipBtnText: { color: '#888', fontWeight: '600', fontSize: 14, fontFamily: fonts.body },
});

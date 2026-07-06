import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { usePlayerStore } from '../src/store/playerStore';
import CandyCard from '../src/components/CandyCard';
import CandyButton from '../src/components/CandyButton';
import CoinDisplay from '../src/components/CoinDisplay';
import { fonts } from '../src/utils/typography';

const COIN_PACKS = [
  { id: 'coins_500', coins: 500, price: 0.99 },
  { id: 'coins_1200', coins: 1200, price: 1.99, badge: 'Popular' },
  { id: 'coins_3000', coins: 3000, price: 4.99, badge: 'Best Value' },
];

const BOOSTERS = [
  { id: 'hammer', name: 'Hammer', desc: 'Crush any candy', cost: 100 },
  { id: 'color_bomb', name: 'Color Bomb', desc: 'Clear all of one color', cost: 200 },
  { id: 'shuffle', name: 'Shuffle', desc: 'Rearrange the board', cost: 100 },
  { id: 'extra_moves', name: '+5 Moves', desc: 'Get 5 extra moves', cost: 100 },
];

export default function ShopScreen() {
  const coins = usePlayerStore((s) => s.coins);
  const spendCoins = usePlayerStore((s) => s.spendCoins);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Shop</Text>
        <CoinDisplay amount={coins} size="lg" />
      </View>

      <Text style={styles.sectionTitle}>Coin Packs</Text>
      <View style={styles.packsRow}>
        {COIN_PACKS.map((pack) => (
          <CandyCard key={pack.id} style={styles.packCard} padding={12}>
            <Text style={styles.packCoins}>{pack.coins}</Text>
            <Text style={styles.packPrice}>${pack.price}</Text>
            {pack.badge && <Text style={styles.packBadge}>{pack.badge}</Text>}
          </CandyCard>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Boosters</Text>
      <View style={styles.boostersGrid}>
        {BOOSTERS.map((booster) => (
          <CandyCard key={booster.id} style={styles.boosterCard} padding={12}>
            <Text style={styles.boosterName}>{booster.name}</Text>
            <Text style={styles.boosterDesc}>{booster.desc}</Text>
            <CandyButton
              title={`${booster.cost} coins`}
              onPress={() => spendCoins(booster.cost)}
              size="sm"
              variant="outline"
            />
          </CandyCard>
        ))}
      </View>

      <CandyCard style={styles.premiumCard} color="#FFF0F5" padding={16}>
        <Text style={styles.premiumTitle}>Go Premium!</Text>
        <Text style={styles.premiumDesc}>Ad-free, unlimited lives, 5x daily bonus, exclusive skins</Text>
        <CandyButton title="Learn More" onPress={() => router.push('/paywall')} variant="primary" />
      </CandyCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5E6' },
  content: { padding: 16, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '900', color: '#2D2D2D', fontFamily: fonts.heading },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#2D2D2D', marginBottom: 12, marginTop: 8, fontFamily: fonts.heading },
  packsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  packCard: { flex: 1, alignItems: 'center' },
  packCoins: { fontSize: 22, fontWeight: '800', color: '#FFD700', fontFamily: fonts.heading },
  packPrice: { fontSize: 14, color: '#888', fontWeight: '600', marginTop: 4, fontFamily: fonts.body },
  packBadge: { fontSize: 10, color: '#FF6B9D', fontWeight: '700', marginTop: 4, fontFamily: fonts.body },
  boostersGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  boosterCard: { width: '48%' as any },
  boosterName: { fontSize: 15, fontWeight: '700', color: '#2D2D2D', fontFamily: fonts.heading },
  boosterDesc: { fontSize: 12, color: '#888', marginBottom: 8, fontFamily: fonts.body },
  premiumCard: { marginBottom: 24 },
  premiumTitle: { fontSize: 18, fontWeight: '700', color: '#9B59B6', marginBottom: 4, fontFamily: fonts.heading },
  premiumDesc: { fontSize: 13, color: '#888', marginBottom: 12, lineHeight: 18, fontFamily: fonts.body },
});

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { usePlayerStore } from '../src/store/playerStore';
import CoinDisplay from '../src/components/CoinDisplay';
import StarRating from '../src/components/StarRating';
import Badge from '../src/components/Badge';
import { fonts } from '../src/utils/typography';

const ACHIEVEMENTS = [
  { id: 'first_win', label: 'First Win', icon: '🏆', unlocked: true },
  { id: 'star_collector', label: 'Star Collector', icon: '⭐', unlocked: true },
  { id: 'combo_master', label: 'Combo Master', icon: '🔥', unlocked: false },
  { id: 'level_10', label: 'Level 10', icon: '📈', unlocked: true },
  { id: 'level_25', label: 'Level 25', icon: '📈', unlocked: false },
  { id: 'level_50', label: 'Level 50', icon: '👑', unlocked: false },
  { id: 'coin_hoarder', label: 'Coin Hoarder', icon: '🪙', unlocked: true },
  { id: 'daily_streak_3', label: '3-Day Streak', icon: '🔥', unlocked: false },
  { id: 'daily_streak_7', label: '7-Day Streak', icon: '💎', unlocked: false },
  { id: 'no_moves_left', label: 'Last Move Win', icon: '🎯', unlocked: false },
  { id: 'perfect_world', label: 'World Master', icon: '🌟', unlocked: false },
  { id: 'premium', label: 'Premium Member', icon: '💜', unlocked: false },
];

export default function ProfileScreen() {
  const displayName = usePlayerStore((s) => s.displayName);
  const totalStars = usePlayerStore((s) => s.totalStars);
  const coins = usePlayerStore((s) => s.coins);
  const completedLevels = usePlayerStore((s) => s.completedLevels);
  const dailyStreak = usePlayerStore((s) => s.dailyStreak);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🍬</Text>
        </View>
        <Text style={styles.name}>{displayName}</Text>
        <Text style={styles.stats}>
          Level {Math.floor(totalStars / 10) + 1} · {totalStars} ⭐ total
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{completedLevels.length}</Text>
          <Text style={styles.statLabel}>Levels</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{totalStars}</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>
        <View style={styles.stat}>
          <CoinDisplay amount={coins} size="lg" />
          <Text style={styles.statLabel}>Coins</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{dailyStreak}</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Achievements</Text>
      <View style={styles.achievementGrid}>
        {ACHIEVEMENTS.map((ach) => (
          <View key={ach.id} style={[styles.achievement, !ach.unlocked && styles.achievementLocked]}>
            <Text style={styles.achievementIcon}>{ach.icon}</Text>
            <Text style={[styles.achievementLabel, !ach.unlocked && { color: '#CCC' }]}>
              {ach.label}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5E6' },
  content: { padding: 20, paddingTop: 60 },
  profileHeader: { alignItems: 'center', marginBottom: 24 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#FFE8D0', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { fontSize: 36 },
  name: { fontSize: 22, fontWeight: '800', color: '#2D2D2D', fontFamily: fonts.heading },
  stats: { fontSize: 13, color: '#888', marginTop: 4, fontFamily: fonts.body },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 24 },
  stat: { alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '800', color: '#2D2D2D', fontFamily: fonts.heading },
  statLabel: { fontSize: 11, color: '#888', fontWeight: '600', marginTop: 2, fontFamily: fonts.body },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#2D2D2D', marginBottom: 12, fontFamily: fonts.heading },
  achievementGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  achievement: { width: '23%' as any, backgroundColor: '#FFF', borderRadius: 10, padding: 10, alignItems: 'center' },
  achievementLocked: { opacity: 0.5 },
  achievementIcon: { fontSize: 24, marginBottom: 4 },
  achievementLabel: { fontSize: 10, fontWeight: '600', color: '#2D2D2D', textAlign: 'center', fontFamily: fonts.heading },
});

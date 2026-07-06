import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { usePlayerStore } from '../src/store/playerStore';
import { useIAPStore } from '../src/store/iapStore';
import LivesDisplay from '../src/components/LivesDisplay';
import CoinDisplay from '../src/components/CoinDisplay';
import { lightImpact } from '../src/utils/haptics';
import { fonts } from '../src/utils/typography';

export default function MainMenu() {
  const lives = usePlayerStore((s) => s.lives);
  const maxLives = usePlayerStore((s) => s.maxLives);
  const coins = usePlayerStore((s) => s.coins);
  const isPremium = useIAPStore((s) => s.isPremium);

  const navigate = (path: string) => {
    lightImpact();
    router.push(path as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <LivesDisplay lives={lives} maxLives={maxLives} size="sm" />
        <CoinDisplay amount={coins} />
      </View>

      <View style={styles.center}>
        <Text style={styles.emoji}>🍬</Text>
        <Text style={styles.title}>Mini Candy</Text>
        <Text style={styles.subtitle}>Match-3 Puzzle</Text>

        {isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>✨ Premium</Text>
          </View>
        )}
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.playButton} onPress={() => navigate('/levels')}>
          <Text style={styles.playButtonText}>PLAY</Text>
        </TouchableOpacity>

        <View style={styles.menuRow}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigate('/daily')}>
            <Text style={styles.menuIcon}>📅</Text>
            <Text style={styles.menuLabel}>Daily</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigate('/shop')}>
            <Text style={styles.menuIcon}>🛒</Text>
            <Text style={styles.menuLabel}>Shop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigate('/leaderboard')}>
            <Text style={styles.menuIcon}>🏆</Text>
            <Text style={styles.menuLabel}>Rankings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigate('/profile')}>
            <Text style={styles.menuIcon}>👤</Text>
            <Text style={styles.menuLabel}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.settingsBtn} onPress={() => navigate('/settings')}>
        <Text style={styles.settingsText}>⚙️ Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E6',
    padding: 20,
    paddingTop: 60,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 80, marginBottom: 8 },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FF6B9D',
    letterSpacing: -1,
    fontFamily: fonts.heading,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
    fontFamily: fonts.body,
  },
  premiumBadge: {
    backgroundColor: '#9B59B6',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 10,
  },
  premiumText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  menu: {
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: '#FF6B9D',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 2,
    fontFamily: fonts.body,
  },
  menuRow: {
    flexDirection: 'row',
    gap: 10,
  },
  menuItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuIcon: { fontSize: 24, marginBottom: 4 },
  menuLabel: { fontSize: 11, fontWeight: '600', color: '#888', fontFamily: fonts.body },
  settingsBtn: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingsText: {
    fontSize: 14,
    color: '#CCC',
    fontFamily: fonts.body,
  },
});

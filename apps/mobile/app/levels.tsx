import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { usePlayerStore } from '../src/store/playerStore';
import { allLevels, getLevelsByWorld, WORLD_NAMES, WORLD_COLORS } from '../src/game/levels';
import StarRating from '../src/components/StarRating';
import LivesDisplay from '../src/components/LivesDisplay';
import { fonts } from '../src/utils/typography';

const { width } = Dimensions.get('window');

export default function LevelSelectScreen() {
  const completedLevels = usePlayerStore((s) => s.completedLevels);
  const levelStars = usePlayerStore((s) => s.levelStars);
  const lives = usePlayerStore((s) => s.lives);
  const maxLives = usePlayerStore((s) => s.maxLives);

  const worlds = [1, 2, 3, 4, 5];

  function isUnlocked(levelId: number): boolean {
    if (levelId === 1) return true;
    return completedLevels.includes(levelId - 1);
  }

  function isCompleted(levelId: number): boolean {
    return completedLevels.includes(levelId);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Level Select</Text>
        <LivesDisplay lives={lives} maxLives={maxLives} size="sm" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {worlds.map((world) => {
          const levels = getLevelsByWorld(world);
          const color = WORLD_COLORS[world];
          return (
            <View key={world} style={[styles.worldSection, { backgroundColor: color + '40' }]}>
              <Text style={styles.worldTitle}>{WORLD_NAMES[world]}</Text>
              <View style={styles.levelGrid}>
                {levels.map((level) => {
                  const unlocked = isUnlocked(level.id);
                  const completed = isCompleted(level.id);
                  const stars = levelStars[level.id] || 0;
                  return (
                    <TouchableOpacity
                      key={level.id}
                      style={[
                        styles.levelNode,
                        { opacity: unlocked ? 1 : 0.4 },
                        completed && styles.levelCompleted,
                      ]}
                      onPress={() => unlocked && router.push(`/play/${level.id}`)}
                      disabled={!unlocked}
                    >
                      <Text style={[styles.levelNumber, !unlocked && { color: '#CCC' }]}>
                        {unlocked ? level.id : '🔒'}
                      </Text>
                      {completed && (
                        <StarRating stars={stars} size={10} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5E6' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16,
  },
  title: { fontSize: 28, fontWeight: '900', color: '#2D2D2D', fontFamily: fonts.heading },
  worldSection: {
    marginHorizontal: 16, marginBottom: 16, borderRadius: 16, padding: 16,
  },
  worldTitle: { fontSize: 18, fontWeight: '700', color: '#2D2D2D', marginBottom: 12, fontFamily: fonts.heading },
  levelGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  levelNode: {
    width: (width - 80) / 5, height: (width - 80) / 5,
    backgroundColor: '#FFFFFF', borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 2, elevation: 2,
  },
  levelCompleted: { borderWidth: 2, borderColor: '#FFD700' },
  levelNumber: { fontSize: 18, fontWeight: '700', color: '#FF6B9D', fontFamily: fonts.heading },
});

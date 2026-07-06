import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { router } from 'expo-router';
import TabBar from '../src/components/TabBar';
import Skeleton from '../src/components/Skeleton';
import { fonts } from '../src/utils/typography';

const TABS = [
  { key: 'week', label: 'Weekly' },
  { key: 'all', label: 'All-Time' },
];

const MEDALS = ['🥇', '🥈', '🥉'];

interface Entry {
  rank: number;
  displayName: string;
  score: number;
  stars: number;
  isCurrentUser?: boolean;
}

export default function LeaderboardScreen() {
  const [activeTab, setActiveTab] = useState('week');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setEntries([
        { rank: 1, displayName: 'CandyKing', score: 25000, stars: 150 },
        { rank: 2, displayName: 'SweetTooth', score: 22000, stars: 140 },
        { rank: 3, displayName: 'SugarRush', score: 19800, stars: 135 },
        { rank: 4, displayName: 'Player', score: 15000, stars: 120, isCurrentUser: true },
        { rank: 5, displayName: 'GummyBear', score: 14200, stars: 115 },
      ]);
      setLoading(false);
    }, 800);
  }, [activeTab]);

  const renderItem = useCallback(({ item }: { item: Entry }) => (
    <View style={[styles.row, item.isCurrentUser && styles.currentUserRow]}>
      <Text style={styles.rank}>
        {item.rank <= 3 ? MEDALS[item.rank - 1] : `#${item.rank}`}
      </Text>
      <View style={styles.nameContainer}>
        <Text style={[styles.name, item.isCurrentUser && styles.currentName]}>
          {item.displayName}
        </Text>
        <Text style={styles.stars}>{item.stars} ⭐</Text>
      </View>
      <Text style={styles.score}>{item.score.toLocaleString()}</Text>
    </View>
  ), []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
      </View>
      <View style={styles.tabContainer}>
        <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      </View>
      {loading ? (
        <View style={styles.skeletonContainer}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} height={48} style={{ marginBottom: 8 }} borderRadius={8} />
          ))}
        </View>
      ) : (
        <FlatList
          data={entries}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.rank}`}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5E6' },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 12 },
  title: { fontSize: 28, fontWeight: '900', color: '#2D2D2D', fontFamily: fonts.heading },
  tabContainer: { paddingHorizontal: 20, marginBottom: 12 },
  skeletonContainer: { paddingHorizontal: 20 },
  list: { paddingHorizontal: 20 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 12, borderRadius: 10, marginBottom: 6 },
  currentUserRow: { borderWidth: 2, borderColor: '#FFD700' },
  rank: { fontSize: 16, width: 36, textAlign: 'center', fontFamily: fonts.heading },
  nameContainer: { flex: 1, marginLeft: 8 },
  name: { fontSize: 14, fontWeight: '600', color: '#2D2D2D', fontFamily: fonts.body },
  currentName: { color: '#FF6B9D' },
  stars: { fontSize: 11, color: '#888', marginTop: 2, fontFamily: fonts.body },
  score: { fontSize: 16, fontWeight: '700', color: '#2D2D2D', fontFamily: fonts.heading },
});

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { usePlayerStore } from '../src/store/playerStore';
import CandyCard from '../src/components/CandyCard';
import CandyButton from '../src/components/CandyButton';
import { fonts } from '../src/utils/typography';

export default function DailyChallengeScreen() {
  const dailyChallengeDate = usePlayerStore((s) => s.dailyChallengeDate);
  const dailyChallengeCompleted = usePlayerStore((s) => s.dailyChallengeCompleted);
  const dailyStreak = usePlayerStore((s) => s.dailyStreak);
  const completeDailyChallenge = usePlayerStore((s) => s.completeDailyChallenge);

  const today = new Date().toISOString().split('T')[0];
  const alreadyCompleted = dailyChallengeDate === today && dailyChallengeCompleted;

  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      setTimeLeft(`${hours}h ${mins}m`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  const handlePlay = () => {
    completeDailyChallenge(today);
    router.push('/play/0');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Challenge</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.emoji}>📅</Text>

        {dailyStreak > 0 && (
          <View style={styles.streakContainer}>
            <Text style={styles.streakText}>🔥 {dailyStreak} day streak</Text>
          </View>
        )}

        {alreadyCompleted ? (
          <CandyCard style={styles.completedCard} color="#E8FFE8">
            <Text style={styles.completedEmoji}>✅</Text>
            <Text style={styles.completedTitle}>Completed!</Text>
            <Text style={styles.completedSub}>Come back tomorrow for a new challenge</Text>
            <Text style={styles.timerText}>Next challenge in: {timeLeft}</Text>
          </CandyCard>
        ) : (
          <CandyCard style={styles.challengeCard}>
            <Text style={styles.challengeTitle}>Today's Challenge</Text>
            <Text style={styles.challengeDesc}>Test your skills with a unique daily puzzle!</Text>
            <View style={styles.rewardsCard}>
              <Text style={styles.rewardsTitle}>Rewards</Text>
              <Text style={styles.rewardItem}>🎉 200 coins (win)</Text>
              <Text style={styles.rewardItem}>🔥 3-day streak: 1000 bonus coins</Text>
              <Text style={styles.rewardItem}>🎁 7-day streak: Mystery chest</Text>
            </View>
            <CandyButton title="Play Now" onPress={handlePlay} size="lg" />
            <Text style={styles.timerText}>Resets in: {timeLeft}</Text>
          </CandyCard>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5E6' },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 12 },
  title: { fontSize: 28, fontWeight: '900', color: '#2D2D2D', fontFamily: fonts.heading },
  content: { padding: 20, alignItems: 'center' },
  emoji: { fontSize: 48, marginBottom: 16 },
  streakContainer: { backgroundColor: '#FFE8D0', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, marginBottom: 16 },
  streakText: { fontSize: 16, fontWeight: '700', color: '#FF6B9D', fontFamily: fonts.heading },
  completedCard: { width: '100%', alignItems: 'center', padding: 24 },
  completedEmoji: { fontSize: 40, marginBottom: 8 },
  completedTitle: { fontSize: 22, fontWeight: '800', color: '#44CC44', marginBottom: 4, fontFamily: fonts.heading },
  completedSub: { fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 12, fontFamily: fonts.body },
  challengeCard: { width: '100%', alignItems: 'center', padding: 24 },
  challengeTitle: { fontSize: 20, fontWeight: '700', color: '#2D2D2D', marginBottom: 8, fontFamily: fonts.heading },
  challengeDesc: { fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 16, fontFamily: fonts.body },
  rewardsCard: { backgroundColor: '#FFF5E6', borderRadius: 10, padding: 14, width: '100%', marginBottom: 16 },
  rewardsTitle: { fontSize: 14, fontWeight: '700', color: '#2D2D2D', marginBottom: 6, fontFamily: fonts.heading },
  rewardItem: { fontSize: 13, color: '#555', marginBottom: 3, fontFamily: fonts.body },
  timerText: { fontSize: 12, color: '#888', marginTop: 10, fontWeight: '600', fontFamily: fonts.body },
});

import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { fonts } from '../../src/utils/typography';
import { useLocalSearchParams, router } from 'expo-router';
import { useState, useCallback, useEffect } from 'react';
import { usePlayerStore } from '../../src/store/playerStore';
import { getLevel } from '../../src/game/levels';
import GameCanvas from '../../src/game/renderer/GameCanvas';
import ProgressBar from '../../src/components/ProgressBar';
import { mediumImpact, successNotification, errorNotification } from '../../src/utils/haptics';

const { width } = Dimensions.get('window');

export default function PlayScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const levelId = parseInt(id || '1');
  const level = getLevel(levelId);

  const [score, setScore] = useState(0);
  const [movesLeft, setMovesLeft] = useState(level?.moves || 20);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [finalStars, setFinalStars] = useState(0);
  const [paused, setPaused] = useState(false);

  const addCoins = usePlayerStore((s) => s.addCoins);
  const completeLevel = usePlayerStore((s) => s.completeLevel);
  const useLife = usePlayerStore((s) => s.useLife);

  useEffect(() => {
    setScore(0);
    setMovesLeft(level?.moves || 20);
    setGameOver(false);
    setGameWon(false);
    setFinalStars(0);
    setPaused(false);
    useLife();
  }, [id]);

  if (!level) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Level not found</Text>
      </View>
    );
  }

  const handleScoreChange = useCallback((s: number) => {
    setScore(s);
  }, []);

  const handleMovesChange = useCallback((m: number) => {
    setMovesLeft(m);
  }, []);

  const handleGameOver = useCallback((won: boolean, stars: number) => {
    setGameOver(true);
    setGameWon(won);
    setFinalStars(stars);

    if (won) {
      const coinReward = 50 + stars * 10;
      addCoins(coinReward);
      completeLevel(levelId, stars);
      successNotification();
      setTimeout(() => router.push(`/result/win?levelId=${levelId}&stars=${stars}&score=${score}&coins=${coinReward}`), 600);
    } else {
      errorNotification();
      setTimeout(() => router.push(`/result/lose?levelId=${levelId}`), 600);
    }
  }, [levelId, score, addCoins, completeLevel]);

  const handleCombo = useCallback((count: number) => {
    if (count >= 2) mediumImpact();
  }, []);

  const progress = level.targetScore > 0 ? Math.min(score / level.targetScore, 1) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.hud}>
        <View style={styles.hudRow}>
          <Text style={styles.hudLabel}>Level {levelId}</Text>
          <TouchableOpacity onPress={() => setPaused(true)} style={styles.pauseBtn}>
            <Text style={styles.pauseText}>⏸</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.hudRow}>
          <View style={styles.hudItem}>
            <Text style={styles.hudValue}>{score}</Text>
            <Text style={styles.hudLabel}>Score</Text>
          </View>
          <View style={styles.hudItem}>
            <Text style={[styles.hudValue, movesLeft <= 3 && { color: '#FF4444' }]}>
              {movesLeft}
            </Text>
            <Text style={styles.hudLabel}>Moves</Text>
          </View>
        </View>
        <ProgressBar progress={score} maxProgress={level.targetScore} color="#FF6B9D" showLabel />
      </View>

      <View style={styles.canvasContainer}>
        <GameCanvas
          levelId={levelId}
          levelGoal={level.goal}
          targetScore={level.targetScore}
          moves={level.moves}
          candyTypes={level.candyTypes}
          onScoreChange={handleScoreChange}
          onMovesChange={handleMovesChange}
          onGameOver={handleGameOver}
          onCombo={handleCombo}
        />
      </View>

      {paused && (
        <View style={styles.pauseOverlay}>
          <View style={styles.pauseMenu}>
            <Text style={styles.pauseTitle}>Paused</Text>
            <TouchableOpacity style={styles.pauseButton} onPress={() => setPaused(false)}>
              <Text style={styles.pauseButtonText}>Resume</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.pauseButton, styles.pauseButtonOutline]} onPress={() => router.replace(`/play/${id}`)}>
              <Text style={[styles.pauseButtonText, { color: '#FF6B9D' }]}>Restart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.pauseButton, styles.pauseButtonOutline]} onPress={() => router.back()}>
              <Text style={[styles.pauseButtonText, { color: '#888' }]}>Quit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5E6' },
  errorText: { fontSize: 18, textAlign: 'center', marginTop: 100, color: '#888', fontFamily: fonts.body },
  hud: { paddingHorizontal: 16, paddingTop: 50, paddingBottom: 8 },
  hudRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  hudItem: { alignItems: 'center' },
  hudValue: { fontSize: 24, fontWeight: '800', color: '#2D2D2D', fontFamily: fonts.heading },
  hudLabel: { fontSize: 12, color: '#888', fontWeight: '600', marginTop: 2, fontFamily: fonts.body },
  pauseBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFE8D0', alignItems: 'center', justifyContent: 'center' },
  pauseText: { fontSize: 18 },
  canvasContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', fontFamily: fonts.heading },
  pauseOverlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  pauseMenu: { backgroundColor: '#FFF', borderRadius: 16, padding: 24, width: 240, alignItems: 'center' },
  pauseTitle: { fontSize: 22, fontWeight: '800', color: '#2D2D2D', marginBottom: 20, fontFamily: fonts.heading },
  pauseButton: { backgroundColor: '#FF6B9D', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 10, marginBottom: 8, width: '100%', alignItems: 'center' },
  pauseButtonOutline: { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#FFE8D0' },
  pauseButtonText: { color: '#FFF', fontWeight: '700', fontSize: 16, fontFamily: fonts.body },
});

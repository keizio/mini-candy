import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import CandyButton from '../src/components/CandyButton';
import Badge from '../src/components/Badge';
import { fonts } from '../src/utils/typography';

const BENEFITS = [
  '✨ No ads - play without interruptions',
  '❤️ Unlimited lives - never wait',
  '⭐ 5x daily bonus coins',
  '🎨 Exclusive candy skins',
  '📦 +1 booster slot',
];

const PLANS = [
  {
    id: 'monthly', title: 'Monthly', price: '$4.99', period: '/month',
    trial: '3-day free trial', badge: 'Trial',
  },
  {
    id: 'yearly', title: 'Yearly', price: '$29.99', period: '/year',
    trial: 'Save 50%', badge: 'SAVE 50%',
  },
  {
    id: 'lifetime', title: 'Lifetime', price: '$9.99', period: ' one-time',
    trial: 'All levels + premium', badge: 'Best Value',
  },
];

export default function PaywallScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <Text style={styles.emoji}>👑</Text>
      <Text style={styles.title}>Go Premium!</Text>
      <Text style={styles.subtitle}>Unlock the full Mini Candy experience</Text>

      <View style={styles.benefitsContainer}>
        {BENEFITS.map((b, i) => (
          <View key={i} style={styles.benefitRow}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.benefitText}>{b}</Text>
          </View>
        ))}
      </View>

      {PLANS.map((plan) => (
        <TouchableOpacity key={plan.id} style={styles.planCard}>
          <View style={styles.planHeader}>
            <Text style={styles.planTitle}>{plan.title}</Text>
            {plan.badge && <Badge text={plan.badge} variant={plan.id === 'lifetime' ? 'sale' : 'premium'} />}
          </View>
          <View style={styles.planPricing}>
            <Text style={styles.planPrice}>{plan.price}</Text>
            <Text style={styles.planPeriod}>{plan.period}</Text>
          </View>
          <Text style={styles.planTrial}>{plan.trial}</Text>
        </TouchableOpacity>
      ))}

      <CandyButton title="Start Free Trial" onPress={() => {}} size="lg" style={{ width: '100%' }} />
      <TouchableOpacity style={styles.restoreBtn}>
        <Text style={styles.restoreText}>Restore Purchases</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5E6' },
  content: { padding: 24, paddingTop: 60, alignItems: 'center' },
  closeBtn: { alignSelf: 'flex-end', width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFE8D0', alignItems: 'center', justifyContent: 'center' },
  closeText: { fontSize: 16, color: '#888', fontWeight: '700', fontFamily: fonts.body },
  emoji: { fontSize: 56, marginBottom: 8 },
  title: { fontSize: 32, fontWeight: '900', color: '#9B59B6', marginBottom: 4, fontFamily: fonts.heading },
  subtitle: { fontSize: 15, color: '#888', marginBottom: 24, textAlign: 'center', fontFamily: fonts.body },
  benefitsContainer: { width: '100%', marginBottom: 24, backgroundColor: '#FFF', borderRadius: 12, padding: 16 },
  benefitRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  checkmark: { fontSize: 16, color: '#44CC44', fontWeight: '700', marginRight: 10, width: 20 },
  benefitText: { fontSize: 14, color: '#2D2D2D', flex: 1, fontFamily: fonts.body },
  planCard: { width: '100%', backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#FFE8D0' },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  planTitle: { fontSize: 16, fontWeight: '700', color: '#2D2D2D', fontFamily: fonts.heading },
  planPricing: { flexDirection: 'row', alignItems: 'baseline', gap: 2 },
  planPrice: { fontSize: 24, fontWeight: '800', color: '#FF6B9D', fontFamily: fonts.heading },
  planPeriod: { fontSize: 13, color: '#888', fontFamily: fonts.body },
  planTrial: { fontSize: 12, color: '#44CC44', fontWeight: '600', marginTop: 4, fontFamily: fonts.body },
  restoreBtn: { paddingVertical: 14, alignItems: 'center' },
  restoreText: { fontSize: 13, color: '#888', textDecorationLine: 'underline', fontFamily: fonts.body },
});

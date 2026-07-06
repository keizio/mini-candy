import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Toast from '../src/components/Toast';
import { fonts } from '../src/utils/typography';

export default function SettingsScreen() {
  const [musicVolume, setMusicVolume] = useState(0.7);
  const [sfxVolume, setSfxVolume] = useState(0.8);
  const [vibration, setVibration] = useState(true);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' as 'success' | 'error' | 'info' });

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ visible: true, message, type });
  };

  const handleRestore = () => {
    showToast('Purchases restored!', 'success');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Audio</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Music</Text>
          <View style={styles.sliderRow}>
            {[0, 0.25, 0.5, 0.75, 1].map((v) => (
              <TouchableOpacity
                key={v}
                style={[styles.sliderDot, musicVolume >= v && styles.sliderDotActive]}
                onPress={() => setMusicVolume(v)}
              />
            ))}
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>SFX</Text>
          <View style={styles.sliderRow}>
            {[0, 0.25, 0.5, 0.75, 1].map((v) => (
              <TouchableOpacity
                key={v}
                style={[styles.sliderDot, sfxVolume >= v && styles.sliderDotActive]}
                onPress={() => setSfxVolume(v)}
              />
            ))}
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Vibration</Text>
          <TouchableOpacity
            style={[styles.toggle, vibration && styles.toggleActive]}
            onPress={() => setVibration(!vibration)}
          >
            <View style={[styles.toggleKnob, vibration && styles.toggleKnobActive]} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.actionRow} onPress={handleRestore}>
          <Text style={styles.actionText}>Restore Purchases</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Links</Text>
        <TouchableOpacity style={styles.actionRow}>
          <Text style={styles.actionText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionRow}>
          <Text style={styles.actionText}>Terms of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionRow}>
          <Text style={styles.actionText}>Contact Support</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.version}>Mini Candy v1.0.0</Text>

      <Toast
        message={toast.message}
        visible={toast.visible}
        type={toast.type}
        onHide={() => setToast({ ...toast, visible: false })}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5E6' },
  content: { padding: 20, paddingTop: 60 },
  header: { marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '900', color: '#2D2D2D', fontFamily: fonts.heading },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, fontFamily: fonts.heading },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF', padding: 14, borderRadius: 10, marginBottom: 6 },
  label: { fontSize: 15, fontWeight: '600', color: '#2D2D2D', fontFamily: fonts.body },
  sliderRow: { flexDirection: 'row', gap: 8 },
  sliderDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#FFE8D0' },
  sliderDotActive: { backgroundColor: '#FF6B9D' },
  toggle: { width: 44, height: 24, borderRadius: 12, backgroundColor: '#DDD', justifyContent: 'center', padding: 2 },
  toggleActive: { backgroundColor: '#44CC44' },
  toggleKnob: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#FFF' },
  toggleKnobActive: { alignSelf: 'flex-end' },
  actionRow: { backgroundColor: '#FFF', padding: 14, borderRadius: 10, marginBottom: 6 },
  actionText: { fontSize: 15, fontWeight: '600', color: '#2D2D2D', fontFamily: fonts.body },
  version: { textAlign: 'center', fontSize: 12, color: '#CCC', marginTop: 20, fontFamily: fonts.body },
});

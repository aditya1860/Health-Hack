import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function RoleSelect() {
  return (
    <View style={styles.container}>
      {/* 🔹 Sketch background stickers */}
      <Text style={[styles.sketch, styles.sketchTopLeft]}>🩺</Text>
      <Text style={[styles.sketch, styles.sketchTopRight]}>💉</Text>
      <Text style={[styles.sketch, styles.sketchBottomLeft]}>🌡️</Text>
      <Text style={[styles.sketch, styles.sketchBottomRight]}>🩹</Text>

      {/* 🔹 Main content */}
      <View style={styles.card}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Select your role</Text>

        <Pressable
          style={styles.btn}
          onPress={() => router.replace('/patient-login')}
        >
          <Text style={styles.btnText}>Continue as Patient</Text>
        </Pressable>

        <Pressable
          style={styles.btn}
          onPress={() => router.replace('/doctor-login')}
        >
          <Text style={styles.btnText}>Continue as Doctor</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* 🔹 Background sketch emojis */
  sketch: {
    position: 'absolute',
    fontSize: 120,
    opacity: 0.07,
  },
  sketchTopLeft: {
    top: 40,
    left: 20,
  },
  sketchTopRight: {
    top: 60,
    right: 20,
  },
  sketchBottomLeft: {
    bottom: 80,
    left: 30,
  },
  sketchBottomRight: {
    bottom: 60,
    right: 30,
  },

  /* 🔹 Card */
  card: {
    width: '85%',
    maxWidth: 360,
    backgroundColor: '#ffffff',
    padding: 28,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 28,
  },

  btn: {
    backgroundColor: '#dc2626', // medical red
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 14,
  },

  btnText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

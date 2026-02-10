import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from 'react-native';
import { router } from 'expo-router';
import { findUserByPhone, setSession } from '../../utils/storage';
import CommonBackButton from 'components/CommonBackButton';

const OTP = '1234';

export default function DoctorLogin() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  // ✅ SEND OTP
  const sendOtp = () => {
    if (phone.length !== 10) {
      Platform.OS === 'web'
        ? window.alert('Enter valid mobile number')
        : Alert.alert('Enter valid mobile number');
      return;
    }

    const message = 'Your OTP is 1234 (demo purpose)';
    Platform.OS === 'web'
      ? window.alert(message)
      : Alert.alert('OTP Sent', message);

    setStep(2);
  };

  // ✅ VERIFY OTP
  const verifyOtp = async () => {
    if (otp !== OTP) {
      Alert.alert('Invalid OTP');
      return;
    }

    const user = await findUserByPhone(phone, 'doctor');

    if (!user) {
      Alert.alert(
        'Account not found',
        'No doctor account exists with this number.',
        [
          {
            text: 'Create Account',
            onPress: () => router.replace('/doctor-signup'),
          },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
      return;
    }

    Keyboard.dismiss();
    await setSession({ ...user, role: 'doctor' });
    router.replace('/');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <CommonBackButton fallbackRoute="/role-select" />
        {/* 🔴 Background blobs */}
        <View style={styles.blobTopLeft} />
        <View style={styles.blobBottomRight} />

        <View style={styles.card}>
          <Text style={styles.title}>Doctor Login</Text>
          <Text style={styles.subtitle}>
            We’ll send a one-time password to your phone
          </Text>

          {step === 1 && (
            <>
              <TextInput
                placeholder="+91 Mobile Number"
                keyboardType="number-pad"
                placeholderTextColor="#9CA3AF"
                value={phone}
                onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, ''))}
                style={styles.input}
              />
              <Pressable style={styles.btn} onPress={sendOtp}>
                <Text style={styles.btnText}>Send OTP</Text>
              </Pressable>
            </>
          )}

          {step === 2 && (
            <>
              <TextInput
                placeholder="Enter OTP"
                keyboardType="number-pad"
                placeholderTextColor="#9CA3AF"
                value={otp}
                onChangeText={setOtp}
                style={styles.input}
              />
              <Pressable style={styles.btn} onPress={verifyOtp}>
                <Text style={styles.btnText}>Verify & Login</Text>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#ffffff',
    padding: 28,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#dc2626',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  btnText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },

  /* 🔴 Background blobs */
  blobTopLeft: {
    position: 'absolute',
    width: 220,
    height: 220,
    backgroundColor: '#fecaca',
    borderRadius: 220,
    top: -90,
    left: -90,
  },
  blobBottomRight: {
    position: 'absolute',
    width: 260,
    height: 260,
    backgroundColor: '#fee2e2',
    borderRadius: 260,
    bottom: -110,
    right: -110,
  },
});

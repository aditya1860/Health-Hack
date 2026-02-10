import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { findUserByPhone, setSession } from '../../utils/storage';
import { useEmergency } from '../../context/EmergencyContext';
import {
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonBackButton from 'components/CommonBackButton';

const OTP = '1234';

export default function PatientLogin() {
  const { role, setRole, loading } = useEmergency();

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<1 | 2>(1);

  // 🔒 Guard
  useEffect(() => {
    if (loading) return;

    if (role && role !== 'patient') {
      router.replace('/role-select');
    }
  }, [role, loading]);

  // 📦 Load saved phone from local storage
  useEffect(() => {
    const loadPhone = async () => {
      const savedPhone = await AsyncStorage.getItem('patient_phone');
      if (savedPhone) setPhone(savedPhone);
    };
    loadPhone();
  }, []);

  const sendOtp = async () => {
    if (phone.length !== 10) {
      Platform.OS === 'web'
        ? window.alert('Enter valid mobile number')
        : Alert.alert('Enter valid mobile number');
      return;
    }

    // 💾 Save phone locally
    await AsyncStorage.setItem('patient_phone', phone);

    const message = 'Your OTP is 1234 (demo purpose)';
    Platform.OS === 'web'
      ? window.alert(message)
      : Alert.alert('OTP Sent', message);

    setStep(2);
  };

  const verifyOtp = async () => {
    if (otp !== OTP) {
      Alert.alert('Invalid OTP');
      return;
    }

    const user = await findUserByPhone(phone, 'patient');
    if (!user) {
      Alert.alert('Not registered', 'Please sign up first');
      return;
    }

    await setSession(user);
    await setRole('patient');
    router.replace('/');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.wrapper}>
        {/* 🔴 Background Blobs */}
        <View style={styles.blobTopLeft} />
        <View style={styles.blobBottomRight} />

        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <CommonBackButton fallbackRoute="/role-select" />
          <View style={styles.card}>
            <Text style={styles.title}>Patient Login</Text>
            <Text style={styles.subtitle}>
              We’ll send a one-time password to your phone
            </Text>

            {step === 1 && (
              <>
                <TextInput
                  placeholder="+91 Mobile Number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
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
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  value={otp}
                  onChangeText={setOtp}
                  style={styles.input}
                />
                <Pressable style={styles.btn} onPress={verifyOtp}>
                  <Text style={styles.btnText}>Verify & Login</Text>
                </Pressable>
              </>
            )}

            <Pressable onPress={() => router.replace('/patient-signup')}>
              <Text style={styles.link}>
                New user? <Text style={styles.linkBold}>Create account</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
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
  link: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
  },
  linkBold: {
    color: '#dc2626',
    fontWeight: '600',
  },

  // 🔴 Red light blobs
  blobTopLeft: {
    position: 'absolute',
    top: -120,
    left: -120,
    width: 260,
    height: 260,
    backgroundColor: '#fecaca',
    borderRadius: 200,
    opacity: 0.6,
  },
  blobBottomRight: {
    position: 'absolute',
    bottom: -140,
    right: -140,
    width: 300,
    height: 300,
    backgroundColor: '#fee2e2',
    borderRadius: 200,
    opacity: 0.7,
  },
});

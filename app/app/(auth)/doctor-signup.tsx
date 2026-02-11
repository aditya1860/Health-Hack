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
} from 'react-native';
import CommonBackButton from "../../components/CommonBackButton";
import { router } from 'expo-router';
import { addUser, setSession } from '../../utils/storage';
import { Image } from "react-native";

const OTP = '1234';

const SPECIALIZATIONS = [
  'General Physician',
  'Cardiologist',
  'Orthopedic',
  'Pediatrician',
  'Gynecologist',
  'Dentist',
  'Other',
];

const EXPERIENCE = ['0–1', '2–5', '5–10', '10+'];

export default function DoctorSignup() {
  const [isVerified, setIsVerified] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [clinic, setClinic] = useState('');

  // ✅ SEND OTP
  const sendOtp = () => {
    if (phone.length !== 10) {
      Platform.OS === 'web'
        ? window.alert('Invalid phone number')
        : Alert.alert('Invalid phone number');
      return;
    }

    const message = 'Your OTP is 1234 (demo purpose)';
    Platform.OS === 'web'
      ? window.alert(message)
      : Alert.alert('OTP Sent', message);
  };

  // ✅ VERIFY OTP
  const verifyOtp = () => {
    if (otp !== OTP) {
      Alert.alert('Invalid OTP');
      return;
    }
    setIsVerified(true);
  };

  const handleSignup = async () => {
    if (!name || !specialization || !experience) {
      Alert.alert('Fill all required fields');
      return;
    }

    const doctor = {
      role: 'doctor',
      phone,
      name,
      specialization,
      experience,
      clinic,
    };

    await addUser(doctor);
    await setSession(doctor);
    router.replace('/doctor');
  };


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
    maxWidth: 420,
    padding: 28,
    borderRadius: 18,
    backgroundColor: '#ffffff',
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
    marginBottom: 24,
  },

logo: {
  position: "absolute",
  top: 60,
  right: 20,
  width: 110,
  height: 40,
  resizeMode: "contain",
  zIndex: 10,
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
    marginTop: 10,
  },
  btnText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 14,
    color: '#111827',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#374151',
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  pill: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  pillActive: {
    backgroundColor: '#fee2e2',
    borderColor: '#dc2626',
  },
  pillText: {
    fontSize: 13,
    color: '#374151',
  },
  pillTextActive: {
    color: '#dc2626',
    fontWeight: '600',
  },

  /* 🔴 Background blobs */
  blobTopLeft: {
    position: 'absolute',
    width: 240,
    height: 240,
    backgroundColor: '#fecaca',
    borderRadius: 240,
    top: -100,
    left: -100,
  },
  blobBottomRight: {
    position: 'absolute',
    width: 280,
    height: 280,
    backgroundColor: '#fee2e2',
    borderRadius: 280,
    bottom: -120,
    right: -120,
  },
});


return (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 }}
  >
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>

      {/* 🔴 Background blobs */}
      <View style={styles.blobTopLeft} />
      <View style={styles.blobBottomRight} />

      {/* 🔴 Logo */}
      <Image
        source={require("../../assets/images/carefast-logo.png")}
        style={styles.logo}
      />

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <CommonBackButton fallbackRoute="/role-select" />

        <View style={styles.card}>
          <Text style={styles.title}>Doctor Signup</Text>

          <TextInput
            placeholder="+91 Mobile Number"
            keyboardType="number-pad"
            value={phone}
            editable={!isVerified}
            placeholderTextColor="#9CA3AF"
            onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, ''))}
            style={styles.input}
          />

          <TextInput
            placeholder="Enter OTP"
            keyboardType="number-pad"
            placeholderTextColor="#9CA3AF"
            value={otp}
            onChangeText={setOtp}
            style={styles.input}
          />

          {!isVerified && (
            <>
              <Pressable style={styles.btn} onPress={sendOtp}>
                <Text style={styles.btnText}>Send OTP</Text>
              </Pressable>
              <Pressable style={styles.btn} onPress={verifyOtp}>
                <Text style={styles.btnText}>Verify OTP</Text>
              </Pressable>
            </>
          )}

          {isVerified && (
            <>
              <View style={styles.divider} />

              <Text style={styles.sectionTitle}>Doctor Details</Text>

              <TextInput
                placeholder="Doctor Full Name"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />

              <Text style={styles.label}>Specialization</Text>
              <View style={styles.optionGrid}>
                {SPECIALIZATIONS.map((item) => (
                  <Pressable
                    key={item}
                    onPress={() => setSpecialization(item)}
                    style={[
                      styles.pill,
                      specialization === item && styles.pillActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.pillText,
                        specialization === item && styles.pillTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Text style={styles.label}>Experience</Text>
              <View style={styles.optionGrid}>
                {EXPERIENCE.map((item) => (
                  <Pressable
                    key={item}
                    onPress={() => setExperience(item)}
                    style={[
                      styles.pill,
                      experience === item && styles.pillActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.pillText,
                        experience === item && styles.pillTextActive,
                      ]}
                    >
                      {item} yrs
                    </Text>
                  </Pressable>
                ))}
              </View>

              <TextInput
                placeholder="Clinic / Hospital Name (optional)"
                placeholderTextColor="#9CA3AF"
                value={clinic}
                onChangeText={setClinic}
                style={styles.input}
              />

              <Pressable style={styles.btn} onPress={handleSignup}>
                <Text style={styles.btnText}>Create Account</Text>
              </Pressable>
            </>
          )}
        </View>

      </ScrollView>
    </View>
  </KeyboardAvoidingView>
);
}
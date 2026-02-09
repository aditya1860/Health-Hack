import React, { useState } from 'react';
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
import { addUser, setSession } from '../../utils/storage';
import { Keyboard , TouchableWithoutFeedback ,   KeyboardAvoidingView, ScrollView} from "react-native";

const OTP = '1234';

export default function PatientSignup() {
  const [isVerified, setIsVerified] = useState(false);

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  // ✅ SEND OTP (POPUP WORKS ON WEB + MOBILE)
  const sendOtp = () => {
    if (phone.length !== 10) {
      if (Platform.OS === 'web') {
        window.alert('Invalid phone number');
      } else {
        Alert.alert('Invalid phone number');
      }
      return;
    }

    const message = 'Your OTP is 1234 (demo purpose)';

    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert('OTP Sent', message);
    }
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
    if (!name || !age || !gender) {
      Alert.alert('Please fill all details');
      return;
    }

    const patient = {
      role: 'patient',
      phone,
      name,
      age,
      gender,
    };

    await addUser(patient);
    await setSession(patient);

    router.replace('/patient');
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
});


return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>Patient Signup</Text>

          {/* Phone + OTP */}
          <TextInput
            placeholder="+91 Mobile Number"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            value={phone}
            editable={!isVerified}
            onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, ""))}
            style={styles.input}
          />

          <TextInput
            placeholder="Enter OTP"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
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

          {/* 👇 PATIENT DETAILS */}
          {isVerified && (
            <>
              <View style={styles.divider} />

              <Text style={styles.sectionTitle}>Personal Details</Text>

              <TextInput
                placeholder="Full Name (e.g. Ram Kumar)"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />

              <TextInput
                placeholder="Age"
                placeholderTextColor="#9CA3AF"
                keyboardType="number-pad"
                value={age}
                onChangeText={setAge}
                style={styles.input}
              />

              <Text style={styles.label}>Gender</Text>
              <View style={styles.optionGrid}>
                {["Male", "Female", "Other", "Prefer not to say"].map(
                  (g) => (
                    <Pressable
                      key={g}
                      onPress={() => setGender(g)}
                      style={[
                        styles.pill,
                        gender === g && styles.pillActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.pillText,
                          gender === g && styles.pillTextActive,
                        ]}
                      >
                        {g}
                      </Text>
                    </Pressable>
                  )
                )}
              </View>

              <Pressable style={styles.btn} onPress={handleSignup}>
                <Text style={styles.btnText}>Create Account</Text>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
);
}
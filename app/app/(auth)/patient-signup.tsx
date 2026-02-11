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
import { router } from 'expo-router';
import { addUser, setSession } from '../../utils/storage';
import CommonBackButton from 'components/CommonBackButton';

const OTP = '1234';

export default function PatientSignup() {
  const [isVerified, setIsVerified] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [selectedVitals, setSelectedVitals] = useState<string[]>([]);


  const toggleVital = (vital: string) => {
  setSelectedVitals((prev) =>
    prev.includes(vital)
      ? prev.filter((v) => v !== vital)
      : [...prev, vital]
  );
};


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

    if (selectedVitals.length === 0) {
  Alert.alert("Select at least one vital");
  return;
}


const patient = {
  role: 'patient',
  phone,
  name,
  age,
  gender,
  monitoredVitals: selectedVitals,
};

    await addUser(patient);
    await setSession(patient);
    router.replace('/patient');
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
          <Text style={styles.title}>Patient Signup</Text>

          <TextInput
            placeholder="+91 Mobile Number"
            keyboardType="number-pad"
            placeholderTextColor="#9ca3af"
            value={phone}
            editable={!isVerified}
            onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, ''))}
            style={styles.input}
          />

          <TextInput
            placeholder="Enter OTP"
            keyboardType="number-pad"
            placeholderTextColor="#9ca3af"
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

              <Text style={styles.sectionTitle}>Vitals You Monitor</Text>

<View style={styles.optionGrid}>
  {[
    "Blood Pressure",
    "Heart Rate",
    "Blood Sugar",
    "Oxygen",
  ].map((vital) => (
    <Pressable
      key={vital}
      onPress={() => toggleVital(vital)}
      style={[
        styles.pill,
        selectedVitals.includes(vital) &&
          styles.pillActive,
      ]}
    >
      <Text
        style={[
          styles.pillText,
          selectedVitals.includes(vital) &&
            styles.pillTextActive,
        ]}
      >
        {vital}
      </Text>
    </Pressable>
  ))}
</View>


              <Text style={styles.sectionTitle}>Personal Details</Text>

              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#9ca3af"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />

              <TextInput
                placeholder="Age"
                placeholderTextColor="#9ca3af"
                keyboardType="number-pad"
                value={age}
                onChangeText={setAge}
                style={styles.input}
              />

              <Text style={styles.label}>Gender</Text>
              <View style={styles.optionGrid}>
                {['Male', 'Female', 'Other', 'Prefer not to say'].map((g) => (
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
                ))}
              </View>

              <Pressable style={styles.btn} onPress={handleSignup}>
                <Text style={styles.btnText}>Create Account</Text>
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

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
import { findUserByPhone, setSession } from '../../utils/storage';
import { useEmergency } from "../context/EmergencyContext";
import { Keyboard , TouchableWithoutFeedback ,   KeyboardAvoidingView, ScrollView} from "react-native";


const OTP = '1234';



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
  link: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
  },
  linkBold: {
    color: '#dc2626',
    fontWeight: '600',
  },
});


export default function DoctorLogin() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<1 | 2>(1);


  // ✅ SEND OTP (POPUP WORKS ON WEB + MOBILE)
  const sendOtp = () => {
    if (step !== 1) return;
    if (phone.length !== 10) {
      if (Platform.OS === 'web') {
        window.alert('Enter valid mobile number');
      } else {
        Alert.alert('Enter valid mobile number');
      }
      return;
    }

    const message = 'Your OTP is 1234 (demo purpose)';

    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert('OTP Sent', message);
    }

    setStep(2);
  };

  // ✅ VERIFY OTP
const verifyOtp = async () => {
  try {
    if (otp !== OTP) {
      Alert.alert("Invalid OTP");
      return;
    }

    const user = await findUserByPhone(phone, "doctor");

if (!user) {
  Alert.alert(
    "Account not found",
    "No doctor account exists with this number. Please create one.",
    [
      {
        text: "Create Account",
        onPress: () => {
          setStep(1);
          setOtp("");
          router.replace("/doctor-signup");
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]
  );
  return;
}
    
    const sessionUser = {
      ...user,
      role: "doctor",
    };
    
Keyboard.dismiss();

    await setSession(sessionUser);

    router.replace("/doctor");
  } catch (error) {
    Alert.alert("Login failed", "Please try again");
    console.error(error);
  }
};

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
          <Text style={styles.title}>Doctor Login</Text>
          <Text style={styles.subtitle}>
            We’ll send a one-time password to your phone
          </Text>

          {step === 1 && (
            <>
              <TextInput
                placeholder="+91 Mobile Number"
                keyboardType="number-pad"
                value={phone}
                onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, ""))}
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
  </TouchableWithoutFeedback>
);
}
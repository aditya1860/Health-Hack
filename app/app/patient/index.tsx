import { View, Text, Pressable } from 'react-native';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { getSession, logout } from '../../utils/storage';

export default function PatientDashboard() {
  useEffect(() => {
    const check = async () => {
      const user = await getSession();
      if (!user || user.role !== 'patient') {
        router.replace('/patient-login');
      }
    };
    check();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace('/role-select');
  };

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize:24, marginBottom:20 }}>
        Patient Dashboard
      </Text>

      <Pressable
        onPress={handleLogout}
        style={{
          backgroundColor:'#dc2626',
          paddingVertical:14,
          paddingHorizontal:30,
          borderRadius:10,
        }}
      >
        <Text style={{ color:'#fff', fontWeight:'600' }}>
          Logout
        </Text>
      </Pressable>
    </View>
  );
}

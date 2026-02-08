// import { View, Text } from 'react-native';
// import { useEffect } from 'react';
// import { router, type Href } from 'expo-router';
// import { useEmergency } from '../context/EmergencyContext';

// export default function Index() {
//   const { role, emergencyActive } = useEmergency();

//   useEffect(() => {
//     if (emergencyActive) {
//       router.replace('/emergency' as Href);
//     } else if (!role) {
//       router.replace('/(auth)/role-select' as Href);
//     } else if (role === 'doctor') {
//       router.replace('/doctor' as Href);
//     } else {
//       router.replace('/patient' as Href);
//     }
//   }, [role, emergencyActive]);

//   // 👇 IMPORTANT: fallback UI
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Loading CAREFAST...</Text>
//     </View>
//   );
// }

import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { router, useRootNavigationState } from 'expo-router';

export default function Index() {
  const rootNavigationState = useRootNavigationState();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (rootNavigationState?.key) {
      setReady(true);
    }
  }, [rootNavigationState]);

  useEffect(() => {
    if (!ready) return;

    // AUTH-FIRST (we'll add EmergencyContext later)
    router.replace('/role-select');
  }, [ready]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Booting CAREFAST…</Text>
    </View>
  );
}


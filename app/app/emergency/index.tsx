import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useEmergency } from "../../context/EmergencyContext";

export default function EmergencyScreen() {
  const { stopEmergency } = useEmergency();

  const [startedAt] = useState(Date.now());
  const [location, setLocation] =
    useState<Location.LocationObject | null>(null);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Location access is mandatory during emergency"
        );
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 3000,
          distanceInterval: 5,
        },
        (loc) => setLocation(loc)
      );
    })();

    return () => {
      subscription?.remove();
    };
  }, []);

  const cancelEmergency = () => {
    Alert.alert(
      "Cancel Emergency?",
      "Are you sure you want to stop Emergency Mode?",
      [
        { text: "No" },
        {
          text: "Yes",
          style: "destructive",
          onPress: stopEmergency,
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EMERGENCY ACTIVE</Text>

      <Text style={styles.timer}>
        Active since {new Date(startedAt).toLocaleTimeString()}
      </Text>

      {location && (
        <Text style={styles.location}>
          Lat: {location.coords.latitude.toFixed(5)}{"\n"}
          Lng: {location.coords.longitude.toFixed(5)}
        </Text>
      )}

      <View style={styles.actions}>
        <Pressable style={styles.actionBtn}>
          <Text style={styles.actionText}>Call Emergency Contact</Text>
        </Pressable>

        <Pressable style={styles.actionBtn}>
          <Text style={styles.actionText}>Call Ambulance</Text>
        </Pressable>

        <Pressable style={styles.cancelBtn} onPress={cancelEmergency}>
          <Text style={styles.cancelText}>Resolve Emergency</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffdede',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 16,
  },
  timer: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  location: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    marginTop: 16,
    alignItems: 'center',
  },
  actionBtn: {
    backgroundColor: '#1976d2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
    width: 220,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelBtn: {
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
    width: 220,
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});


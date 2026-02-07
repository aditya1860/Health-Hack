import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useRouter } from "expo-router";

export default function EmergencyScreen() {
  const router = useRouter();

  const [startedAt] = useState(Date.now());
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    let subscription: Location.LocationSubscription;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Location access is mandatory");
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 3000,
          distanceInterval: 5,
        },
        (loc) => {
          setLocation(loc);
        }
      );
    })();

    return () => {
      if (subscription) subscription.remove();
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
          onPress: () => router.replace("/"),
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
          <Text style={styles.cancelText}>Cancel Emergency</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B00020",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
  },
  timer: {
    color: "#fff",
    marginBottom: 20,
  },
  location: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  actions: {
    width: "100%",
  },
  actionBtn: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  actionText: {
    textAlign: "center",
    fontWeight: "600",
  },
  cancelBtn: {
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  cancelText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
});

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import Header from "./components/Header";
import StatusCard from "./components/StatusCard";
import EmergencyCard from "./components/EmergencyCard";
import { useEmergency } from "../../context/EmergencyContext";
import { getSession, logout } from "../../utils/storage";

export default function PatientDashboard() {
  const router = useRouter();

  const { role, loading: roleLoading, setRole } =
    useEmergency();

  const [loading, setLoading] = useState(true);

  /* SESSION CHECK */
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      if (roleLoading) return;


      if (!isMounted) return;
      setLoading(false);
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [roleLoading]);

  /* LOGOUT */
  const handleLogout = async () => {
    await logout();
    await setRole(null);
    router.replace("/role-select");
  };

  if (loading || roleLoading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>

      <Header />

      <View style={styles.mainRow}>

        {/* LEFT EMERGENCY */}
        <EmergencyCard />

        {/* RIGHT CONTENT */}
        <View style={{ flex: 1, marginLeft: 20 }}>

          <Text style={styles.welcome}>
            Welcome to Your Health Dashboard
          </Text>

          <Text style={styles.sub}>
            Monitor your health, track risks and get help
          </Text>

          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1588776814546-ec7e9b9d55d7",
            }}
            style={styles.banner}
          />

          {/* BUTTONS */}
          <View style={styles.btnRow}>

            <TouchableOpacity
              style={styles.blueBtn}
              onPress={() =>
                router.push("/patient/checkin")
              }
            >
              <Text style={styles.btnText}>
                Start Health Check
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.redBtn}
              onPress={() =>
                router.push("/emergency")
              }
            >
              <Text style={styles.btnText}>
                Emergency Help
              </Text>
            </TouchableOpacity>

          </View>

          {/* STATUS ROW */}
          <View style={styles.cardRow}>

            <StatusCard
              title="Today's Status"
              value="Low Risk"
              sub="Last checked: Today"
            />

            <StatusCard
              title="Medicine Adherence"
              value="7 Day Streak"
              sub="Keep it up!"
            />

            <StatusCard
              title="Emergency Contacts"
              value="3 Contacts"
              sub="Ready to alert"
            />

          </View>

        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  mainRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  welcome: {
    fontSize: 20,
    fontWeight: "bold",
  },

  sub: {
    color: "#6B7280",
    marginBottom: 10,
  },

  banner: {
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
  },

  btnRow: {
    flexDirection: "row",
    marginBottom: 16,
  },

  blueBtn: {
    flex: 1,
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 10,
    marginRight: 10,
  },

  redBtn: {
    flex: 1,
    backgroundColor: "#EF4444",
    padding: 14,
    borderRadius: 10,
  },

  btnText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "600",
  },

  cardRow: {
    flexDirection: "row",
  },
});

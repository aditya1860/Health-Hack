import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
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
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const { role, loading: roleLoading, setRole } =
    useEmergency();

  const [loading, setLoading] = useState(true);

  /* SESSION CHECK */
  useEffect(() => {
    const init = async () => {
      if (roleLoading) return;


      if (!isMounted) return;
      setLoading(false);
    };
    init();
  }, []);

  if (loading || roleLoading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      <Header />

      {/* MOBILE → Emergency on top */}
      {isMobile && <EmergencyCard />}

      <View
        style={[
          styles.mainRow,
          isMobile && { flexDirection: "column" },
        ]}
      >

        {/* WEB → Emergency left */}
        {!isMobile && <EmergencyCard />}

        {/* CONTENT */}
        <View
          style={[
            styles.content,
            isMobile && { marginLeft: 0 },
          ]}
        >

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
          <View
            style={[
              styles.btnRow,
              isMobile && { flexDirection: "column" },
            ]}
          >

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
              style={[
                styles.redBtn,
                isMobile && { marginTop: 10 },
              ]}
              onPress={() =>
                router.push("/emergency")
              }
            >
              <Text style={styles.btnText}>
                Emergency Help
              </Text>
            </TouchableOpacity>

          </View>
 
          {/* STATUS CARDS */}
          <View
            style={[
              styles.cardRow,
              isMobile && { flexDirection: "column" },
            ]}
          >

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
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 16,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  mainRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  content: {
    flex: 1,
    marginLeft: 20,
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
    alignItems: "center",
  },

  redBtn: {
    flex: 1,
    backgroundColor: "#EF4444",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#FFF",
    fontWeight: "600",
  },

  cardRow: {
    flexDirection: "row",
    gap: 12,
  },
});

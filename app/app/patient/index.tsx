
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

export default function PatientDashboard() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  /* BREAKPOINTS */
  const isTablet = width >= 768;
  const isLargeTablet = width >= 1024;

  const { role, loading: roleLoading } = useEmergency();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roleLoading) setLoading(false);
  }, [roleLoading]);

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

      {/* MAIN WRAPPER */}
      <View
        style={[
          styles.wrapper,
          isTablet && styles.wrapperTablet,
        ]}
      >
        {/* Emergency Card → Top on mobile */}
        <EmergencyCard />

        {/* CONTENT */}
        <View style={styles.content}>
          <Text style={styles.welcome}>
            Welcome to Your Health Dashboard
          </Text>

          <Text style={styles.sub}>
            Monitor your health, track risks and get help
          </Text>

          {/* RESPONSIVE BANNER */}
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1588776814546-ec7e9b9d55d7",
            }}
            style={[
              styles.banner,
              { height: width * 0.4 },
            ]}
          />

          {/* BUTTONS */}
          <View
            style={[
              styles.btnContainer,
              isTablet && styles.btnRowTablet,
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

          {/* STATUS CARDS */}
          <View
            style={[
              styles.cardContainer,
              isTablet && styles.cardRowTablet,
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
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  /* WRAPPER */
  wrapper: {
    padding: 16,
  },

  wrapperTablet: {
    maxWidth: 900,
    alignSelf: "center",
    width: "100%",
  },

  /* CONTENT */
  content: {
    marginTop: 16,
  },

  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },

  sub: {
    color: "#6B7280",
    marginBottom: 12,
  },

  /* BANNER */
  banner: {
    width: "100%",
    borderRadius: 14,
    marginBottom: 16,
  },

  /* BUTTONS */
  btnContainer: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 20,
  },

  btnRowTablet: {
    flexDirection: "row",
  },

  blueBtn: {
    flex: 1,
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  redBtn: {
    flex: 1,
    backgroundColor: "#EF4444",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  btnText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 15,
  },

  /* CARDS */
  cardContainer: {
    flexDirection: "column",
    gap: 12,
  },

  cardRowTablet: {
    flexDirection: "row",
  },
});

import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#2563EB",

        /* ---------- LOGO TOP RIGHT ---------- */
        headerRight: () => (
          <Image
            source={require("../../assets/images/carefast-logo.png")}
            style={{
              width: 36,
              height: 36,
              marginRight: 12,
              resizeMode: "contain",
            }}
          />
        ),
      }}
    >
      {/* HOME */}
      <Drawer.Screen
        name="index"
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* CHECKIN */}
      <Drawer.Screen
        name="checkin"
        options={{
          title: "Checkin",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="medkit"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* ALERTS */}
      <Drawer.Screen
        name="alerts"
        options={{
          title: "Alerts",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="alert-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* PROFILE */}
      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="person"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer>
  );
}

import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

export default function Layout() {
  return (

    
    <Drawer
      screenOptions={{
        headerShown: true,

        /* ---------- HEADER ---------- */
        headerStyle: {
          backgroundColor: "#0F172A",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "600",
        },

        

headerRight: () => (
  <Image
    source={require("../../assets/images/carefast-logo.png")}
    style={{
      width: 80,
      height: 28,
      marginRight: 16,
      resizeMode: "contain",
    }}
  />
),




        /* ---------- DRAWER ---------- */
        drawerStyle: {
          backgroundColor: "#0B1220",
          width: 260,
        },

        drawerActiveTintColor: "#2563EB",
        drawerInactiveTintColor: "#9CA3AF",

        drawerActiveBackgroundColor: "#1E293B",

        drawerLabelStyle: {
          marginLeft: -8,
          fontSize: 15,
          fontWeight: "500",
        },
      }}
    >

      <Drawer.Screen name="result" options={{ drawerItemStyle: { display: "none" } }} />
      <Drawer.Screen name="connect-doctor" options={{ drawerItemStyle: { display: "none" } }} />

      <Drawer.Screen
  name="emergency"
  options={{
    headerShown: false,
    swipeEnabled: false,   // disables swipe gesture
    drawerItemStyle: { display: "none" }, // hide from drawer menu
  }}
/>


      <Drawer.Screen
        name="index"
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      

      <Drawer.Screen
        name="checkin"
        options={{
          title: "Checkin",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="medkit-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="alerts"
        options={{
          title: "Alerts",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="alert-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

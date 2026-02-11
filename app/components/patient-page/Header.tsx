import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { logout } from "../../utils/storage";

export default function Header() {
  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Patient Dashboard</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },

  logout: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "600",
  },
});
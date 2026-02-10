import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { logout } from "../utils/storage";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AppHeader({ title, subtitle }: AppHeaderProps) {
  const handleLogout = async () => {
    await logout();
    router.replace("/role-select");
  };

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },

  logout: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "600",
  },
});

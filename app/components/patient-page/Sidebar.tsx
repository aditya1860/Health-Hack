import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const NavItem = ({ label, path }: any) => {
    const active = pathname === path;

    return (
      <TouchableOpacity
        style={[styles.item, active && styles.activeItem]}
        onPress={() => router.push(path)}
      >
        <Text style={active && styles.activeText}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.sidebar}>
      <Text style={styles.logo}>CareFast</Text>

      <NavItem label="Home" path="/patient" />
      <NavItem label="Health Check" path="/patient/checkin" />
      <NavItem label="Alerts" path="/patient/alerts" />
      <NavItem label="Profile" path="/patient/profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 220,
    backgroundColor: "#F9FAFB",
    padding: 20,
    borderRightWidth: 1,
    borderColor: "#E5E7EB",
  },

  logo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },

  item: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  activeItem: {
    backgroundColor: "#111827",
  },

  activeText: {
    color: "#FFFFFF",
  },
});

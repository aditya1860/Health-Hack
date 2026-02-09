import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router";
import Sidebar from "./components/Sidebar";

export default function Layout() {
  return (
    <View style={styles.container}>
      <Sidebar />

      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },

  content: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },
});

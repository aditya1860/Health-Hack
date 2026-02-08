import { View, Text, StyleSheet } from "react-native";

export default function EmergencyTimeline({ emergencies }: any) {
  if (!emergencies.length) {
    return <Text style={styles.none}>No emergencies</Text>;
  }

  return (
    <View>
      {emergencies.map((e: any) => (
        <View key={e.id} style={styles.item}>
          <Text style={styles.date}>{e.date}</Text>
          <Text>{e.reason}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderLeftWidth: 3,
    borderLeftColor: "#DC2626",
    paddingLeft: 10,
    marginTop: 6
  },
  date: {
    fontWeight: "bold",
    color: "#DC2626"
  },
  none: {
    fontStyle: "italic",
    color: "#6B7280"
  }
});

import { View, Text, StyleSheet } from "react-native";

type Props = {
  risk: "LOW" | "MEDIUM" | "HIGH";
};

export default function RiskBadge({ risk }: Props) {
  const color =
    risk === "HIGH"
      ? "#DC2626"
      : risk === "MEDIUM"
      ? "#F59E0B"
      : "#16A34A";

  return (
    <View style={[styles.badge, { borderColor: color }]}>
      <Text style={[styles.text, { color }]}>{risk} RISK</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 2,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 6,
    alignSelf: "flex-start"
  },
  text: {
    fontWeight: "bold",
    fontSize: 12
  }
});

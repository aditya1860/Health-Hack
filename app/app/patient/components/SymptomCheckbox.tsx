import { View, Text, StyleSheet, Pressable } from "react-native";

export default function SymptomCheckbox({
  label,
  selected,
  onPress,
}: any) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={[styles.box, selected && styles.checked]} />
      <Text>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    width: "48%",
  },

  box: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#9CA3AF",
    marginRight: 10,
    borderRadius: 4,
  },

  checked: {
    backgroundColor: "#2563EB",
  },
});

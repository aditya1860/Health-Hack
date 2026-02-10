import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";

interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  unit?: string;
  min?: number;
  max?: number;
  helperText?: string;
}

export default function NumberStepperInput({
  label,
  value,
  onChange,
  step = 1,
  unit,
  min = 0,
  max = 999,
  helperText,
}: Props) {
  const increase = () => {
    if (value + step <= max) onChange(value + step);
  };

  const decrease = () => {
    if (value - step >= min) onChange(value - step);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        <Pressable style={styles.stepBtn} onPress={decrease}>
          <Text style={styles.stepText}>−</Text>
        </Pressable>

        <View style={styles.inputWrapper}>
          <TextInput
            value={String(value)}
            keyboardType="number-pad"
            onChangeText={(t) =>
              onChange(Number(t.replace(/[^0-9]/g, "")) || 0)
            }
            style={styles.input}
          />
          {unit && <Text style={styles.unit}>{unit}</Text>}
        </View>

        <Pressable style={styles.stepBtn} onPress={increase}>
          <Text style={styles.stepText}>+</Text>
        </Pressable>
      </View>

      {helperText && (
        <Text style={styles.helper}>{helperText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepBtn: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: {
    fontSize: 22,
    fontWeight: "700",
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  unit: {
    marginLeft: 6,
    color: "#6B7280",
    fontSize: 14,
  },
  helper: {
    marginTop: 6,
    color: "#6B7280",
    fontSize: 12,
  },
});

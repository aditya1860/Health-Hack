import { View, Text, StyleSheet } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>

      {/* TITLE */}
      <Text style={styles.title}>Profile Settings</Text>
      <Text style={styles.subtitle}>
        Manage your health information and emergency contacts
      </Text>

      {/* PERSONAL INFO */}
      <Text style={styles.section}>Personal Information</Text>

      <Text style={styles.item}>
        <Text style={styles.bold}>Name:</Text> John Doe
      </Text>

      <Text style={styles.item}>
        <Text style={styles.bold}>Age:</Text> 58 years
      </Text>

      <Text style={styles.item}>
        <Text style={styles.bold}>Conditions:</Text> Type 2 Diabetes, Hypertension
      </Text>

      {/* CONTACTS */}
      <Text style={styles.section}>Emergency Contacts</Text>

      <Text style={styles.item}>
        <Text style={styles.bold}>Primary:</Text> Jane Doe (Spouse) - +91 98765 43210
      </Text>

      <Text style={styles.item}>
        <Text style={styles.bold}>Secondary:</Text> Dr. Smith (Physician) - +91 98765 43211
      </Text>

      <Text style={styles.item}>
        <Text style={styles.bold}>Tertiary:</Text> Sarah Doe (Daughter) - +91 98765 43212
      </Text>

      {/* MEDICATIONS */}
      <Text style={styles.section}>Current Medications</Text>

      <Text style={styles.item}>
        • Metformin 500mg - Twice daily
      </Text>

      <Text style={styles.item}>
        • Lisinopril 10mg - Once daily
      </Text>

      <Text style={styles.item}>
        • Aspirin 81mg - Once daily
      </Text>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },

  subtitle: {
    color: "#6B7280",
    marginBottom: 20,
  },

  section: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 10,
  },

  item: {
    marginBottom: 8,
    color: "#374151",
  },

  bold: {
    fontWeight: "600",
  },
});

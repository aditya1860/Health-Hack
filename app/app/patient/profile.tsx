import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import * as Contacts from "expo-contacts";
import { Ionicons } from "@expo/vector-icons";

import {
  getSession,
  updateSession,
} from "../../utils/storage"; // adjust path if needed

export default function Profile() {
  /* ---------------- STATE ---------------- */
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [conditions, setConditions] =
    useState("");

  const [primaryContact, setPrimaryContact] =
    useState("Not Selected");

  const [secondaryContact, setSecondaryContact] =
    useState("Not Selected");

  const [tertiaryContact, setTertiaryContact] =
    useState("Not Selected");

  const [medications, setMedications] =
    useState("");

  /* ---------------- LOAD SESSION ---------------- */
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const user = await getSession();

    if (!user) return;

    setName(user.name || "");
    setAge(user.age || "");
    setConditions(user.conditions || "");

    setPrimaryContact(
      user.primaryContact || "Not Selected"
    );
    setSecondaryContact(
      user.secondaryContact || "Not Selected"
    );
    setTertiaryContact(
      user.tertiaryContact || "Not Selected"
    );

    setMedications(user.medications || "");
  };

  /* ------------ CONTACT PICKER ------------ */
  const pickContact = async (setContact: any) => {
    const { status } =
      await Contacts.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Allow contacts access."
      );
      return;
    }

    const { data } =
      await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

    if (data.length === 0) {
      Alert.alert("No contacts found");
      return;
    }

    const contact = data[0];

    setContact(
      `${contact.name} - ${
        contact.phoneNumbers?.[0]?.number ||
        "No Number"
      }`
    );
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
    const updatedProfile = {
      name,
      age,
      conditions,
      primaryContact,
      secondaryContact,
      tertiaryContact,
      medications,
    };

    await updateSession(updatedProfile);

    Alert.alert(
      "Profile Saved",
      "Your medical profile has been updated."
    );
  };

  /* ---------------- UI ---------------- */
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerCard}>
        <Ionicons
          name="person-circle"
          size={70}
          color="#2563EB"
        />

        <Text style={styles.headerName}>
          {name || "No Name"}
        </Text>

        <Text style={styles.headerSub}>
          Patient Profile
        </Text>
      </View>

      {/* PERSONAL INFO */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Personal Information
        </Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Full Name"
        />

        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Age"
          keyboardType="numeric"
        />

        <TextInput
          style={[styles.input, { height: 80 }]}
          value={conditions}
          onChangeText={setConditions}
          placeholder="Medical Conditions"
          multiline
        />
      </View>

      {/* CONTACTS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Emergency Contacts
        </Text>

        {[
          {
            label: "Primary Contact",
            value: primaryContact,
            setter: setPrimaryContact,
          },
          {
            label: "Secondary Contact",
            value: secondaryContact,
            setter: setSecondaryContact,
          },
          {
            label: "Tertiary Contact",
            value: tertiaryContact,
            setter: setTertiaryContact,
          },
        ].map((c, i) => (
          <View key={i} style={styles.contactRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={c.value}
              onChangeText={c.setter}
              placeholder={c.label}
            />

            <TouchableOpacity
              style={styles.pickBtn}
              onPress={() =>
                pickContact(c.setter)
              }
            >
              <Ionicons
                name="call"
                size={18}
                color="#FFF"
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* MEDICATIONS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Current Medications
        </Text>

        <TextInput
          style={[styles.input, { height: 120 }]}
          value={medications}
          onChangeText={setMedications}
          multiline
          placeholder="List medications..."
        />
      </View>

      {/* SAVE BUTTON */}
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={handleSave}
      >
        <Text style={styles.saveText}>
          Save Changes
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 16,
  },

  /* HEADER */
  headerCard: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 16,
    elevation: 3,
  },

  headerName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 6,
  },

  headerSub: {
    color: "#6B7280",
  },

  /* CARD */
  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },

  /* INPUT */
  input: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  /* CONTACT ROW */
  contactRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  pickBtn: {
    backgroundColor: "#10B981",
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  /* SAVE */
  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 40,
  },

  saveText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
});

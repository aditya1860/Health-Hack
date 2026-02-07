import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useEmergencyTimeline } from "./EmergencyTimelineContext";

export default function EmergencyTimeline() {
  const { events, logEvent } = useEmergencyTimeline();

  useEffect(() => {
    logEvent("TEST", "Emergency Activated");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Timeline</Text>

      {events.length === 0 && (
        <Text style={styles.empty}>No emergency events yet</Text>
      )}

      {events.map((event) => {
        const time = new Date(event.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <View key={event.id} style={styles.event}>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.message}>{event.message}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  empty: {
    color: "#777",
  },
  event: {
    borderLeftWidth: 3,
    borderLeftColor: "#4da6ff",
    paddingLeft: 12,
    marginBottom: 16,
  },
  time: {
    fontSize: 12,
    color: "#4da6ff",
  },
  message: {
    fontSize: 16,
  },
});


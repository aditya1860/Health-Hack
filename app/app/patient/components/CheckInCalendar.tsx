import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CheckInCalendar() {
  const [checkIns, setCheckIns] = useState<string[]>([]);

  useEffect(() => {
    loadCheckIns();
  }, []);

  const loadCheckIns = async () => {
    try {
      const historyData = await AsyncStorage.getItem("CHECKIN_HISTORY");
      if (historyData) {
        const history = JSON.parse(historyData);
        // Get dates of check-ins
        const dates = history.map((item: any) => {
          const date = new Date(item.timestamp);
          return date.toISOString().split("T")[0]; // YYYY-MM-DD format
        });
        setCheckIns(dates);
      }
    } catch (error) {
      console.error("Error loading check-ins:", error);
    }
  };

  // Get last 14 days
  const getLast14Days = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 13; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      days.push(date);
    }
    
    return days;
  };

  const formatDayLabel = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
  };

  const getDateString = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const hasCheckIn = (date: Date) => {
    return checkIns.includes(getDateString(date));
  };

  const days = getLast14Days();
  const streakCount = checkIns.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>14-Day Check-In Streak</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{streakCount}/14</Text>
        </View>
      </View>

      {/* Day Labels */}
      <View style={styles.dayLabelsRow}>
        {days.map((date, index) => (
          <View key={index} style={styles.dayLabelContainer}>
            <Text style={styles.dayLabel}>{formatDayLabel(date)}</Text>
          </View>
        ))}
      </View>

      {/* Day Numbers and Status */}
      <View style={styles.daysRow}>
        {days.map((date, index) => {
          const isCheckedIn = hasCheckIn(date);
          const isToday = getDateString(date) === getDateString(new Date());
          
          return (
            <View key={index} style={styles.dayContainer}>
              <View
                style={[
                  styles.dayCircle,
                  isCheckedIn && styles.dayCircleChecked,
                  isToday && styles.dayCircleToday,
                ]}
              >
                <Text
                  style={[
                    styles.dayNumber,
                    isCheckedIn && styles.dayNumberChecked,
                    isToday && styles.dayNumberToday,
                  ]}
                >
                  {date.getDate()}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <Text style={styles.subtitle}>
        {streakCount < 14
          ? `${14 - streakCount} more to complete your streak`
          : "Streak complete! Great job! 🎉"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  badge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgeText: {
    color: "#1E40AF",
    fontWeight: "700",
    fontSize: 14,
  },

  dayLabelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  dayLabelContainer: {
    width: 24,
    alignItems: "center",
  },

  dayLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6B7280",
  },

  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  dayContainer: {
    width: 24,
    alignItems: "center",
  },

  dayCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  dayCircleChecked: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  dayCircleToday: {
    borderColor: "#2563EB",
    borderWidth: 2,
  },

  dayNumber: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9CA3AF",
  },

  dayNumberChecked: {
    color: "#FFFFFF",
  },

  dayNumberToday: {
    color: "#2563EB",
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    fontStyle: "italic",
  },
});
import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSession } from "../../utils/storage";

export default function CheckInCalendar() {
  const [checkIns, setCheckIns] = useState<string[]>([]);

  useEffect(() => {
    loadCheckIns();
  }, []);

  const loadCheckIns = async () => {
    try {
      const session = await getSession();
      if (!session?.phone) return;

      const historyKey = `CHECKIN_HISTORY_${session.phone}`;
      const historyData = await AsyncStorage.getItem(historyKey);

      if (!historyData) return;

      const history = JSON.parse(historyData);
      const dates = history.map((item: any) =>
        new Date(item.timestamp).toISOString().split("T")[0]
      );

      setCheckIns(dates);
    } catch (error) {
      console.error("Error loading check-ins:", error);
    }
  };

  /* ---------- Date helpers ---------- */

  const getDateString = (date: Date) =>
    date.toISOString().split("T")[0];

  const isToday = (date: Date) =>
    getDateString(date) === getDateString(new Date());

  const isCheckedIn = (date: Date) =>
    checkIns.includes(getDateString(date));

  const getDaysInMonth = (year: number, month: number) => {
    const days: Date[] = [];
    const date = new Date(year, month, 1);

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return days;
  };

  /* ---------- Calendar data ---------- */

  const today = new Date();
  const days = getDaysInMonth(today.getFullYear(), today.getMonth());

  const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </Text>

      {/* Weekday headers */}
      <View style={styles.weekdaysRow}>
        {weekdayLabels.map((day, index) => (
          <Text key={index} style={styles.weekday}>
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar grid */}
      <View style={styles.calendarGrid}>
        {days.map((date, index) => {
          const todayFlag = isToday(date);
          const checked = isCheckedIn(date);

          return (
            <View key={index} style={styles.dayCell}>
              <View
                style={[
                  styles.dayCircle,
                  checked && styles.checkedDay,
                  todayFlag && styles.todayDay,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    (checked || todayFlag) && styles.dayTextActive,
                  ]}
                >
                  {date.getDate()}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    elevation: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
    color: "#111827",
  },

  weekdaysRow: {
    flexDirection: "row",
    marginBottom: 8,
  },

  weekday: {
    width: "14.28%",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  dayCell: {
    width: "14.28%",
    alignItems: "center",
    marginBottom: 10,
  },

  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  checkedDay: {
    backgroundColor: "#2563EB", // blue
  },

  todayDay: {
    backgroundColor: "#16A34A", // green
  },

  dayText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },

  dayTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});

import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { useState, useRef, useEffect } from "react";
import { EMERGENCY_GUIDE, EmergencyKey } from "./emergencyGuide";

interface GuideSlidingPanelProps {
  type: EmergencyKey;
}

export default function GuideSlidingPanel({ type }: GuideSlidingPanelProps) {
  const [activeTab, setActiveTab] = useState<"do" | "dont" | "remedy">("do");
  const guide = EMERGENCY_GUIDE[type];
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "do":
        return guide.do;
      case "dont":
        return guide.dont;
      case "remedy":
        return guide.remedy || [];
      default:
        return [];
    }
  };

  const tabStyle = (tab: string) => [
    styles.tab,
    activeTab === tab && styles.activeTab,
  ];

  const tabTextStyle = (tab: string) => [
    styles.tabText,
    activeTab === tab && styles.activeTabText,
  ];

  return (
    <View style={styles.container}>
      {/* Tab Headers */}
      <View style={styles.tabs}>
        <Pressable
          style={tabStyle("do")}
          onPress={() => setActiveTab("do")}
        >
          <Text style={tabTextStyle("do")}>✓ What to Do</Text>
        </Pressable>
        
        <Pressable
          style={tabStyle("dont")}
          onPress={() => setActiveTab("dont")}
        >
          <Text style={tabTextStyle("dont")}>✕ What NOT to Do</Text>
        </Pressable>

        {guide.remedy && (
          <Pressable
            style={tabStyle("remedy")}
            onPress={() => setActiveTab("remedy")}
          >
            <Text style={tabTextStyle("remedy")}>ℹ If Help Delayed</Text>
          </Pressable>
        )}
      </View>

      {/* Content Panel */}
      <Animated.View
        style={[
          styles.panel,
          {
            opacity: slideAnim,
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        {renderContent().map((item, idx) => (
          <View key={idx} style={styles.item}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>{idx + 1}</Text>
            </View>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  activeTab: {
    backgroundColor: "#fff",
    borderBottomColor: "#d32f2f",
  },
  tabText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#757575",
  },
  activeTabText: {
    color: "#d32f2f",
    fontWeight: "700",
  },
  panel: {
    padding: 20,
    minHeight: 200,
  },
  item: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-start",
  },
  numberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#d32f2f",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
  },
  numberText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
    color: "#212121",
  },
});
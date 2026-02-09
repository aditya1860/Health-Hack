import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRef, useState, useEffect } from "react";

const { width, height } = Dimensions.get("window");

// Responsive scaling functions
const scale = (size: number) => (width / 375) * size;
const verticalScale = (size: number) => (height / 812) * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

// Check if it's a small device
const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 414;
const isLargeDevice = width >= 414;

const slides = [
  {
    title: "CAREFAST",
    subtitle:
      "Instant emergency assistance combined with daily health monitoring.",
    features: [
      { label: "Instant Response", desc: "Quick emergency alerts" },
      { label: "Live Tracking", desc: "Real-time location" },
      { label: "Health Monitor", desc: "Continuous vitals" },
    ],
  },
  {
    title: "Patients & Doctors",
    subtitle:
      "Patients get immediate help. Doctors monitor vitals remotely.",
    features: [
      { label: "Medical Network", desc: "Connected care team" },
      { label: "Real-time Data", desc: "Instant health insights" },
      { label: "Smart Alerts", desc: "Automated notifications" },
    ],
  },
  {
    title: "Emergency First Design",
    subtitle:
      "Minimal steps, fast access, built for critical moments.",
    features: [
      { label: "One-Tap SOS", desc: "Immediate assistance" },
      { label: "Secure & Private", desc: "Encrypted data" },
      { label: "24/7 Available", desc: "Always accessible" },
    ],
  },
];

const highlights = [
  "One tap emergency assistance",
  "Live location shared instantly",
  "Doctors monitor patients remotely",
  "Real-time health tracking",
  "Secure and encrypted data",
];

export default function Onboarding() {
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("onboardingDone", "true");
    router.replace("/role-select");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % highlights.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const next = () => {
    if (index < slides.length - 1) {
      const nextIndex = index + 1;
      scrollRef.current?.scrollTo({
        x: width * nextIndex,
        animated: true,
      });
      setIndex(nextIndex);
    } else {
      completeOnboarding();
    }
  };

  const onScrollEnd = (e: any) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / width);
    if (page !== index) {
      setIndex(page);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Decoration */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>CF</Text>
          </View>
          <Text style={styles.logoSubtext}>CAREFAST</Text>
        </View>
        <TouchableOpacity style={styles.skip} onPress={completeOnboarding}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <View style={styles.slidesContainer}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
          scrollEventThrottle={16}
        >
          {slides.map((item, i) => (
            <View key={i} style={styles.slide}>

              {/* Title & Subtitle */}
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>

              {/* Features List */}
              <View style={styles.featuresContainer}>
                {item.features.map((feature, idx) => (
                  <View key={idx} style={styles.featureCard}>
                    <View style={styles.featureHeader}>
                      <View style={styles.featureBullet} />
                      <Text style={styles.featureLabel}>{feature.label}</Text>
                    </View>
                    <Text style={styles.featureDesc}>{feature.desc}</Text>
                  </View>
                ))}
              </View>

              {/* Highlight Box */}
              <View style={styles.highlightBox}>
                <View style={styles.highlightIndicator} />
                <View style={styles.highlightContent}>
                  <Text style={styles.highlightLabel}>KEY FEATURE</Text>
                  <Text style={styles.highlightText}>
                    {highlights[highlightIndex]}
                  </Text>
                </View>
              </View>

              {/* Stats Row */}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>24/7</Text>
                  <Text style={styles.statLabel}>Support</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{"< 2min"}</Text>
                  <Text style={styles.statLabel}>Response</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>100%</Text>
                  <Text style={styles.statLabel}>Secure</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${((index + 1) / slides.length) * 100}%` },
            ]}
          />
        </View>

        {/* Dots and Counter */}
        <View style={styles.navigationRow}>
          <View style={styles.dots}>
            {slides.map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  scrollRef.current?.scrollTo({
                    x: width * i,
                    animated: true,
                  });
                  setIndex(i);
                }}
              >
                <View style={[styles.dot, i === index && styles.activeDot]} />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.pageCounter}>
            {index + 1} / {slides.length}
          </Text>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={next}>
          <Text style={styles.buttonText}>
            {index === slides.length - 1 ? "Get Started" : "Continue"}
          </Text>
        </TouchableOpacity>

        {/* Footer Info */}
        <Text style={styles.footerText}>
          Trusted by healthcare professionals worldwide
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  bgCircle1: {
    position: "absolute",
    top: -100,
    right: -100,
    width: scale(300),
    height: scale(300),
    borderRadius: scale(150),
    backgroundColor: "rgba(220, 38, 38, 0.05)",
  },

  bgCircle2: {
    position: "absolute",
    bottom: -150,
    left: -150,
    width: scale(400),
    height: scale(400),
    borderRadius: scale(200),
    backgroundColor: "rgba(220, 38, 38, 0.03)",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? verticalScale(50) : verticalScale(40),
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(20),
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },

  logoBadge: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(10),
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: moderateScale(14),
    fontWeight: "bold",
    letterSpacing: 0.5,
  },

  logoSubtext: {
    color: "#E5E7EB",
    fontSize: moderateScale(14),
    fontWeight: "600",
    letterSpacing: 1,
  },

  skip: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  skipText: {
    color: "#9CA3AF",
    fontSize: moderateScale(14),
    fontWeight: "500",
  },

  scrollView: {
    flexGrow: 0,
  },

  slidesContainer: {
    flex: 1,
  },

  slide: {
    width,
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(20),
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    borderRadius: scale(20),
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.2)",
    marginBottom: verticalScale(24),
  },

  statusDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: "#22C55E",
    marginRight: scale(8),
  },

  statusText: {
    color: "#22C55E",
    fontSize: moderateScale(12),
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  title: {
    fontSize: isSmallDevice ? moderateScale(26) : moderateScale(32),
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: verticalScale(12),
    textAlign: "center",
    letterSpacing: 0.5,
  },

  subtitle: {
    fontSize: moderateScale(15),
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: moderateScale(22),
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(isSmallDevice ? 24 : 32),
  },

  featuresContainer: {
    gap: verticalScale(12),
    marginBottom: verticalScale(24),
  },

  featureCard: {
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(18),
    borderRadius: scale(12),
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  featureHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(6),
  },

  featureBullet: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: "#DC2626",
    marginRight: scale(10),
  },

  featureLabel: {
    color: "#FFFFFF",
    fontSize: moderateScale(15),
    fontWeight: "600",
  },

  featureDesc: {
    color: "#9CA3AF",
    fontSize: moderateScale(13),
    marginLeft: scale(16),
  },

  highlightBox: {
    marginBottom: verticalScale(24),
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(18),
    borderRadius: scale(14),
    backgroundColor: "rgba(220, 38, 38, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(220, 38, 38, 0.2)",
    flexDirection: "row",
    alignItems: "center",
  },

  highlightIndicator: {
    width: scale(4),
    height: verticalScale(40),
    borderRadius: scale(2),
    backgroundColor: "#DC2626",
    marginRight: scale(14),
  },

  highlightContent: {
    flex: 1,
  },

  highlightLabel: {
    color: "#DC2626",
    fontSize: moderateScale(10),
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: verticalScale(4),
  },

  highlightText: {
    color: "#E5E7EB",
    fontSize: moderateScale(14),
    fontWeight: "500",
    lineHeight: moderateScale(20),
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: verticalScale(18),
    paddingHorizontal: scale(12),
    borderRadius: scale(12),
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  statItem: {
    alignItems: "center",
    flex: 1,
  },

  statValue: {
    color: "#FFFFFF",
    fontSize: isSmallDevice ? moderateScale(18) : moderateScale(20),
    fontWeight: "bold",
    marginBottom: verticalScale(4),
  },

  statLabel: {
    color: "#9CA3AF",
    fontSize: moderateScale(11),
    fontWeight: "500",
  },

  statDivider: {
    width: 1,
    height: verticalScale(30),
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  bottomSection: {
    paddingHorizontal: scale(24),
    paddingBottom: Platform.OS === "ios" ? verticalScale(40) : verticalScale(30),
    paddingTop: verticalScale(16),
  },

  progressContainer: {
    height: verticalScale(3),
    backgroundColor: "#374151",
    borderRadius: scale(2),
    marginBottom: verticalScale(16),
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#DC2626",
    borderRadius: scale(2),
  },

  navigationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(20),
  },

  dots: {
    flexDirection: "row",
    gap: scale(8),
  },

  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: "#374151",
  },

  activeDot: {
    backgroundColor: "#DC2626",
    width: scale(24),
  },

  pageCounter: {
    color: "#6B7280",
    fontSize: moderateScale(13),
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  button: {
    backgroundColor: "#DC2626",
    paddingVertical: verticalScale(16),
    borderRadius: scale(14),
    marginBottom: verticalScale(14),
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: moderateScale(16),
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  footerText: {
    color: "#6B7280",
    fontSize: moderateScale(11),
    textAlign: "center",
  },
});
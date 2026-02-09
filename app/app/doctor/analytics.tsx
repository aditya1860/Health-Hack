import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { riskDistribution, emergencyFrequencyData, overviewStats } from './mockData';

const { width } = Dimensions.get('window');

const Analytics = () => {
  const maxCount = Math.max(...riskDistribution.map((r) => r.count));
  const maxEmergency = Math.max(...emergencyFrequencyData.map((e) => e.count));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Risk Distribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Risk Distribution</Text>
        <Text style={styles.sectionSubtitle}>Current patient risk levels</Text>

        <View style={styles.chartContainer}>
          {riskDistribution.map((item, index) => (
            <View key={index} style={styles.barRow}>
              <Text style={styles.barLabel}>{item.level}</Text>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      width: `${(item.count / maxCount) * 100}%`,
                      backgroundColor: item.color,
                    },
                  ]}
                />
              </View>
              <Text style={styles.barValue}>{item.count} patients</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Emergency Frequency */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Emergency Frequency</Text>
            <Text style={styles.sectionSubtitle}>Last 30 days (Emergency Incidents)</Text>
          </View>
          <View style={styles.imageContainer}>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}></Text>
              <Text style={styles.chartLabel}>Trend Graph</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Incidents</Text>
            <Text style={styles.statValue}>{overviewStats.totalIncidents}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Avg Response Time</Text>
            <Text style={styles.statValue}>{overviewStats.avgResponseTime}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Prevention Rate</Text>
            <Text style={[styles.statValue, { color: '#10B981' }]}>
              {overviewStats.preventionRate}
            </Text>
          </View>
        </View>

        {/* Time Chart */}
        <View style={styles.timelineChart}>
          <View style={styles.chartBars}>
            {emergencyFrequencyData.map((item, index) => (
              <View key={index} style={styles.timeBarContainer}>
                <View style={styles.timeBarWrapper}>
                  <View
                    style={[
                      styles.timeBar,
                      {
                        height: `${(item.count / maxEmergency) * 100}%`,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.timeLabel}>{item.time}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  chartContainer: {
    marginTop: 20,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  barLabel: {
    width: 100,
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '500',
  },
  barContainer: {
    flex: 1,
    height: 32,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 6,
  },
  barValue: {
    width: 80,
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'right',
  },
  imageContainer: {
    width: 120,
    height: 80,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 32,
  },
  chartLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  timelineChart: {
    marginTop: 16,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  timeBarContainer: {
    flex: 1,
    alignItems: 'center',
  },
  timeBarWrapper: {
    width: '80%',
    height: 100,
    justifyContent: 'flex-end',
  },
  timeBar: {
    width: '100%',
    backgroundColor: '#3B82F6',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  timeLabel: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 4,
  },
});

export default Analytics;

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { overviewStats } from './mockData';

const OverviewCards = () => {
  const cards = [
    {
      label: 'Total Patients',
      value: overviewStats.totalPatients,
      color: '#3B82F6',
    },
    {
      label: 'Active Monitoring',
      value: overviewStats.activeMonitoring,
      color: '#10B981',
    },
    {
      label: 'Total Incidents',
      value: overviewStats.totalIncidents,
      color: '#EF4444',
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {cards.map((card, index) => (
        <View key={index} style={[styles.card, { borderColor: card.color }]}>
          <Text style={styles.value}>{card.value}</Text>
          <Text style={styles.label} numberOfLines={2}>{card.label}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default OverviewCards;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
card: {
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 16,
  marginRight: 12,
  width: 140,
  height: 110,      // ✅ add this
  borderWidth: 1,
  justifyContent: 'center',  // ✅ center vertically
},

  value: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  label: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
    flexWrap: 'wrap',        // Added to ensure text wraps
  },
});
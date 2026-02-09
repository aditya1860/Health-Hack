import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

interface EmergencyHistoryItem {
  id: string;
  date: string;
  time: string;
  patientName: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  outcome: string;
  responseTime: string;
}

const mockEmergencyHistory: EmergencyHistoryItem[] = [
  {
    id: '1',
    date: 'Feb 09, 2026',
    time: '08:45 AM',
    patientName: 'John Williams',
    type: 'Blood Pressure Spike',
    severity: 'high',
    outcome: 'Stabilized',
    responseTime: '3 min',
  },
  {
    id: '2',
    date: 'Feb 08, 2026',
    time: '02:30 PM',
    patientName: 'Sarah Johnson',
    type: 'Irregular Heartbeat',
    severity: 'high',
    outcome: 'Hospital Transfer',
    responseTime: '5 min',
  },
  {
    id: '3',
    date: 'Feb 08, 2026',
    time: '11:15 AM',
    patientName: 'Emma Davis',
    type: 'Low Blood Sugar',
    severity: 'medium',
    outcome: 'Resolved',
    responseTime: '4 min',
  },
  {
    id: '4',
    date: 'Feb 07, 2026',
    time: '09:00 AM',
    patientName: 'Michael Brown',
    type: 'Missed Medication',
    severity: 'low',
    outcome: 'Reminder Sent',
    responseTime: '2 min',
  },
  {
    id: '5',
    date: 'Feb 06, 2026',
    time: '04:20 PM',
    patientName: 'Robert Miller',
    type: 'Elevated Temperature',
    severity: 'medium',
    outcome: 'Monitoring',
    responseTime: '6 min',
  },
];

const EmergencyHistory = () => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const renderHistoryItem = ({ item }: { item: EmergencyHistoryItem }) => (
    <TouchableOpacity style={styles.historyCard}>
      <View style={styles.cardHeader}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <View
          style={[
            styles.severityBadge,
            { backgroundColor: getSeverityColor(item.severity) + '20' },
          ]}
        >
          <Text
            style={[
              styles.severityText,
              { color: getSeverityColor(item.severity) },
            ]}
          >
            {item.severity.charAt(0).toUpperCase() + item.severity.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.emergencyType}>{item.type}</Text>
        <Text style={styles.patientName}>{item.patientName}</Text>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>Outcome</Text>
          <Text style={styles.footerValue}>{item.outcome}</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>Response Time</Text>
          <Text style={[styles.footerValue, { color: '#10B981' }]}>
            {item.responseTime}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergency History</Text>
        <Text style={styles.headerSubtitle}>
          {mockEmergencyHistory.length} total incidents
        </Text>
      </View>

      <FlatList
        data={mockEmergencyHistory}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dateContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  severityBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cardBody: {
    marginBottom: 12,
  },
  emergencyType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  patientName: {
    fontSize: 13,
    color: '#6B7280',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  footerItem: {
    flex: 1,
  },
  footerLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  footerValue: {
    fontSize: 13,
    color: '#1F2937',
    fontWeight: '500',
  },
});

export default EmergencyHistory;
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'alert' | 'action' | 'resolved';
}

const mockTimelineEvents: TimelineEvent[] = [
  {
    id: '1',
    time: '08:45 AM',
    title: 'Emergency Alert Received',
    description: 'Blood pressure spike detected for John Williams',
    type: 'alert',
  },
  {
    id: '2',
    time: '08:46 AM',
    title: 'Doctor Notified',
    description: 'Dr. Sarah Smith received notification',
    type: 'action',
  },
  {
    id: '3',
    time: '08:47 AM',
    title: 'Patient Contacted',
    description: 'Initial assessment conducted via telehealth',
    type: 'action',
  },
  {
    id: '4',
    time: '08:48 AM',
    title: 'Medication Adjusted',
    description: 'Prescribed additional BP medication',
    type: 'action',
  },
  {
    id: '5',
    time: '08:52 AM',
    title: 'Situation Resolved',
    description: 'Patient stabilized, follow-up scheduled',
    type: 'resolved',
  },
];

const EmergencyTimeline = () => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'alert':
        return '#EF4444';
      case 'action':
        return '#3B82F6';
      case 'resolved':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return 'ALERT!';
      case 'action':
        return 'ACTION REQUIRED!';
      case 'resolved':
        return 'RESOLVED!';
      default:
        return '●';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergency Timeline</Text>
        <Text style={styles.headerSubtitle}>Real-time incident tracking</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.timeline}>
          {mockTimelineEvents.map((event, index) => (
            <View key={event.id} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <Text style={styles.timeText}>{event.time}</Text>
              </View>

              <View style={styles.timelineCenter}>
                <View
                  style={[
                    styles.timelineDot,
                    { backgroundColor: getTypeColor(event.type) },
                  ]}
                >
                  <Text style={styles.dotIcon}>{getTypeIcon(event.type)}</Text>
                </View>
                {index < mockTimelineEvents.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>

              <View style={styles.timelineRight}>
                <View style={styles.eventCard}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDescription}>
                    {event.description}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Response Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Response Time:</Text>
            <Text style={[styles.summaryValue, { color: '#10B981' }]}>
              7 minutes
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Actions Taken:</Text>
            <Text style={styles.summaryValue}>4</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Status:</Text>
            <Text style={[styles.summaryValue, { color: '#10B981' }]}>
              Resolved
            </Text>
          </View>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  timeline: {
    padding: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  timelineLeft: {
    width: 70,
    paddingTop: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  timelineCenter: {
    width: 40,
    alignItems: 'center',
  },
  timelineDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  dotIcon: {
    fontSize: 14,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginTop: -4,
  },
  timelineRight: {
    flex: 1,
    paddingLeft: 12,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },
  summaryCard: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  summaryLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
});

export default EmergencyTimeline;
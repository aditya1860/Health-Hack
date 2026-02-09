import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DoctorAckBadgeProps {
  acknowledged: boolean;
}

const DoctorAckBadge: React.FC<DoctorAckBadgeProps> = ({ acknowledged }) => {
  return (
    <View
      style={[
        styles.badge,
        acknowledged ? styles.acknowledgedBadge : styles.pendingBadge,
      ]}
    >
      <Text
        style={[
          styles.badgeText,
          acknowledged ? styles.acknowledgedText : styles.pendingText,
        ]}
      >
        {acknowledged ? '✓ Responded' : '⚠ Pending'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  acknowledgedBadge: {
    backgroundColor: '#D1FAE5',
    borderColor: '#10B981',
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  acknowledgedText: {
    color: '#065F46',
  },
  pendingText: {
    color: '#92400E',
  },
});

export default DoctorAckBadge;

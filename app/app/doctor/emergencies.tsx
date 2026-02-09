// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';
// import { mockEmergencies } from './mockData';
// import DoctorAckBadge from './DoctorAckBadge';
// import { mockPatients } from "./mockData";
// const patient = mockPatients.find(
//   p => p.id === alert.patientId
// );

// const Emergencies = () => {
//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case 'high':
//         return '#EF4444';
//       case 'medium':
//         return '#F59E0B';
//       case 'low':
//         return '#10B981';
//       default:
//         return '#6B7280';
//     }
//   };

//   const renderEmergency = ({ item }: { item: any }) => {
//   const patient = mockPatients.find(
//     (p) => p.id === item.patientId
//   );

//   return (
//     <TouchableOpacity style={styles.emergencyCard}>
//       <View style={styles.emergencyHeader}>
//         <View style={styles.severityIndicator} />

//         <View>
//           <Text style={styles.emergencyTitle}>
//             {item.type}
//           </Text>
//           <Text style={styles.patientName}>
//             {patient?.name ?? "Unknown Patient"}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.emergencyFooter}>
//         <Text style={styles.timestamp}>{item.timestamp}</Text>
//         <DoctorAckBadge acknowledged={item.responded} />
//       </View>
//     </TouchableOpacity>
//   );
// };


//   return (
//     <View style={styles.container}>
//       <FlatList
//   data={mockEmergencies}
//   renderItem={renderEmergency}
//   keyExtractor={(item) => item.id}
//   contentContainerStyle={styles.listContainer}
//   showsVerticalScrollIndicator={false}
// />

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   listContainer: {
//     paddingBottom: 20,
//   },
//   emergencyTitle: {
//   fontSize: 15,
//   fontWeight: "600",
//   color: "#111827",
// },
//   emergencyCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   emergencyHeader: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: 12,
//   },
//   severityIndicator: {
//     width: 4,
//     height: '100%',
//     borderRadius: 2,
//     marginRight: 12,
//     minHeight: 40,
//   },
//   emergencyInfo: {
//     flex: 1,
//   },
//   emergencyType: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#1F2937',
//     marginBottom: 4,
//   },
//   patientName: {
//     fontSize: 13,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   emergencyFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: '#F3F4F6',
//   },
//   timestamp: {
//     fontSize: 12,
//     color: '#9CA3AF',
//   },
//   alert: {
//   fontSize: 14,
//   fontWeight: "500",
//   color: "#DC2626",
// },
// });

// export default Emergencies;
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { mockEmergencies, mockPatients } from "./mockData";
import DoctorAckBadge from "./DoctorAckBadge";

const Emergencies = () => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "#EF4444";
      case "medium":
        return "#F59E0B";
      case "low":
        return "#10B981";
      default:
        return "#6B7280";
    }
  };

  const renderEmergency = ({ item }: { item: any }) => {
    const patient = mockPatients.find(
      (p) => p.id === item.patientId
    );

    return (
      <TouchableOpacity style={styles.emergencyCard}>
        <View style={styles.emergencyHeader}>
          <View
            style={[
              styles.severityIndicator,
              { backgroundColor: getSeverityColor(item.severity) },
            ]}
          />

          <View>
            <Text style={styles.emergencyTitle}>{item.type}</Text>
            <Text style={styles.patientName}>
              {patient?.name ?? "Unknown Patient"}
            </Text>
          </View>
        </View>

        <View style={styles.emergencyFooter}>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
          <DoctorAckBadge acknowledged={item.responded} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mockEmergencies}
        renderItem={renderEmergency}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Emergencies;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },

  emergencyCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  emergencyHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  severityIndicator: {
    width: 4,
    minHeight: 40,
    borderRadius: 2,
    marginRight: 12,
  },

  emergencyTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  patientName: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },

  emergencyFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },

  timestamp: {
    fontSize: 12,
    color: "#9CA3AF",
  },

  alert: {
    fontSize: 14,
    fontWeight: "500",
    color: "#DC2626",
  },
});

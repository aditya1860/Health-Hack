import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import OverviewCards from './OverviewCards';
import PatientList from './PatientList';
import Analytics from './analytics';
import Emergencies from './emergencies';
import CommonBackButton from "../../components/CommonBackButton";
import { Image } from "react-native";
import { router } from "expo-router";
import AppHeader from "../../components/AppHeader";
import { getDoctorPatients } from "../../utils/connection";
import { getSession } from "../../utils/storage";


const DoctorDashboard = () => {
  const [connectedPatients, setConnectedPatients] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('Patient List');
  const tabs = ['Patient List', 'Recent Alerts', 'Risk Trends'];
  const [doctorName, setDoctorName] = useState("Doctor");
  const [specialization, setSpecialization] = useState("");

useEffect(() => {
  loadDoctor();
  loadPatients();
}, []);


const loadPatients = async () => {
  const session = await getSession();
  if (!session?.phone) return;

  const patients = await getDoctorPatients(session.phone);
  setConnectedPatients(patients);
};


const loadDoctor = async () => {
  const session = await getSession();

  if (session?.role === "doctor") {
    setDoctorName(session.name || "Doctor");
    setSpecialization(session.specialization || "");
  }
};

  const renderContent = () => {
    switch (activeTab) {
      case 'Patient List':
        return <PatientList />;
      case 'Recent Alerts':
        return <Emergencies />;
      case 'Risk Trends':
        return <Analytics />;
      default:
        return <PatientList />;
    }
  };

  

  return (
  <View style={{ flex: 1 }}>
    <View style={styles.actionBar}>
</View>


    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

      <AppHeader
      title={doctorName}
      subtitle={specialization}
    />
    <View style={styles.actionBar}>
  <TouchableOpacity
  style={styles.connectButton}
  onPress={async () => {
    const session = await getSession();

    if (!session || session.role !== "doctor") {
      Alert.alert("Session expired", "Please login again");
      router.replace("/(auth)/doctor-login");
      return;
    }

    router.push("/doctor/connect-patient");
  }}
>
  <Text style={styles.connectText}>+ Connect Patient</Text>
</TouchableOpacity>

</View>
        {/* Overview Cards */}
        <OverviewCards />

        {connectedPatients.length === 0 ? (
  <Text style={{ margin: 16, color: "#6B7280" }}>
    No patients connected yet.
  </Text>
) : (
  connectedPatients.map((id) => (
    <View key={id} style={{ padding: 16 }}>
      <Text>Patient ID: {id}</Text>
    </View>
  ))
)}


        {/* Tabs */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[styles.tabText, activeTab === tab && styles.activeTabText]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <CommonBackButton color="#F9FAFB" />

        {/* Content */}
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  doctorInfo: {
    alignItems: 'flex-end',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  doctorSpecialty: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#3B82F6',
  },
  tabText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  logo: {
  width: 180,
  height: 72,
  marginTop: 6,
},

  logoWrapper: {
    alignItems: 'flex-start',
},

actionBar: {
  backgroundColor: "#fff",
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: "#E5E7EB",
  alignItems: "flex-end",
},

connectButton: {
  borderWidth: 1,
  borderColor: "#2563EB",
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 6,
},

connectText: {
  color: "#2563EB",
  fontSize: 13,
  fontWeight: "600",
},


});

export default DoctorDashboard;

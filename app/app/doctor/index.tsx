import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import OverviewCards from './OverviewCards';
import PatientList from './PatientList';
import Analytics from './analytics';
import Emergencies from './emergencies';
import CommonBackButton from "../../components/CommonBackButton";
import { Image } from "react-native";
import AppHeader from "../../components/AppHeader";


const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('Patient List');
  const tabs = ['Patient List', 'Recent Alerts', 'Risk Trends'];

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
    <AppHeader
      title="Dr. Rakesh Prasad"
      subtitle="Clinical Physician"
    />
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>

      <View style={styles.logoWrapper}>
        <Image
          source={require("../../assets/images/carefast-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>Dr. Rakesh Prasad</Text>
        <Text style={styles.doctorSpecialty}>Clinical Physician</Text>
      </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Overview Cards */}
        <OverviewCards />

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
    paddingTop: 18,
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

});

export default DoctorDashboard;

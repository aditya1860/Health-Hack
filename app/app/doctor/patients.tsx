
export type RiskLevel = 'low' | 'medium' | 'high';

export interface Patient {
  id: string;
  name: string;
  age: number;
  riskLevel: RiskLevel;
  condition: string;
  lastVisit: string;
  monitoring: boolean;
}

export interface Emergency {
  id: string;
  patientId: string;
  patientName: string;
  type: string;
  timestamp: string;
  severity: RiskLevel;
  responded: boolean;
}

/* ------------------ PATIENTS ------------------ */

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Williams',
    age: 68,
    riskLevel: 'high',
    condition: 'Hypertension',
    lastVisit: '2 days ago',
    monitoring: true,
  },
  {
    id: '2',
    name: 'Emma Davis',
    age: 52,
    riskLevel: 'medium',
    condition: 'Diabetes Type 2',
    lastVisit: '1 week ago',
    monitoring: true,
  },
  {
    id: '3',
    name: 'Michael Brown',
    age: 45,
    riskLevel: 'low',
    condition: 'Annual Checkup',
    lastVisit: '3 weeks ago',
    monitoring: false,
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    age: 71,
    riskLevel: 'high',
    condition: 'Heart Disease',
    lastVisit: '1 day ago',
    monitoring: true,
  },
];

/* ------------------ EMERGENCIES ------------------ */

export const mockEmergencies: Emergency[] = [
  {
    id: 'e1',
    patientId: '1',
    patientName: 'John Williams',
    type: 'Blood Pressure Spike',
    timestamp: '15 min ago',
    severity: 'high',
    responded: false,
  },
  {
    id: 'e2',
    patientId: '4',
    patientName: 'Sarah Johnson',
    type: 'Irregular Heartbeat',
    timestamp: '1 hour ago',
    severity: 'high',
    responded: true,
  },
  {
    id: 'e3',
    patientId: '2',
    patientName: 'Emma Davis',
    type: 'Low Blood Sugar',
    timestamp: '3 hours ago',
    severity: 'medium',
    responded: true,
  },
];

/* ------------------ OVERVIEW STATS ------------------ */

export const overviewStats = {
  totalPatients: 4,
  activeMonitoring: 3,
  highRisk: 2,
  mediumRisk: 1,
  lowRisk: 1,
  emergencies: 3,
  avgResponseTime: '4.2 min',
  preventionRate: '78%',
};

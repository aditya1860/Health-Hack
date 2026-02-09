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
  type: string;
  timestamp: string;
  severity: RiskLevel;
  responded: boolean;
}

/* ------------------ PATIENTS ------------------ */

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Mahi Prajapati',
    age: 68,
    riskLevel: 'high',
    condition: 'Hypertension',
    lastVisit: '2 days ago',
    monitoring: true,
  },
  {
    id: '2',
    name: 'Ayushi Chauhan',
    age: 52,
    riskLevel: 'medium',
    condition: 'Diabetes Type 2',
    lastVisit: '1 week ago',
    monitoring: true,
  },
  {
    id: '3',
    name: 'Vanshika Motwani',
    age: 45,
    riskLevel: 'low',
    condition: 'Annual Checkup',
    lastVisit: '3 weeks ago',
    monitoring: false,
  },
];

/* ------------------ EMERGENCIES ------------------ */

export const mockEmergencies: Emergency[] = [
  {
    id: 'e1',
    patientId: '1',
    type: 'Blood Pressure Spike',
    timestamp: '15 min ago',
    severity: 'high',
    responded: false,
  },
  {
    id: 'e2',
    patientId: '2',
    type: 'Low Blood Sugar',
    timestamp: '3 hours ago',
    severity: 'medium',
    responded: true,
  },
];

/* ------------------ ANALYTICS ------------------ */

export const riskDistribution = [
  { level: 'Low', count: 1, color: '#10B981' },
  { level: 'Medium', count: 1, color: '#F59E0B' },
  { level: 'High', count: 1, color: '#EF4444' },
];

export const emergencyFrequencyData = [
  { time: '00:00', count: 1 },
  { time: '06:00', count: 2 },
  { time: '12:00', count: 3 },
  { time: '18:00', count: 2 },
];

export const overviewStats = {
  totalPatients: 3,
  activeMonitoring: 2,
  totalIncidents: 5,
  avgResponseTime: '4.2 min',
  preventionRate: '78%',
};

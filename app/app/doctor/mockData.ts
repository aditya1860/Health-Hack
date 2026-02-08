export type RiskLevel = "HIGH" | "MEDIUM" | "LOW";

export type Patient = {
  id: string;
  name: string;
  age: number;
  risk: RiskLevel;
  lastEmergency: string;
  assignedDoctor?: string;
  notes?: string;
  emergencies?: {
    id: string;
    date: string;
    reason: string;
  }[];
};

export const patients: Patient[] = [
  {
    id: "1",
    name: "Amit Sharma",
    age: 62,
    risk: "HIGH",
    lastEmergency: "2 days ago",
    assignedDoctor: "Dr. Mehta",
    notes: "",
    emergencies: [
      { id: "e1", date: "2026-02-05", reason: "Chest discomfort" }
    ]
  },
  {
    id: "2",
    name: "Neha Verma",
    age: 45,
    risk: "MEDIUM",
    lastEmergency: "No recent emergency",
    assignedDoctor: "Dr. Joshi",
    notes: ""
  },
  {
    id: "3",
    name: "Rakesh Singh",
    age: 70,
    risk: "LOW",
    lastEmergency: "10 days ago",
    assignedDoctor: "Dr. Joshi",
    notes: ""
  }
];

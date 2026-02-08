export const patients = [
  {
    id: "1",
    name: "Amit Sharma",
    age: 62,
    risk: "HIGH",
    notes: "",
    lastEmergency: "2 days ago",
    acknowledged: true,
    assignedDoctor: "Dr. Mehta",
    emergencies: [
      { id: "e1", date: "2026-02-05", reason: "Chest discomfort" }
    ]
  },
  {
    id: "2",
    name: "Neha Verma",
    age: 45,
    risk: "MEDIUM",
    notes: "",
    lastEmergency: "No recent emergency",
    acknowledged: true,
    assignedDoctor: "Dr. Motwani",
    emergencies: []
  },
  {
    id: "3",
    name: "Rakesh Singh",
    age: 70,
    risk: "LOW",
    notes: "",
    lastEmergency: "10 days ago",
    acknowledged: false,
    assignedDoctor: "Dr. Joshi",
    emergencies: [
      { id: "e2", date: "2026-01-28", reason: "Dizziness" }
    ]
  }
];

export const patients = [
  {
    id: "1",
    name: "Amit Sharma",
    age: 62,
    risk: "HIGH",
    lastEmergency: "2 days ago",
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
    emergencies: []
  },
  {
    id: "3",
    name: "Rakesh Singh",
    age: 70,
    risk: "LOW",
    lastEmergency: "10 days ago",
    emergencies: [
      { id: "e2", date: "2026-01-28", reason: "Dizziness" }
    ]
  }
];

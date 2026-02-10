export type RiskInput = {
  sys: number;
  dia: number;
  hr: number;
  sugar: number;
  spo2: number;
  symptomsCount: number;
  missedMeds: boolean;
};

export type CheckInData = {
  sugar: string;
  heartRate: string;
  bloodPressure: string;
  oxygen: string;
  feeling: string;
};

export function mapCheckInToRiskInput(
  checkIn: CheckInData
): RiskInput {
  const [sys, dia] = checkIn.bloodPressure
    .split("/")
    .map((v) => Number(v.trim()));

  return {
    sys,
    dia,
    hr: Number(checkIn.heartRate),
    sugar: Number(checkIn.sugar),
    spo2: Number(checkIn.oxygen),
    symptomsCount: checkIn.feeling ? 1 : 0, // adjust logic as needed
    missedMeds: false, // or derive from check-in later
  };
}

export function calculateRisk(data: RiskInput) {
  const {
    sys,
    dia,
    hr,
    sugar,
    spo2,
    symptomsCount,
    missedMeds,
  } = data;

  

  // HIGH RISK
  if (
    sys >= 180 ||
    dia >= 120 ||
    hr >= 130 ||
    spo2 < 90 ||
    symptomsCount >= 3
  ) {
    return {
      level: "High" as const,
      reason: "Critical vitals or multiple severe symptoms detected",
    };
  }

  // MEDIUM RISK
  if (
    sys >= 140 ||
    dia >= 90 ||
    hr >= 100 ||
    spo2 < 95 ||
    sugar >= 180 ||
    missedMeds
  ) {
    return {
      level: "Medium" as const,
      reason: "Vitals outside normal range or medication missed",
    };
  }

  // LOW RISK
  return {
    level: "Low" as const,
    reason: "Vitals are within safe limits",
  };
}

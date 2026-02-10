export type RiskInput = {
  sys: number;
  dia: number;
  hr: number;
  sugar: number;
  spo2: number;
  symptomsCount: number;
  missedMeds: boolean;
};

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

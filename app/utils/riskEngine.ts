export type RiskLevel = "Low" | "Medium" | "High";
export interface CheckInData {
  fever: boolean;
  chestPain: boolean;
  breathingDifficulty: boolean;
  dizziness: boolean;
  fatigue: boolean;
}

export interface RiskResult {
  level: RiskLevel;
  score: number;
  explanation: string;
  advice: string;
}

export function calculateRisk(data: CheckInData): RiskResult {
  let score = 0;
  const reasons: string[] = [];

  if (data.fever) {
    score += 1;
    reasons.push("reported fever");
  }

  if (data.fatigue) {
    score += 1;
    reasons.push("unusual fatigue");
  }

  if (data.dizziness) {
    score += 2;
    reasons.push("dizziness");
  }

  if (data.chestPain) {
    score += 3;
    reasons.push("chest discomfort");
  }

  if (data.breathingDifficulty) {
    score += 3;
    reasons.push("breathing difficulty");
  }

  // LOW RISK
  if (score <= 2) {
    return {
      level: "Low",
      score,
      explanation: "No significant warning signs detected today.",
      advice: "Continue daily monitoring and maintain normal routine."
    };
  }

  // MEDIUM RISK
  if (score <= 5) {
    return {
      level: "Medium",
      score,
      explanation:
        "Some symptoms require attention: " + reasons.join(", "),
      advice:
        "Monitor symptoms closely and avoid heavy physical activity today."
    };
  }

  // HIGH RISK
  return {
    level: "High",
    score,
    explanation:
      "Multiple high-risk symptoms detected: " + reasons.join(", "),
    advice:
      "Consider seeking immediate assistance and keep emergency contacts ready."
  };
}

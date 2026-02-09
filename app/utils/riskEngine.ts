export type CheckInData = {
  sugar: string;
  heartRate: string;
  bloodPressure: string;
  oxygen: string;
  feeling: string;
};

export function calculateRisk(data: CheckInData) {
  let score = 0;
  const reasons: string[] = [];

  const sugar = Number(data.sugar);
  const heartRate = Number(data.heartRate);
  const oxygen = Number(data.oxygen);

  // Blood Sugar
  if (!isNaN(sugar)) {
    if (sugar >= 180) {
      score += 2;
      reasons.push("Blood sugar is very high");
    } else if (sugar >= 140) {
      score += 1;
      reasons.push("Blood sugar is slightly elevated");
    }
  }

  // Heart Rate
  if (!isNaN(heartRate)) {
    if (heartRate >= 110) {
      score += 2;
      reasons.push("Heart rate is high");
    } else if (heartRate <= 50) {
      score += 1;
      reasons.push("Heart rate is lower than normal");
    }
  }

  // Blood Pressure (expects format like 120/80)
  if (data.bloodPressure.includes("/")) {
    const [sys, dia] = data.bloodPressure.split("/").map(Number);
    if (!isNaN(sys) && !isNaN(dia)) {
      if (sys >= 140 || dia >= 90) {
        score += 2;
        reasons.push("Blood pressure is high");
      }
    }
  }

  // Oxygen Level
  if (!isNaN(oxygen) && oxygen < 92) {
    score += 3;
    reasons.push("Oxygen level is low");
  }

  // Symptoms / Feeling
  if (data.feeling && data.feeling.length > 10) {
    score += 1;
    reasons.push("User reported discomfort or symptoms");
  }

  let level: "Low" | "Medium" | "High" = "Low";

  if (score >= 6) level = "High";
  else if (score >= 3) level = "Medium";

  return {
    level,
    score,
    explanation:
      reasons.length > 0
        ? reasons.join(". ") + "."
        : "All readings are within a safe range.",
  };
}

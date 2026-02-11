export type RiskInput = {
  sys?: number | null;
  dia?: number | null;
  hr?: number | null;
  sugar?: number | null;
  spo2?: number | null;
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
  let sys: number | null = null;
  let dia: number | null = null;

  if (checkIn.bloodPressure) {
    const parts = checkIn.bloodPressure.split("/");
    if (parts.length === 2) {
      sys = Number(parts[0].trim());
      dia = Number(parts[1].trim());
    }
  }

  return {
    sys,
    dia,
    hr: checkIn.heartRate ? Number(checkIn.heartRate) : null,
    sugar: checkIn.sugar ? Number(checkIn.sugar) : null,
    spo2: checkIn.oxygen ? Number(checkIn.oxygen) : null,
    symptomsCount: checkIn.feeling ? 1 : 0,
    missedMeds: false,
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

  /* ---------------- HIGH RISK ---------------- */

  if (
    (sys != null && sys >= thresholds.bp.highSys) ||
    (dia != null && dia >= thresholds.bp.highDia) ||
    (hr != null && hr >= thresholds.hr.high) ||
    (spo2 != null && spo2 < thresholds.spo2.high) ||
    symptomsCount >= 3
  ) {
    return {
      level: "High" as const,
      reason:
        "Critical vitals or multiple severe symptoms detected",
    };
  }

  /* ---------------- MEDIUM RISK ---------------- */

  if (
    (sys != null && sys >= thresholds.bp.mediumSys) ||
    (dia != null && dia >= thresholds.bp.mediumDia) ||
    (hr != null && hr >= thresholds.hr.medium) ||
    (spo2 != null && spo2 < thresholds.spo2.medium) ||
    (sugar != null && sugar >= thresholds.sugar.medium) ||
    missedMeds
  ) {
    return {
      level: "Medium" as const,
      reason:
        "Vitals outside normal range or medication missed",
    };
  }

  /* ---------------- LOW RISK ---------------- */

  return {
    level: "Low" as const,
    reason: "Vitals are within safe limits",
  };
}

const thresholds = {
  bp: {
    highSys: 180,
    highDia: 120,
    mediumSys: 140,
    mediumDia: 90,
  },
  hr: {
    high: 130,
    medium: 100,
  },
  spo2: {
    high: 90,
    medium: 95,
  },
  sugar: {
    medium: 180,
  },
};


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

type VitalRule = {
  medium: number;
  high: number;
  label: string;
  reverse?: boolean;
};

const vitalRules: Record<string, VitalRule> = {
  sys: {
    medium: 140,
    high: 180,
    label: "High systolic pressure",
  },
  dia: {
    medium: 90,
    high: 120,
    label: "High diastolic pressure",
  },
  hr: {
    medium: 100,
    high: 130,
    label: "Elevated heart rate",
  },
  spo2: {
    medium: 95,
    high: 90,
    label: "Low oxygen level",
    reverse: true,
  },
  sugar: {
    medium: 180,
    high: 300,
    label: "High blood sugar",
  },
};


/* ---------------- MAPPER ---------------- */

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
    spo2: checkIn.oxygen ? parseFloat(checkIn.oxygen) : null,
    symptomsCount: checkIn.feeling ? 1 : 0,
    missedMeds: false,
  };
}

/* ---------------- CALCULATE RISK ---------------- */

export function calculateRisk(data: RiskInput) {
  let reasons: string[] = [];
  let mediumCount = 0;
  let highTriggered = false;

  Object.entries(vitalRules).forEach(([key, rule]) => {
    const value = (data as any)[key];

    if (value == null) return;

    if (rule.reverse) {
      if (value < rule.high) {
        highTriggered = true;
        reasons.push(rule.label);
      } else if (value < rule.medium) {
        mediumCount++;
      }
    } else {
      // Higher is worse
      if (value >= rule.high) {
        highTriggered = true;
        reasons.push(rule.label);
      } else if (value >= rule.medium) {
        mediumCount++;
      }
    }
  });

  /* ---------- SYMPTOMS & MEDS ---------- */

  if (data.symptomsCount >= 3) {
    highTriggered = true;
    reasons.push("Multiple severe symptoms");
  }

  if (data.missedMeds) {
    mediumCount++;
  }

  /* ---------- FINAL DECISION ---------- */

  if (highTriggered) {
    return {
      level: "High" as const,
      reason: reasons.length
        ? reasons.join(", ")
        : "Critical vitals detected",
    };
  }

  if (mediumCount >= 2) {
    return {
      level: "Medium" as const,
      reason: "Multiple abnormal indicators detected",
    };
  }

  if (mediumCount === 1) {
    return {
      level: "Medium" as const,
      reason: "One vital outside normal range",
    };
  }

  return {
    level: "Low" as const,
    reason: "Vitals are within safe limits",
  };
}

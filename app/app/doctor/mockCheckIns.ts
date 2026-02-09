// app/app/doctor/mockCheckIns.ts
import { CheckInData } from "../../utils/riskEngine";

export const mockCheckIns: Record<string, CheckInData> = {
  "1": {
    sugar: "190",
    heartRate: "118",
    bloodPressure: "150/95",
    oxygen: "89",
    feeling: "Chest discomfort, dizziness, fatigue",
  },
  "2": {
    sugar: "145",
    heartRate: "92",
    bloodPressure: "135/85",
    oxygen: "94",
    feeling: "Mild tiredness",
  },
  "3": {
    sugar: "110",
    heartRate: "72",
    bloodPressure: "120/80",
    oxygen: "98",
    feeling: "Feeling normal",
  },
};

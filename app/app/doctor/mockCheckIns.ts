// app/app/doctor/mockCheckIns.ts
import { CheckInData } from "../../utils/riskEngine";

export const mockCheckIns: Record<string, CheckInData> = {
  "1": {
    fever: true,
    chestPain: true,
    breathingDifficulty: false,
    dizziness: true,
    fatigue: true,
  },
  "2": {
    fever: false,
    chestPain: false,
    breathingDifficulty: false,
    dizziness: false,
    fatigue: true,
  },
  "3": {
    fever: false,
    chestPain: false,
    breathingDifficulty: false,
    dizziness: false,
    fatigue: false,
  },
};

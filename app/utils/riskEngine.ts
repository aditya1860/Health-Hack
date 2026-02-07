// app/utils/riskEngine.ts

export type RiskLevel = "Low" | "Medium" | "High";

export interface CheckInData {
  heartRate: number;
  oxygenLevel: number;
  chestPain: boolean;
  breathingIssue: boolean;
  weakness: boolean;
}

export interface RiskResult {
  level: RiskLevel;
  explanation: string[];
}

/**
 * Rule-based preventive risk scoring
 * This does NOT diagnose medical conditions.
 */
export function calculateRisk(data: CheckInData): RiskResult {
  let score = 0;
  let explanation: string[] = [];
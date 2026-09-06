export type InspectionStatus = 'OK' | 'SUSPECTED_DEFECT' | 'RECHECK';
export type FinalDecision =
  | 'CONFIRMED_OK'
  | 'CONFIRMED_DEFECT'
  | 'RECHECK_REQUESTED'
  | 'PENDING';

export type Inspection = {
  id: string;
  partType: string;
  batchNumber: string;
  inspectorName: string;
  inspectedAt: string; // 'YYYY-MM-DD HH:mm'
  aiStatus: InspectionStatus;
  confidence: number; // 0-100
  defectType?: string;
  finalDecision: FinalDecision;
  decisionReason?: string;
  estimatedLoss: number; // 원 단위
  memo?: string;
};

export type DailyDefectRate = {
  date: string; // 'MM/DD'
  defectRatePercent: number;
};

export type PartDefectRate = {
  partType: string;
  defectRatePercent: number;
};

export type Screen =
  | 'dashboard'
  | 'new-inspection'
  | 'result'
  | 'history'
  | 'stats';

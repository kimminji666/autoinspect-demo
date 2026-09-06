import type {
  DailyDefectRate,
  FinalDecision,
  Inspection,
  PartDefectRate,
} from '../types/inspection';

// 부품 종류 목록 (드롭다운)
export const PART_TYPES = [
  '도어',
  '레드 램프',
  '휀더',
  '라디에이터 그릴',
  '루프사이드',
  '배선',
  '범퍼',
  '카울커버',
  '커넥터',
  '테일 램프',
  '프레임',
] as const;

export const DEFAULT_PART_TYPE = '라디에이터 그릴';
export const DEFAULT_BATCH_NUMBER = 'RG-20260906-03';
export const DEFAULT_INSPECTOR_NAME = '김민지';

// 대시보드 요약 카드
export const DASHBOARD_SUMMARY = {
  todayInspectionCount: 128,
  okCount: 112,
  suspectedDefectCount: 9,
  recheckPendingCount: 7,
  estimatedLoss: 225000,
};

// 대시보드 최근 7일 불량률 추이 (통계 화면과 공유)
export const RECENT_7_DAYS_DEFECT_RATE: DailyDefectRate[] = [
  { date: '8/31', defectRatePercent: 8.5 },
  { date: '9/1', defectRatePercent: 7.2 },
  { date: '9/2', defectRatePercent: 9.1 },
  { date: '9/3', defectRatePercent: 6.8 },
  { date: '9/4', defectRatePercent: 10.2 },
  { date: '9/5', defectRatePercent: 9.4 },
  { date: '9/6', defectRatePercent: 7.0 },
];

// 최근 30일 (통계 화면, 7일 데이터 뒤에 자연스럽게 추가 생성한 값)
export const RECENT_30_DAYS_DEFECT_RATE: DailyDefectRate[] = [
  { date: '8/8', defectRatePercent: 9.8 },
  { date: '8/9', defectRatePercent: 10.5 },
  { date: '8/10', defectRatePercent: 8.9 },
  { date: '8/11', defectRatePercent: 7.6 },
  { date: '8/12', defectRatePercent: 8.2 },
  { date: '8/13', defectRatePercent: 9.0 },
  { date: '8/14', defectRatePercent: 11.3 },
  { date: '8/15', defectRatePercent: 10.7 },
  { date: '8/16', defectRatePercent: 9.4 },
  { date: '8/17', defectRatePercent: 8.1 },
  { date: '8/18', defectRatePercent: 7.5 },
  { date: '8/19', defectRatePercent: 8.8 },
  { date: '8/20', defectRatePercent: 9.9 },
  { date: '8/21', defectRatePercent: 10.1 },
  { date: '8/22', defectRatePercent: 8.6 },
  { date: '8/23', defectRatePercent: 7.9 },
  { date: '8/24', defectRatePercent: 8.4 },
  { date: '8/25', defectRatePercent: 9.2 },
  { date: '8/26', defectRatePercent: 10.6 },
  { date: '8/27', defectRatePercent: 9.7 },
  { date: '8/28', defectRatePercent: 8.3 },
  { date: '8/29', defectRatePercent: 7.8 },
  { date: '8/30', defectRatePercent: 8.0 },
  ...RECENT_7_DAYS_DEFECT_RATE,
];

// 부품별 불량률 (통계 화면, 최근 7일 기준)
export const PART_DEFECT_RATES: PartDefectRate[] = [
  { partType: '라디에이터 그릴', defectRatePercent: 12.5 },
  { partType: '배선', defectRatePercent: 8.9 },
  { partType: '테일 램프', defectRatePercent: 7.1 },
  { partType: '범퍼', defectRatePercent: 4.3 },
  { partType: '도어', defectRatePercent: 2.1 },
  { partType: '커넥터', defectRatePercent: 1.8 },
];

export const RECURRING_DEFECT_ALERT = {
  partType: '라디에이터 그릴',
  recentRatePercent: 12.5,
  changeVsLastWeek: 4.2,
};

export const CUMULATIVE_ESTIMATED_LOSS = 1240000;

// 비용 기본값
export const DEFAULT_COSTS = {
  unitPrice: 20000,
  reworkCost: 5000,
  disposalCost: 10000,
};

// AI가 반환하는 데모용 고정 판정 (실제 모델 호출 없음)
export const DEMO_AI_RESULT = {
  aiStatusLabel: '불량 의심' as const,
  confidence: 91,
  defectType: '표면 스크래치',
  guideMessage:
    '표시된 영역에서 표면 스크래치 가능성이 높습니다. 작업자가 이미지를 확인한 뒤 최종 판정을 선택하세요.',
};

export const FINAL_DECISION_LABEL: Record<FinalDecision, string> = {
  CONFIRMED_OK: '정상 확정',
  CONFIRMED_DEFECT: '불량 확정',
  RECHECK_REQUESTED: '재검 요청',
  PENDING: '검토 중',
};

// 검사 이력 초기 목업 데이터 (최신순)
export const INITIAL_HISTORY: Inspection[] = [
  {
    id: 'INS-20260906-0141',
    partType: '라디에이터 그릴',
    batchNumber: 'RG-20260906-02',
    aiStatus: 'SUSPECTED_DEFECT',
    confidence: 91,
    finalDecision: 'RECHECK_REQUESTED',
    inspectorName: '김민지',
    inspectedAt: '2026-09-06 09:12',
    defectType: '표면 스크래치',
    decisionReason: 'AI 판정 신뢰도는 높으나 각도상 재확인이 필요해 보임',
    estimatedLoss: 5000,
  },
  {
    id: 'INS-20260906-0140',
    partType: '도어',
    batchNumber: 'DR-20260906-01',
    aiStatus: 'OK',
    confidence: 96,
    finalDecision: 'CONFIRMED_OK',
    inspectorName: '박서준',
    inspectedAt: '2026-09-06 08:47',
    decisionReason: '외관 이상 없음',
    estimatedLoss: 0,
  },
  {
    id: 'INS-20260905-0139',
    partType: '배선',
    batchNumber: 'WH-20260905-05',
    aiStatus: 'RECHECK',
    confidence: 64,
    finalDecision: 'PENDING',
    inspectorName: '김민지',
    inspectedAt: '2026-09-05 17:20',
    defectType: '피복 손상 의심',
    estimatedLoss: 0,
  },
  {
    id: 'INS-20260905-0138',
    partType: '범퍼',
    batchNumber: 'BP-20260905-02',
    aiStatus: 'OK',
    confidence: 98,
    finalDecision: 'CONFIRMED_OK',
    inspectorName: '이하늘',
    inspectedAt: '2026-09-05 15:03',
    decisionReason: '외관 이상 없음',
    estimatedLoss: 0,
  },
  {
    id: 'INS-20260905-0137',
    partType: '테일 램프',
    batchNumber: 'TL-20260905-01',
    aiStatus: 'SUSPECTED_DEFECT',
    confidence: 87,
    finalDecision: 'CONFIRMED_DEFECT',
    inspectorName: '박서준',
    inspectedAt: '2026-09-05 11:41',
    defectType: '크랙',
    decisionReason: '렌즈 표면 크랙 육안 확인됨',
    estimatedLoss: 30000,
  },
  {
    id: 'INS-20260905-0136',
    partType: '커넥터',
    batchNumber: 'CN-20260904-09',
    aiStatus: 'OK',
    confidence: 95,
    finalDecision: 'CONFIRMED_OK',
    inspectorName: '김민지',
    inspectedAt: '2026-09-05 10:15',
    decisionReason: '외관 이상 없음',
    estimatedLoss: 0,
  },
  {
    id: 'INS-20260904-0135',
    partType: '라디에이터 그릴',
    batchNumber: 'RG-20260904-04',
    aiStatus: 'SUSPECTED_DEFECT',
    confidence: 89,
    finalDecision: 'CONFIRMED_DEFECT',
    inspectorName: '이하늘',
    inspectedAt: '2026-09-04 16:30',
    defectType: '표면 스크래치',
    decisionReason: '스크래치 깊이가 기준치 초과',
    estimatedLoss: 30000,
  },
  {
    id: 'INS-20260904-0134',
    partType: '프레임',
    batchNumber: 'FR-20260904-01',
    aiStatus: 'OK',
    confidence: 97,
    finalDecision: 'CONFIRMED_OK',
    inspectorName: '박서준',
    inspectedAt: '2026-09-04 13:22',
    decisionReason: '외관 이상 없음',
    estimatedLoss: 0,
  },
];

// 대시보드 "최근 검사 결과" 미니 테이블 전용 표기
// (동일 검사 건을 가리키되, 대시보드 위젯에서는 진행 상태 관점의 문구를 사용)
export const DASHBOARD_RECENT_RESULTS = [
  {
    id: INITIAL_HISTORY[0].id,
    partType: '라디에이터 그릴',
    aiStatusLabel: 'NG',
    confidence: 91,
    statusLabel: '재검 대기',
    statusColor: 'recheck' as const,
  },
  {
    id: INITIAL_HISTORY[1].id,
    partType: '도어',
    aiStatusLabel: 'OK',
    confidence: 96,
    statusLabel: '정상 확정',
    statusColor: 'ok' as const,
  },
  {
    id: INITIAL_HISTORY[2].id,
    partType: '배선',
    aiStatusLabel: '재검',
    confidence: 64,
    statusLabel: '검토 중',
    statusColor: 'recheck' as const,
  },
];

let idCounter = 142;

export function generateNextInspectionId(dateStr: string): string {
  idCounter += 1;
  return `INS-${dateStr}-${String(idCounter).padStart(4, '0')}`;
}

export const TODAY_LABEL = '2026년 9월 6일';
export const TODAY_ID_DATE = '20260906';

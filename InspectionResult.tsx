import { useMemo, useState, type FC } from 'react';
import StatusBadge from '../components/common/StatusBadge';
import PartImagePlaceholder from '../components/common/PartImagePlaceholder';
import { DEFAULT_COSTS } from '../data/mockData';
import type { DraftInspection } from '../App';
import type { FinalDecision, Inspection } from '../types/inspection';

type Props = {
  draft: DraftInspection;
  onSave: (inspection: Inspection) => void;
};

type DecisionOption = {
  value: FinalDecision;
  label: string;
  activeClass: string;
};

const DECISION_OPTIONS: DecisionOption[] = [
  { value: 'CONFIRMED_OK', label: '정상 확정', activeClass: 'bg-green-50 border-ok text-ok' },
  { value: 'CONFIRMED_DEFECT', label: '불량 확정', activeClass: 'bg-red-50 border-defect text-defect' },
  { value: 'RECHECK_REQUESTED', label: '재검 요청', activeClass: 'bg-orange-50 border-recheck text-recheck' },
];

const InspectionResult: FC<Props> = ({ draft, onSave }) => {
  const [decision, setDecision] = useState<FinalDecision | null>(null);
  const [reason, setReason] = useState('');
  const [unitPrice, setUnitPrice] = useState(DEFAULT_COSTS.unitPrice);
  const [reworkCost, setReworkCost] = useState(DEFAULT_COSTS.reworkCost);
  const [disposalCost, setDisposalCost] = useState(DEFAULT_COSTS.disposalCost);

  const now = '2026-09-06 14:05';

  const { resultTitle, estimatedLoss } = useMemo(() => {
    if (decision === 'CONFIRMED_OK') {
      return { resultTitle: '품질 이상이 발견되지 않았습니다', estimatedLoss: 0 };
    }
    if (decision === 'CONFIRMED_DEFECT') {
      const loss = unitPrice + disposalCost;
      return { resultTitle: `예상 품질 손실 ${loss.toLocaleString()}원`, estimatedLoss: loss };
    }
    if (decision === 'RECHECK_REQUESTED') {
      return {
        resultTitle: `예상 재작업 비용 ${reworkCost.toLocaleString()}원`,
        estimatedLoss: reworkCost,
      };
    }
    return { resultTitle: '최종 판정을 선택하세요', estimatedLoss: 0 };
  }, [decision, unitPrice, disposalCost, reworkCost]);

  const handleSave = () => {
    if (!decision) return;
    const inspection: Inspection = {
      id: draft.id,
      partType: draft.partType,
      batchNumber: draft.batchNumber,
      inspectorName: draft.inspectorName,
      inspectedAt: now,
      aiStatus: 'SUSPECTED_DEFECT',
      confidence: draft.confidence,
      defectType: draft.defectType,
      finalDecision: decision,
      decisionReason: reason || undefined,
      estimatedLoss,
      memo: draft.memo || undefined,
    };
    onSave(inspection);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink">AI 검사 결과</h1>
          <p className="text-sm text-muted mt-1">
            검사 ID {draft.id} · 배치 {draft.batchNumber}
          </p>
        </div>
        <StatusBadge label={`불량 의심 · ${draft.confidence}%`} tone="defect" size="md" />
      </div>

      <div className="bg-white rounded-card border border-gray-200 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <p className="text-xs text-muted mb-2">원본 이미지</p>
            <PartImagePlaceholder variant="original" label={draft.partType} />
          </div>
          <div>
            <p className="text-xs text-muted mb-2">AI 주목 영역</p>
            <PartImagePlaceholder variant="heatmap" label="불량 의심 영역" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
          <div>
            <p className="text-muted">부품</p>
            <p className="text-ink font-medium mt-0.5">{draft.partType}</p>
          </div>
          <div>
            <p className="text-muted">배치 번호</p>
            <p className="text-ink font-medium mt-0.5">{draft.batchNumber}</p>
          </div>
          <div>
            <p className="text-muted">예상 불량 유형</p>
            <p className="text-ink font-medium mt-0.5">{draft.defectType}</p>
          </div>
          <div>
            <p className="text-muted">신뢰도</p>
            <p className="text-ink font-medium mt-0.5">{draft.confidence}%</p>
          </div>
        </div>

        <p className="text-sm text-ink bg-surface-alt rounded-lg px-4 py-3">
          {draft.guideMessage}
        </p>
      </div>

      <div className="bg-white rounded-card border border-gray-200 p-6 space-y-5">
        <div>
          <p className="text-sm font-medium text-ink mb-2.5">최종 판정</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {DECISION_OPTIONS.map((option) => {
              const active = decision === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setDecision(option.value)}
                  className={`rounded-lg border-2 px-4 py-3 text-sm font-semibold transition-colors ${
                    active
                      ? option.activeClass
                      : 'border-gray-200 text-ink hover:border-gray-300 bg-white'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            최종 판정 사유
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="판정 사유를 입력하세요"
            rows={2}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-ink resize-none focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-ink mb-2.5">비용 입력</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-muted mb-1.5">부품 단가</label>
              <div className="relative">
                <input
                  type="number"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(Number(e.target.value) || 0)}
                  className="w-full rounded-lg border border-gray-300 pl-3 pr-8 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">원</span>
              </div>
            </div>
            <div>
              <label className="block text-xs text-muted mb-1.5">재작업 비용</label>
              <div className="relative">
                <input
                  type="number"
                  value={reworkCost}
                  onChange={(e) => setReworkCost(Number(e.target.value) || 0)}
                  className="w-full rounded-lg border border-gray-300 pl-3 pr-8 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">원</span>
              </div>
            </div>
            <div>
              <label className="block text-xs text-muted mb-1.5">폐기 비용</label>
              <div className="relative">
                <input
                  type="number"
                  value={disposalCost}
                  onChange={(e) => setDisposalCost(Number(e.target.value) || 0)}
                  className="w-full rounded-lg border border-gray-300 pl-3 pr-8 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">원</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-card bg-surface-alt border border-gray-200 p-4">
          <p className="text-ink font-semibold">{resultTitle}</p>
          <p className="text-xs text-muted mt-1">입력값 기반 추정치</p>
        </div>

        <div className="pt-1 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleSave}
            disabled={!decision}
            className={`inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-semibold transition-colors ${
              decision
                ? 'bg-brand text-white hover:bg-brand-dark'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            판정 저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default InspectionResult;

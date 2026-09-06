import { useMemo, useState, type FC } from 'react';
import StatusBadge, { type BadgeTone } from '../components/common/StatusBadge';
import PartImagePlaceholder from '../components/common/PartImagePlaceholder';
import { FINAL_DECISION_LABEL, PART_TYPES } from '../data/mockData';
import type { Inspection, InspectionStatus } from '../types/inspection';

type Props = {
  history: Inspection[];
};

const AI_STATUS_LABEL: Record<InspectionStatus, string> = {
  OK: '정상',
  SUSPECTED_DEFECT: '불량 의심',
  RECHECK: '재검',
};

const AI_STATUS_TONE: Record<InspectionStatus, BadgeTone> = {
  OK: 'ok',
  SUSPECTED_DEFECT: 'defect',
  RECHECK: 'recheck',
};

const FINAL_DECISION_TONE: Record<Inspection['finalDecision'], BadgeTone> = {
  CONFIRMED_OK: 'ok',
  CONFIRMED_DEFECT: 'defect',
  RECHECK_REQUESTED: 'recheck',
  PENDING: 'neutral',
};

const STATUS_FILTERS: { value: InspectionStatus | 'ALL'; label: string }[] = [
  { value: 'ALL', label: '전체 상태' },
  { value: 'OK', label: '정상' },
  { value: 'SUSPECTED_DEFECT', label: '불량 의심' },
  { value: 'RECHECK', label: '재검' },
];

const InspectionHistory: FC<Props> = ({ history }) => {
  const [search, setSearch] = useState('');
  const [partFilter, setPartFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState<InspectionStatus | 'ALL'>('ALL');
  const [dateFilter, setDateFilter] = useState('');
  const [selected, setSelected] = useState<Inspection | null>(null);

  const filtered = useMemo(() => {
    return history.filter((item) => {
      const matchesSearch =
        search.trim() === '' ||
        item.partType.includes(search.trim()) ||
        item.id.toLowerCase().includes(search.trim().toLowerCase());
      const matchesPart = partFilter === 'ALL' || item.partType === partFilter;
      const matchesStatus = statusFilter === 'ALL' || item.aiStatus === statusFilter;
      const matchesDate = dateFilter === '' || item.inspectedAt.startsWith(dateFilter);
      return matchesSearch && matchesPart && matchesStatus && matchesDate;
    });
  }, [history, search, partFilter, statusFilter, dateFilter]);

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-ink">검사 이력</h1>

      <div className="bg-white rounded-card border border-gray-200 p-4 space-y-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="부품명 또는 검사 ID 검색"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
        />
        <div className="flex flex-wrap gap-3">
          <select
            value={partFilter}
            onChange={(e) => setPartFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
          >
            <option value="ALL">전체 부품</option>
            {PART_TYPES.map((part) => (
              <option key={part} value={part}>
                {part}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as InspectionStatus | 'ALL')}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
          >
            {STATUS_FILTERS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>
      </div>

      <div className="bg-white rounded-card border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="text-left text-muted bg-surface-alt border-b border-gray-200">
                <th className="px-4 py-3 font-medium">검사 ID</th>
                <th className="px-4 py-3 font-medium">부품</th>
                <th className="px-4 py-3 font-medium">배치 번호</th>
                <th className="px-4 py-3 font-medium">AI 판정</th>
                <th className="px-4 py-3 font-medium">최종 판정</th>
                <th className="px-4 py-3 font-medium">검사자</th>
                <th className="px-4 py-3 font-medium">검사일</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className="border-b border-gray-50 last:border-0 hover:bg-surface-alt cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 text-ink font-medium">{item.id}</td>
                  <td className="px-4 py-3 text-ink">{item.partType}</td>
                  <td className="px-4 py-3 text-muted">{item.batchNumber}</td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      label={`${AI_STATUS_LABEL[item.aiStatus]} · ${item.confidence}%`}
                      tone={AI_STATUS_TONE[item.aiStatus]}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      label={FINAL_DECISION_LABEL[item.finalDecision]}
                      tone={FINAL_DECISION_TONE[item.finalDecision]}
                    />
                  </td>
                  <td className="px-4 py-3 text-muted">{item.inspectorName}</td>
                  <td className="px-4 py-3 text-muted">{item.inspectedAt}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-muted">
                    조건에 맞는 검사 이력이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setSelected(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-card w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative"
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="닫기"
              className="absolute top-4 right-4 text-muted hover:text-ink"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            <p className="text-xs text-muted">{selected.id}</p>
            <h2 className="text-lg font-bold text-ink mt-0.5">{selected.partType}</h2>
            <p className="text-sm text-muted mt-1">
              배치 {selected.batchNumber} · {selected.inspectedAt}
            </p>

            <div className="mt-4">
              <PartImagePlaceholder variant="heatmap" label="AI 주목 영역" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
              <div>
                <p className="text-muted">신뢰도</p>
                <p className="text-ink font-medium mt-0.5">{selected.confidence}%</p>
              </div>
              <div>
                <p className="text-muted">예상 불량 유형</p>
                <p className="text-ink font-medium mt-0.5">{selected.defectType ?? '해당 없음'}</p>
              </div>
              <div>
                <p className="text-muted">AI 판정</p>
                <StatusBadge
                  label={AI_STATUS_LABEL[selected.aiStatus]}
                  tone={AI_STATUS_TONE[selected.aiStatus]}
                />
              </div>
              <div>
                <p className="text-muted">최종 판정</p>
                <StatusBadge
                  label={FINAL_DECISION_LABEL[selected.finalDecision]}
                  tone={FINAL_DECISION_TONE[selected.finalDecision]}
                />
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div>
                <p className="text-muted">최종 판정 사유</p>
                <p className="text-ink mt-0.5">
                  {selected.decisionReason ?? '입력된 사유가 없습니다'}
                </p>
              </div>
              <div>
                <p className="text-muted">비용 추정 내역</p>
                <p className="text-ink mt-0.5">
                  ₩{selected.estimatedLoss.toLocaleString()}
                  <span className="text-xs text-muted ml-1.5">입력값 기반 추정치</span>
                </p>
              </div>
              <div>
                <p className="text-muted">검사자 메모</p>
                <p className="text-ink mt-0.5">{selected.memo ?? '작성된 메모가 없습니다'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectionHistory;

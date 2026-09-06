import type { FC } from 'react';
import StatusBadge from '../components/common/StatusBadge';
import DefectTrendChart from '../components/charts/DefectTrendChart';
import {
  DASHBOARD_RECENT_RESULTS,
  DASHBOARD_SUMMARY,
  RECENT_7_DAYS_DEFECT_RATE,
  TODAY_LABEL,
} from '../data/mockData';

type Props = {
  onStartNewInspection: () => void;
};

const SUMMARY_CARDS = [
  { label: '오늘 검사 수', value: DASHBOARD_SUMMARY.todayInspectionCount, unit: '건', tone: 'neutral' as const },
  { label: '정상 판정', value: DASHBOARD_SUMMARY.okCount, unit: '건', tone: 'ok' as const },
  { label: '불량 의심', value: DASHBOARD_SUMMARY.suspectedDefectCount, unit: '건', tone: 'defect' as const },
  { label: '재검 대기', value: DASHBOARD_SUMMARY.recheckPendingCount, unit: '건', tone: 'recheck' as const },
];

const CARD_ACCENT: Record<string, string> = {
  neutral: 'border-l-brand',
  ok: 'border-l-ok',
  defect: 'border-l-defect',
  recheck: 'border-l-recheck',
};

const Dashboard: FC<Props> = ({ onStartNewInspection }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink">품질 현황</h1>
          <p className="text-sm text-muted mt-1">{TODAY_LABEL}</p>
        </div>
        <button
          onClick={onStartNewInspection}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          새 검사 시작
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SUMMARY_CARDS.map((card) => (
          <div
            key={card.label}
            className={`bg-white rounded-card border border-gray-200 border-l-4 ${CARD_ACCENT[card.tone]} p-5`}
          >
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-2 text-2xl font-bold text-ink">
              {card.value.toLocaleString()}
              <span className="text-sm font-normal text-muted ml-1">{card.unit}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-card border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-ink">최근 검사 결과</h2>
          </div>
          <div className="overflow-x-auto -mx-1">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted border-b border-gray-100">
                  <th className="px-3 py-2 font-medium">부품</th>
                  <th className="px-3 py-2 font-medium">AI 판정</th>
                  <th className="px-3 py-2 font-medium">상태</th>
                </tr>
              </thead>
              <tbody>
                {DASHBOARD_RECENT_RESULTS.map((row) => (
                  <tr key={row.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-3 py-3 text-ink font-medium">{row.partType}</td>
                    <td className="px-3 py-3 text-muted">
                      {row.aiStatusLabel} · {row.confidence}%
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge label={row.statusLabel} tone={row.statusColor} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-card border border-gray-200 p-5 flex flex-col justify-between">
          <div>
            <p className="text-sm text-muted">추정 품질 손실</p>
            <p className="mt-2 text-3xl font-bold text-ink">
              ₩{DASHBOARD_SUMMARY.estimatedLoss.toLocaleString()}
            </p>
          </div>
          <p className="mt-4 text-xs text-muted">입력값 기반 추정치</p>
        </div>
      </div>

      <div className="bg-white rounded-card border border-gray-200 p-5">
        <h2 className="font-semibold text-ink mb-1">최근 7일 불량률 추이</h2>
        <p className="text-sm text-muted mb-2">일별 불량 판정 비율(%)</p>
        <DefectTrendChart data={RECENT_7_DAYS_DEFECT_RATE} />
      </div>
    </div>
  );
};

export default Dashboard;

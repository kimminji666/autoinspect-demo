import { useState, type FC } from 'react';
import DefectTrendChart from '../components/charts/DefectTrendChart';
import PartDefectBarChart from '../components/charts/PartDefectBarChart';
import {
  CUMULATIVE_ESTIMATED_LOSS,
  PART_DEFECT_RATES,
  RECENT_30_DAYS_DEFECT_RATE,
  RECENT_7_DAYS_DEFECT_RATE,
  RECURRING_DEFECT_ALERT,
} from '../data/mockData';

type Period = '7d' | '30d';

const Statistics: FC = () => {
  const [period, setPeriod] = useState<Period>('7d');
  const trendData = period === '7d' ? RECENT_7_DAYS_DEFECT_RATE : RECENT_30_DAYS_DEFECT_RATE;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-bold text-ink">통계 분석</h1>
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 self-start">
          <button
            onClick={() => setPeriod('7d')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              period === '7d' ? 'bg-brand text-white' : 'text-muted hover:text-ink'
            }`}
          >
            최근 7일
          </button>
          <button
            onClick={() => setPeriod('30d')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              period === '30d' ? 'bg-brand text-white' : 'text-muted hover:text-ink'
            }`}
          >
            최근 30일
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-card border border-gray-200 p-5">
            <h2 className="font-semibold text-ink mb-1">부품별 불량률</h2>
            <p className="text-sm text-muted mb-2">최근 7일 기준</p>
            <PartDefectBarChart data={PART_DEFECT_RATES} />
          </div>

          <div className="bg-white rounded-card border border-gray-200 p-5">
            <h2 className="font-semibold text-ink mb-1">날짜별 불량률 추이</h2>
            <p className="text-sm text-muted mb-2">
              {period === '7d' ? '최근 7일' : '최근 30일'} 기준
            </p>
            <DefectTrendChart data={trendData} />
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-card border border-defect/30 bg-red-50/40 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block h-2 w-2 rounded-full bg-defect" />
              <p className="text-sm font-semibold text-defect">반복 불량 주의</p>
            </div>
            <p className="text-lg font-bold text-ink">{RECURRING_DEFECT_ALERT.partType}</p>
            <p className="text-sm text-ink mt-1">
              최근 7일 불량률 {RECURRING_DEFECT_ALERT.recentRatePercent}%
            </p>
            <p className="text-sm text-defect mt-1">
              지난주 대비 {RECURRING_DEFECT_ALERT.changeVsLastWeek}%p 증가
            </p>
          </div>

          <div className="bg-white rounded-card border border-gray-200 p-5">
            <p className="text-sm text-muted">누적 추정 품질 손실</p>
            <p className="mt-2 text-3xl font-bold text-ink">
              ₩{CUMULATIVE_ESTIMATED_LOSS.toLocaleString()}
            </p>
            <p className="mt-3 text-xs text-muted">
              실제 비용이 아닌 입력값 기반 추정치입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

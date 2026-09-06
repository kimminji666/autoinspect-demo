import type { FC } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { DailyDefectRate } from '../../types/inspection';

type Props = {
  data: DailyDefectRate[];
  height?: number;
};

const DefectTrendChart: FC<Props> = ({ data, height = 220 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: -12 }}>
        <CartesianGrid stroke="#EEF0F3" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: '#6B7280' }}
          axisLine={{ stroke: '#E5E7EB' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#6B7280' }}
          axisLine={false}
          tickLine={false}
          unit="%"
          width={40}
        />
        <Tooltip
          formatter={(value: number) => [`${value}%`, '불량률']}
          labelFormatter={(label) => `${label}`}
          contentStyle={{
            borderRadius: 8,
            border: '1px solid #E5E7EB',
            fontSize: 12,
          }}
        />
        <Line
          type="monotone"
          dataKey="defectRatePercent"
          stroke="#2563EB"
          strokeWidth={2.5}
          dot={{ r: 3, fill: '#2563EB' }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DefectTrendChart;

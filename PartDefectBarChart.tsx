import type { FC } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { PartDefectRate } from '../../types/inspection';

type Props = {
  data: PartDefectRate[];
  height?: number;
};

const PartDefectBarChart: FC<Props> = ({ data, height = 260 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: -12 }}>
        <CartesianGrid stroke="#EEF0F3" vertical={false} />
        <XAxis
          dataKey="partType"
          tick={{ fontSize: 12, fill: '#6B7280' }}
          axisLine={{ stroke: '#E5E7EB' }}
          tickLine={false}
          interval={0}
          angle={-10}
          textAnchor="end"
          height={50}
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
          contentStyle={{
            borderRadius: 8,
            border: '1px solid #E5E7EB',
            fontSize: 12,
          }}
        />
        <Bar dataKey="defectRatePercent" radius={[6, 6, 0, 0]} maxBarSize={44}>
          {data.map((entry) => (
            <Cell
              key={entry.partType}
              fill={entry.partType === '라디에이터 그릴' ? '#DC2626' : '#2563EB'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PartDefectBarChart;

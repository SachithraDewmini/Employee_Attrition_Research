
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import type { MonthlyRecord } from '../services/monthlyTrendService';

interface MonthlyTrendChartProps {
  data: MonthlyRecord[];
}

export default function MonthlyTrendChart({
  data,
}: MonthlyTrendChartProps) {
  return (
    <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 15, right: 20, left: 5, bottom: 35 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="YearMonth"
            angle={-35}
            textAnchor="end"
            interval="preserveStartEnd"
            height={60}
            fontSize={11}
          />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Resignations"
            name="Recorded resignations"
            stroke="#347a65"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import type { DepartmentSummary } from '../services/dashboardService';

interface DepartmentChartProps {
  data: DepartmentSummary[];
}

export default function DepartmentChart({
  data,
}: DepartmentChartProps) {
  return (
    <div style={{ width: '100%', height: 380 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 10, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="Department"
            angle={-35}
            textAnchor="end"
            interval={0}
            height={80}
            fontSize={11}
          />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar
            dataKey="Resignations"
            fill="#347a65"
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ErrorBar,
} from 'recharts';
import { datScores } from '../data/paperData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="chart-tooltip">
        <p className="tooltip-title">{data.name}</p>
        <p className="tooltip-value">
          Score: {data.mean.toFixed(1)} ± {data.std.toFixed(1)}
        </p>
      </div>
    );
  }
  return null;
};

export default function DATChart() {
  const data = [
    { name: 'Human', mean: datScores.humans.mean, std: datScores.humans.std, fill: datScores.humans.color },
    ...datScores.models.map(m => ({
      name: m.name,
      mean: m.mean,
      std: m.std,
      fill: m.color,
    })),
  ];

  return (
    <div className="chart-container">
      <h3 className="chart-title">DAT Scores: Humans vs. LLMs</h3>
      <p className="chart-subtitle">Higher scores indicate more divergent word generation</p>
      
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          barSize={40}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: '#666' }}
            axisLine={{ stroke: '#ddd' }}
            tickLine={false}
            angle={-35}
            textAnchor="end"
            height={60}
          />
          <YAxis
            domain={[40, 100]}
            tick={{ fontSize: 12, fill: '#666' }}
            axisLine={{ stroke: '#ddd' }}
            tickLine={false}
            label={{
              value: 'DAT Score',
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: 12, fill: '#666' },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={datScores.humans.mean}
            stroke="#4D4D4D"
            strokeDasharray="5 5"
            label={{
              value: 'Human avg',
              position: 'right',
              style: { fontSize: 10, fill: '#4D4D4D' },
            }}
          />
          <Bar
            dataKey="mean"
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry, index) => (
              <ErrorBar key={index} dataKey="std" width={4} strokeWidth={1.5} stroke="#666" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      <div className="chart-legend">
        <span className="legend-item">
          <span className="legend-dot" style={{ background: '#4D4D4D' }}></span>
          Human baseline (n=100,000)
        </span>
      </div>
    </div>
  );
}

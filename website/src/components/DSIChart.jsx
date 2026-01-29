import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { dsiScores } from '../data/paperData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-title">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="tooltip-value" style={{ color: entry.fill }}>
            {entry.name}: {entry.value.toFixed(2)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DSIChart() {
  const data = dsiScores.tasks.map((task, index) => ({
    task,
    Human: dsiScores.human[index],
    LLM: dsiScores.llm[index],
  }));

  return (
    <div className="chart-container">
      <h3 className="chart-title">DSI Scores: Creative Writing</h3>
      <p className="chart-subtitle">Divergent Semantic Integration in generated texts</p>
      
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" vertical={false} />
          <XAxis
            dataKey="task"
            tick={{ fontSize: 13, fill: '#666' }}
            axisLine={{ stroke: '#ddd' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 1]}
            tick={{ fontSize: 12, fill: '#666' }}
            axisLine={{ stroke: '#ddd' }}
            tickLine={false}
            label={{
              value: 'DSI Score',
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: 12, fill: '#666' },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="square"
            wrapperStyle={{ fontSize: 12 }}
          />
          <Bar
            dataKey="Human"
            fill="#4D4D4D"
            radius={[4, 4, 0, 0]}
            barSize={36}
          />
          <Bar
            dataKey="LLM"
            fill="#008080"
            radius={[4, 4, 0, 0]}
            barSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="chart-insight">
        <span className="insight-icon">→</span>
        <span>Humans consistently outperform LLMs in creative writing tasks</span>
      </div>
    </div>
  );
}

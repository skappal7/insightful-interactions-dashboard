
import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SentimentPieChartProps {
  data: Array<{name: string, value: number, color: string}>;
  title?: string;
}

// This component is now a bar chart instead of a pie chart
const SentimentPieChart: React.FC<SentimentPieChartProps> = ({ data, title }) => {
  return (
    <div className="w-full">
      {title && <h4 className="text-xs font-medium text-center mb-2">{title}</h4>}
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" width={100} />
          <Tooltip 
            formatter={(value) => [`${value} conversations`, 'Count']}
          />
          <Legend />
          <Bar dataKey="value" name="Conversations">
            {data.map((entry, index) => (
              <Cell key={`cell-${title}-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentPieChart;

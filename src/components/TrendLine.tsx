
import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendPoint } from '@/utils/mockData';

interface TrendLineProps {
  data: TrendPoint[];
  color?: string;
  height?: number;
}

const TrendLine: React.FC<TrendLineProps> = ({ 
  data, 
  color = "hsl(var(--primary))", 
  height = 40 
}) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="p-2 bg-background border rounded shadow-sm text-xs">
                    <p>{`Value: ${payload[0].value}`}</p>
                    <p>{`Date: ${payload[0].payload.date}`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendLine;

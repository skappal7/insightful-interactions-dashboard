
import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { TrendPoint } from '@/utils/mockData';
import { Card } from '@/components/ui/card';

interface TrendLineProps {
  data: TrendPoint[];
  color?: string;
  height?: number;
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <Card className="p-2 shadow-lg border text-sm bg-white dark:bg-slate-800 z-[100]">
        <div className="font-medium text-black dark:text-white">{`Value: ${Math.round(payload[0].value as number)}`}</div>
        <div className="text-muted-foreground text-xs">{`Date: ${payload[0].payload.date}`}</div>
      </Card>
    );
  }
  return null;
};

const TrendLine: React.FC<TrendLineProps> = ({ 
  data, 
  color = "hsl(var(--primary))", 
  height = 40 
}) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <Tooltip content={<CustomTooltip />} wrapperStyle={{ zIndex: 1000 }} />
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

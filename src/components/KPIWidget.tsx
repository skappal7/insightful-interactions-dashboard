
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTrendIndicator } from '@/utils/dashboardUtils';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { TrendPoint } from '@/utils/mockData';
import TrendLine from './TrendLine';

interface KPIWidgetProps {
  title: string;
  value: number;
  trend: number;
  unit?: string;
  trendData?: TrendPoint[];
}

const KPIWidget: React.FC<KPIWidgetProps> = ({ 
  title, 
  value, 
  trend, 
  unit = '', 
  trendData = [] 
}) => {
  const trendColor = getTrendIndicator(trend);
  const formattedValue = value.toLocaleString();
  const trendAbs = Math.abs(trend);
  
  return (
    <Card className="dashboard-card overflow-hidden transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1">
          <div className="text-2xl font-bold">
            {formattedValue}{unit}
          </div>
          <div className="flex items-center text-sm font-medium">
            {trend > 0 ? (
              <ArrowUp className={`${trendColor} mr-1 h-4 w-4`} />
            ) : trend < 0 ? (
              <ArrowDown className={`${trendColor} mr-1 h-4 w-4`} />
            ) : null}
            <span className={trendColor}>
              {trendAbs.toFixed(1)}% {trend > 0 ? 'increase' : 'decrease'}
            </span>
          </div>
        </div>
        
        {trendData.length > 0 && (
          <div className="mt-4">
            <TrendLine 
              data={trendData} 
              color={trend >= 0 ? '#34D399' : '#F87171'} 
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KPIWidget;

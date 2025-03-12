
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getTrendIndicator } from '@/utils/dashboardUtils';
import { ArrowUp, ArrowDown, Info } from 'lucide-react';
import { TrendPoint } from '@/utils/mockData';
import TrendLine from './TrendLine';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface KPIWidgetProps {
  title: string;
  value: number;
  trend: number;
  unit?: string;
  trendData?: TrendPoint[];
  description?: string;
}

const KPIWidget: React.FC<KPIWidgetProps> = ({ 
  title, 
  value, 
  trend, 
  unit = '', 
  trendData = [],
  description = ''
}) => {
  const trendColor = getTrendIndicator(trend);
  const formattedValue = value.toLocaleString();
  const trendAbs = Math.abs(trend);
  
  return (
    <Card className="dashboard-card overflow-hidden transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-1">
          <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
            {title}
            {description && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p className="text-xs">{description}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <div className="flex items-center text-xs font-medium">
            {trend > 0 ? (
              <ArrowUp className={`${trendColor} mr-1 h-3 w-3`} />
            ) : trend < 0 ? (
              <ArrowDown className={`${trendColor} mr-1 h-3 w-3`} />
            ) : null}
            <span className={trendColor}>
              {trendAbs.toFixed(1)}% {trend > 0 ? 'increase' : 'decrease'}
            </span>
          </div>
        </div>
        
        <div className="text-xl font-bold">
          {formattedValue}{unit}
        </div>
        
        {trendData.length > 0 && (
          <div className="mt-2">
            <TrendLine 
              data={trendData} 
              color={trend >= 0 ? '#34D399' : '#F87171'} 
              height={30}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KPIWidget;

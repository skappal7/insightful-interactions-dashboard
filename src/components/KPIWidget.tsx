
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getTrendIndicator } from '@/utils/dashboardUtils';
import { ArrowUp, ArrowDown, Info } from 'lucide-react';
import { TrendPoint } from '@/utils/mockData';
import TrendLine from './TrendLine';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

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
  // For metrics where a decrease is actually positive
  const isInverseMetric = title.toLowerCase().includes('escalation') || 
                         title.toLowerCase().includes('repeat') || 
                         title.toLowerCase().includes('average handle time') || 
                         title.toLowerCase().includes('aht') || 
                         title.toLowerCase().includes('transfers') ||
                         title.toLowerCase().includes('long calls');
  
  // For "Short Calls", an increase is negative and decrease is positive
  const isShortCallsMetric = title.toLowerCase().includes('short calls');
  
  // Determine if trend is positive based on metric type
  const isPositiveTrend = isInverseMetric 
    ? trend < 0 
    : isShortCallsMetric 
      ? trend < 0 
      : trend > 0;
  
  const trendColor = isPositiveTrend ? 'text-dashboard-positive' : 'text-dashboard-negative';
  const formattedValue = Math.round(value).toLocaleString();
  const trendAbs = Math.abs(trend);
  
  // Define gradient styles based on trend and metric type
  const getGradientPill = () => {
    if (isPositiveTrend) {
      return "bg-gradient-to-r from-green-100 to-green-300 text-green-900";
    } else if (!isPositiveTrend && trend !== 0) {
      return "bg-gradient-to-r from-red-100 to-red-300 text-red-900";
    }
    return "bg-gradient-to-r from-gray-100 to-gray-300 text-gray-900";
  };
  
  return (
    <Card className="dashboard-card overflow-visible transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-1">
          <div className="text-sm font-medium text-muted-foreground flex items-center gap-1 relative">
            {title}
            {description && (
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent 
                    side="top" 
                    align="center" 
                    className="max-w-xs bg-white dark:bg-slate-800 shadow-xl border rounded-lg p-3"
                    avoidCollisions={true}
                    collisionPadding={20}
                  >
                    <p className="text-xs">{description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        
        <div className="text-xl font-bold">
          {formattedValue}{unit}
        </div>
        
        {trendData.length > 0 && (
          <>
            <div className="mt-2">
              <TrendLine 
                data={trendData} 
                color={isPositiveTrend ? '#34D399' : '#F87171'} 
                height={30}
              />
            </div>
            <div className="mt-3 flex justify-center">
              <span className={`${getGradientPill()} text-xs font-medium px-3 py-1 rounded-full inline-flex items-center`}>
                {trend > 0 ? (
                  <>
                    <ArrowUp className="h-3 w-3 mr-1" />
                    {Math.round(trendAbs)}% {isInverseMetric || isShortCallsMetric ? 'increase' : 'increase'}
                  </>
                ) : trend < 0 ? (
                  <>
                    <ArrowDown className="h-3 w-3 mr-1" />
                    {Math.round(trendAbs)}% {isInverseMetric || isShortCallsMetric ? 'reduction' : 'decrease'}
                  </>
                ) : (
                  'No change'
                )}
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default KPIWidget;

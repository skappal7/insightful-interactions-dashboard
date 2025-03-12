
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
                         title.toLowerCase().includes('aht') || 
                         title.toLowerCase().includes('transfers') ||
                         (title.toLowerCase().includes('calls') && title.toLowerCase().includes('short'));
  
  const isPositiveTrend = isInverseMetric ? trend < 0 : trend > 0;
  
  const trendColor = isInverseMetric 
    ? (trend < 0 ? 'text-dashboard-positive' : trend > 0 ? 'text-dashboard-negative' : 'text-dashboard-neutral')
    : getTrendIndicator(trend);
    
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
    <Card className="dashboard-card overflow-hidden transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-1">
          <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
            {title}
            {description && (
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs bg-white dark:bg-slate-800 shadow-lg border rounded-lg p-2">
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
                {isPositiveTrend ? (
                  <>
                    <ArrowUp className="h-3 w-3 mr-1" />
                    {Math.round(trendAbs)}% {isInverseMetric ? 'reduction' : 'increase'}
                  </>
                ) : trend !== 0 ? (
                  <>
                    <ArrowDown className="h-3 w-3 mr-1" />
                    {Math.round(trendAbs)}% {isInverseMetric ? 'increase' : 'decrease'}
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

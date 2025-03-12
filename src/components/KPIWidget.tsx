
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
  const trendColor = getTrendIndicator(trend);
  const formattedValue = Math.round(value).toLocaleString();
  const trendAbs = Math.abs(trend);
  
  // Define gradient styles based on trend
  const getGradientPill = () => {
    if (trend > 0) {
      return "bg-gradient-to-r from-green-100 to-green-300 text-green-900";
    } else if (trend < 0) {
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
          <div className="flex items-center text-xs font-medium">
            {trend > 0 ? (
              <ArrowUp className={`${trendColor} mr-1 h-3 w-3`} />
            ) : trend < 0 ? (
              <ArrowDown className={`${trendColor} mr-1 h-3 w-3`} />
            ) : null}
            <span className={trendColor}>
              {Math.round(trendAbs)}% {trend > 0 ? 'increase' : 'decrease'}
            </span>
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
                color={trend >= 0 ? '#34D399' : '#F87171'} 
                height={30}
              />
            </div>
            <div className="mt-2">
              <span className={`${getGradientPill()} text-xs font-medium px-3 py-1 rounded-full inline-block`}>
                {trend > 0 ? (
                  <span className="flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    {Math.round(trendAbs)}% increase
                  </span>
                ) : (
                  <span className="flex items-center">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    {Math.round(trendAbs)}% decrease
                  </span>
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

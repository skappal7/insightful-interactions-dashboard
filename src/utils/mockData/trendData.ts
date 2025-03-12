
import { format, subDays } from 'date-fns';
import { TrendPoint } from '../types/dashboardTypes';

// Generate trend data for KPIs
export const generateTrendData = (days = 14): TrendPoint[] => {
  const data: TrendPoint[] = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = subDays(now, i);
    const value = 600 + Math.floor(Math.random() * 700);
    
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      value,
    });
  }
  
  return data;
};


import { subDays } from 'date-fns';
import { DateFilter } from '../types/dashboardTypes';

// Generate date filter options
export const generateDateFilters = (): DateFilter[] => {
  const now = new Date();
  
  return [
    {
      label: 'Today',
      startDate: now,
      endDate: now,
    },
    {
      label: 'Yesterday',
      startDate: subDays(now, 1),
      endDate: subDays(now, 1),
    },
    {
      label: 'Last 7 Days',
      startDate: subDays(now, 6),
      endDate: now,
    },
    {
      label: 'Last 30 Days',
      startDate: subDays(now, 29),
      endDate: now,
    },
  ];
};

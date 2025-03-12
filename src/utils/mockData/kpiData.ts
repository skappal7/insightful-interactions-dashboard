
import { KPIData } from '../types/dashboardTypes';

// Mock KPI Data
export const generateKPIData = (): KPIData[] => [
  {
    title: 'Total Conversations',
    value: 1247,
    previousValue: 1153,
    trend: 8.2,
  },
  {
    title: 'Unique Users',
    value: 876,
    previousValue: 812,
    trend: 7.9,
  },
  {
    title: 'Total Requests',
    value: 3254,
    previousValue: 3128,
    trend: 4.0,
  },
  {
    title: 'Recognition %',
    value: 87.5,
    previousValue: 82.1,
    trend: 6.6,
    unit: '%',
  },
  {
    title: 'Completion %',
    value: 78.3,
    previousValue: 76.5,
    trend: 2.4,
    unit: '%',
  },
  {
    title: 'Escalations',
    value: 243,
    previousValue: 276,
    trend: -12.0,
  },
];

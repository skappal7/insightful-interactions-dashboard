
import { ResponseData } from '../types/dashboardTypes';

// Mock Response Data
export const generateResponseData = (): ResponseData[] => [
  {
    query: 'What is my account balance?',
    frequency: 487,
    completionRate: 94.5,
    aiHandled: true,
    intent: 'Account Balance Inquiry',
  },
  {
    query: 'I forgot my password',
    frequency: 432,
    completionRate: 91.2,
    aiHandled: true,
    intent: 'Password Reset',
  },
  {
    query: 'Show me recent transactions',
    frequency: 376,
    completionRate: 88.7,
    aiHandled: true,
    intent: 'Transaction History',
  },
  {
    query: 'Update my address',
    frequency: 298,
    completionRate: 84.3,
    aiHandled: true,
    intent: 'Profile Update',
  },
  {
    query: 'I want to cancel my subscription',
    frequency: 243,
    completionRate: 52.8,
    aiHandled: false,
    intent: 'Subscription Change',
  },
  {
    query: 'My payment didn\'t go through',
    frequency: 217,
    completionRate: 48.6,
    aiHandled: false,
    intent: 'Billing Issue',
  },
  {
    query: 'I need help with my device',
    frequency: 189,
    completionRate: 41.2,
    aiHandled: false,
    intent: 'Technical Support',
  },
  {
    query: 'Service is down',
    frequency: 167,
    completionRate: 39.5,
    aiHandled: false,
    intent: 'Service Outage',
  },
  {
    query: 'I need a refund',
    frequency: 152,
    completionRate: 46.8,
    aiHandled: false,
    intent: 'Refund Request',
  },
  {
    query: 'When will my order arrive?',
    frequency: 198,
    completionRate: 89.4,
    aiHandled: true,
    intent: 'Shipping Status',
  },
];


import { IntentData } from '../types/dashboardTypes';

// Mock Intent Data
export const generateIntentData = (): IntentData[] => [
  {
    name: 'Account Balance Inquiry',
    total: 348,
    aiCompleted: 321,
    liveAgentCompleted: 27,
    completionRate: 92.2,
  },
  {
    name: 'Password Reset',
    total: 286,
    aiCompleted: 251,
    liveAgentCompleted: 35,
    completionRate: 87.8,
  },
  {
    name: 'Transaction History',
    total: 254,
    aiCompleted: 209,
    liveAgentCompleted: 45,
    completionRate: 82.3,
  },
  {
    name: 'Billing Issue',
    total: 183,
    aiCompleted: 126,
    liveAgentCompleted: 57,
    completionRate: 68.9,
  },
  {
    name: 'Service Outage',
    total: 155,
    aiCompleted: 68,
    liveAgentCompleted: 87,
    completionRate: 43.9,
  },
  {
    name: 'Product Information',
    total: 247,
    aiCompleted: 218,
    liveAgentCompleted: 29,
    completionRate: 88.3,
  },
  {
    name: 'Subscription Change',
    total: 129,
    aiCompleted: 97,
    liveAgentCompleted: 32,
    completionRate: 75.2,
  },
  {
    name: 'Refund Request',
    total: 112,
    aiCompleted: 51,
    liveAgentCompleted: 61,
    completionRate: 45.5,
  },
  {
    name: 'Shipping Status',
    total: 189,
    aiCompleted: 172,
    liveAgentCompleted: 17,
    completionRate: 91.0,
  },
  {
    name: 'Technical Support',
    total: 203,
    aiCompleted: 112,
    liveAgentCompleted: 91,
    completionRate: 55.2,
  },
];

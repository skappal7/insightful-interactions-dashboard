
import { format, subDays } from 'date-fns';

// Types
export interface KPIData {
  title: string;
  value: number;
  previousValue: number;
  trend: number;
  unit?: string;
}

export interface IntentData {
  name: string;
  total: number;
  aiCompleted: number;
  liveAgentCompleted: number;
  completionRate: number;
}

export interface ResponseData {
  query: string;
  frequency: number;
  aiHandled: boolean;
  completionRate: number;
}

export interface SentimentData {
  id: string;
  startSentiment: 'positive' | 'neutral' | 'negative';
  midSentiment: 'positive' | 'neutral' | 'negative';
  endSentiment: 'positive' | 'neutral' | 'negative';
  aiHandled: boolean;
  date: string;
}

export interface TrendPoint {
  value: number;
  date: string;
}

export interface DateFilter {
  startDate: Date;
  endDate: Date;
  label: string;
}

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

// Mock Response Data
export const generateResponseData = (): ResponseData[] => [
  // AI Handled Responses
  {
    query: 'What is my current account balance?',
    frequency: 128,
    aiHandled: true,
    completionRate: 94.5,
  },
  {
    query: 'How do I reset my password?',
    frequency: 97,
    aiHandled: true,
    completionRate: 91.8,
  },
  {
    query: 'Show me my recent transactions',
    frequency: 85,
    aiHandled: true,
    completionRate: 89.3,
  },
  {
    query: 'What are your business hours?',
    frequency: 76,
    aiHandled: true,
    completionRate: 97.2,
  },
  {
    query: 'How do I update my payment method?',
    frequency: 64,
    aiHandled: true,
    completionRate: 88.6,
  },
  // Live Agent Handled Responses
  {
    query: 'Why was I charged twice?',
    frequency: 58,
    aiHandled: false,
    completionRate: 97.8,
  },
  {
    query: 'My service is down, when will it be fixed?',
    frequency: 51,
    aiHandled: false,
    completionRate: 95.2,
  },
  {
    query: 'I need a refund for my purchase',
    frequency: 47,
    aiHandled: false,
    completionRate: 94.3,
  },
  {
    query: 'The product I received is damaged',
    frequency: 42,
    aiHandled: false,
    completionRate: 98.1,
  },
  {
    query: 'I need to escalate my complaint',
    frequency: 39,
    aiHandled: false,
    completionRate: 96.5,
  },
];

// Mock Sentiment Data
export const generateSentimentData = (): SentimentData[] => {
  const sentiments: SentimentData[] = [];
  const now = new Date();
  
  for (let i = 0; i < 100; i++) {
    const startSentiment = ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)] as 'positive' | 'neutral' | 'negative';
    const midSentiment = ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)] as 'positive' | 'neutral' | 'negative';
    let endSentiment: 'positive' | 'neutral' | 'negative';
    
    const aiHandled = Math.random() > 0.4;
    
    // AI tends to maintain or slightly improve sentiment
    // Live agents are better at improving negative sentiment
    if (aiHandled) {
      if (midSentiment === 'negative') {
        endSentiment = Math.random() > 0.6 ? 'neutral' : 'negative';
      } else if (midSentiment === 'neutral') {
        endSentiment = Math.random() > 0.5 ? 'positive' : 'neutral';
      } else {
        endSentiment = 'positive';
      }
    } else {
      if (midSentiment === 'negative') {
        endSentiment = Math.random() > 0.2 ? 'neutral' : 'negative';
      } else if (midSentiment === 'neutral') {
        endSentiment = Math.random() > 0.3 ? 'positive' : 'neutral';
      } else {
        endSentiment = 'positive';
      }
    }
    
    const daysAgo = Math.floor(Math.random() * 30);
    const date = format(subDays(now, daysAgo), 'yyyy-MM-dd');
    
    sentiments.push({
      id: `sent-${i}`,
      startSentiment,
      midSentiment,
      endSentiment,
      aiHandled,
      date,
    });
  }
  
  return sentiments;
};

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

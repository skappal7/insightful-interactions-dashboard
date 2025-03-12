
// Types for dashboard data
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


import { useState, useEffect } from 'react';
import { 
  generateKPIData, 
  generateIntentData, 
  generateResponseData, 
  generateSentimentData,
  generateTrendData,
  generateDateFilters,
} from '@/utils/mockData';
import { 
  getTopIntents, 
  getTopResponses, 
  calculateSentimentImprovement,
  generateExecutiveSummary
} from '@/utils/dashboardUtils';
import { DateFilter, IntentData, KPIData, ResponseData, SentimentData, TrendPoint } from '@/utils/mockData';

interface DashboardData {
  kpiData: KPIData[];
  intentData: IntentData[];
  responseData: ResponseData[];
  sentimentData: SentimentData[];
  trendData: TrendPoint[];
  dateFilters: DateFilter[];
  selectedFilter: string;
  topCompletedIntents: IntentData[];
  topIncompleteIntents: IntentData[];
  aiResponses: ResponseData[];
  liveAgentResponses: ResponseData[];
  sentimentImprovement: { aiImprovement: number; liveAgentImprovement: number };
  summaryHtml: string;
  handleFilterChange: (filter: string) => void;
  barData: Array<{name: string, ai: number, agent: number}>;
  journeyData?: any;
  selectedIntent: string | null;
  selectedResponse: string | null;
  setSelectedIntent: (intent: string | null) => void;
  setSelectedResponse: (response: string | null) => void;
  getFilteredData: (type: string) => any[];
  resetFilters: () => void;
}

export const useDashboardData = (): DashboardData => {
  // Initialize state with mock data
  const [kpiData, setKpiData] = useState(generateKPIData());
  const [intentData, setIntentData] = useState(generateIntentData());
  const [responseData, setResponseData] = useState(generateResponseData());
  const [sentimentData, setSentimentData] = useState(generateSentimentData());
  const [trendData, setTrendData] = useState(generateTrendData());
  const [dateFilters, setDateFilters] = useState(generateDateFilters());
  const [selectedFilter, setSelectedFilter] = useState('Last 7 Days');
  
  // Cross-filtering state
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  
  // Derived data
  const topCompletedIntents = getTopIntents(intentData, true);
  const topIncompleteIntents = getTopIntents(intentData, false);
  const aiResponses = getTopResponses(responseData, true);
  const liveAgentResponses = getTopResponses(responseData, false);
  const sentimentImprovement = calculateSentimentImprovement(sentimentData);
  
  // Executive summary
  const summaryHtml = generateExecutiveSummary(
    kpiData.map(kpi => ({ title: kpi.title, trend: kpi.trend })),
    sentimentImprovement,
    kpiData.find(kpi => kpi.title === 'Escalations')?.value || 0,
    kpiData.find(kpi => kpi.title === 'Recognition %')?.value || 0,
    kpiData.find(kpi => kpi.title === 'Completion %')?.value || 0
  );
  
  // Filter data based on selections
  const getFilteredData = (type: string) => {
    if (!selectedIntent && !selectedResponse) {
      // No filters applied, return original data
      switch (type) {
        case 'intents': return intentData;
        case 'responses': return responseData;
        case 'sentiment': return sentimentData;
        case 'kpi': return kpiData;
        default: return [];
      }
    }
    
    // Apply intent filter
    if (selectedIntent) {
      switch (type) {
        case 'responses':
          // Filter responses related to the selected intent
          return responseData.filter(r => 
            r.intent === selectedIntent || 
            r.query.toLowerCase().includes(selectedIntent.toLowerCase())
          );
        case 'sentiment':
          // Filter sentiment data related to the selected intent
          return sentimentData.filter(s => 
            s.intent === selectedIntent || 
            s.conversationId.toString().includes(selectedIntent.toLowerCase())
          );
        case 'kpi':
          // Adjust KPI data based on selected intent
          // For demo purposes, we'll just modify the values by a random factor
          return kpiData.map(kpi => ({
            ...kpi,
            value: kpi.value * (0.7 + Math.random() * 0.6),
            trend: kpi.trend * (0.8 + Math.random() * 0.4)
          }));
        default:
          return [];
      }
    }
    
    // Apply response filter
    if (selectedResponse) {
      switch (type) {
        case 'intents':
          // Filter intents related to the selected response
          return intentData.filter(i => 
            i.name.toLowerCase().includes(selectedResponse.toLowerCase())
          );
        case 'sentiment':
          // Filter sentiment data related to the selected response
          return sentimentData.filter(s => 
            s.conversationId.toString().includes(selectedResponse.toLowerCase())
          );
        case 'kpi':
          // Adjust KPI data based on selected response
          return kpiData.map(kpi => ({
            ...kpi,
            value: kpi.value * (0.6 + Math.random() * 0.8),
            trend: kpi.trend * (0.7 + Math.random() * 0.6)
          }));
        default:
          return [];
      }
    }
    
    return [];
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSelectedIntent(null);
    setSelectedResponse(null);
  };
  
  // Handle filter changes (date)
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    
    // Simulate data changes when filter changes
    setTimeout(() => {
      // Create slightly different KPI data
      const newKpiData = generateKPIData().map(kpi => ({
        ...kpi,
        value: kpi.value * (0.9 + Math.random() * 0.2),
        trend: kpi.trend * (0.8 + Math.random() * 0.4),
      }));
      
      // Create slightly different intent data
      const newIntentData = generateIntentData().map(intent => ({
        ...intent,
        total: intent.total * (0.9 + Math.random() * 0.2),
        aiCompleted: intent.aiCompleted * (0.9 + Math.random() * 0.2),
        liveAgentCompleted: intent.liveAgentCompleted * (0.9 + Math.random() * 0.2),
        completionRate: intent.completionRate * (0.9 + Math.random() * 0.2),
      }));
      
      // Update state with new data
      setKpiData(newKpiData);
      setIntentData(newIntentData);
      setTrendData(generateTrendData());
      
      // Filter sentiment data based on the selected time period
      const filteredSentimentData = generateSentimentData().slice(
        0, 
        filter === 'Today' ? 20 : 
        filter === 'Yesterday' ? 25 : 
        filter === 'Last 7 Days' ? 70 : 100
      );
      setSentimentData(filteredSentimentData);
    }, 300);
  };

  // Generate bar data for charts
  const generateBarData = () => {
    return [
      { name: 'Mon', ai: 120, agent: 45 },
      { name: 'Tue', ai: 132, agent: 49 },
      { name: 'Wed', ai: 101, agent: 52 },
      { name: 'Thu', ai: 134, agent: 47 },
      { name: 'Fri', ai: 190, agent: 60 },
      { name: 'Sat', ai: 90, agent: 30 },
      { name: 'Sun', ai: 85, agent: 25 },
    ];
  };

  const barData = generateBarData();
  
  return {
    kpiData,
    intentData,
    responseData,
    sentimentData,
    trendData,
    dateFilters,
    selectedFilter,
    topCompletedIntents,
    topIncompleteIntents,
    aiResponses,
    liveAgentResponses,
    sentimentImprovement,
    summaryHtml,
    handleFilterChange,
    barData,
    selectedIntent,
    selectedResponse,
    setSelectedIntent,
    setSelectedResponse,
    getFilteredData,
    resetFilters
  };
};


import { IntentData, ResponseData, SentimentData } from "./mockData";

// Get color based on completion rate
export const getCompletionColor = (rate: number): string => {
  if (rate >= 80) return 'bg-dashboard-positive text-white';
  if (rate >= 50) return 'bg-dashboard-neutral text-black';
  return 'bg-dashboard-negative text-white';
};

// Get trend indicator icon class
export const getTrendIndicator = (trend: number): string => {
  if (trend === 0) return 'text-dashboard-neutral';
  return trend > 0 ? 'text-dashboard-positive' : 'text-dashboard-negative';
};

// Get sentiment color
export const getSentimentColor = (sentiment: 'positive' | 'neutral' | 'negative'): string => {
  switch (sentiment) {
    case 'positive': return 'bg-[#34D399] text-white';
    case 'neutral': return 'bg-[#FBBF24] text-black';
    case 'negative': return 'bg-[#F87171] text-white';
    default: return '';
  }
};

// Get sentiment emoji (alt text provided for screen readers)
export const getSentimentEmoji = (sentiment: 'positive' | 'neutral' | 'negative'): { emoji: string, alt: string } => {
  switch (sentiment) {
    case 'positive': return { emoji: '😊', alt: 'Positive sentiment' };
    case 'neutral': return { emoji: '😐', alt: 'Neutral sentiment' };
    case 'negative': return { emoji: '😞', alt: 'Negative sentiment' };
    default: return { emoji: '', alt: '' };
  }
};

// Filter intents for top 5 completed and incomplete
export const getTopIntents = (intents: IntentData[], completed = true): IntentData[] => {
  const sorted = [...intents].sort((a, b) => {
    if (completed) {
      return b.completionRate - a.completionRate;
    } else {
      return a.completionRate - b.completionRate;
    }
  });
  
  return sorted.slice(0, 5);
};

// Filter responses for AI vs Live Agent
export const getTopResponses = (responses: ResponseData[], aiHandled: boolean): ResponseData[] => {
  return [...responses]
    .filter(r => r.aiHandled === aiHandled)
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 5);
};

// Calculate sentiment improvement rate
export const calculateSentimentImprovement = (sentiments: SentimentData[]): { 
  aiImprovement: number, 
  liveAgentImprovement: number 
} => {
  let aiTotal = 0;
  let aiImproved = 0;
  let liveTotal = 0;
  let liveImproved = 0;
  
  const sentimentValue = (s: 'positive' | 'neutral' | 'negative'): number => {
    switch (s) {
      case 'positive': return 2;
      case 'neutral': return 1;
      case 'negative': return 0;
    }
  };
  
  sentiments.forEach(s => {
    const startValue = sentimentValue(s.startSentiment);
    const endValue = sentimentValue(s.endSentiment);
    const improved = endValue > startValue;
    
    if (s.aiHandled) {
      aiTotal++;
      if (improved) aiImproved++;
    } else {
      liveTotal++;
      if (improved) liveImproved++;
    }
  });
  
  return {
    aiImprovement: aiTotal > 0 ? Math.round((aiImproved / aiTotal) * 100) : 0,
    liveAgentImprovement: liveTotal > 0 ? Math.round((liveImproved / liveTotal) * 100) : 0
  };
};

// Generate executive summary text
export const generateExecutiveSummary = (
  kpiTrends: { title: string, trend: number }[],
  sentimentImprovement: { aiImprovement: number, liveAgentImprovement: number },
  totalEscalations: number,
  recognitionRate: number,
  completionRate: number
): string => {
  const trends = kpiTrends.map(kpi => {
    // For escalations, a decrease is positive (green), increase is negative (red)
    if (kpi.title === 'Escalations') {
      const trendDirection = kpi.trend > 0 ? 'increased' : 'decreased';
      const trendClass = kpi.trend > 0 ? 'trend-negative' : 'trend-positive';
      const trendSymbol = kpi.trend > 0 ? '▲' : '▼';
      return `<span class="${trendClass}">${kpi.title} ${trendDirection} by ${Math.round(Math.abs(kpi.trend))}% ${trendSymbol}</span>`;
    } else {
      // For other metrics, increase is positive (green), decrease is negative (red)
      const trendDirection = kpi.trend > 0 ? 'increased' : 'decreased';
      const trendClass = kpi.trend > 0 ? 'trend-positive' : 'trend-negative';
      const trendSymbol = kpi.trend > 0 ? '▲' : '▼';
      return `<span class="${trendClass}">${kpi.title} ${trendDirection} by ${Math.round(Math.abs(kpi.trend))}% ${trendSymbol}</span>`;
    }
  }).join('. ');

  const aiVsLive = sentimentImprovement.liveAgentImprovement > sentimentImprovement.aiImprovement
    ? `Live agents demonstrate <span class="trend-positive">higher effectiveness</span> at improving customer sentiment (${sentimentImprovement.liveAgentImprovement}%) compared to AI assistants (${sentimentImprovement.aiImprovement}%)`
    : `AI assistants show <span class="trend-positive">comparable effectiveness</span> to live agents at improving customer sentiment (${sentimentImprovement.aiImprovement}% vs ${sentimentImprovement.liveAgentImprovement}%)`;

  // For escalations, a lower number is better
  const escalationAnalysis = totalEscalations > 250
    ? `Escalations remain <span class="trend-negative">above target</span> at ${Math.round(totalEscalations)}`
    : `Escalations are <span class="trend-positive">within target range</span> at ${Math.round(totalEscalations)}`;

  const recognitionAnalysis = recognitionRate >= 85
    ? `Intent recognition is <span class="trend-positive">strong</span> at ${Math.round(recognitionRate)}%`
    : `Intent recognition <span class="trend-negative">needs improvement</span> at ${Math.round(recognitionRate)}%`;

  const completionAnalysis = completionRate >= 75
    ? `Task completion rate is <span class="trend-positive">satisfactory</span> at ${Math.round(completionRate)}%`
    : `Task completion rate <span class="trend-negative">requires attention</span> at ${Math.round(completionRate)}%`;

  return `
    <p class="mb-3">${trends}</p>
    <p class="mb-3">${aiVsLive}.</p>
    <p class="mb-3">${escalationAnalysis}. ${recognitionAnalysis}. ${completionAnalysis}.</p>
    <p>Overall sentiment shows ${sentimentImprovement.aiImprovement + sentimentImprovement.liveAgentImprovement > 150 ? '<span class="trend-positive">positive</span>' : '<span class="trend-neutral">neutral</span>'} progression throughout conversations, with most negative interactions resolving to neutral or positive by conversation end.</p>
  `;
};


import { SentimentData } from '@/utils/mockData';

// Calculate sentiment distributions
export const calculateDistribution = (data: SentimentData[], stage: 'startSentiment' | 'midSentiment' | 'endSentiment') => {
  const counts = { positive: 0, neutral: 0, negative: 0 };
  data.forEach(item => {
    counts[item[stage] as keyof typeof counts]++;
  });
  
  return [
    { name: 'Positive', value: counts.positive, color: '#34D399' },
    { name: 'Neutral', value: counts.neutral, color: '#FBBF24' },
    { name: 'Negative', value: counts.negative, color: '#F87171' }
  ];
};

// Track sentiment movement
export const calculateMovement = (data: SentimentData[]) => {
  const improved = data.filter(item => {
    const start = item.startSentiment === 'negative' ? 0 : item.startSentiment === 'neutral' ? 1 : 2;
    const end = item.endSentiment === 'negative' ? 0 : item.endSentiment === 'neutral' ? 1 : 2;
    return end > start;
  }).length;
  
  const worsened = data.filter(item => {
    const start = item.startSentiment === 'negative' ? 0 : item.startSentiment === 'neutral' ? 1 : 2;
    const end = item.endSentiment === 'negative' ? 0 : item.endSentiment === 'neutral' ? 1 : 2;
    return end < start;
  }).length;
  
  const stayed = data.length - improved - worsened;
  
  return [
    { name: 'Improved', value: improved, color: '#34D399' },
    { name: 'Stayed Same', value: stayed, color: '#94A3B8' },
    { name: 'Worsened', value: worsened, color: '#F87171' }
  ];
};

// AI vs Live Agent effectiveness
export const calculateEffectiveness = (data: SentimentData[]) => {
  const aiHandled = data.filter(item => item.aiHandled);
  const liveHandled = data.filter(item => !item.aiHandled);
  
  const aiImproved = aiHandled.filter(item => {
    const start = item.startSentiment === 'negative' ? 0 : item.startSentiment === 'neutral' ? 1 : 2;
    const end = item.endSentiment === 'negative' ? 0 : item.endSentiment === 'neutral' ? 1 : 2;
    return end > start;
  }).length;
  
  const liveImproved = liveHandled.filter(item => {
    const start = item.startSentiment === 'negative' ? 0 : item.startSentiment === 'neutral' ? 1 : 2;
    const end = item.endSentiment === 'negative' ? 0 : item.endSentiment === 'neutral' ? 1 : 2;
    return end > start;
  }).length;
  
  return [
    { name: 'AI Improved', value: aiImproved, color: '#60A5FA' },
    { name: 'Live Agent Improved', value: liveImproved, color: '#A78BFA' }
  ];
};

// Make sure we have data to display
export const ensureData = (data: Array<{name: string, value: number, color: string}>) => {
  if (data.every(item => item.value === 0)) {
    return [
      { name: 'No Data', value: 1, color: '#CBD5E1' }
    ];
  }
  return data;
};

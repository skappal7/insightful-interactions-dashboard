
import { format, subDays } from 'date-fns';
import { SentimentData } from '../types/dashboardTypes';

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


import React from 'react';

interface SentimentDistributionProps {
  startDistribution: Array<{name: string, value: number, color: string}>;
  midDistribution: Array<{name: string, value: number, color: string}>;
  endDistribution: Array<{name: string, value: number, color: string}>;
}

const SentimentDistribution: React.FC<SentimentDistributionProps> = ({
  startDistribution,
  midDistribution,
  endDistribution
}) => {
  // Helper to get total value
  const getTotal = (dist: Array<{name: string, value: number, color: string}>) => {
    return dist.reduce((acc, item) => acc + item.value, 0);
  };

  // Helper to get emoji and background for sentiment type
  const getSentimentVisual = (name: string) => {
    switch (name.toLowerCase()) {
      case 'positive':
        return { emoji: '😊', bg: 'bg-gradient-to-r from-green-100 to-green-300', text: 'text-green-900' };
      case 'neutral':
        return { emoji: '😐', bg: 'bg-gradient-to-r from-yellow-100 to-yellow-300', text: 'text-yellow-900' };
      case 'negative':
        return { emoji: '😞', bg: 'bg-gradient-to-r from-red-100 to-red-300', text: 'text-red-900' };
      default:
        return { emoji: '❓', bg: 'bg-gray-200', text: 'text-gray-900' };
    }
  };

  // Calculate percentage for width
  const calcPercentage = (value: number, total: number) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };
  
  const startTotal = getTotal(startDistribution);
  const midTotal = getTotal(midDistribution);
  const endTotal = getTotal(endDistribution);

  // Visual journey concept - showing faces moving through stages
  return (
    <div>
      <h3 className="text-sm font-medium mb-6 text-center">Sentiment Journey Through Conversation</h3>
      
      <div className="space-y-8">
        {/* Conversation Start Stage */}
        <div className="relative">
          <h4 className="text-xs font-medium mb-3 text-center bg-muted/50 py-1 rounded-full">Conversation Start</h4>
          <div className="flex rounded-lg overflow-hidden h-12 border">
            {startDistribution.map((item, index) => {
              const { emoji, bg, text } = getSentimentVisual(item.name);
              const width = calcPercentage(item.value, startTotal);
              if (width === 0) return null;
              
              return (
                <div 
                  key={`start-${index}`} 
                  className={`${bg} ${text} flex items-center justify-center`}
                  style={{ width: `${width}%` }}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-xl" role="img" aria-label={`${item.name} sentiment`}>{emoji}</span>
                    <span className="text-xs font-medium">{width}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Middle arrow */}
        <div className="flex justify-center">
          <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-300"></div>
        </div>
        
        {/* Conversation Middle Stage */}
        <div className="relative">
          <h4 className="text-xs font-medium mb-3 text-center bg-muted/50 py-1 rounded-full">Mid Conversation</h4>
          <div className="flex rounded-lg overflow-hidden h-12 border">
            {midDistribution.map((item, index) => {
              const { emoji, bg, text } = getSentimentVisual(item.name);
              const width = calcPercentage(item.value, midTotal);
              if (width === 0) return null;
              
              return (
                <div 
                  key={`mid-${index}`} 
                  className={`${bg} ${text} flex items-center justify-center`}
                  style={{ width: `${width}%` }}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-xl" role="img" aria-label={`${item.name} sentiment`}>{emoji}</span>
                    <span className="text-xs font-medium">{width}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Bottom arrow */}
        <div className="flex justify-center">
          <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-300"></div>
        </div>
        
        {/* Conversation End Stage */}
        <div className="relative">
          <h4 className="text-xs font-medium mb-3 text-center bg-muted/50 py-1 rounded-full">Conversation End</h4>
          <div className="flex rounded-lg overflow-hidden h-12 border">
            {endDistribution.map((item, index) => {
              const { emoji, bg, text } = getSentimentVisual(item.name);
              const width = calcPercentage(item.value, endTotal);
              if (width === 0) return null;
              
              return (
                <div 
                  key={`end-${index}`} 
                  className={`${bg} ${text} flex items-center justify-center`}
                  style={{ width: `${width}%` }}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-xl" role="img" aria-label={`${item.name} sentiment`}>{emoji}</span>
                    <span className="text-xs font-medium">{width}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center mt-6 space-x-4">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full mr-1 bg-gradient-to-r from-green-100 to-green-300"></span>
          <span className="text-xs">Positive</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full mr-1 bg-gradient-to-r from-yellow-100 to-yellow-300"></span>
          <span className="text-xs">Neutral</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full mr-1 bg-gradient-to-r from-red-100 to-red-300"></span>
          <span className="text-xs">Negative</span>
        </div>
      </div>
    </div>
  );
};

export default SentimentDistribution;

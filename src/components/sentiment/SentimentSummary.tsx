
import React from 'react';

interface SentimentSummaryProps {
  startDistribution: Array<{name: string, value: number, color: string}>;
  midDistribution: Array<{name: string, value: number, color: string}>;
  endDistribution: Array<{name: string, value: number, color: string}>;
}

const SentimentSummary: React.FC<SentimentSummaryProps> = ({
  startDistribution,
  midDistribution,
  endDistribution
}) => {
  // Helper to get gradient and text color based on sentiment
  const getGradient = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return "bg-gradient-to-r from-green-100 to-green-300 text-green-900";
      case 'neutral':
        return "bg-gradient-to-r from-yellow-100 to-yellow-300 text-yellow-900";
      case 'negative':
        return "bg-gradient-to-r from-red-100 to-red-300 text-red-900";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-300 text-gray-900";
    }
  };

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="flex flex-col items-center bg-muted/30 rounded-lg p-4">
        <span className="text-xs font-medium text-muted-foreground mb-2">Start Sentiment</span>
        <div className="flex space-x-2">
          {startDistribution.map((item, index) => (
            <div key={`start-summary-${index}`} className="flex flex-col items-center">
              <span className={`w-10 h-10 flex items-center justify-center rounded-full ${getGradient(item.name)}`}>
                <span role="img" aria-label={`${item.name} sentiment`}>
                  {item.name.toLowerCase() === 'positive' ? '😊' : 
                   item.name.toLowerCase() === 'neutral' ? '😐' : '😞'}
                </span>
              </span>
              <span className="text-xs mt-1">{Math.round(item.value)}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col items-center bg-muted/30 rounded-lg p-4">
        <span className="text-xs font-medium text-muted-foreground mb-2">Mid Conversation</span>
        <div className="flex space-x-2">
          {midDistribution.map((item, index) => (
            <div key={`mid-summary-${index}`} className="flex flex-col items-center">
              <span className={`w-10 h-10 flex items-center justify-center rounded-full ${getGradient(item.name)}`}>
                <span role="img" aria-label={`${item.name} sentiment`}>
                  {item.name.toLowerCase() === 'positive' ? '😊' : 
                   item.name.toLowerCase() === 'neutral' ? '😐' : '😞'}
                </span>
              </span>
              <span className="text-xs mt-1">{Math.round(item.value)}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col items-center bg-muted/30 rounded-lg p-4">
        <span className="text-xs font-medium text-muted-foreground mb-2">End Sentiment</span>
        <div className="flex space-x-2">
          {endDistribution.map((item, index) => (
            <div key={`end-summary-${index}`} className="flex flex-col items-center">
              <span className={`w-10 h-10 flex items-center justify-center rounded-full ${getGradient(item.name)}`}>
                <span role="img" aria-label={`${item.name} sentiment`}>
                  {item.name.toLowerCase() === 'positive' ? '😊' : 
                   item.name.toLowerCase() === 'neutral' ? '😐' : '😞'}
                </span>
              </span>
              <span className="text-xs mt-1">{Math.round(item.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SentimentSummary;

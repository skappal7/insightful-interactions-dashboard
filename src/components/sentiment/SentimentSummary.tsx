
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
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="flex flex-col items-center bg-muted/30 rounded-lg p-4">
        <span className="text-xs font-medium text-muted-foreground mb-2">Start Sentiment</span>
        <div className="flex space-x-2">
          <div className="flex flex-col items-center">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#34D399] text-white">
              <span role="img" aria-label="Positive sentiment">😊</span>
            </span>
            <span className="text-xs mt-1">{startDistribution[0].value}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FBBF24] text-black">
              <span role="img" aria-label="Neutral sentiment">😐</span>
            </span>
            <span className="text-xs mt-1">{startDistribution[1].value}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F87171] text-white">
              <span role="img" aria-label="Negative sentiment">😞</span>
            </span>
            <span className="text-xs mt-1">{startDistribution[2].value}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center bg-muted/30 rounded-lg p-4">
        <span className="text-xs font-medium text-muted-foreground mb-2">Mid Conversation</span>
        <div className="flex space-x-2">
          <div className="flex flex-col items-center">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#34D399] text-white">
              <span role="img" aria-label="Positive sentiment">😊</span>
            </span>
            <span className="text-xs mt-1">{midDistribution[0].value}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FBBF24] text-black">
              <span role="img" aria-label="Neutral sentiment">😐</span>
            </span>
            <span className="text-xs mt-1">{midDistribution[1].value}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F87171] text-white">
              <span role="img" aria-label="Negative sentiment">😞</span>
            </span>
            <span className="text-xs mt-1">{midDistribution[2].value}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center bg-muted/30 rounded-lg p-4">
        <span className="text-xs font-medium text-muted-foreground mb-2">End Sentiment</span>
        <div className="flex space-x-2">
          <div className="flex flex-col items-center">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#34D399] text-white">
              <span role="img" aria-label="Positive sentiment">😊</span>
            </span>
            <span className="text-xs mt-1">{endDistribution[0].value}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FBBF24] text-black">
              <span role="img" aria-label="Neutral sentiment">😐</span>
            </span>
            <span className="text-xs mt-1">{endDistribution[1].value}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F87171] text-white">
              <span role="img" aria-label="Negative sentiment">😞</span>
            </span>
            <span className="text-xs mt-1">{endDistribution[2].value}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentSummary;

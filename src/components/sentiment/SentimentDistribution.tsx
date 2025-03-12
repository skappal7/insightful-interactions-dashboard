
import React from 'react';
import SentimentPieChart from './SentimentPieChart';

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
  return (
    <div>
      <h3 className="text-sm font-medium mb-4 text-center">Sentiment Distribution Across Conversation Stages</h3>
      <div className="grid grid-cols-3 gap-4" style={{ height: "220px" }}>
        <SentimentPieChart data={startDistribution} title="Start" />
        <SentimentPieChart data={midDistribution} title="Middle" />
        <SentimentPieChart data={endDistribution} title="End" />
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: "#34D399" }}></span>
          <span className="text-xs">Positive</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: "#FBBF24" }}></span>
          <span className="text-xs">Neutral</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: "#F87171" }}></span>
          <span className="text-xs">Negative</span>
        </div>
      </div>
    </div>
  );
};

export default SentimentDistribution;

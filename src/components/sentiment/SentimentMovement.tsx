
import React from 'react';
import SentimentPieChart from './SentimentPieChart';

interface SentimentMovementProps {
  movementData: Array<{name: string, value: number, color: string}>;
  effectivenessData: Array<{name: string, value: number, color: string}>;
}

const SentimentMovement: React.FC<SentimentMovementProps> = ({
  movementData,
  effectivenessData
}) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-4 text-center">Sentiment Movement & Agent Impact</h3>
      <div className="grid grid-cols-2 gap-4" style={{ height: "220px" }}>
        <SentimentPieChart data={movementData} title="Sentiment Movement" />
        <SentimentPieChart data={effectivenessData} title="Agent Effectiveness" />
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: "#60A5FA" }}></span>
          <span className="text-xs">AI Assistant</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: "#A78BFA" }}></span>
          <span className="text-xs">Live Agent</span>
        </div>
      </div>
    </div>
  );
};

export default SentimentMovement;

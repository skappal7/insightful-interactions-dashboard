
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SentimentMovementProps {
  movementData: Array<{name: string, value: number, color: string}>;
  effectivenessData: Array<{name: string, value: number, color: string}>;
}

const SentimentMovement: React.FC<SentimentMovementProps> = ({
  movementData,
  effectivenessData
}) => {
  // Transform data for charts
  const transformedMovementData = [
    { 
      name: 'Sentiment Movement',
      improved: movementData.find(d => d.name === 'Improved')?.value || 0,
      unchanged: movementData.find(d => d.name === 'Stayed Same')?.value || 0,
      worsened: movementData.find(d => d.name === 'Worsened')?.value || 0
    }
  ];
  
  const transformedEffectivenessData = [
    {
      name: 'AI Agent',
      improved: effectivenessData.find(d => d.name === 'AI Improved')?.value || 0,
      color: '#60A5FA'
    },
    {
      name: 'Live Agent',
      improved: effectivenessData.find(d => d.name === 'Live Agent Improved')?.value || 0,
      color: '#A78BFA'
    }
  ];
  
  return (
    <div>
      <h3 className="text-sm font-medium mb-4 text-center">Sentiment Movement & Agent Impact</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h4 className="text-xs font-medium mb-2">Sentiment Movement</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={transformedMovementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="improved" fill="#34D399" name="Improved" />
              <Bar dataKey="unchanged" fill="#94A3B8" name="Unchanged" />
              <Bar dataKey="worsened" fill="#F87171" name="Worsened" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        
        <Card className="p-4">
          <h4 className="text-xs font-medium mb-2">Agent Effectiveness</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={transformedEffectivenessData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="improved" name="Improved Conversations" fill="#60A5FA" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
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


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SentimentTracker from '@/components/SentimentTracker';
import { SentimentData } from '@/utils/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import SentimentMovement from '@/components/sentiment/SentimentMovement';

interface SentimentTabProps {
  sentimentData: SentimentData[];
}

const SentimentTab: React.FC<SentimentTabProps> = ({ sentimentData }) => {
  // Prepare sentiment movement data
  const movementData = [
    { name: 'Improved', value: 65, color: '#34D399' },
    { name: 'Stayed Same', value: 22, color: '#94A3B8' },
    { name: 'Worsened', value: 13, color: '#F87171' }
  ];
  
  const effectivenessData = [
    { name: 'AI Improved', value: 62, color: '#60A5FA' },
    { name: 'Live Agent Improved', value: 78, color: '#A78BFA' }
  ];

  return (
    <>
      <SentimentTracker data={sentimentData} />
      
      <div className="mt-6">
        <SentimentMovement 
          movementData={movementData}
          effectivenessData={effectivenessData}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="dashboard-card overflow-hidden transition-all duration-300">
          <CardContent className="p-4">
            <h3 className="text-base font-medium mb-4">Sentiment Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={[
                { date: 'Mon', positive: 40, neutral: 30, negative: 30 },
                { date: 'Tue', positive: 35, neutral: 35, negative: 30 },
                { date: 'Wed', positive: 45, neutral: 30, negative: 25 },
                { date: 'Thu', positive: 50, neutral: 25, negative: 25 },
                { date: 'Fri', positive: 55, neutral: 30, negative: 15 },
                { date: 'Sat', positive: 60, neutral: 25, negative: 15 },
                { date: 'Sun', positive: 65, neutral: 20, negative: 15 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="positive" stroke="#34D399" name="Positive" />
                <Line type="monotone" dataKey="neutral" stroke="#FBBF24" name="Neutral" />
                <Line type="monotone" dataKey="negative" stroke="#F87171" name="Negative" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card overflow-hidden transition-all duration-300">
          <CardContent className="p-4">
            <h3 className="text-base font-medium mb-4">Sentiment Improvement by Agent Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { agent: 'AI Assistant', improved: 65, worsened: 15, unchanged: 20 },
                { agent: 'Live Agent', improved: 80, worsened: 5, unchanged: 15 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="agent" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="improved" stackId="a" fill="#34D399" name="Improved" />
                <Bar dataKey="unchanged" stackId="a" fill="#94A3B8" name="Unchanged" />
                <Bar dataKey="worsened" stackId="a" fill="#F87171" name="Worsened" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SentimentTab;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SentimentData } from '@/utils/mockData';
import { getSentimentColor } from '@/utils/dashboardUtils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

interface SentimentTrackerProps {
  data: SentimentData[];
}

const SentimentTracker: React.FC<SentimentTrackerProps> = ({ data }) => {
  // Calculate sentiment distributions
  const calculateDistribution = (stage: 'startSentiment' | 'midSentiment' | 'endSentiment') => {
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

  const startDistribution = calculateDistribution('startSentiment');
  const midDistribution = calculateDistribution('midSentiment');
  const endDistribution = calculateDistribution('endSentiment');
  
  // Track sentiment movement
  const calculateMovement = () => {
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
  
  const movementData = calculateMovement();
  
  // AI vs Live Agent effectiveness
  const calculateEffectiveness = () => {
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
  
  const effectivenessData = calculateEffectiveness();
  
  // Make sure we have data to display
  const ensureData = (data: Array<{name: string, value: number, color: string}>) => {
    if (data.every(item => item.value === 0)) {
      return [
        { name: 'No Data', value: 1, color: '#CBD5E1' }
      ];
    }
    return data;
  };

  const safeStartDistribution = ensureData(startDistribution);
  const safeMidDistribution = ensureData(midDistribution);
  const safeEndDistribution = ensureData(endDistribution);
  const safeMovementData = ensureData(movementData);
  const safeEffectivenessData = ensureData(effectivenessData);
  
  return (
    <Card className="dashboard-card col-span-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Sentiment Analysis & Movement</CardTitle>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="w-64">Analysis of customer sentiment throughout conversations and how it changes over time</p>
          </TooltipContent>
        </Tooltip>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-4 text-center">Sentiment Distribution Across Conversation Stages</h3>
            <div className="grid grid-cols-3 gap-4" style={{ height: "220px" }}>
              <div>
                <h4 className="text-xs font-medium text-center mb-2">Start</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={safeStartDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {safeStartDistribution.map((entry, index) => (
                        <Cell key={`cell-start-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value) => [`${value} conversations`, 'Count']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h4 className="text-xs font-medium text-center mb-2">Middle</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={safeMidDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {safeMidDistribution.map((entry, index) => (
                        <Cell key={`cell-mid-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value) => [`${value} conversations`, 'Count']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h4 className="text-xs font-medium text-center mb-2">End</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={safeEndDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {safeEndDistribution.map((entry, index) => (
                        <Cell key={`cell-end-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value) => [`${value} conversations`, 'Count']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
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
          
          <div>
            <h3 className="text-sm font-medium mb-4 text-center">Sentiment Movement & Agent Impact</h3>
            <div className="grid grid-cols-2 gap-4" style={{ height: "220px" }}>
              <div>
                <h4 className="text-xs font-medium text-center mb-2">Sentiment Movement</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={safeMovementData}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {safeMovementData.map((entry, index) => (
                        <Cell key={`cell-movement-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value) => [`${value} conversations`, 'Count']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h4 className="text-xs font-medium text-center mb-2">Agent Effectiveness</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={safeEffectivenessData}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {safeEffectivenessData.map((entry, index) => (
                        <Cell key={`cell-effective-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value) => [`${value} conversations`, 'Count']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
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
        </div>
        
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
      </CardContent>
    </Card>
  );
};

export default SentimentTracker;

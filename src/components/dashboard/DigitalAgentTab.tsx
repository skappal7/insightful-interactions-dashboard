
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import KPIWidget from '@/components/KPIWidget';
import ResponseTable from '@/components/ResponseTable';
import IntentTable from '@/components/IntentTable';
import { KPIData, IntentData, ResponseData, TrendPoint, SentimentData } from '@/utils/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { Info } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DigitalAgentTabProps {
  kpiData: KPIData[];
  trendData: TrendPoint[];
  aiResponses: ResponseData[];
  topCompletedIntents: IntentData[];
  kpiDescriptions: Record<string, string>;
  barData: Array<{name: string, ai: number, agent: number}>;
}

const DigitalAgentTab: React.FC<DigitalAgentTabProps> = ({
  kpiData,
  trendData,
  aiResponses,
  topCompletedIntents,
  kpiDescriptions,
  barData
}) => {
  // Filter KPIs for Digital Agent section
  const digitalAgentKPIs = kpiData.filter(kpi => 
    ['Total Conversations', 'Total Requests', 'Recognition %', 'Completion %', 'Escalations'].includes(kpi.title)
  );
  
  // Mock sentiment data for Digital Agent
  const sentimentDistribution = [
    { name: 'Positive', value: 65, color: '#34D399' },
    { name: 'Neutral', value: 25, color: '#FBBF24' },
    { name: 'Negative', value: 10, color: '#F87171' }
  ];
  
  // Helper to get emoji based on sentiment
  const getSentimentEmoji = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive': return '😊';
      case 'neutral': return '😐';
      case 'negative': return '😞';
      default: return '❓';
    }
  };
  
  return (
    <>
      {/* Two rows of KPI widgets, 3 per row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {digitalAgentKPIs.slice(0, 3).map((kpi) => (
          <KPIWidget
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            unit={kpi.unit}
            trendData={trendData}
            description={kpiDescriptions[kpi.title as keyof typeof kpiDescriptions]}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {digitalAgentKPIs.slice(3).map((kpi) => (
          <KPIWidget
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            unit={kpi.unit}
            trendData={trendData}
            description={kpiDescriptions[kpi.title as keyof typeof kpiDescriptions]}
          />
        ))}
        
        {/* Overall Sentiment Widget */}
        <Card className="dashboard-card overflow-hidden transition-all duration-300">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Overall Sentiment</CardTitle>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-64">Overall sentiment distribution across AI-handled conversations</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex justify-center items-center h-16">
              {sentimentDistribution.map((item) => (
                <div key={item.name} className="flex flex-col items-center mx-2">
                  <div 
                    className="flex items-center justify-center w-10 h-10 rounded-full"
                    style={{ backgroundColor: `${item.color}20`, color: item.color }}
                  >
                    <span role="img" aria-label={`${item.name} sentiment`}>
                      {getSentimentEmoji(item.name)}
                    </span>
                  </div>
                  <div className="text-xs mt-1">{item.value}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="dashboard-card overflow-hidden transition-all duration-300">
          <CardContent className="p-4">
            <h3 className="text-base font-medium mb-4">AI Handled Conversations (7-Day Trend)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ai" fill="#60A5FA" name="AI Handled" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <ResponseTable 
          data={aiResponses} 
          title="AI-Handled Responses" 
          aiHandled={true}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <IntentTable 
          data={topCompletedIntents.filter(intent => intent.aiCompleted > intent.liveAgentCompleted)} 
          title="Top AI-Completed Intents" 
        />
      </div>
    </>
  );
};

export default DigitalAgentTab;

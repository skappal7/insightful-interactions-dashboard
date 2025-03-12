
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import KPIWidget from '@/components/KPIWidget';
import ResponseTable from '@/components/ResponseTable';
import IntentTable from '@/components/IntentTable';
import { KPIData, IntentData, ResponseData, TrendPoint } from '@/utils/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
        {kpiData.slice(0, 3).map((kpi) => (
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

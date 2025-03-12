
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import KPIWidget from '@/components/KPIWidget';
import ResponseTable from '@/components/ResponseTable';
import IntentTable from '@/components/IntentTable';
import { KPIData, IntentData, ResponseData, TrendPoint } from '@/utils/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LiveAgentsTabProps {
  kpiData: KPIData[];
  trendData: TrendPoint[];
  liveAgentResponses: ResponseData[];
  topIncompleteIntents: IntentData[];
  kpiDescriptions: Record<string, string>;
  barData: Array<{name: string, ai: number, agent: number}>;
}

const LiveAgentsTab: React.FC<LiveAgentsTabProps> = ({
  kpiData,
  trendData,
  liveAgentResponses,
  topIncompleteIntents,
  kpiDescriptions,
  barData
}) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
        {kpiData.slice(3, 6).map((kpi) => (
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
            <h3 className="text-base font-medium mb-4">Live Agent Escalations (7-Day Trend)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="agent" fill="#A78BFA" name="Agent Handled" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <ResponseTable 
          data={liveAgentResponses} 
          title="Live Agent-Handled Responses" 
          aiHandled={false}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <IntentTable 
          data={topIncompleteIntents.filter(intent => intent.liveAgentCompleted > intent.aiCompleted)} 
          title="Top Live Agent-Completed Intents" 
        />
      </div>
    </>
  );
};

export default LiveAgentsTab;

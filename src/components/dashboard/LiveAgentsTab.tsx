
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import KPIWidget from '@/components/KPIWidget';
import ResponseTable from '@/components/ResponseTable';
import IntentTable from '@/components/IntentTable';
import { KPIData, IntentData, ResponseData, TrendPoint, SentimentData } from '@/utils/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface LiveAgentsTabProps {
  kpiData: KPIData[];
  trendData: TrendPoint[];
  liveAgentResponses: ResponseData[];
  topIncompleteIntents: IntentData[];
  kpiDescriptions: Record<string, string>;
  barData: Array<{name: string, ai: number, agent: number}>;
  sentimentData: SentimentData[];
}

const LiveAgentsTab: React.FC<LiveAgentsTabProps> = ({
  kpiData,
  trendData,
  liveAgentResponses,
  topIncompleteIntents,
  kpiDescriptions,
  barData,
  sentimentData
}) => {
  // List of KPIs we want to show for Live Agents
  // We'll map from existing KPIs where possible and add mock data for new ones
  const liveAgentKPIs: KPIData[] = [
    kpiData.find(kpi => kpi.title === 'Total Conversations') || { 
      title: 'Total Conversations', value: 842, previousValue: 802, trend: 5.0 
    },
    { 
      title: 'Repeats', value: 127, previousValue: 142, trend: -10.6 
    },
    { 
      title: 'Average Handle Time', value: 4.5, previousValue: 4.8, trend: -6.3, unit: ' min' 
    },
    { 
      title: 'Long Calls', value: 156, previousValue: 172, trend: -9.3 
    },
    { 
      title: 'Short Calls', value: 418, previousValue: 380, trend: 10.0 
    },
    { 
      title: 'Transfers', value: 68, previousValue: 75, trend: -9.3 
    }
  ];
  
  // Mock data for call types with long and short duration
  const longCallTypes = [
    { type: 'Technical Support', avgDuration: '9.8 min', count: 48 },
    { type: 'Billing Dispute', avgDuration: '8.5 min', count: 37 },
    { type: 'Account Cancellation', avgDuration: '7.9 min', count: 29 },
    { type: 'Product Warranty', avgDuration: '7.2 min', count: 24 },
    { type: 'Service Outage', avgDuration: '6.8 min', count: 18 }
  ];
  
  const shortCallTypes = [
    { type: 'Order Status', avgDuration: '1.2 min', count: 86 },
    { type: 'Store Hours', avgDuration: '1.5 min', count: 72 },
    { type: 'Password Reset', avgDuration: '1.8 min', count: 65 },
    { type: 'Account Verification', avgDuration: '2.1 min', count: 59 },
    { type: 'Payment Confirmation', avgDuration: '2.4 min', count: 52 }
  ];
  
  // Mock data for escalated calls and sentiment
  const escalatedCalls = [
    { type: 'Technical Support', initialSentiment: 'Negative', finalSentiment: 'Neutral', count: 32 },
    { type: 'Billing Dispute', initialSentiment: 'Negative', finalSentiment: 'Positive', count: 28 },
    { type: 'Account Access', initialSentiment: 'Negative', finalSentiment: 'Neutral', count: 22 },
    { type: 'Product Defect', initialSentiment: 'Negative', finalSentiment: 'Positive', count: 19 },
    { type: 'Service Cancellation', initialSentiment: 'Negative', finalSentiment: 'Neutral', count: 17 },
    { type: 'Refund Request', initialSentiment: 'Negative', finalSentiment: 'Positive', count: 15 },
    { type: 'Payment Issue', initialSentiment: 'Negative', finalSentiment: 'Neutral', count: 14 },
    { type: 'Order Status', initialSentiment: 'Neutral', finalSentiment: 'Positive', count: 12 },
    { type: 'Shipping Delay', initialSentiment: 'Negative', finalSentiment: 'Neutral', count: 10 },
    { type: 'Website Issue', initialSentiment: 'Negative', finalSentiment: 'Positive', count: 9 }
  ];
  
  // Helper function to get sentiment color class
  const getSentimentColorClass = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'neutral': return 'bg-yellow-100 text-yellow-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <>
      {/* Two rows of KPI widgets, 3 per row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {liveAgentKPIs.slice(0, 3).map((kpi) => (
          <KPIWidget
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            unit={kpi.unit}
            trendData={trendData}
            description={kpiDescriptions[kpi.title as keyof typeof kpiDescriptions] || ''}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {liveAgentKPIs.slice(3).map((kpi) => (
          <KPIWidget
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            unit={kpi.unit}
            trendData={trendData}
            description={kpiDescriptions[kpi.title as keyof typeof kpiDescriptions] || ''}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="dashboard-card overflow-hidden transition-all duration-300">
          <CardContent className="p-4">
            <h3 className="text-base font-medium mb-4">Top 5 Long Call Types</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Call Type</TableHead>
                  <TableHead>Avg Duration</TableHead>
                  <TableHead>Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {longCallTypes.map((call, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{call.type}</TableCell>
                    <TableCell>{call.avgDuration}</TableCell>
                    <TableCell>{call.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card overflow-hidden transition-all duration-300">
          <CardContent className="p-4">
            <h3 className="text-base font-medium mb-4">Top 5 Short Call Types</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Call Type</TableHead>
                  <TableHead>Avg Duration</TableHead>
                  <TableHead>Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shortCallTypes.map((call, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{call.type}</TableCell>
                    <TableCell>{call.avgDuration}</TableCell>
                    <TableCell>{call.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card className="dashboard-card overflow-hidden transition-all duration-300">
          <CardContent className="p-4">
            <h3 className="text-base font-medium mb-4">Top 10 Escalated Call Types & Sentiment Change</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Call Type</TableHead>
                  <TableHead>Initial Sentiment</TableHead>
                  <TableHead>Final Sentiment</TableHead>
                  <TableHead>Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {escalatedCalls.map((call, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{call.type}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getSentimentColorClass(call.initialSentiment)}`}>
                        {call.initialSentiment}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getSentimentColorClass(call.finalSentiment)}`}>
                        {call.finalSentiment}
                      </span>
                    </TableCell>
                    <TableCell>{call.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LiveAgentsTab;

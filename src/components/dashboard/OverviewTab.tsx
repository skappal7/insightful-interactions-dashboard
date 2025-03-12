
import React from 'react';
import KPIWidget from '@/components/KPIWidget';
import IntentTable from '@/components/IntentTable';
import ExecutiveSummary from '@/components/ExecutiveSummary';
import CustomerCallJourney from '@/components/dashboard/CustomerCallJourney';
import { KPIData, IntentData, TrendPoint } from '@/utils/mockData';

interface OverviewTabProps {
  kpiData: KPIData[];
  topCompletedIntents: IntentData[];
  topIncompleteIntents: IntentData[];
  trendData: TrendPoint[];
  summaryHtml: string;
  kpiDescriptions: Record<string, string>;
  selectedIntent: string;
  onIntentChange?: (intent: string) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  kpiData,
  topCompletedIntents,
  topIncompleteIntents,
  trendData,
  summaryHtml,
  kpiDescriptions,
  selectedIntent,
  onIntentChange
}) => {
  // Calculate the values for the journey visualization
  const totalCalls = kpiData.find(kpi => kpi.title === 'Total Conversations')?.value || 0;
  const escalations = kpiData.find(kpi => kpi.title === 'Escalations')?.value || 0;
  
  // Estimate numbers based on KPI data
  const digitalAgentCalls = Math.round(totalCalls * 0.75); // 75% of calls handled by digital agent
  const liveAgentCalls = totalCalls - digitalAgentCalls; // Remaining calls handled directly by live agents
  const positiveSentimentCalls = Math.round(escalations * 0.65); // 65% of escalated calls had positive sentiment in the end
  
  return (
    <>
      {/* First row of KPI widgets, 3 per row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
      
      {/* Second row of KPI widgets, 3 per row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
      
      {/* Customer Call Journey */}
      <div className="mb-6">
        <CustomerCallJourney 
          totalCalls={totalCalls}
          digitalAgentCalls={digitalAgentCalls}
          liveAgentCalls={liveAgentCalls}
          escalatedCalls={escalations}
          positiveSentimentCalls={positiveSentimentCalls}
          topIntents={topCompletedIntents}
          selectedIntent={selectedIntent}
          onIntentSelect={onIntentChange}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <IntentTable 
          data={topCompletedIntents} 
          title="Top Completed Intents" 
        />
        <IntentTable 
          data={topIncompleteIntents} 
          title="Top Incomplete Intents" 
        />
      </div>
      
      <div className="mt-6">
        <ExecutiveSummary summaryHtml={summaryHtml} />
      </div>
    </>
  );
};

export default OverviewTab;

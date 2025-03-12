
import React from 'react';
import KPIWidget from '@/components/KPIWidget';
import IntentTable from '@/components/IntentTable';
import ExecutiveSummary from '@/components/ExecutiveSummary';
import { KPIData, IntentData, TrendPoint } from '@/utils/mockData';

interface OverviewTabProps {
  kpiData: KPIData[];
  topCompletedIntents: IntentData[];
  topIncompleteIntents: IntentData[];
  trendData: TrendPoint[];
  summaryHtml: string;
  kpiDescriptions: Record<string, string>;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  kpiData,
  topCompletedIntents,
  topIncompleteIntents,
  trendData,
  summaryHtml,
  kpiDescriptions
}) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {kpiData.map((kpi) => (
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

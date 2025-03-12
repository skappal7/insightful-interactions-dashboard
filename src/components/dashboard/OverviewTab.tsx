
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
  selectedIntent: string | null;
  selectedResponse: string | null;
  onSelectIntent: (intent: string | null) => void;
  onSelectResponse: (response: string | null) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  kpiData,
  topCompletedIntents,
  topIncompleteIntents,
  trendData,
  summaryHtml,
  kpiDescriptions,
  selectedIntent,
  selectedResponse,
  onSelectIntent,
  onSelectResponse
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* First row of KPI widgets, 3 per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IntentTable 
          data={topCompletedIntents} 
          title="Top Completed Intents" 
          selectedIntent={selectedIntent}
          onSelectIntent={onSelectIntent}
        />
        <IntentTable 
          data={topIncompleteIntents} 
          title="Top Incomplete Intents" 
          selectedIntent={selectedIntent}
          onSelectIntent={onSelectIntent}
        />
      </div>
      
      <div>
        <ExecutiveSummary summaryHtml={summaryHtml} />
      </div>
    </div>
  );
};

export default OverviewTab;

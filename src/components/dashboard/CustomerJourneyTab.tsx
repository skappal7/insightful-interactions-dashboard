
import React from 'react';
import CustomerCallJourney from './CustomerCallJourney';
import CustomerDecompositionTree from './CustomerDecompositionTree';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IntentData, KPIData, SentimentData } from '@/utils/mockData';
import CustomerPathwayTree from '@/components/CustomerPathwayTree';
import { generateCustomerPathwayTreeData } from '@/components/customerPathway';

interface CustomerJourneyTabProps {
  kpiData: KPIData[];
  sentimentData: SentimentData[];
  topCompletedIntents: IntentData[];
  useTreeView?: boolean;
}

const CustomerJourneyTab: React.FC<CustomerJourneyTabProps> = ({
  kpiData,
  sentimentData,
  topCompletedIntents,
  useTreeView = false
}) => {
  // Get mock data for customer pathway tree
  const customerPathwayData = generateCustomerPathwayTreeData();
  
  // Calculate some metrics for the child components
  const totalCalls = kpiData.find(kpi => kpi.title === 'Total Calls')?.value || 0;
  const digitalAgentCalls = kpiData.find(kpi => kpi.title === 'Digital Agent')?.value || 0;
  const liveAgentCalls = kpiData.find(kpi => kpi.title === 'Live Agent')?.value || 0;
  const escalatedCalls = kpiData.find(kpi => kpi.title === 'Escalations')?.value || 0;
  const avgHandleTime = kpiData.find(kpi => kpi.title === 'Avg. Handle Time')?.value || 0;
  const totalConversations = sentimentData.length;
  
  return (
    <div className="space-y-6">
      <Card className="dashboard-card p-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Customer Journey Overview</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">
            This section visualizes the complete customer journey across touchpoints, including AI and live agent interactions.
            The customer pathway flow illustrates the sequence of interactions, sentiment changes, and resolution paths.
          </p>
        </CardContent>
      </Card>
      
      {useTreeView ? (
        <div className="grid grid-cols-1 gap-6">
          <CustomerPathwayTree 
            title="Customer Conversation Pathways" 
            data={customerPathwayData} 
          />
        </div>
      ) : (
        <>
          <CustomerCallJourney 
            totalCalls={totalCalls}
            digitalAgentCalls={digitalAgentCalls}
            liveAgentCalls={liveAgentCalls}
            escalatedCalls={escalatedCalls}
            avgHandleTime={avgHandleTime}
            resolutionRate={85}
            firstContactResolution={75}
          />
          <CustomerDecompositionTree 
            totalConversations={totalConversations}
            sentimentData={sentimentData}
            topIntents={topCompletedIntents}
          />
        </>
      )}
    </div>
  );
};

export default CustomerJourneyTab;

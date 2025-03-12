
import React from 'react';
import CustomerCallJourney from './CustomerCallJourney';
import CustomerDecompositionTree from './CustomerDecompositionTree';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IntentData, KPIData, SentimentData } from '@/utils/mockData';
import CustomerPathwayTree from '@/components/CustomerPathwayTree';
import { generateCustomerPathwayTreeData } from '@/components/CustomerPathwayTreeData';

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
          <CustomerCallJourney />
          <CustomerDecompositionTree />
        </>
      )}
    </div>
  );
};

export default CustomerJourneyTab;

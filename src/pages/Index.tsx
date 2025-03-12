
import React, { useEffect } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import FilterBar from '@/components/FilterBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Users, Bot, MessageSquare } from 'lucide-react';

// Import the refactored tab components
import OverviewTab from '@/components/dashboard/OverviewTab';
import DigitalAgentTab from '@/components/dashboard/DigitalAgentTab';
import LiveAgentsTab from '@/components/dashboard/LiveAgentsTab';
import SentimentTab from '@/components/dashboard/SentimentTab';
import { useDashboardData } from '@/hooks/useDashboardData';
import { kpiDescriptions } from '@/constants/dashboardConstants';

const Index = () => {
  const {
    kpiData,
    dateFilters,
    selectedFilter,
    selectedIntent,
    selectedAgent,
    topCompletedIntents,
    topIncompleteIntents,
    trendData,
    summaryHtml,
    aiResponses,
    liveAgentResponses,
    sentimentData,
    barData,
    handleFilterChange,
    handleIntentChange,
    handleAgentChange
  } = useDashboardData();
  
  const [activeTab, setActiveTab] = React.useState('overview');
  
  // Animation effect - staggered entrance
  useEffect(() => {
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-scale-in');
      }, 100 * index);
    });
  }, [activeTab]);
  
  return (
    <div className="container py-6 mx-auto max-w-7xl animate-fade-in">
      <DashboardHeader />
      
      <FilterBar 
        dateFilters={dateFilters}
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
        selectedIntent={selectedIntent}
        onIntentChange={handleIntentChange}
        selectedAgent={selectedAgent}
        onAgentChange={handleAgentChange}
      />
      
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full bg-background border-b mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <LayoutDashboard className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="digital-agent" className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <Bot className="h-4 w-4" />
            <span>Digital Agent</span>
          </TabsTrigger>
          <TabsTrigger value="live-agents" className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <Users className="h-4 w-4" />
            <span>Live Agents</span>
          </TabsTrigger>
          <TabsTrigger value="sentiment" className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <MessageSquare className="h-4 w-4" />
            <span>Sentiment Analysis</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0">
          <OverviewTab 
            kpiData={kpiData}
            topCompletedIntents={topCompletedIntents}
            topIncompleteIntents={topIncompleteIntents}
            trendData={trendData}
            summaryHtml={summaryHtml}
            kpiDescriptions={kpiDescriptions}
            selectedIntent={selectedIntent}
            onIntentChange={handleIntentChange}
          />
        </TabsContent>
        
        <TabsContent value="digital-agent" className="mt-0">
          <DigitalAgentTab 
            kpiData={kpiData}
            trendData={trendData}
            aiResponses={aiResponses}
            topCompletedIntents={topCompletedIntents}
            kpiDescriptions={kpiDescriptions}
            barData={barData}
          />
        </TabsContent>
        
        <TabsContent value="live-agents" className="mt-0">
          <LiveAgentsTab 
            kpiData={kpiData}
            trendData={trendData}
            liveAgentResponses={liveAgentResponses}
            topIncompleteIntents={topIncompleteIntents}
            kpiDescriptions={kpiDescriptions}
            barData={barData}
            sentimentData={sentimentData}
          />
        </TabsContent>
        
        <TabsContent value="sentiment" className="mt-0">
          <SentimentTab 
            sentimentData={sentimentData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;

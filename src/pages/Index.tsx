
import React, { useState, useEffect } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import FilterBar from '@/components/FilterBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Users, Bot, MessageSquare } from 'lucide-react';
import { 
  generateKPIData, 
  generateIntentData, 
  generateResponseData, 
  generateSentimentData,
  generateTrendData,
  generateDateFilters,
} from '@/utils/mockData';
import { 
  getTopIntents, 
  getTopResponses, 
  calculateSentimentImprovement,
  generateExecutiveSummary
} from '@/utils/dashboardUtils';

// Import the refactored tab components
import OverviewTab from '@/components/dashboard/OverviewTab';
import DigitalAgentTab from '@/components/dashboard/DigitalAgentTab';
import LiveAgentsTab from '@/components/dashboard/LiveAgentsTab';
import SentimentTab from '@/components/dashboard/SentimentTab';

const kpiDescriptions = {
  'Total Conversations': 'The total number of conversations between customers and AI or live agents',
  'Unique Users': 'The number of distinct users who initiated conversations',
  'Total Requests': 'The total number of individual requests made across all conversations',
  'Recognition %': 'Percentage of user intents that were correctly recognized by the AI',
  'Completion %': 'Percentage of requests that were successfully completed without escalation',
  'Escalations': 'Number of conversations that were escalated to live agents'
};

const Index = () => {
  // Initialize state with mock data
  const [kpiData, setKpiData] = useState(generateKPIData());
  const [intentData, setIntentData] = useState(generateIntentData());
  const [responseData, setResponseData] = useState(generateResponseData());
  const [sentimentData, setSentimentData] = useState(generateSentimentData());
  const [trendData, setTrendData] = useState(generateTrendData());
  const [dateFilters, setDateFilters] = useState(generateDateFilters());
  const [selectedFilter, setSelectedFilter] = useState('Last 7 Days');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Derived data
  const topCompletedIntents = getTopIntents(intentData, true);
  const topIncompleteIntents = getTopIntents(intentData, false);
  const aiResponses = getTopResponses(responseData, true);
  const liveAgentResponses = getTopResponses(responseData, false);
  const sentimentImprovement = calculateSentimentImprovement(sentimentData);
  
  // Executive summary
  const summaryHtml = generateExecutiveSummary(
    kpiData.map(kpi => ({ title: kpi.title, trend: kpi.trend })),
    sentimentImprovement,
    kpiData.find(kpi => kpi.title === 'Escalations')?.value || 0,
    kpiData.find(kpi => kpi.title === 'Recognition %')?.value || 0,
    kpiData.find(kpi => kpi.title === 'Completion %')?.value || 0
  );
  
  // Handle filter change (simulated data refresh)
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    
    // Simulate data changes when filter changes
    setTimeout(() => {
      // Create slightly different KPI data
      const newKpiData = generateKPIData().map(kpi => ({
        ...kpi,
        value: kpi.value * (0.9 + Math.random() * 0.2),
        trend: kpi.trend * (0.8 + Math.random() * 0.4),
      }));
      
      // Create slightly different intent data
      const newIntentData = generateIntentData().map(intent => ({
        ...intent,
        total: intent.total * (0.9 + Math.random() * 0.2),
        aiCompleted: intent.aiCompleted * (0.9 + Math.random() * 0.2),
        liveAgentCompleted: intent.liveAgentCompleted * (0.9 + Math.random() * 0.2),
        completionRate: intent.completionRate * (0.9 + Math.random() * 0.2),
      }));
      
      // Update state with new data
      setKpiData(newKpiData);
      setIntentData(newIntentData);
      setTrendData(generateTrendData());
      
      // Filter sentiment data based on the selected time period
      const filteredSentimentData = generateSentimentData().slice(
        0, 
        filter === 'Today' ? 20 : 
        filter === 'Yesterday' ? 25 : 
        filter === 'Last 7 Days' ? 70 : 100
      );
      setSentimentData(filteredSentimentData);
    }, 300);
  };
  
  // Animation effect - staggered entrance
  useEffect(() => {
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-scale-in');
      }, 100 * index);
    });
  }, [activeTab]);

  // Generate bar data for charts
  const generateBarData = () => {
    return [
      { name: 'Mon', ai: 120, agent: 45 },
      { name: 'Tue', ai: 132, agent: 49 },
      { name: 'Wed', ai: 101, agent: 52 },
      { name: 'Thu', ai: 134, agent: 47 },
      { name: 'Fri', ai: 190, agent: 60 },
      { name: 'Sat', ai: 90, agent: 30 },
      { name: 'Sun', ai: 85, agent: 25 },
    ];
  };

  const barData = generateBarData();
  
  return (
    <div className="container py-6 mx-auto max-w-7xl animate-fade-in">
      <DashboardHeader />
      
      <FilterBar 
        dateFilters={dateFilters}
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
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
